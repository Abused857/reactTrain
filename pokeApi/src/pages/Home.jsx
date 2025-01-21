// pages/Home.js
import React from 'react';
import usePokemon from '../hooks/usePokemon';
import PokemonList from '../components/home/PokemonList';  
const Home = () => {
  const { pokemonData, loading, error } = usePokemon();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Bienvenido a PokeApp</h1>
      <p>Esta es la página de inicio.</p>
      {pokemonData && <PokemonList pokemonData={pokemonData} />}
    </div>
  );
};

export default Home;
