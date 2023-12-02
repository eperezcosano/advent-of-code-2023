/*
*   --- Day 2: Cube Conundrum ---
*         --- Part Two ---
*        Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

let sum = 0

const games = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
]

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
    // Result: 
})
