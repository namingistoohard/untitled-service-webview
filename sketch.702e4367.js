// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/colorcube.vert":[function(require,module,exports) {
module.exports = "#define GLSLIFY 1\n/**\n  * Our vertex shader below receives vertex position values\n  * from an attribute we define called 'aVertexPosition'.\n  * That position is then multiplied by 4x4 matrix we provide\n  * called 'uProjectionMatrix' and 'uModelViewMatrix';\n  * 'gl_Position' is set to the result.\n  */\n\nattribute vec4 aVertexPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uMatrix;\n\nvarying lowp vec4 vColor;\n\nvoid main() {\n  gl_Position = uMatrix * aVertexPosition;\n  vColor = aVertexColor;\n}\n";
},{}],"assets/colorcube.frag":[function(require,module,exports) {
module.exports = "#define GLSLIFY 1\nvarying lowp vec4 vColor;\n\nvoid main() {\n  gl_FragColor = vColor; // fetch the value from 'vColor' varying\n}\n";
},{}],"lib/gl-matrix-min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 3.3.0

Copyright (c) 2015-2020, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
!function (t, n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((t = t || self).glMatrix = {});
}(this, function (t) {
  "use strict";

  var n = "undefined" != typeof Float32Array ? Float32Array : Array,
      a = Math.random;
  var r = Math.PI / 180;
  Math.hypot || (Math.hypot = function () {
    for (var t = 0, n = arguments.length; n--;) {
      t += arguments[n] * arguments[n];
    }

    return Math.sqrt(t);
  });
  var e = Object.freeze({
    __proto__: null,
    EPSILON: 1e-6,

    get ARRAY_TYPE() {
      return n;
    },

    RANDOM: a,
    setMatrixArrayType: function setMatrixArrayType(t) {
      n = t;
    },
    toRadian: function toRadian(t) {
      return t * r;
    },
    equals: function equals(t, n) {
      return Math.abs(t - n) <= 1e-6 * Math.max(1, Math.abs(t), Math.abs(n));
    }
  });

  function u(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = a[0],
        h = a[1],
        c = a[2],
        s = a[3];
    return t[0] = r * i + u * h, t[1] = e * i + o * h, t[2] = r * c + u * s, t[3] = e * c + o * s, t;
  }

  function o(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t[2] = n[2] - a[2], t[3] = n[3] - a[3], t;
  }

  var i = u,
      h = o,
      c = Object.freeze({
    __proto__: null,
    create: function create() {
      var t = new n(4);
      return n != Float32Array && (t[1] = 0, t[2] = 0), t[0] = 1, t[3] = 1, t;
    },
    clone: function clone(t) {
      var a = new n(4);
      return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
    },
    copy: function copy(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t;
    },
    identity: function identity(t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
    },
    fromValues: function fromValues(t, a, r, e) {
      var u = new n(4);
      return u[0] = t, u[1] = a, u[2] = r, u[3] = e, u;
    },
    set: function set(t, n, a, r, e) {
      return t[0] = n, t[1] = a, t[2] = r, t[3] = e, t;
    },
    transpose: function transpose(t, n) {
      if (t === n) {
        var a = n[1];
        t[1] = n[2], t[2] = a;
      } else t[0] = n[0], t[1] = n[2], t[2] = n[1], t[3] = n[3];

      return t;
    },
    invert: function invert(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = a * u - e * r;
      return o ? (o = 1 / o, t[0] = u * o, t[1] = -r * o, t[2] = -e * o, t[3] = a * o, t) : null;
    },
    adjoint: function adjoint(t, n) {
      var a = n[0];
      return t[0] = n[3], t[1] = -n[1], t[2] = -n[2], t[3] = a, t;
    },
    determinant: function determinant(t) {
      return t[0] * t[3] - t[2] * t[1];
    },
    multiply: u,
    rotate: function rotate(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = Math.sin(a),
          h = Math.cos(a);
      return t[0] = r * h + u * i, t[1] = e * h + o * i, t[2] = r * -i + u * h, t[3] = e * -i + o * h, t;
    },
    scale: function scale(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = a[0],
          h = a[1];
      return t[0] = r * i, t[1] = e * i, t[2] = u * h, t[3] = o * h, t;
    },
    fromRotation: function fromRotation(t, n) {
      var a = Math.sin(n),
          r = Math.cos(n);
      return t[0] = r, t[1] = a, t[2] = -a, t[3] = r, t;
    },
    fromScaling: function fromScaling(t, n) {
      return t[0] = n[0], t[1] = 0, t[2] = 0, t[3] = n[1], t;
    },
    str: function str(t) {
      return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
    },
    frob: function frob(t) {
      return Math.hypot(t[0], t[1], t[2], t[3]);
    },
    LDU: function LDU(t, n, a, r) {
      return t[2] = r[2] / r[0], a[0] = r[0], a[1] = r[1], a[3] = r[3] - t[2] * a[1], [t, n, a];
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t[3] = n[3] + a[3], t;
    },
    subtract: o,
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = t[3],
          o = n[0],
          i = n[1],
          h = n[2],
          c = n[3];
      return Math.abs(a - o) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(o)) && Math.abs(r - i) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(i)) && Math.abs(e - h) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(h)) && Math.abs(u - c) <= 1e-6 * Math.max(1, Math.abs(u), Math.abs(c));
    },
    multiplyScalar: function multiplyScalar(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t[3] = n[3] * a, t;
    },
    multiplyScalarAndAdd: function multiplyScalarAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t[2] = n[2] + a[2] * r, t[3] = n[3] + a[3] * r, t;
    },
    mul: i,
    sub: h
  });

  function s(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = n[4],
        h = n[5],
        c = a[0],
        s = a[1],
        M = a[2],
        f = a[3],
        l = a[4],
        v = a[5];
    return t[0] = r * c + u * s, t[1] = e * c + o * s, t[2] = r * M + u * f, t[3] = e * M + o * f, t[4] = r * l + u * v + i, t[5] = e * l + o * v + h, t;
  }

  function M(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t[2] = n[2] - a[2], t[3] = n[3] - a[3], t[4] = n[4] - a[4], t[5] = n[5] - a[5], t;
  }

  var f = s,
      l = M,
      v = Object.freeze({
    __proto__: null,
    create: function create() {
      var t = new n(6);
      return n != Float32Array && (t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0), t[0] = 1, t[3] = 1, t;
    },
    clone: function clone(t) {
      var a = new n(6);
      return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a;
    },
    copy: function copy(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t;
    },
    identity: function identity(t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
    },
    fromValues: function fromValues(t, a, r, e, u, o) {
      var i = new n(6);
      return i[0] = t, i[1] = a, i[2] = r, i[3] = e, i[4] = u, i[5] = o, i;
    },
    set: function set(t, n, a, r, e, u, o) {
      return t[0] = n, t[1] = a, t[2] = r, t[3] = e, t[4] = u, t[5] = o, t;
    },
    invert: function invert(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = n[4],
          i = n[5],
          h = a * u - r * e;
      return h ? (h = 1 / h, t[0] = u * h, t[1] = -r * h, t[2] = -e * h, t[3] = a * h, t[4] = (e * i - u * o) * h, t[5] = (r * o - a * i) * h, t) : null;
    },
    determinant: function determinant(t) {
      return t[0] * t[3] - t[1] * t[2];
    },
    multiply: s,
    rotate: function rotate(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = Math.sin(a),
          s = Math.cos(a);
      return t[0] = r * s + u * c, t[1] = e * s + o * c, t[2] = r * -c + u * s, t[3] = e * -c + o * s, t[4] = i, t[5] = h, t;
    },
    scale: function scale(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = a[0],
          s = a[1];
      return t[0] = r * c, t[1] = e * c, t[2] = u * s, t[3] = o * s, t[4] = i, t[5] = h, t;
    },
    translate: function translate(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = a[0],
          s = a[1];
      return t[0] = r, t[1] = e, t[2] = u, t[3] = o, t[4] = r * c + u * s + i, t[5] = e * c + o * s + h, t;
    },
    fromRotation: function fromRotation(t, n) {
      var a = Math.sin(n),
          r = Math.cos(n);
      return t[0] = r, t[1] = a, t[2] = -a, t[3] = r, t[4] = 0, t[5] = 0, t;
    },
    fromScaling: function fromScaling(t, n) {
      return t[0] = n[0], t[1] = 0, t[2] = 0, t[3] = n[1], t[4] = 0, t[5] = 0, t;
    },
    fromTranslation: function fromTranslation(t, n) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = n[0], t[5] = n[1], t;
    },
    str: function str(t) {
      return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
    },
    frob: function frob(t) {
      return Math.hypot(t[0], t[1], t[2], t[3], t[4], t[5], 1);
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t[3] = n[3] + a[3], t[4] = n[4] + a[4], t[5] = n[5] + a[5], t;
    },
    subtract: M,
    multiplyScalar: function multiplyScalar(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t[3] = n[3] * a, t[4] = n[4] * a, t[5] = n[5] * a, t;
    },
    multiplyScalarAndAdd: function multiplyScalarAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t[2] = n[2] + a[2] * r, t[3] = n[3] + a[3] * r, t[4] = n[4] + a[4] * r, t[5] = n[5] + a[5] * r, t;
    },
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3] && t[4] === n[4] && t[5] === n[5];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = t[3],
          o = t[4],
          i = t[5],
          h = n[0],
          c = n[1],
          s = n[2],
          M = n[3],
          f = n[4],
          l = n[5];
      return Math.abs(a - h) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(h)) && Math.abs(r - c) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(e - s) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(u - M) <= 1e-6 * Math.max(1, Math.abs(u), Math.abs(M)) && Math.abs(o - f) <= 1e-6 * Math.max(1, Math.abs(o), Math.abs(f)) && Math.abs(i - l) <= 1e-6 * Math.max(1, Math.abs(i), Math.abs(l));
    },
    mul: f,
    sub: l
  });

  function b() {
    var t = new n(9);
    return n != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
  }

  function m(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = n[4],
        h = n[5],
        c = n[6],
        s = n[7],
        M = n[8],
        f = a[0],
        l = a[1],
        v = a[2],
        b = a[3],
        m = a[4],
        d = a[5],
        p = a[6],
        x = a[7],
        y = a[8];
    return t[0] = f * r + l * o + v * c, t[1] = f * e + l * i + v * s, t[2] = f * u + l * h + v * M, t[3] = b * r + m * o + d * c, t[4] = b * e + m * i + d * s, t[5] = b * u + m * h + d * M, t[6] = p * r + x * o + y * c, t[7] = p * e + x * i + y * s, t[8] = p * u + x * h + y * M, t;
  }

  function d(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t[2] = n[2] - a[2], t[3] = n[3] - a[3], t[4] = n[4] - a[4], t[5] = n[5] - a[5], t[6] = n[6] - a[6], t[7] = n[7] - a[7], t[8] = n[8] - a[8], t;
  }

  var p = m,
      x = d,
      y = Object.freeze({
    __proto__: null,
    create: b,
    fromMat4: function fromMat4(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[4], t[4] = n[5], t[5] = n[6], t[6] = n[8], t[7] = n[9], t[8] = n[10], t;
    },
    clone: function clone(t) {
      var a = new n(9);
      return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a;
    },
    copy: function copy(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t;
    },
    fromValues: function fromValues(t, a, r, e, u, o, i, h, c) {
      var s = new n(9);
      return s[0] = t, s[1] = a, s[2] = r, s[3] = e, s[4] = u, s[5] = o, s[6] = i, s[7] = h, s[8] = c, s;
    },
    set: function set(t, n, a, r, e, u, o, i, h, c) {
      return t[0] = n, t[1] = a, t[2] = r, t[3] = e, t[4] = u, t[5] = o, t[6] = i, t[7] = h, t[8] = c, t;
    },
    identity: function identity(t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    },
    transpose: function transpose(t, n) {
      if (t === n) {
        var a = n[1],
            r = n[2],
            e = n[5];
        t[1] = n[3], t[2] = n[6], t[3] = a, t[5] = n[7], t[6] = r, t[7] = e;
      } else t[0] = n[0], t[1] = n[3], t[2] = n[6], t[3] = n[1], t[4] = n[4], t[5] = n[7], t[6] = n[2], t[7] = n[5], t[8] = n[8];

      return t;
    },
    invert: function invert(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = n[4],
          i = n[5],
          h = n[6],
          c = n[7],
          s = n[8],
          M = s * o - i * c,
          f = -s * u + i * h,
          l = c * u - o * h,
          v = a * M + r * f + e * l;
      return v ? (v = 1 / v, t[0] = M * v, t[1] = (-s * r + e * c) * v, t[2] = (i * r - e * o) * v, t[3] = f * v, t[4] = (s * a - e * h) * v, t[5] = (-i * a + e * u) * v, t[6] = l * v, t[7] = (-c * a + r * h) * v, t[8] = (o * a - r * u) * v, t) : null;
    },
    adjoint: function adjoint(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = n[4],
          i = n[5],
          h = n[6],
          c = n[7],
          s = n[8];
      return t[0] = o * s - i * c, t[1] = e * c - r * s, t[2] = r * i - e * o, t[3] = i * h - u * s, t[4] = a * s - e * h, t[5] = e * u - a * i, t[6] = u * c - o * h, t[7] = r * h - a * c, t[8] = a * o - r * u, t;
    },
    determinant: function determinant(t) {
      var n = t[0],
          a = t[1],
          r = t[2],
          e = t[3],
          u = t[4],
          o = t[5],
          i = t[6],
          h = t[7],
          c = t[8];
      return n * (c * u - o * h) + a * (-c * e + o * i) + r * (h * e - u * i);
    },
    multiply: m,
    translate: function translate(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = n[6],
          s = n[7],
          M = n[8],
          f = a[0],
          l = a[1];
      return t[0] = r, t[1] = e, t[2] = u, t[3] = o, t[4] = i, t[5] = h, t[6] = f * r + l * o + c, t[7] = f * e + l * i + s, t[8] = f * u + l * h + M, t;
    },
    rotate: function rotate(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = n[6],
          s = n[7],
          M = n[8],
          f = Math.sin(a),
          l = Math.cos(a);
      return t[0] = l * r + f * o, t[1] = l * e + f * i, t[2] = l * u + f * h, t[3] = l * o - f * r, t[4] = l * i - f * e, t[5] = l * h - f * u, t[6] = c, t[7] = s, t[8] = M, t;
    },
    scale: function scale(t, n, a) {
      var r = a[0],
          e = a[1];
      return t[0] = r * n[0], t[1] = r * n[1], t[2] = r * n[2], t[3] = e * n[3], t[4] = e * n[4], t[5] = e * n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t;
    },
    fromTranslation: function fromTranslation(t, n) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = n[0], t[7] = n[1], t[8] = 1, t;
    },
    fromRotation: function fromRotation(t, n) {
      var a = Math.sin(n),
          r = Math.cos(n);
      return t[0] = r, t[1] = a, t[2] = 0, t[3] = -a, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    },
    fromScaling: function fromScaling(t, n) {
      return t[0] = n[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = n[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    },
    fromMat2d: function fromMat2d(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = 0, t[3] = n[2], t[4] = n[3], t[5] = 0, t[6] = n[4], t[7] = n[5], t[8] = 1, t;
    },
    fromQuat: function fromQuat(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = a + a,
          i = r + r,
          h = e + e,
          c = a * o,
          s = r * o,
          M = r * i,
          f = e * o,
          l = e * i,
          v = e * h,
          b = u * o,
          m = u * i,
          d = u * h;
      return t[0] = 1 - M - v, t[3] = s - d, t[6] = f + m, t[1] = s + d, t[4] = 1 - c - v, t[7] = l - b, t[2] = f - m, t[5] = l + b, t[8] = 1 - c - M, t;
    },
    normalFromMat4: function normalFromMat4(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = n[4],
          i = n[5],
          h = n[6],
          c = n[7],
          s = n[8],
          M = n[9],
          f = n[10],
          l = n[11],
          v = n[12],
          b = n[13],
          m = n[14],
          d = n[15],
          p = a * i - r * o,
          x = a * h - e * o,
          y = a * c - u * o,
          q = r * h - e * i,
          g = r * c - u * i,
          _ = e * c - u * h,
          A = s * b - M * v,
          w = s * m - f * v,
          R = s * d - l * v,
          z = M * m - f * b,
          j = M * d - l * b,
          P = f * d - l * m,
          S = p * P - x * j + y * z + q * R - g * w + _ * A;

      return S ? (S = 1 / S, t[0] = (i * P - h * j + c * z) * S, t[1] = (h * R - o * P - c * w) * S, t[2] = (o * j - i * R + c * A) * S, t[3] = (e * j - r * P - u * z) * S, t[4] = (a * P - e * R + u * w) * S, t[5] = (r * R - a * j - u * A) * S, t[6] = (b * _ - m * g + d * q) * S, t[7] = (m * y - v * _ - d * x) * S, t[8] = (v * g - b * y + d * p) * S, t) : null;
    },
    projection: function projection(t, n, a) {
      return t[0] = 2 / n, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = -2 / a, t[5] = 0, t[6] = -1, t[7] = 1, t[8] = 1, t;
    },
    str: function str(t) {
      return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
    },
    frob: function frob(t) {
      return Math.hypot(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t[3] = n[3] + a[3], t[4] = n[4] + a[4], t[5] = n[5] + a[5], t[6] = n[6] + a[6], t[7] = n[7] + a[7], t[8] = n[8] + a[8], t;
    },
    subtract: d,
    multiplyScalar: function multiplyScalar(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t[3] = n[3] * a, t[4] = n[4] * a, t[5] = n[5] * a, t[6] = n[6] * a, t[7] = n[7] * a, t[8] = n[8] * a, t;
    },
    multiplyScalarAndAdd: function multiplyScalarAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t[2] = n[2] + a[2] * r, t[3] = n[3] + a[3] * r, t[4] = n[4] + a[4] * r, t[5] = n[5] + a[5] * r, t[6] = n[6] + a[6] * r, t[7] = n[7] + a[7] * r, t[8] = n[8] + a[8] * r, t;
    },
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3] && t[4] === n[4] && t[5] === n[5] && t[6] === n[6] && t[7] === n[7] && t[8] === n[8];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = t[3],
          o = t[4],
          i = t[5],
          h = t[6],
          c = t[7],
          s = t[8],
          M = n[0],
          f = n[1],
          l = n[2],
          v = n[3],
          b = n[4],
          m = n[5],
          d = n[6],
          p = n[7],
          x = n[8];
      return Math.abs(a - M) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(M)) && Math.abs(r - f) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(e - l) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(u - v) <= 1e-6 * Math.max(1, Math.abs(u), Math.abs(v)) && Math.abs(o - b) <= 1e-6 * Math.max(1, Math.abs(o), Math.abs(b)) && Math.abs(i - m) <= 1e-6 * Math.max(1, Math.abs(i), Math.abs(m)) && Math.abs(h - d) <= 1e-6 * Math.max(1, Math.abs(h), Math.abs(d)) && Math.abs(c - p) <= 1e-6 * Math.max(1, Math.abs(c), Math.abs(p)) && Math.abs(s - x) <= 1e-6 * Math.max(1, Math.abs(s), Math.abs(x));
    },
    mul: p,
    sub: x
  });

  function q(t) {
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
  }

  function g(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = n[4],
        h = n[5],
        c = n[6],
        s = n[7],
        M = n[8],
        f = n[9],
        l = n[10],
        v = n[11],
        b = n[12],
        m = n[13],
        d = n[14],
        p = n[15],
        x = a[0],
        y = a[1],
        q = a[2],
        g = a[3];
    return t[0] = x * r + y * i + q * M + g * b, t[1] = x * e + y * h + q * f + g * m, t[2] = x * u + y * c + q * l + g * d, t[3] = x * o + y * s + q * v + g * p, x = a[4], y = a[5], q = a[6], g = a[7], t[4] = x * r + y * i + q * M + g * b, t[5] = x * e + y * h + q * f + g * m, t[6] = x * u + y * c + q * l + g * d, t[7] = x * o + y * s + q * v + g * p, x = a[8], y = a[9], q = a[10], g = a[11], t[8] = x * r + y * i + q * M + g * b, t[9] = x * e + y * h + q * f + g * m, t[10] = x * u + y * c + q * l + g * d, t[11] = x * o + y * s + q * v + g * p, x = a[12], y = a[13], q = a[14], g = a[15], t[12] = x * r + y * i + q * M + g * b, t[13] = x * e + y * h + q * f + g * m, t[14] = x * u + y * c + q * l + g * d, t[15] = x * o + y * s + q * v + g * p, t;
  }

  function _(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = r + r,
        h = e + e,
        c = u + u,
        s = r * i,
        M = r * h,
        f = r * c,
        l = e * h,
        v = e * c,
        b = u * c,
        m = o * i,
        d = o * h,
        p = o * c;
    return t[0] = 1 - (l + b), t[1] = M + p, t[2] = f - d, t[3] = 0, t[4] = M - p, t[5] = 1 - (s + b), t[6] = v + m, t[7] = 0, t[8] = f + d, t[9] = v - m, t[10] = 1 - (s + l), t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
  }

  function A(t, n) {
    return t[0] = n[12], t[1] = n[13], t[2] = n[14], t;
  }

  function w(t, n) {
    var a = n[0],
        r = n[1],
        e = n[2],
        u = n[4],
        o = n[5],
        i = n[6],
        h = n[8],
        c = n[9],
        s = n[10];
    return t[0] = Math.hypot(a, r, e), t[1] = Math.hypot(u, o, i), t[2] = Math.hypot(h, c, s), t;
  }

  function R(t, a) {
    var r = new n(3);
    w(r, a);
    var e = 1 / r[0],
        u = 1 / r[1],
        o = 1 / r[2],
        i = a[0] * e,
        h = a[1] * u,
        c = a[2] * o,
        s = a[4] * e,
        M = a[5] * u,
        f = a[6] * o,
        l = a[8] * e,
        v = a[9] * u,
        b = a[10] * o,
        m = i + M + b,
        d = 0;
    return m > 0 ? (d = 2 * Math.sqrt(m + 1), t[3] = .25 * d, t[0] = (f - v) / d, t[1] = (l - c) / d, t[2] = (h - s) / d) : i > M && i > b ? (d = 2 * Math.sqrt(1 + i - M - b), t[3] = (f - v) / d, t[0] = .25 * d, t[1] = (h + s) / d, t[2] = (l + c) / d) : M > b ? (d = 2 * Math.sqrt(1 + M - i - b), t[3] = (l - c) / d, t[0] = (h + s) / d, t[1] = .25 * d, t[2] = (f + v) / d) : (d = 2 * Math.sqrt(1 + b - i - M), t[3] = (h - s) / d, t[0] = (l + c) / d, t[1] = (f + v) / d, t[2] = .25 * d), t;
  }

  function z(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t[2] = n[2] - a[2], t[3] = n[3] - a[3], t[4] = n[4] - a[4], t[5] = n[5] - a[5], t[6] = n[6] - a[6], t[7] = n[7] - a[7], t[8] = n[8] - a[8], t[9] = n[9] - a[9], t[10] = n[10] - a[10], t[11] = n[11] - a[11], t[12] = n[12] - a[12], t[13] = n[13] - a[13], t[14] = n[14] - a[14], t[15] = n[15] - a[15], t;
  }

  var j = g,
      P = z,
      S = Object.freeze({
    __proto__: null,
    create: function create() {
      var t = new n(16);
      return n != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
    },
    clone: function clone(t) {
      var a = new n(16);
      return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a;
    },
    copy: function copy(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], t;
    },
    fromValues: function fromValues(t, a, r, e, u, o, i, h, c, s, M, f, l, v, b, m) {
      var d = new n(16);
      return d[0] = t, d[1] = a, d[2] = r, d[3] = e, d[4] = u, d[5] = o, d[6] = i, d[7] = h, d[8] = c, d[9] = s, d[10] = M, d[11] = f, d[12] = l, d[13] = v, d[14] = b, d[15] = m, d;
    },
    set: function set(t, n, a, r, e, u, o, i, h, c, s, M, f, l, v, b, m) {
      return t[0] = n, t[1] = a, t[2] = r, t[3] = e, t[4] = u, t[5] = o, t[6] = i, t[7] = h, t[8] = c, t[9] = s, t[10] = M, t[11] = f, t[12] = l, t[13] = v, t[14] = b, t[15] = m, t;
    },
    identity: q,
    transpose: function transpose(t, n) {
      if (t === n) {
        var a = n[1],
            r = n[2],
            e = n[3],
            u = n[6],
            o = n[7],
            i = n[11];
        t[1] = n[4], t[2] = n[8], t[3] = n[12], t[4] = a, t[6] = n[9], t[7] = n[13], t[8] = r, t[9] = u, t[11] = n[14], t[12] = e, t[13] = o, t[14] = i;
      } else t[0] = n[0], t[1] = n[4], t[2] = n[8], t[3] = n[12], t[4] = n[1], t[5] = n[5], t[6] = n[9], t[7] = n[13], t[8] = n[2], t[9] = n[6], t[10] = n[10], t[11] = n[14], t[12] = n[3], t[13] = n[7], t[14] = n[11], t[15] = n[15];

      return t;
    },
    invert: function invert(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = n[4],
          i = n[5],
          h = n[6],
          c = n[7],
          s = n[8],
          M = n[9],
          f = n[10],
          l = n[11],
          v = n[12],
          b = n[13],
          m = n[14],
          d = n[15],
          p = a * i - r * o,
          x = a * h - e * o,
          y = a * c - u * o,
          q = r * h - e * i,
          g = r * c - u * i,
          _ = e * c - u * h,
          A = s * b - M * v,
          w = s * m - f * v,
          R = s * d - l * v,
          z = M * m - f * b,
          j = M * d - l * b,
          P = f * d - l * m,
          S = p * P - x * j + y * z + q * R - g * w + _ * A;

      return S ? (S = 1 / S, t[0] = (i * P - h * j + c * z) * S, t[1] = (e * j - r * P - u * z) * S, t[2] = (b * _ - m * g + d * q) * S, t[3] = (f * g - M * _ - l * q) * S, t[4] = (h * R - o * P - c * w) * S, t[5] = (a * P - e * R + u * w) * S, t[6] = (m * y - v * _ - d * x) * S, t[7] = (s * _ - f * y + l * x) * S, t[8] = (o * j - i * R + c * A) * S, t[9] = (r * R - a * j - u * A) * S, t[10] = (v * g - b * y + d * p) * S, t[11] = (M * y - s * g - l * p) * S, t[12] = (i * w - o * z - h * A) * S, t[13] = (a * z - r * w + e * A) * S, t[14] = (b * x - v * q - m * p) * S, t[15] = (s * q - M * x + f * p) * S, t) : null;
    },
    adjoint: function adjoint(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = n[4],
          i = n[5],
          h = n[6],
          c = n[7],
          s = n[8],
          M = n[9],
          f = n[10],
          l = n[11],
          v = n[12],
          b = n[13],
          m = n[14],
          d = n[15];
      return t[0] = i * (f * d - l * m) - M * (h * d - c * m) + b * (h * l - c * f), t[1] = -(r * (f * d - l * m) - M * (e * d - u * m) + b * (e * l - u * f)), t[2] = r * (h * d - c * m) - i * (e * d - u * m) + b * (e * c - u * h), t[3] = -(r * (h * l - c * f) - i * (e * l - u * f) + M * (e * c - u * h)), t[4] = -(o * (f * d - l * m) - s * (h * d - c * m) + v * (h * l - c * f)), t[5] = a * (f * d - l * m) - s * (e * d - u * m) + v * (e * l - u * f), t[6] = -(a * (h * d - c * m) - o * (e * d - u * m) + v * (e * c - u * h)), t[7] = a * (h * l - c * f) - o * (e * l - u * f) + s * (e * c - u * h), t[8] = o * (M * d - l * b) - s * (i * d - c * b) + v * (i * l - c * M), t[9] = -(a * (M * d - l * b) - s * (r * d - u * b) + v * (r * l - u * M)), t[10] = a * (i * d - c * b) - o * (r * d - u * b) + v * (r * c - u * i), t[11] = -(a * (i * l - c * M) - o * (r * l - u * M) + s * (r * c - u * i)), t[12] = -(o * (M * m - f * b) - s * (i * m - h * b) + v * (i * f - h * M)), t[13] = a * (M * m - f * b) - s * (r * m - e * b) + v * (r * f - e * M), t[14] = -(a * (i * m - h * b) - o * (r * m - e * b) + v * (r * h - e * i)), t[15] = a * (i * f - h * M) - o * (r * f - e * M) + s * (r * h - e * i), t;
    },
    determinant: function determinant(t) {
      var n = t[0],
          a = t[1],
          r = t[2],
          e = t[3],
          u = t[4],
          o = t[5],
          i = t[6],
          h = t[7],
          c = t[8],
          s = t[9],
          M = t[10],
          f = t[11],
          l = t[12],
          v = t[13],
          b = t[14],
          m = t[15];
      return (n * o - a * u) * (M * m - f * b) - (n * i - r * u) * (s * m - f * v) + (n * h - e * u) * (s * b - M * v) + (a * i - r * o) * (c * m - f * l) - (a * h - e * o) * (c * b - M * l) + (r * h - e * i) * (c * v - s * l);
    },
    multiply: g,
    translate: function translate(t, n, a) {
      var r,
          e,
          u,
          o,
          i,
          h,
          c,
          s,
          M,
          f,
          l,
          v,
          b = a[0],
          m = a[1],
          d = a[2];
      return n === t ? (t[12] = n[0] * b + n[4] * m + n[8] * d + n[12], t[13] = n[1] * b + n[5] * m + n[9] * d + n[13], t[14] = n[2] * b + n[6] * m + n[10] * d + n[14], t[15] = n[3] * b + n[7] * m + n[11] * d + n[15]) : (r = n[0], e = n[1], u = n[2], o = n[3], i = n[4], h = n[5], c = n[6], s = n[7], M = n[8], f = n[9], l = n[10], v = n[11], t[0] = r, t[1] = e, t[2] = u, t[3] = o, t[4] = i, t[5] = h, t[6] = c, t[7] = s, t[8] = M, t[9] = f, t[10] = l, t[11] = v, t[12] = r * b + i * m + M * d + n[12], t[13] = e * b + h * m + f * d + n[13], t[14] = u * b + c * m + l * d + n[14], t[15] = o * b + s * m + v * d + n[15]), t;
    },
    scale: function scale(t, n, a) {
      var r = a[0],
          e = a[1],
          u = a[2];
      return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = n[3] * r, t[4] = n[4] * e, t[5] = n[5] * e, t[6] = n[6] * e, t[7] = n[7] * e, t[8] = n[8] * u, t[9] = n[9] * u, t[10] = n[10] * u, t[11] = n[11] * u, t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], t;
    },
    rotate: function rotate(t, n, a, r) {
      var e,
          u,
          o,
          i,
          h,
          c,
          s,
          M,
          f,
          l,
          v,
          b,
          m,
          d,
          p,
          x,
          y,
          q,
          g,
          _,
          A,
          w,
          R,
          z,
          j = r[0],
          P = r[1],
          S = r[2],
          E = Math.hypot(j, P, S);

      return E < 1e-6 ? null : (j *= E = 1 / E, P *= E, S *= E, e = Math.sin(a), o = 1 - (u = Math.cos(a)), i = n[0], h = n[1], c = n[2], s = n[3], M = n[4], f = n[5], l = n[6], v = n[7], b = n[8], m = n[9], d = n[10], p = n[11], x = j * j * o + u, y = P * j * o + S * e, q = S * j * o - P * e, g = j * P * o - S * e, _ = P * P * o + u, A = S * P * o + j * e, w = j * S * o + P * e, R = P * S * o - j * e, z = S * S * o + u, t[0] = i * x + M * y + b * q, t[1] = h * x + f * y + m * q, t[2] = c * x + l * y + d * q, t[3] = s * x + v * y + p * q, t[4] = i * g + M * _ + b * A, t[5] = h * g + f * _ + m * A, t[6] = c * g + l * _ + d * A, t[7] = s * g + v * _ + p * A, t[8] = i * w + M * R + b * z, t[9] = h * w + f * R + m * z, t[10] = c * w + l * R + d * z, t[11] = s * w + v * R + p * z, n !== t && (t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15]), t);
    },
    rotateX: function rotateX(t, n, a) {
      var r = Math.sin(a),
          e = Math.cos(a),
          u = n[4],
          o = n[5],
          i = n[6],
          h = n[7],
          c = n[8],
          s = n[9],
          M = n[10],
          f = n[11];
      return n !== t && (t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15]), t[4] = u * e + c * r, t[5] = o * e + s * r, t[6] = i * e + M * r, t[7] = h * e + f * r, t[8] = c * e - u * r, t[9] = s * e - o * r, t[10] = M * e - i * r, t[11] = f * e - h * r, t;
    },
    rotateY: function rotateY(t, n, a) {
      var r = Math.sin(a),
          e = Math.cos(a),
          u = n[0],
          o = n[1],
          i = n[2],
          h = n[3],
          c = n[8],
          s = n[9],
          M = n[10],
          f = n[11];
      return n !== t && (t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15]), t[0] = u * e - c * r, t[1] = o * e - s * r, t[2] = i * e - M * r, t[3] = h * e - f * r, t[8] = u * r + c * e, t[9] = o * r + s * e, t[10] = i * r + M * e, t[11] = h * r + f * e, t;
    },
    rotateZ: function rotateZ(t, n, a) {
      var r = Math.sin(a),
          e = Math.cos(a),
          u = n[0],
          o = n[1],
          i = n[2],
          h = n[3],
          c = n[4],
          s = n[5],
          M = n[6],
          f = n[7];
      return n !== t && (t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15]), t[0] = u * e + c * r, t[1] = o * e + s * r, t[2] = i * e + M * r, t[3] = h * e + f * r, t[4] = c * e - u * r, t[5] = s * e - o * r, t[6] = M * e - i * r, t[7] = f * e - h * r, t;
    },
    fromTranslation: function fromTranslation(t, n) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t;
    },
    fromScaling: function fromScaling(t, n) {
      return t[0] = n[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = n[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = n[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    },
    fromRotation: function fromRotation(t, n, a) {
      var r,
          e,
          u,
          o = a[0],
          i = a[1],
          h = a[2],
          c = Math.hypot(o, i, h);
      return c < 1e-6 ? null : (o *= c = 1 / c, i *= c, h *= c, r = Math.sin(n), u = 1 - (e = Math.cos(n)), t[0] = o * o * u + e, t[1] = i * o * u + h * r, t[2] = h * o * u - i * r, t[3] = 0, t[4] = o * i * u - h * r, t[5] = i * i * u + e, t[6] = h * i * u + o * r, t[7] = 0, t[8] = o * h * u + i * r, t[9] = i * h * u - o * r, t[10] = h * h * u + e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
    },
    fromXRotation: function fromXRotation(t, n) {
      var a = Math.sin(n),
          r = Math.cos(n);
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = r, t[6] = a, t[7] = 0, t[8] = 0, t[9] = -a, t[10] = r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    },
    fromYRotation: function fromYRotation(t, n) {
      var a = Math.sin(n),
          r = Math.cos(n);
      return t[0] = r, t[1] = 0, t[2] = -a, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = a, t[9] = 0, t[10] = r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    },
    fromZRotation: function fromZRotation(t, n) {
      var a = Math.sin(n),
          r = Math.cos(n);
      return t[0] = r, t[1] = a, t[2] = 0, t[3] = 0, t[4] = -a, t[5] = r, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    },
    fromRotationTranslation: _,
    fromQuat2: function fromQuat2(t, a) {
      var r = new n(3),
          e = -a[0],
          u = -a[1],
          o = -a[2],
          i = a[3],
          h = a[4],
          c = a[5],
          s = a[6],
          M = a[7],
          f = e * e + u * u + o * o + i * i;
      return f > 0 ? (r[0] = 2 * (h * i + M * e + c * o - s * u) / f, r[1] = 2 * (c * i + M * u + s * e - h * o) / f, r[2] = 2 * (s * i + M * o + h * u - c * e) / f) : (r[0] = 2 * (h * i + M * e + c * o - s * u), r[1] = 2 * (c * i + M * u + s * e - h * o), r[2] = 2 * (s * i + M * o + h * u - c * e)), _(t, a, r), t;
    },
    getTranslation: A,
    getScaling: w,
    getRotation: R,
    fromRotationTranslationScale: function fromRotationTranslationScale(t, n, a, r) {
      var e = n[0],
          u = n[1],
          o = n[2],
          i = n[3],
          h = e + e,
          c = u + u,
          s = o + o,
          M = e * h,
          f = e * c,
          l = e * s,
          v = u * c,
          b = u * s,
          m = o * s,
          d = i * h,
          p = i * c,
          x = i * s,
          y = r[0],
          q = r[1],
          g = r[2];
      return t[0] = (1 - (v + m)) * y, t[1] = (f + x) * y, t[2] = (l - p) * y, t[3] = 0, t[4] = (f - x) * q, t[5] = (1 - (M + m)) * q, t[6] = (b + d) * q, t[7] = 0, t[8] = (l + p) * g, t[9] = (b - d) * g, t[10] = (1 - (M + v)) * g, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
    },
    fromRotationTranslationScaleOrigin: function fromRotationTranslationScaleOrigin(t, n, a, r, e) {
      var u = n[0],
          o = n[1],
          i = n[2],
          h = n[3],
          c = u + u,
          s = o + o,
          M = i + i,
          f = u * c,
          l = u * s,
          v = u * M,
          b = o * s,
          m = o * M,
          d = i * M,
          p = h * c,
          x = h * s,
          y = h * M,
          q = r[0],
          g = r[1],
          _ = r[2],
          A = e[0],
          w = e[1],
          R = e[2],
          z = (1 - (b + d)) * q,
          j = (l + y) * q,
          P = (v - x) * q,
          S = (l - y) * g,
          E = (1 - (f + d)) * g,
          O = (m + p) * g,
          T = (v + x) * _,
          D = (m - p) * _,
          F = (1 - (f + b)) * _;
      return t[0] = z, t[1] = j, t[2] = P, t[3] = 0, t[4] = S, t[5] = E, t[6] = O, t[7] = 0, t[8] = T, t[9] = D, t[10] = F, t[11] = 0, t[12] = a[0] + A - (z * A + S * w + T * R), t[13] = a[1] + w - (j * A + E * w + D * R), t[14] = a[2] + R - (P * A + O * w + F * R), t[15] = 1, t;
    },
    fromQuat: function fromQuat(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = a + a,
          i = r + r,
          h = e + e,
          c = a * o,
          s = r * o,
          M = r * i,
          f = e * o,
          l = e * i,
          v = e * h,
          b = u * o,
          m = u * i,
          d = u * h;
      return t[0] = 1 - M - v, t[1] = s + d, t[2] = f - m, t[3] = 0, t[4] = s - d, t[5] = 1 - c - v, t[6] = l + b, t[7] = 0, t[8] = f + m, t[9] = l - b, t[10] = 1 - c - M, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    },
    frustum: function frustum(t, n, a, r, e, u, o) {
      var i = 1 / (a - n),
          h = 1 / (e - r),
          c = 1 / (u - o);
      return t[0] = 2 * u * i, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * u * h, t[6] = 0, t[7] = 0, t[8] = (a + n) * i, t[9] = (e + r) * h, t[10] = (o + u) * c, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = o * u * 2 * c, t[15] = 0, t;
    },
    perspective: function perspective(t, n, a, r, e) {
      var u,
          o = 1 / Math.tan(n / 2);
      return t[0] = o / a, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = o, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, null != e && e !== 1 / 0 ? (u = 1 / (r - e), t[10] = (e + r) * u, t[14] = 2 * e * r * u) : (t[10] = -1, t[14] = -2 * r), t;
    },
    perspectiveFromFieldOfView: function perspectiveFromFieldOfView(t, n, a, r) {
      var e = Math.tan(n.upDegrees * Math.PI / 180),
          u = Math.tan(n.downDegrees * Math.PI / 180),
          o = Math.tan(n.leftDegrees * Math.PI / 180),
          i = Math.tan(n.rightDegrees * Math.PI / 180),
          h = 2 / (o + i),
          c = 2 / (e + u);
      return t[0] = h, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = c, t[6] = 0, t[7] = 0, t[8] = -(o - i) * h * .5, t[9] = (e - u) * c * .5, t[10] = r / (a - r), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = r * a / (a - r), t[15] = 0, t;
    },
    ortho: function ortho(t, n, a, r, e, u, o) {
      var i = 1 / (n - a),
          h = 1 / (r - e),
          c = 1 / (u - o);
      return t[0] = -2 * i, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * h, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * c, t[11] = 0, t[12] = (n + a) * i, t[13] = (e + r) * h, t[14] = (o + u) * c, t[15] = 1, t;
    },
    lookAt: function lookAt(t, n, a, r) {
      var e,
          u,
          o,
          i,
          h,
          c,
          s,
          M,
          f,
          l,
          v = n[0],
          b = n[1],
          m = n[2],
          d = r[0],
          p = r[1],
          x = r[2],
          y = a[0],
          g = a[1],
          _ = a[2];
      return Math.abs(v - y) < 1e-6 && Math.abs(b - g) < 1e-6 && Math.abs(m - _) < 1e-6 ? q(t) : (s = v - y, M = b - g, f = m - _, e = p * (f *= l = 1 / Math.hypot(s, M, f)) - x * (M *= l), u = x * (s *= l) - d * f, o = d * M - p * s, (l = Math.hypot(e, u, o)) ? (e *= l = 1 / l, u *= l, o *= l) : (e = 0, u = 0, o = 0), i = M * o - f * u, h = f * e - s * o, c = s * u - M * e, (l = Math.hypot(i, h, c)) ? (i *= l = 1 / l, h *= l, c *= l) : (i = 0, h = 0, c = 0), t[0] = e, t[1] = i, t[2] = s, t[3] = 0, t[4] = u, t[5] = h, t[6] = M, t[7] = 0, t[8] = o, t[9] = c, t[10] = f, t[11] = 0, t[12] = -(e * v + u * b + o * m), t[13] = -(i * v + h * b + c * m), t[14] = -(s * v + M * b + f * m), t[15] = 1, t);
    },
    targetTo: function targetTo(t, n, a, r) {
      var e = n[0],
          u = n[1],
          o = n[2],
          i = r[0],
          h = r[1],
          c = r[2],
          s = e - a[0],
          M = u - a[1],
          f = o - a[2],
          l = s * s + M * M + f * f;
      l > 0 && (s *= l = 1 / Math.sqrt(l), M *= l, f *= l);
      var v = h * f - c * M,
          b = c * s - i * f,
          m = i * M - h * s;
      return (l = v * v + b * b + m * m) > 0 && (v *= l = 1 / Math.sqrt(l), b *= l, m *= l), t[0] = v, t[1] = b, t[2] = m, t[3] = 0, t[4] = M * m - f * b, t[5] = f * v - s * m, t[6] = s * b - M * v, t[7] = 0, t[8] = s, t[9] = M, t[10] = f, t[11] = 0, t[12] = e, t[13] = u, t[14] = o, t[15] = 1, t;
    },
    str: function str(t) {
      return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
    },
    frob: function frob(t) {
      return Math.hypot(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t[3] = n[3] + a[3], t[4] = n[4] + a[4], t[5] = n[5] + a[5], t[6] = n[6] + a[6], t[7] = n[7] + a[7], t[8] = n[8] + a[8], t[9] = n[9] + a[9], t[10] = n[10] + a[10], t[11] = n[11] + a[11], t[12] = n[12] + a[12], t[13] = n[13] + a[13], t[14] = n[14] + a[14], t[15] = n[15] + a[15], t;
    },
    subtract: z,
    multiplyScalar: function multiplyScalar(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t[3] = n[3] * a, t[4] = n[4] * a, t[5] = n[5] * a, t[6] = n[6] * a, t[7] = n[7] * a, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = n[11] * a, t[12] = n[12] * a, t[13] = n[13] * a, t[14] = n[14] * a, t[15] = n[15] * a, t;
    },
    multiplyScalarAndAdd: function multiplyScalarAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t[2] = n[2] + a[2] * r, t[3] = n[3] + a[3] * r, t[4] = n[4] + a[4] * r, t[5] = n[5] + a[5] * r, t[6] = n[6] + a[6] * r, t[7] = n[7] + a[7] * r, t[8] = n[8] + a[8] * r, t[9] = n[9] + a[9] * r, t[10] = n[10] + a[10] * r, t[11] = n[11] + a[11] * r, t[12] = n[12] + a[12] * r, t[13] = n[13] + a[13] * r, t[14] = n[14] + a[14] * r, t[15] = n[15] + a[15] * r, t;
    },
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3] && t[4] === n[4] && t[5] === n[5] && t[6] === n[6] && t[7] === n[7] && t[8] === n[8] && t[9] === n[9] && t[10] === n[10] && t[11] === n[11] && t[12] === n[12] && t[13] === n[13] && t[14] === n[14] && t[15] === n[15];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = t[3],
          o = t[4],
          i = t[5],
          h = t[6],
          c = t[7],
          s = t[8],
          M = t[9],
          f = t[10],
          l = t[11],
          v = t[12],
          b = t[13],
          m = t[14],
          d = t[15],
          p = n[0],
          x = n[1],
          y = n[2],
          q = n[3],
          g = n[4],
          _ = n[5],
          A = n[6],
          w = n[7],
          R = n[8],
          z = n[9],
          j = n[10],
          P = n[11],
          S = n[12],
          E = n[13],
          O = n[14],
          T = n[15];
      return Math.abs(a - p) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(r - x) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(x)) && Math.abs(e - y) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(y)) && Math.abs(u - q) <= 1e-6 * Math.max(1, Math.abs(u), Math.abs(q)) && Math.abs(o - g) <= 1e-6 * Math.max(1, Math.abs(o), Math.abs(g)) && Math.abs(i - _) <= 1e-6 * Math.max(1, Math.abs(i), Math.abs(_)) && Math.abs(h - A) <= 1e-6 * Math.max(1, Math.abs(h), Math.abs(A)) && Math.abs(c - w) <= 1e-6 * Math.max(1, Math.abs(c), Math.abs(w)) && Math.abs(s - R) <= 1e-6 * Math.max(1, Math.abs(s), Math.abs(R)) && Math.abs(M - z) <= 1e-6 * Math.max(1, Math.abs(M), Math.abs(z)) && Math.abs(f - j) <= 1e-6 * Math.max(1, Math.abs(f), Math.abs(j)) && Math.abs(l - P) <= 1e-6 * Math.max(1, Math.abs(l), Math.abs(P)) && Math.abs(v - S) <= 1e-6 * Math.max(1, Math.abs(v), Math.abs(S)) && Math.abs(b - E) <= 1e-6 * Math.max(1, Math.abs(b), Math.abs(E)) && Math.abs(m - O) <= 1e-6 * Math.max(1, Math.abs(m), Math.abs(O)) && Math.abs(d - T) <= 1e-6 * Math.max(1, Math.abs(d), Math.abs(T));
    },
    mul: j,
    sub: P
  });

  function E() {
    var t = new n(3);
    return n != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
  }

  function O(t) {
    var n = t[0],
        a = t[1],
        r = t[2];
    return Math.hypot(n, a, r);
  }

  function T(t, a, r) {
    var e = new n(3);
    return e[0] = t, e[1] = a, e[2] = r, e;
  }

  function D(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t[2] = n[2] - a[2], t;
  }

  function F(t, n, a) {
    return t[0] = n[0] * a[0], t[1] = n[1] * a[1], t[2] = n[2] * a[2], t;
  }

  function I(t, n, a) {
    return t[0] = n[0] / a[0], t[1] = n[1] / a[1], t[2] = n[2] / a[2], t;
  }

  function L(t, n) {
    var a = n[0] - t[0],
        r = n[1] - t[1],
        e = n[2] - t[2];
    return Math.hypot(a, r, e);
  }

  function V(t, n) {
    var a = n[0] - t[0],
        r = n[1] - t[1],
        e = n[2] - t[2];
    return a * a + r * r + e * e;
  }

  function Q(t) {
    var n = t[0],
        a = t[1],
        r = t[2];
    return n * n + a * a + r * r;
  }

  function Y(t, n) {
    var a = n[0],
        r = n[1],
        e = n[2],
        u = a * a + r * r + e * e;
    return u > 0 && (u = 1 / Math.sqrt(u)), t[0] = n[0] * u, t[1] = n[1] * u, t[2] = n[2] * u, t;
  }

  function X(t, n) {
    return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
  }

  function Z(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = a[0],
        i = a[1],
        h = a[2];
    return t[0] = e * h - u * i, t[1] = u * o - r * h, t[2] = r * i - e * o, t;
  }

  var B,
      N = D,
      k = F,
      U = I,
      W = L,
      C = V,
      G = O,
      H = Q,
      J = (B = E(), function (t, n, a, r, e, u) {
    var o, i;

    for (n || (n = 3), a || (a = 0), i = r ? Math.min(r * n + a, t.length) : t.length, o = a; o < i; o += n) {
      B[0] = t[o], B[1] = t[o + 1], B[2] = t[o + 2], e(B, B, u), t[o] = B[0], t[o + 1] = B[1], t[o + 2] = B[2];
    }

    return t;
  }),
      K = Object.freeze({
    __proto__: null,
    create: E,
    clone: function clone(t) {
      var a = new n(3);
      return a[0] = t[0], a[1] = t[1], a[2] = t[2], a;
    },
    length: O,
    fromValues: T,
    copy: function copy(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t;
    },
    set: function set(t, n, a, r) {
      return t[0] = n, t[1] = a, t[2] = r, t;
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t;
    },
    subtract: D,
    multiply: F,
    divide: I,
    ceil: function ceil(t, n) {
      return t[0] = Math.ceil(n[0]), t[1] = Math.ceil(n[1]), t[2] = Math.ceil(n[2]), t;
    },
    floor: function floor(t, n) {
      return t[0] = Math.floor(n[0]), t[1] = Math.floor(n[1]), t[2] = Math.floor(n[2]), t;
    },
    min: function min(t, n, a) {
      return t[0] = Math.min(n[0], a[0]), t[1] = Math.min(n[1], a[1]), t[2] = Math.min(n[2], a[2]), t;
    },
    max: function max(t, n, a) {
      return t[0] = Math.max(n[0], a[0]), t[1] = Math.max(n[1], a[1]), t[2] = Math.max(n[2], a[2]), t;
    },
    round: function round(t, n) {
      return t[0] = Math.round(n[0]), t[1] = Math.round(n[1]), t[2] = Math.round(n[2]), t;
    },
    scale: function scale(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t;
    },
    scaleAndAdd: function scaleAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t[2] = n[2] + a[2] * r, t;
    },
    distance: L,
    squaredDistance: V,
    squaredLength: Q,
    negate: function negate(t, n) {
      return t[0] = -n[0], t[1] = -n[1], t[2] = -n[2], t;
    },
    inverse: function inverse(t, n) {
      return t[0] = 1 / n[0], t[1] = 1 / n[1], t[2] = 1 / n[2], t;
    },
    normalize: Y,
    dot: X,
    cross: Z,
    lerp: function lerp(t, n, a, r) {
      var e = n[0],
          u = n[1],
          o = n[2];
      return t[0] = e + r * (a[0] - e), t[1] = u + r * (a[1] - u), t[2] = o + r * (a[2] - o), t;
    },
    hermite: function hermite(t, n, a, r, e, u) {
      var o = u * u,
          i = o * (2 * u - 3) + 1,
          h = o * (u - 2) + u,
          c = o * (u - 1),
          s = o * (3 - 2 * u);
      return t[0] = n[0] * i + a[0] * h + r[0] * c + e[0] * s, t[1] = n[1] * i + a[1] * h + r[1] * c + e[1] * s, t[2] = n[2] * i + a[2] * h + r[2] * c + e[2] * s, t;
    },
    bezier: function bezier(t, n, a, r, e, u) {
      var o = 1 - u,
          i = o * o,
          h = u * u,
          c = i * o,
          s = 3 * u * i,
          M = 3 * h * o,
          f = h * u;
      return t[0] = n[0] * c + a[0] * s + r[0] * M + e[0] * f, t[1] = n[1] * c + a[1] * s + r[1] * M + e[1] * f, t[2] = n[2] * c + a[2] * s + r[2] * M + e[2] * f, t;
    },
    random: function random(t, n) {
      n = n || 1;
      var r = 2 * a() * Math.PI,
          e = 2 * a() - 1,
          u = Math.sqrt(1 - e * e) * n;
      return t[0] = Math.cos(r) * u, t[1] = Math.sin(r) * u, t[2] = e * n, t;
    },
    transformMat4: function transformMat4(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = a[3] * r + a[7] * e + a[11] * u + a[15];
      return o = o || 1, t[0] = (a[0] * r + a[4] * e + a[8] * u + a[12]) / o, t[1] = (a[1] * r + a[5] * e + a[9] * u + a[13]) / o, t[2] = (a[2] * r + a[6] * e + a[10] * u + a[14]) / o, t;
    },
    transformMat3: function transformMat3(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2];
      return t[0] = r * a[0] + e * a[3] + u * a[6], t[1] = r * a[1] + e * a[4] + u * a[7], t[2] = r * a[2] + e * a[5] + u * a[8], t;
    },
    transformQuat: function transformQuat(t, n, a) {
      var r = a[0],
          e = a[1],
          u = a[2],
          o = a[3],
          i = n[0],
          h = n[1],
          c = n[2],
          s = e * c - u * h,
          M = u * i - r * c,
          f = r * h - e * i,
          l = e * f - u * M,
          v = u * s - r * f,
          b = r * M - e * s,
          m = 2 * o;
      return s *= m, M *= m, f *= m, l *= 2, v *= 2, b *= 2, t[0] = i + s + l, t[1] = h + M + v, t[2] = c + f + b, t;
    },
    rotateX: function rotateX(t, n, a, r) {
      var e = [],
          u = [];
      return e[0] = n[0] - a[0], e[1] = n[1] - a[1], e[2] = n[2] - a[2], u[0] = e[0], u[1] = e[1] * Math.cos(r) - e[2] * Math.sin(r), u[2] = e[1] * Math.sin(r) + e[2] * Math.cos(r), t[0] = u[0] + a[0], t[1] = u[1] + a[1], t[2] = u[2] + a[2], t;
    },
    rotateY: function rotateY(t, n, a, r) {
      var e = [],
          u = [];
      return e[0] = n[0] - a[0], e[1] = n[1] - a[1], e[2] = n[2] - a[2], u[0] = e[2] * Math.sin(r) + e[0] * Math.cos(r), u[1] = e[1], u[2] = e[2] * Math.cos(r) - e[0] * Math.sin(r), t[0] = u[0] + a[0], t[1] = u[1] + a[1], t[2] = u[2] + a[2], t;
    },
    rotateZ: function rotateZ(t, n, a, r) {
      var e = [],
          u = [];
      return e[0] = n[0] - a[0], e[1] = n[1] - a[1], e[2] = n[2] - a[2], u[0] = e[0] * Math.cos(r) - e[1] * Math.sin(r), u[1] = e[0] * Math.sin(r) + e[1] * Math.cos(r), u[2] = e[2], t[0] = u[0] + a[0], t[1] = u[1] + a[1], t[2] = u[2] + a[2], t;
    },
    angle: function angle(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = n[0],
          o = n[1],
          i = n[2],
          h = Math.sqrt(a * a + r * r + e * e) * Math.sqrt(u * u + o * o + i * i),
          c = h && X(t, n) / h;
      return Math.acos(Math.min(Math.max(c, -1), 1));
    },
    zero: function zero(t) {
      return t[0] = 0, t[1] = 0, t[2] = 0, t;
    },
    str: function str(t) {
      return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
    },
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1] && t[2] === n[2];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = n[0],
          o = n[1],
          i = n[2];
      return Math.abs(a - u) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(u)) && Math.abs(r - o) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(o)) && Math.abs(e - i) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(i));
    },
    sub: N,
    mul: k,
    div: U,
    dist: W,
    sqrDist: C,
    len: G,
    sqrLen: H,
    forEach: J
  });

  function $() {
    var t = new n(4);
    return n != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
  }

  function tt(t) {
    var a = new n(4);
    return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
  }

  function nt(t, a, r, e) {
    var u = new n(4);
    return u[0] = t, u[1] = a, u[2] = r, u[3] = e, u;
  }

  function at(t, n) {
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t;
  }

  function rt(t, n, a, r, e) {
    return t[0] = n, t[1] = a, t[2] = r, t[3] = e, t;
  }

  function et(t, n, a) {
    return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t[3] = n[3] + a[3], t;
  }

  function ut(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t[2] = n[2] - a[2], t[3] = n[3] - a[3], t;
  }

  function ot(t, n, a) {
    return t[0] = n[0] * a[0], t[1] = n[1] * a[1], t[2] = n[2] * a[2], t[3] = n[3] * a[3], t;
  }

  function it(t, n, a) {
    return t[0] = n[0] / a[0], t[1] = n[1] / a[1], t[2] = n[2] / a[2], t[3] = n[3] / a[3], t;
  }

  function ht(t, n, a) {
    return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t[3] = n[3] * a, t;
  }

  function ct(t, n) {
    var a = n[0] - t[0],
        r = n[1] - t[1],
        e = n[2] - t[2],
        u = n[3] - t[3];
    return Math.hypot(a, r, e, u);
  }

  function st(t, n) {
    var a = n[0] - t[0],
        r = n[1] - t[1],
        e = n[2] - t[2],
        u = n[3] - t[3];
    return a * a + r * r + e * e + u * u;
  }

  function Mt(t) {
    var n = t[0],
        a = t[1],
        r = t[2],
        e = t[3];
    return Math.hypot(n, a, r, e);
  }

  function ft(t) {
    var n = t[0],
        a = t[1],
        r = t[2],
        e = t[3];
    return n * n + a * a + r * r + e * e;
  }

  function lt(t, n) {
    var a = n[0],
        r = n[1],
        e = n[2],
        u = n[3],
        o = a * a + r * r + e * e + u * u;
    return o > 0 && (o = 1 / Math.sqrt(o)), t[0] = a * o, t[1] = r * o, t[2] = e * o, t[3] = u * o, t;
  }

  function vt(t, n) {
    return t[0] * n[0] + t[1] * n[1] + t[2] * n[2] + t[3] * n[3];
  }

  function bt(t, n, a, r) {
    var e = n[0],
        u = n[1],
        o = n[2],
        i = n[3];
    return t[0] = e + r * (a[0] - e), t[1] = u + r * (a[1] - u), t[2] = o + r * (a[2] - o), t[3] = i + r * (a[3] - i), t;
  }

  function mt(t, n) {
    return t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3];
  }

  function dt(t, n) {
    var a = t[0],
        r = t[1],
        e = t[2],
        u = t[3],
        o = n[0],
        i = n[1],
        h = n[2],
        c = n[3];
    return Math.abs(a - o) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(o)) && Math.abs(r - i) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(i)) && Math.abs(e - h) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(h)) && Math.abs(u - c) <= 1e-6 * Math.max(1, Math.abs(u), Math.abs(c));
  }

  var pt = ut,
      xt = ot,
      yt = it,
      qt = ct,
      gt = st,
      _t = Mt,
      At = ft,
      wt = function () {
    var t = $();
    return function (n, a, r, e, u, o) {
      var i, h;

      for (a || (a = 4), r || (r = 0), h = e ? Math.min(e * a + r, n.length) : n.length, i = r; i < h; i += a) {
        t[0] = n[i], t[1] = n[i + 1], t[2] = n[i + 2], t[3] = n[i + 3], u(t, t, o), n[i] = t[0], n[i + 1] = t[1], n[i + 2] = t[2], n[i + 3] = t[3];
      }

      return n;
    };
  }(),
      Rt = Object.freeze({
    __proto__: null,
    create: $,
    clone: tt,
    fromValues: nt,
    copy: at,
    set: rt,
    add: et,
    subtract: ut,
    multiply: ot,
    divide: it,
    ceil: function ceil(t, n) {
      return t[0] = Math.ceil(n[0]), t[1] = Math.ceil(n[1]), t[2] = Math.ceil(n[2]), t[3] = Math.ceil(n[3]), t;
    },
    floor: function floor(t, n) {
      return t[0] = Math.floor(n[0]), t[1] = Math.floor(n[1]), t[2] = Math.floor(n[2]), t[3] = Math.floor(n[3]), t;
    },
    min: function min(t, n, a) {
      return t[0] = Math.min(n[0], a[0]), t[1] = Math.min(n[1], a[1]), t[2] = Math.min(n[2], a[2]), t[3] = Math.min(n[3], a[3]), t;
    },
    max: function max(t, n, a) {
      return t[0] = Math.max(n[0], a[0]), t[1] = Math.max(n[1], a[1]), t[2] = Math.max(n[2], a[2]), t[3] = Math.max(n[3], a[3]), t;
    },
    round: function round(t, n) {
      return t[0] = Math.round(n[0]), t[1] = Math.round(n[1]), t[2] = Math.round(n[2]), t[3] = Math.round(n[3]), t;
    },
    scale: ht,
    scaleAndAdd: function scaleAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t[2] = n[2] + a[2] * r, t[3] = n[3] + a[3] * r, t;
    },
    distance: ct,
    squaredDistance: st,
    length: Mt,
    squaredLength: ft,
    negate: function negate(t, n) {
      return t[0] = -n[0], t[1] = -n[1], t[2] = -n[2], t[3] = -n[3], t;
    },
    inverse: function inverse(t, n) {
      return t[0] = 1 / n[0], t[1] = 1 / n[1], t[2] = 1 / n[2], t[3] = 1 / n[3], t;
    },
    normalize: lt,
    dot: vt,
    cross: function cross(t, n, a, r) {
      var e = a[0] * r[1] - a[1] * r[0],
          u = a[0] * r[2] - a[2] * r[0],
          o = a[0] * r[3] - a[3] * r[0],
          i = a[1] * r[2] - a[2] * r[1],
          h = a[1] * r[3] - a[3] * r[1],
          c = a[2] * r[3] - a[3] * r[2],
          s = n[0],
          M = n[1],
          f = n[2],
          l = n[3];
      return t[0] = M * c - f * h + l * i, t[1] = -s * c + f * o - l * u, t[2] = s * h - M * o + l * e, t[3] = -s * i + M * u - f * e, t;
    },
    lerp: bt,
    random: function random(t, n) {
      var r, e, u, o, i, h;
      n = n || 1;

      do {
        i = (r = 2 * a() - 1) * r + (e = 2 * a() - 1) * e;
      } while (i >= 1);

      do {
        h = (u = 2 * a() - 1) * u + (o = 2 * a() - 1) * o;
      } while (h >= 1);

      var c = Math.sqrt((1 - i) / h);
      return t[0] = n * r, t[1] = n * e, t[2] = n * u * c, t[3] = n * o * c, t;
    },
    transformMat4: function transformMat4(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3];
      return t[0] = a[0] * r + a[4] * e + a[8] * u + a[12] * o, t[1] = a[1] * r + a[5] * e + a[9] * u + a[13] * o, t[2] = a[2] * r + a[6] * e + a[10] * u + a[14] * o, t[3] = a[3] * r + a[7] * e + a[11] * u + a[15] * o, t;
    },
    transformQuat: function transformQuat(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = a[0],
          i = a[1],
          h = a[2],
          c = a[3],
          s = c * r + i * u - h * e,
          M = c * e + h * r - o * u,
          f = c * u + o * e - i * r,
          l = -o * r - i * e - h * u;
      return t[0] = s * c + l * -o + M * -h - f * -i, t[1] = M * c + l * -i + f * -o - s * -h, t[2] = f * c + l * -h + s * -i - M * -o, t[3] = n[3], t;
    },
    zero: function zero(t) {
      return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
    },
    str: function str(t) {
      return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
    },
    exactEquals: mt,
    equals: dt,
    sub: pt,
    mul: xt,
    div: yt,
    dist: qt,
    sqrDist: gt,
    len: _t,
    sqrLen: At,
    forEach: wt
  });

  function zt() {
    var t = new n(4);
    return n != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t[3] = 1, t;
  }

  function jt(t, n, a) {
    a *= .5;
    var r = Math.sin(a);
    return t[0] = r * n[0], t[1] = r * n[1], t[2] = r * n[2], t[3] = Math.cos(a), t;
  }

  function Pt(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = a[0],
        h = a[1],
        c = a[2],
        s = a[3];
    return t[0] = r * s + o * i + e * c - u * h, t[1] = e * s + o * h + u * i - r * c, t[2] = u * s + o * c + r * h - e * i, t[3] = o * s - r * i - e * h - u * c, t;
  }

  function St(t, n, a) {
    a *= .5;
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = Math.sin(a),
        h = Math.cos(a);
    return t[0] = r * h + o * i, t[1] = e * h + u * i, t[2] = u * h - e * i, t[3] = o * h - r * i, t;
  }

  function Et(t, n, a) {
    a *= .5;
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = Math.sin(a),
        h = Math.cos(a);
    return t[0] = r * h - u * i, t[1] = e * h + o * i, t[2] = u * h + r * i, t[3] = o * h - e * i, t;
  }

  function Ot(t, n, a) {
    a *= .5;
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = Math.sin(a),
        h = Math.cos(a);
    return t[0] = r * h + e * i, t[1] = e * h - r * i, t[2] = u * h + o * i, t[3] = o * h - u * i, t;
  }

  function Tt(t, n) {
    var a = n[0],
        r = n[1],
        e = n[2],
        u = n[3],
        o = Math.sqrt(a * a + r * r + e * e),
        i = Math.exp(u),
        h = o > 0 ? i * Math.sin(o) / o : 0;
    return t[0] = a * h, t[1] = r * h, t[2] = e * h, t[3] = i * Math.cos(o), t;
  }

  function Dt(t, n) {
    var a = n[0],
        r = n[1],
        e = n[2],
        u = n[3],
        o = Math.sqrt(a * a + r * r + e * e),
        i = o > 0 ? Math.atan2(o, u) / o : 0;
    return t[0] = a * i, t[1] = r * i, t[2] = e * i, t[3] = .5 * Math.log(a * a + r * r + e * e + u * u), t;
  }

  function Ft(t, n, a, r) {
    var e,
        u,
        o,
        i,
        h,
        c = n[0],
        s = n[1],
        M = n[2],
        f = n[3],
        l = a[0],
        v = a[1],
        b = a[2],
        m = a[3];
    return (u = c * l + s * v + M * b + f * m) < 0 && (u = -u, l = -l, v = -v, b = -b, m = -m), 1 - u > 1e-6 ? (e = Math.acos(u), o = Math.sin(e), i = Math.sin((1 - r) * e) / o, h = Math.sin(r * e) / o) : (i = 1 - r, h = r), t[0] = i * c + h * l, t[1] = i * s + h * v, t[2] = i * M + h * b, t[3] = i * f + h * m, t;
  }

  function It(t, n) {
    var a,
        r = n[0] + n[4] + n[8];
    if (r > 0) a = Math.sqrt(r + 1), t[3] = .5 * a, a = .5 / a, t[0] = (n[5] - n[7]) * a, t[1] = (n[6] - n[2]) * a, t[2] = (n[1] - n[3]) * a;else {
      var e = 0;
      n[4] > n[0] && (e = 1), n[8] > n[3 * e + e] && (e = 2);
      var u = (e + 1) % 3,
          o = (e + 2) % 3;
      a = Math.sqrt(n[3 * e + e] - n[3 * u + u] - n[3 * o + o] + 1), t[e] = .5 * a, a = .5 / a, t[3] = (n[3 * u + o] - n[3 * o + u]) * a, t[u] = (n[3 * u + e] + n[3 * e + u]) * a, t[o] = (n[3 * o + e] + n[3 * e + o]) * a;
    }
    return t;
  }

  var Lt,
      Vt,
      Qt,
      Yt,
      Xt,
      Zt,
      Bt = tt,
      Nt = nt,
      kt = at,
      Ut = rt,
      Wt = et,
      Ct = Pt,
      Gt = ht,
      Ht = vt,
      Jt = bt,
      Kt = Mt,
      $t = Kt,
      tn = ft,
      nn = tn,
      an = lt,
      rn = mt,
      en = dt,
      un = (Lt = E(), Vt = T(1, 0, 0), Qt = T(0, 1, 0), function (t, n, a) {
    var r = X(n, a);
    return r < -.999999 ? (Z(Lt, Vt, n), G(Lt) < 1e-6 && Z(Lt, Qt, n), Y(Lt, Lt), jt(t, Lt, Math.PI), t) : r > .999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (Z(Lt, n, a), t[0] = Lt[0], t[1] = Lt[1], t[2] = Lt[2], t[3] = 1 + r, an(t, t));
  }),
      on = (Yt = zt(), Xt = zt(), function (t, n, a, r, e, u) {
    return Ft(Yt, n, e, u), Ft(Xt, a, r, u), Ft(t, Yt, Xt, 2 * u * (1 - u)), t;
  }),
      hn = (Zt = b(), function (t, n, a, r) {
    return Zt[0] = a[0], Zt[3] = a[1], Zt[6] = a[2], Zt[1] = r[0], Zt[4] = r[1], Zt[7] = r[2], Zt[2] = -n[0], Zt[5] = -n[1], Zt[8] = -n[2], an(t, It(t, Zt));
  }),
      cn = Object.freeze({
    __proto__: null,
    create: zt,
    identity: function identity(t) {
      return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
    },
    setAxisAngle: jt,
    getAxisAngle: function getAxisAngle(t, n) {
      var a = 2 * Math.acos(n[3]),
          r = Math.sin(a / 2);
      return r > 1e-6 ? (t[0] = n[0] / r, t[1] = n[1] / r, t[2] = n[2] / r) : (t[0] = 1, t[1] = 0, t[2] = 0), a;
    },
    getAngle: function getAngle(t, n) {
      var a = Ht(t, n);
      return Math.acos(2 * a * a - 1);
    },
    multiply: Pt,
    rotateX: St,
    rotateY: Et,
    rotateZ: Ot,
    calculateW: function calculateW(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2];
      return t[0] = a, t[1] = r, t[2] = e, t[3] = Math.sqrt(Math.abs(1 - a * a - r * r - e * e)), t;
    },
    exp: Tt,
    ln: Dt,
    pow: function pow(t, n, a) {
      return Dt(t, n), Gt(t, t, a), Tt(t, t), t;
    },
    slerp: Ft,
    random: function random(t) {
      var n = a(),
          r = a(),
          e = a(),
          u = Math.sqrt(1 - n),
          o = Math.sqrt(n);
      return t[0] = u * Math.sin(2 * Math.PI * r), t[1] = u * Math.cos(2 * Math.PI * r), t[2] = o * Math.sin(2 * Math.PI * e), t[3] = o * Math.cos(2 * Math.PI * e), t;
    },
    invert: function invert(t, n) {
      var a = n[0],
          r = n[1],
          e = n[2],
          u = n[3],
          o = a * a + r * r + e * e + u * u,
          i = o ? 1 / o : 0;
      return t[0] = -a * i, t[1] = -r * i, t[2] = -e * i, t[3] = u * i, t;
    },
    conjugate: function conjugate(t, n) {
      return t[0] = -n[0], t[1] = -n[1], t[2] = -n[2], t[3] = n[3], t;
    },
    fromMat3: It,
    fromEuler: function fromEuler(t, n, a, r) {
      var e = .5 * Math.PI / 180;
      n *= e, a *= e, r *= e;
      var u = Math.sin(n),
          o = Math.cos(n),
          i = Math.sin(a),
          h = Math.cos(a),
          c = Math.sin(r),
          s = Math.cos(r);
      return t[0] = u * h * s - o * i * c, t[1] = o * i * s + u * h * c, t[2] = o * h * c - u * i * s, t[3] = o * h * s + u * i * c, t;
    },
    str: function str(t) {
      return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
    },
    clone: Bt,
    fromValues: Nt,
    copy: kt,
    set: Ut,
    add: Wt,
    mul: Ct,
    scale: Gt,
    dot: Ht,
    lerp: Jt,
    length: Kt,
    len: $t,
    squaredLength: tn,
    sqrLen: nn,
    normalize: an,
    exactEquals: rn,
    equals: en,
    rotationTo: un,
    sqlerp: on,
    setAxes: hn
  });

  function sn(t, n, a) {
    var r = .5 * a[0],
        e = .5 * a[1],
        u = .5 * a[2],
        o = n[0],
        i = n[1],
        h = n[2],
        c = n[3];
    return t[0] = o, t[1] = i, t[2] = h, t[3] = c, t[4] = r * c + e * h - u * i, t[5] = e * c + u * o - r * h, t[6] = u * c + r * i - e * o, t[7] = -r * o - e * i - u * h, t;
  }

  function Mn(t, n) {
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t;
  }

  var fn = kt;
  var ln = kt;

  function vn(t, n, a) {
    var r = n[0],
        e = n[1],
        u = n[2],
        o = n[3],
        i = a[4],
        h = a[5],
        c = a[6],
        s = a[7],
        M = n[4],
        f = n[5],
        l = n[6],
        v = n[7],
        b = a[0],
        m = a[1],
        d = a[2],
        p = a[3];
    return t[0] = r * p + o * b + e * d - u * m, t[1] = e * p + o * m + u * b - r * d, t[2] = u * p + o * d + r * m - e * b, t[3] = o * p - r * b - e * m - u * d, t[4] = r * s + o * i + e * c - u * h + M * p + v * b + f * d - l * m, t[5] = e * s + o * h + u * i - r * c + f * p + v * m + l * b - M * d, t[6] = u * s + o * c + r * h - e * i + l * p + v * d + M * m - f * b, t[7] = o * s - r * i - e * h - u * c + v * p - M * b - f * m - l * d, t;
  }

  var bn = vn;
  var mn = Ht;
  var dn = Kt,
      pn = dn,
      xn = tn,
      yn = xn;
  var qn = Object.freeze({
    __proto__: null,
    create: function create() {
      var t = new n(8);
      return n != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[3] = 1, t;
    },
    clone: function clone(t) {
      var a = new n(8);
      return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a;
    },
    fromValues: function fromValues(t, a, r, e, u, o, i, h) {
      var c = new n(8);
      return c[0] = t, c[1] = a, c[2] = r, c[3] = e, c[4] = u, c[5] = o, c[6] = i, c[7] = h, c;
    },
    fromRotationTranslationValues: function fromRotationTranslationValues(t, a, r, e, u, o, i) {
      var h = new n(8);
      h[0] = t, h[1] = a, h[2] = r, h[3] = e;
      var c = .5 * u,
          s = .5 * o,
          M = .5 * i;
      return h[4] = c * e + s * r - M * a, h[5] = s * e + M * t - c * r, h[6] = M * e + c * a - s * t, h[7] = -c * t - s * a - M * r, h;
    },
    fromRotationTranslation: sn,
    fromTranslation: function fromTranslation(t, n) {
      return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = .5 * n[0], t[5] = .5 * n[1], t[6] = .5 * n[2], t[7] = 0, t;
    },
    fromRotation: function fromRotation(t, n) {
      return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
    },
    fromMat4: function fromMat4(t, a) {
      var r = zt();
      R(r, a);
      var e = new n(3);
      return A(e, a), sn(t, r, e), t;
    },
    copy: Mn,
    identity: function identity(t) {
      return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
    },
    set: function set(t, n, a, r, e, u, o, i, h) {
      return t[0] = n, t[1] = a, t[2] = r, t[3] = e, t[4] = u, t[5] = o, t[6] = i, t[7] = h, t;
    },
    getReal: fn,
    getDual: function getDual(t, n) {
      return t[0] = n[4], t[1] = n[5], t[2] = n[6], t[3] = n[7], t;
    },
    setReal: ln,
    setDual: function setDual(t, n) {
      return t[4] = n[0], t[5] = n[1], t[6] = n[2], t[7] = n[3], t;
    },
    getTranslation: function getTranslation(t, n) {
      var a = n[4],
          r = n[5],
          e = n[6],
          u = n[7],
          o = -n[0],
          i = -n[1],
          h = -n[2],
          c = n[3];
      return t[0] = 2 * (a * c + u * o + r * h - e * i), t[1] = 2 * (r * c + u * i + e * o - a * h), t[2] = 2 * (e * c + u * h + a * i - r * o), t;
    },
    translate: function translate(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = .5 * a[0],
          h = .5 * a[1],
          c = .5 * a[2],
          s = n[4],
          M = n[5],
          f = n[6],
          l = n[7];
      return t[0] = r, t[1] = e, t[2] = u, t[3] = o, t[4] = o * i + e * c - u * h + s, t[5] = o * h + u * i - r * c + M, t[6] = o * c + r * h - e * i + f, t[7] = -r * i - e * h - u * c + l, t;
    },
    rotateX: function rotateX(t, n, a) {
      var r = -n[0],
          e = -n[1],
          u = -n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = n[6],
          s = n[7],
          M = i * o + s * r + h * u - c * e,
          f = h * o + s * e + c * r - i * u,
          l = c * o + s * u + i * e - h * r,
          v = s * o - i * r - h * e - c * u;
      return St(t, n, a), r = t[0], e = t[1], u = t[2], o = t[3], t[4] = M * o + v * r + f * u - l * e, t[5] = f * o + v * e + l * r - M * u, t[6] = l * o + v * u + M * e - f * r, t[7] = v * o - M * r - f * e - l * u, t;
    },
    rotateY: function rotateY(t, n, a) {
      var r = -n[0],
          e = -n[1],
          u = -n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = n[6],
          s = n[7],
          M = i * o + s * r + h * u - c * e,
          f = h * o + s * e + c * r - i * u,
          l = c * o + s * u + i * e - h * r,
          v = s * o - i * r - h * e - c * u;
      return Et(t, n, a), r = t[0], e = t[1], u = t[2], o = t[3], t[4] = M * o + v * r + f * u - l * e, t[5] = f * o + v * e + l * r - M * u, t[6] = l * o + v * u + M * e - f * r, t[7] = v * o - M * r - f * e - l * u, t;
    },
    rotateZ: function rotateZ(t, n, a) {
      var r = -n[0],
          e = -n[1],
          u = -n[2],
          o = n[3],
          i = n[4],
          h = n[5],
          c = n[6],
          s = n[7],
          M = i * o + s * r + h * u - c * e,
          f = h * o + s * e + c * r - i * u,
          l = c * o + s * u + i * e - h * r,
          v = s * o - i * r - h * e - c * u;
      return Ot(t, n, a), r = t[0], e = t[1], u = t[2], o = t[3], t[4] = M * o + v * r + f * u - l * e, t[5] = f * o + v * e + l * r - M * u, t[6] = l * o + v * u + M * e - f * r, t[7] = v * o - M * r - f * e - l * u, t;
    },
    rotateByQuatAppend: function rotateByQuatAppend(t, n, a) {
      var r = a[0],
          e = a[1],
          u = a[2],
          o = a[3],
          i = n[0],
          h = n[1],
          c = n[2],
          s = n[3];
      return t[0] = i * o + s * r + h * u - c * e, t[1] = h * o + s * e + c * r - i * u, t[2] = c * o + s * u + i * e - h * r, t[3] = s * o - i * r - h * e - c * u, i = n[4], h = n[5], c = n[6], s = n[7], t[4] = i * o + s * r + h * u - c * e, t[5] = h * o + s * e + c * r - i * u, t[6] = c * o + s * u + i * e - h * r, t[7] = s * o - i * r - h * e - c * u, t;
    },
    rotateByQuatPrepend: function rotateByQuatPrepend(t, n, a) {
      var r = n[0],
          e = n[1],
          u = n[2],
          o = n[3],
          i = a[0],
          h = a[1],
          c = a[2],
          s = a[3];
      return t[0] = r * s + o * i + e * c - u * h, t[1] = e * s + o * h + u * i - r * c, t[2] = u * s + o * c + r * h - e * i, t[3] = o * s - r * i - e * h - u * c, i = a[4], h = a[5], c = a[6], s = a[7], t[4] = r * s + o * i + e * c - u * h, t[5] = e * s + o * h + u * i - r * c, t[6] = u * s + o * c + r * h - e * i, t[7] = o * s - r * i - e * h - u * c, t;
    },
    rotateAroundAxis: function rotateAroundAxis(t, n, a, r) {
      if (Math.abs(r) < 1e-6) return Mn(t, n);
      var e = Math.hypot(a[0], a[1], a[2]);
      r *= .5;
      var u = Math.sin(r),
          o = u * a[0] / e,
          i = u * a[1] / e,
          h = u * a[2] / e,
          c = Math.cos(r),
          s = n[0],
          M = n[1],
          f = n[2],
          l = n[3];
      t[0] = s * c + l * o + M * h - f * i, t[1] = M * c + l * i + f * o - s * h, t[2] = f * c + l * h + s * i - M * o, t[3] = l * c - s * o - M * i - f * h;
      var v = n[4],
          b = n[5],
          m = n[6],
          d = n[7];
      return t[4] = v * c + d * o + b * h - m * i, t[5] = b * c + d * i + m * o - v * h, t[6] = m * c + d * h + v * i - b * o, t[7] = d * c - v * o - b * i - m * h, t;
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t[2] = n[2] + a[2], t[3] = n[3] + a[3], t[4] = n[4] + a[4], t[5] = n[5] + a[5], t[6] = n[6] + a[6], t[7] = n[7] + a[7], t;
    },
    multiply: vn,
    mul: bn,
    scale: function scale(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t[2] = n[2] * a, t[3] = n[3] * a, t[4] = n[4] * a, t[5] = n[5] * a, t[6] = n[6] * a, t[7] = n[7] * a, t;
    },
    dot: mn,
    lerp: function lerp(t, n, a, r) {
      var e = 1 - r;
      return mn(n, a) < 0 && (r = -r), t[0] = n[0] * e + a[0] * r, t[1] = n[1] * e + a[1] * r, t[2] = n[2] * e + a[2] * r, t[3] = n[3] * e + a[3] * r, t[4] = n[4] * e + a[4] * r, t[5] = n[5] * e + a[5] * r, t[6] = n[6] * e + a[6] * r, t[7] = n[7] * e + a[7] * r, t;
    },
    invert: function invert(t, n) {
      var a = xn(n);
      return t[0] = -n[0] / a, t[1] = -n[1] / a, t[2] = -n[2] / a, t[3] = n[3] / a, t[4] = -n[4] / a, t[5] = -n[5] / a, t[6] = -n[6] / a, t[7] = n[7] / a, t;
    },
    conjugate: function conjugate(t, n) {
      return t[0] = -n[0], t[1] = -n[1], t[2] = -n[2], t[3] = n[3], t[4] = -n[4], t[5] = -n[5], t[6] = -n[6], t[7] = n[7], t;
    },
    length: dn,
    len: pn,
    squaredLength: xn,
    sqrLen: yn,
    normalize: function normalize(t, n) {
      var a = xn(n);

      if (a > 0) {
        a = Math.sqrt(a);
        var r = n[0] / a,
            e = n[1] / a,
            u = n[2] / a,
            o = n[3] / a,
            i = n[4],
            h = n[5],
            c = n[6],
            s = n[7],
            M = r * i + e * h + u * c + o * s;
        t[0] = r, t[1] = e, t[2] = u, t[3] = o, t[4] = (i - r * M) / a, t[5] = (h - e * M) / a, t[6] = (c - u * M) / a, t[7] = (s - o * M) / a;
      }

      return t;
    },
    str: function str(t) {
      return "quat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ")";
    },
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3] && t[4] === n[4] && t[5] === n[5] && t[6] === n[6] && t[7] === n[7];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = t[2],
          u = t[3],
          o = t[4],
          i = t[5],
          h = t[6],
          c = t[7],
          s = n[0],
          M = n[1],
          f = n[2],
          l = n[3],
          v = n[4],
          b = n[5],
          m = n[6],
          d = n[7];
      return Math.abs(a - s) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(s)) && Math.abs(r - M) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(M)) && Math.abs(e - f) <= 1e-6 * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(u - l) <= 1e-6 * Math.max(1, Math.abs(u), Math.abs(l)) && Math.abs(o - v) <= 1e-6 * Math.max(1, Math.abs(o), Math.abs(v)) && Math.abs(i - b) <= 1e-6 * Math.max(1, Math.abs(i), Math.abs(b)) && Math.abs(h - m) <= 1e-6 * Math.max(1, Math.abs(h), Math.abs(m)) && Math.abs(c - d) <= 1e-6 * Math.max(1, Math.abs(c), Math.abs(d));
    }
  });

  function gn() {
    var t = new n(2);
    return n != Float32Array && (t[0] = 0, t[1] = 0), t;
  }

  function _n(t, n, a) {
    return t[0] = n[0] - a[0], t[1] = n[1] - a[1], t;
  }

  function An(t, n, a) {
    return t[0] = n[0] * a[0], t[1] = n[1] * a[1], t;
  }

  function wn(t, n, a) {
    return t[0] = n[0] / a[0], t[1] = n[1] / a[1], t;
  }

  function Rn(t, n) {
    var a = n[0] - t[0],
        r = n[1] - t[1];
    return Math.hypot(a, r);
  }

  function zn(t, n) {
    var a = n[0] - t[0],
        r = n[1] - t[1];
    return a * a + r * r;
  }

  function jn(t) {
    var n = t[0],
        a = t[1];
    return Math.hypot(n, a);
  }

  function Pn(t) {
    var n = t[0],
        a = t[1];
    return n * n + a * a;
  }

  var Sn = jn,
      En = _n,
      On = An,
      Tn = wn,
      Dn = Rn,
      Fn = zn,
      In = Pn,
      Ln = function () {
    var t = gn();
    return function (n, a, r, e, u, o) {
      var i, h;

      for (a || (a = 2), r || (r = 0), h = e ? Math.min(e * a + r, n.length) : n.length, i = r; i < h; i += a) {
        t[0] = n[i], t[1] = n[i + 1], u(t, t, o), n[i] = t[0], n[i + 1] = t[1];
      }

      return n;
    };
  }(),
      Vn = Object.freeze({
    __proto__: null,
    create: gn,
    clone: function clone(t) {
      var a = new n(2);
      return a[0] = t[0], a[1] = t[1], a;
    },
    fromValues: function fromValues(t, a) {
      var r = new n(2);
      return r[0] = t, r[1] = a, r;
    },
    copy: function copy(t, n) {
      return t[0] = n[0], t[1] = n[1], t;
    },
    set: function set(t, n, a) {
      return t[0] = n, t[1] = a, t;
    },
    add: function add(t, n, a) {
      return t[0] = n[0] + a[0], t[1] = n[1] + a[1], t;
    },
    subtract: _n,
    multiply: An,
    divide: wn,
    ceil: function ceil(t, n) {
      return t[0] = Math.ceil(n[0]), t[1] = Math.ceil(n[1]), t;
    },
    floor: function floor(t, n) {
      return t[0] = Math.floor(n[0]), t[1] = Math.floor(n[1]), t;
    },
    min: function min(t, n, a) {
      return t[0] = Math.min(n[0], a[0]), t[1] = Math.min(n[1], a[1]), t;
    },
    max: function max(t, n, a) {
      return t[0] = Math.max(n[0], a[0]), t[1] = Math.max(n[1], a[1]), t;
    },
    round: function round(t, n) {
      return t[0] = Math.round(n[0]), t[1] = Math.round(n[1]), t;
    },
    scale: function scale(t, n, a) {
      return t[0] = n[0] * a, t[1] = n[1] * a, t;
    },
    scaleAndAdd: function scaleAndAdd(t, n, a, r) {
      return t[0] = n[0] + a[0] * r, t[1] = n[1] + a[1] * r, t;
    },
    distance: Rn,
    squaredDistance: zn,
    length: jn,
    squaredLength: Pn,
    negate: function negate(t, n) {
      return t[0] = -n[0], t[1] = -n[1], t;
    },
    inverse: function inverse(t, n) {
      return t[0] = 1 / n[0], t[1] = 1 / n[1], t;
    },
    normalize: function normalize(t, n) {
      var a = n[0],
          r = n[1],
          e = a * a + r * r;
      return e > 0 && (e = 1 / Math.sqrt(e)), t[0] = n[0] * e, t[1] = n[1] * e, t;
    },
    dot: function dot(t, n) {
      return t[0] * n[0] + t[1] * n[1];
    },
    cross: function cross(t, n, a) {
      var r = n[0] * a[1] - n[1] * a[0];
      return t[0] = t[1] = 0, t[2] = r, t;
    },
    lerp: function lerp(t, n, a, r) {
      var e = n[0],
          u = n[1];
      return t[0] = e + r * (a[0] - e), t[1] = u + r * (a[1] - u), t;
    },
    random: function random(t, n) {
      n = n || 1;
      var r = 2 * a() * Math.PI;
      return t[0] = Math.cos(r) * n, t[1] = Math.sin(r) * n, t;
    },
    transformMat2: function transformMat2(t, n, a) {
      var r = n[0],
          e = n[1];
      return t[0] = a[0] * r + a[2] * e, t[1] = a[1] * r + a[3] * e, t;
    },
    transformMat2d: function transformMat2d(t, n, a) {
      var r = n[0],
          e = n[1];
      return t[0] = a[0] * r + a[2] * e + a[4], t[1] = a[1] * r + a[3] * e + a[5], t;
    },
    transformMat3: function transformMat3(t, n, a) {
      var r = n[0],
          e = n[1];
      return t[0] = a[0] * r + a[3] * e + a[6], t[1] = a[1] * r + a[4] * e + a[7], t;
    },
    transformMat4: function transformMat4(t, n, a) {
      var r = n[0],
          e = n[1];
      return t[0] = a[0] * r + a[4] * e + a[12], t[1] = a[1] * r + a[5] * e + a[13], t;
    },
    rotate: function rotate(t, n, a, r) {
      var e = n[0] - a[0],
          u = n[1] - a[1],
          o = Math.sin(r),
          i = Math.cos(r);
      return t[0] = e * i - u * o + a[0], t[1] = e * o + u * i + a[1], t;
    },
    angle: function angle(t, n) {
      var a = t[0],
          r = t[1],
          e = n[0],
          u = n[1],
          o = Math.sqrt(a * a + r * r) * Math.sqrt(e * e + u * u),
          i = o && (a * e + r * u) / o;
      return Math.acos(Math.min(Math.max(i, -1), 1));
    },
    zero: function zero(t) {
      return t[0] = 0, t[1] = 0, t;
    },
    str: function str(t) {
      return "vec2(" + t[0] + ", " + t[1] + ")";
    },
    exactEquals: function exactEquals(t, n) {
      return t[0] === n[0] && t[1] === n[1];
    },
    equals: function equals(t, n) {
      var a = t[0],
          r = t[1],
          e = n[0],
          u = n[1];
      return Math.abs(a - e) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(e)) && Math.abs(r - u) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(u));
    },
    len: Sn,
    sub: En,
    mul: On,
    div: Tn,
    dist: Dn,
    sqrDist: Fn,
    sqrLen: In,
    forEach: Ln
  });

  t.glMatrix = e, t.mat2 = c, t.mat2d = v, t.mat3 = y, t.mat4 = S, t.quat = cn, t.quat2 = qn, t.vec2 = Vn, t.vec3 = K, t.vec4 = Rt, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});
},{}],"sketch.js":[function(require,module,exports) {
"use strict";

var _colorcube = _interopRequireDefault(require("./assets/colorcube.vert"));

var _colorcube2 = _interopRequireDefault(require("./assets/colorcube.frag"));

var _glMatrixMin = require("./lib/gl-matrix-min");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 참고한 튜토리얼)
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial
 * https://webglfundamentals.org/webgl/lessons/ko/webgl-fundamentals.html
 *
 * 사용한 라이브러리)
 * https://github.com/toji/gl-matrix
 *
 * WebGL이 작동하는 방식에 대해 내가 이해한 대로 정리해 봤는데
 * ./img/pipeline.jpg를 참고할 것.
 *
 * WebGL 회전 참고한 코드)
 * http://jsfiddle.net/9sqvp52u/
 */
