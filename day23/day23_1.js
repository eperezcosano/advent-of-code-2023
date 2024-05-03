/*
 *   --- Day 23: A Long Walk ---
 *        --- Part One ---
 *       Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day23.txt'),
})

const map = []
const points = []
const graph = {}

function createPointsOfInterest(start, end) {
    points.push(...[start, end])
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == '#') continue
            let neighbors = 0
            for (const [ny, nx] of [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]]) {
                if (ny >= 0 && nx >= 0 && ny < map.length && nx < map[ny].length && map[ny][nx] != '#') neighbors++
            }
            if (neighbors >= 3) points.push([y, x])
        }
    }
}

function fillGraph() {
    points.forEach((point) => (graph[point.join()] = {}))
    const dirs = {
        '^': [[-1, 0]],
        'v': [[1, 0]],
        '<': [[0, -1]],
        '>': [[0, 1]],
        '.': [[-1, 0], [1, 0], [0, -1], [0, 1]]
    }

    for (const [cy, cx] of points) {
        const queue = [[0, cy, cx]]
        const seen = new Set([cy, cx].join())

        while (queue.length) {
            const [n, y, x] = queue.shift()

            if (n != 0 && [cy, cx].join() != [y, x].join() && points.find(([py, px]) => py == y && px == x)) {
                graph[[cy, cx].join()][[y, x].join()] = n
                continue
            }

            for (const [dy, dx] of dirs[map[y][x]]) {
                const [ny, nx] = [y + dy, x + dx]
                if (ny >= 0 && nx >= 0 && ny < map.length && nx < map[ny].length && map[ny][nx] != '#' && !seen.has([ny, nx].join())) {
                    queue.push([n + 1, ny, nx])
                    seen.add([ny, nx].join())
                }
            }
        }
    }
}

function getLongestPath(start, end) {
    const seen = new Set()
    function dfs(point) {
        if (point == end.join()) return 0
        let max = -Infinity
        seen.add(point)
        for (const next of Object.keys(graph[point])) {
            if (!seen.has(next)) {
                max = Math.max(max, dfs(next) + graph[point][next])
            }
        }
        seen.delete(point)
        return max
    }
    return dfs(start.join())
}

lineReader.on('line', (line) => map.push(line.split('')))

lineReader.on('close', () => {
    const start = [0, map[0].indexOf('.')]
    const end = [map.length - 1, map[map.length - 1].indexOf('.')]
    createPointsOfInterest(start, end)
    fillGraph()
    const res = getLongestPath(start, end)
    console.log('Result:', res)
    // Result: 2166
})
