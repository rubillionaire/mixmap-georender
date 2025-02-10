# 7.0.0

The major revision here is allowing for `mixmap-georender` geo data preperation to happen within the context of a Web Worker. This is accomplished by splitting the `prepare` processes into two parts, bits that can be done off the main thread, and those parts that require access to the main thread and its WebGL context. Those main thread portions are mostly spreading values across the calculated props.

- [minor] [prepare] add `propsForMaps` function, which expects a `mixmap` instance, pulls the relevant props required for geo data preperation such that they can be serialized into a Web Worker.
- [minor] [prepare] add `spreadStyleTexture` function, which expects the data for a [georender style texture](https://github.com/rubillionaire/georender-style2png) output, and creates a GPU ready texture, and spreads that value throughout the props produced by the `prepare.update` method. This is intended to be done after Web Worker processing of geo data as the last step before passing props to their draw commands.
- [minor] [prepare] adds `propsIncludeLabels` function, which expects the output of `prepare.update`. With this, it determines if there was any label data accumulated for display.
- [minor] [prepare] [text] allow for label update options to be pass through.

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