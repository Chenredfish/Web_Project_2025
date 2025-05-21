// src/components/Pokedex.js
import React from 'react';
import './Pokedex.css';

const Pokedex = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="pokedex-wrapper">
      <div className="pokedex-header">
        <button className="circle-button" onClick={onClose}>圖鑑</button>
        <h2>收集到的菇菇總數:</h2>
      </div>
      <div className="pokedex-grid">
        {data.map((item, index) => (
          <div className="pokedex-item" key={index}>
            <div className="item-img" />
            <div className="item-label">名稱: {item.name}</div>
            <div className="item-label">總數: {item.count}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <span>1</span>
        <span className="arrow">→</span>
      </div>
    </div>
  );
};

export default Pokedex;
