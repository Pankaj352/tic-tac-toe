
import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Info from './components/Info';

function App() {
  const [reset, setReset]=useState(false);
  const [winner, setWinner]=useState("");

  const resetBoard=()=>{
    setReset(!reset);
  }
  return (
    <div className="App">
        <div className={`winner ${winner !=="" ? "":"shrink"}`}>
      <div className="winner-text">{winner}</div>

        <button onClick={()=>resetBoard()}>Reset Board</button>
      </div>
      <Board reset={reset} setReset={setReset} winner={winner} setWinner={setWinner} />
      <Info />
    </div>
  );
}

export default App;
