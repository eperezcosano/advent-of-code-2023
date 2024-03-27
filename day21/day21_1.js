/*
 *   --- Day 21: Step Counter ---
 *          --- Part One ---
 *         Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./day21.txt'),
});

const grid = [];
const positions = new Set();

function getNextPositions([py, px]) {
  const nextPositions = [];
  if (py > 0 && grid[py - 1][px] == '.') nextPositions.push([py - 1, px]);
  if (py < grid.length - 1 && grid[py + 1][px] == '.') nextPositions.push([py + 1, px]);
  if (px < grid[py].length - 1 && grid[py][px + 1] == '.') nextPositions.push([py, px + 1]);
  if (px > 0 && grid[py][px - 1] == '.') nextPositions.push([py, px - 1]);
  return nextPositions;
}

function moveStep() {
  const nextPositions = [];
  for (const position of positions) {
    nextPositions.push(...getNextPositions(position.split(',').map((val) => parseInt(val))));
  }
  positions.clear();
  nextPositions.forEach((nextPosition) => positions.add(nextPosition.join()));
}

lineReader.on('line', (line) => {
  const row = line.split('');
  if (positions.size == 0 && row.includes('S')) {
    const [sy, sx] = [grid.length, row.indexOf('S')];
    positions.add([sy, sx].join());
    row[sx] = '.';
  }
  grid.push(row);
});

lineReader.on('close', () => {
  for (let n = 0; n < 64; n++) moveStep();
  const res = positions.size;
  console.log('Result:', res);
  // Result: 3632
});
