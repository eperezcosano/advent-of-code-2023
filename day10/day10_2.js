/*
*   --- Day 10: Pipe Maze ---
*       --- Part Two ---
*     Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10_example.txt')
})

const maze = []
const loop = []

function getStart() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] == 'S') return [y, x]
        }
    }
}

function findNextStartPosition() {
    const [y, x] = loop[0]
    if (['|', '7', 'F'].includes(maze[y - 1][x])) return [y - 1, x]
    if (['-', 'J', '7'].includes(maze[y][x + 1])) return [y, x + 1]
    if (['|', 'L', 'J'].includes(maze[y + 1][x])) return [y + 1, x]
    if (['-', 'L', 'F'].includes(maze[y + 1][x])) return [y, x - 1]
}

function goNextPipe() {
    const [cy, cx] = loop[loop.length - 1]
    const [py, px] = loop[loop.length - 2]
    const pipe = maze[cy][cx]

    if (pipe === 'S') return false

    const [dy, dx] = [cy - py, cx - px]

    if (dx == 0 && pipe === '|') return [cy + dy, cx]
    if (dy == 0 && pipe === '-') return [cy, cx + dx]
    if ((dy == 1 || dx == -1) && pipe === 'L') return [cy + dx, cx + dy]
    if ((dy == 1 || dx == 1) && pipe === 'J') return [cy - dx, cx - dy]
    if ((dy == -1 || dx == 1) && pipe === '7') return [cy + dx, cx + dy]
    if ((dy == -1 || dx == -1) && pipe === 'F') return [cy - dx, cx - dy]
}

function replaceStartPipe() {

    const [sy, sx] = loop[0]

    const [fy, fx] = loop[1]
    const [ly, lx] = loop[loop.length - 1]
    
    const [dfy, dfx] = [fy - sy, fx - sx]
    const [dly, dlx] = [ly - sy, lx - sx]
    
    const up    = ['|', '7', 'F']
    const down  = ['|', 'L', 'J']
    const left  = ['-', 'J', '7']
    const right = ['-', 'L', 'F']

    let startPipe

    if (dfy == -1) startPipe = down.slice()
    else if (dfy == 1) startPipe = up.slice()
    else if (dfx == -1) startPipe = left.slice()
    else if (dfx == 1) startPipe = right.slice()

    if (dly == -1) startPipe = startPipe.filter(pipe => down.includes(pipe))
    else if (dly == 1) startPipe = startPipe.filter(pipe => up.includes(pipe))
    else if (dlx == -1) startPipe = startPipe.filter(pipe => left.includes(pipe))
    else if (dlx == 1) startPipe = startPipe.filter(pipe => right.includes(pipe))

    maze[loop[0][0]][loop[0][1]] = startPipe[0]

}

function findLoop() {
    loop.push(getStart())
    loop.push(findNextStartPosition())

    let nextPipe
    while (nextPipe = goNextPipe()) {
        loop.push(nextPipe)
    }
    loop.pop()
    replaceStartPipe()
}

function getEnclosedTiles() {
    
}

lineReader.on('line', (line) => {
    maze.push(line.split(''))
})

lineReader.on('close', () => {
    findLoop()

    console.log(loop.map(([y, x]) => maze[y][x]).join(''))
    // Result:
})
