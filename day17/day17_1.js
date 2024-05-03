/*
 *   --- Day 17: Clumsy Crucible ---
 *           --- Part One ---
 *         Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day17.txt'),
})

const grid = []
const queue = []

function swap(n, m) {
    const tmp = queue[n]
    queue[n] = queue[m]
    queue[m] = tmp
}

function enqueue(element) {
    queue.push(element)
    let n = queue.length - 1
    while (n > 0) {
        const p = Math.floor((n - 1) / 2)
        if (queue[p][0] <= queue[n][0]) break
        swap(p, n)
        n = p
    }
}

function dequeue() {
    if (queue.length == 0) return null
    const element = queue[0]
    queue[0] = queue[queue.length - 1]
    queue.pop()
    let n = 0
    while (true) {
        const l = 2 * n + 1
        const r = l + 1
        if (l >= queue.length) break
        const c = (r < queue.length && queue[r][0] < queue[l][0]) ? r : l
        if (queue[n][0] < queue[c][0]) break
        else swap(n, c)
        n = c
    }
    return element
}

function dijkstra() {
    const seen = new Set()
    enqueue([0, 0, 0, 0, 0, 0])

    while (queue.length) {
        const [h, y, x, dy, dx, n] = dequeue()

        if (seen.has([y, x, dy, dx, n].join())) continue
        seen.add([y, x, dy, dx, n].join())

        if (y == grid.length - 1 && x == grid[0].length - 1) return h

        if (n < 3 && [dy, dx].join() != '0,0') {
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                enqueue([h + grid[ny][nx], ny, nx, dy, dx, n + 1])
            }
        }

        for (const [ndy, ndx] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            if ([ndy, ndx].join() != [dy, dx].join() && [ndy, ndx].join() != [-dy, -dx].join()) {
                const ny = y + ndy
                const nx = x + ndx
                if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                    enqueue([h + grid[ny][nx], ny, nx, ndy, ndx, 1])
                }
            }
        }
    }
}

lineReader.on('line', (line) => grid.push([...line].map(Number)))

lineReader.on('close', () => {
    const res = dijkstra()
    console.log('Result:', res)
    // Result: 859
})