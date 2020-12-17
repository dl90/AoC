import util from '../util.js'

function find (arr, target) {
  const memo = new Set()

  for (const num of arr) {
    let other = target - num
    if (memo.has(other)) return num * other
    memo.add(num)
  }
  return -1
}

function findThree (arr, target) {
  const memo = new Set()
  arr.sort((a, b) => a - b)
  const fArr = arr.filter((v) => v < target - arr[0] - arr[1])

  for (let i = 0; i < fArr.length; i++) {
    for (let j = i + 1; j < fArr.length; j++) {
      let other = target - fArr[i] - fArr[j]
      if (memo.has(other)) return fArr[i] * fArr[j] * other
      memo.add(fArr[j])
    }
  }
  return -1
}

// const testInput = [1721, 979, 366, 299, 675, 1456]
main()

async function main () {
  const input = (await util.input('./input.txt')).map(Number)
  const part1 = find.bind(this, input, 2020)
  const part2 = findThree.bind(this, input, 2020)

  util.perf(part1)
  util.perf(part2)
}
