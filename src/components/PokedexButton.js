// components/PokedexButton.js
import React from 'react';
import './PokedexButton.css'; // 或使用 styled-components

const PokedexButton = () => (
  <button className="pokedex-button">
    <img src="/icons/pokedex.svg" alt="圖鑑" />
    圖鑑
  </button>
);

export default PokedexButton;
