var Os = { exports: {} }, j1 = {}, bs = { exports: {} }, P = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kr = Symbol.for("react.element"), ic = Symbol.for("react.portal"), oc = Symbol.for("react.fragment"), sc = Symbol.for("react.strict_mode"), ac = Symbol.for("react.profiler"), uc = Symbol.for("react.provider"), cc = Symbol.for("react.context"), dc = Symbol.for("react.forward_ref"), fc = Symbol.for("react.suspense"), pc = Symbol.for("react.memo"), mc = Symbol.for("react.lazy"), xo = Symbol.iterator;
function hc(e) {
  return e === null || typeof e != "object" ? null : (e = xo && e[xo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Is = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Rs = Object.assign, Ds = {};
function zn(e, t, n) {
  this.props = e, this.context = t, this.refs = Ds, this.updater = n || Is;
}
zn.prototype.isReactComponent = {};
zn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
zn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Fs() {
}
Fs.prototype = zn.prototype;
function xi(e, t, n) {
  this.props = e, this.context = t, this.refs = Ds, this.updater = n || Is;
}
var Li = xi.prototype = new Fs();
Li.constructor = xi;
Rs(Li, zn.prototype);
Li.isPureReactComponent = !0;
var Lo = Array.isArray, $s = Object.prototype.hasOwnProperty, wi = { current: null }, Zs = { key: !0, ref: !0, __self: !0, __source: !0 };
function Us(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) $s.call(t, r) && !Zs.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: kr, type: e, key: i, ref: o, props: l, _owner: wi.current };
}
function gc(e, t) {
  return { $$typeof: kr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function _i(e) {
  return typeof e == "object" && e !== null && e.$$typeof === kr;
}
function vc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var wo = /\/+/g;
function Y1(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? vc("" + e.key) : t.toString(36);
}
function Wr(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case kr:
        case ic:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Y1(o, 0) : r, Lo(l) ? (n = "", e != null && (n = e.replace(wo, "$&/") + "/"), Wr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (_i(l) && (l = gc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(wo, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Lo(e)) for (var s = 0; s < e.length; s++) {
    i = e[s];
    var u = r + Y1(i, s);
    o += Wr(i, t, n, u, l);
  }
  else if (u = hc(e), typeof u == "function") for (e = u.call(e), s = 0; !(i = e.next()).done; ) i = i.value, u = r + Y1(i, s++), o += Wr(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Ar(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Wr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function yc(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ge = { current: null }, Kr = { transition: null }, Cc = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: Kr, ReactCurrentOwner: wi };
function Bs() {
  throw Error("act(...) is not supported in production builds of React.");
}
P.Children = { map: Ar, forEach: function(e, t, n) {
  Ar(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Ar(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Ar(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!_i(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
P.Component = zn;
P.Fragment = oc;
P.Profiler = ac;
P.PureComponent = xi;
P.StrictMode = sc;
P.Suspense = fc;
P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cc;
P.act = Bs;
P.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Rs({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = wi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) $s.call(t, u) && !Zs.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: kr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
P.createContext = function(e) {
  return e = { $$typeof: cc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: uc, _context: e }, e.Consumer = e;
};
P.createElement = Us;
P.createFactory = function(e) {
  var t = Us.bind(null, e);
  return t.type = e, t;
};
P.createRef = function() {
  return { current: null };
};
P.forwardRef = function(e) {
  return { $$typeof: dc, render: e };
};
P.isValidElement = _i;
P.lazy = function(e) {
  return { $$typeof: mc, _payload: { _status: -1, _result: e }, _init: yc };
};
P.memo = function(e, t) {
  return { $$typeof: pc, type: e, compare: t === void 0 ? null : t };
};
P.startTransition = function(e) {
  var t = Kr.transition;
  Kr.transition = {};
  try {
    e();
  } finally {
    Kr.transition = t;
  }
};
P.unstable_act = Bs;
P.useCallback = function(e, t) {
  return ge.current.useCallback(e, t);
};
P.useContext = function(e) {
  return ge.current.useContext(e);
};
P.useDebugValue = function() {
};
P.useDeferredValue = function(e) {
  return ge.current.useDeferredValue(e);
};
P.useEffect = function(e, t) {
  return ge.current.useEffect(e, t);
};
P.useId = function() {
  return ge.current.useId();
};
P.useImperativeHandle = function(e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
P.useInsertionEffect = function(e, t) {
  return ge.current.useInsertionEffect(e, t);
};
P.useLayoutEffect = function(e, t) {
  return ge.current.useLayoutEffect(e, t);
};
P.useMemo = function(e, t) {
  return ge.current.useMemo(e, t);
};
P.useReducer = function(e, t, n) {
  return ge.current.useReducer(e, t, n);
};
P.useRef = function(e) {
  return ge.current.useRef(e);
};
P.useState = function(e) {
  return ge.current.useState(e);
};
P.useSyncExternalStore = function(e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
P.useTransition = function() {
  return ge.current.useTransition();
};
P.version = "18.3.1";
bs.exports = P;
var k = bs.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xc = k, Lc = Symbol.for("react.element"), wc = Symbol.for("react.fragment"), _c = Object.prototype.hasOwnProperty, kc = xc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Hc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ws(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) _c.call(t, r) && !Hc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Lc, type: e, key: i, ref: o, props: l, _owner: kc.current };
}
j1.Fragment = wc;
j1.jsx = Ws;
j1.jsxs = Ws;
Os.exports = j1;
var a = Os.exports, Ks = { exports: {} }, Se = {}, Qs = { exports: {} }, Gs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(_, E) {
    var N = _.length;
    _.push(E);
    e: for (; 0 < N; ) {
      var W = N - 1 >>> 1, b = _[W];
      if (0 < l(b, E)) _[W] = E, _[N] = b, N = W;
      else break e;
    }
  }
  function n(_) {
    return _.length === 0 ? null : _[0];
  }
  function r(_) {
    if (_.length === 0) return null;
    var E = _[0], N = _.pop();
    if (N !== E) {
      _[0] = N;
      e: for (var W = 0, b = _.length, tn = b >>> 1; W < tn; ) {
        var qe = 2 * (W + 1) - 1, nn = _[qe], et = qe + 1, Ot = _[et];
        if (0 > l(nn, N)) et < b && 0 > l(Ot, nn) ? (_[W] = Ot, _[et] = N, W = et) : (_[W] = nn, _[qe] = N, W = qe);
        else if (et < b && 0 > l(Ot, N)) _[W] = Ot, _[et] = N, W = et;
        else break e;
      }
    }
    return E;
  }
  function l(_, E) {
    var N = _.sortIndex - E.sortIndex;
    return N !== 0 ? N : _.id - E.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, s = o.now();
    e.unstable_now = function() {
      return o.now() - s;
    };
  }
  var u = [], c = [], f = 1, h = null, g = 3, v = !1, C = !1, x = !1, j = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(_) {
    for (var E = n(c); E !== null; ) {
      if (E.callback === null) r(c);
      else if (E.startTime <= _) r(c), E.sortIndex = E.expirationTime, t(u, E);
      else break;
      E = n(c);
    }
  }
  function y(_) {
    if (x = !1, m(_), !C) if (n(u) !== null) C = !0, ft(w);
    else {
      var E = n(c);
      E !== null && Tt(y, E.startTime - _);
    }
  }
  function w(_, E) {
    C = !1, x && (x = !1, p(A), A = -1), v = !0;
    var N = g;
    try {
      for (m(E), h = n(u); h !== null && (!(h.expirationTime > E) || _ && !ye()); ) {
        var W = h.callback;
        if (typeof W == "function") {
          h.callback = null, g = h.priorityLevel;
          var b = W(h.expirationTime <= E);
          E = e.unstable_now(), typeof b == "function" ? h.callback = b : h === n(u) && r(u), m(E);
        } else r(u);
        h = n(u);
      }
      if (h !== null) var tn = !0;
      else {
        var qe = n(c);
        qe !== null && Tt(y, qe.startTime - E), tn = !1;
      }
      return tn;
    } finally {
      h = null, g = N, v = !1;
    }
  }
  var S = !1, V = null, A = -1, Z = 5, z = -1;
  function ye() {
    return !(e.unstable_now() - z < Z);
  }
  function dt() {
    if (V !== null) {
      var _ = e.unstable_now();
      z = _;
      var E = !0;
      try {
        E = V(!0, _);
      } finally {
        E ? We() : (S = !1, V = null);
      }
    } else S = !1;
  }
  var We;
  if (typeof d == "function") We = function() {
    d(dt);
  };
  else if (typeof MessageChannel < "u") {
    var Ee = new MessageChannel(), G1 = Ee.port2;
    Ee.port1.onmessage = dt, We = function() {
      G1.postMessage(null);
    };
  } else We = function() {
    j(dt, 0);
  };
  function ft(_) {
    V = _, S || (S = !0, We());
  }
  function Tt(_, E) {
    A = j(function() {
      _(e.unstable_now());
    }, E);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(_) {
    _.callback = null;
  }, e.unstable_continueExecution = function() {
    C || v || (C = !0, ft(w));
  }, e.unstable_forceFrameRate = function(_) {
    0 > _ || 125 < _ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Z = 0 < _ ? Math.floor(1e3 / _) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(_) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var E = 3;
        break;
      default:
        E = g;
    }
    var N = g;
    g = E;
    try {
      return _();
    } finally {
      g = N;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(_, E) {
    switch (_) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        _ = 3;
    }
    var N = g;
    g = _;
    try {
      return E();
    } finally {
      g = N;
    }
  }, e.unstable_scheduleCallback = function(_, E, N) {
    var W = e.unstable_now();
    switch (typeof N == "object" && N !== null ? (N = N.delay, N = typeof N == "number" && 0 < N ? W + N : W) : N = W, _) {
      case 1:
        var b = -1;
        break;
      case 2:
        b = 250;
        break;
      case 5:
        b = 1073741823;
        break;
      case 4:
        b = 1e4;
        break;
      default:
        b = 5e3;
    }
    return b = N + b, _ = { id: f++, callback: E, priorityLevel: _, startTime: N, expirationTime: b, sortIndex: -1 }, N > W ? (_.sortIndex = N, t(c, _), n(u) === null && _ === n(c) && (x ? (p(A), A = -1) : x = !0, Tt(y, N - W))) : (_.sortIndex = b, t(u, _), C || v || (C = !0, ft(w))), _;
  }, e.unstable_shouldYield = ye, e.unstable_wrapCallback = function(_) {
    var E = g;
    return function() {
      var N = g;
      g = E;
      try {
        return _.apply(this, arguments);
      } finally {
        g = N;
      }
    };
  };
})(Gs);
Qs.exports = Gs;
var Vc = Qs.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mc = k, Me = Vc;
function L(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ys = /* @__PURE__ */ new Set(), ir = {};
function Jt(e, t) {
  kn(e, t), kn(e + "Capture", t);
}
function kn(e, t) {
  for (ir[e] = t, e = 0; e < t.length; e++) Ys.add(t[e]);
}
var ot = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Hl = Object.prototype.hasOwnProperty, Sc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, _o = {}, ko = {};
function Ac(e) {
  return Hl.call(ko, e) ? !0 : Hl.call(_o, e) ? !1 : Sc.test(e) ? ko[e] = !0 : (_o[e] = !0, !1);
}
function Ec(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function jc(e, t, n, r) {
  if (t === null || typeof t > "u" || Ec(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ve(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ae[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ae[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ae[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ae[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ae[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ae[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ae[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ae[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ae[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ki = /[\-:]([a-z])/g;
function Hi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ki,
    Hi
  );
  ae[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ki, Hi);
  ae[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ki, Hi);
  ae[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ae[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ae[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Vi(e, t, n, r) {
  var l = ae.hasOwnProperty(t) ? ae[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (jc(t, n, l, r) && (n = null), r || l === null ? Ac(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ct = Mc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Er = Symbol.for("react.element"), on = Symbol.for("react.portal"), sn = Symbol.for("react.fragment"), Mi = Symbol.for("react.strict_mode"), Vl = Symbol.for("react.profiler"), Xs = Symbol.for("react.provider"), Js = Symbol.for("react.context"), Si = Symbol.for("react.forward_ref"), Ml = Symbol.for("react.suspense"), Sl = Symbol.for("react.suspense_list"), Ai = Symbol.for("react.memo"), mt = Symbol.for("react.lazy"), qs = Symbol.for("react.offscreen"), Ho = Symbol.iterator;
function On(e) {
  return e === null || typeof e != "object" ? null : (e = Ho && e[Ho] || e["@@iterator"], typeof e == "function" ? e : null);
}
var X = Object.assign, X1;
function Bn(e) {
  if (X1 === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    X1 = t && t[1] || "";
  }
  return `
` + X1 + e;
}
var J1 = !1;
function q1(e, t) {
  if (!e || J1) return "";
  J1 = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s]; ) s--;
      for (; 1 <= o && 0 <= s; o--, s--) if (l[o] !== i[s]) {
        if (o !== 1 || s !== 1)
          do
            if (o--, s--, 0 > s || l[o] !== i[s]) {
              var u = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= o && 0 <= s);
        break;
      }
    }
  } finally {
    J1 = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Bn(e) : "";
}
function Nc(e) {
  switch (e.tag) {
    case 5:
      return Bn(e.type);
    case 16:
      return Bn("Lazy");
    case 13:
      return Bn("Suspense");
    case 19:
      return Bn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = q1(e.type, !1), e;
    case 11:
      return e = q1(e.type.render, !1), e;
    case 1:
      return e = q1(e.type, !0), e;
    default:
      return "";
  }
}
function Al(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case sn:
      return "Fragment";
    case on:
      return "Portal";
    case Vl:
      return "Profiler";
    case Mi:
      return "StrictMode";
    case Ml:
      return "Suspense";
    case Sl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Js:
      return (e.displayName || "Context") + ".Consumer";
    case Xs:
      return (e._context.displayName || "Context") + ".Provider";
    case Si:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Ai:
      return t = e.displayName || null, t !== null ? t : Al(e.type) || "Memo";
    case mt:
      t = e._payload, e = e._init;
      try {
        return Al(e(t));
      } catch {
      }
  }
  return null;
}
function zc(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Al(t);
    case 8:
      return t === Mi ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function St(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ea(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Pc(e) {
  var t = ea(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function jr(e) {
  e._valueTracker || (e._valueTracker = Pc(e));
}
function ta(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ea(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function o1(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function El(e, t) {
  var n = t.checked;
  return X({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Vo(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = St(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function na(e, t) {
  t = t.checked, t != null && Vi(e, "checked", t, !1);
}
function jl(e, t) {
  na(e, t);
  var n = St(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Nl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Nl(e, t.type, St(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Mo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Nl(e, t, n) {
  (t !== "number" || o1(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Wn = Array.isArray;
function yn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + St(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function zl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
  return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function So(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(L(92));
      if (Wn(n)) {
        if (1 < n.length) throw Error(L(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: St(n) };
}
function ra(e, t) {
  var n = St(t.value), r = St(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Ao(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function la(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Pl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? la(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Nr, ia = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Nr = Nr || document.createElement("div"), Nr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Nr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function or(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Yn = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Tc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Yn).forEach(function(e) {
  Tc.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Yn[t] = Yn[e];
  });
});
function oa(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Yn.hasOwnProperty(e) && Yn[e] ? ("" + t).trim() : t + "px";
}
function sa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = oa(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Oc = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Tl(e, t) {
  if (t) {
    if (Oc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(L(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(L(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(L(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(L(62));
  }
}
function Ol(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var bl = null;
function Ei(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Il = null, Cn = null, xn = null;
function Eo(e) {
  if (e = Mr(e)) {
    if (typeof Il != "function") throw Error(L(280));
    var t = e.stateNode;
    t && (t = O1(t), Il(e.stateNode, e.type, t));
  }
}
function aa(e) {
  Cn ? xn ? xn.push(e) : xn = [e] : Cn = e;
}
function ua() {
  if (Cn) {
    var e = Cn, t = xn;
    if (xn = Cn = null, Eo(e), t) for (e = 0; e < t.length; e++) Eo(t[e]);
  }
}
function ca(e, t) {
  return e(t);
}
function da() {
}
var el = !1;
function fa(e, t, n) {
  if (el) return e(t, n);
  el = !0;
  try {
    return ca(e, t, n);
  } finally {
    el = !1, (Cn !== null || xn !== null) && (da(), ua());
  }
}
function sr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = O1(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(L(231, t, typeof n));
  return n;
}
var Rl = !1;
if (ot) try {
  var bn = {};
  Object.defineProperty(bn, "passive", { get: function() {
    Rl = !0;
  } }), window.addEventListener("test", bn, bn), window.removeEventListener("test", bn, bn);
} catch {
  Rl = !1;
}
function bc(e, t, n, r, l, i, o, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (f) {
    this.onError(f);
  }
}
var Xn = !1, s1 = null, a1 = !1, Dl = null, Ic = { onError: function(e) {
  Xn = !0, s1 = e;
} };
function Rc(e, t, n, r, l, i, o, s, u) {
  Xn = !1, s1 = null, bc.apply(Ic, arguments);
}
function Dc(e, t, n, r, l, i, o, s, u) {
  if (Rc.apply(this, arguments), Xn) {
    if (Xn) {
      var c = s1;
      Xn = !1, s1 = null;
    } else throw Error(L(198));
    a1 || (a1 = !0, Dl = c);
  }
}
function qt(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function pa(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function jo(e) {
  if (qt(e) !== e) throw Error(L(188));
}
function Fc(e) {
  var t = e.alternate;
  if (!t) {
    if (t = qt(e), t === null) throw Error(L(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return jo(l), e;
        if (i === r) return jo(l), t;
        i = i.sibling;
      }
      throw Error(L(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, s = l.child; s; ) {
        if (s === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (s === r) {
          o = !0, r = l, n = i;
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = i.child; s; ) {
          if (s === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (s === r) {
            o = !0, r = i, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(L(189));
      }
    }
    if (n.alternate !== r) throw Error(L(190));
  }
  if (n.tag !== 3) throw Error(L(188));
  return n.stateNode.current === n ? e : t;
}
function ma(e) {
  return e = Fc(e), e !== null ? ha(e) : null;
}
function ha(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ha(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ga = Me.unstable_scheduleCallback, No = Me.unstable_cancelCallback, $c = Me.unstable_shouldYield, Zc = Me.unstable_requestPaint, ee = Me.unstable_now, Uc = Me.unstable_getCurrentPriorityLevel, ji = Me.unstable_ImmediatePriority, va = Me.unstable_UserBlockingPriority, u1 = Me.unstable_NormalPriority, Bc = Me.unstable_LowPriority, ya = Me.unstable_IdlePriority, N1 = null, Xe = null;
function Wc(e) {
  if (Xe && typeof Xe.onCommitFiberRoot == "function") try {
    Xe.onCommitFiberRoot(N1, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var $e = Math.clz32 ? Math.clz32 : Gc, Kc = Math.log, Qc = Math.LN2;
function Gc(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Kc(e) / Qc | 0) | 0;
}
var zr = 64, Pr = 4194304;
function Kn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function c1(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = Kn(s) : (i &= o, i !== 0 && (r = Kn(i)));
  } else o = n & ~l, o !== 0 ? r = Kn(o) : i !== 0 && (r = Kn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - $e(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Yc(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Xc(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - $e(i), s = 1 << o, u = l[o];
    u === -1 ? (!(s & n) || s & r) && (l[o] = Yc(s, t)) : u <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function Fl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ca() {
  var e = zr;
  return zr <<= 1, !(zr & 4194240) && (zr = 64), e;
}
function tl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Hr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - $e(t), e[t] = n;
}
function Jc(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - $e(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function Ni(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - $e(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var I = 0;
function xa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var La, zi, wa, _a, ka, $l = !1, Tr = [], xt = null, Lt = null, wt = null, ar = /* @__PURE__ */ new Map(), ur = /* @__PURE__ */ new Map(), gt = [], qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function zo(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      xt = null;
      break;
    case "dragenter":
    case "dragleave":
      Lt = null;
      break;
    case "mouseover":
    case "mouseout":
      wt = null;
      break;
    case "pointerover":
    case "pointerout":
      ar.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ur.delete(t.pointerId);
  }
}
function In(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Mr(t), t !== null && zi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function e2(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return xt = In(xt, e, t, n, r, l), !0;
    case "dragenter":
      return Lt = In(Lt, e, t, n, r, l), !0;
    case "mouseover":
      return wt = In(wt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return ar.set(i, In(ar.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, ur.set(i, In(ur.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ha(e) {
  var t = $t(e.target);
  if (t !== null) {
    var n = qt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = pa(n), t !== null) {
          e.blockedOn = t, ka(e.priority, function() {
            wa(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Qr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Zl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      bl = r, n.target.dispatchEvent(r), bl = null;
    } else return t = Mr(n), t !== null && zi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Po(e, t, n) {
  Qr(e) && n.delete(t);
}
function t2() {
  $l = !1, xt !== null && Qr(xt) && (xt = null), Lt !== null && Qr(Lt) && (Lt = null), wt !== null && Qr(wt) && (wt = null), ar.forEach(Po), ur.forEach(Po);
}
function Rn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, $l || ($l = !0, Me.unstable_scheduleCallback(Me.unstable_NormalPriority, t2)));
}
function cr(e) {
  function t(l) {
    return Rn(l, e);
  }
  if (0 < Tr.length) {
    Rn(Tr[0], e);
    for (var n = 1; n < Tr.length; n++) {
      var r = Tr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (xt !== null && Rn(xt, e), Lt !== null && Rn(Lt, e), wt !== null && Rn(wt, e), ar.forEach(t), ur.forEach(t), n = 0; n < gt.length; n++) r = gt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < gt.length && (n = gt[0], n.blockedOn === null); ) Ha(n), n.blockedOn === null && gt.shift();
}
var Ln = ct.ReactCurrentBatchConfig, d1 = !0;
function n2(e, t, n, r) {
  var l = I, i = Ln.transition;
  Ln.transition = null;
  try {
    I = 1, Pi(e, t, n, r);
  } finally {
    I = l, Ln.transition = i;
  }
}
function r2(e, t, n, r) {
  var l = I, i = Ln.transition;
  Ln.transition = null;
  try {
    I = 4, Pi(e, t, n, r);
  } finally {
    I = l, Ln.transition = i;
  }
}
function Pi(e, t, n, r) {
  if (d1) {
    var l = Zl(e, t, n, r);
    if (l === null) dl(e, t, r, f1, n), zo(e, r);
    else if (e2(l, e, t, n, r)) r.stopPropagation();
    else if (zo(e, r), t & 4 && -1 < qc.indexOf(e)) {
      for (; l !== null; ) {
        var i = Mr(l);
        if (i !== null && La(i), i = Zl(e, t, n, r), i === null && dl(e, t, r, f1, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else dl(e, t, r, null, n);
  }
}
var f1 = null;
function Zl(e, t, n, r) {
  if (f1 = null, e = Ei(r), e = $t(e), e !== null) if (t = qt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = pa(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return f1 = e, null;
}
function Va(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Uc()) {
        case ji:
          return 1;
        case va:
          return 4;
        case u1:
        case Bc:
          return 16;
        case ya:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var yt = null, Ti = null, Gr = null;
function Ma() {
  if (Gr) return Gr;
  var e, t = Ti, n = t.length, r, l = "value" in yt ? yt.value : yt.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Gr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Yr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Or() {
  return !0;
}
function To() {
  return !1;
}
function Ae(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Or : To, this.isPropagationStopped = To, this;
  }
  return X(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Or);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Or);
  }, persist: function() {
  }, isPersistent: Or }), t;
}
var Pn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Oi = Ae(Pn), Vr = X({}, Pn, { view: 0, detail: 0 }), l2 = Ae(Vr), nl, rl, Dn, z1 = X({}, Vr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: bi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Dn && (Dn && e.type === "mousemove" ? (nl = e.screenX - Dn.screenX, rl = e.screenY - Dn.screenY) : rl = nl = 0, Dn = e), nl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : rl;
} }), Oo = Ae(z1), i2 = X({}, z1, { dataTransfer: 0 }), o2 = Ae(i2), s2 = X({}, Vr, { relatedTarget: 0 }), ll = Ae(s2), a2 = X({}, Pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), u2 = Ae(a2), c2 = X({}, Pn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), d2 = Ae(c2), f2 = X({}, Pn, { data: 0 }), bo = Ae(f2), p2 = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, m2 = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, h2 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function g2(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = h2[e]) ? !!t[e] : !1;
}
function bi() {
  return g2;
}
var v2 = X({}, Vr, { key: function(e) {
  if (e.key) {
    var t = p2[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Yr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? m2[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: bi, charCode: function(e) {
  return e.type === "keypress" ? Yr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Yr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), y2 = Ae(v2), C2 = X({}, z1, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Io = Ae(C2), x2 = X({}, Vr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: bi }), L2 = Ae(x2), w2 = X({}, Pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), _2 = Ae(w2), k2 = X({}, z1, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), H2 = Ae(k2), V2 = [9, 13, 27, 32], Ii = ot && "CompositionEvent" in window, Jn = null;
ot && "documentMode" in document && (Jn = document.documentMode);
var M2 = ot && "TextEvent" in window && !Jn, Sa = ot && (!Ii || Jn && 8 < Jn && 11 >= Jn), Ro = " ", Do = !1;
function Aa(e, t) {
  switch (e) {
    case "keyup":
      return V2.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ea(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var an = !1;
function S2(e, t) {
  switch (e) {
    case "compositionend":
      return Ea(t);
    case "keypress":
      return t.which !== 32 ? null : (Do = !0, Ro);
    case "textInput":
      return e = t.data, e === Ro && Do ? null : e;
    default:
      return null;
  }
}
function A2(e, t) {
  if (an) return e === "compositionend" || !Ii && Aa(e, t) ? (e = Ma(), Gr = Ti = yt = null, an = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Sa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var E2 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Fo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!E2[e.type] : t === "textarea";
}
function ja(e, t, n, r) {
  aa(r), t = p1(t, "onChange"), 0 < t.length && (n = new Oi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var qn = null, dr = null;
function j2(e) {
  $a(e, 0);
}
function P1(e) {
  var t = dn(e);
  if (ta(t)) return e;
}
function N2(e, t) {
  if (e === "change") return t;
}
var Na = !1;
if (ot) {
  var il;
  if (ot) {
    var ol = "oninput" in document;
    if (!ol) {
      var $o = document.createElement("div");
      $o.setAttribute("oninput", "return;"), ol = typeof $o.oninput == "function";
    }
    il = ol;
  } else il = !1;
  Na = il && (!document.documentMode || 9 < document.documentMode);
}
function Zo() {
  qn && (qn.detachEvent("onpropertychange", za), dr = qn = null);
}
function za(e) {
  if (e.propertyName === "value" && P1(dr)) {
    var t = [];
    ja(t, dr, e, Ei(e)), fa(j2, t);
  }
}
function z2(e, t, n) {
  e === "focusin" ? (Zo(), qn = t, dr = n, qn.attachEvent("onpropertychange", za)) : e === "focusout" && Zo();
}
function P2(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return P1(dr);
}
function T2(e, t) {
  if (e === "click") return P1(t);
}
function O2(e, t) {
  if (e === "input" || e === "change") return P1(t);
}
function b2(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ue = typeof Object.is == "function" ? Object.is : b2;
function fr(e, t) {
  if (Ue(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Hl.call(t, l) || !Ue(e[l], t[l])) return !1;
  }
  return !0;
}
function Uo(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Bo(e, t) {
  var n = Uo(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Uo(n);
  }
}
function Pa(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pa(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Ta() {
  for (var e = window, t = o1(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = o1(e.document);
  }
  return t;
}
function Ri(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function I2(e) {
  var t = Ta(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Pa(n.ownerDocument.documentElement, n)) {
    if (r !== null && Ri(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Bo(n, i);
        var o = Bo(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var R2 = ot && "documentMode" in document && 11 >= document.documentMode, un = null, Ul = null, er = null, Bl = !1;
function Wo(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Bl || un == null || un !== o1(r) || (r = un, "selectionStart" in r && Ri(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), er && fr(er, r) || (er = r, r = p1(Ul, "onSelect"), 0 < r.length && (t = new Oi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = un)));
}
function br(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var cn = { animationend: br("Animation", "AnimationEnd"), animationiteration: br("Animation", "AnimationIteration"), animationstart: br("Animation", "AnimationStart"), transitionend: br("Transition", "TransitionEnd") }, sl = {}, Oa = {};
ot && (Oa = document.createElement("div").style, "AnimationEvent" in window || (delete cn.animationend.animation, delete cn.animationiteration.animation, delete cn.animationstart.animation), "TransitionEvent" in window || delete cn.transitionend.transition);
function T1(e) {
  if (sl[e]) return sl[e];
  if (!cn[e]) return e;
  var t = cn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Oa) return sl[e] = t[n];
  return e;
}
var ba = T1("animationend"), Ia = T1("animationiteration"), Ra = T1("animationstart"), Da = T1("transitionend"), Fa = /* @__PURE__ */ new Map(), Ko = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nt(e, t) {
  Fa.set(e, t), Jt(t, [e]);
}
for (var al = 0; al < Ko.length; al++) {
  var ul = Ko[al], D2 = ul.toLowerCase(), F2 = ul[0].toUpperCase() + ul.slice(1);
  Nt(D2, "on" + F2);
}
Nt(ba, "onAnimationEnd");
Nt(Ia, "onAnimationIteration");
Nt(Ra, "onAnimationStart");
Nt("dblclick", "onDoubleClick");
Nt("focusin", "onFocus");
Nt("focusout", "onBlur");
Nt(Da, "onTransitionEnd");
kn("onMouseEnter", ["mouseout", "mouseover"]);
kn("onMouseLeave", ["mouseout", "mouseover"]);
kn("onPointerEnter", ["pointerout", "pointerover"]);
kn("onPointerLeave", ["pointerout", "pointerover"]);
Jt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Jt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Jt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Jt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Qn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), $2 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qn));
function Qo(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Dc(r, t, void 0, e), e.currentTarget = null;
}
function $a(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var s = r[o], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== i && l.isPropagationStopped()) break e;
        Qo(l, s, c), i = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (s = r[o], u = s.instance, c = s.currentTarget, s = s.listener, u !== i && l.isPropagationStopped()) break e;
        Qo(l, s, c), i = u;
      }
    }
  }
  if (a1) throw e = Dl, a1 = !1, Dl = null, e;
}
function F(e, t) {
  var n = t[Yl];
  n === void 0 && (n = t[Yl] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Za(t, e, 2, !1), n.add(r));
}
function cl(e, t, n) {
  var r = 0;
  t && (r |= 4), Za(n, e, r, t);
}
var Ir = "_reactListening" + Math.random().toString(36).slice(2);
function pr(e) {
  if (!e[Ir]) {
    e[Ir] = !0, Ys.forEach(function(n) {
      n !== "selectionchange" && ($2.has(n) || cl(n, !1, e), cl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ir] || (t[Ir] = !0, cl("selectionchange", !1, t));
  }
}
function Za(e, t, n, r) {
  switch (Va(t)) {
    case 1:
      var l = n2;
      break;
    case 4:
      l = r2;
      break;
    default:
      l = Pi;
  }
  n = l.bind(null, t, n, e), l = void 0, !Rl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function dl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var u = o.tag;
        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        o = o.return;
      }
      for (; s !== null; ) {
        if (o = $t(s), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = i = o;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  fa(function() {
    var c = i, f = Ei(n), h = [];
    e: {
      var g = Fa.get(e);
      if (g !== void 0) {
        var v = Oi, C = e;
        switch (e) {
          case "keypress":
            if (Yr(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = y2;
            break;
          case "focusin":
            C = "focus", v = ll;
            break;
          case "focusout":
            C = "blur", v = ll;
            break;
          case "beforeblur":
          case "afterblur":
            v = ll;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Oo;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = o2;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = L2;
            break;
          case ba:
          case Ia:
          case Ra:
            v = u2;
            break;
          case Da:
            v = _2;
            break;
          case "scroll":
            v = l2;
            break;
          case "wheel":
            v = H2;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = d2;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Io;
        }
        var x = (t & 4) !== 0, j = !x && e === "scroll", p = x ? g !== null ? g + "Capture" : null : g;
        x = [];
        for (var d = c, m; d !== null; ) {
          m = d;
          var y = m.stateNode;
          if (m.tag === 5 && y !== null && (m = y, p !== null && (y = sr(d, p), y != null && x.push(mr(d, y, m)))), j) break;
          d = d.return;
        }
        0 < x.length && (g = new v(g, C, null, n, f), h.push({ event: g, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", g && n !== bl && (C = n.relatedTarget || n.fromElement) && ($t(C) || C[st])) break e;
        if ((v || g) && (g = f.window === f ? f : (g = f.ownerDocument) ? g.defaultView || g.parentWindow : window, v ? (C = n.relatedTarget || n.toElement, v = c, C = C ? $t(C) : null, C !== null && (j = qt(C), C !== j || C.tag !== 5 && C.tag !== 6) && (C = null)) : (v = null, C = c), v !== C)) {
          if (x = Oo, y = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (x = Io, y = "onPointerLeave", p = "onPointerEnter", d = "pointer"), j = v == null ? g : dn(v), m = C == null ? g : dn(C), g = new x(y, d + "leave", v, n, f), g.target = j, g.relatedTarget = m, y = null, $t(f) === c && (x = new x(p, d + "enter", C, n, f), x.target = m, x.relatedTarget = j, y = x), j = y, v && C) t: {
            for (x = v, p = C, d = 0, m = x; m; m = ln(m)) d++;
            for (m = 0, y = p; y; y = ln(y)) m++;
            for (; 0 < d - m; ) x = ln(x), d--;
            for (; 0 < m - d; ) p = ln(p), m--;
            for (; d--; ) {
              if (x === p || p !== null && x === p.alternate) break t;
              x = ln(x), p = ln(p);
            }
            x = null;
          }
          else x = null;
          v !== null && Go(h, g, v, x, !1), C !== null && j !== null && Go(h, j, C, x, !0);
        }
      }
      e: {
        if (g = c ? dn(c) : window, v = g.nodeName && g.nodeName.toLowerCase(), v === "select" || v === "input" && g.type === "file") var w = N2;
        else if (Fo(g)) if (Na) w = O2;
        else {
          w = P2;
          var S = z2;
        }
        else (v = g.nodeName) && v.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (w = T2);
        if (w && (w = w(e, c))) {
          ja(h, w, n, f);
          break e;
        }
        S && S(e, g, c), e === "focusout" && (S = g._wrapperState) && S.controlled && g.type === "number" && Nl(g, "number", g.value);
      }
      switch (S = c ? dn(c) : window, e) {
        case "focusin":
          (Fo(S) || S.contentEditable === "true") && (un = S, Ul = c, er = null);
          break;
        case "focusout":
          er = Ul = un = null;
          break;
        case "mousedown":
          Bl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Bl = !1, Wo(h, n, f);
          break;
        case "selectionchange":
          if (R2) break;
        case "keydown":
        case "keyup":
          Wo(h, n, f);
      }
      var V;
      if (Ii) e: {
        switch (e) {
          case "compositionstart":
            var A = "onCompositionStart";
            break e;
          case "compositionend":
            A = "onCompositionEnd";
            break e;
          case "compositionupdate":
            A = "onCompositionUpdate";
            break e;
        }
        A = void 0;
      }
      else an ? Aa(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A && (Sa && n.locale !== "ko" && (an || A !== "onCompositionStart" ? A === "onCompositionEnd" && an && (V = Ma()) : (yt = f, Ti = "value" in yt ? yt.value : yt.textContent, an = !0)), S = p1(c, A), 0 < S.length && (A = new bo(A, e, null, n, f), h.push({ event: A, listeners: S }), V ? A.data = V : (V = Ea(n), V !== null && (A.data = V)))), (V = M2 ? S2(e, n) : A2(e, n)) && (c = p1(c, "onBeforeInput"), 0 < c.length && (f = new bo("onBeforeInput", "beforeinput", null, n, f), h.push({ event: f, listeners: c }), f.data = V));
    }
    $a(h, t);
  });
}
function mr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function p1(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = sr(e, n), i != null && r.unshift(mr(e, i, l)), i = sr(e, t), i != null && r.push(mr(e, i, l))), e = e.return;
  }
  return r;
}
function ln(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Go(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = sr(n, i), u != null && o.unshift(mr(n, u, s))) : l || (u = sr(n, i), u != null && o.push(mr(n, u, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Z2 = /\r\n?/g, U2 = /\u0000|\uFFFD/g;
function Yo(e) {
  return (typeof e == "string" ? e : "" + e).replace(Z2, `
`).replace(U2, "");
}
function Rr(e, t, n) {
  if (t = Yo(t), Yo(e) !== t && n) throw Error(L(425));
}
function m1() {
}
var Wl = null, Kl = null;
function Ql(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Gl = typeof setTimeout == "function" ? setTimeout : void 0, B2 = typeof clearTimeout == "function" ? clearTimeout : void 0, Xo = typeof Promise == "function" ? Promise : void 0, W2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xo < "u" ? function(e) {
  return Xo.resolve(null).then(e).catch(K2);
} : Gl;
function K2(e) {
  setTimeout(function() {
    throw e;
  });
}
function fl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), cr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  cr(t);
}
function _t(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Jo(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Tn = Math.random().toString(36).slice(2), Ge = "__reactFiber$" + Tn, hr = "__reactProps$" + Tn, st = "__reactContainer$" + Tn, Yl = "__reactEvents$" + Tn, Q2 = "__reactListeners$" + Tn, G2 = "__reactHandles$" + Tn;
function $t(e) {
  var t = e[Ge];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[st] || n[Ge]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Jo(e); e !== null; ) {
        if (n = e[Ge]) return n;
        e = Jo(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Mr(e) {
  return e = e[Ge] || e[st], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function dn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(L(33));
}
function O1(e) {
  return e[hr] || null;
}
var Xl = [], fn = -1;
function zt(e) {
  return { current: e };
}
function $(e) {
  0 > fn || (e.current = Xl[fn], Xl[fn] = null, fn--);
}
function D(e, t) {
  fn++, Xl[fn] = e.current, e.current = t;
}
var At = {}, fe = zt(At), Le = zt(!1), Kt = At;
function Hn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return At;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function we(e) {
  return e = e.childContextTypes, e != null;
}
function h1() {
  $(Le), $(fe);
}
function qo(e, t, n) {
  if (fe.current !== At) throw Error(L(168));
  D(fe, t), D(Le, n);
}
function Ua(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(L(108, zc(e) || "Unknown", l));
  return X({}, n, r);
}
function g1(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || At, Kt = fe.current, D(fe, e), D(Le, Le.current), !0;
}
function es(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(L(169));
  n ? (e = Ua(e, t, Kt), r.__reactInternalMemoizedMergedChildContext = e, $(Le), $(fe), D(fe, e)) : $(Le), D(Le, n);
}
var nt = null, b1 = !1, pl = !1;
function Ba(e) {
  nt === null ? nt = [e] : nt.push(e);
}
function Y2(e) {
  b1 = !0, Ba(e);
}
function Pt() {
  if (!pl && nt !== null) {
    pl = !0;
    var e = 0, t = I;
    try {
      var n = nt;
      for (I = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      nt = null, b1 = !1;
    } catch (l) {
      throw nt !== null && (nt = nt.slice(e + 1)), ga(ji, Pt), l;
    } finally {
      I = t, pl = !1;
    }
  }
  return null;
}
var pn = [], mn = 0, v1 = null, y1 = 0, je = [], Ne = 0, Qt = null, rt = 1, lt = "";
function Rt(e, t) {
  pn[mn++] = y1, pn[mn++] = v1, v1 = e, y1 = t;
}
function Wa(e, t, n) {
  je[Ne++] = rt, je[Ne++] = lt, je[Ne++] = Qt, Qt = e;
  var r = rt;
  e = lt;
  var l = 32 - $e(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - $e(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, rt = 1 << 32 - $e(t) + l | n << l | r, lt = i + e;
  } else rt = 1 << i | n << l | r, lt = e;
}
function Di(e) {
  e.return !== null && (Rt(e, 1), Wa(e, 1, 0));
}
function Fi(e) {
  for (; e === v1; ) v1 = pn[--mn], pn[mn] = null, y1 = pn[--mn], pn[mn] = null;
  for (; e === Qt; ) Qt = je[--Ne], je[Ne] = null, lt = je[--Ne], je[Ne] = null, rt = je[--Ne], je[Ne] = null;
}
var Ve = null, He = null, B = !1, Fe = null;
function Ka(e, t) {
  var n = ze(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ts(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ve = e, He = _t(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ve = e, He = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Qt !== null ? { id: rt, overflow: lt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ze(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ve = e, He = null, !0) : !1;
    default:
      return !1;
  }
}
function Jl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ql(e) {
  if (B) {
    var t = He;
    if (t) {
      var n = t;
      if (!ts(e, t)) {
        if (Jl(e)) throw Error(L(418));
        t = _t(n.nextSibling);
        var r = Ve;
        t && ts(e, t) ? Ka(r, n) : (e.flags = e.flags & -4097 | 2, B = !1, Ve = e);
      }
    } else {
      if (Jl(e)) throw Error(L(418));
      e.flags = e.flags & -4097 | 2, B = !1, Ve = e;
    }
  }
}
function ns(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ve = e;
}
function Dr(e) {
  if (e !== Ve) return !1;
  if (!B) return ns(e), B = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ql(e.type, e.memoizedProps)), t && (t = He)) {
    if (Jl(e)) throw Qa(), Error(L(418));
    for (; t; ) Ka(e, t), t = _t(t.nextSibling);
  }
  if (ns(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(L(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              He = _t(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      He = null;
    }
  } else He = Ve ? _t(e.stateNode.nextSibling) : null;
  return !0;
}
function Qa() {
  for (var e = He; e; ) e = _t(e.nextSibling);
}
function Vn() {
  He = Ve = null, B = !1;
}
function $i(e) {
  Fe === null ? Fe = [e] : Fe.push(e);
}
var X2 = ct.ReactCurrentBatchConfig;
function Fn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(L(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(L(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(L(284));
    if (!n._owner) throw Error(L(290, e));
  }
  return e;
}
function Fr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(L(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function rs(e) {
  var t = e._init;
  return t(e._payload);
}
function Ga(e) {
  function t(p, d) {
    if (e) {
      var m = p.deletions;
      m === null ? (p.deletions = [d], p.flags |= 16) : m.push(d);
    }
  }
  function n(p, d) {
    if (!e) return null;
    for (; d !== null; ) t(p, d), d = d.sibling;
    return null;
  }
  function r(p, d) {
    for (p = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? p.set(d.key, d) : p.set(d.index, d), d = d.sibling;
    return p;
  }
  function l(p, d) {
    return p = Mt(p, d), p.index = 0, p.sibling = null, p;
  }
  function i(p, d, m) {
    return p.index = m, e ? (m = p.alternate, m !== null ? (m = m.index, m < d ? (p.flags |= 2, d) : m) : (p.flags |= 2, d)) : (p.flags |= 1048576, d);
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function s(p, d, m, y) {
    return d === null || d.tag !== 6 ? (d = xl(m, p.mode, y), d.return = p, d) : (d = l(d, m), d.return = p, d);
  }
  function u(p, d, m, y) {
    var w = m.type;
    return w === sn ? f(p, d, m.props.children, y, m.key) : d !== null && (d.elementType === w || typeof w == "object" && w !== null && w.$$typeof === mt && rs(w) === d.type) ? (y = l(d, m.props), y.ref = Fn(p, d, m), y.return = p, y) : (y = r1(m.type, m.key, m.props, null, p.mode, y), y.ref = Fn(p, d, m), y.return = p, y);
  }
  function c(p, d, m, y) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== m.containerInfo || d.stateNode.implementation !== m.implementation ? (d = Ll(m, p.mode, y), d.return = p, d) : (d = l(d, m.children || []), d.return = p, d);
  }
  function f(p, d, m, y, w) {
    return d === null || d.tag !== 7 ? (d = Wt(m, p.mode, y, w), d.return = p, d) : (d = l(d, m), d.return = p, d);
  }
  function h(p, d, m) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = xl("" + d, p.mode, m), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Er:
          return m = r1(d.type, d.key, d.props, null, p.mode, m), m.ref = Fn(p, null, d), m.return = p, m;
        case on:
          return d = Ll(d, p.mode, m), d.return = p, d;
        case mt:
          var y = d._init;
          return h(p, y(d._payload), m);
      }
      if (Wn(d) || On(d)) return d = Wt(d, p.mode, m, null), d.return = p, d;
      Fr(p, d);
    }
    return null;
  }
  function g(p, d, m, y) {
    var w = d !== null ? d.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return w !== null ? null : s(p, d, "" + m, y);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Er:
          return m.key === w ? u(p, d, m, y) : null;
        case on:
          return m.key === w ? c(p, d, m, y) : null;
        case mt:
          return w = m._init, g(
            p,
            d,
            w(m._payload),
            y
          );
      }
      if (Wn(m) || On(m)) return w !== null ? null : f(p, d, m, y, null);
      Fr(p, m);
    }
    return null;
  }
  function v(p, d, m, y, w) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return p = p.get(m) || null, s(d, p, "" + y, w);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Er:
          return p = p.get(y.key === null ? m : y.key) || null, u(d, p, y, w);
        case on:
          return p = p.get(y.key === null ? m : y.key) || null, c(d, p, y, w);
        case mt:
          var S = y._init;
          return v(p, d, m, S(y._payload), w);
      }
      if (Wn(y) || On(y)) return p = p.get(m) || null, f(d, p, y, w, null);
      Fr(d, y);
    }
    return null;
  }
  function C(p, d, m, y) {
    for (var w = null, S = null, V = d, A = d = 0, Z = null; V !== null && A < m.length; A++) {
      V.index > A ? (Z = V, V = null) : Z = V.sibling;
      var z = g(p, V, m[A], y);
      if (z === null) {
        V === null && (V = Z);
        break;
      }
      e && V && z.alternate === null && t(p, V), d = i(z, d, A), S === null ? w = z : S.sibling = z, S = z, V = Z;
    }
    if (A === m.length) return n(p, V), B && Rt(p, A), w;
    if (V === null) {
      for (; A < m.length; A++) V = h(p, m[A], y), V !== null && (d = i(V, d, A), S === null ? w = V : S.sibling = V, S = V);
      return B && Rt(p, A), w;
    }
    for (V = r(p, V); A < m.length; A++) Z = v(V, p, A, m[A], y), Z !== null && (e && Z.alternate !== null && V.delete(Z.key === null ? A : Z.key), d = i(Z, d, A), S === null ? w = Z : S.sibling = Z, S = Z);
    return e && V.forEach(function(ye) {
      return t(p, ye);
    }), B && Rt(p, A), w;
  }
  function x(p, d, m, y) {
    var w = On(m);
    if (typeof w != "function") throw Error(L(150));
    if (m = w.call(m), m == null) throw Error(L(151));
    for (var S = w = null, V = d, A = d = 0, Z = null, z = m.next(); V !== null && !z.done; A++, z = m.next()) {
      V.index > A ? (Z = V, V = null) : Z = V.sibling;
      var ye = g(p, V, z.value, y);
      if (ye === null) {
        V === null && (V = Z);
        break;
      }
      e && V && ye.alternate === null && t(p, V), d = i(ye, d, A), S === null ? w = ye : S.sibling = ye, S = ye, V = Z;
    }
    if (z.done) return n(
      p,
      V
    ), B && Rt(p, A), w;
    if (V === null) {
      for (; !z.done; A++, z = m.next()) z = h(p, z.value, y), z !== null && (d = i(z, d, A), S === null ? w = z : S.sibling = z, S = z);
      return B && Rt(p, A), w;
    }
    for (V = r(p, V); !z.done; A++, z = m.next()) z = v(V, p, A, z.value, y), z !== null && (e && z.alternate !== null && V.delete(z.key === null ? A : z.key), d = i(z, d, A), S === null ? w = z : S.sibling = z, S = z);
    return e && V.forEach(function(dt) {
      return t(p, dt);
    }), B && Rt(p, A), w;
  }
  function j(p, d, m, y) {
    if (typeof m == "object" && m !== null && m.type === sn && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Er:
          e: {
            for (var w = m.key, S = d; S !== null; ) {
              if (S.key === w) {
                if (w = m.type, w === sn) {
                  if (S.tag === 7) {
                    n(p, S.sibling), d = l(S, m.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (S.elementType === w || typeof w == "object" && w !== null && w.$$typeof === mt && rs(w) === S.type) {
                  n(p, S.sibling), d = l(S, m.props), d.ref = Fn(p, S, m), d.return = p, p = d;
                  break e;
                }
                n(p, S);
                break;
              } else t(p, S);
              S = S.sibling;
            }
            m.type === sn ? (d = Wt(m.props.children, p.mode, y, m.key), d.return = p, p = d) : (y = r1(m.type, m.key, m.props, null, p.mode, y), y.ref = Fn(p, d, m), y.return = p, p = y);
          }
          return o(p);
        case on:
          e: {
            for (S = m.key; d !== null; ) {
              if (d.key === S) if (d.tag === 4 && d.stateNode.containerInfo === m.containerInfo && d.stateNode.implementation === m.implementation) {
                n(p, d.sibling), d = l(d, m.children || []), d.return = p, p = d;
                break e;
              } else {
                n(p, d);
                break;
              }
              else t(p, d);
              d = d.sibling;
            }
            d = Ll(m, p.mode, y), d.return = p, p = d;
          }
          return o(p);
        case mt:
          return S = m._init, j(p, d, S(m._payload), y);
      }
      if (Wn(m)) return C(p, d, m, y);
      if (On(m)) return x(p, d, m, y);
      Fr(p, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, m), d.return = p, p = d) : (n(p, d), d = xl(m, p.mode, y), d.return = p, p = d), o(p)) : n(p, d);
  }
  return j;
}
var Mn = Ga(!0), Ya = Ga(!1), C1 = zt(null), x1 = null, hn = null, Zi = null;
function Ui() {
  Zi = hn = x1 = null;
}
function Bi(e) {
  var t = C1.current;
  $(C1), e._currentValue = t;
}
function ei(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function wn(e, t) {
  x1 = e, Zi = hn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (xe = !0), e.firstContext = null);
}
function Te(e) {
  var t = e._currentValue;
  if (Zi !== e) if (e = { context: e, memoizedValue: t, next: null }, hn === null) {
    if (x1 === null) throw Error(L(308));
    hn = e, x1.dependencies = { lanes: 0, firstContext: e };
  } else hn = hn.next = e;
  return t;
}
var Zt = null;
function Wi(e) {
  Zt === null ? Zt = [e] : Zt.push(e);
}
function Xa(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Wi(t)) : (n.next = l.next, l.next = n), t.interleaved = n, at(e, r);
}
function at(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ht = !1;
function Ki(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ja(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function it(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function kt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, T & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, at(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Wi(r)) : (t.next = l.next, l.next = t), r.interleaved = t, at(e, n);
}
function Xr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ni(e, n);
  }
}
function ls(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function L1(e, t, n, r) {
  var l = e.updateQueue;
  ht = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var f = e.alternate;
    f !== null && (f = f.updateQueue, s = f.lastBaseUpdate, s !== o && (s === null ? f.firstBaseUpdate = c : s.next = c, f.lastBaseUpdate = u));
  }
  if (i !== null) {
    var h = l.baseState;
    o = 0, f = c = u = null, s = i;
    do {
      var g = s.lane, v = s.eventTime;
      if ((r & g) === g) {
        f !== null && (f = f.next = {
          eventTime: v,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var C = e, x = s;
          switch (g = t, v = n, x.tag) {
            case 1:
              if (C = x.payload, typeof C == "function") {
                h = C.call(v, h, g);
                break e;
              }
              h = C;
              break e;
            case 3:
              C.flags = C.flags & -65537 | 128;
            case 0:
              if (C = x.payload, g = typeof C == "function" ? C.call(v, h, g) : C, g == null) break e;
              h = X({}, h, g);
              break e;
            case 2:
              ht = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [s] : g.push(s));
      } else v = { eventTime: v, lane: g, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, f === null ? (c = f = v, u = h) : f = f.next = v, o |= g;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        g = s, s = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (f === null && (u = h), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = f, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Yt |= o, e.lanes = o, e.memoizedState = h;
  }
}
function is(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(L(191, l));
      l.call(r);
    }
  }
}
var Sr = {}, Je = zt(Sr), gr = zt(Sr), vr = zt(Sr);
function Ut(e) {
  if (e === Sr) throw Error(L(174));
  return e;
}
function Qi(e, t) {
  switch (D(vr, t), D(gr, e), D(Je, Sr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Pl(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Pl(t, e);
  }
  $(Je), D(Je, t);
}
function Sn() {
  $(Je), $(gr), $(vr);
}
function qa(e) {
  Ut(vr.current);
  var t = Ut(Je.current), n = Pl(t, e.type);
  t !== n && (D(gr, e), D(Je, n));
}
function Gi(e) {
  gr.current === e && ($(Je), $(gr));
}
var Q = zt(0);
function w1(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ml = [];
function Yi() {
  for (var e = 0; e < ml.length; e++) ml[e]._workInProgressVersionPrimary = null;
  ml.length = 0;
}
var Jr = ct.ReactCurrentDispatcher, hl = ct.ReactCurrentBatchConfig, Gt = 0, Y = null, ne = null, le = null, _1 = !1, tr = !1, yr = 0, J2 = 0;
function ue() {
  throw Error(L(321));
}
function Xi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ue(e[n], t[n])) return !1;
  return !0;
}
function Ji(e, t, n, r, l, i) {
  if (Gt = i, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Jr.current = e === null || e.memoizedState === null ? n0 : r0, e = n(r, l), tr) {
    i = 0;
    do {
      if (tr = !1, yr = 0, 25 <= i) throw Error(L(301));
      i += 1, le = ne = null, t.updateQueue = null, Jr.current = l0, e = n(r, l);
    } while (tr);
  }
  if (Jr.current = k1, t = ne !== null && ne.next !== null, Gt = 0, le = ne = Y = null, _1 = !1, t) throw Error(L(300));
  return e;
}
function qi() {
  var e = yr !== 0;
  return yr = 0, e;
}
function Qe() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return le === null ? Y.memoizedState = le = e : le = le.next = e, le;
}
function Oe() {
  if (ne === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ne.next;
  var t = le === null ? Y.memoizedState : le.next;
  if (t !== null) le = t, ne = e;
  else {
    if (e === null) throw Error(L(310));
    ne = e, e = { memoizedState: ne.memoizedState, baseState: ne.baseState, baseQueue: ne.baseQueue, queue: ne.queue, next: null }, le === null ? Y.memoizedState = le = e : le = le.next = e;
  }
  return le;
}
function Cr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function gl(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = ne, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var s = o = null, u = null, c = i;
    do {
      var f = c.lane;
      if ((Gt & f) === f) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var h = {
          lane: f,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = h, o = r) : u = u.next = h, Y.lanes |= f, Yt |= f;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? o = r : u.next = s, Ue(r, t.memoizedState) || (xe = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Y.lanes |= i, Yt |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function vl(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Ue(i, t.memoizedState) || (xe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function eu() {
}
function tu(e, t) {
  var n = Y, r = Oe(), l = t(), i = !Ue(r.memoizedState, l);
  if (i && (r.memoizedState = l, xe = !0), r = r.queue, eo(lu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || le !== null && le.memoizedState.tag & 1) {
    if (n.flags |= 2048, xr(9, ru.bind(null, n, r, l, t), void 0, null), ie === null) throw Error(L(349));
    Gt & 30 || nu(n, t, l);
  }
  return l;
}
function nu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function ru(e, t, n, r) {
  t.value = n, t.getSnapshot = r, iu(t) && ou(e);
}
function lu(e, t, n) {
  return n(function() {
    iu(t) && ou(e);
  });
}
function iu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ue(e, n);
  } catch {
    return !0;
  }
}
function ou(e) {
  var t = at(e, 1);
  t !== null && Ze(t, e, 1, -1);
}
function os(e) {
  var t = Qe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Cr, lastRenderedState: e }, t.queue = e, e = e.dispatch = t0.bind(null, Y, e), [t.memoizedState, e];
}
function xr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function su() {
  return Oe().memoizedState;
}
function qr(e, t, n, r) {
  var l = Qe();
  Y.flags |= e, l.memoizedState = xr(1 | t, n, void 0, r === void 0 ? null : r);
}
function I1(e, t, n, r) {
  var l = Oe();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ne !== null) {
    var o = ne.memoizedState;
    if (i = o.destroy, r !== null && Xi(r, o.deps)) {
      l.memoizedState = xr(t, n, i, r);
      return;
    }
  }
  Y.flags |= e, l.memoizedState = xr(1 | t, n, i, r);
}
function ss(e, t) {
  return qr(8390656, 8, e, t);
}
function eo(e, t) {
  return I1(2048, 8, e, t);
}
function au(e, t) {
  return I1(4, 2, e, t);
}
function uu(e, t) {
  return I1(4, 4, e, t);
}
function cu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function du(e, t, n) {
  return n = n != null ? n.concat([e]) : null, I1(4, 4, cu.bind(null, t, e), n);
}
function to() {
}
function fu(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Xi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function pu(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Xi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function mu(e, t, n) {
  return Gt & 21 ? (Ue(n, t) || (n = Ca(), Y.lanes |= n, Yt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, xe = !0), e.memoizedState = n);
}
function q2(e, t) {
  var n = I;
  I = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = hl.transition;
  hl.transition = {};
  try {
    e(!1), t();
  } finally {
    I = n, hl.transition = r;
  }
}
function hu() {
  return Oe().memoizedState;
}
function e0(e, t, n) {
  var r = Vt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, gu(e)) vu(t, n);
  else if (n = Xa(e, t, n, r), n !== null) {
    var l = he();
    Ze(n, e, r, l), yu(n, t, r);
  }
}
function t0(e, t, n) {
  var r = Vt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (gu(e)) vu(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, Ue(s, o)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Wi(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Xa(e, t, l, r), n !== null && (l = he(), Ze(n, e, r, l), yu(n, t, r));
  }
}
function gu(e) {
  var t = e.alternate;
  return e === Y || t !== null && t === Y;
}
function vu(e, t) {
  tr = _1 = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function yu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ni(e, n);
  }
}
var k1 = { readContext: Te, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, n0 = { readContext: Te, useCallback: function(e, t) {
  return Qe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Te, useEffect: ss, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, qr(
    4194308,
    4,
    cu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return qr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return qr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Qe();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Qe();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = e0.bind(null, Y, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Qe();
  return e = { current: e }, t.memoizedState = e;
}, useState: os, useDebugValue: to, useDeferredValue: function(e) {
  return Qe().memoizedState = e;
}, useTransition: function() {
  var e = os(!1), t = e[0];
  return e = q2.bind(null, e[1]), Qe().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Y, l = Qe();
  if (B) {
    if (n === void 0) throw Error(L(407));
    n = n();
  } else {
    if (n = t(), ie === null) throw Error(L(349));
    Gt & 30 || nu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, ss(lu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, xr(9, ru.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Qe(), t = ie.identifierPrefix;
  if (B) {
    var n = lt, r = rt;
    n = (r & ~(1 << 32 - $e(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = yr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = J2++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, r0 = {
  readContext: Te,
  useCallback: fu,
  useContext: Te,
  useEffect: eo,
  useImperativeHandle: du,
  useInsertionEffect: au,
  useLayoutEffect: uu,
  useMemo: pu,
  useReducer: gl,
  useRef: su,
  useState: function() {
    return gl(Cr);
  },
  useDebugValue: to,
  useDeferredValue: function(e) {
    var t = Oe();
    return mu(t, ne.memoizedState, e);
  },
  useTransition: function() {
    var e = gl(Cr)[0], t = Oe().memoizedState;
    return [e, t];
  },
  useMutableSource: eu,
  useSyncExternalStore: tu,
  useId: hu,
  unstable_isNewReconciler: !1
}, l0 = { readContext: Te, useCallback: fu, useContext: Te, useEffect: eo, useImperativeHandle: du, useInsertionEffect: au, useLayoutEffect: uu, useMemo: pu, useReducer: vl, useRef: su, useState: function() {
  return vl(Cr);
}, useDebugValue: to, useDeferredValue: function(e) {
  var t = Oe();
  return ne === null ? t.memoizedState = e : mu(t, ne.memoizedState, e);
}, useTransition: function() {
  var e = vl(Cr)[0], t = Oe().memoizedState;
  return [e, t];
}, useMutableSource: eu, useSyncExternalStore: tu, useId: hu, unstable_isNewReconciler: !1 };
function Ie(e, t) {
  if (e && e.defaultProps) {
    t = X({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ti(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : X({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var R1 = { isMounted: function(e) {
  return (e = e._reactInternals) ? qt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = Vt(e), i = it(r, l);
  i.payload = t, n != null && (i.callback = n), t = kt(e, i, l), t !== null && (Ze(t, e, l, r), Xr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = Vt(e), i = it(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = kt(e, i, l), t !== null && (Ze(t, e, l, r), Xr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = Vt(e), l = it(n, r);
  l.tag = 2, t != null && (l.callback = t), t = kt(e, l, r), t !== null && (Ze(t, e, r, n), Xr(t, e, r));
} };
function as(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !fr(n, r) || !fr(l, i) : !0;
}
function Cu(e, t, n) {
  var r = !1, l = At, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Te(i) : (l = we(t) ? Kt : fe.current, r = t.contextTypes, i = (r = r != null) ? Hn(e, l) : At), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = R1, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function us(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && R1.enqueueReplaceState(t, t.state, null);
}
function ni(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ki(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Te(i) : (i = we(t) ? Kt : fe.current, l.context = Hn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (ti(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && R1.enqueueReplaceState(l, l.state, null), L1(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function An(e, t) {
  try {
    var n = "", r = t;
    do
      n += Nc(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function yl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ri(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var i0 = typeof WeakMap == "function" ? WeakMap : Map;
function xu(e, t, n) {
  n = it(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    V1 || (V1 = !0, pi = r), ri(e, t);
  }, n;
}
function Lu(e, t, n) {
  n = it(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      ri(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    ri(e, t), typeof r != "function" && (Ht === null ? Ht = /* @__PURE__ */ new Set([this]) : Ht.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function cs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new i0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = C0.bind(null, e, t, n), t.then(e, e));
}
function ds(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function fs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = it(-1, 1), t.tag = 2, kt(n, t, 1))), n.lanes |= 1), e);
}
var o0 = ct.ReactCurrentOwner, xe = !1;
function me(e, t, n, r) {
  t.child = e === null ? Ya(t, null, n, r) : Mn(t, e.child, n, r);
}
function ps(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return wn(t, l), r = Ji(e, t, n, r, i, l), n = qi(), e !== null && !xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, ut(e, t, l)) : (B && n && Di(t), t.flags |= 1, me(e, t, r, l), t.child);
}
function ms(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !uo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, wu(e, t, i, r, l)) : (e = r1(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : fr, n(o, r) && e.ref === t.ref) return ut(e, t, l);
  }
  return t.flags |= 1, e = Mt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function wu(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (fr(i, r) && e.ref === t.ref) if (xe = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (xe = !0);
    else return t.lanes = e.lanes, ut(e, t, l);
  }
  return li(e, t, n, r, l);
}
function _u(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, D(vn, ke), ke |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, D(vn, ke), ke |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, D(vn, ke), ke |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, D(vn, ke), ke |= r;
  return me(e, t, l, n), t.child;
}
function ku(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function li(e, t, n, r, l) {
  var i = we(n) ? Kt : fe.current;
  return i = Hn(t, i), wn(t, l), n = Ji(e, t, n, r, i, l), r = qi(), e !== null && !xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, ut(e, t, l)) : (B && r && Di(t), t.flags |= 1, me(e, t, n, l), t.child);
}
function hs(e, t, n, r, l) {
  if (we(n)) {
    var i = !0;
    g1(t);
  } else i = !1;
  if (wn(t, l), t.stateNode === null) e1(e, t), Cu(t, n, r), ni(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Te(c) : (c = we(n) ? Kt : fe.current, c = Hn(t, c));
    var f = n.getDerivedStateFromProps, h = typeof f == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || u !== c) && us(t, o, r, c), ht = !1;
    var g = t.memoizedState;
    o.state = g, L1(t, r, o, l), u = t.memoizedState, s !== r || g !== u || Le.current || ht ? (typeof f == "function" && (ti(t, n, f, r), u = t.memoizedState), (s = ht || as(t, n, s, r, g, u, c)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Ja(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Ie(t.type, s), o.props = c, h = t.pendingProps, g = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Te(u) : (u = we(n) ? Kt : fe.current, u = Hn(t, u));
    var v = n.getDerivedStateFromProps;
    (f = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== h || g !== u) && us(t, o, r, u), ht = !1, g = t.memoizedState, o.state = g, L1(t, r, o, l);
    var C = t.memoizedState;
    s !== h || g !== C || Le.current || ht ? (typeof v == "function" && (ti(t, n, v, r), C = t.memoizedState), (c = ht || as(t, n, c, r, g, C, u) || !1) ? (f || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, C, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, C, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = C), o.props = r, o.state = C, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return ii(e, t, n, r, i, l);
}
function ii(e, t, n, r, l, i) {
  ku(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && es(t, n, !1), ut(e, t, i);
  r = t.stateNode, o0.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = Mn(t, e.child, null, i), t.child = Mn(t, null, s, i)) : me(e, t, s, i), t.memoizedState = r.state, l && es(t, n, !0), t.child;
}
function Hu(e) {
  var t = e.stateNode;
  t.pendingContext ? qo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && qo(e, t.context, !1), Qi(e, t.containerInfo);
}
function gs(e, t, n, r, l) {
  return Vn(), $i(l), t.flags |= 256, me(e, t, n, r), t.child;
}
var oi = { dehydrated: null, treeContext: null, retryLane: 0 };
function si(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Vu(e, t, n) {
  var r = t.pendingProps, l = Q.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), D(Q, l & 1), e === null)
    return ql(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = $1(o, r, 0, null), e = Wt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = si(n), t.memoizedState = oi, e) : no(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return s0(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Mt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = Mt(s, i) : (i = Wt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? si(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = oi, r;
  }
  return i = e.child, e = i.sibling, r = Mt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function no(e, t) {
  return t = $1({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function $r(e, t, n, r) {
  return r !== null && $i(r), Mn(t, e.child, null, n), e = no(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function s0(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = yl(Error(L(422))), $r(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = $1({ mode: "visible", children: r.children }, l, 0, null), i = Wt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && Mn(t, e.child, null, o), t.child.memoizedState = si(o), t.memoizedState = oi, i);
  if (!(t.mode & 1)) return $r(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(L(419)), r = yl(i, r, void 0), $r(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, xe || s) {
    if (r = ie, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, at(e, l), Ze(r, e, l, -1));
    }
    return ao(), r = yl(Error(L(421))), $r(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = x0.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, He = _t(l.nextSibling), Ve = t, B = !0, Fe = null, e !== null && (je[Ne++] = rt, je[Ne++] = lt, je[Ne++] = Qt, rt = e.id, lt = e.overflow, Qt = t), t = no(t, r.children), t.flags |= 4096, t);
}
function vs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ei(e.return, t, n);
}
function Cl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function Mu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (me(e, t, r.children, n), r = Q.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && vs(e, n, t);
      else if (e.tag === 19) vs(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (D(Q, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && w1(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Cl(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && w1(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Cl(t, !0, n, null, i);
      break;
    case "together":
      Cl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function e1(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function ut(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Yt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(L(153));
  if (t.child !== null) {
    for (e = t.child, n = Mt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Mt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function a0(e, t, n) {
  switch (t.tag) {
    case 3:
      Hu(t), Vn();
      break;
    case 5:
      qa(t);
      break;
    case 1:
      we(t.type) && g1(t);
      break;
    case 4:
      Qi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      D(C1, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (D(Q, Q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Vu(e, t, n) : (D(Q, Q.current & 1), e = ut(e, t, n), e !== null ? e.sibling : null);
      D(Q, Q.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Mu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), D(Q, Q.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, _u(e, t, n);
  }
  return ut(e, t, n);
}
var Su, ai, Au, Eu;
Su = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
ai = function() {
};
Au = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Ut(Je.current);
    var i = null;
    switch (n) {
      case "input":
        l = El(e, l), r = El(e, r), i = [];
        break;
      case "select":
        l = X({}, l, { value: void 0 }), r = X({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = zl(e, l), r = zl(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = m1);
    }
    Tl(n, r);
    var o;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (ir.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l?.[c], r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (o in s) !s.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (i || (i = []), i.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (ir.hasOwnProperty(c) ? (u != null && c === "onScroll" && F("scroll", e), i || s === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Eu = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function $n(e, t) {
  if (!B) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function u0(e, t, n) {
  var r = t.pendingProps;
  switch (Fi(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ce(t), null;
    case 1:
      return we(t.type) && h1(), ce(t), null;
    case 3:
      return r = t.stateNode, Sn(), $(Le), $(fe), Yi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Dr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Fe !== null && (gi(Fe), Fe = null))), ai(e, t), ce(t), null;
    case 5:
      Gi(t);
      var l = Ut(vr.current);
      if (n = t.type, e !== null && t.stateNode != null) Au(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(L(166));
          return ce(t), null;
        }
        if (e = Ut(Je.current), Dr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ge] = t, r[hr] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              F("cancel", r), F("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              F("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Qn.length; l++) F(Qn[l], r);
              break;
            case "source":
              F("error", r);
              break;
            case "img":
            case "image":
            case "link":
              F(
                "error",
                r
              ), F("load", r);
              break;
            case "details":
              F("toggle", r);
              break;
            case "input":
              Vo(r, i), F("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, F("invalid", r);
              break;
            case "textarea":
              So(r, i), F("invalid", r);
          }
          Tl(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && Rr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && Rr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : ir.hasOwnProperty(o) && s != null && o === "onScroll" && F("scroll", r);
          }
          switch (n) {
            case "input":
              jr(r), Mo(r, i, !0);
              break;
            case "textarea":
              jr(r), Ao(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = m1);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = la(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ge] = t, e[hr] = r, Su(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = Ol(n, r), n) {
              case "dialog":
                F("cancel", e), F("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                F("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Qn.length; l++) F(Qn[l], e);
                l = r;
                break;
              case "source":
                F("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                F(
                  "error",
                  e
                ), F("load", e), l = r;
                break;
              case "details":
                F("toggle", e), l = r;
                break;
              case "input":
                Vo(e, r), l = El(e, r), F("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = X({}, r, { value: void 0 }), F("invalid", e);
                break;
              case "textarea":
                So(e, r), l = zl(e, r), F("invalid", e);
                break;
              default:
                l = r;
            }
            Tl(n, l), s = l;
            for (i in s) if (s.hasOwnProperty(i)) {
              var u = s[i];
              i === "style" ? sa(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && ia(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && or(e, u) : typeof u == "number" && or(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (ir.hasOwnProperty(i) ? u != null && i === "onScroll" && F("scroll", e) : u != null && Vi(e, i, u, o));
            }
            switch (n) {
              case "input":
                jr(e), Mo(e, r, !1);
                break;
              case "textarea":
                jr(e), Ao(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + St(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? yn(e, !!r.multiple, i, !1) : r.defaultValue != null && yn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = m1);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return ce(t), null;
    case 6:
      if (e && t.stateNode != null) Eu(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
        if (n = Ut(vr.current), Ut(Je.current), Dr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ge] = t, (i = r.nodeValue !== n) && (e = Ve, e !== null)) switch (e.tag) {
            case 3:
              Rr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Rr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ge] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if ($(Q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (B && He !== null && t.mode & 1 && !(t.flags & 128)) Qa(), Vn(), t.flags |= 98560, i = !1;
        else if (i = Dr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(L(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(L(317));
            i[Ge] = t;
          } else Vn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), i = !1;
        } else Fe !== null && (gi(Fe), Fe = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Q.current & 1 ? re === 0 && (re = 3) : ao())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return Sn(), ai(e, t), e === null && pr(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return Bi(t.type._context), ce(t), null;
    case 17:
      return we(t.type) && h1(), ce(t), null;
    case 19:
      if ($(Q), i = t.memoizedState, i === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) $n(i, !1);
      else {
        if (re !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = w1(e), o !== null) {
            for (t.flags |= 128, $n(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return D(Q, Q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && ee() > En && (t.flags |= 128, r = !0, $n(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = w1(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), $n(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !B) return ce(t), null;
        } else 2 * ee() - i.renderingStartTime > En && n !== 1073741824 && (t.flags |= 128, r = !0, $n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ee(), t.sibling = null, n = Q.current, D(Q, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return so(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ke & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, t.tag));
}
function c0(e, t) {
  switch (Fi(t), t.tag) {
    case 1:
      return we(t.type) && h1(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Sn(), $(Le), $(fe), Yi(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Gi(t), null;
    case 13:
      if ($(Q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(L(340));
        Vn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return $(Q), null;
    case 4:
      return Sn(), null;
    case 10:
      return Bi(t.type._context), null;
    case 22:
    case 23:
      return so(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Zr = !1, de = !1, d0 = typeof WeakSet == "function" ? WeakSet : Set, H = null;
function gn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    J(e, t, r);
  }
  else n.current = null;
}
function ui(e, t, n) {
  try {
    n();
  } catch (r) {
    J(e, t, r);
  }
}
var ys = !1;
function f0(e, t) {
  if (Wl = d1, e = Ta(), Ri(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, s = -1, u = -1, c = 0, f = 0, h = e, g = null;
        t: for (; ; ) {
          for (var v; h !== n || l !== 0 && h.nodeType !== 3 || (s = o + l), h !== i || r !== 0 && h.nodeType !== 3 || (u = o + r), h.nodeType === 3 && (o += h.nodeValue.length), (v = h.firstChild) !== null; )
            g = h, h = v;
          for (; ; ) {
            if (h === e) break t;
            if (g === n && ++c === l && (s = o), g === i && ++f === r && (u = o), (v = h.nextSibling) !== null) break;
            h = g, g = h.parentNode;
          }
          h = v;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Kl = { focusedElem: e, selectionRange: n }, d1 = !1, H = t; H !== null; ) if (t = H, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, H = e;
  else for (; H !== null; ) {
    t = H;
    try {
      var C = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (C !== null) {
            var x = C.memoizedProps, j = C.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? x : Ie(t.type, x), j);
            p.__reactInternalSnapshotBeforeUpdate = d;
          }
          break;
        case 3:
          var m = t.stateNode.containerInfo;
          m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(L(163));
      }
    } catch (y) {
      J(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, H = e;
      break;
    }
    H = t.return;
  }
  return C = ys, ys = !1, C;
}
function nr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && ui(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function D1(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ci(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function ju(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ju(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ge], delete t[hr], delete t[Yl], delete t[Q2], delete t[G2])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Nu(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Cs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Nu(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function di(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = m1));
  else if (r !== 4 && (e = e.child, e !== null)) for (di(e, t, n), e = e.sibling; e !== null; ) di(e, t, n), e = e.sibling;
}
function fi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (fi(e, t, n), e = e.sibling; e !== null; ) fi(e, t, n), e = e.sibling;
}
var oe = null, De = !1;
function pt(e, t, n) {
  for (n = n.child; n !== null; ) zu(e, t, n), n = n.sibling;
}
function zu(e, t, n) {
  if (Xe && typeof Xe.onCommitFiberUnmount == "function") try {
    Xe.onCommitFiberUnmount(N1, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || gn(n, t);
    case 6:
      var r = oe, l = De;
      oe = null, pt(e, t, n), oe = r, De = l, oe !== null && (De ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (De ? (e = oe, n = n.stateNode, e.nodeType === 8 ? fl(e.parentNode, n) : e.nodeType === 1 && fl(e, n), cr(e)) : fl(oe, n.stateNode));
      break;
    case 4:
      r = oe, l = De, oe = n.stateNode.containerInfo, De = !0, pt(e, t, n), oe = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && ui(n, t, o), l = l.next;
        } while (l !== r);
      }
      pt(e, t, n);
      break;
    case 1:
      if (!de && (gn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        J(n, t, s);
      }
      pt(e, t, n);
      break;
    case 21:
      pt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (de = (r = de) || n.memoizedState !== null, pt(e, t, n), de = r) : pt(e, t, n);
      break;
    default:
      pt(e, t, n);
  }
}
function xs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new d0()), t.forEach(function(r) {
      var l = L0.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function be(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, s = o;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            oe = s.stateNode, De = !1;
            break e;
          case 3:
            oe = s.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            oe = s.stateNode.containerInfo, De = !0;
            break e;
        }
        s = s.return;
      }
      if (oe === null) throw Error(L(160));
      zu(i, o, l), oe = null, De = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      J(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Pu(t, e), t = t.sibling;
}
function Pu(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (be(t, e), Ke(e), r & 4) {
        try {
          nr(3, e, e.return), D1(3, e);
        } catch (x) {
          J(e, e.return, x);
        }
        try {
          nr(5, e, e.return);
        } catch (x) {
          J(e, e.return, x);
        }
      }
      break;
    case 1:
      be(t, e), Ke(e), r & 512 && n !== null && gn(n, n.return);
      break;
    case 5:
      if (be(t, e), Ke(e), r & 512 && n !== null && gn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          or(l, "");
        } catch (x) {
          J(e, e.return, x);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && i.type === "radio" && i.name != null && na(l, i), Ol(s, o);
          var c = Ol(s, i);
          for (o = 0; o < u.length; o += 2) {
            var f = u[o], h = u[o + 1];
            f === "style" ? sa(l, h) : f === "dangerouslySetInnerHTML" ? ia(l, h) : f === "children" ? or(l, h) : Vi(l, f, h, c);
          }
          switch (s) {
            case "input":
              jl(l, i);
              break;
            case "textarea":
              ra(l, i);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var v = i.value;
              v != null ? yn(l, !!i.multiple, v, !1) : g !== !!i.multiple && (i.defaultValue != null ? yn(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : yn(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[hr] = i;
        } catch (x) {
          J(e, e.return, x);
        }
      }
      break;
    case 6:
      if (be(t, e), Ke(e), r & 4) {
        if (e.stateNode === null) throw Error(L(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (x) {
          J(e, e.return, x);
        }
      }
      break;
    case 3:
      if (be(t, e), Ke(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        cr(t.containerInfo);
      } catch (x) {
        J(e, e.return, x);
      }
      break;
    case 4:
      be(t, e), Ke(e);
      break;
    case 13:
      be(t, e), Ke(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (io = ee())), r & 4 && xs(e);
      break;
    case 22:
      if (f = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (c = de) || f, be(t, e), de = c) : be(t, e), Ke(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !f && e.mode & 1) for (H = e, f = e.child; f !== null; ) {
          for (h = H = f; H !== null; ) {
            switch (g = H, v = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                nr(4, g, g.return);
                break;
              case 1:
                gn(g, g.return);
                var C = g.stateNode;
                if (typeof C.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, C.props = t.memoizedProps, C.state = t.memoizedState, C.componentWillUnmount();
                  } catch (x) {
                    J(r, n, x);
                  }
                }
                break;
              case 5:
                gn(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  ws(h);
                  continue;
                }
            }
            v !== null ? (v.return = g, H = v) : ws(h);
          }
          f = f.sibling;
        }
        e: for (f = null, h = e; ; ) {
          if (h.tag === 5) {
            if (f === null) {
              f = h;
              try {
                l = h.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = h.stateNode, u = h.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = oa("display", o));
              } catch (x) {
                J(e, e.return, x);
              }
            }
          } else if (h.tag === 6) {
            if (f === null) try {
              h.stateNode.nodeValue = c ? "" : h.memoizedProps;
            } catch (x) {
              J(e, e.return, x);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            f === h && (f = null), h = h.return;
          }
          f === h && (f = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      be(t, e), Ke(e), r & 4 && xs(e);
      break;
    case 21:
      break;
    default:
      be(
        t,
        e
      ), Ke(e);
  }
}
function Ke(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Nu(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(L(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (or(l, ""), r.flags &= -33);
          var i = Cs(e);
          fi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = Cs(e);
          di(e, s, o);
          break;
        default:
          throw Error(L(161));
      }
    } catch (u) {
      J(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function p0(e, t, n) {
  H = e, Tu(e);
}
function Tu(e, t, n) {
  for (var r = (e.mode & 1) !== 0; H !== null; ) {
    var l = H, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Zr;
      if (!o) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || de;
        s = Zr;
        var c = de;
        if (Zr = o, (de = u) && !c) for (H = l; H !== null; ) o = H, u = o.child, o.tag === 22 && o.memoizedState !== null ? _s(l) : u !== null ? (u.return = o, H = u) : _s(l);
        for (; i !== null; ) H = i, Tu(i), i = i.sibling;
        H = l, Zr = s, de = c;
      }
      Ls(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, H = i) : Ls(e);
  }
}
function Ls(e) {
  for (; H !== null; ) {
    var t = H;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            de || D1(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !de) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Ie(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && is(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              is(t, o, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var f = c.memoizedState;
                if (f !== null) {
                  var h = f.dehydrated;
                  h !== null && cr(h);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(L(163));
        }
        de || t.flags & 512 && ci(t);
      } catch (g) {
        J(t, t.return, g);
      }
    }
    if (t === e) {
      H = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, H = n;
      break;
    }
    H = t.return;
  }
}
function ws(e) {
  for (; H !== null; ) {
    var t = H;
    if (t === e) {
      H = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, H = n;
      break;
    }
    H = t.return;
  }
}
function _s(e) {
  for (; H !== null; ) {
    var t = H;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            D1(4, t);
          } catch (u) {
            J(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              J(t, l, u);
            }
          }
          var i = t.return;
          try {
            ci(t);
          } catch (u) {
            J(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            ci(t);
          } catch (u) {
            J(t, o, u);
          }
      }
    } catch (u) {
      J(t, t.return, u);
    }
    if (t === e) {
      H = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, H = s;
      break;
    }
    H = t.return;
  }
}
var m0 = Math.ceil, H1 = ct.ReactCurrentDispatcher, ro = ct.ReactCurrentOwner, Pe = ct.ReactCurrentBatchConfig, T = 0, ie = null, te = null, se = 0, ke = 0, vn = zt(0), re = 0, Lr = null, Yt = 0, F1 = 0, lo = 0, rr = null, Ce = null, io = 0, En = 1 / 0, tt = null, V1 = !1, pi = null, Ht = null, Ur = !1, Ct = null, M1 = 0, lr = 0, mi = null, t1 = -1, n1 = 0;
function he() {
  return T & 6 ? ee() : t1 !== -1 ? t1 : t1 = ee();
}
function Vt(e) {
  return e.mode & 1 ? T & 2 && se !== 0 ? se & -se : X2.transition !== null ? (n1 === 0 && (n1 = Ca()), n1) : (e = I, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Va(e.type)), e) : 1;
}
function Ze(e, t, n, r) {
  if (50 < lr) throw lr = 0, mi = null, Error(L(185));
  Hr(e, n, r), (!(T & 2) || e !== ie) && (e === ie && (!(T & 2) && (F1 |= n), re === 4 && vt(e, se)), _e(e, r), n === 1 && T === 0 && !(t.mode & 1) && (En = ee() + 500, b1 && Pt()));
}
function _e(e, t) {
  var n = e.callbackNode;
  Xc(e, t);
  var r = c1(e, e === ie ? se : 0);
  if (r === 0) n !== null && No(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && No(n), t === 1) e.tag === 0 ? Y2(ks.bind(null, e)) : Ba(ks.bind(null, e)), W2(function() {
      !(T & 6) && Pt();
    }), n = null;
    else {
      switch (xa(r)) {
        case 1:
          n = ji;
          break;
        case 4:
          n = va;
          break;
        case 16:
          n = u1;
          break;
        case 536870912:
          n = ya;
          break;
        default:
          n = u1;
      }
      n = Zu(n, Ou.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ou(e, t) {
  if (t1 = -1, n1 = 0, T & 6) throw Error(L(327));
  var n = e.callbackNode;
  if (_n() && e.callbackNode !== n) return null;
  var r = c1(e, e === ie ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = S1(e, r);
  else {
    t = r;
    var l = T;
    T |= 2;
    var i = Iu();
    (ie !== e || se !== t) && (tt = null, En = ee() + 500, Bt(e, t));
    do
      try {
        v0();
        break;
      } catch (s) {
        bu(e, s);
      }
    while (!0);
    Ui(), H1.current = i, T = l, te !== null ? t = 0 : (ie = null, se = 0, t = re);
  }
  if (t !== 0) {
    if (t === 2 && (l = Fl(e), l !== 0 && (r = l, t = hi(e, l))), t === 1) throw n = Lr, Bt(e, 0), vt(e, r), _e(e, ee()), n;
    if (t === 6) vt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !h0(l) && (t = S1(e, r), t === 2 && (i = Fl(e), i !== 0 && (r = i, t = hi(e, i))), t === 1)) throw n = Lr, Bt(e, 0), vt(e, r), _e(e, ee()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          Dt(e, Ce, tt);
          break;
        case 3:
          if (vt(e, r), (r & 130023424) === r && (t = io + 500 - ee(), 10 < t)) {
            if (c1(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Gl(Dt.bind(null, e, Ce, tt), t);
            break;
          }
          Dt(e, Ce, tt);
          break;
        case 4:
          if (vt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - $e(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = ee() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * m0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Gl(Dt.bind(null, e, Ce, tt), r);
            break;
          }
          Dt(e, Ce, tt);
          break;
        case 5:
          Dt(e, Ce, tt);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return _e(e, ee()), e.callbackNode === n ? Ou.bind(null, e) : null;
}
function hi(e, t) {
  var n = rr;
  return e.current.memoizedState.isDehydrated && (Bt(e, t).flags |= 256), e = S1(e, t), e !== 2 && (t = Ce, Ce = n, t !== null && gi(t)), e;
}
function gi(e) {
  Ce === null ? Ce = e : Ce.push.apply(Ce, e);
}
function h0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ue(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function vt(e, t) {
  for (t &= ~lo, t &= ~F1, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - $e(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ks(e) {
  if (T & 6) throw Error(L(327));
  _n();
  var t = c1(e, 0);
  if (!(t & 1)) return _e(e, ee()), null;
  var n = S1(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Fl(e);
    r !== 0 && (t = r, n = hi(e, r));
  }
  if (n === 1) throw n = Lr, Bt(e, 0), vt(e, t), _e(e, ee()), n;
  if (n === 6) throw Error(L(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Dt(e, Ce, tt), _e(e, ee()), null;
}
function oo(e, t) {
  var n = T;
  T |= 1;
  try {
    return e(t);
  } finally {
    T = n, T === 0 && (En = ee() + 500, b1 && Pt());
  }
}
function Xt(e) {
  Ct !== null && Ct.tag === 0 && !(T & 6) && _n();
  var t = T;
  T |= 1;
  var n = Pe.transition, r = I;
  try {
    if (Pe.transition = null, I = 1, e) return e();
  } finally {
    I = r, Pe.transition = n, T = t, !(T & 6) && Pt();
  }
}
function so() {
  ke = vn.current, $(vn);
}
function Bt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, B2(n)), te !== null) for (n = te.return; n !== null; ) {
    var r = n;
    switch (Fi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && h1();
        break;
      case 3:
        Sn(), $(Le), $(fe), Yi();
        break;
      case 5:
        Gi(r);
        break;
      case 4:
        Sn();
        break;
      case 13:
        $(Q);
        break;
      case 19:
        $(Q);
        break;
      case 10:
        Bi(r.type._context);
        break;
      case 22:
      case 23:
        so();
    }
    n = n.return;
  }
  if (ie = e, te = e = Mt(e.current, null), se = ke = t, re = 0, Lr = null, lo = F1 = Yt = 0, Ce = rr = null, Zt !== null) {
    for (t = 0; t < Zt.length; t++) if (n = Zt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    Zt = null;
  }
  return e;
}
function bu(e, t) {
  do {
    var n = te;
    try {
      if (Ui(), Jr.current = k1, _1) {
        for (var r = Y.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        _1 = !1;
      }
      if (Gt = 0, le = ne = Y = null, tr = !1, yr = 0, ro.current = null, n === null || n.return === null) {
        re = 1, Lr = t, te = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, u = t;
        if (t = se, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, f = s, h = f.tag;
          if (!(f.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var g = f.alternate;
            g ? (f.updateQueue = g.updateQueue, f.memoizedState = g.memoizedState, f.lanes = g.lanes) : (f.updateQueue = null, f.memoizedState = null);
          }
          var v = ds(o);
          if (v !== null) {
            v.flags &= -257, fs(v, o, s, i, t), v.mode & 1 && cs(i, c, t), t = v, u = c;
            var C = t.updateQueue;
            if (C === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(u), t.updateQueue = x;
            } else C.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              cs(i, c, t), ao();
              break e;
            }
            u = Error(L(426));
          }
        } else if (B && s.mode & 1) {
          var j = ds(o);
          if (j !== null) {
            !(j.flags & 65536) && (j.flags |= 256), fs(j, o, s, i, t), $i(An(u, s));
            break e;
          }
        }
        i = u = An(u, s), re !== 4 && (re = 2), rr === null ? rr = [i] : rr.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = xu(i, u, t);
              ls(i, p);
              break e;
            case 1:
              s = u;
              var d = i.type, m = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (Ht === null || !Ht.has(m)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = Lu(i, s, t);
                ls(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Du(n);
    } catch (w) {
      t = w, te === n && n !== null && (te = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Iu() {
  var e = H1.current;
  return H1.current = k1, e === null ? k1 : e;
}
function ao() {
  (re === 0 || re === 3 || re === 2) && (re = 4), ie === null || !(Yt & 268435455) && !(F1 & 268435455) || vt(ie, se);
}
function S1(e, t) {
  var n = T;
  T |= 2;
  var r = Iu();
  (ie !== e || se !== t) && (tt = null, Bt(e, t));
  do
    try {
      g0();
      break;
    } catch (l) {
      bu(e, l);
    }
  while (!0);
  if (Ui(), T = n, H1.current = r, te !== null) throw Error(L(261));
  return ie = null, se = 0, re;
}
function g0() {
  for (; te !== null; ) Ru(te);
}
function v0() {
  for (; te !== null && !$c(); ) Ru(te);
}
function Ru(e) {
  var t = $u(e.alternate, e, ke);
  e.memoizedProps = e.pendingProps, t === null ? Du(e) : te = t, ro.current = null;
}
function Du(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = c0(n, t), n !== null) {
        n.flags &= 32767, te = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        re = 6, te = null;
        return;
      }
    } else if (n = u0(n, t, ke), n !== null) {
      te = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      te = t;
      return;
    }
    te = t = e;
  } while (t !== null);
  re === 0 && (re = 5);
}
function Dt(e, t, n) {
  var r = I, l = Pe.transition;
  try {
    Pe.transition = null, I = 1, y0(e, t, n, r);
  } finally {
    Pe.transition = l, I = r;
  }
  return null;
}
function y0(e, t, n, r) {
  do
    _n();
  while (Ct !== null);
  if (T & 6) throw Error(L(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(L(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Jc(e, i), e === ie && (te = ie = null, se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ur || (Ur = !0, Zu(u1, function() {
    return _n(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Pe.transition, Pe.transition = null;
    var o = I;
    I = 1;
    var s = T;
    T |= 4, ro.current = null, f0(e, n), Pu(n, e), I2(Kl), d1 = !!Wl, Kl = Wl = null, e.current = n, p0(n), Zc(), T = s, I = o, Pe.transition = i;
  } else e.current = n;
  if (Ur && (Ur = !1, Ct = e, M1 = l), i = e.pendingLanes, i === 0 && (Ht = null), Wc(n.stateNode), _e(e, ee()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (V1) throw V1 = !1, e = pi, pi = null, e;
  return M1 & 1 && e.tag !== 0 && _n(), i = e.pendingLanes, i & 1 ? e === mi ? lr++ : (lr = 0, mi = e) : lr = 0, Pt(), null;
}
function _n() {
  if (Ct !== null) {
    var e = xa(M1), t = Pe.transition, n = I;
    try {
      if (Pe.transition = null, I = 16 > e ? 16 : e, Ct === null) var r = !1;
      else {
        if (e = Ct, Ct = null, M1 = 0, T & 6) throw Error(L(331));
        var l = T;
        for (T |= 4, H = e.current; H !== null; ) {
          var i = H, o = i.child;
          if (H.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (H = c; H !== null; ) {
                  var f = H;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      nr(8, f, i);
                  }
                  var h = f.child;
                  if (h !== null) h.return = f, H = h;
                  else for (; H !== null; ) {
                    f = H;
                    var g = f.sibling, v = f.return;
                    if (ju(f), f === c) {
                      H = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = v, H = g;
                      break;
                    }
                    H = v;
                  }
                }
              }
              var C = i.alternate;
              if (C !== null) {
                var x = C.child;
                if (x !== null) {
                  C.child = null;
                  do {
                    var j = x.sibling;
                    x.sibling = null, x = j;
                  } while (x !== null);
                }
              }
              H = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, H = o;
          else e: for (; H !== null; ) {
            if (i = H, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                nr(9, i, i.return);
            }
            var p = i.sibling;
            if (p !== null) {
              p.return = i.return, H = p;
              break e;
            }
            H = i.return;
          }
        }
        var d = e.current;
        for (H = d; H !== null; ) {
          o = H;
          var m = o.child;
          if (o.subtreeFlags & 2064 && m !== null) m.return = o, H = m;
          else e: for (o = d; H !== null; ) {
            if (s = H, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  D1(9, s);
              }
            } catch (w) {
              J(s, s.return, w);
            }
            if (s === o) {
              H = null;
              break e;
            }
            var y = s.sibling;
            if (y !== null) {
              y.return = s.return, H = y;
              break e;
            }
            H = s.return;
          }
        }
        if (T = l, Pt(), Xe && typeof Xe.onPostCommitFiberRoot == "function") try {
          Xe.onPostCommitFiberRoot(N1, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      I = n, Pe.transition = t;
    }
  }
  return !1;
}
function Hs(e, t, n) {
  t = An(n, t), t = xu(e, t, 1), e = kt(e, t, 1), t = he(), e !== null && (Hr(e, 1, t), _e(e, t));
}
function J(e, t, n) {
  if (e.tag === 3) Hs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Hs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ht === null || !Ht.has(r))) {
        e = An(n, e), e = Lu(t, e, 1), t = kt(t, e, 1), e = he(), t !== null && (Hr(t, 1, e), _e(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function C0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, ie === e && (se & n) === n && (re === 4 || re === 3 && (se & 130023424) === se && 500 > ee() - io ? Bt(e, 0) : lo |= n), _e(e, t);
}
function Fu(e, t) {
  t === 0 && (e.mode & 1 ? (t = Pr, Pr <<= 1, !(Pr & 130023424) && (Pr = 4194304)) : t = 1);
  var n = he();
  e = at(e, t), e !== null && (Hr(e, t, n), _e(e, n));
}
function x0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Fu(e, n);
}
function L0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(L(314));
  }
  r !== null && r.delete(t), Fu(e, n);
}
var $u;
$u = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Le.current) xe = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return xe = !1, a0(e, t, n);
    xe = !!(e.flags & 131072);
  }
  else xe = !1, B && t.flags & 1048576 && Wa(t, y1, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      e1(e, t), e = t.pendingProps;
      var l = Hn(t, fe.current);
      wn(t, n), l = Ji(null, t, r, e, l, n);
      var i = qi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, we(r) ? (i = !0, g1(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ki(t), l.updater = R1, t.stateNode = l, l._reactInternals = t, ni(t, r, e, n), t = ii(null, t, r, !0, i, n)) : (t.tag = 0, B && i && Di(t), me(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (e1(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = _0(r), e = Ie(r, e), l) {
          case 0:
            t = li(null, t, r, e, n);
            break e;
          case 1:
            t = hs(null, t, r, e, n);
            break e;
          case 11:
            t = ps(null, t, r, e, n);
            break e;
          case 14:
            t = ms(null, t, r, Ie(r.type, e), n);
            break e;
        }
        throw Error(L(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), li(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), hs(e, t, r, l, n);
    case 3:
      e: {
        if (Hu(t), e === null) throw Error(L(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Ja(e, t), L1(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = An(Error(L(423)), t), t = gs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = An(Error(L(424)), t), t = gs(e, t, r, n, l);
          break e;
        } else for (He = _t(t.stateNode.containerInfo.firstChild), Ve = t, B = !0, Fe = null, n = Ya(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Vn(), r === l) {
            t = ut(e, t, n);
            break e;
          }
          me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return qa(t), e === null && ql(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ql(r, l) ? o = null : i !== null && Ql(r, i) && (t.flags |= 32), ku(e, t), me(e, t, o, n), t.child;
    case 6:
      return e === null && ql(t), null;
    case 13:
      return Vu(e, t, n);
    case 4:
      return Qi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Mn(t, null, r, n) : me(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), ps(e, t, r, l, n);
    case 7:
      return me(e, t, t.pendingProps, n), t.child;
    case 8:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, D(C1, r._currentValue), r._currentValue = o, i !== null) if (Ue(i.value, o)) {
          if (i.children === l.children && !Le.current) {
            t = ut(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var s = i.dependencies;
          if (s !== null) {
            o = i.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = it(-1, n & -n), u.tag = 2;
                  var c = i.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var f = c.pending;
                    f === null ? u.next = u : (u.next = f.next, f.next = u), c.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), ei(
                  i.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(L(341));
            o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), ei(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        me(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, wn(t, n), l = Te(l), r = r(l), t.flags |= 1, me(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Ie(r, t.pendingProps), l = Ie(r.type, l), ms(e, t, r, l, n);
    case 15:
      return wu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), e1(e, t), t.tag = 1, we(r) ? (e = !0, g1(t)) : e = !1, wn(t, n), Cu(t, r, l), ni(t, r, l, n), ii(null, t, r, !0, e, n);
    case 19:
      return Mu(e, t, n);
    case 22:
      return _u(e, t, n);
  }
  throw Error(L(156, t.tag));
};
function Zu(e, t) {
  return ga(e, t);
}
function w0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ze(e, t, n, r) {
  return new w0(e, t, n, r);
}
function uo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function _0(e) {
  if (typeof e == "function") return uo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Si) return 11;
    if (e === Ai) return 14;
  }
  return 2;
}
function Mt(e, t) {
  var n = e.alternate;
  return n === null ? (n = ze(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function r1(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") uo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case sn:
      return Wt(n.children, l, i, t);
    case Mi:
      o = 8, l |= 8;
      break;
    case Vl:
      return e = ze(12, n, t, l | 2), e.elementType = Vl, e.lanes = i, e;
    case Ml:
      return e = ze(13, n, t, l), e.elementType = Ml, e.lanes = i, e;
    case Sl:
      return e = ze(19, n, t, l), e.elementType = Sl, e.lanes = i, e;
    case qs:
      return $1(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Xs:
          o = 10;
          break e;
        case Js:
          o = 9;
          break e;
        case Si:
          o = 11;
          break e;
        case Ai:
          o = 14;
          break e;
        case mt:
          o = 16, r = null;
          break e;
      }
      throw Error(L(130, e == null ? e : typeof e, ""));
  }
  return t = ze(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Wt(e, t, n, r) {
  return e = ze(7, e, r, t), e.lanes = n, e;
}
function $1(e, t, n, r) {
  return e = ze(22, e, r, t), e.elementType = qs, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function xl(e, t, n) {
  return e = ze(6, e, null, t), e.lanes = n, e;
}
function Ll(e, t, n) {
  return t = ze(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function k0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = tl(0), this.expirationTimes = tl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = tl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function co(e, t, n, r, l, i, o, s, u) {
  return e = new k0(e, t, n, s, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = ze(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ki(i), e;
}
function H0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: on, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Uu(e) {
  if (!e) return At;
  e = e._reactInternals;
  e: {
    if (qt(e) !== e || e.tag !== 1) throw Error(L(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (we(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(L(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (we(n)) return Ua(e, n, t);
  }
  return t;
}
function Bu(e, t, n, r, l, i, o, s, u) {
  return e = co(n, r, !0, e, l, i, o, s, u), e.context = Uu(null), n = e.current, r = he(), l = Vt(n), i = it(r, l), i.callback = t ?? null, kt(n, i, l), e.current.lanes = l, Hr(e, l, r), _e(e, r), e;
}
function Z1(e, t, n, r) {
  var l = t.current, i = he(), o = Vt(l);
  return n = Uu(n), t.context === null ? t.context = n : t.pendingContext = n, t = it(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = kt(l, t, o), e !== null && (Ze(e, l, o, i), Xr(e, l, o)), o;
}
function A1(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Vs(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function fo(e, t) {
  Vs(e, t), (e = e.alternate) && Vs(e, t);
}
function V0() {
  return null;
}
var Wu = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function po(e) {
  this._internalRoot = e;
}
U1.prototype.render = po.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(L(409));
  Z1(e, t, null, null);
};
U1.prototype.unmount = po.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Xt(function() {
      Z1(null, e, null, null);
    }), t[st] = null;
  }
};
function U1(e) {
  this._internalRoot = e;
}
U1.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = _a();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < gt.length && t !== 0 && t < gt[n].priority; n++) ;
    gt.splice(n, 0, e), n === 0 && Ha(e);
  }
};
function mo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function B1(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ms() {
}
function M0(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = A1(o);
        i.call(c);
      };
    }
    var o = Bu(t, r, e, 0, null, !1, !1, "", Ms);
    return e._reactRootContainer = o, e[st] = o.current, pr(e.nodeType === 8 ? e.parentNode : e), Xt(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = A1(u);
      s.call(c);
    };
  }
  var u = co(e, 0, !1, null, null, !1, !1, "", Ms);
  return e._reactRootContainer = u, e[st] = u.current, pr(e.nodeType === 8 ? e.parentNode : e), Xt(function() {
    Z1(t, u, n, r);
  }), u;
}
function W1(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = A1(o);
        s.call(u);
      };
    }
    Z1(t, o, e, l);
  } else o = M0(n, t, e, l, r);
  return A1(o);
}
La = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Kn(t.pendingLanes);
        n !== 0 && (Ni(t, n | 1), _e(t, ee()), !(T & 6) && (En = ee() + 500, Pt()));
      }
      break;
    case 13:
      Xt(function() {
        var r = at(e, 1);
        if (r !== null) {
          var l = he();
          Ze(r, e, 1, l);
        }
      }), fo(e, 1);
  }
};
zi = function(e) {
  if (e.tag === 13) {
    var t = at(e, 134217728);
    if (t !== null) {
      var n = he();
      Ze(t, e, 134217728, n);
    }
    fo(e, 134217728);
  }
};
wa = function(e) {
  if (e.tag === 13) {
    var t = Vt(e), n = at(e, t);
    if (n !== null) {
      var r = he();
      Ze(n, e, t, r);
    }
    fo(e, t);
  }
};
_a = function() {
  return I;
};
ka = function(e, t) {
  var n = I;
  try {
    return I = e, t();
  } finally {
    I = n;
  }
};
Il = function(e, t, n) {
  switch (t) {
    case "input":
      if (jl(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = O1(r);
            if (!l) throw Error(L(90));
            ta(r), jl(r, l);
          }
        }
      }
      break;
    case "textarea":
      ra(e, n);
      break;
    case "select":
      t = n.value, t != null && yn(e, !!n.multiple, t, !1);
  }
};
ca = oo;
da = Xt;
var S0 = { usingClientEntryPoint: !1, Events: [Mr, dn, O1, aa, ua, oo] }, Zn = { findFiberByHostInstance: $t, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, A0 = { bundleType: Zn.bundleType, version: Zn.version, rendererPackageName: Zn.rendererPackageName, rendererConfig: Zn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ct.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = ma(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Zn.findFiberByHostInstance || V0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Br = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Br.isDisabled && Br.supportsFiber) try {
    N1 = Br.inject(A0), Xe = Br;
  } catch {
  }
}
Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = S0;
Se.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!mo(t)) throw Error(L(200));
  return H0(e, t, null, n);
};
Se.createRoot = function(e, t) {
  if (!mo(e)) throw Error(L(299));
  var n = !1, r = "", l = Wu;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = co(e, 1, !1, null, null, n, !1, r, l), e[st] = t.current, pr(e.nodeType === 8 ? e.parentNode : e), new po(t);
};
Se.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(L(188)) : (e = Object.keys(e).join(","), Error(L(268, e)));
  return e = ma(t), e = e === null ? null : e.stateNode, e;
};
Se.flushSync = function(e) {
  return Xt(e);
};
Se.hydrate = function(e, t, n) {
  if (!B1(t)) throw Error(L(200));
  return W1(null, e, t, !0, n);
};
Se.hydrateRoot = function(e, t, n) {
  if (!mo(e)) throw Error(L(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = Wu;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Bu(t, null, e, 1, n ?? null, l, !1, i, o), e[st] = t.current, pr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new U1(t);
};
Se.render = function(e, t, n) {
  if (!B1(t)) throw Error(L(200));
  return W1(null, e, t, !1, n);
};
Se.unmountComponentAtNode = function(e) {
  if (!B1(e)) throw Error(L(40));
  return e._reactRootContainer ? (Xt(function() {
    W1(null, null, e, !1, function() {
      e._reactRootContainer = null, e[st] = null;
    });
  }), !0) : !1;
};
Se.unstable_batchedUpdates = oo;
Se.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!B1(n)) throw Error(L(200));
  if (e == null || e._reactInternals === void 0) throw Error(L(38));
  return W1(e, t, n, !1, r);
};
Se.version = "18.3.1-next-f1338f8080-20240426";
function Ku() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ku);
    } catch (e) {
      console.error(e);
    }
}
Ku(), Ks.exports = Se;
var E0 = Ks.exports, Qu, Ss = E0;
Qu = Ss.createRoot, Ss.hydrateRoot;
const Gn = {
  SET_SPEED: 1,
  OSCILLATE: 2,
  DIRECTION: 4,
  PRESET_MODE: 8
}, vi = {
  SET_POSITION: 4,
  SET_TILT_POSITION: 128
}, Re = {
  PAUSE: 1,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  TURN_ON: 128,
  TURN_OFF: 256,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384
}, wl = {
  TARGET_TEMPERATURE: 1,
  TARGET_TEMPERATURE_RANGE: 2,
  FAN_MODE: 8
};
function q(e, t) {
  return ((e.attributes.supported_features || 0) & t) !== 0;
}
const j0 = [
  "light",
  "switch",
  "fan",
  "cover",
  "media_player",
  "climate",
  "lock",
  "input_boolean",
  "humidifier",
  "valve",
  "water_heater",
  "siren",
  "automation",
  "script"
];
function Be(e) {
  return e.split(".")[0];
}
const N0 = [
  { value: "light", label: "Light" },
  { value: "fan", label: "Fan" },
  { value: "outlet", label: "Outlet" },
  { value: "switch", label: "Switch" },
  { value: "other", label: "Other" }
];
function z0(e) {
  const t = Be(e);
  return t === "switch" || t === "input_boolean";
}
function yi(e) {
  const t = Be(e.entity_id), n = e.attributes.device_class;
  switch (t) {
    case "light":
      return "light";
    case "fan":
      return "fan";
    case "cover":
      return "shade";
    case "media_player":
      return "media";
    case "climate":
    case "water_heater":
    case "humidifier":
      return "climate";
    case "lock":
      return "lock";
    case "switch":
      return n === "outlet" ? "outlet" : "switch";
    case "input_boolean":
      return "switch";
    default:
      return "other";
  }
}
function Gu(e, t) {
  const n = Be(e.entity_id), r = e.attributes.device_class;
  if (n === "media_player")
    return r === "speaker" ? "speaker" : r === "receiver" ? "volume-high" : "television";
  if (n === "cover")
    switch (r) {
      case "curtain":
        return "curtains";
      case "shutter":
      case "awning":
        return "window-shutter";
      case "garage":
        return "garage";
      case "door":
        return "door";
      case "window":
        return "window-open";
      default:
        return "blinds-horizontal";
    }
  return n === "light" ? K1(e).brightness ? "lightbulb" : "ceiling-light" : n === "climate" ? r === "humidifier" ? "water-percent" : "thermostat" : n === "humidifier" ? "water-percent" : n === "water_heater" || n === "valve" ? "water" : P0[t];
}
const P0 = {
  light: "lightbulb",
  fan: "fan",
  shade: "blinds-horizontal",
  media: "television",
  outlet: "power-socket-us",
  switch: "toggle-switch-outline",
  climate: "thermostat",
  lock: "lock",
  other: "shape-outline"
}, _l = { BRIGHTNESS: 1, COLOR_TEMP: 2, COLOR: 16 };
function K1(e) {
  const n = (e.attributes.supported_color_modes || []).filter((o) => o !== "unknown"), r = e.attributes.supported_features || 0, l = n.length > 0, i = (r & _l.BRIGHTNESS) !== 0 || e.attributes.brightness != null;
  return {
    brightness: l ? n.some((o) => o !== "onoff") : i,
    colorTemp: l ? n.includes("color_temp") : (r & _l.COLOR_TEMP) !== 0 || e.attributes.color_temp_kelvin != null,
    color: l ? n.some((o) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(o)) : (r & _l.COLOR) !== 0 || e.attributes.hs_color != null,
    minKelvin: e.attributes.min_color_temp_kelvin ?? 2e3,
    maxKelvin: e.attributes.max_color_temp_kelvin ?? 6535
  };
}
const Yu = (e) => e == null ? 100 : Math.max(1, Math.round(e / 255 * 100)), T0 = (e) => Math.max(1, Math.min(255, Math.round(e / 100 * 255)));
function kl(e) {
  const t = Be(e.entity_id), n = e.attributes, r = e.state, l = r === "on" || r === "open" || r === "playing";
  switch (t) {
    case "light": {
      if (!l) return { state: "off" };
      const i = K1(e), o = { state: "on" };
      return i.brightness && n.brightness != null && (o.brightness = n.brightness), n.color_mode === "color_temp" && n.color_temp_kelvin != null ? o.color_temp_kelvin = n.color_temp_kelvin : i.color && n.hs_color && (o.hs_color = [
        Math.round(n.hs_color[0]),
        Math.round(n.hs_color[1])
      ]), o;
    }
    case "fan": {
      if (r !== "on") return { state: "off" };
      const i = { state: "on" };
      return n.percentage != null && (i.percentage = n.percentage), n.preset_mode != null && (i.preset_mode = n.preset_mode), n.oscillating != null && (i.oscillating = n.oscillating), n.direction != null && (i.direction = n.direction), i;
    }
    case "cover": {
      const i = { state: r === "closed" ? "closed" : "open" };
      return n.current_position != null && (i.current_position = n.current_position, i.state = n.current_position > 0 ? "open" : "closed"), n.current_tilt_position != null && (i.current_tilt_position = n.current_tilt_position), i;
    }
    case "media_player": {
      const i = {
        state: ["playing", "paused", "idle", "on", "off"].includes(r) ? r : "off"
      };
      return n.volume_level != null && (i.volume_level = n.volume_level), n.is_volume_muted != null && (i.is_volume_muted = n.is_volume_muted), n.source != null && (i.source = n.source), i;
    }
    case "climate": {
      const i = { state: r };
      return n.temperature != null && (i.temperature = n.temperature), n.target_temp_high != null && (i.target_temp_high = n.target_temp_high), n.target_temp_low != null && (i.target_temp_low = n.target_temp_low), n.fan_mode != null && (i.fan_mode = n.fan_mode), n.humidity != null && (i.humidity = n.humidity), i;
    }
    case "humidifier": {
      const i = { state: r === "on" ? "on" : "off" };
      return n.humidity != null && (i.humidity = n.humidity), n.mode != null && (i.mode = n.mode), i;
    }
    case "water_heater": {
      const i = { state: r };
      return n.temperature != null && (i.temperature = n.temperature), i;
    }
    case "valve": {
      const i = { state: r === "closed" ? "closed" : "open" };
      return n.current_position != null && (i.current_position = n.current_position), i;
    }
    case "lock":
      return { state: r === "unlocked" ? "unlocked" : "locked" };
    default:
      return { state: r === "on" ? "on" : "off" };
  }
}
function As(e, t) {
  const n = Be(e.entity_id), r = (l, i) => ({
    ...t,
    state: t.state === l ? i : l
  });
  switch (n) {
    case "light":
    case "fan":
    case "switch":
    case "input_boolean":
    case "humidifier":
    case "siren":
    case "automation":
    case "script":
      return r("on", "off");
    case "lock":
      return r("unlocked", "locked");
    case "cover":
    case "valve": {
      const l = t.state !== "open", i = { ...t, state: l ? "open" : "closed" };
      return t.current_position != null && (i.current_position = l ? 100 : 0), l && t.current_tilt_position === 0 && delete i.current_tilt_position, i;
    }
    case "media_player":
      return !q(e, Re.TURN_OFF) && !q(e, Re.TURN_ON) ? null : t.state === "off" ? { ...t, state: q(e, Re.PLAY) ? "playing" : "on" } : { ...t, state: "off" };
    case "climate":
    case "water_heater": {
      const l = e.attributes.hvac_modes ?? e.attributes.operation_list ?? [];
      if (!l.includes("off")) return null;
      if (t.state === "off") {
        const i = l.find((o) => o !== "off");
        return i ? { ...t, state: i } : null;
      }
      return { ...t, state: "off" };
    }
    default:
      return null;
  }
}
function O0(e, t) {
  const n = Be(e);
  return n === "cover" || n === "valve" ? t.state === "open" : n === "lock" ? t.state === "unlocked" : n === "media_player" || n === "climate" || n === "water_heater" ? t.state !== "off" : t.state === "on";
}
function Es(e, t) {
  const n = Be(e);
  return n === "lock" ? t ? "Lock" : "Unlock" : n === "cover" || n === "valve" ? t ? "Close" : "Open" : t ? "Turn off" : "Turn on";
}
function js(e) {
  switch (Be(e.entity_id)) {
    case "light":
      return K1(e).brightness ? { state: "on", brightness: 255 } : { state: "on" };
    case "fan":
      return q(e, Gn.SET_SPEED) ? { state: "on", percentage: 100 } : { state: "on" };
    case "cover":
      return q(e, vi.SET_POSITION) ? { state: "open", current_position: 100 } : { state: "open" };
    case "media_player":
      return { state: "playing" };
    case "climate":
      return { state: (e.attributes.hvac_modes || ["heat"])[0] };
    case "lock":
      return { state: "locked" };
    default:
      return { state: "on" };
  }
}
function b0(e) {
  if (typeof e == "string") return { state: e };
  const { state: t, ...n } = e;
  return { state: typeof t == "string" ? t : "on", ...n };
}
function I0(e, t) {
  const n = Be(e);
  let r = { ...t };
  const l = ["off", "closed", "locked", "idle", "unavailable"].includes(t.state);
  n === "light" && t.state !== "on" && (r = { state: t.state }), n === "fan" && t.state !== "on" && (r = { state: t.state }), n === "media_player" && (t.state === "off" || t.state === "idle") && (r = { state: t.state }), n === "humidifier" && t.state !== "on" && (r = { state: t.state }), (n === "switch" || n === "input_boolean" || n === "lock") && l && (r = { state: t.state });
  for (const i of Object.keys(r))
    (r[i] === void 0 || r[i] === null) && delete r[i];
  return r;
}
const Un = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/_/g, " ");
function R0(e, t, n) {
  const r = Be(e), l = [];
  switch (r) {
    case "light":
      return t.state !== "on" ? "Off" : (l.push(t.brightness != null ? `${Yu(t.brightness)}%` : "On"), t.color_temp_kelvin ? l.push(`${t.color_temp_kelvin}K`) : t.hs_color && l.push("Color"), l.join(" · "));
    case "fan": {
      if (t.state !== "on") return "Off";
      const i = n?.attributes.percentage_step;
      return t.percentage != null && i && i > 1 ? l.push(`Speed ${Math.round(t.percentage / i)} of ${Math.round(100 / i)}`) : l.push(t.percentage != null ? `${Math.round(t.percentage)}%` : "On"), t.preset_mode && l.push(Un(String(t.preset_mode))), t.oscillating && l.push("Oscillating"), l.join(" · ");
    }
    case "cover":
    case "valve":
      return t.current_position != null ? t.current_position === 0 ? "Closed" : t.current_position === 100 ? "Open" : `Open ${Math.round(t.current_position)}%` : t.state === "closed" ? "Closed" : "Open";
    case "media_player":
      return l.push(Un(t.state)), t.volume_level != null && t.state !== "off" && l.push(`Vol ${Math.round(t.volume_level * 100)}%`), t.source && l.push(String(t.source)), l.join(" · ");
    case "climate":
      return l.push(Un(t.state)), t.temperature != null ? l.push(`${t.temperature}°`) : t.target_temp_low != null && t.target_temp_high != null && l.push(`${t.target_temp_low}–${t.target_temp_high}°`), l.join(" · ");
    case "humidifier":
      return t.state !== "on" ? "Off" : t.humidity != null ? `On · ${t.humidity}%` : "On";
    case "water_heater":
      return l.push(Un(t.state)), t.temperature != null && l.push(`${t.temperature}°`), l.join(" · ");
    default:
      return Un(t.state);
  }
}
const D0 = new Set(j0), F0 = /^[\s\-–—_:|·.,]+$/, Ns = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, "");
function $0(e, t, n) {
  const r = [], l = (c, f) => {
    if (!c) return;
    const h = [...c.split(/\s+/), ...f ? [f] : []].map(Ns).filter(Boolean);
    h.length && r.push(h);
  };
  if (l(n, "floor"), l(n), l(t), !r.length) return e;
  const i = e.split(/\s+/);
  let o = 0;
  const s = (c, f) => {
    let h = c;
    for (const g of f) {
      for (; h < i.length && F0.test(i[h]); ) h++;
      if (h >= i.length || Ns(i[h]) !== g) return null;
      h++;
    }
    return h;
  };
  for (; ; ) {
    let c = null;
    for (const f of r) {
      const h = s(o, f);
      if (h !== null) {
        c = h;
        break;
      }
    }
    if (c === null) break;
    o = c;
  }
  const u = i.slice(o).join(" ").replace(/^[\s\-–—_:|·.,]+/, "").trim();
  return u.length >= 2 ? u : e;
}
function Z0(e, t, n) {
  const r = new Map(t.entities.map((u) => [u.entity_id, u])), l = new Map(t.devices.map((u) => [u.id, u])), i = new Map(t.areas.map((u) => [u.area_id, u])), o = new Map(t.floors.map((u) => [u.floor_id, u.name])), s = [];
  for (const u of e) {
    const c = Be(u.entity_id);
    if (!D0.has(c)) continue;
    const f = r.get(u.entity_id);
    if (f && (f.disabled_by || f.hidden_by || f.entity_category))
      continue;
    let h = f?.area_id ?? null;
    !h && f?.device_id && (h = l.get(f.device_id)?.area_id ?? null);
    const g = f?.name || u.attributes.friendly_name || f?.original_name || u.entity_id, v = h ? i.get(h) : void 0, C = v?.floor_id ? o.get(v.floor_id) ?? null : null;
    s.push({
      entityId: u.entity_id,
      fullName: g,
      name: $0(g, v?.name ?? null, C),
      domain: c,
      kind: n[u.entity_id] ?? yi(u),
      areaId: h,
      entity: u,
      available: u.state !== "unavailable" && u.state !== "unknown"
    });
  }
  return s;
}
const U0 = new Intl.Collator(void 0, { numeric: !0, sensitivity: "base" });
function ho(e, t) {
  const n = new Map(t.areas.map((c) => [c.area_id, c])), r = new Map(t.floors.map((c) => [c.floor_id, c])), l = new Map(t.areas.map((c, f) => [c.area_id, f])), i = new Map(t.floors.map((c, f) => [c.floor_id, f])), o = /* @__PURE__ */ new Map();
  for (const c of e) {
    const f = c.areaId && n.has(c.areaId) ? c.areaId : null, h = o.get(f);
    h ? h.push(c) : o.set(f, [c]);
  }
  const s = /* @__PURE__ */ new Map();
  for (const [c, f] of o) {
    const h = c ? n.get(c) : void 0, g = h?.floor_id && r.has(h.floor_id) ? h.floor_id : null, v = {
      areaId: c,
      name: h?.name ?? "No Room",
      icon: h?.icon ?? null,
      accessories: f.sort((x, j) => U0.compare(x.name, j.name))
    }, C = s.get(g);
    C ? C.push(v) : s.set(g, [v]);
  }
  const u = [];
  for (const [c, f] of s) {
    const h = c ? r.get(c) : void 0;
    u.push({
      floorId: c,
      name: h?.name ?? "Unassigned",
      icon: h?.icon ?? null,
      order: c ? i.get(c) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER,
      areas: f.sort((g, v) => g.areaId === null ? 1 : v.areaId === null ? -1 : (l.get(g.areaId) ?? 0) - (l.get(v.areaId) ?? 0))
    });
  }
  return u.sort((c, f) => c.floorId === null ? 1 : f.floorId === null ? -1 : c.order - f.order);
}
function Xu(e) {
  return e.map((t) => ({ ...t, areas: t.areas.filter((n) => n.accessories.length) })).filter((t) => t.areas.length);
}
function Ci(e) {
  const t = Math.max(1e3, Math.min(4e4, e)) / 100, n = (o) => Math.max(0, Math.min(255, Math.round(o)));
  let r, l, i;
  return t <= 66 ? (r = 255, l = 99.4708025861 * Math.log(t) - 161.1195681661) : (r = 329.698727446 * Math.pow(t - 60, -0.1332047592), l = 288.1221695283 * Math.pow(t - 60, -0.0755148492)), t >= 66 ? i = 255 : t <= 19 ? i = 0 : i = 138.5177312231 * Math.log(t - 10) - 305.0447927307, [n(r), n(l), n(i)];
}
function l1(e, t) {
  const n = Math.max(0, Math.min(100, t)) / 100, r = (e % 360 + 360) % 360, l = n, i = l * (1 - Math.abs(r / 60 % 2 - 1)), o = 1 - l;
  let s;
  return r < 60 ? s = [l, i, 0] : r < 120 ? s = [i, l, 0] : r < 180 ? s = [0, l, i] : r < 240 ? s = [0, i, l] : r < 300 ? s = [i, 0, l] : s = [l, 0, i], s.map((u) => Math.round((u + o) * 255));
}
const Ft = ([e, t, n]) => `rgb(${e}, ${t}, ${n})`;
function B0(e) {
  return e.state !== "on" ? null : e.hs_color ? Ft(l1(e.hs_color[0], e.hs_color[1])) : e.color_temp_kelvin ? Ft(Ci(e.color_temp_kelvin)) : null;
}
var W0 = "M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z", K0 = "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z", Q0 = "M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z", G0 = "M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z", Y0 = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z", X0 = "M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z", J0 = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", q0 = "M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z", ed = "M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z", td = "M13,2V10H21A8,8 0 0,0 13,2M19.32,15.89C20.37,14.54 21,12.84 21,11H6.44L5.5,9H2V11H4.22C4.22,11 6.11,15.07 6.34,15.42C5.24,16 4.5,17.17 4.5,18.5A3.5,3.5 0 0,0 8,22C9.76,22 11.22,20.7 11.46,19H13.54C13.78,20.7 15.24,22 17,22A3.5,3.5 0 0,0 20.5,18.5C20.5,17.46 20.04,16.53 19.32,15.89M8,20A1.5,1.5 0 0,1 6.5,18.5A1.5,1.5 0 0,1 8,17A1.5,1.5 0 0,1 9.5,18.5A1.5,1.5 0 0,1 8,20M17,20A1.5,1.5 0 0,1 15.5,18.5A1.5,1.5 0 0,1 17,17A1.5,1.5 0 0,1 18.5,18.5A1.5,1.5 0 0,1 17,20Z", nd = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", rd = "M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z", ld = "M6 5C5.47 5 5 5.21 4.59 5.6S4 6.45 4 7V10C3.45 10 3 10.19 2.6 10.59S2 11.47 2 12V17H3.33L4 19H5L5.67 17H18.33L19 19H20L20.67 17H22V12C22 11.47 21.79 11 21.4 10.59C21 10.19 20.55 10 20 10V7C20 6.45 19.81 6 19.41 5.6S18.53 5 18 5M6 7H11V10H6M13 7H18V10H13Z", id = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21", od = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z", sd = "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z", ad = "M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z", ud = "M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z", cd = "M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z", dd = "M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z", fd = "M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z", pd = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z", md = "M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z", hd = "M12.5,2C10.84,2 9.5,5.34 9.5,7A3,3 0 0,0 12.5,10A3,3 0 0,0 15.5,7C15.5,5.34 14.16,2 12.5,2M12.5,6.5A1,1 0 0,1 13.5,7.5A1,1 0 0,1 12.5,8.5A1,1 0 0,1 11.5,7.5A1,1 0 0,1 12.5,6.5M10,11A1,1 0 0,0 9,12V20H7A1,1 0 0,1 6,19V18A1,1 0 0,0 5,17A1,1 0 0,0 4,18V19A3,3 0 0,0 7,22H19A1,1 0 0,0 20,21A1,1 0 0,0 19,20H16V12A1,1 0 0,0 15,11H10Z", gd = "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z", vd = "M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z", yd = "M6.03 12.03L8.03 15.5L5.5 18.68L2 12.62L6.03 12.03M17 18V15.29C17.88 14.9 18.5 14.03 18.5 13C18.5 12.43 18.3 11.9 17.97 11.5L19.94 10.35C20.95 9.76 21.3 8.47 20.71 7.46L19.33 5.06C18.74 4.05 17.45 3.7 16.44 4.28L8.31 9C7.36 9.53 7.03 10.75 7.58 11.71L9.08 14.31C9.63 15.26 10.86 15.59 11.81 15.04L13.69 13.96C13.94 14.55 14.41 15.03 15 15.29V18C15 19.1 15.9 20 17 20H22V18H17Z", Cd = "M8,9H11V4H13V9H16L20,17H4L8,9M14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18H14Z", xd = "M15 13.1C15 14.76 13.66 16.1 12 16.1S9 14.76 9 13.1 10.34 10.1 12 10.1 15 11.44 15 13.1M9 2V3C9 4.11 9.9 5 11 5V9.1C11.32 9.04 11.66 9 12 9S12.68 9.04 13 9.1V5C14.11 5 15 4.11 15 3V2H9M4 11.1C2.34 11.1 1 12.44 1 14.1S2.34 17.1 4 17.1 7 15.76 7 14.1 5.66 11.1 4 11.1M20 11.1C18.34 11.1 17 12.44 17 14.1S18.34 17.1 20 17.1 23 15.76 23 14.1 21.66 11.1 20 11.1M20 18.1C19.32 18.1 18.67 17.96 18.08 17.71C17.6 17.95 17.07 18.1 16.5 18.1C15.39 18.1 14.41 17.57 13.77 16.77C13.22 17 12.63 17.1 12 17.1S10.78 17 10.23 16.77C9.59 17.57 8.61 18.1 7.5 18.1C6.93 18.1 6.4 17.95 5.92 17.71C5.33 17.96 4.68 18.1 4 18.1C3.73 18.1 3.46 18.06 3.2 18C4.21 19.29 5.76 20.1 7.5 20.1C8.83 20.1 10.05 19.63 11 18.84V21.1C11 21.65 11.45 22.1 12 22.1C12.55 22.1 13 21.65 13 21.1V18.84C13.95 19.63 15.17 20.1 16.5 20.1C18.24 20.1 19.79 19.29 20.8 18C20.54 18.06 20.27 18.1 20 18.1Z", Ld = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z", wd = "M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z", _d = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z", kd = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Hd = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z", Vd = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z", Md = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Sd = "M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z", Ad = "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z", Ed = "M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z", jd = "M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74", Nd = "M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z", zd = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", Pd = "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z", Td = "M10.85,2L9.18,4.5L10.32,5.25L7.14,10C7.1,10 7.05,10 7,10A2,2 0 0,0 5,12C5,12.94 5.66,13.75 6.58,13.95L10.62,20H7V22H17V20H13L8.53,13.28C8.83,12.92 9,12.47 9,12C9,11.7 8.93,11.4 8.8,11.13L12,6.37C11.78,8.05 12.75,9.89 14.45,11L18.89,4.37C17.2,3.24 15.12,3.04 13.65,3.87L10.85,2M18.33,7L16.67,9.5C17.35,9.95 18.29,9.77 18.75,9.08C19.21,8.39 19,7.46 18.33,7Z", Od = "M22,18H17A1,1 0 0,1 16,17V7A1,1 0 0,1 17,6H22A1,1 0 0,1 23,7V17A1,1 0 0,1 22,18M22,8H17V9H22V8M22,10H17V11H22V10M9,15V17H10V18H5V17H6V15H2A1,1 0 0,1 1,14V7A1,1 0 0,1 2,6H13A1,1 0 0,1 14,7V14A1,1 0 0,1 13,15H9M12,8H3V13H12V8Z", bd = "M18,4C16.29,4 15.25,4.33 14.65,4.61C13.88,4.23 13,4 12,4C11,4 10.12,4.23 9.35,4.61C8.75,4.33 7.71,4 6,4C3,4 1,12 1,14C1,14.83 2.32,15.59 4.14,15.9C4.78,18.14 7.8,19.85 11.5,20V15.72C10.91,15.35 10,14.68 10,14C10,13 12,13 12,13C12,13 14,13 14,14C14,14.68 13.09,15.35 12.5,15.72V20C16.2,19.85 19.22,18.14 19.86,15.9C21.68,15.59 23,14.83 23,14C23,12 21,4 18,4M4.15,13.87C3.65,13.75 3.26,13.61 3,13.5C3.25,10.73 5.2,6.4 6.05,6C6.59,6 7,6.06 7.37,6.11C5.27,8.42 4.44,12.04 4.15,13.87M9,12A1,1 0 0,1 8,11C8,10.46 8.45,10 9,10A1,1 0 0,1 10,11C10,11.56 9.55,12 9,12M15,12A1,1 0 0,1 14,11C14,10.46 14.45,10 15,10A1,1 0 0,1 16,11C16,11.56 15.55,12 15,12M19.85,13.87C19.56,12.04 18.73,8.42 16.63,6.11C17,6.06 17.41,6 17.95,6C18.8,6.4 20.75,10.73 21,13.5C20.75,13.61 20.36,13.75 19.85,13.87Z", Id = "M8,3C6.89,3 6,3.89 6,5V21H18V5C18,3.89 17.11,3 16,3H8M8,5H16V19H8V5M13,11V13H15V11H13Z", Rd = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", Dd = "M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2M16 20H8V4H16V20Z", Fd = "M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z", $d = "M21 11H3V9H21V11M21 13H3V15H21V13Z", Zd = "M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z", Ud = "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z", Bd = "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z", Wd = "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z", Kd = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", Qd = "M18,9H16V7H18M18,13H16V11H18M18,17H16V15H18M8,9H6V7H8M8,13H6V11H8M8,17H6V15H8M18,3V5H16V3H8V5H6V3H4V21H6V19H8V21H16V19H18V21H20V3H18Z", Gd = "M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z", Yd = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z", Xd = "M7,2V13H10V22L17,10H13L17,2H7Z", Jd = "M15,2L17,9H7L9,2M11,10H13V20H16V22H8V20H11V10Z", qd = "M10,5V10H9V5H5V13H9V12H10V17H9V14H5V19H12V17H13V19H19V17H21V21H3V3H21V15H19V10H13V15H12V9H19V5H10Z", ef = "M3,13A9,9 0 0,0 12,22C12,17 7.97,13 3,13M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M5.6,10.25A2.5,2.5 0 0,0 8.1,12.75C8.63,12.75 9.12,12.58 9.5,12.31C9.5,12.37 9.5,12.43 9.5,12.5A2.5,2.5 0 0,0 12,15A2.5,2.5 0 0,0 14.5,12.5C14.5,12.43 14.5,12.37 14.5,12.31C14.88,12.58 15.37,12.75 15.9,12.75C17.28,12.75 18.4,11.63 18.4,10.25C18.4,9.25 17.81,8.4 16.97,8C17.81,7.6 18.4,6.74 18.4,5.75C18.4,4.37 17.28,3.25 15.9,3.25C15.37,3.25 14.88,3.41 14.5,3.69C14.5,3.63 14.5,3.56 14.5,3.5A2.5,2.5 0 0,0 12,1A2.5,2.5 0 0,0 9.5,3.5C9.5,3.56 9.5,3.63 9.5,3.69C9.12,3.41 8.63,3.25 8.1,3.25A2.5,2.5 0 0,0 5.6,5.75C5.6,6.74 6.19,7.6 7.03,8C6.19,8.4 5.6,9.25 5.6,10.25M12,22A9,9 0 0,0 21,13C16,13 12,17 12,22Z", tf = "M5.44 7.96L5.96 7.43C6.54 6.85 7.5 6.85 8.1 7.47L8.12 7.5C8.61 8 9.26 8.24 9.97 8.31C10.94 8.4 11.88 8.92 12.5 9.86C13.18 10.94 13.17 12.38 12.46 13.45C11.26 15.3 8.75 15.5 7.28 14C6.72 13.45 6.4 12.74 6.32 12C6.24 11.27 5.95 10.58 5.44 10.07C4.86 9.5 4.86 8.54 5.44 7.96M9.64 16C8.47 16 7.38 15.55 6.57 14.72C5.87 14 5.43 13.1 5.32 12.12C5.29 11.82 5.2 11.43 4.96 11.07C4.36 11.9 4 12.9 4 14C4 15.64 4.8 17.09 6.03 18H19V17C19 13.4 16.61 10.35 13.34 9.35C14.23 10.75 14.21 12.62 13.3 14C12.5 15.25 11.12 16 9.64 16M14.78 7.56H16.05C16.92 7.56 17.68 8.17 17.68 9.26V10H18.93V9C18.93 7.5 17.6 6.36 16.05 6.36H14.78C13.95 6.36 13.24 5.54 13.24 4.7S13.95 3.24 14.78 3.24V2C13.24 2 12 3.24 12 4.78S13.24 7.56 14.78 7.56M4.5 7.55C4.56 7.45 4.64 7.35 4.73 7.25L5.25 6.73C5.34 6.64 5.44 6.57 5.54 6.5L4.13 5.07C4.27 4.8 4.22 4.45 4 4.22C3.7 3.93 3.22 3.93 2.93 4.22C2.79 4.36 2.72 4.53 2.71 4.71C2.53 4.72 2.36 4.79 2.22 4.93C1.93 5.22 1.93 5.7 2.22 6C2.45 6.22 2.79 6.27 3.07 6.13L4.5 7.55M18.39 4.39C18.9 3.88 19.22 3.19 19.22 2.42H17.97C17.97 3.25 17.27 3.95 16.44 3.95V5.19C18.3 5.19 19.76 6.71 19.76 8.57V11H21V8.57C21 6.72 19.94 5.13 18.39 4.39M5 21H19C20.11 21 21 20.11 21 19H3C3 20.11 3.9 21 5 21Z", nf = "M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z", rf = "M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z", lf = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", of = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", sf = "M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z", af = "M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H18A3,3 0 0,0 21,17V10C21,5 16.97,1 12,1Z", uf = "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z", cf = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z", df = "M2,12L12,3L22,12H19V20H5V12H2M12,18L12.72,17.34C15.3,15 17,13.46 17,11.57C17,10.03 15.79,8.82 14.25,8.82C13.38,8.82 12.55,9.23 12,9.87C11.45,9.23 10.62,8.82 9.75,8.82C8.21,8.82 7,10.03 7,11.57C7,13.46 8.7,15 11.28,17.34L12,18Z", ff = "M12,3L2,12H5V20H19V12H22L12,3M12,9A3,3 0 0,1 15,12V13H16V17H8V13H9V12A3,3 0 0,1 12,9M12,11A1,1 0 0,0 11,12V13H13V12C13,11.5 12.6,11 12,11Z", pf = "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22", mf = "M7,4A2,2 0 0,1 9,6A2,2 0 0,1 7,8A2,2 0 0,1 5,6A2,2 0 0,1 7,4M11.15,12H22V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12H5V11.25C5,10 6,9 7.25,9H7.28C7.62,9 7.95,9.09 8.24,9.23C8.5,9.35 8.74,9.5 8.93,9.73L10.33,11.28C10.56,11.54 10.84,11.78 11.15,12M7,20V14H5V20H7M11,20V14H9V20H11M15,20V14H13V20H15M19,20V14H17V20H19M18.65,5.86C19.68,6.86 20.16,8.21 19.95,9.57L19.89,10H18L18.09,9.41C18.24,8.62 18,7.83 17.42,7.21L17.35,7.15C16.32,6.14 15.85,4.79 16.05,3.43L16.11,3H18L17.91,3.59C17.76,4.38 18,5.17 18.58,5.79L18.65,5.86M14.65,5.86C15.68,6.86 16.16,8.21 15.95,9.57L15.89,10H14L14.09,9.41C14.24,8.62 14,7.83 13.42,7.21L13.35,7.15C12.32,6.14 11.85,4.79 12.05,3.43L12.11,3H14L13.91,3.59C13.76,4.38 14,5.17 14.58,5.79L14.65,5.86Z", hf = "M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2M15.9 8.1C15.5 7.7 14.8 7 13.5 7H11C8.2 7 6 4.8 6 2H4C4 5.2 6.1 7.8 9 8.7V22H11V16H13V22H15V10.1L19 14L20.4 12.6L15.9 8.1Z", gf = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z", vf = "M7 14C5.9 14 5 13.1 5 12S5.9 10 7 10 9 10.9 9 12 8.1 14 7 14M12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12S3.7 18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z", yf = "M8,2H16L20,14H4L8,2M11,15H13V20H18V22H6V20H11V15Z", Cf = "M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z", xf = "M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z", Lf = "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z", wf = "M2.95 3L2 6.91L19.34 11.25L20.29 7.34L2.95 3M6.09 6.89L4.16 6.41L4.64 4.46L6.57 4.94L6.09 6.89M9.94 7.86L8 7.38L8.5 5.42L10.42 5.91L9.94 7.86M13.8 8.82L11.87 8.34L12.35 6.39L14.27 6.87L13.8 8.82M17.65 9.79L15.72 9.31L16.2 7.35L18.13 7.84L17.65 9.79M4.66 12.75L3.71 16.66L21.05 21L22 17.1L4.66 12.75M7.8 16.65L5.88 16.16L6.35 14.21L8.28 14.69L7.8 16.65M11.65 17.61L9.73 17.13L10.2 15.18L12.13 15.66L11.65 17.61M15.5 18.58L13.58 18.09L14.06 16.14L16 16.62L15.5 18.58M19.36 19.54L17.43 19.06L17.91 17.11L19.84 17.59L19.36 19.54M6.25 12.11L11 10.2L17.75 11.89L13 13.8L6.25 12.11Z", _f = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", kf = "M15 14V16A1 1 0 0 1 14 17H10A1 1 0 0 1 9 16V14A5 5 0 1 1 15 14M14 18H10V19A1 1 0 0 0 11 20H13A1 1 0 0 0 14 19M7 19V18H5V19A1 1 0 0 0 6 20H7.17A2.93 2.93 0 0 1 7 19M5 10A6.79 6.79 0 0 1 5.68 7A4 4 0 0 0 4 14.45V16A1 1 0 0 0 5 17H7V14.88A6.92 6.92 0 0 1 5 10M17 18V19A2.93 2.93 0 0 1 16.83 20H18A1 1 0 0 0 19 19V18M18.32 7A6.79 6.79 0 0 1 19 10A6.92 6.92 0 0 1 17 14.88V17H19A1 1 0 0 0 20 16V14.45A4 4 0 0 0 18.32 7Z", Hf = "M17 16V18C17 18.55 16.53 19 16 19H12C11.42 19 11 18.55 11 18V16C8.77 14.34 8.32 11.21 10 9S14.77 6.34 17 8 19.63 12.79 18 15C17.69 15.38 17.35 15.72 17 16M16 20H12V21C12 21.55 12.42 22 13 22H15C15.53 22 16 21.55 16 21M7.66 15H7V16C7 16.55 7.42 17 8 17H9V16.88C8.44 16.33 8 15.7 7.66 15M13.58 5C12.46 2.47 9.5 1.33 7 2.45S3.31 6.5 4.43 9.04C4.77 9.81 5.3 10.5 6 11V13C6 13.55 6.42 14 7 14H7.28C7.07 13.35 6.97 12.68 7 12C6.97 8.29 9.87 5.21 13.58 5Z", Vf = "M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z", Mf = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", Sf = "M11 15H6L13 1V9H18L11 23V15Z", Af = "M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z", Ef = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", jf = "M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z", Nf = "M17.5 9C16.12 9 15 7.88 15 6.5S16.12 4 17.5 4 20 5.12 20 6.5 18.88 9 17.5 9M14.43 8.15L2 20.59L3.41 22L15.85 9.57C15.25 9.24 14.76 8.75 14.43 8.15M13 5L13.63 3.63L15 3L13.63 2.37L13 1L12.38 2.37L11 3L12.38 3.63L13 5M21 5L21.63 3.63L23 3L21.63 2.37L21 1L20.38 2.37L19 3L20.38 3.63L21 5M21 9L20.38 10.37L19 11L20.38 11.63L21 13L21.63 11.63L23 11L21.63 10.37L21 9Z", zf = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z", Pf = "M12 4C13.11 4 14 4.89 14 6S13.11 8 12 8 10 7.11 10 6 10.9 4 12 4M21 16V14C18.76 14 16.84 13.04 15.4 11.32L14.06 9.72C13.68 9.26 13.12 9 12.53 9H11.5C10.89 9 10.33 9.26 9.95 9.72L8.61 11.32C7.16 13.04 5.24 14 3 14V16C5.77 16 8.19 14.83 10 12.75V15L6.12 16.55C5.45 16.82 5 17.5 5 18.21C5 19.2 5.8 20 6.79 20H9V19.5C9 18.12 10.12 17 11.5 17H14.5C14.78 17 15 17.22 15 17.5S14.78 18 14.5 18H11.5C10.67 18 10 18.67 10 19.5V20H17.21C18.2 20 19 19.2 19 18.21C19 17.5 18.55 16.82 17.88 16.55L14 15V12.75C15.81 14.83 18.23 16 21 16Z", Tf = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z", Of = "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z", bf = "M19,13H5V11H19V13Z", If = "M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z", Rf = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", Df = "M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z", Ff = "M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z", $f = "M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z", Zf = "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z", Uf = "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z", Bf = "M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z", Wf = "M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z", Kf = "M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z", Qf = "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z", Gf = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z", Yf = "M7,22H4.75C4.75,22 4,22 3.81,20.65L2.04,3.81L2,3.5C2,2.67 2.9,2 4,2C5.1,2 6,2.67 6,3.5C6,2.67 6.9,2 8,2C9.1,2 10,2.67 10,3.5C10,2.67 10.9,2 12,2C13.09,2 14,2.66 14,3.5V3.5C14,2.67 14.9,2 16,2C17.1,2 18,2.67 18,3.5C18,2.67 18.9,2 20,2C21.1,2 22,2.67 22,3.5L21.96,3.81L20.19,20.65C20,22 19.25,22 19.25,22H17L16.5,22H13.75L10.25,22H7.5L7,22M17.85,4.93C17.55,4.39 16.84,4 16,4C15.19,4 14.36,4.36 14,4.87L13.78,20H16.66L17.85,4.93M10,4.87C9.64,4.36 8.81,4 8,4C7.16,4 6.45,4.39 6.15,4.93L7.34,20H10.22L10,4.87Z", Xf = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", Jf = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", qf = "M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z", e5 = "M8,7H10V12H8V7M4.22,2H19.78C21,2 22,3 22,4.22V19.78A2.22,2.22 0 0,1 19.78,22H4.22C3,22 2,21 2,19.78V4.22A2.22,2.22 0 0,1 4.22,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M14,7.5H16V11.5H14V7.5M10.5,16.25A1.5,1.5 0 0,1 12,14.75A1.5,1.5 0 0,1 13.5,16.25V17H10.5V16.25Z", t5 = "M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z", n5 = "M20,6A2,2 0 0,1 22,8V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V8C2,7.15 2.53,6.42 3.28,6.13L15.71,1L16.47,2.83L8.83,6H20M20,8H4V12H16V10H18V12H20V8M7,14A3,3 0 0,0 4,17A3,3 0 0,0 7,20A3,3 0 0,0 10,17A3,3 0 0,0 7,14Z", r5 = "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z", l5 = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z", i5 = "M13.5,5.5C14.59,5.5 15.5,4.58 15.5,3.5C15.5,2.38 14.59,1.5 13.5,1.5C12.39,1.5 11.5,2.38 11.5,3.5C11.5,4.58 12.39,5.5 13.5,5.5M9.89,19.38L10.89,15L13,17V23H15V15.5L12.89,13.5L13.5,10.5C14.79,12 16.79,13 19,13V11C17.09,11 15.5,10 14.69,8.58L13.69,7C13.29,6.38 12.69,6 12,6C11.69,6 11.5,6.08 11.19,6.08L6,8.28V13H8V9.58L9.79,8.88L8.19,17L3.29,16L2.89,18L9.89,19.38Z", o5 = "M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z", s5 = "M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z", a5 = "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", u5 = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", c5 = "M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z", d5 = "M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z", f5 = "M23,12H17V10L20.39,6H17V4H23V6L19.62,10H23V12M15,16H9V14L12.39,10H9V8H15V10L11.62,14H15V16M7,20H1V18L4.39,14H1V12H7V14L3.62,18H7V20Z", p5 = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", m5 = "M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z", h5 = "M3.33 16H11V13H4L3.33 16M13 16H20.67L20 13H13V16M21.11 18H13V22H22L21.11 18M2 22H11V18H2.89L2 22M11 8H13V11H11V8M15.76 7.21L17.18 5.79L19.3 7.91L17.89 9.33L15.76 7.21M4.71 7.91L6.83 5.79L8.24 7.21L6.12 9.33L4.71 7.91M3 2H6V4H3V2M18 2H21V4H18V2M12 7C14.76 7 17 4.76 17 2H7C7 4.76 9.24 7 12 7Z", g5 = "M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z", v5 = "M14,10A3,3 0 0,0 11,13A3,3 0 0,0 14,16A3,3 0 0,0 17,13A3,3 0 0,0 14,10M14,18A5,5 0 0,1 9,13A5,5 0 0,1 14,8A5,5 0 0,1 19,13A5,5 0 0,1 14,18M14,2A2,2 0 0,1 16,4A2,2 0 0,1 14,6A2,2 0 0,1 12,4A2,2 0 0,1 14,2M19,0H9A2,2 0 0,0 7,2V18A2,2 0 0,0 9,20H19A2,2 0 0,0 21,18V2A2,2 0 0,0 19,0M5,22H17V24H5A2,2 0 0,1 3,22V4H5", y5 = "M9,16.5L9.91,15.59L15.13,20.8L14.21,21.71L9,16.5M15.5,10L16.41,9.09L21.63,14.3L20.71,15.21L15.5,10M6.72,2.72L10.15,6.15L6.15,10.15L2.72,6.72C1.94,5.94 1.94,4.67 2.72,3.89L3.89,2.72C4.67,1.94 5.94,1.94 6.72,2.72M14.57,7.5L15.28,8.21L8.21,15.28L7.5,14.57L6.64,11.07L11.07,6.64L14.57,7.5Z", C5 = "M10 10H14V22H10V10M7 9H9V7H7V9M4 8H6V6H4V8M4 11H6V9H4V11M1 13H3V11H1V13M1 7H3V5H1V7M1 10H3V8H1V10M18 11H20V9H18V11M21 10H23V8H21V10M21 5V7H23V5H21M21 13H23V11H21V13M15 9H17V7H15V9M18 8H20V6H18V8M10 7H10.33L11 9H13L13.67 7H14V6H10V7Z", x5 = "M15,5V9H11V13H7V17H3V20H10V16H14V12H18V8H22V5H15Z", L5 = "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z", w5 = "M6,14H8L11,17H9L6,14M4,4H5V3A1,1 0 0,1 6,2H10A1,1 0 0,1 11,3V4H13V3A1,1 0 0,1 14,2H18A1,1 0 0,1 19,3V4H20A2,2 0 0,1 22,6V19A2,2 0 0,1 20,21V22H17V21H7V22H4V21A2,2 0 0,1 2,19V6A2,2 0 0,1 4,4M18,7A1,1 0 0,1 19,8A1,1 0 0,1 18,9A1,1 0 0,1 17,8A1,1 0 0,1 18,7M14,7A1,1 0 0,1 15,8A1,1 0 0,1 14,9A1,1 0 0,1 13,8A1,1 0 0,1 14,7M20,6H4V10H20V6M4,19H20V12H4V19M6,7A1,1 0 0,1 7,8A1,1 0 0,1 6,9A1,1 0 0,1 5,8A1,1 0 0,1 6,7M13,14H15L18,17H16L13,14Z", _5 = "M22.56 11.39C22.36 10.59 21.82 9.85 21.05 9.44L20.63 7.74C21.11 7.58 21.57 7.41 22 7.23V5C20 6.07 16.53 7.03 12 7.03S4 6.07 2 5V7.23C2.43 7.41 2.89 7.58 3.37 7.74L2.95 9.44C2.18 9.85 1.64 10.59 1.44 11.39C.905 13.57 .385 17.31 2.92 17.93C4 18.2 6 17.89 7.27 12.82C7.46 12 7.33 11.12 6.84 10.39L7.26 8.67C8.14 8.81 9.05 8.9 10 8.96V10.74C9.35 11.33 9 12.17 9 13C9 15.24 9.39 19 12 19C13.12 19 15 18.22 15 13C15 12.17 14.65 11.33 14 10.74V8.96C14.95 8.9 15.86 8.81 16.74 8.67L17.16 10.39C16.67 11.12 16.54 12 16.73 12.82C18 17.89 20 18.2 21.08 17.93C23.61 17.31 23.09 13.57 22.56 11.39M5.81 12.47C5.81 12.47 4.74 16.84 3.28 16.5C1.82 16.12 2.9 11.75 2.9 11.75S3.26 10.29 4.71 10.65 5.81 12.47 5.81 12.47M12 17.5C10.5 17.5 10.5 13 10.5 13S10.5 11.5 12 11.5 13.5 13 13.5 13 13.5 17.5 12 17.5M20.72 16.5C19.27 16.84 18.19 12.47 18.19 12.47S17.83 11 19.29 10.65 21.1 11.75 21.1 11.75 22.18 16.12 20.72 16.5Z", k5 = "M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z", H5 = "M8.16,3L6.75,4.41L9.34,7H4C2.89,7 2,7.89 2,9V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V9C22,7.89 21.11,7 20,7H14.66L17.25,4.41L15.84,3L12,6.84L8.16,3M4,9H17V19H4V9M19.5,9A1,1 0 0,1 20.5,10A1,1 0 0,1 19.5,11A1,1 0 0,1 18.5,10A1,1 0 0,1 19.5,9M19.5,12A1,1 0 0,1 20.5,13A1,1 0 0,1 19.5,14A1,1 0 0,1 18.5,13A1,1 0 0,1 19.5,12Z", V5 = "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z", M5 = "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", S5 = "M17 6H7C3.69 6 1 8.69 1 12S3.69 18 7 18H17C20.31 18 23 15.31 23 12S20.31 6 17 6M17 16H7C4.79 16 3 14.21 3 12S4.79 8 7 8H17C19.21 8 21 9.79 21 12S19.21 16 17 16M17 9C15.34 9 14 10.34 14 12S15.34 15 17 15 20 13.66 20 12 18.66 9 17 9Z", A5 = "M9,22H17V19.5C19.41,17.87 21,15.12 21,12V4A2,2 0 0,0 19,2H15C13.89,2 13,2.9 13,4V12H3C3,15.09 5,18 9,19.5V22M5.29,14H18.71C18.14,15.91 16.77,17.5 15,18.33V20H11V18.33C9,18 5.86,15.91 5.29,14M15,4H19V12H15V4M16,5V8H18V5H16Z", E5 = "M6,1V3H9V6.4L4.11,4.38L1.43,10.84L6.97,13.14L11.94,16.82L13.79,17.59L17.62,8.35L15.77,7.58L11,6.87V3H14V1H6M21.81,6.29L19.5,7.25L20.26,9.1L22.57,8.14L21.81,6.29M19.78,13.57L19,15.42L21.79,16.57L22.55,14.72L19.78,13.57M16.19,18.93L14.34,19.69L15.3,22L17.15,21.23L16.19,18.93Z", j5 = "M11,21V16.74C10.53,16.91 10.03,17 9.5,17C7,17 5,15 5,12.5C5,11.23 5.5,10.09 6.36,9.27C6.13,8.73 6,8.13 6,7.5C6,5 8,3 10.5,3C12.06,3 13.44,3.8 14.25,5C14.33,5 14.41,5 14.5,5A5.5,5.5 0 0,1 20,10.5A5.5,5.5 0 0,1 14.5,16C14,16 13.5,15.93 13,15.79V21H11Z", N5 = "M12,2A9,9 0 0,1 21,11H13V19A3,3 0 0,1 10,22A3,3 0 0,1 7,19V18H9V19A1,1 0 0,0 10,20A1,1 0 0,0 11,19V11H3A9,9 0 0,1 12,2Z", z5 = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", P5 = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", T5 = "M14.12,10H19V8.2H15.38L13.38,4.87C13.08,4.37 12.54,4.03 11.92,4.03C11.74,4.03 11.58,4.06 11.42,4.11L6,5.8V11H7.8V7.33L9.91,6.67L6,22H7.8L10.67,13.89L13,17V22H14.8V15.59L12.31,11.05L13.04,8.18M14,3.8C15,3.8 15.8,3 15.8,2C15.8,1 15,0.2 14,0.2C13,0.2 12.2,1 12.2,2C12.2,3 13,3.8 14,3.8Z", O5 = "M11,4L7,13H19L15,4H11M4,14V22H6V19H14V14H12V17H6V14H4Z", b5 = "M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z", I5 = "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z", R5 = "M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z", D5 = "M18.5 7.47C17.76 8.2 17.57 9.25 17.92 10.15L15 13.07V11C15 10.45 14.55 10 14 10H12.97C13 9.83 13 9.67 13 9.5C13 6.46 10.54 4 7.5 4S2 6.46 2 9.5C2 11.21 2.78 12.73 4 13.74V20C4 20.55 4.45 21 5 21H14C14.55 21 15 20.55 15 20V15.89L19.33 11.56C20.23 11.91 21.28 11.73 22 11L18.5 7.47M4.05 10C4.03 9.83 4 9.67 4 9.5C4 7.57 5.57 6 7.5 6S11 7.57 11 9.5C11 9.67 10.97 9.83 10.95 10H4.05Z", F5 = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", $5 = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", Z5 = "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M5,16H19A1,1 0 0,1 20,17A1,1 0 0,1 19,18H5A1,1 0 0,1 4,17A1,1 0 0,1 5,16M17,20A1,1 0 0,1 18,21A1,1 0 0,1 17,22H7A1,1 0 0,1 6,21A1,1 0 0,1 7,20H17M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7Z", U5 = "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z", B5 = "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z", W5 = "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13", K5 = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", Q5 = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", G5 = "M13 2C11.9 2 11 2.9 11 4C11 5.11 11.9 6 13 6C14.11 6 15 5.11 15 4C15 2.9 14.11 2 13 2M4 7V9H10V15L4.93 20.07L6.34 21.5L13.06 14.77L17 17.13V21H19V16.57C19 16.21 18.82 15.89 18.5 15.71L15 13.6V9H21V7H4Z";
const jn = {
  "account-alert": W0,
  "account-group": K0,
  "air-conditioner": Q0,
  "air-filter": G0,
  alarm: Y0,
  "alarm-light": X0,
  "alert-circle-outline": J0,
  apple: q0,
  "auto-fix": ed,
  "baby-carriage": td,
  "battery-charging": nd,
  bed: rd,
  "bed-king": ld,
  bell: id,
  "bell-ring": od,
  blinds: sd,
  "blinds-horizontal": ad,
  "book-open-page-variant": ud,
  bookshelf: cd,
  "briefcase-outline": dd,
  broom: fd,
  "calendar-clock": pd,
  "camera-outline": md,
  candle: hd,
  car: gd,
  cat: vd,
  cctv: yd,
  "ceiling-light": Cd,
  chandelier: xd,
  check: Ld,
  "chef-hat": wd,
  "chevron-down": _d,
  "chevron-left": kd,
  "chevron-right": Hd,
  "clock-outline": Vd,
  close: Md,
  coffee: Sd,
  cog: Ad,
  "content-save-outline": Ed,
  creation: jd,
  cupcake: Nd,
  curtains: zd,
  "delete-outline": Pd,
  "desk-lamp": Td,
  "desktop-tower-monitor": Od,
  dog: bd,
  door: Id,
  "door-open": Rd,
  doorbell: Dd,
  "dots-grid": Fd,
  "drag-horizontal-variant": $d,
  dumbbell: Zd,
  "ev-station": Ud,
  "eye-off-outline": Bd,
  "eye-outline": Wd,
  fan: Kd,
  filmstrip: Qd,
  "filter-variant": Gd,
  fire: Yd,
  flash: Xd,
  "floor-lamp": Jd,
  "floor-plan": qd,
  flower: ef,
  "food-turkey": tf,
  "fridge-outline": nf,
  "gamepad-variant": rf,
  garage: lf,
  "garage-open": of,
  "glass-cocktail": sf,
  headphones: af,
  heart: uf,
  home: cf,
  "home-heart": df,
  "home-lock": ff,
  "home-outline": pf,
  "hot-tub": mf,
  "human-greeting": hf,
  "information-outline": gf,
  key: vf,
  lamp: yf,
  laptop: Cf,
  "layers-outline": xf,
  leaf: Lf,
  "led-strip-variant": wf,
  lightbulb: _f,
  "lightbulb-group": kf,
  "lightbulb-multiple": Hf,
  "lightbulb-on": Vf,
  "lightbulb-outline": Mf,
  "lightning-bolt": Sf,
  loading: Af,
  lock: Ef,
  "lock-open-variant": jf,
  "magic-staff": Nf,
  magnify: zf,
  meditation: Pf,
  menu: Tf,
  microphone: Of,
  minus: bf,
  "moon-waning-crescent": If,
  "motion-sensor": Rf,
  "movie-open": Df,
  music: Ff,
  "music-note": $f,
  "open-in-new": Zf,
  palette: Uf,
  "palette-outline": Bf,
  "party-popper": Wf,
  "pencil-outline": Kf,
  "play-circle-outline": Qf,
  plus: Gf,
  popcorn: Yf,
  power: Xf,
  "power-plug": Jf,
  "power-sleep": qf,
  "power-socket-us": e5,
  radiator: t5,
  radio: n5,
  refresh: r5,
  "robot-vacuum": l5,
  run: i5,
  "school-outline": o5,
  "shape-outline": s5,
  "shield-home": a5,
  "shield-lock": u5,
  shower: c5,
  "silverware-fork-knife": d5,
  sleep: f5,
  snowflake: p5,
  sofa: m5,
  "solar-power-variant": h5,
  speaker: g5,
  "speaker-multiple": v5,
  "spotlight-beam": y5,
  "sprinkler-variant": C5,
  stairs: x5,
  star: L5,
  stove: w5,
  "string-lights": _5,
  television: k5,
  "television-classic": H5,
  thermometer: V5,
  thermostat: M5,
  "toggle-switch-outline": S5,
  toilet: A5,
  "track-light": E5,
  tree: j5,
  umbrella: N5,
  "volume-high": z5,
  "volume-off": P5,
  walk: T5,
  "wall-sconce": O5,
  "washing-machine": b5,
  water: I5,
  "water-percent": R5,
  "watering-can": D5,
  "weather-night": F5,
  "weather-sunny": $5,
  "weather-sunset": Z5,
  "weather-sunset-down": U5,
  "weather-sunset-up": B5,
  "white-balance-sunny": W5,
  "window-open": K5,
  "window-shutter": Q5,
  yoga: G5
}, Y5 = {
  close: "close",
  check: "check",
  chevronRight: "chevron-right",
  chevronDown: "chevron-down",
  chevronLeft: "chevron-left",
  plus: "plus",
  minus: "minus",
  trash: "delete-outline",
  refresh: "refresh",
  search: "magnify",
  menu: "menu",
  alert: "alert-circle-outline",
  info: "information-outline",
  eye: "eye-outline",
  eyeOff: "eye-off-outline",
  play: "play-circle-outline",
  content_save: "content-save-outline",
  camera: "camera-outline",
  palette: "palette-outline",
  home: "home-outline",
  floor: "layers-outline",
  room: "floor-plan",
  dragHorizontal: "drag-horizontal-variant",
  openInNew: "open-in-new",
  filter: "filter-variant",
  pencil: "pencil-outline",
  dotsGrid: "dots-grid",
  loading: "loading"
}, Ju = {
  light: "lightbulb",
  fan: "fan",
  shade: "blinds-horizontal",
  media: "television",
  outlet: "power-socket-us",
  switch: "toggle-switch-outline",
  climate: "thermostat",
  lock: "lock",
  other: "shape-outline"
}, X5 = [
  {
    name: "Lighting",
    icons: ["lightbulb", "lightbulb-on", "lightbulb-outline", "lightbulb-group", "lightbulb-multiple", "ceiling-light", "floor-lamp", "desk-lamp", "lamp", "track-light", "wall-sconce", "string-lights", "chandelier", "candle", "led-strip-variant", "spotlight-beam"]
  },
  {
    name: "Time of day",
    icons: ["weather-sunny", "weather-sunset-up", "weather-sunset", "weather-sunset-down", "weather-night", "white-balance-sunny", "moon-waning-crescent", "sleep", "power-sleep", "alarm", "clock-outline", "calendar-clock"]
  },
  {
    name: "Living",
    icons: ["home", "home-outline", "home-heart", "home-lock", "sofa", "bed", "bed-king", "silverware-fork-knife", "coffee", "glass-cocktail", "chef-hat", "food-turkey", "cupcake", "party-popper", "book-open-page-variant", "bookshelf"]
  },
  {
    name: "Entertainment",
    icons: ["television", "television-classic", "movie-open", "filmstrip", "popcorn", "music", "music-note", "speaker", "speaker-multiple", "volume-high", "volume-off", "gamepad-variant", "microphone", "radio", "apple", "headphones"]
  },
  {
    name: "Rooms",
    icons: ["floor-plan", "stairs", "garage", "garage-open", "door", "door-open", "window-shutter", "window-open", "blinds", "blinds-horizontal", "curtains", "shower", "toilet", "washing-machine", "stove", "fridge-outline"]
  },
  {
    name: "Comfort",
    icons: ["fan", "air-conditioner", "air-filter", "radiator", "thermostat", "thermometer", "snowflake", "fire", "water", "water-percent", "hot-tub", "umbrella"]
  },
  {
    name: "Activity",
    icons: ["briefcase-outline", "laptop", "desktop-tower-monitor", "school-outline", "dumbbell", "yoga", "meditation", "run", "walk", "account-group", "human-greeting", "baby-carriage", "dog", "cat", "flower", "tree"]
  },
  {
    name: "Security",
    icons: ["shield-home", "shield-lock", "lock", "lock-open-variant", "key", "cctv", "motion-sensor", "bell", "bell-ring", "doorbell", "alarm-light", "account-alert"]
  },
  {
    name: "Utility",
    icons: ["power", "power-plug", "flash", "lightning-bolt", "car", "ev-station", "robot-vacuum", "broom", "sprinkler-variant", "watering-can", "leaf", "solar-power-variant", "battery-charging", "star", "heart", "palette", "auto-fix", "creation", "magic-staff", "cog"]
  }
], J5 = jn[Ju.other];
function q5(e) {
  return e ? jn[e.replace(/^mdi:/, "")] ?? null : null;
}
function go({
  path: e,
  size: t = 24,
  className: n
}) {
  return /* @__PURE__ */ a.jsx(
    "svg",
    {
      className: n,
      width: t,
      height: t,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false",
      children: /* @__PURE__ */ a.jsx("path", { d: e })
    }
  );
}
function G({
  name: e,
  size: t = 24,
  className: n
}) {
  return /* @__PURE__ */ a.jsx(go, { path: jn[Y5[e]], size: t, className: n });
}
function Et({
  name: e,
  fallbackKind: t,
  size: n = 24,
  className: r
}) {
  const l = q5(e) ?? (t ? jn[Ju[t] ?? ""] : null) ?? J5;
  return /* @__PURE__ */ a.jsx(go, { path: l, size: n, className: r });
}
function R({
  label: e,
  hint: t,
  children: n,
  stacked: r
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: `row${r ? " row--stacked" : ""}`, children: [
    /* @__PURE__ */ a.jsxs("div", { className: "row__label", children: [
      /* @__PURE__ */ a.jsx("span", { children: e }),
      t ? /* @__PURE__ */ a.jsx("span", { className: "row__hint", children: t }) : null
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "row__control", children: n })
  ] });
}
function qu({
  checked: e,
  onChange: t,
  label: n
}) {
  return /* @__PURE__ */ a.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": n,
      className: `toggle${e ? " toggle--on" : ""}`,
      onClick: () => t(!e),
      children: /* @__PURE__ */ a.jsx("span", { className: "toggle__knob" })
    }
  );
}
function Ye({
  value: e,
  min: t = 0,
  max: n = 100,
  step: r = 1,
  onChange: l,
  format: i,
  accent: o,
  disabled: s
}) {
  const u = n === t ? 0 : (e - t) / (n - t) * 100;
  return /* @__PURE__ */ a.jsxs("div", { className: "slider", children: [
    /* @__PURE__ */ a.jsx(
      "input",
      {
        type: "range",
        min: t,
        max: n,
        step: r,
        value: e,
        disabled: s,
        onChange: (c) => l(Number(c.target.value)),
        style: {
          "--fill": `${u}%`,
          ...o ? { "--slider-accent": o } : {}
        }
      }
    ),
    /* @__PURE__ */ a.jsx("output", { className: "slider__value", children: i ? i(e) : e })
  ] });
}
function en({
  value: e,
  options: t,
  onChange: n
}) {
  return /* @__PURE__ */ a.jsx("div", { className: "segmented", role: "group", children: t.map((r) => /* @__PURE__ */ a.jsx(
    "button",
    {
      type: "button",
      className: `segmented__item${r.value === e ? " segmented__item--active" : ""}`,
      "aria-pressed": r.value === e,
      onClick: () => n(r.value),
      children: r.label
    },
    r.value
  )) });
}
function Nn({
  value: e,
  options: t,
  onChange: n,
  placeholder: r
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: "select", children: [
    /* @__PURE__ */ a.jsxs("select", { value: e ?? "", onChange: (l) => n(l.target.value), children: [
      r ? /* @__PURE__ */ a.jsx("option", { value: "", children: r }) : null,
      t.map((l) => /* @__PURE__ */ a.jsx("option", { value: l.value, children: l.label }, l.value))
    ] }),
    /* @__PURE__ */ a.jsx(G, { name: "chevronDown", size: 18 })
  ] });
}
function i1({
  value: e,
  min: t,
  max: n,
  step: r = 1,
  onChange: l,
  format: i
}) {
  const o = (s) => Math.min(n, Math.max(t, Math.round(s / r) * r));
  return /* @__PURE__ */ a.jsxs("div", { className: "stepper", children: [
    /* @__PURE__ */ a.jsx(
      "button",
      {
        type: "button",
        onClick: () => l(o(e - r)),
        disabled: e <= t,
        "aria-label": "Decrease",
        children: /* @__PURE__ */ a.jsx(G, { name: "minus", size: 18 })
      }
    ),
    /* @__PURE__ */ a.jsx("span", { className: "stepper__value", children: i ? i(e) : e }),
    /* @__PURE__ */ a.jsx(
      "button",
      {
        type: "button",
        onClick: () => l(o(e + r)),
        disabled: e >= n,
        "aria-label": "Increase",
        children: /* @__PURE__ */ a.jsx(G, { name: "plus", size: 18 })
      }
    )
  ] });
}
function E1({
  open: e,
  title: t,
  subtitle: n,
  onClose: r,
  children: l,
  footer: i
}) {
  const o = k.useRef(null), s = k.useRef(r);
  return k.useEffect(() => {
    s.current = r;
  }), k.useEffect(() => {
    if (!e) return;
    const u = (f) => {
      f.key === "Escape" && s.current();
    };
    document.addEventListener("keydown", u);
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.removeEventListener("keydown", u), document.body.style.overflow = c;
    };
  }, [e]), k.useEffect(() => {
    e && o.current?.focus();
  }, [e]), e ? /* @__PURE__ */ a.jsxs("div", { className: "sheet", role: "dialog", "aria-modal": "true", "aria-label": typeof t == "string" ? t : void 0, children: [
    /* @__PURE__ */ a.jsx("div", { className: "sheet__backdrop", onClick: r }),
    /* @__PURE__ */ a.jsxs("div", { className: "sheet__panel", ref: o, tabIndex: -1, children: [
      /* @__PURE__ */ a.jsx("div", { className: "sheet__grabber" }),
      /* @__PURE__ */ a.jsxs("header", { className: "sheet__header", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "sheet__titles", children: [
          /* @__PURE__ */ a.jsx("h2", { children: t }),
          n ? /* @__PURE__ */ a.jsx("p", { children: n }) : null
        ] }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "icon-button", onClick: r, "aria-label": "Close", children: /* @__PURE__ */ a.jsx(G, { name: "close", size: 22 }) })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "sheet__body", children: l }),
      i ? /* @__PURE__ */ a.jsx("footer", { className: "sheet__footer", children: i }) : null
    ] })
  ] }) : null;
}
function wr({
  tone: e = "info",
  title: t,
  children: n,
  action: r
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: `banner banner--${e}`, children: [
    /* @__PURE__ */ a.jsx(
      G,
      {
        name: e === "info" ? "info" : e === "success" ? "check" : "alert",
        size: 20,
        className: "banner__icon"
      }
    ),
    /* @__PURE__ */ a.jsxs("div", { className: "banner__content", children: [
      t ? /* @__PURE__ */ a.jsx("strong", { children: t }) : null,
      n ? /* @__PURE__ */ a.jsx("div", { children: n }) : null
    ] }),
    r ? /* @__PURE__ */ a.jsx("div", { className: "banner__action", children: r }) : null
  ] });
}
function zs({ label: e }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "spinner", children: [
    /* @__PURE__ */ a.jsx(G, { name: "loading", size: 28, className: "spinner__icon" }),
    e ? /* @__PURE__ */ a.jsx("span", { children: e }) : null
  ] });
}
const O = (e, t, n) => t({ ...e, ...n }), ep = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/_/g, " "), _r = (e) => (e ?? []).map((t) => ({ value: t, label: ep(t) })), Q1 = ({ value: e, onChange: t }) => /* @__PURE__ */ a.jsx(R, { label: "Power", children: /* @__PURE__ */ a.jsx(
  en,
  {
    value: e.state === "on" ? "on" : "off",
    options: [
      { value: "off", label: "Off" },
      { value: "on", label: "On" }
    ],
    onChange: (n) => O(e, t, { state: n })
  }
) });
function tp({ entity: e, value: t, onChange: n }) {
  const r = k.useMemo(() => K1(e), [e]), l = t.state === "on", i = t.hs_color ? "color" : "temp", o = t.color_temp_kelvin ?? Math.round((r.minKelvin + r.maxKelvin) / 2), [s, u] = t.hs_color ?? [30, 80], c = l ? t.hs_color ? Ft(l1(s, u)) : t.color_temp_kelvin ? Ft(Ci(o)) : void 0 : void 0;
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    r.brightness ? /* @__PURE__ */ a.jsx(R, { label: "Brightness", children: /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: l ? Yu(t.brightness) : 0,
        min: 0,
        max: 100,
        accent: l ? c : void 0,
        onChange: (f) => f === 0 ? O(t, n, { state: "off" }) : O(t, n, {
          state: "on",
          brightness: T0(f)
        }),
        format: (f) => f === 0 ? "Off" : `${f}%`
      }
    ) }) : /* @__PURE__ */ a.jsx(Q1, { entity: e, value: t, onChange: n }),
    l && r.colorTemp && r.color ? /* @__PURE__ */ a.jsx(R, { label: "Color", children: /* @__PURE__ */ a.jsx(
      en,
      {
        value: i,
        options: [
          { value: "temp", label: "White" },
          { value: "color", label: "Color" }
        ],
        onChange: (f) => f === "temp" ? O(t, n, { hs_color: void 0, color_temp_kelvin: o }) : O(t, n, {
          color_temp_kelvin: void 0,
          hs_color: [s, u]
        })
      }
    ) }) : null,
    l && r.colorTemp && i === "temp" ? /* @__PURE__ */ a.jsx(R, { label: "Warmth", hint: `${r.minKelvin}–${r.maxKelvin}K`, children: /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: o,
        min: r.minKelvin,
        max: r.maxKelvin,
        step: 50,
        accent: Ft(Ci(o)),
        onChange: (f) => O(t, n, { color_temp_kelvin: f, hs_color: void 0 }),
        format: (f) => `${f}K`
      }
    ) }) : null,
    l && r.color && i === "color" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(R, { label: "Hue", children: /* @__PURE__ */ a.jsx(
        Ye,
        {
          value: s,
          min: 0,
          max: 360,
          accent: Ft(l1(s, 100)),
          onChange: (f) => O(t, n, {
            hs_color: [f, u],
            color_temp_kelvin: void 0
          }),
          format: (f) => `${Math.round(f)}°`
        }
      ) }),
      /* @__PURE__ */ a.jsx(R, { label: "Saturation", children: /* @__PURE__ */ a.jsx(
        Ye,
        {
          value: u,
          min: 0,
          max: 100,
          accent: Ft(l1(s, u)),
          onChange: (f) => O(t, n, { hs_color: [s, f], color_temp_kelvin: void 0 }),
          format: (f) => `${Math.round(f)}%`
        }
      ) })
    ] }) : null
  ] });
}
function np({ entity: e, value: t, onChange: n }) {
  const r = t.state === "on", l = e.attributes.preset_modes ?? [], i = q(e, Gn.SET_SPEED), o = e.attributes.percentage_step, s = o && o > 1 ? Math.round(100 / o) : 0, u = t.percentage ?? 100;
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    i ? /* @__PURE__ */ a.jsx(R, { label: "Speed", hint: s > 1 ? `${s} speeds` : void 0, children: s > 1 ? /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: r ? Math.max(1, Math.round(u / 100 * s)) : 0,
        min: 0,
        max: s,
        step: 1,
        onChange: (c) => c === 0 ? O(t, n, { state: "off" }) : O(t, n, {
          state: "on",
          percentage: Math.round(c / s * 100)
        }),
        format: (c) => c === 0 ? "Off" : `${c} of ${s}`
      }
    ) : /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: r ? Math.round(u) : 0,
        min: 0,
        max: 100,
        onChange: (c) => c === 0 ? O(t, n, { state: "off" }) : O(t, n, { state: "on", percentage: c }),
        format: (c) => c === 0 ? "Off" : `${c}%`
      }
    ) }) : /* @__PURE__ */ a.jsx(Q1, { entity: e, value: t, onChange: n }),
    r && q(e, Gn.PRESET_MODE) && l.length ? /* @__PURE__ */ a.jsx(R, { label: "Preset", children: /* @__PURE__ */ a.jsx(
      Nn,
      {
        value: t.preset_mode,
        options: _r(l),
        placeholder: "None",
        onChange: (c) => O(t, n, { preset_mode: c || void 0 })
      }
    ) }) : null,
    r && q(e, Gn.OSCILLATE) ? /* @__PURE__ */ a.jsx(R, { label: "Oscillate", children: /* @__PURE__ */ a.jsx(
      qu,
      {
        checked: !!t.oscillating,
        onChange: (c) => O(t, n, { oscillating: c }),
        label: "Oscillate"
      }
    ) }) : null,
    r && q(e, Gn.DIRECTION) ? /* @__PURE__ */ a.jsx(R, { label: "Direction", children: /* @__PURE__ */ a.jsx(
      en,
      {
        value: t.direction === "reverse" ? "reverse" : "forward",
        options: [
          { value: "forward", label: "Forward" },
          { value: "reverse", label: "Reverse" }
        ],
        onChange: (c) => O(t, n, { direction: c })
      }
    ) }) : null
  ] });
}
function rp({ entity: e, value: t, onChange: n }) {
  const r = q(e, vi.SET_POSITION), l = q(e, vi.SET_TILT_POSITION);
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    r ? /* @__PURE__ */ a.jsx(R, { label: "Position", hint: "0% closed, 100% open", children: /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: t.current_position ?? 100,
        min: 0,
        max: 100,
        onChange: (i) => O(t, n, {
          current_position: i,
          state: i > 0 ? "open" : "closed"
        }),
        format: (i) => i === 0 ? "Closed" : i === 100 ? "Open" : `${i}%`
      }
    ) }) : /* @__PURE__ */ a.jsx(R, { label: "Position", children: /* @__PURE__ */ a.jsx(
      en,
      {
        value: t.state === "closed" ? "closed" : "open",
        options: [
          { value: "closed", label: "Closed" },
          { value: "open", label: "Open" }
        ],
        onChange: (i) => O(t, n, { state: i })
      }
    ) }),
    l ? /* @__PURE__ */ a.jsx(R, { label: "Tilt", children: /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: t.current_tilt_position ?? 0,
        min: 0,
        max: 100,
        onChange: (i) => O(t, n, { current_tilt_position: i }),
        format: (i) => `${i}%`
      }
    ) }) : null
  ] });
}
function lp({ entity: e, value: t, onChange: n }) {
  const r = e.attributes.source_list ?? [], l = [];
  (q(e, Re.PLAY) || e.attributes.supported_features == null) && l.push({ value: "playing", label: "Play" }), q(e, Re.PAUSE) && l.push({ value: "paused", label: "Pause" }), q(e, Re.STOP) && l.push({ value: "idle", label: "Stop" }), q(e, Re.TURN_ON) && l.push({ value: "on", label: "On" }), q(e, Re.TURN_OFF) && l.push({ value: "off", label: "Off" }), l.length || l.push({ value: "playing", label: "Play" }, { value: "paused", label: "Pause" });
  const i = t.state === "off";
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(R, { label: "Playback", children: /* @__PURE__ */ a.jsx(
      en,
      {
        value: t.state,
        options: l,
        onChange: (o) => O(t, n, { state: o })
      }
    ) }),
    !i && q(e, Re.VOLUME_SET) ? /* @__PURE__ */ a.jsx(R, { label: "Volume", children: /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: Math.round((t.volume_level ?? 0.3) * 100),
        min: 0,
        max: 100,
        onChange: (o) => O(t, n, { volume_level: o / 100 }),
        format: (o) => `${o}%`
      }
    ) }) : null,
    !i && q(e, Re.VOLUME_MUTE) ? /* @__PURE__ */ a.jsx(R, { label: "Muted", children: /* @__PURE__ */ a.jsx(
      qu,
      {
        checked: !!t.is_volume_muted,
        onChange: (o) => O(t, n, { is_volume_muted: o }),
        label: "Muted"
      }
    ) }) : null,
    !i && q(e, Re.SELECT_SOURCE) && r.length ? /* @__PURE__ */ a.jsx(R, { label: "Source", children: /* @__PURE__ */ a.jsx(
      Nn,
      {
        value: t.source,
        options: r.map((o) => ({ value: o, label: o })),
        placeholder: "Leave as is",
        onChange: (o) => O(t, n, { source: o || void 0 })
      }
    ) }) : null
  ] });
}
function ip({ entity: e, value: t, onChange: n }) {
  const r = e.attributes.hvac_modes ?? [], l = e.attributes.min_temp ?? 7, i = e.attributes.max_temp ?? 35, o = e.attributes.target_temp_step ?? 0.5, s = e.attributes.temperature_unit ?? "°", u = e.attributes.fan_modes ?? [], c = t.state === "off";
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    r.length ? /* @__PURE__ */ a.jsx(R, { label: "Mode", children: /* @__PURE__ */ a.jsx(
      Nn,
      {
        value: t.state,
        options: _r(r),
        onChange: (f) => O(t, n, { state: f })
      }
    ) }) : null,
    !c && q(e, wl.TARGET_TEMPERATURE) ? /* @__PURE__ */ a.jsx(R, { label: "Temperature", children: /* @__PURE__ */ a.jsx(
      i1,
      {
        value: t.temperature ?? e.attributes.temperature ?? l,
        min: l,
        max: i,
        step: o,
        onChange: (f) => O(t, n, { temperature: f }),
        format: (f) => `${f}${s}`
      }
    ) }) : null,
    !c && q(e, wl.TARGET_TEMPERATURE_RANGE) ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(R, { label: "Heat to", children: /* @__PURE__ */ a.jsx(
        i1,
        {
          value: t.target_temp_low ?? l,
          min: l,
          max: i,
          step: o,
          onChange: (f) => O(t, n, { target_temp_low: f }),
          format: (f) => `${f}${s}`
        }
      ) }),
      /* @__PURE__ */ a.jsx(R, { label: "Cool to", children: /* @__PURE__ */ a.jsx(
        i1,
        {
          value: t.target_temp_high ?? i,
          min: l,
          max: i,
          step: o,
          onChange: (f) => O(t, n, { target_temp_high: f }),
          format: (f) => `${f}${s}`
        }
      ) })
    ] }) : null,
    !c && q(e, wl.FAN_MODE) && u.length ? /* @__PURE__ */ a.jsx(R, { label: "Fan", children: /* @__PURE__ */ a.jsx(
      Nn,
      {
        value: t.fan_mode,
        options: _r(u),
        placeholder: "Leave as is",
        onChange: (f) => O(t, n, { fan_mode: f || void 0 })
      }
    ) }) : null
  ] });
}
function op({ entity: e, value: t, onChange: n }) {
  const r = t.state === "on", l = e.attributes.available_modes ?? [];
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(Q1, { entity: e, value: t, onChange: n }),
    r ? /* @__PURE__ */ a.jsx(R, { label: "Humidity", children: /* @__PURE__ */ a.jsx(
      Ye,
      {
        value: t.humidity ?? e.attributes.min_humidity ?? 40,
        min: e.attributes.min_humidity ?? 0,
        max: e.attributes.max_humidity ?? 100,
        onChange: (i) => O(t, n, { humidity: i }),
        format: (i) => `${i}%`
      }
    ) }) : null,
    r && l.length ? /* @__PURE__ */ a.jsx(R, { label: "Mode", children: /* @__PURE__ */ a.jsx(
      Nn,
      {
        value: t.mode,
        options: _r(l),
        placeholder: "Leave as is",
        onChange: (i) => O(t, n, { mode: i || void 0 })
      }
    ) }) : null
  ] });
}
function sp({ entity: e, value: t, onChange: n }) {
  const r = e.attributes.operation_list ?? [], l = e.attributes.min_temp ?? 40, i = e.attributes.max_temp ?? 60;
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    r.length ? /* @__PURE__ */ a.jsx(R, { label: "Mode", children: /* @__PURE__ */ a.jsx(
      Nn,
      {
        value: t.state,
        options: _r(r),
        onChange: (o) => O(t, n, { state: o })
      }
    ) }) : null,
    /* @__PURE__ */ a.jsx(R, { label: "Temperature", children: /* @__PURE__ */ a.jsx(
      i1,
      {
        value: t.temperature ?? l,
        min: l,
        max: i,
        step: 1,
        onChange: (o) => O(t, n, { temperature: o }),
        format: (o) => `${o}°`
      }
    ) })
  ] });
}
function ap({ value: e, onChange: t }) {
  return /* @__PURE__ */ a.jsx(R, { label: "Lock", children: /* @__PURE__ */ a.jsx(
    en,
    {
      value: e.state === "unlocked" ? "unlocked" : "locked",
      options: [
        { value: "unlocked", label: "Unlocked" },
        { value: "locked", label: "Locked" }
      ],
      onChange: (n) => O(e, t, { state: n })
    }
  ) });
}
function up(e) {
  switch (e.entity.entity_id.split(".")[0]) {
    case "light":
      return /* @__PURE__ */ a.jsx(tp, { ...e });
    case "fan":
      return /* @__PURE__ */ a.jsx(np, { ...e });
    case "cover":
    case "valve":
      return /* @__PURE__ */ a.jsx(rp, { ...e });
    case "media_player":
      return /* @__PURE__ */ a.jsx(lp, { ...e });
    case "climate":
      return /* @__PURE__ */ a.jsx(ip, { ...e });
    case "humidifier":
      return /* @__PURE__ */ a.jsx(op, { ...e });
    case "water_heater":
      return /* @__PURE__ */ a.jsx(sp, { ...e });
    case "lock":
      return /* @__PURE__ */ a.jsx(ap, { ...e });
    default:
      return /* @__PURE__ */ a.jsx(Q1, { ...e });
  }
}
const cp = [
  { value: "all", label: "All" },
  { value: "light", label: "Lights" },
  { value: "fan", label: "Fans" },
  { value: "shade", label: "Shades" },
  { value: "media", label: "Media" },
  { value: "outlet", label: "Outlets" },
  { value: "switch", label: "Switches" },
  { value: "climate", label: "Climate" },
  { value: "lock", label: "Locks" },
  { value: "other", label: "Other" }
];
function dp({
  open: e,
  accessories: t,
  registries: n,
  selected: r,
  onToggle: l,
  onToggleMany: i,
  onClose: o
}) {
  const [s, u] = k.useState(""), [c, f] = k.useState("all"), h = k.useMemo(() => {
    const v = s.trim().toLowerCase(), C = t.filter((x) => c !== "all" && x.kind !== c ? !1 : v ? x.fullName.toLowerCase().includes(v) || x.entityId.toLowerCase().includes(v) : !0);
    return Xu(ho(C, n));
  }, [t, n, s, c]), g = k.useMemo(() => {
    const v = new Set(t.map((C) => C.kind));
    return cp.filter((C) => C.value === "all" || v.has(C.value));
  }, [t]);
  return /* @__PURE__ */ a.jsxs(
    E1,
    {
      open: e,
      title: "Add accessories",
      subtitle: `${r.size} selected`,
      onClose: o,
      footer: /* @__PURE__ */ a.jsx("button", { type: "button", className: "button button--block", onClick: o, children: "Done" }),
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "picker__controls", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "search", children: [
            /* @__PURE__ */ a.jsx(G, { name: "search", size: 20 }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "search",
                placeholder: "Search accessories",
                value: s,
                onChange: (v) => u(v.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ a.jsx("div", { className: "chips", children: g.map((v) => /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: `chip${c === v.value ? " chip--active" : ""}`,
              onClick: () => f(v.value),
              children: v.label
            },
            v.value
          )) })
        ] }),
        h.map((v) => /* @__PURE__ */ a.jsxs("section", { className: "picker__floor", children: [
          /* @__PURE__ */ a.jsxs("h3", { className: "picker__floor-title", children: [
            /* @__PURE__ */ a.jsx(Et, { name: v.icon, fallbackKind: "other", size: 18 }),
            v.name
          ] }),
          v.areas.map((C) => {
            const x = C.accessories.every(
              (j) => r.has(j.entityId)
            );
            return /* @__PURE__ */ a.jsxs("div", { className: "picker__area", children: [
              /* @__PURE__ */ a.jsxs("div", { className: "picker__area-head", children: [
                /* @__PURE__ */ a.jsx("h4", { children: C.name }),
                /* @__PURE__ */ a.jsx(
                  "button",
                  {
                    type: "button",
                    className: "button button--small button--ghost",
                    onClick: () => i(C.accessories, !x),
                    children: x ? "Clear" : "Select all"
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsx("ul", { className: "picker__list", children: C.accessories.map((j) => {
                const p = r.has(j.entityId);
                return /* @__PURE__ */ a.jsx("li", { children: /* @__PURE__ */ a.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `picker__row${p ? " picker__row--selected" : ""}`,
                    onClick: () => l(j),
                    "aria-pressed": p,
                    children: [
                      /* @__PURE__ */ a.jsx("span", { className: "picker__row-icon", children: /* @__PURE__ */ a.jsx(
                        Et,
                        {
                          name: j.entity.attributes.icon ?? Gu(j.entity, j.kind),
                          fallbackKind: j.kind,
                          size: 22
                        }
                      ) }),
                      /* @__PURE__ */ a.jsxs("span", { className: "picker__row-text", children: [
                        /* @__PURE__ */ a.jsx("strong", { children: j.name }),
                        /* @__PURE__ */ a.jsxs("small", { children: [
                          j.entityId,
                          j.available ? "" : " · offline"
                        ] })
                      ] }),
                      /* @__PURE__ */ a.jsx("span", { className: `checkmark${p ? " checkmark--on" : ""}`, children: p ? /* @__PURE__ */ a.jsx(G, { name: "check", size: 16 }) : null })
                    ]
                  }
                ) }, j.entityId);
              }) })
            ] }, `${v.floorId}-${C.areaId ?? "_none"}`);
          })
        ] }, v.floorId ?? "_none")),
        h.length ? null : /* @__PURE__ */ a.jsx("p", { className: "muted", children: "Nothing matches. Try a different filter, or check that the devices are assigned to areas in Home Assistant." })
      ]
    }
  );
}
function fp({
  accessory: e,
  value: t,
  onClick: n,
  onToggle: r
}) {
  const l = O0(e.entityId, t), i = e.domain === "light" ? B0(t) : null, o = /* @__PURE__ */ a.jsx(
    Et,
    {
      name: e.entity.attributes.icon ?? Gu(e.entity, e.kind),
      size: 26,
      fallbackKind: e.kind
    }
  );
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: `tile${l ? " tile--active" : ""}`,
      style: i ? { "--tile-tint": i } : void 0,
      children: [
        r ? /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "tile__icon tile__icon--toggle",
            onClick: r,
            "aria-pressed": l,
            "aria-label": `${Es(e.entityId, l)} ${e.fullName}`,
            title: Es(e.entityId, l),
            children: o
          }
        ) : /* @__PURE__ */ a.jsx("span", { className: "tile__icon", children: o }),
        /* @__PURE__ */ a.jsxs("button", { type: "button", className: "tile__body", onClick: n, title: e.fullName, children: [
          /* @__PURE__ */ a.jsx("strong", { className: "tile__name", children: e.name }),
          /* @__PURE__ */ a.jsx("small", { className: "tile__value", children: R0(e.entityId, t, e.entity) })
        ] }),
        e.available ? null : /* @__PURE__ */ a.jsx("span", { className: "tile__badge", children: "Offline" })
      ]
    }
  );
}
function pp({
  entityId: e,
  value: t,
  onRemove: n
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tile tile--missing", children: [
    /* @__PURE__ */ a.jsx("span", { className: "tile__icon", children: /* @__PURE__ */ a.jsx(Et, { fallbackKind: "other", size: 26 }) }),
    /* @__PURE__ */ a.jsxs("span", { className: "tile__text", children: [
      /* @__PURE__ */ a.jsx("strong", { className: "tile__name", children: e }),
      /* @__PURE__ */ a.jsxs("small", { className: "tile__value", children: [
        "Not in Home Assistant · ",
        t.state
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("button", { type: "button", className: "button button--small button--ghost", onClick: n, children: "Remove" })
  ] });
}
function mp({
  open: e,
  value: t,
  onClose: n,
  onChange: r
}) {
  const [l, i] = k.useState(""), [o, s] = k.useState(""), u = k.useMemo(() => {
    const h = l.trim().toLowerCase();
    if (!h) return X5;
    const g = Object.keys(jn).filter((v) => v.includes(h));
    return g.length ? [{ name: "Results", icons: g }] : [];
  }, [l]), c = (h) => {
    r(`mdi:${h}`), n();
  }, f = () => {
    const h = o.trim().replace(/^mdi:/, "");
    h && (r(`mdi:${h}`), n());
  };
  return /* @__PURE__ */ a.jsxs(
    E1,
    {
      open: e,
      title: "Choose an icon",
      subtitle: "Material Design Icons, the same set Home Assistant uses",
      onClose: n,
      footer: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "button button--ghost", onClick: () => {
          r(void 0), n();
        }, children: "No icon" }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "button", onClick: n, children: "Done" })
      ] }),
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "icon-picker__search", children: [
          /* @__PURE__ */ a.jsx(G, { name: "search", size: 20 }),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "search",
              value: l,
              placeholder: "Search all icons…",
              onChange: (h) => i(h.target.value),
              autoComplete: "off"
            }
          )
        ] }),
        u.map((h) => /* @__PURE__ */ a.jsxs("section", { className: "icon-picker__group", children: [
          /* @__PURE__ */ a.jsx("h3", { children: h.name }),
          /* @__PURE__ */ a.jsx("div", { className: "icon-picker__grid", children: h.icons.map((g) => /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              title: `mdi:${g}`,
              "aria-label": `mdi:${g}`,
              className: `icon-picker__item${t === `mdi:${g}` ? " icon-picker__item--active" : ""}`,
              onClick: () => c(g),
              children: /* @__PURE__ */ a.jsx(go, { path: jn[g], size: 26 })
            },
            g
          )) })
        ] }, h.name)),
        u.length ? null : /* @__PURE__ */ a.jsxs("p", { className: "muted", children: [
          "No bundled icon matches “",
          l,
          "”. Any valid MDI name still works — type it below."
        ] }),
        /* @__PURE__ */ a.jsxs("section", { className: "icon-picker__group", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "Use any MDI name" }),
          /* @__PURE__ */ a.jsxs("p", { className: "muted", children: [
            "Home Assistant ships the full Material Design Icons set. Browse it at",
            " ",
            /* @__PURE__ */ a.jsx("a", { href: "https://pictogrammers.com/library/mdi/", target: "_blank", rel: "noreferrer", children: "pictogrammers.com" }),
            " ",
            "and paste the name here — it will be saved even if this app cannot preview it."
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "icon-picker__custom", children: [
            /* @__PURE__ */ a.jsx("span", { className: "icon-picker__prefix", children: "mdi:" }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "text",
                value: o,
                placeholder: "washing-machine",
                onChange: (h) => s(h.target.value),
                onKeyDown: (h) => {
                  h.key === "Enter" && f();
                },
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ a.jsx("button", { type: "button", className: "button button--small", onClick: f, children: "Use" })
          ] })
        ] })
      ]
    }
  );
}
function hp({
  icon: e,
  onClick: t
}) {
  return /* @__PURE__ */ a.jsxs("button", { type: "button", className: "scene-icon-button", onClick: t, "aria-label": "Change icon", children: [
    /* @__PURE__ */ a.jsx(Et, { name: e, fallbackKind: "other", size: 28 }),
    /* @__PURE__ */ a.jsx("span", { className: "scene-icon-button__edit", children: /* @__PURE__ */ a.jsx(G, { name: "pencil", size: 12 }) })
  ] });
}
function gp({
  sceneId: e,
  initialConfig: t,
  accessories: n,
  registries: r,
  states: l,
  kindOverrides: i,
  onSetKindOverride: o,
  onSave: s,
  onDelete: u,
  onApply: c,
  onBack: f
}) {
  const [h, g] = k.useState(t?.name ?? ""), [v, C] = k.useState(t?.icon), [x, j] = k.useState(
    () => Object.fromEntries(
      Object.entries(t?.entities ?? {}).map(([M, K]) => [
        M,
        b0(K)
      ])
    )
  ), [p, d] = k.useState(!1), [m, y] = k.useState(!1), [w, S] = k.useState(!1), [V, A] = k.useState(null), [Z, z] = k.useState(!1), [ye, dt] = k.useState(!1), [We, Ee] = k.useState(null), [G1, ft] = k.useState(!1), Tt = k.useMemo(
    () => new Map(n.map((M) => [M.entityId, M])),
    [n]
  ), _ = k.useMemo(() => new Set(Object.keys(x)), [x]), E = k.useMemo(
    () => n.filter((M) => _.has(M.entityId)),
    [n, _]
  ), N = k.useMemo(
    () => Object.keys(x).filter((M) => !Tt.has(M)),
    [x, Tt]
  ), W = k.useMemo(
    () => Xu(ho(E, r)),
    [E, r]
  ), b = k.useCallback(
    (M) => {
      j(M), d(!0), Ee(null);
    },
    []
  ), tn = k.useCallback(
    (M) => {
      b((K) => {
        const U = { ...K };
        return U[M.entityId] ? delete U[M.entityId] : U[M.entityId] = M.available ? kl(M.entity) : js(M.entity), U;
      });
    },
    [b]
  ), qe = k.useCallback(
    (M, K) => {
      b((U) => {
        const bt = { ...U };
        for (const rn of M)
          K ? bt[rn.entityId] || (bt[rn.entityId] = rn.available ? kl(rn.entity) : js(rn.entity)) : delete bt[rn.entityId];
        return bt;
      });
    },
    [b]
  ), nn = k.useCallback(
    (M, K) => {
      b((U) => ({ ...U, [M]: K }));
    },
    [b]
  ), et = k.useCallback(
    (M) => {
      b((K) => {
        const U = K[M.entityId];
        if (!U) return K;
        const bt = As(M.entity, U);
        return bt ? { ...K, [M.entityId]: bt } : K;
      });
    },
    [b]
  ), Ot = k.useCallback(
    (M) => {
      b((K) => {
        const U = { ...K };
        return delete U[M], U;
      }), A(null);
    },
    [b]
  ), yo = k.useCallback(() => {
    const M = {
      name: h.trim(),
      entities: Object.fromEntries(
        Object.entries(x).map(([K, U]) => [
          K,
          I0(K, U)
        ])
      )
    };
    return v && (M.icon = v), M;
  }, [h, v, x]), nc = async () => {
    if (!h.trim()) {
      Ee({ tone: "error", text: "Give the scene a name before saving." });
      return;
    }
    if (!Object.keys(x).length) {
      Ee({ tone: "error", text: "Add at least one accessory before saving." });
      return;
    }
    z(!0), Ee(null);
    try {
      await s(yo()), d(!1), Ee({ tone: "success", text: "Saved to Home Assistant." });
    } catch (M) {
      Ee({ tone: "error", text: M instanceof Error ? M.message : String(M) });
    } finally {
      z(!1);
    }
  }, rc = async () => {
    dt(!0), Ee(null);
    try {
      await c(yo().entities), Ee({ tone: "success", text: "Applied to your home — this did not save anything." });
    } catch (M) {
      Ee({ tone: "error", text: M instanceof Error ? M.message : String(M) });
    } finally {
      dt(!1);
    }
  }, lc = () => {
    p && !window.confirm("Discard unsaved changes to this scene?") || f();
  }, pe = V ? Tt.get(V) : void 0, Co = V ? x[V] : void 0;
  return /* @__PURE__ */ a.jsxs("div", { className: "screen", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "topbar", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "icon-button", onClick: lc, "aria-label": "Back", children: /* @__PURE__ */ a.jsx(G, { name: "chevronLeft", size: 24 }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "topbar__main", children: [
        /* @__PURE__ */ a.jsx("h1", { children: e ? "Edit Scene" : "New Scene" }),
        /* @__PURE__ */ a.jsxs("p", { className: "topbar__subtitle", children: [
          Object.keys(x).length,
          " accessor",
          Object.keys(x).length === 1 ? "y" : "ies",
          p ? " · unsaved changes" : ""
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "topbar__actions", children: /* @__PURE__ */ a.jsx("button", { type: "button", className: "button", onClick: nc, disabled: Z, children: Z ? "Saving…" : "Save" }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "screen__body", children: [
      We ? /* @__PURE__ */ a.jsx(wr, { tone: We.tone, title: We.tone === "error" ? "Could not save" : void 0, children: We.text }) : null,
      /* @__PURE__ */ a.jsxs("section", { className: "card scene-identity", children: [
        /* @__PURE__ */ a.jsx(hp, { icon: v, onClick: () => S(!0) }),
        /* @__PURE__ */ a.jsxs("label", { className: "field field--flush", children: [
          /* @__PURE__ */ a.jsx("span", { className: "field__label", children: "Scene name" }),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "text",
              value: h,
              placeholder: "Movie Night",
              onChange: (M) => {
                g(M.target.value), d(!0);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "editor__actions", children: [
        /* @__PURE__ */ a.jsxs("button", { type: "button", className: "button button--block", onClick: () => y(!0), children: [
          /* @__PURE__ */ a.jsx(G, { name: "plus", size: 20 }),
          "Add accessories"
        ] }),
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            className: "button button--ghost button--block",
            onClick: rc,
            disabled: ye || !Object.keys(x).length,
            title: "Runs these settings on your home right now without saving",
            children: [
              /* @__PURE__ */ a.jsx(G, { name: "play", size: 20 }),
              ye ? "Applying…" : "Test"
            ]
          }
        )
      ] }),
      Object.keys(x).length ? null : /* @__PURE__ */ a.jsxs("div", { className: "empty", children: [
        /* @__PURE__ */ a.jsx(G, { name: "dotsGrid", size: 40 }),
        /* @__PURE__ */ a.jsx("h2", { children: "No accessories yet" }),
        /* @__PURE__ */ a.jsx("p", { children: "Add the lights, fans, shades and speakers this scene should control. Each one is captured at its current setting, then you can fine-tune it." })
      ] }),
      W.map((M) => /* @__PURE__ */ a.jsxs("section", { className: "section", children: [
        /* @__PURE__ */ a.jsxs("h2", { className: "section__title", children: [
          /* @__PURE__ */ a.jsx(Et, { name: M.icon, fallbackKind: "other", size: 18 }),
          M.name
        ] }),
        M.areas.map((K) => /* @__PURE__ */ a.jsxs("div", { className: "area", children: [
          /* @__PURE__ */ a.jsx("h3", { className: "area__title", children: K.name }),
          /* @__PURE__ */ a.jsx("div", { className: "tile-grid", children: K.accessories.map((U) => /* @__PURE__ */ a.jsx(
            fp,
            {
              accessory: U,
              value: x[U.entityId],
              onClick: () => A(U.entityId),
              onToggle: As(U.entity, x[U.entityId]) ? () => et(U) : void 0
            },
            U.entityId
          )) })
        ] }, `${M.floorId}-${K.areaId ?? "_none"}`))
      ] }, M.floorId ?? "_none")),
      N.length ? /* @__PURE__ */ a.jsxs("section", { className: "section", children: [
        /* @__PURE__ */ a.jsx("h2", { className: "section__title", children: "Unknown entities" }),
        /* @__PURE__ */ a.jsx("div", { className: "tile-grid", children: N.map((M) => /* @__PURE__ */ a.jsx(
          pp,
          {
            entityId: M,
            value: x[M],
            onRemove: () => Ot(M)
          },
          M
        )) })
      ] }) : null,
      e ? /* @__PURE__ */ a.jsx("div", { className: "danger-zone", children: /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          className: "button button--danger button--block",
          onClick: () => ft(!0),
          children: [
            /* @__PURE__ */ a.jsx(G, { name: "trash", size: 20 }),
            "Delete scene"
          ]
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ a.jsx(
      dp,
      {
        open: m,
        accessories: n,
        registries: r,
        selected: _,
        onToggle: tn,
        onToggleMany: qe,
        onClose: () => y(!1)
      }
    ),
    /* @__PURE__ */ a.jsx(
      mp,
      {
        open: w,
        value: v,
        onClose: () => S(!1),
        onChange: (M) => {
          C(M), d(!0);
        }
      }
    ),
    pe && Co ? /* @__PURE__ */ a.jsxs(
      E1,
      {
        open: !0,
        title: pe.fullName,
        subtitle: pe.entityId,
        onClose: () => A(null),
        footer: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "button button--ghost",
              onClick: () => Ot(pe.entityId),
              children: "Remove"
            }
          ),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "button", onClick: () => A(null), children: "Done" })
        ] }),
        children: [
          pe.available ? null : /* @__PURE__ */ a.jsx(wr, { tone: "warn", children: "This accessory is currently unavailable in Home Assistant, so its options come from the last information Home Assistant had about it." }),
          /* @__PURE__ */ a.jsx(
            up,
            {
              entity: l[pe.entityId] ?? pe.entity,
              value: Co,
              onChange: (M) => nn(pe.entityId, M)
            }
          ),
          /* @__PURE__ */ a.jsxs("div", { className: "sheet__extras", children: [
            /* @__PURE__ */ a.jsxs(
              "button",
              {
                type: "button",
                className: "button button--ghost button--block",
                onClick: () => {
                  const M = l[pe.entityId];
                  M && nn(pe.entityId, kl(M));
                },
                children: [
                  /* @__PURE__ */ a.jsx(G, { name: "camera", size: 20 }),
                  "Use current state"
                ]
              }
            ),
            z0(pe.entityId) ? /* @__PURE__ */ a.jsx(
              R,
              {
                label: "Treat as",
                hint: "Changes the icon and which filter this appears under",
                stacked: !0,
                children: /* @__PURE__ */ a.jsx(
                  en,
                  {
                    value: i[pe.entityId] ?? yi(pe.entity),
                    options: N0,
                    onChange: (M) => {
                      const K = yi(pe.entity);
                      o(
                        pe.entityId,
                        M === K ? null : M
                      );
                    }
                  }
                )
              }
            ) : null
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ a.jsx(
      E1,
      {
        open: G1,
        title: "Delete this scene?",
        onClose: () => ft(!1),
        footer: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "button button--ghost",
              onClick: () => ft(!1),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "button button--danger",
              onClick: async () => {
                ft(!1), await u();
              },
              children: "Delete"
            }
          )
        ] }),
        children: /* @__PURE__ */ a.jsxs("p", { children: [
          /* @__PURE__ */ a.jsx("strong", { children: h || "This scene" }),
          " will be removed from Home Assistant's",
          " ",
          /* @__PURE__ */ a.jsx("code", { children: "scenes.yaml" }),
          ". Anything that calls it — automations, dashboards, voice assistants — will stop working."
        ] })
      }
    )
  ] });
}
class It extends Error {
  constructor(t, n = "unknown", r) {
    super(t), this.detail = r, this.name = "HaError", this.kind = n;
  }
  /** A short machine-readable hint the UI uses to show targeted help. */
  kind;
}
function jt(e, t) {
  if (e instanceof It) return e;
  if (e && typeof e == "object") {
    const n = e, r = n.body?.message || n.message || n.error;
    if (n.status_code === 404) return new It("Not found.", "not-found");
    if (n.status_code === 401 || n.status_code === 403 || n.code === "unauthorized")
      return new It(
        "Home Assistant refused that request. Scene editing requires an administrator account.",
        "auth"
      );
    if (typeof n.status_code == "number")
      return new It(r || `Home Assistant returned ${n.status_code}.`, "server");
    if (r) return new It(r, "server");
  }
  return e instanceof Error ? new It(e.message || t, "unknown") : new It(t, "unknown", String(e));
}
async function Ps(e) {
  try {
    const [t, n, r, l] = await Promise.all([
      vp(e),
      e.callWS({ type: "config/area_registry/list" }),
      e.callWS({ type: "config/device_registry/list" }),
      e.callWS({ type: "config/entity_registry/list" })
    ]);
    return { floors: t, areas: n, devices: r, entities: l };
  } catch (t) {
    throw jt(t, "Could not read your Home Assistant registries.");
  }
}
async function vp(e) {
  try {
    return await e.callWS({ type: "config/floor_registry/list" });
  } catch {
    return [];
  }
}
class yp {
  constructor(t, n) {
    this.hass = t, this.panelState = n;
  }
  listeners = /* @__PURE__ */ new Set();
  /** Always the newest `hass`. Never destructure and hold onto the result. */
  get current() {
    return this.hass;
  }
  get panel() {
    return this.panelState;
  }
  update(t, n) {
    this.hass = t, this.panelState = n;
    for (const r of this.listeners) r();
  }
  subscribe(t) {
    return this.listeners.add(t), () => {
      this.listeners.delete(t);
    };
  }
}
const ec = k.createContext(null), Cp = ec.Provider;
function vo() {
  const e = k.useContext(ec);
  if (!e) throw new Error("useHassStore must be used inside the Scene Builder panel.");
  return e;
}
const tc = "ha-scene-builder.entity-kinds";
function xp(e, t) {
  try {
    const n = localStorage.getItem(e);
    return n ? JSON.parse(n) : t;
  } catch {
    return t;
  }
}
function Lp(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function wp() {
  return xp(tc, {});
}
function _p(e) {
  Lp(tc, e);
}
const kp = { floors: [], areas: [], devices: [], entities: [] }, Hp = 750;
function Vp() {
  const e = vo(), [t, n] = k.useState("loading"), [r, l] = k.useState(null), [i, o] = k.useState(() => e.current.states), [s, u] = k.useState(kp), [c, f] = k.useState(
    () => wp()
  );
  Mp(e, o), k.useEffect(() => {
    let d = !1;
    return (async () => {
      try {
        const m = await Ps(e.current);
        if (d) return;
        u(m), o(e.current.states), n("ready");
      } catch (m) {
        if (d) return;
        l(jt(m, "Could not read your Home Assistant registries.")), n("error");
      }
    })(), () => {
      d = !0;
    };
  }, [e]);
  const h = k.useCallback((d, m) => {
    f((y) => {
      const w = { ...y };
      return m ? w[d] = m : delete w[d], _p(w), w;
    });
  }, []), g = k.useMemo(() => Object.values(i), [i]), v = k.useMemo(
    () => Z0(g, s, c),
    [g, s, c]
  ), C = k.useMemo(
    () => ho(v, s),
    [v, s]
  ), x = k.useMemo(() => g.filter((d) => d.entity_id.startsWith("scene.")).map((d) => ({
    entity_id: d.entity_id,
    configId: d.attributes.id ? String(d.attributes.id) : null,
    name: d.attributes.friendly_name || d.entity_id,
    icon: d.attributes.icon ?? null,
    entityCount: (d.attributes.entity_id ?? []).length
  })).sort((d, m) => d.name.localeCompare(m.name)), [g]), j = k.useCallback(async () => {
    u(await Ps(e.current)), o(e.current.states);
  }, [e]), p = k.useCallback(
    async (d, m, y) => {
      try {
        return await e.current.callService(d, m, y);
      } catch (w) {
        throw jt(w, `Home Assistant refused ${d}.${m}.`);
      }
    },
    [e]
  );
  return {
    status: t,
    error: r,
    states: i,
    registries: s,
    accessories: v,
    floors: C,
    scenes: x,
    kindOverrides: c,
    setKindOverride: h,
    refresh: j,
    callService: p
  };
}
function Mp(e, t) {
  const n = k.useRef(null);
  k.useEffect(() => {
    const r = e.subscribe(() => {
      n.current == null && (n.current = window.setTimeout(() => {
        n.current = null, t(e.current.states);
      }, Hp));
    });
    return () => {
      r(), n.current != null && (clearTimeout(n.current), n.current = null);
    };
  }, [e, t]);
}
function Sp() {
  const e = vo(), [t, n] = k.useState(() => e.panel.narrow);
  return k.useEffect(() => e.subscribe(() => n(e.panel.narrow)), [e]), t;
}
function Ap() {
  const e = Sp(), t = k.useRef(null);
  return e ? /* @__PURE__ */ a.jsx(
    "button",
    {
      ref: t,
      type: "button",
      className: "icon-button topbar__menu",
      "aria-label": "Open Home Assistant sidebar",
      onClick: () => t.current?.dispatchEvent(
        new CustomEvent("hass-toggle-menu", { bubbles: !0, composed: !0 })
      ),
      children: /* @__PURE__ */ a.jsx(G, { name: "menu", size: 24 })
    }
  ) : null;
}
function Ep({
  scenes: e,
  onOpen: t,
  onCreate: n,
  onRefresh: r
}) {
  const [l, i] = k.useState(""), { editable: o, readOnly: s } = k.useMemo(() => {
    const u = l.trim().toLowerCase(), c = u ? e.filter((f) => f.name.toLowerCase().includes(u)) : e;
    return {
      editable: c.filter((f) => f.configId),
      readOnly: c.filter((f) => !f.configId)
    };
  }, [e, l]);
  return /* @__PURE__ */ a.jsxs("div", { className: "screen", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "topbar", children: [
      /* @__PURE__ */ a.jsx(Ap, {}),
      /* @__PURE__ */ a.jsxs("div", { className: "topbar__main", children: [
        /* @__PURE__ */ a.jsx("h1", { children: "Scenes" }),
        /* @__PURE__ */ a.jsxs("p", { className: "topbar__subtitle", children: [
          e.length,
          " scene",
          e.length === 1 ? "" : "s",
          " in Home Assistant"
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "topbar__actions", children: /* @__PURE__ */ a.jsx("button", { type: "button", className: "icon-button", onClick: r, "aria-label": "Refresh", children: /* @__PURE__ */ a.jsx(G, { name: "refresh", size: 22 }) }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "screen__body", children: [
      /* @__PURE__ */ a.jsxs("button", { type: "button", className: "new-scene", onClick: n, children: [
        /* @__PURE__ */ a.jsx("span", { className: "new-scene__icon", children: /* @__PURE__ */ a.jsx(G, { name: "plus", size: 24 }) }),
        /* @__PURE__ */ a.jsxs("span", { children: [
          /* @__PURE__ */ a.jsx("strong", { children: "New Scene" }),
          /* @__PURE__ */ a.jsx("small", { children: "Pick accessories and set how each one should look" })
        ] }),
        /* @__PURE__ */ a.jsx(G, { name: "chevronRight", size: 22 })
      ] }),
      e.length > 6 ? /* @__PURE__ */ a.jsxs("div", { className: "search", children: [
        /* @__PURE__ */ a.jsx(G, { name: "search", size: 20 }),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "search",
            placeholder: "Search scenes",
            value: l,
            onChange: (u) => i(u.target.value)
          }
        )
      ] }) : null,
      o.length ? /* @__PURE__ */ a.jsx("ul", { className: "scene-list", children: o.map((u) => /* @__PURE__ */ a.jsx("li", { children: /* @__PURE__ */ a.jsxs("button", { type: "button", className: "scene-row", onClick: () => t(u), children: [
        /* @__PURE__ */ a.jsx("span", { className: "scene-row__icon", children: /* @__PURE__ */ a.jsx(Et, { name: u.icon, fallbackKind: "other", size: 24 }) }),
        /* @__PURE__ */ a.jsxs("span", { className: "scene-row__text", children: [
          /* @__PURE__ */ a.jsx("strong", { children: u.name }),
          /* @__PURE__ */ a.jsxs("small", { children: [
            u.entityCount,
            " accessor",
            u.entityCount === 1 ? "y" : "ies"
          ] })
        ] }),
        /* @__PURE__ */ a.jsx(G, { name: "chevronRight", size: 22 })
      ] }) }, u.entity_id)) }) : null,
      e.length ? null : /* @__PURE__ */ a.jsxs(wr, { tone: "info", title: "No scenes yet", children: [
        "Create your first scene above. It will be written to Home Assistant's",
        " ",
        /* @__PURE__ */ a.jsx("code", { children: "scenes.yaml" }),
        ", exactly like scenes made in the Home Assistant UI."
      ] }),
      s.length ? /* @__PURE__ */ a.jsxs("section", { className: "section", children: [
        /* @__PURE__ */ a.jsx("h2", { className: "section__title", children: "Not editable" }),
        /* @__PURE__ */ a.jsxs("p", { className: "muted section__note", children: [
          "These scenes are defined in YAML without an ",
          /* @__PURE__ */ a.jsx("code", { children: "id" }),
          ", so Home Assistant's own editor cannot change them either. Add an ",
          /* @__PURE__ */ a.jsx("code", { children: "id" }),
          " to make them editable."
        ] }),
        /* @__PURE__ */ a.jsx("ul", { className: "scene-list scene-list--muted", children: s.map((u) => /* @__PURE__ */ a.jsx("li", { children: /* @__PURE__ */ a.jsxs("div", { className: "scene-row scene-row--static", children: [
          /* @__PURE__ */ a.jsx("span", { className: "scene-row__icon", children: /* @__PURE__ */ a.jsx(Et, { name: u.icon, fallbackKind: "other", size: 24 }) }),
          /* @__PURE__ */ a.jsxs("span", { className: "scene-row__text", children: [
            /* @__PURE__ */ a.jsx("strong", { children: u.name }),
            /* @__PURE__ */ a.jsx("small", { children: u.entity_id })
          ] })
        ] }) }, u.entity_id)) })
      ] }) : null
    ] })
  ] });
}
async function jp(e, t) {
  try {
    return await e.callApi(
      "GET",
      `config/scene/config/${encodeURIComponent(t)}`
    );
  } catch (n) {
    const r = jt(n, "Could not load that scene.");
    if (r.kind === "not-found") return null;
    throw r;
  }
}
async function Np(e, t, n) {
  const { id: r, ...l } = n;
  try {
    await e.callApi(
      "POST",
      `config/scene/config/${encodeURIComponent(t)}`,
      l
    );
  } catch (i) {
    throw jt(i, "Could not save that scene.");
  }
}
async function zp(e, t) {
  try {
    await e.callApi("DELETE", `config/scene/config/${encodeURIComponent(t)}`);
  } catch (n) {
    const r = jt(n, "Could not delete that scene.");
    if (r.kind === "not-found") return;
    throw r;
  }
}
function Pp() {
  return Date.now().toString();
}
function Tp() {
  const e = vo(), [t, n] = k.useState({ name: "list" }), [r, l] = k.useState(null), [i, o] = k.useState(null), [s, u] = k.useState(0), c = Vp(), f = k.useCallback(
    async (g) => {
      if (g.configId) {
        l("Loading scene…"), o(null);
        try {
          const v = await jp(e.current, g.configId);
          u((C) => C + 1), n({
            name: "editor",
            sceneId: g.configId,
            config: v ?? { name: g.name, icon: g.icon ?? void 0, entities: {} }
          });
        } catch (v) {
          o(jt(v, "Could not load that scene."));
        } finally {
          l(null);
        }
      }
    },
    [e]
  ), h = k.useCallback(
    async (g, v) => {
      const C = g ?? Pp();
      await Np(e.current, C, v);
      try {
        await c.callService("scene", "reload");
      } catch {
      }
      return await c.refresh(), C;
    },
    [e, c]
  );
  return c.status === "error" ? /* @__PURE__ */ a.jsx("div", { className: "screen screen--center", children: /* @__PURE__ */ a.jsx(wr, { tone: "error", title: "Could not reach Home Assistant", children: c.error?.message ?? "Something went wrong reading your devices." }) }) : c.status === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "screen screen--center", children: /* @__PURE__ */ a.jsx(zs, { label: "Loading your home…" }) }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    r ? /* @__PURE__ */ a.jsx("div", { className: "overlay", children: /* @__PURE__ */ a.jsx(zs, { label: r }) }) : null,
    i ? /* @__PURE__ */ a.jsx("div", { className: "floating-banner", children: /* @__PURE__ */ a.jsx(
      wr,
      {
        tone: "error",
        title: "Something went wrong",
        action: /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "icon-button",
            onClick: () => o(null),
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ a.jsx(G, { name: "close", size: 20 })
          }
        ),
        children: i.message
      }
    ) }) : null,
    t.name === "list" ? /* @__PURE__ */ a.jsx(
      Ep,
      {
        scenes: c.scenes,
        onOpen: f,
        onCreate: () => {
          u((g) => g + 1), n({ name: "editor", sceneId: null, config: null });
        },
        onRefresh: () => c.refresh()
      }
    ) : null,
    t.name === "editor" ? /* @__PURE__ */ a.jsx(
      gp,
      {
        sceneId: t.sceneId,
        initialConfig: t.config,
        accessories: c.accessories,
        registries: c.registries,
        states: c.states,
        kindOverrides: c.kindOverrides,
        onSetKindOverride: c.setKindOverride,
        onSave: async (g) => {
          const v = await h(t.sceneId, g);
          n({ name: "editor", sceneId: v, config: g });
        },
        onDelete: async () => {
          if (t.sceneId) {
            l("Deleting…");
            try {
              await zp(e.current, t.sceneId), await c.refresh(), n({ name: "list" });
            } catch (g) {
              o(jt(g, "Could not delete that scene."));
            } finally {
              l(null);
            }
          }
        },
        onApply: async (g) => {
          await c.callService("scene", "apply", { entities: g });
        },
        onBack: () => n({ name: "list" })
      },
      s
    ) : null
  ] });
}
const Op = ':host{display:block;--bg: #f2f2f7;--bg-elevated: #ffffff;--bg-sunken: #e9e9ef;--text: #11111a;--text-muted: #6b6b76;--text-faint: #9a9aa4;--line: rgba(60, 60, 67, .14);--line-strong: rgba(60, 60, 67, .26);--accent: #f0a500;--accent-text: #1a1a1a;--tile-tint: #f0a500;--danger: #e5484d;--success: #1a9c5a;--warn: #b7791f;--info: #2f6fed;--radius-sm: 10px;--radius: 16px;--radius-lg: 22px;--shadow: 0 1px 2px rgba(16, 16, 24, .06), 0 8px 24px rgba(16, 16, 24, .06);--shadow-lifted: 0 12px 40px rgba(16, 16, 24, .18);--safe-top: env(safe-area-inset-top, 0px);--safe-bottom: env(safe-area-inset-bottom, 0px);color-scheme:light;margin:0;padding:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,SF Pro Text,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.45;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}:host([data-theme="dark"]){color-scheme:dark;--bg: #000000;--bg-elevated: #1c1c1e;--bg-sunken: #2c2c2e;--text: #f5f5f7;--text-muted: #9a9aa4;--text-faint: #6e6e76;--line: rgba(235, 235, 245, .14);--line-strong: rgba(235, 235, 245, .26);--accent: #ffb62e;--accent-text: #1a1200;--danger: #ff6369;--success: #35c27a;--warn: #e3a33a;--info: #6ea0ff;--shadow: 0 1px 2px rgba(0, 0, 0, .5), 0 8px 24px rgba(0, 0, 0, .45);--shadow-lifted: 0 12px 40px rgba(0, 0, 0, .6)}*{box-sizing:border-box}h1,h2,h3,h4{margin:0;font-weight:650;letter-spacing:-.01em}p{margin:0 0 .75em}p:last-child{margin-bottom:0}a{color:var(--info)}code{font-family:ui-monospace,SF Mono,SFMono-Regular,Menlo,monospace;font-size:.88em;background:var(--bg-sunken);padding:.12em .4em;border-radius:5px}pre{font-family:ui-monospace,SF Mono,SFMono-Regular,Menlo,monospace;font-size:13px;background:var(--bg-sunken);padding:12px 14px;border-radius:var(--radius-sm);overflow-x:auto;margin:0 0 8px}.muted{color:var(--text-muted);font-size:14px}.screen{min-height:100dvh;padding-bottom:calc(32px + var(--safe-bottom))}.screen--center{display:grid;place-items:center}.screen__body{max-width:900px;margin:0 auto;padding:16px;display:flex;flex-direction:column;gap:20px}.topbar{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:10px;padding:calc(10px + var(--safe-top)) 16px 10px;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid var(--line)}.topbar__main{flex:1;min-width:0}.topbar__main h1{font-size:20px;line-height:1.2}.topbar__subtitle{margin:2px 0 0;font-size:13px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.topbar__actions{display:flex;align-items:center;gap:6px}.topbar__menu{margin-left:-6px;flex:none}.section{display:flex;flex-direction:column;gap:12px}.section__title{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:650;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)}.section__note{margin-top:-6px}.area{display:flex;flex-direction:column;gap:8px}.area__title{font-size:15px;font-weight:600;color:var(--text)}.card{background:var(--bg-elevated);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px}.button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 18px;border:none;border-radius:999px;background:var(--accent);color:var(--accent-text);font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;transition:opacity .15s ease,transform .05s ease}.button:active{transform:scale(.98)}.button:disabled{opacity:.45;cursor:default}.button--ghost{background:var(--bg-sunken);color:var(--text)}.button--quiet{background:transparent;color:var(--text-muted)}.button--danger{background:var(--danger);color:#fff}.button--block{width:100%}.button--small{min-height:32px;padding:0 12px;font-size:13px}.icon-button{display:inline-grid;place-items:center;width:40px;height:40px;border:none;border-radius:50%;background:transparent;color:var(--text);cursor:pointer;flex:none}.icon-button:hover{background:var(--bg-sunken)}.field{display:flex;flex-direction:column;gap:6px}.field__label{font-size:13px;font-weight:600;color:var(--text-muted)}.field__hint{font-size:12.5px;color:var(--text-faint)}.field--flush{flex:1;min-width:0}input[type=text],input[type=password],input[type=search],input[type=url],select{width:100%;min-height:44px;padding:10px 14px;border:1px solid var(--line);border-radius:var(--radius-sm);background:var(--bg-elevated);color:var(--text);font-size:16px;font-family:inherit}input:focus-visible,select:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--info);outline-offset:2px}.field__with-button{position:relative;display:flex;align-items:center;gap:4px}.field__with-button input{padding-right:48px}.field__with-button .icon-button{position:absolute;right:4px}.search{display:flex;align-items:center;gap:8px;padding:0 12px;background:var(--bg-sunken);border-radius:var(--radius-sm);color:var(--text-muted)}.search input{border:none;background:transparent;padding-left:0;min-height:42px}.search input:focus-visible{outline:none}.select{position:relative;display:flex;align-items:center;min-width:150px}.select select{appearance:none;padding-right:38px}.select svg{position:absolute;right:12px;pointer-events:none;color:var(--text-muted)}.row{display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--line)}.row:last-child{border-bottom:none}.row--stacked{flex-direction:column;align-items:stretch;gap:10px}.row__label{display:flex;flex-direction:column;font-size:15px;font-weight:550;flex:none;min-width:92px}.row--stacked .row__label{min-width:0}.row__hint{font-size:12.5px;font-weight:400;color:var(--text-faint)}.row__control{flex:1;display:flex;justify-content:flex-end;min-width:0}.row--stacked .row__control{justify-content:stretch}.toggle{position:relative;width:52px;height:32px;border:none;border-radius:999px;background:var(--line-strong);cursor:pointer;transition:background .2s ease;flex:none}.toggle--on{background:var(--success)}.toggle__knob{position:absolute;top:3px;left:3px;width:26px;height:26px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #0000004d;transition:transform .2s ease}.toggle--on .toggle__knob{transform:translate(20px)}.slider{display:flex;align-items:center;gap:12px;width:100%;--slider-accent: var(--accent)}.slider input[type=range]{flex:1;min-width:0;appearance:none;height:34px;background:transparent;cursor:pointer}.slider input[type=range]::-webkit-slider-runnable-track{height:34px;border-radius:999px;background:linear-gradient(to right,var(--slider-accent) 0 var(--fill),var(--bg-sunken) var(--fill) 100%)}.slider input[type=range]::-moz-range-track{height:34px;border-radius:999px;background:linear-gradient(to right,var(--slider-accent) 0 var(--fill),var(--bg-sunken) var(--fill) 100%)}.slider input[type=range]::-webkit-slider-thumb{appearance:none;width:6px;height:20px;margin-top:7px;border-radius:3px;background:#fff;border:none;box-shadow:0 1px 3px #0006}.slider input[type=range]::-moz-range-thumb{width:6px;height:20px;border-radius:3px;background:#fff;border:none;box-shadow:0 1px 3px #0006}.slider__value{flex:none;min-width:66px;text-align:right;font-size:14px;font-variant-numeric:tabular-nums;color:var(--text-muted)}.segmented{display:inline-flex;padding:3px;gap:2px;background:var(--bg-sunken);border-radius:12px;max-width:100%;overflow-x:auto;scrollbar-width:none}.segmented::-webkit-scrollbar{display:none}.segmented__item{flex:1;min-height:34px;padding:0 14px;border:none;border-radius:9px;background:transparent;color:var(--text-muted);font-size:14px;font-weight:550;font-family:inherit;white-space:nowrap;cursor:pointer}.segmented__item--active{background:var(--bg-elevated);color:var(--text);box-shadow:0 1px 3px #00000024}.stepper{display:inline-flex;align-items:center;gap:4px;background:var(--bg-sunken);border-radius:12px;padding:3px}.stepper button{display:grid;place-items:center;width:38px;height:34px;border:none;border-radius:9px;background:var(--bg-elevated);color:var(--text);cursor:pointer}.stepper button:disabled{opacity:.4;cursor:default}.stepper__value{min-width:66px;text-align:center;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}.chips::-webkit-scrollbar{display:none}.chip{flex:none;min-height:34px;padding:0 14px;border:1px solid var(--line);border-radius:999px;background:var(--bg-elevated);color:var(--text-muted);font-size:14px;font-family:inherit;cursor:pointer}.chip--active{background:var(--text);border-color:var(--text);color:var(--bg-elevated)}.new-scene{display:flex;align-items:center;gap:14px;width:100%;padding:14px;border:none;border-radius:var(--radius);background:var(--bg-elevated);box-shadow:var(--shadow);color:var(--text);text-align:left;font-family:inherit;cursor:pointer}.new-scene__icon{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:var(--accent);color:var(--accent-text);flex:none}.new-scene span strong{display:block;font-size:16px}.new-scene span small,.scene-row__text small{display:block;font-size:13px;color:var(--text-muted)}.new-scene>span:nth-child(2){flex:1;min-width:0}.scene-list{list-style:none;margin:0;padding:0;background:var(--bg-elevated);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden}.scene-list li+li .scene-row{border-top:1px solid var(--line)}.scene-list--muted{opacity:.65}.scene-row{display:flex;align-items:center;gap:14px;width:100%;padding:12px 14px;border:none;background:transparent;color:var(--text);text-align:left;font-family:inherit;font-size:16px;cursor:pointer}.scene-row:hover{background:var(--bg-sunken)}.scene-row--static{cursor:default}.scene-row--static:hover{background:transparent}.scene-row__icon{display:grid;place-items:center;width:40px;height:40px;border-radius:11px;background:var(--bg-sunken);color:var(--text);flex:none}.scene-row__text{flex:1;min-width:0}.scene-row__text strong{display:block;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.scene-identity{display:flex;align-items:center;gap:14px}.scene-icon-button{position:relative;display:grid;place-items:center;width:56px;height:56px;flex:none;border:none;border-radius:16px;background:var(--accent);color:var(--accent-text);cursor:pointer}.scene-icon-button__edit{position:absolute;right:-3px;bottom:-3px;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--bg-elevated);color:var(--text-muted);box-shadow:0 1px 3px #00000040}.editor__actions{display:grid;grid-template-columns:1fr;gap:10px}@media (min-width: 560px){.editor__actions{grid-template-columns:1fr auto}}.tile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}@media (min-width: 560px){.tile-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}}.tile{position:relative;display:flex;align-items:center;gap:10px;padding:12px;min-height:68px;border:none;border-radius:var(--radius);background:var(--bg-elevated);box-shadow:var(--shadow);color:var(--text);text-align:left;font-family:inherit}.tile__body{display:flex;flex-direction:column;gap:1px;flex:1;min-width:0;padding:0;border:none;background:transparent;color:inherit;text-align:left;font-family:inherit;cursor:pointer;transition:transform .05s ease}.tile__body:active{transform:scale(.985)}.tile__icon{display:grid;place-items:center;width:44px;height:44px;padding:0;border-radius:50%;background:var(--bg-sunken);color:var(--text-muted);flex:none;transition:background .2s ease,color .2s ease,box-shadow .15s ease,transform .05s ease}.tile__icon--toggle{border:none;font-family:inherit;cursor:pointer}.tile__icon--toggle:hover{box-shadow:0 0 0 3px var(--line)}.tile__icon--toggle:active{transform:scale(.92)}.tile--active .tile__icon{background:var(--tile-tint);color:#241a00}.tile__text{min-width:0;flex:1}.tile__name{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:15px;font-weight:550;line-height:1.25;overflow:hidden;overflow-wrap:anywhere}.tile__value{display:block;font-size:13px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile__badge{position:absolute;top:6px;right:8px;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--warn)}.tile--missing{cursor:default;opacity:.8;flex-wrap:wrap}.empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:40px 24px;text-align:center;color:var(--text-muted)}.empty h2{font-size:17px;color:var(--text)}.empty p{max-width:40ch;font-size:14px}.danger-zone{margin-top:12px}.sheet{position:fixed;inset:0;z-index:100;display:flex;align-items:flex-end;justify-content:center}.sheet__backdrop{position:absolute;inset:0;background:#0006;animation:fade-in .2s ease}.sheet__panel{position:relative;width:100%;max-height:92dvh;display:flex;flex-direction:column;background:var(--bg);border-radius:var(--radius-lg) var(--radius-lg) 0 0;box-shadow:var(--shadow-lifted);animation:slide-up .25s cubic-bezier(.32,.72,0,1);outline:none}.sheet__grabber{width:38px;height:5px;margin:8px auto 0;border-radius:999px;background:var(--line-strong);flex:none}.sheet__header{display:flex;align-items:flex-start;gap:12px;padding:12px 16px;border-bottom:1px solid var(--line)}.sheet__titles{flex:1;min-width:0}.sheet__titles h2{font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sheet__titles p{margin:2px 0 0;font-size:13px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sheet__body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:4px 16px 16px}.sheet__footer{display:flex;gap:10px;justify-content:flex-end;padding:12px 16px calc(12px + var(--safe-bottom));border-top:1px solid var(--line);background:var(--bg-elevated)}.sheet__extras{margin-top:18px;padding-top:14px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:12px}@media (min-width: 700px){.sheet{align-items:center;padding:24px}.sheet__panel{max-width:620px;max-height:86dvh;border-radius:var(--radius-lg);animation:pop-in .2s cubic-bezier(.32,.72,0,1)}.sheet__grabber{display:none}.sheet__header{padding-top:16px}}@keyframes fade-in{0%{opacity:0}}@keyframes slide-up{0%{transform:translateY(100%)}}@keyframes pop-in{0%{transform:scale(.96);opacity:0}}.picker__controls{position:sticky;top:0;z-index:2;display:flex;flex-direction:column;gap:10px;padding:8px 0 10px;background:var(--bg)}.picker__floor{margin-top:18px}.picker__floor-title{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:650;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:8px}.picker__area{margin-bottom:14px}.picker__area-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px}.picker__area-head h4{font-size:15px}.picker__list{list-style:none;margin:0;padding:0;background:var(--bg-elevated);border-radius:var(--radius);overflow:hidden}.picker__list li+li .picker__row{border-top:1px solid var(--line)}.picker__row{display:flex;align-items:center;gap:12px;width:100%;padding:10px 12px;border:none;background:transparent;color:var(--text);text-align:left;font-family:inherit;cursor:pointer}.picker__row:hover{background:var(--bg-sunken)}.picker__row-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--bg-sunken);color:var(--text-muted);flex:none}.picker__row--selected .picker__row-icon{background:var(--accent);color:var(--accent-text)}.picker__row-text{flex:1;min-width:0}.picker__row-text strong{display:block;font-size:15px;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.picker__row-text small{display:block;font-size:12px;color:var(--text-faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.checkmark{display:grid;place-items:center;width:24px;height:24px;border:1.5px solid var(--line-strong);border-radius:50%;color:#fff;flex:none}.checkmark--on{background:var(--success);border-color:var(--success)}.icon-picker__search{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:8px;padding:8px 12px;margin:8px 0 4px;background:var(--bg-sunken);border-radius:var(--radius-sm);color:var(--text-muted)}.icon-picker__search input{border:none;background:transparent;padding:0;min-height:34px}.icon-picker__search input:focus-visible{outline:none}.icon-picker__group{margin-top:16px}.icon-picker__group h3{font-size:13px;font-weight:650;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:8px}.icon-picker__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:6px}.icon-picker__item{display:grid;place-items:center;aspect-ratio:1;border:1px solid transparent;border-radius:12px;background:var(--bg-elevated);color:var(--text);cursor:pointer}.icon-picker__item:hover{background:var(--bg-sunken)}.icon-picker__item--active{background:var(--accent);color:var(--accent-text);border-color:var(--accent)}.icon-picker__custom{display:flex;align-items:center;gap:8px}.icon-picker__prefix{font-family:ui-monospace,SF Mono,SFMono-Regular,Menlo,monospace;font-size:14px;color:var(--text-muted)}.setup{min-height:100dvh;display:flex;align-items:flex-start;justify-content:center;padding:calc(24px + var(--safe-top)) 16px calc(40px + var(--safe-bottom))}.setup__card{width:100%;max-width:560px;display:flex;flex-direction:column;gap:16px}.setup__header h1{font-size:28px}.setup__header p{margin:4px 0 0;color:var(--text-muted)}.setup__form{display:flex;flex-direction:column;gap:16px;padding:18px;background:var(--bg-elevated);border-radius:var(--radius);box-shadow:var(--shadow)}.setup__actions{display:flex;align-items:center;gap:10px}.setup__spacer{flex:1}.disclosure{background:var(--bg-elevated);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden}.disclosure summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;font-size:15px;font-weight:600;cursor:pointer;list-style:none;color:var(--text)}.disclosure summary::-webkit-details-marker{display:none}.disclosure[open] summary svg{transform:rotate(180deg)}.disclosure summary svg{color:var(--text-muted);transition:transform .2s ease;flex:none}.disclosure__body{padding:0 16px 16px;font-size:14.5px;color:var(--text)}.disclosure__body ol{margin:0 0 12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}.copy-block{position:relative;margin-bottom:10px}.copy-block .button{position:absolute;top:8px;right:8px}.banner{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:var(--radius);background:var(--bg-elevated);border-left:4px solid var(--info);box-shadow:var(--shadow);font-size:14.5px}.banner--warn{border-left-color:var(--warn)}.banner--error{border-left-color:var(--danger)}.banner--success{border-left-color:var(--success)}.banner__icon{flex:none;margin-top:1px;color:var(--info)}.banner--warn .banner__icon{color:var(--warn)}.banner--error .banner__icon{color:var(--danger)}.banner--success .banner__icon{color:var(--success)}.banner__content{flex:1;min-width:0}.banner__content strong{display:block;margin-bottom:2px}.banner__content pre{margin-top:8px}.banner__action{flex:none}.floating-banner{position:fixed;left:50%;bottom:calc(16px + var(--safe-bottom));transform:translate(-50%);z-index:90;width:min(560px,calc(100vw - 32px))}.overlay{position:fixed;inset:0;z-index:120;display:grid;place-items:center;background:#00000059;backdrop-filter:blur(2px)}.spinner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 24px;border-radius:var(--radius);background:var(--bg-elevated);box-shadow:var(--shadow);color:var(--text-muted);font-size:14px}.spinner__icon{animation:spin 1s linear infinite;color:var(--accent)}@keyframes spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.spinner__icon{animation:spin 1.4s linear infinite!important}}', Ts = "scene-builder-panel";
class bp extends HTMLElement {
  root = null;
  mountPoint = null;
  store = null;
  _hass = null;
  _narrow = !1;
  set hass(t) {
    this._hass = t, t && this.setAttribute("data-theme", t.themes?.darkMode ? "dark" : "light"), this.publish();
  }
  get hass() {
    return this._hass;
  }
  set narrow(t) {
    this._narrow = !!t, this.publish();
  }
  get narrow() {
    return this._narrow;
  }
  connectedCallback() {
    this.replayUpgradedProperties();
    const t = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    !t.adoptedStyleSheets?.length && !t.querySelector("style") && Ip(t, Op), this.mountPoint = document.createElement("div"), t.appendChild(this.mountPoint), this.mount();
  }
  disconnectedCallback() {
    const t = this.root, n = this.mountPoint;
    this.root = null, this.store = null, this.mountPoint = null, n?.remove(), t && setTimeout(() => t.unmount(), 0);
  }
  /**
   * If the frontend assigned these before this module finished loading, the
   * values landed as own properties shadowing the accessors above. Replaying
   * them through the setters is the standard custom-element upgrade dance.
   */
  replayUpgradedProperties() {
    const t = this;
    if (Object.prototype.hasOwnProperty.call(this, "hass")) {
      const n = t.hass;
      delete t.hass, this.hass = n;
    }
    if (Object.prototype.hasOwnProperty.call(this, "narrow")) {
      const n = t.narrow;
      delete t.narrow, this.narrow = n;
    }
  }
  publish() {
    if (this.store && this._hass) {
      this.store.update(this._hass, { narrow: this._narrow });
      return;
    }
    this.mount();
  }
  mount() {
    if (this.root || !this._hass || !this.mountPoint) return;
    const t = { narrow: this._narrow };
    this.store = new yp(this._hass, t), this.root = Qu(this.mountPoint), this.root.render(
      /* @__PURE__ */ a.jsx(k.StrictMode, { children: /* @__PURE__ */ a.jsx(Cp, { value: this.store, children: /* @__PURE__ */ a.jsx(Tp, {}) }) })
    );
  }
}
function Ip(e, t) {
  if ("adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype) {
    const r = new CSSStyleSheet();
    r.replaceSync(t), e.adoptedStyleSheets = [r];
    return;
  }
  const n = document.createElement("style");
  n.textContent = t, e.appendChild(n);
}
customElements.get(Ts) || customElements.define(Ts, bp);
