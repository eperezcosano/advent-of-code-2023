/*
*   --- Day 3: Gear Ratios ---
*         --- Part One ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day03.txt')
})

const schematic = []

function getNumber(y, x1, x2) {
    let str = ''
    for (let x = x1; x <= x2; x++) {
        str += schematic[y][x]
    }
    return parseInt(str)
}

function isAdjacentToSymbol(y, x1, x2) {

    for (let x = x1; x <= x2; x++) {

        // All digits must check up and down
        // UP
        if (y > 0 && schematic[y - 1][x] !== '.') return true
        // DOWN
        if (y < schematic.length - 1 && schematic[y + 1][x] !== '.') return true
        
        // Only first digit check left up, left and left down
        if (x === x1) {
            // LEFT UP
            if (y > 0 && x > 0 && schematic[y - 1][x - 1] !== '.') return true
            // LEFT
            if (x > 0 && schematic[y][x - 1] !== '.') return true
            // LEFT DOWN
            if (y < schematic.length - 1 && x > 0 && schematic[y + 1][x - 1] !== '.') return true
        }

        // Only last digit check right up, right and right down
        if (x === x2) {
            // RIGHT UP
            if (y > 0 && x < schematic[y].length - 1 && schematic[y - 1][x + 1] !== '.') return true
            // RIGHT
            if (x < schematic[y].length - 1 && schematic[y][x + 1] !== '.') return true
            // RIGHT DOWN
            if (y < schematic.length - 1 && x < schematic[y].length - 1 && schematic[y + 1][x + 1] !== '.') return true
        }
    }

    return false
}

function getPartNumbers() {
    let sum = 0
    for (let y = 0; y < schematic.length; y++) {
        let startIndex = -1
        for (let x = 0; x < schematic[y].length; x++) {
            if (!isNaN(parseInt(schematic[y][x]))) {
                if (startIndex < 0) startIndex = x
            } 
            if (isNaN(parseInt(schematic[y][x])) || (startIndex != -1 && x == schematic[y].length - 1)) {
                if (startIndex != -1) {
                    const endIndex = x == schematic[y].length - 1 ? x : x - 1
                    if (isAdjacentToSymbol(y, startIndex, endIndex)) {
                        sum += getNumber(y, startIndex, endIndex)
                    }
                    startIndex = -1
                }
            }
        }
    }
    return sum
}

lineReader.on('line', (line) => {
    schematic.push(line.split(''))
})

lineReader.on('close', () => {
    const res = getPartNumbers()
    console.log('Result:', res)
    // Result: 527364
})
