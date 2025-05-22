import React from 'react';

const buttonStyle = {
  backgroundColor: '#76aeb2',
  borderRadius: '50%',
  width: 60,
  height: 60,
  color: 'black',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
  fontSize: 16,
};

const PokedexButton = ({ onClick }) => {
  return (
    <div style={buttonStyle} onClick={onClick}>
      圖鑑
    </div>
  );
};

export default PokedexButton;
