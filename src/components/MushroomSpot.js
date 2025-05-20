// src/components/MushroomSpot.js
import React from "react";
import mushroomImg from "../assets/imagine/nmk_s000.png"; // 根據實際路徑調整

const MushroomSpot = ({ x, y, hasMushroom }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "2px solid #888",
      cursor: "pointer",
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {hasMushroom && (
      <img
        src={mushroomImg}
        alt="mushroom"
        style={{ width: "32px", height: "40px", objectFit: "contain" }}
      />
    )}
  </div>
);

export default MushroomSpot;