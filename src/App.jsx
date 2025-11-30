import { useState, useEffect } from 'react';
import Header from './components/Header';

export default function Layout() {
  const [isWideViewport, setIsWideViewport] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setIsWideViewport(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="m-0">
      {/* Header */}
      <Header />

      {/* Main Body */}
      <main className="pt-20 pb-[50px] min-h-screen">
        <div className="w-full h-full p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Main Body</h1>
          <p className="mb-4">This is the main content area that occupies the space between the header and footer.</p>
          <p className="mb-4">Scroll down to see the footer at the bottom of the page.</p>
          
          {/* Extra content to demonstrate scrolling */}
          <div className="mt-8 space-y-4">
            {[...Array(20)].map((_, i) => (
              <p key={i}>
                Content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full h-[50px] bg-[#999999]">
        <div className="h-full flex items-center justify-center text-white">
          Footer Content
        </div>
      </footer>
    </div>
  );
}