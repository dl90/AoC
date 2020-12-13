import util from '../util.js'

function verify (input) {
  let count = 0
  let min
  let max
  let ltr
  let str

  for (let i = 0; i < input.length; i++) {
    const raw = input[i].split(' ')
    const minMax = /^[0-9]+-[0-9]+/.exec(raw)[0].split('-')
    min = +minMax[0]
    max = +minMax[1]
    ltr = raw[1][0]
    str = raw[2]
    const matched = str.match(new RegExp(ltr, 'g'))?.length
    if (matched >= min && matched <= max) count++
  }
  return count
}

function verifyPos (input) {
  let count = 0
  let idx1
  let idx2
  let ltr
  let str

  for (let i = 0; i < input.length; i++) {
    const raw = input[i].split(' ')
    const minMax = /^[0-9]+-[0-9]+/.exec(raw)[0].split('-')
    idx1 = +minMax[0] - 1
    idx2 = +minMax[1] - 1
    ltr = raw[1][0]
    str = raw[2]
    if (str[idx1] !== str[idx2] && (str[idx1] === ltr || str[idx2] === ltr)) count++
  }
  return count
}

// const testInput = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']
main()

async function main () {
  const input = await util.input('./input.txt')
  const part1 = verify.bind(this, input)
  const part2 = verifyPos.bind(this, input)

  util.perf(part1)
  util.perf(part2)
}
