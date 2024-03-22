/*
*   --- Day 19: Aplenty ---
*      --- Part Two ---
*     Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

const workflows = new Map()
const parts = []

function evaluateWorkflow(part) {

    const rules = workflows.get(part.dest)
    const defaultResponse = rules[rules.length - 1]

    const nextParts = []

    for (const rule of rules) {
        if (!rule.includes(':')) break

        const [statement, response] = rule.split(':')

        const category = statement.substring(0, 1)
        const operation = statement.substring(1, 2)
        const value = parseInt(statement.slice(2))

        const newPart = JSON.parse(JSON.stringify(part))
        let newRange = newPart[category]

        if (operation == '<') {
            newRange[1] = value - 1
            part[category][0] = value
        } else {
            newRange[0] = value + 1
            part[category][1] = value
        }

        newPart.dest = response
        newPart[category] = newRange
        nextParts.push(newPart)
    }

    part.dest = defaultResponse
    nextParts.push(part)
    return nextParts
}

function evaluateAllRange() {

    const pendingToProcess = [{dest: 'in', x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]}]
    const accepted = []

    while (pendingToProcess.length) {

        const nextParts = evaluateWorkflow(pendingToProcess.shift())

        for (const part of nextParts) {
            if (part.dest == 'R') continue
            else if (part.dest == 'A') {
                delete part.dest
                accepted.push(part)
            }
            else pendingToProcess.push(part)
        }
    }

    return accepted
}

let lineBreak = false
lineReader.on('line', (line) => {
    if (line.length == 0) lineBreak = true
    if (!lineBreak) {
        const [id, rules] = line.slice(0, -1).split('{').map((val, i) => i == 1 ? val.split(',') : val)
        workflows.set(id, rules)
    }
})

lineReader.on('close', () => {
    const accepted = evaluateAllRange()
    const res = accepted.reduce((acc, part) => acc + Object.values(part).reduce((acc, cat) => acc * (cat[1] - cat[0] + 1), 1), 0)
    console.log('Result:', res)
    // Result: 131029523269531
})
