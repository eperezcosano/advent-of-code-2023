/*
*   --- Day 3: Gear Ratios ---
*         --- Part Two ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day03.txt')
})

const schematic = []

function getPairNumber(y, x) {
    let x1 = x
    for (let dx = x; dx >= 0; dx--) {
        if (isNaN(parseInt(schematic[y][dx]))) {
            x1 = dx + 1
            break
        }
        x1 = dx
    }

    let x2 = x
    for (let dx = x; dx <= schematic[y].length - 1; dx++) {
        if (isNaN(parseInt(schematic[y][dx]))) {
            x2 = dx - 1
            break
        }
        x2 = dx
    }

    let str = ''
    for (let dx = x1; dx <= x2; dx++) {
        str += schematic[y][dx]
    }

    return parseInt(str)
}

function getAdjacentNumbers(y, x) {
    const numbers = new Set()
    for (let dy = y - 1; dy <= y + 1; dy++) {
        if (dy < 0 || dy > schematic.length - 1) continue
        for (let dx = x - 1; dx <= x + 1; dx++) {
            if (dx == x && dy == y) continue
            if (dx < 0 || dx > schematic[dy].length - 1) continue
            if (!isNaN(parseInt(schematic[dy][dx]))) numbers.add(getPairNumber(dy, dx))
        }
    }
    return numbers
}

function getGearRatio(y, x) {
    const numbers = [...getAdjacentNumbers(y, x)]
    if (numbers.length != 2) return 0
    return numbers[0] * numbers[1]
}

function getGearRatios() {
    let sum = 0
    for (let y = 0; y < schematic.length; y++) {
        for (let x = 0; x < schematic[y].length; x++) {
            if (schematic[y][x] === '*') sum += getGearRatio(y, x)
        }
    }
    return sum
}

lineReader.on('line', (line) => {
    schematic.push(line.split(''))
})

lineReader.on('close', () => {
    const res = getGearRatios()
    console.log('Result:', res)
    // Result: 79026871
})
