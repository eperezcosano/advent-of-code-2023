#!/bin/bash

day=$1
mkdir -p ${day}
template="/*
*   --- Day X:  ---
*          --- Part X ---
*        Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./${day}.txt')
})

lineReader.on('line', (line) => {
})

lineReader.on('close', () => {
    // Result:
})
"

echo "$template" > ${day}/${day}_1.js
echo "$template" > ${day}/${day}_2.js
touch ${day}/${day}.txt
