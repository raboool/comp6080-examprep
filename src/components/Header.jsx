import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

function Header() {
  // STATE MANAGEMENT
  // Track whether viewport is wider than 800px to show full nav labels vs single letters
  // Initial value checks window width on component mount
  const [isWideViewport, setIsWideViewport] = useState(window.innerWidth > 800);

  // RESIZE LISTENER EFFECT
  // Set up event listener to track window resizing
  useEffect(() => {
    // Handler function that updates state when window is resized
    const handleResize = () => {
      setIsWideViewport(window.innerWidth > 800);
    };

    // Add the resize event listener when component mounts
    window.addEventListener('resize', handleResize);
    
    // Cleanup function: remove event listener when component unmounts
    // This prevents memory leaks
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array = only run once on mount

  // LOGO COMPONENT
  // Placeholder logo - replace with your actual logo import
  // Creates a simple gray square with the letter "L"
  const LogoPlaceholder = () => (
      <img
        src={logo}
        alt="Logo" 
        className="w-[50px] h-[50px] m-[15px]"
      />
  );

  // VERTICAL NAVBAR STRUCTURE
  return (
    <header className="fixed left-0 top-0 h-full w-[90px] bg-[#eeeeee] flex flex-col items-center py-4">
      {/* 
        Navbar Styling Breakdown:
        - fixed: Removes element from normal document flow, stays in place on scroll
        - left-0 top-0: Positions navbar at top-left corner of viewport
        - h-full: Makes navbar span entire viewport height (100vh)
        - w-[80px]: Sets fixed width of 80px for the vertical bar
        - bg-[#eeeeee]: Light gray background color
        - flex: Enables flexbox layout
        - flex-col: Arranges children vertically (column direction)
        - items-center: Centers children horizontally within the navbar
        - py-4: Adds vertical padding (top and bottom) of 1rem
      */}
      
      {/* LOGO SECTION */}
      <div className="mb-8">
        {/* mb-8: Adds margin-bottom of 2rem to space logo from navigation links */}
        <LogoPlaceholder />
      </div>
      
      {/* NAVIGATION LINKS */}
      <nav className="flex flex-col gap-6">
        {/* 
          Navigation Container Styling:
          - flex flex-col: Stack links vertically
          - gap-6: Adds 1.5rem spacing between each navigation link
        */}
        
        {/* CONDITIONAL RENDERING based on viewport width */}
        {isWideViewport ? (
          // WIDE VIEWPORT (>800px): Show full navigation labels
          <>
            <a href="/" className="text-base hover:text-gray-600 transition-colors writing-mode-vertical text-center">
              {/* 
                Link Styling:
                - text-base: Sets font size to 1rem (16px)
                - hover:text-gray-600: Changes text color to gray on hover
                - transition-colors: Smooth color transition animation
                - writing-mode-vertical: Rotates text vertically (may need custom CSS)
                - text-center: Centers text alignment
              */}
              Home
            </a>
            <a href="/blanko" className="text-base hover:text-gray-600 transition-colors writing-mode-vertical text-center">
              Blanko
            </a>
            <a href="/slido" className="text-base hover:text-gray-600 transition-colors writing-mode-vertical text-center">
              Slido
            </a>
            <a href="/tetro" className="text-base hover:text-gray-600 transition-colors writing-mode-vertical text-center">
              Tetro
            </a>
          </>
        ) : (
          // NARROW VIEWPORT (≤800px): Show single letter abbreviations
          // Saves space when viewport is smaller
          <>
            <a href="/" className="text-base hover:text-gray-600 transition-colors text-center">
              H {/* H = Home */}
            </a>
            <a href="/blanko" className="text-base hover:text-gray-600 transition-colors text-center">
              B {/* B = Blanko */}
            </a>
            <a href="/slido" className="text-base hover:text-gray-600 transition-colors text-center">
              S {/* S = Slido */}
            </a>
            <a href="/tetro" className="text-base hover:text-gray-600 transition-colors text-center">
              T {/* T = Tetro */}
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

// Export the component so it can be imported and used in other files
export default Header;