const mixmap = require('@rubenrodriguez/mixmap')
const regl = require('regl')
const { default: prepare, propsForMap } = require('../dist/prepare.cjs')
const { pickfb } = require('../dist/index.cjs')
const decode = require('@rubenrodriguez/georender-pack/decode')
const lpb = require('length-prefixed-buffers/without-count')
const { decode: decodePng } = require('fast-png')
const { default: makeGeoRender } = require('../dist/index.cjs')
const { createGlyphProps } = require('../dist/text.cjs')
 
const mix = mixmap(regl, {
  extensions: [
    'oes_element_index_uint',
    'angle_instanced_arrays'
  ],
})
const map = mix.create({ 
  viewbox: [-67.356661, +17.329674506, -65.575714, +19.110621506],
  backgroundColor: [0.9, 0.9, 0.9, 1.0],
  pickfb,
})
const geoRender = makeGeoRender(map)

const draw = {
  areaP: map.createDraw(geoRender.areas),
  areaT: map.createDraw(geoRender.areas),
  areaBorderP: map.createDraw(geoRender.areaBorders),
  areaBorderT: map.createDraw(geoRender.areaBorders),
  lineStrokeP: map.createDraw(geoRender.lineStroke),
  lineFillP: map.createDraw(geoRender.lineFill),
  lineStrokeT: map.createDraw(geoRender.lineStroke),
  lineFillT: map.createDraw(geoRender.lineFill),
  pointP: map.createDraw(geoRender.points),
  pointT: map.createDraw(geoRender.points),
  label: [],
}

window.addEventListener('click', (event) => {
  geoRender.pick(event, (err, picked) => {
    if (err) return console.log(err)
    const { index, pickType } = picked
    if (!draw[pickType]) return console.log(`no pickType: ${pickType}`)
    let ref = null
    for (let i = 0; i < draw[pickType].props.length; i++) {
      const p = draw[pickType].props[i]
      if (p.indexToId[index] !== undefined) {
        ref = { id: p.indexToId[index], pi: i }
        break
      }
    }
    if (ref) {
      const labels = (draw[pickType].props[ref.pi].labels[ref.id] || [])
        .map(l => l.split('=')[1])
      console.log(Object.assign({ labels }, ref))
    }
    else console.log(`no matching feature id found. index: ${index}, pickType: ${pickType}`)
  })
})

function ready({style, label, decoded}) {
  draw.label = label.fontFamily.map(() => map.createDraw(geoRender.label))
  const prep = prepare({
    stylePixels: style.data,
    styleTexture: map.regl.texture(style),
    zoomStart: 1,
    zoomEnd: 21,
    imageSize: [style.width, style.height],
    decoded,
    label,
  })
  update()
  map.on('viewbox', function () {
    update()
  })
  function update() {
    const props = prep.update(propsForMap(map))
    draw.pointP.props = [props.pointP]
    draw.pointT.props = [props.pointT]
    draw.lineFillP.props = [props.lineP]
    draw.lineStrokeP.props = [props.lineP]
    draw.lineFillT.props = [props.lineT]
    draw.lineStrokeT.props = [props.lineT]
    draw.areaP.props = [props.areaP]
    draw.areaT.props = [props.areaT]
    draw.areaBorderP.props = [props.areaBorderP]
    draw.areaBorderT.props = [props.areaBorderT]
    
    createGlyphProps(props.label, map)
    for (let i = 0; i < draw.label.length; i++) {
      draw.label[i].props = props.label.glyphs[i]
    }
    map.draw()
  }
}

require('resl')({
  manifest: {
    style: {
      type: 'binary',
      src: 'https://rr-studio-assets.nyc3.digitaloceanspaces.com/mixmap-georender/example/georender-basic-setup-style.png',
      parser: (data) => {
        return decodePng(data)
      },
    },
    label: {
      type: 'text',
      src: 'https://rr-studio-assets.nyc3.digitaloceanspaces.com/mixmap-georender/example/georender-basic-setup-label.json',
      parser: JSON.parse,
    },
    decoded: {
      type: 'text',
      src: 'https://rr-studio-assets.nyc3.digitaloceanspaces.com/mixmap-georender/example/basic-stack-georender.nlb64' || location.search.slice(1),
      parser: (data) => {
        const bufs = []
        for (const enc of data.split('\n')) {
          if (enc.trim().length === 0) continue
          const buf = Buffer.from(enc.toString(), 'base64')
          bufs.push(buf)
        }
        return decode(bufs)
      },
    },
  },
  onDone: ready
})

window.addEventListener('resize', function (ev) {
  map.resize(window.innerWidth, window.innerHeight)
})

window.addEventListener('keydown', function (ev) {
  if (ev.code === 'Digit0') {
    map.setZoom(Math.min(6,Math.round(map.getZoom()+1)))
  } else if (ev.code === 'Minus') {
    map.setZoom(map.getZoom()-1)
  } else if (ev.code === 'Equal') {
    map.setZoom(map.getZoom()+1)
  }
})

document.body.style = 'margin: 0px; overflow: hidden;'
document.body.appendChild(mix.render())
document.body.appendChild(map.render({
  width: window.innerWidth,
  height: window.innerHeight,
  mouse: false,
}))
