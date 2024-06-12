import React, { useState } from 'react';

function NavBar({ toggleDarkMode, darkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-900">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white ml-2 text-lg font-bold">MausamWise</h1>
        <nav className="hidden md:flex space-x-4">
            <input class='p-2' placeholder='Search City name'/>
        </nav>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none mr-4">
            Search
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 p-4 space-y-2">
            <input class='p-2' placeholder='Search City name'/>
        </nav>
      )}
    </header>
  );
}

export default NavBar;

