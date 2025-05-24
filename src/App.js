import './App.css';
import React, { useEffect, useState } from 'react';
import WoodLog from './components/WoodLog';
import PokedexButton from './components/PokedexButton';
import LevelDisplay from './components/LevelDisplay';
import Pokedex from './components/Pokedex';
import MushroomSpot from './components/MushroomSpot';


function App() {
  const [showPokedex, setShowPokedex] = useState(false);
  const [page, setPage] = useState(1);
  const [mushrooms, setMushrooms] = useState([]);

  useEffect(() => {
    fetch('/characters.json')
      .then((res) => res.json())
      .then((data) => setMushrooms(data));
  }, []);

  return (
    <div className="App">
      <WoodLog />
      <MushroomSpot onCollect={(index) => {
        console.log(`格子 ${index} 被點擊！`);
        // 可改成增加菇菇邏輯
      }} />
      <LevelDisplay level={5} progress={60} />
      <PokedexButton onClick={() => setShowPokedex(!showPokedex)} />
      {showPokedex && (
      <Pokedex mushrooms={mushrooms} page={page} onPageChange={setPage} />
      )}
    </div>
  );

  }

export default App;
