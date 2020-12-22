import util from '../util.js'

function firstNum (input, length) {
  const memo = new Map()
  const invalid = []

  for (let i = length, start = 0; i < input.length; i++, start++) {
    const seg = input.slice(start, i)
    for (const num of seg) {
      if (memo.has(input[i] - num)) break
      memo.set(num, 1)
      if (memo.size === length) invalid.push(input[i])
    }
    memo.clear()
  }
  return invalid
}

function contiguous (input, length) {
  const target = firstNum(input, length)[0]

  for (let i = 0, start = 0, sum = 0; i < input.length; i++) {
    sum += input[i]
    while (sum > target) {
      sum -= input[start]
      start++
    }

    if (sum === target) {
      const seg = input.slice(start, i + 1)
      return Math.max(...seg) + Math.min(...seg)
    }
  }
  return -1
}

// const testInput = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576]
main()

async function main () {
  const input = (await util.input('./input.txt')).map(v => +v)
  const part1 = firstNum.bind(this, input, 25)
  const part2 = contiguous.bind(this, input, 25)

  util.perf(part1)
  util.perf(part2)
}
