import { ChatMessage } from "./chat";
import { Prediction } from "./prediction";

export type ChatBoxProps = {
  messages: ChatMessage[];
  isTyping: boolean;
};
export type ChatFooterProps = {
  input: string;
  setInput: (val: string) => void;
  image: File | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  sidebarCollapsed: boolean;
};
export type MessageProps = {
  msg: ChatMessage;
  isModelOutput: boolean;
};
export type ImageWithBoxesProps = {
  imageUrl: string;
  predictions: Prediction[];
  grayscale?: boolean;
  outlineColor?: string;
  originalSize?: boolean;
};

export type SidebarProps = {
  onNewChat: () => void;
  history: { id: string; title: string; active: boolean }[];
  onSelectHistory: (id: string) => void;
  onDeleteHistory: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  grayscale: boolean;
  onToggleGrayscale: () => void;
};
export type DiscordCardProps = {
  grayscale: boolean;
  onHide: () => void;
};

export type ReportBugsButtonProps = {
  onClick: () => void;
};

export type SidebarHistoryItemProps = {
  id: string;
  title: string;
  active: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export type SidebarNewChatButtonProps = {
  onClick: () => void;
};