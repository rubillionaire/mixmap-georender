import { glslifyInline } from '@rubenrodriguez/esbuild-plugin-glslify'

export const esm = {
  entryPoints: ['index.mjs', 'prepare.mjs', 'text.mjs'],
  globalName: 'MixmapGeorender',
  target: 'es6',
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  outExtension: { '.js': '.mjs' },
  plugins: [
    glslifyInline(),
  ],
}

export default esm

export const cjs = {
  ...esm,
  format: 'cjs',
  outExtension: { '.js': '.cjs' },
}
