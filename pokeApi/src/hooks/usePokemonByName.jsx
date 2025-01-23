import { useState, useEffect } from 'react';

const usePokemonByName = (pokemonName) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) return;

    const cleanName = pokemonName.replace(/[^a-zA-Z0-9]/g, ''); 
    if (!cleanName) {
      setError('Bien intentado pequeño padawan');
      return;
    }

    let isMounted = true;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      setPokemonData(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${cleanName.toLowerCase()}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Pokémon no encontrado');
          }
          throw new Error('Error al buscar el Pokémon');
        }

        const data = await response.json();
        if (isMounted) {
          setPokemonData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, [pokemonName]);

  return { pokemonData, loading, error };
};

export default usePokemonByName;
