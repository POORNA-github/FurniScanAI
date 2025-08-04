import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { ChatBox, ChatFooter } from "./components/Chat";
import ChatPreview from "./components/Chat/ChatPreview";
import { ChatMessage } from "./types/chat";
import { Prediction } from "./types/prediction";
import { getChatTitle } from "./utils/getChatTitle";
import { getCohereReply } from "./utils/getCohereReply";
import { generateDamageReportPDF } from "./utils/generateDamageReportPDF";
import { saveImageForFinetuning } from "./utils/saveImageForFinetuning";
import "./styles/App.css";
import axios from "axios";

const ROBOFLOW_API_URL = process.env.REACT_APP_ROBOFLOW_API_URL!;

type DamageClass = "crack" | "insect damage" | "physical damage";
const allowedClasses: DamageClass[] = [
  "crack",
  "insect damage",
  "physical damage",
];

// LKR per cm² for each type
const MATERIAL_COSTS_PER_CM2 = {
  crack: 0.5,
  "insect damage": 0.6,
  "physical damage": 0.4,
};

const DEFAULT_DPI = 96; // You can change this if you know your image DPI

function estimateRepairCostCm2(
  predictions: Prediction[],
  DPI = DEFAULT_DPI
): {
  material: number;
  labour: number;
  total: number;
  areaByType: Record<DamageClass, number>;
  breakdown: Record<DamageClass, number>;
} {
  const pxToCm = 2.54 / DPI;
  const areaByType: Record<DamageClass, number> = {
    crack: 0,
    "insect damage": 0,
    "physical damage": 0,
  };
  const breakdown: Record<DamageClass, number> = {
    crack: 0,
    "insect damage": 0,
    "physical damage": 0,
  };

  predictions.forEach((pred) => {
    if (allowedClasses.includes(pred.class as DamageClass)) {
      const areaCm2 = pred.width * pred.height * pxToCm * pxToCm;
      areaByType[pred.class as DamageClass] += areaCm2;
      breakdown[pred.class as DamageClass]++;
    }
  });

  let material = 0;
  (Object.keys(areaByType) as DamageClass[]).forEach((type) => {
    material += areaByType[type] * MATERIAL_COSTS_PER_CM2[type];
  });

  // Labour logic as before
  let labour = 0;
  if (breakdown["crack"] > 0) {
    labour += breakdown["crack"] * 500;
  }
  if (breakdown["insect damage"] > 0) {
    labour += 1000;
  }
  if (breakdown["physical damage"] > 0) {
    labour += breakdown["physical damage"] * 950;
  }

  const total = material + labour;

  return { material, labour, total, areaByType, breakdown };
}

const DAMAGE_TIPS: Record<string, string> = {
  crack: `🪵 **Preventing Cracks:**
- Avoid placing wooden furniture in direct sunlight or near heat sources, as this can dry out the wood and cause cracks.
- Maintain indoor humidity with a bowl of water or a humidifier, especially during dry seasons.
- **Product Example:** For filling small cracks, use Robbialac Wood Filler or Nippon Wood Putty, both widely available in Sri Lanka at hardware stores.`,
  "insect damage": `🐛 **Preventing Insect Damage:**
- Regularly check for signs of wood-boring insects like termites or beetles.
- Apply a protective treatment such as Sayerlack Wood Preservative or Nippon Anti-Termite Solution to keep pests away.
- **Product Example:** To seal insect holes, use Robbialac Wood Putty or Multilac Wood Filler to fill and smooth over the damaged areas.`,
  "physical damage": `🛡️ **Preventing Physical Damage:**
- Use felt pads under furniture legs and coasters under cups to prevent scratches and water marks.
- Avoid dragging heavy items across wooden surfaces.
- **Product Example:** For minor scratches, use Brasso Furniture Polish or Multilac Furniture Polish to restore shine and conceal small marks.`,
};

const initialMessages: ChatMessage[] = [];

const LS_KEY = "furniscan-chat-history";

