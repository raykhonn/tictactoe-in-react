import React, { useState } from 'react';
import 'assets/App.css'; // Make sure to include your styles

const TicTacToe: React.FC = () => {
  const [options, setOptions] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [running, setRunning] = useState<boolean>(true);

  const windConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const cellClicked = (index: number): void => {
    if (options[index] !== '' || !running) {
      return;
    }
    updateCell(index);
    checkWinner();
  };

  const updateCell = (index: number): void => {
    const newOptions = [...options];
    newOptions[index] = currentPlayer;
    setOptions(newOptions);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (): void => {
    let roundWon = false;

    for (let i = 0; i < windConditions.length; i++) {
      const condition = windConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA === '' || cellB === '' || cellC === '') {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      alert(`${currentPlayer} wins!`);
      setRunning(false);
    } else if (!options.includes('')) {
      alert('Draw!');
      setRunning(false);
    }
  };

  const restartGame = (): void => {
    setCurrentPlayer('X');
    setOptions(Array(9).fill(''));
    setRunning(true);
  };

  return (
    <div id="gameContainer">
      <h1>TiC TAC TOE</h1>
      <div id="cellContainer">
        {options.map((value, index) => (
          <div key={index} onClick={() => cellClicked(index)} className="cell">
            {value}
          </div>
        ))}
      </div>
      <h2 id="statusText">{`${currentPlayer}'s turn`}</h2>
      <button id="restartBtn" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;
