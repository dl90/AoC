import util from '../util.js'

function parseRules (input) {
  const rules = new Map()
  for (const line of input) {
    if (!/no other bags/.test(line)) {
      const lineArr = line.replace(/(\s?bags?\s?)|\.$/g, '').split('contain ')
      const children = lineArr[1].split(', ')
      const bags = new Map()

      for (const child of children) {
        const count = /^(\d)+/.exec(child)[0]
        const key = /(\w)+\s(\w)+$/.exec(child)[0]
        bags.set(key, +count)
      }
      rules.set(lineArr[0], bags)
    }
  }
  return rules
}

function countBagColors (input, bag) {
  const rules = parseRules(input)
  const colors = new Set()

  recur([bag])
  function recur (bagStack) {
    const cur = bagStack.pop()
    for (const [parent, child] of rules) {
      if (child.has(cur) && !colors.has(parent)) {
        bagStack.push(parent)
        colors.add(parent)
      }
    }
    if (bagStack.length) recur(bagStack)
  }
  return colors.size
}

function countBags (input, bag) {
  const rules = parseRules(input)
  return recur(bag) - 1

  function recur (curBag) {
    let count = 1
    const children = rules.get(curBag)
    if (children) {
      for (const [key, val] of children) {
        count += val * recur(key)
      }
    } else return 1
    return count
  }
}

// const testInput1 = [
//   'light red bags contain 1 bright white bag, 2 muted yellow bags.',
//   'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
//   'bright white bags contain 1 shiny gold bag.',
//   'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
//   'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
//   'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
//   'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
//   'faded blue bags contain no other bags.',
//   'dotted black bags contain no other bags.'
// ]
// const testInput2 = [
//   'shiny gold bags contain 2 dark red bags.',
//   'dark red bags contain 2 dark orange bags.',
//   'dark orange bags contain 2 dark yellow bags.',
//   'dark yellow bags contain 2 dark green bags.',
//   'dark green bags contain 2 dark blue bags.',
//   'dark blue bags contain 2 dark violet bags.',
//   'dark violet bags contain no other bags.'
// ]
main()

async function main () {
  const input = await util.input('./input.txt')
  const bag = 'shiny gold'
  const part1 = countBagColors.bind(this, input, bag)
  const part2 = countBags.bind(this, input, bag)

  util.perf(part1)
  util.perf(part2)
}
