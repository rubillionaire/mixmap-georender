import * as esbuild from 'esbuild'
import { esm, cjs } from './esbuild.config.mjs'

let ctxEsm = await esbuild.context({
  ...esm,
})
await ctxEsm.watch()

let ctxCjs = await esbuild.context({
  ...cjs,
})
await ctxCjs.watch()
