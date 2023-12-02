/*
*   --- Day 1: Trebuchet?! ---
*        --- Part One ---
*      Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day01.txt')
})

let sum = 0

lineReader.on('line', (line) => {
    const numbers = line.match(/\d/g)
    sum += parseInt(numbers[0].concat(numbers[numbers.length - 1]))
})

lineReader.on('close', () => {
    console.log('Result:', sum)
    // Result: 54390
})
