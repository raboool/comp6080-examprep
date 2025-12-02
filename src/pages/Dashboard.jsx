import { useState } from 'react';

function Dashboard() {
  const [gamesWon, setGamesWon] = useState(0);

  // Handle reset button
  const handleReset = async () => {
    const initialScore = 0;
    setGamesWon(initialScore);
    localStorage.setItem('gamesWon', initialScore.toString());
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <p className="text-[2em] text-red-600 mb-4">
        Please choose an option from the navbar.
      </p>
      <p className="text-xl">
        Games won: {gamesWon}{' '}
        <button 
          onClick={handleReset}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          (reset)
        </button>
      </p>
    </main>
  );
}

export default Dashboard;