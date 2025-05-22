import React from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: 10,
  left: 10,
};

const levelCircleStyle = {
  backgroundColor: '#76aeb2',
  borderRadius: '50%',
  width: 60,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  fontWeight: 'bold',
  flexDirection: 'column',
  fontSize: 14,
};

const barContainerStyle = {
  width: 120,
  height: 12,
  backgroundColor: '#ddd',
  marginLeft: 10,
  borderRadius: 6,
  overflow: 'hidden',
};

const barFillStyle = (percent) => ({
  width: `${percent}%`,
  height: '100%',
  backgroundColor: '#a5bf37',
});

const LevelDisplay = ({ level = 6, expPercent = 70 }) => {
  return (
    <div style={containerStyle}>
      <div style={levelCircleStyle}>
        <div>等級</div>
        <div>{level}</div>
      </div>
      <div style={barContainerStyle}>
        <div style={barFillStyle(expPercent)} />
      </div>
    </div>
  );
};

export default LevelDisplay;
