/*
*   --- Day 5: If You Give A Seed A Fertilizer ---
*                   --- Part Two ---
*                 Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day05_example.txt')
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
        //console.log('Out of Range')
        // 0 - not proccessed
        // 1 - processed
        return [[s1, s2], null]
    }

    // Whole Range
    if (m1 <= s1 && m2 >= s2) {
        //console.log('Whole Range')
        // 0 - not proccessed
        // 1 - processed
        return [null, [dest + s1 - m1, dest + s2 - m1]]
    }

    // Low Bound
    if (m1 <= s1 && m2 >= s1 && m2 < s2) {
        //console.log('Low Bound')
        // 0 - not proccessed
        // 1 - processed
        return [ [m2 + 1, s2], [dest + s1 - m1, dest + m2 - m1] ]
    }

    // High Bound
    if (m1 > s1 && m1 <= s2 && m2 >= s2) {
        //console.log('High Bound')
        // 0 - not proccessed
        // 1 - processed
        return [ [s1, m1 - 1], [dest, dest + s2 - m1] ]
    }

    // Mid Range
    if (m1 > s1 && s2 > m2) {
        //console.log('Mid Range')
        // 0 - not proccessed
        // 1 - processed
        return [ [[s1, m1 - 1],[m2 + 1, s2]], [dest, dest + m2 - m1] ]
    }

    console.log('Error', s1, s2, m1, m2, dest, range)
    process.exit(0)

}

function sameRange([x1, x2], [y1, y2]) {
    return x1 == y1 && x2 == y2
}

function convert(map) {

    const processedTotal = []
    const notProcessedTotal = rangeSeeds.slice()

    let rangeSeed
    const seen = new Set()
    while (rangeSeed = notProcessedTotal.shift()) {
        seen.add(rangeSeed.join('-'))
        for (const [dest, src, range] of map) {
            const [notProcessed, processed] = convertRangeSeed(rangeSeed, dest, src, range)
            
            console.log('Processed', processed)
            console.log('NotProcessed', notProcessed)

            if (processed) processedTotal.push(processed)
            if (notProcessed && !notProcessed[0].length) {

                if (!seen.has(notProcessed.join('-'))) notProcessedTotal.push(notProcessed)

            } else if (notProcessed && notProcessed[0].length) {

                if (!seen.has(notProcessed[0].join('-'))) notProcessedTotal.push(notProcessed[0])
                if (!seen.has(notProcessed[1].join('-'))) notProcessedTotal.push(notProcessed[1])

            }
/*
            console.log('Total Processed', processedTotal)
            console.log('Total NotProcessed', notProcessedTotal)
            */
        }
    }

    return toa
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

    console.log(rangeSeeds)

    rangeSeeds = convert(maps[0])

    console.log(rangeSeeds)

    rangeSeeds = convert(maps[1])

    console.log(rangeSeeds)

    /*
    const res = Math.min(...seeds)
    console.log('Result:', res)
*/
    // Result: 
})
