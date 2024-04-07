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

// ../qbzf/node_modules/line-segment-intersect-2d/index.js
var require_line_segment_intersect_2d = __commonJS({
  "../qbzf/node_modules/line-segment-intersect-2d/index.js"(exports, module) {
    module.exports = function lineIntersection(out, a0, a1, b0, b1) {
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

// ../qbzf/node_modules/gl-vec2/set.js
var require_set = __commonJS({
  "../qbzf/node_modules/gl-vec2/set.js"(exports, module) {
    module.exports = set;
    function set(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    }
  }
});

// ../qbzf/node_modules/gl-vec2/distance.js
var require_distance = __commonJS({
  "../qbzf/node_modules/gl-vec2/distance.js"(exports, module) {
    module.exports = distance;
    function distance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return Math.sqrt(x * x + y * y);
    }
  }
});

// ../qbzf/node_modules/varint/encode.js
var require_encode = __commonJS({
  "../qbzf/node_modules/varint/encode.js"(exports, module) {
    module.exports = encode;
    var MSB = 128;
    var REST = 127;
    var MSBALL = ~REST;
    var INT = Math.pow(2, 31);
    function encode(num, out, offset) {
      if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
        encode.bytes = 0;
        throw new RangeError("Could not encode varint");
      }
      out = out || [];
      offset = offset || 0;
      var oldOffset = offset;
      while (num >= INT) {
        out[offset++] = num & 255 | MSB;
        num /= 128;
      }
      while (num & MSBALL) {
        out[offset++] = num & 255 | MSB;
        num >>>= 7;
      }
      out[offset] = num | 0;
      encode.bytes = offset - oldOffset + 1;
      return out;
    }
  }
});

// ../qbzf/node_modules/varint/decode.js
var require_decode = __commonJS({
  "../qbzf/node_modules/varint/decode.js"(exports, module) {
    module.exports = read;
    var MSB = 128;
    var REST = 127;
    function read(buf, offset) {
      var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
      do {
        if (counter >= l || shift > 49) {
          read.bytes = 0;
          throw new RangeError("Could not decode varint");
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST) << shift : (b & REST) * Math.pow(2, shift);
        shift += 7;
      } while (b >= MSB);
      read.bytes = counter - offset;
      return res;
    }
  }
});

// ../qbzf/node_modules/varint/length.js
var require_length = __commonJS({
  "../qbzf/node_modules/varint/length.js"(exports, module) {
    var N1 = Math.pow(2, 7);
    var N2 = Math.pow(2, 14);
    var N3 = Math.pow(2, 21);
    var N4 = Math.pow(2, 28);
    var N5 = Math.pow(2, 35);
    var N6 = Math.pow(2, 42);
    var N7 = Math.pow(2, 49);
    var N8 = Math.pow(2, 56);
    var N9 = Math.pow(2, 63);
    module.exports = function(value) {
      return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
    };
  }
});

// ../qbzf/node_modules/varint/index.js
var require_varint = __commonJS({
  "../qbzf/node_modules/varint/index.js"(exports, module) {
    module.exports = {
      encode: require_encode(),
      decode: require_decode(),
      encodingLength: require_length()
    };
  }
});

// ../qbzf/lib/magic.js
var require_magic = __commonJS({
  "../qbzf/lib/magic.js"(exports, module) {
    module.exports = [113, 98, 122, 102, 49];
  }
});

// ../qbzf/lib/bz.js
var require_bz = __commonJS({
  "../qbzf/lib/bz.js"(exports, module) {
    module.exports = function bz(a, b, c, t) {
      var t1 = 1 - t;
      return t1 * t1 * a + 2 * t1 * t * b + t * t * c;
    };
  }
});

// ../qbzf/lib/bzli.js
var require_bzli = __commonJS({
  "../qbzf/lib/bzli.js"(exports, module) {
    var bz = require_bz();
    var lb = [0, 0, 0, 0];
    module.exports = function bzli(out, c, l, epsilon) {
      if (epsilon === void 0)
        epsilon = 1e-8;
      var c0 = c[0], c1 = c[1], c2 = c[2], c3 = c[3], c4 = c[4], c5 = c[5];
      var l0 = l[0], l1 = l[1], l2 = l[2], l3 = l[3];
      lb[0] = Math.min(l0, l2);
      lb[1] = Math.min(l1, l3);
      lb[2] = Math.max(l0, l2);
      lb[3] = Math.max(l1, l3);
      var A = l3 - l1;
      var B = l0 - l2;
      var C = l1 * l2 - l0 * l3;
      var qa = A * c0 - 2 * A * c2 + A * c4 + B * c1 - 2 * B * c3 + B * c5;
      var qb = -2 * A * c0 + 2 * A * c2 - 2 * B * c1 + 2 * B * c3;
      var qc = A * c0 + B * c1 + C;
      if (Math.abs(qa) < epsilon)
        return 0;
      var qs = qb * qb - 4 * qa * qc;
      if (qs < 0)
        return 0;
      var qsq = Math.sqrt(qs);
      var t0 = (-qb + qsq) / (2 * qa);
      var t1 = (-qb - qsq) / (2 * qa);
      var n = 0;
      if (0 <= t0 && t0 <= 1) {
        var x0 = bz(c0, c2, c4, t0);
        var y0 = bz(c1, c3, c5, t0);
        if (checkLine(x0, y0, lb, epsilon)) {
          out[n * 2 + 0] = x0;
          out[n * 2 + 1] = y0;
          n++;
        }
      }
      if (0 <= t1 && t1 <= 1) {
        var x1 = bz(c0, c2, c4, t1);
        var y1 = bz(c1, c3, c5, t1);
        if (checkLine(x1, y1, lb, epsilon)) {
          out[n * 2 + 0] = x1;
          out[n * 2 + 1] = y1;
          n++;
        }
      }
      return n;
    };
    function checkLine(x, y, lb2, epsilon) {
      return lb2[0] - epsilon <= x && x <= lb2[2] + epsilon && lb2[1] - epsilon <= y && y <= lb2[3] + epsilon;
    }
  }
});

// ../qbzf/lib/bzri.js
var require_bzri = __commonJS({
  "../qbzf/lib/bzri.js"(exports, module) {
    var bzli = require_bzli();
    var l0 = [0, 0, 0, 0];
    var l1 = [0, 0, 0, 0];
    module.exports = bzRectIntersect;
    function bzRectIntersect(rect, c, dx, dy, padding2) {
      if (padding2 === void 0)
        padding2 = 1e-8;
      var r0 = rect[0] - dx, r1 = rect[1] - dy, r2 = rect[2] - dx, r3 = rect[3] - dy;
      if (r0 <= c[0] && c[0] <= r2 && r1 <= c[1] && c[1] <= r3)
        return true;
      if (r0 <= c[4] && c[4] <= r2 && r1 <= c[5] && c[5] <= r3)
        return true;
      vec4set(l0, r0, r1, r0, r3);
      var n = bzli(l1, c, l0);
      if (n > 0)
        return true;
      vec4set(l0, r2, r1, r2, r3);
      var n = bzli(l1, c, l0);
      if (n > 0)
        return true;
      vec4set(l0, r0, r1, r2, r1);
      var n = bzli(l1, c, l0);
      if (n > 0)
        return true;
      vec4set(l0, r0, r3, r2, r3);
      var n = bzli(l1, c, l0);
      if (n > 0)
        return true;
      return false;
    }
    function vec4set(out, a, b, c, d) {
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      return out;
    }
  }
});

// ../qbzf/lib/mivxa.js
var require_mivxa = __commonJS({
  "../qbzf/lib/mivxa.js"(exports, module) {
    module.exports = function mivxa(out, pts, range, epsilon) {
      if (epsilon === void 0)
        epsilon = 1e-8;
      pts.sort(cmp);
      var j = 0;
      for (var i = 0; i < pts.length; i += 2) {
        var x0 = pts[i + 0], x1 = pts[i + 1];
        if (x1 <= range[0])
          continue;
        if (x0 >= range[1])
          break;
        if (x0 < range[0] && range[0] < x1) {
          x0 = range[0];
        }
        if (x0 < range[1] && range[1] < x1) {
          x1 = range[1];
        }
        if (j > 0 && Math.abs(out[j - 1] - x0) < epsilon) {
          out[j - 1] = x1;
        } else if (Math.abs(x0 - x1) > 0) {
          out[j++] = x0;
          out[j++] = x1;
        }
      }
      out.length = j;
      return out;
    };
    function cmp(a, b) {
      return a < b ? -1 : 1;
    }
  }
});

// ../qbzf/lib/raycast.js
var require_raycast = __commonJS({
  "../qbzf/lib/raycast.js"(exports, module) {
    module.exports = function raycast(out, x, b0, b1, b2, epsilon) {
      if (epsilon === void 0)
        epsilon = 1e-8;
      var a = b0 - 2 * b1 + b2;
      var b = -2 * (b0 - b1);
      var c = b0 - x;
      var s = b * b - 4 * a * c;
      if (s < 0 || Math.abs(a) < epsilon)
        return 0;
      var sq = Math.sqrt(s);
      var pt = (-b + sq) / (2 * a);
      var nt = (-b - sq) / (2 * a);
      var n = 0;
      if (0 <= pt && pt <= 1)
        out[n++] = pt;
      if (0 <= nt && nt <= 1)
        out[n++] = nt;
      return n;
    };
  }
});

// ../qbzf/node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "../qbzf/node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// ../qbzf/index.js
var require_qbzf = __commonJS({
  "../qbzf/index.js"(exports, module) {
    var lsi = require_line_segment_intersect_2d();
    var vec2set = require_set();
    var vec2dist = require_distance();
    var varint = require_varint();
    var magic = require_magic();
    var bzri = require_bzri();
    var mivxa = require_mivxa();
    var raycast = require_raycast();
    var bz = require_bz();
    var bzli = require_bzli();
    var ieee754 = require_ieee754();
    var rect0 = [0, 0, 0, 0];
    var rect1 = [0, 0, 0, 0];
    var v0 = [0, 0];
    var v1 = [0, 0];
    var v2 = [0, 0];
    var v3 = [0, 0];
    var v4 = [0, 0];
    var l0 = [0, 0, 0, 0];
    var l1 = [0, 0, 0, 0];
    var origin = [0, 0];
    var padding0 = [0, 0, 0, 0];
    var defaultPadding = [0, 0, 0, 0];
    var defaultOffset = [0, 0];
    module.exports = QBZF2;
    function QBZF2(src, opts) {
      if (!(this instanceof QBZF2))
        return new QBZF2(src, opts);
      if (!opts)
        opts = {};
      this._glyphs = /* @__PURE__ */ new Map();
      this._matches = /* @__PURE__ */ new Map();
      this._iv = /* @__PURE__ */ new Map();
      this._cells = /* @__PURE__ */ new Map();
      this._index = 0;
      this._density = opts.density !== void 0 ? opts.density : [200, 200];
      this.unitsPerEm = 0;
      this._epsilon = opts.epsilon !== void 0 ? opts.epsilon : 1e-8;
      this._parse(src);
      this.curves = this._buildCurves();
    }
    QBZF2.prototype._parse = function(src) {
      var offset = 0;
      for (; offset < src.length && src[offset] !== 10; offset++)
        ;
      if (!vcmp(src, 0, offset, magic, 0, magic.length)) {
        throw new Error("magic number not found. not a valid qbzf1 file.");
      }
      offset++;
      this.unitsPerEm = varint.decode(src, offset);
      offset += varint.decode.bytes;
      while (offset < src.length) {
        var xndigits = varint.decode(src, offset);
        var ndigits = xndigits >> 1;
        offset += varint.decode.bytes;
        var u0 = varint.decode(src, offset);
        offset += varint.decode.bytes;
        var u1 = -1;
        var key = String(u0);
        if (xndigits % 2 === 1) {
          u1 = varint.decode(src, offset);
          offset += varint.decode.bytes;
          key += "," + String(u1);
        }
        var advanceWidth = decode(src, offset);
        offset += varint.decode.bytes;
        var leftSideBearing = decode(src, offset);
        offset += varint.decode.bytes;
        var xmin = decode(src, offset);
        offset += varint.decode.bytes;
        var ymin = decode(src, offset);
        offset += varint.decode.bytes;
        var xmax = decode(src, offset);
        offset += varint.decode.bytes;
        var ymax = decode(src, offset);
        offset += varint.decode.bytes;
        var px = 0, py = 0;
        var curves = [], indexes = [];
        for (var n = 0; n < ndigits; n++) {
          var cx = decode(src, offset);
          offset += varint.decode.bytes;
          var cxr = (cx % 3 + 3) % 3;
          cx = Math.floor(cx / 3);
          var cy = decode(src, offset);
          offset += varint.decode.bytes;
          if (cxr === 0) {
            px += cx;
            py += cy;
          } else if (cxr === 1) {
            var c0 = px, c1 = py, c2 = cx + px, c3 = cy + py;
            if (Math.abs(c0 - c2) < this._epsilon && Math.abs(c1 - c3) < this._epsilon)
              continue;
            curves.push([c0, c1, c2, c3]);
            indexes.push(this._index++);
            px += cx;
            py += cy;
          } else if (cxr === 2) {
            var nx = decode(src, offset);
            offset += varint.decode.bytes;
            var ny = decode(src, offset);
            offset += varint.decode.bytes;
            curves.push([px, py, cx + px, cy + py, nx + px, ny + py]);
            indexes.push(this._index++);
            px += nx;
            py += ny;
          }
        }
        this._glyphs.set(key, {
          curves,
          indexes,
          leftSideBearing,
          advanceWidth,
          bbox: [xmin, ymin, xmax, ymax]
        });
      }
    };
    QBZF2.prototype._buildCurves = function() {
      var w = Math.max(90, Math.floor(Math.sqrt(this._index) / 3) * 3);
      var h = Math.max(1, Math.ceil(this._index / w));
      var data = new Uint8Array(w * h * 4);
      for (var [key, g] of this._glyphs) {
        for (var i = 0; i < g.curves.length; i++) {
          var c = g.curves[i];
          var offset = g.indexes[i] * 3 * 4;
          if (c.length === 4) {
            writeI16(data, offset + 0, c[0] - g.bbox[0]);
            writeI16(data, offset + 2, c[1] - g.bbox[1]);
            writeI16(data, offset + 4, c[0] - g.bbox[0]);
            writeI16(data, offset + 6, c[1] - g.bbox[1]);
            writeI16(data, offset + 8, c[2] - g.bbox[0]);
            writeI16(data, offset + 10, c[3] - g.bbox[1]);
          } else if (c.length === 6) {
            writeI16(data, offset + 0, c[0] - g.bbox[0]);
            writeI16(data, offset + 2, c[1] - g.bbox[1]);
            writeI16(data, offset + 4, c[2] - g.bbox[0]);
            writeI16(data, offset + 6, c[3] - g.bbox[1]);
            writeI16(data, offset + 8, c[4] - g.bbox[0]);
            writeI16(data, offset + 10, c[5] - g.bbox[1]);
          }
        }
      }
      return { data, width: w, height: h, size: [w, h] };
    };
    QBZF2.prototype.measure = function(opts) {
      var density = opts.density !== void 0 ? opts.density : this._density;
      var padding2 = opts.padding !== void 0 ? opts.padding : defaultPadding;
      var strokeWidth = opts.strokeWidth !== void 0 ? opts.strokeWidth : 0;
      var xoffset = opts.offset !== void 0 ? opts.offset : defaultOffset;
      if (padding2.length === 2) {
        padding2 = vec4set(padding0, padding2[0], padding2[1], padding2[0], padding2[1]);
      } else {
        padding2 = vec4set(padding0, padding2[0], padding2[1], padding2[2], padding2[3]);
      }
      padding2[0] += strokeWidth;
      padding2[1] += strokeWidth;
      padding2[2] += strokeWidth;
      padding2[3] += strokeWidth;
      var units = [0, 0];
      var bbox = [Infinity, Infinity, -Infinity, -Infinity];
      var text = opts.text !== void 0 ? opts.text : "";
      for (var i = 0; i < text.length; i++) {
        var code = text.charCodeAt(i);
        var g = this._glyphs.get(String(code));
        bbox[0] = Math.min(bbox[0], units[0] + g.bbox[0]);
        bbox[2] = Math.max(bbox[2], units[0] + g.bbox[2]);
        units[0] += g.advanceWidth;
        bbox[2] = Math.max(bbox[2], units[0]);
        bbox[1] = Math.min(bbox[1], g.bbox[1]);
        bbox[3] = Math.max(bbox[3], g.bbox[3]);
      }
      units[0] = Math.max(units[0], bbox[2]) - bbox[0] + padding2[0] + padding2[2] + 2;
      units[1] = bbox[3] - bbox[1] + padding2[1] + padding2[3] + 2;
      var grid = [Math.ceil(units[0] / density[0]), Math.ceil(units[1] / density[1])];
      var offset = [xoffset[0] + padding2[0] - bbox[0] + 1, xoffset[1] + padding2[1] - bbox[1] + 1];
      return Object.assign({}, opts, { units, grid, offset, bbox });
    };
    QBZF2.prototype.write = function(opts) {
      opts = this.measure(opts);
      var units = opts.units;
      var grid = opts.grid;
      var strokeWidth = opts.strokeWidth !== void 0 ? opts.strokeWidth : 0;
      var text = opts.text;
      this._matches.clear();
      var offset = opts.offset || origin;
      var x = offset[0];
      var y = offset[1];
      var cursor = { units, grid, strokeWidth, n: 0 };
      for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        x += this._stamp(c, x, y, cursor);
      }
      var n = cursor.n;
      var q = n * 3 + 2;
      var l = grid[0] * grid[1] * q;
      var width = Math.ceil(Math.sqrt(l) / q) * q;
      var height = Math.ceil(l / width);
      var length = width * height * 4;
      var data = opts.data !== void 0 ? opts.data : new Uint8Array(length);
      if (data.length < length) {
        throw new Error(`insufficient supplied data in qbzf.write. required: ${length} received: ${data.length}`);
      }
      if (data.length > length) {
        data = data.subarray(0, length);
      }
      for (var gy = 0; gy < grid[1]; gy++) {
        for (var gx = 0; gx < grid[0]; gx++) {
          var gk = gx + gy * grid[0];
          var cells = this._cells.get(gk);
          if (cells !== void 0) {
            for (var i = 0; i < cells.length; i++) {
              var offset = (gk * (n * 3 + 2) + 2 + i * 3) * 4;
              writeU24(data, offset + 0, cells[i][0]);
              writeF32(data, offset + 4, cells[i][1]);
              writeF32(data, offset + 8, cells[i][2]);
            }
          }
          var iv = this._iv.get(gk);
          if (iv !== void 0) {
            var offset = (gx + gy * grid[0]) * (n * 3 + 2) * 4;
            writeF32(data, offset + 0, iv[0]);
            writeF32(data, offset + 4, iv[1]);
          }
        }
      }
      this._cells.clear();
      this._iv.clear();
      return {
        data,
        width,
        height,
        dimension: [width, height],
        units,
        grid,
        n,
        strokeWidth
      };
    };
    QBZF2.prototype._stamp = function(code, sx, sy, cursor) {
      var units = cursor.units, grid = cursor.grid, cells = cursor.cells;
      var g = this._glyphs.get(String(code));
      if (g === void 0)
        throw new Error(`todo: glyph or hook for code not found: ${code}`);
      var px = sx + g.bbox[0], py = sy + g.bbox[1];
      var swx = cursor.strokeWidth, swy = cursor.strokeWidth;
      var xstart = Math.max(0, Math.floor((px + g.bbox[0] - g.leftSideBearing - swx) / units[0] * grid[0]));
      var xend = Math.ceil((px + g.bbox[2] - g.leftSideBearing + swx) / units[0] * grid[0]);
      var ystart = Math.max(0, Math.floor((sy + g.bbox[1] - swy) / units[1] * grid[1]));
      var yend = Math.min(grid[1], Math.ceil((sy + g.bbox[3] + swy) / units[1] * grid[1]));
      var sg0 = units[0] / grid[0];
      var sg1 = units[1] / grid[1];
      for (var gy = ystart; gy < yend; gy++) {
        for (var gx = xstart; gx < xend; gx++) {
          rect0[0] = gx / grid[0] * units[0];
          rect0[1] = gy / grid[1] * units[1];
          rect0[2] = (gx + 1) / grid[0] * units[0];
          rect0[3] = (gy + 1) / grid[1] * units[1];
          var r0 = rect0[0] - px + g.bbox[0];
          var r1 = rect0[1] - py + g.bbox[1];
          var r2 = rect0[2] - px + g.bbox[0];
          var r3 = rect0[3] - py + g.bbox[1];
          var gk = gx + gy * grid[0];
          var m = this._matches.get(gk) || 0;
          var urc = 0;
          for (var i = 0; i < g.curves.length; i++) {
            var c = g.curves[i];
            urc += this._countRaycast(r2, r3, c, units[0] + 1e3);
          }
          var rc = [];
          for (var i = 0; i < g.curves.length; i++) {
            var c = g.curves[i];
            if (c.length === 4) {
              vec2set(v1, c[0], c[1]);
              vec2set(v2, c[2], c[3]);
              vec2set(v3, r2, r1);
              vec2set(v4, r2, r3);
              if (Math.abs(r2 - c[0]) < this._epsilon || Math.abs(r2 - c[2]) < this._epsilon) {
                v3[0] += this._epsilon;
                v4[0] += this._epsilon;
              }
              if (lsi(v0, v1, v2, v3, v4)) {
                rc.push(v0[1] + py - g.bbox[1]);
              }
            } else {
              vec4set(l0, r2, r1, r2, r3);
              if (Math.abs(r2 - c[0]) < this._epsilon || Math.abs(r2 - c[4]) < this._epsilon) {
                l0[0] += this._epsilon;
                l0[2] += this._epsilon;
              }
              var ln = bzli(l1, c, l0, 1e-8);
              for (var j = 0; j < ln; j++) {
                rc.push(l1[j * 2 + 1] + py - g.bbox[1]);
              }
            }
          }
          rc.sort(cmp);
          var iv = this._iv.get(gk) || [];
          var q = 0;
          if (urc % 2 === 0 && rc.length === 0) {
            q = 1;
          } else if (urc % 2 === 1 && rc.length === 0) {
            q = 2;
            iv.push(rect0[1], rect0[3]);
          } else if (urc % 2 === 0 && rc.length % 2 === 0) {
            q = 3;
            iv = iv.concat(rc);
          } else if (urc % 2 === 0 && rc.length % 2 === 1) {
            q = 4;
            iv.push(rect0[1]);
            iv = iv.concat(rc);
          } else if (urc % 2 === 1 && rc.length % 2 === 0) {
            q = 5;
            iv = iv.concat(rc);
            iv.push(rect0[1], rect0[3]);
          } else if (urc % 2 === 1 && rc.length % 2 === 1) {
            q = 6;
            iv = iv.concat(rc);
            iv.push(rect0[3]);
          }
          var cells = this._cells.get(gk);
          if (cells === void 0) {
            cells = [];
            this._cells.set(gk, cells);
          }
          vec4set(rect1, rect0[0] - swx, rect0[1] - swy, rect0[2] + swx, rect0[3] + swy);
          for (var i = 0; i < g.curves.length; i++) {
            var c = g.curves[i];
            if (!curveRectIntersect(c, rect1, px - g.bbox[0], py - g.bbox[1])) {
              continue;
            }
            cells.push([g.indexes[i] + 1, rect0[0] - px, rect0[1] - py]);
            cursor.n = Math.max(cursor.n, cells.length);
            m++;
          }
          this._matches.set(gk, m);
          var y0 = rect0[1], y1 = rect0[1];
          if (iv.length > 0) {
            mivxa(iv, iv, vec2set(v0, rect0[1], rect0[3]), 1e-8);
            if (iv.length === 2) {
              y0 = iv[0] !== void 0 ? iv[0] : rect0[1];
              y1 = iv[1] !== void 0 ? iv[1] : rect0[1];
            } else if (iv.length === 4) {
              iv.push(rect0[1], rect0[3]);
              mivxa(iv, iv, vec2set(v0, rect0[1], rect0[3]), 1e-8);
              y1 = iv[0] !== void 0 ? iv[0] : rect0[1];
              y0 = iv[1] !== void 0 ? iv[1] : rect0[1];
            } else if (iv.length > 0) {
            }
          }
          this._iv.set(gk, [y0 - rect0[1], y1 - rect0[1]]);
        }
      }
      return g.advanceWidth;
    };
    QBZF2.prototype._countRaycast = function(x, y, c, xfar) {
      vec2set(v0, x, y);
      if (c.length === 6 && Math.abs(c[1] - v0[1]) < this._epsilon) {
        v0[1] += this._epsilon;
      }
      if (c.length === 6 && Math.abs(c[5] - v0[1]) < this._epsilon) {
        v0[1] += this._epsilon;
      }
      return countRaycast(v0, c, xfar, this._epsilon);
    };
    function decode(src, offset) {
      var x = varint.decode(src, offset);
      return x % 2 === 1 ? -(x - 1) / 2 - 1 : x / 2;
    }
    function vcmp(a, astart, aend, b, bstart, bend) {
      if (bend - bstart !== aend - astart)
        return false;
      for (var i = 0; i < aend - astart; i++) {
        if (a[i + astart] !== b[i + bstart])
          return false;
      }
      return true;
    }
    function curveRectIntersect(c, rect, dx, dy) {
      if (c.length === 4) {
        var c0 = c[0] + dx, c1 = c[1] + dy, c2 = c[2] + dx, c3 = c[3] + dy;
        if (rect[0] <= c0 && c0 <= rect[2] && rect[1] <= c1 && c1 <= rect[3])
          return true;
        if (rect[0] <= c2 && c2 <= rect[2] && rect[1] <= c3 && c3 <= rect[3])
          return true;
        vec2set(v1, c0, c1);
        vec2set(v2, c2, c3);
        if (lsi(v0, v1, v2, vec2set(v3, rect[0], rect[1]), vec2set(v4, rect[0], rect[3])))
          return true;
        if (lsi(v0, v1, v2, vec2set(v3, rect[0], rect[3]), vec2set(v4, rect[2], rect[3])))
          return true;
        if (lsi(v0, v1, v2, vec2set(v3, rect[2], rect[3]), vec2set(v4, rect[2], rect[1])))
          return true;
        if (lsi(v0, v1, v2, vec2set(v3, rect[2], rect[1]), vec2set(v4, rect[0], rect[1])))
          return true;
      } else if (c.length === 6) {
        return bzri(rect, c, dx, dy, 1e-8);
      }
      return false;
    }
    function writeI16(out, offset, x) {
      var ax = Math.abs(x);
      out[offset + 0] = (ax >> 8) % 128 + (x < 0 ? 128 : 0);
      out[offset + 1] = ax % 256;
    }
    function writeU24(out, offset, x) {
      out[offset + 0] = (x >> 16) % 256;
      out[offset + 1] = (x >> 8) % 256;
      out[offset + 2] = x % 256;
    }
    function writeF32(out, offset, x) {
      ieee754.write(out, x, offset, false, 23, 4);
    }
    function countRaycast(p, c, xfar, epsilon) {
      var x = p[0], y = p[1];
      var count = 0;
      if (c.length === 4) {
        vec2set(v1, c[0], c[1]);
        vec2set(v2, c[2], c[3]);
        vec2set(v3, p[0], p[1]);
        vec2set(v4, xfar, p[1]);
        if (collinear(v3, v4, v1, epsilon) || collinear(v3, v4, v2, epsilon)) {
        } else if (lsi(v0, v1, v2, v3, v4))
          count++;
      } else {
        var n = raycast(v0, y, c[1], c[3], c[5]);
        if (n > 0) {
          var x0 = bz(c[0], c[2], c[4], v0[0]);
          if (x0 > x)
            count++;
        }
        if (n > 1) {
          var x1 = bz(c[0], c[2], c[4], v0[1]);
          if (x1 > x)
            count++;
        }
      }
      return count;
    }
    function collinear(a, b, c, epsilon) {
      var ab = vec2dist(a, b);
      var ac = vec2dist(a, c);
      var bc = vec2dist(b, c);
      return Math.abs(ab - ac - bc) < epsilon;
    }
    function vec4set(out, a, b, c, d) {
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      return out;
    }
    function cmp(a, b) {
      return a < b ? -1 : 1;
    }
  }
});

// ../qbzf/atlas.js
var require_atlas = __commonJS({
  "../qbzf/atlas.js"(exports, module) {
    module.exports = Atlas2;
    function Atlas2(qbzf, opts) {
      if (!(this instanceof Atlas2))
        return new Atlas2(qbzf, opts);
      if (!opts)
        opts = {};
      this._qbzf = qbzf;
      this._attributes = opts.attributes || [];
      this._id = /* @__PURE__ */ new Map();
      this._nextId = 0;
      this._data = {
        curves: qbzf.curves,
        grid: {}
      };
      this._gridSet = /* @__PURE__ */ new Set();
      this.grids = [];
    }
    Atlas2.prototype.add = function(opts) {
      var x = opts.offset ? opts.offset[0] : 0, y = opts.offset ? opts.offset[1] : 0;
      var xopts = Object.assign({}, opts, { offset: void 0 });
      var m = this._qbzf.measure(xopts);
      var h = opts.height || 0.1;
      var ux = h * m.units[0] / this._qbzf.unitsPerEm;
      var uy = h * m.units[1] / this._qbzf.unitsPerEm;
      var g = this._qbzf.write(xopts);
      var d = this._getGrid(g.n);
      var n = d.positions.length / 2;
      d.positions.push(x, y, x + ux, y, x + ux, y - uy, x, y - uy);
      d.uv.push(0, 1, 1, 1, 1, 0, 0, 0);
      d.cells.push(n + 0, n + 1, n + 2, n + 0, n + 2, n + 3);
      d.units.push(g.units, g.units, g.units, g.units);
      d.size.push(g.grid, g.grid, g.grid, g.grid);
      d.dim.push(g.dimension, g.dimension, g.dimension, g.dimension);
      var sw = g.strokeWidth;
      d.strokeWidth.push(sw, sw, sw, sw);
      for (var i = 0; i < this._attributes.length; i++) {
        var key = this._attributes[i];
        var v = opts[key];
        d[key].push(v, v, v, v);
      }
      d.grids.push(g);
      var p = d.grids[d.grids.length - 2];
      g.offset = p ? p.offset + p.grid[0] * p.grid[1] * (p.n * 3 + 2) : 0;
      d.offsets.push(g.offset, g.offset, g.offset, g.offset);
      var id = opts.id;
      if (id === void 0) {
        do {
          id = this._nextId++;
        } while (this._id.has(id));
      }
      this._id.set(id, g.n);
      d.ids.push(id);
      if (!this._gridSet.has(g.n)) {
        this._gridSet.add(g.n);
        this.grids.push(g.n);
      }
      return id;
    };
    Atlas2.prototype.remove = function(id) {
      var n = this._id.get(id);
      if (n === void 0)
        return;
      var g = this._data.grid[n];
      if (!g)
        return;
      var ix = g.ids.indexOf(id);
      if (ix >= 0) {
        g.ids.splice(ix, 1);
        g.grids.splice(ix, 1);
      }
      if (g.ids.length === 0) {
        delete this._data.grid[n];
        this._gridSet.delete(n);
        var ix = this.grids.indexOf(n);
        if (ix >= 0)
          this.grids.splice(ix, 1);
      }
    };
    Atlas2.prototype.clear = function() {
      this.grids = [];
      this._gridSet.clear();
      this._id.clear();
      this._data.grid = {};
    };
    Atlas2.prototype._getGrid = function(n) {
      if (!this._data.grid[n]) {
        var data = {
          curves: this._data.curves,
          positions: [],
          uv: [],
          cells: [],
          offsets: [],
          units: [],
          size: [],
          dim: [],
          strokeWidth: [],
          fillColor: [],
          strokeColor: [],
          grid: {},
          grids: [],
          ids: []
        };
        this._data.grid[n] = data;
        for (var i = 0; i < this._attributes.length; i++) {
          data[this._attributes[i]] = [];
        }
        this.grids.push(n);
        this._gridSet.add(n);
      }
      return this._data.grid[n];
    };
    Atlas2.prototype.build = function() {
      var ns = Object.keys(this._data.grid);
      var data = {};
      for (var i = 0; i < ns.length; i++) {
        var n = ns[i];
        var d = this._getGrid(n);
        Object.assign(d.grid, concat(d.grids));
        data[n] = d;
      }
      return data;
    };
    function concat(grids) {
      var len = 0;
      for (var i = 0; i < grids.length; i++) {
        var g = grids[i];
        len += g.grid[0] * g.grid[1] * (g.n * 3 + 2);
      }
      var width = Math.ceil(Math.sqrt(len));
      var height = Math.ceil(len / width);
      var data = new Uint8Array(width * height * 4);
      for (var offset = 0, i = 0; i < grids.length; i++) {
        var g = grids[i], l = g.grid[0] * g.grid[1] * (g.n * 3 + 2) * 4;
        for (var j = 0; j < l; j++) {
          data[offset++] = g.data[j];
        }
      }
      return { width, height, data, dimension: [width, height] };
    }
  }
});

// node_modules/point-in-polygon/flat.js
var require_flat = __commonJS({
  "node_modules/point-in-polygon/flat.js"(exports, module) {
    module.exports = function pointInPolygonFlat(point, vs, start, end) {
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

// node_modules/line-segment-intersect-2d/index.js
var require_line_segment_intersect_2d2 = __commonJS({
  "node_modules/line-segment-intersect-2d/index.js"(exports, module) {
    module.exports = function lineIntersection(out, a0, a1, b0, b1) {
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

// node_modules/polygon-intersect-test/flat.js
var require_flat2 = __commonJS({
  "node_modules/polygon-intersect-test/flat.js"(exports, module) {
    var pointInPolygon = require_flat();
    var lineIntersection = require_line_segment_intersect_2d2();
    var v0 = [0, 0];
    var v1 = [0, 0];
    var v2 = [0, 0];
    var v3 = [0, 0];
    var v4 = [0, 0];
    module.exports = function polygonIntersectTestFlat(a, b, arange, brange) {
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

// node_modules/point-in-polygon/nested.js
var require_nested = __commonJS({
  "node_modules/point-in-polygon/nested.js"(exports, module) {
    module.exports = function pointInPolygonNested(point, vs, start, end) {
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

// node_modules/polygon-intersect-test/nested.js
var require_nested2 = __commonJS({
  "node_modules/polygon-intersect-test/nested.js"(exports, module) {
    var pointInPolygon = require_nested();
    var lineIntersection = require_line_segment_intersect_2d2();
    var v0 = [0, 0];
    var v1 = [0, 0];
    var v2 = [0, 0];
    var v3 = [0, 0];
    var v4 = [0, 0];
    module.exports = function polygonIntersectTestNested(a, b, arange, brange) {
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

// node_modules/polygon-intersect-test/index.js
var require_polygon_intersect_test = __commonJS({
  "node_modules/polygon-intersect-test/index.js"(exports, module) {
    var polygonIntersectTestFlat = require_flat2();
    var polygonIntersectTestNested = require_nested2();
    module.exports = function polygonIntersectTest(a, b, arange, brange) {
      if (a.length > 0 && Array.isArray(a[0])) {
        return polygonIntersectTestNested(a, b, arange, brange);
      } else {
        return polygonIntersectTestFlat(a, b, arange, brange);
      }
    };
  }
});

// node_modules/label-placement-engine/index.js
var require_label_placement_engine = __commonJS({
  "node_modules/label-placement-engine/index.js"(exports, module) {
    var polygonIntersect = require_polygon_intersect_test();
    var bbox = [0, 0, 0, 0];
    var irange = [0, 0];
    var jrange = [0, 0];
    module.exports = LabelEngine2;
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

// node_modules/label-placement-engine/preset/bbox.js
var require_bbox = __commonJS({
  "node_modules/label-placement-engine/preset/bbox.js"(exports, module) {
    var defaultScale = [1, 1];
    var defaultThickness = [1e3, 1e3];
    module.exports = function(params) {
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

// node_modules/label-placement-engine/preset/point.js
var require_point = __commonJS({
  "node_modules/label-placement-engine/preset/point.js"(exports, module) {
    var defaultScale = [1, 1];
    var defaultPlacements = ["top", "bottom", "right", "left"];
    var zero2 = [0, 0];
    module.exports = function(params) {
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

// node_modules/gl-vec2/set.js
var require_set2 = __commonJS({
  "node_modules/gl-vec2/set.js"(exports, module) {
    module.exports = set;
    function set(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    }
  }
});

// node_modules/bit-twiddle/twiddle.js
var require_twiddle = __commonJS({
  "node_modules/bit-twiddle/twiddle.js"(exports) {
    "use strict";
    "use restrict";
    var INT_BITS = 32;
    exports.INT_BITS = INT_BITS;
    exports.INT_MAX = 2147483647;
    exports.INT_MIN = -1 << INT_BITS - 1;
    exports.sign = function(v) {
      return (v > 0) - (v < 0);
    };
    exports.abs = function(v) {
      var mask = v >> INT_BITS - 1;
      return (v ^ mask) - mask;
    };
    exports.min = function(x, y) {
      return y ^ (x ^ y) & -(x < y);
    };
    exports.max = function(x, y) {
      return x ^ (x ^ y) & -(x < y);
    };
    exports.isPow2 = function(v) {
      return !(v & v - 1) && !!v;
    };
    exports.log2 = function(v) {
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
    exports.log10 = function(v) {
      return v >= 1e9 ? 9 : v >= 1e8 ? 8 : v >= 1e7 ? 7 : v >= 1e6 ? 6 : v >= 1e5 ? 5 : v >= 1e4 ? 4 : v >= 1e3 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
    };
    exports.popCount = function(v) {
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
    exports.countTrailingZeros = countTrailingZeros;
    exports.nextPow2 = function(v) {
      v += v === 0;
      --v;
      v |= v >>> 1;
      v |= v >>> 2;
      v |= v >>> 4;
      v |= v >>> 8;
      v |= v >>> 16;
      return v + 1;
    };
    exports.prevPow2 = function(v) {
      v |= v >>> 1;
      v |= v >>> 2;
      v |= v >>> 4;
      v |= v >>> 8;
      v |= v >>> 16;
      return v - (v >>> 1);
    };
    exports.parity = function(v) {
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
    exports.reverse = function(v) {
      return REVERSE_TABLE[v & 255] << 24 | REVERSE_TABLE[v >>> 8 & 255] << 16 | REVERSE_TABLE[v >>> 16 & 255] << 8 | REVERSE_TABLE[v >>> 24 & 255];
    };
    exports.interleave2 = function(x, y) {
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
    exports.deinterleave2 = function(v, n) {
      v = v >>> n & 1431655765;
      v = (v | v >>> 1) & 858993459;
      v = (v | v >>> 2) & 252645135;
      v = (v | v >>> 4) & 16711935;
      v = (v | v >>> 16) & 65535;
      return v << 16 >> 16;
    };
    exports.interleave3 = function(x, y, z) {
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
    exports.deinterleave3 = function(v, n) {
      v = v >>> n & 1227133513;
      v = (v | v >>> 2) & 3272356035;
      v = (v | v >>> 4) & 251719695;
      v = (v | v >>> 8) & 4278190335;
      v = (v | v >>> 16) & 1023;
      return v << 22 >> 22;
    };
    exports.nextCombination = function(v) {
      var t = v | v - 1;
      return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
    };
  }
});

// node_modules/inorder-tree-layout/inorder.js
var require_inorder = __commonJS({
  "node_modules/inorder-tree-layout/inorder.js"(exports) {
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
    exports.root = rootInorder;
    function beginInorder(n) {
      return 0;
    }
    exports.begin = beginInorder;
    function endInorder(n) {
      return n - 1;
    }
    exports.end = endInorder;
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
    exports.height = heightInorder;
    function prevInorder(n, x) {
      return Math.max(x - 1, 0);
    }
    exports.prev = prevInorder;
    function nextInorder(n, x) {
      return Math.min(x + 1, n - 1);
    }
    exports.next = nextInorder;
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
    exports.parent = parentInorder;
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
    exports.left = leftInorder;
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
    exports.right = rightInorder;
    function leafInorder(n, x) {
      return heightInorder(n, x) === 0;
    }
    exports.leaf = leafInorder;
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
    exports.lo = loInorder;
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
    exports.hi = hiInorder;
  }
});

// node_modules/bfs-tree-layout/bfs.js
var require_bfs = __commonJS({
  "node_modules/bfs-tree-layout/bfs.js"(exports) {
    "use strict";
    var bits = require_twiddle();
    function bfsRoot(n) {
      return 0;
    }
    exports.root = bfsRoot;
    function bfsBegin(n) {
      return bfsLo(n, 0);
    }
    exports.begin = bfsBegin;
    function bfsEnd(n) {
      return bfsHi(n, 0);
    }
    exports.end = bfsEnd;
    function bfsHeight(n, x) {
      var lgn = bits.log2(bits.nextPow2(n + 1));
      var lgx = bits.log2(bits.nextPow2(x + 1));
      var h = lgn - lgx;
      if (x + 1 << h > n) {
        --h;
      }
      return h;
    }
    exports.height = bfsHeight;
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
    exports.next = bfsNext;
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
    exports.prev = bfsPrev;
    function bfsLo(n, x) {
      var h = bfsHeight(n, x);
      return (x + 1 << h) - 1;
    }
    exports.lo = bfsLo;
    function bfsHi(n, x) {
      var h = bfsHeight(n, x);
      var a = (x + 2 << h) - 2;
      if (a < n) {
        return a;
      }
      return (x + 2 << h - 1) - 2;
    }
    exports.hi = bfsHi;
    function bfsParent(n, x) {
      return x - 1 >>> 1;
    }
    exports.parent = bfsParent;
    function bfsLeft(n, x) {
      return x * 2 + 1;
    }
    exports.left = bfsLeft;
    function bfsRight(n, x) {
      return (x + 1) * 2;
    }
    exports.right = bfsRight;
    function bfsLeaf(n, x) {
      return x * 2 + 1 >= n;
    }
    exports.leaf = bfsLeaf;
  }
});

// node_modules/bfs2inorder/bfs2inorder.js
var require_bfs2inorder = __commonJS({
  "node_modules/bfs2inorder/bfs2inorder.js"(exports, module) {
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
    module.exports = bfs2inorder;
  }
});

// node_modules/label-placement-engine/preset/line.js
var require_line = __commonJS({
  "node_modules/label-placement-engine/preset/line.js"(exports, module) {
    var vec2set = require_set2();
    var defaultScale = [1, 1];
    var defaultSides = ["left", "right", "center"];
    var order = require_bfs2inorder();
    var v0 = [0, 0];
    var v1 = [0, 0];
    var v2 = [0, 0];
    var v3 = [0, 0];
    module.exports = function(params) {
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

// node_modules/label-placement-engine/preset/area.js
var require_area = __commonJS({
  "node_modules/label-placement-engine/preset/area.js"(exports, module) {
    var vec2set = require_set2();
    var ptest = require_flat2();
    var defaultScale = [1, 1];
    var X = [0, 0, 0, 0, 0, 0, 0, 0];
    var C = [0, 0];
    module.exports = function(params) {
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

// text.mjs
var import_qbzf = __toESM(require_qbzf(), 1);
var import_atlas = __toESM(require_atlas(), 1);
var import_label_placement_engine = __toESM(require_label_placement_engine(), 1);
var import_bbox = __toESM(require_bbox(), 1);
var import_point = __toESM(require_point(), 1);
var import_line = __toESM(require_line(), 1);
var import_area = __toESM(require_area(), 1);
var labelPreset = {
  bbox: import_bbox.default,
  point: import_point.default,
  line: import_line.default,
  area: import_area.default
};
var uvs = [0, 0, 1, 0, 1, 1, 0, 1];
var padding = [10, 10];
var fontSize = 12;
function Text(opts) {
  if (!opts)
    opts = {};
  if (!(this instanceof Text))
    return new Text(opts);
  this._qbzf = (0, import_qbzf.default)(opts.font);
  this._atlas = (0, import_atlas.default)(this._qbzf, {
    attributes: ["fillColor", "strokeColor"]
  });
  this._labelEngine = (0, import_label_placement_engine.default)({
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
  });
  this._props = {};
}
Text.prototype.update = function(props, map) {
  var viewboxWidthLon = map.viewbox[2] - map.viewbox[0];
  var viewboxHeightLat = map.viewbox[3] - map.viewbox[1];
  var labels = [];
  labels.push({ type: "bbox", bounds: map.viewbox });
  var ph = 4, pw = 4;
  this._addPoint(map, labels, props.pointT, pw, ph);
  this._addPoint(map, labels, props.pointP, pw, ph);
  this._addLine(map, labels, props.lineT, pw, ph);
  this._addLine(map, labels, props.lineP, pw, ph);
  this._addArea(map, labels, props.areaT, pw, ph);
  this._addArea(map, labels, props.areaP, pw, ph);
  this._labelEngine.update(labels);
  this._atlas.clear();
  var ilabels = {}, idLabels = {};
  for (var i = 0; i < labels.length; i++) {
    if (!this._labelEngine.isVisible(i))
      continue;
    var l = labels[i];
    if (l.type !== "point" && l.type !== "line" && l.type !== "area")
      continue;
    idLabels[l.id] = l;
    ilabels[l.id] = i;
    this._atlas.add({
      id: l.id,
      text: l.text,
      height: l.heightPx,
      fillColor: [0, 0, 0],
      strokeColor: [1, 1, 1],
      strokeWidth: 150,
      padding
    });
  }
  var data = this._atlas.build();
  var ns = Object.keys(data);
  this._props = {};
  var positionMap = new Uint32Array(this._labelEngine.data.positions.length);
  for (var i = 0; i < ns.length; i++) {
    var n = ns[i];
    var d = data[n];
    if (!d)
      continue;
    var psize = 0;
    for (var j = 0; j < d.ids.length; j++) {
      var id = d.ids[j];
      var l = idLabels[id];
      var ix = ilabels[id];
      var pstart = this._labelEngine.offsets.positions[ix * 2 + 0];
      var pend = this._labelEngine.offsets.positions[ix * 2 + 1];
      psize += pend - pstart;
    }
    var props = {
      positions: new Float32Array(psize),
      uvs: new Float32Array(psize),
      cells: null,
      offsets: new Float32Array(psize / 2),
      units: new Float32Array(psize),
      size: new Float32Array(psize),
      fillColors: new Float32Array(psize / 2 * 3),
      strokeWidths: new Float32Array(psize / 2),
      strokeColors: new Float32Array(psize / 2 * 3),
      pxSize: new Float32Array(psize),
      curves: d.curves,
      grid: d.grid
    };
    this._props[n] = props;
    if (!d.curves.texture)
      d.curves.texture = map.regl.texture(d.curves);
    if (!d.grid.texture)
      d.grid.texture = map.regl.texture(d.grid);
    var pindex = 0;
    for (var j = 0; j < d.ids.length; j++) {
      var id = d.ids[j];
      var l = idLabels[id];
      var ix = ilabels[id];
      var pstart = this._labelEngine.offsets.positions[ix * 2 + 0] / 2;
      var pend = this._labelEngine.offsets.positions[ix * 2 + 1] / 2;
      for (var k = 0; k < pend - pstart; k++) {
        props.positions[pindex * 2 + 0] = this._labelEngine.data.positions[(pstart + k) * 2 + 0];
        props.positions[pindex * 2 + 1] = this._labelEngine.data.positions[(pstart + k) * 2 + 1];
        positionMap[(pstart + k) * 2 + 0] = Number(n);
        positionMap[(pstart + k) * 2 + 1] = pindex;
        props.uvs[pindex * 2 + 0] = uvs[k * 2 + 0];
        props.uvs[pindex * 2 + 1] = uvs[k * 2 + 1];
        props.offsets[pindex] = d.offsets[j * 4];
        props.units[pindex * 2 + 0] = d.units[j * 4][0];
        props.units[pindex * 2 + 1] = d.units[j * 4][1];
        props.size[pindex * 2 + 0] = d.size[j * 4][0];
        props.size[pindex * 2 + 1] = d.size[j * 4][1];
        props.fillColors[pindex * 3 + 0] = d.fillColor[j * 4][0];
        props.fillColors[pindex * 3 + 1] = d.fillColor[j * 4][1];
        props.fillColors[pindex * 3 + 2] = d.fillColor[j * 4][2];
        props.strokeWidths[pindex] = d.strokeWidth[j * 4];
        props.strokeColors[pindex * 3 + 0] = d.strokeColor[j * 4][0];
        props.strokeColors[pindex * 3 + 1] = d.strokeColor[j * 4][1];
        props.strokeColors[pindex * 3 + 2] = d.strokeColor[j * 4][2];
        props.pxSize[pindex * 2 + 0] = l.widthPx;
        props.pxSize[pindex * 2 + 1] = l.heightPx;
        pindex++;
      }
    }
  }
  var cindex = {}, csize = {};
  for (var i = 0; i < this._labelEngine.data.cells.length; i++) {
    var c = this._labelEngine.data.cells[i];
    var n = positionMap[c * 2 + 0];
    if (csize[n] === void 0)
      csize[n] = 1;
    else
      csize[n]++;
  }
  for (var i = 0; i < ns.length; i++) {
    var n = Number(ns[i]);
    if (!this._props[n])
      continue;
    this._props[n].cells = new Uint32Array(csize[n]);
  }
  for (var i = 0; i < this._labelEngine.data.cells.length; i++) {
    var c = this._labelEngine.data.cells[i];
    var n = positionMap[c * 2 + 0], j = positionMap[c * 2 + 1];
    if (!this._props[n])
      continue;
    if (n === 0)
      continue;
    if (cindex[n] === void 0)
      cindex[n] = 0;
    this._props[n].cells[cindex[n]++] = j;
  }
  return this._props;
};
Text.prototype._addPoint = function(map, labels, p, pw, ph) {
  if (!p || !p.positions)
    return;
  var aspect = map._size[0] / map._size[1];
  for (var ix = 0; ix < p.id.length; ix++) {
    var id = p.id[ix];
    if (!p.labels.hasOwnProperty(id) || p.labels[id].length === 0)
      continue;
    var text = this._getLabel(p.labels[id]);
    var lon = p.positions[ix * 2 + 0];
    var lat = p.positions[ix * 2 + 1];
    if (map.viewbox[0] > lon || lon > map.viewbox[2])
      continue;
    if (map.viewbox[1] > lat || lat > map.viewbox[3])
      continue;
    var pxToLon = (map.viewbox[2] - map.viewbox[0]) / map._size[0];
    var pxToLat = (map.viewbox[3] - map.viewbox[1]) / map._size[1];
    var m = this._qbzf.measure({ text, strokeWidth: 150, padding });
    var widthPx = Math.round(m.units[0] / this._qbzf.unitsPerEm * fontSize);
    var heightPx = Math.round(m.units[1] / this._qbzf.unitsPerEm * fontSize);
    var widthLon = (widthPx + pw + 1) * pxToLon;
    var heightLat = (heightPx + ph + 1) * pxToLat / aspect;
    labels.push({
      type: "point",
      point: [lon, lat],
      labelSize: [widthLon, heightLat],
      labelMargin: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      pointSize: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      pointMargin: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      id,
      widthPx,
      heightPx,
      text
    });
  }
};
Text.prototype._addLine = function(map, labels, l) {
  var ph = 4, pw = 4;
  if (!l || !l.positions)
    return;
  var aspect = map._size[0] / map._size[1];
  var start = 0, prev = null;
  for (var ix = 0; ix < l.id.length; ix++) {
    var id = l.id[ix];
    if ((prev === null || prev === id) && ix !== l.id.length - 1) {
      prev = id;
      continue;
    }
    if (!l.labels.hasOwnProperty(id) || l.labels[id].length === 0) {
      start = ix;
      continue;
    }
    var text = this._getLabel(l.labels[prev]);
    prev = id;
    if (text === null)
      continue;
    var end = ix;
    var vb = map.viewbox;
    var positions = l.positions.slice(start * 2, end * 2 + 2);
    start = ix;
    var pxToLon = (map.viewbox[2] - map.viewbox[0]) / map._size[0];
    var pxToLat = (map.viewbox[3] - map.viewbox[1]) / map._size[1];
    var m = this._qbzf.measure({ text, strokeWidth: 150, padding });
    var widthPx = Math.round(m.units[0] / this._qbzf.unitsPerEm * fontSize);
    var heightPx = Math.round(m.units[1] / this._qbzf.unitsPerEm * fontSize);
    var widthLon = (widthPx + pw + 1) * pxToLon;
    var heightLat = (heightPx + ph + 1) * pxToLat;
    labels.push({
      type: "line",
      positions,
      labelSize: [widthLon, heightLat],
      labelMargin: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      lineSize: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      lineMargin: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      id,
      widthPx,
      heightPx,
      text
    });
  }
};
Text.prototype._addArea = function(map, labels, l) {
  var ph = 4, pw = 4;
  if (!l || !l.positions)
    return;
  var aspect = map._size[0] / map._size[1];
  var start = 0, prev = null;
  for (var ix = 0; ix < l.id.length; ix++) {
    var id = l.id[ix];
    if ((prev === null || prev === id) && ix !== l.id.length - 1) {
      prev = id;
      continue;
    }
    if (!l.labels.hasOwnProperty(id) || l.labels[id].length === 0) {
      start = ix;
      prev = id;
      continue;
    }
    var labelId = prev;
    var text = this._getLabel(l.labels[prev]);
    prev = id;
    if (text === null)
      continue;
    var end = ix;
    var vb = map.viewbox;
    var positions = l.positions.slice(start * 2, end * 2 + 2);
    start = ix;
    var pxToLon = (map.viewbox[2] - map.viewbox[0]) / map._size[0];
    var pxToLat = (map.viewbox[3] - map.viewbox[1]) / map._size[1];
    var m = this._qbzf.measure({ text, strokeWidth: 150, padding });
    var widthPx = Math.round(m.units[0] / this._qbzf.unitsPerEm * fontSize);
    var heightPx = Math.round(m.units[1] / this._qbzf.unitsPerEm * fontSize);
    var widthLon = (widthPx + pw + 1) * pxToLon;
    var heightLat = (heightPx + ph + 1) * pxToLat;
    labels.push({
      type: "area",
      positions,
      labelSize: [widthLon, heightLat],
      labelMargin: [10 / map._size[0] * widthLon, 10 / map._size[1] * heightLat],
      id,
      widthPx,
      heightPx,
      text
    });
  }
};
Text.prototype._getLabel = function(labels) {
  if (!labels)
    return null;
  var best = 0, btext = null;
  for (var i = 0; i < labels.length; i++) {
    var m = /^([^=]*)=(.*)/.exec(labels[i]);
    if (!m)
      continue;
    var lang = m[1], text = m[2];
    var score = 1;
    if (lang === "en")
      score += 3;
    else if (lang === "")
      score += 2;
    else if (lang === "alt")
      score += 1;
    if (score > best) {
      best = score;
      btext = text;
    }
  }
  return btext;
};
export {
  Text as default
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
