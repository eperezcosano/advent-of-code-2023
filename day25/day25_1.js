/*
*   --- Day 25: Snowverload ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day25.txt')
})

const vertices = new Set()
const edges = []

function karger() {
    let verticesTmp
    let edgesTmp
    do {
        edgesTmp = JSON.parse(JSON.stringify(edges))
        verticesTmp = new Set(vertices)
        while (verticesTmp.size > 2) {
            const n = Math.floor(Math.random() * edgesTmp.length)
            const [u, v] = edgesTmp[n]
            verticesTmp.delete(u)
            verticesTmp.delete(v)
            const uv = [u, v].join()
            verticesTmp.add(uv)
            edgesTmp.splice(n, 1)
            edgesTmp = edgesTmp.map(([a, b]) => {
                if (a == u || a == v) a = uv
                if (b == u || b == v) b = uv
                return [a, b]
            }).filter(([a, b]) => a != b)
        }
    } while (edgesTmp.length != 3)
    return Array.from(verticesTmp).map(str => str.split(',')).reduce((acc, val) => acc * val.length, 1)
}

lineReader.on('line', (line) => {
    const [wire, others] = line.split(': ')
    vertices.add(wire)
    others.split(' ').forEach(other => {
        vertices.add(other)
        edges.push([wire, other])
    })
})

lineReader.on('close', () => {
    const res = karger()
    console.log('Result:', res)
    // Result: 543834
})