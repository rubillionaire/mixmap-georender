import { build } from 'esbuild'
import { esm, cjs } from './esbuild.config.mjs'

await build({
  ...esm,
})

await build({
  ...cjs,
})
