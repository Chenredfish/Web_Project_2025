import WoodLog from './components/WoodLog';
import PokedexButton from './components/PokedexButton';
import LevelDisplay from './components/LevelDisplay';
import Pokedex from './components/Pokedex';

import './App.css';

function App() {

  const [isPokedexOpen, setIsPokedexOpen] = useState(false);

  const togglePokedex = () => {
    setIsPokedexOpen(prev => !prev);
  };

  const mushroomData = [
    { name: '一般菇菇', count: 3 },
    { name: '哭泣菇菇', count: 5 },
    // ...其他資料
  ];

  return (
    <div className="App">
      <WoodLog />
      <PokedexButton />
      <LevelDisplay level={5} progress={60} />
      <button onClick={togglePokedex}>圖鑑</button>
      <Pokedex isOpen={isPokedexOpen} onClose={togglePokedex} data={mushroomData} />
    </div>

  );

}

export default App;
