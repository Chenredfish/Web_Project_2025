import React from 'react';

const gridWrapperStyle = {
  position: 'absolute',
  bottom: 85, // 根據樹幹的位置進行微調
  left: '50%',
  transform: 'translateX(-50%)',
  width: 300,  // 根據樹幹的寬度調整
  height: 160, // 根據樹幹的高度調整
  overflow: 'hidden', // 限制格子不要超出範圍
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none' // 容器不吃事件，格子吃
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 40px)',
  gridTemplateRows: 'repeat(4, 40px)',
  gap: 10,
  pointerEvents: 'auto' // 子項目可點擊
};

const cellStyle = {
  width: 40,
  height: 40,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const MushroomSpot = ({ onCollect = () => {} }) => {
  return (
    <div style={gridWrapperStyle}>
      <div style={gridContainerStyle}>
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            style={cellStyle}
            onClick={() => onCollect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MushroomSpot;
