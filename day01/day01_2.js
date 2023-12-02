/*
*   --- Day 1: Trebuchet?! ---
*        --- Part Two ---
*      Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day01.txt')
})

const stringNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

let sum = 0

function getNumber(number) {
    return isNaN(parseInt(number)) ? stringNumbers.indexOf(number) + 1 : number
}

function findPatterns(string) {
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))\w/g
    const res = []
    let match

    while ((match = regex.exec(string)) != null) {
        res.push(match[1])
    }

    return res
}

lineReader.on('line', (line) => {
    const numbers = findPatterns(line)
    sum += parseInt(`${getNumber(numbers[0])}${getNumber(numbers[numbers.length - 1])}`)
})

lineReader.on('close', () => {
    console.log('Result:', sum)
    // Result: 54277
})
