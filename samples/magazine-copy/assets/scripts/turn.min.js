

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
