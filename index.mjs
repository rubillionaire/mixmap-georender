import glsl from 'glslify'
import { unpackVec2, unpackVec3 } from 'int-pack-vec'
import { Shaders as LabelShaders } from 'tiny-label'
var size = [0,0]

const pickTypesArr = ['', 'point', 'line', 'area']
export const pickTypes = pickTypesArr.reduce((accum, curr, index) => {
  accum[curr] = index
  return accum
}, {})


// max features: 255*255 = 65_025
export const pickFragWithType = glsl`
  precision highp float;
  uniform float uPickType;
  varying float vindex;

  #pragma glslify: pack = require('int-pack-vec/pack.glsl');

  void main () {
    vec2 encoded = pack(vindex, vec2(0.));
    gl_FragColor = vec4(encoded, uPickType/255.0, 1.0);
  }
`

// max features: 255*255*255 = 16_581_375
export const pickFragNoType = glsl`
  precision highp float;
  uniform float uPickType;
  varying float vindex;

  #pragma glslify: pack = require('int-pack-vec/pack.glsl');

  void main () {
    vec3 encoded = pack(vindex, vec3(0.));
    gl_FragColor = vec4(encoded, 1.0);
  }
`

export const pickFragTwoWide = glsl`
  precision highp float;
  uniform float uPickType;
  uniform vec2 size;
  varying float vindex;
  varying vec2 vpos;
  varying vec4 vcolor;

  #pragma glslify: pack = require('int-pack-vec/pack.glsl');

  void main () {
    float n = mod((vpos.x*0.5+0.5)*size.x, 2.0);
    vec3 pix1 = pack(vindex, vec3(0.));
    vec3 pix2 = vec3(uPickType/255.0, 0.0, 0.0);
    vec3 currentPix = mix(pix1, pix2, step(1.0, n));
    float opacity = floor(min(vcolor.a, 1.0));
    gl_FragColor = vec4(currentPix, 1.0);
  }
`

export const pickfb = {
  colorType: 'uint8',
  colorFormat: 'rgba',
  depth: true,
}

// assumes
// - the default map.pick({width:1,height:1})
// - mix.create({ ...opts, pickfb }) using the pickfb options above
// - using the provided `pickFrag` above
// returns the unpacked `vindex` value
export const pickUnpackWithType = (vec4) => {
  const index = unpackVec2(vec4.slice(0, 2))
  const type = vec4[2]
  return { index, pickType: pickTypesArr[type] }
}

export const pickUnpackNoType = (vec4) => {
  const index = unpackVec3(vec4.slice(0, 3))
  return { index, pickType: null }
}

export const pickUnpackTwoWide = (vec8) => {
  console.log(vec8.length)
  const index = unpackVec3(vec8.slice(0, 3))
  const type = vec8[4]
  return { index, pickType: pickTypesArr[type] }
}

