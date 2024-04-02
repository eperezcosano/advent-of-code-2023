/*
 *   --- Day 22: Sand Slabs ---
 *        --- Part One ---
 *       Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./example.txt'),
});

const bricks = [];

function getBottom(brick) {
  return Math.min(brick.start.z, brick.end.z);
}

function getTop(brick) {
  return Math.max(brick.start.z, brick.end.z);
}

function isOnSettledBrick(brick) {
  const settledBricks = bricks.filter((brick) => brick.settled);
  for (const other of settledBricks) {
    if (getTop(other) == getBottom(brick) - 1) return true;
  }
  return false;
}

function canGoDown(brick, other) {
  return (
    (brick.start.x > Math.max(other.start.x, other.end.x) ||
      brick.end.x < Math.min(other.start.x, other.end.x)) &&
    (brick.start.y > Math.max(other.start.y, other.end.y) ||
      brick.end.y < Math.min(other.start.y, other.end.y))
  );
}

function fall(brick) {
  const layerDown = bricks.filter(
    (other) => getTop(other) == getBottom(brick) - 1
  );

  if (layerDown.every((other) => canGoDown(brick, other))) {
    brick.start.z--;
    brick.end.z--;
  }
}

function fallDown() {
  while (bricks.some((brick) => !brick.settled)) {
    for (const brick of bricks) {
      if (brick.settled) continue;
      if (getBottom(brick) == 1 || isOnSettledBrick(brick)) {
        brick.settled = true;
        continue;
      }
      fall(brick);
    }
  }
}

lineReader.on('line', (line) => {
  const [start, end] = line
    .split('~')
    .map((val) => val.split(',').map((val) => parseInt(val)));
  bricks.push({
    id: bricks.length,
    start: { x: start[0], y: start[1], z: start[2] },
    end: { x: end[0], y: end[1], z: end[2] },
    settled: false,
  });
});

lineReader.on('close', () => {
  bricks.sort((a, b) => getBottom(a) - getBottom(b));
  fallDown();
  console.log(bricks);
  // console.log('Result:', res);
  // Result:
});
