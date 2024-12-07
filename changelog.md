# 6.0.0

- major: retool with esbuild to compile ESM and CJS versions of this module

- [text] major: found that QBZF based text rendering was not working well. instead using `tiny-label` which merges `label-placement-engine` & `tiny-atlas` for SDF based glyph rendering.

- [index] minor: remove `featureCount`, no longer used in `glsl-georender-style-texture`, which is fueled by `georender-style2png`.

- [index] minor: use `int-pack-vec` glsl and js to power the default picking behavior. picking will yield the feature id, which is produced by `prepare._splitSort`, which happens on prepare.update`. there is also a default `pick` function that wraps the `map.pick` as a convinience, since we are picking 2px wide, and then we unpack and give the caller a feature index and feature type.

- [prepare] minor: replace Prepare.prototype.getOpacity with a function exported from `georender-style2png` which pulls opacity. this centralizes all style texture writing and reading into one place. same with finding zindex values.
