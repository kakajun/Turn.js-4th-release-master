// 等同loadash
(function() {
  var j = this
    , m = j._
    , s = {}
    , x = Array.prototype
    , y = Object.prototype
    , u = x.push
    , r = x.slice
    , q = x.concat
    , N = y.toString
    , L = y.hasOwnProperty
    , J = x.forEach
    , K = x.map
    , Q = x.reduce
    , Y = x.reduceRight
    , ea = x.filter
    , S = x.every
    , C = x.some
    , V = x.indexOf
    , D = x.lastIndexOf
    , y = Array.isArray
    , w = Object.keys
    , aa = Function.prototype.bind
    , k = function(a) {
      return a instanceof k ? a : this instanceof k ? (this._wrapped = a,
      void 0) : new k(a)
  };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k),
  exports._ = k) : j._ = k;
  k.VERSION = "1.4.3";
  var B = k.each = k.forEach = function(a, b, d) {
      if (null != a)
          if (J && a.forEach === J)
              a.forEach(b, d);
          else if (a.length === +a.length)
              for (var c = 0, f = a.length; f > c && b.call(d, a[c], c, a) !== s; c++)
                  ;
          else
              for (c in a)
                  if (k.has(a, c) && b.call(d, a[c], c, a) === s)
                      break
  }
  ;
  k.map = k.collect = function(a, b, d) {
      var c = [];
      return null == a ? c : K && a.map === K ? a.map(b, d) : (B(a, function(a, f, i) {
          c[c.length] = b.call(d, a, f, i)
      }),
      c)
  }
  ;
  k.reduce = k.foldl = k.inject = function(a, b, d, c) {
      var f = 2 < arguments.length;
      if (null == a && (a = []),
      Q && a.reduce === Q)
          return c && (b = k.bind(b, c)),
          f ? a.reduce(b, d) : a.reduce(b);
      if (B(a, function(a, i, j) {
          f ? d = b.call(c, d, a, i, j) : (d = a,
          f = !0)
      }),
      !f)
          throw new TypeError("Reduce of empty array with no initial value");
      return d
  }
  ;
  k.reduceRight = k.foldr = function(a, b, d, c) {
      var f = 2 < arguments.length;
      if (null == a && (a = []),
      Y && a.reduceRight === Y)
          return c && (b = k.bind(b, c)),
          f ? a.reduceRight(b, d) : a.reduceRight(b);
      var i = a.length;
      if (i !== +i)
          var j = k.keys(a)
            , i = j.length;
      if (B(a, function(k, p, m) {
          p = j ? j[--i] : --i;
          f ? d = b.call(c, d, a[p], p, m) : (d = a[p],
          f = !0)
      }),
      !f)
          throw new TypeError("Reduce of empty array with no initial value");
      return d
  }
  ;
  k.find = k.detect = function(a, b, d) {
      var c;
      return U(a, function(a, f, i) {
          return b.call(d, a, f, i) ? (c = a,
          !0) : void 0
      }),
      c
  }
  ;
  k.filter = k.select = function(a, b, d) {
      var c = [];
      return null == a ? c : ea && a.filter === ea ? a.filter(b, d) : (B(a, function(a, f, i) {
          b.call(d, a, f, i) && (c[c.length] = a)
      }),
      c)
  }
  ;
  k.reject = function(a, b, d) {
      return k.filter(a, function(a, c, f) {
          return !b.call(d, a, c, f)
      }, d)
  }
  ;
  k.every = k.all = function(a, b, d) {
      b || (b = k.identity);
      var c = !0;
      return null == a ? c : S && a.every === S ? a.every(b, d) : (B(a, function(a, f, i) {
          return (c = c && b.call(d, a, f, i)) ? void 0 : s
      }),
      !!c)
  }
  ;
  var U = k.some = k.any = function(a, b, d) {
      b || (b = k.identity);
      var c = !1;
      return null == a ? c : C && a.some === C ? a.some(b, d) : (B(a, function(a, f, i) {
          return c || (c = b.call(d, a, f, i)) ? s : void 0
      }),
      !!c)
  }
  ;
  k.contains = k.include = function(a, b) {
      return null == a ? !1 : V && a.indexOf === V ? -1 != a.indexOf(b) : U(a, function(a) {
          return a === b
      })
  }
  ;
  k.invoke = function(a, b) {
      var d = r.call(arguments, 2);
      return k.map(a, function(a) {
          return (k.isFunction(b) ? b : a[b]).apply(a, d)
      })
  }
  ;
  k.pluck = function(a, b) {
      return k.map(a, function(a) {
          return a[b]
      })
  }
  ;
  k.where = function(a, b) {
      return k.isEmpty(b) ? [] : k.filter(a, function(a) {
          for (var d in b)
              if (b[d] !== a[d])
                  return !1;
          return !0
      })
  }
  ;
  k.max = function(a, b, d) {
      if (!b && k.isArray(a) && a[0] === +a[0] && 65535 > a.length)
          return Math.max.apply(Math, a);
      if (!b && k.isEmpty(a))
          return -1 / 0;
      var c = {
          computed: -1 / 0,
          value: -1 / 0
      };
      return B(a, function(a, f, i) {
          f = b ? b.call(d, a, f, i) : a;
          f >= c.computed && (c = {
              value: a,
              computed: f
          })
      }),
      c.value
  }
  ;
  k.min = function(a, b, d) {
      if (!b && k.isArray(a) && a[0] === +a[0] && 65535 > a.length)
          return Math.min.apply(Math, a);
      if (!b && k.isEmpty(a))
          return 1 / 0;
      var c = {
          computed: 1 / 0,
          value: 1 / 0
      };
      return B(a, function(a, f, i) {
          f = b ? b.call(d, a, f, i) : a;
          c.computed > f && (c = {
              value: a,
              computed: f
          })
      }),
      c.value
  }
  ;
  k.shuffle = function(a) {
      var b, d = 0, c = [];
      return B(a, function(a) {
          b = k.random(d++);
          c[d - 1] = c[b];
          c[b] = a
      }),
      c
  }
  ;
  var R = function(a) {
      return k.isFunction(a) ? a : function(b) {
          return b[a]
      }
  };
  k.sortBy = function(a, b, d) {
      var c = R(b);
      return k.pluck(k.map(a, function(a, b, h) {
          return {
              value: a,
              index: b,
              criteria: c.call(d, a, b, h)
          }
      }).sort(function(a, b) {
          var d = a.criteria
            , h = b.criteria;
          if (d !== h) {
              if (d > h || void 0 === d)
                  return 1;
              if (h > d || void 0 === h)
                  return -1
          }
          return a.index < b.index ? -1 : 1
      }), "value")
  }
  ;
  var M = function(a, b, d, c) {
      var f = {}
        , i = R(b || k.identity);
      return B(a, function(b, h) {
          var j = i.call(d, b, h, a);
          c(f, j, b)
      }),
      f
  };
  k.groupBy = function(a, b, d) {
      return M(a, b, d, function(a, b, d) {
          (k.has(a, b) ? a[b] : a[b] = []).push(d)
      })
  }
  ;
  k.countBy = function(a, b, d) {
      return M(a, b, d, function(a, b) {
          k.has(a, b) || (a[b] = 0);
          a[b]++
      })
  }
  ;
  k.sortedIndex = function(a, b, d, c) {
      for (var d = null == d ? k.identity : R(d), b = d.call(c, b), f = 0, i = a.length; i > f; ) {
          var j = f + i >>> 1;
          b > d.call(c, a[j]) ? f = j + 1 : i = j
      }
      return f
  }
  ;
  k.toArray = function(a) {
      return a ? k.isArray(a) ? r.call(a) : a.length === +a.length ? k.map(a, k.identity) : k.values(a) : []
  }
  ;
  k.size = function(a) {
      return null == a ? 0 : a.length === +a.length ? a.length : k.keys(a).length
  }
  ;
  k.first = k.head = k.take = function(a, b, d) {
      return null == a ? void 0 : null == b || d ? a[0] : r.call(a, 0, b)
  }
  ;
  k.initial = function(a, b, d) {
      return r.call(a, 0, a.length - (null == b || d ? 1 : b))
  }
  ;
  k.last = function(a, b, d) {
      return null == a ? void 0 : null == b || d ? a[a.length - 1] : r.call(a, Math.max(a.length - b, 0))
  }
  ;
  k.rest = k.tail = k.drop = function(a, b, d) {
      return r.call(a, null == b || d ? 1 : b)
  }
  ;
  k.compact = function(a) {
      return k.filter(a, k.identity)
  }
  ;
  var o = function(a, b, d) {
      return B(a, function(a) {
          k.isArray(a) ? b ? u.apply(d, a) : o(a, b, d) : d.push(a)
      }),
      d
  };
  k.flatten = function(a, b) {
      return o(a, b, [])
  }
  ;
  k.without = function(a) {
      return k.difference(a, r.call(arguments, 1))
  }
  ;
  k.uniq = k.unique = function(a, b, d, c) {
      k.isFunction(b) && (c = d,
      d = b,
      b = !1);
      var d = d ? k.map(a, d, c) : a
        , f = []
        , i = [];
      return B(d, function(d, c) {
          (b ? c && i[i.length - 1] === d : k.contains(i, d)) || (i.push(d),
          f.push(a[c]))
      }),
      f
  }
  ;
  k.union = function() {
      return k.uniq(q.apply(x, arguments))
  }
  ;
  k.intersection = function(a) {
      var b = r.call(arguments, 1);
      return k.filter(k.uniq(a), function(a) {
          return k.every(b, function(b) {
              return 0 <= k.indexOf(b, a)
          })
      })
  }
  ;
  k.difference = function(a) {
      var b = q.apply(x, r.call(arguments, 1));
      return k.filter(a, function(a) {
          return !k.contains(b, a)
      })
  }
  ;
  k.zip = function() {
      for (var a = r.call(arguments), b = k.max(k.pluck(a, "length")), d = Array(b), c = 0; b > c; c++)
          d[c] = k.pluck(a, "" + c);
      return d
  }
  ;
  k.object = function(a, b) {
      if (null == a)
          return {};
      for (var d = {}, c = 0, f = a.length; f > c; c++)
          b ? d[a[c]] = b[c] : d[a[c][0]] = a[c][1];
      return d
  }
  ;
  k.indexOf = function(a, b, d) {
      if (null == a)
          return -1;
      var c = 0
        , f = a.length;
      if (d) {
          if ("number" != typeof d)
              return c = k.sortedIndex(a, b),
              a[c] === b ? c : -1;
          c = 0 > d ? Math.max(0, f + d) : d
      }
      if (V && a.indexOf === V)
          return a.indexOf(b, d);
      for (; f > c; c++)
          if (a[c] === b)
              return c;
      return -1
  }
  ;
  k.lastIndexOf = function(a, b, d) {
      if (null == a)
          return -1;
      var c = null != d;
      if (D && a.lastIndexOf === D)
          return c ? a.lastIndexOf(b, d) : a.lastIndexOf(b);
      for (d = c ? d : a.length; d--; )
          if (a[d] === b)
              return d;
      return -1
  }
  ;
  k.range = function(a, b, d) {
      1 >= arguments.length && (b = a || 0,
      a = 0);
      for (var d = arguments[2] || 1, c = Math.max(Math.ceil((b - a) / d), 0), f = 0, i = Array(c); c > f; )
          i[f++] = a,
          a += d;
      return i
  }
  ;
  var F = function() {};
  k.bind = function(a, b) {
      var d, c;
      if (a.bind === aa && aa)
          return aa.apply(a, r.call(arguments, 1));
      if (!k.isFunction(a))
          throw new TypeError;
      return d = r.call(arguments, 2),
      c = function() {
          if (!(this instanceof c))
              return a.apply(b, d.concat(r.call(arguments)));
          F.prototype = a.prototype;
          var f = new F;
          F.prototype = null;
          var i = a.apply(f, d.concat(r.call(arguments)));
          return Object(i) === i ? i : f
      }
  }
  ;
  k.bindAll = function(a) {
      var b = r.call(arguments, 1);
      return 0 == b.length && (b = k.functions(a)),
      B(b, function(b) {
          a[b] = k.bind(a[b], a)
      }),
      a
  }
  ;
  k.memoize = function(a, b) {
      var d = {};
      return b || (b = k.identity),
      function() {
          var c = b.apply(this, arguments);
          return k.has(d, c) ? d[c] : d[c] = a.apply(this, arguments)
      }
  }
  ;
  k.delay = function(a, b) {
      var d = r.call(arguments, 2);
      return setTimeout(function() {
          return a.apply(null, d)
      }, b)
  }
  ;
  k.defer = function(a) {
      return k.delay.apply(k, [a, 1].concat(r.call(arguments, 1)))
  }
  ;
  k.throttle = function(a, b) {
      var d, c, f, i, j = 0, k = function() {
          j = new Date;
          f = null;
          i = a.apply(d, c)
      };
      return function() {
          var p = new Date
            , m = b - (p - j);
          return d = this,
          c = arguments,
          0 >= m ? (clearTimeout(f),
          f = null,
          j = p,
          i = a.apply(d, c)) : f || (f = setTimeout(k, m)),
          i
      }
  }
  ;
  k.debounce = function(a, b, d) {
      var c, f;
      return function() {
          var i = this
            , j = arguments
            , k = d && !c;
          return clearTimeout(c),
          c = setTimeout(function() {
              c = null;
              d || (f = a.apply(i, j))
          }, b),
          k && (f = a.apply(i, j)),
          f
      }
  }
  ;
  k.once = function(a) {
      var b, d = !1;
      return function() {
          return d ? b : (d = !0,
          b = a.apply(this, arguments),
          a = null,
          b)
      }
  }
  ;
  k.wrap = function(a, b) {
      return function() {
          var d = [a];
          return u.apply(d, arguments),
          b.apply(this, d)
      }
  }
  ;
  k.compose = function() {
      var a = arguments;
      return function() {
          for (var b = arguments, d = a.length - 1; 0 <= d; d--)
              b = [a[d].apply(this, b)];
          return b[0]
      }
  }
  ;
  k.after = function(a, b) {
      return 0 >= a ? b() : function() {
          return 1 > --a ? b.apply(this, arguments) : void 0
      }
  }
  ;
  k.keys = w || function(a) {
      if (a !== Object(a))
          throw new TypeError("Invalid object");
      var b = [], d;
      for (d in a)
          k.has(a, d) && (b[b.length] = d);
      return b
  }
  ;
  k.values = function(a) {
      var b = [], d;
      for (d in a)
          k.has(a, d) && b.push(a[d]);
      return b
  }
  ;
  k.pairs = function(a) {
      var b = [], d;
      for (d in a)
          k.has(a, d) && b.push([d, a[d]]);
      return b
  }
  ;
  k.invert = function(a) {
      var b = {}, d;
      for (d in a)
          k.has(a, d) && (b[a[d]] = d);
      return b
  }
  ;
  k.functions = k.methods = function(a) {
      var b = [], d;
      for (d in a)
          k.isFunction(a[d]) && b.push(d);
      return b.sort()
  }
  ;
  k.extend = function(a) {
      return B(r.call(arguments, 1), function(b) {
          if (b)
              for (var d in b)
                  a[d] = b[d]
      }),
      a
  }
  ;
  k.pick = function(a) {
      var b = {}
        , d = q.apply(x, r.call(arguments, 1));
      return B(d, function(d) {
          d in a && (b[d] = a[d])
      }),
      b
  }
  ;
  k.omit = function(a) {
      var b = {}, d = q.apply(x, r.call(arguments, 1)), c;
      for (c in a)
          k.contains(d, c) || (b[c] = a[c]);
      return b
  }
  ;
  k.defaults = function(a) {
      return B(r.call(arguments, 1), function(b) {
          if (b)
              for (var d in b)
                  null == a[d] && (a[d] = b[d])
      }),
      a
  }
  ;
  k.clone = function(a) {
      return k.isObject(a) ? k.isArray(a) ? a.slice() : k.extend({}, a) : a
  }
  ;
  k.tap = function(a, b) {
      return b(a),
      a
  }
  ;
  var c = function(a, b, d, f) {
      if (a === b)
          return 0 !== a || 1 / a == 1 / b;
      if (null == a || null == b)
          return a === b;
      a instanceof k && (a = a._wrapped);
      b instanceof k && (b = b._wrapped);
      var i = N.call(a);
      if (i != N.call(b))
          return !1;
      switch (i) {
      case "[object String]":
          return a == b + "";
      case "[object Number]":
          return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
      case "[object Date]":
      case "[object Boolean]":
          return +a == +b;
      case "[object RegExp]":
          return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
      }
      if ("object" != typeof a || "object" != typeof b)
          return !1;
      for (var j = d.length; j--; )
          if (d[j] == a)
              return f[j] == b;
      d.push(a);
      f.push(b);
      var j = 0
        , p = !0;
      if ("[object Array]" == i) {
          if (j = a.length,
          p = j == b.length)
              for (; j-- && (p = c(a[j], b[j], d, f)); )
                  ;
      } else {
          var i = a.constructor
            , m = b.constructor;
          if (i !== m && (!k.isFunction(i) || !(i instanceof i && k.isFunction(m) && m instanceof m)))
              return !1;
          for (var v in a)
              if (k.has(a, v) && (j++,
              !(p = k.has(b, v) && c(a[v], b[v], d, f))))
                  break;
          if (p) {
              for (v in b)
                  if (k.has(b, v) && !j--)
                      break;
              p = !j
          }
      }
      return d.pop(),
      f.pop(),
      p
  };
  k.isEqual = function(a, b) {
      return c(a, b, [], [])
  }
  ;
  k.isEmpty = function(a) {
      if (null == a)
          return !0;
      if (k.isArray(a) || k.isString(a))
          return 0 === a.length;
      for (var b in a)
          if (k.has(a, b))
              return !1;
      return !0
  }
  ;
  k.isElement = function(a) {
      return !(!a || 1 !== a.nodeType)
  }
  ;
  k.isArray = y || function(a) {
      return "[object Array]" == N.call(a)
  }
  ;
  k.isObject = function(a) {
      return a === Object(a)
  }
  ;
  B("Arguments Function String Number Date RegExp".split(" "), function(a) {
      k["is" + a] = function(b) {
          return N.call(b) == "[object " + a + "]"
      }
  });
  k.isArguments(arguments) || (k.isArguments = function(a) {
      return !(!a || !k.has(a, "callee"))
  }
  );
  k.isFunction = function(a) {
      return "function" == typeof a
  }
  ;
  k.isFinite = function(a) {
      return isFinite(a) && !isNaN(parseFloat(a))
  }
  ;
  k.isNaN = function(a) {
      return k.isNumber(a) && a != +a
  }
  ;
  k.isBoolean = function(a) {
      return !0 === a || !1 === a || "[object Boolean]" == N.call(a)
  }
  ;
  k.isNull = function(a) {
      return null === a
  }
  ;
  k.isUndefined = function(a) {
      return void 0 === a
  }
  ;
  k.has = function(a, b) {
      return L.call(a, b)
  }
  ;
  k.noConflict = function() {
      return j._ = m,
      this
  }
  ;
  k.identity = function(a) {
      return a
  }
  ;
  k.times = function(a, b, d) {
      for (var c = Array(a), f = 0; a > f; f++)
          c[f] = b.call(d, f);
      return c
  }
  ;
  k.random = function(a, b) {
      return null == b && (b = a,
      a = 0),
      a + (0 | Math.random() * (b - a + 1))
  }
  ;
  var i = {
      escape: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "/": "&#x2F;"
      }
  };
  i.unescape = k.invert(i.escape);
  var f = {
      escape: RegExp("[" + k.keys(i.escape).join("") + "]", "g"),
      unescape: RegExp("(" + k.keys(i.unescape).join("|") + ")", "g")
  };
  k.each(["escape", "unescape"], function(a) {
      k[a] = function(b) {
          return null == b ? "" : ("" + b).replace(f[a], function(b) {
              return i[a][b]
          })
      }
  });
  k.result = function(a, b) {
      if (null == a)
          return null;
      var d = a[b];
      return k.isFunction(d) ? d.call(a) : d
  }
  ;
  k.mixin = function(a) {
      B(k.functions(a), function(b) {
          var d = k[b] = a[b];
          k.prototype[b] = function() {
              var a = [this._wrapped];
              u.apply(a, arguments);
              a = d.apply(k, a);
              return this._chain ? k(a).chain() : a
          }
      })
  }
  ;
  var p = 0;
  k.uniqueId = function(a) {
      var b = "" + ++p;
      return a ? a + b : b
  }
  ;
  k.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
  };
  var v = /(.)^/
    , b = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "\t": "t",
      "\u2028": "u2028",
      "\u2029": "u2029"
  }
    , d = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  k.template = function(a, c, g) {
      var g = k.defaults({}, g, k.templateSettings)
        , f = RegExp([(g.escape || v).source, (g.interpolate || v).source, (g.evaluate || v).source].join("|") + "|$", "g")
        , i = 0
        , j = "__p+='";
      a.replace(f, function(c, h, g, f, l) {
          return j += a.slice(i, l).replace(d, function(a) {
              return "\\" + b[a]
          }),
          h && (j += "'+\n((__t=(" + h + "))==null?'':_.escape(__t))+\n'"),
          g && (j += "'+\n((__t=(" + g + "))==null?'':__t)+\n'"),
          f && (j += "';\n" + f + "\n__p+='"),
          i = l + c.length,
          c
      });
      j += "';\n";
      g.variable || (j = "with(obj||{}){\n" + j + "}\n");
      j = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + j + "return __p;\n";
      try {
          var p = Function(g.variable || "obj", "_", j)
      } catch (m) {
          throw m.source = j,
          m;
      }
      if (c)
          return p(c, k);
      c = function(a) {
          return p.call(this, a, k)
      }
      ;
      return c.source = "function(" + (g.variable || "obj") + "){\n" + j + "}",
      c
  }
  ;
  k.chain = function(a) {
      return k(a).chain()
  }
  ;
  k.mixin(k);
  B("pop push reverse shift sort splice unshift".split(" "), function(a) {
      var b = x[a];
      k.prototype[a] = function() {
          var d = this._wrapped;
          return b.apply(d, arguments),
          "shift" != a && "splice" != a || 0 !== d.length || delete d[0],
          this._chain ? k(d).chain() : d
      }
  });
  B(["concat", "join", "slice"], function(a) {
      var b = x[a];
      k.prototype[a] = function() {
          var a = b.apply(this._wrapped, arguments);
          return this._chain ? k(a).chain() : a
      }
  });
  k.extend(k.prototype, {
      chain: function() {
          return this._chain = !0,
          this
      },
      value: function() {
          return this._wrapped
      }
  })
}
).call(this);
