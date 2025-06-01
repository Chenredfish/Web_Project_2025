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
    width: "100vw",      // 佔滿整個視窗寬度
    height: "80vw",      // 高度可用比例
    maxHeight: 800,
    minHeight: 100,
    zIndex: 1,
    overflow: "hidden",
  }}>
    <img
      src={woodImg}
      alt="原木"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        left: 0,
        top: 0,
      }}
    />
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