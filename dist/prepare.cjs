var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/partition-array/partition.js
var require_partition = __commonJS({
  "node_modules/partition-array/partition.js"(exports, module2) {
    "use strict";
    module2.exports = partition2;
    function partition2(arr, pred, lo, hi) {
      var n = arr.length;
      lo = typeof lo === "number" ? lo | 0 : 0;
      hi = typeof hi === "number" ? hi | 0 : n;
      var ptr = lo;
      for (var i = lo; i < hi; ++i) {
        var x = arr[i];
        if (pred(x)) {
          arr[i] = arr[ptr];
          arr[ptr] = x;
          ptr += 1;
        }
      }
      return ptr;
    }
  }
});

// node_modules/@rubenrodriguez/georender-style2png/read.js
var require_read = __commonJS({
  "node_modules/@rubenrodriguez/georender-style2png/read.js"(exports, module2) {
    module2.exports = read;
    function read({ pixels, zoomCount, imageWidth }) {
      return {
        opacity: (key, type, zoom) => opacity(key, type, zoom, { pixels, imageWidth, zoomCount }),
        label: (key, type, zoom) => label(key, type, zoom, { pixels, imageWidth, zoomCount }),
        zindex: (key, type, zoom) => zindex(key, type, zoom, { pixels, imageWidth, zoomCount })
      };
    }
    function opacity(key, type, zoom, { pixels, imageWidth, zoomCount }) {
      const y = yOffset(key, zoom, zoomCount);
      const index = (type + y * imageWidth) * 4 + 3;
      return pixels[index];
    }
    function zindex(key, type, zoom, { pixels, imageWidth, zoomCount }) {
      const y = yOffset(key, zoom, zoomCount);
      if (key === "point") {
        const prevFkeyLoops = 2;
        const x3 = xOffset(type, prevFkeyLoops, imageWidth);
        const i3 = vec4Index(x3, y, imageWidth);
        const zindex2 = pixels[i3 + 3];
        return zindex2;
      }
      if (key === "line") {
        const prevFkeyLoops = 3;
        const x4 = xOffset(type, prevFkeyLoops, imageWidth);
        const i4 = vec4Index(x4, y, imageWidth);
        const zindex2 = pixels[i4 + 3];
        return zindex2;
      }
      if (key === "area") {
        const prevFkeyLoops = 1;
        const x2 = xOffset(type, prevFkeyLoops, imageWidth);
        const i3 = vec4Index(x2, y, imageWidth);
        const zindex2 = pixels[i3 + 0];
        return zindex2;
      }
    }
    function label(key, type, zoom, { pixels, imageWidth, zoomCount }) {
      const y = yOffset(key, zoom, zoomCount);
      const fillColor = [];
      let fillOpacity;
      const strokeColor = [];
      let strokeOpacity;
      let fontFamily;
      let fontSize;
      let priority;
      let constraints;
      let strokeWidth;
      const typeSpecific = {};
      if (key === "point") {
        let prevFkeyLoops = 2;
        const x3 = xOffset(type, prevFkeyLoops, imageWidth);
        const i3 = vec4Index(x3, y, imageWidth);
        typeSpecific.pointSize = pixels[i3 + 0];
        prevFkeyLoops += 1;
        const x4 = xOffset(type, prevFkeyLoops, imageWidth);
        const i4 = vec4Index(x4, y, imageWidth);
        fillColor[0] = pixels[i4 + 0];
        fillColor[1] = pixels[i4 + 1];
        fillColor[2] = pixels[i4 + 2];
        fillOpacity = pixels[i4 + 3];
        prevFkeyLoops += 1;
        const x5 = xOffset(type, prevFkeyLoops, imageWidth);
        const i5 = vec4Index(x5, y, imageWidth);
        strokeColor[0] = pixels[i5 + 0];
        strokeColor[1] = pixels[i5 + 1];
        strokeColor[2] = pixels[i5 + 2];
        strokeOpacity = pixels[i5 + 3];
        prevFkeyLoops += 1;
        const x6 = xOffset(type, prevFkeyLoops, imageWidth);
        const i6 = vec4Index(x6, y, imageWidth);
        fontFamily = pixels[i6 + 0];
        fontSize = pixels[i6 + 1];
        priority = pixels[i6 + 2];
        constraints = pixels[i6 + 3];
        prevFkeyLoops += 1;
        const x7 = xOffset(type, prevFkeyLoops, imageWidth);
        const i7 = vec4Index(x7, y, imageWidth);
        strokeWidth = pixels[i7 + 0];
      } else if (key === "line") {
        let prevFkeyLoops = 4;
        const x5 = xOffset(type, prevFkeyLoops, imageWidth);
        const i5 = vec4Index(x5, y, imageWidth);
        fillColor[0] = pixels[i5 + 0];
        fillColor[1] = pixels[i5 + 1];
        fillColor[2] = pixels[i5 + 2];
        fillOpacity = pixels[i5 + 3];
        prevFkeyLoops += 1;
        const x6 = xOffset(type, prevFkeyLoops, imageWidth);
        const i6 = vec4Index(x6, y, imageWidth);
        strokeColor[0] = pixels[i6 + 0];
        strokeColor[1] = pixels[i6 + 1];
        strokeColor[2] = pixels[i6 + 2];
        strokeOpacity = pixels[i6 + 3];
        prevFkeyLoops += 1;
        const x7 = xOffset(type, prevFkeyLoops, imageWidth);
        const i7 = vec4Index(x7, y, imageWidth);
        fontFamily = pixels[i7 + 0];
        fontSize = pixels[i7 + 1];
        priority = pixels[i7 + 2];
        constraints = pixels[i7 + 3];
        prevFkeyLoops += 1;
        const x8 = xOffset(type, prevFkeyLoops, imageWidth);
        const i8 = vec4Index(x8, y, imageWidth);
        strokeWidth = pixels[i8 + 0];
      } else if (key === "area") {
        let prevFkeyLoops = 1;
        const x2 = xOffset(type, prevFkeyLoops, imageWidth);
        const i2 = vec4Index(x2, y, imageWidth);
        strokeWidth = pixels[i2 + 1];
        prevFkeyLoops += 1;
        const x3 = xOffset(type, prevFkeyLoops, imageWidth);
        const i3 = vec4Index(x3, y, imageWidth);
        fillColor[0] = pixels[i3 + 0];
        fillColor[1] = pixels[i3 + 1];
        fillColor[2] = pixels[i3 + 2];
        fillOpacity = pixels[i3 + 3];
        prevFkeyLoops += 1;
        const x4 = xOffset(type, prevFkeyLoops, imageWidth);
        const i4 = vec4Index(x4, y, imageWidth);
        strokeColor[0] = pixels[i4 + 0];
        strokeColor[1] = pixels[i4 + 1];
        strokeColor[2] = pixels[i4 + 2];
        strokeOpacity = pixels[i4 + 3];
        prevFkeyLoops += 1;
        const x5 = xOffset(type, prevFkeyLoops, imageWidth);
        const i5 = vec4Index(x5, y, imageWidth);
        fontFamily = pixels[i5 + 0];
        fontSize = pixels[i5 + 1];
        priority = pixels[i5 + 2];
        constraints = pixels[i5 + 3];
      }
      return __spreadValues({
        fillColor,
        fillOpacity,
        strokeColor,
        strokeOpacity,
        fontFamily,
        fontSize,
        priority,
        constraints,
        strokeWidth
      }, typeSpecific);
    }
    function yOffset(key, zoom, zoomCount) {
      switch (key) {
        case "point":
          return zoom * 7;
        case "line":
          return zoomCount * 7 + zoom * 8;
        case "area":
          return zoomCount * 7 + zoomCount * 8 + zoom * 6;
        case "areaBorder":
          return zoomCount * 7 + zoomCount * 8 + zoomCount * 6 + zoom * 3;
        default:
          throw new Error("must define a key : point | line | area | areaBorder");
      }
    }
    function xOffset(type, prevFkeyLoops, imageWidth) {
      return imageWidth * prevFkeyLoops + type;
    }
    function vec4Index(x, y, imageWidth) {
      return (x + y * imageWidth) * 4;
    }
  }
});

