/*
*   --- Day 13: Point of Incidence ---
*             --- Part Two ---
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
    console.log('Check', pos, pattern.length - pos)

    for (let n = 0; n < pattern.length - pos && pos - n > 0; n++) {
        console.log('n', n, pattern.length - pos)
        console.log(pos - n - 1, pos + n)
        if (pattern[pos - n - 1] != pattern[pos + n]) return false
    }
    console.log('Reflection Finded')
    return true 
}

function findReflection(pattern) {
    for (let i = 1; i < pattern.length; i++) {
        console.log(i - 1, i)
        if (pattern[i - 1] == pattern[i]) {
            if (checkReflection(pattern, i)) return i
        }
    }
    return 0
}

function findReflections(pattern) {
    const vt = findReflection(transpose(pattern))
    console.log('Vertical', vt)
    if (vt > 0) return vt
    const hz = findReflection(pattern)
    console.log('Horizontal', hz)
    if (hz == 0) process.exit(0)
    return hz * 100
}

function summarizeNotes() {
    let sum = 0
    for (pattern of patterns) {
        sum += findReflections(pattern)
    }
    return sum
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
    const res = summarizeNotes()
    console.log('Result:', res)
    // Result:
})
