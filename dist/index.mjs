var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/glslify/browser.js
var require_browser = __commonJS({
  "node_modules/glslify/browser.js"(exports, module) {
    module.exports = function(strings) {
      if (typeof strings === "string")
        strings = [strings];
      var exprs = [].slice.call(arguments, 1);
      var parts = [];
      for (var i = 0; i < strings.length - 1; i++) {
        parts.push(strings[i], exprs[i] || "");
      }
      parts.push(strings[i]);
      return parts.join("");
    };
  }
});

// index.mjs
var import_glslify = __toESM(require_browser(), 1);
var size = [0, 0];
function shaders(map) {
  return {
    points: {
      frag: `
                precision highp float;
#define GLSLIFY 1

        varying vec4 vcolor;
        void main () {
          gl_FragColor = vcolor;
        }
              `,
      pickFrag: `
        precision highp float;
        uniform vec2 size;
        varying float vft, vindex;
        varying vec2 vpos;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float n = mod((vpos.x*0.5+0.5)*size.x, 2.0);
          vec4 pix1 = vec4(
            floor(vindex/(256.0*256.0)),
            mod(vindex/256.0, 256.0),
            mod(vindex, 256.0),
            255.0) / 255.0;
          float opacity = floor(min(vcolor.w, 1.0));
          //vec4 pix2 = vec4((0.0+opacity)/255.0, 0.0, 0.0, 1.0);
          vec4 pix2 = vec4(10.0/255.0, 0.0, 0.0, 1.0);
          gl_FragColor = mix(pix1, pix2, step(1.0, n));
          /*
          float opacity = floor(min(vcolor.w, 1.0));
          gl_FragColor = vec4(vindex, vft, opacity, 1.0);
          */
        }
      `,
      vert: `
                precision highp float;
#define GLSLIFY 1

        struct Point {
  vec4 fillColor;
  vec4 strokeColor;
  float size;
  float strokeWidthInner;
  float strokeWidthOuter;
  float zindex;
  vec4 labelFillColor;
  vec4 labelStrokeColor;
  float labelFont;
  float labelFontSize;
  float labelPriority;
  float labelConstraints;
  float labelStrokeWidth;
  float sprite;
};

        

float zoomStart = 1.0;
float zoomCount = 21.0;
float pointStart = 0.0;

Point readPoint(sampler2D styleTexture, float featureType, float zoom, vec2 imageSize) {
  float n = 7.0;
  float px = featureType; //pixel x
  float py = pointStart + n * (floor(zoom) - zoomStart); //pixel y

  vec4 d0 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+0.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d1 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+1.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d2 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+2.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d3 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+3.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d4 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+4.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d5 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+5.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d6 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+6.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  Point point;
  point.fillColor = d0;
  point.strokeColor = d1;
  point.size = d2.x;
  point.strokeWidthInner = d2.y;
  point.strokeWidthOuter = d2.z;
  point.zindex = d2.w;
  point.labelFillColor = d3;
  point.labelStrokeColor = d4;
  point.labelFont = d5.x;
  point.labelFontSize = d5.y;
  point.labelPriority = d5.z;
  point.labelConstraints = d5.w;
  point.labelStrokeWidth = d6.x;
  point.sprite = d6.y*256.0 + d6.z;
  return point;
}

        uniform sampler2D styleTexture;
        attribute vec2 position, ioffset;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float featureCount, aspect, zoom;
        varying float vft, vindex, zindex;
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
        size: function(context) {
          size[0] = context.viewportWidth;
          size[1] = context.viewportHeight;
          return size;
        },
        styleTexture: map.prop("style"),
        featureCount: map.prop("featureCount"),
        texSize: map.prop("imageSize"),
        aspect: function(context) {
          return context.viewportWidth / context.viewportHeight;
        }
      },
      attributes: {
        position: [-0.1, 0.1, 0.1, 0.1, 0.1, -0.1, -0.1, -0.1],
        ioffset: {
          buffer: map.prop("positions"),
          divisor: 1
        },
        featureType: {
          buffer: map.prop("types"),
          divisor: 1
        },
        index: {
          buffer: map.prop("indexes"),
          divisor: 1
        }
      },
      elements: [[0, 1, 2], [2, 3, 0]],
      primitive: "triangles",
      instances: function(context, props) {
        return props.positions.length / 2;
      },
      blend: {
        enable: true,
        func: {
          srcRGB: "src alpha",
          srcAlpha: 1,
          dstRGB: "one minus src alpha",
          dstAlpha: 1
        }
      }
    },
    lineStroke: {
      frag: `
                precision highp float;
#define GLSLIFY 1

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
        uniform vec2 size;
        varying float vft, vindex;
        varying vec2 vpos;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float n = mod((vpos.x*0.5+0.5)*size.x, 2.0);
          vec4 pix1 = vec4(
            floor(vindex/(256.0*256.0)),
            mod(vindex/256.0, 256.0),
            mod(vindex, 256.0),
            255.0) / 255.0;
          float opacity = floor(min(vcolor.w, 1.0));
          vec4 pix2 = vec4((2.0+opacity)/255.0, 0.0, 0.0, 1.0);
          gl_FragColor = mix(pix1, pix2, step(1.0, n));
          /*
          float opacity = floor(min(vcolor.w, 1.0));
          gl_FragColor = vec4(vindex, vft, 2.0+opacity, 1.0);
          */
        }
      `,
      vert: `
                precision highp float;
#define GLSLIFY 1

        struct Line {
  vec4 fillColor;
  vec4 strokeColor;
  float fillDashLength;
  float fillDashGap;
  float strokeDashLength;
  float strokeDashGap;
  float fillWidth;
  float strokeWidthInner;
  float strokeWidthOuter;
  float zindex;
  vec4 labelFillColor;
  vec4 labelStrokeColor;
  float labelFont;
  float labelFontSize;
  float labelPriority;
  float labelConstraints;
  float labelStrokeWidth;
  float labelSprite;
  float labelSpritePlacement;
};

        

float zoomStart = 1.0;
float zoomCount = 21.0;
float pointHeight = 7.0*zoomCount;
float lineStart = pointHeight;

Line readLine(sampler2D styleTexture, float featureType, float zoom, vec2 imageSize) {
  float n = 8.0;
  float px = featureType; //pixel x
  float py = lineStart + n * (floor(zoom) - zoomStart); //pixel y

  vec4 d0 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+0.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d1 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+1.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d2 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+2.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d3 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+3.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d4 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+4.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d5 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+5.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d6 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+6.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d7 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+7.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  Line line;
  line.fillColor = d0;
  line.strokeColor = vec4(d1.xyz, d0.w);
  line.fillDashLength = d2.x;
  line.fillDashGap = d2.y;
  line.strokeDashLength = d2.z;
  line.strokeDashGap = d2.w;
  line.fillWidth = d3.x;
  line.strokeWidthInner = d3.y;
  line.strokeWidthOuter = d3.z;
  line.zindex = d3.w;
  line.labelFillColor = d4;
  line.labelStrokeColor = d5;
  line.labelFont = d6.x;
  line.labelFontSize = d6.y;
  line.labelPriority = d6.z;
  line.labelConstraints = d6.w;
  line.labelStrokeWidth = d7.x;
  line.labelSprite = d7.y*256.0 + d7.z;
  line.labelSpritePlacement = d7.w;
  return line;
}

        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float featureCount, aspect, zoom;
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
        size: function(context) {
          size[0] = context.viewportWidth;
          size[1] = context.viewportHeight;
          return size;
        },
        styleTexture: map.prop("style"),
        featureCount: map.prop("featureCount"),
        texSize: map.prop("imageSize")
      },
      attributes: {
        position: map.prop("positions"),
        featureType: map.prop("types"),
        index: map.prop("indexes"),
        normal: map.prop("normals"),
        dist: map.prop("distances")
      },
      primitive: "triangle strip",
      count: function(context, props) {
        return props.positions.length / 2;
      },
      blend: {
        enable: true,
        func: {
          srcRGB: "src alpha",
          srcAlpha: 1,
          dstRGB: "one minus src alpha",
          dstAlpha: 1
        }
      }
    },
    lineFill: {
      frag: `
                precision highp float;
#define GLSLIFY 1

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
        uniform vec2 size;
        varying float vft, vindex;
        varying vec2 vpos;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float n = mod((vpos.x*0.5+0.5)*size.x, 2.0);
          vec4 pix1 = vec4(
            floor(vindex/(256.0*256.0)),
            mod(vindex/256.0, 256.0),
            mod(vindex, 256.0),
            255.0) / 255.0;
          float opacity = floor(min(vcolor.w, 1.0));
          vec4 pix2 = vec4((2.0+opacity)/255.0, 0.0, 0.0, 1.0);
          gl_FragColor = mix(pix1, pix2, step(1.0, n));
          /*
          float opacity = floor(min(vcolor.w, 1.0));
          gl_FragColor = vec4(vindex, vft, 2.0+opacity, 1.0);
          */
        }
      `,
      vert: `
                precision highp float;
#define GLSLIFY 1

        struct Line {
  vec4 fillColor;
  vec4 strokeColor;
  float fillDashLength;
  float fillDashGap;
  float strokeDashLength;
  float strokeDashGap;
  float fillWidth;
  float strokeWidthInner;
  float strokeWidthOuter;
  float zindex;
  vec4 labelFillColor;
  vec4 labelStrokeColor;
  float labelFont;
  float labelFontSize;
  float labelPriority;
  float labelConstraints;
  float labelStrokeWidth;
  float labelSprite;
  float labelSpritePlacement;
};

        

float zoomStart = 1.0;
float zoomCount = 21.0;
float pointHeight = 7.0*zoomCount;
float lineStart = pointHeight;

Line readLine(sampler2D styleTexture, float featureType, float zoom, vec2 imageSize) {
  float n = 8.0;
  float px = featureType; //pixel x
  float py = lineStart + n * (floor(zoom) - zoomStart); //pixel y

  vec4 d0 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+0.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d1 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+1.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d2 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+2.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d3 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+3.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d4 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+4.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d5 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+5.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d6 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+6.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d7 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+7.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  Line line;
  line.fillColor = d0;
  line.strokeColor = vec4(d1.xyz, d0.w);
  line.fillDashLength = d2.x;
  line.fillDashGap = d2.y;
  line.strokeDashLength = d2.z;
  line.strokeDashGap = d2.w;
  line.fillWidth = d3.x;
  line.strokeWidthInner = d3.y;
  line.strokeWidthOuter = d3.z;
  line.zindex = d3.w;
  line.labelFillColor = d4;
  line.labelStrokeColor = d5;
  line.labelFont = d6.x;
  line.labelFontSize = d6.y;
  line.labelPriority = d6.z;
  line.labelConstraints = d6.w;
  line.labelStrokeWidth = d7.x;
  line.labelSprite = d7.y*256.0 + d7.z;
  line.labelSpritePlacement = d7.w;
  return line;
}

        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float featureCount, aspect, zoom;
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
        size: function(context) {
          size[0] = context.viewportWidth;
          size[1] = context.viewportHeight;
          return size;
        },
        styleTexture: map.prop("style"),
        featureCount: map.prop("featureCount"),
        texSize: map.prop("imageSize")
      },
      attributes: {
        position: map.prop("positions"),
        featureType: map.prop("types"),
        index: map.prop("indexes"),
        normal: map.prop("normals"),
        dist: map.prop("distances")
      },
      primitive: "triangle strip",
      count: function(context, props) {
        return props.positions.length / 2;
      },
      blend: {
        enable: true,
        func: {
          srcRGB: "src alpha",
          srcAlpha: 1,
          dstRGB: "one minus src alpha",
          dstAlpha: 1
        }
      }
    },
    areas: {
      frag: `
                precision highp float;
#define GLSLIFY 1

        varying vec4 vcolor;
        void main () {
          gl_FragColor = vcolor;
        }
              `,
      pickFrag: `
        precision highp float;
        uniform vec2 size;
        varying float vft, vindex;
        varying vec2 vpos;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float n = mod((vpos.x*0.5+0.5)*size.x, 2.0);
          vec4 pix1 = vec4(
            floor(vindex/(256.0*256.0)),
            mod(vindex/256.0, 256.0),
            mod(vindex, 256.0),
            255.0) / 255.0;
          float opacity = floor(min(vcolor.w, 1.0));
          vec4 pix2 = vec4((4.0+opacity)/255.0, 0.0, 0.0, 1.0);
          gl_FragColor = mix(pix1, pix2, step(1.0, n));
          //gl_FragColor = vec4(vindex, vft, 4.0+opacity, 1.0);
        }
      `,
      vert: `
                precision highp float;