// dist/text.cjs
var require_text = __commonJS({
  "dist/text.cjs"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __defProps2 = Object.defineProperties;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues2 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp2.call(b, prop))
          __defNormalProp2(a, prop, b[prop]);
      if (__getOwnPropSymbols2)
        for (var prop of __getOwnPropSymbols2(b)) {
          if (__propIsEnum2.call(b, prop))
            __defNormalProp2(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var text_exports = {};
    __export2(text_exports, {
      PrepareText: () => PrepareText2
    });
    module2.exports = __toCommonJS2(text_exports);
    var __create2 = Object.create;
    var __defProp22 = Object.defineProperty;
    var __defProps22 = Object.defineProperties;
    var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
    var __getOwnPropDescs22 = Object.getOwnPropertyDescriptors;
    var __getOwnPropNames22 = Object.getOwnPropertyNames;
    var __getOwnPropSymbols22 = Object.getOwnPropertySymbols;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp22 = Object.prototype.hasOwnProperty;
    var __propIsEnum22 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp22 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues22 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp22.call(b, prop))
          __defNormalProp22(a, prop, b[prop]);
      if (__getOwnPropSymbols22)
        for (var prop of __getOwnPropSymbols22(b)) {
          if (__propIsEnum22.call(b, prop))
            __defNormalProp22(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps22 = (a, b) => __defProps22(a, __getOwnPropDescs22(b));
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames22(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __copyProps22 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames22(from))
          if (!__hasOwnProp22.call(to, key) && key !== except)
            __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps22(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp22(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var require_flat = __commonJS2({
      "node_modules/point-in-polygon/flat.js"(exports2, module22) {
        module22.exports = function pointInPolygonFlat(point, vs, start, end) {
          var x = point[0], y = point[1];
          var inside = false;
          if (start === void 0)
            start = 0;
          if (end === void 0)
            end = vs.length;
          var len = (end - start) / 2;
          for (var i = 0, j = len - 1; i < len; j = i++) {
            var xi = vs[start + i * 2 + 0], yi = vs[start + i * 2 + 1];
            var xj = vs[start + j * 2 + 0], yj = vs[start + j * 2 + 1];
            var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect)
              inside = !inside;
          }
          return inside;
        };
      }
    });
    var require_line_segment_intersect_2d = __commonJS2({
      "node_modules/line-segment-intersect-2d/index.js"(exports2, module22) {
        module22.exports = function lineIntersection(out, a0, a1, b0, b1) {
          var ax = a1[0] - a0[0];
          var ay = a1[1] - a0[1];
          var bx = b1[0] - b0[0];
          var by = b1[1] - b0[1];
          var d = ax * by - bx * ay;
          if (d === 0)
            return null;
          var dpos = d > 0;
          var cx = a0[0] - b0[0];
          var cy = a0[1] - b0[1];
          var sn = ax * cy - ay * cx;
          if (sn < 0 === dpos)
            return null;
          var tn = bx * cy - by * cx;
          if (tn < 0 === dpos)
            return null;
          if (sn > d === dpos || tn > d === dpos)
            return null;
          var t = tn / d;
          out[0] = a0[0] + t * ax;
          out[1] = a0[1] + t * ay;
          return out;
        };
      }
    });
    var require_flat2 = __commonJS2({
      "node_modules/polygon-intersect-test/flat.js"(exports2, module22) {
        var pointInPolygon = require_flat();
        var lineIntersection = require_line_segment_intersect_2d();
        var v0 = [0, 0];
        var v1 = [0, 0];
        var v2 = [0, 0];
        var v3 = [0, 0];
        var v4 = [0, 0];
        module22.exports = function polygonIntersectTestFlat(a, b, arange, brange) {
          var astart, aend, bstart, bend;
          if (arange === void 0) {
            astart = 0;
            aend = a.length;
          } else {
            astart = arange[0];
            aend = arange[1];
          }
          if (brange === void 0) {
            bstart = 0;
            bend = b.length;
          } else {
            bstart = brange[0];
            bend = brange[1];
          }
          var alen = aend - astart;
          for (var i = 0; i < alen; i += 2) {
            v0[0] = a[astart + i + 0];
            v0[1] = a[astart + i + 1];
            v1[0] = a[astart + (i + 2) % alen + 0];
            v1[1] = a[astart + (i + 2) % alen + 1];
            var blen = bend - bstart;
            for (var j = 0; j < blen; j += 2) {
              v2[0] = b[bstart + j + 0];
              v2[1] = b[bstart + j + 1];
              v3[0] = b[bstart + (j + 2) % blen + 0];
              v3[1] = b[bstart + (j + 2) % blen + 1];
              if (lineIntersection(v4, v0, v1, v2, v3))
                return true;
            }
          }
          v0[0] = b[bstart + 0];
          v0[1] = b[bstart + 1];
          if (pointInPolygon(v0, a, astart, aend))
            return true;
          v0[0] = a[astart + 0];
          v0[1] = a[astart + 1];
          if (pointInPolygon(v0, b, bstart, bend))
            return true;
          return false;
        };
      }
    });
    var require_nested = __commonJS2({
      "node_modules/point-in-polygon/nested.js"(exports2, module22) {
        module22.exports = function pointInPolygonNested(point, vs, start, end) {
          var x = point[0], y = point[1];
          var inside = false;
          if (start === void 0)
            start = 0;
          if (end === void 0)
            end = vs.length;
          var len = end - start;
          for (var i = 0, j = len - 1; i < len; j = i++) {
            var xi = vs[i + start][0], yi = vs[i + start][1];
            var xj = vs[j + start][0], yj = vs[j + start][1];
            var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect)
              inside = !inside;
          }
          return inside;
        };
      }
    });
    var require_nested2 = __commonJS2({
      "node_modules/polygon-intersect-test/nested.js"(exports2, module22) {
        var pointInPolygon = require_nested();
        var lineIntersection = require_line_segment_intersect_2d();
        var v0 = [0, 0];
        var v1 = [0, 0];
        var v2 = [0, 0];
        var v3 = [0, 0];
        var v4 = [0, 0];
        module22.exports = function polygonIntersectTestNested(a, b, arange, brange) {
          var astart, aend, bstart, bend;
          if (arange === void 0) {
            astart = 0;
            aend = a.length;
          } else {
            astart = arange[0];
            aend = arange[1];
          }
          if (brange === void 0) {
            bstart = 0;
            bend = b.length;
          } else {
            bstart = brange[0];
            bend = brange[1];
          }
          var alen = aend - astart;
          for (var i = 0; i < alen; i++) {
            v0[0] = a[astart + i][0];
            v0[1] = a[astart + i][1];
            v1[0] = a[astart + (i + 1) % alen][0];
            v1[1] = a[astart + (i + 1) % alen][1];
            var blen = bend - bstart;
            for (var j = 0; j < blen; j++) {
              v2[0] = b[bstart + j][0];
              v2[1] = b[bstart + j][1];
              v3[0] = b[bstart + (j + 1) % blen][0];
              v3[1] = b[bstart + (j + 1) % blen][1];
              if (lineIntersection(v4, v0, v1, v2, v3))
                return true;
            }
          }
          v0[0] = b[bstart][0];
          v0[1] = b[bstart][1];
          if (pointInPolygon(v0, a, astart, aend))
            return true;
          v0[0] = a[astart][0];
          v0[1] = a[astart][1];
          if (pointInPolygon(v0, b, bstart, bend))
            return true;
          return false;
        };
      }
    });
    var require_polygon_intersect_test = __commonJS2({
      "node_modules/polygon-intersect-test/index.js"(exports2, module22) {
        var polygonIntersectTestFlat = require_flat2();
        var polygonIntersectTestNested = require_nested2();
        module22.exports = function polygonIntersectTest(a, b, arange, brange) {
          if (a.length > 0 && Array.isArray(a[0])) {
            return polygonIntersectTestNested(a, b, arange, brange);
          } else {
            return polygonIntersectTestFlat(a, b, arange, brange);
          }
        };
      }
    });
    var require_label_placement_engine = __commonJS2({
      "node_modules/label-placement-engine/index.js"(exports2, module22) {
        var polygonIntersect = require_polygon_intersect_test();
        var bbox = [0, 0, 0, 0];
        var irange = [0, 0];
        var jrange = [0, 0];
        module22.exports = LabelEngine2;
        function LabelEngine2(opts) {
          if (!(this instanceof LabelEngine2))
            return new LabelEngine2(opts);
          if (!opts)
            opts = {};
          this._cellType = opts.cellType || "u16";
          this.types = opts.types || {};
          this._outlines = opts.outlines !== void 0 ? opts.outlines : false;
          this.data = {
            positions: null,
            cells: null,
            labels: null,
            bounds: null,
            bbox: null,
            outlines: null
          };
          this.count = {
            positions: 0,
            cells: 0,
            bounds: 0,
            bbox: 0,
            outlines: 0
          };
          this._dst = {
            positions: { offset: 0, data: null },
            cells: { offset: 0, data: null },
            bounds: { offset: 0, data: null }
          };
          this.visible = null;
          this.offsets = { bounds: null, positions: null };
          this._size = { positions: 0, cells: 0, bounds: 0 };
          this._maxIndex = opts.maxIndex === void 0 ? 50 : opts.maxIndex;
        }
        LabelEngine2.prototype.update = function(features) {
          this._features = features;
          var plen = 0, clen = 0, blen = 0;
          for (var i = 0; i < features.length; i++) {
            var f = features[i];
            var t = this.types[f.type];
            if (!t)
              throw new Error("implementation not provided for type=" + f.type);
            this._size.positions = 0;
            this._size.cells = 0;
            this._size.bounds = 0;
            t.size(this._size, features[i]);
            plen += this._size.positions;
            clen += this._size.cells;
            blen += this._size.bounds;
          }
          if (!this.data.positions || plen > this.data.positions.length) {
            this.data.positions = new Float32Array(plen);
            this.data.labels = new Float32Array(plen / 2);
          }
          if (!this.data.cells || clen > this.data.cells.length) {
            var F = {
              u16: Uint16Array,
              u32: Uint32Array
            }[this._cellType];
            if (!F) {
              throw new Error("cellType " + this._cellType + " not supported");
            }
            this.data.cells = new F(clen);
          }
          if (!this.data.bounds || blen > this.data.bounds.length) {
            this.data.bounds = new Float32Array(blen);
          }
          if (this._outlines && (!this.data.outlines || blen * 2 > this.data.outlines.length)) {
            this.data.outlines = new Float32Array(blen * 2);
          }
          if (!this.data.bbox || features.length * 4 > this.data.bbox.length) {
            this.data.bbox = new Float32Array(features.length * 4);
          }
          if (!this.visible || this.visible.length !== features.length) {
            this.visible = new Float32Array(features.length);
          } else {
            this.visible.fill(0);
          }
          if (!this.offsets.bounds || features.length * 2 > this.offsets.bounds.length) {
            this.offsets.bounds = new Float32Array(features.length * 2);
          }
          if (!this.offsets.positions || features.length * 2 > this.offsets.positions.length) {
            this.offsets.positions = new Float32Array(features.length * 2);
          }
          this._step();
        };
        LabelEngine2.prototype._step = function() {
          var plen = 0, clen = 0, ooffset = 0;
          this._dst.positions.offset = 0;
          this._dst.positions.data = this.data.positions;
          this._dst.cells.offset = 0;
          this._dst.cells.data = this.data.cells;
          this._dst.bounds.offset = 0;
          this._dst.bounds.data = this.data.bounds;
          for (var i = 0; i < this._features.length; i++) {
            var f = this._features[i];
            var t = this.types[f.type];
            if (!t)
              throw new Error("implementation not provided for type=" + f.type);
            var pstart = this._dst.positions.offset;
            var cstart = this._dst.cells.offset;
            var bstart = this._dst.bounds.offset;
            this._dst.index = 0;
            var found = false;
            while (!found && this._dst.index < this._maxIndex) {
              this._dst.positions.offset = pstart;
              this._dst.cells.offset = cstart;
              this._dst.bounds.offset = bstart;
              t.write(this._dst, this._features[i]);
              this._dst.index++;
              var pend = this._dst.positions.offset;
              var cend = this._dst.cells.offset;
              var bend = this._dst.bounds.offset;
              for (var j = cstart; j < cend; j++) {
                this.data.cells[j] += pstart / 2;
              }
              this.offsets.bounds[i * 2 + 0] = bstart;
              this.offsets.bounds[i * 2 + 1] = bend;
              this.offsets.positions[i * 2 + 0] = pstart;
              this.offsets.positions[i * 2 + 1] = pend;
              bbox[0] = Infinity;
              bbox[1] = Infinity;
              bbox[2] = -Infinity;
              bbox[3] = -Infinity;
              for (var j = bstart; j < bend; j += 2) {
                bbox[0] = Math.min(bbox[0], this.data.bounds[j + 0]);
                bbox[1] = Math.min(bbox[1], this.data.bounds[j + 1]);
                bbox[2] = Math.max(bbox[2], this.data.bounds[j + 0]);
                bbox[3] = Math.max(bbox[3], this.data.bounds[j + 1]);
              }
              var visible = true;
              if (bstart === bend) {
                console.log("found=true", f.type);
                bbox[0] = Infinity;
                bbox[1] = Infinity;
                bbox[2] = Infinity;
                bbox[3] = Infinity;
                visible = false;
                found = true;
              }
              this.data.bbox[i * 4 + 0] = bbox[0];
              this.data.bbox[i * 4 + 1] = bbox[1];
              this.data.bbox[i * 4 + 2] = bbox[2];
              this.data.bbox[i * 4 + 3] = bbox[3];
              irange[0] = bstart;
              irange[1] = bend;
              if (visible) {
                for (var j = 0; j < i; j++) {
                  if (j === i)
                    continue;
                  if (this.visible[j] < 0.5)
                    continue;
                  if (boxOverlap(i * 4, this.data.bbox, j * 4, this.data.bbox)) {
                    jrange[0] = this.offsets.bounds[j * 2 + 0];
                    jrange[1] = this.offsets.bounds[j * 2 + 1];
                    if (polygonIntersect(this.data.bounds, this.data.bounds, irange, jrange)) {
                      visible = false;
                      break;
                    }
                  }
                }
              }
              this.visible[i] = visible;
              if (visible) {
                found = true;
              }
            }
            if (this.visible[i] < 0.5) {
              this._dst.positions.offset = pstart;
              this._dst.cells.offset = cstart;
              this._dst.bounds.offset = bstart;
              this.offsets.bounds[i * 2 + 0] = bstart;
              this.offsets.bounds[i * 2 + 1] = bstart;
            }
            if (this._outlines && this.visible[i] > 0.5) {
              var n = bend - bstart;
              for (var j = 0; j < n; j += 2) {
                this.data.outlines[ooffset++] = this.data.bounds[bstart + j + 0];
                this.data.outlines[ooffset++] = this.data.bounds[bstart + j + 1];
                this.data.outlines[ooffset++] = this.data.bounds[bstart + (j + 2) % n + 0];
                this.data.outlines[ooffset++] = this.data.bounds[bstart + (j + 2) % n + 1];
              }
            }
          }
          this.count.positions = this._dst.positions.offset / 2;
          this.count.cells = this._dst.cells.offset;
          this.count.bounds = this._dst.bounds.offset / 2;
          this.count.outlines = ooffset / 2;
        };
        LabelEngine2.prototype.isVisible = function(i) {
          return this.visible[i] > 0.5;
        };
        function boxOverlap(ai, a, bi, b) {
          return a[ai + 2] >= b[bi + 0] && a[ai + 0] <= b[bi + 2] && a[ai + 3] >= b[bi + 1] && a[ai + 1] <= b[bi + 3];
        }
      }
    });
    var require_bbox = __commonJS2({
      "node_modules/label-placement-engine/preset/bbox.js"(exports2, module22) {
        var defaultScale = [1, 1];
        var defaultThickness = [1e3, 1e3];
        module22.exports = function(params) {
          if (!params)
            params = {};
          return {
            size: function(out, f) {
              out.cells = 0;
              out.positions = 0;
              out.bounds = 20;
            },
            write: function(out, f) {
              var scale = f.scale || params.scale || defaultScale;
              var bounds = f.bounds || params.bounds;
              var boundsScale = f.boundsScale || params.boundsScale || scale;
              var xmin = bounds[0] * boundsScale[0];
              var ymin = bounds[1] * boundsScale[1];
              var xmax = bounds[2] * boundsScale[0];
              var ymax = bounds[3] * boundsScale[1];
              var thickness = f.thickness || params.thickness || defaultThickness;
              var thicknessScale = f.thicknessScale || params.thicknessScale || scale;
              var dx = thickness[0] * thicknessScale[0];
              var dy = thickness[1] * thicknessScale[1];
              out.bounds.data[out.bounds.offset++] = xmin;
              out.bounds.data[out.bounds.offset++] = ymin;
              out.bounds.data[out.bounds.offset++] = xmin;
              out.bounds.data[out.bounds.offset++] = ymax;
              out.bounds.data[out.bounds.offset++] = xmax;
              out.bounds.data[out.bounds.offset++] = ymax;
              out.bounds.data[out.bounds.offset++] = xmax;
              out.bounds.data[out.bounds.offset++] = ymin;
              out.bounds.data[out.bounds.offset++] = xmin;
              out.bounds.data[out.bounds.offset++] = ymin;
              out.bounds.data[out.bounds.offset++] = xmin - dx;
              out.bounds.data[out.bounds.offset++] = ymin - dy;
              out.bounds.data[out.bounds.offset++] = xmax + dx;
              out.bounds.data[out.bounds.offset++] = ymin - dy;
              out.bounds.data[out.bounds.offset++] = xmax + dx;
              out.bounds.data[out.bounds.offset++] = ymax + dy;
              out.bounds.data[out.bounds.offset++] = xmin - dx;
              out.bounds.data[out.bounds.offset++] = ymax + dy;
              out.bounds.data[out.bounds.offset++] = xmin - dx;
              out.bounds.data[out.bounds.offset++] = ymin - dy;
            },
            params
          };
        };
      }
    });
    var require_point = __commonJS2({
      "node_modules/label-placement-engine/preset/point.js"(exports2, module22) {
        var defaultScale = [1, 1];
        var defaultPlacements = ["top", "bottom", "right", "left"];
        var zero2 = [0, 0];
        module22.exports = function(params) {
          if (!params)
            params = {};
          return {
            size: function(out, f) {
              out.cells = 6;
              out.positions = 8;
              out.bounds = 16;
            },
            write: function(out, f) {
              var xmin, ymin, xmax, ymax;
              var scale = f.scale || params.scale || defaultScale;
              var labelSize = f.labelSize || params.labelSize || zero2;
              var labelSizeScale = f.labelSizeScale || params.labelSizeScale || scale;
              var labelSize0 = labelSize[0] * labelSizeScale[0];
              var labelSize1 = labelSize[1] * labelSizeScale[1];
              var labelMargin = f.labelMargin || params.labelMargin || zero2;
              var labelMarginScale = f.labelMarginScale || params.labelMarginScale || scale;
              var labelMargin0 = labelMargin[0] * labelMarginScale[0];
              var labelMargin1 = labelMargin[1] * labelMarginScale[1];
              var pointMargin = f.pointMargin || params.pointMargin || zero2;
              var pointMarginScale = f.pointMarginScale || params.pointMarginScale || scale;
              var pointMargin0 = pointMargin[0] * pointMarginScale[0];
              var pointMargin1 = pointMargin[1] * pointMarginScale[1];
              var pointSize = f.pointSize || params.pointSize || zero2;
              var pointSizeScale = f.pointSizeScale || params.pointSizeScale || scale;
              var pointSize0 = pointSize[0] * pointSizeScale[0];
              var pointSize1 = pointSize[1] * pointSizeScale[1];
              var point = f.point || params.point;
              var pointScale = f.pointScale || params.pointScale || scale;
              var point0 = point[0] * pointScale[0];
              var point1 = point[1] * pointScale[1];
              var placements = f.placements || params.placements || defaultPlacements;
              var placement = f.placement || params.placement || placements[out.index];
              if (placement === "top") {
                xmin = point0 - labelSize0 / 2;
                xmax = point0 + labelSize0 / 2;
                ymin = point1 + pointMargin1;
                ymax = point1 + pointMargin1 + labelSize1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 - pointSize1 / 2 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 + pointSize0 / 2 + pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 - pointSize1 / 2 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 + pointSize0 / 2 + pointMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
              } else if (placement === "bottom") {
                xmin = point0 - labelSize0 / 2;
                xmax = point0 + labelSize0 / 2;
                ymin = point1 - pointMargin1 - labelSize1;
                ymax = point1 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = point0 + pointSize0 / 2 + pointMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = point0 + pointSize0 / 2 + pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 + pointSize1 / 2 + pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 + pointSize1 / 2 + pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
              } else if (placement === "right") {
                xmin = point0 + pointSize0 / 2 + pointMargin0;
                xmax = point0 + pointSize0 / 2 + pointMargin0 + labelSize0;
                ymin = point1 - labelSize1 / 2;
                ymax = point1 + labelSize1 / 2;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 - pointSize1 / 2 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = point1 - pointSize1 / 2 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = point1 + pointSize1 / 2 + pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 + pointSize1 / 2 + pointMargin1;
              } else if (placement === "left") {
                xmin = point0 - pointSize0 / 2 - pointMargin0 - labelSize0;
                xmax = point0 - pointSize0 / 2 - pointMargin0;
                ymin = point1 - labelSize1 / 2;
                ymax = point1 + labelSize1 / 2;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 - pointSize1 / 2 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 + pointSize0 / 2 + pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 - pointSize1 / 2 - pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 + pointSize0 / 2 + pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 + pointSize1 / 2 + pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = point1 + pointSize1 / 2 + pointMargin1;
                out.bounds.data[out.bounds.offset++] = point0 - pointSize0 / 2 - pointMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
                out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
                out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
              } else {
                return;
              }
              out.cells.data[out.cells.offset++] = 0;
              out.cells.data[out.cells.offset++] = 1;
              out.cells.data[out.cells.offset++] = 2;
              out.cells.data[out.cells.offset++] = 0;
              out.cells.data[out.cells.offset++] = 2;
              out.cells.data[out.cells.offset++] = 3;
              out.positions.data[out.positions.offset++] = xmin;
              out.positions.data[out.positions.offset++] = ymin;
              out.positions.data[out.positions.offset++] = xmax;
              out.positions.data[out.positions.offset++] = ymin;
              out.positions.data[out.positions.offset++] = xmax;
              out.positions.data[out.positions.offset++] = ymax;
              out.positions.data[out.positions.offset++] = xmin;
              out.positions.data[out.positions.offset++] = ymax;
            },
            params
          };
        };
      }
    });
    var require_set = __commonJS2({
      "node_modules/gl-vec2/set.js"(exports2, module22) {
        module22.exports = set;
        function set(out, x, y) {
          out[0] = x;
          out[1] = y;
          return out;
        }
      }
    });
    var require_twiddle = __commonJS2({
      "node_modules/bit-twiddle/twiddle.js"(exports2) {
        "use strict";
        "use restrict";
        var INT_BITS = 32;
        exports2.INT_BITS = INT_BITS;
        exports2.INT_MAX = 2147483647;
        exports2.INT_MIN = -1 << INT_BITS - 1;
        exports2.sign = function(v) {
          return (v > 0) - (v < 0);
        };
        exports2.abs = function(v) {
          var mask = v >> INT_BITS - 1;
          return (v ^ mask) - mask;
        };
        exports2.min = function(x, y) {
          return y ^ (x ^ y) & -(x < y);
        };
        exports2.max = function(x, y) {
          return x ^ (x ^ y) & -(x < y);
        };
        exports2.isPow2 = function(v) {
          return !(v & v - 1) && !!v;
        };
        exports2.log2 = function(v) {
          var r, shift;
          r = (v > 65535) << 4;
          v >>>= r;
          shift = (v > 255) << 3;
          v >>>= shift;
          r |= shift;
          shift = (v > 15) << 2;
          v >>>= shift;
          r |= shift;
          shift = (v > 3) << 1;
          v >>>= shift;
          r |= shift;
          return r | v >> 1;
        };
        exports2.log10 = function(v) {
          return v >= 1e9 ? 9 : v >= 1e8 ? 8 : v >= 1e7 ? 7 : v >= 1e6 ? 6 : v >= 1e5 ? 5 : v >= 1e4 ? 4 : v >= 1e3 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
        };
        exports2.popCount = function(v) {
          v = v - (v >>> 1 & 1431655765);
          v = (v & 858993459) + (v >>> 2 & 858993459);
          return (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
        };
        function countTrailingZeros(v) {
          var c = 32;
          v &= -v;
          if (v)
            c--;
          if (v & 65535)
            c -= 16;
          if (v & 16711935)
            c -= 8;
          if (v & 252645135)
            c -= 4;
          if (v & 858993459)
            c -= 2;
          if (v & 1431655765)
            c -= 1;
          return c;
        }
        exports2.countTrailingZeros = countTrailingZeros;
        exports2.nextPow2 = function(v) {
          v += v === 0;
          --v;
          v |= v >>> 1;
          v |= v >>> 2;
          v |= v >>> 4;
          v |= v >>> 8;
          v |= v >>> 16;
          return v + 1;
        };
        exports2.prevPow2 = function(v) {
          v |= v >>> 1;
          v |= v >>> 2;
          v |= v >>> 4;
          v |= v >>> 8;
          v |= v >>> 16;
          return v - (v >>> 1);
        };
        exports2.parity = function(v) {
          v ^= v >>> 16;
          v ^= v >>> 8;
          v ^= v >>> 4;
          v &= 15;
          return 27030 >>> v & 1;
        };
        var REVERSE_TABLE = new Array(256);
        (function(tab) {
          for (var i = 0; i < 256; ++i) {
            var v = i, r = i, s = 7;
            for (v >>>= 1; v; v >>>= 1) {
              r <<= 1;
              r |= v & 1;
              --s;
            }
            tab[i] = r << s & 255;
          }
        })(REVERSE_TABLE);
        exports2.reverse = function(v) {
          return REVERSE_TABLE[v & 255] << 24 | REVERSE_TABLE[v >>> 8 & 255] << 16 | REVERSE_TABLE[v >>> 16 & 255] << 8 | REVERSE_TABLE[v >>> 24 & 255];
        };
        exports2.interleave2 = function(x, y) {
          x &= 65535;
          x = (x | x << 8) & 16711935;
          x = (x | x << 4) & 252645135;
          x = (x | x << 2) & 858993459;
          x = (x | x << 1) & 1431655765;
          y &= 65535;
          y = (y | y << 8) & 16711935;
          y = (y | y << 4) & 252645135;
          y = (y | y << 2) & 858993459;
          y = (y | y << 1) & 1431655765;
          return x | y << 1;
        };
        exports2.deinterleave2 = function(v, n) {
          v = v >>> n & 1431655765;
          v = (v | v >>> 1) & 858993459;
          v = (v | v >>> 2) & 252645135;
          v = (v | v >>> 4) & 16711935;
          v = (v | v >>> 16) & 65535;
          return v << 16 >> 16;
        };
        exports2.interleave3 = function(x, y, z) {
          x &= 1023;
          x = (x | x << 16) & 4278190335;
          x = (x | x << 8) & 251719695;
          x = (x | x << 4) & 3272356035;
          x = (x | x << 2) & 1227133513;
          y &= 1023;
          y = (y | y << 16) & 4278190335;
          y = (y | y << 8) & 251719695;
          y = (y | y << 4) & 3272356035;
          y = (y | y << 2) & 1227133513;
          x |= y << 1;
          z &= 1023;
          z = (z | z << 16) & 4278190335;
          z = (z | z << 8) & 251719695;
          z = (z | z << 4) & 3272356035;
          z = (z | z << 2) & 1227133513;
          return x | z << 2;
        };
        exports2.deinterleave3 = function(v, n) {
          v = v >>> n & 1227133513;
          v = (v | v >>> 2) & 3272356035;
          v = (v | v >>> 4) & 251719695;
          v = (v | v >>> 8) & 4278190335;
          v = (v | v >>> 16) & 1023;
          return v << 22 >> 22;
        };
        exports2.nextCombination = function(v) {
          var t = v | v - 1;
          return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
        };
      }
    });
    var require_inorder = __commonJS2({
      "node_modules/inorder-tree-layout/inorder.js"(exports2) {
        "use strict";
        var bits = require_twiddle();
        function rootInorder(n) {
          var ptree = (bits.nextPow2(n + 1) >>> 1) - 1;
          var f = n - ptree;
          if (bits.nextPow2(f) - 1 >= ptree) {
            return ptree;
          }
          return (ptree >>> 1) + f;
        }
        exports2.root = rootInorder;
        function beginInorder(n) {
          return 0;
        }
        exports2.begin = beginInorder;
        function endInorder(n) {
          return n - 1;
        }
        exports2.end = endInorder;
        function heightInorder(n, x) {
          if (n <= 0) {
            return 0;
          }
          var r = rootInorder(n);
          if (x > r) {
            return heightInorder(n - r - 1, x - r - 1);
          } else if (x === r) {
            return bits.log2(n);
          }
          return heightInorder(r, x);
        }
        exports2.height = heightInorder;
        function prevInorder(n, x) {
          return Math.max(x - 1, 0);
        }
        exports2.prev = prevInorder;
        function nextInorder(n, x) {
          return Math.min(x + 1, n - 1);
        }
        exports2.next = nextInorder;
        function parentInorder(n, x) {
          if (n <= 0) {
            return -1;
          }
          var r = rootInorder(n);
          if (x > r) {
            var q = parentInorder(n - r - 1, x - r - 1);
            if (q < 0) {
              return r;
            } else {
              return q + r + 1;
            }
          } else if (x === r) {
            return -1;
          }
          var q = parentInorder(r, x);
          if (q < 0) {
            return r;
          }
          return q;
        }
        exports2.parent = parentInorder;
        function leftInorder(n, x) {
          if (n <= 0) {
            return 0;
          }
          var r = rootInorder(n);
          if (x > r) {
            return leftInorder(n - r - 1, x - r - 1) + r + 1;
          } else if (x === r) {
            return rootInorder(x);
          }
          return leftInorder(r, x);
        }
        exports2.left = leftInorder;
        function rightInorder(n, x) {
          if (n <= 0) {
            return 0;
          }
          var r = rootInorder(n);
          if (x > r) {
            return rightInorder(n - r - 1, x - r - 1) + r + 1;
          } else if (x === r) {
            return rootInorder(n - r - 1) + r + 1;
          }
          return rightInorder(r, x);
        }
        exports2.right = rightInorder;
        function leafInorder(n, x) {
          return heightInorder(n, x) === 0;
        }
        exports2.leaf = leafInorder;
        function loInorder(n, x) {
          n |= 0;
          x |= 0;
          var l = 0;
          while (n > 1) {
            var r = rootInorder(n);
            if (x > r) {
              l += r + 1;
              n -= r + 1;
              x -= r + 1;
            } else if (x === r) {
              break;
            } else {
              n = r;
            }
          }
          return l;
        }
        exports2.lo = loInorder;
        function hiInorder(n, x) {
          n |= 0;
          x |= 0;
          var l = 0;
          while (n > 1) {
            var r = rootInorder(n);
            if (x > r) {
              l += r + 1;
              n -= r + 1;
              x -= r + 1;
            } else if (x === r) {
              l += n - 1;
              break;
            } else {
              n = r;
            }
          }
          return l;
        }
        exports2.hi = hiInorder;
      }
    });
    var require_bfs = __commonJS2({
      "node_modules/bfs-tree-layout/bfs.js"(exports2) {
        "use strict";
        var bits = require_twiddle();
        function bfsRoot(n) {
          return 0;
        }
        exports2.root = bfsRoot;
        function bfsBegin(n) {
          return bfsLo(n, 0);
        }
        exports2.begin = bfsBegin;
        function bfsEnd(n) {
          return bfsHi(n, 0);
        }
        exports2.end = bfsEnd;
        function bfsHeight(n, x) {
          var lgn = bits.log2(bits.nextPow2(n + 1));
          var lgx = bits.log2(bits.nextPow2(x + 1));
          var h = lgn - lgx;
          if (x + 1 << h > n) {
            --h;
          }
          return h;
        }
        exports2.height = bfsHeight;
        function bfsNext(n, x) {
          var r = bfsRight(n, x);
          if (r < n) {
            return bfsLo(n, r);
          } else {
            while (x > 0 && (x & 1) === 0) {
              x = x - 1 >> 1;
            }
            x = x - 1 >> 1;
            if (x < 0) {
              return bfsEnd(n);
            }
            return x;
          }
        }
        exports2.next = bfsNext;
        function bfsPrev(n, x) {
          var l = bfsLeft(n, x);
          if (l < n) {
            return bfsHi(n, l);
          } else {
            while (x > 0 && (x & 1) !== 0) {
              x = x - 1 >> 1;
            }
            x = x - 1 >> 1;
            if (x < 0) {
              return bfsBegin(n);
            }
            return x;
          }
        }
        exports2.prev = bfsPrev;
        function bfsLo(n, x) {
          var h = bfsHeight(n, x);
          return (x + 1 << h) - 1;
        }
        exports2.lo = bfsLo;
        function bfsHi(n, x) {
          var h = bfsHeight(n, x);
          var a = (x + 2 << h) - 2;
          if (a < n) {
            return a;
          }
          return (x + 2 << h - 1) - 2;
        }
        exports2.hi = bfsHi;
        function bfsParent(n, x) {
          return x - 1 >>> 1;
        }
        exports2.parent = bfsParent;
        function bfsLeft(n, x) {
          return x * 2 + 1;
        }
        exports2.left = bfsLeft;
        function bfsRight(n, x) {
          return (x + 1) * 2;
        }
        exports2.right = bfsRight;
        function bfsLeaf(n, x) {
          return x * 2 + 1 >= n;
        }
        exports2.leaf = bfsLeaf;
      }
    });
    var require_bfs2inorder = __commonJS2({
      "node_modules/bfs2inorder/bfs2inorder.js"(exports2, module22) {
        "use strict";
        var inorder = require_inorder();
        var bfs = require_bfs();
        var SCRATCH = new Uint32Array(32);
        function bfs2inorder(n, x) {
          for (var i = 0; i < 32; ++i) {
            if (x === 0) {
              var r = inorder.root(n);
              while (--i >= 0) {
                if (SCRATCH[i] & 1) {
                  r = inorder.left(n, r);
                } else {
                  r = inorder.right(n, r);
                }
              }
              return r;
            }
            SCRATCH[i] = x;
            x = bfs.parent(n, x);
          }
          return -1;
        }
        module22.exports = bfs2inorder;
      }
    });
    var require_line = __commonJS2({
      "node_modules/label-placement-engine/preset/line.js"(exports2, module22) {
        var vec2set = require_set();
        var defaultScale = [1, 1];
        var defaultSides = ["left", "right", "center"];
        var order = require_bfs2inorder();
        var v0 = [0, 0];
        var v1 = [0, 0];
        var v2 = [0, 0];
        var v3 = [0, 0];
        module22.exports = function(params) {
          if (!params)
            params = {};
          return {
            size: function(out, f) {
              out.cells = 6;
              out.positions = 8;
              out.bounds = 8;
            },
            write: function(out, f) {
              var sides = f.sides || params.sides || defaultSides;
              var side = f.side || params.side || sides[out.index % sides.length];
              var index = -1;
              if (f.side || params.side) {
                index = out.index;
              } else if (sides.length === 0) {
                return;
              } else {
                index = Math.floor(out.index / sides.length);
              }
              var n = f.positions.length / 2;
              if (out.index >= n - 1)
                return;
              var i = order(n - 1, out.index);
              if (i < 0)
                return;
              var scale = f.scale || params.scale || defaultScale;
              var positions = f.positions || params.positions;
              var positionsScale = f.positionsScale || params.positionsScale || scale;
              var p0 = positions[i * 2 + 0] * positionsScale[0];
              var p1 = positions[i * 2 + 1] * positionsScale[1];
              var p2 = positions[i * 2 + 2] * positionsScale[0];
              var p3 = positions[i * 2 + 3] * positionsScale[1];
              var labelSize = f.labelSize || params.labelSize;
              var labelSizeScale = f.labelSizeScale || params.labelSizeScale || scale;
              var labelSize0 = labelSize[0] * labelSizeScale[0];
              var labelSize1 = labelSize[1] * labelSizeScale[1];
              var labelMargin = f.labelMargin || params.labelMargin;
              var labelMarginScale = f.labelMarginScale || params.labelMarginScale || defaultScale;
              var labelMargin0 = labelMargin[0] * labelMarginScale[0];
              var labelMargin1 = labelMargin[1] * labelMarginScale[1];
              var aspect = f.aspect || params.aspect || 1;
              var labelLineMargin = f.labelLineMargin || params.labelLineMargin || 0;
              var labelLineMarginScale = f.labelLineMarginScale || params.labelLineMarginScale || scale;
              var labelLineMargin0 = labelLineMargin * (Array.isArray(labelLineMarginScale) ? labelLineMarginScale[1] : labelLineMarginScale);
              var cx = (p0 + p2) / 2 * aspect;
              var cy = (p1 + p3) / 2;
              var lsx = labelSize0 * aspect / 2;
              var lsy = labelSize1 / 2;
              var x0, x1, y0, y1;
              if (side === "left") {
                x0 = cx - lsx;
                x1 = cx + lsx;
                y0 = cy - lsy * 2 - labelLineMargin0;
                y1 = cy - labelLineMargin0;
              } else if (side === "center") {
                x0 = cx - lsx;
                x1 = cx + lsx;
                y0 = cy - lsy;
                y1 = cy + lsy;
              } else if (side === "right") {
                x0 = cx - lsx;
                x1 = cx + lsx;
                y0 = cy + labelLineMargin0;
                y1 = cy + lsy * 2 + labelLineMargin0;
              }
              vec2set(v0, x0, y0);
              vec2set(v1, x1, y0);
              vec2set(v2, x1, y1);
              vec2set(v3, x0, y1);
              out.positions.data[out.positions.offset++] = v0[0] / aspect;
              out.positions.data[out.positions.offset++] = v0[1];
              out.positions.data[out.positions.offset++] = v1[0] / aspect;
              out.positions.data[out.positions.offset++] = v1[1];
              out.positions.data[out.positions.offset++] = v2[0] / aspect;
              out.positions.data[out.positions.offset++] = v2[1];
              out.positions.data[out.positions.offset++] = v3[0] / aspect;
              out.positions.data[out.positions.offset++] = v3[1];
              var px = labelMargin0 * aspect;
              var py = labelMargin1;
              x0 -= px;
              x1 += px;
              y0 -= py;
              y1 += py;
              vec2set(v0, x0, y0);
              vec2set(v1, x1, y0);
              vec2set(v2, x1, y1);
              vec2set(v3, x0, y1);
              out.bounds.data[out.bounds.offset++] = v0[0] / aspect;
              out.bounds.data[out.bounds.offset++] = v0[1];
              out.bounds.data[out.bounds.offset++] = v1[0] / aspect;
              out.bounds.data[out.bounds.offset++] = v1[1];
              out.bounds.data[out.bounds.offset++] = v2[0] / aspect;
              out.bounds.data[out.bounds.offset++] = v2[1];
              out.bounds.data[out.bounds.offset++] = v3[0] / aspect;
              out.bounds.data[out.bounds.offset++] = v3[1];
              out.cells.data[out.cells.offset++] = 0;
              out.cells.data[out.cells.offset++] = 1;
              out.cells.data[out.cells.offset++] = 2;
              out.cells.data[out.cells.offset++] = 0;
              out.cells.data[out.cells.offset++] = 2;
              out.cells.data[out.cells.offset++] = 3;
            },
            params
          };
        };
      }
    });
    var require_area = __commonJS2({
      "node_modules/label-placement-engine/preset/area.js"(exports2, module22) {
        var vec2set = require_set();
        var ptest = require_flat2();
        var defaultScale = [1, 1];
        var X = [0, 0, 0, 0, 0, 0, 0, 0];
        var C = [0, 0];
        module22.exports = function(params) {
          if (!params)
            params = {};
          return {
            size: function(out, f) {
              out.cells = 6;
              out.positions = 8;
              out.bounds = 16;
            },
            write: function(out, f) {
              vec2set(C, 0, 0);
              var positions = f.positions || params.positions;
              if (positions.length < 2)
                return;
              var n = positions.length / 2;
              for (var i = 0; i < positions.length; i += 2) {
                var x = positions[i + 0], y = positions[i + 1];
                if (!isNaN(x))
                  C[0] += x / n;
                if (!isNaN(y))
                  C[1] += y / n;
              }
              var scale = f.scale || params.scale || defaultScale;
              var positions = f.positions || params.positions;
              var positionsScale = f.positionsScale || params.positionsScale || scale;
              var labelSize = f.labelSize || params.labelSize;
              var labelSizeScale = f.labelSizeScale || params.labelSizeScale || scale;
              var labelSize0 = labelSize[0] * labelSizeScale[0];
              var labelSize1 = labelSize[1] * labelSizeScale[1];
              var labelMargin = f.labelMargin || params.labelMargin;
              var labelMarginScale = f.labelMarginScale || params.labelMarginScale || defaultScale;
              var labelMargin0 = labelMargin[0] * labelMarginScale[0];
              var labelMargin1 = labelMargin[1] * labelMarginScale[1];
              var aspect = f.aspect || params.aspect || 1;
              var xmin = C[0] - labelSize0 * 0.5;
              var xmax = C[0] + labelSize0 * 0.5;
              var ymin = C[1] - labelSize1 * 0.5;
              var ymax = C[1] + labelSize1 * 0.5;
              pset(X, xmin, xmax, ymin, ymax);
              if (!ptest(X, positions))
                return;
              out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
              out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
              out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
              out.bounds.data[out.bounds.offset++] = ymin - labelMargin1;
              out.bounds.data[out.bounds.offset++] = xmax + labelMargin0;
              out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
              out.bounds.data[out.bounds.offset++] = xmin - labelMargin0;
              out.bounds.data[out.bounds.offset++] = ymax + labelMargin1;
              out.cells.data[out.cells.offset++] = 0;
              out.cells.data[out.cells.offset++] = 1;
              out.cells.data[out.cells.offset++] = 2;
              out.cells.data[out.cells.offset++] = 0;
              out.cells.data[out.cells.offset++] = 2;
              out.cells.data[out.cells.offset++] = 3;
              out.positions.data[out.positions.offset++] = xmin;
              out.positions.data[out.positions.offset++] = ymin;
              out.positions.data[out.positions.offset++] = xmax;
              out.positions.data[out.positions.offset++] = ymin;
              out.positions.data[out.positions.offset++] = xmax;
              out.positions.data[out.positions.offset++] = ymax;
              out.positions.data[out.positions.offset++] = xmin;
              out.positions.data[out.positions.offset++] = ymax;
            },
            params
          };
        };
        function pset(out, xmin, xmax, ymin, ymax) {
          out[0] = xmin;
          out[1] = ymin;
          out[2] = xmax;
          out[3] = ymin;
          out[4] = xmax;
          out[5] = ymax;
          out[6] = xmin;
          out[7] = ymax;
        }
      }
    });
    var require_features = __commonJS2({
      "node_modules/@rubenrodriguez/georender-pack/features.json"(exports2, module22) {
        module22.exports = [
          "aerialway.cable_car",
          "aerialway.canopy",
          "aerialway.chair_lift",
          "aerialway.drag_lift",
          "aerialway.gondola",
          "aerialway.goods",
          "aerialway.j-bar",
          "aerialway.magic_carpet",
          "aerialway.mixed_lift",
          "aerialway.other",
          "aerialway.platter",
          "aerialway.pylon",
          "aerialway.rope_tow",
          "aerialway.station",
          "aerialway.t-bar",
          "aerialway.zip_line",
          "aeroway.aerodrome",
          "aeroway.apron",
          "aeroway.gate",
          "aeroway.hangar",
          "aeroway.helipad",
          "aeroway.heliport",
          "aeroway.navigationaid",
          "aeroway.runway",
          "aeroway.spaceport",
          "aeroway.taxiway",
          "aeroway.terminal",
          "aeroway.windsock",
          "amenity.animal_boarding",
          "amenity.animal_shelter",
          "amenity.arts_centre",
          "amenity.atm",
          "amenity.baby_hatch",
          "amenity.baking_oven",
          "amenity.bank",
          "amenity.bar",
          "amenity.bbq",
          "amenity.bench",
          "amenity.bicycle_parking",
          "amenity.bicycle_rental",
          "amenity.bicycle_repair_station",
          "amenity.biergarten",
          "amenity.boat_rental",
          "amenity.boat_sharing",
          "amenity.brothel",
          "amenity.bureau_de_change",
          "amenity.bus_station",
          "amenity.cafe",
          "amenity.car_rental",
          "amenity.car_sharing",
          "amenity.car_wash",
          "amenity.casino",
          "amenity.charging_station",
          "amenity.childcare",
          "amenity.cinema",
          "amenity.clinic",
          "amenity.clock",
          "amenity.college",
          "amenity.community_centre",
          "amenity.conference_centre",
          "amenity.courthouse",
          "amenity.coworking_space",
          "amenity.crematorium",
          "amenity.crypt",
          "amenity.dentist",
          "amenity.dive_centre",
          "amenity.doctors",
          "amenity.dojo",
          "amenity.drinking_water",
          "amenity.driving_school",
          "amenity.embassy",
          "amenity.fast food",
          "amenity.ferry_terminal",
          "amenity.fire_station",
          "amenity.firepit",
          "amenity.food_court",
          "amenity.fountain",
          "amenity.fuel",
          "amenity.gambling",
          "amenity.game_feeding",
          "amenity.give_box",
          "amenity.grave_yard",
          "amenity.grit_bin",
          "amenity.gym",
          "amenity.hospital",
          "amenity.hunting_stand",
          "amenity.ice_cream",
          "amenity.internet_cafe",
          "amenity.kindergarten",
          "amenity.kitchen",
          "amenity.kneipp_water_cure",
          "amenity.language_school",
          "amenity.library",
          "amenity.marketplace",
          "amenity.monastery",
          "amenity.motorcycle_parking",
          "amenity.music_school",
          "amenity.nightclub",
          "amenity.nursing_home",
          "amenity.other",
          "amenity.parking",
          "amenity.parking_entrance",
          "amenity.parking_space",
          "amenity.pharmacy",
          "amenity.photo_booth",
          "amenity.place_of_worship",
          "amenity.planetarium",
          "amenity.police",
          "amenity.post_box",
          "amenity.post_office",
          "amenity.prison",
          "amenity.pub",
          "amenity.public_bookcase",
          "amenity.public_building",
          "amenity.ranger_station",
          "amenity.recycling",
          "amenity.refugee_site",
          "amenity.rescue_station",
          "amenity.restaurant",
          "amenity.sanitary_dump_station",
          "amenity.sauna",
          "amenity.school",
          "amenity.shelter",
          "amenity.shower",
          "amenity.social_centre",
          "amenity.social_facility",
          "amenity.stripclub",
          "amenity.studio",
          "amenity.swingerclub",
          "amenity.table",
          "amenity.taxi",
          "amenity.telephone",
          "amenity.theatre",
          "amenity.toilets",
          "amenity.townhall",
          "amenity.toy_library",
          "amenity.university",
          "amenity.vehicle_inspection",
          "amenity.vending_machine",
          "amenity.veterinary",
          "amenity.waste_basket",
          "amenity.waste_disposal",
          "amenity.waste_transfer_station",
          "amenity.water_point",
          "amenity.watering_place",
          "barrier.block",
          "barrier.bollard",
          "barrier.border_control",
          "barrier.bump_gate",
          "barrier.bus_trap",
          "barrier.cable_barrier",
          "barrier.cattle_grid",
          "barrier.chain",
          "barrier.city_wall",
          "barrier.cycle_barrier",
          "barrier.debris",
          "barrier.ditch",
          "barrier.entrance",
          "barrier.fence",
          "barrier.full-height_turnstile",
          "barrier.gate",
          "barrier.guard_rail",
          "barrier.hampshire_gate",
          "barrier.handrail",
          "barrier.hedge",
          "barrier.height_restrictor",
          "barrier.horse_stile",
          "barrier.jersey_barrier",
          "barrier.kent_carriage_gap",
          "barrier.kerb",
          "barrier.kissing_gate",
          "barrier.lift_gate",
          "barrier.log",
          "barrier.motorcycle_barrier",
          "barrier.other",
          "barrier.retaining_wall",
          "barrier.rope",
          "barrier.sally_port",
          "barrier.spikes",
          "barrier.stile",
          "barrier.sump_buster",
          "barrier.swing_gate",
          "barrier.tank_trap",
          "barrier.toll_booth",
          "barrier.turnstile",
          "barrier.wall",
          "barrier.yes",
          "border_type.baseline",
          "border_type.contiguous",
          "border_type.eez",
          "border_type.territorial",
          "boundary.aboriginal_lands",
          "boundary.administrative",
          "boundary.historic",
          "boundary.maritime",
          "boundary.marker",
          "boundary.national_park",
          "boundary.other",
          "boundary.political",
          "boundary.postal_code",
          "boundary.protected_area",
          "boundary.religious_administration",
          "building.apartments",
          "building.bakehouse",
          "building.barn",
          "building.bridge",
          "building.bungalow",
          "building.bunker",
          "building.cabin",
          "building.carport",
          "building.cathedral",
          "building.chapel",
          "building.church",
          "building.civic",
          "building.commercial",
          "building.conservatory",
          "building.construction",
          "building.cowshed",
          "building.detached",
          "building.digester",
          "building.dormitory",
          "building.farm",
          "building.farm_auxiliary",
          "building.fire_station",
          "building.garage",
          "building.garages",
          "building.ger",
          "building.government",
          "building.grandstand",
          "building.greenhouse",
          "building.hangar",
          "building.hospital",
          "building.hotel",
          "building.house",
          "building.houseboat",
          "building.hut",
          "building.industrial",
          "building.kindergarten",
          "building.kiosk",
          "building.mosque",
          "building.office",
          "building.other",
          "building.parking",
          "building.pavilion",
          "building.public",
          "building.religious",
          "building.residential",
          "building.retail",
          "building.riding_hall",
          "building.roof",
          "building.ruins",
          "building.school",
          "building.semidetached_house",
          "building.service",
          "building.shed",
          "building.shrine",
          "building.sports_hall",
          "building.stable",
          "building.stadium",
          "building.static_caravan",
          "building.sty",
          "building.supermarket",
          "building.synagogue",
          "building.temple",
          "building.terrace",
          "building.toilets",
          "building.train_station",
          "building.transformer_tower",
          "building.transportation",
          "building.tree_house",
          "building.university",
          "building.warehouse",
          "building.water_tower",
          "building.yes",
          "busway.lane",
          "communication.line",
          "craft.agricultural_engines",
          "craft.atelier",
          "craft.bakery",
          "craft.basket_maker",
          "craft.beekeeper",
          "craft.blacksmith",
          "craft.boatbuilder",
          "craft.bookbinder",
          "craft.brewery",
          "craft.builder",
          "craft.cabinet_maker",
          "craft.car_painter",
          "craft.carpenter",
          "craft.carpet_layer",
          "craft.caterer",
          "craft.chimney_sweeper",
          "craft.clockmaker",
          "craft.confectionary",
          "craft.cooper",
          "craft.dental_technician",
          "craft.distillery",
          "craft.door_construction",
          "craft.dressmaker",
          "craft.electrician",
          "craft.electronics_repair",
          "craft.embroiderer",
          "craft.engraver",
          "craft.floorer",
          "craft.gardener",
          "craft.glaziery",
          "craft.grinding_mill",
          "craft.handicraft",
          "craft.hvac",
          "craft.insulation",
          "craft.jeweller",
          "craft.joiner",
          "craft.key_cutter",
          "craft.locksmith",
          "craft.metal_construction",
          "craft.mint",
          "craft.musical_instrument",
          "craft.oil_mill",
          "craft.optician",
          "craft.organ_builder",
          "craft.other",
          "craft.painter",
          "craft.parquet_layer",
          "craft.photographer",
          "craft.photographic_laboratory",
          "craft.piano_tuner",
          "craft.plasterer",
          "craft.plumber",
          "craft.pottery",
          "craft.printer",
          "craft.printmaker",
          "craft.rigger",
          "craft.roofer",
          "craft.saddler",
          "craft.sailmaker",
          "craft.sawmill",
          "craft.scaffolder",
          "craft.sculptor",
          "craft.shoemaker",
          "craft.signmaker",
          "craft.stand_builder",
          "craft.stonemason",
          "craft.sun_protection",
          "craft.tailor",
          "craft.tiler",
          "craft.tinsmith",
          "craft.toolmaker",
          "craft.turner",
          "craft.upholsterer",
          "craft.watchmaker",
          "craft.water_well_drilling",
          "craft.window_construction",
          "craft.winery",
          "cycleway.lane",
          "cycleway.opposite",
          "cycleway.opposite_lane",
          "cycleway.opposite_share_busway",
          "cycleway.opposite_track",
          "cycleway.share_busway",
          "cycleway.shared_lane",
          "cycleway.track",
          "emergecy.dry_riser_inlet",
          "emergency.ambulance_station",
          "emergency.assembly_point",
          "emergency.defibrillator",
          "emergency.drinking_water",
          "emergency.emergency_ward_entrance",
          "emergency.fire_alarm_box",
          "emergency.fire_extinguisher",
          "emergency.fire_hydrant",
          "emergency.firehose",
          "emergency.landing_site",
          "emergency.life_ring",
          "emergency.lifeguard",
          "emergency.lifeguard_base",
          "emergency.lifeguard_platform",
          "emergency.lifeguard_tower",
          "emergency.other",
          "emergency.phone",
          "emergency.siren",
          "emergency.suction_point",
          "emergency.water_tank",
          "geological.moraine",
          "geological.other",
          "geological.outcrop",
          "geological.palaeontological_site",
          "highway.bridleway",
          "highway.bus_guideway",
          "highway.bus_stop",
          "highway.construction",
          "highway.corridor",
          "highway.crossing",
          "highway.cycleway",
          "highway.elevator",
          "highway.emergency_access_point",
          "highway.escape",
          "highway.footway",
          "highway.give_way",
          "highway.living_street",
          "highway.mini_roundabout",
          "highway.motorway",
          "highway.motorway_junction",
          "highway.motorway_link",
          "highway.other",
          "highway.passing_place",
          "highway.path",
          "highway.pedestrian",
          "highway.primary",
          "highway.primary_link",
          "highway.proposed",
          "highway.raceway",
          "highway.residential",
          "highway.rest_area",
          "highway.road",
          "highway.secondary",
          "highway.secondary_link",
          "highway.service",
          "highway.services",
          "highway.speed_camera",
          "highway.steps",
          "highway.stop",
          "highway.street_lamp",
          "highway.tertiary",
          "highway.tertiary_link",
          "highway.toll_gantry",
          "highway.track",
          "highway.traffic_mirror",
          "highway.traffic_signals",
          "highway.trailhead",
          "highway.trunk",
          "highway.trunk_link",
          "highway.turning_circle",
          "highway.turning_loop",
          "highway.unclassified",
          "historic.aircraft",
          "historic.aqueduct",
          "historic.archaeological_site",
          "historic.battlefield",
          "historic.boundary_stone",
          "historic.building",
          "historic.cannon",
          "historic.castle",
          "historic.castle_wall",
          "historic.church",
          "historic.city_gate",
          "historic.citywalls",
          "historic.farm",
          "historic.fort",
          "historic.gallows",
          "historic.highwater_mark",
          "historic.locomotive",
          "historic.manor",
          "historic.memorial",
          "historic.milestone",
          "historic.monastery",
          "historic.monument",
          "historic.optical_telegraph",
          "historic.other",
          "historic.pillory",
          "historic.railway_car",
          "historic.ruins",
          "historic.rune_stone",
          "historic.ship",
          "historic.tank",
          "historic.tomb",
          "historic.tower",
          "historic.tree_shrine",
          "historic.wayside_cross",
          "historic.wayside_shrine",
          "historic.wreck",
          "historic.yes",
          "landuse.allotments",
          "landuse.basin",
          "landuse.brownfield",
          "landuse.cemetery",
          "landuse.commercial",
          "landuse.conservation",
          "landuse.construction",
          "landuse.depot",
          "landuse.farmland",
          "landuse.farmyard",
          "landuse.forest",
          "landuse.garages",
          "landuse.grass",
          "landuse.greenfield",
          "landuse.greenhouse_horticulture",
          "landuse.industrial",
          "landuse.landfill",
          "landuse.meadow",
          "landuse.military",
          "landuse.orchard",
          "landuse.other",
          "landuse.pasture",
          "landuse.peat_cutting",
          "landuse.plant_nursery",
          "landuse.port",
          "landuse.quarry",
          "landuse.railway",
          "landuse.recreation_ground",
          "landuse.religious",
          "landuse.reservoir",
          "landuse.residential",
          "landuse.retail",
          "landuse.salt_pond",
          "landuse.village_green",
          "landuse.vineyard",
          "leisure.adult_gaming_centre",
          "leisure.amusement_arcade",
          "leisure.bandstand",
          "leisure.bird_hide",
          "leisure.common",
          "leisure.dance",
          "leisure.disc_golf_course",
          "leisure.dog_park",
          "leisure.escape_game",
          "leisure.firepit",
          "leisure.fishing",
          "leisure.fitness_centre",
          "leisure.garden",
          "leisure.hackerspace",
          "leisure.horse_riding",
          "leisure.ice_rink",
          "leisure.marina",
          "leisure.miniature_golf",
          "leisure.nature_reserve",
          "leisure.other",
          "leisure.park",
          "leisure.picnic_table",
          "leisure.pitch",
          "leisure.playground",
          "leisure.slipway",
          "leisure.sports_centre",
          "leisure.stadium",
          "leisure.summer_camp",
          "leisure.swimming_area",
          "leisure.swimming_pool",
          "leisure.track",
          "leisure.water_park",
          "lesure.beach_resort",
          "line.bay",
          "line.busbar",
          "man_made.adit",
          "man_made.beacon",
          "man_made.breakwater",
          "man_made.bridge",
          "man_made.bunker_silo",
          "man_made.carpet_hanger",
          "man_made.chimney",
          "man_made.clearcut",
          "man_made.communications_tower",
          "man_made.crane",
          "man_made.cross",
          "man_made.cutline",
          "man_made.dovecote",
          "man_made.dyke",
          "man_made.embankment",
          "man_made.flagpole",
          "man_made.gasometer",
          "man_made.goods_conveyor",
          "man_made.groyne",
          "man_made.kiln",
          "man_made.lighthouse",
          "man_made.mast",
          "man_made.mineshaft",
          "man_made.monitoring_station",
          "man_made.obelisk",
          "man_made.observatory",
          "man_made.offshore_platform",
          "man_made.other",
          "man_made.petroleum_well",
          "man_made.pier",
          "man_made.pipeline",
          "man_made.pumping_station",
          "man_made.reservoir_covered",
          "man_made.silo",
          "man_made.snow_fence",
          "man_made.snow_net",
          "man_made.storage_tank",
          "man_made.street_cabinet",
          "man_made.surveillance",
          "man_made.survey_point",
          "man_made.telescope",
          "man_made.tower",
          "man_made.wastewater_plant",
          "man_made.water_tap",
          "man_made.water_tower",
          "man_made.water_well",
          "man_made.water_works",
          "man_made.watermill",
          "man_made.wildlife_crossing",
          "man_made.windmill",
          "man_made.works",
          "military.airfield",
          "military.barracks",
          "military.bunker",
          "military.checkpoint",
          "military.danger_area",
          "military.naval_base",
          "military.nuclear_explosion_site",
          "military.obstacle_course",
          "military.office",
          "military.other",
          "military.range",
          "military.training_area",
          "military.trench",
          "natural.arete",
          "natural.bare_rock",
          "natural.bay",
          "natural.beach",
          "natural.blowhole",
          "natural.cape",
          "natural.cave_entrance",
          "natural.cliff",
          "natural.coastline",
          "natural.dune",
          "natural.fell",
          "natural.geyser",
          "natural.glacier",
          "natural.grassland",
          "natural.heath",
          "natural.hot_spring",
          "natural.isthmus",
          "natural.moor",
          "natural.mud",
          "natural.other",
          "natural.peak",
          "natural.peninsula",
          "natural.reef",
          "natural.ridge",
          "natural.rock",
          "natural.saddle",
          "natural.sand",
          "natural.scree",
          "natural.scrub",
          "natural.shingle",
          "natural.sinkhole",
          "natural.spring",
          "natural.stone",
          "natural.strait",
          "natural.tree",
          "natural.tree_row",
          "natural.valley",
          "natural.volcano",
          "natural.water",
          "natural.wetland",
          "natural.wood",
          "office.accountant",
          "office.adoption_agency",
          "office.advertising_agency",
          "office.architect",
          "office.association",
          "office.bail_bond_agent",
          "office.charity",
          "office.company",
          "office.consulting",
          "office.coworking",
          "office.diplomatic",
          "office.educational_institution",
          "office.employment_agency",
          "office.energy_supplier",
          "office.engineer",
          "office.estate_agent",
          "office.financial",
          "office.forestry",
          "office.foundation",
          "office.gedesist",
          "office.government",
          "office.graphic_design",
          "office.guide",
          "office.harbour_master",
          "office.insurance",
          "office.it",
          "office.lawyer",
          "office.logistics",
          "office.moving_company",
          "office.newspaper",
          "office.ngo",
          "office.notary",
          "office.other",
          "office.political_party",
          "office.private_investigator",
          "office.property_management",
          "office.quango",
          "office.religion",
          "office.research",
          "office.security",
          "office.surveyor",
          "office.tax",
          "office.tax_advisor",
          "office.telecommunication",
          "office.union",
          "office.visa",
          "office.water_utility",
          "place.allotments",
          "place.archipelago",
          "place.borough",
          "place.city",
          "place.city_block",
          "place.continent",
          "place.country",
          "place.county",
          "place.district",
          "place.farm",
          "place.hamlet",
          "place.island",
          "place.islet",
          "place.isolated_dwelling",
          "place.locality",
          "place.municipality",
          "place.neighbourhood",
          "place.ocean",
          "place.other",
          "place.plot",
          "place.province",
          "place.quarter",
          "place.region",
          "place.sea",
          "place.square",
          "place.state",
          "place.suburb",
          "place.town",
          "place.village",
          "power.cable",
          "power.catenary_mast",
          "power.compensator",
          "power.converter",
          "power.generator",
          "power.heliostat",
          "power.insulator",
          "power.line",
          "power.minor_line",
          "power.other",
          "power.plant",
          "power.pole",
          "power.portal",
          "power.substation",
          "power.switchgear",
          "power.terminal",
          "power.tower",
          "power.transformer",
          "public_transport.other",
          "public_transport.platform",
          "public_transport.station",
          "public_transport.stop_area",
          "public_transport.stop_position",
          "railway.abandoned",
          "railway.buffer_stop",
          "railway.construction",
          "railway.crossing",
          "railway.derail",
          "railway.disused",
          "railway.funicular",
          "railway.halt",
          "railway.level_crossing",
          "railway.light_rail",
          "railway.miniature",
          "railway.monorail",
          "railway.narrow_gauge",
          "railway.other",
          "railway.platform",
          "railway.preserved",
          "railway.rail",
          "railway.railway_crossing",
          "railway.roundhouse",
          "railway.signal",
          "railway.station",
          "railway.subway",
          "railway.subway_entrance",
          "railway.switch",
          "railway.tram",
          "railway.tram_stop",
          "railway.traverser",
          "railway.turntable",
          "railway.wash",
          "route.bicycle",
          "route.bus",
          "route.canoe",
          "route.detour",
          "route.ferry",
          "route.foot",
          "route.hiking",
          "route.horse",
          "route.inline_skates",
          "route.light_rail",
          "route.mtb",
          "route.other",
          "route.piste",
          "route.power",
          "route.railway",
          "route.road",
          "route.running",
          "route.ski",
          "route.subway",
          "route.tracks",
          "route.train",
          "route.tram",
          "route.trolleybus",
          "seamark:type.anchor_berth",
          "seamark:type.anchorage",
          "seamark:type.beacon_cardinal",
          "seamark:type.beacon_isolated_danger",
          "seamark:type.beacon_lateral",
          "seamark:type.beacon_safe_water",
          "seamark:type.beacon_special_purpose",
          "seamark:type.berth",
          "seamark:type.bridge",
          "seamark:type.building",
          "seamark:type.bunker_station",
          "seamark:type.buoy_cardinal",
          "seamark:type.buoy_installation",
          "seamark:type.buoy_isolated_danger",
          "seamark:type.buoy_lateral",
          "seamark:type.buoy_safe_water",
          "seamark:type.buoy_special_purpose",
          "seamark:type.cable_area",
          "seamark:type.cable_overhead",
          "seamark:type.cable_submarine",
          "seamark:type.calling-in_point",
          "seamark:type.causeway",
          "seamark:type.checkpoint",
          "seamark:type.coastguard_station",
          "seamark:type.communication_area",
          "seamark:type.control_point",
          "seamark:type.daymark",
          "seamark:type.distance_mark",
          "seamark:type.dredged_area",
          "seamark:type.dumping_ground",
          "seamark:type.exceptional_structure",
          "seamark:type.fairway",
          "seamark:type.ferry_route",
          "seamark:type.fishing_facility",
          "seamark:type.fog_signal",
          "seamark:type.fortified_structure",
          "seamark:type.gate",
          "seamark:type.gridirom",
          "seamark:type.harbour",
          "seamark:type.harbour_basin",
          "seamark:type.hulk",
          "seamark:type.inshore_traffic_zone",
          "seamark:type.landmark",
          "seamark:type.light",
          "seamark:type.light_float",
          "seamark:type.light_major",
          "seamark:type.light_minor",
          "seamark:type.light_vessel",
          "seamark:type.lock_basin",
          "seamark:type.marine_farm",
          "seamark:type.military_area",
          "seamark:type.mooring",
          "seamark:type.navigation_line",
          "seamark:type.notice",
          "seamark:type.obstruction",
          "seamark:type.oil_barrier",
          "seamark:type.pile",
          "seamark:type.pilot_boarding",
          "seamark:type.pipeline_area",
          "seamark:type.pipeline_overhead",
          "seamark:type.pipeline_submarine",
          "seamark:type.platform",
          "seamark:type.pontoon",
          "seamark:type.precautionary_area",
          "seamark:type.production_area",
          "seamark:type.protected_area",
          "seamark:type.pylon",
          "seamark:type.radar_line",
          "seamark:type.radar_range",
          "seamark:type.radar_reflector",
          "seamark:type.radar_station",
          "seamark:type.radar_transponder",
          "seamark:type.radio_station",
          "seamark:type.recommended_route_centreline",
          "seamark:type.recommended_track",
          "seamark:type.recommended_traffic_lane",
          "seamark:type.rescue_station",
          "seamark:type.restricted_area",
          "seamark:type.retro_reflector",
          "seamark:type.rock",
          "seamark:type.sand_waves",
          "seamark:type.sea_area",
          "seamark:type.seabed_area",
          "seamark:type.seaplane_landing_area",
          "seamark:type.separation_boundary",
          "seamark:type.separation_crossing",
          "seamark:type.separation_lane",
          "seamark:type.separation_line",
          "seamark:type.separation_roundabout",
          "seamark:type.separation_zone",
          "seamark:type.shoreline_construction",
          "seamark:type.signal_station_traffic",
          "seamark:type.signal_station_warning",
          "seamark:type.small_craft_facility",
          "seamark:type.spring",
          "seamark:type.submarine_transit_lane",
          "seamark:type.tank",
          "seamark:type.topmark",
          "seamark:type.turning_basin",
          "seamark:type.two-way_route",
          "seamark:type.vegetation",
          "seamark:type.vehicle_transfer",
          "seamark:type.virtual_aton",
          "seamark:type.wall",
          "seamark:type.water_turbulence",
          "seamark:type.waterway_gauge",
          "seamark:type.weed",
          "seamark:type.wreck",
          "shop.agrarian",
          "shop.alcohol",
          "shop.anime",
          "shop.antiques",
          "shop.appliance",
          "shop.art",
          "shop.atv",
          "shop.baby_goods",
          "shop.bag",
          "shop.bakery",
          "shop.bathroom_furnishing",
          "shop.beauty",
          "shop.bed",
          "shop.beverages",
          "shop.bicycle",
          "shop.boat",
          "shop.bookmaker",
          "shop.books",
          "shop.boutique",
          "shop.brewing_supplies",
          "shop.butcher",
          "shop.camera",
          "shop.candles",
          "shop.cannabis",
          "shop.car",
          "shop.car_parts",
          "shop.car_repair",
          "shop.caravan",
          "shop.carpet",
          "shop.charity",
          "shop.cheese",
          "shop.chemist",
          "shop.chocolate",
          "shop.clothes",
          "shop.coffee",
          "shop.collector",
          "shop.computer",
          "shop.confectionery",
          "shop.convenience",
          "shop.copyshop",
          "shop.cosmetics",
          "shop.craft",
          "shop.curtain",
          "shop.dairy",
          "shop.deli",
          "shop.department_store",
          "shop.doityourself",
          "shop.doors",
          "shop.dry_cleaning",
          "shop.e-cigarette",
          "shop.electrical",
          "shop.electronics",
          "shop.energy",
          "shop.erotic",
          "shop.fabric",
          "shop.farm",
          "shop.fashion",
          "shop.fashion_accessories",
          "shop.fireplace",
          "shop.fishing",
          "shop.flooring",
          "shop.florist",
          "shop.frame",
          "shop.free_flying",
          "shop.frozen_food",
          "shop.fuel",
          "shop.funeral_directors",
          "shop.furniture",
          "shop.games",
          "shop.garden_centre",
          "shop.garden_furniture",
          "shop.gas",
          "shop.general",
          "shop.gift",
          "shop.glaziery",
          "shop.golf",
          "shop.greengrocer",
          "shop.hairdresser",
          "shop.hairdresser_supply",
          "shop.hardware",
          "shop.health_food",
          "shop.hearing_aids",
          "shop.herbalist",
          "shop.hifi",
          "shop.household_linen",
          "shop.houseware",
          "shop.hunting",
          "shop.ice_cream",
          "shop.interior_decoration",
          "shop.jetski",
          "shop.jewelry",
          "shop.kiosk",
          "shop.kitchen",
          "shop.lamps",
          "shop.laundry",
          "shop.leather",
          "shop.lighting",
          "shop.locksmith",
          "shop.lottery",
          "shop.mall",
          "shop.massage",
          "shop.medical_supply",
          "shop.military_surplus",
          "shop.mobile_phone",
          "shop.model",
          "shop.money_lender",
          "shop.motorcycle",
          "shop.music",
          "shop.musical_instrument",
          "shop.newsagent",
          "shop.nutrition_supplements",
          "shop.optician",
          "shop.organic",
          "shop.other",
          "shop.outdoor",
          "shop.outpost",
          "shop.paint",
          "shop.party",
          "shop.pasta",
          "shop.pastry",
          "shop.pawnbroker",
          "shop.perfumery",
          "shop.pest_control",
          "shop.pet",
          "shop.pet_grooming",
          "shop.photo",
          "shop.pyrotechnics",
          "shop.radiotechnics",
          "shop.religion",
          "shop.robot",
          "shop.scuba_diving",
          "shop.seafood",
          "shop.second_hand",
          "shop.security",
          "shop.sewing",
          "shop.shoes",
          "shop.ski",
          "shop.snowmobile",
          "shop.spices",
          "shop.sports",
          "shop.stationery",
          "shop.storage_rental",
          "shop.supermarket",
          "shop.swimming_pool",
          "shop.tailor",
          "shop.tattoo",
          "shop.tea",
          "shop.ticket",
          "shop.tiles",
          "shop.tobacco",
          "shop.toys",
          "shop.trade",
          "shop.trailer",
          "shop.travel_agency",
          "shop.trophy",
          "shop.tyres",
          "shop.vacant",
          "shop.vacuum_cleaner",
          "shop.variety_store",
          "shop.video",
          "shop.video_games",
          "shop.watches",
          "shop.water",
          "shop.weapons",
          "shop.wholesale",
          "shop.window_blind",
          "shop.wine",
          "shop.wool",
          "sport.10pin",
          "sport.9pin",
          "sport.aikido",
          "sport.american_football",
          "sport.archery",
          "sport.athletics",
          "sport.australian_football",
          "sport.badminton",
          "sport.bandy",
          "sport.baseball",
          "sport.basketball",
          "sport.beachvolleyball",
          "sport.biathlon",
          "sport.billiards",
          "sport.bmx",
          "sport.bobsleigh",
          "sport.boules",
          "sport.bowls",
          "sport.boxing",
          "sport.bullfighting",
          "sport.canadian_football",
          "sport.canoe",
          "sport.chess",
          "sport.cliff_diving",
          "sport.climbing",
          "sport.climbing_adventure",
          "sport.cockfighting",
          "sport.cricket",
          "sport.croquet",
          "sport.crossfit",
          "sport.curling",
          "sport.cycling",
          "sport.darts",
          "sport.diving",
          "sport.dog_agility",
          "sport.dog_racing",
          "sport.equestrian",
          "sport.fencing",
          "sport.field_hockey",
          "sport.fitness",
          "sport.floorball",
          "sport.football",
          "sport.free_flying",
          "sport.futsal",
          "sport.gaelic_games",
          "sport.golf",
          "sport.gymnastics",
          "sport.handball",
          "sport.hapkido",
          "sport.hockey",
          "sport.horse_racing",
          "sport.horseshoes",
          "sport.ice_hockey",
          "sport.ice_skating",
          "sport.ice_stock",
          "sport.judo",
          "sport.karate",
          "sport.karting",
          "sport.kickboxing",
          "sport.kitesurfing",
          "sport.korfball",
          "sport.krachtbal",
          "sport.lacrosse",
          "sport.martial_arts",
          "sport.miniature_golf",
          "sport.model_aerodrome",
          "sport.motocross",
          "sport.motor",
          "sport.multi",
          "sport.netball",
          "sport.obstacle_course",
          "sport.orienteering",
          "sport.other",
          "sport.paddle_tennis",
          "sport.padel",
          "sport.parachuting",
          "sport.paragliding",
          "sport.parkour",
          "sport.pelota",
          "sport.pes\xE4pallo",
          "sport.pickleball",
          "sport.pilates",
          "sport.racquet",
          "sport.rc_car",
          "sport.roller_skating",
          "sport.rowing",
          "sport.rugby_league",
          "sport.rugby_union",
          "sport.running",
          "sport.safety_training",
          "sport.sailing",
          "sport.scuba_diving",
          "sport.shooting",
          "sport.shot-put",
          "sport.skateboard",
          "sport.skating",
          "sport.ski_jumping",
          "sport.skiing",
          "sport.snooker",
          "sport.soccer",
          "sport.speedway",
          "sport.squash",
          "sport.sumo",
          "sport.surfing",
          "sport.swimming",
          "sport.table_soccer",
          "sport.table_tennis",
          "sport.taekwondo",
          "sport.tennis",
          "sport.toboggan",
          "sport.ultimate",
          "sport.volleyball",
          "sport.wakeboarding",
          "sport.water_polo",
          "sport.water_ski",
          "sport.weightlifting",
          "sport.wrestling",
          "sport.yoga",
          "telecom.connection_point",
          "telecom.data_center",
          "telecom.distribution_point",
          "telecom.exchange",
          "telecom.other",
          "telecom.service_device",
          "tourism.alpine_hut",
          "tourism.apartment",
          "tourism.aquarium",
          "tourism.artwork",
          "tourism.attraction",
          "tourism.camp_pitch",
          "tourism.camp_site",
          "tourism.caravan_site",
          "tourism.chalet",
          "tourism.gallery",
          "tourism.guest_house",
          "tourism.hostel",
          "tourism.hotel",
          "tourism.information",
          "tourism.motel",
          "tourism.museum",
          "tourism.other",
          "tourism.picnic_site",
          "tourism.theme_park",
          "tourism.viewpoint",
          "tourism.wilderness_hut",
          "tourism.zoo",
          "waterway.boatyard",
          "waterway.canal",
          "waterway.dam",
          "waterway.ditch",
          "waterway.dock",
          "waterway.drain",
          "waterway.drystream",
          "waterway.fairway",
          "waterway.fuel",
          "waterway.lock_gate",
          "waterway.other",
          "waterway.pressurised",
          "waterway.river",
          "waterway.riverbank",
          "waterway.stream",
          "waterway.tidal_channel",
          "waterway.turning_point",
          "waterway.wadi",
          "waterway.water_point",
          "waterway.waterfall",
          "waterway.weir"
        ];
      }
    });
    var require_settings = __commonJS2({
      "node_modules/@rubenrodriguez/georender-style2png/settings.js"(exports2, module22) {
        var features = require_features();
        module22.exports = function() {
          var zoomStart = 1;
          var zoomEnd = 21;
          var zoomCount = zoomEnd - zoomStart + 1;
          var fbHeights = {
            point: 7 * zoomCount,
            line: 8 * zoomCount,
            area: 6 * zoomCount,
            areaborder: 3 * zoomCount,
            spritemeta: 2
          };
          var fbTotalHeight = fbHeights.point + fbHeights.line + fbHeights.area + fbHeights.areaborder;
          var imageWidth = features.length;
          return {
            zoomStart,
            zoomEnd,
            zoomCount,
            fbHeights,
            fbTotalHeight,
            imageWidth
          };
        };
      }
    });
    var require_read2 = __commonJS2({
      "node_modules/@rubenrodriguez/georender-style2png/read.js"(exports2, module22) {
        module22.exports = read;
        function read({ pixels, zoomCount, imageWidth }) {
          return {
            opacity: (key, type, zoom) => opacity(key, type, zoom, { pixels, imageWidth, zoomCount }),
            label: (key, type, zoom) => label(key, type, zoom, { pixels, imageWidth, zoomCount })
          };
        }
        function opacity(key, type, zoom, { pixels, imageWidth, zoomCount }) {
          const y = yOffset(key, zoom, zoomCount);
          const index = (type + y * imageWidth) * 4 + 3;
          return pixels[index];
        }
        function label(key, type, zoom, { pixels, imageWidth, zoomCount }) {
          const y = yOffset(key, zoom, zoomCount);
          const fillColor = [];
          let fillOpacity;
          const strokeColor = [];
          let strokeOpacity;
          let fontFamily;
          let fontSize;
          let priority;
          let constraints;
          let strokeWidth;
          const typeSpecific = {};
          if (key === "point") {
            let prevFkeyLoops = 2;
            const x3 = xOffset(type, prevFkeyLoops, imageWidth);
            const i3 = vec4Index(x3, y, imageWidth);
            typeSpecific.pointSize = pixels[i3 + 0];
            prevFkeyLoops += 1;
            const x4 = xOffset(type, prevFkeyLoops, imageWidth);
            const i4 = vec4Index(x4, y, imageWidth);
            fillColor[0] = pixels[i4 + 0];
            fillColor[1] = pixels[i4 + 1];
            fillColor[2] = pixels[i4 + 2];
            fillOpacity = pixels[i4 + 3];
            prevFkeyLoops += 1;
            const x5 = xOffset(type, prevFkeyLoops, imageWidth);
            const i5 = vec4Index(x5, y, imageWidth);
            strokeColor[0] = pixels[i5 + 0];
            strokeColor[1] = pixels[i5 + 1];
            strokeColor[2] = pixels[i5 + 2];
            strokeOpacity = pixels[i5 + 3];
            prevFkeyLoops += 1;
            const x6 = xOffset(type, prevFkeyLoops, imageWidth);
            const i6 = vec4Index(x6, y, imageWidth);
            fontFamily = pixels[i6 + 0];
            fontSize = pixels[i6 + 1];
            priority = pixels[i6 + 2];
            constraints = pixels[i6 + 3];
            prevFkeyLoops += 1;
            const x7 = xOffset(type, prevFkeyLoops, imageWidth);
            const i7 = vec4Index(x7, y, imageWidth);
            strokeWidth = pixels[i7 + 0];
          } else if (key === "line") {
            let prevFkeyLoops = 4;
            const x5 = xOffset(type, prevFkeyLoops, imageWidth);
            const i5 = vec4Index(x5, y, imageWidth);
            fillColor[0] = pixels[i5 + 0];
            fillColor[1] = pixels[i5 + 1];
            fillColor[2] = pixels[i5 + 2];
            fillOpacity = pixels[i5 + 3];
            prevFkeyLoops += 1;
            const x6 = xOffset(type, prevFkeyLoops, imageWidth);
            const i6 = vec4Index(x6, y, imageWidth);
            strokeColor[0] = pixels[i6 + 0];
            strokeColor[1] = pixels[i6 + 1];
            strokeColor[2] = pixels[i6 + 2];
            strokeOpacity = pixels[i6 + 3];
            prevFkeyLoops += 1;
            const x7 = xOffset(type, prevFkeyLoops, imageWidth);
            const i7 = vec4Index(x7, y, imageWidth);
            fontFamily = pixels[i7 + 0];
            fontSize = pixels[i7 + 1];
            priority = pixels[i7 + 2];
            constraints = pixels[i7 + 3];
            prevFkeyLoops += 1;
            const x8 = xOffset(type, prevFkeyLoops, imageWidth);
            const i8 = vec4Index(x8, y, imageWidth);
            strokeWidth = pixels[i8 + 0];
          } else if (key === "area") {
            let prevFkeyLoops = 1;
            const x2 = xOffset(type, prevFkeyLoops, imageWidth);
            const i2 = vec4Index(x2, y, imageWidth);
            strokeWidth = pixels[i2 + 1];
            prevFkeyLoops += 1;
            const x3 = xOffset(type, prevFkeyLoops, imageWidth);
            const i3 = vec4Index(x3, y, imageWidth);
            fillColor[0] = pixels[i3 + 0];
            fillColor[1] = pixels[i3 + 1];
            fillColor[2] = pixels[i3 + 2];
            fillOpacity = pixels[i3 + 3];
            prevFkeyLoops += 1;
            const x4 = xOffset(type, prevFkeyLoops, imageWidth);
            const i4 = vec4Index(x4, y, imageWidth);
            strokeColor[0] = pixels[i4 + 0];
            strokeColor[1] = pixels[i4 + 1];
            strokeColor[2] = pixels[i4 + 2];
            strokeOpacity = pixels[i4 + 3];
            prevFkeyLoops += 1;
            const x5 = xOffset(type, prevFkeyLoops, imageWidth);
            const i5 = vec4Index(x5, y, imageWidth);
            fontFamily = pixels[i5 + 0];
            fontSize = pixels[i5 + 1];
            priority = pixels[i5 + 2];
            constraints = pixels[i5 + 3];
          }
          return __spreadValues22({
            fillColor,
            fillOpacity,
            strokeColor,
            strokeOpacity,
            fontFamily,
            fontSize,
            priority,
            constraints,
            strokeWidth
          }, typeSpecific);
        }
        function yOffset(key, zoom, zoomCount) {
          switch (key) {
            case "point":
              return zoom * 7;
            case "line":
              return zoomCount * 7 + zoom * 8;
            case "area":
              return zoomCount * 7 + zoomCount * 8 + zoom * 6;
            case "areaBorder":
              return zoomCount * 7 + zoomCount * 8 + zoomCount * 6 + zoom * 3;
            default:
              throw new Error("must define a key : point | line | area | areaBorder");
          }
        }
        function xOffset(type, prevFkeyLoops, imageWidth) {
          return imageWidth * prevFkeyLoops + type;
        }
        function vec4Index(x, y, imageWidth) {
          return (x + y * imageWidth) * 4;
        }
      }
    });
    var __defProp222 = Object.defineProperty;
    var __defProps222 = Object.defineProperties;
    var __getOwnPropDescs222 = Object.getOwnPropertyDescriptors;
    var __getOwnPropSymbols222 = Object.getOwnPropertySymbols;
    var __hasOwnProp222 = Object.prototype.hasOwnProperty;
    var __propIsEnum222 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp222 = (obj, key, value) => key in obj ? __defProp222(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues222 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp222.call(b, prop))
          __defNormalProp222(a, prop, b[prop]);
      if (__getOwnPropSymbols222)
        for (var prop of __getOwnPropSymbols222(b)) {
          if (__propIsEnum222.call(b, prop))
            __defNormalProp222(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps222 = (a, b) => __defProps222(a, __getOwnPropDescs222(b));
    var INF = 1e20;
    var TinySDF = class {
      constructor({
        fontSize = 24,
        buffer = 3,
        radius = 8,
        cutoff = 0.25,
        fontFamily = "sans-serif",
        fontWeight = "normal",
        fontStyle = "normal"
      } = {}) {
        this.buffer = buffer;
        this.cutoff = cutoff;
        this.radius = radius;
        const size = this.size = fontSize + buffer * 4;
        const canvas = this._createCanvas(size);
        const ctx = this.ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = "left";
        ctx.fillStyle = "black";
        this.gridOuter = new Float64Array(size * size);
        this.gridInner = new Float64Array(size * size);
        this.f = new Float64Array(size);
        this.z = new Float64Array(size + 1);
        this.v = new Uint16Array(size);
      }
      _createCanvas(size) {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        return canvas;
      }
      draw(char) {
        const {
          width: glyphAdvance,
          actualBoundingBoxAscent,
          actualBoundingBoxDescent,
          actualBoundingBoxLeft,
          actualBoundingBoxRight
        } = this.ctx.measureText(char);
        const glyphTop = Math.ceil(actualBoundingBoxAscent);
        const glyphLeft = 0;
        const glyphWidth = Math.max(0, Math.min(this.size - this.buffer, Math.ceil(actualBoundingBoxRight - actualBoundingBoxLeft)));
        const glyphHeight = Math.min(this.size - this.buffer, glyphTop + Math.ceil(actualBoundingBoxDescent));
        const width = glyphWidth + 2 * this.buffer;
        const height = glyphHeight + 2 * this.buffer;
        const len = Math.max(width * height, 0);
        const data = new Uint8ClampedArray(len);
        const glyph = { data, width, height, glyphWidth, glyphHeight, glyphTop, glyphLeft, glyphAdvance };
        if (glyphWidth === 0 || glyphHeight === 0)
          return glyph;
        const { ctx, buffer, gridInner, gridOuter } = this;
        ctx.clearRect(buffer, buffer, glyphWidth, glyphHeight);
        ctx.fillText(char, buffer, buffer + glyphTop);
        const imgData = ctx.getImageData(buffer, buffer, glyphWidth, glyphHeight);
        gridOuter.fill(INF, 0, len);
        gridInner.fill(0, 0, len);
        for (let y = 0; y < glyphHeight; y++) {
          for (let x = 0; x < glyphWidth; x++) {
            const a = imgData.data[4 * (y * glyphWidth + x) + 3] / 255;
            if (a === 0)
              continue;
            const j = (y + buffer) * width + x + buffer;
            if (a === 1) {
              gridOuter[j] = 0;
              gridInner[j] = INF;
            } else {
              const d = 0.5 - a;
              gridOuter[j] = d > 0 ? d * d : 0;
              gridInner[j] = d < 0 ? d * d : 0;
            }
          }
        }
        edt(gridOuter, 0, 0, width, height, width, this.f, this.v, this.z);
        edt(gridInner, buffer, buffer, glyphWidth, glyphHeight, width, this.f, this.v, this.z);
        for (let i = 0; i < len; i++) {
          const d = Math.sqrt(gridOuter[i]) - Math.sqrt(gridInner[i]);
          data[i] = Math.round(255 - 255 * (d / this.radius + this.cutoff));
        }
        return glyph;
      }
    };
    function edt(data, x0, y0, width, height, gridSize, f, v, z) {
      for (let x = x0; x < x0 + width; x++)
        edt1d(data, y0 * gridSize + x, gridSize, height, f, v, z);
      for (let y = y0; y < y0 + height; y++)
        edt1d(data, y * gridSize + x0, 1, width, f, v, z);
    }
    function edt1d(grid, offset, stride, length, f, v, z) {
      v[0] = 0;
      z[0] = -INF;
      z[1] = INF;
      f[0] = grid[offset];
      for (let q = 1, k = 0, s = 0; q < length; q++) {
        f[q] = grid[offset + q * stride];
        const q2 = q * q;
        do {
          const r = v[k];
          s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2;
        } while (s <= z[k] && --k > -1);
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = INF;
      }
      for (let q = 0, k = 0; q < length; q++) {
        while (z[k + 1] < q)
          k++;
        const r = v[k];
        const qr = q - r;
        grid[offset + q * stride] = f[r] + qr * qr;
      }
    }
    function potpack(boxes) {
      let area = 0;
      let maxWidth = 0;
      for (const box of boxes) {
        area += box.w * box.h;
        maxWidth = Math.max(maxWidth, box.w);
      }
      boxes.sort((a, b) => b.h - a.h);
      const startWidth = Math.max(Math.ceil(Math.sqrt(area / 0.95)), maxWidth);
      const spaces = [{ x: 0, y: 0, w: startWidth, h: Infinity }];
      let width = 0;
      let height = 0;
      for (const box of boxes) {
        for (let i = spaces.length - 1; i >= 0; i--) {
          const space = spaces[i];
          if (box.w > space.w || box.h > space.h)
            continue;
          box.x = space.x;
          box.y = space.y;
          height = Math.max(height, box.y + box.h);
          width = Math.max(width, box.x + box.w);
          if (box.w === space.w && box.h === space.h) {
            const last = spaces.pop();
            if (i < spaces.length)
              spaces[i] = last;
          } else if (box.h === space.h) {
            space.x += box.w;
            space.w -= box.w;
          } else if (box.w === space.w) {
            space.y += box.h;
            space.h -= box.h;
          } else {
            spaces.push({
              x: space.x + box.w,
              y: space.y,
              w: space.w - box.w,
              h: box.h
            });
            space.y += box.h;
            space.h -= box.h;
          }
          break;
        }
      }
      return {
        w: width,
        // container width
        h: height,
        // container height
        fill: area / (width * height) || 0
        // space utilization
      };
    }
    var Atlas = class {
      constructor(opts) {
        this._tinySdf = new TinySDF(opts);
        this._glyphsMap = /* @__PURE__ */ new Map();
        this._glyphsArray = [];
        this._labels = [];
        this._glyphsSize = 0;
        this._textureProps = null;
        this._glyphBoxes = [];
      }
      clear({ cache = false } = {}) {
        this._labels = [];
        this._glyphsSize = 0;
        this._textureProps = null;
        this._glyphBoxes = [];
        if (cache) {
          this._glyphsMap = /* @__PURE__ */ new Map();
          this._glyphsArray = [];
        }
      }
      _addGlyph(char) {
        this._glyphsSize += 1;
        if (this._glyphsMap.has(char))
          return this._glyphsMap.get(char);
        const glyph = this._tinySdf.draw(char);
        this._glyphsMap.set(char, glyph);
        this._glyphsArray.push({ char, glyph });
        return glyph;
      }
      addLabel(label) {
        const chars = label.text.split("");
        const glyphs = [];
        for (const char of chars) {
          const glyph = this._addGlyph(char);
          glyphs.push(glyph);
        }
        this._labels.push(label);
        return glyphs;
      }
      _pack() {
        const boxes = [];
        for (const { char, glyph } of this._glyphsArray) {
          boxes.push({ w: glyph.width, h: glyph.height, char, glyph });
        }
        const texSize = potpack(boxes);
        const data = new Uint8Array(texSize.w * texSize.h);
        for (const box of boxes) {
          const { glyph } = box;
          for (let y = 0; y < glyph.height; y++) {
            const src = (0 + y) * glyph.width + 0;
            const dst = (box.y + y) * texSize.w + box.x;
            for (let x = 0; x < glyph.width; x++) {
              data[dst + x] = glyph.data[src + x];
            }
          }
        }
        const glyphBoxes = {};
        for (const box of boxes) {
          glyphBoxes[box.char] = box;
        }
        const textureProps = {
          data,
          width: texSize.w,
          height: texSize.h,
          format: "alpha",
          // use 'alpha' because TinySDF outputs a single-channel bitmap
          type: "uint8",
          // ensure this is set correctly for Uint8 arrays
          mag: "linear",
          // use linear filtering for smoother results
          min: "linear"
        };
        this._textureProps = textureProps;
        this._glyphBoxes = glyphBoxes;
        return { textureProps, glyphBoxes };
      }
      measure(label) {
        const { text } = label;
      }
      _prepareInstances({ instances }) {
        function noop() {
        }
        const create = typeof (instances == null ? void 0 : instances.create) === "function" ? instances.create : noop;
        const onGlyph = typeof (instances == null ? void 0 : instances.onGlyph) === "function" ? instances.onGlyph : noop;
        const props = {
          glyphInLabelStringIndex: new Float32Array(this._glyphsSize),
          glyphInLabelStringOffset: new Float32Array(this._glyphsSize * 2),
          glyphTexOffset: new Float32Array(this._glyphsSize * 2),
          glyphTexDim: new Float32Array(this._glyphsSize * 2),
          glyphRasterDim: new Float32Array(this._glyphsSize * 2),
          glyphRasterTop: new Float32Array(this._glyphsSize),
          labelDim: new Float32Array(this._glyphsSize * 2)
        };
        create({ props, size: this._glyphsSize });
        let labelTopMax = -Infinity;
        let labelBottomMin = Infinity;
        let glyphIndex = 0;
        const labels = [];
        for (let li = 0; li < this._labels.length; li++) {
          const label = this._labels[li];
          const chars = label.text.split("");
          const labelOffset = [0, 0];
          let labelWidth = 0;
          let labelRunIndices = [];
          for (let ci = 0; ci < chars.length; ci++) {
            const char = chars[ci];
            const glyphBox = this._glyphBoxes[char];
            props.glyphInLabelStringIndex[glyphIndex * 1] = ci / chars.length;
            props.glyphInLabelStringOffset[glyphIndex * 2 + 0] = labelOffset[0];
            props.glyphInLabelStringOffset[glyphIndex * 2 + 1] = labelOffset[1];
            props.glyphTexOffset[glyphIndex * 2 + 0] = glyphBox.x;
            props.glyphTexOffset[glyphIndex * 2 + 1] = glyphBox.y;
            props.glyphTexDim[glyphIndex * 2 + 0] = glyphBox.w;
            props.glyphTexDim[glyphIndex * 2 + 1] = glyphBox.h;
            props.glyphRasterDim[glyphIndex * 2 + 0] = glyphBox.glyph.glyphWidth;
            props.glyphRasterDim[glyphIndex * 2 + 1] = glyphBox.glyph.glyphHeight;
            props.glyphRasterTop[glyphIndex] = glyphBox.glyph.glyphTop;
            onGlyph({
              props,
              labelIndex: li,
              charIndex: ci,
              glyphIndex
            });
            labelRunIndices.push(glyphIndex);
            glyphIndex += 1;
            labelOffset[0] += glyphBox.glyph.glyphWidth;
            labelWidth += glyphBox.glyph.glyphWidth;
            labelTopMax = Math.max(glyphBox.glyph.glyphTop, labelTopMax);
            labelBottomMin = Math.min(glyphBox.glyph.glyphTop - glyphBox.glyph.glyphHeight, labelBottomMin);
          }
          for (const labelRunIndex of labelRunIndices) {
            props.labelDim[labelRunIndex * 2 + 0] = labelWidth;
          }
          labels.push(__spreadProps222(__spreadValues222({}, label), {
            glyphIndicies: labelRunIndices
          }));
        }
        const labelHeight = labelTopMax - labelBottomMin;
        for (let gi = 0; gi < this._glyphsSize; gi++) {
          props.labelDim[gi * 2 + 1] = labelHeight;
        }
        return {
          texture: this._textureProps,
          glyphs: props,
          baselineOffset: [labelTopMax, labelBottomMin],
          labels
        };
      }
      _prepareObjects() {
        const labels = [];
        const glyphs = [];
        let labelTopMax = -Infinity;
        let labelBottomMin = Infinity;
        let glyphIndex = 0;
        for (const label of this._labels) {
          const chars = label.text.split("");
          const labelOffset = [0, 0];
          let labelWidth = 0;
          const labelRun = [];
          let labelRunIndices = [];
          for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            const glyphBox = this._glyphBoxes[char];
            labelRun.push(__spreadProps222(__spreadValues222({}, label), {
              glyphInLabelStringIndex: i / chars.length,
              glyphInLabelStringOffset: labelOffset.slice(),
              glyphTexOffset: [glyphBox.x, glyphBox.y],
              glyphTexDim: [glyphBox.w, glyphBox.h],
              glyphRasterDim: [glyphBox.glyph.glyphWidth, glyphBox.glyph.glyphHeight],
              glyphRasterTop: glyphBox.glyph.glyphTop,
              labelDim: [0, 0]
            }));
            labelRunIndices.push(glyphIndex);
            glyphIndex += 1;
            labelOffset[0] += glyphBox.glyph.glyphWidth;
            labelWidth += glyphBox.glyph.glyphWidth;
            labelTopMax = Math.max(glyphBox.glyph.glyphTop, labelTopMax);
            labelBottomMin = Math.min(glyphBox.glyph.glyphTop - glyphBox.glyph.glyphHeight, labelBottomMin);
          }
          for (const g of labelRun) {
            g.labelDim[0] = labelWidth;
            glyphs.push(g);
          }
          labels.push(__spreadProps222(__spreadValues222({}, label), {
            glyphIndicies: labelRunIndices
          }));
        }
        const labelHeight = labelTopMax - labelBottomMin;
        for (const g of glyphs) {
          g.labelDim[1] = labelHeight;
        }
        return {
          texture: this._textureProps,
          glyphs,
          baselineOffset: [labelTopMax, labelBottomMin],
          labels
        };
      }
      prepare({ labels, instances = false } = {}) {
        if (labels) {
          for (const label of labels) {
            this.addLabel(label);
          }
        }
        if (!this._textureProps || !this._glyphBoxes) {
          this._pack();
        }
        if (instances)
          return this._prepareInstances({ instances });
        else
          return this._prepareObjects();
      }
    };
    var import_label_placement_engine = __toESM2(require_label_placement_engine(), 1);
    var import_bbox = __toESM2(require_bbox(), 1);
    var import_point = __toESM2(require_point(), 1);
    var import_line = __toESM2(require_line(), 1);
    var import_area = __toESM2(require_area(), 1);
    var import_settings = __toESM2(require_settings(), 1);
    var import_read2 = __toESM2(require_read2(), 1);
    var labelPreset = {
      bbox: import_bbox.default,
      point: import_point.default,
      line: import_line.default,
      area: import_area.default
    };
    var defaultLabelOpts = {
      atlas: [{
        fontSize: 48,
        buffer: 6,
        radius: 16,
        cutoff: 0.25,
        fontFamily: "Arial"
      }],
      labelEngine: {
        types: {
          bbox: labelPreset.bbox(),
          point: labelPreset.point({
            labelMargin: [10, 10],
            pointSize: [10, 10],
            pointMargin: [10, 10],
            pointSeparation: [10, 10]
          }),
          line: labelPreset.line({
            labelMargin: [10, 10],
            lineSize: [10, 10],
            lineMargin: [10, 10],
            lineSeparation: [10, 10],
            sides: ["center"]
          }),
          area: labelPreset.area({
            labelMargin: [10, 10]
          })
        }
      }
    };
    var Label = class {
      constructor(opts = {}) {
        if (Array.isArray(opts.fontFamily)) {
          opts.atlas = opts.fontFamily.map((fontFamily) => {
            return __spreadProps22(__spreadValues22({}, defaultLabelOpts.atlas), {
              fontFamily
            });
          });
        }
        if (!opts.atlas)
          opts.atlas = defaultLabelOpts.atlas;
        this._atlas = opts.atlas.map((atlasOpts) => {
          const opts2 = __spreadValues22(__spreadValues22({}, defaultLabelOpts.atlas[0]), atlasOpts);
          const atlas = new Atlas(opts2);
          return atlas;
        });
        this._labelEngine = (0, import_label_placement_engine.default)(__spreadValues22(__spreadValues22({}, defaultLabelOpts.labelEngine), opts.labelEngine));
        this.style = opts.style;
        this._props = {};
      }
      update(props, map, opts = {}) {
        const style = opts.style || this.style;
        for (const index in this._atlas) {
          this._atlas[index].clear();
        }
        const viewboxWidthLon = map.viewbox[2] - map.viewbox[0];
        const viewboxHeightLat = map.viewbox[3] - map.viewbox[1];
        const measureLabels = [];
        const styleSettings = (0, import_settings.default)();
        this.styleRead = (0, import_read2.default)({ pixels: style.data, zoomCount: styleSettings.zoomCount, imageWidth: styleSettings.imageWidth });
        this._addPoint(map, style, measureLabels, props.pointT);
        this._addPoint(map, style, measureLabels, props.pointP);
        this._addLine(map, style, measureLabels, props.lineT);
        this._addLine(map, style, measureLabels, props.lineP);
        this._addArea(map, style, measureLabels, props.areaT);
        this._addArea(map, style, measureLabels, props.areaP);
        measureLabels.sort((a, b) => {
          var _a, _b;
          const ap = (_a = a.priority) != null ? _a : 1;
          const bp = (_b = b.priority) != null ? _b : 1;
          if (ap > bp)
            return -1;
          if (ap < bp)
            return 1;
          return 0;
        });
        const measureIndexToPreparedIndex = {};
        const prepared = [];
        for (let i = 0; i < this._atlas.length; i++) {
          const labels = [];
          for (let im = 0; im < measureLabels.length; im++) {
            const label = measureLabels[im];
            if (i !== label.fontFamilyIndex)
              continue;
            measureIndexToPreparedIndex[im] = labels.length;
            labels.push(measureLabels[im]);
          }
          prepared.push(this._atlas[i].prepare({ labels }));
        }
        for (let im = 0; im < measureLabels.length; im++) {
          const label = measureLabels[im];
          const preparedLabel = prepared[label.fontFamilyIndex].labels[measureIndexToPreparedIndex[im]];
          switch (label.type) {
            case "point":
              this._measurePoint(map, prepared[label.fontFamilyIndex], preparedLabel);
              break;
            case "line":
              this._measureLine(map, prepared[label.fontFamilyIndex], preparedLabel);
              break;
            case "area":
              this._measureArea(map, prepared[label.fontFamilyIndex], preparedLabel);
              break;
            default:
              throw new Error("implement measure for type=", label.type);
          }
          Object.assign(label, preparedLabel);
        }
        const placedLabels = [{ type: "bbox", bounds: map.viewbox }].concat(measureLabels);
        this._labelEngine.update(placedLabels);
        const ilabels = [];
        const idLabels = {};
        const atlasTypes = /* @__PURE__ */ new Set(["point", "line", "area"]);
        const positionMap = new Uint32Array(this._labelEngine.data.positions.length);
        let pindex = 0;
        for (let i = 1; i < placedLabels.length; i++) {
          const pi = i - 1;
          const l = measureLabels[pi];
          if (!atlasTypes.has(l.type))
            continue;
          idLabels[l.id] = l;
          ilabels[l.id] = i;
          const preparedLabelIndex = measureIndexToPreparedIndex[pi];
          prepared[l.fontFamilyIndex].labels[preparedLabelIndex].isVisible = this._labelEngine.isVisible(i) ? 1 : 0;
          const pstart = this._labelEngine.offsets.positions[i * 2 + 0];
          const pend = this._labelEngine.offsets.positions[i * 2 + 1];
          const psize = pend - pstart;
          for (let k = 0; k < psize; k++) {
            positionMap[(pstart + k) * 2 + 0] = i;
            positionMap[(pstart + k) * 2 + 1] = pindex;
            pindex++;
          }
          const positions = this._labelEngine.data.positions.slice(pstart, pend);
          prepared[l.fontFamilyIndex].labels[preparedLabelIndex].positions = positions;
          for (let k = 0; k < l.glyphIndicies.length; k++) {
            const gi = l.glyphIndicies[k];
            prepared[l.fontFamilyIndex].glyphs[gi].isVisible = prepared[l.fontFamilyIndex].labels[preparedLabelIndex].isVisible;
            prepared[l.fontFamilyIndex].glyphs[gi].positions = positions;
          }
        }
        const csize = {};
        const cindex = {};
        for (let i = 0; i < this._labelEngine.data.cells.length; i++) {
          const c = this._labelEngine.data.cells[i];
          const labelEngineIndex = positionMap[c * 2 + 0];
          const pi = labelEngineIndex - 1;
          if (csize[pi] === void 0)
            csize[pi] = 1;
          else
            csize[pi]++;
        }
        for (let i = 1; i < placedLabels.length; i++) {
          const pi = i - 1;
          const l = measureLabels[pi];
          if (!l)
            continue;
          const preparedLabelIndex = measureIndexToPreparedIndex[pi];
          prepared[l.fontFamilyIndex].labels[preparedLabelIndex].cells = new Uint32Array(csize[pi]);
        }
        for (let i = 0; i < this._labelEngine.data.cells.length; i++) {
          const c = this._labelEngine.data.cells[i];
          const labelEngineIndex = positionMap[c * 2 + 0];
          const placedPositionIndex = positionMap[c * 2 + 1];
          const pi = labelEngineIndex - 1;
          const l = measureLabels[pi];
          if (!l || l.isVisible < 0.5)
            continue;
          if (cindex[pi] === void 0)
            cindex[pi] = 0;
          const preparedLabelIndex = measureIndexToPreparedIndex[pi];
          prepared[l.fontFamilyIndex].labels[preparedLabelIndex].cells[cindex[pi]++] = placedPositionIndex;
        }
        for (let i = 0; i < prepared.length; i++) {
          for (let pi = 0; pi < prepared[i].labels.length; pi++) {
            const l = prepared[i].labels[pi];
            for (let k = 0; k < l.glyphIndicies.length; k++) {
              const gi = l.glyphIndicies[k];
              prepared[i].glyphs[gi].cells = prepared[i].labels[pi].cells;
            }
          }
        }
        return {
          labelEngine: this._labelEngine,
          atlas: prepared
        };
      }
      _addPoint(map, style, labels, p) {
        if (!(p == null ? void 0 : p.positions))
          return;
        const zoom = Math.round(map.getZoom());
        const y = zoom * 7;
        for (let ix = 0; ix < p.id.length; ix++) {
          const id = p.id[ix];
          if (!p.labels.hasOwnProperty(id) || p.labels[id].length === 0)
            continue;
          const text = this._getLabel(p.labels[id]);
          const lon = p.positions[ix * 2 + 0];
          const lat = p.positions[ix * 2 + 1];
          if (map.viewbox[0] > lon || lon > map.viewbox[2])
            continue;
          if (map.viewbox[1] > lat || lat > map.viewbox[3])
            continue;
          const type = p.types[id];
          const {
            fillColor,
            fillOpacity,
            fontFamily,
            fontSize,
            priority,
            strokeWidth,
            strokeColor,
            strokeOpacity,
            pointSize
          } = this.styleRead.label("point", type, zoom);
          labels.push({
            type: "point",
            point: [lon, lat],
            pointSizePx: [pointSize, pointSize],
            id,
            text,
            fontFamilyIndex: fontFamily,
            fontFamily: style.labelFontFamily[fontFamily] || "Arial",
            fontSize,
            priority,
            strokeWidth,
            // TODO
            // add to style2png:start
            letterSpacing: 1,
            labelMarginPx: [10, 10],
            pointMarginPx: [10, 10],
            // add to style2png:end
            zindex: 2e3,
            fillColor: fillColor.map((c) => c / 255).concat([fillOpacity / 100]),
            strokeColor: strokeColor.map((c) => c / 255).concat([strokeOpacity / 100])
          });
        }
      }
      _addLine(map, style, labels, p) {
        if (!(p == null ? void 0 : p.positions))
          return;
        let start = 0;
        let prev = null;
        const zoom = Math.round(map.getZoom());
        for (let ix = 0; ix < p.id.length; ix++) {
          const id = p.id[ix];
          if ((prev === null || prev === id) && ix !== p.id.length - 1) {
            prev = id;
            continue;
          }
          if (!p.labels.hasOwnProperty(id) || p.labels[id].length === 0) {
            start = ix;
            continue;
          }
          const text = this._getLabel(p.labels[prev]);
          prev = id;
          if (text === null)
            continue;
          const end = ix;
          const positions = p.positions.slice(start * 2, end * 2 + 2);
          start = ix;
          const type = p.types[id];
          const {
            fillColor,
            fillOpacity,
            fontFamily,
            fontSize,
            priority,
            strokeWidth,
            strokeColor,
            strokeOpacity
          } = this.styleRead.label("line", type, zoom);
          labels.push({
            type: "line",
            text,
            positions,
            fontFamilyIndex: fontFamily,
            fontFamily: style.labelFontFamily[fontFamily] || "Arial",
            fontSize,
            priority,
            strokeWidth,
            // add to style2png:start
            letterSpacing: 1,
            labelMarginPx: [0, 0],
            labelLineMarginPx: [0, 0],
            // add to style2png:end
            zindex: 2e3,
            // TODO move colors to glsl
            fillColor: fillColor.map((c) => c / 255).concat([fillOpacity / 100]),
            strokeColor: strokeColor.map((c) => c / 255).concat([strokeOpacity / 100])
          });
        }
      }
      _addArea(map, style, labels, p) {
        if (!(p == null ? void 0 : p.positions))
          return;
        let start = 0;
        let prev = null;
        const zoom = Math.round(map.getZoom());
        for (let ix = 0; ix < p.id.length; ix++) {
          const id = p.id[ix];
          if ((prev === null || prev === id) && ix !== p.id.length - 1) {
            prev = id;
            continue;
          }
          if (!p.labels.hasOwnProperty(id) || p.labels[id].length === 0) {
            start = ix;
            prev = id;
            continue;
          }
          const labelId = prev;
          const text = this._getLabel(p.labels[labelId]);
          prev = id;
          if (text === null)
            continue;
          const end = ix;
          const vb = map.viewbox;
          const positions = p.positions.slice(start * 2, end * 2 + 2);
          start = ix;
          const type = p.types[id];
          const {
            fillColor,
            fillOpacity,
            fontFamily,
            fontSize,
            priority,
            strokeWidth,
            strokeColor,
            strokeOpacity
          } = this.styleRead.label("area", type, zoom);
          labels.push({
            type: "area",
            text,
            positions,
            id,
            fontFamilyIndex: fontFamily,
            fontFamily: style.labelFontFamily[fontFamily] || "Arial",
            fontSize,
            priority,
            strokeWidth,
            // add to style2png:start
            letterSpacing: 1,
            labelMarginPx: [0, 0],
            // add to style2png:end
            zindex: 2e3,
            fillColor: fillColor.map((c) => c / 255).concat([fillOpacity / 100]),
            strokeColor: strokeColor.map((c) => c / 255).concat([strokeOpacity / 100])
          });
        }
      }
      _measurePoint(map, prepared, label, { pw = 2, ph = 2 } = {}) {
        const { glyphIndicies } = label;
        const {
          labelDim,
          point,
          fontSize,
          letterSpacing
        } = prepared.glyphs[glyphIndicies[0]];
        const pxToLon = (map.viewbox[2] - map.viewbox[0]) / map._size[0];
        const pxToLat = (map.viewbox[3] - map.viewbox[1]) / map._size[1];
        const aspect = map._size[0] / map._size[1];
        const widthPx = label.widthPx = fontSize * labelDim[0] * letterSpacing / labelDim[1];
        const heightPx = label.heightPx = fontSize;
        const widthLon = (widthPx + pw + 1) * pxToLon;
        const heightLat = (heightPx + ph + 1) * pxToLat / aspect;
        label.labelSize = [widthLon, heightLat];
        label.labelMargin = [
          label.labelMarginPx[0] * pxToLon,
          label.labelMarginPx[1] * pxToLat
        ];
        label.pointSize = [
          label.pointSizePx[0] * pxToLon,
          label.pointSizePx[1] * pxToLat
        ];
        label.pointMargin = [
          label.pointMarginPx[0] * pxToLon,
          label.pointMarginPx[1] * pxToLat
        ];
      }
      _measureLine(map, prepared, label, { pw = 2, ph = 2 } = {}) {
        const { glyphIndicies } = label;
        const {
          labelDim,
          point,
          fontSize,
          letterSpacing
        } = prepared.glyphs[glyphIndicies[0]];
        const pxToLon = (map.viewbox[2] - map.viewbox[0]) / map._size[0];
        const pxToLat = (map.viewbox[3] - map.viewbox[1]) / map._size[1];
        const aspect = map._size[0] / map._size[1];
        const widthPx = label.widthPx = fontSize * labelDim[0] * letterSpacing / labelDim[1];
        const heightPx = label.heightPx = fontSize;
        const widthLon = (widthPx + pw + 1) * pxToLon;
        const heightLat = (heightPx + ph + 1) * pxToLat / aspect;
        label.labelSize = [widthLon, heightLat];
        label.labelMargin = [
          label.labelMarginPx[0] * pxToLon,
          label.labelMarginPx[1] * pxToLat
        ];
        label.labelLineMargin = [
          label.labelLineMarginPx[0] * pxToLon,
          label.labelLineMarginPx[1] * pxToLat
        ];
      }
      _measureArea(map, prepared, label, { pw = 2, ph = 2 } = {}) {
        const { glyphIndicies } = label;
        const {
          labelDim,
          point,
          fontSize,
          letterSpacing
        } = prepared.glyphs[glyphIndicies[0]];
        const pxToLon = (map.viewbox[2] - map.viewbox[0]) / map._size[0];
        const pxToLat = (map.viewbox[3] - map.viewbox[1]) / map._size[1];
        const aspect = map._size[0] / map._size[1];
        const widthPx = label.widthPx = fontSize * labelDim[0] * letterSpacing / labelDim[1];
        const heightPx = label.heightPx = fontSize;
        const widthLon = (widthPx + pw + 1) * pxToLon;
        const heightLat = (heightPx + ph + 1) * pxToLat / aspect;
        label.labelSize = [widthLon, heightLat];
        label.labelMargin = [
          label.labelMarginPx[0] * pxToLon,
          label.labelMarginPx[1] * pxToLat
        ];
      }
      _getLabel(labels) {
        if (!labels)
          return null;
        const best = {
          score: 0,
          text: null
        };
        let btext = null;
        for (let i = 0; i < labels.length; i++) {
          const m = /^([^=]*)=(.*)/.exec(labels[i]);
          if (!m)
            continue;
          const [_, lang, text] = m;
          let score = 0;
          if (lang === "en")
            score += 3;
          else if (lang === "")
            score += 2;
          else if (lang === "alt")
            score += 1;
          if (score > best.score) {
            best.score = score;
            best.text = text;
          }
        }
        return best.text;
      }
    };
    var PrepareText2 = class {
      constructor(opts) {
        this.style = opts.style;
        delete opts.style;
        this.label = null;
        this._labelOpts = __spreadProps2(__spreadValues2({}, defaultLabelOpts), {
          fontFamily: ["Arial"]
        });
        if (typeof opts == "object" && opts !== null) {
          this._labelOpts = __spreadValues2({
            labelEngine: __spreadValues2(__spreadValues2({}, this._labelOpts.labelEngine), opts.labelEngine)
          }, opts);
        }
        this.label = new Label(this._labelOpts);
      }
      update(props, map, opts) {
        const style = opts.style || this.style;
        if (!this.label || !style)
          return {
            labelEngine: null,
            atlas: [],
            glyphs: []
          };
        const labelFontFamily = this._labelOpts.fontFamily;
        const labelProps = this.label.update(props, map, {
          style: __spreadProps2(__spreadValues2({}, style), {
            labelFontFamily
          })
        });
        const baseGamma = 2 * 1.4142;
        const glyphs = labelProps.glyphs = [];
        for (let i = 0; i < labelProps.atlas.length; i++) {
          const glyphProps = [];
          for (let j = 0; j < labelProps.atlas[i].glyphs.length; j++) {
            const glyph = labelProps.atlas[i].glyphs[j];
            const { fontSize, fillColor, strokeColor, strokeWidth } = glyph;
            const gamma = baseGamma / fontSize;
            const stroke = __spreadProps2(__spreadValues2({}, glyph), {
              buffer: 0.75 - strokeWidth / fontSize,
              gamma,
              color: strokeColor
            });
            const fill = __spreadProps2(__spreadValues2({}, glyph), {
              buffer: 0.75,
              gamma,
              color: fillColor
            });
            glyphProps.push(stroke);
            glyphProps.push(fill);
          }
          glyphs.push(glyphProps);
        }
        return labelProps;
      }
    };
  }
});

// prepare.mjs
var prepare_exports = {};
__export(prepare_exports, {
  default: () => Prepare
});
module.exports = __toCommonJS(prepare_exports);
var import_partition_array = __toESM(require_partition(), 1);
var import_read = __toESM(require_read(), 1);
var import_text = __toESM(require_text(), 1);
function Prepare(opts) {
  if (!(this instanceof Prepare))
    return new Prepare(opts);
  this.style = opts.styleTexture;
  this.pixels = opts.stylePixels;
  this.data = opts.decoded;
  this.zoomCount = opts.zoomEnd - opts.zoomStart;
  this.imageSize = opts.imageSize;
  this.label = opts.label && new import_text.PrepareText(__spreadProps(__spreadValues({}, opts.label), { style: this.pixels }));
  this.styleRead = (0, import_read.default)({
    pixels: this.pixels,
    zoomCount: this.zoomCount,
    imageWidth: this.imageSize[0]
  });
  this.indexes = {
    point: new Uint32Array(this.data.point.types.length),
    line: new Uint32Array(this.data.line.types.length),
    area: new Uint32Array(this.data.area.types.length),
    areaBorder: new Uint32Array(this.data.areaBorder.types.length)
  };
  for (var i = 0; i < this.indexes.point.length; i++) {
    this.indexes.point[i] = i;
  }
  for (var i = 0; i < this.indexes.line.length; i++) {
    this.indexes.line[i] = i;
  }
  for (var i = 0; i < this.indexes.area.length; i++) {
    this.indexes.area[i] = i;
  }
  for (var i = 0; i < this.indexes.areaBorder.length; i++) {
    this.indexes.areaBorder[i] = i;
  }
  var pointIndexes = makeIndexes(this.data.point.ids);
  var lineIndexes = makeIndexes(this.data.line.ids);
  var areaIndexes = makeIndexes(this.data.area.ids);
  var areaBorderIndexes = makeIndexes(this.data.areaBorder.ids);
  this.ldistances = [0, 0];
  var ldistx = 0;
  var ldisty = 0;
  var lids = this.data.line.ids;
  var lposits = this.data.line.positions;
  for (var i = 0; i < lids.length - 1; i++) {
    if (lids[i] === lids[i + 1]) {
      ldistx += Math.abs(lposits[2 * i] - lposits[2 * i + 2]);
      ldisty += Math.abs(lposits[2 * i + 1] - lposits[2 * i + 3]);
    } else {
      ldistx = 0;
      ldisty = 0;
    }
    if (isNaN(ldistx) || isNaN(ldisty)) {
      ldistx = 0;
      ldisty = 0;
    }
    this.ldistances.push(ldistx, ldisty);
  }
  this.abdistances = [0, 0];
  var abdistx = 0;
  var abdisty = 0;
  var abids = this.data.areaBorder.ids;
  var abposits = this.data.areaBorder.positions;
  for (var i = 0; i < abids.length - 1; i++) {
    if (abids[i] === abids[i + 1]) {
      abdistx += Math.abs(abposits[2 * i] - abposits[2 * i + 2]);
      abdisty += Math.abs(abposits[2 * i + 1] - abposits[2 * i + 3]);
    } else {
      abdistx = 0;
      abdisty = 0;
    }
    if (isNaN(abdistx) || isNaN(abdisty)) {
      abdistx = 0;
      abdisty = 0;
    }
    this.abdistances.push(abdistx, abdisty);
  }
  this.attributes = {
    point: {},
    line: {},
    area: {},
    areaBorder: {}
  };
  this.props = {
    point: {
      positions: null,
      types: null,
      id: null,
      indexes: pointIndexes.indexes,
      indexToId: pointIndexes.indexToId,
      idToIndex: pointIndexes.idToIndex,
      labels: this.data.point.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    pointT: {
      positions: null,
      types: null,
      id: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.point.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    pointP: {
      positions: null,
      types: null,
      id: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.point.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    line: {
      positions: null,
      types: null,
      id: null,
      normals: this.data.line.normals,
      distances: this.ldistances,
      indexes: lineIndexes.indexes,
      indexToId: lineIndexes.indexToId,
      idToIndex: lineIndexes.idToIndex,
      labels: this.data.line.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    lineT: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.line.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    lineP: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.line.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    area: {
      positions: this.data.area.positions,
      types: this.data.area.types,
      indexes: areaIndexes.indexes,
      id: this.data.area.ids,
      indexToId: areaIndexes.indexToId,
      idToIndex: areaIndexes.idToIndex,
      cells: this.data.area.cells,
      labels: this.data.area.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    areaT: {
      positions: this.data.area.positions,
      types: this.data.area.types,
      indexes: areaIndexes.indexes,
      id: this.data.area.ids,
      indexToId: areaIndexes.indexToId,
      idToIndex: areaIndexes.idToIndex,
      cells: null,
      labels: this.data.area.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    areaP: {
      positions: this.data.area.positions,
      types: this.data.area.types,
      indexes: areaIndexes.indexes,
      id: this.data.area.ids,
      indexToId: areaIndexes.indexToId,
      idToIndex: areaIndexes.idToIndex,
      cells: null,
      labels: this.data.area.labels,
      style: this.style,
      imageSize: this.imageSize
    },
    areaBorder: {
      positions: null,
      types: null,
      id: null,
      normals: this.data.areaBorder.normals,
      distances: this.abdistances,
      //indexes: areaBorderIndexes.indexes,
      //indexToId: areaBorderIndexes.indexToId,
      //idToIndex: areaBorderIndexes.idToIndex,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      style: this.style,
      imageSize: this.imageSize
    },
    areaBorderT: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      style: this.style,
      imageSize: this.imageSize
    },
    areaBorderP: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      style: this.style,
      imageSize: this.imageSize
    },
    label: {
      labelEngine: null,
      atlas: [],
      glyphs: []
    }
  };
  if (typeof opts.extend === "function")
    opts.extend(this.attributes, this.props);
}
Prepare.prototype._splitSort = function(key, zoom) {
  var self = this;
  var tkey = key + "T";
  var pkey = key + "P";
  var splitT = (0, import_partition_array.default)(this.indexes[key], function(i2) {
    var opacity = self.styleRead.opacity(key, self.data[key].types[i2], zoom);
    return opacity > 100;
  });
  this.indexes[tkey] = this.indexes[key].subarray(0, splitT);
  this.indexes[pkey] = this.indexes[key].subarray(splitT);
  this.indexes[tkey].sort(function(a, b) {
    var xa = self.data[key].types[a];
    var xb = self.data[key].types[b];
    var zindexa = self.styleRead.zindex(key, xa, zoom);
    var zindexb = self.styleRead.zindex(key, xb, zoom);
    return zindexa - zindexb;
  });
  self.props[tkey].id = [];
  self.props[tkey].types = [];
  self.props[tkey].positions = [];
  self.props[pkey].id = [];
  self.props[pkey].types = [];
  self.props[pkey].positions = [];
  if (self.props[key].normals) {
    self.props[tkey].normals = [];
    self.props[pkey].normals = [];
  }
  if (self.props[key].distances) {
    self.props[tkey].distances = [];
    self.props[pkey].distances = [];
  }
  const spreadExtendedForKey = categorizeAttributes(this.attributes[key]);
  const spreadExtendedTkey = spreadExtendedForKey(tkey);
  for (var i = 0; i < self.indexes[tkey].length; i++) {
    self.props[tkey].id.push(self.data[key].ids[self.indexes[tkey][i]]);
    self.props[tkey].types.push(self.data[key].types[self.indexes[tkey][i]]);
    self.props[tkey].positions.push(self.data[key].positions[self.indexes[tkey][i] * 2]);
    self.props[tkey].positions.push(self.data[key].positions[self.indexes[tkey][i] * 2 + 1]);
    if (self.props[key].normals) {
      self.props[tkey].normals.push(self.data[key].normals[self.indexes[tkey][i] * 2]);
      self.props[tkey].normals.push(self.data[key].normals[self.indexes[tkey][i] * 2 + 1]);
    }
    if (self.props[key].distances) {
      if (key === "line") {
        self.props[tkey].distances.push(this.ldistances[self.indexes[tkey][i] * 2]);
        self.props[tkey].distances.push(this.ldistances[self.indexes[tkey][i] * 2 + 1]);
      } else if (key === "areaBorder") {
        self.props[tkey].distances.push(this.abdistances[self.indexes[tkey][i] * 2]);
        self.props[tkey].distances.push(this.abdistances[self.indexes[tkey][i] * 2 + 1]);
      }
    }
    spreadExtendedTkey(i);
  }
  const spreadExtendedPkey = spreadExtendedForKey(pkey);
  for (var i = 0; i < self.indexes[pkey].length; i++) {
    self.props[pkey].id.push(self.data[key].ids[self.indexes[pkey][i]]);
    self.props[pkey].types.push(self.data[key].types[self.indexes[pkey][i]]);
    self.props[pkey].positions.push(self.data[key].positions[self.indexes[pkey][i] * 2]);
    self.props[pkey].positions.push(self.data[key].positions[self.indexes[pkey][i] * 2 + 1]);
    if (self.props[pkey].normals) {
      self.props[pkey].normals.push(self.data[key].normals[self.indexes[pkey][i] * 2]);
      self.props[pkey].normals.push(self.data[key].normals[self.indexes[pkey][i] * 2 + 1]);
    }
    if (self.props[key].distances) {
      if (key === "line") {
        self.props[pkey].distances.push(this.ldistances[self.indexes[pkey][i] * 2]);
        self.props[pkey].distances.push(this.ldistances[self.indexes[pkey][i] * 2 + 1]);
      } else if (key === "areaBorder") {
        self.props[pkey].distances.push(this.abdistances[self.indexes[pkey][i] * 2]);
        self.props[pkey].distances.push(this.abdistances[self.indexes[pkey][i] * 2 + 1]);
      }
    }
    spreadExtendedPkey(i);
  }
  var tindexes = makeIndexes(self.props[tkey].id);
  var pindexes = makeIndexes(self.props[pkey].id);
  self.props[tkey].indexes = tindexes.indexes;
  self.props[tkey].indexToId = tindexes.indexToId;
  self.props[tkey].idToIndex = tindexes.idToIndex;
  self.props[pkey].indexes = pindexes.indexes;
  self.props[pkey].indexToId = pindexes.indexToId;
  self.props[pkey].idToIndex = pindexes.idToIndex;
  function categorizeAttributes(attr) {
    const len1attr = [];
    const len2attr = [];
    const len3attr = [];
    const len4attr = [];
    for (const attrKey in attr) {
      self.props[tkey][attrKey] = [];
      self.props[pkey][attrKey] = [];
      const len = attr[attrKey];
      if (len === 1)
        len1attr.push(attrKey);
      if (len === 2)
        len2attr.push(attrKey);
      if (len === 3)
        len3attr.push(attrKey);
      if (len === 4)
        len4attr.push(attrKey);
    }
    const len1spread = (ckey) => (i2) => {
      for (const attrKey of len1attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2]]);
      }
    };
    const len2spread = (ckey) => (i2) => {
      for (const attrKey of len2attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 2]);
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 2 + 1]);
      }
    };
    const len3spread = (ckey) => (i2) => {
      for (const attrKey of len3attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 3]);
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 3 + 1]);
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 3 + 2]);
      }
    };
    const len4spread = (ckey) => (i2) => {
      for (const attrKey of len4attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 4]);
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 4 + 1]);
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 4 + 2]);
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i2] * 4 + 3]);
      }
    };
    return (ckey) => {
      const spreaders = [];
      if (len1attr.length > 0)
        spreaders.push(len1spread(ckey));
      if (len2attr.length > 0)
        spreaders.push(len2spread(ckey));
      if (len3attr.length > 0)
        spreaders.push(len3spread(ckey));
      if (len4attr.length > 0)
        spreaders.push(len4spread(ckey));
      return (i2) => {
        for (const spreader of spreaders) {
          spreader(i2);
        }
      };
    };
  }
};
Prepare.prototype._splitSortArea = function(key, zoom) {
  var self = this;
  var tkey = key + "T";
  var pkey = key + "P";
  self.props[tkey].cells = [];
  self.props[pkey].cells = [];
  var cells = self.data[key].cells;
  for (var i = 0; i < cells.length; i += 3) {
    var type = self.data[key].types[cells[i]];
    var opacity = self.styleRead.opacity(key, type, zoom);
    if (opacity < 100) {
      self.props[tkey].cells.push(cells[i], cells[i + 1], cells[i + 2]);
    } else {
      self.props[pkey].cells.push(cells[i], cells[i + 1], cells[i + 2]);
    }
  }
};
Prepare.prototype.update = function(map) {
  const zoom = Math.round(map.getZoom());
  var self = this;
  this._splitSort("point", zoom);
  this._splitSort("line", zoom);
  this._splitSort("areaBorder", zoom);
  this._splitSortArea("area", zoom);
  if (this.label) {
    this.props.label = this.label.update(this.props, map, { style: this.pixels });
  }
  return this.props;
};
function makeIndexes(ids) {
  var indexToId = {};
  var idToIndex = {};
  var indexes = new Float32Array(ids.length);
  var x = 1;
  ids.forEach(function(id) {
    if (!idToIndex.hasOwnProperty(id)) {
      idToIndex[id] = x;
      indexToId[x] = id;
      x++;
    }
  });
  ids.forEach(function(id, i) {
    indexes[i] = idToIndex[id];
  });
  return {
    indexes,
    idToIndex,
    indexToId
  };
}
