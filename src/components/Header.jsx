import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

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
    <header className="fixed top-0 left-0 w-full h-20 bg-[#eeeeee] flex items-center justify-between px-4 z-50">
    {/* Logo */}
    <img
        src={logo}
        alt="Logo" 
        className="w-[50px] h-[50px] m-[15px]"
    />
    
    {/* Navigation */}
    <nav className="mr-4">
        {isWideViewport ? (
        <div className="text-base">
            <a href="/">Home</a>
            <span> | </span>
            <a href="/blanko">Blanko</a>
            <span> | </span>
            <a href="/slido">Slido</a>
            <span> | </span>
            <a href="/tetro">Tetro</a>
        </div>
        ) : (
        <div className="text-base">
            <a href="/">H</a>
            <span> | </span>
            <a href="/blanko">B</a>
            <span> | </span>
            <a href="/slido">S</a>
            <span> | </span>
            <a href="/tetro">T</a>
        </div>
        )}
    </nav>
    </header>
  );
}

export default Header;