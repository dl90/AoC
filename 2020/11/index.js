import util from '../util.js'

const directions = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 }
]

function count (grid, char) {
  let count = 0
  for (const row of grid) {
    for (const ele of row) {
      if (ele === char) count++
    }
  }
  return count
}

function traversePt1 (grid) {
  const res = grid.map(v => [...v])
  const yLen = res.length
  const xLen = res[0].length
  let modified = false

  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      let adjacentCount = 0

      for (const dir of directions) {
        if (y + dir.y < 0 || y + dir.y >= yLen || x + dir.x < 0 || x + dir.x >= xLen) continue
        if (adjacentCount > 4) break
        if (grid[y + dir.y][x + dir.x] === '#') adjacentCount++
      }

      if (grid[y][x] === 'L' && adjacentCount === 0) {
        res[y][x] = '#'
        modified = true
      } else if (grid[y][x] === '#' && adjacentCount >= 4) {
        res[y][x] = 'L'
        modified = true
      }
    }
  }
  return { res, modified }
}

function traversePt2 (grid) {
  const res = grid.map(v => [...v])
  const yLen = res.length
  const xLen = res[0].length
  let modified = false

  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      let adjacentCount = 0

      for (const dir of directions) {
        if (y + dir.y < 0 || y + dir.y >= yLen || x + dir.x < 0 || x + dir.x >= xLen) continue
        if (adjacentCount > 5) break

        let curY = y
        let curX = x
        while (curY + dir.y >= 0 && curY + dir.y < yLen && curX + dir.x >= 0 && curX + dir.x < xLen) {
          if (grid[curY + dir.y][curX + dir.x] === 'L') break
          if (grid[curY + dir.y][curX + dir.x] === '#') {
            adjacentCount++
            break
          }
          curY += dir.y
          curX += dir.x
        }
      }

      if (grid[y][x] === 'L' && adjacentCount === 0) {
        res[y][x] = '#'
        modified = true
      } else if (grid[y][x] === '#' && adjacentCount >= 5) {
        res[y][x] = 'L'
        modified = true
      }
    }
  }
  return { res, modified }
}

function occupySeats (input, traverse) {
  const grid = input.map(v => v.split(''))
  let curr = grid
  let modded

  do {
    const { res, modified } = traverse(curr)
    curr = res
    modded = modified
  } while (modded)
  return count(curr, '#')
}

// const testInput = [
//   'L.LL.LL.LL',
//   'LLLLLLL.LL',
//   'L.L.L..L..',
//   'LLLL.LL.LL',
//   'L.LL.LL.LL',
//   'L.LLLLL.LL',
//   '..L.L.....',
//   'LLLLLLLLLL',
//   'L.LLLLLL.L',
//   'L.LLLLL.LL'
// ]
main()

async function main () {
  const input = await util.input('./input.txt')
  const part1 = occupySeats.bind(this, input, traversePt1)
  const part2 = occupySeats.bind(this, input, traversePt2)

  util.perf(part1)
  util.perf(part2)
}
