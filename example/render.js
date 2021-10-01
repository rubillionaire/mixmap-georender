var mixmap = require('mixmap')
var regl = require('regl')
var prepare = require('../prepare.js')
var getImagePixels = require('get-image-pixels')
var decode = require('georender-pack/decode')
var lpb = require('length-prefixed-buffers')
 
var mix = mixmap(regl, { extensions: [
  'oes_element_index_uint', 'oes_texture_float','EXT_float_blend',
  'angle_instanced_arrays'] })
var map = mix.create({ 
  viewbox: [+36.2146, +49.9962, +36.2404, +50.0154],
  backgroundColor: [0.82, 0.85, 0.99, 1.0],
  pickfb: { colorFormat: 'rgba', colorType: 'float32' }
})
var geoRender = require('../index.js')(map)

var draw = {
  area: map.createDraw(geoRender.areas),
  areaT: map.createDraw(geoRender.areas),
  lineStroke: map.createDraw(geoRender.lineStroke),
  lineFill: map.createDraw(geoRender.lineFill),
  lineStrokeT: map.createDraw(geoRender.lineStroke),
  lineFillT: map.createDraw(geoRender.lineFill),
  point: map.createDraw(geoRender.points),
  pointT: map.createDraw(geoRender.points),
}

function ready({style, decoded}) {
  var prep = prepare({
    stylePixels: getImagePixels(style),
    styleTexture: map.regl.texture(style),
    zoomStart: 1,
    zoomEnd: 21,
    decoded
  })
  var zoom = Math.round(map.getZoom())
  var props = null
  update(zoom)
  map.on('viewbox', function () {
    var z = Math.round(map.getZoom())
    if (zoom !== z) update(z)
    zoom = z
  })
  function update(zoom) {
    props = prep.update(zoom)
    draw.point.props = [props.pointP]
    draw.pointT.props = [props.pointT]
    draw.lineFill.props = [props.lineP]
    draw.lineStroke.props = [props.lineP]
    draw.lineFillT.props = [props.lineT]
    draw.lineStrokeT.props = [props.lineT]
    draw.area.props = [props.areaP]
    draw.areaT.props = [props.areaT]
    map.draw()
  }
}

require('resl')({
  manifest: {
    style: {
      type: 'image',
      src: 'style.png'
    },
    decoded: {
      type: 'binary',
      src: 'kharkiv',
      parser: data => decode(lpb.decode(Buffer.from(data)))
    }
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
document.body.appendChild(map.render({ width: window.innerWidth, height: window.innerHeight }))
