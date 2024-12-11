# 6.0.1

- [example] patch: remove picking example, this is covered in the render example

# 6.0.0

- major: retool with esbuild to compile ESM and CJS versions of this module

- [text] major: found that QBZF based text rendering was not working well. instead using `tiny-label` which merges `label-placement-engine` & `tiny-atlas` for SDF based glyph rendering.

- [index] minor: remove `featureCount`, no longer used in `glsl-georender-style-texture`, which is fueled by `georender-style2png`.

- [index] minor: use `int-pack-vec` glsl and js to power the default picking behavior. picking will yield the feature id, which is produced by `prepare._splitSort`, which happens on prepare.update`. there is also a default `pick` function that wraps the `map.pick` as a convinience, since we are picking 2px wide, and then we unpack and give the caller a feature index and feature type.

- [prepare] minor: replace Prepare.prototype.getOpacity with a function exported from `georender-style2png` which pulls opacity. this centralizes all style texture writing and reading into one place. same with finding zindex values.

- [prepare] minor: add an `extend : (attributes, props) => void` to the `prepare` options, this allows for the ability to define additional attribute data that should be spread across T and P keys upon zoom level update (`prepare.update(zoom)`).

- [package] patch: replace get-image-pixels with fast-png for decoding georender texture in our render example, our style texture was not coming out with the same values when first stored as an image and then decoded, so consuming as a binary fetch and using fast-png gave us values consistenet with what were being produced in node.

- [package] patch: bump tiny-label to 1.0.2

- [package] patch: install budo as dev dependencies to run the example

- [package] patch: install @rubenrodriguez/mixmap as dev dependencies to run the example

- [example] rework example using @rubenrodriguez scoped packages, and data produced within. rendering and picking work. although the label placement engine within tiny-label can definitely use some work.