#define GLSLIFY 1

        struct Area {
  vec4 color;
  float zindex;
  vec4 labelFillColor;
  vec4 labelStrokeColor;
  float labelStrokeWidth;
  float labelFont;
  float labelFontSize;
  float labelPriority;
  float labelConstraints;
  float labelSprite;
  float labelSpritePlacement;
  float sprite;
};

        

Area readArea(sampler2D styleTexture, float featureType, float zoom, vec2 imageSize) {
  
  float zoomStart = 1.0;
  float zoomCount = 21.0;
  float pointHeight = 7.0*zoomCount;
  float lineHeight = 8.0*zoomCount;
  float areaStart = pointHeight + lineHeight;

  float n = 6.0;
  float px = featureType; //pixel x
  float py = areaStart + n * (floor(zoom)-zoomStart); //pixel y

  vec4 d0 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+0.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d1 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+1.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d2 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+2.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d3 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+3.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d4 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+4.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d5 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+5.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  Area area;
  area.color = d0;
  area.zindex = d1.x;
  area.labelStrokeWidth = d1.y;
  area.sprite = d1.z*256.0 + d1.w;
  area.labelFillColor = d2;
  area.labelStrokeColor = d3;
  area.labelFont = d4.x;
  area.labelFontSize = d4.y;
  area.labelPriority = d4.z;
  area.labelConstraints = d4.w;
  area.labelSprite = d5.x*256.0 + d5.y;
  area.labelSpritePlacement = d5.z;
  return area;
}

        attribute vec2 position;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float aspect, featureCount, zoom;
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
        size: function(context) {
          size[0] = context.viewportWidth;
          size[1] = context.viewportHeight;
          return size;
        },
        featureCount: map.prop("featureCount"),
        texSize: map.prop("imageSize"),
        styleTexture: map.prop("style")
      },
      attributes: {
        position: map.prop("positions"),
        featureType: map.prop("types"),
        index: map.prop("indexes")
      },
      elements: map.prop("cells"),
      primitive: "triangles",
      blend: {
        enable: true,
        func: {
          srcRGB: "src alpha",
          srcAlpha: 1,
          dstRGB: "one minus src alpha",
          dstAlpha: 1
        }
      }
    },
    areaBorders: {
      frag: `
                precision highp float;
#define GLSLIFY 1

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
        uniform vec2 size;
        varying float vft, vindex;
        varying vec2 vpos;
        varying vec4 vcolor;
        uniform float featureCount;
        void main () {
          float n = mod((vpos.x*0.5+0.5)*size.x, 2.0);
          vec4 pix1 = vec4(
            floor(vindex/(256.0*256.0)),
            mod(vindex/256.0, 256.0),
            mod(vindex, 256.0),
            0.0);
          float opacity = floor(min(vcolor.w, 1.0));
          vec4 pix2 = vec4((4.0+opacity)/255.0, 0.0, 0.0, 1.0);
          gl_FragColor = mix(pix1, pix2, step(n, 1.0));
        }
      `,
      vert: `
                precision highp float;
#define GLSLIFY 1

        struct AreaBorder {
  vec4 color;
  float dashLength;
  float dashGap;
  float widthInner;
  float widthOuter;
  float zindex;
  float sprite;
};

        

float zoomStart = 1.0;
float zoomCount = 21.0;
float pointHeight = 7.0*zoomCount;
float lineHeight = 8.0*zoomCount;
float areaHeight = 6.0*zoomCount;
float areaBorderStart = pointHeight + lineHeight + areaHeight;

AreaBorder readAreaBorder(sampler2D styleTexture, float featureType, float zoom, vec2 imageSize) {
  float n = 3.0;
  float px = featureType; //pixel x
  float py = areaBorderStart + n * (floor(zoom) - zoomStart); //pixel y

  vec4 d0 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+0.0)/imageSize.y + 0.5/imageSize.y)) * vec4(1,1,1,2.55);

  vec4 d1 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+1.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  vec4 d2 = texture2D(styleTexture, vec2(
    px/imageSize.x+0.5/imageSize.x, (py+2.0)/imageSize.y + 0.5/imageSize.y)) * 255.0;

  AreaBorder areaBorder;
  areaBorder.color = d0;
  areaBorder.dashLength = d1.x;
  areaBorder.dashGap = d1.y;
  areaBorder.widthInner = d1.z;
  areaBorder.widthOuter = d1.w;
  areaBorder.zindex = d2.x;
  areaBorder.sprite = d2.y*256.0 + d2.z;
  return areaBorder;
}

        attribute vec2 position, normal, dist;
        attribute float featureType, index;
        uniform vec4 viewbox;
        uniform vec2 offset, size, texSize;
        uniform float featureCount, aspect, zoom;
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
        size: function(context) {
          size[0] = context.viewportWidth;
          size[1] = context.viewportHeight;
          return size;
        },
        styleTexture: map.prop("style"),
        featureCount: map.prop("featureCount"),
        texSize: map.prop("imageSize")
      },
      attributes: {
        position: map.prop("positions"),
        featureType: map.prop("types"),
        index: map.prop("indexes"),
        normal: map.prop("normals"),
        dist: map.prop("distances")
      },
      primitive: "triangle strip",
      count: function(context, props) {
        return props.positions.length / 2;
      },
      blend: {
        enable: true,
        func: {
          srcRGB: "src alpha",
          srcAlpha: 1,
          dstRGB: "one minus src alpha",
          dstAlpha: 1
        }
      }
    },
    labels: (n) => {
      return {
        frag: `
                precision highp float;
#define GLSLIFY 1
        

struct QBZF {
  float n;
  float q;
  vec2 size;
  vec2 qsize;
  vec2 units;
  vec3 dim;
  vec2 curve_size;
  float count;
  vec2 p;
  vec2 pc;
  vec2 ra;
  vec2 fuv;
  vec4 bounds;
};

        

vec2 px_coord_1604150559(vec2 p, vec2 size, vec3 dim) {
  float offset = dim.z + floor(p.x+0.5) + floor(p.y+0.5)*size.x;
  float y = floor((offset+0.5) / dim.x);
  float x = floor(offset - y*dim.x + 0.5);
  return (vec2(x,y)+vec2(0.5)) / dim.xy;
}

float parse_f32be_1117569599(vec4 rgba) {
  vec4 v = rgba*255.0;
  float s = floor(v.x/128.0);
  float e = mod(v.x,128.0)*2.0 + floor(v.y/128.0) - 127.0;
  float f = mod(v.y,128.0)*65536.0 + v.z*256.0 + v.w;
  return mix(1.0,-1.0,s)*pow(2.0,e)*(1.0+f*pow(2.0,-23.0));
}

QBZF create_qbzf_1535977339(vec2 uv, float n, vec2 size, vec2 units, vec3 dim, sampler2D grid_tex, vec2 curve_size) {
  QBZF qbzf;
  qbzf.n = n;
  qbzf.q = 3.0*n+2.0;
  qbzf.size = size;
  qbzf.qsize = size*vec2(qbzf.q,1);
  qbzf.units = units;
  qbzf.dim = dim;
  qbzf.curve_size = curve_size;
  qbzf.fuv = floor(uv*qbzf.size.xy)/qbzf.size.xy;
  vec2 rbuv = qbzf.fuv + vec2(1)/qbzf.size.xy;
  qbzf.bounds = vec4(qbzf.fuv*qbzf.units, rbuv*qbzf.units);
  qbzf.p = (uv-qbzf.fuv)*qbzf.units;
  qbzf.pc = floor(uv*qbzf.size.xy)*vec2(qbzf.q,1);

  vec2 i0 = px_coord_1604150559(qbzf.pc + vec2(0,0), qbzf.qsize, qbzf.dim);
  vec2 i1 = px_coord_1604150559(qbzf.pc + vec2(1,0), qbzf.qsize, qbzf.dim);
  vec4 g0 = texture2D(grid_tex, i0);
  vec4 g1 = texture2D(grid_tex, i1);
  vec2 ra = vec2(parse_f32be_1117569599(g0), parse_f32be_1117569599(g1));
  float rax = mix(
    1.0 - min(
      min(step(ra.y,qbzf.p.y),step(qbzf.p.y,ra.x)),
      step(1e-8,abs(ra.y-ra.x))
    ),
    min(
      min(step(ra.x,qbzf.p.y),step(qbzf.p.y,ra.y)),
      step(1e-8,abs(ra.x-ra.y))
    ),
    step(ra.x, ra.y)
  );
  qbzf.count = rax;
  return qbzf;
}

QBZF create_qbzf_1535977339(vec2 uv, float n, vec2 size, vec2 units, vec2 dim, sampler2D grid_tex, vec2 curve_size) {
  return create_qbzf_1535977339(uv, n, size, units, vec3(dim,0), grid_tex, curve_size);
}

        

float bz_0(float a, float b, float c, float t) {
  float t1 = 1.0-t;
  return t1*t1*a + 2.0*t1*t*b + t*t*c;
}

float raycast(vec2 p, vec2 b0, vec2 b1, vec2 b2, vec4 bounds, float epsilon) {
  float a = b0.y - 2.0*b1.y + b2.y;
  float b = -2.0*(b0.y - b1.y);
  float c = b0.y - p.y;
  float s = b*b - 4.0*a*c;
  if (s < 0.0 || abs(a) < epsilon) return 0.0;
  float sq = sqrt(s);
  float pt = (-b + sq) / (2.0*a);
  float px = bz_0(b0.x, b1.x, b2.x, pt);
  float py = bz_0(b0.y, b1.y, b2.y, pt);
  float nt = (-b - sq) / (2.0*a);
  float nx = bz_0(b0.x, b1.x, b2.x, nt);
  float ny = bz_0(b0.y, b1.y, b2.y, nt);
  float s0 = min(min(step(0.0,pt),step(pt,1.0)),step(p.x,px));
  float s1 = min(min(step(0.0,nt),step(nt,1.0)),step(p.x,nx));
  s0 = min(s0,min(step(bounds.x-epsilon,px),step(px,bounds.z+epsilon)));
  s1 = min(s1,min(step(bounds.x-epsilon,nx),step(nx,bounds.z+epsilon)));
  s0 = min(s0,min(step(bounds.y-epsilon,py),step(py,bounds.w+epsilon)));
  s1 = min(s1,min(step(bounds.y-epsilon,ny),step(ny,bounds.w+epsilon)));
  return s0 + s1;
}

float raycast(vec2 p, vec2 b0, vec2 b1, vec2 b2, vec4 bounds) {
  return raycast(p, b0, b1, b2, bounds, 1e-4);
}

float det(vec2 a, vec2 b) {
  return a.x*b.y-b.x*a.y;
}

vec2 bz_1(vec2 b0, vec2 b1, vec2 b2, float t) {
  return mix(mix(b0,b1,t),mix(b1,b2,t),t);
}

vec2 ldist_0(vec2 p, vec2 l1, vec2 l2) {
  vec2 ld = l2 - l1;
  float d = ld.x*ld.x + ld.y*ld.y;
  float t = ((p.x - l1.x) * ld.x + (p.y - l1.y) * ld.y) / d;
  t = max(0.0,min(1.0,t));
  return p - l1 - t*ld;
}

float collinear(vec2 a, vec2 b, vec2 c) {
  float ab = distance(a,b);
  float bc = distance(b,c);
  float ac = distance(a,c);
  return abs(ac - ab - bc);
}

vec2 bdist(vec2 b0, vec2 b1, vec2 b2) {
  if (min(distance(b0,b1),collinear(b0,b1,b2)) < 0.5) {
    return vec2(ldist_0(vec2(0),b0,b2));
  }
  float a = det(b0,b2), b = 2.0*det(b1,b0), d = 2.0*det(b2,b1);
  float f = b*d-a*a;
  vec2 d21 = b2-b1, d10 = b1-b0, d20 = b2-b0;
  vec2 gf = 2.0*(b*d21+d*d10+a*d20);
  gf = vec2(gf.y,-gf.x);
  vec2 pp = -f*gf/dot(gf,gf);
  vec2 d0p = b0-pp;
  float ap = det(d0p,d20), bp = 2.0*det(d10,d0p);
  float t = clamp((ap+bp)/(2.0*a+b+d), 0.0, 1.0);
  return bz_1(b0,b1,b2,t);
}

float parse_i16be_529295689(vec2 v) {
  float a = 65280.0, b = 32640.0, s = step(b,v.x*a);
  return (mod(v.x*a,b) + v.y*255.0) * mix(1.0,-1.0,s) + mix(0.0,128.0,s);
}

float parse_u24be_1062606552(vec3 v) {
  return v.x*16711680.0 + v.y*65280.0 + v.z*255.0;
}

vec2 read_bz_1460171947(sampler2D texture, vec2 size, float index, float i) {
  vec4 c = texture2D(texture, vec2(
    (mod(index,size.x/3.0)*3.0+i+0.5)/size.x,
    (floor(index*3.0/size.x)+0.5)/size.y
  ));
  return vec2(parse_i16be_529295689(c.xy),parse_i16be_529295689(c.zw));
}

vec4 read_curve_1460171947(QBZF qbzf, sampler2D grid_tex, sampler2D curve_tex, float i) {
  vec2 i2 = px_coord_1604150559(qbzf.pc + vec2(2.0+float(i)*3.0,0.0), qbzf.qsize, qbzf.dim);
  vec4 g2 = texture2D(grid_tex, i2);
  float index = parse_u24be_1062606552(g2.xyz);
  if (index < 0.5) return vec4(0);
  vec2 i3 = px_coord_1604150559(qbzf.pc + vec2(3.0+float(i)*3.0,0.0), qbzf.qsize, qbzf.dim);
  vec2 i4 = px_coord_1604150559(qbzf.pc + vec2(4.0+float(i)*3.0,0.0), qbzf.qsize, qbzf.dim);
  vec4 g3 = texture2D(grid_tex, i3);
  vec4 g4 = texture2D(grid_tex, i4);
  vec2 d = vec2(parse_f32be_1117569599(g3),parse_f32be_1117569599(g4));
  vec2 b0 = read_bz_1460171947(curve_tex, qbzf.curve_size, index-1.0, 0.0);
  vec2 b1 = read_bz_1460171947(curve_tex, qbzf.curve_size, index-1.0, 1.0);
  vec2 b2 = read_bz_1460171947(curve_tex, qbzf.curve_size, index-1.0, 2.0);
  vec2 fd = d - qbzf.fuv*qbzf.units;
  vec2 pd = qbzf.p+d;
  float rc = raycast(pd, b0, b1, b2, qbzf.bounds + vec4(fd,fd), 1e-4);
  return vec4(index,rc,bdist(b0-pd,b1-pd,b2-pd));
}

        varying vec2 vuv, vunits, vsize, vPxSize;
        varying float vStrokeWidth, voffset;
        varying vec3 vFillColor, vStrokeColor;
        uniform sampler2D curveTex, gridTex;
        uniform vec2 curveSize, dim;
        uniform float gridN, aspect;

        vec4 draw(vec2 uv) {
          QBZF qbzf = create_qbzf_1535977339(
            uv, gridN, vsize, vunits, vec3(dim,voffset),
            gridTex, curveSize
          );
          float ldist = 1e30;
          for (int i = 0; i < ${n}; i++) {
            vec4 curve = read_curve_1460171947(qbzf, gridTex, curveTex, float(i));
            if (curve.x < 0.5) break;
            qbzf.count += curve.y;
            ldist = min(ldist,length(curve.zw));
          }
          float a = 50.0;
          float outline = 1.0-smoothstep(vStrokeWidth-a,vStrokeWidth+a,ldist);
          vec3 fill = vFillColor;
          vec3 stroke = vStrokeColor;
          float cm = mod(qbzf.count,2.0);
          if (cm < 0.5 && ldist > vStrokeWidth+a) return vec4(0);
          float m = smoothstep(0.0,1.0,vStrokeWidth-ldist);
          return vec4(mix(stroke, mix(stroke,fill,m), cm),1);
        }
        void main() {
          float dx = 0.5/vPxSize.x;
          vec4 c0 = draw(vuv-vec2(dx,0));
          vec4 c1 = draw(vuv);
          vec4 c2 = draw(vuv+vec2(dx,0));
          gl_FragColor = c0*0.25 + c1*0.5 + c2*0.25;
        }
              `,
        vert: `
        precision highp float;
        attribute vec2 position, uv, units, gsize, pxSize;
        attribute vec3 fillColor, strokeColor;
        attribute float strokeWidth, ioffset;
        varying vec2 vuv, vunits, vsize, vPxSize;
        varying vec3 vFillColor, vStrokeColor;
        varying float vStrokeWidth, voffset;
        uniform vec4 viewbox;
        uniform float aspect, gridN;
        uniform vec2 offset, size;
        void main () {
          vuv = uv;
          vunits = units;
          vsize = gsize;
          voffset = ioffset;
          vFillColor = fillColor;
          vStrokeColor = strokeColor;
          vStrokeWidth = strokeWidth;
          vPxSize = pxSize;
          vec2 p = position.xy + offset;
          float zindex = 1000.0;
          gl_Position = vec4(
            (p.x - viewbox.x) / (viewbox.z - viewbox.x) * 2.0 - 1.0,
            ((p.y - viewbox.y) / (viewbox.w - viewbox.y) * 2.0 - 1.0) * aspect,
            1.0/(1.0+zindex),
            1
          );
        }
      `,
        uniforms: {
          curveTex: (c, props) => props.curves.texture,
          curveSize: (c, props) => props.curves.size,
          gridTex: (c, props) => props.grid.texture,
          dim: (c, props) => props.grid.dimension,
          gridN: Number(n)
        },
        attributes: {
          position: map.prop("positions"),
          uv: map.prop("uvs"),
          ioffset: map.prop("offsets"),
          units: map.prop("units"),
          gsize: map.prop("size"),
          fillColor: map.prop("fillColors"),
          strokeColor: map.prop("strokeColors"),
          strokeWidth: map.prop("strokeWidths"),
          pxSize: map.prop("pxSize")
        },
        elements: map.prop("cells"),
        blend: {
          enable: true,
          func: {
            srcRGB: "src alpha",
            srcAlpha: 1,
            dstRGB: "one minus src alpha",
            dstAlpha: 1
          }
        }
      };
    }
  };
}
export {
  shaders as default
};
