import React, { useState, useEffect } from "react";

import parsePokemonData from "../../service/parser.js";
import calculateStat from "../../service/statCalculator.js";

import CopyButton from "../common/CopyButton.jsx";
import StatRadarChart from "./StatRadarChart.jsx";

function Pokemon({ pokemonInfo }) {
  const pokemon = parsePokemonData(pokemonInfo);
  const [pokemonData, setPokemonData] = useState(null);
  const [itemSpriteUrl, setItemSpriteUrl] = useState(null);

  useEffect(() => {
    if (!pokemon.searchName) return;

    const fetchPokemon = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.searchName}`
      );

      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();

      setPokemonData(data);
    };

    fetchPokemon();
  }, [pokemon.searchName]);

  useEffect(() => {
    if (!pokemon.searchItem) return;

    const fetchItem = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/item/${pokemon.searchItem}`
      );

      if (!res.ok) throw new Error("Item not found");
      const data = await res.json();

      setItemSpriteUrl(data.sprites.default);
    };

    fetchItem();
  }, [pokemon.searchItem]);

  return pokemonData == null ? null : (
    <article>
      <div className="flex flex-row">
        <div className="w-100">
          <div className="flex flex-row items-end">
            <img src={pokemonData.sprites.front_default} alt={pokemon.name} />
            <img
              src={itemSpriteUrl}
              alt={pokemon.item}
              className="object-contain"
            />
          </div>

          <p style={{ whiteSpace: "pre-line" }}>{pokemonInfo}</p>
        </div>

        <StatRadarChart
          data={[
            {
              stat: "HP",
              value: calculateStat(
                "hp",
                pokemon.level,
                pokemonData.stats[0].base_stat,
                pokemon.ivs.hp,
                pokemon.evs.hp,
                pokemon.natureStats
              ),
              natureUp: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 1.1
              ),
              natureDown: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 0.9
              ),
            },
            {
              stat: "Atk",
              value: calculateStat(
                "atk",
                pokemon.level,
                pokemonData.stats[1].base_stat,
                pokemon.ivs.atk,
                pokemon.evs.atk,
                pokemon.natureStats
              ),
              natureUp: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 1.1
              ),
              natureDown: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 0.9
              ),
            },
            {
              stat: "Def",
              value: calculateStat(
                "def",
                pokemon.level,
                pokemonData.stats[2].base_stat,
                pokemon.ivs.def,
                pokemon.evs.def,
                pokemon.natureStats
              ),
              natureUp: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 1.1
              ),
              natureDown: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 0.9
              ),
            },
            {
              stat: "Spe",
              value: calculateStat(
                "spe",
                pokemon.level,
                pokemonData.stats[5].base_stat,
                pokemon.ivs.spe,
                pokemon.evs.spe,
                pokemon.natureStats
              ),
              natureUp: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 1.1
              ),
              natureDown: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 0.9
              ),
            },
            {
              stat: "SpD",
              value: calculateStat(
                "spd",
                pokemon.level,
                pokemonData.stats[4].base_stat,
                pokemon.ivs.spd,
                pokemon.evs.spd,
                pokemon.natureStats
              ),
              natureUp: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 1.1
              ),
              natureDown: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 0.9
              ),
            },
            {
              stat: "SpA",
              value: calculateStat(
                "spa",
                pokemon.level,
                pokemonData.stats[3].base_stat,
                pokemon.ivs.spa,
                pokemon.evs.spa,
                pokemon.natureStats
              ),
              natureUp: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 1.1
              ),
              natureDown: Object.keys(pokemon.natureStats).find(
                (key) => pokemon.natureStats[key] === 0.9
              ),
            },
          ]}
        />
      </div>

      <CopyButton displayText="Copy pokemon" copyText={pokemonInfo} />
    </article>
  );
}

export default Pokemon;
