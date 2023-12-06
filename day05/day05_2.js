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
    for (let i = 0; i < seeds.length; i++) {
        if (i % 2 == 0) {
            tmp.push([seeds[i], seeds[i] + seeds[i + 1] - 1])
        }
    }
    return tmp
}

function convertRangeSeed([s1, s2], dest, m1, range) {
    const m2 = m1 + range - 1

    // Out of Range
    if (s1 > m2 || m1 > s2) {
        console.log('Out of Range')
        // 0 - not proccessed
        // 1 - processed
        return [[s1, s2], null]
    }

    // Whole Range
    if (m1 <= s1 && m2 >= s2) {
        console.log('Whole Range')
        // 0 - not proccessed
        // 1 - processed
        return [null, [dest + s1 - m1, dest + s2 - m1]]
    }

    // Low Bound
    if (m1 <= s1 && m2 >= s1 && m2 < s2) {
        console.log('Low Bound')
        // 0 - not proccessed
        // 1 - processed
        return [ [m2 + 1, s2], [dest + s1 - m1, dest + m2 - m1] ]
    }

    // High Bound
    if (m1 > s1 && m1 <= s2 && m2 >= s2) {
        console.log('High Bound')
        // 0 - not proccessed
        // 1 - processed
        return [ [s1, m1 - 1], [dest, dest + s2 - m1] ]
    }

    // Mid Range
    if (m1 > s1 && s2 > m2) {
        console.log('Mid Range')
        // 0 - not proccessed
        // 1 - processed
        return [ [[s1, m1 - 1],[m2 + 1, s2]], [dest, dest + m2 - m1] ]
    }

    console.log('Error', s1, s2, m1, m2, dest, range)
    process.exit(0)

}

function getSegment([dest, src, range]) {
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
    //let [s1, s2] = [50, 100]
    //const map = [ [4_000, 0, 2], [5_000, 90, 6], [6_000, 95, 1], [1_000, 500, 5] ]
    map.sort((a, b) => a[1] - b[1])

    const segments = map.filter(segment => !isOutOfRange([s1, s2], getSegment(segment)))

    console.log('Segments', segments)

    const res = []

    for (let i = 0; i < segments.length; i++) {

        const [dest, m1, m2] = [segments[i][0], segments[i][1], segments[i][1] + segments[i][2] - 1]

        if (isLowBound([s1, s2], [m1, m2])) {

            console.log('LowBound')
            const [processed, remain] = getLowBound([s1, s2], [m1, m2], dest)

            res.push(processed)
            s1 = remain[0]

        } else if (isMidRange([s1, s2], [m1, m2])) {

            console.log('MidRange')
            const [rawProcessed, processed, remain] = getMidRange([s1, s2], [m1, m2], dest)
            res.push(rawProcessed)
            res.push(processed)

            s1 = remain[0]

        } else if (isWholeRange([s1, s2], [m1, m2])) {

            console.log('WholeRange')
            const processed = getWholeRange([s1, s2], [m1, m2], dest)

            res.push(processed)
            console.log('NOT CONTINUE')

        } else if (isHighBound([s1, s2], [m1, m2])) {

            console.log('HighBound')
            const [remain, processed] = getHighBound([s1, s2], [m1, m2], dest)
            res.push(remain)
            res.push(processed)
            console.log('NOT CONTINUE')

        } else {
            console.log('Remain Range')
            res.push([s1, s2])
            console.log('NOT CONTINUE')
        }
    }
    console.log(res)

    return res

}

convertRangeSeedToMap()

/*
function sameRange([x1, x2], [y1, y2]) {
    return x1 == y1 && x2 == y2
}

function convert(map) {

    let res = []
    for (const rangeSeed of rangeSeeds) {

        let notProcessedTotal = [rangeSeed.slice()]
        console.log('RangeSeed', rangeSeed)

        for (const [dest, src, range] of map) {

            console.log('MapSeg', [dest, src, range])

            for (let i = 0; i < notProcessedTotal.length; i++) {

                console.log('segment', notProcessedTotal[i])
                const [notProcessed, processed] = convertRangeSeed(notProcessedTotal[i], dest, src, range)
                console.log('notProcessed', notProcessed)
                console.log('processed', processed)

                if (processed) res.push(processed)

                if (!notProcessed) {
                    notProcessedTotal = []
                } else if (!notProcessed[0].length) {
                    notProcessedTotal = [notProcessed]
                } else if (notProcessed[0].length) {
                    notProcessedTotal = notProcessed
                }

                console.log('notProcessedTotal', notProcessedTotal)
                console.log('res', res)

            }
        }

        res = res.concat(notProcessedTotal)
        console.log('resConcat', res)
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
    else if (storeMap) maps[group].push(line.split(' ').map(val => parseInt(val)))
    else if (line.startsWith('seeds: ')) seeds = line.split(': ')[1].split(' ').map(val => parseInt(val))
    else if (line.endsWith('map:')) storeMap = true
})

lineReader.on('close', () => {
    rangeSeeds = getRangeSeeds()

    for (const map of maps) {
        rangeSeeds = convert(map)
    }

    console.log('Final', rangeSeeds)

    const res = Math.min(...rangeSeeds.flatMap(val => val))
    console.log('Result:', res)
    // Result: 
})
*/

// Too high 72612023