var drag = false;
var pmouseX;
var pmouseY;
var dx = 0;
var dy = 0;
window.onload = main;

function main() {
  var canvas = document.getElementById('colorcube');
  var gl = canvas.getContext('webgl');

  if (!gl) {
    console.error('Unable to initialize WebGL');
    return;
  }

  canvas.addEventListener('mousedown', mousedown);
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('mouseup', mouseup);
  canvas.addEventListener('mouseout', mouseup);
  canvas.addEventListener('touchstart', mousedown);
  canvas.addEventListener('touchmove', mousemove);
  canvas.addEventListener('touchend', mouseup);
  canvas.addEventListener('touchcancel', mouseup);
  var shaderProgram = initializeShaderProgram(gl, _colorcube.default, _colorcube2.default);
  /**
   * Attributes receive values from buffers.
   * Each iteration of the vertex shader receives the next value from the buffer
   * assigned to that attribute.
   * Uniforms are similar to Javascript global variables.
   * They stay the same value for all iterations of a shader.
   * Since the attribute and uniform locations are specific to a single shader program,
   * we will store them together to make them easy to pass around.
   */

  var programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
    },
    uniformLocations: {
      matrix: gl.getUniformLocation(shaderProgram, 'uMatrix')
    }
  };
  var buffers = initializeBuffers(gl);
  var fieldOfView = 45 * Math.PI / 180; // in radians

  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var zNear = 0.1;
  var zFar = 100.0;

  var projectionMatrix = _glMatrixMin.mat4.create();

  var modelViewMatrix = _glMatrixMin.mat4.create(); // 이것들이 하는 역할 정확히 알아볼 것


  var eye = _glMatrixMin.vec3.fromValues(0, 0, 5);

  var target = _glMatrixMin.vec3.fromValues(0, 0, 0);

  var up = _glMatrixMin.vec3.fromValues(0, 1, 0);

  _glMatrixMin.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  _glMatrixMin.mat4.lookAt(modelViewMatrix, eye, target, up);

  _glMatrixMin.mat4.multiply(projectionMatrix, projectionMatrix, modelViewMatrix);

  function render() {
    drawScene(gl, programInfo, buffers, projectionMatrix);
    requestAnimationFrame(render); // to call the function 'render' on each frame
  }

  requestAnimationFrame(render);
}

function initializeShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource); // create the shader program

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source); // send the source to the shader object

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return;
  }

  return shader;
}

function initializeBuffers(gl) {
  // 주석의 네모 그림은 각 면에서 사각형을 그린 방향?을 표시한 것.
  // 꼭짓점에 색깔을 지정해 줄 때도 이거랑 같은 순서로 해 줘야 의도한 대로 칠해짐
  // MDN WebGL 튜토리얼에 나온 순서 그대로임
  // ./img/vertices.jpg를 참고할 것
  var positions = [
  /**
   * 앞면
   * 4 ㅡ 3
   * |    |
   * 1 ㅡ 2
   */
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
  /**
   * 뒷면
   * 2 ㅡ 3
   * |    |
   * 1 ㅡ 4
   */
  -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
  /**
   * 윗면
   * 1 ㅡ 4
   * |    |
   * 2 ㅡ 3
   */
  -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
  /**
   * 아랫면
   * 1 ㅡ 2
   * |    |
   * 4 ㅡ 3
   */
  -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
  /**
   * 왼면
   * 3 ㅡ 4
   * |    |
   * 2 ㅡ 1
   */
  -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  /**
   * 오른면
   * 3 ㅡ 2
   * |    |
   * 4 ㅡ 1
   */
  1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0];
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  var colors = [// ./img/colors.jpg를 참고할 것
  // 앞면
  1.0, 0.0, 0.0, 1.0, // red
  1.0, 1.0, 0.0, 1.0, // yellow
  1.0, 1.0, 1.0, 1.0, // white
  1.0, 0.0, 1.0, 1.0, // magenta
  // 뒷면
  0.0, 0.0, 0.0, 1.0, // black
  0.0, 0.0, 1.0, 1.0, // blue
  0.0, 1.0, 1.0, 1.0, // cyan
  0.0, 1.0, 0.0, 1.0, // green
  // 윗면
  0.0, 0.0, 1.0, 1.0, // blue
  1.0, 0.0, 1.0, 1.0, // magenta
  1.0, 1.0, 1.0, 1.0, // white
  0.0, 1.0, 1.0, 1.0, // cyan
  // 아랫면
  0.0, 0.0, 0.0, 1.0, // black
  0.0, 1.0, 0.0, 1.0, // green
  1.0, 1.0, 0.0, 1.0, // yellow
  1.0, 0.0, 0.0, 1.0, // red
  // 왼면
  0.0, 0.0, 0.0, 1.0, // black
  1.0, 0.0, 0.0, 1.0, // red
  1.0, 0.0, 1.0, 1.0, // magenta
  0.0, 0.0, 1.0, 1.0, // blue
  // 오른면
  0.0, 1.0, 0.0, 1.0, // green
  0.0, 1.0, 1.0, 1.0, // cyan
  1.0, 1.0, 1.0, 1.0, // white
  1.0, 1.0, 0.0, 1.0 // yellow
  ];
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  var indices = [0, 1, 2, 0, 2, 3, // front
  4, 5, 6, 4, 6, 7, // back
  8, 9, 10, 8, 10, 11, // top
  12, 13, 14, 12, 14, 15, // bottom
  16, 17, 18, 16, 18, 19, // right
  20, 21, 22, 20, 22, 23 // left
  ];
  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer
  };
}

