import util from '../util.js'

function jolt (input, start, range, builtIn) {
  const set = new Set(input)
  const max = Math.max(...input)
  const counts = Array.from(new Array(range + 1), () => 0)

  for (let i = start, j = 0; i <= max; i++, j++) {
    if (set.has(i)) {
      counts[j]++
      j = 0
    }
  }
  counts[builtIn]++
  return counts[1] * counts[3]
}

function sort (input, start, builtIn) {
  const arr = [...input, start, Math.max(...input) + builtIn]
  return arr.sort((a, b) => a - b)
}

function arrangements (input, start, range, builtIn) {
  const sorted = sort(input, start, builtIn)
  return recur(sorted)

  function recur (arr, i = start, memo = new Map()) {
    if (memo.has(i)) return memo.get(i)
    if (i === arr.length - 1) return 1
    let total = 0

    for (let j = 1; j <= range; j++) {
      if (arr[i + j] && arr[i + j] - arr[i] <= range) total += recur(arr, i + j, memo)
    }
    memo.set(i, total)
    return total
  }
}

function dp (input, start, range, builtIn) {
  const sorted = sort(input, start, builtIn)
  const dpArr = Array.from(new Array(sorted.length), () => 0)
  dpArr[start] = 1

  for (let i = 1; i < sorted.length; i++) {
    for (let j = 1; j <= range; j++) {
      if (sorted[i - j] >= 0 && sorted[i] - sorted[i - j] <= range) {
        dpArr[i] += dpArr[i - j]
      }
    }
  }
  return dpArr[dpArr.length - 1]
}

// const testInput1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]
// const testInput2 = [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3]
main()

async function main () {
  const input = (await util.input('./input.txt')).map(v => +v)
  const part1 = jolt.bind(this, input, 0, 3, 3)
  const part2 = arrangements.bind(this, input, 0, 3, 3)
  const x = dp.bind(this, input, 0, 3, 3)

  util.perf(part1)
  util.perf(part2)
  util.perf(x)
}
