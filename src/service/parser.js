import { natures } from "../constants/pokemonNatures.js";

function parsePokemonData(pokemonInfo) {
  const pokemon = {
    nickname: null,
    name: "",
    gender: "male",
    item: null,
    searchItem: null,
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    level: 50,
    nature: "Hardy",
  };

  const lines = pokemonInfo
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const firstLine = lines[0];
  const firstLineName = firstLine.split("@")[0].trim();
  const firstLineItem = firstLine.split("@")[1]?.trim();

  // Case: Nickname (Name) (Gender)
  let nicknameMatchGender = firstLineName.match(
    /^(.+)\s+\((.+)\)\s+\((F|M)\)$/
  );

  if (nicknameMatchGender) {
    pokemon.nickname = nicknameMatchGender[1].trim();
    pokemon.name = nicknameMatchGender[2].trim();
    if (nicknameMatchGender[3]) {
      pokemon.gender = nicknameMatchGender[3] === "F" ? "female" : "male";
    }
  } else {
    // Case: Nickname (Name)
    let nicknameMatch = firstLineName.match(/^(.+)\s+\((.+)\)$/);

    if (nicknameMatch) {
      pokemon.nickname = nicknameMatch[1].trim();
      pokemon.name = nicknameMatch[2].trim();
    } else {
      // Case: Name (Gender)
      let nameMatch = firstLineName.match(/^(.+)\s+\((F|M)\)$/);

      if (nameMatch) {
        pokemon.name = nameMatch[1].trim();
        if (nameMatch[2]) {
          pokemon.gender = nameMatch[2] === "F" ? "female" : "male";
        }
      } else {
        // Case: Name
        pokemon.name = firstLineName.trim();
      }
    }
  }

  if (firstLineItem) {
    pokemon.item = firstLineItem.trim();
    pokemon.searchItem = pokemon.item.replace(/ /g, "-").toLowerCase();
  }

  if (
    pokemon.name === "Tornadus" ||
    pokemon.name === "Thundurus" ||
    pokemon.name === "Landorus" ||
    pokemon.name === "Enamorus"
  ) {
    pokemon.searchName = pokemon.name.concat("-incarnate").toLowerCase();
  } else {
    pokemon.searchName = pokemon.name.replace(/ /g, "-").toLowerCase();
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("Ability:")) {
      pokemon.ability = line.substring("Ability:".length).trim();
    } else if (line.startsWith("Level:")) {
      pokemon.level = Number.parseInt(
        line.substring("Level:".length).trim(),
        10
      );
    } else if (line.startsWith("Shiny:")) {
      pokemon.shiny = line.substring("Shiny:".length).trim() === "Yes";
    } else if (line.startsWith("Happiness:")) {
      pokemon.happiness = Number.parseInt(
        line.substring("Happiness:".length).trim(),
        10
      );
    } else if (line.startsWith("Tera Type:")) {
      pokemon.teraType = line.substring("Tera Type:".length).trim();
    } else if (line.startsWith("EVs:")) {
      pokemon.evs = parseStats(line.substring("EVs:".length).trim(), false);
    } else if (line.startsWith("IVs:")) {
      pokemon.ivs = parseStats(line.substring("IVs:".length).trim(), true);
    } else if (line.includes("Nature")) {
      pokemon.nature = line.split(" Nature")[0].trim();
    } else if (line.startsWith("-")) {
      if (!pokemon.moves) pokemon.moves = [];

      const moveText = line.substring(1).trim();

      if (moveText.includes(" / ")) {
        const alternatives = moveText.split(" / ").map((move) => move.trim());
        pokemon.moves.push({
          primary: alternatives[0],
          alternatives: alternatives.slice(1),
        });
      } else if (moveText.startsWith("Hidden Power")) {
        // Case: Hidden Power [Type]
        const typeMatch = moveText.match(/Hidden Power \[([A-Za-z]+)\]/);
        if (typeMatch) {
          pokemon.moves.push({
            name: "Hidden Power",
            type: typeMatch[1],
          });
        }
        // Case: Hidden Power Type
        else {
          const oldTypeMatch = moveText.match(/Hidden Power ([A-Za-z]+)/);
          if (oldTypeMatch) {
            pokemon.moves.push({
              name: "Hidden Power",
              type: oldTypeMatch[1],
            });
          } else {
            pokemon.moves.push(moveText);
          }
        }
      } else {
        pokemon.moves.push(moveText);
      }
    }
  }

  pokemon.natureStats = natures[pokemon.nature];

  //console.log(pokemon);

  return pokemon;
}

function parseStats(statsString, iv) {
  const stats = {
    hp: iv ? 31 : 0,
    atk: iv ? 31 : 0,
    def: iv ? 31 : 0,
    spa: iv ? 31 : 0,
    spd: iv ? 31 : 0,
    spe: iv ? 31 : 0,
  };

  const parts = statsString.split("/").map((part) => part.trim());

  for (const part of parts) {
    const [value, stat] = part.split(" ");
    const numValue = Number.parseInt(value, 10);

    switch (stat.toLowerCase()) {
      case "hp":
        stats.hp = numValue;
        break;
      case "atk":
        stats.atk = numValue;
        break;
      case "def":
        stats.def = numValue;
        break;
      case "spa":
      case "spa.":
      case "sp.a":
      case "sp.atk":
      case "spatk":
        stats.spa = numValue;
        break;
      case "spd":
      case "spd.":
      case "sp.d":
      case "sp.def":
      case "spdef":
        stats.spd = numValue;
        break;
      case "spe":
      case "speed":
        stats.spe = numValue;
        break;
    }
  }

  return stats;
}

export default parsePokemonData;
