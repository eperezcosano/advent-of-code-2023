/*
*   --- Day 13: Point of Incidence ---
*             --- Part One ---
*            Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day13.txt')
})

const patterns = [[]]

function transpose(arr) {
    let array = arr.map(row => row.split(''))
    return array[0].map((_, colIndex) => array.map(row => row[colIndex])).map(row => row.join(''))
}

function checkReflection(pattern, pos) {
    for (let n = 0; n < pattern.length - pos && pos - n > 0; n++) {
        if (pattern[pos - n - 1] != pattern[pos + n]) return false
    }
    return true 
}

function findReflection(pattern) {
    for (let i = 1; i < pattern.length; i++) {
        if (pattern[i - 1] == pattern[i]) {
            if (checkReflection(pattern, i)) return i
        }
    }
    return 0
}

function findReflections(pattern) {
    const vt = findReflection(transpose(pattern))
    if (vt > 0) return vt
    const hz = findReflection(pattern)
    return hz * 100
}

let group = 0
lineReader.on('line', (line) => {
    if (line.length == 0) {
        group++
        patterns.push([])
    }
    else patterns[group].push(line)
})

lineReader.on('close', () => {
    const res = patterns.reduce((acc, pattern) => acc + findReflections(pattern), 0)
    console.log('Result:', res)
    // Result: 31956
})
