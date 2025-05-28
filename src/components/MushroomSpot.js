// src/components/MushroomSpot.js
import React, { useEffect, useState, useRef } from 'react';

// 格子外層定位樣式（絕對位置 + 置中）
const gridWrapperStyle = {
  position: 'absolute',
  bottom: 85,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 1200,
  height: 500,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  //pointerEvents: 'none',
};


// 每個格子的樣式
const cellStyle = {
  width: 80,
  height: 80,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'absolute', // 這是關鍵：使用絕對座標擺放
};

const cellPositions = [
  { x: 0, y: 0 },
  { x: 400, y: 0 },
  { x: 800, y: 0 },
  { x: 900, y: 0 },
  { x: 1000, y: 0 },
  { x: 1100, y: 0 },
  { x: 1200, y: 0 },
  { x: 0, y: 100 },
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 300, y: 100 },
  { x: 400, y: 100 },
  { x: 500, y: 100 },
  { x: 600, y: 100 },
  { x: 700, y: 100 },
  { x: 800, y: 100 },
  { x: 900, y: 100 },
  { x: 1000, y: 100 },
  { x: 1100, y: 100 },
  { x: 1200, y: 100 },
  { x: 0, y: 200 },
  { x: 100, y: 200 },
  { x: 200, y: 200 },
  { x: 300, y: 200 },
  { x: 400, y: 200 },
  { x: 500, y: 200 },
  { x: 600, y: 200 },
  { x: 700, y: 200 },
  { x: 800, y: 200 },
  { x: 900, y: 200 },
  { x: 1000, y: 200 },
  { x: 1100, y: 200 },
  { x: 1200, y: 200 },
  { x: 0, y: 300 },
  { x: 100, y: 300 },
  { x: 200, y: 300 },
  { x: 300, y: 300 },
  { x: 400, y: 300 },
  { x: 500, y: 300 },
  { x: 600, y: 300 },
  { x: 700, y: 300 },
  { x: 800, y: 300 },
  { x: 900, y: 300 },
  { x: 1000, y: 300 },
];

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

const MushroomSpot = ({ characters = [], cryingCharacters = [], onCollect = () => {} }) => {//add
  const [mushroomGrid, setMushroomGrid] = useState(Array(50).fill(null));
  const spawnTimeRef = useRef(Array(50).fill(null));//add

  // 每 60 秒嘗試隨機長出一朵香菇
/*   useEffect(() => {
    if (characters.length === 0) return;

    const interval = setInterval(() => {
      const emptyIndexes = mushroomGrid
        .map((m, i) => (m === null ? i : null))
        .filter(i => i !== null);

      if (emptyIndexes.length === 0) return;//增加

      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const newMushroom = getRandomCharacter(characters);

      setMushroomGrid(prev => {
        const newGrid = [...prev];
        newGrid[randomIndex] = newMushroom;
        spawnTimeRef.current[randomIndex] = Date.now();//add
        return newGrid;
      });
    }, 600); // 1 分鐘 = 60000ms

    return () => clearInterval(interval);
  },[characters, mushroomGrid]); */

  useEffect(() => {
  if (characters.length === 0) return;

  const interval = setInterval(() => {
    setMushroomGrid(prev => {
      const emptyIndexes = prev
        .map((m, i) => (m === null ? i : null))
        .filter(i => i !== null);

      if (emptyIndexes.length === 0) return prev;

      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const newMushroom = getRandomCharacter(characters);

      const newGrid = [...prev];
      newGrid[randomIndex] = newMushroom;
      spawnTimeRef.current[randomIndex] = Date.now(); // 🔧 FIXED: 時間記錄在生成瞬間
      return newGrid;
    });
  }, 60000); // 🔧 FIXED: 每 60000ms 嘗試生成

  return () => clearInterval(interval);
}, [characters]); // 🔧 FIXED: 移除 mushroomGrid 依賴




    // 替換超過100000ms的香菇為哭哭香菇
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setMushroomGrid(prev => {
        const newGrid = [...prev];
        for (let i = 0; i < newGrid.length; i++) {
          const spawnTime = spawnTimeRef.current[i];
          if (newGrid[i] && spawnTime && (now - spawnTime > 100000)) {
            const newCry = getRandomCharacter(cryingCharacters);
            newGrid[i] = newCry;
            spawnTimeRef.current[i] = now; // reset time after replacing
          }
        }
        return newGrid;
      });
    }, 500); // 每 0.5 秒檢查一次

    return () => clearInterval(interval);
  }, [cryingCharacters]);


  // 點擊格子時，觸發收集
  const handleClick = (index) => {
    const mushroom = mushroomGrid[index];
    if (mushroom) {
      onCollect(index, mushroom);
      setMushroomGrid(prev => {
        const newGrid = [...prev];
        newGrid[index] = null;//add
        spawnTimeRef.current[index] = null;//add
        return newGrid;
      });
    }
  };

  return (
    <div style={gridWrapperStyle}>
      {mushroomGrid.map((mushroom, index) => {
        const pos = cellPositions[index];
        return mushroom && pos ? (
          <div
            key={index}
            style={{
              ...cellStyle,
              left: pos.x,
              top: pos.y,
              backgroundImage: `url(${mushroom.image})`,
            }}
            onClick={() => handleClick(index)}
          />
        ) : null;
      })}
    </div>
  );
};

export default MushroomSpot;
