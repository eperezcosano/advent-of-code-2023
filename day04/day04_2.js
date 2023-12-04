/*
*   --- Day 4: Scratchcards ---
*        --- Part Two ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day04.txt')
})

let total = 0

lineReader.on('line', (line) => {
    line = line.split(': ')
    const [wins, haves] = line[1].split(' | ').map(str => str.split(' ').flatMap(val => parseInt(val)).filter(val => !isNaN(val)))
    total += haves.reduce((acc, have) => wins.includes(have) ? ((acc > 0) ? acc *= 2 : ++acc) : acc, 0)
})

lineReader.on('close', () => {
    console.log('Result', total)
    // Result: 
})
