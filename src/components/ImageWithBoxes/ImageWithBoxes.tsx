import React, { useState } from "react";
import { ImageWithBoxesProps } from "../../types/props";

const MAX_IMG_WIDTH = 176; // 220px * 0.8

const ImageWithBoxes: React.FC<ImageWithBoxesProps> = ({
  imageUrl,
  predictions,
  grayscale = false,
  outlineColor = "#2563eb",
  originalSize = true,
}) => {
  const [imgSize, setImgSize] = useState({ width: 1, height: 1 });
  const [displaySize, setDisplaySize] = useState({ width: 1, height: 1 });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={imageUrl}
        alt="Detected"
        style={{
          borderRadius: 10,
          filter: grayscale ? "grayscale(1)" : "none",
          display: "block",
          width: originalSize ? imgSize.width : "100%",
          height: originalSize ? imgSize.height : "auto",
          maxWidth: originalSize ? imgSize.width : MAX_IMG_WIDTH,
        }}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          setImgSize({
            width: target.naturalWidth,
            height: target.naturalHeight,
          });
          setDisplaySize({ width: target.width, height: target.height });
        }}
      />
      {predictions.map((pred, idx) => {
        const scaleX = originalSize ? 1 : displaySize.width / imgSize.width;
        const scaleY = originalSize ? 1 : displaySize.height / imgSize.height;
        const left = (pred.x - pred.width / 2) * scaleX;
        const top = (pred.y - pred.height / 2) * scaleY;
        const boxWidth = pred.width * scaleX;
        const boxHeight = pred.height * scaleY;
        return (
          <React.Fragment key={idx}>
            <div
              style={{
                position: "absolute",
                left,
                top,
                width: boxWidth,
                height: boxHeight,
                border: `2px solid ${outlineColor}`,
                borderRadius: 6,
                pointerEvents: "none",
                boxSizing: "border-box",
                background: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left,
                top: top - 18 < 0 ? top : top - 18,
                background: "#222",
                color: "#fff",
                fontSize: "0.68rem",
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: "5px 5px 5px 0",
                pointerEvents: "none",
                zIndex: 2,
                maxWidth: boxWidth,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {pred.class}
              {typeof pred.confidence === "number"
                ? ` ${(pred.confidence * 100).toFixed(0)}%`
                : ""}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ImageWithBoxes;
