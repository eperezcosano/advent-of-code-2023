/*
*   --- Day 12: Hot Springs ---
*        --- Part Two ---
*       Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day12.txt')
})

const cache = new Map()

function count(string, nums) {
    if (string == "") return nums.length == 0 ? 1 : 0
    if (nums.length == 0) return string.includes('#') ? 0 : 1

    if (cache.has([string, nums].join('-'))) return cache.get([string, nums].join('-'))
    let result = 0
    if (string[0] == '.' || string[0] == '?') result += count(string.slice(1), nums)
    if (string[0] == '#' || string[0] == '?') {
        if (nums[0] <= string.length && !string.slice(0, nums[0]).includes('.') && (nums[0] == string.length || string[nums[0]] != '#')) {
            result += count(string.slice(nums[0] + 1), nums.slice(1))
        }
    }
    cache.set([string, nums].join('-'), result)
    return result
}

let sum = 0

lineReader.on('line', (line) => {
    const [string, nums] = line.split(' ').map((val, i) => i == 1 ? val.split(',').map(Number) : val)
    sum += count(Array(5).fill(string).join('?'), Array(5).fill(nums).flat())
})

lineReader.on('close', () => {
    console.log('Result:', sum)
    // Result: 28606137449920
})
