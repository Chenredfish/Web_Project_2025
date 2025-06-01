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

const MushroomSpot = ({ characters = [], cryingCharacters = [], onCollect = () => {}, level = 2, spawnInterval = 60000 }) => {//add
  const [mushroomGrid, setMushroomGrid] = useState(Array(50).fill(null));
  const spawnTimeRef = useRef(Array(50).fill(null));//add



  // 狀態: 正在枯萎倒數的 index 與其結束時間
  const [withering, setWithering] = useState(null); // { index, endTime }

  // 生成邏輯: 只要還有空格就繼續長，直到滿格
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
        spawnTimeRef.current[randomIndex] = Date.now();
        return newGrid;
      });
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [characters, level, spawnInterval]);

  // 當格子滿時，開始隨機挑一個菇菇進入枯萎倒數
  useEffect(() => {
    if (!mushroomGrid.every(m => m !== null)) return; // 沒滿不做事
    if (withering !== null) return; // 已經有在倒數

    // 隨機選一個 index
    const idxs = mushroomGrid.map((m, i) => m ? i : null).filter(i => i !== null);
    if (idxs.length === 0) return;
    const randomIdx = idxs[Math.floor(Math.random() * idxs.length)];
    // 設定倒數 100 秒
    setWithering({ index: randomIdx, endTime: Date.now() + 100000 });
  }, [mushroomGrid, withering]);

  // 倒數計時 effect
  useEffect(() => {
    if (!withering) return;
    const timer = setInterval(() => {
      if (Date.now() >= withering.endTime) {
        setMushroomGrid(prev => {
          const newGrid = [...prev];
          // 只處理還沒被收成的
          if (newGrid[withering.index]) {
            const newCry = getRandomCharacter(cryingCharacters);
            newGrid[withering.index] = newCry;
            spawnTimeRef.current[withering.index] = Date.now();
          }
          return newGrid;
        });
        setWithering(null); // 重置，讓下次再選一個
      }
    }, 200);
    return () => clearInterval(timer);
  }, [withering, cryingCharacters]);


  // 點擊格子時，觸發收集
  const handleClick = (index) => {
    const mushroom = mushroomGrid[index];
    if (mushroom) {
      onCollect(index, mushroom);
      setMushroomGrid(prev => {
        const newGrid = [...prev];
        newGrid[index] = null;
        spawnTimeRef.current[index] = null;
        return newGrid;
      });
      // 如果收成的是正在枯萎倒數的那個，重置倒數
      if (withering && withering.index === index) {
        setWithering(null);
      }
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
