const natures = {
  "Hardy": {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
  "Lonely": {atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1},
  "Brave": {atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9},
  "Adamant": {atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1},
  "Naughty": {atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1},
  "Bold": {atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1},
  "Docile": {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
  "Relaxed": {atk: 1, def: 1.1, spa: 1, spd: 1, spe: 0.9},
  "Impish": {atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1},
  "Lax": {atk: 1, def: 1.1, spa: 1, spd: 0.9, spe: 1},
  "Timid": {atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1},
  "Hasty": {atk: 1, def: 0.9, spa: 1, spd: 1, spe: 1.1},
  "Serious": {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
  "Jolly": {atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1.1},
  "Naive": {atk: 1, def: 1, spa: 1, spd: 0.9, spe: 1.1},
  "Modest": {atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1},
  "Mild": {atk: 1, def: 0.9, spa: 1.1, spd: 1, spe: 1},
  "Quiet": {atk: 1, def: 1, spa: 1.1, spd: 1, spe: 0.9},
  "Bashful": {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
  "Rash": {atk: 1, def: 1, spa: 1.1, spd: 0.9, spe: 1},
  "Calm": {atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1},
  "Gentle": {atk: 1, def: 0.9, spa: 1, spd: 1.1, spe: 1},
  "Sassy": {atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9},
  "Careful": {atk: 1, def: 1, spa: 0.9, spd: 1.1, spe: 1},
  "Quirky": {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
}

function calculateHP(lvl, base, iv, ev) {
  return Math.floor((((2 * base) + iv + (ev / 4)) * lvl / 100) + lvl + 10)
}

function calculateStat(stat, lvl, base, iv, ev, natureName) {
  if (stat === "hp") return calculateHP(lvl, base, iv, ev)
  else {
    return Math.floor(((((2 * base) + iv + (ev / 4)) * lvl / 100) + 5) * natures[natureName][stat])
  }
}

export default calculateStat;
