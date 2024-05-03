/*
 *   --- Day 24: Never Tell Me The Odds ---
 *             --- Part Two ---
 *            Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day24.txt'),
})

const hailstones = []

function add(A, B, n) {
    const [x0, y0, z0, vx0, vy0, vz0] = hailstones[0]
    const [xn, yn, zn, vxn, vyn, vzn] = hailstones[n]
    A.push([vy0 - vyn, vxn - vx0, 0n, yn - y0, x0 - xn, 0n])
    A.push([vz0 - vzn, 0n, vxn - vx0, zn - z0, 0n, x0 - xn])
    B.push(x0 * vy0 - y0 * vx0 - xn * vyn + yn * vxn)
    B.push(x0 * vz0 - z0 * vx0 - xn * vzn + zn * vxn)
}

function det(m) {
    if (m.length == 0) return 1n
    let [l, ...r] = m
    r = l.map((n, i) => n * det(r.map(c => c.toSpliced(i, 1))))
    return r.reduce((a, b, i) => (i % 2 ? a - b : a + b), 0n)
}

function cramer(A, B) {
    const detA = det(A)
    return A.map((_, i) => det(A.map((r, j) => r.toSpliced(i, 1, B[j]))) / detA)
}

lineReader.on('line', (line) => hailstones.push(line.replace('@', ',').split(',').map(BigInt)))

lineReader.on('close', () => {
    const [A, B] = [[], []]
    for (let i = 1; i <= 3; i++) add(A, B, i)
    const [x, y, z] = cramer(A, B)
    const res = parseInt(x + y + z)
    console.log('Result:', res)
    // Result: 580043851566574
})
