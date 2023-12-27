// Backbone.js是一个轻量级的JavaScript库，用于构建单页应用程序。它提供了一组用于组织和管理数据、视图和事件的工具和抽象。通过使用Backbone.js，开发人员可以更轻松地构建可维护和可扩展的Web应用程序
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
