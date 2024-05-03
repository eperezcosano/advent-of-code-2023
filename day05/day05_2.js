/*
*   --- Day 5: If You Give A Seed A Fertilizer ---
*                   --- Part Two ---
*                 Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day05.txt')
})

let rangeSeeds = []
const maps = [[], [], [], [], [], [], []]

function getRangeSeeds() {
    const tmp = []
    for (let i = 0; i < rangeSeeds.length; i++) {
        if (i % 2 === 0) {
            tmp.push([rangeSeeds[i], rangeSeeds[i] + rangeSeeds[i + 1] - 1])
        }
    }
    return tmp
}

function getSegment([, src, range]) {
    return [src, src + range - 1]
}

function isOutOfRange([s1, s2], [m1, m2]) {
    return s1 > m2 || m1 > s2
}

function isLowBound([s1, s2], [m1, m2]) {
    return m1 <= s1 && m2 >= s1 && m2 < s2
}

function getLowBound([s1, s2], [m1, m2], dest) {
    return [ [dest + s1 - m1, dest + m2 - m1], [m2 + 1, s2] ]
}

function isHighBound([s1, s2], [m1, m2]) {
    return m1 > s1 && m1 <= s2 && m2 >= s2
}

function getHighBound([s1, s2], [m1, m2], dest) {
    return [ [s1, m1 - 1], [dest, dest + s2 - m1] ]
}

function isWholeRange([s1, s2], [m1, m2]) {
    return m1 <= s1 && m2 >= s2
}

function getWholeRange([s1, s2], [m1, m2], dest) {
    return [dest + s1 - m1, dest + s2 - m1]
}

function isMidRange([s1, s2], [m1, m2]) {
    return m1 > s1 && s2 > m2
}

function getMidRange([s1, s2], [m1, m2], dest) {
    return [ [s1, m1 - 1], [dest, dest + m2 - m1], [m2 + 1, s2]]
}

function convertRangeSeedToMap([s1, s2], map) {

    map.sort((a, b) => a[1] - b[1])

    const segments = map.filter(segment => !isOutOfRange([s1, s2], getSegment(segment)))

    if (segments.length === 0) return [[s1, s2]]

    const res = []

    for (let i = 0; i < segments.length; i++) {

        const [dest, m1, m2] = [segments[i][0], segments[i][1], segments[i][1] + segments[i][2] - 1]

        if (isLowBound([s1, s2], [m1, m2])) {

            const [processed, remain] = getLowBound([s1, s2], [m1, m2], dest)
            res.push(processed)
            s1 = remain[0]

        } else if (isMidRange([s1, s2], [m1, m2])) {

            const [rawProcessed, processed, remain] = getMidRange([s1, s2], [m1, m2], dest)
            res.push(rawProcessed)
            res.push(processed)
            s1 = remain[0]

        } else if (isWholeRange([s1, s2], [m1, m2])) {

            const processed = getWholeRange([s1, s2], [m1, m2], dest)
            res.push(processed)
            break

        } else if (isHighBound([s1, s2], [m1, m2])) {

            const [remain, processed] = getHighBound([s1, s2], [m1, m2], dest)
            res.push(remain)
            res.push(processed)
            break

        } else {
            res.push([s1, s2])
            break
        }
    }

    return res
}

function convertSeedsToMap(allSeeds, map) {

    const res = []

    for (const rangeSeed of allSeeds) {
        res.push(...convertRangeSeedToMap(rangeSeed, map))
    }

    return res
}

let storeMap = false
let group = -1
lineReader.on('line', (line) => {
    if (line.length == 0) {
        storeMap = false
        group++
    }
    else if (storeMap) maps[group].push(line.split(' ').map(Number))
    else if (line.startsWith('seeds: ')) rangeSeeds = line.split(': ')[1].split(' ').map(Number)
    else if (line.endsWith('map:')) storeMap = true
})

lineReader.on('close', () => {

    rangeSeeds = getRangeSeeds()

    for (const map of maps) {
        rangeSeeds = convertSeedsToMap(rangeSeeds, map)
    }
    const res = Math.min(...rangeSeeds.map(val => val[0]))
    console.log('Result:', res)
    // Result: 26714516
})
