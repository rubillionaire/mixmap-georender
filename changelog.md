- major: retool with esbuild to compile ESM and CJS versions of this module

- major: replace QBZF based text rendering with `tiny-label` which merges `label-placement-engine` & `tiny-atlas` for SDF based glyph rendering.
  - TODO, complete this transition

- minor: remove `featureCount`, no longer used in `glsl-georender-style-texture`, which is fueled by `georender-style2png`.

- minor: use `int-pack-vec` glsl and js to power the default picking behavior. picking will yield the feature id, which is produced by `prepare._splitSort, which happens on prepare.update`.
  - there is now also a common `pickFrag` shader. it looks like the previous provided `pickFrag` was dependent on type, and would store the `vindex` value in 1 pixel, and the neighbhoring pixel would be the opacity value scaled by some degree. I am not sure why storing the opacity would be useful, so I have opted to just store the `vindex` value, and provide a function, `pickUnpack`, to unpack the value.