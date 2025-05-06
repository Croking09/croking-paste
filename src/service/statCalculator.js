function calculateHP(lvl, base, iv, ev) {
  return Math.floor((((2 * base) + iv + (ev / 4)) * lvl / 100) + lvl + 10)
}

function calculateStat(stat, lvl, base, iv, ev, natureStats) {
  if (stat === "hp") return calculateHP(lvl, base, iv, ev)
  else {
    return Math.floor(((((2 * base) + iv + (ev / 4)) * lvl / 100) + 5) * natureStats[stat])
  }
}

export default calculateStat;
