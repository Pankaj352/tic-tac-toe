import React, { useState, useEffect, useRef } from 'react';
import './board.css';

const Board = ({ reset, setReset, winner, setWinner }) => {
  const [turn, setTurn] = useState(0);
  const [data, setData] = useState(Array(9).fill(''));
  const boardRef = useRef(null);

  const draw = (event, index) => {
    if (data[index - 1] === '' && winner === '') {
      const current = turn === 0? 'X' : 'O';
      setData((prevData) => [...prevData.slice(0, index - 1), current,...prevData.slice(index)]);
      event.target.innerText = current;
      setTurn((prevTurn) => prevTurn === 0? 1 : 0);
    }
  };

  useEffect(() => {
    setData(Array(9).fill(''));
    const cells = boardRef.current.children;
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = '';
    }
    setTurn(0);
    setWinner('');
    setReset(false);
  }, [reset, setReset, setWinner]);

  useEffect(() => {
    const checkWin = () => {
      const checkRow = () => {
        for (let i = 0; i < 7; i += 3) {
          if (data[i]!== '' && data[i] === data[i + 1] && data[i] === data[i + 2]) return true;
        }
        return false;
      };

      const checkCol = () => {
        for (let i = 0; i < 3; i++) {
          if (data[i]!== '' && data[i] === data[i + 3] && data[i] === data[i + 6]) return true;
        }
        return false;
      };

      const checkDiagonal = () => {
        if (data[0]!== '' && data[0] === data[4] && data[0] === data[8]) return true;
        if (data[2]!== '' && data[2] === data[4] && data[2] === data[6]) return true;
        return false;
      };

      return checkRow() || checkCol() || checkDiagonal();
    };

    const checkTie = () => {
      return data.every((cell) => cell!== '');
    };

    if (checkWin()) {
      setWinner(turn === 0? 'Player 2 wins!' : 'Player 1 wins!');
    } else if (checkTie()) {
      setWinner('It\'s a Tie');
    }
  });

  return (
    <div ref={boardRef} className="board">
      {Array(9)
       .fill(null)
       .map((_, index) => (
          <div key={index} className={`input input-${index + 1}`} onClick={(e) => draw(e, index + 1)}></div>
        ))}
    </div>
  );
};

export default Board;