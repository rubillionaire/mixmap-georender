import { createGlyphProps, defaultLabelOpts, Label, propsIncludeLabels } from 'tiny-label'

export { createGlyphProps, propsIncludeLabels }

export class PrepareText {
  constructor(opts) {
    this.style = opts.style
    delete opts.style

    this.label = null
    this._labelOpts = {
      ...defaultLabelOpts,
      fontFamily: ['Arial'],
    }
    if (typeof opts == 'object' && opts !== null) {
      this._labelOpts = {
        labelEngine: {
          ...this._labelOpts.labelEngine,
          ...opts.labelEngine,
        },
        ...opts,
      }
    }
    this.label = new Label(this._labelOpts)
  }

  update (props, mapProps, opts) {
    const style = opts.style || this.style

    if (!this.label || !style) return {
      labelEngine: null,
      atlas: [],
      glyphs: [],
    }
    const labelFontFamily = this._labelOpts.fontFamily
    const updateOpts = {
      style: {
        ...style,
        labelFontFamily,
      }
    }

    const labelProps = this.label.update(props, mapProps, updateOpts)

    return labelProps
  }
}
