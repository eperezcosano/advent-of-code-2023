/*
*   --- Day 8: Haunted Wasteland ---
*          --- Part Two ---
*        Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day08.txt')
})

const instructions = []
const network = new Map()

function gcd(a, b) { 
    if (a == 0) return b
    return gcd(b % a, a)
}

function getLCM(arr) {
    let res = arr[0]
    for (let i = 1; i < arr.length; i++) {
        res = (arr[i] * res) / gcd(arr[i], res)
    }
    return res
}

function getMinDistance(node) {
    let current = node
    for (let i = 0; ; i++) {
        const [left, right] = network.get(current)
        current = instructions[i % instructions.length] === 'L' ? left : right
        if (current.endsWith('Z')) return i + 1
    }
}

function walk() {
    let nodes = [...network.keys()].filter(node => node.endsWith('A'))

    const min = []
    nodes.forEach(node => min.push(getMinDistance(node)))

    return getLCM(min)
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
    // Result: 22103062509257
})
