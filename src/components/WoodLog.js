// src/components/WoodLog.js
import React, { useState } from "react";
import MushroomSpot from "./MushroomSpot";
import woodImg from "../assets/wood_000.png";

const initialSpots = [
  { id: 1, x: 50, y: 80, hasMushroom: false },
  { id: 2, x: 150, y: 120, hasMushroom: false },
  // ...可依需求增加
];

const WoodLog = () => {
  const [spots] = useState(initialSpots);

  // 這裡可以加上生長、採收等邏輯

return (
  <div style={{
    position: "relative",
    width: "80vw",      // 例如佔螢幕 80% 寬
    maxWidth: 800,      // 最大寬度限制
    height: "30vw",     // 高度可用比例，或用固定像素
    maxHeight: 300,
    minWidth: 300,
    minHeight: 100,
  }}>
    <img src={woodImg} alt="原木" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    {spots.map((spot) => (
      <MushroomSpot
        key={spot.id}
        x={spot.x}
        y={spot.y}
        hasMushroom={spot.hasMushroom}
      />
    ))}
  </div>
);
};

export default WoodLog;