export default function shaders (map) {
  const pickFrag = pickFragTwoWide
  return {
    pick: (event, cb) => {
      const x = defined(event.offsetX, event.x, 0)
      const y = defined(event.offsetY, event.y, 0)
      // since we pick 2px wide we always want to have an even
      // pixel that we are examining
      // even pix = pix1 = index
      // odd pix = pix2 = pickType
      const opts = {
        width: 2,
        x: x % 2 === 0 ? x : x - 1,
        y: y,
      }
      map.pick(opts, (err, picked) => {
        if (err) cb(err)
        else cb(null, pickUnpackTwoWide(picked))
      })
    },
    points: {
      frag: glsl`
        precision highp float;
        varying vec4 vcolor;
        void main () {
          gl_FragColor = vcolor;
        }
      `,
      pickFrag,
      vert: glsl`
        precision highp float;
        #pragma glslify: Point = require('glsl-georender-style-texture/point.h');
        #pragma glslify: readPoint = require('glsl-georender-style-texture/point.glsl');
        uniform sampler2D styleTexture;
        attribute vec2 position, ioffset;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float aspect, zoom;
        varying float vft, vindex, zindex, vPickType;
        varying vec2 vpos;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Point point = readPoint(styleTexture, featureType, zoom, texSize);
          vcolor = point.fillColor;
          vindex = index;
          zindex = point.zindex;
          vec2 p = offset + ioffset;
          float psizex = 5.0 * point.size / size.x * 2.0;
          float psizey = 5.0 * point.size / size.y * 2.0;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1) + vec4(position.x * psizex, position.y * psizey, 0, 0);
          vpos = gl_Position.xy;
       }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        styleTexture: map.prop('style'),
        texSize: map.prop('imageSize'),
        aspect: function (context) {
          return context.viewportWidth / context.viewportHeight
        },
        uPickType: pickTypes.point,
      },
      attributes: {
        position: [-0.1,0.1,0.1,0.1,0.1,-0.1,-0.1,-0.1],
        ioffset: {
          buffer: map.prop('positions'),
          divisor: 1
        },
        featureType: {
          buffer: map.prop('types'),
          divisor: 1
        },
        index: {
          buffer: map.prop('indexes'),
          divisor: 1
        }
      },
      elements: [[0,1,2], [2,3,0]],
      primitive: "triangles",
      instances: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        }
      }
    },
    lineStroke: {
      frag: glsl`
        precision highp float;
        uniform vec4 viewbox;
        uniform vec2 size;
        uniform float aspect;
        varying vec2 vdist;
        varying float vdashLength, vdashGap;
        varying vec4 vcolor;
        void main () {
          vec2 vb = vec2(viewbox.z-viewbox.x, viewbox.w-viewbox.y);
          vec2 s = vec2(size.x, size.y*aspect);
          float t = length(vdist*s/vb);
          float d = vdashLength;
          float g = vdashGap;
          float x = 1.0 - step(d, mod(t, d+g));
          gl_FragColor = vec4(vcolor.xyz, vcolor.w * x);
        }
      `,
      pickFrag,
      vert: glsl`
        precision highp float;
        #pragma glslify: Line = require('glsl-georender-style-texture/line.h');
        #pragma glslify: readLine = require('glsl-georender-style-texture/line.glsl');
        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float aspect, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex, vdashLength, vdashGap;
        varying vec2 vpos, vnorm, vdist;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Line line = readLine(styleTexture, featureType, zoom, texSize);
          vcolor = line.strokeColor;
          vdashLength = line.strokeDashLength;
          vdashGap = line.strokeDashGap;
          vindex = index;
          zindex = line.zindex;
          vec2 p = position.xy + offset;
          vec2 m = (line.fillWidth+2.0*line.strokeWidthInner)/size;
          vnorm = normalize(normal)*m;
          vdist = dist;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1);
          vpos = gl_Position.xy;
          gl_Position += vec4(vnorm, 0, 0);
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        styleTexture: map.prop('style'),
        texSize: map.prop('imageSize'),
        uPickType: pickTypes.line,
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        index: map.prop('indexes'),
        normal: map.prop('normals'),
        dist: map.prop('distances')
      },
      primitive: "triangle strip",
      count: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        }
      }
    },
    lineFill: {
      frag: glsl`
        precision highp float;
        uniform vec4 viewbox;
        uniform vec2 size;
        uniform float aspect;
        varying float vdashLength, vdashGap;
        varying vec2 vdist;
        varying vec4 vcolor;
        void main () {
          vec2 vb = vec2(viewbox.z-viewbox.x, viewbox.w-viewbox.y);
          vec2 s = vec2(size.x, size.y*aspect);
          float t = length(vdist*s/vb);
          float d = vdashLength;
          float g = vdashGap;
          float x = 1.0 - step(d, mod(t, d+g));
          gl_FragColor = vec4(vcolor.xyz, vcolor.w * x);
          //gl_FragColor = vec4(mix(vec3(0,1,0), vec3(1,0,0), x), 1.0);
        }
      `,
      pickFrag,
      vert: glsl`
        precision highp float;
        #pragma glslify: Line = require('glsl-georender-style-texture/line.h');
        #pragma glslify: readLine = require('glsl-georender-style-texture/line.glsl');
        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float aspect, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex, vdashLength, vdashGap;
        varying vec2 vpos, vnorm, vdist;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Line line = readLine(styleTexture, featureType, zoom, texSize);
          vcolor = line.fillColor;
          vdashLength = line.fillDashLength;
          vdashGap = line.fillDashGap;
          vindex = index;
          zindex = line.zindex + 0.1;
          vec2 p = position.xy + offset;
          vnorm = normalize(normal)*(line.fillWidth/size);
          vdist = dist;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1);
          gl_Position += vec4(vnorm, 0, 0);
          vpos = gl_Position.xy;
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        styleTexture: map.prop('style'),
        texSize: map.prop('imageSize'),
        uPickType: pickTypes.line,
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        index: map.prop('indexes'),
        normal: map.prop('normals'),
        dist: map.prop('distances')
      },
      primitive: "triangle strip",
      count: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        }
      }
    },
    areas: {
      frag: glsl`
        precision highp float;
        varying vec4 vcolor;
        void main () {
          gl_FragColor = vcolor;
        }
      `,
      pickFrag,
      vert: glsl`
        precision highp float;
        #pragma glslify: Area = require('glsl-georender-style-texture/area.h');
        #pragma glslify: readArea = require('glsl-georender-style-texture/area.glsl');
        attribute vec2 position;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float aspect, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex;
        varying vec2 vpos;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Area area = readArea(styleTexture, featureType, zoom, texSize);
          vcolor = area.color;
          vindex = index;
          zindex = area.zindex;
          vec2 p = position.xy + offset;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1);
          vpos = gl_Position.xy;
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        texSize: map.prop('imageSize'),
        styleTexture: map.prop('style'),
        uPickType: pickTypes.area,
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        index: map.prop('indexes'),
      },
      elements: map.prop('cells'),
      primitive: "triangles",
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        }
      }
    },
    areaBorders: {
      frag: glsl`
        precision highp float;
        uniform vec4 viewbox;
        uniform vec2 size;
        uniform float aspect;
        varying vec2 vdist;
        varying float vdashLength, vdashGap;
        varying vec4 vcolor;
        void main () {
          vec2 vb = vec2(viewbox.z-viewbox.x, viewbox.w-viewbox.y);
          vec2 s = vec2(size.x, size.y*aspect);
          float t = length(vdist*s/vb);
          float d = vdashLength;
          float g = vdashGap;
          float x = 1.0 - step(d, mod(t, d+g));
          gl_FragColor = vec4(vcolor.xyz, vcolor.w * x);
        }
      `,
      pickFrag,
      vert: glsl`
        precision highp float;
        #pragma glslify: AreaBorder = require('glsl-georender-style-texture/areaborder.h');
        #pragma glslify: readAreaBorder = require('glsl-georender-style-texture/areaborder.glsl');
        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float aspect, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex, vdashLength, vdashGap;
        varying vec2 vpos, vnorm, vdist;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          AreaBorder areaBorder = readAreaBorder(styleTexture, featureType, zoom, texSize);
          vcolor = areaBorder.color;
          vdashLength = areaBorder.dashLength;
          vdashGap = areaBorder.dashGap;
          vindex = index;
          zindex = areaBorder.zindex;
          vec2 p = position.xy + offset;
          vec2 m = areaBorder.widthInner/size;
          vnorm = normalize(normal)*m;
          vdist = dist;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1);
          vpos = gl_Position.xy;
          gl_Position += vec4(vnorm, 0, 0);
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        styleTexture: map.prop('style'),
        texSize: map.prop('imageSize'),
        uPickType: pickTypes.area,
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        index: map.prop('indexes'),
        normal: map.prop('normals'),
        dist: map.prop('distances')
      },
      primitive: "triangle strip",
      count: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        }
      }
    },
    ...LabelShaders(map),
  }
}

function defined () {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] !== undefined) return arguments[i]
  }
}
