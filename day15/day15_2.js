/*
*   --- Day 15: Lens Library ---
*         --- Part Two ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day15.txt'),
})

const boxes = new Map()

function hash(str) {
    return str.split('').reduce((acc, _, i) => ((acc + str.charCodeAt(i)) * 17) % 256, 0)
}

function addLens(box, label, lens) {
    if (boxes.has(box)) {
        boxes.get(box).set(label, lens)
    } else {
        const map = new Map()
        map.set(label, lens)
        boxes.set(box, map)
    }
}

function removeLens(box, label) {
    if (boxes.has(box)) {
        const map = boxes.get(box)
        map.delete(label)
        if (map.size == 0) boxes.delete(box)
    }
}

lineReader.on('line', (line) => {
    line.split(',').forEach((step) => {
        if (step.includes('=')) {
            const [label, lens] = step.split('=')
            addLens(hash(label), label, parseInt(lens))
        } else {
            const label = step.slice(0, -1)
            removeLens(hash(label), label)
        }
    })
})

function focusingPower(box) {
    return Array.from(boxes.get(box).values()).reduce((acc, lens, i) => acc + (box + 1) * (i + 1) * lens, 0)
}

lineReader.on('close', () => {
    const res = Array.from(boxes.keys()).reduce((acc, box) => acc + focusingPower(box), 0)
    console.log('Result:', res)
    // Result: 260530
})
