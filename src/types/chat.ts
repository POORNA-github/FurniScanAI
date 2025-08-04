export type ChatMessage = {
  sender: "user" | "furniscan";
  text?: string;
  imageUrl?: string;
  predictions?: Prediction[];
};
import { Prediction } from "./prediction";