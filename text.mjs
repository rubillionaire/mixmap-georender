import { defaultLabelOpts, Label } from 'tiny-label'


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

  update (props, map, opts) {
    const style = opts.style || this.style

    if (!this.label || !style) return {
      labelEngine: null,
      atlas: [],
      glyphs: [],
    }
    const labelFontFamily = this._labelOpts.fontFamily
    const labelProps = this.label.update(props, map, {
      style: {
        ...style,
        labelFontFamily,
      }
    })
    const baseGamma = 2.0 * 1.4142
    const glyphs = labelProps.glyphs =[]
    for (let i = 0; i < labelProps.atlas.length; i++) {
      const glyphProps = []
      for (let j = 0; j < labelProps.atlas[i].glyphs.length; j++) {
        const glyph = labelProps.atlas[i].glyphs[j]
        const { fontSize, fillColor, strokeColor, strokeWidth } = glyph
        const gamma = baseGamma/fontSize
        const stroke = {
          ...glyph,
          buffer: 0.75 - (strokeWidth / fontSize),
          gamma,
          color: strokeColor
        }
        const fill = {
          ...glyph,
          buffer: 0.75,
          gamma,
          color: fillColor
        }
        glyphProps.push(stroke)
        glyphProps.push(fill)
      }
      glyphs.push(glyphProps)
    }

    return labelProps
  }
}