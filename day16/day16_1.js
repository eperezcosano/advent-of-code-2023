/*
 *   --- Day 16: The Floor Will Be Lava ---
 *              --- Part One ---
 *            Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day16.txt'),
})

const grid = []
const energized = new Set()

function headDown(sy, sx) {
    for (let y = sy + 1; y < grid.length; y++) {
        energized.add([y, sx].join('-'))
        if (grid[y][sx] == '/') return [[y, sx, 'left']]
        if (grid[y][sx] == '\\') return [[y, sx, 'right']]
        if (grid[y][sx] == '-') return [[y, sx, 'left'], [y, sx, 'right']]
    }
    return false
}

function headLeft(sy, sx) {
    for (let x = sx - 1; x >= 0; x--) {
        energized.add([sy, x].join('-'))
        if (grid[sy][x] == '/') return [[sy, x, 'down']]
        if (grid[sy][x] == '\\') return [[sy, x, 'up']]
        if (grid[sy][x] == '|') return [[sy, x, 'down'], [sy, x, 'up']]
    }
    return false
}

function headUp(sy, sx) {
    for (let y = sy - 1; y >= 0; y--) {
        energized.add([y, sx].join('-'))
        if (grid[y][sx] == '/') return [[y, sx, 'right']]
        if (grid[y][sx] == '\\') return [[y, sx, 'left']]
        if (grid[y][sx] == '-') return [[y, sx, 'right'], [y, sx, 'left']]
    }
    return false
}

function headRight(sy, sx) {
    for (let x = sx + 1; x < grid[sy].length; x++) {
        energized.add([sy, x].join('-'))
        if (grid[sy][x] == '/') return [[sy, x, 'up']]
        if (grid[sy][x] == '\\') return [[sy, x, 'down']]
        if (grid[sy][x] == '|') return [[sy, x, 'up'], [sy, x, 'down']]
    }
    return false
}

function beamToDirection(y, x, dir) {
    switch (dir) {
        case 'right':
            return headRight(y, x)
        case 'up':
            return headUp(y, x)
        case 'left':
            return headLeft(y, x)
        case 'down':
            return headDown(y, x)
    }
}

function startBeam() {
    const start = [0, -1, 'right']
    const queue = [start]
    const seen = new Set()

    while (queue.length) {
        const [y, x, dir] = queue.shift()
        const newBeams = beamToDirection(y, x, dir)
        if (!newBeams) continue
        newBeams.forEach((beam) => {
            if (!seen.has(beam.join('-'))) {
                seen.add(beam.join('-'))
                queue.push(beam)
            }
        })
    }
}

lineReader.on('line', (line) => grid.push(line.split('')))

lineReader.on('close', () => {
    startBeam()
    console.log('Result:', energized.size)
    // Result: 6855
})
