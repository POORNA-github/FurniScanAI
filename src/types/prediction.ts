export type Prediction = {
  class: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence?: number;
};