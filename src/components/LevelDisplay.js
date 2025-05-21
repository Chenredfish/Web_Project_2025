// components/LevelDisplay.js
import React from 'react';
import './LevelDisplay.css';

const LevelDisplay = ({ level, progress }) => (
  <div className="level-display">
    <span className="level-text">Lv. {level}</span>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default LevelDisplay;
