import WoodLog from './components/WoodLog';
import PokedexButton from './components/PokedexButton';
import LevelDisplay from './components/LevelDisplay';


import './App.css';

function App() {
  return (
    <div className="App">
      <WoodLog />
      <PokedexButton />
      <LevelDisplay level={5} progress={60} />
    </div>
  );
}

export default App;
