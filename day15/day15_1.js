/*
*   --- Day 15: Lens Library ---
*         --- Part One ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./day15.txt'),
});

function hash(str) {
  return str
    .split('')
    .reduce((acc, _, i) => ((acc + str.charCodeAt(i)) * 17) % 256, 0);
}

lineReader.on('line', (line) => {
  const res = line.split(',').reduce((acc, str) => acc + hash(str), 0);
  console.log('Result:', res);
  // Result: 519041
});