function drawScene(gl, programInfo, buffers, projectionMatrix) {
  // 이상하게 튜토리얼에 쓰여 있는 것처럼 바로 mat4를 부르면 안 불러와짐...
  // 아하 버전이 올라가면서 그렇게 바뀌었나 봄 https://stackoverflow.com/questions/15931119/how-do-i-include-gl-matrix
  // https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html
  if (!drag) {
    dx *= 0.95;
    dy *= 0.95;
  } // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var quaternion = _glMatrixMin.quat.create();

  var rotation = _glMatrixMin.mat4.create();

  var degX = dx * 180 / Math.PI;
  var degY = dy * 180 / Math.PI;

  _glMatrixMin.quat.fromEuler(quaternion, degY, degX, 0); // 왜 X랑 Y를 반대로 써야 하지?!


  _glMatrixMin.mat4.fromQuat(rotation, quaternion);

  _glMatrixMin.mat4.multiply(projectionMatrix, projectionMatrix, rotation);

  {
    // numComponent나 offset 같은 변수를 여러 번 선언할 일이 있어서 이걸 쓰는가보다
    var numComponents = 3; // pull out 3 values per iteration

    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  {
    var _numComponents = 4;
    var _type = gl.FLOAT;
    var _normalize = false;
    var _stride = 0;
    var _offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, _numComponents, _type, _normalize, _stride, _offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.matrix, false, projectionMatrix);
  {
    var vertexCount = 36;
    var _type2 = gl.UNSIGNED_SHORT;
    var _offset2 = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, _type2, _offset2);
  }
}

function mousedown(e) {
  drag = true;

  if (e.type === 'touchstart') {
    pmouseX = e.touches[0].pageX;
    pmouseY = e.touches[0].pageY;
  } else {
    pmouseX = e.pageX;
    pmouseY = e.pageY;
  }
}

function mousemove(e) {
  if (drag) {
    var pageX, pageY;

    if (e.type === 'touchmove') {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
    } else {
      pageX = e.pageX;
      pageY = e.pageY;
    }

    dx = (pageX - pmouseX) * 2 * Math.PI / e.target.width;
    dy = (pageY - pmouseY) * 2 * Math.PI / e.target.height;
    pmouseX = pageX;
    pmouseY = pageY;
  }
}

function mouseup() {
  drag = false;
}
},{"./assets/colorcube.vert":"assets/colorcube.vert","./assets/colorcube.frag":"assets/colorcube.frag","./lib/gl-matrix-min":"lib/gl-matrix-min.js"}],"../../../../../../../home/leegakyeong/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49460" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../home/leegakyeong/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","sketch.js"], null)
//# sourceMappingURL=/sketch.702e4367.js.map