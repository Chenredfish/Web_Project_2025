import React, { useEffect, useState } from 'react';

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

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 40px)',
  gridTemplateRows: 'repeat(4, 40px)',
  gap: 10,
  pointerEvents: 'auto',
};

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

function getRandomCharacter(characters) {
  const totalWeight = characters.reduce((sum, char) => sum + char.rarity, 0);
  let rand = Math.random() * totalWeight;

  for (const char of characters) {
    if (rand < char.rarity) return char;
    rand -= char.rarity;
  }

  return characters[0]; // fallback
}

const MushroomSpot = ({ onCollect = () => {} }) => {
  const [characters, setCharacters] = useState([]);
  const [mushroomGrid, setMushroomGrid] = useState(Array(20).fill(null));

  useEffect(() => {
    // 載入角色資料
    fetch('/characters.json')
      .then(res => res.json())
      .then(data => setCharacters(data))
      .catch(err => console.error('載入 characters.json 失敗:', err));
  }, []);

  useEffect(() => {
    if (characters.length === 0) return;

    const interval = setInterval(() => {
      const emptyIndexes = mushroomGrid
        .map((item, index) => (item === null ? index : null))
        .filter(i => i !== null);

      if (emptyIndexes.length === 0) return;

      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const newMushroom = getRandomCharacter(characters);

      setMushroomGrid(prev => {
        const newGrid = [...prev];
        newGrid[randomIndex] = newMushroom;
        return newGrid;
      });
    }, 60); // 每 1 分鐘生成一次

    return () => clearInterval(interval);
  }, [characters, mushroomGrid]);

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
