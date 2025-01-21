import React, { useEffect, useState } from "react";
import "./css/pokemonDetailsTable.css";

const PokemonDetailsTable = ({ pokemonData }) => {
  const [moveDetails, setMoveDetails] = useState({});
  const [showAllMoves, setShowAllMoves] = useState(false); 
  const [moveLearnLevels, setMoveLearnLevels] = useState({});
  const [flippedMoves, setFlippedMoves] = useState([]);

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

    const fetchMoveLearnLevels = async () => {
      const levels = {};

      for (let move of pokemonData.moves) {
        const moveName = move.move.name;
        const response = await fetch(
          `https://pokeapi.co/api/v2/move/${moveName}`
        );
        const data = await response.json();
        const levelUp = data.learned_by_pokemon.find(
          (pokemon) => pokemon.name === pokemonData.name
        );

        if (levelUp) {
          levels[moveName] = levelUp.level;
        } else {
          levels[moveName] = "Desconocido";
        }
      }

      setMoveLearnLevels(levels);
    };

    if (pokemonData.moves.length > 0) {
      fetchMoveDetails();
      fetchMoveLearnLevels();
    }
  }, [pokemonData.moves, pokemonData.name]);

  const movesToShow = showAllMoves
    ? pokemonData.moves
    : pokemonData.moves.slice(0, 10);

  const toggleFlip = (moveName) => {
    setFlippedMoves((prev) =>
      prev.includes(moveName)
        ? prev.filter((name) => name !== moveName)
        : [...prev, moveName]
    );
  };

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

      <h3>Movimientos:</h3>
      <div className="move-grid">
        {movesToShow.map((move) => {
          const moveName = move.move.name;
          const details = moveDetails[moveName];
          const level = moveLearnLevels[moveName] || "Desconocido";

          return (
            <div
              className={`move-item ${
                flippedMoves.includes(moveName) ? "flipped" : ""
              }`}
              key={moveName}
              onClick={() => toggleFlip(moveName)}
            >
              <div className="move-card">
                <div className="move-front">
                  <strong>{moveName.replace("-", " ").toUpperCase()}</strong>
                  <div>
                    {details &&
                      details.damage &&
                      details.damage !== "Desconocido" && (
                        <div>Daño: {details.damage}</div>
                      )}
                  </div>

                  <div>
                    {details &&
                      details.type &&
                      details.type !== "Desconocido" && (
                        <div>Tipo: {details.type}</div>
                      )}
                  </div>

                  <div>
                    {details &&
                      details.accuracy &&
                      details.accuracy !== "Desconocido" && (
                        <div>Precisión: {details.accuracy}</div>
                      )}
                  </div>
                </div>

                <div className="move-back">
                  <strong>{moveName.replace("-", " ").toUpperCase()}</strong>
                  <div>Detalles adicionales</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="move-toggle-button"
        onClick={() => setShowAllMoves(!showAllMoves)}
      >
        {showAllMoves ? "Ver menos" : "Ver más movimientos"}
      </button>
    </div>
  );
};

export default PokemonDetailsTable;
