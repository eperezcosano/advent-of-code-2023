/*
 *   --- Day 24: Never Tell Me The Odds ---
 *             --- Part One ---
 *            Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day24.txt'),
})

const testArea = [200_000_000_000_000, 400_000_000_000_000]
const hailstones = []

function intersect([x1, y1, , vx1, vy1], [x2, y2, , vx2, vy2]) {
    const [m1, m2] = [vy1 / vx1, vy2 / vx2]
    const [c1, c2] = [y1 - m1 * x1, y2 - m2 * x2]
    const x = (c2 - c1) / (m1 - m2)
    const y = m1 * x + c1
    const [t1, t2] = [(x - x1) / vx1, (x - x2) / vx2]
    if (t1 < 0 || t2 < 0) return false
    return !(x < testArea[0] || y < testArea[0] || x > testArea[1] || y > testArea[1])
}

lineReader.on('line', (line) => hailstones.push(line.replace('@', ',').split(',').map(Number)))

lineReader.on('close', () => {
    const res = hailstones.reduce((acc, current, i) => acc + hailstones.slice(i + 1).reduce((acc, other) => intersect(current, other) ? ++acc : acc, 0), 0)
    console.log('Result:', res)
    // Result: 31208
})
