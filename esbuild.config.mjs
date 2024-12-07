import { glslifyInline } from '@rubenrodriguez/esbuild-plugin-glslify'
import aliasPlugin from 'esbuild-plugin-path-alias'

export const esm = {
  entryPoints: ['index.mjs', 'prepare.mjs', 'text.mjs'],
  allowOverwrite: true,
  globalName: 'MixmapGeorender',
  target: 'es6',
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  outExtension: { '.js': '.mjs' },
  plugins: [
    glslifyInline(),
    aliasPlugin({
      '@': process.cwd(),
    }),
  ],
}

export default esm

export const cjs = {
  ...esm,
  format: 'cjs',
  outExtension: { '.js': '.cjs' },
}
