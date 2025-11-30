import { useState, useEffect } from 'react';

function Header() {
  const [isWideViewport, setIsWideViewport] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setIsWideViewport(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-20 bg-[#eeeeee] flex items-center justify-between px-4 z-50">
        {/* Logo */}
        <img
          src="https://www.flaticon.com/free-icon/turtle_4971915"
          alt="Logo" 
          className="w-[50px] h-[50px] m-[15px]"
        />
        
        {/* Navigation */}
        <nav className="mr-4">
          {isWideViewport ? (
            <div className="text-base">
              <a href="/" className="hover:underline">Home</a>
              <span> | </span>
              <a href="/blanko" className="hover:underline">Blanko</a>
              <span> | </span>
              <a href="/slido" className="hover:underline">Slido</a>
              <span> | </span>
              <a href="/tetro" className="hover:underline">Tetro</a>
            </div>
          ) : (
            <div className="text-base">
              <a href="/" className="hover:underline">H</a>
              <span> | </span>
              <a href="/blanko" className="hover:underline">B</a>
              <span> | </span>
              <a href="/slido" className="hover:underline">S</a>
              <span> | </span>
              <a href="/tetro" className="hover:underline">T</a>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;