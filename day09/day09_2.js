/*
*   --- Day 9: Mirage Maintenance ---
*           --- Part Two ---
*         Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day09.txt')
})

const sequences = []

function extrapolate(sequence) {
    const res = []
    for (let i = 1; i < sequence.length; i++) {
        res.push(sequence[i] - sequence[i - 1])
    }
    if (res.every(num => num == 0)) return 0
    return res[0] - extrapolate(res)
}

lineReader.on('line', (line) => {
    sequences.push(line.split(' ').map(val => parseInt(val)))
})

lineReader.on('close', () => {
    const res = sequences.reduce((acc, sequence) => acc + sequence[0] - extrapolate(sequence), 0)
    console.log('Result:', res)
    // Result: 903
})
