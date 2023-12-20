/*
*   --- Day 11: Cosmic Expansion ---
*          --- Part One ---
*         Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day11.txt')
})

let universe = []
const galaxies = new Set()
const distances = new Map()

function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]))
}

function expandRows(arr) {
    const tmp = []
    for (let y = 0; y < arr.length; y++) {
        tmp.push(arr[y])
        if (arr[y].every(space => space == '.')) tmp.push(arr[y])
    }
    return tmp
}

function expandUniverse() {
    universe = transpose(expandRows(transpose(expandRows(universe))))
}

function getGalaxies() {
    for (let y = 0; y < universe.length; y++) {
        for (let x = 0; x < universe[y].length; x++) {
            if (universe[y][x] == '#') galaxies.add([y, x].join('-'))
        }
    }
}

function getDistance(galaxyA, galaxyB) {
    const [y1, x1] = galaxyA.split('-').map(val => parseInt(val))
    const [y2, x2] = galaxyB.split('-').map(val => parseInt(val))
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function getDistances() {
    for (galaxyA of galaxies) {
        for (galaxyB of galaxies) {
            if (galaxyA == galaxyB) continue
            if (distances.has([galaxyA, galaxyB].join('-')) || distances.has([galaxyB, galaxyA].join('-'))) continue
            const distance = getDistance(galaxyA, galaxyB)
            distances.set([galaxyA, galaxyB].join('-'), distance)
        }
    }
}

lineReader.on('line', (line) => {
    universe.push(line.split(''))
})

lineReader.on('close', () => {
    expandUniverse()
    getGalaxies()
    getDistances()
    const res = [...distances.values()].reduce((acc, val) => acc + val, 0)
    console.log('Result:', res)
    // Result: 9214785
})
