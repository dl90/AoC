import util from '../util.js'

function binarySearch (string, target, end, start = 0) {
  for (let i = 0; i < string.length; i++) {
    let mid = Math.floor(start + (end - start) / 2)
    string[i] === target
      ? start = mid + 1
      : end = mid
  }
  return start === end ? start : -1
}

function setup (input) {
  return input.map((code, idx) => {
    const rowInput = code.slice(0, 7)
    const colInput = code.slice(7, 10)
    const row = binarySearch(rowInput, 'B', 127)
    const col = binarySearch(colInput, 'R', 7)
    if (row < 0 || col < 0) throw new Error(`target not found @ ${idx}`)
    return row * 8 + col
  })
}

function highestID (input) {
  return Math.max(...setup(input))
}

function yourID (input) {
  const ids = setup(input)
  const min = Math.min(...ids)
  const bucket = new Int8Array(ids.length)
  ids.forEach(v => { bucket[v - min] = 1 })
  return bucket.indexOf(0) + min
}

// const testInput = ['FBFBBFFRLR']
main()

async function main () {
  const input = await util.input('./input.txt')
  const part1 = highestID.bind(this, input)
  const part2 = yourID.bind(this, input)

  util.perf(part1)
  util.perf(part2)
}
