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

const skipFiles = new Set(['index.dev.html'])

for (const entry of readdirSync(dist, { withFileTypes: true })) {
  if (skipFiles.has(entry.name)) {
    continue
  }

  const source = join(dist, entry.name)
  const target = join(root, entry.name)

  if (entry.isDirectory()) {
    cpSync(source, target, { recursive: true })
  } else {
    cpSync(source, target)
  }
}

const distIndexHtml = join(dist, 'index.html')
const builtIndexHtml = join(root, 'index.html')
if (existsSync(distIndexHtml)) {
  cpSync(distIndexHtml, builtIndexHtml)
}

console.log('Synced dist/ to project root for GitHub Pages (main branch).')