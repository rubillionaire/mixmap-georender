import {
  createGlyphProps,
  defaultLabelOpts,
  Label,
  propsIncludeLabels,
  updateOptions,
} from 'tiny-label'

export { createGlyphProps, Label, propsIncludeLabels, updateOptions }

export class PrepareText {
  style
  label
  _labelOpts
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
    const labelFeatureTypes = opts.labelFeatureTypes ?? ['']
    const updateOpts = {
      ...updateOptions,
      ...opts,
      style: {
        ...style,
        labelFontFamily,
      }
    }

    const labelProps = this.label.update(props, mapProps, updateOpts)
    
    return labelProps
  }
}
