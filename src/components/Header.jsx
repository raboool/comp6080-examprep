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

  // fixed = position: fixed
  // bg-#eeeeee = background colour of #eeeeee
  // h-[80px] = height of 80px
  // w-full = width that spans viewport
  // flex = makes it so items appear in the line
  // items-center = centers the text to the middle of the navbar
  // justify-between = makes it so theres an equal distance between each part  
  return (
    <header className="fixed w-full h-[80px] bg-[#eeeeee] flex items-center justify-between">
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