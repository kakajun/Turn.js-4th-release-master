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
