/*
 *   --- Day 17: Clumsy Crucible ---
 *           --- Part Two ---
 *         Advent Of Code 2023
 * */
const Heap = require('heap');
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./day17.txt'),
});

const grid = [];

function dijkstra() {
  const queue = new Heap((a, b) => a[0] - b[0]);
  const seen = new Set();

  queue.push([0, 0, 0, 0, 0, 0]); // H, Y, X, DY, DX, N

  while (!queue.empty()) {
    const [h, y, x, dy, dx, n] = queue.pop();

    if (seen.has([y, x, dy, dx, n].join())) continue;
    seen.add([y, x, dy, dx, n].join());

    if (y == grid.length - 1 && x == grid[0].length - 1 && n >= 4) return h;

    if (n < 10 && [dy, dx].join() != '0,0') {
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        queue.push([h + grid[ny][nx], ny, nx, dy, dx, n + 1]);
      }
    }

    if (n < 4 && [dy, dx].join() != '0,0') continue

    for (const [ndy, ndx] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      if ([ndy, ndx].join() != [dy, dx].join() && [ndy, ndx].join() != [-dy, -dx].join()) {
        const ny = y + ndy;
        const nx = x + ndx;
        if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
            queue.push([h + grid[ny][nx], ny, nx, ndy, ndx, 1])
        }
      }
    }
  }
}

lineReader.on('line', (line) =>
  grid.push([...line].map((val) => parseInt(val)))
);

lineReader.on('close', () => {
  const res = dijkstra();
  console.log('Result:', res);
  // Result: 1027
});
