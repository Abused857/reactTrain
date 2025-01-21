
import React, { useState } from 'react';
import './css/searcher.css';

const Searcher = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyUp = (e) => {
    
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="searcher-container">
      <input
        type="text"
        className="searcher-input"
        placeholder="Busca un Pokémon..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button className="searcher-button" onClick={handleSearchClick}>
        Buscar
      </button>
    </div>
  );
};

export default Searcher;
