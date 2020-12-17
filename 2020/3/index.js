import util from '../util.js'

function traverse (input) {
  const x = input[0].length
  let col = 0
  let count = 0

  for (let row = 1; row < input.length; row++) {
    col = (col + 3) % x
    if (input[row][col] === '#') count++
  }
  return count
}

function multiSlope (input, slopes) {
  const x = input[0].length
  const counts = []
  let col = 0
  let count = 0

  for (const slope of slopes) {
    for (let row = slope.down; row < input.length; row += slope.down) {
      col = (col + slope.right) % x
      if (input[row][col] === '#') count++
    }
    counts.push(count)
    col = 0
    count = 0
  }
  return counts.reduce((pre, cur) => pre * cur, 1)
}

// const testInput = [
//   '..##.......',
//   '#...#...#..',
//   '.#....#..#.',
//   '..#.#...#.#',
//   '.#...##..#.',
//   '..#.##.....',
//   '.#.#.#....#',
//   '.#........#',
//   '#.##...#...',
//   '#...##....#',
//   '.#..#...#.#'
// ]
const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 }
]
main()

async function main () {
  const input = await util.input('./input.txt')
  const part1 = traverse.bind(this, input)
  const part2 = multiSlope.bind(this, input, slopes)

  util.perf(part1)
  util.perf(part2)
}
