
(function(j) {
    function m(j) {
        var m = this.data("tEvents");
        m || (m = {
            dispatch: {}
        },
        Object.defineProperty(this.data(), "tEvents", {
            value: m,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }));
        m.events = m.events || 0;
        m.dispatch[j] = !0;
        0 === m.events && (N ? (this.bind("touchstart", x),
        this.bind("touchmove", y)) : (this.bind("mousedown", x),
        this.bind("mousemove", y)));
        m.events += 1
    }
    function s() {
        var m = this.data("tEvents");
        m && (m.events = Math.max(0, m.events - 1),
        0 === m.events && (N ? (this.unbind("touchstart", x),
        this.unbind("touchmove", y),
        m.eventUpHandler && j("body").unbind("touchend", m.eventUpHandler)) : (this.unbind("mousedown", x),
        this.unbind("mousemove", y),
        m.eventUpHandler && j("body").unbind("mouseup", m.eventUpHandler))))
    }
    function x(m) {
        var r = j(this)
          , s = r.data("tEvents")
          , u = q(m)
          , x = r.offset()
          , C = !1;
        x && (C = (C = (C = (C = u.x > x.left) && u.y > x.top) && u.x < x.left + r.width()) && u.y < x.top + r.height());
        if (C || this == document)
            s.currentEvent = u,
            s.initialEvent = u,
            -1 == L.indexOf(this) && L.push(this),
            s.dispatch.press && (r = j.event.fix(m),
            r.type = "press",
            j(m.target).trigger(r))
    }
    function y(m) {
        var r = j(this), s = r.data("tEvents"), u;
        if (s.currentEvent) {
            u = j(s.currentEvent.target || r);
            var x = j.extend({}, s.currentEvent);
            s.currentEvent = q(m);
            s.prevEvent = x;
            if (s.dispatch.pinching && N) {
                var C = m.originalEvent.touches;
                if (2 == C.length) {
                    var x = C[1].pageX / 2 + C[0].pageX / 2
                      , y = C[1].pageY / 2 + C[0].pageY / 2
                      , D = j.Event("pinching")
                      , w = C[1].pageX - C[0].pageX
                      , C = C[1].pageY - C[0].pageY
                      , w = Math.sqrt(w * w + C * C);
                    s.fingerDistance || (s.fingerDistance = w);
                    D.pageX = x;
                    D.pageY = y;
                    D.target = m.target;
                    D.factor = w / s.fingerDistance;
                    u.trigger(D)
                }
            }
        }
        s.dispatch.moving && (m = j.event.fix(m),
        m.type = "moving",
        r.trigger(m))
    }
    function u(m) {
        for (var q = !0, r = !0, s = !0, u = !0, x = 0; x < L.length; x++) {
            var y = L[x]
              , D = j(y)
              , w = D.data("tEvents");
            if (w.currentEvent) {
                var J = !1
                  , k = (D = j(w.currentEvent.target || D)) ? D.offset() : null;
                if (w.prevEvent && w.dispatch.swipe) {
                    var B = (w.currentEvent.x - w.prevEvent.x) / (w.currentEvent.time - w.prevEvent.time);
                    if (q && (-1 > B || 1 < B)) {
                        var U = j.Event("swipe")
                          , q = !1;
                        D.trigger(U, [B])
                    }
                }
                w.dispatch.unpress && u && (B = j.event.fix(m),
                B.type = "unpress",
                u = !1,
                j(w.initialEvent.target).trigger(B));
                k && (J = (J = (J = (J = w.currentEvent.x >= k.left) && w.currentEvent.y >= k.top) && w.currentEvent.x <= k.left + D.width()) && w.currentEvent.y <= k.top + D.height());
                if (!w.prevEvent && (J || y == document))
                    if (w.dispatch.tap && s && (y = j.event.fix(m),
                    y.type = "tap",
                    s = !1,
                    y.pageX = w.currentEvent.x,
                    y.pageY = w.currentEvent.y,
                    D.trigger(y)),
                    w.dispatch.doubleTap && r)
                        if (w.taps || (w.taps = [0, 0]),
                        w.taps.splice(0, 1),
                        w.taps.push((new Date).getTime()),
                        300 > w.taps[1] - w.taps[0])
                            y = j.event.fix(m),
                            y.type = "doubleTap",
                            r = !1,
                            y.pageX = w.currentEvent.x,
                            y.pageY = w.currentEvent.y,
                            D.trigger(y);
                N ? j("body").unbind("touchend", w.eventUpHandler) : j("body").unbind("mouseup", w.eventUpHandler);
                delete w.eventUpHandler;
                delete w.currentEvent;
                delete w.prevEvent;
                delete w.initialEvent;
                delete w.fingerDistance
            }
            L.slice(x, 1)
        }
    }
    function r(q) {
        j.event.special[q] = {
            setup: function() {
                m.call(j(this), q)
            },
            teardown: function() {
                s.call(j(this))
            }
        }
    }
    function q(j) {
        var m = N ? {
            x: j.originalEvent.touches[0].pageX,
            y: j.originalEvent.touches[0].pageY
        } : {
            x: j.pageX,
            y: j.pageY
        };
        m.time = (new Date).getTime();
        m.target = j.target;
        return m
    }
    var N = j.isTouch || "ontouchstart"in window
      , L = [];
    Object.defineProperty || (Object.prototype.defineProperty = function(j, m, q) {
        j[m] = q.value
    }
    );
    N ? j(document).bind("touchend", u) : j(document).bind("mouseup", u);
    for (var J = "swipe tap doubleTap pinching press unpress moving".split(" "); J.length; )
        r(J.pop())
}
)(jQuery);
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
(function() {
    var j = this, m = j.Backbone, s = [], x = s.push, y = s.slice, u = s.splice, r;
    r = "undefined" !== typeof exports ? exports : j.Backbone = {};
    r.VERSION = "0.9.10";
    var q = j._;
    !q && "undefined" !== typeof require && (q = require("underscore"));
    r.$ = j.jQuery || j.Zepto || j.ender;
    r.noConflict = function() {
        j.Backbone = m;
        return this
    }
    ;
    r.emulateHTTP = !1;
    r.emulateJSON = !1;
    var N = /\s+/
      , L = function(c, i, f, j) {
        if (!f)
            return !0;
        if ("object" === typeof f)
            for (var k in f)
                c[i].apply(c, [k, f[k]].concat(j));
        else if (N.test(f)) {
            f = f.split(N);
            k = 0;
            for (var b = f.length; k < b; k++)
                c[i].apply(c, [f[k]].concat(j))
        } else
            return !0
    }
      , J = function(c, i) {
        var f, j = -1, k = c.length;
        switch (i.length) {
        case 0:
            for (; ++j < k; )
                (f = c[j]).callback.call(f.ctx);
            break;
        case 1:
            for (; ++j < k; )
                (f = c[j]).callback.call(f.ctx, i[0]);
            break;
        case 2:
            for (; ++j < k; )
                (f = c[j]).callback.call(f.ctx, i[0], i[1]);
            break;
        case 3:
            for (; ++j < k; )
                (f = c[j]).callback.call(f.ctx, i[0], i[1], i[2]);
            break;
        default:
            for (; ++j < k; )
                (f = c[j]).callback.apply(f.ctx, i)
        }
    }
      , s = r.Events = {
        on: function(c, i, f) {
            if (!L(this, "on", c, [i, f]) || !i)
                return this;
            this._events || (this._events = {});
            (this._events[c] || (this._events[c] = [])).push({
                callback: i,
                context: f,
                ctx: f || this
            });
            return this
        },
        once: function(c, i, f) {
            if (!L(this, "once", c, [i, f]) || !i)
                return this;
            var j = this
              , k = q.once(function() {
                j.off(c, k);
                i.apply(this, arguments)
            });
            k._callback = i;
            this.on(c, k, f);
            return this
        },
        off: function(c, i, f) {
            var j, k, b, d, a, h, g, l;
            if (!this._events || !L(this, "off", c, [i, f]))
                return this;
            if (!c && !i && !f)
                return this._events = {},
                this;
            d = c ? [c] : q.keys(this._events);
            a = 0;
            for (h = d.length; a < h; a++)
                if (c = d[a],
                j = this._events[c]) {
                    b = [];
                    if (i || f) {
                        g = 0;
                        for (l = j.length; g < l; g++)
                            k = j[g],
                            (i && i !== k.callback && i !== k.callback._callback || f && f !== k.context) && b.push(k)
                    }
                    this._events[c] = b
                }
            return this
        },
        trigger: function(c) {
            if (!this._events)
                return this;
            var i = y.call(arguments, 1);
            if (!L(this, "trigger", c, i))
                return this;
            var f = this._events[c]
              , j = this._events.all;
            f && J(f, i);
            j && J(j, arguments);
            return this
        },
        listenTo: function(c, i, f) {
            var j = this._listeners || (this._listeners = {})
              , k = c._listenerId || (c._listenerId = q.uniqueId("l"));
            j[k] = c;
            c.on(i, "object" === typeof i ? this : f, this);
            return this
        },
        stopListening: function(c, i, f) {
            var j = this._listeners;
            if (j) {
                if (c)
                    c.off(i, "object" === typeof i ? this : f, this),
                    !i && !f && delete j[c._listenerId];
                else {
                    "object" === typeof i && (f = this);
                    for (var k in j)
                        j[k].off(i, f, this);
                    this._listeners = {}
                }
                return this
            }
        }
    };
    s.bind = s.on;
    s.unbind = s.off;
    q.extend(r, s);
    var K = r.Model = function(c, i) {
        var f, j = c || {};
        this.cid = q.uniqueId("c");
        this.attributes = {};
        i && i.collection && (this.collection = i.collection);
        i && i.parse && (j = this.parse(j, i) || {});
        if (f = q.result(this, "defaults"))
            j = q.defaults({}, j, f);
        this.set(j, i);
        this.changed = {};
        this.initialize.apply(this, arguments)
    }
    ;
    q.extend(K.prototype, s, {
        changed: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return q.clone(this.attributes)
        },
        sync: function() {
            return r.sync.apply(this, arguments)
        },
        get: function(c) {
            return this.attributes[c]
        },
        escape: function(c) {
            return q.escape(this.get(c))
        },
        has: function(c) {
            return null != this.get(c)
        },
        set: function(c, i, f) {
            var j, k, b, d, a, h, g;
            if (null == c)
                return this;
            "object" === typeof c ? (k = c,
            f = i) : (k = {})[c] = i;
            f || (f = {});
            if (!this._validate(k, f))
                return !1;
            b = f.unset;
            d = f.silent;
            c = [];
            a = this._changing;
            this._changing = !0;
            a || (this._previousAttributes = q.clone(this.attributes),
            this.changed = {});
            g = this.attributes;
            h = this._previousAttributes;
            this.idAttribute in k && (this.id = k[this.idAttribute]);
            for (j in k)
                i = k[j],
                q.isEqual(g[j], i) || c.push(j),
                q.isEqual(h[j], i) ? delete this.changed[j] : this.changed[j] = i,
                b ? delete g[j] : g[j] = i;
            if (!d) {
                c.length && (this._pending = !0);
                i = 0;
                for (j = c.length; i < j; i++)
                    this.trigger("change:" + c[i], this, g[c[i]], f)
            }
            if (a)
                return this;
            if (!d)
                for (; this._pending; )
                    this._pending = !1,
                    this.trigger("change", this, f);
            this._changing = this._pending = !1;
            return this
        },
        unset: function(c, i) {
            return this.set(c, void 0, q.extend({}, i, {
                unset: !0
            }))
        },
        clear: function(c) {
            var i = {}, f;
            for (f in this.attributes)
                i[f] = void 0;
            return this.set(i, q.extend({}, c, {
                unset: !0
            }))
        },
        hasChanged: function(c) {
            return null == c ? !q.isEmpty(this.changed) : q.has(this.changed, c)
        },
        changedAttributes: function(c) {
            if (!c)
                return this.hasChanged() ? q.clone(this.changed) : !1;
            var i, f = !1, j = this._changing ? this._previousAttributes : this.attributes, k;
            for (k in c)
                if (!q.isEqual(j[k], i = c[k]))
                    (f || (f = {}))[k] = i;
            return f
        },
        previous: function(c) {
            return null == c || !this._previousAttributes ? null : this._previousAttributes[c]
        },
        previousAttributes: function() {
            return q.clone(this._previousAttributes)
        },
        fetch: function(c) {
            c = c ? q.clone(c) : {};
            void 0 === c.parse && (c.parse = !0);
            var i = c.success;
            c.success = function(c, j, k) {
                if (!c.set(c.parse(j, k), k))
                    return !1;
                i && i(c, j, k)
            }
            ;
            return this.sync("read", this, c)
        },
        save: function(c, i, f) {
            var j, k, b = this.attributes;
            null == c || "object" === typeof c ? (j = c,
            f = i) : (j = {})[c] = i;
            if (j && (!f || !f.wait) && !this.set(j, f))
                return !1;
            f = q.extend({
                validate: !0
            }, f);
            if (!this._validate(j, f))
                return !1;
            j && f.wait && (this.attributes = q.extend({}, b, j));
            void 0 === f.parse && (f.parse = !0);
            k = f.success;
            f.success = function(d, a, c) {
                d.attributes = b;
                var g = d.parse(a, c);
                c.wait && (g = q.extend(j || {}, g));
                if (q.isObject(g) && !d.set(g, c))
                    return !1;
                k && k(d, a, c)
            }
            ;
            c = this.isNew() ? "create" : f.patch ? "patch" : "update";
            "patch" === c && (f.attrs = j);
            c = this.sync(c, this, f);
            j && f.wait && (this.attributes = b);
            return c
        },
        destroy: function(c) {
            var c = c ? q.clone(c) : {}
              , i = this
              , f = c.success
              , j = function() {
                i.trigger("destroy", i, i.collection, c)
            };
            c.success = function(b, d, a) {
                (a.wait || b.isNew()) && j();
                f && f(b, d, a)
            }
            ;
            if (this.isNew())
                return c.success(this, null, c),
                !1;
            var k = this.sync("delete", this, c);
            c.wait || j();
            return k
        },
        url: function() {
            var c = q.result(this, "urlRoot") || q.result(this.collection, "url") || F();
            return this.isNew() ? c : c + ("/" === c.charAt(c.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(c) {
            return c
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null == this.id
        },
        isValid: function(c) {
            return !this.validate || !this.validate(this.attributes, c)
        },
        _validate: function(c, i) {
            if (!i.validate || !this.validate)
                return !0;
            var c = q.extend({}, this.attributes, c)
              , f = this.validationError = this.validate(c, i) || null;
            if (!f)
                return !0;
            this.trigger("invalid", this, f, i || {});
            return !1
        }
    });
    var Q = r.Collection = function(c, i) {
        i || (i = {});
        i.model && (this.model = i.model);
        void 0 !== i.comparator && (this.comparator = i.comparator);
        this.models = [];
        this._reset();
        this.initialize.apply(this, arguments);
        c && this.reset(c, q.extend({
            silent: !0
        }, i))
    }
    ;
    q.extend(Q.prototype, s, {
        model: K,
        initialize: function() {},
        toJSON: function(c) {
            return this.map(function(i) {
                return i.toJSON(c)
            })
        },
        sync: function() {
            return r.sync.apply(this, arguments)
        },
        add: function(c, i) {
            c = q.isArray(c) ? c.slice() : [c];
            i || (i = {});
            var f, j, k, b, d, a, h, g, l, t;
            h = [];
            g = i.at;
            l = this.comparator && null == g && !1 != i.sort;
            t = q.isString(this.comparator) ? this.comparator : null;
            f = 0;
            for (j = c.length; f < j; f++)
                (k = this._prepareModel(b = c[f], i)) ? (d = this.get(k)) ? i.merge && (d.set(b === k ? k.attributes : b, i),
                l && !a && d.hasChanged(t) && (a = !0)) : (h.push(k),
                k.on("all", this._onModelEvent, this),
                this._byId[k.cid] = k,
                null != k.id && (this._byId[k.id] = k)) : this.trigger("invalid", this, b, i);
            h.length && (l && (a = !0),
            this.length += h.length,
            null != g ? u.apply(this.models, [g, 0].concat(h)) : x.apply(this.models, h));
            a && this.sort({
                silent: !0
            });
            if (i.silent)
                return this;
            f = 0;
            for (j = h.length; f < j; f++)
                (k = h[f]).trigger("add", k, this, i);
            a && this.trigger("sort", this, i);
            return this
        },
        remove: function(c, i) {
            c = q.isArray(c) ? c.slice() : [c];
            i || (i = {});
            var f, j, k, b;
            f = 0;
            for (j = c.length; f < j; f++)
                if (b = this.get(c[f]))
                    delete this._byId[b.id],
                    delete this._byId[b.cid],
                    k = this.indexOf(b),
                    this.models.splice(k, 1),
                    this.length--,
                    i.silent || (i.index = k,
                    b.trigger("remove", b, this, i)),
                    this._removeReference(b);
            return this
        },
        push: function(c, i) {
            c = this._prepareModel(c, i);
            this.add(c, q.extend({
                at: this.length
            }, i));
            return c
        },
        pop: function(c) {
            var i = this.at(this.length - 1);
            this.remove(i, c);
            return i
        },
        unshift: function(c, i) {
            c = this._prepareModel(c, i);
            this.add(c, q.extend({
                at: 0
            }, i));
            return c
        },
        shift: function(c) {
            var i = this.at(0);
            this.remove(i, c);
            return i
        },
        slice: function(c, i) {
            return this.models.slice(c, i)
        },
        get: function(c) {
            if (null != c)
                return this._idAttr || (this._idAttr = this.model.prototype.idAttribute),
                this._byId[c.id || c.cid || c[this._idAttr] || c]
        },
        at: function(c) {
            return this.models[c]
        },
        where: function(c) {
            return q.isEmpty(c) ? [] : this.filter(function(i) {
                for (var f in c)
                    if (c[f] !== i.get(f))
                        return !1;
                return !0
            })
        },
        sort: function(c) {
            if (!this.comparator)
                throw Error("Cannot sort a set without a comparator");
            c || (c = {});
            q.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(q.bind(this.comparator, this));
            c.silent || this.trigger("sort", this, c);
            return this
        },
        pluck: function(c) {
            return q.invoke(this.models, "get", c)
        },
        update: function(c, i) {
            i = q.extend({
                add: !0,
                merge: !0,
                remove: !0
            }, i);
            i.parse && (c = this.parse(c, i));
            var f, j, k, b, d = [], a = [], h = {};
            q.isArray(c) || (c = c ? [c] : []);
            if (i.add && !i.remove)
                return this.add(c, i);
            j = 0;
            for (k = c.length; j < k; j++)
                f = c[j],
                b = this.get(f),
                i.remove && b && (h[b.cid] = !0),
                (i.add && !b || i.merge && b) && d.push(f);
            if (i.remove) {
                j = 0;
                for (k = this.models.length; j < k; j++)
                    f = this.models[j],
                    h[f.cid] || a.push(f)
            }
            a.length && this.remove(a, i);
            d.length && this.add(d, i);
            return this
        },
        reset: function(c, i) {
            i || (i = {});
            i.parse && (c = this.parse(c, i));
            for (var f = 0, j = this.models.length; f < j; f++)
                this._removeReference(this.models[f]);
            i.previousModels = this.models.slice();
            this._reset();
            c && this.add(c, q.extend({
                silent: !0
            }, i));
            i.silent || this.trigger("reset", this, i);
            return this
        },
        fetch: function(c) {
            c = c ? q.clone(c) : {};
            void 0 === c.parse && (c.parse = !0);
            var i = c.success;
            c.success = function(c, j, k) {
                c[k.update ? "update" : "reset"](j, k);
                i && i(c, j, k)
            }
            ;
            return this.sync("read", this, c)
        },
        create: function(c, i) {
            i = i ? q.clone(i) : {};
            if (!(c = this._prepareModel(c, i)))
                return !1;
            i.wait || this.add(c, i);
            var f = this
              , j = i.success;
            i.success = function(c, b, d) {
                d.wait && f.add(c, d);
                j && j(c, b, d)
            }
            ;
            c.save(null, i);
            return c
        },
        parse: function(c) {
            return c
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0;
            this.models.length = 0;
            this._byId = {}
        },
        _prepareModel: function(c, i) {
            if (c instanceof K)
                return c.collection || (c.collection = this),
                c;
            i || (i = {});
            i.collection = this;
            var f = new this.model(c,i);
            return !f._validate(c, i) ? !1 : f
        },
        _removeReference: function(c) {
            this === c.collection && delete c.collection;
            c.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(c, i, f, j) {
            ("add" === c || "remove" === c) && f !== this || ("destroy" === c && this.remove(i, j),
            i && c === "change:" + i.idAttribute && (delete this._byId[i.previous(i.idAttribute)],
            null != i.id && (this._byId[i.id] = i)),
            this.trigger.apply(this, arguments))
        },
        sortedIndex: function(c, i, f) {
            i || (i = this.comparator);
            var j = q.isFunction(i) ? i : function(c) {
                return c.get(i)
            }
            ;
            return q.sortedIndex(this.models, c, j, f)
        }
    });
    q.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min toArray size first head take initial rest tail drop last without indexOf shuffle lastIndexOf isEmpty chain".split(" "), function(c) {
        Q.prototype[c] = function() {
            var i = y.call(arguments);
            i.unshift(this.models);
            return q[c].apply(q, i)
        }
    });
    q.each(["groupBy", "countBy", "sortBy"], function(c) {
        Q.prototype[c] = function(i, f) {
            var j = q.isFunction(i) ? i : function(c) {
                return c.get(i)
            }
            ;
            return q[c](this.models, j, f)
        }
    });
    var Y = r.Router = function(c) {
        c || (c = {});
        c.routes && (this.routes = c.routes);
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }
      , ea = /\((.*?)\)/g
      , S = /(\(\?)?:\w+/g
      , C = /\*\w+/g
      , V = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    q.extend(Y.prototype, s, {
        initialize: function() {},
        route: function(c, i, f) {
            q.isRegExp(c) || (c = this._routeToRegExp(c));
            f || (f = this[i]);
            r.history.route(c, q.bind(function(j) {
                j = this._extractParameters(c, j);
                f && f.apply(this, j);
                this.trigger.apply(this, ["route:" + i].concat(j));
                this.trigger("route", i, j);
                r.history.trigger("route", this, i, j)
            }, this));
            return this
        },
        navigate: function(c, i) {
            r.history.navigate(c, i);
            return this
        },
        _bindRoutes: function() {
            if (this.routes)
                for (var c, i = q.keys(this.routes); null != (c = i.pop()); )
                    this.route(c, this.routes[c])
        },
        _routeToRegExp: function(c) {
            c = c.replace(V, "\\$&").replace(ea, "(?:$1)?").replace(S, function(c, f) {
                return f ? c : "([^/]+)"
            }).replace(C, "(.*?)");
            return RegExp("^" + c + "$")
        },
        _extractParameters: function(c, i) {
            return c.exec(i).slice(1)
        }
    });
    var D = r.History = function() {
        this.handlers = [];
        q.bindAll(this, "checkUrl");
        "undefined" !== typeof window && (this.location = window.location,
        this.history = window.history)
    }
      , w = /^[#\/]|\s+$/g
      , aa = /^\/+|\/+$/g
      , k = /msie [\w.]+/
      , B = /\/$/;
    D.started = !1;
    q.extend(D.prototype, s, {
        interval: 50,
        getHash: function(c) {
            return (c = (c || this).location.href.match(/#(.*)$/)) ? c[1] : ""
        },
        getFragment: function(c, i) {
            if (null == c)
                if (this._hasPushState || !this._wantsHashChange || i) {
                    var c = this.location.pathname
                      , f = this.root.replace(B, "");
                    c.indexOf(f) || (c = c.substr(f.length))
                } else
                    c = this.getHash();
            return c.replace(w, "")
        },
        start: function(c) {
            if (D.started)
                throw Error("Backbone.history has already been started");
            D.started = !0;
            this.options = q.extend({}, {
                root: "/"
            }, this.options, c);
            this.root = this.options.root;
            this._wantsHashChange = !1 !== this.options.hashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !this.history || !this.history.pushState);
            var c = this.getFragment()
              , i = document.documentMode
              , i = k.exec(navigator.userAgent.toLowerCase()) && (!i || 7 >= i);
            this.root = ("/" + this.root + "/").replace(aa, "/");
            i && this._wantsHashChange && (this.iframe = r.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,
            this.navigate(c));
            if (this._hasPushState)
                r.$(window).on("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange"in window && !i)
                r.$(window).on("hashchange", this.checkUrl);
            else
                this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
            this.fragment = c;
            c = this.location;
            i = c.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !i)
                return this.fragment = this.getFragment(null, !0),
                this.location.replace(this.root + this.location.search + "#" + this.fragment),
                !0;
            this._wantsPushState && this._hasPushState && (i && c.hash) && (this.fragment = this.getHash().replace(w, ""),
            this.history.replaceState({}, document.title, this.root + this.fragment + c.search));
            if (!this.options.silent)
                return this.loadUrl()
        },
        stop: function() {
            r.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            D.started = !1
        },
        route: function(c, i) {
            this.handlers.unshift({
                route: c,
                callback: i
            })
        },
        checkUrl: function() {
            var c = this.getFragment();
            c === this.fragment && this.iframe && (c = this.getFragment(this.getHash(this.iframe)));
            if (c === this.fragment)
                return !1;
            this.iframe && this.navigate(c);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(c) {
            var i = this.fragment = this.getFragment(c);
            return q.any(this.handlers, function(c) {
                if (c.route.test(i))
                    return c.callback(i),
                    !0
            })
        },
        navigate: function(c, i) {
            if (!D.started)
                return !1;
            if (!i || !0 === i)
                i = {
                    trigger: i
                };
            c = this.getFragment(c || "");
            if (this.fragment !== c) {
                this.fragment = c;
                var f = this.root + c;
                if (this._hasPushState)
                    this.history[i.replace ? "replaceState" : "pushState"]({}, document.title, f);
                else if (this._wantsHashChange)
                    this._updateHash(this.location, c, i.replace),
                    this.iframe && c !== this.getFragment(this.getHash(this.iframe)) && (i.replace || this.iframe.document.open().close(),
                    this._updateHash(this.iframe.location, c, i.replace));
                else
                    return this.location.assign(f);
                i.trigger && this.loadUrl(c)
            }
        },
        _updateHash: function(c, i, f) {
            f ? (f = c.href.replace(/(javascript:|#).*$/, ""),
            c.replace(f + "#" + i)) : c.hash = "#" + i
        }
    });
    r.history = new D;
    var U = r.View = function(c) {
        this.cid = q.uniqueId("view");
        this._configure(c || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }
      , R = /^(\S+)\s*(.*)$/
      , M = "model collection el id attributes className tagName events".split(" ");
    q.extend(U.prototype, s, {
        tagName: "div",
        $: function(c) {
            return this.$el.find(c)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this
        },
        setElement: function(c, i) {
            this.$el && this.undelegateEvents();
            this.$el = c instanceof r.$ ? c : r.$(c);
            this.el = this.$el[0];
            !1 !== i && this.delegateEvents();
            return this
        },
        delegateEvents: function(c) {
            if (c || (c = q.result(this, "events"))) {
                this.undelegateEvents();
                for (var i in c) {
                    var f = c[i];
                    q.isFunction(f) || (f = this[c[i]]);
                    if (!f)
                        throw Error('Method "' + c[i] + '" does not exist');
                    var j = i.match(R)
                      , k = j[1]
                      , j = j[2]
                      , f = q.bind(f, this)
                      , k = k + (".delegateEvents" + this.cid);
                    if ("" === j)
                        this.$el.on(k, f);
                    else
                        this.$el.on(k, j, f)
                }
            }
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid)
        },
        _configure: function(c) {
            this.options && (c = q.extend({}, q.result(this, "options"), c));
            q.extend(this, q.pick(c, M));
            this.options = c
        },
        _ensureElement: function() {
            if (this.el)
                this.setElement(q.result(this, "el"), !1);
            else {
                var c = q.extend({}, q.result(this, "attributes"));
                this.id && (c.id = q.result(this, "id"));
                this.className && (c["class"] = q.result(this, "className"));
                c = r.$("<" + q.result(this, "tagName") + ">").attr(c);
                this.setElement(c, !1)
            }
        }
    });
    var o = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    r.sync = function(c, i, f) {
        var j = o[c];
        q.defaults(f || (f = {}), {
            emulateHTTP: r.emulateHTTP,
            emulateJSON: r.emulateJSON
        });
        var k = {
            type: j,
            dataType: "json"
        };
        f.url || (k.url = q.result(i, "url") || F());
        if (null == f.data && i && ("create" === c || "update" === c || "patch" === c))
            k.contentType = "application/json",
            k.data = JSON.stringify(f.attrs || i.toJSON(f));
        f.emulateJSON && (k.contentType = "application/x-www-form-urlencoded",
        k.data = k.data ? {
            model: k.data
        } : {});
        if (f.emulateHTTP && ("PUT" === j || "DELETE" === j || "PATCH" === j)) {
            k.type = "POST";
            f.emulateJSON && (k.data._method = j);
            var b = f.beforeSend;
            f.beforeSend = function(a) {
                a.setRequestHeader("X-HTTP-Method-Override", j);
                if (b)
                    return b.apply(this, arguments)
            }
        }
        "GET" !== k.type && !f.emulateJSON && (k.processData = !1);
        var d = f.success;
        f.success = function(a) {
            d && d(i, a, f);
            i.trigger("sync", i, a, f)
        }
        ;
        var a = f.error;
        f.error = function(b) {
            a && a(i, b, f);
            i.trigger("error", i, b, f)
        }
        ;
        c = f.xhr = r.ajax(q.extend(k, f));
        i.trigger("request", i, c, f);
        return c
    }
    ;
    r.ajax = function() {
        return r.$.ajax.apply(r.$, arguments)
    }
    ;
    K.extend = Q.extend = Y.extend = U.extend = D.extend = function(c, i) {
        var f = this, j;
        j = c && q.has(c, "constructor") ? c.constructor : function() {
            return f.apply(this, arguments)
        }
        ;
        q.extend(j, f, i);
        var k = function() {
            this.constructor = j
        };
        k.prototype = f.prototype;
        j.prototype = new k;
        c && q.extend(j.prototype, c);
        j.__super__ = f.prototype;
        return j
    }
    ;
    var F = function() {
        throw Error('A "url" property or function must be specified');
    }
}
).call(this);
(function(j) {
    function m(b, d, a) {
        if (!a[0] || "object" == typeof a[0])
            return d.init.apply(b, a);
        if (d[a[0]])
            return d[a[0]].apply(b, Array.prototype.slice.call(a, 1));
        throw C(a[0] + " is not a method or property");
    }
    function s(b, d, a, c) {
        return {
            css: {
                position: "absolute",
                top: b,
                left: d,
                overflow: c || "hidden",
                zIndex: a || "auto"
            }
        }
    }
    function x(b, d, a) {
        var c = 1 - d
          , g = c * c * c
          , f = d * d * d;
        return y(a, Math.round(g * b[0].x + 3 * d * c * c * b[1].x + 3 * d * d * c * b[2].x + f * b[3].x), Math.round(g * b[0].y + 3 * d * c * c * b[1].y + 3 * d * d * c * b[2].y + f * b[3].y))
    }
    function y(b, d, a) {
        return {
            corner: b,
            x: d,
            y: a
        }
    }
    function u(b, d) {
        return {
            x: b,
            y: d
        }
    }
    function r(b, d, a) {
        return w && a ? " translate3d(" + b + "px," + d + "px, 0px) " : " translate(" + b + "px, " + d + "px) "
    }
    function q(b, d, a) {
        return w && a ? " scale3d(" + b + "," + d + ", 1) " : " scale(" + b + ", " + d + ") "
    }
    function N(b) {
        return " rotate(" + b + "deg) "
    }
    function L(b, d) {
        return Object.prototype.hasOwnProperty.call(d, b)
    }
    function J() {
        for (var b = ["Moz", "Webkit", "Khtml", "O", "ms"], d = b.length, a = ""; d--; )
            b[d] + "Transform"in document.body.style && (a = "-" + b[d].toLowerCase() + "-");
        return a
    }
    function K(b) {
        var d = R ? u(b.originalEvent.touches[0].pageX, b.originalEvent.touches[0].pageY) : u(b.pageX, b.pageY);
        d.time = (new Date).getTime();
        d.target = b.target;
        return d
    }
    function Q() {
        return "WebKitCSSMatrix"in window || "MozPerspective"in document.body.style
    }
    function Y(b, d) {
        var a, c, g = document.createElement("fakeelement"), f = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MSTransition: "transitionend",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
        for (a in f)
            if (void 0 !== g.style[a]) {
                c = f[a];
                break
            }
        b && (c ? b.bind(c, function() {
            b.unbind(c);
            d.call(b)
        }) : setTimeout(function() {
            d.call(b)
        }, Math.ceil(1E3 * parseFloat(b.css(J() + "transition-duration")))));
        return c
    }
    function ea(b) {
        var d;
        "-webkit-" == k ? d = b ? "-webkit-gradient(linear, left top, right top,color-stop(0, rgba(0,0,0,0)),color-stop(0.3, rgba(0,0,0, 0.3)),color-stop(0.5, rgba(0,0,0, 0.8))" : "-webkit-gradient(linear, left top, right top,color-stop(0, rgba(0,0,0,0)),color-stop(0.2, rgba(0,0,0,0.5)),color-stop(0.2, rgba(0,0,0,0.6)),color-stop(0.4, rgba(0,0,0,0.2)),color-stop(1, rgba(0,0,0,0))" : (d = k + "linear-gradient(left, ",
        d = b ? d + "rgba(0,0,0,0) 0%,rgba(0,0,0,0.3) 30%,rgba(0,0,0,0.8) 50%" : d + "rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 20%,rgba(0,0,0,0.6) 20%,rgba(0,0,0,0.2) 40%,rgba(0,0,0,0) 100%");
        return d + ")"
    }
    function S(b, d, a) {
        b = j.Event(b);
        d.trigger(b, a);
        return b.isDefaultPrevented() ? c.prevented : b.isPropagationStopped() ? c.stopped : ""
    }
    function C(b) {
        function d(a) {
            this.name = "TurnJsError";
            this.message = a
        }
        d.prototype = Error();
        d.prototype.constructor = d;
        return new d(b)
    }
    function V(b) {
        var d = {
            width: b.width,
            height: b.height
        };
        if (d.width > b.boundWidth || d.height > b.boundHeight) {
            var a = d.width / d.height;
            b.boundWidth / a > b.boundHeight && b.boundHeight * a <= b.boundWidth ? (d.width = Math.round(b.boundHeight * a),
            d.height = b.boundHeight) : (d.width = b.boundWidth,
            d.height = Math.round(b.boundWidth / a))
        }
        return d
    }
    function D(b, d, a) {
        var c = b.data("events")[d]
          , g = [];
        j.each(c, function(a, b) {
            g.push(b.handler)
        });
        a && b.unbind(d);
        return g
    }
    var w, aa, k, B = Math.PI, U = B / 2, R = "ontouchstart"in window, M = {
        backward: ["bl", "tl", "l"],
        forward: ["br", "tr", "r"],
        all: "tl bl tr br l r".split(" ")
    }, o = {
        single: 1,
        "double": 2
    }, F = {
        ltr: 1,
        rtl: 2
    }, c = {
        prevented: 1,
        stopped: 2
    }, i = {
        acceleration: !0,
        autoScroll: !0,
        cacheSize: 6,
        cornerSize: 50,
        cornerPosition: "50px 50px",
        defaultZoomMargin: "0px 0px",
        display: "double",
        duration: 600,
        easing: function(b, d, a, c) {
            var c = (b /= c) * b
              , g = c * b;
            return d + a * (-1.95 * g * c + 7.8 * c * c + -10.7 * g + 4.8 * c + 1.05 * b)
        },
        elevation: "10%",
        hover: !0,
        ignoreElements: "[ignore=1]",
        page: 1,
        smartFlip: !1,
        swipe: !0,
        responsive: !1,
        gradients: !0,
        turnCorners: "bl,br",
        events: null
    }, f = {
        init: function(b) {
            if (this.turn("is"))
                return this.turn("options", b);
            w = Q();
            var d;
            aa = (d = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) ? 534.3 < parseFloat(d[1]) : !0;
            k = J();
            d = {};
            var a = this.children()
              , c = 0
              , b = j.extend({
                width: this.width(),
                height: this.height(),
                direction: this.attr("dir") || this.css("direction") || "ltr",
                viewer: this.parent()
            }, i, b)
              , g = b.cornerPosition.split(" ");
            b.cornerPosition = u(parseInt(g[0], 10), parseInt(g[1], 10));
            d.options = b;
            d.dynamicMode = !1;
            d.turningPage = !1;
            d.pageObjs = {};
            d.pages = {};
            d.pageWrap = {};
            d.pageMv = [];
            d.front = [];
            d.scroll = {
                left: 0,
                top: 0
            };
            d.margins = [0, 0, 0, 0];
            d.zoom = 1;
            d.totalPages = b.pages || 0;
            d.eventHandlers = {
                touchMove: j.proxy(f._touchMove, this),
                touchEnd: j.proxy(f._touchEnd, this),
                start: j.proxy(f._eventStart, this)
            };
            this.data("t", d);
            b.when && (b.events = b.when);
            if (b.events)
                for (var l in b.events)
                    L(l, b.events) && this.bind(l, b.events[l]);
            this.css({
                position: "relative",
                width: b.width,
                height: b.height
            });
            R ? this.addClass("touch") : this.addClass("no-touch");
            this.turn("display", b.display);
            "" !== b.direction && this.turn("direction", b.direction);
            for (l = 0; l < a.length; l++)
                j(a[l]).is(b.ignoreElements) || this.turn("addPage", a[l], ++c);
            d.dynamicMode = 0 === c;
            this.bind("press", f._touchStart).bind("end", f._eventEnd).bind("swipe", f._eventSwipe).bind("flip", f._eventFlip);
            this.parent().bind("start", d.eventHandlers.start);
            j(document).bind("moving", d.eventHandlers.touchMove).bind("unpress", d.eventHandlers.touchEnd);
            f._resizeObserver.call(this);
            this.turn("page", b.page);
            d.done = !0;
            b.slider && (b.events && b.events.newThumbnail && (j(b.slider).bind("newThumbnail", b.events.newThumbnail),
            delete b.events.newThumbnail),
            d.slider = b.slider,
            j(b.slider).tslider({
                flipbook: this
            }));
            return this
        },
        addPage: function(b, d, a) {
            var c, g = !1, l = this.data("t"), i = l.totalPages + 1;
            if (l.destroying)
                return null;
            if (c = /\bp([0-9]+)\b/.exec(j(b).attr("class")))
                d = parseInt(c[1], 10);
            if (d)
                if (d == i)
                    g = !0;
                else {
                    if (d > i)
                        throw C('Page "' + d + '" cannot be inserted');
                }
            else
                d = i,
                g = !0;
            1 <= d && d <= i && (c = l.display == o["double"] ? d % 2 ? " odd" : " even" : " odd",
            d in l.pageObjs && f._movePages.call(this, d, 1),
            g && (l.totalPages = i),
            l.pageObjs[d] = j(b).css({
                "float": "left"
            }).addClass("page p" + d + c),
            a && l.pageObjs[d].data({
                f: a
            }),
            -1 != navigator.userAgent.indexOf("MSIE 9.0") && l.pageObjs[d].hasClass("hard") && l.pageObjs[d].removeClass("hard"),
            f._addPage.call(this, d),
            f._removeFromDOM.call(this));
            return this
        },
        _backPage: function(b) {
            var d = this.data("t");
            b ? d.pageObjs[0] || (b = j("<div />"),
            d.pageObjs[0] = j(b).css({
                "float": "left"
            }).addClass("page p0"),
            f._addPage.call(this, 0)) : d.pageObjs[0] && f._removePageFromDOM.call(this, 0, !0)
        },
        _addPage: function(b) {
            var d = this.data("t")
              , a = d.pageObjs[b];
            if (a && f._necessPage.call(this, b)) {
                if (!d.pageWrap[b]) {
                    d.pageWrap[b] = j("<div/>", {
                        "class": "page-wrapper",
                        page: b,
                        css: {
                            position: "absolute",
                            overflow: "hidden"
                        }
                    });
                    this.append(d.pageWrap[b]);
                    d.pageObjs[b].appendTo(d.pageWrap[b]);
                    var c = f._pageSize.call(this, b, !0);
                    a.css({
                        width: c.width,
                        height: c.height
                    });
                    d.pageWrap[b].css(c)
                }
                f._makeFlip.call(this, b)
            }
        },
        addHtml: function() {
            if (!window.Regions)
                throw C("Regions has not been loaded yet");
        },
        hasPage: function(b) {
            return L(b, this.data("t").pageObjs)
        },
        center: function(b) {
            var d = this.data("t")
              , a = j(this).turn("size")
              , c = 0;
            d.noCenter || (d.display == o["double"] && (b = this.turn("view", b || d.tpage || d.page),
            d.direction == F.ltr ? b[0] ? b[1] || (c += a.width / 4) : c -= a.width / 4 : b[0] ? b[1] || (c -= a.width / 4) : c += a.width / 4),
            j(this).css({
                marginLeft: c
            }));
            return this
        },
        destroy: function() {
            var b = this
              , d = this.data("t")
              , a = "end first flip last start turning turned zooming missing".split(" ");
            if (S("destroy", this) != c.prevented) {
                d.destroying = !0;
                j.each(a, function(a, d) {
                    b.unbind(d)
                });
                this.unbind("press", f._touchStart);
                this.parent().unbind("start", d.eventHandlers.start);
                for (j(document).unbind("moving", d.eventHandlers.touchMove).unbind("unpress", d.eventHandlers.touchEnd); 0 !== d.totalPages; )
                    this.turn("removePage", d.totalPages);
                d.fparent && d.fparent.remove();
                d.shadow && d.shadow.remove();
                this.removeData();
                d = null
            }
            return this
        },
        effect: function(b, d) {
            var a = this.data("t"), c;
            if (c = a.pageObjs[b]) {
                if (void 0 === d)
                    return c.hasClass("hard") ? "hard" : "sheet";
                var g = a.dynamicMode;
                a.dynamicMode = !1;
                switch (d) {
                case "hard":
                    c.removeClass("sheet");
                    c.addClass("hard");
                    f._removePageFromDOM.call(this, b);
                    break;
                case "sheet":
                    c.removeClass("hard"),
                    c.addClass("sheet"),
                    f._removePageFromDOM.call(this, b)
                }
                a.dynamicMode = g;
                f._necessPage.call(this, b) && f._addPage.call(this, b);
                return this
            }
            throw C('Page "' + b + '" is not loaded yet');
        },
        is: function() {
            return "object" == typeof this.data("t")
        },
        _pageSize: function(b, d) {
            var a = this.data("t")
              , c = {};
            if (a.display == o.single)
                c.width = this.width(),
                c.height = this.height(),
                d && (c.top = 0,
                c.left = 0,
                c.right = "auto");
            else {
                var g = Math.floor(this.width() / 2)
                  , f = this.height();
                a.pageObjs[b].hasClass("own-size") ? (c.width = a.pageObjs[b].width(),
                c.height = a.pageObjs[b].height()) : (c.width = g,
                c.height = f);
                if (d) {
                    var i = b % 2;
                    c.top = (f - c.height) / 2;
                    a.direction == F.ltr ? (c[i ? "right" : "left"] = g - c.width,
                    c[i ? "left" : "right"] = "auto") : (c[i ? "left" : "right"] = g - c.width,
                    c[i ? "right" : "left"] = "auto")
                }
            }
            return c
        },
        _makeFlip: function(b) {
            var d = this.data("t");
            if (!d.pages[b]) {
                var a = d.display == o.single
                  , c = b % 2;
                d.pages[b] = d.pageObjs[b].css(f._pageSize.call(this, b)).flip({
                    page: b,
                    next: c || a ? b + 1 : b - 1
                });
                d.disabled && d.pages[b].flip("disable", !0);
                f._setPageLoc.call(this, b)
            }
            return d.pages[b]
        },
        _makeRange: function() {
            var b, d;
            if (!(1 > this.data("t").totalPages)) {
                d = this.turn("range");
                for (b = d[0]; b <= d[1]; b++)
                    f._addPage.call(this, b)
            }
        },
        range: function(b) {
            var d, a, c, g = this.data("t"), b = b || g.tpage || g.page || 1;
            c = f._view.call(this, b);
            if (1 > b || b > g.totalPages)
                throw C('"' + b + '" is not a valid page');
            c[1] = c[1] || c[0];
            1 <= c[0] && c[1] <= g.totalPages ? (b = Math.floor((g.options.cacheSize - 2) / 2),
            g.totalPages - c[1] > c[0] ? (d = Math.min(c[0] - 1, b),
            a = 2 * b - d) : (a = Math.min(g.totalPages - c[1], b),
            d = 2 * b - a)) : (d = g.options.cacheSize - 1,
            a = g.options.cacheSize - 1);
            return [Math.max(1, c[0] - d), Math.min(g.totalPages, c[1] + a)]
        },
        _necessPage: function(b) {
            if (0 === b)
                return !0;
            var d = this.data("t")
              , a = d.range || this.turn("range");
            return d.pageObjs[b].hasClass("fixed") || -1 != d.pageMv.indexOf(b) || -1 != d.front.indexOf(b) || b >= a[0] && b <= a[1]
        },
        _removeFromDOM: function() {
            if (!this.turn("animating")) {
                var b = this.data("t"), d;
                for (d in b.pageWrap)
                    L(d, b.pageWrap) && (f._necessPage.call(this, parseInt(d, 10)) || f._removePageFromDOM.call(this, d))
            }
        },
        pageData: function(b, d) {
            var a = this.data("t");
            if (void 0 === d)
                return a.pageObjs[b].data("f");
            a.pageObjs[b].data("f", d)
        },
        _removePageFromDOM: function(b, d) {
            var a = this.data("t")
              , h = a.pageObjs
              , g = a.pages;
            if (!b || S("removePage", this, [b, h[b]]) != c.prevented) {
                if (a.pages[b]) {
                    p._bringClipToFront.call(g[b], !1);
                    var f = a.pages[b].data();
                    f.f && f.f.clip && f.f.clip.remove();
                    g[b].removeData();
                    g[b].detach();
                    delete g[b]
                }
                h[b] && h[b].detach();
                a.pageWrap[b] && (a.pageWrap[b].remove(),
                delete a.pageWrap[b]);
                (a.dynamicMode || d) && delete h[b];
                return !0
            }
            return !1
        },
        removePage: function(b) {
            var d = this.data("t");
            if ("*" == b)
                for (; 0 !== d.totalPages; )
                    this.turn("removePage", d.totalPages);
            else {
                if (1 > b || b > d.totalPages)
                    throw C("The page " + b + " doesn't exist");
                if (d.pageObjs[b] && (this.turn("stop"),
                !f._removePageFromDOM.call(this, b, !0)))
                    return !1;
                f._movePages.call(this, b, -1);
                d.totalPages -= 1;
                d.page > d.totalPages ? (d.page = null,
                f._fitPage.call(this, d.totalPages)) : (f._makeRange.call(this),
                this.turn("update"))
            }
            return this
        },
        _movePages: function(b, d) {
            var a, c = this, g = this.data("t"), l = g.display == o.single, i = function(a) {
                var b = a + d
                  , i = b % 2
                  , j = i ? " odd " : " even ";
                g.pageObjs[a] && (g.pageObjs[b] = g.pageObjs[a].removeClass("p" + a + " odd even").addClass("p" + b + j));
                if (g.pageWrap[a] && (g.pageWrap[b] = g.pageObjs[b].hasClass("fixed") ? g.pageWrap[a].attr("page", b) : g.pageWrap[a].css(f._pageSize.call(c, b, !0)).attr("page", b),
                g.pages[a] && (g.pages[b] = g.pages[a],
                g.pages[b].data("f").page = b,
                g.pages[b].data("f").next = l || i ? b + 1 : b - 1),
                d))
                    delete g.pages[a],
                    delete g.pageObjs[a],
                    delete g.pageWrap[a]
            };
            if (0 < d)
                for (a = g.totalPages; a >= b; a--)
                    i(a);
            else
                for (a = b; a <= g.totalPages; a++)
                    i(a)
        },
        display: function(b) {
            var d = this.data("t"), a;
            d.display && (a = 1 == d.display ? "single" : "double");
            if (void 0 === b)
                return a;
            if (1 == d.zoom && b != a) {
                if (!o[b])
                    throw C('"' + b + '" is not a value for display');
                var h = S("changeDisplay", this, [b, a]);
                if (!d.done || h != c.prevented) {
                    switch (b) {
                    case "single":
                        f._backPage.call(this, !0);
                        this.addClass("shadow");
                        break;
                    case "double":
                        f._backPage.call(this, !1),
                        this.removeClass("shadow")
                    }
                    d.display = o[b];
                    a && (h = this.turn("size"),
                    f._movePages.call(this, 1, 0),
                    this.turn("size", h.width, h.height),
                    this.turn("update"),
                    this.removeClass(a))
                }
                this.addClass(b);
                f._cloneView.call(this, !1);
                d.slider && v._resize.call(j(d.slider));
                return this
            }
        },
        direction: function(b) {
            var d = this.data("t"), a;
            d.direction && (a = 1 == d.direction ? "ltr" : "rtl");
            if (void 0 === b)
                return a;
            b = b.toLowerCase();
            if (!F[b])
                throw C('"' + b + '" is not a value for direction');
            "rtl" == b && j(this).attr("dir", "ltr").css({
                direction: "ltr"
            });
            d.direction = F[b];
            d.done && this.turn("size", j(this).width(), j(this).height());
            return this
        },
        animating: function() {
            var b = this.data("t");
            return 0 < b.pageMv.length || "turning" == b.status
        },
        isFlipping: function() {
            var b = this.data("t"), d;
            for (d in b.pages)
                if (L(d, b.pages) && b.pages[d].flip("isTurning"))
                    return !0;
            return !1
        },
        corner: function() {
            return this.data("t").corner || null
        },
        data: function() {
            return this.data("t")
        },
        disable: function(b) {
            var d, a = this.data("t"), c = this.turn("view");
            a.disabled = void 0 === b || !0 === b;
            for (d in a.pages)
                L(d, a.pages) && a.pages[d].flip("disable", a.disabled ? !0 : -1 == j.inArray(parseInt(d, 10), c));
            return this
        },
        disabled: function(b) {
            return void 0 === b ? !0 === this.data("t").disabled : this.turn("disable", b)
        },
        viewSize: function() {
            var b = this.turn("size");
            if (this.turn("display") == o["double"]) {
                var d = this.turn("view");
                if (!d[0] || !d[1])
                    b.width = Math.floor(b.width / 2)
            }
            return b
        },
        size: function(b, d) {
            if (void 0 === b || void 0 === d)
                return {
                    width: this.width(),
                    height: this.height()
                };
            var a = this.data("t"), c, g;
            this.turn("stop");
            this.css({
                width: b,
                height: d
            });
            if (1 < a.zoom)
                for (var l = this.turn("view"), i = 0; i < l.length; i++) {
                    if (c = l[i])
                        g = f._pageSize.call(this, c, !0),
                        a.pageObjs[c].css({
                            width: g.width,
                            height: g.height
                        }),
                        a.pageWrap[c].css(g),
                        a.pages[c] && (p._restoreClip.call(a.pages[c], !1, !0),
                        a.pages[c].flip("resize").css({
                            width: g.width,
                            height: g.height
                        }))
                }
            else
                for (c in a.pageWrap)
                    L(c, a.pageWrap) && (g = f._pageSize.call(this, c, !0),
                    a.pageObjs[c].css({
                        width: g.width,
                        height: g.height
                    }),
                    a.pageWrap[c].css(g),
                    a.pages[c] && (p._restoreClip.call(a.pages[c]),
                    a.pages[c].flip("resize").css({
                        width: g.width,
                        height: g.height
                    })));
            a.pages[0] && (a.pageWrap[0].css({
                left: -this.width()
            }),
            a.pages[0].flip("resize"));
            f._updateShadow.call(this);
            a.options.autoCenter && this.turn("center");
            this.css(f._position.call(this));
            a.pages[0] && (c = a.pages[0].data("f").tPage) && a.pageObjs[0].children().eq(0).css({
                width: a.pageObjs[c].width(),
                height: a.pageObjs[c].height()
            });
            a.peel && this.turn("peel", a.peel.corner, a.peel.x, a.peel.y, !1);
            return this
        },
        _size: function(b, d) {
            var a = f._defaultSize.call(this);
            a.width *= b;
            a.height *= b;
            d && f._halfWidth.call(this) && (a.width = Math.floor(a.width / 2));
            return a
        },
        _position: function(b) {
            var d = this.data("t")
              , a = b ? f._size.call(this, b) : this.turn("size")
              , c = {
                top: 0,
                left: 0
            };
            if (d.options.responsive && (c.top = d.viewerHeight / 2 - a.height / 2,
            c.left = d.viewerWidth / 2 - a.width / 2,
            1 == (b || d.zoom))) {
                b = d.margins;
                if (c.top < b[0] || c.top + a.height > d.viewerHeight - b[2])
                    c.top = b[0];
                if (c.left < b[1] || c.left + a.width > d.viewerWidth - b[3])
                    c.left = b[1]
            }
            return c
        },
        _view: function(b) {
            var d = this.data("t")
              , b = b || d.page;
            return d.display == o["double"] ? b % 2 ? [b - 1, b] : [b, b + 1] : [b]
        },
        view: function(b, d) {
            var a = this.data("t")
              , c = f._view.call(this, b)
              , g = [];
            a.display == o["double"] ? d ? (0 < c[0] && g.push(c[0]),
            c[1] <= a.totalPages && g.push(c[1])) : (0 < c[0] ? g.push(c[0]) : g.push(0),
            c[1] <= a.totalPages ? g.push(c[1]) : g.push(0)) : d ? 0 < c[0] && c[0] <= a.totalPages && g.push(c[0]) : 0 < c[0] && c[0] <= a.totalPages ? g.push(c[0]) : g.push(0);
            return g
        },
        stop: function() {
            var b = this.data("t"), d, a;
            if (this.turn("animating")) {
                var c = b.display == o.single;
                b.tpage && (b.page = b.tpage,
                delete b.tpage);
                for (; 0 < b.pageMv.length; )
                    if (a = b.pages[b.pageMv[0]],
                    d = a.data("f")) {
                        var g = d.peel;
                        d.peel = null;
                        a.flip("hideFoldedPage");
                        d.peel = g;
                        d.next = c ? d.page + 1 : 0 === d.page % 2 ? d.page - 1 : d.page + 1;
                        p._bringClipToFront.call(a, !1)
                    }
                b.status = "";
                this.turn("update")
            }
            return this
        },
        pages: function(b) {
            var d = this.data("t");
            if (b) {
                if (b < d.totalPages)
                    for (var a = d.totalPages; a > b; a--)
                        this.turn("removePage", a);
                d.totalPages = b;
                f._fitPage.call(this, d.page);
                return this
            }
            return d.totalPages
        },
        _missing: function(b) {
            var d = this.data("t");
            if (!(1 > d.totalPages)) {
                for (var a = this.turn("range", b), c = [], b = a[0]; b <= a[1]; b++)
                    d.pageObjs[b] || c.push(b);
                0 < c.length && this.trigger("missing", [c])
            }
        },
        _fitPage: function(b) {
            var d = this.data("t")
              , a = this.turn("view", b);
            d.range = this.turn("range", b);
            f._missing.call(this, b);
            d.pageObjs[b] && (-1 != j.inArray(1, a) ? this.addClass("first-page") : this.removeClass("first-page"),
            -1 != j.inArray(d.totalPages, a) ? this.addClass("last-page") : this.removeClass("last-page"),
            d.status = "",
            d.peel = null,
            d.page = b,
            d.display != o.single && this.turn("stop"),
            f._removeFromDOM.call(this),
            f._makeRange.call(this),
            f._updateShadow.call(this),
            f._cloneView.call(this, !1),
            this.trigger("turned", [b, a]),
            this.turn("update"),
            d.options.autoCenter && this.turn("center"))
        },
        _turnPage: function(b, d) {
            var a, h, g = this.data("t"), l = this.turn("view"), i = this.turn("view", b);
            g.display == o.single ? (a = l[0],
            h = i[0]) : l[1] && b > l[1] ? (a = l[1],
            h = i[0]) : l[0] && b < l[0] && (a = l[0],
            h = i[1]);
            var k = g.options.turnCorners.split(",")
              , m = g.pages[a].data("f")
              , p = m.dpoint;
            d || (d = "hard" == m.effect ? g.direction == F.ltr ? b > a ? "r" : "l" : b > a ? "l" : "r" : g.direction == F.ltr ? j.trim(k[b > a ? 1 : 0]) : j.trim(k[b > a ? 0 : 1]));
            if (g.page != b) {
                if (S("turning", this, [b, i, d]) == c.prevented) {
                    -1 != j.inArray(a, g.pageMv) && g.pages[a].flip("hideFoldedPage", !0);
                    return
                }
                -1 != j.inArray(1, i) ? (this.addClass("first-page"),
                this.trigger("first")) : this.removeClass("first-page");
                -1 != j.inArray(g.totalPages, i) ? (this.addClass("last-page"),
                this.trigger("last")) : this.removeClass("last-page")
            }
            g.status = "turning";
            g.range = this.turn("range", b);
            f._missing.call(this, b);
            g.pageObjs[b] && (f._cloneView.call(this, !1),
            Math.abs((g.tpage || g.page) - b) > l.length && this.turn("stop"),
            g.page = b,
            f._makeRange.call(this),
            g.tpage = h,
            m.dpoint = m.next != h ? null : p,
            m.next = h,
            -1 == g.pageMv.indexOf(h) ? g.pages[a].flip("turnPage", d) : (g.options.autoCenter && this.turn("center", h),
            g.status = "",
            g.pages[h].flip("hideFoldedPage", !0)),
            this.turn("update"))
        },
        page: function(b) {
            var d = this.data("t");
            if (void 0 === b)
                return d.page;
            1 < this.turn("zoom") && this.turn("zoomOut", {
                animate: !1
            });
            if (!d.disabled && !d.destroying) {
                b = parseInt(b, 10);
                if (0 < b && b <= d.totalPages)
                    return b != d.page && (!d.done || -1 != j.inArray(b, this.turn("view")) ? f._fitPage.call(this, b) : f._turnPage.call(this, b)),
                    this;
                throw C("The page " + b + " does not exist");
            }
        },
        pageElement: function(b) {
            return this.data("t").pageObjs[b]
        },
        next: function() {
            return this.turn("page", Math.min(this.data("t").totalPages, f._view.call(this, this.data("t").page).pop() + 1))
        },
        previous: function() {
            return this.turn("page", Math.max(1, f._view.call(this, this.data("t").page).shift() - 1))
        },
        peel: function(b, d, a, c) {
            var g = this.data("t");
            if (b) {
                if (1 == this.turn("zoom"))
                    if (c = void 0 !== c ? c : !0,
                    g.display == o.single)
                        g.peel = y(b, d, a),
                        g.pages[g.page].flip("peel", y(b, d, a), c);
                    else {
                        var f = this.turn("view")
                          , f = -1 != j.inArray(b, M.backward) ? f[0] : f[1];
                        g.pages[f] && (g.peel = y(b, d, a),
                        g.pages[f].flip("peel", g.peel, c))
                    }
            } else
                g.peel = null,
                this.turn("stop", !0);
            return this
        },
        _eventStart: function(b, d, a) {
            d = j(b.target).data("f");
            b.isDefaultPrevented() || (b = d.turnData,
            b.display == o.single && a && (d.next = "l" == a.charAt(1) && b.direction == F.ltr || "r" == a.charAt(1) && b.direction == F.rtl ? d.next < d.page ? d.next : d.page - 1 : d.next > d.page ? d.next : d.page + 1));
            f._updateShadow.call(d.turn)
        },
        _eventEnd: function(b, d, a) {
            var c = j(b.target)
              , b = c.data("f")
              , g = b.turn
              , l = b.turnData;
            if (a || !b.peel || b.peel.corner != b.dpoint.corner)
                c.flip("hide"),
                l.front.splice(l.front.indexOf(parseInt(b.next, 10)), 1),
                l.pageMv.splice(l.pageMv.indexOf(parseInt(b.page, 10)), 1),
                0 === l.front.length && (l.corner = null);
            a ? (d = l.tpage || l.page,
            d == b.next || d == b.page ? (delete l.tpage,
            f._fitPage.call(g, d || b.next, !0)) : l.pageWrap[b.page].hide()) : l.display == o.single && d == l.tpage ? (delete l.tpage,
            f._fitPage.call(g, d, !0)) : (g.turn("update"),
            f._updateShadow.call(g))
        },
        _eventFlip: function(b) {
            var d = j(b.target).data("f");
            b.stopPropagation();
            d.turn.trigger("turn", [d.next]);
            d.turnData.options.autoCenter && d.turn.turn("center", d.next)
        },
        _touchStart: function(b) {
            var d = j(this)
              , a = d.data("t");
            j(b.target);
            a.finger = K(b);
            a.fingerZoom = a.zoom;
            for (var c in a.pages)
                if (L(c, a.pages) && p._start.call(a.pages[c], b)) {
                    a.tmpListeners || (a.tmpListeners = {},
                    a.tmpListeners.tap = D(d, "tap", !0),
                    a.tmpListeners.doubleTap = D(d, "doubleTap", !0));
                    b.preventDefault();
                    return
                }
            a.options.smartFlip && b.preventDefault()
        },
        _touchMove: function(b) {
            var d = this.data("t"), a;
            for (a in d.pages)
                L(a, d.pages) && p._move.call(d.pages[a], b);
            if (d.finger)
                a = j.extend({}, d.finger),
                d.tmpListeners || (d.tmpListeners = {},
                d.tmpListeners.tap = D(this, "tap", !0),
                d.tmpListeners.doubleTap = D(this, "doubleTap", !0)),
                d.finger = K(b),
                d.finger.prev = a,
                1 < d.zoom && (!R || R && 1 == b.originalEvent.touches.length) && this.turn("scroll", d.scroll.left + a.x - d.finger.x, d.scroll.top + a.y - d.finger.y);
            else if (!R && 1 < d.zoom && d.options.autoScroll) {
                d.initScroll || (d.initScroll = this.turn("scroll"),
                d.initCursor = K(b));
                b = K(b);
                a = u(d.initScroll.x, d.initScroll.y);
                var c = this.turn("scrollSize");
                b.x < d.initCursor.x ? a.x = d.initScroll.left * (b.x / d.initCursor.x) : b.x > d.initCursor.x && (a.x = d.initScroll.left + (c.width - d.initScroll.left) * ((b.x - d.initCursor.x) / (d.viewerWidth - d.initCursor.x)));
                b.y < d.initCursor.y ? a.y = d.initScroll.top * (b.y / d.initCursor.y) : b.y > d.initCursor.y && (a.y = d.initScroll.top + (c.height - d.initScroll.top) * ((b.y - d.initCursor.y) / (d.viewerHeight - d.initCursor.y)));
                this.turn("scroll", a.x, a.y)
            }
        },
        _touchEnd: function(b) {
            var d = this.data("t")
              , a = this;
            setTimeout(function() {
                if (d.tmpListeners) {
                    for (var b = d.tmpListeners.tap, c = 0; c < b.length; c++)
                        a.bind("tap", b[c]);
                    b = d.tmpListeners.doubleTap;
                    for (c = 0; c < b.length; c++)
                        a.bind("doubleTap", b[c]);
                    delete d.tmpListeners
                }
            }, 1);
            if (d.finger) {
                for (var c in d.pages)
                    L(c, d.pages) && p._end.call(d.pages[c], b);
                delete d.finger;
                delete d.fingerZoom;
                d.zoomed && (f.zoom.apply(this, d.zoomed),
                delete d.zoomed)
            }
        },
        _eventSwipe: function(b, d) {
            var a = j(this)
              , c = a.data("t");
            if (!a.turn("isFlipping") && 1 == c.zoom) {
                var g = c.direction == F.ltr, f;
                if (-0.5 > d)
                    if (f = a.turn("view").pop(),
                    c.display == o["double"]) {
                        if (a.turn("animating"))
                            if (g) {
                                if (0 === c.pageMv[0] % 2)
                                    return
                            } else if (0 !== c.pageMv[0] % 2)
                                return;
                        a.turn("next")
                    } else
                        -1 != j.inArray(c.corner, M.forward) ? a.turn("next") : 1 < f && c.pages[f - 1] && (c.pages[f].data("f").status = "swiped",
                        c.pages[f - 1].flip("turnPage", c.pages[f - 1].data("f").point.corner));
                else if (0.5 < d)
                    if (f = a.turn("view").shift(),
                    c.display == o["double"]) {
                        if (a.turn("animating"))
                            if (g) {
                                if (0 !== c.pageMv[0] % 2)
                                    return
                            } else if (0 === c.pageMv[0] % 2)
                                return;
                        a.turn("previous")
                    } else
                        -1 != j.inArray(c.corner, M.backward) ? a.turn("previous") : (c.pages[f].data("f").status = "swiped",
                        c.pages[f].flip("hideFoldedPage", !0))
            }
        },
        _resizeObserver: function() {
            if (this.turn("is")) {
                var b = this.data("t")
                  , d = b.options.viewer;
                if (b.viewerWidth != d.width() || b.viewerHeight != d.height())
                    b.viewerWidth = d.width(),
                    b.viewerHeight = d.height(),
                    f._resize.call(this);
                setTimeout(j.proxy(f._resizeObserver, this), 10)
            }
        },
        _defaultSize: function(b) {
            var d = this.data("t")
              , a = d.viewerWidth - d.margins[1] - d.margins[3]
              , c = d.viewerHeight - d.margins[0] - d.margins[2]
              , g = V({
                width: d.options.width,
                height: d.options.height,
                boundWidth: Math.min(d.options.width, a),
                boundHeight: Math.min(d.options.height, c)
            });
            if (d.options.responsive) {
                a = V({
                    width: d.options.width / 2,
                    height: d.options.height,
                    boundWidth: Math.min(d.options.width / 2, a),
                    boundHeight: Math.min(d.options.height, c)
                });
                d = d.viewerWidth * d.viewerHeight;
                if (d - a.width * a.height < d - g.width * g.height && !b || b == o.single)
                    return {
                        width: a.width,
                        height: a.height,
                        display: "single"
                    };
                0 !== g.width % 2 && (g.width -= 1)
            }
            return {
                width: g.width,
                height: g.height,
                display: "double"
            }
        },
        _resize: function() {
            var b, d, a, c = this.data("t");
            if (c.options.responsive) {
                var g = this.turn("view");
                if (1 == c.zoom) {
                    a = c.options.defaultZoomMargin;
                    b = c.options.viewer;
                    if (a) {
                        var i;
                        d = function(a, b) {
                            c.margins[(a - 1) / 2] = "%" == i[a + 1] ? Math.max(0, i[a] / 100 * b) : Math.max(0, parseInt(i[a], 10))
                        }
                        ;
                        if (i = /^(\d+)(px|%)\s+(\d+)(px|%)$/.exec(a))
                            d(1, b.height()),
                            d(3, b.width()),
                            c.margins[2] = c.margins[0],
                            c.margins[3] = c.margins[1];
                        else if (i = /^(\d+)(px|%)\s+(\d+)(px|%)\s+(\d+)(px|%)\s+(\d+)(px|%)$/.exec(a))
                            d(1, b.height()),
                            d(3, b.width()),
                            d(5, b.height()),
                            d(7, b.width())
                    }
                    b = c.slider;
                    c.slider = null;
                    a = f._defaultSize.call(this);
                    this.turn("display", a.display);
                    c.slider = b;
                    a.display != c.display && (a = f._defaultSize.call(this, c.display));
                    this.turn("size", a.width * c.zoom, a.height * c.zoom)
                } else
                    this.turn("scroll", c.scroll.left, c.scroll.top);
                if (c.zoomer) {
                    a = f._defaultSize.call(this, c.display);
                    c.zoomer.css({
                        width: a.width,
                        height: a.height
                    });
                    d = c.zoomer.children();
                    for (b = 0; b < d.length; b++)
                        j(d[b]).css({
                            width: a.width / g.length,
                            height: a.height
                        })
                }
                c.slider && v._resize.call(j(c.slider))
            }
        },
        focusPoint: function() {
            var b = this.data("t");
            if (b.focusPoint)
                return b.focusPoint;
            b = this.turn("view");
            return b[0] ? b[1] ? u(this.width() / 2, this.height() / 2) : u(3 * this.width() / 4, this.height() / 2) : u(this.width() / 4, this.height() / 2)
        },
        maxZoom: function() {
            var b = this.data("t");
            if (b.options.responsive) {
                var d = b.viewerHeight - b.margins[0] - b.margins[2];
                return b.options.width / V({
                    width: b.options.width,
                    height: b.options.height,
                    boundWidth: Math.min(b.options.width, b.viewerWidth - b.margins[1] - b.margins[3]),
                    boundHeight: Math.min(b.options.height, d)
                }).width
            }
            return b.options.zoom
        },
        zoomIn: function(b) {
            this.data("t");
            return this.turn("zoom", this.turn("maxZoom"), b)
        },
        zoomOut: function(b) {
            return this.turn("zoom", 1, b)
        },
        _halfWidth: function() {
            var b = this.data("t")
              , d = this.turn("view");
            return b.display == o["double"] && b.options.autoCenter && (!d[0] || !d[1])
        },
        scrollSize: function() {
            var b = this.data("t")
              , d = this.turn("size")
              , a = f._halfWidth.call(this) ? d.width / 2 : d.width;
            return {
                width: Math.max(0, a - b.viewerWidth),
                height: Math.max(0, d.height - b.viewerHeight)
            }
        },
        scroll: function(b, d) {
            var a = this.data("t");
            if (void 0 === d && void 0 === b)
                return a.scroll;
            if (1 < a.zoom && !a.zooming) {
                var h = this.turn("size");
                this.turn("view");
                var g = this.turn("scrollSize")
                  , h = u(a.viewerWidth / 2 - h.width / 2, a.viewerHeight / 2 - h.height / 2)
                  , d = Math.min(g.height, Math.max(0, d))
                  , b = Math.min(g.width, Math.max(0, b));
                S("scrolling", this, [b, d]) != c.prevented && (h.x = h.x + g.width / 2 - b,
                h.y = h.y + g.height / 2 - d,
                this.css({
                    left: h.x,
                    top: h.y
                }),
                a.scroll = {
                    top: d,
                    left: b
                })
            }
            return this
        },
        _mouseRel: function(b) {
            var d = this.offset()
              , a = this.data("t")
              , c = this.turn("size")
              , b = u(b.pageX - d.left, b.pageY - d.top);
            if (a.display == o["double"] && a.options.autoCenter)
                if (a = this.turn("view"),
                a[0])
                    if (a[1]) {
                        if (0 > b.x || b.x > c.width)
                            return null
                    } else {
                        if (b.x = b.x,
                        0 > b.x || b.x > c.width / 2)
                            return null
                    }
                else if (b.x -= c.width / 2,
                0 > b.x || b.x > c.width / 2)
                    return null;
            return b
        },
        zoom: function(b, d) {
            var a = this.data("t");
            if (void 0 === b)
                return a.zoom;
            var d = d || {}
              , h = this.turn("size")
              , g = f._halfWidth.call(this);
            if ("pageX"in d && "pageY"in d) {
                var i = f._mouseRel.call(this, d);
                if (null === i)
                    return this;
                d = j.extend(d, i);
                "factor"in d && (b = d.factor * a.fingerZoom,
                d.animate = !1)
            } else
                "x"in d && "y"in d || (d.x = g ? h.width / 4 : h.width / 2,
                d.y = h.height / 2);
            if (a.zooming || S("zooming", this, [b, a.zoom]) != c.prevented) {
                var t, m = this, i = a.zoom, p = this.turn("view"), s = parseFloat(Math.min(this.turn("maxZoom"), Math.max(1, b)), 10), v = f._position.call(this, s), w = k + "transition", x = void 0 === d.animate ? !0 : d.animate, y = this.offset(), D = a.options.viewer.offset(), B = f._size.call(this, s, !0), E = s > a.zoom ? s : 1 / a.zoom * s, C = a.display == o["double"] && a.options.autoCenter, L = u(Math.max(0, B.width - a.viewerWidth), Math.max(0, B.height - a.viewerHeight)), E = u(d.x * E - y.left - d.x, d.y * E - d.y - y.top);
                C && !p[0] && (E.x -= h.width / 2);
                E = u(Math.min(L.x, Math.max(0, E.x)), Math.min(L.y, Math.max(0, E.y)));
                g && (v.left += B.width / 2);
                g = u(D.left - y.left + Math.max(0, v.left), D.top - y.top + Math.max(0, v.top));
                C && !p[0] && (g.x -= B.width);
                var N = r(g.x - E.x, g.y - E.y) + q(s, s, !0);
                this.turn("stop");
                this.turn("disable", !0);
                f._cloneView.call(this, !0);
                a.zoomer.css({
                    visibility: "visible"
                });
                if (x) {
                    if (s < i)
                        for (t in a.pageWrap)
                            a.pageWrap[t].css({
                                visibility: "hidden"
                            });
                    a.zooming = !0;
                    t = h.width / a.zoomer.width();
                    a.zoomer.transform(q(t, t, !0), "0% 0%");
                    setTimeout(function() {
                        var b = {};
                        b[w] = k + "transform 0.5s ease-in-out";
                        a.zoomer.css(b);
                        a.zoomer.transform(N, "0% 0%")
                    }, 0);
                    Y(a.zoomer, function() {
                        a.finger || m.turn("zoom", b, {
                            animate: false,
                            x: d.x,
                            y: d.y
                        })
                    })
                } else if (B = {},
                h = a.peel,
                B[w] = "",
                a.zoomer.css(B),
                a.zoomer.transform(N, "0% 0%"),
                "factor"in d) {
                    if (s < i)
                        for (t in a.pageWrap)
                            a.pageWrap[t].css({
                                visibility: "hidden"
                            });
                    a.zoomed = [b, {
                        x: d.x,
                        y: d.y,
                        animate: !1
                    }]
                } else {
                    for (t in a.pageWrap)
                        a.pageWrap[t].css({
                            visibility: ""
                        });
                    a.zoom = b;
                    B = f._defaultSize.call(this);
                    B.width *= s;
                    B.height *= s;
                    a.zoom = s;
                    a.zooming = !1;
                    delete a.initScroll;
                    delete a.initCursor;
                    a.peel = null;
                    this.turn("display", B.display);
                    this.turn("size", B.width, B.height);
                    this.turn("scroll", E.x, E.y);
                    1 == s ? (this.turn("disable", !1),
                    h && this.turn("peel", h.corner, h.x, h.y, !0)) : a.peel = h;
                    a.options.autoScaleContent && this.turn("scaleContent", s);
                    S("zoomed", this, [s, i]);
                    a.zoomer.css({
                        visibility: "hidden"
                    })
                }
            }
            return this
        },
        calculateZ: function() {
            var b = this.data("t"), d = {
                pageZ: {},
                pageV: {}
            }, a = b.pageMv.length, c = b.front.length, g, f, i;
            if (b.display == o.single) {
                for (g = 0; g < a; g++)
                    d.pageV[b.pageMv[g]] = !0,
                    d.pageV[b.pages[b.pageMv[g]].data("f").next] = !0,
                    d.pageZ[b.pageMv[g]] = 3 + (a - g);
                d.pageV[0] = !0;
                d.pageZ[0] = 3 + a + 1
            } else {
                for (g = 0; g < a; g++) {
                    i = this.turn("view", b.pageMv[g]);
                    for (f = 0; f < i.length; f++)
                        d.pageV[i[f]] = !0;
                    d.pageZ[b.pageMv[g]] = 3 + (a - g)
                }
                for (g = 0; g < c; g++) {
                    i = this.turn("view", b.front[g]);
                    d.pageZ[b.front[g]] = 3 + a + 1 + g;
                    for (f = 0; f < i.length; f++)
                        d.pageV[i[f]] = !0
                }
            }
            return d
        },
        scaleContent: function(b) {
            for (var d = this.data("t"), a = this.turn("view"), c = 0; c < a.length; c++)
                a[c] && d.pageObjs[a[c]].transform("scale(" + b + ")", "0% 0%")
        },
        update: function() {
            var b, d, a = this.data("t");
            if (this.turn("animating") && 0 !== a.pageMv[0]) {
                var c, g = this.turn("calculateZ"), i = this.turn("view"), k = this.turn("view", a.tpage);
                d = "" === a.status ? a.options.hover : !1;
                for (b in a.pageWrap)
                    L(b, a.pageWrap) && (c = a.pageObjs[b].hasClass("fixed"),
                    a.pageWrap[b].css({
                        display: g.pageV[b] || c ? "" : "none",
                        zIndex: g.pageZ[b] || (c ? -1 : 0)
                    }),
                    a.tpage ? a.pages[b].flip("hover", !1).flip("disable", -1 == j.inArray(parseInt(b, 10), a.pageMv) && b != k[0] && b != k[1]) : a.pages[b].flip("hover", d).flip("disable", b != i[0] && b != i[1]))
            } else
                for (b in d = a.options.hover,
                a.pageWrap)
                    L(b, a.pageWrap) && (c = f._setPageLoc.call(this, b),
                    a.pages[b] && a.pages[b].flip("disable", a.disabled || 1 != c).flip("hover", d));
            return this
        },
        _updateShadow: function() {
            var b, d = this.data("t"), a = this.width(), c = this.height(), g = d.display == o.single ? a : a / 2, f = this.turn("view");
            d.shadow || (d.shadow = j("<div />", {
                "class": "shadow",
                css: s(0, 0, 0).css
            }).appendTo(this));
            for (var i = 0; i < d.pageMv.length && f[0] && f[1]; i++)
                f = this.turn("view", d.pages[d.pageMv[i]].data("f").next),
                b = this.turn("view", d.pageMv[i]),
                f[0] = f[0] && b[0],
                f[1] = f[1] && b[1];
            switch (f[0] ? f[1] ? 3 : d.direction == F.ltr ? 2 : 1 : d.direction == F.ltr ? 1 : 2) {
            case 1:
                d.shadow.css({
                    width: g,
                    height: c,
                    top: 0,
                    left: g
                });
                break;
            case 2:
                d.shadow.css({
                    width: g,
                    height: c,
                    top: 0,
                    left: 0
                });
                break;
            case 3:
                d.shadow.css({
                    width: a,
                    height: c,
                    top: 0,
                    left: 0
                })
            }
        },
        _setPageLoc: function(b) {
            var d = this.data("t")
              , a = this.turn("view")
              , c = this.turn("animating");
            if (b == a[0] || b == a[1])
                return c || d.pageWrap[b].css({
                    zIndex: 2,
                    display: ""
                }),
                1;
            if (d.display == o.single && b == a[0] + 1 || d.display == o["double"] && b == a[0] - 2 || b == a[1] + 2)
                return c || d.pageWrap[b].css({
                    zIndex: 1,
                    display: ""
                }),
                2;
            !c && -1 == d.front.indexOf(parseInt(b, 10)) && (d.pageWrap[b].css({
                zIndex: 0,
                display: d.pageObjs[b].hasClass("fixed") ? "" : "none"
            }),
            d.pages[b] && (d.pages[b].data("f").visible = !1));
            return 0
        },
        options: function(b) {
            if (void 0 === b)
                return this.data("t").options;
            var d = this.data("t");
            j.extend(d.options, b);
            b.pages && this.turn("pages", b.pages);
            b.page && this.turn("page", b.page);
            b.display && this.turn("display", b.display);
            b.direction && this.turn("direction", b.direction);
            b.width && b.height && this.turn("size", b.width, b.height);
            if (b.cornerPosition) {
                var a = b.cornerPosition.split(" ");
                d.options.cornerPosition = u(parseInt(a[0], 10), parseInt(a[1], 10))
            }
            b.defaultZoomMargin && f._resize.call(this);
            if (b.events)
                for (var c in b.events)
                    L(c, b.events) && this.unbind(c).bind(c, b.events[c]);
            return this
        },
        version: function() {
            return "5"
        },
        _cloneView: function(b) {
            var d = this.data("t");
            if (d.zoomer)
                b ? d.zoomer.show() : (d.zoomer.remove(),
                delete d.zoomer);
            else if (b) {
                var a, c = this.turn("view"), g = j("<div />");
                g.css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1E5,
                    width: this.width(),
                    height: this.height()
                });
                for (var i = 0; i < c.length; i++)
                    c[i] && (b = f._pageSize.call(this, c[i], !0),
                    b.position = "absolute",
                    a = d.pageObjs[c[i]].clone(),
                    a.css(b),
                    a.appendTo(g));
                g.appendTo(this);
                d.zoomer = g
            }
        }
    }, p = {
        init: function(b) {
            var d = this.parent().parent()
              , b = b || {};
            b.disabled = !1;
            b.hover = !1;
            b.effect = this.hasClass("hard") ? "hard" : "sheet";
            b.turn = d;
            b.turnData = d.data("t");
            this.data("f", j.extend(this.data("f") || {}, b));
            p._addPageWrapper.call(this);
            return this
        },
        _cornerAllowed: function() {
            var b = this.data("f")
              , d = b.page
              , a = b.turnData
              , c = a.direction == F.ltr
              , g = d % 2;
            switch (b.effect) {
            case "hard":
                return c ? [g ? "r" : "l"] : [g ? "l" : "r"];
            case "sheet":
                return a.display == o.single ? 1 == d ? c ? M.forward : M.backward : d == a.totalPages ? c ? M.backward : M.forward : "tapping" == b.status ? M.all : c ? M.forward : M.backward : c ? M[g ? "forward" : "backward"] : M[g ? "backward" : "forward"]
            }
        },
        _cornerActivated: function(b) {
            var d = this.width()
              , a = this.height()
              , b = y("", b.x, b.y);
            if (0 >= b.x || 0 >= b.y || b.x >= d || b.y >= a)
                return !1;
            var c = this.data("f")
              , g = c.turnData.options.cornerSize
              , f = p._cornerAllowed.call(this);
            switch (c.effect) {
            case "hard":
                if (b.x > d - g)
                    b.corner = "r";
                else if (b.x < g)
                    b.corner = "l";
                else
                    return !1;
                break;
            case "sheet":
                (b.y < g ? b.corner += "t" : b.y >= a - g && (b.corner += "b"),
                b.x <= g) ? b.corner += "l" : b.x >= d - g && (b.corner += "r")
            }
            return !b.corner || -1 == j.inArray(b.corner, f) ? !1 : b
        },
        _isIArea: function(b) {
            var b = K(b)
              , d = this.data("f")
              , d = (d.clip || d.ipage).parent().offset();
            return p._cornerActivated.call(this, u(b.x - d.left, b.y - d.top))
        },
        _startPoint: function(b, d) {
            var a, d = d || u(0, 0);
            switch (b) {
            case "tr":
                d.x = this.width() - d.x;
                break;
            case "bl":
                d.y = this.height() - d.y;
                break;
            case "br":
                d.x = this.width() - d.x;
                d.y = this.height() - d.y;
                break;
            case "l":
                a = this.data("f");
                a.startPoint && (d.y = a.startPoint.y);
                break;
            case "r":
                d.x = this.width() - d.x,
                a = this.data("f"),
                a.startPoint && (d.y = a.startPoint.y)
            }
            return d
        },
        _endPoint: function(b, d) {
            var a, d = d || u(0, 0);
            switch (b) {
            case "tl":
                d.x = 2 * this.width() - d.x;
                break;
            case "tr":
                d.x = -this.width() + d.x;
                break;
            case "bl":
                d.x = 2 * this.width() - d.x;
                d.y = this.height() - d.y;
                break;
            case "br":
                d.x = -this.width() + d.x;
                d.y = this.height() - d.y;
                break;
            case "l":
                d.x = 2 * this.width() - d.x;
                a = this.data("f");
                a.startPoint && (d.y = a.startPoint.y);
                break;
            case "r":
                d.x = -this.width() - d.x,
                a = this.data("f"),
                a.startPoint && (d.y = a.startPoint.y)
            }
            return d
        },
        _foldingPage: function(b) {
            var d = this.data("f");
            if (d) {
                var a = d.turnData
                  , b = b || "pageObjs";
                return a.display == o.single ? a[b][0] : d.over ? a[b][d.over] : a[b][d.next]
            }
            return !1
        },
        resize: function() {
            var b = this.data("f")
              , d = this.width()
              , a = this.height();
            switch (b.effect) {
            case "hard":
                b.ipage.css({
                    width: d,
                    height: a
                });
                b.igradient.css({
                    width: d,
                    height: a
                });
                b.ogradient.css({
                    width: d,
                    height: a
                });
                break;
            case "sheet":
                var c = Math.round(Math.sqrt(d * d + a * a));
                b.clip.css({
                    width: c,
                    height: c
                });
                b.ipage.css({
                    width: d,
                    height: a
                });
                b.igradient.css({
                    width: 100,
                    height: 2 * a,
                    top: -a / 2
                });
                b.ogradient.css({
                    width: 100,
                    height: 2 * a,
                    top: -a / 2
                })
            }
            return this
        },
        _addPageWrapper: function() {
            var b = this.data("f"), d = this.parent(), a;
            if (!b.ipage) {
                var c = j("<div />", {
                    "class": "inner-page"
                })
                  , g = j("<div />", {
                    "class": "inner-gradient"
                })
                  , f = j("<div />", {
                    "class": "outer-gradient"
                });
                switch (b.effect) {
                case "hard":
                    a = s(0, 0, 2).css;
                    a[k + "transform-style"] = "preserve-3d";
                    a[k + "backface-visibility"] = "hidden";
                    c.css(a).appendTo(d).prepend(this);
                    g.css(s(0, 0, 0).css).appendTo(c);
                    f.css(s(0, 0, 0));
                    b.ipage = c;
                    b.igradient = g;
                    b.ogradient = f;
                    break;
                case "sheet":
                    var i = j("<div />", {
                        "class": "clip"
                    });
                    a = s(0, 0, 0).css;
                    i.css(j.extend({
                        "pointer-events": "none"
                    }, a));
                    c.css(j.extend({
                        cursor: "default"
                    }, a));
                    a.zIndex = 1;
                    g.css(j.extend({
                        background: ea(!0),
                        display: "none",
                        visibility: "hidden"
                    }, a));
                    f.css(j.extend({
                        background: ea(!1),
                        visibility: "hidden"
                    }, a));
                    g.appendTo(c);
                    c.appendTo(i).prepend(this);
                    f.appendTo(d);
                    i.appendTo(d);
                    b.clip = i;
                    b.ipage = c;
                    b.igradient = g;
                    b.ogradient = f
                }
            }
            p.resize.call(this)
        },
        _hard: function(b) {
            var d = this.data("f")
              , a = d.turnData
              , c = this.width();
            this.height();
            var g = "l" == b.corner, f = p._startPoint.call(this, b.corner), i = a.totalPages, j = d.options["z-index"] || i, m = {
                overflow: "visible"
            }, o, q, s, r;
            b.x = g ? Math.min(Math.max(b.x, 0), 2 * c) : Math.max(Math.min(b.x, c), -c);
            var c = f.x ? (f.x - b.x) / c : b.x / c
              , v = 90 * c
              , w = 90 > v
              , x = a.pages[d.next].data("f");
            g ? (q = "0% 50%",
            s = "100% 50%",
            w ? (g = 0,
            r = d.next - 1,
            o = 0 < r,
            f = d.page,
            i = 1) : (g = "100%",
            r = d.page + 1,
            o = r < i,
            f = d.next,
            i = 0)) : (q = "100% 50%",
            s = "0% 50%",
            v = -v,
            w ? (g = 0,
            r = d.next + 1,
            f = d.page,
            o = r < i,
            i = 0) : (g = "-100%",
            r = d.page - 1,
            f = d.next,
            o = 0 < r,
            i = 1));
            m[k + "perspective-origin"] = s;
            a.pageWrap[d.page].css(m);
            d.ipage.transform("rotateY(" + v + "deg)translate3d(0px, 0px, " + (this.attr("depth") || 0) + "px)", s);
            x.ipage.transform("rotateY(" + (180 + v) + "deg)", q);
            w ? (c = -c + 1,
            d.ipage.css({
                zIndex: j + 1
            }),
            x.ipage.css({
                zIndex: j
            })) : (c -= 1,
            d.ipage.css({
                zIndex: j
            }),
            x.ipage.css({
                zIndex: j + 1
            }));
            if (a.options.gradients && (o ? (j = a.pages[r].data("f"),
            d.ogradient.parent()[0] != j.ipage[0] && d.ogradient.appendTo(j.ipage),
            d.ogradient.css({
                left: g,
                backgroundColor: "black",
                opacity: 0.5 * c
            }).transform("rotateY(0deg)")) : d.ogradient.css({
                opacity: 0
            }),
            a = a.pages[f].data("f"),
            d.igradient.parent()[0] != a.ipage[0] && d.igradient.appendTo(a.ipage),
            d.igradient.css({
                opacity: -c + 1
            }),
            a = d.igradient,
            j = u(100 * i, 0),
            m = u(100 * (-i + 1), 0),
            i = [[0, "rgba(0,0,0,0.3)"], [1, "rgba(0,0,0,0)"]],
            g = [],
            "-webkit-" == k)) {
                for (c = 0; 2 > c; c++)
                    g.push("color-stop(" + i[c][0] + ", " + i[c][1] + ")");
                a.css({
                    "background-image": "-webkit-gradient(linear, " + j.x + "% " + j.y + "%," + m.x + "% " + m.y + "%, " + g.join(",") + " )"
                })
            }
            d.point = y(b.corner, b.x, b.y)
        },
        _pageCURL: function(b) {
            var d = this.data("f"), a = d.turnData, c = this.width(), g = this.height(), f, i, j, k, m = this, o = 0, s, v, w, x = u(0, 0), D = u(0, 0), E = u(0, 0);
            p._foldingPage.call(this);
            var C = a.options.acceleration, L = d.clip.height(), K = function() {
                f = p._startPoint.call(m, b.corner);
                var d;
                d = c - f.x - b.x;
                var q = f.y - b.y
                  , r = Math.atan2(q, d);
                d = Math.sqrt(d * d + q * q);
                r = u(c - f.x - Math.cos(r) * c, f.y - Math.sin(r) * c);
                d > c && (b.x = r.x,
                b.y = r.y);
                var q = u(0, 0)
                  , y = u(0, 0);
                q.x = f.x ? f.x - b.x : b.x;
                q.y = aa ? f.y ? f.y - b.y : b.y : 0;
                y.x = j ? c - q.x / 2 : b.x + q.x / 2;
                y.y = q.y / 2;
                r = U - Math.atan2(q.y, q.x);
                d = r - Math.atan2(y.y, y.x);
                d = Math.sin(d) * Math.sqrt(y.x * y.x + y.y * y.y);
                E = u(d * Math.sin(r), d * Math.cos(r));
                if (r > U) {
                    E.x += Math.abs(E.y * q.y / q.x);
                    E.y = 0;
                    if (Math.round(E.x * Math.tan(B - r)) < g)
                        return b.y = Math.sqrt(Math.pow(g, 2) + 2 * y.x * q.x),
                        i && (b.y = g - b.y),
                        K();
                    d = B - r;
                    q = L - g / Math.sin(d);
                    x = u(Math.round(q * Math.cos(d)), Math.round(q * Math.sin(d)));
                    j && (x.x = -x.x);
                    i && (x.y = -x.y)
                }
                o = Math.round(18E3 * (r / B)) / 100;
                k = Math.round(E.y / Math.tan(r) + E.x);
                d = c - k;
                q = Math.min(g, d * Math.tan(r));
                0 > q && (q = g);
                var y = d * Math.cos(2 * r)
                  , C = d * Math.sin(2 * r);
                D = u(Math.round(j ? d - y : k + y), Math.round(i ? C : g - C));
                a.options.gradients && (y = p._endPoint.call(m, b.corner),
                w = Math.sqrt(Math.pow(y.x - b.x, 2) + Math.pow(y.y - b.y, 2)) / c,
                s = Math.min(100, d * Math.sin(r)),
                v = 1.3 * Math.min(d, q));
                E.x = Math.round(E.x);
                E.y = Math.round(E.y);
                return !0
            }, M = function(b, f, l, m) {
                var o = ["0", "auto"]
                  , p = (c - L) * l[0] / 100
                  , u = (g - L) * l[1] / 100
                  , o = {
                    left: o[f[0]],
                    top: o[f[1]],
                    right: o[f[2]],
                    bottom: o[f[3]]
                }
                  , y = 90 != m && -90 != m ? j ? -1 : 1 : 0
                  , B = l[0] + "% " + l[1] + "%"
                  , f = a.pages[d.over].data("f")
                  , I = d.clip.parent().position().left - a.pageWrap[d.over].position().left;
                d.ipage.css(o).transform(N(m) + r(b.x + y, b.y, C), B);
                f.ipage.css(o).transform(N(m) + r(b.x + D.x - x.x - c * l[0] / 100, b.y + D.y - x.y - g * l[1] / 100, C) + N(Math.round(100 * (180 / m - 2) * m) / 100), B);
                d.clip.transform(r(-b.x + p - y, -b.y + u, C) + N(-m), B);
                f.clip.transform(r(I - b.x + x.x + p, -b.y + x.y + u, C) + N(-m), B);
                a.options.gradients && (i ? (j ? (l = m - 90,
                p = k - 50,
                s = -s) : (l = m - 270,
                p = c - k - 50),
                b = "50% 25%") : (j ? (p = k - 50,
                l = m - 270,
                s = -s) : (p = c - k - 50,
                l = m - 90),
                b = "50% 75%"),
                u = Math.max(0.5, 2 - w),
                1 < u && (u = 1.7 <= u ? (2 - u) / 0.3 : 1),
                f.igradient.css({
                    opacity: Math.round(100 * u) / 100
                }).transform(r(p, 0, C) + N(l) + q(s / 100, 1, C), b),
                i ? (j ? (l = -270 - m,
                v = -v,
                p = c - k - 20) : (l = -90 - m,
                p = k - 20),
                b = "20% 25%") : (j ? (l = -90 - m,
                p = c - k - 20,
                v = -v) : (l = 90 - m,
                p = k - 20),
                b = "20% 75%"),
                u = 0.3 > w ? w / 0.3 : 1,
                d.ogradient.css({
                    opacity: Math.round(100 * u) / 100
                }).transform(r(p, 0, C) + N(l) + q(-v / 100, 1, C), b))
            }, O, F, J, P;
            d.point = y(b.corner, b.x, b.y);
            switch (b.corner) {
            case "l":
                F = b.y - d.startPoint.y;
                J = b.x;
                P = Math.atan2(F, J);
                0 < P ? (O = d.startPoint.y,
                F = Math.sqrt(J * J + F * F),
                O = 2 * O * Math.sin(P) + F,
                b.x = O * Math.cos(P),
                b.y = O * Math.sin(P),
                b.corner = "tl",
                i = j = !0,
                K(),
                M(E, [1, 0, 0, 1], [100, 0], o)) : (P = -P,
                O = g - d.startPoint.y,
                F = Math.sqrt(J * J + F * F),
                O = 2 * O * Math.cos(U - P) + F,
                b.x = O * Math.cos(P),
                b.y = g - O * Math.sin(P),
                b.corner = "bl",
                j = !0,
                K(),
                M(u(E.x, -E.y), [1, 1, 0, 0], [100, 100], -o));
                break;
            case "r":
                F = d.startPoint.y - b.y;
                J = c - b.x;
                P = Math.atan2(F, J);
                0 > P ? (O = d.startPoint.y,
                P = -P,
                F = Math.sqrt(J * J + F * F),
                O = 2 * O * Math.sin(P) + F,
                b.x = c - O * Math.cos(P),
                b.y = O * Math.sin(P),
                b.corner = "tr",
                i = !0,
                K(),
                M(u(-E.x, E.y), [0, 0, 0, 1], [0, 0], -o)) : (O = g - d.startPoint.y,
                F = Math.sqrt(J * J + F * F),
                O = 2 * O * Math.cos(U - P) + F,
                b.x = c - O * Math.cos(P),
                b.y = g - O * Math.sin(P),
                b.corner = "br",
                K(),
                M(u(-E.x, -E.y), [0, 1, 1, 0], [0, 100], o));
                break;
            case "tl":
                j = i = !0;
                b.x = Math.max(b.x, 1);
                d.point.x = b.x;
                f = p._startPoint.call(this, "tl");
                K();
                M(E, [1, 0, 0, 1], [100, 0], o);
                break;
            case "tr":
                i = !0;
                b.x = Math.min(b.x, c - 1);
                d.point.x = b.x;
                K();
                M(u(-E.x, E.y), [0, 0, 0, 1], [0, 0], -o);
                break;
            case "bl":
                j = !0;
                b.x = Math.max(b.x, 1);
                d.point.x = b.x;
                K();
                M(u(E.x, -E.y), [1, 1, 0, 0], [100, 100], -o);
                break;
            case "br":
                b.x = Math.min(b.x, c - 1),
                d.point.x = b.x,
                K(),
                M(u(-E.x, -E.y), [0, 1, 1, 0], [0, 100], o)
            }
        },
        _fold: function(b) {
            var d = this.data("f");
            if (!d.dpoint || d.dpoint.corner != b.corner || d.dpoint.x != b.x || d.dpoint.y != b.y) {
                switch (d.effect) {
                case "hard":
                    p._hard.call(this, b);
                    break;
                case "sheet":
                    p._pageCURL.call(this, b)
                }
                d.dpoint = y(b.corner, b.x, b.y);
                return !0
            }
            return !1
        },
        _bringClipToFront: function(b) {
            var d = this.data("f")
              , a = d.turnData
              , c = a.display == o.single;
            if (b) {
                b = c ? 0 : d.next;
                d.over && d.over != b && p._bringClipToFront.call(this, !1);
                if ("hard" == d.effect)
                    d.igradient.show();
                else if ("sheet" == d.effect) {
                    var g = a.pageWrap[b]
                      , f = a.pages[b].data("f")
                      , i = g.width()
                      , j = g.height();
                    g.css({
                        overflow: "visible",
                        zIndex: 3 + a.front.length
                    });
                    f.ipage.css({
                        overflow: "hidden",
                        position: "absolute",
                        width: i,
                        height: j
                    });
                    f.igradient.show().css({
                        visibility: "visible"
                    });
                    d.ipage.css({
                        "z-index": 1
                    });
                    d.ogradient.show().css({
                        zIndex: 2,
                        visibility: "visible"
                    });
                    c && f.tPage != d.page && (a.pageObjs[0].find("*").remove(),
                    a.pageObjs[d.page].clone(!1).css({
                        opacity: "0.2",
                        overflow: "hidden"
                    }).transform("rotateY(180deg)", "50% 50%").appendTo(a.pageObjs[0]),
                    f.tPage = d.page)
                }
                d.over = b
            } else
                d.over && ((a = a.pageWrap[d.over]) && a.css({
                    overflow: "hidden",
                    display: "none",
                    zIndex: 0
                }),
                p._restoreClip.call(this, !0),
                delete d.over)
        },
        _restoreClip: function(b, d) {
            var a = this.data("f"), c = a.turnData, f = b ? r(0, 0, c.options.acceleration) : "", i;
            d ? i = a : c.pages[a.over] && (i = c.pages[a.over].data("f"));
            i && (i.clip && i.clip.transform(f),
            i.ipage.transform(f).css({
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            }),
            i.igradient.hide())
        },
        _setFoldedPagePosition: function(b, d) {
            var a = this.data()
              , c = a.f
              , f = c.turnData;
            if (d) {
                var i = this
                  , j = b.corner
                  , a = c.point && c.point.corner == j ? c.point : p._startPoint.call(this, j, u(1, 1));
                this.animatef({
                    from: [a.x, a.y],
                    to: [b.x, b.y],
                    duration: 500,
                    easing: f.options.easing,
                    frame: function(a) {
                        b.x = Math.round(a[0]);
                        b.y = Math.round(a[1]);
                        b.corner = j;
                        p._fold.call(i, b)
                    }
                })
            } else
                p._fold.call(this, b),
                a.effect && !a.effect.turning && this.animatef(!1)
        },
        _showFoldedPage: function(b, d) {
            var a = this.data().f
              , h = p._foldingPage.call(this);
            if (a && h) {
                var h = a.visible
                  , f = b.corner
                  , i = a.turn
                  , j = a.turnData;
                if (!h || !a.point || a.point.corner != b.corner) {
                    var k = void 0 === j.tpage ? b.corner : null;
                    j.corner = f;
                    if (S("start", this, [a.page, k]) == c.prevented || a.effect != j.pages[a.next].data("f").effect)
                        return !1;
                    if ("hard" == a.effect && "turning" == j.status)
                        for (f = 0; f < j.front.length; f++)
                            if (!j.pages[j.front[f]].hasClass("hard")) {
                                i.turn("stop");
                                break
                            }
                    h || (j.front.push(j.display == o.single ? 0 : a.next),
                    j.pageMv.push(a.page));
                    a.startPoint = a.startPoint || u(b.x, b.y);
                    a.visible = !0;
                    p._bringClipToFront.call(this, !0);
                    i.turn("update")
                }
                p._setFoldedPagePosition.call(this, b, d);
                return !0
            }
            return !1
        },
        hide: function() {
            var b = this.data("f")
              , d = b.turn
              , a = b.turnData
              , c = r(0, 0, a.options.acceleration);
            switch (b.effect) {
            case "hard":
                var g = a.pages[b.over];
                b.ogradient.remove();
                b.igradient.remove();
                b.ipage.transform(c);
                g && g.data("f").ipage.transform(c);
                break;
            case "sheet":
                (g = a.pageWrap[b.over]) && g.css({
                    overflow: "hidden"
                }),
                b.ipage.css({
                    left: 0,
                    top: 0,
                    right: "auto",
                    bottom: "auto"
                }).transform(c),
                b.clip.transform(c),
                b.ogradient.css({
                    visibility: "hidden"
                })
            }
            b.visible && 0 === a.front.length && f._removeFromDOM.call(d);
            b.status = "";
            b.visible = !1;
            delete b.point;
            delete b.dpoint;
            delete b.startPoint;
            return this
        },
        hideFoldedPage: function(b) {
            var d = this.data("f")
              , a = this
              , c = d.status
              , f = d.turnData
              , i = d.peel && d.peel.corner == d.dpoint.corner
              , j = function() {
                b && "moving" == c && i ? d.status = "peel" : a.trigger("end", [d.page, !1])
            };
            if (b) {
                var k = [d.dpoint, 0, 0, 0];
                k[3] = i ? p._startPoint.call(this, k[0].corner, u(d.peel.x, d.peel.y)) : p._startPoint.call(this, k[0].corner, u(0, 1));
                var m = k[0].y - k[3].y
                  , m = "tr" == k[0].corner || "tl" == k[0].corner ? Math.min(0, m) / 2 : Math.max(0, m) / 2;
                k[1] = u(k[0].x, k[0].y + m);
                k[2] = u(k[3].x, k[3].y - m);
                this.animatef(!1);
                this.animatef({
                    from: 0,
                    to: 1,
                    frame: function(b) {
                        p._fold.call(a, x(k, b, k[0].corner))
                    },
                    complete: j,
                    easing: f.options.easing,
                    duration: 800,
                    hiding: !0
                })
            } else
                this.animatef(!1),
                j()
        },
        turnPage: function(b) {
            var d, a = this, c = this.data("f"), f = c.turnData, i = [0, 0, 0, 0];
            w = Q();
            if (f.display == o.single && -1 == j.inArray(b, M.forward)) {
                var k = f.pages[c.next]
                  , m = k.data("f")
                  , q = m.peel
                  , r = parseInt(f.pageWrap[c.page].css("zIndex"), 10) || 0
                  , b = m.dpoint ? m.dpoint.corner : b;
                d = y(f.direction == F.ltr ? b.replace("l", "r") : b.replace("r", "l"));
                a = k;
                f.pageWrap[c.page - 1].show().css({
                    zIndex: r + 1
                });
                i[0] = m.dpoint ? u(m.dpoint.x, m.dpoint.y) : p._endPoint.call(this, d.corner);
                i[1] = i[0];
                i[2] = p._startPoint.call(this, d.corner, u(0, 20));
                i[3] = q ? p._startPoint.call(this, d.corner, u(q.x, q.y)) : p._startPoint.call(this, d.corner)
            } else {
                k = f.options.elevation;
                if ("string" == typeof k && (m = /^(\d+)(px|%)$/.exec(k)))
                    "px" == m[2] ? k = parseInt(m[1], 10) : "%" == m[2] && (k = parseInt(m[1], 10) / 100 * this.height());
                b = c.dpoint ? c.dpoint.corner : b;
                d = y(b || p._cornerAllowed.call(this)[0]);
                i[0] = c.dpoint || p._startPoint.call(this, d.corner);
                i[1] = c.dpoint ? i[0] : p._startPoint.call(this, d.corner, u(0, k));
                if (0 > i[0].x || i[0].x > this.width())
                    k = 0;
                i[2] = p._endPoint.call(this, d.corner, u(0, k));
                i[3] = p._endPoint.call(this, d.corner)
            }
            a.animatef(!1).trigger("flip");
            p._showFoldedPage.call(a, i[0]) ? a.animatef({
                from: 0,
                to: 1,
                easing: f.options.easing,
                frame: function(b) {
                    p._fold.call(a, x(i, b, d.corner))
                },
                complete: function() {
                    a.trigger("end", [c.page, !0])
                },
                duration: f.options.duration,
                turning: !0
            }) : a.trigger("end", [c.page, !0]);
            c.corner = null
        },
        isTurning: function() {
            return this.data("effect") && this.data("effect").turning
        },
        _showWhenHolding: function() {
            var b, d = this.data("f"), a = d.turn, c = d.turnData;
            if (d.holdingPoint && (b = window.getSelection ? window.getSelection().toString() : document.selection.createRange ? document.selection.createRange().text : void 0,
            !b)) {
                b = c.display == o.single;
                var f = p._cornerAllowed.call(this);
                b = c.direction == F.ltr ? b ? d.holdingPoint.x > this.width() / 2 ? "r" : "l" : 0 === d.page % 2 ? "l" : "r" : b ? d.holdingPoint.x > this.width() / 2 ? "l" : "r" : 0 === d.page % 2 ? "r" : "l";
                a.turn("stop");
                this.animatef(!1);
                -1 != j.inArray(b, f) && ((c.tmpListeners || (c.tmpListeners = {},
                c.tmpListeners.tap = D(a, "tap", !0),
                c.tmpListeners.doubleTap = D(a, "doubleTap", !0)),
                a = y(b, d.holdingPoint.x, d.holdingPoint.y),
                c.display == o.single) ? p._detectSinglePage.call(this, a, a, !0) && (d.corner = y(b, d.holdingPoint.x, d.holdingPoint.y)) : p._showFoldedPage.call(this, a, !0) && (d.corner = y(b, d.holdingPoint.x, d.holdingPoint.y)))
            }
        },
        _start: function(b) {
            var d = this.data("f")
              , a = d.turn;
            if (!d.corner && !d.disabled && !this.flip("isTurning")) {
                var c = d.turnData
                  , f = p._isIArea.call(this, b);
                if (c.options.hover || d.peel && d.peel.corner == f.corner) {
                    c.status = "tapping";
                    d.status = "tapping";
                    d.corner = f;
                    d.startPoint = null;
                    w = Q();
                    if (d.corner && p._foldingPage.call(this))
                        return a.turn("update"),
                        !0;
                    d.corner = null;
                    b = K(b);
                    f = c.pageWrap[d.page].offset();
                    b.x -= f.left;
                    b.y -= f.top;
                    c.options.smartFlip && -1 != j.inArray(d.page, a.turn("view")) && (0 < b.x && 0 < b.y && b.x < this.width() && b.y < this.height()) && (d.holdingPoint = b,
                    d.startPoint = b,
                    d.holding = setTimeout(j.proxy(p._showWhenHolding, this), 100))
                }
            }
        },
        _move: function(b) {
            var d, a, c = this.data("f");
            if (!c.disabled) {
                b.preventDefault();
                if (c.corner)
                    return a = c.turnData,
                    d = a.pageWrap[c.page].offset(),
                    c.status = "moving",
                    b = K(b),
                    b.x -= d.left,
                    b.y -= d.top,
                    b.corner = c.corner.corner,
                    a.display == o.single ? p._detectSinglePage.call(this, b, c.corner) : p._showFoldedPage.call(this, b),
                    c.holdingPoint && (window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges ? window.getSelection().removeAllRanges() : document.selection && document.selection.empty()),
                    !0;
                if (c.hover && !this.data("effect") && this.is(":visible"))
                    if (b = p._isIArea.call(this, b)) {
                        if ("sheet" == c.effect && 2 != b.corner.length)
                            return !1;
                        if ("peel" != c.status || !c.peel || c.peel.corner != b.corner) {
                            a = c.turnData;
                            if (a.display == o.single && a.page == a.totalPages)
                                return !1;
                            !R && navigator.userAgent.indexOf("Chrome");
                            d = a.options.cornerPosition;
                            d = p._startPoint.call(this, b.corner, u(d.x, d.y));
                            c.status = "peel";
                            b.x = d.x;
                            b.y = d.y;
                            p._showFoldedPage.call(this, b, !0)
                        }
                    } else if ("peel" == c.status && (!c.peel || c.peel.corner != c.dpoint.corner))
                        c.status = "",
                        p.hideFoldedPage.call(this, !0);
                return !1
            }
        },
        _end: function() {
            var b = this.data("f")
              , d = b.corner
              , a = b.turn
              , c = b.turnData
              , g = b.point || d
              , i = b.page
              , k = this.width();
            !b.disabled && d && (c.display == o.single ? "swiped" != b.status ? 1 == i ? "tapping" == b.status || g.x < k / 2 ? f._turnPage.call(a, b.next, g.corner) : p.hideFoldedPage.call(this, !0) : -1 != j.inArray(g.corner, M.forward) ? "tapping" == b.status || g.x < k / 2 ? f._turnPage.call(a, b.next, g.corner) : p.hideFoldedPage.call(this, !0) : (d = c.pages[b.page - 1],
            g = d.data("f").point,
            "tapping" == b.status || g.x > 0.1 * k ? f._turnPage.call(a, b.page - 1, g.corner) : p.turnPage.call(d, g.corner)) : b.status = "" : "tapping" == b.status || 0 > g.x || g.x > k ? f._turnPage.call(a, b.next, g.corner) : p.hideFoldedPage.call(this, !0));
            b.holdingPoint && (clearInterval(b.holding),
            delete b.holdingPoint,
            delete b.holding);
            c.status = "";
            b.status = "";
            b.corner = null
        },
        _detectSinglePage: function(b, d, a) {
            var c = this.data("f")
              , f = c.turn
              , i = c.turnData;
            i.pageWrap[c.page].offset();
            if (-1 == j.inArray(d.corner, M.forward)) {
                a = i.pages[c.page - 1];
                c = a.data("f");
                b.corner = i.direction == F.ltr ? b.corner.replace("l", "r") : b.corner.replace("r", "l");
                if (c.visible)
                    b = p._showFoldedPage.call(a, b, !1);
                else {
                    var k = p._endPoint.call(a, b.corner);
                    c.point = y(b.corner, k.x, k.y);
                    f.turn("stop");
                    b = p._showFoldedPage.call(a, b, !0)
                }
                i.corner = d.corner;
                return b
            }
            return p._showFoldedPage.call(this, b, a)
        },
        disable: function(b) {
            this.data("f").disabled = b;
            return this
        },
        hover: function(b) {
            this.data("f").hover = b;
            return this
        },
        peel: function(b, d) {
            var a = this.data("f");
            if (b.corner) {
                if (-1 == j.inArray(b.corner, M.all))
                    throw C("Corner " + b.corner + " is not permitted");
                if (-1 != j.inArray(b.corner, p._cornerAllowed.call(this))) {
                    var c = a.turnData.options.cornerPosition;
                    b.x = b.x || c.x;
                    b.y = b.y || c.y;
                    c = p._startPoint.call(this, b.corner, u(b.x, b.y));
                    a.peel = b;
                    a.status = "peel";
                    p._showFoldedPage.call(this, y(b.corner, c.x, c.y), d)
                }
            } else
                a.status = "",
                p.hideFoldedPage.call(this, d);
            return this
        }
    }, v = {
        init: function(b) {
            if (!b.flipbook)
                throw C("Slider: Flipbook required");
            var d = {
                pages: {}
            };
            d.options = j.extend({
                pageMargin: 10,
                duration: 500
            }, b);
            d.flipbook = j(b.flipbook);
            d.previous = j("<div />", {
                "class": "previous-button"
            }).bind("tap", j.proxy(v.previous, this)).appendTo(this);
            d.next = j("<div />", {
                "class": "next-button"
            }).bind("tap", j.proxy(v.next, this)).appendTo(this);
            d.viewer = j("<div />", {
                "class": "viewer"
            }).bind("press", j.proxy(v._viewerPress, this)).bind("moving", j.proxy(v._viewerMoving, this)).bind("unpress", j.proxy(v._viewerUnpress, this)).bind("swipe", j.proxy(v._viewerSwipe, this)).bind("tap", j.proxy(v._viewerTap, this)).appendTo(this);
            d.flipbook.bind("turned", j.proxy(v._pageTurned, this));
            this.data({
                s: d
            });
            v._resize.call(this)
        },
        next: function() {
            v._moveSlide.call(this, 1);
            return this
        },
        previous: function() {
            v._moveSlide.call(this, -1);
            return this
        },
        totalSlides: function() {
            return this.data("s").slides.length
        },
        slide: function(b) {
            var d = this.data("s");
            if (void 0 === b)
                return d.currentSlide;
            var a;
            if (b == d.currentSlide + 1)
                this.tslider("next");
            else if (b == d.currentSlide - 1)
                this.tslider("previous");
            else if (d.currentSlide != b && (a = d.slides[b])) {
                var c = d.viewer.width()
                  , f = {};
                f[k + "transition"] = "none";
                a.element || v._newSlide.call(this, b);
                d.currentSlide = b;
                for (b = 0; b < d.slides.length; b++)
                    if (a = d.slides[b]) {
                        var i = b - d.currentSlide;
                        f.visibility = 0 === i ? "visible" : "hidden";
                        a.x = i * c;
                        a.element.css(f).transform(r(a.x, 0, !0))
                    }
            }
            return this
        },
        _moveSlide: function(b) {
            var d = this.data("s"), a = d.slides[d.currentSlide], c, f = d.viewer.width(), i = {
                visibility: "visible"
            };
            i[k + "transition"] = k + "transform " + d.options.duration + "ms";
            if (1 == b) {
                if (!(c = d.slides[d.currentSlide + 1]) || !c.element) {
                    delete d.drag;
                    a.element.css(i).transform(r(a.x, 0, !0));
                    return
                }
                a.element.css(i).transform(r(-f, 0, !0));
                d.currentSlide = Math.min(d.slides.length - 1, d.currentSlide + 1);
                a.x = -f;
                v._newSlide.call(this, d.currentSlide + 1)
            } else {
                if (!(c = d.slides[d.currentSlide - 1]) || !c.element) {
                    delete d.drag;
                    a.element.css(i).transform(r(a.x, 0, !0));
                    return
                }
                a.element.css(i).transform(r(f, 0, !0));
                d.currentSlide = Math.max(0, d.currentSlide - 1);
                a.x = f;
                v._newSlide.call(this, d.currentSlide - 1)
            }
            c.element.css(i).transform(r(0, 0, !0));
            c.x = 0;
            delete d.drag
        },
        _viewerPress: function(b) {
            this.data("s").drag = {
                point: K(b)
            };
            b.preventDefault()
        },
        _viewerMoving: function(b) {
            var d = this.data("s");
            if (d.drag) {
                var a = d.slides[d.currentSlide]
                  , c = {
                    visibility: "visible"
                }
                  , b = K(b).x - d.drag.point.x
                  , f = 0 < b ? d.slides[d.currentSlide - 1] : d.slides[d.currentSlide + 1];
                c[k + "transition"] = "none";
                d.drag.dx = b;
                a.element.css(c).transform(r(a.x + b, 0, !0));
                f && f.element && f.element.css(c).transform(r(f.x + b, 0, !0))
            }
        },
        _viewerUnpress: function() {
            var b = this.data("s");
            if (b.drag) {
                var c = b.slides[b.currentSlide]
                  , a = 0 < b.drag.dx ? b.slides[b.currentSlide - 1] : b.slides[b.currentSlide + 1];
                if (Math.abs(b.drag.dx) > 0.25 * b.viewer.width())
                    b.noswipe = !0,
                    setTimeout(j.proxy(v._resetSwipe, this), 100),
                    0 < b.drag.dx ? this.tslider("previous") : this.tslider("next");
                else {
                    var f = {};
                    f[k + "transition"] = k + "transform " + b.options.duration + "ms";
                    c.element.css(f).transform(r(c.x, 0, !0));
                    a && a.element && a.element.css(f).transform(r(a.x, 0, !0));
                    delete b.drag
                }
            }
        },
        _viewerTap: function(b) {
            var c = this.data("s"), b = j(b.target), a;
            ((a = b.attr("page")) || (a = b.parent().attr("page"))) && c.flipbook.turn("page", a)
        },
        _viewerSwipe: function(b, c) {
            var a = this.data("s");
            a.noswipe || (0 > c ? this.tslider("next") : this.tslider("previous"),
            a.noswipe = !1)
        },
        _resetSwipe: function() {
            this.data("s").noswipe = !1
        },
        _setCurrentClass: function() {
            var b = this.data("s"), c;
            if (c = b.currentView)
                b.pages[c[0]] && b.pages[c[0]].removeClass("current"),
                b.pages[c[1]] && b.pages[c[1]].removeClass("current");
            c = b.flipbook.turn("view");
            b.pages[c[0]] && b.pages[c[0]].addClass("current");
            b.pages[c[1]] && b.pages[c[1]].addClass("current");
            b.currentView = c
        },
        _pageTurned: function() {
            var b = this.data("s");
            v._setCurrentClass.call(this);
            this.tslider("slide", v._getCurrentSlide.call(this, b.slides))
        },
        _calculateSlides: function() {
            for (var b = this.data("s"), c = [], a = b.flipbook, f = a.turn("size"), g = a.turn("view"), i = b.viewer.width(), j = b.viewer.height(), f = V({
                width: f.width,
                height: f.height,
                boundWidth: i,
                boundHeight: j
            }), j = f.width / g.length, k = a.turn("pages"), m = 0, o, p = 1; p <= k && (g = a.turn("view", p, !0)); )
                o = g.length * j + 2 * b.options.pageMargin,
                m + o >= i && (c.push({
                    lastPage: p - 1,
                    width: m,
                    pageWidth: j,
                    pageHeight: f.height
                }),
                m = 0),
                m += o,
                p = g[g.length - 1] + 1;
            c.push({
                lastPage: p - 1,
                width: m,
                pageWidth: j,
                pageHeight: f.height
            });
            return c
        },
        _newSlide: function(b) {
            var c = this.data("s")
              , a = c.slides[b];
            if (a) {
                var f = c.flipbook
                  , g = c.viewer.width();
                if (!a.element) {
                    a.pages = {};
                    a.element = j("<div />", {
                        "class": "slide"
                    }).css({
                        position: "absolute",
                        width: a.width,
                        height: a.pageHeight,
                        top: 0,
                        left: c.viewer.width() / 2 - a.width / 2
                    });
                    for (var i = 0 < b ? c.slides[b - 1].lastPage + 1 : 1, k = c.options.pageMargin, m, p; i <= a.lastPage && (m = f.turn("view", i, !0)); ) {
                        for (var i = 2 == m.length, o = 0; o < m.length; o++)
                            c.pages[m[o]] || (c.pages[m[o]] = j("<div />", {
                                page: m[o]
                            }),
                            this.trigger("newThumbnail", [m[o], c.pages[m[o]]])),
                            p = i ? 0 === o ? "page double-even" : "page double-odd" : "page single",
                            c.pages[m[o]].appendTo(a.element).attr("class", p).css({
                                position: "absolute",
                                width: a.pageWidth,
                                height: a.pageHeight,
                                left: k,
                                top: 0
                            }),
                            k += a.pageWidth;
                        i = m[m.length - 1] + 1;
                        k += 2 * c.options.pageMargin
                    }
                    a.x = (b - c.currentSlide) * g;
                    a.element.transform(r(a.x, 0, !0)).appendTo(c.viewer);
                    0 !== a.x && a.element.css({
                        visibility: "hidden"
                    })
                }
            }
        },
        _resizeSlide: function(b) {
            var c = this.data("s"), a = c.flipbook, f = c.slides[b], g = c.viewer.width(), i;
            if (f.element) {
                var m = f.lastPage, o, p, q = c.options.pageMargin;
                for (i = 0 < b ? c.slides[b - 1].lastPage + 1 : 1; i <= m && (o = a.turn("view", i, !0)); ) {
                    p = 2 == o.length;
                    for (var s = 0; s < o.length; s++)
                        c.pages[o[s]] || (c.pages[o[s]] = j("<div />", {
                            page: o[s],
                            css: {
                                position: "absolute"
                            }
                        }),
                        this.trigger("newThumbnail", [o[s], c.pages[o[s]]])),
                        f.element[0] != c.pages[o[s]].parent()[0] && c.pages[o[s]].appendTo(f.element),
                        i = p ? 0 === s ? "page double-even" : "page double-odd" : "page single",
                        c.pages[o[s]].attr("class", i).css({
                            width: f.pageWidth,
                            height: f.pageHeight,
                            left: q,
                            top: 0
                        }),
                        q += f.pageWidth;
                    i = o[o.length - 1] + 1;
                    q += 2 * c.options.pageMargin
                }
                a = {
                    width: f.width,
                    height: f.pageHeight,
                    top: 0,
                    left: c.viewer.width() / 2 - f.width / 2
                };
                f.x = (b - c.currentSlide) * g;
                a[k + "transition"] = "none";
                a.visibility = 0 === f.x ? "visible" : "hidden";
                f.element.css(a);
                f.element.transform(r(f.x, 0, !0))
            }
            f.currentLastPage = f.lastPage
        },
        _removeSlide: function(b, c) {
            var a = this.data("s")
              , f = a.slides[b];
            f && f.element && (f.element.remove(),
            delete f.element);
            c && delete a.slides[b]
        },
        _resize: function() {
            var b = this.data("s");
            b.flipbook.turn("page");
            var c = b.slides || (b.slides = {})
              , a = v._calculateSlides.call(this);
            b.currentSlide = v._getCurrentSlide.call(this, a);
            for (var f = 0; f < a.length; f++)
                c[f] || (c[f] = {}),
                c[f].currentLastPage || (c[f].currentLastPage = a[f].lastPage),
                j.extend(c[f], a[f]),
                2 > Math.abs(b.currentSlide - f) ? c[f].element ? v._resizeSlide.call(this, f) : v._newSlide.call(this, f) : v._removeSlide.call(this, f);
            for (f = a.length; f < b.slides.length; f++)
                v._removeSlide.call(this, f, !0);
            b.slides.length = a.length;
            v._setCurrentClass.call(this)
        },
        _getCurrentSlide: function(b) {
            for (var c = this.data("s").flipbook.turn("page"), a = 0, f = b.length - 1; a <= f; ) {
                var g = Math.floor((a + f) / 2);
                if (0 < g && c <= b[g - 1].lastPage)
                    f = g - 1;
                else if (c > b[g].lastPage)
                    a = g + 1;
                else
                    return g
            }
            return -1
        }
    };
    window.requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(b) {
        setTimeout(b, 1E3 / 60)
    }
    ;
    j.extend(j.fn, {
        flip: function() {
            return m(j(this[0]), p, arguments)
        },
        turn: function() {
            return m(j(this[0]), f, arguments)
        },
        tslider: function() {
            return m(j(this[0]), v, arguments)
        },
        transform: function(b, c) {
            var a = {};
            c && (a[k + "transform-origin"] = c);
            a[k + "transform"] = b;
            return this.css(a)
        },
        animatef: function(b) {
            var c = this.data();
            if (!b)
                return c.effect && c.effect.stop(),
                this;
            if (c.effect) {
                c.effect._time = (new Date).getTime();
                for (var a = 0; a < c.effect._elements; a++)
                    c.effect.from[a] = c.effect.current[a],
                    c.effect.to[a] = b.to[a] - c.effect.from[a];
                return this
            }
            b.to.length || (b.to = [b.to]);
            b.from.length || (b.from = [b.from]);
            var f = !0;
            c.effect = j.extend({
                current: [],
                _elements: b.to.length,
                _time: (new Date).getTime(),
                stop: function() {
                    f = false;
                    delete c.effect
                },
                _frame: function() {
                    if (f && c.effect) {
                        for (var a = this, b = Math.min(this.duration, (new Date).getTime() - this._time), i = 0; i < this._elements; i++)
                            this.current[i] = this.easing(b, this.from[i], this.to[i], this.duration);
                        f = true;
                        this.frame(this._elements == 1 ? this.current[0] : this.current);
                        if (b == this.duration) {
                            this.stop();
                            this.complete && this.complete()
                        } else
                            window.requestAnim(function() {
                                a._frame()
                            })
                    }
                }
            }, b);
            for (b = 0; b < c.effect._elements; b++)
                c.effect.to[b] -= c.effect.from[b];
            c.effect._frame();
            return this
        }
    });
    j.isTouch = R;
    j.cssPrefix = J;
    j.cssTransitionEnd = Y;
    j.findPos = function(b) {
        var c = {
            top: 0,
            left: 0
        };
        do
            c.left += b.offsetLeft,
            c.top += b.offsetTop;
        while (b = b.offsetParent);
        return c
    }
    ;
    j.turnVerion = "5"
}
)(jQuery);
Issue = Backbone.Model.extend({
    defaults: {
        pages: 1,
        path: "statics/issue/",
        prefixes: !1
    },
    initialize: function() {}
});
Page = Backbone.Model.extend({
    idAttribute: "page",
    fetchRegions: function() {
        this.set({
            regions: [{
                i: 0,
                t: "0",
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                url: "www.google.com"
            }]
        })
    },
    fetchDictionary: function() {},
    getResource: function(j) {
        var m = this.get("issue")
          , s = m.get("prefixes")
          , s = s ? s[this.get("page")] + "/" : this.get("page") + "/";
        return m.get("path") + s + j
    }
});
var PageList = Backbone.Collection.extend({
    model: Page
});
PageView = Backbone.View.extend({
    tagName: "div",
    initialize: function() {
        this.listenTo(this.model, "destroy", this.remove);
        this.listenTo(this.model, "change:regions", this.showRegions);
        this.render()
    },
    render: function() {
        this.$el.html('<div class="gradient"></div><div class="loader"><i></i></div>')
    },
    loadPage: function() {
        var j = this
          , m = $("<img />");
        m.load(function() {
            j.$el.find(".loader").remove();
            $(this).css({
                width: "100%",
                height: "100%"
            });
            $(this).appendTo(j.$el);
            "single" == $("#magazine").turn("display") && $("#magazine .p0").data("f").tPage == j.model.get("page") && ($("#magazine .p0").find("*").remove(),
            j.$el.clone(!1).css({
                opacity: "0.2",
                overflow: "hidden"
            }).transform("rotateY(180deg)", "50% 50%").appendTo($("#magazine .p0")))
        });
        m.attr("src", this.model.getResource("large.jpg"));
        this.model.fetchRegions()
    },
    showRegions: function() {}
});
Magazine = Backbone.View.extend({
    el: $("#magazine"),
    events: {
        turning: "turning",
        turned: "turned",
        tap: "tap",
        doubleTap: "doubleTap",
        pinching: "pinching",
        scrolling: "scrolling",
        zooming: "zooming",
        zoomed: "zoomed",
        missing: "missing",
        removePage: "removePage"
    },
    initialize: function(j) {
        this.app = j.app;
        this.pages = new PageList
    },
    render: function() {
        this.$el.turn({
            view: this,
            width: this.model.get("pageWidth"),
            height: this.model.get("pageHeight"),
            pages: this.model.get("pages"),
            duration: 500,
            responsive: !0,
            autoCenter: !0,
            smartFlip: !0,
            swipe: !0,
            slider: ".thumbnails",
            cornerPosition: "50px 20px",
            events: {
                newThumbnail: $.proxy(this.newThumbnail, this)
            }
        })
    },
    turning: function() {
        $.isTouch ? this.$el.removeClass("animated") : this.$el.addClass("animated")
    },
    turned: function(j, m) {
        $.isTouch || this.$el.removeClass("animated");
        1 == m && this.$el.turn("peel", "br")
    },
    tap: function(j) {
        !$.isTouch && !$("html").hasClass("touch") && ($(j.target).hasClass("region") || (1 == this.$el.turn("zoom") ? this.$el.turn("zoomIn", j) : this.$el.turn("zoomOut")))
    },
    doubleTap: function(j) {
        var m = $(".magazine-viewport").data();
        m.navTimer && (clearInterval(m.navTimer),
        delete m.navTimer);
        if ($.isTouch || $("html").hasClass("touch"))
            1 == this.$el.turn("zoom") ? this.$el.turn("zoomIn", j) : this.$el.turn("zoomOut")
    },
    pinching: function(j) {
        this.$el.turn("zoom", 1, j)
    },
    scrolling: function() {},
    zooming: function() {
        this.$el.removeClass("animated")
    },
    zoomed: function() {
        $("html").removeClass("navigation")
    },
    missing: function(j, m) {
        for (var s = 0; s < m.length; s++)
            this.addPage(m[s])
    },
    newThumbnail: function(j, m, s) {
        j = (j = this.model.get("prefixes")) ? j[m] + "/" : m + "/";
        $("<img />", {
            src: this.model.get("path") + j + "thumb.jpg"
        }).appendTo(s)
    },
    addPage: function(j) {
        var m = this.pages.get(j);
        m || (m = new Page({
            page: j,
            issue: this.model
        }),
        this.pages.add(m));
        m = new PageView({
            model: m
        });
        this.$el.turn("addPage", m.$el, j, {
            view: m
        }) && m.loadPage()
    },
    removePage: function(j, m) {
        this.$el.turn("pageData", m).view.stopListening()
    }
});
Flipfiy = Backbone.View.extend({
    el: $("#viewer"),
    events: {
        "tap .control-next-page": "nextPage",
        "tap .control-previous-page": "previousPage"
    },
    initialize: function() {
        var j = this;
        this.router = new AppRouter({
            app: this
        });
        $(document).keydown(function(m) {
            switch (m.keyCode) {
            case 37:
                j.magazine.$el.turn("previous");
                m.preventDefault();
                break;
            case 39:
                j.magazine.$el.turn("next");
                m.preventDefault();
                break;
            case 27:
                j.magazine.$el.zoom("zoomOut"),
                m.preventDefault()
            }
        });
        $(".magazine-viewport").bind("tap", function() {
            if ($("html").hasClass("navigation"))
                $("html").removeClass("navigation");
            else {
                var j = $(this).data();
                j.navTimer || (j.navTimer = setTimeout(function() {
                    delete j.navTimer;
                    $(".magazine").turn("isFlipping") || $("html").addClass("navigation")
                }, 300))
            }
        })
    },
    loadIssue: function(j) {
        this.magazine || (j = new Issue(j),
        this.magazine = new Magazine({
            model: j
        }),
        this.magazine.render(),
        this.magazine.$el.bind("turned", $.proxy(this.pageTurned, this)),
        Backbone.history.start())
    },
    nextPage: function() {
        this.magazine.$el.turn("next")
    },
    previousPage: function() {
        this.magazine.$el.turn("previous")
    },
    pageTurned: function(j, m) {
        this.router.navigate("page/" + m)
    }
});
AppRouter = Backbone.Router.extend({
    routes: {
        "page/:number": "setPage",
        issues: "issues"
    },
    initialize: function(j) {
        this.app = j.app
    },
    setPage: function(j) {
        this.app.magazine.$el.turn("page", j)
    }
});
function flipify(j) {
    (new Flipfiy).loadIssue(j)
}
function addPage(j, m) {
    m.turn("pages");
    var s = $("<div />", {
        "class": ""
    });
    m.turn("addPage", s, j) && (s.html('<div class="gradient"></div><div class="loader"><i></i></div>'),
    loadPage(j, s))
}
function loadPage(j, m) {
    var s = $("<img />");
    s.mousedown(function(j) {
        j.preventDefault()
    });
    s.load(function() {
        $(this).css({
            width: "100%",
            height: "100%"
        });
        $(this).appendTo(m);
        m.find(".loader").remove()
    });
    s.attr("src", "statics/issue/imgs/" + j + "-large.jpg");
    loadRegions(j, m)
}
function loadRegions(j, m) {
    $.getJSON("pages/" + j + "-regions.json").done(function(j) {
        $.each(j, function(j, s) {
            addRegion(s, m)
        })
    })
}
function addRegion(j, m) {
    var s = $("<div />", {
        "class": "region  " + j["class"]
    })
      , x = $(".magazine").turn("options")
      , y = x.width / 2
      , x = x.height;
    s.css({
        top: Math.round(100 * (j.y / x)) + "%",
        left: Math.round(100 * (j.x / y)) + "%",
        width: Math.round(100 * (j.width / y)) + "%",
        height: Math.round(100 * (j.height / x)) + "%"
    }).attr("region-data", $.param(j.data || ""));
    s.appendTo(m)
}
function regionClick(j) {
    j = $(j.target);
    if (j.hasClass("region")) {
        var m = $.trim(j.attr("class").replace("region", ""));
        return processRegion(j, m)
    }
}
function processRegion(j, m) {
    data = decodeParams(j.attr("region-data"));
    switch (m) {
    case "link":
        window.open(data.url);
        break;
    case "zoom":
        var s = j.offset()
          , x = $(".magazine-viewport").offset()
          , s = {
            x: s.left - x.left,
            y: s.top - x.top
        };
        $(".magazine-viewport").zoom("zoomIn", s);
        break;
    case "to-page":
        $(".magazine").turn("page", data.page)
    }
}
function loadLargePage(j, m) {
    var s = $("<img />");
    s.load(function() {
        var j = m.find("img");
        $(this).css({
            width: "100%",
            height: "100%"
        });
        $(this).appendTo(m);
        j.remove()
    });
    s.attr("src", "pages/" + j + "-large.jpg")
}
function loadSmallPage(j, m) {
    var s = m.find("img");
    s.css({
        width: "100%",
        height: "100%"
    });
    s.unbind("load");
    s.attr("src", "pages/" + j + "-large.jpg")
}
function isChrome() {
    return -1 != navigator.userAgent.indexOf("Chrome")
}
function disableControls(j) {
    1 == j ? $(".previous-button").hide() : $(".previous-button").show();
    j == $(".magazine").turn("pages") ? $(".next-button").hide() : $(".next-button").show()
}
function resizeViewport() {}
function zoomTo(j) {
    1 == $(this).zoom("value") && $(this).zoom("in", j)
}
function largeMagazineWidth() {
    return 2214
}
function decodeParams(j) {
    for (var j = j.split("&"), m, s = {}, x = 0; x < j.length; x++)
        m = j[x].split("="),
        s[decodeURIComponent(m[0])] = decodeURIComponent(m[1]);
    return s
}
;