/*
*   --- Day 13: Point of Incidence ---
*            --- Part Two ---
*           Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./day13.txt'),
});

const patterns = [[]];

function transpose(arr) {
  let array = arr.map((row) => row.split(''));
  return array[0]
    .map((_, colIndex) => array.map((row) => row[colIndex]))
    .map((row) => row.join(''));
}

function validReflection(pattern, pos) {
  for (let i = 0; pos + i + 1 < pattern.length && pos - i >= 0; i++) {
    if (pattern[pos - i] != pattern[pos + i + 1]) return false;
  }
  return true;
}

function checkSmudge(strA, strB) {
  let differences = 0;
  for (let i = 0; i < strA.length; i++) {
    if (strA[i] != strB[i]) differences++;
  }
  return differences == 1;
}

function fixSmudge(strA, strB) {
  for (let i = 0; i < strA.length; i++) {
    if (strA[i] != strB[i]) {
      return (
        strA.substring(0, i) +
        (strA[i] == '.' ? '#' : '.') +
        strA.substring(i + 1)
      );
    }
  }
}

function findSmudge(pattern) {
  for (let i = 0; i < pattern.length - 1; i++) {
    for (let j = i + 1; j < pattern.length; j++) {
      if (checkSmudge(pattern[i], pattern[j])) {
        if (!Number.isInteger((i + j) / 2)) {
          const pos = Math.floor((i + j) / 2);
          const tmp = pattern.slice();
          tmp[i] = fixSmudge(tmp[i], tmp[j]);
          if (validReflection(tmp, pos)) return pos + 1;
        }
      }
    }
  }
  return 0;
}

function summarizeNotes(pattern) {
  const vCol = findSmudge(transpose(pattern));
  if (vCol > 0) return vCol;
  const hCol = findSmudge(pattern);
  return hCol * 100;
}

let i = 0;
lineReader.on('line', (line) => {
  if (line.length == 0) {
    i++;
    patterns.push([]);
  } else patterns[i].push(line);
});

lineReader.on('close', () => {
  const res = patterns.reduce(
    (acc, pattern) => acc + summarizeNotes(pattern),
    0
  );
  console.log('Result:', res);
  // Result: 37617
});