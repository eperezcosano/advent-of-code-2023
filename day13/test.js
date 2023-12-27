const a = "...#..."
const b = ".#.#.#."

function checkIfDiffersByOne(rowA, rowB) {
    let n = -1
    for (let i = 0; i < rowA.length; i++) {
        if (rowA[i] != rowB[i]) {
            if (n == -1) n = i
            else return -1
        }
    }
    return -1
}

console.log(checkIfDiffersByOne(a, b))