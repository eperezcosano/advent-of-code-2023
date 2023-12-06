/*
*   --- Day 6: Wait For It ---
*        --- Part One ---
*      Advent Of Code 2023
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day06.txt')
})

const doc = [ [], [], [], [] ]

function calculate(time, record) {
    const [x1, x2] = [(-time+Math.sqrt(time**2-4*record))/(-2), (-time-Math.sqrt(time**2-4*record))/(-2)]
    return [Number.isInteger(x1) ? x1 + 1 : Math.ceil(x1), Number.isInteger(x2) ? x2 - 1 : Math.floor(x2)]
}

lineReader.on('line', (line) => {
    line.split(':')[1].split(' ').map(val => parseInt(val)).filter(val => !isNaN(val)).forEach((val, i) => doc[i].push(val))
})

lineReader.on('close', () => {
    const res = doc.map(([time, record]) => calculate(time, record)).map(([x1, x2]) => x2 - x1 + 1).reduce((acc, num) => acc * num, 1)
    console.log('Result:', res)
    // Result: 1108800
})
