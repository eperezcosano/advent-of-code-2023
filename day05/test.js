const arr = [ [1, 2] ]
const res1 = null
const res2 = [3, 4]
const res3 = [[3, 4], [5, 6]]

console.log(res2[0].length, res3[0].length)

if (!res2[0].length) console.log('hola')

if (res3) arr.push(...res3)
console.log(arr)