import React, { useEffect, useState } from 'react';
import './App.css';
import WoodLog from './components/WoodLog';
import PokedexButton from './components/PokedexButton';
import LevelDisplay from './components/LevelDisplay';
import Pokedex from './components/Pokedex';
import MushroomSpot from './components/MushroomSpot';
import Background from './components/Background';

function App() {
  const [characters, setCharacters] = useState([]);
  const [cryingCharacters, setCrying] = useState([]);//add
  const [collectedData, setCollectedData] = useState({});
  const [exp, setExp] = useState(0);
  const [showPokedex, setShowPokedex] = useState(false);
  const [page, setPage] = useState(1);

  //每個等級需要的累積經驗公式（首項 200，每級 +200）
  const getExpForLevel = (lvl) => {
    if (lvl <= 1) return 0;
    const n = lvl - 1;
    return (n * (200 + (200 + (n - 1) * 200))) / 2;
  };

  //根據目前總經驗值，計算等級與進度條百分比
  const calculateLevelAndExp = (exp) => {
    let level = 1;
    while (exp >= getExpForLevel(level + 1)) {
      level++;
    }

    const currentExp = getExpForLevel(level);
    const nextExp = getExpForLevel(level + 1);
    const expPercent = ((exp - currentExp) / (nextExp - currentExp)) * 100;

    return { level, expPercent: Math.floor(expPercent) };
  };

  //載入 characters.json（從 public 資料夾）
  useEffect(() => {
    fetch('/characters.json')
      .then(res => res.json())
      .then(data => setCharacters(data))
      .catch(err => console.error('載入 characters.json 失敗:', err));
  }, []);

  useEffect(() => {
    fetch('/crying.json')
      .then(res => res.json())
      .then(data => setCrying(data))
      .catch(err => console.error('載入 crying.json 失敗:', err));
  }, []);

  //收集香菇時，更新圖鑑數量與經驗
  const handleCollect = (index, mushroom) => {
    console.log(`收集第 ${index + 1} 格的 ${mushroom.name}`);
    setCollectedData(prev => {
      const updated = { ...prev };
      const id = mushroom.id;
      if (!updated[id]) {
        updated[id] = { ...mushroom, count: 1 };
      } else {
        updated[id].count += 1.5 ;
        updated[id].count -= 1 ;
      }
      return updated;
    });
    setExp(prev => prev + (mushroom.NP || 0));
    console.log(`增加經驗: ${setExp}`); // 增加經驗
  };

  //將每個角色與對應收集數量整合，傳給 Pokedex 顯示
  const enrichedMushrooms = characters.map(char => ({
    ...char,
    count: collectedData[char.id]?.count || 0,
  }));

  const totalCollected = Object.values(collectedData).reduce((sum, item) => sum + item.count, 0);

  //取得目前等級與百分比
  const { level, expPercent } = calculateLevelAndExp(exp);

  return (
    <div className="App">
      <WoodLog />
      <Background />
      <MushroomSpot characters={characters} cryingCharacters={cryingCharacters} onCollect={handleCollect} level = {level}/> 
      <LevelDisplay level={level} expPercent={expPercent} />
      <PokedexButton onClick={() => setShowPokedex(!showPokedex)} />
      {showPokedex && (
        <Pokedex
          mushrooms={enrichedMushrooms}
          page={page}
          onPageChange={setPage}
          totalCollected={totalCollected}
        />
      )}
    </div>
  );
}

export default App;
