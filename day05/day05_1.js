/*
*   --- Day 5: If You Give A Seed A Fertilizer ---
*                   --- Part One ---
*                 Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day05.txt')
})

let seeds = []
const maps = [[], [], [], [], [], [], []]

function inRange(src, dest, range) {
    return src >= dest && src < dest + range
}

function convert(seeds, map) {
    for (let i = 0; i < seeds.length; i++) {
        for (const [dest, src, range] of map) {
            if (inRange(seeds[i], src, range)) {
                seeds[i] -= src - dest
                break
            }
        }
    }
}

let storeMap = false
let group = -1
lineReader.on('line', (line) => {
    if (line.length == 0) {
        storeMap = false
        group++
    }
    else if (storeMap) maps[group].push(line.split(' ').map(Number))
    else if (line.startsWith('seeds: ')) seeds = line.split(': ')[1].split(' ').map(Number)
    else if (line.endsWith('map:')) storeMap = true
})

lineReader.on('close', () => {
    for (const map of maps) {
        convert(seeds, map)
    }
    const res = Math.min(...seeds)
    console.log('Result:', res)
    // Result: 84470622
})
