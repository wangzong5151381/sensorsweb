window.ccqc = (function (e, t) {
  return t();
})(this, function () {
  function e(e) {
    if (!e) return !1;
    var t = Object.prototype.toString.call(e);
    return "[object Function]" == t || "[object AsyncFunction]" == t;
  }
  function t() {
    return Date.now && e(Date.now) ? Date.now() : new Date().getTime();
  }
  function r(e) {
    return null != e && "[object Object]" == Object.prototype.toString.call(e);
  }
  function n() {
    if ("function" == typeof Uint32Array) {
      var e = "";
      if (("undefined" != typeof crypto ? (e = crypto) : "undefined" != typeof msCrypto && (e = msCrypto), r(e) && e.getRandomValues)) {
        var t = new Uint32Array(1),
          n = e.getRandomValues(t)[0],
          i = Math.pow(2, 32);
        return n / i;
      }
    }
    return lr(1e19) / 1e19;
  }
  function i(e) {
    var t = null;
    try {
      t = JSON.parse(e);
    } catch (r) {}
    return t;
  }
  function a(e, t) {
    (this.lockGetPrefix = e || "lock-get-prefix"), (this.lockSetPrefix = t || "lock-set-prefix");
  }
  function s(e) {
    return "function" == typeof e || (!(!e || "object" != typeof e) && s(e.listener));
  }
  function c() {
    this._events = {};
  }
  function l(e) {
    var t = e;
    try {
      t = decodeURIComponent(e);
    } catch (r) {
      t = e;
    }
    return t;
  }
  function u(e) {
    e = e || "";
    for (var t = {}, r = e.substring(1), n = r.split("&"), i = 0; i < n.length; i++) {
      var a = n[i].indexOf("=");
      if (a !== -1) {
        var o = n[i].substring(0, a),
          s = n[i].substring(a + 1);
        (o = l(o)), (s = l(s)), (t[o] = s);
      }
    }
    return t;
  }
  function p(e) {
    return "[object String]" == Object.prototype.toString.call(e);
  }
  function d(e) {
    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }
  function f(e) {
    var t = function (e) {
      (this._fields = { Username: 4, Password: 5, Port: 7, Protocol: 2, Host: 6, Path: 8, URL: 0, QueryString: 9, Fragment: 10 }),
        (this._values = {}),
        (this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/),
        "undefined" != typeof e && this._parse(e);
    };
    return (
      (t.prototype.setUrl = function (e) {
        this._parse(e);
      }),
      (t.prototype._initValues = function () {
        for (var e in this._fields) this._values[e] = "";
      }),
      (t.prototype.addQueryString = function (e) {
        if ("object" != typeof e) return !1;
        var t = this._values.QueryString || "";
        for (var r in e)
          t = new RegExp(r + "[^&]+").test(t) ? t.replace(new RegExp(r + "[^&]+"), r + "=" + e[r]) : "&" === t.slice(-1) ? t + r + "=" + e[r] : "" === t ? r + "=" + e[r] : t + "&" + r + "=" + e[r];
        this._values.QueryString = t;
      }),
      (t.prototype.getUrl = function () {
        var e = "";
        return (
          (e += this._values.Origin),
          (e += this._values.Port ? ":" + this._values.Port : ""),
          (e += this._values.Path),
          (e += this._values.QueryString ? "?" + this._values.QueryString : ""),
          (e += this._values.Fragment ? "#" + this._values.Fragment : "")
        );
      }),
      (t.prototype._parse = function (e) {
        this._initValues();
        var t = this._regex.exec(e);
        t || sr.log("URLParser::_parse -> Invalid URL");
        var r = e.split("#"),
          n = r[0],
          i = r.slice(1).join("#");
        t = this._regex.exec(n);
        for (var a in this._fields) "undefined" != typeof t[this._fields[a]] && (this._values[a] = t[this._fields[a]]);
        (this._values.Hostname = this._values.Host.replace(/:\d+$/, "")), (this._values.Origin = this._values.Protocol + "://" + this._values.Hostname), (this._values.Fragment = i);
      }),
      new t(e)
    );
  }
  function _(e) {
    var t = {},
      r = function () {
        var e;
        try {
          return (e = new URL("http://modernizr.com/")), "http://modernizr.com/" === e.href;
        } catch (t) {
          return !1;
        }
      };
    if ("function" == typeof window.URL && r())
      (t = new URL(e)),
        t.searchParams ||
          (t.searchParams = (function () {
            var e = u(t.search);
            return {
              get: function (t) {
                return e[t];
              },
            };
          })());
    else {
      p(e) || (e = String(e)), (e = d(e));
      var n = /^https?:\/\/.+/;
      if (n.test(e) === !1) return void sr.log("Invalid URL");
      var i = f(e);
      (t.hash = i._values.Fragment),
        (t.host = i._values.Host ? i._values.Host + (i._values.Port ? ":" + i._values.Port : "") : ""),
        (t.href = i._values.URL),
        (t.password = i._values.Password),
        (t.pathname = i._values.Path),
        (t.port = i._values.Port),
        (t.search = i._values.QueryString ? "?" + i._values.QueryString : ""),
        (t.username = i._values.Username),
        (t.hostname = i._values.Hostname),
        (t.protocol = i._values.Protocol ? i._values.Protocol + ":" : ""),
        (t.origin = i._values.Origin ? i._values.Origin + (i._values.Port ? ":" + i._values.Port : "") : ""),
        (t.searchParams = (function () {
          var e = u("?" + i._values.QueryString);
          return {
            get: function (t) {
              return e[t];
            },
          };
        })());
    }
    return t;
  }
  function h(e) {
    return !(!e || 1 !== e.nodeType);
  }
  function g(e) {
    return void 0 === e;
  }
  function v(t) {
    return Array.isArray && e(v) ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t);
  }
  function y(e) {
    return new pr(e);
  }
  function b(e, t, r, n) {
    function i(e) {
      return e && ((e.preventDefault = i.preventDefault), (e.stopPropagation = i.stopPropagation), (e._getPath = i._getPath)), e;
    }
    function a(e, t, r, n) {
      var a = function (a) {
        if ((a = a || i(window.event))) {
          a.target = a.srcElement;
          var o,
            s,
            c = !0;
          return "function" == typeof r && (o = r(a)), (s = t.call(e, a)), "beforeunload" !== n ? ((!1 !== o && !1 !== s) || (c = !1), c) : void 0;
        }
      };
      return a;
    }
    (i._getPath = function () {
      var e = this;
      return this.path || (this.composedPath && this.composedPath()) || y(e.target).getParents();
    }),
      (i.preventDefault = function () {
        this.returnValue = !1;
      }),
      (i.stopPropagation = function () {
        this.cancelBubble = !0;
      });
    var o = function (e, t, r) {
      if ((void 0 === n && "click" === t && (n = !0), e && e.addEventListener))
        e.addEventListener(
          t,
          function (e) {
            (e._getPath = i._getPath), r.call(this, e);
          },
          n
        );
      else {
        var o = "on" + t,
          s = e[o];
        e[o] = a(e, r, s, t);
      }
    };
    o.apply(null, arguments);
  }
  function S(e) {
    var t = "pushState" in window.history ? "popstate" : "hashchange";
    b(window, t, e);
  }
  function w(e) {
    if (e) return "undefined" != typeof window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest() ? new XMLHttpRequest() : "undefined" != typeof XDomainRequest ? new XDomainRequest() : null;
    if ("undefined" != typeof window.XMLHttpRequest) return new XMLHttpRequest();
    if (window.ActiveXObject)
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (t) {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {
          sr.log(t);
        }
      }
  }
  function k(e, t, r) {
    if (null == e) return !1;
    if (fr && e.forEach === fr) e.forEach(t, r);
    else if (v(e)) for (var n = 0, i = e.length; n < i; n++) n in e && t.call(r, e[n], n, e);
    else for (var a in e) _r.call(e, a) && t.call(r, e[a], a, e);
  }
  function $(e) {
    return (
      k(Array.prototype.slice.call(arguments, 1), function (t) {
        for (var r in t) hr.call(t, r) && void 0 !== t[r] && (e[r] = t[r]);
      }),
      e
    );
  }
  function P(e) {
    function t(e) {
      if (!e) return "";
      try {
        return JSON.parse(e);
      } catch (t) {
        return {};
      }
    }
    function n() {
      try {
        i && "object" == typeof i && i.abort && i.abort();
      } catch (t) {
        sr.log(t);
      }
      a && (clearTimeout(a), (a = null), e.error && e.error(), (i.onreadystatechange = null), (i.onload = null), (i.onerror = null));
    }
    (e.timeout = e.timeout || 2e4), (e.credentials = "undefined" == typeof e.credentials || e.credentials);
    var i = w(e.cors);
    if (!i) return !1;
    e.type || (e.type = e.data ? "POST" : "GET"), (e = $({ success: function () {}, error: function () {} }, e));
    var a,
      o = e.success,
      s = e.error;
    (e.success = function (e) {
      o(e), a && (clearTimeout(a), (a = null));
    }),
      (e.error = function (e) {
        s(e), a && (clearTimeout(a), (a = null));
      }),
      (a = setTimeout(function () {
        n();
      }, e.timeout)),
      "undefined" != typeof XDomainRequest &&
        i instanceof XDomainRequest &&
        ((i.onload = function () {
          e.success && e.success(t(i.responseText)), (i.onreadystatechange = null), (i.onload = null), (i.onerror = null);
        }),
        (i.onerror = function () {
          e.error && e.error(t(i.responseText), i.status), (i.onreadystatechange = null), (i.onerror = null), (i.onload = null);
        })),
      (i.onreadystatechange = function () {
        try {
          4 == i.readyState &&
            ((i.status >= 200 && i.status < 300) || 304 == i.status ? e.success(t(i.responseText)) : e.error(t(i.responseText), i.status), (i.onreadystatechange = null), (i.onload = null));
        } catch (r) {
          (i.onreadystatechange = null), (i.onload = null);
        }
      }),
      i.open(e.type, e.url, !0);
    try {
      e.credentials && (i.withCredentials = !0),
        r(e.header) &&
          k(e.header, function (e, t) {
            i.setRequestHeader && i.setRequestHeader(t, e);
          }),
        e.data &&
          (e.cors || (i.setRequestHeader && i.setRequestHeader("X-Requested-With", "XMLHttpRequest")),
          "application/json" === e.contentType
            ? i.setRequestHeader && i.setRequestHeader("Content-type", "application/json; charset=UTF-8")
            : i.setRequestHeader && i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"));
    } catch (c) {
      sr.log(c);
    }
    i.send(e.data || null);
  }
  function C(e, t) {
    var r = [];
    return null == e
      ? r
      : Array.prototype.map && e.map === Array.prototype.map
      ? e.map(t)
      : (k(e, function (e, n, i) {
          r.push(t(e, n, i));
        }),
        r);
  }
  function O(e) {
    var t = [];
    try {
      t = C(atob(e).split(""), function (e) {
        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
      });
    } catch (r) {
      t = [];
    }
    try {
      return decodeURIComponent(t.join(""));
    } catch (r) {
      return t.join("");
    }
  }
  function N(e) {
    var t = "";
    try {
      t = btoa(
        encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
          return String.fromCharCode("0x" + t);
        })
      );
    } catch (r) {
      t = e;
    }
    return t;
  }
  function x(e, t) {
    t = t || window;
    var r = !1,
      n = !0,
      i = t.document,
      a = i.documentElement,
      o = i.addEventListener,
      s = o ? "addEventListener" : "attachEvent",
      c = o ? "removeEventListener" : "detachEvent",
      l = o ? "" : "on",
      u = function (n) {
        ("readystatechange" == n.type && "complete" != i.readyState) || (("load" == n.type ? t : i)[c](l + n.type, u, !1), !r && (r = !0) && e.call(t, n.type || n));
      },
      p = function () {
        try {
          a.doScroll("left");
        } catch (e) {
          return void setTimeout(p, 50);
        }
        u("poll");
      };
    if ("complete" == i.readyState) e.call(t, "lazy");
    else {
      if (!o && a.doScroll) {
        try {
          n = !t.frameElement;
        } catch (d) {
          sr.log(d);
        }
        n && p();
      }
      i[s](l + "DOMContentLoaded", u, !1), i[s](l + "readystatechange", u, !1), t[s](l + "load", u, !1);
    }
  }
  function T(e) {
    return (
      k(Array.prototype.slice.call(arguments, 1), function (t) {
        for (var r in t) void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r]);
      }),
      e
    );
  }
  function j(e) {
    var t = e;
    try {
      t = decodeURI(e);
    } catch (r) {
      t = e;
    }
    return t;
  }
  function D(e) {
    var t = "t6KJCZa5pDdQ9khoEM3Tj70fbP2eLSyc4BrsYugARqFIw1mzlGNVXOHiWvxUn8",
      r = t.length - 1,
      n = {},
      i = 0;
    for (i = 0; i < t.length; i++) n[t.charAt(i)] = t.charAt(r - i);
    var a = "";
    for (i = 0; i < e.length; i++) a += e.charAt(i) in n ? n[e.charAt(i)] : e.charAt(i);
    return a;
  }
  function A(e) {
    return "[object Date]" == Object.prototype.toString.call(e);
  }
  function E(e) {
    function t(e) {
      return e < 10 ? "0" + e : e;
    }
    return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds());
  }
  function I(e) {
    return (
      k(e, function (t, n) {
        A(t) ? (e[n] = E(t)) : r(t) && (e[n] = I(t));
      }),
      e
    );
  }
  function L(e) {
    return (
      k(Array.prototype.slice.call(arguments, 1), function (t) {
        for (var n in t) void 0 !== t[n] && (r(t[n]) && r(e[n]) ? $(e[n], t[n]) : (e[n] = t[n]));
      }),
      e
    );
  }
  function U(e, t, r) {
    var n = Object.prototype.hasOwnProperty;
    if (e.filter) return e.filter(t);
    for (var i = [], a = 0; a < e.length; a++)
      if (n.call(e, a)) {
        var o = e[a];
        t.call(r, o, a, e) && i.push(o);
      }
    return i;
  }
  function R(e) {
    try {
      return JSON.stringify(e, null, "  ");
    } catch (t) {
      return JSON.stringify(e);
    }
  }
  function J(e, t) {
    function r(e) {
      return !!e && e;
    }
    (e = e || location.hostname), (t = t || "domain_test");
    var n = r(e);
    if (!n) return "";
    var i = n.split(".");
    if (v(i) && i.length >= 2 && !/^(\d+\.)+\d+$/.test(n))
      for (var a = "." + i.splice(i.length - 1, 1); i.length > 0; )
        if (((a = "." + i.splice(i.length - 1, 1) + a), (document.cookie = t + "=true; path=/; domain=" + a), document.cookie.indexOf(t + "=true") !== -1)) {
          var o = new Date();
          return o.setTime(o.getTime() - 1e3), (document.cookie = t + "=true; expires=" + o.toGMTString() + "; path=/; SameSite=Lax; domain=" + a), a;
        }
    return "";
  }
  function H(e) {
    function t(e, t) {
      e = d(e);
      var r;
      if ("body" === e) return document.getElementsByTagName("body")[0];
      if (0 === e.indexOf("#")) (e = e.slice(1)), (r = document.getElementById(e));
      else if (e.indexOf(":nth-of-type") > -1) {
        var n = e.split(":nth-of-type");
        if (!n[0] || !n[1]) return null;
        var i = n[0],
          a = n[1].match(/\(([0-9]+)\)/);
        if (!a || !a[1]) return null;
        var o = Number(a[1]);
        if (!(h(t) && t.children && t.children.length > 0)) return null;
        for (var s = t.children, c = 0; c < s.length; c++)
          if (h(s[c])) {
            var l = s[c].tagName.toLowerCase();
            if (l === i && (o--, 0 === o)) {
              r = s[c];
              break;
            }
          }
        if (o > 0) return null;
      }
      return r ? r : null;
    }
    function r(e) {
      var i,
        a = n.shift();
      if (!a) return e;
      try {
        i = t(a, e);
      } catch (o) {
        sr.log(o);
      }
      return i && h(i) ? r(i) : null;
    }
    if (!p(e)) return null;
    var n = e.split(">"),
      i = null;
    return (i = r()), i && h(i) ? i : null;
  }
  function M(e, t) {
    var r = "",
      n = "";
    return (
      e.textContent ? (r = d(e.textContent)) : e.innerText && (r = d(e.innerText)),
      r &&
        (r = r
          .replace(/[\r\n]/g, " ")
          .replace(/[ ]+/g, " ")
          .substring(0, 255)),
      (n = r || ""),
      ("input" !== t && "INPUT" !== t) || (n = e.value || ""),
      n
    );
  }
  function q(e, t) {
    (t && "string" == typeof t) || (t = "hostname\u89e3\u6790\u5f02\u5e38");
    var r = null;
    try {
      r = _(e).hostname;
    } catch (n) {
      sr.log("getHostname\u4f20\u5165\u7684url\u53c2\u6570\u4e0d\u5408\u6cd5\uff01");
    }
    return r || t;
  }
  function K() {
    try {
      var e = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
      return e && e[1] ? Number.parseInt(e[1], 10) : "";
    } catch (t) {
      return "";
    }
  }
  function B(e, t) {
    (t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")), (e = l(e));
    var r = "[\\?&]" + t + "=([^&#]*)",
      n = new RegExp(r),
      i = n.exec(e);
    return null === i || (i && "string" != typeof i[1] && i[1].length) ? "" : l(i[1]);
  }
  function F(e) {
    var t = {},
      r = e.split("?"),
      n = r[1] || "";
    return n && (t = u("?" + n)), t;
  }
  function W() {
    return "undefined" != typeof window.matchMedia || "undefined" != typeof window.msMatchMedia;
  }
  function z() {
    var e = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type,
      t = "\u672a\u53d6\u5230\u503c";
    if (e) t = e.indexOf("landscape") > -1 ? "landscape" : "portrait";
    else if (W()) {
      var r = window.matchMedia || window.msMatchMedia;
      r("(orientation: landscape)").matches ? (t = "landscape") : r("(orientation: portrait)").matches && (t = "portrait");
    }
    return t;
  }
  function V() {
    var e,
      t = {},
      r = navigator.userAgent.toLowerCase();
    return (
      (e = r.match(/opera.([\d.]+)/))
        ? (t.opera = Number(e[1].split(".")[0]))
        : (e = r.match(/msie ([\d.]+)/))
        ? (t.ie = Number(e[1].split(".")[0]))
        : (e = r.match(/edge.([\d.]+)/))
        ? (t.edge = Number(e[1].split(".")[0]))
        : (e = r.match(/firefox\/([\d.]+)/))
        ? (t.firefox = Number(e[1].split(".")[0]))
        : (e = r.match(/chrome\/([\d.]+)/))
        ? (t.chrome = Number(e[1].split(".")[0]))
        : (e = r.match(/version\/([\d.]+).*safari/))
        ? (t.safari = Number(e[1].match(/^\d*.\d*/)))
        : (e = r.match(/trident\/([\d.]+)/)) && (t.ie = 11),
      t
    );
  }
  function X(e) {
    return p(e) ? ((e = d(e)), j(e)) : j(location.href);
  }
  function Z(e) {
    return p(e) ? ((e = d(e)), j(e)) : j(location.pathname);
  }
  function Y(e, t) {
    return e.hasAttribute ? e.hasAttribute(t) : e.attributes ? !(!e.attributes[t] || !e.attributes[t].specified) : void 0;
  }
  function G(e, t) {
    if ("string" == typeof t) return Y(e, t);
    if (v(t)) {
      for (var r = !1, n = 0; n < t.length; n++) {
        var i = Y(e, t[n]);
        if (i) {
          r = !0;
          break;
        }
      }
      return r;
    }
  }
  function Q(e) {
    if ("string" != typeof e) return 0;
    var t = 0,
      r = null;
    if (0 == e.length) return t;
    for (var n = 0; n < e.length; n++) (r = e.charCodeAt(n)), (t = (t << 5) - t + r), (t &= t);
    return t;
  }
  function ee(e) {
    var t = 9007199254740992,
      r = -9007199254740992,
      n = 31,
      i = 0;
    if (e.length > 0)
      for (var a = e.split(""), o = 0; o < a.length; o++) {
        var s = a[o].charCodeAt(),
          c = n * i + s;
        if (c > t) for (i = r + i; (c = n * i + s), c < r; ) i = i / 2 + s;
        if (c < r) for (i = t + i; (c = n * i + s), c > t; ) i = i / 2 + s;
        i = n * i + s;
      }
    return i;
  }
  function te(e, t) {
    var r = e.indexOf;
    if (r) return r.call(e, t);
    for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
    return -1;
  }
  function re(e, t) {
    return (e.prototype = new t()), (e.prototype.constructor = e), (e.superclass = t.prototype), e;
  }
  function ne(e) {
    return !(!e || !mr.call(e, "callee"));
  }
  function ie(e) {
    return "[object Boolean]" == Object.prototype.toString.call(e);
  }
  function ae(e) {
    if (r(e)) {
      for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
      return !0;
    }
    return !1;
  }
  function oe(e) {
    if ("string" != typeof e) return !1;
    var t = /^https?:\/\/.+/;
    return t.test(e) !== !1 || (sr.log("Invalid URL"), !1);
  }
  function se() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }
  function ce(e) {
    try {
      JSON.parse(e);
    } catch (t) {
      return !1;
    }
    return !0;
  }
  function le(e) {
    return "[object Number]" == Object.prototype.toString.call(e) && /[\d\.]+/.test(String(e));
  }
  function ue() {
    var e = !1;
    if ("object" != typeof navigator || "function" != typeof navigator.sendBeacon) return e;
    var t = V(),
      r = navigator.userAgent.toLowerCase();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      var n = /os [\d._]*/gi,
        i = r.match(n),
        a = (i + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."),
        o = a.split(".");
      "undefined" == typeof t.safari && (t.safari = o[0]),
        o[0] && o[0] < 13 ? (t.chrome > 41 || t.firefox > 30 || t.opera > 25 || t.safari > 12) && (e = !0) : (t.chrome > 41 || t.firefox > 30 || t.opera > 25 || t.safari > 11.3) && (e = !0);
    } else (t.chrome > 38 || t.edge > 13 || t.firefox > 30 || t.opera > 25 || t.safari > 11) && (e = !0);
    return e;
  }
  function pe() {
    return "undefined" != typeof window.XMLHttpRequest && ("withCredentials" in new XMLHttpRequest() || "undefined" != typeof XDomainRequest);
  }
  function de(t) {
    if (!r(t) || !p(t.callbackName)) return sr.log("JSONP \u8bf7\u6c42\u7f3a\u5c11 callbackName"), !1;
    (t.success = e(t.success) ? t.success : function () {}), (t.error = e(t.error) ? t.error : function () {}), (t.data = t.data || "");
    var n = document.createElement("script"),
      i = document.getElementsByTagName("head")[0],
      a = null,
      o = !1;
    if (
      (i.appendChild(n),
      le(t.timeout) &&
        (a = setTimeout(function () {
          return (
            !o &&
            (t.error("timeout"),
            (window[t.callbackName] = function () {
              sr.log("call jsonp error");
            }),
            (a = null),
            i.removeChild(n),
            void (o = !0))
          );
        }, t.timeout)),
      (window[t.callbackName] = function () {
        clearTimeout(a),
          (a = null),
          t.success.apply(null, arguments),
          (window[t.callbackName] = function () {
            sr.log("call jsonp error");
          }),
          i.removeChild(n);
      }),
      t.url.indexOf("?") > -1 ? (t.url += "&callbackName=" + t.callbackName) : (t.url += "?callbackName=" + t.callbackName),
      r(t.data))
    ) {
      var s = [];
      k(t.data, function (e, t) {
        s.push(t + "=" + e);
      }),
        (t.data = s.join("&")),
        (t.url += "&" + t.data);
    }
    (n.onerror = function (e) {
      return (
        !o &&
        ((window[t.callbackName] = function () {
          sr.log("call jsonp error");
        }),
        clearTimeout(a),
        (a = null),
        i.removeChild(n),
        t.error(e),
        void (o = !0))
      );
    }),
      (n.src = t.url);
  }
  function fe(t) {
    var r = {
      visibleHandler: e(t.visible) ? t.visible : function () {},
      hiddenHandler: e(t.hidden) ? t.hidden : function () {},
      visibilityChange: null,
      hidden: null,
      isSupport: function () {
        return "undefined" != typeof document[this.hidden];
      },
      init: function () {
        "undefined" != typeof document.hidden
          ? ((this.hidden = "hidden"), (this.visibilityChange = "visibilitychange"))
          : "undefined" != typeof document.mozHidden
          ? ((this.hidden = "mozHidden"), (this.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.msHidden
          ? ((this.hidden = "msHidden"), (this.visibilityChange = "msvisibilitychange"))
          : "undefined" != typeof document.webkitHidden && ((this.hidden = "webkitHidden"), (this.visibilityChange = "webkitvisibilitychange")),
          this.listen();
      },
      listen: function () {
        if (this.isSupport()) {
          var e = this;
          b(
            document,
            this.visibilityChange,
            function () {
              document[e.hidden] ? e.hiddenHandler() : e.visibleHandler();
            },
            1
          );
        } else b(window, "focus", this.visibleHandler), b(window, "blur", this.hiddenHandler);
      },
    };
    r.init();
  }
  function _e(e) {
    e = $(
      {
        success: function () {},
        error: function () {},
        appendCall: function (e) {
          document.getElementsByTagName("head")[0].appendChild(e);
        },
      },
      e
    );
    var t = null;
    "css" === e.type && ((t = document.createElement("link")), (t.rel = "stylesheet"), (t.href = e.url)),
      "js" === e.type && ((t = document.createElement("script")), (t.async = "async"), t.setAttribute("charset", "UTF-8"), (t.src = e.url), (t.type = "text/javascript")),
      (t.onload = t.onreadystatechange =
        function () {
          (this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState) || (e.success(), (t.onload = t.onreadystatechange = null));
        }),
      (t.onerror = function () {
        e.error(), (t.onerror = null);
      }),
      e.appendCall(t);
  }
  function he(e) {
    if ("string" != typeof e) return "";
    for (var t = /^\s*javascript/i; t.test(e); ) e = e.replace(t, "");
    return e;
  }
  function ge(e, t) {
    (e = String(e)), (t = "number" == typeof t ? t : 13);
    for (var r = 126, n = e.split(""), i = 0, a = n.length; i < a; i++) {
      var o = n[i].charCodeAt(0);
      o < r && (n[i] = String.fromCharCode((n[i].charCodeAt(0) + t) % r));
    }
    return n.join("");
  }
  function me(e) {
    var t = 13,
      r = 126;
    return (e = String(e)), ge(e, r - t);
  }
  function ve(e) {
    r(e) &&
      k(e, function (t, n) {
        r(t) ? ve(e[n]) : A(t) && (e[n] = E(t));
      });
  }
  function ye(e) {
    var t = document.createElement("style");
    t.type = "text/css";
    try {
      t.appendChild(document.createTextNode(e));
    } catch (r) {
      t.styleSheet.cssText = e;
    }
    var n = document.getElementsByTagName("head")[0],
      i = document.getElementsByTagName("script")[0];
    n ? (n.children.length ? n.insertBefore(t, n.children[0]) : n.appendChild(t)) : i.parentNode.insertBefore(t, i);
  }
  function be(e) {
    if ("string" != typeof e) return sr.log("\u8f6c\u6362unicode\u9519\u8bef", e), e;
    for (var t = "", r = 0; r < e.length; r++) t += "\\" + e.charCodeAt(r).toString(16);
    return t;
  }
  function Se(e, r, n) {
    var i,
      a,
      o,
      s = null,
      c = 0;
    n || (n = {});
    var l = function () {
      (c = n.leading === !1 ? 0 : t()), (s = null), (o = e.apply(i, a)), s || (i = a = null);
    };
    return function () {
      var u = t();
      c || n.leading !== !1 || (c = u);
      var p = r - (u - c);
      return (
        (i = this), (a = arguments), p <= 0 || p > r ? (s && (clearTimeout(s), (s = null)), (c = u), (o = e.apply(i, a)), s || (i = a = null)) : s || n.trailing === !1 || (s = setTimeout(l, p)), o
      );
    };
  }
  function we(e) {
    var t = [];
    return null == e
      ? t
      : (k(e, function (e) {
          t[t.length] = e;
        }),
        t);
  }
  function ke(e) {
    return e ? (e.toArray ? e.toArray() : v(e) || ne(e) ? Array.prototype.slice.call(e) : we(e)) : [];
  }
  function $e(e) {
    for (var t, r = [], n = {}, i = 0; i < e.length; i++) (t = e[i]), t in n || ((n[t] = !0), r.push(t));
    return r;
  }
  function Pe() {
    if (
      ((vr.isSupport() && "true" === sessionStorage.getItem("sensorsdata_jssdk_debug")) || kr.show_log) &&
      (!r(arguments[0]) || (kr.show_log !== !0 && "string" !== kr.show_log && kr.show_log !== !1) || (arguments[0] = R(arguments[0])), "object" == typeof console && console.log)
    )
      try {
        return console.log.apply(console, arguments);
      } catch (e) {
        console.log(arguments[0]);
      }
  }
  function Ce(e) {
    return 0 === e.indexOf(Pr) ? ((e = e.substring(Pr.length)), (e = me(e))) : 0 === e.indexOf(Cr) && ((e = e.substring(Cr.length)), (e = D(e))), e;
  }
  function Oe(e) {
    return !p(e) || (0 !== e.indexOf(Pr) && 0 !== e.indexOf(Cr)) || (e = Ce(e)), e;
  }
  function Ne(e) {
    return Cr + D(e);
  }
  function xe(t) {
    var n = t.properties,
      i = JSON.parse(JSON.stringify(t));
    r(n) &&
      k(n, function (t, r) {
        if (e(t))
          try {
            (n[r] = t(i)), e(n[r]) && (Pe("\u60a8\u7684\u5c5e\u6027- " + r + " \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete n[r]);
          } catch (a) {
            delete n[r], Pe("\u60a8\u7684\u5c5e\u6027- " + r + " \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664");
          }
      });
  }
  function Te(e) {
    if ("object" == typeof e && e.$option) {
      var t = e.$option;
      return delete e.$option, t;
    }
    return {};
  }
  function je(e) {
    var t = {};
    return (
      k(e, function (e, r) {
        null != e && (t[r] = e);
      }),
      t
    );
  }
  function De(e) {
    var t = kr.current_domain;
    switch (typeof t) {
      case "function":
        var r = t();
        return "" === r || "" === d(r) ? "url\u89e3\u6790\u5931\u8d25" : r.indexOf(".") !== -1 ? r : "url\u89e3\u6790\u5931\u8d25";
      case "string":
        return "" === t || "" === d(t) ? "url\u89e3\u6790\u5931\u8d25" : t.indexOf(".") !== -1 ? t : "url\u89e3\u6790\u5931\u8d25";
      default:
        var n = J(null, Tr);
        return "" === e ? "url\u89e3\u6790\u5931\u8d25" : "" === n ? "url\u89e3\u6790\u5931\u8d25" : n;
    }
  }
  function Ae(e) {
    if (!e.target) return !1;
    var t = e.target,
      r = t.tagName.toLowerCase(),
      n = {};
    return (
      (n.$element_type = r),
      (n.$element_name = t.getAttribute("name")),
      (n.$element_id = t.getAttribute("id")),
      (n.$element_class_name = "string" == typeof t.className ? t.className : null),
      (n.$element_target_url = t.getAttribute("href")),
      (n.$element_content = Be(t, r)),
      (n = je(n)),
      (n.$url = X()),
      (n.$url_path = Z()),
      (n.$title = document.title),
      n
    );
  }
  function Ee() {
    var e = document.referrer,
      t = "baidu.com";
    if (!e) return !1;
    try {
      var r = _(e).hostname;
      return r && r.substring(r.length - t.length) === t;
    } catch (n) {
      return !1;
    }
  }
  function Ie() {
    var e = F(document.referrer);
    return ae(e) || !e.eqid ? ur().replace(/-/g, "") : e.eqid;
  }
  function Le() {
    var e = F(document.referrer);
    if (ae(e) || !e.eqid) {
      var t = F(location.href);
      return e.ck || t.utm_source ? "baidu_sem_keyword_id" : "baidu_other_keyword_id";
    }
    return "baidu_seo_keyword_id";
  }
  function Ue(e) {
    return (e = e || document.referrer), "" === e || J(q(e), Tr) !== J(null, Tr);
  }
  function Re(e, t) {
    return (
      (e = e || document.referrer),
      "string" != typeof e
        ? "\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_" + String(e)
        : ((e = d(e)), (e = j(e)), 0 !== e.indexOf("https://www.baidu.com/") || t || (e = e.split("?")[0]), (e = e.slice(0, kr.max_referrer_string_length)), "string" == typeof e ? e : "")
    );
  }
  function Je(e) {
    var t = q(e);
    if (!t || "hostname\u89e3\u6790\u5f02\u5e38" === t) return "";
    var r = {
      baidu: [/^.*\.baidu\.com$/],
      bing: [/^.*\.bing\.com$/],
      google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
      sm: [/^m\.sm\.cn$/],
      so: [/^.+\.so\.com$/],
      sogou: [/^.*\.sogou\.com$/],
      yahoo: [/^.*\.yahoo\.com$/],
    };
    for (var n in r) for (var i = r[n], a = 0, o = i.length; a < o; a++) if (i[a].test(t)) return n;
    return "\u672a\u77e5\u641c\u7d22\u5f15\u64ce";
  }
  function He(e, t) {
    e = e || document.referrer;
    var r = kr.source_type.keyword;
    if (document && "string" == typeof e) {
      if (0 === e.indexOf("http")) {
        var n = Je(e),
          i = F(e);
        if (ae(i)) return kr.preset_properties.search_keyword_baidu && Ee() ? void 0 : "\u672a\u53d6\u5230\u503c";
        var a = null;
        for (var o in r)
          if (n === o && "object" == typeof i)
            if (((a = r[o]), v(a)))
              for (o = 0; o < a.length; o++) {
                var s = i[a[o]];
                if (s) return t ? { active: s } : s;
              }
            else if (i[a]) return t ? { active: i[a] } : i[a];
        return kr.preset_properties.search_keyword_baidu && Ee() ? void 0 : "\u672a\u53d6\u5230\u503c";
      }
      return "" === e ? "\u672a\u53d6\u5230\u503c_\u76f4\u63a5\u6253\u5f00" : "\u672a\u53d6\u5230\u503c_\u975ehttp\u7684url";
    }
    return "\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_" + String(e);
  }
  function Me(e) {
    var t = B(e, "gdt_vid"),
      r = B(e, "hash_key"),
      n = B(e, "callbacks"),
      i = { click_id: "", hash_key: "", callbacks: "" };
    return (
      p(t) &&
        t.length &&
        ((i.click_id = 16 == t.length || 18 == t.length ? t : "\u53c2\u6570\u89e3\u6790\u4e0d\u5408\u6cd5"), p(r) && r.length && (i.hash_key = r), p(n) && n.length && (i.callbacks = n)),
      i
    );
  }
  function qe() {
    function e(e, t) {
      for (var r = 0; r < e.length; r++) if (t.split("?")[0].indexOf(e[r]) !== -1) return !0;
    }
    var t = "(" + kr.source_type.utm.join("|") + ")\\=[^&]+",
      r = kr.source_type.search,
      n = kr.source_type.social,
      i = document.referrer || "",
      a = Ar.pageProp.url;
    if (a) {
      var o = a.match(new RegExp(t));
      return o && o[0]
        ? "\u4ed8\u8d39\u5e7f\u544a\u6d41\u91cf"
        : e(r, i)
        ? "\u81ea\u7136\u641c\u7d22\u6d41\u91cf"
        : e(n, i)
        ? "\u793e\u4ea4\u7f51\u7ad9\u6d41\u91cf"
        : "" === i
        ? "\u76f4\u63a5\u6d41\u91cf"
        : "\u5f15\u8350\u6d41\u91cf";
    }
    return "\u83b7\u53d6url\u5f02\u5e38";
  }
  function Ke(e) {
    var t = kr.heatmap && "function" == typeof kr.heatmap.collect_input && kr.heatmap.collect_input(e);
    return "button" === e.type || "submit" === e.type || t ? e.value || "" : "";
  }
  function Be(e, t) {
    return p(t) && "input" === t.toLowerCase() ? Ke(e) : M(e, t);
  }
  function Fe(e) {
    return Or.protocol.ajax(e.url), P(e);
  }
  function We(e, t, n) {
    var i = !(!r(kr.heatmap) || !kr.heatmap.useCapture);
    return r(kr.heatmap) && "undefined" == typeof kr.heatmap.useCapture && "click" === t && (i = !0), b(e, t, n, i);
  }
  function ze(e, t) {
    var r = "";
    if (((t = t || location.href), kr.cross_subdomain === !1)) {
      try {
        r = _(t).hostname;
      } catch (n) {
        Pe(n);
      }
      r = "string" == typeof r && "" !== r ? "sajssdk_2015_" + kr.sdk_id + e + "_" + r.replace(/\./g, "_") : "sajssdk_2015_root_" + kr.sdk_id + e;
    } else r = "sajssdk_2015_cross_" + kr.sdk_id + e;
    return r;
  }
  function Ve() {
    var e = "new_user";
    return Er.isSupport() ? null !== Er.get("sensorsdata_is_new_user") || null !== Er.get(ze(e)) : null !== Ir.get(Ir.getNewUserFlagMemoryKey(e));
  }
  function Xe(e, t) {
    for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r) && !Hr.check(r, e[r], t)) return !1;
    return !0;
  }
  function Ze(e) {
    var t = !e.type || "profile" !== e.type.slice(0, 7),
      n = "\u53d6\u503c\u5f02\u5e38";
    r(e.properties) &&
      (e.properties.$first_referrer && (e.properties.$first_referrer_host = q(e.properties.$first_referrer, n)),
      t &&
        ("$referrer" in e.properties && (e.properties.$referrer_host = "" === e.properties.$referrer ? "" : q(e.properties.$referrer, n)),
        ar.para.preset_properties.latest_referrer &&
          ar.para.preset_properties.latest_referrer_host &&
          (e.properties.$latest_referrer_host = "" === e.properties.$latest_referrer ? "" : q(e.properties.$latest_referrer, n))));
  }
  function Ye(e) {
    var t = !e.type || "profile" !== e.type.slice(0, 7),
      r = ar.para.preset_properties && t;
    r && ar.para.preset_properties.url && "undefined" == typeof e.properties.$url && (e.properties.$url = X()),
      r && ar.para.preset_properties.title && "undefined" == typeof e.properties.$title && (e.properties.$title = document.title);
  }
  function Ge(e) {
    $(kr, e || ar.para || {}), (ar.para = kr);
    var t = {};
    if (r(ar.para.is_track_latest)) for (var n in ar.para.is_track_latest) t["latest_" + n] = ar.para.is_track_latest[n];
    ar.para.preset_properties = $({}, ar.para_default.preset_properties, t, ar.para.preset_properties || {});
    var i;
    for (i in ar.para_default) void 0 === ar.para[i] && (ar.para[i] = ar.para_default[i]);
    "string" == typeof ar.para.server_url &&
      ((ar.para.server_url = d(ar.para.server_url)),
      ar.para.server_url &&
        ("://" === ar.para.server_url.slice(0, 3)
          ? (ar.para.server_url = location.protocol.slice(0, -1) + ar.para.server_url)
          : "//" === ar.para.server_url.slice(0, 2)
          ? (ar.para.server_url = location.protocol + ar.para.server_url)
          : "http" !== ar.para.server_url.slice(0, 4) && (ar.para.server_url = ""))),
      "string" != typeof ar.para.web_url ||
        ("://" !== ar.para.web_url.slice(0, 3) && "//" !== ar.para.web_url.slice(0, 2)) ||
        ("://" === ar.para.web_url.slice(0, 3) ? (ar.para.web_url = location.protocol.slice(0, -1) + ar.para.web_url) : (ar.para.web_url = location.protocol + ar.para.web_url)),
      "image" !== ar.para.send_type && "ajax" !== ar.para.send_type && "beacon" !== ar.para.send_type && (ar.para.send_type = "image"),
      ar.debug.protocol.serverUrl(),
      ar.bridge.initPara(),
      ar.bridge.initState();
    var a = { datasend_timeout: 6e3, send_interval: 6e3 };
    cr.isSupport() && pe() && "object" == typeof localStorage
      ? ar.para.batch_send === !0
        ? (ar.para.batch_send = $({}, a))
        : "object" == typeof ar.para.batch_send && (ar.para.batch_send = $({}, a, ar.para.batch_send))
      : (ar.para.batch_send = !1);
    var o = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"],
      s = ["www.baidu.", "m.baidu.", "m.sm.cn", "so.com", "sogou.com", "youdao.com", "google.", "yahoo.com/", "bing.com/", "ask.com/"],
      c = ["weibo.com", "renren.com", "kaixin001.com", "douban.com", "qzone.qq.com", "zhihu.com", "tieba.baidu.com", "weixin.qq.com"],
      l = { baidu: ["wd", "word", "kw", "keyword"], google: "q", bing: "q", yahoo: "p", sogou: ["query", "keyword"], so: "q", sm: "q" };
    "object" == typeof ar.para.source_type &&
      ((ar.para.source_type.utm = v(ar.para.source_type.utm) ? ar.para.source_type.utm.concat(o) : o),
      (ar.para.source_type.search = v(ar.para.source_type.search) ? ar.para.source_type.search.concat(s) : s),
      (ar.para.source_type.social = v(ar.para.source_type.social) ? ar.para.source_type.social.concat(c) : c),
      (ar.para.source_type.keyword = r(ar.para.source_type.keyword) ? $(l, ar.para.source_type.keyword) : l));
    var u = { div: !1 },
      p = ["mark", "/mark", "strong", "b", "em", "i", "u", "abbr", "ins", "del", "s", "sup"];
    if ((ar.para.heatmap && !r(ar.para.heatmap) && (ar.para.heatmap = {}), r(ar.para.heatmap))) {
      (ar.para.heatmap.clickmap = ar.para.heatmap.clickmap || "default"),
        (ar.para.heatmap.scroll_notice_map = ar.para.heatmap.scroll_notice_map || "default"),
        (ar.para.heatmap.scroll_delay_time = ar.para.heatmap.scroll_delay_time || 4e3),
        (ar.para.heatmap.scroll_event_duration = ar.para.heatmap.scroll_event_duration || 18e3),
        (ar.para.heatmap.renderRefreshTime = ar.para.heatmap.renderRefreshTime || 1e3),
        (ar.para.heatmap.loadTimeout = ar.para.heatmap.loadTimeout || 1e3),
        ar.para.heatmap.get_vtrack_config !== !0 && (ar.para.heatmap.get_vtrack_config = !1);
      var f = v(ar.para.heatmap.track_attr)
        ? U(ar.para.heatmap.track_attr, function (e) {
            return e && "string" == typeof e;
          })
        : [];
      if ((f.push("data-sensors-click"), (ar.para.heatmap.track_attr = f), r(ar.para.heatmap.collect_tags)))
        if (ar.para.heatmap.collect_tags.div === !0) ar.para.heatmap.collect_tags.div = { ignore_tags: p, max_level: 1 };
        else if (r(ar.para.heatmap.collect_tags.div)) {
          if (
            (ar.para.heatmap.collect_tags.div.ignore_tags
              ? v(ar.para.heatmap.collect_tags.div.ignore_tags) || (ar.log("ignore_tags \u53c2\u6570\u5fc5\u987b\u662f\u6570\u7ec4\u683c\u5f0f"), (ar.para.heatmap.collect_tags.div.ignore_tags = p))
              : (ar.para.heatmap.collect_tags.div.ignore_tags = p),
            ar.para.heatmap.collect_tags.div.max_level)
          ) {
            var _ = [1, 2, 3];
            te(_, ar.para.heatmap.collect_tags.div.max_level) === -1 && (ar.para.heatmap.collect_tags.div.max_level = 1);
          }
        } else ar.para.heatmap.collect_tags.div = !1;
      else ar.para.heatmap.collect_tags = u;
    }
    if (v(ar.para.server_url) && ar.para.server_url.length)
      for (i = 0; i < ar.para.server_url.length; i++)
        /sa\.gif[^\/]*$/.test(ar.para.server_url[i]) || (ar.para.server_url[i] = ar.para.server_url[i].replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
    else
      /sa\.gif[^\/]*$/.test(ar.para.server_url) ||
        "string" != typeof ar.para.server_url ||
        (ar.para.server_url = ar.para.server_url.replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
    "string" == typeof ar.para.server_url && (ar.para.debug_mode_url = ar.para.debug_mode_url || ar.para.server_url.replace("sa.gif", "debug")),
      ar.para.noCache === !0 ? (ar.para.noCache = "?" + new Date().getTime()) : (ar.para.noCache = ""),
      ar.para.callback_timeout > ar.para.datasend_timeout && (ar.para.datasend_timeout = ar.para.callback_timeout),
      ar.para.heatmap &&
        ar.para.heatmap.collect_tags &&
        r(ar.para.heatmap.collect_tags) &&
        k(ar.para.heatmap.collect_tags, function (e, t) {
          "div" !== t && e && ar.heatmap.otherTags.push(t);
        }),
      ar.para.heatmap && "default" === ar.para.heatmap.clickmap && ar.heatmap.initUnlimitedTags();
  }
  function Qe(e) {
    var t = {};
    for (var r in e) t[r] = e[r];
    (ar.store._state.identities = t), ar.store.save();
  }
  function et() {
    (ar._t = ar._t || 1 * new Date()), (ar.lib_version = xr), (ar.is_first_visitor = !1), (ar.source_channel_standard = Nr);
  }
  function tt() {
    if (vr.isSupport())
      try {
        sessionStorage.setItem("sensorsdata_jssdk_debug", "true");
      } catch (e) {
        ar.log("enableLocalLog error: " + e.message);
      }
  }
  function rt() {
    vr.isSupport() && sessionStorage.removeItem("sensorsdata_jssdk_debug");
  }
  function nt() {
    var e = Array.prototype.slice.call(arguments),
      t = e[0],
      r = e.slice(1);
    return "string" == typeof t && Fr[t] ? Fr[t].apply(Fr, r) : void ("function" == typeof t ? t.apply(ar, r) : ar.log("quick\u65b9\u6cd5\u4e2d\u6ca1\u6709\u8fd9\u4e2a\u529f\u80fd" + e[0]));
  }
  function it(t, n) {
    return p(t)
      ? r(window.SensorsDataWebJSSDKPlugin) && r(window.SensorsDataWebJSSDKPlugin[t]) && e(window.SensorsDataWebJSSDKPlugin[t].init)
        ? (window.SensorsDataWebJSSDKPlugin[t].init(ar, n), window.SensorsDataWebJSSDKPlugin[t])
        : r(ar.modules) && r(ar.modules[t]) && e(ar.modules[t].init)
        ? (ar.modules[t].init(ar, n), ar.modules[t])
        : void ar.log(t + "\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574" + t + "\u7684\u5f15\u5165\u987a\u5e8f\uff01")
      : (ar.log("use\u63d2\u4ef6\u540d\u79f0\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff01"), !1);
  }
  function at(e, t, r) {
    qr.check({ event: e, properties: t }) && qr.send({ type: "track", event: e, properties: t }, r);
  }
  function ot(e, t) {
    return !!qr.check({ bindKey: e, bindValue: t }) && ((ar.store._state.identities[e] = t), ar.store.save(), void qr.send({ type: "track_id_bind", event: "$BindID", properties: {} }));
  }
  function st(e, t) {
    if (!qr.check({ unbindKey: e, bindValue: t })) return !1;
    if (r(ar.store._state.identities) && ar.store._state.identities.hasOwnProperty(e) && ar.store._state.identities[e] === t) {
      var n = ar.store.getUnionId().login_id;
      n && e + "+" + t === n && ((ar.store._state.distinct_id = ar.store._state.first_id), (ar.store._state.first_id = ""), ar.store.set("history_login_id", { name: "", value: "" })),
        "$identity_cookie_id" !== e && (delete ar.store._state.identities[e], ar.store.save());
    }
    var i = {};
    (i[e] = t), qr.send({ identities: i, type: "track_id_unbind", event: "$UnbindID", properties: {} });
  }
  function ct(e, t, r) {
    function n(e, t, r) {
      function n(e) {
        function n() {
          a || ((a = !0), (location.href = i.href));
        }
        e.stopPropagation(), e.preventDefault();
        var a = !1;
        setTimeout(n, 1e3), ar.track(t, r, n);
      }
      e = e || {};
      var i = null;
      return (
        e.ele && (i = e.ele),
        e.event && (i = e.target ? e.target : e.event.target),
        (r = r || {}),
        !(!i || "object" != typeof i) &&
          (!i.href || /^javascript/.test(i.href) || i.target || i.download || i.onclick
            ? (ar.track(t, r), !1)
            : (e.event && n(e.event),
              void (
                e.ele &&
                We(e.ele, "click", function (e) {
                  n(e);
                })
              )))
      );
    }
    "object" == typeof e && e.tagName ? n({ ele: e }, t, r) : "object" == typeof e && e.target && e.event && n(e, t, r);
  }
  function lt(e, t, r) {
    return (
      (r = r || {}),
      !(!e || "object" != typeof e) &&
        !(!e.href || /^javascript/.test(e.href) || e.target) &&
        void We(e, "click", function (n) {
          function i() {
            a || ((a = !0), (location.href = e.href));
          }
          n.preventDefault();
          var a = !1;
          setTimeout(i, 1e3), ar.track(t, r, i);
        })
    );
  }
  function ut(e, t, r) {
    qr.check({ item_type: e, item_id: t, properties: r }) && qr.sendItem({ type: "item_set", item_type: e, item_id: t, properties: r || {} });
  }
  function pt(e, t) {
    qr.check({ item_type: e, item_id: t }) && qr.sendItem({ type: "item_delete", item_type: e, item_id: t });
  }
  function dt(e, t) {
    qr.check({ propertiesMust: e }) && qr.send({ type: "profile_set", properties: e }, t);
  }
  function ft(e, t) {
    qr.check({ propertiesMust: e }) && qr.send({ type: "profile_set_once", properties: e }, t);
  }
  function _t(e, t) {
    qr.check({ propertiesMust: e }) &&
      (k(e, function (t, r) {
        p(t) ? (e[r] = [t]) : v(t) ? (e[r] = t) : (delete e[r], ar.log("appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"));
      }),
      ae(e) || qr.send({ type: "profile_append", properties: e }, t));
  }
  function ht(e, t) {
    function r(e) {
      for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t) && !/-*\d+/.test(String(e[t]))) return !1;
      return !0;
    }
    var n = e;
    p(e) && ((e = {}), (e[n] = 1)),
      qr.check({ propertiesMust: e }) && (r(e) ? qr.send({ type: "profile_increment", properties: e }, t) : ar.log("profile_increment\u7684\u503c\u53ea\u80fd\u662f\u6570\u5b57"));
  }
  function gt(e) {
    qr.send({ type: "profile_delete" }, e), Ur.set("distinct_id", ur()), Ur.set("first_id", "");
  }
  function mt(e, t) {
    var r = e,
      n = {};
    p(e) && ((e = []), e.push(r)),
      v(e)
        ? (k(e, function (e) {
            p(e) ? (n[e] = !0) : ar.log("profile_unset\u7ed9\u7684\u6570\u7ec4\u91cc\u9762\u7684\u503c\u5fc5\u987b\u65f6string,\u5df2\u7ecf\u8fc7\u6ee4\u6389", e);
          }),
          qr.send({ type: "profile_unset", properties: n }, t))
        : ar.log("profile_unset\u7684\u53c2\u6570\u662f\u6570\u7ec4");
  }
  function vt(e, t) {
    function r(e) {
      (ar.store._state.identities.$identity_anonymous_id = e), ar.store.save();
    }
    "number" == typeof e && (e = String(e));
    var n = Ur.getFirstId();
    if ("undefined" == typeof e) {
      var i = ur();
      n ? Ur.set("first_id", i) : Ur.set("distinct_id", i), r(i);
    } else qr.check({ distinct_id: e }) && (t === !0 ? (n ? Ur.set("first_id", e) : Ur.set("distinct_id", e)) : n ? Ur.change("first_id", e) : Ur.change("distinct_id", e), r(e));
  }
  function yt(e, t, r, n) {
    var i = Ur.getFirstId() || Ur.getDistinctId();
    Ur.set("distinct_id", e), qr.send({ original_id: i, distinct_id: ar.store.getDistinctId(), type: "track_signup", event: t, properties: r }, n);
  }
  function bt(e, t, r, n) {
    "number" == typeof e && (e = String(e)), qr.check({ distinct_id: e, event: t, properties: r }) && yt(e, t, r, n);
  }
  function St(e) {
    qr.check({ properties: e }) ? $(Ar.currentProps, e) : ar.log("register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef");
  }
  function wt(e) {
    Ur.clearAllProps(e);
  }
  function kt(e) {
    var t;
    if (v(e) && e.length > 0) for (t = 0; t < e.length; t++) p(e[t]) && e[t] in Ar.currentProps && delete Ar.currentProps[e[t]];
    else if (e === !0) for (t in Ar.currentProps) delete Ar.currentProps[t];
  }
  function $t(e) {
    qr.check({ properties: e }) ? Ur.setProps(e) : ar.log("register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef");
  }
  function Pt(e) {
    qr.check({ properties: e }) ? Ur.setPropsOnce(e) : ar.log("registerOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef");
  }
  function Ct(e) {
    qr.check({ properties: e }) ? Ur.setSessionProps(e) : ar.log("registerSession\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef");
  }
  function Ot(e) {
    qr.check({ properties: e }) ? Ur.setSessionPropsOnce(e) : ar.log("registerSessionOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef");
  }
  function Nt(e) {
    var t = e.id,
      n = e.callback,
      i = e.name,
      a = Ur.getFirstId(),
      o = Ur.getOriginDistinctId();
    if (!qr.check({ distinct_id: t })) return ar.log("login id is invalid"), !1;
    if (t === ar.store.getOriginDistinctId() && !a) return ar.log("login id is equal to distinct_id"), !1;
    if (r(ar.store._state.identities) && ar.store._state.identities.hasOwnProperty(i) && t === ar.store._state.first_id) return !1;
    var s = ar.store._state.history_login_id.name !== i || t !== ar.store._state.history_login_id.value;
    if (s) {
      (ar.store._state.identities[i] = t), ar.store.set("history_login_id", { name: i, value: t }), a || Ur.set("first_id", o), yt(t, "$SignUp", {}, n);
      var c = { $identity_cookie_id: ar.store._state.identities.$identity_cookie_id };
      return (c[i] = t), Qe(c), !0;
    }
    return !0;
  }
  function xt(t, r) {
    "number" == typeof t && (t = String(t));
    var n = Nt({ id: t, callback: r, name: jr.LOGIN });
    !n && e(r) && r();
  }
  function Tt(e, t) {
    return (
      "number" == typeof t && (t = String(t)), "number" == typeof e && (e = String(e)), !!qr.check({ loginIdKey: e }) && (jr.LOGIN === e ? (xt(t), !1) : void Nt({ id: t, callback: null, name: e }))
    );
  }
  function jt(e) {
    var t = Ur.getFirstId();
    if (t)
      if ((Ur.set("first_id", ""), e === !0)) {
        var r = ur();
        Ur.set("distinct_id", r);
      } else Ur.set("distinct_id", t);
    Qe({ $identity_cookie_id: ar.store._state.identities.$identity_cookie_id }), ar.store.set("history_login_id", { name: "", value: "" });
  }
  function Dt() {
    function e() {
      var e = Ar.campaignParams(),
        t = {};
      return (
        k(e, function (e, r, n) {
          (" " + ar.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? (t["$" + r] = n[r]) : (t[r] = n[r]);
        }),
        t
      );
    }
    var t = {
        $is_first_day: Ve(),
        $is_first_time: Lr.is_page_first_visited,
        $referrer: Ar.pageProp.referrer || "",
        $referrer_host: Ar.pageProp.referrer ? q(Ar.pageProp.referrer) : "",
        $url: X(),
        $url_path: Z(),
        $title: document.title || "",
        _distinct_id: Ur.getDistinctId(),
        identities: JSON.parse(JSON.stringify(Ur._state.identities)),
      },
      r = $({}, Ar.properties(), ar.store.getProps(), e(), t);
    return ar.para.preset_properties.latest_referrer && ar.para.preset_properties.latest_referrer_host && (r.$latest_referrer_host = "" === r.$latest_referrer ? "" : q(r.$latest_referrer)), r;
  }
  function At() {
    var e = "",
      t = " { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }";
    ar.heatmap &&
      v(ar.heatmap.otherTags) &&
      k(ar.heatmap.otherTags, function (r) {
        e += r + t;
      }),
      se() &&
        K() &&
        K() < 13 &&
        (ar.para.heatmap && ar.para.heatmap.collect_tags && ar.para.heatmap.collect_tags.div && ye("div, [data-sensors-click]" + t),
        ar.para.heatmap && ar.para.heatmap.track_attr && ye("[" + ar.para.heatmap.track_attr.join("], [") + "]" + t),
        "" !== e && ye(e));
  }
  function Et(e, t) {
    var r = Zr.encodeTrackData(t);
    return e.indexOf("?") !== -1 ? e + "&" + r : e + "?" + r;
  }
  function It(e) {
    return Zr.encodeTrackData(e);
  }
  function Lt(e) {
    var t = ["image", "ajax", "beacon"],
      r = t[0];
    return (r = e.config && te(t, e.config.send_type) > -1 ? e.config.send_type : ar.para.send_type), "beacon" === r && ue() === !1 && (r = "image"), "ajax" === r && pe() === !1 && (r = "image"), r;
  }
  function Ut(e) {
    var t = Lt(e);
    switch (t) {
      case "image":
        return new Yr(e);
      case "ajax":
        return new Gr(e);
      case "beacon":
        return new Qr(e);
      default:
        return new Yr(e);
    }
  }
  function Rt(e) {
    var t = Ut(e),
      r = t.start;
    return (
      (t.start = function () {
        var e = this;
        r.apply(this, arguments),
          setTimeout(function () {
            e.isEnd(!0);
          }, ar.para.callback_timeout);
      }),
      (t.end = function () {
        this.callback && this.callback();
        var e = this;
        setTimeout(function () {
          e.lastClear && e.lastClear();
        }, ar.para.datasend_timeout - ar.para.callback_timeout);
      }),
      (t.isEnd = function () {
        this.received || ((this.received = !0), this.end());
      }),
      t
    );
  }
  function Jt() {
    k(tn, function (e) {
      var t = ar[e];
      ar[e] = function () {
        if (ar.readyState.state < 3) return v(ar._q) || (ar._q = []), ar._q.push([e, arguments]), !1;
        {
          if (ar.readyState.getState()) return t.apply(ar, arguments);
          try {
            console.error("\u8bf7\u5148\u521d\u59cb\u5316\u795e\u7b56JS SDK");
          } catch (r) {
            ar.log(r);
          }
        }
      };
    });
  }
  function Ht() {
    console.log('配置信息',ar.para.is_track_single_page)
    ar.para.is_track_single_page &&
      rn.on("switch", function (e) {
        console.log('单页面跳转')
        var t = function (t) {
          (t = t || {}), e !== location.href && ((Ar.pageProp.referrer = X(e)), ar.quick("autoTrack", $({ $url: X(), $referrer: X(e) }, t)));
        };
        if ("boolean" == typeof ar.para.is_track_single_page) t();
        else if ("function" == typeof ar.para.is_track_single_page) {
          var n = ar.para.is_track_single_page();
          r(n) ? t(n) : n === !0 && t();
        }
      });
  }
  function Mt() {
    ar._q &&
      v(ar._q) &&
      ar._q.length > 0 &&
      k(ar._q, function (e) {
        ar[e[0]].apply(ar, Array.prototype.slice.call(e[1]));
      }),
      r(ar.para.heatmap) && (Br.initHeatmap(), Br.initScrollmap());
  }
  function qt() {
    ar.readyState.setState(3), Ar.initPage(), Ht(), ar.store.init(), ar.readyState.setState(4), Mt();
  }
  function Kt(e) {
    (this.cancel = function () {
      e = !0;
    }),
      (this.getCanceled = function () {
        return e || !1;
      });
  }
  function Bt(e, t, r) {
    var n = null;
    try {
      n = JSON.parse(JSON.stringify(e));
    } catch (i) {
      Pe(i);
    }
    (this.getOriginalData = function () {
      return n;
    }),
      (this.getPosition = function () {
        return t;
      }),
      (this.cancelationToken = new Kt()),
      (this.sensors = r);
  }
  function Ft(e) {
    if (!r(e)) throw "error: Stage constructor requires arguments.";
    (this.processDef = e), (this.registeredInterceptors = {});
  }
  function Wt(e) {
    e && e.dataStage && an.registerStageImplementation(e.dataStage);
  }
  function zt(e) {
    (e.kit = Zr), (e.saEvent = qr), (this.dataStage = Mr);
  }
  function Vt(t) {
    return r(t)
      ? (k(t, function (r, n) {
          if (v(r)) {
            var i = [];
            k(r, function (e) {
              p(e) ? i.push(e) : Pe("\u60a8\u7684\u6570\u636e-", n, r, "\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664");
            }),
              (t[n] = i);
          }
          p(r) ||
            le(r) ||
            A(r) ||
            ie(r) ||
            v(r) ||
            e(r) ||
            "$option" === n ||
            (Pe("\u60a8\u7684\u6570\u636e-", n, r, "-\u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete t[n]);
        }),
        t)
      : t;
  }
  function Xt(e, t) {
    return le(t) && e.length > t ? (Pe("\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--" + e), e.slice(0, t)) : e;
  }
  function Zt(e) {
    var t = ["distinct_id", "user_id", "id", "date", "datetime", "event", "events", "first_id", "original_id", "device_id", "properties", "second_id", "time", "users"];
    r(e) &&
      k(t, function (t, r) {
        t in e &&
          (r < 3
            ? (delete e[t], Pe("\u60a8\u7684\u5c5e\u6027- " + t + "\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"))
            : Pe("\u60a8\u7684\u5c5e\u6027- " + t + "\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u8bf7\u907f\u514d\u5176\u4f5c\u4e3a\u5c5e\u6027\u540d"));
      });
  }
  function Yt(e) {
    var t = ["$element_selector", "$element_path"],
      n = ["sensorsdata_app_visual_properties"];
    r(e) &&
      k(e, function (i, a) {
        if (r(i)) Yt(e[a]);
        else if (p(i)) {
          if (te(n, a) > -1) return;
          e[a] = Xt(i, te(t, a) > -1 ? 1024 : kr.max_string_length);
        }
      });
  }
  function Gt(e) {
    "undefined" != typeof e.properties.$project && ((e.project = e.properties.$project), delete e.properties.$project),
      "undefined" != typeof e.properties.$token && ((e.token = e.properties.$token), delete e.properties.$token);
  }
  function Qt(e) {
    if ("item_type" in e) {
      var t = e.item_type,
        r = function (t) {
          return t || delete e.item_type, !0;
        };
      Xe({ item_type: t }, r);
    }
    if ("item_id" in e) {
      var n = e.item_id,
        i = function (t, r, n) {
          return t || "string" !== n || delete e.item_id, !0;
        };
      Xe({ item_id: n }, i);
    }
  }
  function er(e) {
    k(e, function (t, r) {
      var n = function (t, n, i) {
        return t || "keyLength" === i || delete e[r], !0;
      };
      Xe({ propertyKey: r }, n);
    });
  }
  function tr(e) {
    var t = e.properties;
    r(t) ? (Vt(t), Zt(t), Gt(e), er(t), Yt(t)) : "properties" in e && (e.properties = {}), ve(e), Qt(e);
  }
  function rr() {
    this.dataStage = on;
  }
  function nr(t, n) {
    if (!p(t)) return Pe("use\u63d2\u4ef6\u540d\u79f0\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff01"), !1;
    if (r(window.SensorsDataWebJSSDKPlugin) && r(window.SensorsDataWebJSSDKPlugin[t]) && e(window.SensorsDataWebJSSDKPlugin[t].__constructor__)) {
      var i = new window.SensorsDataWebJSSDKPlugin[t].__constructor__();
      return i.init(ar, n), i;
    }
    Pe(t + "\u591a\u7248\u672c SDK\uff0c\u4e0d\u652f\u6301" + t + "\u63d2\u4ef6\uff01");
  }
  function ir() {}
  var ar = {};
  (function () {
    function e(n, i) {
      function a(e, t) {
        try {
          e();
        } catch (r) {
          t && t();
        }
      }
      function o(e) {
        if (null != o[e]) return o[e];
        var t;
        if ("bug-string-char-index" == e) t = "a" != "a"[0];
        else if ("json" == e) t = o("json-stringify") && o("date-serialization") && o("json-parse");
        else if ("date-serialization" == e) {
          if ((t = o("json-stringify") && b)) {
            var r = i.stringify;
            a(function () {
              t =
                '"-271821-04-20T00:00:00.000Z"' == r(new p(-864e13)) &&
                '"+275760-09-13T00:00:00.000Z"' == r(new p(864e13)) &&
                '"-000001-01-01T00:00:00.000Z"' == r(new p(-621987552e5)) &&
                '"1969-12-31T23:59:59.999Z"' == r(new p(-1));
            });
          }
        } else {
          var n,
            s = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          if ("json-stringify" == e) {
            var r = i.stringify,
              u = "function" == typeof r;
            u &&
              (((n = function () {
                return 1;
              }).toJSON = n),
              a(
                function () {
                  u =
                    "0" === r(0) &&
                    "0" === r(new c()) &&
                    '""' == r(new l()) &&
                    r(v) === g &&
                    r(g) === g &&
                    r() === g &&
                    "1" === r(n) &&
                    "[1]" == r([n]) &&
                    "[null]" == r([g]) &&
                    "null" == r(null) &&
                    "[null,null,null]" == r([g, v, null]) &&
                    r({ a: [n, !0, !1, null, "\0\b\n\f\r\t"] }) == s &&
                    "1" === r(null, n) &&
                    "[\n 1,\n 2\n]" == r([1, 2], null, 1);
                },
                function () {
                  u = !1;
                }
              )),
              (t = u);
          }
          if ("json-parse" == e) {
            var d,
              f = i.parse;
            "function" == typeof f &&
              a(
                function () {
                  0 !== f("0") ||
                    f(!1) ||
                    ((n = f(s)),
                    (d = 5 == n.a.length && 1 === n.a[0]),
                    d &&
                      (a(function () {
                        d = !f('"\t"');
                      }),
                      d &&
                        a(function () {
                          d = 1 !== f("01");
                        }),
                      d &&
                        a(function () {
                          d = 1 !== f("1.");
                        })));
                },
                function () {
                  d = !1;
                }
              ),
              (t = d);
          }
        }
        return (o[e] = !!t);
      }
      function s(e) {
        return D(this);
      }
      n || (n = r.Object()), i || (i = r.Object());
      var c = n.Number || r.Number,
        l = n.String || r.String,
        u = n.Object || r.Object,
        p = n.Date || r.Date,
        d = n.SyntaxError || r.SyntaxError,
        f = n.TypeError || r.TypeError,
        _ = n.Math || r.Math,
        h = n.JSON || r.JSON;
      if ("object" == typeof h && h) return (i.stringify = h.stringify), (i.parse = h.parse), (i.runInContext = e), i;
      var g,
        m = u.prototype,
        v = m.toString,
        y = m.hasOwnProperty,
        b = new p(-0xc782b5b800cec);
      if (
        (a(function () {
          b =
            b.getUTCFullYear() == -109252 &&
            0 === b.getUTCMonth() &&
            1 === b.getUTCDate() &&
            10 == b.getUTCHours() &&
            37 == b.getUTCMinutes() &&
            6 == b.getUTCSeconds() &&
            708 == b.getUTCMilliseconds();
        }),
        (o["bug-string-char-index"] = o["date-serialization"] = o.json = o["json-stringify"] = o["json-parse"] = null),
        !o("json"))
      ) {
        var S = "[object Function]",
          w = "[object Date]",
          k = "[object Number]",
          $ = "[object String]",
          P = "[object Array]",
          C = "[object Boolean]",
          O = o("bug-string-char-index"),
          N = function (e, r) {
            var n,
              i,
              a,
              o = 0;
            ((n = function () {
              this.valueOf = 0;
            }).prototype.valueOf = 0),
              (i = new n());
            for (a in i) y.call(i, a) && o++;
            return (
              (n = i = null),
              o
                ? (N = function (e, t) {
                    var r,
                      n,
                      i = v.call(e) == S;
                    for (r in e) (i && "prototype" == r) || !y.call(e, r) || (n = "constructor" === r) || t(r);
                    (n || y.call(e, (r = "constructor"))) && t(r);
                  })
                : ((i = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]),
                  (N = function (e, r) {
                    var n,
                      a,
                      o = v.call(e) == S,
                      s = (!o && "function" != typeof e.constructor && t[typeof e.hasOwnProperty] && e.hasOwnProperty) || y;
                    for (n in e) (o && "prototype" == n) || !s.call(e, n) || r(n);
                    for (a = i.length; (n = i[--a]); ) s.call(e, n) && r(n);
                  })),
              N(e, r)
            );
          };
        if (!o("json-stringify") && !o("date-serialization")) {
          var x = { 92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t" },
            T = "000000",
            j = function (e, t) {
              return (T + (t || 0)).slice(-e);
            },
            D = function (e) {
              var t, r, n, i, a, o, s, c, l;
              if (b)
                t = function (e) {
                  (r = e.getUTCFullYear()), (n = e.getUTCMonth()), (i = e.getUTCDate()), (o = e.getUTCHours()), (s = e.getUTCMinutes()), (c = e.getUTCSeconds()), (l = e.getUTCMilliseconds());
                };
              else {
                var u = _.floor,
                  p = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                  d = function (e, t) {
                    return p[t] + 365 * (e - 1970) + u((e - 1969 + (t = +(t > 1))) / 4) - u((e - 1901 + t) / 100) + u((e - 1601 + t) / 400);
                  };
                t = function (e) {
                  for (i = u(e / 864e5), r = u(i / 365.2425) + 1970 - 1; d(r + 1, 0) <= i; r++);
                  for (n = u((i - d(r, 0)) / 30.42); d(r, n + 1) <= i; n++);
                  (i = 1 + i - d(r, n)), (a = ((e % 864e5) + 864e5) % 864e5), (o = u(a / 36e5) % 24), (s = u(a / 6e4) % 60), (c = u(a / 1e3) % 60), (l = a % 1e3);
                };
              }
              return (D = function (e) {
                return (
                  e > -1 / 0 && e < 1 / 0
                    ? (t(e),
                      (e =
                        (r <= 0 || r >= 1e4 ? (r < 0 ? "-" : "+") + j(6, r < 0 ? -r : r) : j(4, r)) +
                        "-" +
                        j(2, n + 1) +
                        "-" +
                        j(2, i) +
                        "T" +
                        j(2, o) +
                        ":" +
                        j(2, s) +
                        ":" +
                        j(2, c) +
                        "." +
                        j(3, l) +
                        "Z"),
                      (r = n = i = o = s = c = l = null))
                    : (e = null),
                  e
                );
              })(e);
            };
          if (o("json-stringify") && !o("date-serialization")) {
            var A = i.stringify;
            i.stringify = function (e, t, r) {
              var n = p.prototype.toJSON;
              p.prototype.toJSON = s;
              var i = A(e, t, r);
              return (p.prototype.toJSON = n), i;
            };
          } else {
            var E = "\\u00",
              I = function (e) {
                var t = e.charCodeAt(0),
                  r = x[t];
                return r ? r : E + j(2, t.toString(16));
              },
              L = /[\x00-\x1f\x22\x5c]/g,
              U = function (e) {
                return (L.lastIndex = 0), '"' + (L.test(e) ? e.replace(L, I) : e) + '"';
              },
              R = function (e, t, r, n, i, o, s) {
                var c, l, u, d, _, h, m, y, b;
                if (
                  (a(function () {
                    c = t[e];
                  }),
                  "object" == typeof c && c && (c.getUTCFullYear && v.call(c) == w && c.toJSON === p.prototype.toJSON ? (c = D(c)) : "function" == typeof c.toJSON && (c = c.toJSON(e))),
                  r && (c = r.call(t, e, c)),
                  c == g)
                )
                  return c === g ? c : "null";
                switch (((l = typeof c), "object" == l && (u = v.call(c)), u || l)) {
                  case "boolean":
                  case C:
                    return "" + c;
                  case "number":
                  case k:
                    return c > -1 / 0 && c < 1 / 0 ? "" + c : "null";
                  case "string":
                  case $:
                    return U("" + c);
                }
                if ("object" == typeof c) {
                  for (m = s.length; m--; ) if (s[m] === c) throw f();
                  if ((s.push(c), (d = []), (y = o), (o += i), u == P)) {
                    for (h = 0, m = c.length; h < m; h++) (_ = R(h, c, r, n, i, o, s)), d.push(_ === g ? "null" : _);
                    b = d.length ? (i ? "[\n" + o + d.join(",\n" + o) + "\n" + y + "]" : "[" + d.join(",") + "]") : "[]";
                  } else
                    N(n || c, function (e) {
                      var t = R(e, c, r, n, i, o, s);
                      t !== g && d.push(U(e) + ":" + (i ? " " : "") + t);
                    }),
                      (b = d.length ? (i ? "{\n" + o + d.join(",\n" + o) + "\n" + y + "}" : "{" + d.join(",") + "}") : "{}");
                  return s.pop(), b;
                }
              };
            i.stringify = function (e, r, n) {
              var i, a, o, s;
              if (t[typeof r] && r)
                if (((s = v.call(r)), s == S)) a = r;
                else if (s == P) {
                  o = {};
                  for (var c, l = 0, u = r.length; l < u; ) (c = r[l++]), (s = v.call(c)), ("[object String]" != s && "[object Number]" != s) || (o[c] = 1);
                }
              if (n)
                if (((s = v.call(n)), s == k)) {
                  if ((n -= n % 1) > 0) for (n > 10 && (n = 10), i = ""; i.length < n; ) i += " ";
                } else s == $ && (i = n.length <= 10 ? n : n.slice(0, 10));
              return R("", ((c = {}), (c[""] = e), c), a, o, i, "", []);
            };
          }
        }
        if (!o("json-parse")) {
          var J,
            H,
            M = l.fromCharCode,
            q = { 92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r" },
            K = function () {
              throw ((J = H = null), d());
            },
            B = function () {
              for (var e, t, r, n, i, a = H, o = a.length; J < o; )
                switch ((i = a.charCodeAt(J))) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    J++;
                    break;
                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    return (e = O ? a.charAt(J) : a[J]), J++, e;
                  case 34:
                    for (e = "@", J++; J < o; )
                      if (((i = a.charCodeAt(J)), i < 32)) K();
                      else if (92 == i)
                        switch ((i = a.charCodeAt(++J))) {
                          case 92:
                          case 34:
                          case 47:
                          case 98:
                          case 116:
                          case 110:
                          case 102:
                          case 114:
                            (e += q[i]), J++;
                            break;
                          case 117:
                            for (t = ++J, r = J + 4; J < r; J++) (i = a.charCodeAt(J)), (i >= 48 && i <= 57) || (i >= 97 && i <= 102) || (i >= 65 && i <= 70) || K();
                            e += M("0x" + a.slice(t, J));
                            break;
                          default:
                            K();
                        }
                      else {
                        if (34 == i) break;
                        for (i = a.charCodeAt(J), t = J; i >= 32 && 92 != i && 34 != i; ) i = a.charCodeAt(++J);
                        e += a.slice(t, J);
                      }
                    if (34 == a.charCodeAt(J)) return J++, e;
                    K();
                  default:
                    if (((t = J), 45 == i && ((n = !0), (i = a.charCodeAt(++J))), i >= 48 && i <= 57)) {
                      for (48 == i && ((i = a.charCodeAt(J + 1)), i >= 48 && i <= 57) && K(), n = !1; J < o && ((i = a.charCodeAt(J)), i >= 48 && i <= 57); J++);
                      if (46 == a.charCodeAt(J)) {
                        for (r = ++J; r < o && ((i = a.charCodeAt(r)), !(i < 48 || i > 57)); r++);
                        r == J && K(), (J = r);
                      }
                      if (((i = a.charCodeAt(J)), 101 == i || 69 == i)) {
                        for (i = a.charCodeAt(++J), (43 != i && 45 != i) || J++, r = J; r < o && ((i = a.charCodeAt(r)), !(i < 48 || i > 57)); r++);
                        r == J && K(), (J = r);
                      }
                      return +a.slice(t, J);
                    }
                    n && K();
                    var s = a.slice(J, J + 4);
                    if ("true" == s) return (J += 4), !0;
                    if ("fals" == s && 101 == a.charCodeAt(J + 4)) return (J += 5), !1;
                    if ("null" == s) return (J += 4), null;
                    K();
                }
              return "$";
            },
            F = function (e) {
              var t, r;
              if (("$" == e && K(), "string" == typeof e)) {
                if ("@" == (O ? e.charAt(0) : e[0])) return e.slice(1);
                if ("[" == e) {
                  for (t = []; (e = B()), "]" != e; ) r ? ("," == e ? ((e = B()), "]" == e && K()) : K()) : (r = !0), "," == e && K(), t.push(F(e));
                  return t;
                }
                if ("{" == e) {
                  for (t = {}; (e = B()), "}" != e; )
                    r ? ("," == e ? ((e = B()), "}" == e && K()) : K()) : (r = !0),
                      ("," != e && "string" == typeof e && "@" == (O ? e.charAt(0) : e[0]) && ":" == B()) || K(),
                      (t[e.slice(1)] = F(B()));
                  return t;
                }
                K();
              }
              return e;
            },
            W = function (e, t, r) {
              var n = z(e, t, r);
              n === g ? delete e[t] : (e[t] = n);
            },
            z = function (e, t, r) {
              var n,
                i = e[t];
              if ("object" == typeof i && i)
                if (v.call(i) == P) for (n = i.length; n--; ) W(v, N, i, n, r);
                else
                  N(i, function (e) {
                    W(i, e, r);
                  });
              return r.call(e, t, i);
            };
          i.parse = function (e, t) {
            var r, n;
            return (J = 0), (H = "" + e), (r = F(B())), "$" != B() && K(), (J = H = null), t && v.call(t) == S ? z(((n = {}), (n[""] = r), n), "", t) : r;
          };
        }
      }
      return (i.runInContext = e), i;
    }
    var t = { function: !0, object: !0 },
      r = (t[typeof window] && window) || this,
      n = r.JSON,
      i = r.JSON3,
      a = !1,
      o = e(
        r,
        (r.JSON3 = {
          noConflict: function () {
            return a || ((a = !0), (r.JSON = n), (r.JSON3 = i), (n = i = null)), o;
          },
        })
      );
    r.JSON = { parse: o.parse, stringify: o.stringify };
  }).call(window),
    (function (e, t) {
      t(e);
    })(window, function (e) {
      if (e.atob)
        try {
          e.atob(" ");
        } catch (t) {
          e.atob = (function (e) {
            var t = function (t) {
              return e(String(t).replace(/[\t\n\f\r ]+/g, ""));
            };
            return (t.original = e), t;
          })(e.atob);
        }
      else {
        var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          n = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        (e.btoa = function (e) {
          e = String(e);
          for (var t, n, i, a, o = "", s = 0, c = e.length % 3; s < e.length; ) {
            if ((n = e.charCodeAt(s++)) > 255 || (i = e.charCodeAt(s++)) > 255 || (a = e.charCodeAt(s++)) > 255) return "";
            (t = (n << 16) | (i << 8) | a), (o += r.charAt((t >> 18) & 63) + r.charAt((t >> 12) & 63) + r.charAt((t >> 6) & 63) + r.charAt(63 & t));
          }
          return c ? o.slice(0, c - 3) + "===".substring(c) : o;
        }),
          (e.atob = function (e) {
            if (((e = String(e).replace(/[\t\n\f\r ]+/g, "")), !n.test(e))) return "";
            e += "==".slice(2 - (3 & e.length));
            for (var t, i, a, o = "", s = 0; s < e.length; )
              (t = (r.indexOf(e.charAt(s++)) << 18) | (r.indexOf(e.charAt(s++)) << 12) | ((i = r.indexOf(e.charAt(s++))) << 6) | (a = r.indexOf(e.charAt(s++)))),
                (o +=
                  64 === i ? String.fromCharCode((t >> 16) & 255) : 64 === a ? String.fromCharCode((t >> 16) & 255, (t >> 8) & 255) : String.fromCharCode((t >> 16) & 255, (t >> 8) & 255, 255 & t));
            return o;
          });
      }
    }),
    (function () {
      String.prototype.replaceAll ||
        (String.prototype.replaceAll = function (e, t) {
          return "[object regexp]" === Object.prototype.toString.call(e).toLowerCase() ? this.replace(e, t) : this.replace(new RegExp(e, "g"), t);
        });
    })();
  var or,
    sr = {
      setup: function (e) {
        or = e;
      },
      log: function () {
        (or || (console && console.log) || function () {}).apply(null, arguments);
      },
    },
    cr = {
      get: function (e) {
        return window.localStorage.getItem(e);
      },
      parse: function (e) {
        var t;
        try {
          t = JSON.parse(cr.get(e)) || null;
        } catch (r) {
          sr.log(r);
        }
        return t;
      },
      set: function (e, t) {
        try {
          window.localStorage.setItem(e, t);
        } catch (r) {
          sr.log(r);
        }
      },
      remove: function (e) {
        window.localStorage.removeItem(e);
      },
      isSupport: function () {
        var e = !0;
        try {
          var t = "__local_store_support__",
            r = "testIsSupportStorage";
          cr.set(t, r), cr.get(t) !== r && (e = !1), cr.remove(t);
        } catch (n) {
          e = !1;
        }
        return e;
      },
    },
    lr = (function () {
      function e() {
        return (r = (9301 * r + 49297) % 233280), r / 233280;
      }
      var t = new Date(),
        r = t.getTime();
      return function (t) {
        return Math.ceil(e() * t);
      };
    })();
  (a.prototype.get = function (e, r, a, o) {
    if (!e) throw new Error("key is must");
    (r = r || 1e4), (a = a || 1e3), (o = o || function () {});
    var s = this.lockGetPrefix + e,
      c = cr.get(s),
      l = String(n());
    return c && ((c = i(c) || { randomNum: 0, expireTime: 0 }), c.expireTime > t())
      ? o(null)
      : (cr.set(s, JSON.stringify({ randomNum: l, expireTime: t() + r })),
        void setTimeout(function () {
          (c = i(cr.get(s)) || { randomNum: 0, expireTime: 0 }), c && c.randomNum === l ? (o(cr.get(e)), cr.remove(e), cr.remove(s)) : o(null);
        }, a));
  }),
    (a.prototype.set = function (e, r, a, o, s) {
      if (!e || !r) throw new Error("key and val is must");
      (a = a || 1e4), (o = o || 1e3), (s = s || function () {});
      var c = this.lockSetPrefix + e,
        l = cr.get(c),
        u = String(n());
      return l && ((l = i(l) || { randomNum: 0, expireTime: 0 }), l.expireTime > t())
        ? s({ status: "fail", reason: "This key is locked" })
        : (cr.set(c, JSON.stringify({ randomNum: u, expireTime: t() + a })),
          void setTimeout(function () {
            (l = i(cr.get(c)) || { randomNum: 0, expireTime: 0 }), l.randomNum === u ? cr.set(e, r) && s({ status: "success" }) : s({ status: "fail", reason: "This key is locked" });
          }, o));
    }),
    (c.prototype.on = function (e, t) {
      if (!e || !t) return !1;
      if (!s(t)) throw new Error("listener must be a function");
      this._events[e] = this._events[e] || [];
      var r = "object" == typeof t;
      return this._events[e].push(r ? t : { listener: t, once: !1 }), this;
    }),
    (c.prototype.prepend = function (e, t) {
      if (!e || !t) return !1;
      if (!s(t)) throw new Error("listener must be a function");
      this._events[e] = this._events[e] || [];
      var r = "object" == typeof t;
      return this._events[e].unshift(r ? t : { listener: t, once: !1 }), this;
    }),
    (c.prototype.prependOnce = function (e, t) {
      return this.prepend(e, { listener: t, once: !0 });
    }),
    (c.prototype.once = function (e, t) {
      return this.on(e, { listener: t, once: !0 });
    }),
    (c.prototype.off = function (e, t) {
      var r = this._events[e];
      if (!r) return !1;
      if ("number" == typeof t) r.splice(t, 1);
      else if ("function" == typeof t) for (var n = 0, i = r.length; n < i; n++) r[n] && r[n].listener === t && r.splice(n, 1);
      return this;
    }),
    (c.prototype.emit = function (e, t) {
      var r = this._events[e];
      if (!r) return !1;
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        i && (i.listener.call(this, t || {}), i.once && this.off(e, n));
      }
      return this;
    }),
    (c.prototype.removeAllListeners = function (e) {
      e && this._events[e] ? (this._events[e] = []) : (this._events = {});
    }),
    (c.prototype.listeners = function (e) {
      return e && "string" == typeof e ? this._events[e] : this._events;
    });
  var ur = (function () {
      var e = function () {
          for (var e = 1 * new Date(), t = 0; e == 1 * new Date(); ) t++;
          return e.toString(16) + t.toString(16);
        },
        t = function () {
          return n().toString(16).replace(".", "");
        },
        r = function () {
          function e(e, t) {
            var r,
              n = 0;
            for (r = 0; r < t.length; r++) n |= i[r] << (8 * r);
            return e ^ n;
          }
          var t,
            r,
            n = navigator.userAgent,
            i = [],
            a = 0;
          for (t = 0; t < n.length; t++) (r = n.charCodeAt(t)), i.unshift(255 & r), i.length >= 4 && ((a = e(a, i)), (i = []));
          return i.length > 0 && (a = e(a, i)), a.toString(16);
        };
      return function () {
        var i = String(screen.height * screen.width);
        i =
          i && /\d{5,}/.test(i)
            ? i.toString(16)
            : String(31242 * n())
                .replace(".", "")
                .slice(0, 8);
        var a = e() + "-" + t() + "-" + r() + "-" + i + "-" + e();
        return a ? a : (String(n()) + String(n()) + String(n())).slice(2, 15);
      };
    })(),
    pr = function (e) {
      this.ele = e;
    },
    dr = function (e, t) {
      for (var r = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && r.push(e);
      return r;
    };
  pr.prototype = {
    addClass: function (e) {
      var t = " " + this.ele.className + " ";
      return t.indexOf(" " + e + " ") === -1 && (this.ele.className = this.ele.className + ("" === this.ele.className ? "" : " ") + e), this;
    },
    removeClass: function (e) {
      var t = " " + this.ele.className + " ";
      return t.indexOf(" " + e + " ") !== -1 && (this.ele.className = t.replace(" " + e + " ", " ").slice(1, -1)), this;
    },
    hasClass: function (e) {
      var t = " " + this.ele.className + " ";
      return t.indexOf(" " + e + " ") !== -1;
    },
    attr: function (e, t) {
      return "string" == typeof e && g(t) ? this.ele.getAttribute(e) : ("string" == typeof e && ((t = String(t)), this.ele.setAttribute(e, t)), this);
    },
    offset: function () {
      var e = this.ele.getBoundingClientRect();
      if (e.width || e.height) {
        var t = this.ele.ownerDocument,
          r = t.documentElement;
        return { top: e.top + window.pageYOffset - r.clientTop, left: e.left + window.pageXOffset - r.clientLeft };
      }
      return { top: 0, left: 0 };
    },
    getSize: function () {
      if (!window.getComputedStyle) return { width: this.ele.offsetWidth, height: this.ele.offsetHeight };
      try {
        var e = this.ele.getBoundingClientRect();
        return { width: e.width, height: e.height };
      } catch (t) {
        return { width: 0, height: 0 };
      }
    },
    getStyle: function (e) {
      return this.ele.currentStyle ? this.ele.currentStyle[e] : this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(e);
    },
    wrap: function (e) {
      var t = document.createElement(e);
      return this.ele.parentNode.insertBefore(t, this.ele), t.appendChild(this.ele), y(t);
    },
    getCssStyle: function (e) {
      var t = this.ele.style.getPropertyValue(e);
      if (t) return t;
      var r = null;
      if (("function" == typeof window.getMatchedCSSRules && (r = window.getMatchedCSSRules(this.ele)), !r || !v(r))) return null;
      for (var n = r.length - 1; n >= 0; n--) {
        var i = r[n];
        if ((t = i.style.getPropertyValue(e))) return t;
      }
    },
    sibling: function (e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    },
    next: function () {
      return this.sibling(this.ele, "nextSibling");
    },
    prev: function () {
      return this.sibling(this.ele, "previousSibling");
    },
    siblings: function () {
      return dr((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function () {
      return dr(this.ele.firstChild);
    },
    parent: function () {
      var e = this.ele.parentNode;
      return (e = e && 11 !== e.nodeType ? e : null), y(e);
    },
    previousElementSibling: function () {
      var e = this.ele;
      if ("previousElementSibling" in document.documentElement) return y(e.previousElementSibling);
      for (; (e = e.previousSibling); ) if (1 === e.nodeType) return y(e);
      return y(null);
    },
    getSameTypeSiblings: function () {
      for (var e = this.ele, t = e.parentNode, r = e.tagName.toLowerCase(), n = [], i = 0; i < t.children.length; i++) {
        var a = t.children[i];
        1 === a.nodeType && a.tagName.toLowerCase() === r && n.push(t.children[i]);
      }
      return n;
    },
    getParents: function () {
      try {
        var e = this.ele;
        if (!h(e)) return [];
        var t = [e];
        if (null === e || null === e.parentElement) return [];
        for (; null !== e.parentElement; ) (e = e.parentElement), t.push(e);
        return t;
      } catch (r) {
        return [];
      }
    },
  };
  var fr = Array.prototype.forEach,
    _r = Object.prototype.hasOwnProperty,
    hr = Object.prototype.hasOwnProperty,
    gr = {
      get: function (e) {
        for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
          for (var i = r[n]; " " == i.charAt(0); ) i = i.substring(1, i.length);
          if (0 == i.indexOf(t)) return l(i.substring(t.length, i.length));
        }
        return null;
      },
      set: function (e, t, r, n, i, a, o) {
        function s(e) {
          return !!e && e.replaceAll(/\r\n/g, "");
        }
        var c = o,
          l = "",
          u = "",
          d = "";
        if (((r = null == r ? 73e3 : r), 0 !== r)) {
          var f = new Date();
          "s" === String(r).slice(-1) ? f.setTime(f.getTime() + 1e3 * Number(String(r).slice(0, -1))) : f.setTime(f.getTime() + 24 * r * 60 * 60 * 1e3), (l = "; expires=" + f.toGMTString());
        }
        p(i) && "" !== i && (d = "; SameSite=" + i), a && (u = "; secure");
        var _ = "",
          h = "",
          g = "";
        e && (_ = s(e)), t && (h = s(t)), c && (g = s(c)), _ && h && (document.cookie = _ + "=" + encodeURIComponent(h) + l + "; path=/" + g + d + u);
      },
      remove: function (e, t) {
        this.set(e, "1", -1, t);
      },
      isSupport: function (e, t) {
        function r() {
          n.set(e, t);
          var r = n.get(e);
          return r === t && (n.remove(e), !0);
        }
        (e = e || "cookie_support_test"), (t = t || "1");
        var n = this;
        return navigator.cookieEnabled && r();
      },
    },
    mr = Object.prototype.hasOwnProperty,
    vr = {
      isSupport: function () {
        var e = !0,
          t = "__session_storage_support__",
          r = "testIsSupportStorage";
        try {
          sessionStorage && sessionStorage.setItem ? (sessionStorage.setItem(t, r), sessionStorage.removeItem(t, r), (e = !0)) : (e = !1);
        } catch (n) {
          e = !1;
        }
        return e;
      },
    },
    yr = { "+": "-", "/": "_", "=": "." },
    br = { "-": "+", _: "/", ".": "=" },
    Sr = {
      encode: function (e) {
        return e.replace(/[+\/=]/g, function (e) {
          return yr[e];
        });
      },
      decode: function (e) {
        return e.replace(/[-_.]/g, function (e) {
          return br[e];
        });
      },
      trim: function (e) {
        return e.replace(/[.=]{1,2}$/, "");
      },
      isBase64: function (e) {
        return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e);
      },
      isUrlSafeBase64: function (e) {
        return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e);
      },
    },
    wr = {
      __proto__: null,
      ConcurrentStorage: a,
      EventEmitter: c,
      URL: _,
      UUID: ur,
      addEvent: b,
      addHashEvent: S,
      ajax: P,
      base64Decode: O,
      base64Encode: N,
      bindReady: x,
      cookie: gr,
      coverExtend: T,
      decodeURI: j,
      decodeURIComponent: l,
      dfmapping: D,
      each: k,
      encodeDates: I,
      extend: $,
      extend2Lev: L,
      filter: U,
      formatDate: E,
      formatJsonString: R,
      getCookieTopLevelDomain: J,
      getDomBySelector: H,
      getElementContent: M,
      getHostname: q,
      getIOSVersion: K,
      getQueryParam: B,
      getQueryParamsFromUrl: F,
      getRandom: n,
      getRandomBasic: lr,
      getScreenOrientation: z,
      getUA: V,
      getURL: X,
      getURLPath: Z,
      getURLSearchParams: u,
      hasAttribute: Y,
      hasAttributes: G,
      hashCode: Q,
      hashCode53: ee,
      indexOf: te,
      inherit: re,
      isArguments: ne,
      isArray: v,
      isBoolean: ie,
      isDate: A,
      isElement: h,
      isEmptyObject: ae,
      isFunction: e,
      isHttpUrl: oe,
      isIOS: se,
      isJSONString: ce,
      isNumber: le,
      isObject: r,
      isString: p,
      isSupportBeaconSend: ue,
      isSupportCors: pe,
      isUndefined: g,
      jsonp: de,
      listenPageState: fe,
      loadScript: _e,
      localStorage: cr,
      logger: sr,
      map: C,
      mediaQueriesSupported: W,
      now: t,
      removeScriptProtocol: he,
      rot13defs: me,
      rot13obfs: ge,
      ry: y,
      safeJSONParse: i,
      searchObjDate: ve,
      sessionStorage: vr,
      setCssStyle: ye,
      strToUnicode: be,
      throttle: Se,
      toArray: ke,
      trim: d,
      unique: $e,
      urlParse: f,
      urlSafeBase64: Sr,
      values: we,
      xhr: w,
    },
    kr = {},
    $r = {
      preset_properties: {
        search_keyword_baidu: !1,
        latest_utm: !0,
        latest_traffic_source_type: !0,
        latest_search_keyword: !0,
        latest_referrer: !0,
        latest_referrer_host: !1,
        latest_landing_page: !1,
        latest_wx_ad_click_id: void 0,
        url: !0,
        title: !0,
      },
      encrypt_cookie: !1,
      enc_cookie: !1,
      img_use_crossorigin: !1,
      name: "sa",
      max_referrer_string_length: 200,
      max_string_length: 500,
      max_id_length: 255,
      max_key_length: 100,
      cross_subdomain: !0,
      show_log: !1,
      is_debug: !1,
      debug_mode: !1,
      debug_mode_upload: !1,
      source_channel: [],
      sdk_id: "",
      send_type: "image",
      vtrack_ignore: {},
      auto_init: !0,
      is_track_single_page: !1,
      is_single_page: !1,
      batch_send: !1,
      source_type: {},
      callback_timeout: 200,
      datasend_timeout: 8e3,
      is_track_device_id: !1,
      ignore_oom: !0,
      app_js_bridge: !1,
    },
    Pr = "data:enc;",
    Cr = "dfm-enc-",
    Or = {
      distinct_id: function () {},
      jssdkDebug: function () {},
      _sendDebug: function (e) {},
      apph5: function (e) {
        var t = "app_h5\u6253\u901a\u5931\u8d25-",
          n = {
            1: t + "use_app_track\u4e3afalse",
            2: t + "Android\u6216\u8005iOS\uff0c\u6ca1\u6709\u66b4\u9732\u76f8\u5e94\u65b9\u6cd5",
            3.1: t + "Android\u6821\u9a8cserver_url\u5931\u8d25",
            3.2: t + "iOS\u6821\u9a8cserver_url\u5931\u8d25",
            4.1: t + "H5 \u6821\u9a8c iOS server_url \u5931\u8d25",
            4.2: t + "H5 \u6821\u9a8c Android server_url \u5931\u8d25",
          },
          i = e.output,
          a = e.step,
          o = e.data || "";
        ("all" !== i && "console" !== i) || Pe(n[a]),
          ("all" === i || "code" === i) && r(kr.is_debug) && kr.is_debug.apph5 && ((o.type && "profile" === o.type.slice(0, 7)) || (o.properties._jssdk_debug_info = "apph5-" + String(a)));
      },
      defineMode: function (e) {
        var t = {
          1: {
            title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
            message:
              "App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 App SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
            link_text: "\u914d\u7f6e\u6587\u6863",
            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html",
          },
          2: {
            title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
            message:
              "App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 Web JS SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
            link_text: "\u914d\u7f6e\u6587\u6863",
            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html",
          },
          3: {
            title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
            message:
              "Web JS SDK \u6ca1\u6709\u5f00\u542f\u5168\u57cb\u70b9\u914d\u7f6e\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
            link_text: "\u914d\u7f6e\u6587\u6863",
            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html",
          },
          4: {
            title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
            message:
              "Web JS SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0e App SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0d\u4e00\u81f4\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
            link_text: "\u914d\u7f6e\u6587\u6863",
            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html",
          },
        };
        return !(!e || !t[e]) && t[e];
      },
      protocol: {
        protocolIsSame: function (e, t) {
          try {
            if (_(e).protocol !== _(t).protocol) return !1;
          } catch (r) {
            return Pe("\u4e0d\u652f\u6301 _.URL \u65b9\u6cd5"), !1;
          }
          return !0;
        },
        serverUrl: function () {
          p(kr.server_url) &&
            "" !== kr.server_url &&
            !this.protocolIsSame(kr.server_url, location.href) &&
            Pe(
              "SDK \u68c0\u6d4b\u5230\u60a8\u7684\u6570\u636e\u53d1\u9001\u5730\u5740\u548c\u5f53\u524d\u9875\u9762\u5730\u5740\u7684\u534f\u8bae\u4e0d\u4e00\u81f4\uff0c\u5efa\u8bae\u60a8\u4fee\u6539\u6210\u4e00\u81f4\u7684\u534f\u8bae\u3002\n\u56e0\u4e3a\uff1a1\u3001https \u4e0b\u9762\u53d1\u9001 http \u7684\u56fe\u7247\u8bf7\u6c42\u4f1a\u5931\u8d25\u30022\u3001http \u9875\u9762\u4f7f\u7528 https + ajax \u65b9\u5f0f\u53d1\u6570\u636e\uff0c\u5728 ie9 \u53ca\u4ee5\u4e0b\u4f1a\u4e22\u5931\u6570\u636e\u3002"
            );
        },
        ajax: function (e) {
          return (
            e !== kr.server_url &&
            void (
              p(e) &&
              "" !== e &&
              !this.protocolIsSame(e, location.href) &&
              Pe(
                "SDK \u68c0\u6d4b\u5230\u60a8\u7684\u6570\u636e\u53d1\u9001\u5730\u5740\u548c\u5f53\u524d\u9875\u9762\u5730\u5740\u7684\u534f\u8bae\u4e0d\u4e00\u81f4\uff0c\u5efa\u8bae\u60a8\u4fee\u6539\u6210\u4e00\u81f4\u7684\u534f\u8bae\u3002\u56e0\u4e3a http \u9875\u9762\u4f7f\u7528 https + ajax \u65b9\u5f0f\u53d1\u6570\u636e\uff0c\u5728 ie9 \u53ca\u4ee5\u4e0b\u4f1a\u4e22\u5931\u6570\u636e\u3002"
              )
            )
          );
        },
      },
    },
    Nr = "utm_source utm_medium utm_campaign utm_content utm_term",
    xr = "1.22.8",
    Tr = "sensorsdata_domain_test",
    jr = { EMAIL: "$identity_email", MOBILE: "$identity_mobile", LOGIN: "$identity_login_id" },
    Dr = {
      data: {},
      id: function () {
        return this.data.id ? this.data.id : ((this.data.id = Ie()), this.data.id);
      },
      type: function () {
        return this.data.type ? this.data.type : ((this.data.type = Le()), this.data.type);
      },
    },
    Ar = {
      initPage: function () {
        var e = Re(),
          t = X(),
          r = De(t);
        r || Or.jssdkDebug("url_domain\u5f02\u5e38_" + t + "_" + r),
          (this.pageProp = { referrer: e, referrer_host: e ? q(e) : "", url: t, url_host: q(t, "url_host\u53d6\u503c\u5f02\u5e38"), url_domain: r });
      },
      pageProp: {},
      campaignParams: function () {
        var e = Nr.split(" "),
          t = "",
          r = {};
        return (
          v(kr.source_channel) && kr.source_channel.length > 0 && ((e = e.concat(kr.source_channel)), (e = $e(e))),
          k(e, function (e) {
            (t = B(location.href, e)), t.length && (r[e] = t);
          }),
          r
        );
      },
      campaignParamsStandard: function (e, t) {
        (e = e || ""), (t = t || "");
        var r = Ar.campaignParams(),
          n = {},
          i = {};
        return (
          k(r, function (r, a, o) {
            (" " + Nr + " ").indexOf(" " + a + " ") !== -1 ? (n[e + a] = o[a]) : (i[t + a] = o[a]);
          }),
          { $utms: n, otherUtms: i }
        );
      },
      properties: function () {
        var e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
          t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
          r = {
            $timezone_offset: new Date().getTimezoneOffset(),
            $screen_height: Number(screen.height) || 0,
            $screen_width: Number(screen.width) || 0,
            $viewport_height: e,
            $viewport_width: t,
            $lib: "js",
            $lib_version: xr,
          };
        return r;
      },
      currentProps: {},
      register: function (e) {
        $(Ar.currentProps, e);
      },
    },
    Er = {
      get: function (e) {
        return gr.get(e);
      },
      set: function (e, t, r, n) {
        var i = "";
        if ((n = "undefined" == typeof n ? kr.cross_subdomain : n)) {
          var a = De(location.href);
          "url\u89e3\u6790\u5931\u8d25" === a && (a = ""), (i = a ? "; domain=" + a : "");
        }
        return gr.set(e, t, r, n, kr.set_cookie_samesite, kr.is_secure_cookie, i);
      },
      remove: function (e, t) {
        return (t = "undefined" == typeof t ? kr.cross_subdomain : t), gr.remove(e, t);
      },
      isSupport: function (e, t) {
        return (e = e || "sajssdk_2015_cookie_access_test"), (t = t || "1"), gr.isSupport(e, t);
      },
    };
  Er.getNewUser = Ve;
  var Ir = {
      data: {},
      get: function (e) {
        var t = this.data[e];
        return void 0 === t ? null : void 0 !== t._expirationTimestamp_ ? (new Date().getTime() > t._expirationTimestamp_ ? null : t.value) : t;
      },
      set: function (e, t, r) {
        if (r) {
          var n,
            i = new Date();
          (n = "s" === String(r).slice(-1) ? i.getTime() + 1e3 * Number(String(r).slice(0, -1)) : i.getTime() + 24 * r * 60 * 60 * 1e3), (t = { value: t, _expirationTimestamp_: n });
        }
        this.data[e] = t;
      },
      getNewUserFlagMemoryKey: function (e) {
        return "sajssdk_2015_" + kr.sdk_id + e;
      },
    },
    Lr = {
      checkIsAddSign: function (e) {
        "track" === e.type && (Ve() ? (e.properties.$is_first_day = !0) : (e.properties.$is_first_day = !1));
      },
      is_first_visit_time: !1,
      is_page_first_visited: !1,
      checkIsFirstTime: function (e) {
        "track" === e.type && "$pageview" === e.event && (this.is_first_visit_time ? ((e.properties.$is_first_time = !0), (this.is_first_visit_time = !1)) : (e.properties.$is_first_time = !1));
      },
      setDeviceId: function (e) {
        var t = null,
          r = Er.get("sensorsdata2015jssdkcross" + ar.para.sdk_id);
        r = Oe(r);
        var n = {};
        null != r && ce(r) && ((n = JSON.parse(r)), n.$device_id && (t = n.$device_id)),
          (t = t || e),
          ar.para.cross_subdomain === !0
            ? ar.store.set("$device_id", t)
            : ((n.$device_id = t), (n = JSON.stringify(n)), ar.para.encrypt_cookie && (n = Ne(n)), Er.set("sensorsdata2015jssdkcross" + ar.para.sdk_id, n, null, !0)),
          ar.para.is_track_device_id && (Ar.currentProps.$device_id = t);
      },
      storeInitCheck: function () {
        if (ar.is_first_visitor) {
          var e = new Date(),
            t = { h: 23 - e.getHours(), m: 59 - e.getMinutes(), s: 59 - e.getSeconds() };
          Er.isSupport() ? Er.set(ze("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s") : Ir.set(Ir.getNewUserFlagMemoryKey("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s"),
            (this.is_first_visit_time = !0),
            (this.is_page_first_visited = !0);
        } else
          Ve() ||
            (this.checkIsAddSign = function (e) {
              "track" === e.type && (e.properties.$is_first_day = !1);
            }),
            (this.checkIsFirstTime = function (e) {
              "track" === e.type && "$pageview" === e.event && (e.properties.$is_first_time = !1);
            });
      },
      checkIsFirstLatest: function () {
        var e = Ar.pageProp.url_domain,
          t = {};
        "" === e && (e = "url\u89e3\u6790\u5931\u8d25");
        var n = He(document.referrer, !0);
        if (
          (ar.para.preset_properties.search_keyword_baidu
            ? Ue(document.referrer) &&
              (!Ee() || (r(n) && n.active)
                ? ar.store._state &&
                  ar.store._state.props &&
                  (ar.store._state.props.$search_keyword_id && delete ar.store._state.props.$search_keyword_id,
                  ar.store._state.props.$search_keyword_id_type && delete ar.store._state.props.$search_keyword_id_type,
                  ar.store._state.props.$search_keyword_id_hash && delete ar.store._state.props.$search_keyword_id_hash)
                : ((t.$search_keyword_id = Dr.id()), (t.$search_keyword_id_type = Dr.type()), (t.$search_keyword_id_hash = ee(t.$search_keyword_id))))
            : ar.store._state &&
              ar.store._state.props &&
              (ar.store._state.props.$search_keyword_id && delete ar.store._state.props.$search_keyword_id,
              ar.store._state.props.$search_keyword_id_type && delete ar.store._state.props.$search_keyword_id_type,
              ar.store._state.props.$search_keyword_id_hash && delete ar.store._state.props.$search_keyword_id_hash),
          ar.store.save(),
          k(ar.para.preset_properties, function (n, i) {
            if (i.indexOf("latest_") === -1) return !1;
            if (((i = i.slice(7)), n)) {
              if ("wx_ad_click_id" === i && "not_collect" === n) return !1;
              if ("utm" !== i && "url\u89e3\u6790\u5931\u8d25" === e)
                "wx_ad_click_id" === i
                  ? ((t._latest_wx_ad_click_id = "url\u7684domain\u89e3\u6790\u5931\u8d25"),
                    (t._latest_wx_ad_hash_key = "url\u7684domain\u89e3\u6790\u5931\u8d25"),
                    (t._latest_wx_ad_callbacks = "url\u7684domain\u89e3\u6790\u5931\u8d25"))
                  : (t["$latest_" + i] = "url\u7684domain\u89e3\u6790\u5931\u8d25");
              else if (Ue(document.referrer))
                switch (i) {
                  case "traffic_source_type":
                    t.$latest_traffic_source_type = qe();
                    break;
                  case "referrer":
                    t.$latest_referrer = Ar.pageProp.referrer;
                    break;
                  case "search_keyword":
                    He()
                      ? (t.$latest_search_keyword = He())
                      : r(ar.store._state) && r(ar.store._state.props) && ar.store._state.props.$latest_search_keyword && delete ar.store._state.props.$latest_search_keyword;
                    break;
                  case "landing_page":
                    t.$latest_landing_page = X();
                    break;
                  case "wx_ad_click_id":
                    var a = Me(location.href);
                    (t._latest_wx_ad_click_id = a.click_id), (t._latest_wx_ad_hash_key = a.hash_key), (t._latest_wx_ad_callbacks = a.callbacks);
                }
            } else if ("utm" === i && ar.store._state && ar.store._state.props)
              for (var o in ar.store._state.props) (0 === o.indexOf("$latest_utm") || (0 === o.indexOf("_latest_") && o.indexOf("_latest_wx_ad_") < 0)) && delete ar.store._state.props[o];
            else if (ar.store._state && ar.store._state.props && "$latest_" + i in ar.store._state.props) delete ar.store._state.props["$latest_" + i];
            else if ("wx_ad_click_id" == i && ar.store._state && ar.store._state.props && n === !1) {
              var s = ["_latest_wx_ad_click_id", "_latest_wx_ad_hash_key", "_latest_wx_ad_callbacks"];
              k(s, function (e) {
                e in ar.store._state.props && delete ar.store._state.props[e];
              });
            }
          }),
          ar.register(t),
          ar.para.preset_properties.latest_utm)
        ) {
          var i = Ar.campaignParamsStandard("$latest_", "_latest_"),
            a = i.$utms,
            o = i.otherUtms;
          ae(a) || ar.register(a), ae(o) || ar.register(o);
        }
      },
    },
    Ur = {
      requests: [],
      _sessionState: {},
      _state: { distinct_id: "", first_id: "", props: {}, identities: {} },
      getProps: function () {
        return this._state.props || {};
      },
      getSessionProps: function () {
        return this._sessionState;
      },
      getOriginDistinctId: function () {
        return this._state._distinct_id || this._state.distinct_id;
      },
      getOriginUnionId: function (e) {
        var t = {};
        e = e || this._state;
        var r = e._first_id || e.first_id,
          n = e._distinct_id || e.distinct_id;
        return r && n ? ((t.login_id = n), (t.anonymous_id = r)) : (t.anonymous_id = n), t;
      },
      getDistinctId: function () {
        var e = this.getUnionId();
        return e.login_id || e.anonymous_id;
      },
      getUnionId: function (e) {
        var t = this.getOriginUnionId(e);
        return (
          t.login_id &&
            this._state.history_login_id &&
            this._state.history_login_id.name &&
            this._state.history_login_id.name !== ar.IDENTITY_KEY.LOGIN &&
            (t.login_id = this._state.history_login_id.name + "+" + t.login_id),
          t
        );
      },
      getFirstId: function () {
        return this._state._first_id || this._state.first_id;
      },
      initSessionState: function () {
        var e = Er.get("sensorsdata2015session");
        e = Oe(e);
        var t = null;
        null !== e && "object" == typeof (t = i(e)) && (this._sessionState = t || {});
      },
      setOnce: function (e, t) {
        e in this._state || this.set(e, t);
      },
      set: function (e, t) {
        this._state = this._state || {};
        var r = this._state.distinct_id;
        (this._state[e] = t),
          "first_id" === e ? delete this._state._first_id : "distinct_id" === e && delete this._state._distinct_id,
          this.save(),
          "distinct_id" === e && r && ar.events.tempAdd("changeDistinctId", t);
      },
      change: function (e, t) {
        this._state["_" + e] = t;
      },
      setSessionProps: function (e) {
        var t = this._sessionState;
        $(t, e), this.sessionSave(t);
      },
      setSessionPropsOnce: function (e) {
        var t = this._sessionState;
        T(t, e), this.sessionSave(t);
      },
      setProps: function (e, t) {
        var r = {};
        r = t ? e : $(this._state.props || {}, e);
        for (var n in r) "string" == typeof r[n] && (r[n] = r[n].slice(0, ar.para.max_referrer_string_length));
        this.set("props", r);
      },
      setPropsOnce: function (e) {
        var t = this._state.props || {};
        T(t, e), this.set("props", t);
      },
      clearAllProps: function (e) {
        this._sessionState = {};
        var t;
        if (v(e) && e.length > 0) for (t = 0; t < e.length; t++) p(e[t]) && e[t].indexOf("latest_") === -1 && r(this._state.props) && e[t] in this._state.props && delete this._state.props[e[t]];
        else if (r(this._state.props)) for (t in this._state.props) 1 !== t.indexOf("latest_") && delete this._state.props[t];
        this.sessionSave({}), this.save();
      },
      sessionSave: function (e) {
        this._sessionState = e;
        var t = JSON.stringify(this._sessionState);
        ar.para.encrypt_cookie && (t = Ne(t)), Er.set("sensorsdata2015session", t, 0);
      },
      save: function () {
        var e = JSON.parse(JSON.stringify(this._state));
        delete e._first_id, delete e._distinct_id, e.identities && (e.identities = N(JSON.stringify(e.identities)));
        var t = JSON.stringify(e);
        ar.para.encrypt_cookie && (t = Ne(t)), Er.set(this.getCookieName(), t, 73e3, ar.para.cross_subdomain);
      },
      getCookieName: function () {
        var e = "";
        if (ar.para.cross_subdomain === !1) {
          try {
            e = _(location.href).hostname;
          } catch (t) {
            ar.log(t);
          }
          e = "string" == typeof e && "" !== e ? "sa_jssdk_2015_" + ar.para.sdk_id + e.replace(/\./g, "_") : "sa_jssdk_2015_root" + ar.para.sdk_id;
        } else e = "sensorsdata2015jssdkcross" + ar.para.sdk_id;
        return e;
      },
      init: function () {
        function e(e) {
          var t;
          e.identities && (0 === e.identities.indexOf("\n/") ? (e.identities = i(me(e.identities))) : (e.identities = i(O(e.identities))));
          var n = Ur.getOriginUnionId(e);
          e.identities && r(e.identities) && !ae(e.identities)
            ? e.identities.$identity_anonymous_id && e.identities.$identity_anonymous_id !== n.anonymous_id && (e.identities.$identity_anonymous_id = n.anonymous_id)
            : ((e.identities = {}), (e.identities.$identity_anonymous_id = n.anonymous_id), (e.identities.$identity_cookie_id = ur())),
            (e.history_login_id = e.history_login_id || {});
          var a = e.history_login_id,
            o = a.name;
          if (n.login_id)
            if (o && e.identities.hasOwnProperty(o)) {
              if (e.identities[o] !== n.login_id) {
                e.identities[o] = n.login_id;
                for (t in e.identities) e.identities.hasOwnProperty(t) && "$identity_cookie_id" !== t && t !== o && delete e.identities[t];
                e.history_login_id.value = n.login_id;
              }
            } else {
              var s = o || ar.IDENTITY_KEY.LOGIN;
              e.identities[s] = n.login_id;
              for (t in e.identities) e.identities.hasOwnProperty(t) && "$identity_cookie_id" !== t && t !== s && delete e.identities[t];
              e.history_login_id = { name: s, value: n.login_id };
            }
          else {
            if (e.identities.hasOwnProperty("$identity_login_id") || e.identities.hasOwnProperty(o))
              for (t in e.identities) e.identities.hasOwnProperty(t) && "$identity_cookie_id" !== t && "$identity_anonymous_id" !== t && delete e.identities[t];
            e.history_login_id = { name: "", value: "" };
          }
          return e;
        }
        function t(e) {
          ar.store.set("distinct_id", e), ar.store.set("identities", { $identity_cookie_id: e }), ar.store.set("history_login_id", { name: "", value: "" });
        }
        this.initSessionState();
        var n,
          a,
          o = ur();
        Er.isSupport() && ((n = Er.get(this.getCookieName())), (n = Oe(n)), (a = i(n))),
          Er.isSupport() && null !== n && ce(n) && r(a) && (!r(a) || a.distinct_id) ? ((ar.store._state = $(e(a))), ar.store.save()) : ((ar.is_first_visitor = !0), t(o)),
          Lr.setDeviceId(o),
          Lr.storeInitCheck(),
          Lr.checkIsFirstLatest();
      },
      saveObjectVal: function (e, t) {
        p(t) || (t = JSON.stringify(t)), 1 == ar.para.encrypt_cookie && (t = Ne(t)), cr.set(e, t);
      },
      readObjectVal: function (e) {
        var t = cr.get(e);
        return t ? ((t = Oe(t)), i(t)) : null;
      },
    },
    Rr = {
      string: function (e) {
        Pe(e + " must be string");
      },
      emptyString: function (e) {
        Pe(e + "'s is empty");
      },
      regexTest: function (e) {
        Pe(e + " is invalid");
      },
      idLength: function (e) {
        Pe(e + " length is longer than " + kr.max_id_length);
      },
      keyLength: function (e) {
        Pe(e + " length is longer than " + kr.max_key_length);
      },
      stringLength: function (e) {
        Pe(e + " length is longer than " + kr.max_string_length);
      },
      voidZero: function (e) {
        Pe(e + "'s is undefined");
      },
      reservedLoginId: function (e) {
        Pe(e + " is invalid");
      },
      reservedBind: function (e) {
        Pe(e + " is invalid");
      },
      reservedUnbind: function (e) {
        Pe(e + " is invalid");
      },
    },
    Jr = {
      regName:
        /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_tag.*|^user_group.*)[a-zA-Z_$][a-zA-Z\d_$]*)$/i,
      loginIDReservedNames: ["$identity_anonymous_id", "$identity_cookie_id"],
      bindReservedNames: ["$identity_login_id", "$identity_anonymous_id", "$identity_cookie_id"],
      unbindReservedNames: ["$identity_anonymous_id", jr.LOGIN],
      string: function (e) {
        return !!p(e);
      },
      emptyString: function (e) {
        return !(!p(e) || 0 === d(e).length);
      },
      regexTest: function (e) {
        return !(!p(e) || !this.regName.test(e));
      },
      idLength: function (e) {
        return !(!p(e) || e.length > kr.max_id_length);
      },
      keyLength: function (e) {
        return !(!p(e) || e.length > kr.max_key_length);
      },
      stringLength: function (e) {
        return !(!p(e) || e.length > kr.max_string_length);
      },
      voidZero: function (e) {
        return void 0 !== e;
      },
      reservedLoginId: function (e) {
        return !(te(this.loginIDReservedNames, e) > -1);
      },
      reservedUnbind: function (e) {
        return !(te(this.unbindReservedNames, e) > -1);
      },
      reservedBind: function (e) {
        var t = Ur._state.history_login_id;
        return (!t || !t.name || t.name !== e) && !(te(this.bindReservedNames, e) > -1);
      },
    },
    Hr = {
      distinct_id: {
        rules: ["string", "emptyString", "idLength"],
        onComplete: function (t, r, n) {
          return (!t && ("emptyString" === n && (r = "Id"), e(Rr[n]) && Rr[n](r), "idLength" === n)) || t;
        },
      },
      event: {
        rules: ["string", "emptyString", "keyLength", "regexTest"],
        onComplete: function (t, r, n) {
          return t || ("emptyString" === n && (r = "eventName"), e(Rr[n]) && Rr[n](r)), !0;
        },
      },
      propertyKey: {
        rules: ["string", "emptyString", "keyLength", "regexTest"],
        onComplete: function (t, r, n) {
          return t || ("emptyString" === n && (r = "Property key"), e(Rr[n]) && Rr[n](r)), !0;
        },
      },
      propertyValue: {
        rules: ["voidZero"],
        onComplete: function (t, r, n) {
          return t || ((r = "Property Value"), e(Rr[n]) && Rr[n](r)), !0;
        },
      },
      properties: function (t) {
        return (
          r(t)
            ? k(t, function (t, r) {
                Xe({ propertyKey: r });
                var n = function (t, n, i) {
                  return t || ((n = r + "'s Value"), e(Rr[i]) && Rr[i](n)), !0;
                };
                Xe({ propertyValue: t }, n);
              })
            : Jr.voidZero(t) && Pe("properties\u53ef\u4ee5\u6ca1\u6709\uff0c\u4f46\u6709\u7684\u8bdd\u5fc5\u987b\u662f\u5bf9\u8c61"),
          !0
        );
      },
      propertiesMust: function (e) {
        return void 0 !== e && r(e) && !ae(e) ? this.properties.call(this, e) : Pe("properties\u5fc5\u987b\u662f\u5bf9\u8c61"), !0;
      },
      item_type: {
        rules: ["string", "emptyString", "keyLength", "regexTest"],
        onComplete: function (t, r, n) {
          return t || ("emptyString" === n && (r = "item_type"), e(Rr[n]) && Rr[n](r)), !0;
        },
      },
      item_id: {
        rules: ["string", "emptyString", "stringLength"],
        onComplete: function (t, r, n) {
          return t || ("emptyString" === n && (r = "item_id"), e(Rr[n]) && Rr[n](r)), !0;
        },
      },
      loginIdKey: {
        rules: ["string", "emptyString", "keyLength", "regexTest", "reservedLoginId"],
        onComplete: function (t, r, n) {
          return (!t && ("emptyString" === n && (r = "login_id_key"), e(Rr[n]) && Rr[n](r), "keyLength" === n)) || t;
        },
      },
      bindKey: {
        rules: ["string", "emptyString", "keyLength", "regexTest", "reservedBind"],
        onComplete: function (t, r, n) {
          return (!t && ("emptyString" === n && (r = "Key"), e(Rr[n]) && Rr[n](r), "keyLength" === n)) || t;
        },
      },
      unbindKey: {
        rules: ["string", "emptyString", "keyLength", "regexTest", "reservedUnbind"],
        onComplete: function (t, r, n) {
          return (!t && ("emptyString" === n && (r = "Key"), e(Rr[n]) && Rr[n](r), "keyLength" === n)) || t;
        },
      },
      bindValue: {
        rules: ["string", "emptyString", "idLength"],
        onComplete: function (t, r, n) {
          return (!t && ("emptyString" === n && (r = "Value"), e(Rr[n]) && Rr[n](r), "idLength" === n)) || t;
        },
      },
      check: function (t, r, n) {
        var i = this[t];
        if (e(i)) return i.call(this, r);
        if (!i) return !1;
        for (var a = 0; a < i.rules.length; a++) {
          var o = i.rules[a],
            s = Jr[o](r),
            c = e(n) ? n(s, r, o) : i.onComplete(s, r, o);
          if (!s) return c;
        }
        return !0;
      },
    },
    Mr = {
      stage: null,
      init: function (e) {
        this.stage = e;
      },
    },
    qr = {};
  (qr.check = Xe),
    (qr.sendItem = function (e) {
      var t = { lib: { $lib: "js", $lib_method: "code", $lib_version: String(ar.lib_version) }, time: 1 * new Date() };
      $(t, e), Mr.stage.process("formatData", t), ar.sendState.getSendCall(t);
    }),
    (qr.send = function (e, t) {
      var r = ar.kit.buildData(e);
      ar.kit.sendData(r, t);
    }),
    (qr.debugPath = function (e) {
      var t = e,
        r = "";
      (r = ar.para.debug_mode_url.indexOf("?") !== -1 ? ar.para.debug_mode_url + "&" + ar.kit.encodeTrackData(e) : ar.para.debug_mode_url + "?" + ar.kit.encodeTrackData(e)),
        Fe({
          url: r,
          type: "GET",
          cors: !0,
          header: { "Dry-Run": String(ar.para.debug_mode_upload) },
          success: function (e) {
            ae(e) === !0 ? alert("debug\u6570\u636e\u53d1\u9001\u6210\u529f" + t) : alert("debug\u5931\u8d25 \u9519\u8bef\u539f\u56e0" + JSON.stringify(e));
          },
        });
    });
  var Kr = { label: !1, li: !1, a: !0, button: !0 },
    Br = {
      otherTags: [],
      initUnlimitedTags: function () {
        k(Br.otherTags, function (e) {
          e in Kr && (Kr[e] = !0);
        });
      },
      isUnlimitedTag: function (e) {
        if (!e || 1 !== e.nodeType) return !1;
        var t = e.nodeName.toLowerCase();
        return Kr[t] || G(e, ar.para.heatmap.track_attr);
      },
      getTargetElement: function (e, t) {
        var r = this,
          n = e;
        if ("object" != typeof n) return null;
        if ("string" != typeof n.tagName) return null;
        var i = n.tagName.toLowerCase();
        if ("body" === i.toLowerCase() || "html" === i.toLowerCase()) return null;
        if (!n || !n.parentNode || !n.parentNode.children) return null;
        var a = n.parentNode,
          o = r.otherTags;
        if ("a" === i || "button" === i || "input" === i || "textarea" === i) return n;
        if (te(o, i) > -1) return n;
        if ("area" === i && "map" === a.tagName.toLowerCase() && y(a).prev().tagName && "img" === y(a).prev().tagName.toLowerCase()) return y(a).prev();
        if ("div" === i && ar.para.heatmap.collect_tags.div && r.isDivLevelValid(n)) {
          var s = (ar.para.heatmap && ar.para.heatmap.collect_tags && ar.para.heatmap.collect_tags.div && ar.para.heatmap.collect_tags.div.max_level) || 1;
          if (s > 1 || r.isCollectableDiv(n)) return n;
        }
        if (r.isStyleTag(i) && ar.para.heatmap.collect_tags.div) {
          var c = r.getCollectableParent(n);
          if (c && r.isDivLevelValid(c)) return c;
        }
        var l = r.hasElement({ event: (t && t.originalEvent) || t, element: e }, function (e) {
          return r.isUnlimitedTag(e);
        });
        return l || null;
      },
      getDivLevels: function (e, t) {
        var r = Br.getElementPath(e, !0, t),
          n = r.split(" > "),
          i = 0;
        return (
          k(n, function (e) {
            "div" === e && i++;
          }),
          i
        );
      },
      isDivLevelValid: function (e) {
        for (
          var t = (ar.para.heatmap && ar.para.heatmap.collect_tags && ar.para.heatmap.collect_tags.div && ar.para.heatmap.collect_tags.div.max_level) || 1,
            r = e.getElementsByTagName("div"),
            n = r.length - 1;
          n >= 0;
          n--
        )
          if (Br.getDivLevels(r[n], e) > t) return !1;
        return !0;
      },
      getElementPath: function (e, t, r) {
        for (var n = []; e.parentNode; ) {
          if (e.id && !t && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.id)) {
            n.unshift(e.tagName.toLowerCase() + "#" + e.id);
            break;
          }
          if (r && e === r) {
            n.unshift(e.tagName.toLowerCase());
            break;
          }
          if (e === document.body) {
            n.unshift("body");
            break;
          }
          n.unshift(e.tagName.toLowerCase()), (e = e.parentNode);
        }
        return n.join(" > ");
      },
      getClosestLi: function (e) {
        var t = function (e, t) {
          for (; e && e !== document && 1 === e.nodeType; e = e.parentNode) if (e.tagName.toLowerCase() === t) return e;
          return null;
        };
        return t(e, "li");
      },
      getElementPosition: function (e, t, r) {
        function n(e) {
          var t = e.parentNode;
          if (!t) return "";
          var r = y(e).getSameTypeSiblings(),
            n = r.length;
          if (1 === n) return 0;
          for (var i = 0, a = e; y(a).previousElementSibling().ele; a = y(a).previousElementSibling().ele, i++);
          return i;
        }
        var i = ar.heatmap.getClosestLi(e);
        if (!i) return null;
        var a = e.tagName.toLowerCase(),
          o = i.getElementsByTagName(a),
          s = o.length,
          c = [];
        if (s > 1) {
          for (var l = 0; l < s; l++) {
            var u = ar.heatmap.getElementPath(o[l], r);
            u === t && c.push(o[l]);
          }
          if (c.length > 1) return te(c, e);
        }
        return n(i);
      },
      setNotice: function (e) {
        (ar.is_heatmap_render_mode = !0),
          ar.para.heatmap || (ar.errorMsg = "\u60a8SDK\u6ca1\u6709\u914d\u7f6e\u5f00\u542f\u70b9\u51fb\u56fe\uff0c\u53ef\u80fd\u6ca1\u6709\u6570\u636e\uff01"),
          e &&
            "http:" === e.slice(0, 5) &&
            "https:" === location.protocol &&
            (ar.errorMsg = "\u60a8\u7684\u5f53\u524d\u9875\u9762\u662fhttps\u7684\u5730\u5740\uff0c\u795e\u7b56\u5206\u6790\u73af\u5883\u4e5f\u5fc5\u987b\u662fhttps\uff01"),
          ar.para.heatmap_url || (ar.para.heatmap_url = location.protocol + "//static.sensorsdata.cn/sdk/" + ar.lib_version + "/heatmap.min.js");
      },
      getDomIndex: function (e) {
        if (!e.parentNode) return -1;
        for (var t = 0, r = e.tagName, n = e.parentNode.children, i = 0; i < n.length; i++)
          if (n[i].tagName === r) {
            if (e === n[i]) return t;
            t++;
          }
        return -1;
      },
      selector: function (e, t) {
        var r = e.parentNode && 9 == e.parentNode.nodeType ? -1 : this.getDomIndex(e);
        return e.getAttribute &&
          e.getAttribute("id") &&
          /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) &&
          (!ar.para.heatmap || (ar.para.heatmap && "not_use_id" !== ar.para.heatmap.element_selector)) &&
          !t
          ? "#" + e.getAttribute("id")
          : e.tagName.toLowerCase() + (~r ? ":nth-of-type(" + (r + 1) + ")" : "");
      },
      getDomSelector: function (e, t, r) {
        if (!e || !e.parentNode || !e.parentNode.children) return !1;
        t = t && t.join ? t : [];
        var n = e.nodeName.toLowerCase();
        return e && "body" !== n && 1 == e.nodeType
          ? (t.unshift(this.selector(e, r)),
            e.getAttribute && e.getAttribute("id") && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) && ar.para.heatmap && "not_use_id" !== ar.para.heatmap.element_selector && !r
              ? t.join(" > ")
              : this.getDomSelector(e.parentNode, t, r))
          : (t.unshift("body"), t.join(" > "));
      },
      na: function () {
        var e = document.documentElement.scrollLeft || window.pageXOffset;
        return parseInt(isNaN(e) ? 0 : e, 10);
      },
      i: function () {
        var e = 0;
        try {
          (e = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (e = isNaN(e) ? 0 : e);
        } catch (t) {
          e = 0;
        }
        return parseInt(e, 10);
      },
      getBrowserWidth: function () {
        var e = window.innerWidth || document.body.clientWidth;
        return isNaN(e) ? 0 : parseInt(e, 10);
      },
      getBrowserHeight: function () {
        var e = window.innerHeight || document.body.clientHeight;
        return isNaN(e) ? 0 : parseInt(e, 10);
      },
      getScrollWidth: function () {
        var e = parseInt(document.body.scrollWidth, 10);
        return isNaN(e) ? 0 : e;
      },
      getEleDetail: function (e) {
        var t = this.getDomSelector(e),
          r = Ae({ target: e });
        (r.$element_selector = t ? t : ""), (r.$element_path = ar.heatmap.getElementPath(e, ar.para.heatmap && "not_use_id" === ar.para.heatmap.element_selector));
        var n = ar.heatmap.getElementPosition(e, r.$element_path, ar.para.heatmap && "not_use_id" === ar.para.heatmap.element_selector);
        return le(n) && (r.$element_position = n), r;
      },
      getPointerEventProp: function (e, t) {
        function r() {
          var e = document.body.scrollLeft || document.documentElement.scrollLeft || 0,
            t = document.body.scrollTop || document.documentElement.scrollTop || 0;
          return { scrollLeft: e, scrollTop: t };
        }
        function n(e) {
          if (document.documentElement.getBoundingClientRect) {
            var t = e.getBoundingClientRect();
            return { targetEleX: t.left + r().scrollLeft || 0, targetEleY: t.top + r().scrollTop || 0 };
          }
        }
        function i(e) {
          return Number(Number(e).toFixed(3));
        }
        function a(e) {
          var a = e.pageX || e.clientX + r().scrollLeft || e.offsetX + n(t).targetEleX || 0,
            o = e.pageY || e.clientY + r().scrollTop || e.offsetY + n(t).targetEleY || 0;
          return { $page_x: i(a), $page_y: i(o) };
        }
        return e ? a(e) : {};
      },
      start: function (t, n, i, a, o) {
        var s = r(a) ? a : {},
          c = e(o) ? o : e(a) ? a : void 0;
        if (ar.para.heatmap && ar.para.heatmap.collect_element && !ar.para.heatmap.collect_element(n)) return !1;
        var l = this.getEleDetail(n);
        if (ar.para.heatmap && ar.para.heatmap.custom_property) {
          var u = ar.para.heatmap.custom_property(n);
          r(u) && (l = $(l, u));
        }
        (l = $(l, this.getPointerEventProp(t, n), s)),
          "a" === i && ar.para.heatmap && ar.para.heatmap.isTrackLink === !0 ? ar.trackLink({ event: t, target: n }, "$WebClick", l) : ar.track("$WebClick", l, c);
      },
      hasElement: function (e, t) {
        var r;
        if (e.event) {
          var n = e.event;
          r = n.path || (n._getPath && n._getPath());
        } else e.element && (r = y(e.element).getParents());
        if (r && v(r) && r.length > 0) for (var i = 0; i < r.length; i++) if ("object" == typeof r[i] && 1 === r[i].nodeType && t(r[i])) return r[i];
      },
      isStyleTag: function (e, t) {
        var n = ["a", "div", "input", "button", "textarea"],
          i = ["mark", "/mark", "strong", "b", "em", "i", "u", "abbr", "ins", "del", "s", "sup"];
        return (
          !(te(n, e) > -1) &&
          (!t || (ar.para.heatmap && ar.para.heatmap.collect_tags && ar.para.heatmap.collect_tags.div)
            ? !!(
                r(ar.para.heatmap) &&
                r(ar.para.heatmap.collect_tags) &&
                r(ar.para.heatmap.collect_tags.div) &&
                v(ar.para.heatmap.collect_tags.div.ignore_tags) &&
                te(ar.para.heatmap.collect_tags.div.ignore_tags, e) > -1
              )
            : te(i, e) > -1)
        );
      },
      isCollectableDiv: function (e, t) {
        try {
          if (0 === e.children.length) return !0;
          for (var r = 0; r < e.children.length; r++)
            if (1 === e.children[r].nodeType) {
              var n = e.children[r].tagName.toLowerCase(),
                i = ar.para && ar.para.heatmap && ar.para.heatmap.collect_tags && ar.para.heatmap.collect_tags.div && ar.para.heatmap.collect_tags.div.max_level;
              if (!(("div" === n && i > 1) || this.isStyleTag(n, t))) return !1;
              if (!this.isCollectableDiv(e.children[r], t)) return !1;
            }
          return !0;
        } catch (a) {
          ar.log(a);
        }
        return !1;
      },
      getCollectableParent: function (e, t) {
        try {
          var r = e.parentNode,
            n = r ? r.tagName.toLowerCase() : "";
          if ("body" === n) return !1;
          var i = ar.para && ar.para.heatmap && ar.para.heatmap.collect_tags && ar.para.heatmap.collect_tags.div && ar.para.heatmap.collect_tags.div.max_level;
          if (n && "div" === n && (i > 1 || this.isCollectableDiv(r, t))) return r;
          if (r && this.isStyleTag(n, t)) return this.getCollectableParent(r, t);
        } catch (a) {
          ar.log(a);
        }
        return !1;
      },
      listenUrlChange: function (e) {
        e(),
          ar.ee.spa.on("switch", function () {
            e();
          });
      },
      initScrollmap: function () {
        if (!r(ar.para.heatmap) || "default" !== ar.para.heatmap.scroll_notice_map) return !1;
        var t = !0;
        ar.para.scrollmap &&
          e(ar.para.scrollmap.collect_url) &&
          this.listenUrlChange(function () {
            t = !!ar.para.scrollmap.collect_url();
          });
        var n = function (e) {
            var t = {};
            return (
              (t.timeout = e.timeout || 1e3),
              (t.func = e.func),
              (t.hasInit = !1),
              (t.inter = null),
              (t.main = function (e, t) {
                this.func(e, t), (this.inter = null);
              }),
              (t.go = function (e) {
                var r = {};
                this.inter ||
                  ((r.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0),
                  (r.$viewport_position = Math.round(r.$viewport_position) || 0),
                  e
                    ? t.main(r, !0)
                    : (this.inter = setTimeout(function () {
                        t.main(r);
                      }, this.timeout)));
              }),
              t
            );
          },
          i = n({
            timeout: 1e3,
            func: function (e, t) {
              var r = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0,
                n = new Date(),
                i = n - this.current_time;
              ((i > ar.para.heatmap.scroll_delay_time && r - e.$viewport_position !== 0) || t) &&
                ((e.$url = X()),
                (e.$title = document.title),
                (e.$url_path = Z()),
                (e.event_duration = Math.min(ar.para.heatmap.scroll_event_duration, parseInt(i) / 1e3)),
                (e.event_duration = e.event_duration < 0 ? 0 : e.event_duration),
                ar.track("$WebStay", e)),
                (this.current_time = n);
            },
          });
        (i.current_time = new Date()),
          We(window, "scroll", function () {
            return !!t && void i.go();
          }),
          We(window, "unload", function () {
            return !!t && void i.go("notime");
          });
      },
      initHeatmap: function () {
        var t = this,
          n = !0;
        return (
          !(!r(ar.para.heatmap) || "default" !== ar.para.heatmap.clickmap) &&
          (e(ar.para.heatmap.collect_url) &&
            this.listenUrlChange(function () {
              n = !!ar.para.heatmap.collect_url();
            }),
          "all" === ar.para.heatmap.collect_elements ? (ar.para.heatmap.collect_elements = "all") : (ar.para.heatmap.collect_elements = "interact"),
          void ("all" === ar.para.heatmap.collect_elements
            ? We(document, "click", function (e) {
                if (!n) return !1;
                var r = e || window.event;
                if (!r) return !1;
                var i = r.target || r.srcElement;
                if ("object" != typeof i) return !1;
                if ("string" != typeof i.tagName) return !1;
                var a = i.tagName.toLowerCase();
                if ("body" === a || "html" === a) return !1;
                if (!i || !i.parentNode || !i.parentNode.children) return !1;
                var o = i.parentNode.tagName.toLowerCase();
                "a" === o || "button" === o ? t.start(r, i.parentNode, o) : t.start(r, i, a);
              })
            : We(document, "click", function (e) {
                if (!n) return !1;
                var i = e || window.event;
                if (!i) return !1;
                var a = i.target || i.srcElement,
                  o = ar.heatmap.getTargetElement(a, e);
                o
                  ? t.start(i, o, o.tagName.toLowerCase())
                  : h(a) &&
                    "div" === a.tagName.toLowerCase() &&
                    r(ar.para.heatmap) &&
                    ar.para.heatmap.get_vtrack_config &&
                    ar.unlimitedDiv.events.length > 0 &&
                    ar.unlimitedDiv.isTargetEle(a) &&
                    t.start(i, a, a.tagName.toLowerCase(), { $lib_method: "vtrack" });
              })))
        );
      },
    },
    Fr = {
      setOnlineState: function (e) {
        if (e === !0 && r(ar.para.jsapp) && "function" == typeof ar.para.jsapp.getData) {
          ar.para.jsapp.isOnline = !0;
          var t = ar.para.jsapp.getData();
          v(t) &&
            t.length > 0 &&
            k(t, function (e) {
              ce(e) && ar.sendState.realtimeSend(JSON.parse(e));
            });
        } else ar.para.jsapp.isOnline = !1;
      },
      autoTrackIsUsed: !1,
      isReady: function (e) {
        e();
      },
      getUtm: function () {
        return Ar.campaignParams();
      },
      getStayTime: function () {
        return (new Date() - ar._t) / 1e3;
      },
      setProfileLocal: function (e) {
        if (!cr.isSupport()) return ar.setProfile(e), !1;
        if (!r(e) || ae(e)) return !1;
        var t = ar.store.readObjectVal("sensorsdata_2015_jssdk_profile"),
          n = !1;
        if (r(t) && !ae(t)) {
          for (var i in e) (!(i in t && t[i] !== e[i]) && i in t) || ((t[i] = e[i]), (n = !0));
          n && (ar.store.saveObjectVal("sensorsdata_2015_jssdk_profile", t), ar.setProfile(e));
        } else ar.store.saveObjectVal("sensorsdata_2015_jssdk_profile", e), ar.setProfile(e);
      },
      setInitReferrer: function () {
        var e = Re();
        ar.setOnceProfile({ _init_referrer: e, _init_referrer_host: Ar.pageProp.referrer_host });
      },
      setSessionReferrer: function () {
        var e = Re();
        ar.store.setSessionPropsOnce({ _session_referrer: e, _session_referrer_host: Ar.pageProp.referrer_host });
      },
      setDefaultAttr: function () {
        Ar.register({ _current_url: location.href, _referrer: Re(), _referring_host: Ar.pageProp.referrer_host });
      },
      trackHeatMap: function (e, t, r) {
        if ("object" == typeof e && e.tagName) {
          var n = e.tagName.toLowerCase(),
            i = e.parentNode.tagName.toLowerCase(),
            a = ar.para.heatmap && ar.para.heatmap.track_attr ? ar.para.heatmap.track_attr : ["data-sensors-click"];
          "button" === n || "a" === n || "a" === i || "button" === i || "input" === n || "textarea" === n || G(e, a) || Br.start(null, e, n, t, r);
        }
      },
      trackAllHeatMap: function (e, t, r) {
        if ("object" == typeof e && e.tagName) {
          var n = e.tagName.toLowerCase();
          Br.start(null, e, n, t, r);
        }
      },
      autoTrackSinglePage: function (e, t) {
        function n() {
          var e = Ar.campaignParams(),
            t = {};
          return (
            k(e, function (e, r, n) {
              (" " + ar.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? (t["$" + r] = n[r]) : (t[r] = n[r]);
            }),
            t
          );
        }
        function i(e, t) {
          ar.track("$pageview", $({ $referrer: a, $url: X(), $url_path: Z(), $title: document.title }, e, n()), t), (a = X());
        }
        var a;
        (a = this.autoTrackIsUsed ? Ar.pageProp.url : Ar.pageProp.referrer), (e = r(e) ? e : {});
        var o = !e.not_set_profile;
        if ((e.not_set_profile && delete e.not_set_profile, i(e, t), (this.autoTrackSinglePage = i), ar.is_first_visitor && o)) {
          var s = {};
          ar.para.preset_properties.search_keyword_baidu &&
            Ue(document.referrer) &&
            Ee() &&
            ((s.$search_keyword_id = Dr.id()), (s.$search_keyword_id_type = Dr.type()), (s.$search_keyword_id_hash = ee(s.$search_keyword_id))),
            ar.setOnceProfile(
              $(
                {
                  $first_visit_time: new Date(),
                  $first_referrer: Re(),
                  $first_browser_language: p(navigator.language) ? navigator.language.toLowerCase() : "\u53d6\u503c\u5f02\u5e38",
                  $first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "\u53d6\u503c\u5f02\u5e38",
                  $first_traffic_source_type: qe(),
                  $first_search_keyword: He(),
                },
                n(),
                s
              )
            ),
            (ar.is_first_visitor = !1);
        }
      },
      autoTrackWithoutProfile: function (e, t) {
        (e = r(e) ? e : {}), this.autoTrack($(e, { not_set_profile: !0 }), t);
      },
      autoTrack: function (e, t) {
        e = r(e) ? e : {};
        var n = Ar.campaignParams(),
          i = {};
        k(n, function (e, t, r) {
          (" " + ar.source_channel_standard + " ").indexOf(" " + t + " ") !== -1 ? (i["$" + t] = r[t]) : (i[t] = r[t]);
        });
        var a = !e.not_set_profile;
        e.not_set_profile && delete e.not_set_profile;
        var o = location.href;
        if (
          (ar.para.is_single_page &&
            S(function () {
              var r = Re(o, !0);
              ar.track("$pageview", $({ $referrer: r, $url: X(), $url_path: Z(), $title: document.title }, i, e), t), (o = X());
            }),
          ar.track("$pageview", $({ $referrer: Re(null, !0), $url: X(), $url_path: Z(), $title: document.title }, i, e), t),
          ar.is_first_visitor && a)
        ) {
          var s = {};
          ar.para.preset_properties.search_keyword_baidu &&
            Ue(document.referrer) &&
            Ee() &&
            ((s.$search_keyword_id = Dr.id()), (s.$search_keyword_id_type = Dr.type()), (s.$search_keyword_id_hash = ee(s.$search_keyword_id))),
            ar.setOnceProfile(
              $(
                {
                  $first_visit_time: new Date(),
                  $first_referrer: Re(null, !0),
                  $first_browser_language: p(navigator.language) ? navigator.language.toLowerCase() : "\u53d6\u503c\u5f02\u5e38",
                  $first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "\u53d6\u503c\u5f02\u5e38",
                  $first_traffic_source_type: qe(),
                  $first_search_keyword: He(),
                },
                i,
                s
              )
            ),
            (ar.is_first_visitor = !1);
        }
        this.autoTrackIsUsed = !0;
      },
      getAnonymousID: function () {
        return ae(ar.store._state) ? "\u8bf7\u5148\u521d\u59cb\u5316SDK" : ar.store._state._first_id || ar.store._state.first_id || ar.store._state._distinct_id || ar.store._state.distinct_id;
      },
      setPlugin: function (t) {
        return (
          !!r(t) &&
          void k(t, function (t, n) {
            e(t) &&
              (r(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[n]
                ? t(window.SensorsDataWebJSSDKPlugin[n])
                : ar.log(n + "\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574" + n + "\u7684\u5f15\u5165\u987a\u5e8f\uff01"));
          })
        );
      },
      useModulePlugin: function () {
        ar.use.apply(ar, arguments);
      },
      useAppPlugin: function () {
        this.setPlugin.apply(this, arguments);
      },
    },
    Wr = {
      state: 0,
      historyState: [],
      stateType: { 1: "1-init\u672a\u5f00\u59cb", 2: "2-init\u5f00\u59cb", 3: "3-store\u5b8c\u6210" },
      getState: function () {
        return this.historyState.join("\n");
      },
      setState: function (e) {
        String(e) in this.stateType && (this.state = e), this.historyState.push(this.stateType[e]);
      },
    },
    zr = {
      __proto__: null,
      addReferrerHost: Ze,
      addPropsHook: Ye,
      initPara: Ge,
      setInitVar: et,
      enableLocalLog: tt,
      disableLocalLog: rt,
      quick: nt,
      use: it,
      track: at,
      bind: ot,
      unbind: st,
      trackLink: ct,
      trackLinks: lt,
      setItem: ut,
      deleteItem: pt,
      setProfile: dt,
      setOnceProfile: ft,
      appendProfile: _t,
      incrementProfile: ht,
      deleteProfile: gt,
      unsetProfile: mt,
      identify: vt,
      trackSignup: bt,
      registerPage: St,
      clearAllRegister: wt,
      clearPageRegister: kt,
      register: $t,
      registerOnce: Pt,
      registerSession: Ct,
      registerSessionOnce: Ot,
      login: xt,
      loginWithKey: Tt,
      logout: jt,
      getPresetProperties: Dt,
      iOSWebClickPolyfill: At,
      readyState: Wr,
      para_default: $r,
      log: Pe,
      debug: Or,
      IDENTITY_KEY: jr,
    },
    Vr = function () {
      (this._events = []), (this.pendingEvents = []);
    };
  Vr.prototype = {
    emit: function (e) {
      var t = [].slice.call(arguments, 1);
      k(this._events, function (r) {
        r.type === e && r.callback.apply(r.context, t);
      }),
        this.pendingEvents.push({ type: e, data: t }),
        this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
    },
    on: function (e, t, r, n) {
      "function" == typeof t &&
        (this._events.push({ type: e, callback: t, context: r || this }),
        (n = n !== !1),
        this.pendingEvents.length > 0 &&
          n &&
          k(this.pendingEvents, function (n) {
            n.type === e && t.apply(r, n.data);
          }));
    },
    tempAdd: function (e, t) {
      if (t && e) return this.emit(e, t);
    },
    isReady: function () {},
  };
  var Xr = {
      __proto__: null,
      parseSuperProperties: xe,
      searchConfigData: Te,
      strip_empty_properties: je,
      getCurrentDomain: De,
      getEleInfo: Ae,
      isBaiduTraffic: Ee,
      getReferrerEqid: Ie,
      getReferrerEqidType: Le,
      getBaiduKeyword: Dr,
      isReferralTraffic: Ue,
      getReferrer: Re,
      getKeywordFromReferrer: He,
      getWxAdIdFromUrl: Me,
      getReferSearchEngine: Je,
      getSourceFromReferrer: qe,
      info: Ar,
      ajax: Fe,
      getElementContent: Be,
      cookie: Er,
      addEvent: We,
      EventEmitterSa: Vr,
      encrypt: Ne,
      decryptIfNeeded: Oe,
    },
    Zr = {};
  (Zr.buildData = function (e) {
    var t = { identities: {}, distinct_id: ar.store.getDistinctId(), lib: { $lib: "js", $lib_method: "code", $lib_version: String(ar.lib_version) }, properties: {} };
    return (
      r(e) && r(e.identities) && !ae(e.identities) ? $(t.identities, e.identities) : $(t.identities, Ur._state.identities),
      r(e) &&
        r(e.properties) &&
        !ae(e.properties) &&
        (e.properties.$lib_detail && ((t.lib.$lib_detail = e.properties.$lib_detail), delete e.properties.$lib_detail),
        e.properties.$lib_method && ((t.lib.$lib_method = e.properties.$lib_method), delete e.properties.$lib_method)),
      $(t, ar.store.getUnionId(), e),
      Mr.stage.process("addCustomProps", t),
      r(e.properties) && !ae(e.properties) && $(t.properties, e.properties),
      (e.type && "profile" === e.type.slice(0, 7)) ||
        ((t.properties = $({}, Ar.properties(), Ur.getProps(), Ur.getSessionProps(), Ar.currentProps, t.properties)),
        ar.para.preset_properties.latest_referrer && !p(t.properties.$latest_referrer) && (t.properties.$latest_referrer = "\u53d6\u503c\u5f02\u5e38"),
        ar.para.preset_properties.latest_search_keyword &&
          !p(t.properties.$latest_search_keyword) &&
          ((ar.para.preset_properties.search_keyword_baidu && p(t.properties.$search_keyword_id) && le(t.properties.$search_keyword_id_hash) && p(t.properties.$search_keyword_id_type)) ||
            (t.properties.$latest_search_keyword = "\u53d6\u503c\u5f02\u5e38")),
        ar.para.preset_properties.latest_traffic_source_type && !p(t.properties.$latest_traffic_source_type) && (t.properties.$latest_traffic_source_type = "\u53d6\u503c\u5f02\u5e38"),
        ar.para.preset_properties.latest_landing_page && !p(t.properties.$latest_landing_page) && (t.properties.$latest_landing_page = "\u53d6\u503c\u5f02\u5e38"),
        "not_collect" === ar.para.preset_properties.latest_wx_ad_click_id
          ? (delete t.properties._latest_wx_ad_click_id, delete t.properties._latest_wx_ad_hash_key, delete t.properties._latest_wx_ad_callbacks)
          : ar.para.preset_properties.latest_wx_ad_click_id &&
            !p(t.properties._latest_wx_ad_click_id) &&
            ((t.properties._latest_wx_ad_click_id = "\u53d6\u503c\u5f02\u5e38"),
            (t.properties._latest_wx_ad_hash_key = "\u53d6\u503c\u5f02\u5e38"),
            (t.properties._latest_wx_ad_callbacks = "\u53d6\u503c\u5f02\u5e38")),
        p(t.properties._latest_wx_ad_click_id) && (t.properties.$url = X())),
      t.properties.$time && A(t.properties.$time) ? ((t.time = 1 * t.properties.$time), delete t.properties.$time) : (t.time = 1 * new Date()),
      ar.vtrackBase.addCustomProps(t),
      xe(t),
      Lr.checkIsAddSign(t),
      Lr.checkIsFirstTime(t),
      ar.addReferrerHost(t),
      ar.addPropsHook(t),
      Mr.stage.process("formatData", t),
      t
    );
  }),
    (Zr.sendData = function (e, t) {
      var r = Te(e.properties);
      ar.para.debug_mode === !0 ? (ar.log(e), ar.saEvent.debugPath(JSON.stringify(e), t)) : ar.sendState.getSendCall(e, r, t);
    }),
    (Zr.encodeTrackData = function (e) {
      var t = N(e),
        r = "crc=" + Q(t);
      return "data=" + encodeURIComponent(t) + "&ext=" + encodeURIComponent(r);
    });
  var Yr = function (e) {
    (this.callback = e.callback),
      (this.img = document.createElement("img")),
      (this.img.width = 1),
      (this.img.height = 1),
      ar.para.img_use_crossorigin && (this.img.crossOrigin = "anonymous"),
      (this.data = e.data),
      (this.server_url = Et(e.server_url, e.data));
  };
  (Yr.prototype.start = function () {
    var e = this;
    ar.para.ignore_oom &&
      ((this.img.onload = function () {
        (this.onload = null), (this.onerror = null), (this.onabort = null), e.isEnd();
      }),
      (this.img.onerror = function () {
        (this.onload = null), (this.onerror = null), (this.onabort = null), e.isEnd();
      }),
      (this.img.onabort = function () {
        (this.onload = null), (this.onerror = null), (this.onabort = null), e.isEnd();
      })),
      (this.img.src = this.server_url);
  }),
    (Yr.prototype.lastClear = function () {
      var e = V();
      void 0 !== e.ie ? (this.img.src = "about:blank") : (this.img.src = "");
    });
  var Gr = function (e) {
    (this.callback = e.callback), (this.server_url = e.server_url), (this.data = It(e.data));
  };
  Gr.prototype.start = function () {
    var e = this;
    Fe({
      url: this.server_url,
      type: "POST",
      data: this.data,
      credentials: !1,
      timeout: ar.para.datasend_timeout,
      cors: !0,
      success: function () {
        e.isEnd();
      },
      error: function () {
        e.isEnd();
      },
    });
  };
  var Qr = function (e) {
    (this.callback = e.callback), (this.server_url = e.server_url), (this.data = It(e.data));
  };
  Qr.prototype.start = function () {
    var e = this;
    "object" == typeof navigator && "function" == typeof navigator.sendBeacon && navigator.sendBeacon(this.server_url, this.data),
      setTimeout(function () {
        e.isEnd();
      }, 40);
  };
  var en = {};
  (en.getSendCall = function (e, t, r) {
    if (ar.is_heatmap_render_mode) return !1;
    if (ar.readyState.state < 3) return ar.log("\u521d\u59cb\u5316\u6ca1\u6709\u5b8c\u6210"), !1;
    (e._track_id = Number(String(n()).slice(2, 5) + String(n()).slice(2, 4) + String(new Date().getTime()).slice(-4))), (e._flush_time = new Date().getTime());
    var i = e;
    e = JSON.stringify(e);
    var a = { data: i, config: t, callback: r };
    return (
      ar.events.tempAdd("send", i),
      !ar.para.app_js_bridge && ar.para.batch_send && cr.isSupport() && localStorage.length < 100
        ? (ar.log(i), ar.batchSend.add(a.data), !1)
        : ("item_set" === i.type || "item_delete" === i.type ? this.prepareServerUrl(a) : ar.bridge.dataSend(a, this, r), void ar.log(i))
    );
  }),
    (en.prepareServerUrl = function (e) {
      if ("object" == typeof e.config && e.config.server_url) this.sendCall(e, e.config.server_url, e.callback);
      else if (v(ar.para.server_url) && ar.para.server_url.length) for (var t = 0; t < ar.para.server_url.length; t++) this.sendCall(e, ar.para.server_url[t]);
      else
        "string" == typeof ar.para.server_url && "" !== ar.para.server_url
          ? this.sendCall(e, ar.para.server_url, e.callback)
          : ar.log(
              "\u5f53\u524d server_url \u4e3a\u7a7a\u6216\u4e0d\u6b63\u786e\uff0c\u53ea\u5728\u63a7\u5236\u53f0\u6253\u5370\u65e5\u5fd7\uff0cnetwork \u4e2d\u4e0d\u4f1a\u53d1\u6570\u636e\uff0c\u8bf7\u914d\u7f6e\u6b63\u786e\u7684 server_url\uff01"
            );
    }),
    (en.sendCall = function (e, t, n) {
      var i = { server_url: t, data: JSON.stringify(e.data), callback: n, config: e.config };
      r(ar.para.jsapp) && !ar.para.jsapp.isOnline && "function" == typeof ar.para.jsapp.setData ? (delete i.callback, (i = JSON.stringify(i)), ar.para.jsapp.setData(i)) : this.realtimeSend(i);
    }),
    (en.realtimeSend = function (e) {
      var t = Rt(e);
      t.start();
    });
  var tn = [
      "setItem",
      "deleteItem",
      "getAppStatus",
      "track",
      "quick",
      "register",
      "registerPage",
      "registerOnce",
      "trackSignup",
      "setProfile",
      "setOnceProfile",
      "appendProfile",
      "incrementProfile",
      "deleteProfile",
      "unsetProfile",
      "identify",
      "login",
      "logout",
      "trackLink",
      "clearAllRegister",
      "clearPageRegister",
    ],
    rn = new c();
  (Ft.prototype.process = function (e, t) {
    if (!(e && e in this.processDef)) return void Pe("process [" + e + "] is not supported");
    var r = this.registeredInterceptors[e];
    if (r && v(r) && r.length > 0)
      for (var n = { current: 0, total: r.length }, i = new Bt(t, n, ar), a = 0; a < r.length; a++)
        try {
          if (((n.current = a + 1), (t = r[a].call(null, t, i) || t), i.cancelationToken.getCanceled())) {
            Pe("process [" + e + "] has been canceled.");
            break;
          }
        } catch (o) {
          Pe("interceptor error:" + o);
        }
    return this.processDef[e] && this.processDef[e] in this.processDef && (t = this.process(this.processDef[e], t)), t;
  }),
    (Ft.prototype.registerStageImplementation = function (t) {
      t && t.init && e(t.init) && (t.init(this), t.interceptor && this.registerInterceptor(t.interceptor));
    }),
    (Ft.prototype.registerInterceptor = function (t) {
      if (t)
        for (var n in t) {
          var i = t[n];
          if (i && r(i) && e(i.entry)) {
            le(i.priority) || (i.priority = 1e7), this.registeredInterceptors[n] || (this.registeredInterceptors[n] = []);
            var a = this.registeredInterceptors[n],
              o = i.priority,
              s = i.entry;
            switch (!0) {
              case o <= 0:
                a.unshift(s);
                break;
              case o >= a.length:
                a.push(s);
                break;
              default:
                a.splice(o, 0, s);
            }
          }
        }
    });
  var nn = { addCustomProps: null, formatData: null },
    an = new Ft(nn),
    on = {
      init: function () {},
      interceptor: {
        formatData: {
          priority: 0,
          entry: function (e) {
            return tr(e), e;
          },
        },
      },
    },
    sn = {
      initPara: function () {},
      initState: function () {},
      initDefineBridgeInfo: function () {},
      bridge_info: { touch_app_bridge: !1 },
      dataSend: function (e, t) {
        t.prepareServerUrl(e);
      },
    },
    cn = { init: function () {}, addCustomProps: function () {} },
    ln = {
      add: function (e) {
        ar.para.batch_send = !1;
        var t = Te(e.properties);
        ar.sendState.prepareServerUrl({ data: e, config: t });
      },
    };
  for (var un in zr) ar[un] = zr[un];
  return (
    (ar.modules = {}),
    sr.setup(Pe),
    (ar._ = $(wr, Xr)),
    (ar.sendState = en),
    (ar.events = new ar._.EventEmitterSa()),
    (ar.store = Ur),
    (ar.heatmap = Br),
    (ar.bridge = sn),
    (ar.JSBridge = ir),
    (ar.vtrackBase = cn),
    (ar.batchSend = ln),
    (ar.use = nr),
    Wt(new zt(ar)),
    Wt(new rr(ar)),
    (ar.init = function (e) {
      return (
        !(ar.readyState && ar.readyState.state && ar.readyState.state >= 2) &&
        ((e = e || {}), (e.batch_send = !1), r(e.heatmap) && (e.heatmap.get_vtrack_config = !1), ar.setInitVar(), ar.readyState.setState(2), ar.initPara(e), qt(), void ar.iOSWebClickPolyfill())
      );
    }),
    Jt(),
    ar
  );
});
