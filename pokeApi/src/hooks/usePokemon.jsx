import { useState, useEffect } from 'react';

const usePokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        // Filtrar Pokémon que no están en pokemonData
        setPokemonData((prevData) => {
          const newData = data.results.filter(pokemon => 
            !prevData.some(existingPokemon => existingPokemon.name === pokemon.name)
          );
          return [...prevData, ...newData];
        });

        // Si hay una URL en 'next', hacer la siguiente petición
        if (data.next) {
          fetchPokemon(data.next);
        } else {
          setLoading(false); // Detener la carga cuando no haya más datos
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPokemon(); // Iniciar la primera solicitud
  }, []);

  return { pokemonData, loading, error };
};

export default usePokemon;
