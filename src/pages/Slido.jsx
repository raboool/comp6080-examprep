import React, { useState, useEffect, useRef } from 'react';

const Slido = () => {
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const gridRef = useRef(null);

  // Generate initial puzzle state
  const initializePuzzle = () => {
    // Create array with positions 0-7 for tiles and 8 for empty
    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    // Shuffle until we get a solvable configuration that's not already solved
    let shuffled;
    let emptyPos;
    do {
      shuffled = [...positions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      emptyPos = shuffled.indexOf(8);
    } while (!isSolvable(shuffled) || isSolvedState(shuffled));
    
    setTiles(shuffled);
    setEmptyIndex(emptyPos);
    setIsSolved(false);
  };

  // Check if puzzle configuration is solvable
  const isSolvable = (arr) => {
    let inversions = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  };

  // Check if puzzle is in solved state
  const isSolvedState = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i) return false;
    }
    return true;
  };

  // Initialize on mount
  useEffect(() => {
    initializePuzzle();
  }, []);

  // Get adjacent tiles to empty space
  const getAdjacentIndices = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const adjacent = [];

    if (row > 0) adjacent.push(index - 3); // up
    if (row < 2) adjacent.push(index + 3); // down
    if (col > 0) adjacent.push(index - 1); // left
    if (col < 2) adjacent.push(index + 1); // right

    return adjacent;
  };

  // Move tile to empty space
  const moveTile = (index) => {
    if (isSolved) return;
    
    const adjacentIndices = getAdjacentIndices(emptyIndex);
    if (!adjacentIndices.includes(index)) return;

    const newTiles = [...tiles];
    [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
    
    setTiles(newTiles);
    setEmptyIndex(index);

    // Check if solved
    if (isSolvedState(newTiles)) {
      setIsSolved(true);
      setTimeout(() => {
        alert('Correct!');
        initializePuzzle();
      }, 100);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSolved || !gridRef.current?.contains(document.activeElement)) return;

      const row = Math.floor(emptyIndex / 3);
      const col = emptyIndex % 3;

      let targetIndex = -1;

      switch (e.key) {
        case 'ArrowUp':
          if (row < 2) targetIndex = emptyIndex + 3;
          break;
        case 'ArrowDown':
          if (row > 0) targetIndex = emptyIndex - 3;
          break;
        case 'ArrowLeft':
          if (col < 2) targetIndex = emptyIndex + 1;
          break;
        case 'ArrowRight':
          if (col > 0) targetIndex = emptyIndex - 1;
          break;
        default:
          return;
      }

      if (targetIndex >= 0 && targetIndex < 9) {
        e.preventDefault();
        moveTile(targetIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emptyIndex, isSolved]);

  // Solve puzzle automatically
  const solvePuzzle = () => {
    const solvedTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    setTiles(solvedTiles);
    setEmptyIndex(8);
    setIsSolved(true);
  };

  // Reset puzzle
  const resetPuzzle = () => {
    initializePuzzle();
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="flex flex-col items-center justify-center min-h-screen py-12">
        <div
          ref={gridRef}
          tabIndex={0}
          className="grid grid-cols-3 gap-0 mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
          style={{ width: '450px', height: '450px' }}
        >
          {tiles.map((tile, index) => (
            <div
              key={index}
              onClick={() => moveTile(index)}
              className={`relative ${
                tile === 8 ? 'bg-gray-200' : 'cursor-pointer hover:opacity-80'
              }`}
              style={{
                width: '150px',
                height: '150px',
                border: '1px solid #333',
                margin: '0px',
              }}
            >
              {tile !== 8 && (
                <div
                  className="w-full h-full bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://raw.githubusercontent.com/COMP6080/24T3-assets/main/ass2/shrek_${tile}.jpg)`,
                    backgroundSize: '100% 100%',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-8 w-96">
          <button
            onClick={solvePuzzle}
            disabled={isSolved}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Solve
          </button>
          <button
            onClick={resetPuzzle}
            disabled={!isSolved}
            className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Reset
          </button>
        </div>
      </main>

    </div>
  );
};

export default Slido;