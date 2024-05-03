/*
*   --- Day 9: Mirage Maintenance ---
*           --- Part One ---
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
    return extrapolate(res) + res[res.length - 1]
}

lineReader.on('line', (line) => sequences.push(line.split(' ').map(Number)))

lineReader.on('close', () => {    
    const res = sequences.reduce((acc, sequence) => acc + extrapolate(sequence) + sequence[sequence.length - 1], 0)
    console.log('Result:', res)
    // Result: 1842168671
})
