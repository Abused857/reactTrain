
import React from 'react';

const PokemonList = ({ pokemonData }) => {
  return (
    <div>
      <h2>Lista de Pokémon:</h2>
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={`${pokemon.name}-${index}`}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
