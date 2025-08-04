import { Prediction } from "../types/prediction";

export const saveImageForFinetuning = async (
  image: File,
  damageTypes: string[],
  predictions: Prediction[]
) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("damageTypes", JSON.stringify(damageTypes));
  formData.append("predictions", JSON.stringify(predictions));
  formData.append("timestamp", new Date().toISOString());

  await fetch("http://localhost:4000/api/save-image", {
    method: "POST",
    body: formData,
  });
};