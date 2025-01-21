import { useState, useEffect } from 'react';

const usePokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seenPokemon = new Set();

  useEffect(() => {
    const fetchPokemon = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const newPokemon = data.results.filter(pokemon => 
          !seenPokemon.has(pokemon.name)
        );

        // Agregar los nombres al Set para evitar duplicados
        newPokemon.forEach(pokemon => seenPokemon.add(pokemon.name));
        
        setPokemonData((prevData) => [...prevData, ...newPokemon]);

        // Continuar con la siguiente página si existe
        if (data.next) {
          fetchPokemon(data.next);
        } else {
          setLoading(false); // Finalizar cuando no haya más páginas
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPokemon(); // Iniciar la primera solicitud
  }, []); // Dependencias vacías para ejecutar solo una vez

  return { pokemonData, loading, error };
};


export default usePokemon;
