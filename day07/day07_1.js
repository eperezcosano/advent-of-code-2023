/*
*   --- Day 7: Camel Cards ---
*        --- Part One ---
*       Advent Of Code 2023
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()
const hands = []

function handValue(hand) {
    const occurrences = hand.split('').reduce((acc, val) => {
        return acc[val] ? ++acc[val] : acc[val] = 1, acc
    }, {})
    const values = Object.values(occurrences)
    return parseInt('' + Math.max(...values) + (5 - values.length))
}

function cardsValue(hand) {
    const cardsValue = hand.split('').map(card => 10 + cards.indexOf(card))
    return parseInt(cardsValue.join(''))
}

lineReader.on('line', (line) => {
    const [hand, bid] = line.split(' ')
    hands.push([hand, parseInt(bid)])
})

lineReader.on('close', () => {
    hands.sort((a, b) => {
        const orderByHandValue = handValue(b[0]) - handValue(a[0])
        if (orderByHandValue != 0) return orderByHandValue
        return cardsValue(b[0]) - cardsValue(a[0])
    }).reverse()
    const res = hands.reduce((acc, hand, i) => acc + (hand[1] * (i + 1)), 0)
    console.log('Result:', res)
    // Result: 254024898
})
