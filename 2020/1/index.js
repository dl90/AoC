import util from '../util.js'

function find (arr, target) {
  const memo = new Set()
  let other

  for (let i = 0; i < arr.length; i++) {
    other = target - arr[i]
    if (memo.has(other)) return arr[i] * other
    memo.add(arr[i])
  }
  return null
}

function findThree (arr, target) {
  const memo = new Set()
  let other

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      other = target - arr[i] - arr[j]
      if (memo.has(other)) return arr[i] * arr[j] * other
      memo.add(arr[j])
    }
  }
  return null
}

// const testInput = [1721, 979, 366, 299, 675, 1456]
main()

async function main () {
  const input = (await util.input('./input.txt')).map(v => parseInt(v))
  const part1 = find.bind(this, input, 2020)
  const part2 = findThree.bind(this, input, 2020)

  util.perf(part1)
  util.perf(part2)
}
