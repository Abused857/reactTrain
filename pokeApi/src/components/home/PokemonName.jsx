
import React from 'react';
import usePokemonByName from '../../hooks/usePokemonByName';

const PokemonName = ({ pokemonName }) => {
  const { pokemonData, loading, error } = usePokemonByName(pokemonName);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!pokemonData) return null;

  return (
    <div>
      <h2>{pokemonData.name}</h2>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Altura: {pokemonData.height}</p>
      <p>Peso: {pokemonData.weight}</p>
    </div>
  );
};

export default PokemonName;
