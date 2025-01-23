// pages/Home.js
import React, { useState } from 'react';
import usePokemonByName from '../hooks/usePokemonByName'; // Hook para obtener el Pokémon por nombre
import Searcher from '../components/home/Searcher'; // El buscador
import PokemonDetailsTable from '../components/home/PokemonDetailsTable'; // Importamos el componente de la tabla
import psyduckQuestion from '../assets/images/psyduckQuestion2.png';
import "./css/home.css";

const Home = () => {
  const [pokemonName, setPokemonName] = useState(''); // Estado para el nombre del Pokémon
  const { pokemonData, loading, error } = usePokemonByName(pokemonName); // Hook para obtener los detalles del Pokémon

  const handleSearch = (name) => {
    setPokemonName(name);
  };

  return (
    <div>
      <h1>Bienvenido a PokeApp</h1>
      <p>Esta es la página de inicio.</p>

      
      <Searcher onSearch={handleSearch} />


      {pokemonName && !loading && !error && pokemonData ? (
        <PokemonDetailsTable pokemonData={pokemonData} />
      ) : (
        pokemonName && !loading && error && <img className = "psyduck-question" src={psyduckQuestion} alt="Error - Psyduck confused" />
      )}
    </div>
  );
};

export default Home;
