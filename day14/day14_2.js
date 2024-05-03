/*
*   --- Day 14: Parabolic Reflector Dish ---
*                --- Part Two ---
*              Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day14.txt'),
})

const cycles = 1_000_000_000
const platform = []
const cache = new Map()

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

function checkRockToMoveWest(sy, sx) {
    for (let x = sx; x < platform[sx].length; x++) {
        if (platform[sy][x] == '#') break
        if (platform[sy][x] == 'O') {
            moveRock(sy, x, sy, sx)
            break
        }
    }
}

function tiltWest() {
    for (let x = 0; x < platform[0].length; x++) {
        for (let y = platform.length - 1; y >= 0; y--) {
            if (platform[y][x] == '.') checkRockToMoveWest(y, x)
        }
    }
}

function checkRockToMoveSouth(sy, sx) {
    for (let y = sy; y >= 0; y--) {
        if (platform[y][sx] == '#') break
        if (platform[y][sx] == 'O') {
            moveRock(y, sx, sy, sx);
            break
        }
    }
}

function tiltSouth() {
    for (let y = platform.length - 1; y >= 0; y--) {
        for (let x = platform[y].length - 1; x >= 0; x--) {
            if (platform[y][x] == '.') checkRockToMoveSouth(y, x)
        }
    }
}

function checkRockToMoveEast(sy, sx) {
    for (let x = sx; x >= 0; x--) {
        if (platform[sy][x] == '#') break
        if (platform[sy][x] == 'O') {
            moveRock(sy, x, sy, sx)
            break
        }
    }
}

function tiltEast() {
    for (let x = platform[0].length - 1; x >= 0; x--) {
        for (let y = 0; y < platform.length; y++) {
            if (platform[y][x] == '.') checkRockToMoveEast(y, x)
        }
    }
}

function tiltBoard(orientation) {
    switch (orientation) {
        case 'north':
            tiltNorth()
            break
        case 'west':
            tiltWest()
            break
        case 'south':
            tiltSouth()
            break
        case 'east':
            tiltEast()
            break
        default:
            throw new Error('Invalid Orientation')
    }
}

function performCycles(cycles) {
    const cycleOrientations = ['north', 'west', 'south', 'east']
    for (let cycle = 1; cycle <= cycles; cycle++) {
        for (const orientation of cycleOrientations) {
            tiltBoard(orientation)
        }
        const val = platform.map((row) => row.join('')).join('')
        if (cache.has(val)) {
            const offset = cycle - cache.get(val)
            const repetition = Math.floor((cycles - cycle) / offset)
            cycle += repetition * offset
            cache.clear()
        }
        cache.set(val, cycle)
    }
}

lineReader.on('line', (line) => platform.push(line.split('')))

lineReader.on('close', () => {
    performCycles(cycles)
    const res = platform.reduce((acc, row, i) => acc + (platform.length - i) * row.reduce((acc, val) => (val == 'O' ? ++acc : acc), 0), 0)
    console.log('Result:', res)
    // Result: 96105
})
