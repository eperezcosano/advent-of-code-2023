/*
*   --- Day 2: Cube Conundrum ---
*         --- Part One ---
*        Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

let sum = 0

const limit = {
    red: 12,
    green: 13,
    blue: 14
}

function isPossible(game) {
    const parts = game.split(': ')
    const id = parseInt(parts[0].split(' ')[1])
    const cubes = parts[1].split('; ').flatMap(cubes => cubes.split(', '))
    const isPossible = cubes.every(cube => {
        const [number, color] = cube.split(' ')
        return parseInt(number) <= limit[color]
    })
    return isPossible ? id : 0
}

lineReader.on('line', (line) => {
    sum += isPossible(line)
})

lineReader.on('close', () => {
    console.log('Result:', sum)
    // Result: 2204
})
