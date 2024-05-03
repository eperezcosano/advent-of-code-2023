/*
 *   --- Day 20: Pulse Propagation ---
 *           --- Part Two ---
 *         Advent Of Code 2023
 * */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day20.txt'),
})

const cables = {}
const states = {}

function gcd(a, b) {
    if (a == 0) return b
    return gcd(b % a, a)
}

function lcm(arr) {
    let res = arr[0]
    for (let i = 1; i < arr.length; i++) {
        res = (arr[i] * res) / gcd(arr[i], res)
    }
    return res
}

function getButtonPresses() {
    const resConj = Object.keys(cables).find((conj) => cables[conj] == 'rx')
    const connectors = Object.keys(cables).filter((cable) => cables[cable] == resConj)
    const cycles = {}
    connectors.forEach((connector) => {cycles[connector] = 0})
    let n = 0
    while (true) {
        n++
        states['broadcaster'].pulse = false
        const pendingToProcess = ['broadcaster']
        while (pendingToProcess.length) {
            const origin = pendingToProcess.shift()
            for (const cable of cables[origin]) {
                if (cable == resConj && states[origin].pulse) {
                    if (cycles[origin] == 0) cycles[origin] = n
                    if (Object.values(cycles).every((cycle) => cycle > 0)) return lcm(Object.values(cycles))
                }
                if (!states[cable]) continue
                if (states[cable].type == '%' && !states[origin].pulse) {
                    states[cable].active = !states[cable].active
                    states[cable].pulse = states[cable].active
                    pendingToProcess.push(cable)
                } else if (states[cable].type == '&') {
                    states[cable].remembers[origin] = states[origin].pulse
                    states[cable].pulse = !Object.values(states[cable].remembers).every((val) => val)
                    pendingToProcess.push(cable)
                }
            }
        }
    }
}

function populateConjunctions() {
    for (const conj in states) {
        if (states[conj].type != '&') continue
        for (const cable in cables) {
            if (cables[cable].includes(conj)) states[conj].remembers[cable] = false
        }
    }
}

lineReader.on('line', (line) => {
    const [input, dest] = line.split(' -> ')
    cables[input == 'broadcaster' ? input : input.substring(1)] = dest.split(', ')
    states[input == 'broadcaster' ? input : input.substring(1)] = {
        type: input == 'broadcaster' ? input : input.substring(0, 1),
        pulse: null,
        active: false,
        remembers: {},
    }
})

lineReader.on('close', () => {
    populateConjunctions()
    const res = getButtonPresses()
    console.log('Result:', res)
    // Result: 227411378431763
})
