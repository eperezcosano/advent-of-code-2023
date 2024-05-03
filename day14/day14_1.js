/*
*   --- Day 14: Parabolic Reflector Dish ---
*                --- Part One ---
*              Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day14.txt'),
})

const platform = []

function moveRock(fromY, fromX, toY, toX) {
    platform[toY][toX] = 'O'
    platform[fromY][fromX] = '.'
}

function checkRockToMoveNorth(sy, sx) {
    for (let y = sy; y < platform.length; y++) {
        if (platform[y][sx] == '#') break
        if (platform[y][sx] == 'O') {
            moveRock(y, sx, sy, sx)
            break
        }
    }
}

function tiltNorth() {
    for (let y = 0; y < platform.length; y++) {
        for (let x = 0; x < platform[y].length; x++) {
            if (platform[y][x] == '.') checkRockToMoveNorth(y, x)
        }
    }
}

lineReader.on('line', (line) => platform.push(line.split('')))

lineReader.on('close', () => {
    tiltNorth()
    const res = platform.reduce((acc, row, i) => acc + (platform.length - i) * row.reduce((acc, val) => (val == 'O' ? ++acc : acc), 0), 0)
    console.log('Result:', res)
    // Result: 109596
})
