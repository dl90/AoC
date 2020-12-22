import util from '../util.js'

function parse (input) {
  return input.map(val => {
    const [op, arg] = val.split(' ')
    return { op, arg: +arg }
  })
}

function findAcc (input) {
  const ops = parse(input)
  const visited = new Set()
  let acc = 0

  for (let i = 0; i < ops.length; i++) {
    if (visited.has(i)) return acc
    if (ops[i].op === 'acc') acc += ops[i].arg
    else if (ops[i].op === 'jmp') i += ops[i].arg - 1
    visited.add(i)
  }
}

function fixFindAcc (input) {
  const ops = parse(input)
  const opsHistory = []

  for (let i = 0; i < ops.length; i++) {
    const newOps = Array.from(ops)
    const visited = new Set()
    let acc = 0
    let isInfinite = false

    if (newOps[i].op === 'jmp') newOps[i] = Object.create(newOps[i]).op = 'nop'
    else if (newOps[i].op === 'nop') newOps[i] = Object.create(newOps[i]).op = 'jmp'

    for (let j = 0; j < newOps.length; j++) {
      if (visited.has(j)) {
        isInfinite = true
        opsHistory.push({ acc, visited: true })
        break
      }
      if (newOps[j].op === 'acc') acc += newOps[j].arg
      else if (newOps[j].op === 'jmp') j += newOps[j].arg - 1
      visited.add(j)
    }
    if (!isInfinite) opsHistory.push({ acc, visited: false })
  }

  return opsHistory.find(op => !op.visited).acc
}

// const testInput = [
//   'nop +0',
//   'acc +1',
//   'jmp +4',
//   'acc +3',
//   'jmp -3',
//   'acc -99',
//   'acc +1',
//   'jmp -4',
//   'acc +6'
// ]
main()

async function main () {
  const input = await util.input('./input.txt')
  const part1 = findAcc.bind(this, input)
  const part2 = fixFindAcc.bind(this, input)

  util.perf(part1)
  util.perf(part2)
}
