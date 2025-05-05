import React, { useState, useEffect } from 'react';

import parsePokemonData from '../../service/parser.js';

import CopyButton from '../common/CopyButton.jsx';

function Pokemon({ pokemonInfo }) {
  const pokemon = parsePokemonData(pokemonInfo);
  const [pokemonSpriteUrl, setPokemonSpriteUrl] = useState(null);
  const [itemSpriteUrl, setItemSpriteUrl] = useState(null);

  useEffect(() => {
    if (!pokemon.searchName) return;

    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.searchName}`);

      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();

      setPokemonSpriteUrl(data.sprites.front_default);
    };

    fetchPokemon();
  }, [pokemon.searchName]);

  useEffect(() => {
    if (!pokemon.searchItem) return;

    const fetchItem = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/item/${pokemon.searchItem}`);

      if (!res.ok) throw new Error('Item not found');
      const data = await res.json();

      setItemSpriteUrl(data.sprites.default);
    };

    fetchItem();
  }, [pokemon.searchItem]);

  return (
    <div>
      <img src={pokemonSpriteUrl} alt={pokemon.name} />
      <img src={itemSpriteUrl} alt={pokemon.item} />
      <p style={{ whiteSpace: "pre-line" }}>{pokemonInfo}</p>
      <CopyButton displayText="Copy pokemon" copyText={pokemonInfo} />
    </div>
  );
}

export default Pokemon;
