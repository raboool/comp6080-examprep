import { useState, useEffect } from 'react';

const strs = [
  'the fat cats',
  'larger frogs',
  'banana cakes',
  'unsw vs usyd',
  'french toast',
  'hawaii pizza',
  'barack obama',
];

export default function Blanko() {
  const [currentString, setCurrentString] = useState('');
  const [blankedPositions, setBlankedPositions] = useState([]);
  const [inputs, setInputs] = useState({});

  const initializeGame = () => {
    // Pick a random string
    const randomStr = strs[Math.floor(Math.random() * strs.length)];
    setCurrentString(randomStr);

    // Find all non-space character positions
    const nonSpacePositions = [];
    for (let i = 0; i < randomStr.length; i++) {
      if (randomStr[i] !== ' ') {
        nonSpacePositions.push(i);
      }
    }

    // Randomly pick 3 positions to blank out
    const shuffled = [...nonSpacePositions].sort(() => Math.random() - 0.5);
    const blanked = shuffled.slice(0, 3).sort((a, b) => a - b);
    setBlankedPositions(blanked);

    // Reset inputs
    const newInputs = {};
    blanked.forEach(pos => {
      newInputs[pos] = '';
    });
    setInputs(newInputs);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleInputChange = (position, value) => {
    if (value.length <= 1) {
      const newInputs = { ...inputs, [position]: value };
      setInputs(newInputs);

      // Check if all inputs are filled
      const allFilled = blankedPositions.every(pos => newInputs[pos].length === 1);
      
      if (allFilled) {
        // Check if all are correct
        const allCorrect = blankedPositions.every(
          pos => newInputs[pos].toLowerCase() === currentString[pos].toLowerCase()
        );

        if (allCorrect) {
          alert('Correct!');
          let gamesWon = parseInt(localStorage.getItem("gamesWon") || "0");
          gamesWon++;
          localStorage.setItem("gamesWon", gamesWon.toString());
          initializeGame();
        }
      }
    }
  };

  const renderBox = (index) => {
    const char = currentString[index];
    const isBlank = blankedPositions.includes(index);
    const isSpace = char === ' ';

    if (isSpace) {
      return (
        <div key={index} className="w-12 h-12 flex items-center justify-center">
          <span className="text-2xl font-mono text-transparent select-none">_</span>
        </div>
      );
    }

    if (isBlank) {
      return (
        <div key={index} className="w-12 h-12 flex items-center justify-center">
          <input
            type="text"
            maxLength={1}
            value={inputs[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-full h-full border-2 border-blue-500 rounded text-center text-2xl font-mono uppercase focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-300"
            autoComplete="off"
          />
        </div>
      );
    }

    return (
      <div key={index} className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center bg-gray-50">
        <span className="text-2xl font-mono uppercase">{char}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-4xl">
          {currentString.split('').map((_, index) => renderBox(index))}
        </div>

        <button
          onClick={initializeGame}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Reset Game
        </button>
      </main>
    </div>
  );
}