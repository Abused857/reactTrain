import React, { useEffect, useState } from "react";
import "./css/pokemonDetailsTable.css";

const PokemonDetailsTable = ({ pokemonData }) => {
  const [moveDetails, setMoveDetails] = useState({});

  useEffect(() => {
    const fetchMoveDetails = async () => {
      const details = {};

      for (let move of pokemonData.moves) {
        const moveName = move.move.name;
        const response = await fetch(
          `https://pokeapi.co/api/v2/move/${moveName}`
        );
        const data = await response.json();
        details[moveName] = {
          damage: data.power || "Desconocido",
          type: data.type.name,
          accuracy: data.accuracy || "Desconocido",
        };
      }

      setMoveDetails(details);
    };

    if (pokemonData.moves.length > 0) {
      fetchMoveDetails();
    }
  }, [pokemonData.moves]);

  return (
    <div className="pokemon-details">
      <h2>{pokemonData.name.toUpperCase()}</h2>
      <div>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      </div>

      <div className="info-stats-container">
        <div className="pokemon-info">
          <h3>Información Básica:</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Tipos:</strong>
                </td>
                <td>
                  {pokemonData.types.map((type) => type.type.name).join(", ")}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Altura:</strong>
                </td>
                <td>{pokemonData.height / 10} m</td>
              </tr>
              <tr>
                <td>
                  <strong>Peso:</strong>
                </td>
                <td>{pokemonData.weight / 10} kg</td>
              </tr>
              <tr>
                <td>
                  <strong>Habilidades:</strong>
                </td>
                <td>
                  {pokemonData.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="stats-types">
          <h3>Estadísticas:</h3>
          <div className="stats">
            <table>
              <tbody>
                {pokemonData.stats.map((stat) => (
                  <tr key={stat.stat.name}>
                    <td>
                      <strong>
                        {stat.stat.name.replace("-", " ").toUpperCase()}:
                      </strong>
                    </td>
                    <td>{stat.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h3>Movimientos:</h3>
        <div className="moves-table-container">
          <table className="moves-table">
            <thead>
              <tr>
                <th>Movimiento</th>
                <th>Daño</th>
                <th>Tipo</th>
                <th>Precisión</th>
              </tr>
            </thead>
            <tbody>
              {pokemonData.moves.map((move) => {
                const moveName = move.move.name;
                const details = moveDetails[moveName] || {};

                return (
                  <tr key={moveName}>
                    <td>{moveName.replace("-", " ").toUpperCase()}</td>
                    <td>{details.damage || "Desconocido"}</td>
                    <td>{details.type || "Desconocido"}</td>
                    <td>{details.accuracy || "Desconocido"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsTable;
