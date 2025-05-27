// src/components/MushroomSpot.js
import React, { useEffect, useState } from 'react';

// 格子外層定位樣式（絕對位置 + 置中）
const gridWrapperStyle = {
  position: 'absolute',
  bottom: 85,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 300,
  height: 160,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
};

// 菇菇格子排列樣式（5x4）
const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 40px)',
  gridTemplateRows: 'repeat(4, 40px)',
  gap: 10,
  pointerEvents: 'auto',
};

// 每個格子的樣式
const cellStyle = {
  width: 40,
  height: 40,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

// 根據稀有度機率抽角色
function getRandomCharacter(characters) {
  const totalWeight = characters.reduce((sum, char) => sum + char.rarity, 0);
  let rand = Math.random() * totalWeight;
  for (const char of characters) {
    if (rand < char.rarity) return char;
    rand -= char.rarity;
  }
  return characters[0]; // fallback
}

const MushroomSpot = ({ characters = [], onCollect = () => {} }) => {
  const [mushroomGrid, setMushroomGrid] = useState(Array(20).fill(null));

  // 每 60 秒嘗試隨機長出一朵香菇
  useEffect(() => {
    if (characters.length === 0) return;

    const interval = setInterval(() => {
      const emptyIndexes = mushroomGrid
        .map((m, i) => (m === null ? i : null))
        .filter(i => i !== null);

      if (emptyIndexes.length === 0) return;

      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const newMushroom = getRandomCharacter(characters);

      setMushroomGrid(prev => {
        const newGrid = [...prev];
        newGrid[randomIndex] = newMushroom;
        return newGrid;
      });
    }, 6000); // 1 分鐘 = 60000ms

    return () => clearInterval(interval);
  }, [characters, mushroomGrid]);

  // 點擊格子時，觸發收集
  const handleClick = (index) => {
    const mushroom = mushroomGrid[index];
    if (mushroom) {
      onCollect(index, mushroom);
      setMushroomGrid(prev => {
        const newGrid = [...prev];
        newGrid[index] = null;
        return newGrid;
      });
    }
  };

  return (
    <div style={gridWrapperStyle}>
      <div style={gridContainerStyle}>
        {mushroomGrid.map((mushroom, index) => (
          <div
            key={index}
            style={{
              ...cellStyle,
              backgroundImage: mushroom ? `url(${mushroom.image})` : 'none',
            }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MushroomSpot;
