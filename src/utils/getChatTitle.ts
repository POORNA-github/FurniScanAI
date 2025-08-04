import { ChatMessage } from "../types/chat";
export function getChatTitle(messages: ChatMessage[]) {
  const firstUser = messages.find((m) => m.sender === "user" && m.text);
  return firstUser?.text?.slice(0, 30) || "New Chat";
}