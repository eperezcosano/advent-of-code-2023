/*
 *   --- Day 18: Lavaduct Lagoon ---
 *           --- Part Two ---
 *         Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day18.txt'),
})

const digPlan = []
const vertices = []

function startDigging() {
    let [y, x] = [0, 0]
    let b = 0
    for (const [dir, n] of digPlan) {
        b += n
        if (dir == 0) x += n
        else if (dir == 2) x -= n
        else if (dir == 3) y -= n
        else if (dir == 1) y += n
        vertices.push([y, x])
    }
    return b
}

function shoelace() {
    return vertices.reduce((acc, [y], i, arr) => acc + y * (arr[i > 0 ? i - 1 : arr.length - 1][1] - arr[i < arr.length - 1 ? i + 1 : 0][1]), 0) * 0.5
}

lineReader.on('line', (line) => {
    const raw = line.split(' ')[2]
    const n = parseInt(raw.substring(2, 7), 16)
    const dir = parseInt(raw.substring(7, 8))
    digPlan.push([dir, n])
});

lineReader.on('close', () => {
    const b = startDigging()
    const a = shoelace()
    const res = 1 + a + b / 2
    console.log('Result:', res)
    // Result: 44644464596918
})
