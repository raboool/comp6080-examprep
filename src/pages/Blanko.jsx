import { useState, useEffect } from 'react';

// Array of possible strings that can be used in the game
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
  // State to store the currently selected string for this round
  const [currentString, setCurrentString] = useState('');
  
  // State to store array of indices where characters are blanked out (hidden from user)
  const [blankedPositions, setBlankedPositions] = useState([]);
  
  // State to store user's input for each blanked position
  // Format: { position_index: 'user_typed_character' }
  const [inputs, setInputs] = useState({});

  // Function to set up a new game round
  const initializeGame = () => {
    // Pick a random string from the strs array
    const randomStr = strs[Math.floor(Math.random() * strs.length)];
    setCurrentString(randomStr);

    // Build an array of all character positions that are NOT spaces
    const nonSpacePositions = [];
    for (let i = 0; i < randomStr.length; i++) {
      if (randomStr[i] !== ' ') {
        nonSpacePositions.push(i);
      }
    }

    // Randomly shuffle the non-space positions and pick the first 3
    // Then sort them in ascending order for display consistency
    const shuffled = [...nonSpacePositions].sort(() => Math.random() - 0.5);
    const blanked = shuffled.slice(0, 3).sort((a, b) => a - b);
    setBlankedPositions(blanked);

    // Initialize the inputs object with empty strings for each blanked position
    const newInputs = {};
    blanked.forEach(pos => {
      newInputs[pos] = '';
    });
    setInputs(newInputs);
  };

  // useEffect hook that runs once when component first mounts
  // This starts the first game automatically
  useEffect(() => {
    initializeGame();
  }, []); // Empty dependency array means this only runs once on mount

  // Function called whenever user types in an input box
  const handleInputChange = (position, value) => {
    // Only allow single character input
    if (value.length <= 1) {
      // Create new inputs object with the updated value
      const newInputs = { ...inputs, [position]: value };
      setInputs(newInputs);

      // Check if all blanked positions now have a character typed
      const allFilled = blankedPositions.every(pos => newInputs[pos].length === 1);
      
      // If all inputs are filled, check if they're correct
      if (allFilled) {
        // Compare each user input to the actual character (case-insensitive)
        const allCorrect = blankedPositions.every(
          pos => newInputs[pos].toLowerCase() === currentString[pos].toLowerCase()
        );

        // If all answers are correct, show success and start new round
        if (allCorrect) {
          alert('Correct!');
          // Increment games won counter in localStorage
          let gamesWon = parseInt(localStorage.getItem("gamesWon") || "0");
          gamesWon++;
          localStorage.setItem("gamesWon", gamesWon.toString());
          // Start a new game
          initializeGame();
        }
      }
    }
  };

  // Function to render each character position as either a box or input
  const renderBox = (index) => {
    const char = currentString[index]; // Get the character at this position
    const isBlank = blankedPositions.includes(index); // Is this position blanked out?
    const isSpace = char === ' '; // Is this character a space?

    // If it's a space, render an invisible placeholder to maintain spacing
    if (isSpace) {
      return (
        <div key={index} className="w-12 h-12 flex items-center justify-center">
          {/* Transparent underscore just for spacing, not visible to user */}
          <span className="text-2xl font-mono text-transparent select-none">_</span>
        </div>
      );
    }

    // If this position is blanked, render an input box for user to fill
    if (isBlank) {
      return (
        <div key={index} className="w-12 h-12 flex items-center justify-center">
          <input
            type="text"
            maxLength={1} // Only allow 1 character
            value={inputs[index] || ''} // Get current value from inputs state
            onChange={(e) => handleInputChange(index, e.target.value)} // Update on change
            className="w-full h-full border-2 border-blue-500 rounded text-center text-2xl font-mono uppercase focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-300"
            autoComplete="off" // Disable browser autocomplete
          />
        </div>
      );
    }

    // If it's not a space or blank, render the visible character in a box
    return (
      <div key={index} className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center bg-gray-50">
        <span className="text-2xl font-mono uppercase">{char}</span>
      </div>
    );
  };

  // Main component render
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Container for all character boxes - wraps on smaller screens */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-4xl">
          {/* Split the current string into individual characters and render each */}
          {currentString.split('').map((_, index) => renderBox(index))}
        </div>

        {/* Button to manually reset/start a new game */}
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