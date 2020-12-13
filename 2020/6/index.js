import util from '../util.js'

function countYes (input) {
  const allAnswers = []
  const answers = new Set()

  for (const line of input) {
    if (line.length) line.split('').forEach(ans => answers.add(ans))
    else {
      allAnswers.push(answers.size)
      answers.clear()
    }
  }
  return allAnswers.reduce((pre, cur) => pre + cur, 0)
}

function allYes (input) {
  const allAnswers = []
  const answers = new Map()
  let count = 0

  for (const line of input) {
    if (line.length) {
      count++
      line.split('').forEach(q => answers.set(q, (answers.get(q) || 0) + 1))
    } else {
      const groupAnswers = []
      for (const [key, val] of answers) {
        if (count === val) groupAnswers.push(key)
      }

      allAnswers.push(groupAnswers)
      answers.clear()
      count = 0
    }
  }
  return allAnswers.reduce((pre, cur) => pre + cur.length, 0)
}

// const testInput = ['abc', '', 'a', 'b', 'c', '', 'ab', 'ac', '', 'a', 'a', 'a', 'a', '', 'b']
main()

async function main () {
  const input = await util.input('./input.txt')
  input.push('')
  const part1 = countYes.bind(this, input)
  const part2 = allYes.bind(this, input)

  util.perf(part1)
  util.perf(part2)
}