const App: React.FC = () => {
  const [allChats, setAllChats] = useState<
    { id: string; messages: ChatMessage[] }[]
  >(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) return JSON.parse(saved);
    return [{ id: "main", messages: initialMessages }];
  });
  const [currentChatId, setCurrentChatId] = useState(allChats[0].id);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(allChats));
  }, [allChats]);

  const currentChat =
    allChats.find((c) => c.id === currentChatId) || allChats[0];

  const updateCurrentChat = (newMessages: ChatMessage[]) => {
    setAllChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId ? { ...c, messages: newMessages } : c
      )
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setInput(""); // Don't show file name in input
    }
  };

  const handleSend = async () => {
    if (image) {
      setIsTyping(true);
      const imageUrl = URL.createObjectURL(image);

      // 1. Show user preview (just the image, no file name)
      updateCurrentChat([
        ...currentChat.messages,
        { sender: "user" as const, imageUrl },
      ]);

      // 2. Send to Roboflow
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axios.post(ROBOFLOW_API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const predictions = response.data.predictions as Prediction[];

        const { material, labour, total, areaByType, breakdown } =
          estimateRepairCostCm2(predictions, DEFAULT_DPI);

        const filteredPredictions = predictions.filter((pred) =>
          allowedClasses.includes(pred.class as DamageClass)
        );
        const detectedTypes = Array.from(
          new Set(filteredPredictions.map((pred) => pred.class))
        );
        const hasDamage = detectedTypes.length > 0;

        // 3. Add FurniScan message with output image and boxes (no text)
        updateCurrentChat([
          ...currentChat.messages,
          { sender: "user" as const, imageUrl },
          {
            sender: "furniscan" as const,
            imageUrl,
            predictions,
          },
        ]);
        // 4. After a delay, add FurniScan message with text (typing effect)
        setTimeout(() => {
          let newMsgs: ChatMessage[] = [
            ...currentChat.messages,
            { sender: "user" as const, imageUrl },
            {
              sender: "furniscan" as const,
              imageUrl,
              predictions,
            },
            {
              sender: "furniscan" as const,
              text: hasDamage
                ? `**Identified damages:** ${detectedTypes.join(
                    ", "
                  )}\n**Estimated total repair cost:** LKR ${total.toFixed(
                    2
                  )}\n(Material: LKR ${material.toFixed(
                    2
                  )}, Labour: LKR ${labour.toFixed(2)})`
                : "No damage detected.",
            },
          ];
          // 5. Add tips for each detected type (if any)
          if (hasDamage) {
            detectedTypes.forEach((type) => {
              if (DAMAGE_TIPS[type]) {
                newMsgs = [
                  ...newMsgs,
                  {
                    sender: "furniscan" as const,
                    text: DAMAGE_TIPS[type],
                  },
                ];
              }
            });
          }
          updateCurrentChat(newMsgs);
          setIsTyping(false);
        }, 1800);
      } catch (err: any) {
        console.error("Roboflow error:", err, err?.response?.data);
        updateCurrentChat([
          ...currentChat.messages,
          { sender: "user" as const, imageUrl },
          {
            sender: "furniscan" as const,
            text: "Sorry, there was an error processing your image.",
          },
        ]);
        setIsTyping(false);
      }
      setImage(null);
      setInput("");
    } else if (input.trim() === "/report") {
      handleDownloadReport();
      setInput("");
    } else if (input.trim()) {
      setIsTyping(true);
      const reply = await getCohereReply(input);
      updateCurrentChat([
        ...currentChat.messages,
        { sender: "user" as const, text: input },
        { sender: "furniscan" as const, text: reply },
      ]);
      setInput("");
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    setAllChats((prev) => [...prev, { id: newId, messages: initialMessages }]);
    setCurrentChatId(newId);
  };

  const handleSelectHistory = (id: string) => {
    setCurrentChatId(id);
  };

  // Delete chat handler
  const handleDeleteHistory = (id: string) => {
    if (allChats.length === 1) return; // Don't allow deleting the last chat
    setAllChats((prev) => prev.filter((c) => c.id !== id));
    if (currentChatId === id) {
      // Switch to another chat if the current one is deleted
      const next = allChats.find((c) => c.id !== id);
      if (next) setCurrentChatId(next.id);
    }
  };

  // --- PDF Report Data Extraction ---
  const lastFurniscanMsg = [...currentChat.messages]
    .reverse()
    .find((msg) => msg.sender === "furniscan" && msg.predictions);

  const imageUrl = lastFurniscanMsg?.imageUrl || "";
  const predictions = lastFurniscanMsg?.predictions || [];
  const {
    material,
    labour,
    total: estimatedCost,
    areaByType,
    breakdown,
  } = estimateRepairCostCm2(predictions, DEFAULT_DPI);

  const filteredPredictions = predictions.filter((pred) =>
    allowedClasses.includes(pred.class as DamageClass)
  );
  const detectedType =
    filteredPredictions.length > 0 ? filteredPredictions[0].class : "";

  const referenceNo = currentChatId;
  const date = new Date().toLocaleDateString();

  const itemsNeededMap: Record<string, string[]> = {
    crack: ["Wood filler", "Sandpaper", "Wood glue"],
    "insect damage": ["Insecticide", "Wood hardener", "Filler"],
    "physical damage": ["Wood filler", "Sandpaper", "Paint/Varnish"],
  };
  const preventionTipsMap: Record<string, string[]> = {
    crack: ["Maintain stable humidity", "Avoid direct sunlight"],
    "insect damage": ["Regular inspections", "Keep furniture dry"],
    "physical damage": ["Use protective pads", "Avoid sharp objects"],
  };

  // --- Download Report Handler ---
  const handleDownloadReport = async () => {
    if (!imageUrl || !detectedType) return;
    await generateDamageReportPDF({
      imageUrl,
      damageType:
        detectedType === "crack"
          ? "Crack"
          : detectedType === "insect damage"
          ? "Insect Damage"
          : "Physical Damage",
      estimatedCost,
      itemsNeeded: itemsNeededMap[detectedType] || [],
      preventionTips: preventionTipsMap[detectedType] || [],
      referenceNo,
      date,
      breakdown,
      areaByType,
      materialCost: material,
      labourCost: labour,
    });
  };

  return (
    <div className={`app-layout${grayscale ? " dark" : ""}`}>
      <Sidebar
        onNewChat={handleNewChat}
        history={allChats.map((c) => ({
          id: c.id,
          title: getChatTitle(c.messages),
          active: c.id === currentChatId,
        }))}
        onSelectHistory={handleSelectHistory}
        onDeleteHistory={handleDeleteHistory}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        grayscale={grayscale}
        onToggleGrayscale={() => setGrayscale((g) => !g)}
      />

      <main className={`main-chat${sidebarCollapsed ? " expanded" : ""}`}>
        {currentChat.messages.length === 0 ||
        (currentChat.messages.length === 1 &&
          currentChat.messages[0].sender === "furniscan") ? (
          <ChatPreview />
        ) : (
          <>
            <ChatBox messages={currentChat.messages} isTyping={isTyping} />
            {/* Download Report Button */}
            {imageUrl && detectedType && (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <button
                  onClick={handleDownloadReport}
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Download Your Report
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <ChatFooter
        input={input}
        setInput={setInput}
        image={image}
        handleImageChange={handleImageChange}
        handleSend={handleSend}
        sidebarCollapsed={sidebarCollapsed}
      />
    </div>
  );
};

export default App;
