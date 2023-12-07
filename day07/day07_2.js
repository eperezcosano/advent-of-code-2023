/*
*   --- Day 7: Camel Cards ---
*        --- Part Two ---
*       Advent Of Code 2023
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})

const cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
const hands = []

function handValue(hand) {
    const occurrences = hand.split('').reduce((acc, val) => {
        return acc[val] ? ++acc[val] : acc[val] = 1, acc
    }, {})

    let jokers = occurrences['J']

    if (jokers) delete occurrences['J']
    else jokers = 0
    
    if (jokers === 5) return 54

    const values = Object.values(occurrences)
    return parseInt('' + (Math.max(...values) + jokers) + (5 - values.length))
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
    // Result: 254115617
})
