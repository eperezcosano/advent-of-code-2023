/*
*   --- Day 8: Haunted Wasteland ---
*          --- Part One ---
*        Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day08.txt')
})

const instructions = []
const network = new Map()

function walk() {
    let node = 'AAA'
    for (let i = 0; ; i++) {
        const [left, right] = network.get(node)
        node = instructions[i % instructions.length] === 'L' ? left : right
        if (node === 'ZZZ') return i + 1
    }
}

let n = 0
lineReader.on('line', (line) => {
    if (n == 0) instructions.push(...line.split(''))
    if (n >= 2) {
        const [node, dest] = line.split(' = ')
        const [left, right] = dest.split(', ').map(val => val.replace('(', '').replace(')', ''))
        network.set(node, [left, right])
    }
    n++
})

lineReader.on('close', () => {
    const res = walk()
    console.log('Result:', res)
    // Result: 20093
})
