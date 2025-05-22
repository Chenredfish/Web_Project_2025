import './App.css';
import React, { useState, useEffect } from 'react';
import WoodLog from './components/WoodLog';
import PokedexButton from './components/PokedexButton';
import LevelDisplay from './components/LevelDisplay';
import Pokedex from './components/Pokedex';
import MushroomSpot from './components/MushroomSpot';


function App() {

  const [showPokedex, setShowPokedex] = useState(false);
  const [page, setPage] = useState(1);
  const [mushrooms, setMushrooms] = useState([
    { name: '哭泣菇菇', count: 2, icon: '🍄' },
    { name: '一般菇菇', count: 1, icon: '🍄' },
     //...你可以自由擴充
  ]);

  const togglePokedex = () => {
    setShowPokedex(!showPokedex);
  };


  return (
    <div className="App">
      <WoodLog />
      <PokedexButton onClick={togglePokedex} />
      <MushroomSpot onCollect={(index) => {
        console.log(`格子 ${index} 被點擊！`);
        // 可改成增加菇菇邏輯
      }} />
      <LevelDisplay level={5} progress={60} />
      {showPokedex && (
        <Pokedex
          mushrooms={mushrooms}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );

  }

export default App;
