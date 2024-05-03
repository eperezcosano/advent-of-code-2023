/*
*   --- Day 4: Scratchcards ---
*        --- Part Two ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day04.txt')
})

let n = 0
const cards = new Array(212).fill(1)

lineReader.on('line', (line) => {
    const [wins, haves] = line.split(': ')[1].split(' | ').map(str => str.split(' ').flatMap(val => parseInt(val)).filter(val => !isNaN(val)))
    const matches = haves.reduce((acc, have) => wins.includes(have) ? ++acc : acc, 0)
    const currentCard = n++
    for (let i = currentCard + 1; i < cards.length && i < currentCard + matches + 1; i++) {
        cards[i] += cards[currentCard]
    }
})

lineReader.on('close', () => {
    const res = cards.reduce((acc, card) => acc + card, 0)
    console.log('Result', res)
    // Result: 9924412
})
