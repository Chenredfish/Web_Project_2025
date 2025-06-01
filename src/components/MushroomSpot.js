// src/components/MushroomSpot.js
import React, { useEffect, useState, useRef } from 'react';

// 格子外層定位樣式（覆蓋在木頭上，百分比寬高，能點擊）
const gridWrapperStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 2,
  pointerEvents: 'auto', // 允許點擊
};


// 每個格子的樣式（更大，間距更寬，適合大木頭）
const cellStyle = {
  width: 120,
  height: 120,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  overflow: 'hidden',
  padding: 0,
  margin: 0,
};

// 內層圖片樣式，放大2倍寬，只顯示右半邊
const imageStyle = {
  width: '240px', // 2倍寬
  height: '120px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  position: 'absolute',
  left: '-120px', // 只顯示右半邊
  top: 0,
};

// 以木頭中央為基準，x/y 為 -6~+6 之間的百分比偏移
// 上下距離多4，左右距離多12（更寬更大，適合大木頭）
const cellPositions = [
  // 右上新排 (y: -36)
  { x:  4,  y: -36 },
  { x: 16,  y: -36 },
  { x: 28,  y: -36 },
  { x: 40,  y: -36 },

  // 上排 (y: -24)
  { x: -44, y: -24 },
  { x: -32, y: -24 },
  { x: -20, y: -24 },
  { x:  -8, y: -24 },
  { x:   4, y: -24 },
  { x:  16, y: -24 },
  { x:  28, y: -24 },
  { x:  40, y: -24 },

  // 次上排 (y: -12)
  { x: -44, y: -12 },
  { x: -32, y: -12 },
  { x: -20, y: -12 },
  { x:  -8, y: -12 },
  { x:   4, y: -12 },
  { x:  16, y: -12 },
  { x:  28, y: -12 },
  { x:  40, y: -12 },

  // 中排 (y: 0)
  { x: -44, y:   0 },
  { x: -32, y:   0 },
  { x: -20, y:   0 },
  { x:  -8, y:   0 },
  { x:   4, y:   0 },
  { x:  16, y:   0 },
  { x:  28, y:   0 },
  { x:  40, y:   0 },

  // 次下排 (y: 12)
  { x: -44, y:  12 },
  { x: -32, y:  12 },
  { x: -20, y:  12 },
  { x:  -8, y:  12 },
  { x:   4, y:  12 },
  { x:  16, y:  12 },

  // 下排 (y: 24)
  { x: -44, y:  24 },
  { x: -32, y:  24 },
  { x: -20, y:  24 },
  { x:  -8, y:  24 },
];

// 根據稀有度機率抽角色
const starMap = {
  "★☆☆☆☆": 1,
  "★★☆☆☆": 2,
  "★★★☆☆": 3,
  "★★★★☆": 4,
  "★★★★★": 5,
};

// 根據等級限制最大星數
function getMaxStarsByLevel(level) {
  if (level >= 20) return 5;
  if (level >= 15) return 4;
  if (level >= 10) return 3;
  if (level >= 5) return 2;
  return 1;
}

// 角色抽卡邏輯，根據等級限制稀有度
function getRandomCharacter(characters, level) {
  const maxStars = getMaxStarsByLevel(level);
  console.log('level:', level, 'maxStars:', maxStars);

  const available = characters.filter(char => {
    const star = starMap[char.rare];
    return star <= maxStars && char.rarity > 0;
  });

  console.log('available characters:', available.map(c => c.name));

  if (available.length === 0) {
    console.warn('No available characters for this level:', level);
    return null; // 或回傳一個 fallback
  }

  const totalWeight = available.reduce((sum, char) => sum + char.rarity, 0);
  let rand = Math.random() * totalWeight;
  for (const char of available) {
    if (rand < char.rarity) return char;
    rand -= char.rarity;
  }
  return available[0]; // fallback
}

const MushroomSpot = ({ characters = [], cryingCharacters = [], onCollect = () => {}, level = 2 }) => {//add
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
      const newMushroom = getRandomCharacter(characters, level );

      const newGrid = [...prev];
      newGrid[randomIndex] = newMushroom;
      spawnTimeRef.current[randomIndex] = Date.now(); // 🔧 FIXED: 時間記錄在生成瞬間
      return newGrid;
    });
  }, 60); // 🔧 FIXED: 每 60000ms 嘗試生成

  return () => clearInterval(interval);
}, [characters,level]); // 🔧 FIXED: 移除 mushroomGrid 依賴




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
              left: `${50 + pos.x}%`,
              top: `${50 + pos.y}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto', // 允許點擊
            }}
            onClick={() => handleClick(index)}
          >
            <div
              style={{
                ...imageStyle,
                backgroundImage: `url(${mushroom.image})`,
                pointerEvents: 'none', // 讓點擊事件落在外層div
              }}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default MushroomSpot;
