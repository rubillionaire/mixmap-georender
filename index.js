var glsl = require('glslify')
var size = [0,0]

module.exports = function (map) {
  return {
    points: {
      frag: glsl`
        precision highp float;
        varying vec4 vcolor;
        void main () {
          gl_FragColor = vcolor;
        }
      `,
      pickFrag: `
        precision highp float;
        varying float vft, vindex;
        varying vec2 vp;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float opacity = floor(min(vcolor.w, 1.0));
          //gl_FragColor = vec4(vindex, vft, opacity, 1.0);
          gl_FragColor = vec4(vp, opacity, 1.0);
        }
      `,
      vert: glsl`
        precision highp float;
        #pragma glslify: Point = require('glsl-georender-style-texture/point.h');
        #pragma glslify: readPoint = require('glsl-georender-style-texture/point.glsl');
        uniform sampler2D styleTexture;
        attribute vec2 position, ioffset;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float featureCount, aspect, zoom, vw, vh;
        varying float vft, vindex, zindex;
        varying vec2 vp;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Point point = readPoint(styleTexture, featureType, zoom, featureCount);
          vcolor = point.color;
          vindex = index;
          zindex = point.zindex;
          float a = (viewbox.z-viewbox.x)*point.size*0.1;
          float b = (viewbox.w-viewbox.y)*point.size*0.1;
          float c = step(0.0, a)*step(a, 0.00009)*(position.x*0.054*(a+0.00001)) +
            step(0.0001, a)*step(a, 0.00017)*(position.x*0.019*a) +
            step(0.00018, a)*step(a, 0.0003)*(position.x*0.02*a) +
            step(0.00031, a)*step(a, 1.0)*(position.x*0.01*a);
          float d = step(0.0, b)*step(b, 0.00009)*(position.y*0.054*(b+0.00001)) +
            step(0.0001, b)*step(b, 0.00017)*(position.y*0.019*b) +
            step(0.00018, b)*step(b, 0.00019)*(position.y*0.02*b) +
            step(0.0002, b)*step(b, 1.0)*(position.y*0.01*b);
          //float c = a > 0.000005 ? position.x*((viewbox.z-viewbox.x)*point.size*0.001) : position.x*((viewbox.z-viewbox.x)*point.size*0.005);
          //float d = b > 0.000003 ? position.y*((viewbox.w-viewbox.y)*point.size*0.001) : position.y*((viewbox.w-viewbox.y)*point.size*0.003);
          vec2 pp = vec2(c,d);
          //vec2 pp = vec2(
          //  position.x*(viewbox.z-viewbox.x)*point.size*0.0005,
          //  position.y*(viewbox.w-viewbox.y)*point.size*0.0005
          //); 
          vec2 p = pp + offset + ioffset;
          vp = pp;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1);
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        styleTexture: map.prop('style'),
        featureCount: map.prop('featureCount'),
				aspect: function (context) {
					return context.viewportWidth / context.viewportHeight
				},
			  vw: function (context) {
          return context.viewportWidth
        },
			  vh: function (context) {
          return context.viewportHeight
        },
      },
      attributes: {
        position: [-1.0,1.0,1.0,1.0,1.0,-1.0,-1.0,-1.0],
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
      instances: (context, props) =>  props.positions.length/2,
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
      pickFrag: `
        precision highp float;
        varying float vft, vindex;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float opacity = floor(min(vcolor.w, 1.0));
          gl_FragColor = vec4(vindex, vft, 2.0+opacity, 1.0);
        }
      `,
      vert: glsl`
        precision highp float;
        #pragma glslify: Line = require('glsl-georender-style-texture/line.h');
        #pragma glslify: readLine = require('glsl-georender-style-texture/line.glsl');
        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float featureCount, aspect, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex, vdashLength, vdashGap;
        varying vec2 vpos, vnorm, vdist;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Line line = readLine(styleTexture, featureType, zoom, featureCount);
          vcolor = line.strokeColor;
          vdashLength = line.strokeDashLength;
          vdashGap = line.strokeDashGap;
          vindex = index;
          zindex = line.zindex;
          vec2 p = position.xy + offset;
          vec2 m = (line.fillWidth+2.0*line.strokeWidth)/size;
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
        featureCount: map.prop('featureCount')
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
      pickFrag: `
        precision highp float;
        uniform vec4 viewbox;
        uniform vec2 size;
        varying float vft, vindex, vdashLength, vdashGap;
        varying vec4 vcolor;
        uniform float featureCount;
        varying vec2 vdist;
        void main () {
          float opacity = floor(min(vcolor.w, 1.0));
          gl_FragColor = vec4(vindex, vft, 2.0+opacity, 1.0);
        }
      `,
      vert: glsl`
        precision highp float;
        #pragma glslify: Line = require('glsl-georender-style-texture/line.h');
        #pragma glslify: readLine = require('glsl-georender-style-texture/line.glsl');
        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float featureCount, aspect, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex, vdashLength, vdashGap;
        varying vec2 vpos, vnorm, vdist;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Line line = readLine(styleTexture, featureType, zoom, featureCount);
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
        featureCount: map.prop('featureCount')
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
      pickFrag: `
        precision highp float;
        varying float vft, vindex;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float opacity = floor(min(vcolor.w, 1.0));
          gl_FragColor = vec4(vindex, vft, 4.0+opacity, 1.0);
        }
      `,
      vert: glsl`
        precision highp float;
        #pragma glslify: Area = require('glsl-georender-style-texture/area.h');
        #pragma glslify: readArea = require('glsl-georender-style-texture/area.glsl');
        attribute vec2 position;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float aspect, featureCount, zoom;
        uniform sampler2D styleTexture;
        varying float vft, vindex, zindex;
        varying vec4 vcolor;
        void main () {
          vft = featureType;
          Area area = readArea(styleTexture, featureType, zoom, featureCount);
          vcolor = area.color;
          vindex = index;
          zindex = area.zindex;
          vec2 p = position.xy + offset;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex), 1);
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        featureCount: map.prop('featureCount'),
        styleTexture: map.prop('style')
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        index: map.prop('indexes')
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
    labels: {
      frag: `
      precision mediump float;
      void main () {
        gl_FragColor = vec4(0,0,1,1);
      }`,
      vert: `
      precision mediump float;
      attribute vec2 position;
      void main () {
        gl_Position = vec4(position.xy*vec2(1,-1)*0.2, 0, 1);
      }`,
      attributes: {
        position: map.prop('positions')
      },
      elements: map.prop('cells'),
      depth: { enable: false }
    }
  }
}
