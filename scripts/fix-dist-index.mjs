import { existsSync, renameSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const distDevHtml = join(root, 'dist', 'index.dev.html')
const distIndexHtml = join(root, 'dist', 'index.html')

if (!existsSync(distDevHtml)) {
  console.error('dist/index.dev.html not found after build.')
  process.exit(1)
}

if (existsSync(distIndexHtml)) {
  rmSync(distIndexHtml, { force: true })
}

renameSync(distDevHtml, distIndexHtml)
console.log('Renamed dist/index.dev.html -> dist/index.html')