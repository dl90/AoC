import util from '../util.js'

function populate (input) {
  const passports = []
  let passport = {}

  for (const line of input) {
    if (line.length) {
      const attrs = line.split(' ')
      for (const attr of attrs) {
        const field = attr.split(':')
        passport[field[0]] = field[1]
      }
    } else {
      passports.push(passport)
      passport = {}
    }
  }
  return passports
}

function validate (input, fields) {
  const passports = populate(input)
  const filtered = passports.filter(p =>
    fields.every(field => p[field])
  )
  return filtered.length
}

function moreValidate (input, fields) {
  const passports = populate(input)
  const validators = {
    byr: arg => +arg >= 1920 && +arg <= 2002,
    iyr: arg => +arg >= 2010 && +arg <= 2020,
    eyr: arg => +arg >= 2020 && +arg <= 2030,
    hgt: arg => {
      const num = +/^[0-9]+/.exec(arg)
      if (!/^[0-9]+(cm|in)$/.test(arg)) return false
      if (/(cm)$/.test(arg)) return num >= 150 && num <= 193
      else if (/(in)$/.test(arg)) return num >= 59 && num <= 76
    },
    hcl: arg => /^#[0-9a-f]{6}$/.test(arg),
    ecl: arg => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(arg),
    pid: arg => /^[0-9]{9}$/.test(arg)
  }

  const filtered = passports.filter(p =>
    fields.every(field =>
      p[field] && validators[field](p[field])
    )
  )
  return filtered.length
}

// const testInput = [
//   'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
//   'byr:1937 iyr:2017 cid:147 hgt:183cm',
//   '',
//   'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
//   'hcl:#cfa07d byr:1929',
//   '',
//   'hcl:#ae17e1 iyr:2013',
//   'eyr:2024',
//   'ecl:brn pid:760753108 byr:1931',
//   'hgt:179cm',
//   '',
//   'hcl:#cfa07d eyr:2025 pid:166559648',
//   'iyr:2011 ecl:brn hgt:59in'
// ]
const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
main()

async function main () {
  const input = await util.input('./input.txt')
  input.push('')
  const part1 = validate.bind(this, input, fields)
  const part2 = moreValidate.bind(this, input, fields)

  util.perf(part1)
  util.perf(part2)
}
