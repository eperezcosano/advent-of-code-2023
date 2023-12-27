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
    console.log('Check', pos)

    for (let n = 0; pos + n < pattern.length && pos - n > 0; n++) {
        console.log(pos - n - 1, pattern[pos - n - 1], pos + n, pattern[pos - n - 1])
        if (pattern[pos - n - 1] != pattern[pos + n]) return false
    }
    console.log('Reflection Finded')
    return true 
}

function findReflection(pattern) {
    console.log('Find Reflection', pattern)
    for (let i = 1; i < pattern.length; i++) {
        console.log(i - 1, i, pattern[i - 1], pattern[i])
        if (checkReflection(pattern, i)) return i
    }
    return 0
}

function checkIfDiffersByOne(rowA, rowB) {
    let n = -1
    for (let i = 0; i < rowA.length; i++) {
        if (rowA[i] != rowB[i]) {
            if (n == -1) n = i
            else return -1
        }
    }
    return n
}

function replaceMirror(str, index) {
    const char = str[index] == '.' ? '#' : '.'
    return str.substring(0, index) + char + str.substring(index + 1);
}

function checkDifferences(pattern) {
    console.log('checkDifferences')
    for (let i = 0; i < pattern.length - 1; i++) {
        for (let j = i + 1; j < pattern.length; j++) {
            console.log('Check difference', i, pattern[i], j, pattern[j])
            const n = checkIfDiffersByOne(pattern[i], pattern[j])
            
            if (n > -1) {
                console.log('N', n, 'I', i)
                console.log(pattern[i][n])
                pattern[i] = replaceMirror(pattern[i], n)
                const res = findReflection(pattern)
                pattern[i] = replaceMirror(pattern[i], n)
                if (res > 0) return res
                
            }
        }
    }
    return 0
}

function findReflections(pattern) {
    const vt = checkDifferences(transpose(pattern))
    console.log('Vertical', vt)
    if (vt > 0) return vt
    const hz = checkDifferences(pattern)
    console.log('Horizontal', hz)
    if (hz == 0) {
        console.log('No reflection found')
        process.exit(0)
    }
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

// Too low 
// 25305
// 22694
