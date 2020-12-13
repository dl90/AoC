import path from 'path'
import { promises as fs } from 'fs'
import { PerformanceObserver, performance } from 'perf_hooks'

export default {
  input,
  perf
}

const obs = new PerformanceObserver(items => {
  if (items.getEntries()[0].name === 'duration') process.stdout.write(`\t time: \x1b[32m ${items.getEntries()[0].duration} ms\x1b[0m\n`)
  else process.stdout.write('')
})
obs.observe({ entryTypes: ['measure'] })

async function input (relative) {
  try {
    return (await fs.readFile(path.resolve(relative), 'utf-8')).split('\n')
  } catch (e) {
    console.log(e.message)
  }
}

function perf (func) {
  performance.measure('initial')
  performance.mark('start')
  process.stdout.write(`${func.name.slice(0, 20).padEnd(20, ' ')} => ${func()?.toString().slice(0, 30).padEnd(30, ' ')}`)
  performance.mark('end')
  performance.measure('duration', 'start', 'end')
}
