/*
 *   --- Day 22: Sand Slabs ---
 *        --- Part Two ---
 *      Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./day22.txt'),
});

const bricks = [];

function overlaps(a, b) {
  return (
    Math.max(a.x1, b.x1) <= Math.min(a.x2, b.x2) &&
    Math.max(a.y1, b.y1) <= Math.min(a.y2, b.y2)
  );
}

function fallDown() {
  for (const [i, brick] of bricks.entries()) {
    let z = 1;
    for (const other of bricks.slice(0, i)) {
      if (overlaps(brick, other)) z = Math.max(z, other.z2 + 1);
      brick.z2 -= brick.z1 - z;
      brick.z1 = z;
    }
  }
}

function getDesintegrated() {
  const supports = Array.from({ length: bricks.length }, () => new Set());
  const supported = Array.from({ length: bricks.length }, () => new Set());

  for (const [j, upper] of bricks.entries()) {
    for (const [i, lower] of bricks.slice(0, j).entries()) {
      if (overlaps(lower, upper) && upper.z1 == lower.z2 + 1) {
        supports[i].add(j);
        supported[j].add(i);
      }
    }
  }

  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    const queue = Array.from(supports[i]).filter((j) => supported[j].size == 1);
    const falling = new Set(queue).add(i);

    while (queue.length) {
      const j = queue.shift();
      for (const k of supports[j]) {
        if (falling.has(k)) continue;
        if ([...supported[k]].every((val) => falling.has(val))) {
          queue.push(k);
          falling.add(k);
        }
      }
    }
    total += falling.size - 1;
  }
  return total;
}

lineReader.on('line', (line) => {
  const [x1, y1, z1, x2, y2, z2] = line
    .replace('~', ',')
    .split(',')
    .map(Number);
  bricks.push({ x1, y1, z1, x2, y2, z2 });
});

lineReader.on('close', () => {
  bricks.sort((a, b) => a.z1 - b.z1);
  fallDown();
  const res = getDesintegrated();
  console.log('Result:', res);
  // Result: 93292
});
