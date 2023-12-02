/*
*   --- Day 2: Cube Conundrum ---
*         --- Part Two ---
*        Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

let sum = 0

function getPower(game) {
    const parts = game.split(': ')
    const cubes = parts[1].split('; ').flatMap(cubes => cubes.split(', '))
    const min = { red: 0, green: 0, blue: 0 }
    cubes.forEach(cube => {
        const [number, color] = cube.split(' ')
        if (parseInt(number) > min[color]) min[color] = parseInt(number)
    })
    return min.red * min.green * min.blue
}

lineReader.on('line', (line) => {
    sum += getPower(line)
})

lineReader.on('close', () => {
    console.log('Result:', sum)
    // Result: 71036
})
