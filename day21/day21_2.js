/*
 *   --- Day 21: Step Counter ---
 *          --- Part Two ---
 *         Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day21.txt'),
})

const grid = []

function move(sy, sx, sn) {
    const seen = new Set()
    seen.add([sy, sx].join())

    const reached = new Set()
    const queue = [[sy, sx, sn]]

    while (queue.length) {
        const [y, x, n] = queue.shift()

        if (n % 2 == 0) reached.add([y, x].join())
        if (n == 0) continue

        for (const [ny, nx] of [[y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]]) {
            if (ny < 0 || nx < 0 || ny >= grid.length || nx >= grid.length || grid[ny][nx] == '#' || seen.has([ny, nx].join())) continue
            seen.add([ny, nx].join())
            queue.push([ny, nx, n - 1])
        }
    }

    return reached.size
}

lineReader.on('line', (line) => grid.push(line.split('')))

lineReader.on('close', () => {
    const mid = Math.floor(grid.length / 2)
    const size = grid.length
    const steps = 26501365
    const width = Math.floor(steps / size) - 1

    const oddGrids = (Math.floor(width / 2) * 2 + 1) ** 2
    const evenGrids = (Math.floor((width + 1) / 2) * 2) ** 2

    const odd = move(mid, mid, size * 2 + 1)
    const even = move(mid, mid, size * 2)

    const topCorner = move(size - 1, mid, size - 1)
    const rightCorner = move(mid, 0, size - 1)
    const btmCorner = move(0, mid, size - 1)
    const leftCorner = move(mid, size - 1, size - 1)
    const corners = topCorner + rightCorner + btmCorner + leftCorner

    const topRightSmall = move(size - 1, 0, mid - 1)
    const topLeftSmall = move(size - 1, size - 1, mid - 1)
    const btmRightSmall = move(0, 0, mid - 1)
    const btmLeftSmall = move(0, size - 1, mid - 1)
    const smallEdges = topRightSmall + topLeftSmall + btmRightSmall + btmLeftSmall

    const topRightLarge = move(size - 1, 0, Math.floor((size * 3) / 2) - 1)
    const topLeftLarge = move(size - 1, size - 1, Math.floor((size * 3) / 2) - 1)
    const btmRightLarge = move(0, 0, Math.floor((size * 3) / 2) - 1)
    const btmLeftLarge = move(0, size - 1, Math.floor((size * 3) / 2) - 1)
    const largeEdges = topRightLarge + topLeftLarge + btmRightLarge + btmLeftLarge

    const res = oddGrids * odd + evenGrids * even + corners + (width + 1) * smallEdges + width * largeEdges
    console.log('Result:', res)
    // Result: 600336060511101
})
