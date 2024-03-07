/*
*   --- Day 19: Aplenty ---
*      --- Part One ---
*     Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

const workflows = new Map()
const parts = []

function evaluateWorkflow(id, part) {
    const rules = workflows.get(id)
    const defaultResponse = rules[rules.length - 1]

    for (const rule of rules) {
        if (!rule.includes(':')) break

        const [statement, response] = rule.split(':')

        const category = statement.substring(0, 1)
        const operation = statement.substring(1, 2)
        const value = parseInt(statement.slice(2))

        if ((operation == '<' && part[category] < value) || (operation == '>' && part[category] > value)) return response
    }

    return defaultResponse
}

function evaluatePart(part) {
    let id = 'in'
    while (true) {
        const nextInstruction = evaluateWorkflow(id, part)
        if (nextInstruction == 'A') return true
        if (nextInstruction == 'R') return false
        id = nextInstruction
    }
}

let lineBreak = false
lineReader.on('line', (line) => {
    if (line.length == 0) lineBreak = true
    else if (!lineBreak) {
        const [id, rules] = line.slice(0, -1).split('{').map((val, i) => i == 1 ? val.split(',') : val)
        workflows.set(id, rules)
    } else {
        const [x, m, a ,s] = line.slice(1, -1).split(',').map(val => parseInt(val.slice(2)))
        parts.push({x, m, a, s})
    }   
})

lineReader.on('close', () => {
    const accepted = parts.filter(part => evaluatePart(part))
    const res = accepted.reduce((acc, {x, m, a, s}) => acc + x + m + a + s, 0)
    console.log('Result:', res)
    // Result: 386787
})
