var glsl = require('glslify')

module.exports = function (map) {
  var styleTexture = null
  return {
    points: {
      frag: glsl`
        precision highp float;
        uniform sampler2D texture, styleTexture;
        varying float vfeatureType;
        uniform float featureCount;
        #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
        void main () {
          vec2 uv = vec2(vfeatureType/(featureCount-1.0),0.5);
          vec4 d = texture2D(styleTexture, uv);
          if (d.x < 0.1) discard;
          //vec3 c = hsl2rgb(0.0+d.y, 1.0, 0.5);
          vec3 c = vec3(d.x, d.y, d.z);
          gl_FragColor = vec4(c, 1.0);
        }
      `,
      vert: `
        precision highp float;
        attribute vec2 position;
        attribute float featureType;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float pointSize, featureCount, aspect;
        uniform sampler2D styleTexture;
        varying float vfeatureType;
        void main () {
          vfeatureType = featureType;
          vec2 uv = vec2(vfeatureType/(featureCount-1.0),0.5);
          vec2 p = position.xy + offset;
          vec4 d = texture2D(styleTexture, uv);
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            0, 1);
          gl_PointSize = d.w;
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
        pointSize: function () {
          if (map.getZoom() <= 13) { pw = 3.0 }      
          else if (map.getZoom() >= 16) { pw = 4.0 }
          else pw = 3.5
          return pw
        },
        styleTexture: function (context, props) {
          return map.regl.texture({
            data: props.style,
            width: props.style.length/4,
            height: 1
          })
        },
        featureCount: function (context, props) {
          return props.styleCount
        }
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types')
      },
      primitive: "points",
      count: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      }
    },
    linesStroke: {
      frag: glsl`
        precision highp float;
        uniform sampler2D texture, styleTexture;
        varying float vfeatureType;
        uniform float featureCount, styleTextureWidth, styleTextureHeight;
        uniform vec2 size;
        varying vec4 d0, d1;
        void main () {
          if (d0.x < 0.1) discard;
          gl_FragColor = vec4(d1.xyz, 1);
        }
      `,
      vert: `
        precision highp float;
        attribute vec2 position, normal;
        attribute float featureType;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float featureCount, aspect, styleTextureHeight, styleTextureWidth, zindex;
        uniform sampler2D styleTexture;
        varying float vfeatureType;
        varying vec2 vpos, vnorm;
        varying vec4 d0, d1;
        void main () {
          vfeatureType = featureType;
          d0 = texture2D(styleTexture, vec2(
            vfeatureType/featureCount+0.5/featureCount,
            0.0/styleTextureHeight + 0.5/styleTextureHeight
          ));
          d1 = texture2D(styleTexture, vec2(
            vfeatureType/featureCount+0.5/featureCount,
            1.0/styleTextureHeight + 0.5/styleTextureHeight
          ));
          vec2 p = position.xy + offset;
          vec2 n = (d0.w+2.0*d1.w)/size;
          vnorm = normalize(normal)*n;
          //float pw = d0.w;
          //vec2 n = pw/size;
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
        styleTextureWidth: styleCount,
        styleTextureHeight: 2,
        styleTexture: function (context, props) {
          if (!styleTexture) {
            styleTexture = map.regl.texture({
              data: props.style,
              width: props.styleCount,
              height: 2
            })
          }
          return styleTexture
        },
        featureCount: function (context, props) {
          return props.styleCount
        },
        zindex: map.prop('zindex')
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        normal: map.prop('normals')
      },
      primitive: "triangle strip",
      count: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      }
    },
    linesFill: {
      frag: glsl`
        precision highp float;
        uniform sampler2D texture, styleTexture;
        varying float vfeatureType;
        uniform float featureCount, styleTextureWidth, styleTextureHeight;
        uniform vec2 size;
        varying vec2 vpos, vnorm;
        varying vec4 d0, d1;
        #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
        void main () {
          if (d0.x < 0.1) discard;
          gl_FragColor = vec4(d0.xyz, 1);
        }
      `,
      vert: `
        precision highp float;
        attribute vec2 position, normal;
        attribute float featureType;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float featureCount, aspect, styleTextureHeight, styleTextureWidth, zindex;
        uniform sampler2D styleTexture;
        varying float vfeatureType;
        varying vec2 vpos, vnorm;
        varying vec4 d0, d1;
        void main () {
          vfeatureType = featureType;
          d0 = texture2D(styleTexture, vec2(
            vfeatureType/featureCount+0.5/featureCount,
            0.0/styleTextureHeight + 0.5/styleTextureHeight
          ));
          d1 = texture2D(styleTexture, vec2(
            vfeatureType/featureCount+0.5/featureCount,
            1.0/styleTextureHeight + 0.5/styleTextureHeight
          ));
          vec2 p = position.xy + offset;
          vec2 n = d0.w/size;
          vnorm = normalize(normal)*n;
          //float pw = d0.w;
          //vec2 n = pw/size;
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
        styleTextureWidth: function (context, props) {
          return props.styleCount
        },
        styleTextureHeight: 2,
        styleTexture: function (context, props) {
          if (!styleTexture) {
            styleTexture = map.regl.texture({
              data: props.style,
              width: props.styleCount,
              height: 2
            })
          }
          return styleTexture
        },
        featureCount: function (context, props) {
          return props.styleCount
        },
        zindex: map.prop('zindex')
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        normal: map.prop('normals')
      },
      primitive: "triangle strip",
      count: function (context, props) {
        return props.positions.length/2
      },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      }
    },
    areas: {
      frag: glsl`
        precision highp float;
        uniform sampler2D texture;
        varying float vfeatureType;
        uniform float featureCount;
        uniform sampler2D styleTexture;
        #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
        void main () {
          vec2 uv = vec2(vfeatureType/(featureCount-1.0),0.5);
          vec4 d = texture2D(styleTexture, uv);
          //if (d.x < 0.1) discard;
          //vec3 c = hsl2rgb(0.0+d.y, 1.0, 0.5);
          gl_FragColor = vec4(d.xyz, 1.0);
        }
      `,
      pickFrag: `
        precision highp float;
        uniform sampler2D texture;
        varying float vfeatureType, vid;
        uniform float featureCount;
        void main () {
          gl_FragColor = vec4(vid, 0.0, 0.0, 1.0);
        }
      `,
      vert: `
        precision highp float;
        attribute vec2 position;
        attribute float featureType, id;
        uniform vec4 viewbox;
        uniform vec2 offset, size;
        uniform float aspect;
        varying float vfeatureType, vid;
        void main () {
          vec2 p = position.xy + offset;
          vfeatureType = featureType;
          vid = id;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            0, 1);
        }
      `,
      uniforms: {
        size: function (context) {
          size[0] = context.viewportWidth
          size[1] = context.viewportHeight
          return size
        },
      },
      attributes: {
        position: map.prop('positions'),
        featureType: map.prop('types'),
        id: map.prop('id')
      },
      elements: map.prop('cells'),
      primitive: "triangles",
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
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
