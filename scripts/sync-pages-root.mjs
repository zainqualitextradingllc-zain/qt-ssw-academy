import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')

if (!existsSync(dist)) {
  console.error('dist/ not found. Run npm run build first.')
  process.exit(1)
}

const assetsDir = join(root, 'assets')
if (existsSync(assetsDir)) {
  rmSync(assetsDir, { recursive: true, force: true })
}

for (const entry of readdirSync(dist, { withFileTypes: true })) {
  const source = join(dist, entry.name)
  const target = join(root, entry.name)

  if (entry.isDirectory()) {
    cpSync(source, target, { recursive: true })
  } else {
    cpSync(source, target)
  }
}

const distDevHtml = join(dist, 'index.dev.html')
const builtIndexHtml = join(root, 'index.html')
if (existsSync(distDevHtml)) {
  cpSync(distDevHtml, builtIndexHtml)
}

console.log('Synced dist/ to project root for GitHub Pages (main branch).')