!(function (e, t) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = t())
      : t();
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
        if (
          ("undefined" != typeof crypto
            ? (e = crypto)
            : "undefined" != typeof msCrypto && (e = msCrypto),
          r(e) && e.getRandomValues)
        ) {
          var t = new Uint32Array(1),
            n = e.getRandomValues(t)[0],
            i = Math.pow(2, 32);
          return n / i;
        }
      }
      return Yi(1e19) / 1e19;
    }
    function i(e) {
      var t = null;
      try {
        t = JSON.parse(e);
      } catch (r) {}
      return t;
    }
    function a(e, t) {
      (this.lockGetPrefix = e || "lock-get-prefix"),
        (this.lockSetPrefix = t || "lock-set-prefix");
    }
    function s(e) {
      return (
        "function" == typeof e || (!(!e || "object" != typeof e) && s(e.listener))
      );
    }
    function l() {
      this._events = {};
    }
    function u(e) {
      var t = e;
      try {
        t = decodeURIComponent(e);
      } catch (r) {
        t = e;
      }
      return t;
    }
    function c() {
      function e() {}
      return "function" != typeof Object.create
        ? ((e.prototype = null), new e())
        : Object.create(null);
    }
    function p(e) {
      e = e || "";
      for (
        var t = c(), r = e.substring(1), n = r.split("&"), i = 0;
        i < n.length;
        i++
      ) {
        var a = n[i].indexOf("=");
        if (a !== -1) {
          var o = n[i].substring(0, a),
            s = n[i].substring(a + 1);
          (o = u(o)),
            (s = u(s)),
            "__proto__" !== o &&
              "constructor" !== o &&
              "prototype" !== o &&
              (t[o] = s);
        }
      }
      return t;
    }
    function d(e) {
      return "[object String]" == Object.prototype.toString.call(e);
    }
    function f(e) {
      return e.replace(/^[\s﻿ ]+|[\s﻿ ]+$/g, "");
    }
    function g(e) {
      var t = function (e) {
        (this._fields = {
          Username: 4,
          Password: 5,
          Port: 7,
          Protocol: 2,
          Host: 6,
          Path: 8,
          URL: 0,
          QueryString: 9,
          Fragment: 10,
        }),
          (this._values = {}),
          (this._regex =
            /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/),
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
            t = new RegExp(r + "[^&]+").test(t)
              ? t.replace(new RegExp(r + "[^&]+"), r + "=" + e[r])
              : "&" === t.slice(-1)
                ? t + r + "=" + e[r]
                : "" === t
                  ? r + "=" + e[r]
                  : t + "&" + r + "=" + e[r];
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
          t || Gi.log("URLParser::_parse -> Invalid URL");
          var r = e.split("#"),
            n = r[0],
            i = r.slice(1).join("#");
          t = this._regex.exec(n);
          for (var a in this._fields)
            "undefined" != typeof t[this._fields[a]] &&
              (this._values[a] = t[this._fields[a]]);
          (this._values.Hostname = this._values.Host.replace(/:\d+$/, "")),
            (this._values.Origin =
              this._values.Protocol + "://" + this._values.Hostname),
            (this._values.Fragment = i);
        }),
        new t(e)
      );
    }
    function _(e) {
      var t = {},
        r = function () {
          var e;
          try {
            return (
              (e = new URL("http://modernizr.com/")),
              "http://modernizr.com/" === e.href
            );
          } catch (t) {
            return !1;
          }
        };
      if ("function" == typeof window.URL && r())
        (t = new URL(e)),
          t.searchParams ||
            (t.searchParams = (function () {
              var e = p(t.search);
              return {
                get: function (t) {
                  return e[t];
                },
              };
            })());
      else {
        d(e) || (e = String(e)), (e = f(e));
        var n = /^https?:\/\/.+/;
        if (n.test(e) === !1) return void Gi.log("Invalid URL");
        var i = g(e);
        (t.hash = i._values.Fragment),
          (t.host = i._values.Host
            ? i._values.Host + (i._values.Port ? ":" + i._values.Port : "")
            : ""),
          (t.href = i._values.URL),
          (t.password = i._values.Password),
          (t.pathname = i._values.Path),
          (t.port = i._values.Port),
          (t.search = i._values.QueryString ? "?" + i._values.QueryString : ""),
          (t.username = i._values.Username),
          (t.hostname = i._values.Hostname),
          (t.protocol = i._values.Protocol ? i._values.Protocol + ":" : ""),
          (t.origin = i._values.Origin
            ? i._values.Origin + (i._values.Port ? ":" + i._values.Port : "")
            : ""),
          (t.searchParams = (function () {
            var e = p("?" + i._values.QueryString);
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
    function v(e) {
      return void 0 === e;
    }
    function y(t) {
      return Array.isArray && e(y)
        ? Array.isArray(t)
        : "[object Array]" === Object.prototype.toString.call(t);
    }
    function b(e) {
      return new ta(e);
    }
    function w(e, t, r, n) {
      function i(e) {
        return (
          e &&
            ((e.preventDefault = i.preventDefault),
            (e.stopPropagation = i.stopPropagation),
            (e._getPath = i._getPath)),
          e
        );
      }
      function a(e, t, r, n) {
        var a = function (a) {
          if ((a = a || i(window.event))) {
            a.target = a.srcElement;
            var o,
              s,
              l = !0;
            return (
              "function" == typeof r && (o = r(a)),
              (s = t.call(e, a)),
              "beforeunload" !== n
                ? ((!1 !== o && !1 !== s) || (l = !1), l)
                : void 0
            );
          }
        };
        return a;
      }
      (i._getPath = function () {
        var e = this;
        return (
          this.path ||
          (this.composedPath && this.composedPath()) ||
          b(e.target).getParents()
        );
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
            n,
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
      w(window, t, e);
    }
    function k(e) {
      if (e)
        return "undefined" != typeof window.XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest()
          ? new XMLHttpRequest()
          : "undefined" != typeof XDomainRequest
            ? new XDomainRequest()
            : null;
      if ("undefined" != typeof window.XMLHttpRequest)
        return new XMLHttpRequest();
      if (window.ActiveXObject)
        try {
          return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (t) {
          try {
            return new ActiveXObject("Microsoft.XMLHTTP");
          } catch (t) {
            Gi.log(t);
          }
        }
    }
    function P(e, t, r) {
      if ("[object Array]" === Object.prototype.toString.call(e))
        if (Array.prototype.forEach && e.forEach) e.forEach(t, r);
        else for (var n = 0; n < e.length; n++) t.call(r, e[n], n, e);
      else {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return e;
        for (var i in e)
          Object.prototype.hasOwnProperty.call(e, i) && t.call(r, e[i], i, e);
      }
    }
    function C(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        if ("[object Object]" === Object.prototype.toString.call(r))
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) &&
              void 0 !== r[n] &&
              (e[n] = r[n]);
      }
      return e;
    }
    function O(e) {
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
          Gi.log(t);
        }
        a &&
          (clearTimeout(a),
          (a = null),
          e.error && e.error(),
          (i.onreadystatechange = null),
          (i.onload = null),
          (i.onerror = null));
      }
      (e.timeout = e.timeout || 2e4),
        (e.credentials = "undefined" == typeof e.credentials || e.credentials);
      var i = k(e.cors);
      if (!i) return !1;
      e.type || (e.type = e.data ? "POST" : "GET"),
        (e = C({ success: function () {}, error: function () {} }, e));
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
            e.success && e.success(t(i.responseText)),
              (i.onreadystatechange = null),
              (i.onload = null),
              (i.onerror = null);
          }),
          (i.onerror = function () {
            e.error && e.error(t(i.responseText), i.status),
              (i.onreadystatechange = null),
              (i.onerror = null),
              (i.onload = null);
          })),
        (i.onreadystatechange = function () {
          try {
            4 == i.readyState &&
              ((i.status >= 200 && i.status < 300) || 304 == i.status
                ? e.success(t(i.responseText))
                : e.error(t(i.responseText), i.status),
              (i.onreadystatechange = null),
              (i.onload = null));
          } catch (r) {
            (i.onreadystatechange = null), (i.onload = null);
          }
        }),
        i.open(e.type, e.url, !0);
      try {
        e.credentials && (i.withCredentials = !0),
          r(e.header) &&
            P(e.header, function (e, t) {
              i.setRequestHeader && i.setRequestHeader(t, e);
            }),
          e.data &&
            (e.cors ||
              (i.setRequestHeader &&
                i.setRequestHeader("X-Requested-With", "XMLHttpRequest")),
            "application/json" === e.contentType
              ? i.setRequestHeader &&
                i.setRequestHeader(
                  "Content-type",
                  "application/json; charset=UTF-8",
                )
              : i.setRequestHeader &&
                i.setRequestHeader(
                  "Content-type",
                  "application/x-www-form-urlencoded",
                ));
      } catch (l) {
        Gi.log(l);
      }
      i.send(e.data || null);
    }
    function j(e, t) {
      var r = [];
      return null == e
        ? r
        : Array.prototype.map && e.map === Array.prototype.map
          ? e.map(t)
          : (P(e, function (e, n, i) {
              r.push(t(e, n, i));
            }),
            r);
    }
    function N(e) {
      var t = [];
      try {
        t = j(atob(e).split(""), function (e) {
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
    function I(e) {
      var t = "";
      try {
        t = btoa(
          encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
            return String.fromCharCode("0x" + t);
          }),
        );
      } catch (r) {
        t = e;
      }
      return t;
    }
    function T(e, t) {
      t = t || window;
      var r = !1,
        n = !0,
        i = t.document,
        a = i.documentElement,
        o = i.addEventListener,
        s = o ? "addEventListener" : "attachEvent",
        l = o ? "removeEventListener" : "detachEvent",
        u = o ? "" : "on",
        c = function (n) {
          ("readystatechange" == n.type && "complete" != i.readyState) ||
            (("load" == n.type ? t : i)[l](u + n.type, c, !1),
            !r && (r = !0) && e.call(t, n.type || n));
        },
        p = function () {
          try {
            a.doScroll("left");
          } catch (e) {
            return void setTimeout(p, 50);
          }
          c("poll");
        };
      if ("complete" == i.readyState) e.call(t, "lazy");
      else {
        if (!o && a.doScroll) {
          try {
            n = !t.frameElement;
          } catch (d) {
            Gi.log(d);
          }
          n && p();
        }
        i[s](u + "DOMContentLoaded", c, !1),
          i[s](u + "readystatechange", c, !1),
          t[s](u + "load", c, !1);
      }
    }
    function A(e) {
      return (
        P(Array.prototype.slice.call(arguments, 1), function (t) {
          for (var r in t) void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r]);
        }),
        e
      );
    }
    function D(e) {
      var t = e;
      try {
        t = decodeURI(e);
      } catch (r) {
        t = e;
      }
      return t;
    }
    function $(e) {
      var t = "t6KJCZa5pDdQ9khoEM3Tj70fbP2eLSyc4BrsYugARqFIw1mzlGNVXOHiWvxUn8",
        r = t.length - 1,
        n = {},
        i = 0;
      for (i = 0; i < t.length; i++) n[t.charAt(i)] = t.charAt(r - i);
      var a = "";
      for (i = 0; i < e.length; i++)
        a += e.charAt(i) in n ? n[e.charAt(i)] : e.charAt(i);
      return a;
    }
    function x(e) {
      return "[object Date]" == Object.prototype.toString.call(e);
    }
    function E(e) {
      function t(e) {
        return e < 10 ? "0" + e : e;
      }
      return (
        e.getFullYear() +
        "-" +
        t(e.getMonth() + 1) +
        "-" +
        t(e.getDate()) +
        " " +
        t(e.getHours()) +
        ":" +
        t(e.getMinutes()) +
        ":" +
        t(e.getSeconds()) +
        "." +
        t(e.getMilliseconds())
      );
    }
    function L(e) {
      return (
        P(e, function (t, n) {
          x(t) ? (e[n] = E(t)) : r(t) && (e[n] = L(t));
        }),
        e
      );
    }
    function U(e) {
      return (
        P(Array.prototype.slice.call(arguments, 1), function (t) {
          for (var n in t)
            void 0 !== t[n] &&
              (r(t[n]) && r(e[n]) ? C(e[n], t[n]) : (e[n] = t[n]));
        }),
        e
      );
    }
    function R(e, t, r) {
      var n = Object.prototype.hasOwnProperty;
      if (e.filter) return e.filter(t);
      for (var i = [], a = 0; a < e.length; a++)
        if (n.call(e, a)) {
          var o = e[a];
          t.call(r, o, a, e) && i.push(o);
        }
      return i;
    }
    function B(e) {
      try {
        return JSON.stringify(e, null, "  ");
      } catch (t) {
        return JSON.stringify(e);
      }
    }
    function H(e) {
      return "string" == typeof e && e.match(/^[a-zA-Z0-9一-龥\-\.]+$/)
        ? e
        : "";
    }
    function J(e, t, r) {
      (e = e || location.hostname), (t = t || "domain_test");
      var n = H(e),
        i = n.split(".");
      if (y(i) && i.length >= 2 && !/^(\d+\.)+\d+$/.test(n))
        for (var a = "." + i.splice(i.length - 1, 1); i.length > 0; )
          if (
            ((a = "." + i.splice(i.length - 1, 1) + a),
            na.set(t, "true", 0, null, r, "; domain=" + a),
            document.cookie.indexOf(t + "=true") !== -1)
          )
            return na.set(t, "true", "-1s", null, r, "; domain=" + a), a;
      return "";
    }
    function M(e) {
      function t(e, t) {
        e = f(e);
        var r;
        if ("body" === e) return document.getElementsByTagName("body")[0];
        if (0 === e.indexOf("#"))
          (e = e.slice(1)), (r = document.getElementById(e));
        else if (e.indexOf(":nth-of-type") > -1) {
          var n = e.split(":nth-of-type");
          if (!n[0] || !n[1]) return null;
          var i = n[0],
            a = n[1].match(/\(([0-9]+)\)/);
          if (!a || !a[1]) return null;
          var o = Number(a[1]);
          if (!(h(t) && t.children && t.children.length > 0)) return null;
          for (var s = t.children, l = 0; l < s.length; l++)
            if (h(s[l])) {
              var u = s[l].tagName.toLowerCase();
              if (u === i && (o--, 0 === o)) {
                r = s[l];
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
          Gi.log(o);
        }
        return i && h(i) ? r(i) : null;
      }
      if (!d(e)) return null;
      var n = e.split(">"),
        i = null;
      return (i = r()), i && h(i) ? i : null;
    }
    function q(e, t) {
      var r = "",
        n = "";
      return (
        e.textContent
          ? (r = f(e.textContent))
          : e.innerText && (r = f(e.innerText)),
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
    function K(e, t) {
      (t && "string" == typeof t) || (t = "hostname解析异常");
      var r = null;
      try {
        r = _(e).hostname;
      } catch (n) {
        Gi.log(
          "getHostname传入的url参数不合法！",
        );
      }
      return r || t;
    }
    function F() {
      try {
        var e = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
        return e && e[1] ? Number.parseInt(e[1], 10) : "";
      } catch (t) {
        return "";
      }
    }
    function V(e, t) {
      (t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")), (e = u(e));
      var r = "[\\?&]" + t + "=([^&#]*)",
        n = new RegExp(r),
        i = n.exec(e);
      return null === i || (i && "string" != typeof i[1] && i[1].length)
        ? ""
        : u(i[1]);
    }
    function W(e) {
      var t = {},
        r = e.split("?"),
        n = r[1] || "";
      return n && (t = p("?" + n)), t;
    }
    function z() {
      return (
        "undefined" != typeof window.matchMedia ||
        "undefined" != typeof window.msMatchMedia
      );
    }
    function X() {
      var e =
          screen.msOrientation ||
          screen.mozOrientation ||
          (screen.orientation || {}).type,
        t = "未取到值";
      if (e) t = e.indexOf("landscape") > -1 ? "landscape" : "portrait";
      else if (z()) {
        var r = window.matchMedia || window.msMatchMedia;
        r("(orientation: landscape)").matches
          ? (t = "landscape")
          : r("(orientation: portrait)").matches && (t = "portrait");
      }
      return t;
    }
    function Z() {
      var e,
        t = {},
        r = navigator.userAgent.toLowerCase();
      return (
        (e = r.match(/ qq\/([\d.]+)/))
          ? (t.qqBuildinBrowser = Number(e[1].split(".")[0]))
          : (e = r.match(/mqqbrowser\/([\d.]+)/))
            ? (t.qqBrowser = Number(e[1].split(".")[0]))
            : (e = r.match(/opera.([\d.]+)/))
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
    function G(e) {
      return d(e) ? ((e = f(e)), D(e)) : D(location.href);
    }
    function Q(e) {
      return d(e) ? ((e = f(e)), D(e)) : D(location.pathname);
    }
    function Y(e, t) {
      return e.hasAttribute
        ? e.hasAttribute(t)
        : e.attributes
          ? !(!e.attributes[t] || !e.attributes[t].specified)
          : void 0;
    }
    function ee(e, t) {
      if ("string" == typeof t) return Y(e, t);
      if (y(t)) {
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
    function te(e) {
      if ("string" != typeof e) return 0;
      var t = 0,
        r = null;
      if (0 == e.length) return t;
      for (var n = 0; n < e.length; n++)
        (r = e.charCodeAt(n)), (t = (t << 5) - t + r), (t &= t);
      return t;
    }
    function re(e) {
      var t = 9007199254740992,
        r = -9007199254740992,
        n = 31,
        i = 0;
      if (e.length > 0)
        for (var a = e.split(""), o = 0; o < a.length; o++) {
          var s = a[o].charCodeAt(),
            l = n * i + s;
          if (l > t) for (i = r + i; (l = n * i + s), l < r; ) i = i / 2 + s;
          if (l < r) for (i = t + i; (l = n * i + s), l > t; ) i = i / 2 + s;
          i = n * i + s;
        }
      return i;
    }
    function ne(e, t) {
      var r = e.indexOf;
      if (r) return r.call(e, t);
      for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
      return -1;
    }
    function ie(e, t) {
      return (
        (e.prototype = new t()),
        (e.prototype.constructor = e),
        (e.superclass = t.prototype),
        e
      );
    }
    function ae(e) {
      return !(!e || !ia.call(e, "callee"));
    }
    function oe(e) {
      return "[object Boolean]" == Object.prototype.toString.call(e);
    }
    function se(e) {
      if (r(e)) {
        for (var t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      return !1;
    }
    function le(e) {
      if ("string" != typeof e) return !1;
      var t = /^https?:\/\/.+/;
      return t.test(e) !== !1 || (Gi.log("Invalid URL"), !1);
    }
    function ue() {
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
    function pe(e) {
      return (
        "[object Number]" == Object.prototype.toString.call(e) &&
        /[\d\.]+/.test(String(e))
      );
    }
    function de() {
      var e = !1;
      if (
        "object" != typeof navigator ||
        "function" != typeof navigator.sendBeacon
      )
        return e;
      var t = Z(),
        r = navigator.userAgent.toLowerCase();
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        var n = /os [\d._]*/gi,
          i = r.match(n),
          a = (i + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."),
          o = a.split(".");
        "undefined" == typeof t.safari && (t.safari = o[0]),
          o[0] && (t.qqBuildinBrowser || t.qqBrowser)
            ? (e = !1)
            : o[0] && o[0] < 13
              ? (t.chrome > 41 ||
                  t.firefox > 30 ||
                  t.opera > 25 ||
                  t.safari > 12) &&
                (e = !0)
              : (t.chrome > 41 ||
                  t.firefox > 30 ||
                  t.opera > 25 ||
                  t.safari > 11.3) &&
                (e = !0);
      } else
        (t.chrome > 38 ||
          t.edge > 13 ||
          t.firefox > 30 ||
          t.opera > 25 ||
          t.safari > 11) &&
          (e = !0);
      return e;
    }
    function fe() {
      return (
        "undefined" != typeof window.XMLHttpRequest &&
        ("withCredentials" in new XMLHttpRequest() ||
          "undefined" != typeof XDomainRequest)
      );
    }
    function ge(t) {
      if (!r(t) || !d(t.callbackName))
        return Gi.log("JSONP 请求缺少 callbackName"), !1;
      (t.success = e(t.success) ? t.success : function () {}),
        (t.error = e(t.error) ? t.error : function () {}),
        (t.data = t.data || "");
      var n = document.createElement("script"),
        i = document.getElementsByTagName("head")[0],
        a = null,
        o = !1;
      i.appendChild(n);
      var s = 3e4;
      pe(t.timeout) &&
        (a = setTimeout(
          function () {
            return (
              !o &&
              (t.error("timeout"),
              (window[t.callbackName] = function () {
                Gi.log("call jsonp error");
              }),
              (a = null),
              i.removeChild(n),
              void (o = !0))
            );
          },
          Math.min(t.timeout, s),
        )),
        (window[t.callbackName] = function () {
          clearTimeout(a),
            (a = null),
            t.success.apply(null, arguments),
            (window[t.callbackName] = function () {
              Gi.log("call jsonp error");
            }),
            i.removeChild(n);
        });
      var l = encodeURIComponent(t.callbackName),
        u = "";
      if (
        (t.url.indexOf("?") > -1
          ? (t.url += "&callbackName=" + l)
          : (t.url += "?callbackName=" + l),
        r(t.data))
      ) {
        var c = [];
        P(t.data, function (e, t) {
          c.push(encodeURIComponent(t) + "=" + encodeURIComponent(e));
        }),
          (u = c.join("&")),
          u && (t.url += "&" + u);
      }
      (n.onerror = function (e) {
        return (
          !o &&
          ((window[t.callbackName] = function () {
            Gi.log("call jsonp error");
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
    function _e(t) {
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
            ? ((this.hidden = "hidden"),
              (this.visibilityChange = "visibilitychange"))
            : "undefined" != typeof document.mozHidden
              ? ((this.hidden = "mozHidden"),
                (this.visibilityChange = "mozvisibilitychange"))
              : "undefined" != typeof document.msHidden
                ? ((this.hidden = "msHidden"),
                  (this.visibilityChange = "msvisibilitychange"))
                : "undefined" != typeof document.webkitHidden &&
                  ((this.hidden = "webkitHidden"),
                  (this.visibilityChange = "webkitvisibilitychange")),
            this.listen();
        },
        listen: function () {
          if (this.isSupport()) {
            var e = this;
            w(
              document,
              this.visibilityChange,
              function () {
                document[e.hidden] ? e.hiddenHandler() : e.visibleHandler();
              },
              1,
            );
          } else
            w(window, "focus", this.visibleHandler),
              w(window, "blur", this.hiddenHandler);
        },
      };
      r.init();
    }
    function he(e) {
      e = C(
        {
          success: function () {},
          error: function () {},
          appendCall: function (e) {
            document.getElementsByTagName("head")[0].appendChild(e);
          },
        },
        e,
      );
      var t = null;
      "css" === e.type &&
        ((t = document.createElement("link")),
        (t.rel = "stylesheet"),
        (t.href = e.url)),
        "js" === e.type &&
          ((t = document.createElement("script")),
          (t.async = "async"),
          t.setAttribute("charset", "UTF-8"),
          (t.src = e.url),
          (t.type = "text/javascript")),
        (t.onload = t.onreadystatechange =
          function () {
            (this.readyState &&
              "loaded" !== this.readyState &&
              "complete" !== this.readyState) ||
              (e.success(), (t.onload = t.onreadystatechange = null));
          }),
        (t.onerror = function () {
          e.error(), (t.onerror = null);
        }),
        e.appendCall(t);
    }
    function me(e) {
      if ("string" != typeof e) return "";
      for (var t = /^\s*javascript/i; t.test(e); ) e = e.replace(t, "");
      return e;
    }
    function ve(e, t) {
      (e = String(e)), (t = "number" == typeof t ? t : 13);
      for (var r = 126, n = e.split(""), i = 0; i < n.length; i++) {
        var a = n[i].charCodeAt(0);
        a < r && (n[i] = String.fromCharCode((n[i].charCodeAt(0) + t) % r));
      }
      return n.join("");
    }
    function ye(e) {
      var t = 13,
        r = 126;
      return (e = String(e)), ve(e, r - t);
    }
    function be(e) {
      r(e) &&
        P(e, function (t, n) {
          r(t) ? be(e[n]) : x(t) && (e[n] = E(t));
        });
    }
    function we(e) {
      var t = document.createElement("style");
      t.type = "text/css";
      try {
        t.appendChild(document.createTextNode(e));
      } catch (r) {
        t.styleSheet.cssText = e;
      }
      var n = document.getElementsByTagName("head")[0],
        i = document.getElementsByTagName("script")[0];
      n
        ? n.children.length
          ? n.insertBefore(t, n.children[0])
          : n.appendChild(t)
        : i.parentNode.insertBefore(t, i);
    }
    function Se(e) {
      if ("string" != typeof e)
        return Gi.log("转换unicode错误", e), e;
      for (var t = "", r = 0; r < e.length; r++)
        t += "\\" + e.charCodeAt(r).toString(16);
      return t;
    }
    function ke(e, r, n) {
      var i,
        a,
        o,
        s = null,
        l = 0;
      n || (n = {});
      var u = function () {
        (l = n.leading === !1 ? 0 : t()),
          (s = null),
          (o = e.apply(i, a)),
          s || (i = a = null);
      };
      return function () {
        var c = t();
        l || n.leading !== !1 || (l = c);
        var p = r - (c - l);
        return (
          (i = this),
          (a = arguments),
          p <= 0 || p > r
            ? (s && (clearTimeout(s), (s = null)),
              (l = c),
              (o = e.apply(i, a)),
              s || (i = a = null))
            : s || n.trailing === !1 || (s = setTimeout(u, p)),
          o
        );
      };
    }
    function Pe(e) {
      var t = [];
      return null == e
        ? t
        : (P(e, function (e) {
            t[t.length] = e;
          }),
          t);
    }
    function Ce(e) {
      return e
        ? e.toArray
          ? e.toArray()
          : y(e) || ae(e)
            ? Array.prototype.slice.call(e)
            : Pe(e)
        : [];
    }
    function Oe(e) {
      for (var t, r = [], n = {}, i = 0; i < e.length; i++)
        (t = e[i]), t in n || ((n[t] = !0), r.push(t));
      return r;
    }
    function je(e, t, r) {
      return (r = r || 0), e.substr(r, t.length) === t;
    }
    function Ne(e) {
      return "__proto__" !== e && "constructor" !== e && "prototype" !== e;
    }
    function Ie() {
      pa.msg.apply(pa, arguments).log();
    }
    function Te() {
      pa.msg.apply(pa, arguments).level("warn").log();
    }
    function Ae() {
      pa.msg.apply(pa, arguments).level("error").log();
    }
    function De(e) {
      var t = da.current_domain;
      switch (typeof t) {
        case "function":
          var r = t();
          return "" === r || "" === f(r)
            ? "url解析失败"
            : r.indexOf(".") !== -1
              ? r
              : "url解析失败";
        case "string":
          return "" === t || "" === f(t)
            ? "url解析失败"
            : t.indexOf(".") !== -1
              ? t
              : "url解析失败";
        default:
          var n = J(null, ha, da.is_secure_cookie);
          return "" === e
            ? "url解析失败"
            : "" === n
              ? "url解析失败"
              : n;
      }
    }
    function $e(e, t) {
      var r = "";
      if (da.cross_subdomain === !1) {
        try {
          if (t) r = _(t).hostname;
          else {
            var n = location.host;
            v(Xi.para.white_list[n]) || (r = Xi.para.white_list[n]);
          }
        } catch (i) {
          Ae(i);
        }
        r =
          "string" == typeof r && "" !== r
            ? "sajssdk_2015_" + da.sdk_id + e + "_" + r.replace(/\./g, "_")
            : "sajssdk_2015_root_" + da.sdk_id + e;
      } else r = "sajssdk_2015_cross_" + da.sdk_id + e;
      return r;
    }
    function xe() {
      var e = "new_user";
      return va.isSupport()
        ? null !== va.get("sensorsdata_is_new_user") || null !== va.get($e(e))
        : null !== ya.get(ya.getNewUserFlagMemoryKey(e));
    }
    function Ee(e, t, n) {
      var i = !(!r(da.heatmap) || !da.heatmap.useCapture);
      return (
        r(da.heatmap) && v(da.heatmap.useCapture) && "click" === t && (i = !0),
        w(e, t, n, i)
      );
    }
    function Le() {
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
    function Ue() {
      var e = W(document.referrer);
      if (se(e) || !e.eqid) {
        var t = W(location.href);
        return e.ck || t.utm_source
          ? "baidu_sem_keyword_id"
          : "baidu_other_keyword_id";
      }
      return "baidu_seo_keyword_id";
    }
    function Re() {
      var e = W(document.referrer);
      return se(e) || !e.eqid ? ea().replace(/-/g, "") : e.eqid;
    }
    function Be(e, t) {
      return (
        (e = e || document.referrer),
        d(e)
          ? ((e = f(e)),
            (e = D(e)),
            0 !== e.indexOf("https://www.baidu.com/") ||
              t ||
              (e = e.split("?")[0]),
            (e = e.slice(0, da.max_referrer_string_length)),
            d(e) ? e : "")
          : "取值异常_referrer异常_" + String(e)
      );
    }
    function He(e) {
      if (((e = e || document.referrer), "" === e)) return !0;
      var t = J(null, ha, da.is_secure_cookie),
        r = K(e);
      return (r = "." + r), r.indexOf(t) === -1 && "" !== t;
    }
    function Je(e, t) {
      e = e || document.referrer;
      var n = da.source_type.keyword;
      if (document && d(e)) {
        if (0 === e.indexOf("http")) {
          var i = Me(e),
            a = W(e);
          if (se(a))
            return da.preset_properties.search_keyword_baidu && Le()
              ? void 0
              : "未取到值";
          var o = null;
          for (var s in n)
            if (i === s && r(a))
              if (((o = n[s]), y(o)))
                for (s = 0; s < o.length; s++) {
                  var l = a[o[s]];
                  if (l) return t ? { active: l } : l;
                }
              else if (a[o]) return t ? { active: a[o] } : a[o];
          return da.preset_properties.search_keyword_baidu && Le()
            ? void 0
            : "未取到值";
        }
        return "" === e
          ? "未取到值_直接打开"
          : "未取到值_非http的url";
      }
      return "取值异常_referrer异常_" + String(e);
    }
    function Me(e) {
      var t = K(e);
      if (!t || "hostname解析异常" === t) return "";
      var r = {
        baidu: [/^.*\.baidu\.com$/],
        bing: [/^.*\.bing\.com$/],
        google: [
          /^www\.google\.com$/,
          /^www\.google\.com\.[a-z]{2}$/,
          /^www\.google\.[a-z]{2}$/,
        ],
        sm: [/^m\.sm\.cn$/],
        so: [/^.+\.so\.com$/],
        sogou: [/^.*\.sogou\.com$/],
        yahoo: [/^.*\.yahoo\.com$/],
      };
      for (var n in r)
        for (var i = r[n], a = 0, o = i.length; a < o; a++)
          if (i[a].test(t)) return n;
      return "未知搜索引擎";
    }
    function qe() {
      function e(e, t) {
        for (var r = 0; r < e.length; r++)
          if (t.split("?")[0].indexOf(e[r]) !== -1) return !0;
      }
      var t = "(" + da.source_type.utm.join("|") + ")\\=[^&]+",
        r = da.source_type.search,
        n = da.source_type.social,
        i = document.referrer || "",
        a = Pa.pageProp.url;
      if (a) {
        var o = a.match(new RegExp(t));
        return o && o[0]
          ? "付费广告流量"
          : e(r, i)
            ? "自然搜索流量"
            : e(n, i)
              ? "社交网站流量"
              : "" === i
                ? "直接流量"
                : "引荐流量";
      }
      return "获取url异常";
    }
    function Ke(e) {
      var t = V(e, "gdt_vid"),
        r = V(e, "hash_key"),
        n = V(e, "callbacks"),
        i = { click_id: "", hash_key: "", callbacks: "" };
      return (
        d(t) &&
          t.length &&
          ((i.click_id =
            16 == t.length || 18 == t.length
              ? t
              : "参数解析不合法"),
          d(r) && r.length && (i.hash_key = r),
          d(n) && n.length && (i.callbacks = n)),
        i
      );
    }
    function Fe(t) {
      var n = t.properties,
        i = JSON.parse(JSON.stringify(t));
      r(n) &&
        P(n, function (t, r) {
          if (e(t))
            try {
              (n[r] = t(i)),
                e(n[r]) &&
                  (Te(
                    "您的属性- " +
                      r +
                      " 格式不满足要求，我们已经将其删除",
                  ),
                  delete n[r]);
            } catch (a) {
              delete n[r],
                Te(
                  "您的属性- " +
                    r +
                    " 抛出了异常，我们已经将其删除",
                );
            }
        });
    }
    function Ve(e) {
      if (r(e) && e.$option) {
        var t = e.$option;
        return delete e.$option, t;
      }
      return {};
    }
    function We(e) {
      var t = {};
      return (
        P(e, function (e, r) {
          null != e && (t[r] = e);
        }),
        t
      );
    }
    function ze(e) {
      var t = !e.type || "profile" !== e.type.slice(0, 7),
        n = "取值异常";
      r(e.properties) &&
        t &&
        ("$referrer" in e.properties &&
          (e.properties.$referrer_host =
            "" === e.properties.$referrer ? "" : K(e.properties.$referrer, n)),
        da.preset_properties.latest_referrer &&
          da.preset_properties.latest_referrer_host &&
          (e.properties.$latest_referrer_host =
            "" === e.properties.$latest_referrer
              ? ""
              : K(e.properties.$latest_referrer, n)));
    }
    function Xe(e) {
      var t = !e.type || "profile" !== e.type.slice(0, 7),
        r = da.preset_properties && t;
      r &&
        da.preset_properties.url &&
        v(e.properties.$url) &&
        (e.properties.$url = G()),
        r &&
          da.preset_properties.title &&
          v(e.properties.$title) &&
          (e.properties.$title = document.title);
    }
    function Ze(e) {
      if (!h(e.target)) return !1;
      var t = e.target,
        r = d(t.tagName) ? t.tagName.toLowerCase() : "unknown",
        n = {};
      return (
        (n.$element_type = r),
        (n.$element_name = t.getAttribute("name")),
        (n.$element_id = t.getAttribute("id")),
        (n.$element_class_name = d(t.className) ? t.className : null),
        (n.$element_target_url = t.getAttribute("href")),
        (n.$element_content = Qe(t, r)),
        (n = We(n)),
        (n.$url = G()),
        (n.$url_path = Q()),
        (n.$title = document.title),
        n
      );
    }
    function Ge(t) {
      var r =
        da.heatmap && e(da.heatmap.collect_input) && da.heatmap.collect_input(t);
      return "button" === t.type || "submit" === t.type || r ? t.value || "" : "";
    }
    function Qe(e, t) {
      return d(t) && "input" === t.toLowerCase() ? Ge(e) : q(e, t);
    }
    function Ye(e) {
      return ka.protocol.ajax(e.url), O(e);
    }
    function et(e) {
      if (
        ("string" == typeof e &&
          ((e = f(e)),
          e &&
            ("://" === e.slice(0, 3)
              ? (e = location.protocol.slice(0, -1) + e)
              : "//" === e.slice(0, 2)
                ? (e = location.protocol + e)
                : "http" !== e.slice(0, 4) && (e = ""))),
        y(e) && e.length)
      )
        for (var t = 0; t < e.length; t++)
          /sa\.gif[^\/]*$/.test(e[t]) ||
            (e[t] = e[t]
              .replace(/\/sa$/, "/sa.gif")
              .replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
      else
        /sa\.gif[^\/]*$/.test(e) ||
          "string" != typeof e ||
          (e = e
            .replace(/\/sa$/, "/sa.gif")
            .replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
      return e;
    }
    function tt(e) {
      d(e) || (e = JSON.stringify(e));
      var t = I(e),
        r = "crc=" + te(t);
      return "data=" + encodeURIComponent(t) + "&ext=" + encodeURIComponent(r);
    }
    function rt(t) {
      var r = location.href,
        n = window.history.pushState,
        i = window.history.replaceState;
      e(window.history.pushState) &&
        (window.history.pushState = function () {
          n.apply(window.history, arguments), t(r), (r = location.href);
        }),
        e(window.history.replaceState) &&
          (window.history.replaceState = function () {
            i.apply(window.history, arguments), t(r), (r = location.href);
          });
      var a;
      (a = window.document.documentMode
        ? "hashchange"
        : n
          ? "popstate"
          : "hashchange"),
        w(window, a, function () {
          t(r), (r = location.href);
        });
    }
    function nt(e, t) {
      var r = [];
      "string" == typeof e &&
        e in Ca.EVENT_LIST &&
        ((r = Ca.EVENT_LIST[e]), Ca[r[0]].on(r[1], t));
    }
    function it() {
      (this.sendTimeStamp = 0),
        (this.timer = null),
        (this.serverUrl = ""),
        (this.hasTabStorage = !1);
    }
    function at(e, t) {
      for (var r in e)
        if (Object.prototype.hasOwnProperty.call(e, r) && !Ua.check(r, e[r], t))
          return !1;
      return !0;
    }
    function ot(t, n) {
      return r(t)
        ? (P(t, function (i, a) {
            if (y(i)) {
              var o = [];
              P(i, function (e) {
                if (d(e)) o.push(e);
                else if (v(e)) o.push("null");
                else
                  try {
                    o.push(JSON.stringify(e));
                  } catch (t) {
                    Te(
                      "您的数据-",
                      a,
                      i,
                      "数组里值有错误,已将其删除",
                    );
                  }
              }),
                (t[a] = o);
            }
            var s = ne(n || [], a) > -1;
            if (r(i) && "$option" !== a && !s)
              try {
                t[a] = JSON.stringify(i);
              } catch (l) {
                delete t[a],
                  Te(
                    "您的数据-",
                    a,
                    i,
                    "数据值有错误，已将其删除",
                  );
              }
            else
              d(i) ||
                pe(i) ||
                x(i) ||
                oe(i) ||
                y(i) ||
                e(i) ||
                "$option" === a ||
                s ||
                (Te(
                  "您的数据-",
                  a,
                  i,
                  "-格式不满足要求，我们已经将其删除",
                ),
                delete t[a]);
          }),
          t)
        : t;
    }
    function st(e, t) {
      return pe(t) && e.length > t
        ? (Te(
            "字符串长度超过限制，已经做截取--" +
              e,
          ),
          e.slice(0, t))
        : e;
    }
    function lt(e, t) {
      var n = [
        "distinct_id",
        "user_id",
        "id",
        "date",
        "datetime",
        "event",
        "events",
        "first_id",
        "original_id",
        "device_id",
        "properties",
        "second_id",
        "time",
        "users",
      ];
      r(e) &&
        P(n, function (r, n) {
          r in e &&
            (ne(t || [], r) > -1 ||
              (n < 3
                ? (delete e[r],
                  Te(
                    "您的属性- " +
                      r +
                      "是保留字段，我们已经将其删除",
                  ))
                : Te(
                    "您的属性- " +
                      r +
                      "是保留字段，请避免其作为属性名",
                  )));
        });
    }
    function ut(e) {
      var t = ["$element_selector", "$element_path"],
        n = ["sensorsdata_app_visual_properties"];
      r(e) &&
        P(e, function (i, a) {
          if (r(i)) ut(e[a]);
          else if (d(i)) {
            if (ne(n, a) > -1) return;
            e[a] = st(i, ne(t, a) > -1 ? 1024 : da.max_string_length);
          }
        });
    }
    function ct(e) {
      "undefined" != typeof e.properties.$project &&
        ((e.project = e.properties.$project), delete e.properties.$project),
        "undefined" != typeof e.properties.$token &&
          ((e.token = e.properties.$token), delete e.properties.$token);
    }
    function pt(e) {
      if ("item_type" in e) {
        var t = e.item_type,
          r = function (t) {
            return t || delete e.item_type, !0;
          };
        at({ item_type: t }, r);
      }
      if ("item_id" in e) {
        var n = e.item_id,
          i = function (t, r, n) {
            return t || "string" !== n || delete e.item_id, !0;
          };
        at({ item_id: n }, i);
      }
    }
    function dt(e, t) {
      P(e, function (r, n) {
        var i = function (t, r, i) {
          return t || "keyLength" === i || delete e[n], !0;
        };
        ne(t || [], n) === -1 && at({ propertyKey: n }, i);
      });
    }
    function ft(e) {
      var t = e.properties;
      be(e),
        r(t)
          ? (ot(t), lt(t), ct(e), dt(t), ut(t))
          : "properties" in e && (e.properties = {}),
        pt(e);
    }
    function gt(e, t) {
      var r = t.sensors;
      return (
        (e._track_id = Number(
          String(n()).slice(2, 5) +
            String(n()).slice(2, 4) +
            String(new Date().getTime()).slice(-4),
        )),
        (e._flush_time = new Date().getTime()),
        r.events.tempAdd("send", e),
        e
      );
    }
    function _t(e, t) {
      try {
        var n = t.sensors,
          i = {};
        r(e) && r(e.identities) && !se(e.identities)
          ? C(i, e.identities)
          : C(i, xa.getIdentities());
        var a = {
          identities: i,
          distinct_id: xa.getDistinctId(),
          lib: {
            $lib: "js",
            $lib_method: "code",
            $lib_version: String(n.lib_version),
          },
          properties: {},
        };
        return (
          r(e) &&
            r(e.properties) &&
            !se(e.properties) &&
            (e.properties.$lib_detail &&
              ((a.lib.$lib_detail = e.properties.$lib_detail),
              delete e.properties.$lib_detail),
            e.properties.$lib_method &&
              ((a.lib.$lib_method = e.properties.$lib_method),
              delete e.properties.$lib_method)),
          U(a, xa.getUnionId(), e),
          r(e.properties) && !se(e.properties) && C(a.properties, e.properties),
          "$UnbindID" === a.event &&
            (a.login_id && delete a.login_id,
            a.anonymous_id && delete a.anonymous_id),
          (e.type && "profile" === e.type.slice(0, 7)) ||
            ((a.properties = C(
              {},
              Pa.properties(),
              xa.getProps(),
              xa.getSessionProps(),
              Pa.currentProps,
              a.properties,
            )),
            n.para.preset_properties.latest_referrer &&
              !d(a.properties.$latest_referrer) &&
              (a.properties.$latest_referrer = "取值异常"),
            n.para.preset_properties.latest_search_keyword &&
              !d(a.properties.$latest_search_keyword) &&
              ((n.para.preset_properties.search_keyword_baidu &&
                d(a.properties.$search_keyword_id) &&
                pe(a.properties.$search_keyword_id_hash) &&
                d(a.properties.$search_keyword_id_type)) ||
                (a.properties.$latest_search_keyword =
                  "取值异常")),
            n.para.preset_properties.latest_traffic_source_type &&
              !d(a.properties.$latest_traffic_source_type) &&
              (a.properties.$latest_traffic_source_type =
                "取值异常"),
            n.para.preset_properties.latest_landing_page &&
              !d(a.properties.$latest_landing_page) &&
              (a.properties.$latest_landing_page = "取值异常"),
            "not_collect" === n.para.preset_properties.latest_wx_ad_click_id
              ? (delete a.properties._latest_wx_ad_click_id,
                delete a.properties._latest_wx_ad_hash_key,
                delete a.properties._latest_wx_ad_callbacks)
              : n.para.preset_properties.latest_wx_ad_click_id &&
                !d(a.properties._latest_wx_ad_click_id) &&
                ((a.properties._latest_wx_ad_click_id =
                  "取值异常"),
                (a.properties._latest_wx_ad_hash_key =
                  "取值异常"),
                (a.properties._latest_wx_ad_callbacks =
                  "取值异常")),
            d(a.properties._latest_wx_ad_click_id) && (a.properties.$url = G())),
          a.properties.$time && x(a.properties.$time)
            ? ((a.time = 1 * a.properties.$time), delete a.properties.$time)
            : (a.time = 1 * new Date()),
          (function (e) {
            if (n.bridge && "success" === n.bridge.bridge_info.verify_success) {
              var t = Ha.customProp.geth5Props(JSON.parse(JSON.stringify(e)));
              r(t) && !se(t) && (e.properties = C(e.properties, t));
            }
            var i = qa.customProp.getVtrackProps(JSON.parse(JSON.stringify(e)));
            r(i) && !se(i) && (e.properties = C(e.properties, i));
          })(a),
          Fe(a),
          ba.checkIsAddSign(a),
          ba.checkIsFirstTime(a),
          ze(a),
          Xe(a),
          a
        );
      } catch (o) {
        return { _debug_web_msg: String(o) };
      }
    }
    function ht(e) {
      return Fa.stage.process("basicProps", e);
    }
    function mt(e) {
      return Fa.stage.process("formatData", e);
    }
    function vt(e, t, r, n) {
      function i(e) {
        function i() {
          o || ((o = !0), (location.href = a.href));
        }
        e.stopPropagation(), e.preventDefault();
        var o = !1;
        setTimeout(i, 1e3), n(t, r, i);
      }
      e = e || {};
      var a = null;
      return (
        e.ele && (a = e.ele),
        e.event && (a = e.target ? e.target : e.event.target),
        (r = r || {}),
        !(!a || "object" != typeof a) &&
          (!a.href ||
          /^javascript/.test(a.href) ||
          a.target ||
          a.download ||
          a.onclick
            ? (n(t, r), !1)
            : (e.event && i(e.event),
              void (
                e.ele &&
                Ee(e.ele, "click", function (e) {
                  i(e);
                })
              )))
      );
    }
    function yt() {
      var e = location.protocol;
      return "http:" === e || "https:" === e ? e : "http:";
    }
    function bt(e) {
      return Wa.stage.process("webClickEvent", e);
    }
    function wt(e) {
      return Wa.stage.process("webStayEvent", e);
    }
    function St() {
      var e = Pa.campaignParams(),
        t = {};
      return (
        P(e, function (e, r, n) {
          (" " + Xi.source_channel_standard + " ").indexOf(" " + r + " ") !== -1
            ? (t["$" + r] = n[r])
            : (t[r] = n[r]);
        }),
        t
      );
    }
    function kt(e, t, r) {
      if (Xi.is_first_visitor && r) {
        var n = {};
        Xi.para.preset_properties.search_keyword_baidu &&
          He(document.referrer) &&
          Le() &&
          ((n.$search_keyword_id = Sa.id()),
          (n.$search_keyword_id_type = Sa.type()),
          (n.$search_keyword_id_hash = re(n.$search_keyword_id)));
        var i = Be(null, t);
        e(
          C(
            {
              $first_visit_time: new Date(),
              $first_referrer: i,
              $first_referrer_host: i ? K(i, "取值异常") : "",
              $first_browser_language: d(navigator.language)
                ? navigator.language.toLowerCase()
                : "取值异常",
              $first_browser_charset: d(document.charset)
                ? document.charset.toUpperCase()
                : "取值异常",
              $first_traffic_source_type: qe(),
              $first_search_keyword: Je(),
            },
            St(),
            n,
          ),
        ),
          (Xi.is_first_visitor = !1);
      }
    }
    function Pt(e, t) {
      var n = e.id,
        i = e.callback,
        a = e.name,
        o = xa.getFirstId(),
        s = xa.getOriginDistinctId();
      if (!at({ distinct_id: n })) return Ae("login id is invalid"), !1;
      if (n === xa.getOriginDistinctId() && !o)
        return Ae("login id is equal to distinct_id"), !1;
      if (
        r(xa._state.identities) &&
        xa._state.identities.hasOwnProperty(a) &&
        n === xa._state.first_id
      )
        return !1;
      var l =
        xa._state.history_login_id.name !== a ||
        n !== xa._state.history_login_id.value;
      if (l) {
        (xa._state.identities[a] = n),
          xa.set("history_login_id", { name: a, value: n }),
          o || xa.set("first_id", s),
          t(n, "$SignUp", {}, i);
        var u = { $identity_cookie_id: xa._state.identities.$identity_cookie_id };
        return (u[a] = n), Ct(u), !0;
      }
      return !1;
    }
    function Ct(e) {
      var t = {};
      for (var r in e) t[r] = e[r];
      (xa._state.identities = t), xa.save();
    }
    function Ot(e, t) {
      if (!at({ unbindKey: e, bindValue: t })) return !1;
      if (
        r(xa._state.identities) &&
        xa._state.identities.hasOwnProperty(e) &&
        xa._state.identities[e] === t
      ) {
        var n = xa.getUnionId().login_id;
        n &&
          e + "+" + t === n &&
          ((xa._state.distinct_id = xa._state.first_id),
          (xa._state.first_id = ""),
          xa.set("history_login_id", { name: "", value: "" })),
          "$identity_cookie_id" !== e &&
            (delete xa._state.identities[e], xa.save());
      }
      var i = {};
      return (i[e] = t), i;
    }
    function jt() {
      (Xi._t = Xi._t || 1 * new Date()),
        (Xi.is_first_visitor = !1),
        (Xi.source_channel_standard = ga);
    }
    function Nt(e) {
      C(da, e || Xi.para || {}), (Xi.para = da);
      var t = {};
      if (r(Xi.para.is_track_latest))
        for (var n in Xi.para.is_track_latest)
          t["latest_" + n] = Xi.para.is_track_latest[n];
      Xi.para.preset_properties = C(
        {},
        fa.preset_properties,
        t,
        Xi.para.preset_properties || {},
      );
      var i;
      for (i in fa) void 0 === Xi.para[i] && (Xi.para[i] = fa[i]);
      "string" != typeof Xi.para.web_url ||
        ("://" !== Xi.para.web_url.slice(0, 3) &&
          "//" !== Xi.para.web_url.slice(0, 2)) ||
        ("://" === Xi.para.web_url.slice(0, 3)
          ? (Xi.para.web_url = location.protocol.slice(0, -1) + Xi.para.web_url)
          : (Xi.para.web_url = location.protocol + Xi.para.web_url)),
        ka.protocol.serverUrl(),
        Xi.bridge && Xi.bridge.initPara();
      var a = [
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_content",
          "utm_term",
        ],
        o = [
          "www.baidu.",
          "m.baidu.",
          "m.sm.cn",
          "so.com",
          "sogou.com",
          "youdao.com",
          "google.",
          "yahoo.com/",
          "bing.com/",
          "ask.com/",
        ],
        s = [
          "weibo.com",
          "renren.com",
          "kaixin001.com",
          "douban.com",
          "qzone.qq.com",
          "zhihu.com",
          "tieba.baidu.com",
          "weixin.qq.com",
        ],
        l = {
          baidu: ["wd", "word", "kw", "keyword"],
          google: "q",
          bing: "q",
          yahoo: "p",
          sogou: ["query", "keyword"],
          so: "q",
          sm: "q",
        };
      "object" == typeof Xi.para.source_type &&
        ((Xi.para.source_type.utm = y(Xi.para.source_type.utm)
          ? Xi.para.source_type.utm.concat(a)
          : a),
        (Xi.para.source_type.search = y(Xi.para.source_type.search)
          ? Xi.para.source_type.search.concat(o)
          : o),
        (Xi.para.source_type.social = y(Xi.para.source_type.social)
          ? Xi.para.source_type.social.concat(s)
          : s),
        (Xi.para.source_type.keyword = r(Xi.para.source_type.keyword)
          ? C(l, Xi.para.source_type.keyword)
          : l));
      var u = { div: !1 },
        c = [
          "mark",
          "/mark",
          "strong",
          "b",
          "em",
          "i",
          "u",
          "abbr",
          "ins",
          "del",
          "s",
          "sup",
        ];
      if (
        (Xi.para.heatmap && !r(Xi.para.heatmap) && (Xi.para.heatmap = {}),
        r(Xi.para.heatmap))
      ) {
        (Xi.para.heatmap.clickmap = Xi.para.heatmap.clickmap || "default"),
          (Xi.para.heatmap.scroll_notice_map =
            Xi.para.heatmap.scroll_notice_map || "default"),
          (Xi.para.heatmap.scroll_delay_time =
            Xi.para.heatmap.scroll_delay_time || 4e3),
          (Xi.para.heatmap.scroll_event_duration =
            Xi.para.heatmap.scroll_event_duration || 18e3),
          (Xi.para.heatmap.renderRefreshTime =
            Xi.para.heatmap.renderRefreshTime || 1e3),
          (Xi.para.heatmap.loadTimeout = Xi.para.heatmap.loadTimeout || 1e3),
          Xi.para.heatmap.get_vtrack_config !== !0 &&
            (Xi.para.heatmap.get_vtrack_config = !1);
        var p = y(Xi.para.heatmap.track_attr)
          ? R(Xi.para.heatmap.track_attr, function (e) {
              return e && "string" == typeof e;
            })
          : [];
        if (
          (p.push("data-sensors-click"),
          (Xi.para.heatmap.track_attr = p),
          r(Xi.para.heatmap.collect_tags))
        )
          if (Xi.para.heatmap.collect_tags.div === !0)
            Xi.para.heatmap.collect_tags.div = { ignore_tags: c, max_level: 1 };
          else if (r(Xi.para.heatmap.collect_tags.div)) {
            if (
              (Xi.para.heatmap.collect_tags.div.ignore_tags
                ? y(Xi.para.heatmap.collect_tags.div.ignore_tags) ||
                  (Te(
                    "ignore_tags 参数必须是数组格式",
                  ),
                  (Xi.para.heatmap.collect_tags.div.ignore_tags = c))
                : (Xi.para.heatmap.collect_tags.div.ignore_tags = c),
              Xi.para.heatmap.collect_tags.div.max_level)
            ) {
              var d = [1, 2, 3];
              ne(d, Xi.para.heatmap.collect_tags.div.max_level) === -1 &&
                (Xi.para.heatmap.collect_tags.div.max_level = 1);
            }
          } else Xi.para.heatmap.collect_tags.div = !1;
        else Xi.para.heatmap.collect_tags = u;
      }
      (Xi.para.server_url = et(Xi.para.server_url)),
        Xi.para.noCache === !0
          ? (Xi.para.noCache = "?" + new Date().getTime())
          : (Xi.para.noCache = ""),
        Xi.para.callback_timeout > Xi.para.datasend_timeout &&
          (Xi.para.datasend_timeout = Xi.para.callback_timeout),
        Xi.para.heatmap &&
          Xi.para.heatmap.collect_tags &&
          r(Xi.para.heatmap.collect_tags) &&
          P(Xi.para.heatmap.collect_tags, function (e, t) {
            "div" !== t && e && Xi.heatmap.otherTags.push(t);
          }),
        Xi.para.heatmap &&
          "default" === Xi.para.heatmap.clickmap &&
          Xi.heatmap.initUnlimitedTags();
    }
    function It() {
      var e = Array.prototype.slice.call(arguments),
        t = e[0],
        r = e.slice(1);
      return "string" == typeof t && Za[t]
        ? Za[t].apply(Za, r)
        : void ("function" == typeof t
            ? t.apply(Xi, r)
            : Te(
                "quick方法中没有这个功能" +
                  e[0],
              ));
    }
    function Tt(t, n) {
      function i() {
        return (
          !a.plugin_is_init && a.init(Xi, n),
          (a.plugin_is_init = !0),
          (Xi.modules = Xi.modules || {}),
          (Xi.modules[a.plugin_name || "unnamed_" + Qa++] = a),
          a
        );
      }
      if (!d(t) && !r(t))
        return void Ae("use's first arguments must be string or object.");
      var a;
      if (r(t)) {
        var o = Xi.modules && Xi.modules[t.plugin_name];
        o &&
          o !== t &&
          Te(
            t.name +
              " is conflict with builtin plugin, and sdk uses builtin plugin.",
          ),
          (a = o || t);
      }
      return (
        d(t) &&
          (r(Xi.modules) && r(Xi.modules[t])
            ? (a = Xi.modules[t])
            : r(window.SensorsDataWebJSSDKPlugin) &&
                r(window.SensorsDataWebJSSDKPlugin[t])
              ? (a = window.SensorsDataWebJSSDKPlugin[t])
              : window.sensorsDataAnalytic201505 &&
                window.sensorsDataAnalytic201505.modules[t] &&
                (a = window.sensorsDataAnalytic201505.modules[t])),
        a && e(a.init)
          ? a.plugin_is_init
            ? a
            : (a.plugin_name ||
                Te("warning: invalid plugin, plugin_name required."),
              a.plugin_version
                ? a.plugin_version !== Xi.lib_version &&
                  Te(
                    "warning: plugin version not match SDK version. plugin may not work correctly. ",
                  )
                : Te("warning: invalid plugin, plugin version required."),
              i())
          : (Te(
              (t.plugin_name || t) +
                " is not found or it's not a standard plugin. Please check sensorsdata official documents.",
            ),
            a)
      );
    }
    function At(e, t, r) {
      at({ event: e, properties: t }) &&
        Va.send({ type: "track", event: e, properties: t }, r);
    }
    function Dt(e, t) {
      return (
        !!at({ bindKey: e, bindValue: t }) &&
        ((xa._state.identities[e] = t),
        xa.save(),
        void Va.send({ type: "track_id_bind", event: "$BindID", properties: {} }))
      );
    }
    function $t(e, t) {
      var r = Ot(e, t);
      r &&
        Va.send({
          identities: r,
          type: "track_id_unbind",
          event: "$UnbindID",
          properties: {},
        });
    }
    function xt(e, t, r) {
      "object" == typeof e && e.tagName
        ? vt({ ele: e }, t, r, Xi.track)
        : "object" == typeof e && e.target && e.event && vt(e, t, r, Xi.track);
    }
    function Et(e, t, r) {
      return (
        (r = r || {}),
        !(!e || "object" != typeof e) &&
          !(!e.href || /^javascript/.test(e.href) || e.target) &&
          void Ee(e, "click", function (n) {
            function i() {
              a || ((a = !0), (location.href = e.href));
            }
            n.preventDefault();
            var a = !1;
            setTimeout(i, 1e3), Xi.track(t, r, i);
          })
      );
    }
    function Lt(e, t, r) {
      at({ item_type: e, item_id: t, properties: r }) &&
        Va.sendItem({
          type: "item_set",
          item_type: e,
          item_id: t,
          properties: r || {},
        });
    }
    function Ut(e, t) {
      at({ item_type: e, item_id: t }) &&
        Va.sendItem({ type: "item_delete", item_type: e, item_id: t });
    }
    function Rt(e, t) {
      at({ propertiesMust: e }) &&
        Va.send({ type: "profile_set", properties: e }, t);
    }
    function Bt(e, t) {
      at({ propertiesMust: e }) &&
        Va.send({ type: "profile_set_once", properties: e }, t);
    }
    function Ht(e, t) {
      at({ propertiesMust: e }) &&
        (P(e, function (t, r) {
          d(t) && Ne(r)
            ? (e[r] = [t])
            : y(t) && Ne(r)
              ? (e[r] = t)
              : (delete e[r],
                Te(
                  "appendProfile属性的值必须是字符串或者数组",
                ));
        }),
        se(e) || Va.send({ type: "profile_append", properties: e }, t));
    }
    function Jt(e, t) {
      function r(e) {
        for (var t in e)
          if (
            Object.prototype.hasOwnProperty.call(e, t) &&
            !/-*\d+/.test(String(e[t]))
          )
            return !1;
        return !0;
      }
      var n = e;
      d(e) && ((e = {}), (e[n] = 1)),
        at({ propertiesMust: e }) &&
          (r(e)
            ? Va.send({ type: "profile_increment", properties: e }, t)
            : Ae("profile_increment的值只能是数字"));
    }
    function Mt(e) {
      Va.send({ type: "profile_delete" }, e),
        xa.set("distinct_id", ea()),
        xa.set("first_id", "");
    }
    function qt(e, t) {
      var r = e,
        n = {};
      d(e) && ((e = []), e.push(r)),
        y(e)
          ? (P(e, function (e) {
              d(e)
                ? (n[e] = !0)
                : Te(
                    "profile_unset给的数组里面的值必须时string,已经过滤掉",
                    e,
                  );
            }),
            Va.send({ type: "profile_unset", properties: n }, t))
          : Ae("profile_unset的参数必须是数组");
    }
    function Kt(e) {
      "number" == typeof e && (e = String(e));
      var t = xa.getFirstId();
      if ("undefined" == typeof e) {
        var r = ea();
        t ? xa.set("first_id", r) : xa.set("distinct_id", r);
      } else
        at({ distinct_id: e }) &&
          (t ? xa.set("first_id", e) : xa.set("distinct_id", e));
    }
    function Ft(e) {
      var t = xa.getFirstId();
      if (t)
        return (
          Ae("resetAnonymousIdentity must be used in a logout state ！"), !1
        );
      if (("number" == typeof e && (e = String(e)), "undefined" == typeof e)) {
        var r = ea();
        (xa._state.identities.$identity_cookie_id = r), xa.set("distinct_id", r);
      } else
        at({ distinct_id: e }) &&
          ((xa._state.identities.$identity_cookie_id = e),
          xa.set("distinct_id", e));
    }
    function Vt(e, t, r, n) {
      var i = xa.getFirstId() || xa.getDistinctId();
      xa.set("distinct_id", e),
        Va.send(
          {
            original_id: i,
            distinct_id: xa.getDistinctId(),
            type: "track_signup",
            event: t,
            properties: r,
          },
          n,
        );
    }
    function Wt(e, t, r, n) {
      "number" == typeof e && (e = String(e)),
        at({ distinct_id: e, event: t, properties: r }) && Vt(e, t, r, n);
    }
    function zt(e) {
      at({ properties: e })
        ? C(Pa.currentProps, e)
        : Ae("register输入的参数有误");
    }
    function Xt(e) {
      xa.clearAllProps(e);
    }
    function Zt(e) {
      var t;
      if (y(e) && e.length > 0)
        for (t = 0; t < e.length; t++)
          d(e[t]) && e[t] in Pa.currentProps && delete Pa.currentProps[e[t]];
      else if (e === !0) for (t in Pa.currentProps) delete Pa.currentProps[t];
    }
    function Gt(e) {
      at({ properties: e })
        ? xa.setProps(e)
        : Ae("register输入的参数有误");
    }
    function Qt(e) {
      at({ properties: e })
        ? xa.setPropsOnce(e)
        : Ae("registerOnce输入的参数有误");
    }
    function Yt(e) {
      Xi.log(
        "registerSession 方法已经弃用，有问题联系技术顾问",
      ),
        at({ properties: e })
          ? xa.setSessionProps(e)
          : Ae("registerSession输入的参数有误");
    }
    function er(e) {
      Xi.log(
        "registerSessionOnce 方法已经弃用，有问题联系技术顾问",
      ),
        at({ properties: e })
          ? xa.setSessionPropsOnce(e)
          : Ae("registerSessionOnce输入的参数有误");
    }
    function tr(t, r) {
      "number" == typeof t && (t = String(t));
      var n = Pt({ id: t, callback: r, name: ma.LOGIN }, Vt);
      !n && e(r) && r();
    }
    function rr(e, t) {
      return (
        Te("loginWithKey is deprecated !!!"),
        "number" == typeof t && (t = String(t)),
        "number" == typeof e && (e = String(e)),
        !!at({ loginIdKey: e }) &&
          (ma.LOGIN === e
            ? (tr(t), !1)
            : void Pt({ id: t, callback: null, name: e }, Vt))
      );
    }
    function nr(e) {
      var t = xa.getFirstId();
      if (t)
        if ((xa.set("first_id", ""), e === !0)) {
          var r = ea();
          xa.set("distinct_id", r);
        } else xa.set("distinct_id", t);
      Ct({ $identity_cookie_id: xa._state.identities.$identity_cookie_id }),
        xa.set("history_login_id", { name: "", value: "" });
    }
    function ir() {
      function e() {
        var e = Pa.campaignParams(),
          t = {};
        return (
          P(e, function (e, r, n) {
            (" " + Xi.source_channel_standard + " ").indexOf(" " + r + " ") !== -1
              ? (t["$" + r] = n[r])
              : (t[r] = n[r]);
          }),
          t
        );
      }
      var t = {
          $is_first_day: xe(),
          $is_first_time: ba.is_page_first_visited,
          $referrer: Pa.pageProp.referrer || "",
          $referrer_host: Pa.pageProp.referrer ? K(Pa.pageProp.referrer) : "",
          $url: G(),
          $url_path: Q(),
          $title: document.title || "",
          _distinct_id: xa.getDistinctId(),
          identities: xa.getIdentities(),
        },
        r = C({}, Pa.properties(), xa.getProps(), e(), t);
      return (
        Xi.para.preset_properties.latest_referrer &&
          Xi.para.preset_properties.latest_referrer_host &&
          (r.$latest_referrer_host =
            "" === r.$latest_referrer ? "" : K(r.$latest_referrer)),
        r
      );
    }
    function ar() {
      var e = "",
        t = " { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }";
      Xi.heatmap &&
        y(Xi.heatmap.otherTags) &&
        P(Xi.heatmap.otherTags, function (r) {
          e += r + t;
        }),
        ue() &&
          F() &&
          F() < 13 &&
          (Xi.para.heatmap &&
            Xi.para.heatmap.collect_tags &&
            Xi.para.heatmap.collect_tags.div &&
            we("div, [data-sensors-click]" + t),
          Xi.para.heatmap &&
            Xi.para.heatmap.track_attr &&
            we("[" + Xi.para.heatmap.track_attr.join("], [") + "]" + t),
          "" !== e && we(e));
    }
    function or(e) {
      var t = this;
      (this.type = e),
        (this.resultCbs = {}),
        (this.timeoutCbs = {}),
        (this.timerId = null),
        (this.appCallJsCallback = null),
        window.sensorsdata_app_call_js ||
          (window.sensorsdata_app_call_js = function (e, t) {
            if (e in window.sensorsdata_app_call_js.modules)
              return window.sensorsdata_app_call_js.modules[e](t);
          }),
        (window.sensorsdata_app_call_js.modules =
          window.sensorsdata_app_call_js.modules || {}),
        (window.sensorsdata_app_call_js.modules[this.type] = function (e) {
          try {
            var r = N(e) || e;
            try {
              r = JSON.parse(r);
            } catch (n) {}
            var i = r && r.message_id;
            if (i && t.resultCbs[i]) {
              if (((e = r), t.timeoutCbs[i] && t.timeoutCbs[i].isTimeout))
                return void (t.resultCbs[i].callbacks.length = 0);
              if (t.resultCbs[i]) {
                (t.resultCbs[i].result = e),
                  clearTimeout(t.timerId),
                  (t.timeoutCbs[i].callbacks.length = 0);
                for (var a in t.resultCbs[i].callbacks)
                  t.resultCbs[i].callbacks[a].call(null, e),
                    t.resultCbs[i].callbacks.splice(a, 1);
              }
              return;
            }
            return t.appCallJsCallback && t.appCallJsCallback.call(null, e);
          } catch (o) {
            Ae("app 回调 js 异常", e);
          }
        });
    }
    function sr(t) {
      try {
        if (Xi.bridge.activeBridge && e(Xi.bridge.activeBridge.handleCommand))
          return Xi.bridge.activeBridge.handleCommand(t);
      } catch (r) {
        Ae("Error: handle command exception:" + r);
      }
      return (
        Ae(
          "数据发往App失败，App没有暴露bridge,type:" +
            t.callType,
        ),
        !1
      );
    }
    function lr(e) {
      function t(e) {
        var t = { hostname: "", project: "" };
        try {
          (e = _(e)),
            (t.hostname = e.hostname),
            (t.project = e.searchParams.get("project") || "default");
        } catch (r) {
          Ae("validateAppUrl:" + r);
        }
        return t;
      }
      var r = t(e),
        n = t(Xi.para.server_url);
      if (r.hostname === n.hostname && r.project === n.project) return !0;
      if (y(Xi.para.app_js_bridge.white_list))
        for (var i = 0; i < Xi.para.app_js_bridge.white_list.length; i++) {
          var a = t(Xi.para.app_js_bridge.white_list[i]);
          if (a.hostname === r.hostname && a.project === r.project) return !0;
        }
      return !1;
    }
    function ur(e) {
      this.bridge = new or(e.type);
    }
    function cr() {
      var e = Pa.pageProp.url_domain,
        t = {};
      "" === e && (e = "url解析失败");
      var n = Je(document.referrer, !0);
      if (
        (da.preset_properties.search_keyword_baidu
          ? He(document.referrer) &&
            (!Le() || (r(n) && n.active)
              ? xa._state &&
                xa._state.props &&
                (xa._state.props.$search_keyword_id &&
                  delete xa._state.props.$search_keyword_id,
                xa._state.props.$search_keyword_id_type &&
                  delete xa._state.props.$search_keyword_id_type,
                xa._state.props.$search_keyword_id_hash &&
                  delete xa._state.props.$search_keyword_id_hash)
              : ((t.$search_keyword_id = Sa.id()),
                (t.$search_keyword_id_type = Sa.type()),
                (t.$search_keyword_id_hash = re(t.$search_keyword_id))))
          : xa._state &&
            xa._state.props &&
            (xa._state.props.$search_keyword_id &&
              delete xa._state.props.$search_keyword_id,
            xa._state.props.$search_keyword_id_type &&
              delete xa._state.props.$search_keyword_id_type,
            xa._state.props.$search_keyword_id_hash &&
              delete xa._state.props.$search_keyword_id_hash),
        xa.save(),
        P(da.preset_properties, function (n, i) {
          if (i.indexOf("latest_") === -1) return !1;
          if (((i = i.slice(7)), n)) {
            if ("wx_ad_click_id" === i && "not_collect" === n) return !1;
            if ("utm" !== i && "url解析失败" === e)
              "wx_ad_click_id" === i
                ? ((t._latest_wx_ad_click_id =
                    "url的domain解析失败"),
                  (t._latest_wx_ad_hash_key =
                    "url的domain解析失败"),
                  (t._latest_wx_ad_callbacks =
                    "url的domain解析失败"))
                : (t["$latest_" + i] = "url的domain解析失败");
            else if (He(document.referrer))
              switch (i) {
                case "traffic_source_type":
                  t.$latest_traffic_source_type = qe();
                  break;
                case "referrer":
                  t.$latest_referrer = Pa.pageProp.referrer;
                  break;
                case "search_keyword":
                  Je()
                    ? (t.$latest_search_keyword = Je())
                    : r(xa._state) &&
                      r(xa._state.props) &&
                      xa._state.props.$latest_search_keyword &&
                      delete xa._state.props.$latest_search_keyword;
                  break;
                case "landing_page":
                  t.$latest_landing_page = G();
                  break;
                case "wx_ad_click_id":
                  var a = Ke(location.href);
                  (t._latest_wx_ad_click_id = a.click_id),
                    (t._latest_wx_ad_hash_key = a.hash_key),
                    (t._latest_wx_ad_callbacks = a.callbacks);
              }
          } else if ("utm" === i && xa._state && xa._state.props)
            for (var o in xa._state.props)
              (0 === o.indexOf("$latest_utm") ||
                (0 === o.indexOf("_latest_") &&
                  o.indexOf("_latest_wx_ad_") < 0)) &&
                delete xa._state.props[o];
          else if (
            xa._state &&
            xa._state.props &&
            "$latest_" + i in xa._state.props
          )
            delete xa._state.props["$latest_" + i];
          else if (
            "wx_ad_click_id" == i &&
            xa._state &&
            xa._state.props &&
            n === !1
          ) {
            var s = [
              "_latest_wx_ad_click_id",
              "_latest_wx_ad_hash_key",
              "_latest_wx_ad_callbacks",
            ];
            P(s, function (e) {
              e in xa._state.props && delete xa._state.props[e];
            });
          }
        }),
        da.preset_properties.latest_utm)
      ) {
        var i = Pa.campaignParamsStandard("$latest_", "_latest_"),
          a = i.$utms,
          o = i.otherUtms;
        se(a) || C(t, a), se(o) || C(t, o);
      }
      Gt(t);
    }
    function pr(e) {
      var t = null;
      try {
        var r = JSON.parse(window.name);
        t = r[e] ? u(r[e]) : null;
      } catch (n) {
        t = null;
      }
      return null === t && (t = V(location.href, e) || null), t;
    }
    function dr(e) {
      function t() {
        var e = [];
        n.touch_app_bridge || e.push(ka.defineMode("1")),
          r(Xi.para.app_js_bridge) ||
            (e.push(ka.defineMode("2")), (n.verify_success = !1)),
          (r(Xi.para.heatmap) && "default" == Xi.para.heatmap.clickmap) ||
            e.push(ka.defineMode("3")),
          "fail" === n.verify_success && e.push(ka.defineMode("4")),
          new Xi.SDKJSBridge("app_alert").notifyApp({ data: e });
      }
      var n = Xi.bridge.bridge_info;
      if (Xi.bridge.hasVisualModeBridge())
        if (r(Xi.para.heatmap) && "default" == Xi.para.heatmap.clickmap)
          if (r(Xi.para.app_js_bridge) && "success" === n.verify_success)
            if (e) window.sa_jssdk_app_define_mode(Xi, e);
            else {
              var i = location.protocol,
                a = ["http:", "https:"];
              (i = ne(a, i) > -1 ? i : "https:"),
                he({
                  success: function () {
                    setTimeout(function () {
                      "undefined" != typeof sa_jssdk_app_define_mode &&
                        window.sa_jssdk_app_define_mode(Xi, e);
                    }, 0);
                  },
                  error: function () {},
                  type: "js",
                  url:
                    i +
                    "//static.sensorsdata.cn/sdk/" +
                    Xi.lib_version +
                    "/vapph5define.min.js",
                });
            }
          else t();
        else t();
    }
    function fr(t) {
      Xi.para.is_track_single_page &&
        Oa.on("switch", function (n) {
          var i = function (r) {
            if (((r = r || {}), n !== location.href)) {
              Pa.pageProp.referrer = G(n);
              var i = C({ $url: G(), $referrer: G(n) }, r);
              e(t) ? t(i) : Xi.quick && Xi.quick("autoTrack", i);
            }
          };
          if ("boolean" == typeof Xi.para.is_track_single_page) i();
          else if ("function" == typeof Xi.para.is_track_single_page) {
            var a = Xi.para.is_track_single_page();
            r(a) ? i(a) : a === !0 && i();
          }
        });
    }
    function gr() {
      Xi._q &&
        y(Xi._q) &&
        Xi._q.length > 0 &&
        P(Xi._q, function (e) {
          Xi[e[0]].apply(Xi, Array.prototype.slice.call(e[1]));
        }),
        r(Xi.para.heatmap) && (Xa.initHeatmap(), Xa.initScrollmap());
    }
    function _r() {
      Xi.readyState.setState(3),
        new Xi.SDKJSBridge("visualized").onAppNotify(function () {
          dr("undefined" != typeof sa_jssdk_app_define_mode);
        }),
        dr(!1),
        Xi.bridge.app_js_bridge_v1(),
        Pa.initPage(),
        fr(),
        xa.init(),
        cr(),
        mr(),
        Xi.readyState.setState(4),
        gr();
    }
    function hr() {
      ro.isSeachHasKeyword()
        ? ro.hasKeywordHandle()
        : window.parent !== self && no.isSearchHasKeyword()
          ? no.verifyVtrackMode()
          : ro.isWindowNameHasKeyword()
            ? ro.windowNameHasKeywordHandle()
            : ro.isStorageHasKeyword()
              ? ro.storageHasKeywordHandle()
              : window.parent !== self && no.isStorageHasKeyword()
                ? no.verifyVtrackMode()
                : (_r(), no.notifyUser());
    }
    function mr() {
      qa.init(), "success" === Xi.bridge.bridge_info.verify_success && Ha.init();
    }
    function vr() {
      P(io, function (t) {
        var r = Xi[t];
        Xi[t] = function () {
          return Xi.readyState.state < 3
            ? (y(Xi._q) || (Xi._q = []),
              Te("calling sdk api before init is deprecated."),
              Xi._q.push([t, arguments]),
              !1)
            : e(Xi.getDisabled) && Xi.getDisabled()
              ? void 0
              : Xi.readyState.getState()
                ? r.apply(Xi, arguments)
                : void Ae("请先初始化神策JS SDK");
        };
      });
    }
    function yr(e, t) {
      (this.cancel = function () {
        e = !0;
      }),
        (this.getCanceled = function () {
          return e || !1;
        }),
        (this.stop = function () {
          t = !0;
        }),
        (this.getStopped = function () {
          return t || !1;
        });
    }
    function br(e, t, r) {
      var n = null;
      try {
        n = JSON.parse(JSON.stringify(e || null));
      } catch (i) {}
      (this.getOriginalData = function () {
        return n;
      }),
        (this.getPosition = function () {
          return t;
        }),
        (this.cancellationToken = new yr()),
        (this.sensors = r);
    }
    function wr(e) {
      if (!r(e)) throw "error: Stage constructor requires arguments.";
      (this.processDef = e), (this.registeredInterceptors = {});
    }
    function Sr(e) {
      e && e.buildDataStage && so.registerStageImplementation(e.buildDataStage),
        e && e.businessStage && po.registerStageImplementation(e.businessStage),
        e && e.sendDataStage && uo.registerStageImplementation(e.sendDataStage),
        e && e.viewStage && go.registerStageImplementation(e.viewStage);
    }
    function kr(e, t) {
      _o[e] && _o[e](t);
    }
    function Pr() {
      return ho.stage && ho.stage.process("getUtmData");
    }
    function Cr(e) {
      return mo.stage.process("send", e);
    }
    function Or(e) {
      (e.kit = vo),
        (e.saEvent = Va),
        (this.buildDataStage = Fa),
        (this.sendDataStage = mo),
        (this.businessStage = ho);
    }
    function jr(e) {
      (e.heatmap = Xa), (this.viewStage = Wa);
    }
    function Nr(t) {
      if (!e(t.properties))
        return void Ae(
          "registerPropertyPlugin arguments error, properties must be function",
        );
      if (t.isMatchedWithFilter && !e(t.isMatchedWithFilter))
        return void Ae(
          "registerPropertyPlugin arguments error, isMatchedWithFilter must be function",
        );
      var r = {
        finalAdjustData: {
          priority: 100,
          entry: function (r) {
            try {
              if (e(t.isMatchedWithFilter))
                return t.isMatchedWithFilter(r) && t.properties(r);
              t.properties(r);
            } catch (n) {
              Ae("execute registerPropertyPlugin callback error:" + n);
            }
          },
        },
      };
      kr("buildDataStage", r);
    }
    function Ir(e) {
      e &&
        ((Xi.events = $a),
        (Xi.bridge = to),
        (Xi.SDKJSBridge = or),
        (Xi.JSBridge = ur),
        (Xi.store = xa),
        (Xi.unlimitedDiv = Ja),
        (Xi.customProp = Ma),
        (Xi.vtrackcollect = qa),
        (Xi.vapph5collect = Ha),
        (Xi.detectMode = hr),
        (Xi.registerFeature = Sr),
        (Xi.registerInterceptor = kr),
        (Xi.commonWays = Za),
        Sr(new Or(Xi)),
        Sr(new jr(Xi)),
        kr("viewStage", yo));
      var t = e ? Ya : ao;
      for (var r in t) Xi[r] = t[r];
      (Xi.logger = pa),
        (Xi.log = Ie),
        (Xi._ = eo),
        (Xi.on = nt),
        (Xi.ee = Ca),
        (Xi.use = Tt),
        (Xi.lib_version = _a),
        (Xi.registerPropertyPlugin = Nr);
    }
    function Tr(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Ar(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Ar(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Dr(e, t, r) {
      return Tr(e, t, r), (e.plugin_version = Ho), e;
    }
    function $r(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            xr(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function xr(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Er(e, t, r) {
      return $r(e, t, r), (e.plugin_version = qo), e;
    }
    function Lr(e) {
      return zo && zo.call(Vo, JSON.stringify(e));
    }
    function Ur(e) {
      return Wo.call(Vo) && Xo && Xo.call(Vo, JSON.stringify(e));
    }
    function Rr(e, t) {
      return t && "function" == typeof t[e.callType] && t[e.callType]();
    }
    function Br(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Hr(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Hr(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Jr(e, t, r) {
      return Br(e, t, r), (e.plugin_version = Go), e;
    }
    function Mr() {
      if (
        ((So = window.SensorsData_APP_New_H5_Bridge),
        (ko = So && So.sensorsdata_track),
        (Po =
          ko && So.sensorsdata_get_server_url && So.sensorsdata_get_server_url()),
        jo("---test---fail---", !Co, Co.bridge.activeBridge, !Po),
        Co && !Co.bridge.activeBridge && Po)
      )
        return (
          (Co.bridge.activeBridge = Qo),
          Co.para.app_js_bridge &&
            !Co.para.app_js_bridge.is_mui &&
            ((Co.bridge.is_verify_success = Po && Co.bridge.validateAppUrl(Po)),
            jo("---test---bridge-verify-", Co.bridge.is_verify_success)),
          (Co.bridge.bridge_info = {
            touch_app_bridge: !0,
            platform: "android",
            verify_success: Co.bridge.is_verify_success ? "success" : "fail",
            support_two_way_call: !!So.sensorsdata_js_call_app,
          }),
          Co.para.app_js_bridge
            ? void Co.registerInterceptor("sendDataStage", {
                send: { priority: 60, entry: qr },
              })
            : void jo(
                "---test---app_js_bridge is not configured, data will not be sent by android bridge.",
              )
        );
    }
    function qr(e, t) {
      if (
        (jo("---test---datasend-", Co.bridge.is_verify_success),
        Co.para.app_js_bridge.is_mui ||
          "item_set" === e.data.type ||
          "item_delete" === e.data.type)
      )
        return e;
      var r = e.callback;
      return Co.bridge.is_verify_success
        ? (jo("---test---bridge-verify-success---", e.data),
          ko &&
            ko.call(
              So,
              JSON.stringify(
                Oo.extend({ server_url: Co.para.server_url }, e.data),
              ),
            ),
          Oo.isFunction(r) && r(),
          t.cancellationToken.cancel(),
          e)
        : (jo("---test---bridge-verify-fail-----", Co.bridge.is_verify_success),
          Co.para.app_js_bridge.is_send
            ? (Co.debug.apph5({ data: e.data, step: "4.2", output: "all" }), e)
            : (Oo.isFunction(r) && r(), t.cancellationToken.cancel(), e));
    }
    function Kr(e) {
      var t = e.callType;
      return t in Zo.commands
        ? Zo.commands[t](e, So)
        : void (
            So &&
            Oo.isFunction(So.sensorsdata_js_call_app) &&
            So.sensorsdata_js_call_app(JSON.stringify(e))
          );
    }
    function Fr(e) {
      return rs && rs.call(es, JSON.stringify(e));
    }
    function Vr(e) {
      return ts.call(es) && ns && ns.call(es, JSON.stringify(e));
    }
    function Wr(e, t) {
      return t && "function" == typeof t[e.callType] && t[e.callType]();
    }
    function zr(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Xr(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Xr(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Zr(e, t, r) {
      return zr(e, t, r), (e.plugin_version = as), e;
    }
    function Gr() {
      if (
        (xo("ObsoleteBridge---test---init---"),
        (No = window.SensorsData_APP_JS_Bridge),
        (Io = No && No.sensorsdata_track),
        (To = No && No.sensorsdata_verify),
        (Ao = No && No.sensorsdata_visual_verify),
        xo("ObsoleteBridge-", Do.bridge.activeBridge, To, Io, Ao),
        Do && !Do.bridge.activeBridge && (To || Io || Ao))
      ) {
        Do.bridge.activeBridge = os;
        var e = To || Io;
        if (
          (Ao &&
            ((e = !!Ao.call(
              No,
              JSON.stringify({ server_url: Do.para.server_url }),
            )),
            xo("ObsoleteBridge---called-return", e)),
          (Do.bridge.bridge_info = {
            touch_app_bridge: !0,
            platform: "android",
            verify_success: e ? "success" : "fail",
          }),
          !Do.para.app_js_bridge)
        )
          return void xo(
            "app_js_bridge is not configured, data will not be sent by android obsolete bridge.",
          );
        Do.registerInterceptor("sendDataStage", {
          send: { priority: 80, entry: Qr },
        }),
          xo("Android obsolete bridge inits succeed.");
      }
    }
    function Qr(e, t) {
      if (
        (xo("ObsoleteBridge---senddata"),
        Do.para.app_js_bridge.is_mui ||
          "item_set" === e.data.type ||
          "item_delete" === e.data.type)
      )
        return e;
      var r = e.callback;
      if (To) {
        var n =
          To &&
          To.call(
            No,
            JSON.stringify($o.extend({ server_url: Do.para.server_url }, e.data)),
          );
        return (
          xo("ObsoleteBridge---anVerify-success", n),
          n
            ? ($o.isFunction(r) && r(), t.cancellationToken.cancel(), e)
            : Do.para.app_js_bridge.is_send
              ? (Do.debug.apph5({ data: e.data, step: "3.1", output: "all" }), e)
              : ($o.isFunction(r) && r(), t.cancellationToken.cancel(), e)
        );
      }
      return (
        xo("ObsoleteBridge---is-send-old-way", Do.para.app_js_bridge.is_send),
        Io &&
          Io.call(
            No,
            JSON.stringify($o.extend({ server_url: Do.para.server_url }, e.data)),
          ),
        $o.isFunction(r) && r(),
        t.cancellationToken.cancel(),
        e
      );
    }
    function Yr(e) {
      xo("ObsoleteBridge---handleCommadn");
      var t = e.callType;
      return t in is.commands
        ? (xo("ObsoleteBridge---", t, is.commands), is.commands[t](e, No))
        : No && $o.isFunction(No.sensorsdata_js_call_app)
          ? (xo("ObsoleteBridge---handleCommadn-abridge"),
            No.sensorsdata_js_call_app(JSON.stringify(e)))
          : void 0;
    }
    function en(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            tn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function tn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function rn(e, t, r) {
      return en(e, t, r), (e.plugin_version = ls), e;
    }
    function nn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            an(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function an(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function on(e, t, r) {
      return nn(e, t, r), (e.plugin_version = ps), e;
    }
    function sn() {
      return "undefined" != typeof Bo && document[Bo];
    }
    function ln(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            un(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function un(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function cn(e, t, r) {
      return ln(e, t, r), (e.plugin_version = Ds), e;
    }
    function pn() {
      if (
        ((fs =
          window.SensorsData_iOS_JS_Bridge &&
          window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url),
        (gs = function () {
          return (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.sensorsdataNativeTracker
          );
        }),
        _s && !_s.bridge.activeBridge && gs() && gs().postMessage)
      ) {
        if (
          ((_s.bridge.activeBridge = $s),
          _s.para.app_js_bridge &&
            !_s.para.app_js_bridge.is_mui &&
            (_s.bridge.is_verify_success = fs && _s.bridge.validateAppUrl(fs)),
          (_s.bridge.bridge_info = {
            touch_app_bridge: !0,
            platform: "ios",
            verify_success: _s.bridge.is_verify_success ? "success" : "fail",
            support_two_way_call: !0,
          }),
          !_s.para.app_js_bridge)
        )
          return void ms(
            "app_js_bridge is not configured, data will not be sent by iOS bridge.",
          );
        _s.registerInterceptor("sendDataStage", {
          send: { priority: 70, entry: dn },
        }),
          ms("IOS bridge inits succeed.");
      }
    }
    function dn(e, t) {
      if (
        _s.para.app_js_bridge.is_mui ||
        "item_set" === e.data.type ||
        "item_delete" === e.data.type
      )
        return e;
      var r = e.callback;
      return _s.bridge.is_verify_success
        ? (gs() &&
            gs().postMessage(
              JSON.stringify({
                callType: "app_h5_track",
                data: hs.extend({ server_url: _s.para.server_url }, e.data),
              }),
            ),
          hs.isFunction(r) && r(),
          t.cancellationToken.cancel(),
          e)
        : _s.para.app_js_bridge.is_send
          ? (_s.debug.apph5({ data: e.data, step: "4.1", output: "all" }), e)
          : (hs.isFunction(r) && r(), t.cancellationToken.cancel(), e);
    }
    function fn(e) {
      var t = e.callType;
      return ("page_info" !== t && "visualized_track" !== t) ||
        _s.bridge.hasVisualModeBridge()
        ? "sensorsdata_get_app_visual_config" === t
          ? hs.isObject(window.SensorsData_APP_New_H5_Bridge) &&
            window.SensorsData_APP_New_H5_Bridge[t]
          : gs() && gs().postMessage(JSON.stringify(e))
        : null;
    }
    function gn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            _n(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function _n(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function hn(e, t, r) {
      return gn(e, t, r), (e.plugin_version = Es), e;
    }
    function mn() {
      if (vs && !vs.bridge.activeBridge && vn()) {
        if (
          ((vs.bridge.activeBridge = Ls),
          (vs.bridge.bridge_info = {
            touch_app_bridge: !0,
            platform: "ios",
            verify_success: yn() ? "success" : "fail",
          }),
          !vs.para.app_js_bridge)
        )
          return void bs(
            "app_js_bridge is not configured, data will not be sent by iOS obsolete bridge.",
          );
        vs.registerInterceptor("sendDataStage", {
          send: { priority: 90, entry: bn },
        }),
          bs("IOS obsolete bridge inits succeed.");
      }
    }
    function vn() {
      return (
        (/sensors-verify/.test(navigator.userAgent) ||
          /sa-sdk-ios/.test(navigator.userAgent)) &&
        !window.MSStream
      );
    }
    function yn() {
      if (/sensors-verify/.test(navigator.userAgent)) {
        var e = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
        if (
          e &&
          e[0] &&
          "string" == typeof e[1] &&
          2 === e[1].split("?").length
        ) {
          e = e[1].split("?");
          var t = null,
            r = null;
          try {
            (t = ys.URL(vs.para.server_url).hostname),
              (r =
                ys.URL(vs.para.server_url).searchParams.get("project") ||
                "default");
          } catch (n) {
            vs.log(n);
          }
          return !(!t || t !== e[0] || !r || r !== e[1]);
        }
        return !1;
      }
      return !!/sa-sdk-ios/.test(navigator.userAgent);
    }
    function bn(e, t) {
      function r(e) {
        var t = JSON.stringify(ys.extend({ server_url: vs.para.server_url }, e));
        return (
          (t = t.replace(/\r\n/g, "")),
          (t = encodeURIComponent(t)),
          "sensorsanalytics://trackEvent?event=" + t
        );
      }
      if (
        vs.para.app_js_bridge.is_mui ||
        "item_set" === e.data.type ||
        "item_delete" === e.data.type
      )
        return e;
      var n = e.callback;
      if (vs.bridge.bridge_info.verify_success) {
        var i = document.createElement("iframe"),
          a = r(e.data);
        return (
          i.setAttribute("src", a),
          document.documentElement.appendChild(i),
          i.parentNode.removeChild(i),
          (i = null),
          ys.isFunction(n) && n(),
          t.cancellationToken.cancel(),
          !0
        );
      }
      return vs.para.app_js_bridge.is_send
        ? (vs.debug.apph5({ data: e.data, step: "3.2", output: "all" }), e)
        : (ys.isFunction(n) && n(), t.cancellationToken.cancel(), e);
    }
    function wn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Sn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Sn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function kn(e, t, r) {
      return wn(e, t, r), (e.plugin_version = Rs), e;
    }
    function Pn() {
      (this.sd = null),
        (this.start_time = +new Date()),
        (this.page_show_status = !0),
        (this.page_hidden_status = !1),
        (this._ = {}),
        (this.timer = null),
        (this.current_page_url = document.referrer),
        (this.url = location.href),
        (this.title = document.title || ""),
        (this.option = {}),
        (this.heartbeat_interval_time = 5e3),
        (this.heartbeat_interval_timer = null),
        (this.page_id = null),
        (this.storage_name = "sawebjssdkpageleave"),
        (this.max_duration = Hs);
    }
    function Cn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            On(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function On(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function jn(e, t, r) {
      return Cn(e, t, r), (e.plugin_version = qs), e;
    }
    function Nn(e, t) {
      if ("track" !== e.type) return e;
      var r = t.sd,
        n = r._,
        i = r.saEvent.check,
        a = n.extend2Lev({ properties: {} }, e),
        o = t.customRegister,
        s = a.properties,
        l = a.event,
        u = {};
      return (
        n.each(o, function (e) {
          if (n.isObject(e))
            n.indexOf(e.events, l) > -1 &&
              i({ properties: e.properties }) &&
              (u = n.extend(u, e.properties));
          else if (n.isFunction(e)) {
            var t = e({ event: l, properties: s, data: a });
            n.isObject(t) &&
              !n.isEmptyObject(t) &&
              i({ properties: t }) &&
              (u = n.extend(u, t));
          }
        }),
        (e.properties = n.extend(s, u)),
        e
      );
    }
    function In() {
      (this.sd = null),
        (this.log = (window.console && window.console.log) || function () {}),
        (this.customRegister = []);
    }
    function Tn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            An(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function An(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Dn(e, t, r) {
      return Tn(e, t, r), (e.plugin_version = Ws), e;
    }
    function $n(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            xn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function xn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function En(e, t, r) {
      return $n(e, t, r), (e.plugin_version = Qs), e;
    }
    function Ln(e) {
      try {
        if (
          "$pageview" !== e.event &&
          (!e.type || "profile" !== e.type.slice(0, 7))
        ) {
          var t =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight ||
              0,
            r = document.documentElement.scrollHeight || 0,
            n = { $page_height: Math.max(t, r) || 0 };
          e.properties = zs._.extend(e.properties || {}, n);
        }
      } catch (i) {
        Ys("页面高度获取异常。");
      }
      return Xs.call(zs.kit, e);
    }
    function Un(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Rn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Rn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Bn(e, t, r) {
      return Un(e, t, r), (e.plugin_version = rl), e;
    }
    function Hn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Jn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Jn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Mn(e, t, r) {
      return Hn(e, t, r), (e.plugin_version = yl), e;
    }
    function qn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Kn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Kn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Fn(e, t, r) {
      return qn(e, t, r), (e.plugin_version = Sl), e;
    }
    function Vn() {
      kl = !0;
    }
    function Wn() {
      kl = !1;
    }
    function zn() {
      return kl;
    }
    function Xn(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Zn(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Zn(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Gn(e, t, r) {
      return Xn(e, t, r), (e.plugin_version = jl), e;
    }
    function Qn(e) {
      var t = e,
        r = "";
      (r =
        al.para.debug_mode_url.indexOf("?") !== -1
          ? al.para.debug_mode_url + "&" + al.kit.encodeTrackData(e)
          : al.para.debug_mode_url + "?" + al.kit.encodeTrackData(e)),
        ol.ajax({
          url: r,
          type: "GET",
          cors: !0,
          header: { "Dry-Run": String(al.para.debug_mode_upload) },
          success: function (e) {
            ol.isEmptyObject(e) === !0
              ? alert("debug数据发送成功" + t)
              : alert(
                  "debug失败 错误原因" +
                    JSON.stringify(e),
                );
          },
        });
    }
    function Yn(e, t) {
      if (al.para.debug_mode === !0) {
        var r = e.data;
        e.callback, Qn(JSON.stringify(r)), t.cancellationToken.stop();
      }
      return e;
    }
    function ei() {
      al.para.debug_mode === !0 &&
        ((al.para.debug_mode_upload = al.para.debug_mode_upload || !1),
        ol.isString(al.para.debug_mode_url) ||
          (ol.isString(al.para.server_url)
            ? (al.para.debug_mode_url = al.para.server_url.replace(
                "sa.gif",
                "debug",
              ))
            : ol.isArray(al.para.server_url) && ol.isString(al.para.server_url[0])
              ? (al.para.debug_mode_url = al.para.server_url[0].replace(
                  "sa.gif",
                  "debug",
                ))
              : (al.para.debug_mode = !1)));
    }
    function ti() {
      al.on("sdkInitPara", function () {
        ei();
      }),
        al.on("sdkAfterInitPara", function () {
          al.registerInterceptor("sendDataStage", {
            send: { priority: 30, entry: Yn },
          });
        });
    }
    function ri(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            ni(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function ni(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function ii(e, t, r) {
      return ri(e, t, r), (e.plugin_version = Tl), e;
    }
    function ai(e, t) {
      if (
        ll.isObject(sl.para.jsapp) &&
        !sl.para.jsapp.isOnline &&
        "function" == typeof sl.para.jsapp.setData
      ) {
        var r = e;
        delete r.callback,
          (r = JSON.stringify(r)),
          sl.para.jsapp.setData(r),
          t.cancellationToken.stop();
      }
      return e;
    }
    function oi() {
      sl.on("sdkAfterInitAPI", function () {
        ll.isObject(sl.commonWays) && (sl.commonWays.setOnlineState = si),
          sl.registerInterceptor("sendDataStage", {
            send: { priority: 40, entry: ai },
          });
      });
    }
    function si(e) {
      if (
        e === !0 &&
        ll.isObject(sl.para.jsapp) &&
        "function" == typeof sl.para.jsapp.getData
      ) {
        sl.para.jsapp.isOnline = !0;
        var t = sl.para.jsapp.getData();
        ll.isArray(t) &&
          t.length > 0 &&
          ll.each(t, function (e) {
            ll.isJSONString(e) && sl.kit.sendData(JSON.parse(e));
          });
      } else sl.para.jsapp.isOnline = !1;
    }
    function li(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            ui(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function ui(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function ci(e, t, r) {
      return li(e, t, r), (e.plugin_version = $l), e;
    }
    function pi(e, t) {
      return (
        !ul.para.app_js_bridge &&
          ul.para.batch_send &&
          cl.localStorage.isSupport() &&
          localStorage.length < ul.para.batch_send.storage_length &&
          (xl.add(e.data), t.cancellationToken.stop()),
        e
      );
    }
    function di() {
      var e = { datasend_timeout: 6e3, send_interval: 6e3, storage_length: 200 };
      cl.localStorage.isSupport() &&
      cl.isSupportCors() &&
      "object" == typeof localStorage
        ? ul.para.batch_send === !0
          ? (ul.para.batch_send = cl.extend({}, e))
          : "object" == typeof ul.para.batch_send &&
            (ul.para.batch_send = cl.extend({}, e, ul.para.batch_send))
        : (ul.para.batch_send = !1);
    }
    function fi() {
      ul.on("sdkInitPara", function () {
        di();
      }),
        ul.on("sdkAfterInitPara", function () {
          !ul.para.app_js_bridge &&
            ul.para.batch_send &&
            cl.localStorage.isSupport() &&
            (xl || (xl = new cl.BatchSend()),
            xl.batchInterval(),
            ul.registerInterceptor("sendDataStage", {
              send: { priority: 100, entry: pi },
            }));
        });
    }
    function gi(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            _i(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function _i(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function hi(e, t, r) {
      return gi(e, t, r), (e.plugin_version = Ul), e;
    }
    function mi(e) {
      var t = new dl.BeaconSend(e);
      t.start();
    }
    function vi(e, t) {
      var r = null,
        n = null;
      dl.isObject(e.config) &&
        ((r = e.config.send_type),
        (n = dl.optimizeServerUrl(e.config.server_url)));
      var i = "beacon" === r || (!r && "beacon" === pl.para.send_type);
      if (i && dl.isSupportBeaconSend()) {
        var a = n || e.server_url;
        (e.server_url = a),
          (e.data = pl.kit.encodeTrackData(e.data)),
          dl.isArray(a) && a.length
            ? dl.each(a, function (t) {
                (e.callback = null), (e.server_url = t), mi(e);
              })
            : "string" == typeof a && "" !== a
              ? mi(e)
              : pl.log(
                  "当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！",
                ),
          t.cancellationToken.stop();
      }
      return e;
    }
    function yi() {
      "beacon" !== pl.para.send_type ||
        dl.isSupportBeaconSend() ||
        (pl.para.send_type = "image");
    }
    function bi() {
      pl.on("sdkInitPara", function () {
        yi();
      }),
        pl.on("sdkAfterInitPara", function () {
          pl.registerInterceptor("sendDataStage", {
            send: { priority: 110, entry: vi },
          });
        });
    }
    function wi(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Si(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Si(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function ki(e, t, r) {
      return wi(e, t, r), (e.plugin_version = Hl), e;
    }
    function Pi(e) {
      var t = new gl.AjaxSend(e);
      t.start();
    }
    function Ci(e, t) {
      var r = null,
        n = null;
      gl.isObject(e.config) &&
        ((r = e.config.send_type),
        (n = gl.optimizeServerUrl(e.config.server_url)));
      var i = "ajax" === r || (!r && "ajax" === fl.para.send_type);
      if (i && gl.isSupportCors()) {
        var a = n || e.server_url;
        (e.server_url = a),
          (e.data = fl.kit.encodeTrackData(e.data)),
          gl.isArray(a) && a.length
            ? gl.each(a, function (t) {
                (e.callback = null), (e.server_url = t), Pi(e);
              })
            : "string" == typeof a && "" !== a
              ? Pi(e)
              : fl.log(
                  "当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！",
                ),
          t.cancellationToken.stop();
      }
      return e;
    }
    function Oi() {
      "ajax" !== fl.para.send_type ||
        gl.isSupportCors() ||
        (fl.para.send_type = "image");
    }
    function ji() {
      fl.on("sdkInitPara", function () {
        Oi();
      }),
        fl.on("sdkAfterInitPara", function () {
          fl.registerInterceptor("sendDataStage", {
            send: { priority: 120, entry: Ci },
          });
        });
    }
    function Ni(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Ii(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Ii(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Ti(e, t, r) {
      return Ni(e, t, r), (e.plugin_version = ql), e;
    }
    function Ai(e, t) {
      var r = _l.kit.encodeTrackData(t);
      return e.indexOf("?") !== -1 ? e + "&" + r : e + "?" + r;
    }
    function Di(e) {
      var t = new hl.ImageSend(e);
      t.start();
    }
    function $i(e, t) {
      var r = null;
      hl.isObject(e.config) && (r = hl.optimizeServerUrl(e.config.server_url));
      var n = r || e.server_url,
        i = e.data;
      (e.server_url = n),
        hl.isArray(n) && n.length
          ? hl.each(n, function (t) {
              t &&
                ((e.data = Ai(t, i)),
                (e.callback = null),
                (e.server_url = t),
                Di(e));
            })
          : "string" == typeof n && "" !== n
            ? ((e.data = Ai(n, i)), Di(e))
            : _l.logger &&
              _l.logger
                .msg(
                  "当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！",
                )
                .level("warn")
                .log(),
        t.cancellationToken.stop();
    }
    function xi() {
      "image" !== _l.para.send_type &&
        "ajax" !== _l.para.send_type &&
        "beacon" !== _l.para.send_type &&
        (_l.para.send_type = "image");
    }
    function Ei() {
      _l.on("sdkInitPara", function () {
        xi();
      }),
        _l.on("sdkAfterInitPara", function () {
          _l.registerInterceptor("sendDataStage", {
            send: { priority: 130, entry: $i },
          });
        });
    }
    function Li(e, t, r) {
      if ((t && (e.plugin_name = t), r && e.init)) {
        var n = e.init;
        e.init = function (i, a) {
          function o() {
            n.call(e, i, a);
          }
          return (
            Ui(i, e, t),
            (i.readyState && i.readyState.state >= 3) || !i.on
              ? o()
              : void i.on(r, o)
          );
        };
      }
      return e;
    }
    function Ui(e, t, r) {
      function n(t, n) {
        e.logger
          ? e.logger.msg
              .apply(e.logger, n)
              .module(r + "" || "")
              .level(t)
              .log()
          : e.log && e.log.apply(e, n);
      }
      (t.log = function () {
        n("log", arguments);
      }),
        (t.warn = function () {
          n("warn", arguments);
        }),
        (t.error = function () {
          n("error", arguments);
        });
    }
    function Ri(e, t, r) {
      return Li(e, t, r), (e.plugin_version = _a), e;
    }
    function Bi(e) {
      return null === zl ? void Hi(e) : void zl.push(e);
    }
    function Hi(e) {
      try {
        if ("log" === e.level && Ji()) return void Ki(e);
        if ("warn" === e.level && Mi()) return void Ki(e);
        if ("error" === e.level && qi()) return void Ki(e);
      } catch (t) {}
    }
    function Ji() {
      return (
        !!zi() ||
        Vl.para.show_log === !0 ||
        (Wl.isObject(Vl.para.show_log) && "log" === Vl.para.show_log.level)
      );
    }
    function Mi() {
      return (
        !!zi() ||
        Ji() ||
        (Wl.isObject(Vl.para.show_log) && "warn" === Vl.para.show_log.level)
      );
    }
    function qi() {
      return (
        !!zi() ||
        !Wl.isObject(Vl.para.show_log) ||
        "none" !== Vl.para.show_log.level
      );
    }
    function Ki(e) {
      var t = e.content,
        r = Wl.isObject(t[0]) ? Wl.formatJsonString(t[0]) : t[0],
        n = Fi(e);
      t[0] = n + (n.length > 0 ? ": " : "") + r;
      try {
        console &&
          (Wl.isFunction(console[e.level])
            ? console[e.level].apply(console, t)
            : Wl.isObject(console[e.level]) && console[e.level](t[0]));
      } catch (i) {}
    }
    function Fi(e) {
      var t = "",
        r = "",
        n = Vl.para.show_log;
      return (
        (Wl.isObject(n) && n.show_brand === !1) || (t += e.brand),
        (Wl.isObject(n) && n.show_level === !1) ||
          (t += (t.length > 0 ? "-" : "") + e.level),
        t.length > 0 && (t = "[" + t + "]"),
        (Wl.isObject(n) && n.show_module === !1) || (r = e.module),
        t + r
      );
    }
    function Vi() {
      Wl.sessionStorage.isSupport() && sessionStorage.setItem(Gl, "true");
    }
    function Wi() {
      Wl.sessionStorage.isSupport() && sessionStorage.removeItem(Gl);
    }
    function zi() {
      return (
        Wl.sessionStorage.isSupport() && "true" === sessionStorage.getItem(Gl)
      );
    }
    var Xi = {};
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
          else if ("json" == e)
            t = o("json-stringify") && o("date-serialization") && o("json-parse");
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
              s = '{"a":[1,true,false,null,"\\\b\\n\\f\\r\\t"]}';
            if ("json-stringify" == e) {
              var r = i.stringify,
                c = "function" == typeof r;
              c &&
                (((n = function () {
                  return 1;
                }).toJSON = n),
                a(
                  function () {
                    c =
                      "0" === r(0) &&
                      "0" === r(new l()) &&
                      '""' == r(new u()) &&
                      r(v) === h &&
                      r(h) === h &&
                      r() === h &&
                      "1" === r(n) &&
                      "[1]" == r([n]) &&
                      "[null]" == r([h]) &&
                      "null" == r(null) &&
                      "[null,null,null]" == r([h, v, null]) &&
                      r({ a: [n, !0, !1, null, "\0\b\n\f\r\t"] }) == s &&
                      "1" === r(null, n) &&
                      "[\n 1,\n 2\n]" == r([1, 2], null, 1);
                  },
                  function () {
                    c = !1;
                  },
                )),
                (t = c);
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
                  },
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
        var l = n.Number || r.Number,
          u = n.String || r.String,
          c = n.Object || r.Object,
          p = n.Date || r.Date,
          d = n.SyntaxError || r.SyntaxError,
          f = n.TypeError || r.TypeError,
          g = n.Math || r.Math,
          _ = n.JSON || r.JSON;
        if ("object" == typeof _ && _)
          return (
            (i.stringify = _.stringify),
            (i.parse = _.parse),
            (i.runInContext = e),
            i
          );
        var h,
          m = c.prototype,
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
          (o["bug-string-char-index"] =
            o["date-serialization"] =
            o.json =
            o["json-stringify"] =
            o["json-parse"] =
              null),
          !o("json"))
        ) {
          var w = "[object Function]",
            S = "[object Date]",
            k = "[object Number]",
            P = "[object String]",
            C = "[object Array]",
            O = "[object Boolean]",
            j = o("bug-string-char-index"),
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
                        i = v.call(e) == w;
                      for (r in e)
                        (i && "prototype" == r) ||
                          !y.call(e, r) ||
                          (n = "constructor" === r) ||
                          t(r);
                      (n || y.call(e, (r = "constructor"))) && t(r);
                    })
                  : ((i = [
                      "valueOf",
                      "toString",
                      "toLocaleString",
                      "propertyIsEnumerable",
                      "isPrototypeOf",
                      "hasOwnProperty",
                      "constructor",
                    ]),
                    (N = function (e, r) {
                      var n,
                        a,
                        o = v.call(e) == w,
                        s =
                          (!o &&
                            "function" != typeof e.constructor &&
                            t[typeof e.hasOwnProperty] &&
                            e.hasOwnProperty) ||
                          y;
                      for (n in e)
                        (o && "prototype" == n) || !s.call(e, n) || r(n);
                      for (a = i.length; (n = i[--a]); ) s.call(e, n) && r(n);
                    })),
                N(e, r)
              );
            };
          if (!o("json-stringify") && !o("date-serialization")) {
            var I = {
                92: "\\\\",
                34: '\\"',
                8: "\\b",
                12: "\\f",
                10: "\\n",
                13: "\\r",
                9: "\\t",
              },
              T = "000000",
              A = function (e, t) {
                return (T + (t || 0)).slice(-e);
              },
              D = function (e) {
                var t, r, n, i, a, o, s, l, u;
                if (b)
                  t = function (e) {
                    (r = e.getUTCFullYear()),
                      (n = e.getUTCMonth()),
                      (i = e.getUTCDate()),
                      (o = e.getUTCHours()),
                      (s = e.getUTCMinutes()),
                      (l = e.getUTCSeconds()),
                      (u = e.getUTCMilliseconds());
                  };
                else {
                  var c = g.floor,
                    p = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                    d = function (e, t) {
                      return (
                        p[t] +
                        365 * (e - 1970) +
                        c((e - 1969 + (t = +(t > 1))) / 4) -
                        c((e - 1901 + t) / 100) +
                        c((e - 1601 + t) / 400)
                      );
                    };
                  t = function (e) {
                    for (
                      i = c(e / 864e5), r = c(i / 365.2425) + 1970 - 1;
                      d(r + 1, 0) <= i;
                      r++
                    );
                    for (n = c((i - d(r, 0)) / 30.42); d(r, n + 1) <= i; n++);
                    (i = 1 + i - d(r, n)),
                      (a = ((e % 864e5) + 864e5) % 864e5),
                      (o = c(a / 36e5) % 24),
                      (s = c(a / 6e4) % 60),
                      (l = c(a / 1e3) % 60),
                      (u = a % 1e3);
                  };
                }
                return (D = function (e) {
                  return (
                    e > -1 / 0 && e < 1 / 0
                      ? (t(e),
                        (e =
                          (r <= 0 || r >= 1e4
                            ? (r < 0 ? "-" : "+") + A(6, r < 0 ? -r : r)
                            : A(4, r)) +
                          "-" +
                          A(2, n + 1) +
                          "-" +
                          A(2, i) +
                          "T" +
                          A(2, o) +
                          ":" +
                          A(2, s) +
                          ":" +
                          A(2, l) +
                          "." +
                          A(3, u) +
                          "Z"),
                        (r = n = i = o = s = l = u = null))
                      : (e = null),
                    e
                  );
                })(e);
              };
            if (o("json-stringify") && !o("date-serialization")) {
              var $ = i.stringify;
              i.stringify = function (e, t, r) {
                var n = p.prototype.toJSON;
                p.prototype.toJSON = s;
                var i = $(e, t, r);
                return (p.prototype.toJSON = n), i;
              };
            } else {
              var x = "\\u00",
                E = function (e) {
                  var t = e.charCodeAt(0),
                    r = I[t];
                  return r ? r : x + A(2, t.toString(16));
                },
                L = /[-"\]/g,
                U = function (e) {
                  return (
                    (L.lastIndex = 0),
                    '"' + (L.test(e) ? e.replace(L, E) : e) + '"'
                  );
                },
                R = function (e, t, r, n, i, o, s) {
                  var l, u, c, d, g, _, m, y, b;
                  if (
                    (a(function () {
                      l = t[e];
                    }),
                    "object" == typeof l &&
                      l &&
                      (l.getUTCFullYear &&
                      v.call(l) == S &&
                      l.toJSON === p.prototype.toJSON
                        ? (l = D(l))
                        : "function" == typeof l.toJSON && (l = l.toJSON(e))),
                    r && (l = r.call(t, e, l)),
                    l == h)
                  )
                    return l === h ? l : "null";
                  switch (
                    ((u = typeof l), "object" == u && (c = v.call(l)), c || u)
                  ) {
                    case "boolean":
                    case O:
                      return "" + l;
                    case "number":
                    case k:
                      return l > -1 / 0 && l < 1 / 0 ? "" + l : "null";
                    case "string":
                    case P:
                      return U("" + l);
                  }
                  if ("object" == typeof l) {
                    for (m = s.length; m--; ) if (s[m] === l) throw f();
                    if ((s.push(l), (d = []), (y = o), (o += i), c == C)) {
                      for (_ = 0, m = l.length; _ < m; _++)
                        (g = R(_, l, r, n, i, o, s)),
                          d.push(g === h ? "null" : g);
                      b = d.length
                        ? i
                          ? "[\n" + o + d.join(",\n" + o) + "\n" + y + "]"
                          : "[" + d.join(",") + "]"
                        : "[]";
                    } else
                      N(n || l, function (e) {
                        var t = R(e, l, r, n, i, o, s);
                        t !== h && d.push(U(e) + ":" + (i ? " " : "") + t);
                      }),
                        (b = d.length
                          ? i
                            ? "{\n" + o + d.join(",\n" + o) + "\n" + y + "}"
                            : "{" + d.join(",") + "}"
                          : "{}");
                    return s.pop(), b;
                  }
                };
              i.stringify = function (e, r, n) {
                var i, a, o, s;
                if (t[typeof r] && r)
                  if (((s = v.call(r)), s == w)) a = r;
                  else if (s == C) {
                    o = {};
                    for (var l, u = 0, c = r.length; u < c; )
                      (l = r[u++]),
                        (s = v.call(l)),
                        ("[object String]" != s && "[object Number]" != s) ||
                          (o[l] = 1);
                  }
                if (n)
                  if (((s = v.call(n)), s == k)) {
                    if ((n -= n % 1) > 0)
                      for (n > 10 && (n = 10), i = ""; i.length < n; ) i += " ";
                  } else s == P && (i = n.length <= 10 ? n : n.slice(0, 10));
                return R("", ((l = {}), (l[""] = e), l), a, o, i, "", []);
              };
            }
          }
          if (!o("json-parse")) {
            var B,
              H,
              J = u.fromCharCode,
              M = {
                92: "\\",
                34: '"',
                47: "/",
                98: "\b",
                116: "\t",
                110: "\n",
                102: "\f",
                114: "\r",
              },
              q = function () {
                throw ((B = H = null), d());
              },
              K = function () {
                for (var e, t, r, n, i, a = H, o = a.length; B < o; )
                  switch ((i = a.charCodeAt(B))) {
                    case 9:
                    case 10:
                    case 13:
                    case 32:
                      B++;
                      break;
                    case 123:
                    case 125:
                    case 91:
                    case 93:
                    case 58:
                    case 44:
                      return (e = j ? a.charAt(B) : a[B]), B++, e;
                    case 34:
                      for (e = "@", B++; B < o; )
                        if (((i = a.charCodeAt(B)), i < 32)) q();
                        else if (92 == i)
                          switch ((i = a.charCodeAt(++B))) {
                            case 92:
                            case 34:
                            case 47:
                            case 98:
                            case 116:
                            case 110:
                            case 102:
                            case 114:
                              (e += M[i]), B++;
                              break;
                            case 117:
                              for (t = ++B, r = B + 4; B < r; B++)
                                (i = a.charCodeAt(B)),
                                  (i >= 48 && i <= 57) ||
                                    (i >= 97 && i <= 102) ||
                                    (i >= 65 && i <= 70) ||
                                    q();
                              e += J("0x" + a.slice(t, B));
                              break;
                            default:
                              q();
                          }
                        else {
                          if (34 == i) break;
                          for (
                            i = a.charCodeAt(B), t = B;
                            i >= 32 && 92 != i && 34 != i;
  
                          )
                            i = a.charCodeAt(++B);
                          e += a.slice(t, B);
                        }
                      if (34 == a.charCodeAt(B)) return B++, e;
                      q();
                    default:
                      if (
                        ((t = B),
                        45 == i && ((n = !0), (i = a.charCodeAt(++B))),
                        i >= 48 && i <= 57)
                      ) {
                        for (
                          48 == i &&
                            ((i = a.charCodeAt(B + 1)), i >= 48 && i <= 57) &&
                            q(),
                            n = !1;
                          B < o && ((i = a.charCodeAt(B)), i >= 48 && i <= 57);
                          B++
                        );
                        if (46 == a.charCodeAt(B)) {
                          for (
                            r = ++B;
                            r < o && ((i = a.charCodeAt(r)), !(i < 48 || i > 57));
                            r++
                          );
                          r == B && q(), (B = r);
                        }
                        if (((i = a.charCodeAt(B)), 101 == i || 69 == i)) {
                          for (
                            i = a.charCodeAt(++B),
                              (43 != i && 45 != i) || B++,
                              r = B;
                            r < o && ((i = a.charCodeAt(r)), !(i < 48 || i > 57));
                            r++
                          );
                          r == B && q(), (B = r);
                        }
                        return +a.slice(t, B);
                      }
                      n && q();
                      var s = a.slice(B, B + 4);
                      if ("true" == s) return (B += 4), !0;
                      if ("fals" == s && 101 == a.charCodeAt(B + 4))
                        return (B += 5), !1;
                      if ("null" == s) return (B += 4), null;
                      q();
                  }
                return "$";
              },
              F = function (e) {
                var t, r;
                if (("$" == e && q(), "string" == typeof e)) {
                  if ("@" == (j ? e.charAt(0) : e[0])) return e.slice(1);
                  if ("[" == e) {
                    for (t = []; (e = K()), "]" != e; )
                      r
                        ? "," == e
                          ? ((e = K()), "]" == e && q())
                          : q()
                        : (r = !0),
                        "," == e && q(),
                        t.push(F(e));
                    return t;
                  }
                  if ("{" == e) {
                    for (t = {}; (e = K()), "}" != e; )
                      r
                        ? "," == e
                          ? ((e = K()), "}" == e && q())
                          : q()
                        : (r = !0),
                        ("," != e &&
                          "string" == typeof e &&
                          "@" == (j ? e.charAt(0) : e[0]) &&
                          ":" == K()) ||
                          q(),
                        (t[e.slice(1)] = F(K()));
                    return t;
                  }
                  q();
                }
                return e;
              },
              V = function (e, t, r) {
                var n = W(e, t, r);
                n === h ? delete e[t] : (e[t] = n);
              },
              W = function (e, t, r) {
                var n,
                  i = e[t];
                if ("object" == typeof i && i)
                  if (v.call(i) == C) for (n = i.length; n--; ) V(v, N, i, n, r);
                  else
                    N(i, function (e) {
                      V(i, e, r);
                    });
                return r.call(e, t, i);
              };
            i.parse = function (e, t) {
              var r, n;
              return (
                (B = 0),
                (H = "" + e),
                (r = F(K())),
                "$" != K() && q(),
                (B = H = null),
                t && v.call(t) == w ? W(((n = {}), (n[""] = r), n), "", t) : r
              );
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
              return (
                a || ((a = !0), (r.JSON = n), (r.JSON3 = i), (n = i = null)), o
              );
            },
          }),
        );
      r.JSON
        ? ((r.JSON.parse = o.parse), (r.JSON.stringify = o.stringify))
        : (r.JSON = { parse: o.parse, stringify: o.stringify });
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
          var r =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            n =
              /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
          (e.btoa = function (e) {
            e = String(e);
            for (
              var t, n, i, a, o = "", s = 0, l = e.length % 3;
              s < e.length;
  
            ) {
              if (
                (n = e.charCodeAt(s++)) > 255 ||
                (i = e.charCodeAt(s++)) > 255 ||
                (a = e.charCodeAt(s++)) > 255
              )
                return "";
              (t = (n << 16) | (i << 8) | a),
                (o +=
                  r.charAt((t >> 18) & 63) +
                  r.charAt((t >> 12) & 63) +
                  r.charAt((t >> 6) & 63) +
                  r.charAt(63 & t));
            }
            return l ? o.slice(0, l - 3) + "===".substring(l) : o;
          }),
            (e.atob = function (e) {
              if (((e = String(e).replace(/[\t\n\f\r ]+/g, "")), !n.test(e)))
                return "";
              e += "==".slice(2 - (3 & e.length));
              for (var t, i, a, o = "", s = 0; s < e.length; )
                (t =
                  (r.indexOf(e.charAt(s++)) << 18) |
                  (r.indexOf(e.charAt(s++)) << 12) |
                  ((i = r.indexOf(e.charAt(s++))) << 6) |
                  (a = r.indexOf(e.charAt(s++)))),
                  (o +=
                    64 === i
                      ? String.fromCharCode((t >> 16) & 255)
                      : 64 === a
                        ? String.fromCharCode((t >> 16) & 255, (t >> 8) & 255)
                        : String.fromCharCode(
                            (t >> 16) & 255,
                            (t >> 8) & 255,
                            255 & t,
                          ));
              return o;
            });
        }
      });
    var Zi,
      Gi = {
        setup: function (e) {
          Zi = e;
        },
        log: function () {
          (Zi || (console && console.log) || function () {}).apply(
            null,
            arguments,
          );
        },
      },
      Qi = {
        get: function (e) {
          return window.localStorage.getItem(e);
        },
        parse: function (e) {
          var t;
          try {
            t = JSON.parse(Qi.get(e)) || null;
          } catch (r) {
            Gi.log(r);
          }
          return t;
        },
        set: function (e, t) {
          try {
            window.localStorage.setItem(e, t);
          } catch (r) {
            Gi.log(r);
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
            Qi.set(t, r), Qi.get(t) !== r && (e = !1), Qi.remove(t);
          } catch (n) {
            e = !1;
          }
          return e;
        },
      },
      Yi = (function () {
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
        l = Qi.get(s),
        u = String(n());
      return l &&
        ((l = i(l) || { randomNum: 0, expireTime: 0 }), l.expireTime > t())
        ? o(null)
        : (Qi.set(s, JSON.stringify({ randomNum: u, expireTime: t() + r })),
          void setTimeout(function () {
            (l = i(Qi.get(s)) || { randomNum: 0, expireTime: 0 }),
              l && l.randomNum === u
                ? (o(Qi.get(e)), Qi.remove(e), Qi.remove(s))
                : o(null);
          }, a));
    }),
      (a.prototype.set = function (e, r, a, o, s) {
        if (!e || !r) throw new Error("key and val is must");
        (a = a || 1e4), (o = o || 1e3), (s = s || function () {});
        var l = this.lockSetPrefix + e,
          u = Qi.get(l),
          c = String(n());
        return u &&
          ((u = i(u) || { randomNum: 0, expireTime: 0 }), u.expireTime > t())
          ? s({ status: "fail", reason: "This key is locked" })
          : (Qi.set(l, JSON.stringify({ randomNum: c, expireTime: t() + a })),
            void setTimeout(function () {
              (u = i(Qi.get(l)) || { randomNum: 0, expireTime: 0 }),
                u.randomNum === c
                  ? Qi.set(e, r) && s({ status: "success" })
                  : s({ status: "fail", reason: "This key is locked" });
            }, o));
      }),
      (l.prototype.on = function (e, t) {
        if (!e || !t) return !1;
        if (!s(t)) throw new Error("listener must be a function");
        this._events[e] = this._events[e] || [];
        var r = "object" == typeof t;
        return this._events[e].push(r ? t : { listener: t, once: !1 }), this;
      }),
      (l.prototype.prepend = function (e, t) {
        if (!e || !t) return !1;
        if (!s(t)) throw new Error("listener must be a function");
        this._events[e] = this._events[e] || [];
        var r = "object" == typeof t;
        return this._events[e].unshift(r ? t : { listener: t, once: !1 }), this;
      }),
      (l.prototype.prependOnce = function (e, t) {
        return this.prepend(e, { listener: t, once: !0 });
      }),
      (l.prototype.once = function (e, t) {
        return this.on(e, { listener: t, once: !0 });
      }),
      (l.prototype.off = function (e, t) {
        var r = this._events[e];
        if (!r) return !1;
        if ("number" == typeof t) r.splice(t, 1);
        else if ("function" == typeof t)
          for (var n = 0, i = r.length; n < i; n++)
            r[n] && r[n].listener === t && r.splice(n, 1);
        return this;
      }),
      (l.prototype.emit = function (e, t) {
        var r = this._events[e];
        if (!r) return !1;
        for (var n = 0; n < r.length; n++) {
          var i = r[n];
          i && (i.listener.call(this, t || {}), i.once && this.off(e, n));
        }
        return this;
      }),
      (l.prototype.removeAllListeners = function (e) {
        e && this._events[e] ? (this._events[e] = []) : (this._events = {});
      }),
      (l.prototype.listeners = function (e) {
        return e && "string" == typeof e ? this._events[e] : this._events;
      });
    var ea = (function () {
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
            for (t = 0; t < n.length; t++)
              (r = n.charCodeAt(t)),
                i.unshift(255 & r),
                i.length >= 4 && ((a = e(a, i)), (i = []));
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
      ta = function (e) {
        this.ele = e;
      },
      ra = function (e, t) {
        for (var r = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && r.push(e);
        return r;
      };
    ta.prototype = {
      addClass: function (e) {
        var t = " " + this.ele.className + " ";
        return (
          t.indexOf(" " + e + " ") === -1 &&
            (this.ele.className =
              this.ele.className + ("" === this.ele.className ? "" : " ") + e),
          this
        );
      },
      removeClass: function (e) {
        var t = " " + this.ele.className + " ";
        return (
          t.indexOf(" " + e + " ") !== -1 &&
            (this.ele.className = t.replace(" " + e + " ", " ").slice(1, -1)),
          this
        );
      },
      hasClass: function (e) {
        var t = " " + this.ele.className + " ";
        return t.indexOf(" " + e + " ") !== -1;
      },
      attr: function (e, t) {
        return "string" == typeof e && v(t)
          ? this.ele.getAttribute(e)
          : ("string" == typeof e &&
              ((t = String(t)), this.ele.setAttribute(e, t)),
            this);
      },
      offset: function () {
        var e = this.ele.getBoundingClientRect();
        if (e.width || e.height) {
          var t = this.ele.ownerDocument,
            r = t.documentElement;
          return {
            top: e.top + window.pageYOffset - r.clientTop,
            left: e.left + window.pageXOffset - r.clientLeft,
          };
        }
        return { top: 0, left: 0 };
      },
      getSize: function () {
        if (!window.getComputedStyle)
          return { width: this.ele.offsetWidth, height: this.ele.offsetHeight };
        try {
          var e = this.ele.getBoundingClientRect();
          return { width: e.width, height: e.height };
        } catch (t) {
          return { width: 0, height: 0 };
        }
      },
      getStyle: function (e) {
        return this.ele.currentStyle
          ? this.ele.currentStyle[e]
          : this.ele.ownerDocument.defaultView
              .getComputedStyle(this.ele, null)
              .getPropertyValue(e);
      },
      wrap: function (e) {
        var t = document.createElement(e);
        return (
          this.ele.parentNode.insertBefore(t, this.ele),
          t.appendChild(this.ele),
          b(t)
        );
      },
      getCssStyle: function (e) {
        var t = this.ele.style.getPropertyValue(e);
        if (t) return t;
        var r = null;
        if (
          ("function" == typeof window.getMatchedCSSRules &&
            (r = window.getMatchedCSSRules(this.ele)),
          !r || !y(r))
        )
          return null;
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
        return ra((this.ele.parentNode || {}).firstChild, this.ele);
      },
      children: function () {
        return ra(this.ele.firstChild);
      },
      parent: function () {
        var e = this.ele.parentNode;
        return (e = e && 11 !== e.nodeType ? e : null), b(e);
      },
      previousElementSibling: function () {
        var e = this.ele;
        if ("previousElementSibling" in document.documentElement)
          return b(e.previousElementSibling);
        for (; (e = e.previousSibling); ) if (1 === e.nodeType) return b(e);
        return b(null);
      },
      getSameTypeSiblings: function () {
        for (
          var e = this.ele,
            t = e.parentNode,
            r = e.tagName.toLowerCase(),
            n = [],
            i = 0;
          i < t.children.length;
          i++
        ) {
          var a = t.children[i];
          1 === a.nodeType &&
            a.tagName.toLowerCase() === r &&
            n.push(t.children[i]);
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
    var na = {
        get: function (e) {
          for (
            var t = e + "=", r = document.cookie.split(";"), n = 0;
            n < r.length;
            n++
          ) {
            for (var i = r[n]; " " == i.charAt(0); ) i = i.substring(1, i.length);
            if (0 == i.indexOf(t)) return u(i.substring(t.length, i.length));
          }
          return null;
        },
        set: function (e, t, r, n, i, a) {
          function o(e) {
            return !!e && e.replace(/\r\n/g, "");
          }
          var s = a,
            l = "",
            u = "",
            c = "";
          if (((r = null == r ? 73e3 : r), 0 !== r)) {
            var p = new Date();
            "s" === String(r).slice(-1)
              ? p.setTime(p.getTime() + 1e3 * Number(String(r).slice(0, -1)))
              : p.setTime(p.getTime() + 24 * r * 60 * 60 * 1e3),
              (l = "; expires=" + p.toGMTString());
          }
          n && "" !== n && (c = "; SameSite=" + n), i && (u = "; secure");
          var d = "",
            f = "",
            g = "";
          e && (d = o(e)),
            t && (f = o(t)),
            s && (g = o(s)),
            d &&
              f &&
              (document.cookie =
                d + "=" + encodeURIComponent(f) + l + "; path=/" + g + c + u);
        },
        remove: function (e, t) {
          this.set(e, "1", -1, t);
        },
        isSupport: function (e, t, r, n, i) {
          function a() {
            o.set(e, t, r, n, i);
            var a = o.get(e);
            return a === t && (o.remove(e), !0);
          }
          (e = e || "cookie_support_test"), (t = t || "1");
          var o = this;
          return navigator.cookieEnabled && a();
        },
      },
      ia = Object.prototype.hasOwnProperty,
      aa = {
        isSupport: function () {
          var e = !0,
            t = "__session_storage_support__",
            r = "testIsSupportStorage";
          try {
            sessionStorage && sessionStorage.setItem
              ? (sessionStorage.setItem(t, r),
                sessionStorage.removeItem(t, r),
                (e = !0))
              : (e = !1);
          } catch (n) {
            e = !1;
          }
          return e;
        },
      },
      oa = { "+": "-", "/": "_", "=": "." },
      sa = { "-": "+", _: "/", ".": "=" },
      la = {
        encode: function (e) {
          return e.replace(/[+\/=]/g, function (e) {
            return oa[e];
          });
        },
        decode: function (e) {
          return e.replace(/[-_.]/g, function (e) {
            return sa[e];
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
      ua = {
        __proto__: null,
        noPrototypePollution: Ne,
        ConcurrentStorage: a,
        EventEmitter: l,
        URL: _,
        UUID: ea,
        addEvent: w,
        addHashEvent: S,
        ajax: O,
        base64Decode: N,
        base64Encode: I,
        bindReady: T,
        cookie: na,
        coverExtend: A,
        decodeURI: D,
        decodeURIComponent: u,
        dfmapping: $,
        each: P,
        encodeDates: L,
        extend: C,
        extend2Lev: U,
        filter: R,
        formatDate: E,
        formatJsonString: B,
        getCookieTopLevelDomain: J,
        getDomBySelector: M,
        getElementContent: q,
        getHostname: K,
        getIOSVersion: F,
        getQueryParam: V,
        getQueryParamsFromUrl: W,
        getRandom: n,
        getRandomBasic: Yi,
        getScreenOrientation: X,
        getUA: Z,
        getURL: G,
        getURLPath: Q,
        getURLSearchParams: p,
        hasAttribute: Y,
        hasAttributes: ee,
        hashCode: te,
        hashCode53: re,
        indexOf: ne,
        inherit: ie,
        isArguments: ae,
        isArray: y,
        isBoolean: oe,
        isDate: x,
        isElement: h,
        isEmptyObject: se,
        isFunction: e,
        isHttpUrl: le,
        isIOS: ue,
        isJSONString: ce,
        isNumber: pe,
        isObject: r,
        isString: d,
        isSupportBeaconSend: de,
        isSupportCors: fe,
        isUndefined: v,
        jsonp: ge,
        listenPageState: _e,
        loadScript: he,
        localStorage: Qi,
        logger: Gi,
        map: j,
        mediaQueriesSupported: z,
        now: t,
        removeScriptProtocol: me,
        rot13defs: ye,
        rot13obfs: ve,
        ry: b,
        safeJSONParse: i,
        searchObjDate: be,
        sessionStorage: aa,
        setCssStyle: we,
        strToUnicode: Se,
        throttle: ke,
        toArray: Ce,
        trim: f,
        unique: Oe,
        urlParse: g,
        urlSafeBase64: la,
        values: Pe,
        xhr: k,
        startsWith: je,
      },
      ca = [],
      pa = {
        appendWriter: function (e) {
          ca.push(e);
        },
        msg: function () {
          var e = { module: "", level: "log", brand: "web-sdk", content: null };
          e.content = Array.prototype.slice.call(arguments);
          var t = {
            module: function (t) {
              return d(t) && (e.module = t), this;
            },
            level: function (t) {
              return d(t) && (e.level = t), this;
            },
            brand: function (t) {
              return d(t) && (e.brand = t), this;
            },
            log: function () {
              if (e.content && e.content.length)
                for (var t = 0; t < ca.length; t++)
                  if ("function" == typeof ca[t])
                    try {
                      ca[t].call(null, e);
                    } catch (r) {}
              return this;
            },
          };
          return t;
        },
      },
      da = {},
      fa = {
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
        source_channel: [],
        sdk_id: "",
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
      };
    (fa.white_list = {}),
      (fa.white_list[location.host] = _(location.href).hostname);
    var ga = "utm_source utm_medium utm_campaign utm_content utm_term",
      _a = "1.26.15",
      ha = "sensorsdata_domain_test",
      ma = {
        EMAIL: "$identity_email",
        MOBILE: "$identity_mobile",
        LOGIN: "$identity_login_id",
      },
      va = {
        get: function (e) {
          return na.get(e);
        },
        set: function (e, t, r, n) {
          var i = "";
          if ((n = v(n) ? da.cross_subdomain : n)) {
            var a = De(location.href);
            "url解析失败" === a && (a = ""),
              (i = a ? "; domain=" + a : "");
          }
          return na.set(e, t, r, da.set_cookie_samesite, da.is_secure_cookie, i);
        },
        remove: function (e, t) {
          return (t = v(t) ? da.cross_subdomain : t), na.remove(e, t);
        },
        isSupport: function (e, t) {
          return (
            (e = e || "sajssdk_2015_cookie_access_test"),
            (t = t || "1"),
            na.isSupport(e, t, 0, null, da.is_secure_cookie)
          );
        },
      };
    va.getNewUser = xe;
    var ya = {
        data: {},
        get: function (e) {
          var t = this.data[e];
          return void 0 === t
            ? null
            : void 0 !== t._expirationTimestamp_
              ? new Date().getTime() > t._expirationTimestamp_
                ? null
                : t.value
              : t;
        },
        set: function (e, t, r) {
          if (r) {
            var n,
              i = new Date();
            (n =
              "s" === String(r).slice(-1)
                ? i.getTime() + 1e3 * Number(String(r).slice(0, -1))
                : i.getTime() + 24 * r * 60 * 60 * 1e3),
              (t = { value: t, _expirationTimestamp_: n });
          }
          this.data[e] = t;
        },
        getNewUserFlagMemoryKey: function (e) {
          return "sajssdk_2015_" + da.sdk_id + e;
        },
      },
      ba = {
        checkIsAddSign: function (e) {
          "track" === e.type &&
            (xe()
              ? (e.properties.$is_first_day = !0)
              : (e.properties.$is_first_day = !1));
        },
        is_first_visit_time: !1,
        is_page_first_visited: !1,
        checkIsFirstTime: function (e) {
          "track" === e.type &&
            "$pageview" === e.event &&
            (this.is_first_visit_time
              ? ((e.properties.$is_first_time = !0),
                (this.is_first_visit_time = !1))
              : (e.properties.$is_first_time = !1));
        },
        setDeviceId: function () {},
        storeInitCheck: function () {
          if (Xi.is_first_visitor) {
            var e = new Date(),
              t = {
                h: 23 - e.getHours(),
                m: 59 - e.getMinutes(),
                s: 59 - e.getSeconds(),
              };
            va.isSupport()
              ? va.set($e("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s")
              : ya.set(
                  ya.getNewUserFlagMemoryKey("new_user"),
                  "1",
                  3600 * t.h + 60 * t.m + t.s + "s",
                ),
              (this.is_first_visit_time = !0),
              (this.is_page_first_visited = !0);
          } else
            xe() ||
              (this.checkIsAddSign = function (e) {
                "track" === e.type && (e.properties.$is_first_day = !1);
              }),
              (this.checkIsFirstTime = function (e) {
                "track" === e.type &&
                  "$pageview" === e.event &&
                  (e.properties.$is_first_time = !1);
              });
        },
      },
      wa = function () {
        (this._events = []), (this.pendingEvents = []);
      };
    wa.prototype = {
      emit: function (e) {
        var t = [].slice.call(arguments, 1);
        P(this._events, function (r) {
          r.type === e && r.callback.apply(r.context, t);
        }),
          this.pendingEvents.push({ type: e, data: t }),
          this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
      },
      on: function (t, r, n, i) {
        e(r) &&
          (this._events.push({ type: t, callback: r, context: n || this }),
          (i = i !== !1),
          this.pendingEvents.length > 0 &&
            i &&
            P(this.pendingEvents, function (e) {
              e.type === t && r.apply(n, e.data);
            }));
      },
      tempAdd: function (e, t) {
        if (t && e) return this.emit(e, t);
      },
      isReady: function () {},
    };
    var Sa = {
        data: {},
        id: function () {
          return this.data.id
            ? this.data.id
            : ((this.data.id = Re()), this.data.id);
        },
        type: function () {
          return this.data.type
            ? this.data.type
            : ((this.data.type = Ue()), this.data.type);
        },
      },
      ka = {
        distinct_id: function () {},
        jssdkDebug: function () {},
        _sendDebug: function (e) {},
        apph5: function (e) {
          var t = "app_h5打通失败-",
            n = {
              1: t + "use_app_track为false",
              2:
                t +
                "Android或者iOS，没有暴露相应方法",
              3.1: t + "Android校验server_url失败",
              3.2: t + "iOS校验server_url失败",
              4.1: t + "H5 校验 iOS server_url 失败",
              4.2: t + "H5 校验 Android server_url 失败",
            },
            i = e.output,
            a = e.step,
            o = e.data || "";
          ("all" !== i && "console" !== i) || Ie(n[a]),
            ("all" === i || "code" === i) &&
              r(da.is_debug) &&
              da.is_debug.apph5 &&
              ((o.type && "profile" === o.type.slice(0, 7)) ||
                (o.properties._jssdk_debug_info = "apph5-" + String(a)));
        },
        defineMode: function (e) {
          var t = {
            1: {
              title:
                "当前页面无法进行可视化全埋点",
              message:
                "App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。",
              link_text: "",
              link_url: "",
            },
            2: {
              title:
                "当前页面无法进行可视化全埋点",
              message:
                "App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。",
              link_text: "",
              link_url: "",
            },
            3: {
              title:
                "当前页面无法进行可视化全埋点",
              message:
                "Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。",
              link_text: "",
              link_url: "",
            },
            4: {
              title:
                "当前页面无法进行可视化全埋点",
              message:
                "Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。",
              link_text: "",
              link_url: "",
            },
          };
          return !(!e || !t[e]) && t[e];
        },
        protocol: {
          protocolIsSame: function (e, t) {
            try {
              if (_(e).protocol !== _(t).protocol) return !1;
            } catch (r) {
              return Te("不支持 _.URL 方法"), !1;
            }
            return !0;
          },
          serverUrl: function () {
            d(da.server_url) &&
              "" !== da.server_url &&
              !this.protocolIsSame(da.server_url, location.href) &&
              Te(
                "SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。",
              );
          },
          ajax: function (e) {
            return (
              e !== da.server_url &&
              void (
                d(e) &&
                "" !== e &&
                !this.protocolIsSame(e, location.href) &&
                Te(
                  "SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。因为 http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。",
                )
              )
            );
          },
        },
      },
      Pa = {
        initPage: function () {
          var e = Be(),
            t = G(),
            r = De(t);
          r || ka.jssdkDebug("url_domain异常_" + t + "_" + r),
            (this.pageProp = {
              referrer: e,
              referrer_host: e ? K(e) : "",
              url: t,
              url_host: K(t, "url_host取值异常"),
              url_domain: r,
            });
        },
        pageProp: {},
        campaignParams: function () {
          return Xi.kit.getUtmData();
        },
        campaignParamsStandard: function (e, t) {
          (e = e || ""), (t = t || "");
          var r = Pa.campaignParams(),
            n = {},
            i = {};
          return (
            P(r, function (r, a, o) {
              (" " + ga + " ").indexOf(" " + a + " ") !== -1
                ? (n[e + a] = o[a])
                : (i[t + a] = o[a]);
            }),
            { $utms: n, otherUtms: i }
          );
        },
        properties: function () {
          var e =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              (document.body && document.body.clientHeight) ||
              0,
            t =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              (document.body && document.body.clientWidth) ||
              0,
            r = {
              $timezone_offset: new Date().getTimezoneOffset(),
              $screen_height: Number(screen.height) || 0,
              $screen_width: Number(screen.width) || 0,
              $viewport_height: e,
              $viewport_width: t,
              $lib: "js",
              $lib_version: _a,
            };
          return r;
        },
        currentProps: {},
        register: function (e) {
          C(Pa.currentProps, e);
        },
      },
      Ca = {},
      Oa = new l();
    (Ca.spa = Oa),
      (Ca.sdk = new l()),
      (Ca.data = new l()),
      (Ca.initSystemEvent = function () {
        rt(function (e) {
          Oa.emit("switch", e);
        });
      }),
      (Ca.EVENT_LIST = {
        spaSwitch: ["spa", "switch"],
        sdkBeforeInit: ["sdk", "beforeInit"],
        sdkInitPara: ["sdk", "initPara"],
        sdkAfterInitPara: ["sdk", "afterInitPara"],
        sdkInitAPI: ["sdk", "initAPI"],
        sdkAfterInitAPI: ["sdk", "afterInitAPI"],
        sdkAfterInit: ["sdk", "afterInit"],
        sdkReady: ["sdk", "ready"],
        dataSendSuccess: ["data", "sendSuccess"],
        dataSendFail: ["data", "sendFail"],
      });
    var ja = function (e) {
      (this.callback = e.callback),
        (this.server_url = e.server_url),
        (this.data = e.data),
        (this.origin_data = e.origin_data);
    };
    (ja.prototype.start = function () {
      var e = this,
        t = new Date();
      Ye({
        url: this.server_url,
        type: "POST",
        data: e.data,
        credentials: !1,
        timeout: da.datasend_timeout,
        cors: !0,
        success: function (r, n) {
          Ca.data.emit("sendSuccess", {
            status: String(n),
            resText: r,
            type: "ajax_single",
            timeout_config: da.datasend_timeout,
            request_timeout: new Date() - t,
            data: e.origin_data,
          }),
            e.end();
        },
        error: function (r, n) {
          Ca.data.emit("sendFail", {
            status: String(n),
            resText: r,
            type: "ajax_single",
            timeout_config: da.datasend_timeout,
            request_timeout: new Date() - t,
            data: e.origin_data,
          }),
            e.end();
        },
      });
    }),
      (ja.prototype.end = function () {
        if (this.callback) {
          if ((Ie("warning: sdk callback is deprecated."), !e(this.callback)))
            return void Ie("error: sdk callback must be function.");
          this.callback();
        }
      });
    var Na = "sawebjssdk-",
      Ia = "tab-sawebjssdk-";
    it.prototype = {
      batchInterval: function () {
        "" === this.serverUrl && this.getServerUrl(),
          this.hasTabStorage ||
            (this.generateTabStorage(), (this.hasTabStorage = !0));
        var e = this;
        e.timer = setTimeout(function () {
          e.updateExpireTime(),
            e.recycle(),
            e.send(),
            clearTimeout(e.timer),
            e.batchInterval();
        }, da.batch_send.send_interval);
      },
      getServerUrl: function () {
        return (d(da.server_url) && "" !== da.server_url) ||
          (y(da.server_url) && da.server_url.length)
          ? void (this.serverUrl = y(da.server_url)
              ? da.server_url[0]
              : da.server_url)
          : Ae(
              "当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！",
            );
      },
      send: function () {
        if (
          this.sendTimeStamp &&
          t() - this.sendTimeStamp < da.batch_send.send_interval
        )
          return !1;
        var e = Qi.get(this.tabKey);
        if (e) {
          (this.sendTimeStamp = t()), (e = i(e) || this.generateTabStorageVal());
          var r = Oe(e.data);
          if (r.length) {
            for (var n = [], a = 0; a < r.length; a++) {
              var o = Xi.store.readObjectVal(r[a]);
              o && ((o._flush_time = new Date().getTime()), n.push(o));
            }
            n.length && this.request(n, e.data);
          }
        }
      },
      updateExpireTime: function () {
        var e = Qi.get(this.tabKey);
        e &&
          ((e = i(e) || this.generateTabStorageVal()),
          (e.expireTime = t() + 2 * da.batch_send.send_interval),
          (e.serverUrl = this.serverUrl),
          Qi.set(this.tabKey, JSON.stringify(e)));
      },
      request: function (e, t) {
        var r = this,
          n = new Date();
        Ye({
          url: this.serverUrl,
          type: "POST",
          data: "data_list=" + encodeURIComponent(I(JSON.stringify(e))),
          credentials: !1,
          timeout: da.batch_send.datasend_timeout,
          cors: !0,
          success: function (i, a) {
            Ca.data.emit("sendSuccess", {
              status: String(a),
              resText: i,
              type: "ajax_batch",
              timeout_config: da.batch_send.datasend_timeout,
              request_timeout: new Date() - n,
              data: e,
            }),
              r.remove(t),
              (r.sendTimeStamp = 0);
          },
          error: function (t, i) {
            Ca.data.emit("sendFail", {
              status: String(i),
              resText: t,
              type: "ajax_batch",
              timeout_config: da.batch_send.datasend_timeout,
              request_timeout: new Date() - n,
              data: e,
            }),
              (r.sendTimeStamp = 0);
          },
        });
      },
      remove: function (e) {
        var t = Qi.get(this.tabKey);
        if (t) {
          for (
            var r = (i(t) || this.generateTabStorageVal()).data, n = 0;
            n < e.length;
            n++
          ) {
            var a = ne(r, e[n]);
            a > -1 && r.splice(a, 1), Qi.remove(e[n]);
          }
          (r = Oe(r)),
            Qi.set(this.tabKey, JSON.stringify(this.generateTabStorageVal(r)));
        }
      },
      add: function (e) {
        var r = Na + String(n()),
          a = Qi.get(this.tabKey);
        null === a
          ? ((this.tabKey = Ia + String(n())), (a = this.generateTabStorageVal()))
          : (a = i(a) || this.generateTabStorageVal()),
          a.data.push(r),
          (a.expireTime = t() + 2 * da.batch_send.send_interval),
          Qi.set(this.tabKey, JSON.stringify(a)),
          Xi.store.saveObjectVal(r, e),
          ("track_signup" !== e.type && "$pageview" !== e.event) ||
            this.sendImmediately();
      },
      generateTabStorage: function () {
        (this.tabKey = Ia + String(n())),
          Qi.set(this.tabKey, JSON.stringify(this.generateTabStorageVal()));
      },
      generateTabStorageVal: function (e) {
        return (
          (e = e || []),
          {
            data: e,
            expireTime: t() + 2 * da.batch_send.send_interval,
            serverUrl: this.serverUrl,
          }
        );
      },
      sendImmediately: function () {
        this.send();
      },
      recycle: function () {
        for (
          var e = {}, r = 1e4, n = "sajssdk-lock-get-", o = 0;
          o < localStorage.length;
          o++
        ) {
          var s = localStorage.key(o),
            l = this;
          if (0 === s.indexOf(Ia)) {
            for (
              var u = i(Qi.get(s)) || this.generateTabStorageVal(), c = 0;
              c < u.data.length;
              c++
            )
              e[u.data[c]] = !0;
            if (
              s !== l.tabKey &&
              t() > u.expireTime &&
              this.serverUrl === u.serverUrl
            ) {
              var p = new a(n);
              p.get(s, r, 1e3, function (e) {
                if (e) {
                  null === Qi.get(l.tabKey) && l.generateTabStorage();
                  var t = i(e) || l.generateTabStorageVal(),
                    r = i(Qi.get(l.tabKey)) || l.generateTabStorageVal();
                  (r.data = Oe(r.data.concat(t.data))),
                    Qi.set(l.tabKey, JSON.stringify(r));
                }
              });
            }
          } else if (0 === s.indexOf(n)) {
            var d = i(Qi.get(s)) || { expireTime: 0 };
            t() - d.expireTime > r && Qi.remove(s);
          }
        }
        for (var f = 0; f < localStorage.length; f++) {
          var g = localStorage.key(f);
          0 !== g.indexOf(Na) || e[g] || Qi.remove(g);
        }
      },
    };
    var Ta = function (e) {
      (this.callback = e.callback),
        (this.server_url = e.server_url),
        (this.data = e.data);
    };
    (Ta.prototype.start = function () {
      var e = this;
      "object" == typeof navigator &&
        "function" == typeof navigator.sendBeacon &&
        navigator.sendBeacon(this.server_url, this.data),
        setTimeout(function () {
          e.end();
        }, 40);
    }),
      (Ta.prototype.end = function () {
        if (this.callback) {
          if ((Ie("warning: sdk callback is deprecated."), !e(this.callback)))
            return void Ie("error: sdk callback must be function.");
          this.callback();
        }
      });
    var Aa = function (e) {
      (this.callback = e.callback),
        (this.img = document.createElement("img")),
        (this.img.width = 1),
        (this.img.height = 1),
        da.img_use_crossorigin && (this.img.crossOrigin = "anonymous"),
        (this.server_url = e.data);
    };
    (Aa.prototype.start = function () {
      var e = this;
      da.ignore_oom &&
        ((this.img.onload = function () {
          (this.onload = null),
            (this.onerror = null),
            (this.onabort = null),
            e.end();
        }),
        (this.img.onerror = function () {
          (this.onload = null),
            (this.onerror = null),
            (this.onabort = null),
            e.end();
        }),
        (this.img.onabort = function () {
          (this.onload = null),
            (this.onerror = null),
            (this.onabort = null),
            e.end();
        })),
        (this.img.src = this.server_url);
    }),
      (Aa.prototype.lastClear = function () {
        var e = Z();
        void 0 !== e.ie ? (this.img.src = "about:blank") : (this.img.src = "");
      }),
      (Aa.prototype.end = function () {
        if (this.callback) {
          if ((Ie("warning: sdk callback is deprecated."), !e(this.callback)))
            return void Ie("error: sdk callback must be function.");
          this.callback();
        }
        self.lastClear && self.lastClear();
      });
    var Da = {
        __proto__: null,
        addEvent: Ee,
        EventEmitterSa: wa,
        cookie: va,
        info: Pa,
        getReferrer: Be,
        getCurrentDomain: De,
        isBaiduTraffic: Le,
        getReferrerEqid: Re,
        getReferrerEqidType: Ue,
        getBaiduKeyword: Sa,
        isReferralTraffic: He,
        getKeywordFromReferrer: Je,
        getReferSearchEngine: Me,
        getSourceFromReferrer: qe,
        getWxAdIdFromUrl: Ke,
        parseSuperProperties: Fe,
        searchConfigData: Ve,
        strip_empty_properties: We,
        getEleInfo: Ze,
        getElementContent: Qe,
        ajax: Ye,
        optimizeServerUrl: et,
        encodeTrackData: tt,
        AjaxSend: ja,
        BatchSend: it,
        BeaconSend: Ta,
        ImageSend: Aa,
      },
      $a = new wa(),
      xa = {
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
          return (
            r && n
              ? ((t.login_id = n), (t.anonymous_id = r))
              : (t.anonymous_id = n),
            t
          );
        },
        getIdentities: function () {
          var e = JSON.parse(JSON.stringify(this._state.identities));
          return (e.$identity_anonymous_id = this.getAnonymousId()), e;
        },
        getAnonymousId: function () {
          return (
            xa._state._first_id ||
            xa._state.first_id ||
            xa._state._distinct_id ||
            xa._state.distinct_id
          );
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
              this._state.history_login_id.name !== ma.LOGIN &&
              (t.login_id = this._state.history_login_id.name + "+" + t.login_id),
            t
          );
        },
        getFirstId: function () {
          return this._state._first_id || this._state.first_id;
        },
        initSessionState: function () {
          var e = va.get("sensorsdata2015session");
          e = Xi.kit.userDecryptIfNeeded(e);
          var t = null;
          null !== e &&
            "object" == typeof (t = i(e)) &&
            (this._sessionState = t || {});
        },
        setOnce: function (e, t) {
          e in this._state || this.set(e, t);
        },
        set: function (e, t) {
          this._state = this._state || {};
          var r = this._state.distinct_id;
          (this._state[e] = t),
            "first_id" === e
              ? delete this._state._first_id
              : "distinct_id" === e && delete this._state._distinct_id,
            this.save(),
            "distinct_id" === e && r && $a.tempAdd("changeDistinctId", t);
        },
        change: function (e, t) {
          this._state["_" + e] = t;
        },
        setSessionProps: function (e) {
          Xi.log(
            "initSessionState 方法已经弃用，请不要使用该功能，如有需求联系技术顾问",
          );
          var t = this._sessionState;
          C(t, e), this.sessionSave(t);
        },
        setSessionPropsOnce: function (e) {
          Xi.log(
            "initSessionState 方法已经弃用，请不要使用该功能，如有需求联系技术顾问",
          );
          var t = this._sessionState;
          A(t, e), this.sessionSave(t);
        },
        setProps: function (e, t) {
          var r = {};
          r = t ? e : C(this._state.props || {}, e);
          for (var n in r)
            "string" == typeof r[n] &&
              (r[n] = r[n].slice(0, Xi.para.max_referrer_string_length));
          this.set("props", r);
        },
        setPropsOnce: function (e) {
          var t = this._state.props || {};
          A(t, e), this.set("props", t);
        },
        clearAllProps: function (e) {
          this._sessionState = {};
          var t;
          if (y(e) && e.length > 0)
            for (t = 0; t < e.length; t++)
              d(e[t]) &&
                e[t].indexOf("latest_") === -1 &&
                r(this._state.props) &&
                e[t] in this._state.props &&
                delete this._state.props[e[t]];
          else if (r(this._state.props))
            for (t in this._state.props)
              1 !== t.indexOf("latest_") && delete this._state.props[t];
          this.sessionSave({}), this.save();
        },
        sessionSave: function (e) {
          Xi.log(
            "initSessionState 方法已经弃用，请不要使用该功能，如有需求联系技术顾问",
          ),
            (this._sessionState = e);
          var t = JSON.stringify(this._sessionState);
          Xi.para.encrypt_cookie && (t = Xi.kit.userEncrypt(t)),
            va.set("sensorsdata2015session", t, 0);
        },
        save: function () {
          var e = JSON.parse(JSON.stringify(this._state));
          delete e._first_id,
            delete e._distinct_id,
            e.identities && (e.identities = I(JSON.stringify(e.identities)));
          var t = JSON.stringify(e);
          Xi.para.encrypt_cookie && (t = Xi.kit.userEncrypt(t)),
            va.set(this.getCookieName(), t, 360, Xi.para.cross_subdomain);
        },
        getCookieName: function () {
          var e = "";
          if (Xi.para.cross_subdomain === !1) {
            try {
              var t = location.host;
              v(Xi.para.white_list[t]) || (e = Xi.para.white_list[t]);
            } catch (r) {
              Te(r);
            }
            e =
              "string" == typeof e && "" !== e
                ? "sa_jssdk_2015_" + Xi.para.sdk_id + e.replace(/\./g, "_")
                : "sa_jssdk_2015_root" + Xi.para.sdk_id;
          } else e = "sensorsdata2015jssdkcross" + Xi.para.sdk_id;
          return e;
        },
        init: function () {
          function e(e) {
            var t;
            e.identities &&
              (0 === e.identities.indexOf("\n/")
                ? (e.identities = i(ye(e.identities)))
                : (e.identities = i(N(e.identities))));
            var n = xa.getOriginUnionId(e);
            (e.identities && r(e.identities) && !se(e.identities)) ||
              ((e.identities = {}), (e.identities.$identity_cookie_id = ea())),
              (e.history_login_id = e.history_login_id || {});
            var a = e.history_login_id,
              o = a.name;
            if (n.login_id)
              if (o && e.identities.hasOwnProperty(o)) {
                if (e.identities[o] !== n.login_id) {
                  e.identities[o] = n.login_id;
                  for (t in e.identities)
                    e.identities.hasOwnProperty(t) &&
                      "$identity_cookie_id" !== t &&
                      t !== o &&
                      delete e.identities[t];
                  e.history_login_id.value = n.login_id;
                }
              } else {
                var s = o || ma.LOGIN;
                e.identities[s] = n.login_id;
                for (t in e.identities)
                  e.identities.hasOwnProperty(t) &&
                    "$identity_cookie_id" !== t &&
                    t !== s &&
                    delete e.identities[t];
                e.history_login_id = { name: s, value: n.login_id };
              }
            else {
              if (
                e.identities.hasOwnProperty("$identity_login_id") ||
                e.identities.hasOwnProperty(o)
              )
                for (t in e.identities)
                  e.identities.hasOwnProperty(t) &&
                    "$identity_cookie_id" !== t &&
                    "$identity_anonymous_id" !== t &&
                    delete e.identities[t];
              e.history_login_id = { name: "", value: "" };
            }
            return e;
          }
          function t(e) {
            xa.set("distinct_id", e),
              xa.set("identities", { $identity_cookie_id: e }),
              xa.set("history_login_id", { name: "", value: "" });
          }
          this.initSessionState();
          var n,
            a,
            o = ea();
          va.isSupport() &&
            ((n = va.get(this.getCookieName())),
            (n = Xi.kit.userDecryptIfNeeded(n)),
            (a = i(n))),
            va.isSupport() &&
            null !== n &&
            ce(n) &&
            r(a) &&
            (!r(a) || a.distinct_id)
              ? ((xa._state = C(e(a))), xa.save())
              : ((Xi.is_first_visitor = !0), t(o)),
            ba.setDeviceId(o, this),
            ba.storeInitCheck();
        },
        saveObjectVal: function (e, t) {
          d(t) || (t = JSON.stringify(t)),
            1 == Xi.para.encrypt_cookie && (t = Xi.kit.userEncrypt(t)),
            Qi.set(e, t);
        },
        readObjectVal: function (e) {
          var t = Qi.get(e);
          return t ? ((t = Xi.kit.userDecryptIfNeeded(t)), i(t)) : null;
        },
      },
      Ea = {
        string: function (e) {
          Te(e + " must be string");
        },
        emptyString: function (e) {
          Te(e + "'s is empty");
        },
        regexTest: function (e) {
          Te(e + " is invalid");
        },
        idLength: function (e) {
          Te(e + " length is longer than " + da.max_id_length);
        },
        keyLength: function (e) {
          Te(e + " length is longer than " + da.max_key_length);
        },
        stringLength: function (e) {
          Te(e + " length is longer than " + da.max_string_length);
        },
        voidZero: function (e) {
          Te(e + "'s is undefined");
        },
        reservedLoginId: function (e) {
          Te(e + " is invalid");
        },
        reservedBind: function (e) {
          Te(e + " is invalid");
        },
        reservedUnbind: function (e) {
          Te(e + " is invalid");
        },
      },
      La = {
        regName:
          /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_tag.*|^user_group.*)[a-zA-Z_$][a-zA-Z\d_$]*)$/i,
        loginIDReservedNames: ["$identity_anonymous_id", "$identity_cookie_id"],
        bindReservedNames: [
          "$identity_login_id",
          "$identity_anonymous_id",
          "$identity_cookie_id",
        ],
        unbindReservedNames: ["$identity_anonymous_id", ma.LOGIN],
        string: function (e) {
          return !!d(e);
        },
        emptyString: function (e) {
          return !(!d(e) || 0 === f(e).length);
        },
        regexTest: function (e) {
          return !(!d(e) || !this.regName.test(e));
        },
        idLength: function (e) {
          return !(!d(e) || e.length > da.max_id_length);
        },
        keyLength: function (e) {
          return !(!d(e) || e.length > da.max_key_length);
        },
        stringLength: function (e) {
          return !(!d(e) || e.length > da.max_string_length);
        },
        voidZero: function (e) {
          return void 0 !== e;
        },
        reservedLoginId: function (e) {
          return !(ne(this.loginIDReservedNames, e) > -1);
        },
        reservedUnbind: function (e) {
          return !(ne(this.unbindReservedNames, e) > -1);
        },
        reservedBind: function (e) {
          var t = xa._state.history_login_id;
          return !(
            (t && t.name && t.name === e) ||
            ne(this.bindReservedNames, e) > -1
          );
        },
      },
      Ua = {
        distinct_id: {
          rules: ["string", "emptyString", "idLength"],
          onComplete: function (t, r, n) {
            return (
              (!t &&
                ("emptyString" === n && (r = "Id"),
                e(Ea[n]) && Ea[n](r),
                "idLength" === n)) ||
              t
            );
          },
        },
        event: {
          rules: ["string", "emptyString", "keyLength", "regexTest"],
          onComplete: function (t, r, n) {
            return (
              t ||
                ("emptyString" === n && (r = "eventName"), e(Ea[n]) && Ea[n](r)),
              !0
            );
          },
        },
        propertyKey: {
          rules: ["string", "emptyString", "keyLength", "regexTest"],
          onComplete: function (t, r, n) {
            return (
              t ||
                ("emptyString" === n && (r = "Property key"),
                e(Ea[n]) && Ea[n](r)),
              !0
            );
          },
        },
        propertyValue: {
          rules: ["voidZero"],
          onComplete: function (t, r, n) {
            return t || ((r = "Property Value"), e(Ea[n]) && Ea[n](r)), !0;
          },
        },
        properties: function (t) {
          return (
            r(t)
              ? P(t, function (t, r) {
                  at({ propertyKey: r });
                  var n = function (t, n, i) {
                    return t || ((n = r + "'s Value"), e(Ea[i]) && Ea[i](n)), !0;
                  };
                  at({ propertyValue: t }, n);
                })
              : La.voidZero(t) &&
                Te(
                  "properties可以没有，但有的话必须是对象",
                ),
            !0
          );
        },
        propertiesMust: function (e) {
          return (
            void 0 !== e && r(e) && !se(e)
              ? this.properties.call(this, e)
              : Te("properties必须是对象"),
            !0
          );
        },
        item_type: {
          rules: ["string", "emptyString", "keyLength", "regexTest"],
          onComplete: function (t, r, n) {
            return (
              t ||
                ("emptyString" === n && (r = "item_type"), e(Ea[n]) && Ea[n](r)),
              !0
            );
          },
        },
        item_id: {
          rules: ["string", "emptyString", "stringLength"],
          onComplete: function (t, r, n) {
            return (
              t || ("emptyString" === n && (r = "item_id"), e(Ea[n]) && Ea[n](r)),
              !0
            );
          },
        },
        loginIdKey: {
          rules: [
            "string",
            "emptyString",
            "keyLength",
            "regexTest",
            "reservedLoginId",
          ],
          onComplete: function (t, r, n) {
            return (
              (!t &&
                ("emptyString" === n && (r = "login_id_key"),
                e(Ea[n]) && Ea[n](r),
                "keyLength" === n)) ||
              t
            );
          },
        },
        bindKey: {
          rules: [
            "string",
            "emptyString",
            "keyLength",
            "regexTest",
            "reservedBind",
          ],
          onComplete: function (t, r, n) {
            return (
              (!t &&
                ("emptyString" === n && (r = "Key"),
                e(Ea[n]) && Ea[n](r),
                "keyLength" === n)) ||
              t
            );
          },
        },
        unbindKey: {
          rules: [
            "string",
            "emptyString",
            "keyLength",
            "regexTest",
            "reservedUnbind",
          ],
          onComplete: function (t, r, n) {
            return (
              (!t &&
                ("emptyString" === n && (r = "Key"),
                e(Ea[n]) && Ea[n](r),
                "keyLength" === n)) ||
              t
            );
          },
        },
        bindValue: {
          rules: ["string", "emptyString", "idLength"],
          onComplete: function (t, r, n) {
            return (
              (!t &&
                ("emptyString" === n && (r = "Value"),
                e(Ea[n]) && Ea[n](r),
                "idLength" === n)) ||
              t
            );
          },
        },
        check: function (t, r, n) {
          var i = this[t];
          if (e(i)) return i.call(this, r);
          if (!i) return !1;
          for (var a = 0; a < i.rules.length; a++) {
            var o = i.rules[a],
              s = La[o](r),
              l = e(n) ? n(s, r, o) : i.onComplete(s, r, o);
            if (!s) return l;
          }
          return !0;
        },
      },
      Ra = {};
    (Ra.initUrl = function () {
      var e,
        t = {
          server_url: { project: "", host: "" },
          page_url: { host: "", pathname: "" },
        };
      if (!le(Xi.para.server_url))
        return (
          Ae(
            "----vcollect---server_url必须为有效 URL 字符串",
          ),
          !1
        );
      try {
        (e = _(Xi.para.server_url)),
          (t.server_url.project = e.searchParams.get("project") || "default"),
          (t.server_url.host = e.host);
      } catch (r) {
        return Ae("----vcollect---server_url解析异常", r), !1;
      }
      var n;
      try {
        (n = _(location.href)),
          (t.page_url.host = n.hostname),
          (t.page_url.pathname = n.pathname);
      } catch (r) {
        return (
          Ae(
            "----vcollect---页面地址解析异常",
            r,
          ),
          !1
        );
      }
      return t;
    }),
      (Ra.isDiv = function (e) {
        if (e.element_path) {
          var t = e.element_path.split(">"),
            r = f(t.pop());
          if ("div" !== r.slice(0, 3)) return !1;
        }
        return !0;
      }),
      (Ra.configIsMatchNew = function (e, t) {
        if (d(e.$element_selector) && d(t.element_selector)) {
          if ("element_selector" === t.element_field && "equal" === t["function"])
            return e.$element_selector === t.element_selector;
          if (
            "element_selector" === t.element_field &&
            "contain" === t["function"]
          )
            return e.$element_selector.indexOf(t.element_selector) > -1;
        }
        if (d(e.$element_path) && d(t.element_path)) {
          if ("element_path" === t.element_field && "equal" === t["function"])
            return e.$element_path === t.element_path;
          if ("element_path" === t.element_field && "contain" === t["function"])
            return e.$element_path.indexOf(t.element_path) > -1;
        }
        return !1;
      }),
      (Ra.configIsMatch = function (e, t) {
        return (
          (!t.limit_element_content ||
            t.element_content === e.$element_content) &&
          (!t.limit_element_position ||
            t.element_position === String(e.$element_position)) &&
          (t.element_field && t["function"]
            ? Ra.configIsMatchNew(e, t)
            : Ra.configIsMatchOldVersion(e, t))
        );
      }),
      (Ra.configIsMatchOldVersion = function (e, t) {
        if (!t.element_path) return !1;
        if (void 0 !== e.$element_position) {
          if (t.element_path !== e.$element_path) return !1;
        } else if (Ra.isDiv({ element_path: t.element_path })) {
          if (e.$element_path.indexOf(t.element_path) < 0) return !1;
        } else if (t.element_path !== e.$element_path) return !1;
        return !0;
      }),
      (Ra.filterConfig = function (e, t, n) {
        var i = [];
        if (!n) {
          var a = Ra.initUrl();
          if (!a) return [];
          n = a.page_url;
        }
        return (
          "$WebClick" === e.event &&
            P(t, function (t) {
              r(t) &&
                ("webclick" === t.event_type || "appclick" === t.event_type) &&
                r(t.event) &&
                t.event.url_host === n.host &&
                t.event.url_path === n.pathname &&
                Ra.configIsMatch(e.properties, t.event) &&
                i.push(t);
            }),
          i
        );
      }),
      (Ra.getPropElInLi = function (e, t) {
        if (!(e && h(e) && d(t))) return null;
        if ("li" !== e.tagName.toLowerCase()) return null;
        var r,
          n = Xi.heatmap.getDomSelector(e);
        if (n) {
          r = n + t;
          var i = M(r);
          return i ? i : null;
        }
        return (
          Te(
            "----custom---获取同级属性元素失败，selector信息异常",
            n,
            t,
          ),
          null
        );
      }),
      (Ra.getProp = function (e, t) {
        if (!r(e)) return !1;
        if (!(d(e.name) && e.name.length > 0))
          return (
            Te(
              "----vcustom----属性名不合法,属性抛弃",
              e.name,
            ),
            !1
          );
        var n,
          i,
          a = {};
        if ("content" === e.method) {
          var o;
          if (d(e.element_selector) && e.element_selector.length > 0)
            o = M(e.element_selector);
          else {
            if (!t || !d(e.list_selector))
              return (
                Te(
                  "----vcustom----属性配置异常，属性抛弃",
                  e.name,
                ),
                !1
              );
            var s = M(t.properties.$element_selector);
            if (!s)
              return (
                Te(
                  "----vcustom----点击元素获取异常，属性抛弃",
                  e.name,
                ),
                !1
              );
            var l = Xi.heatmap.getClosestLi(s);
            o = Ra.getPropElInLi(l, e.list_selector);
          }
          if (!o || !h(o))
            return (
              Te(
                "----vcustom----属性元素获取失败，属性抛弃",
                e.name,
              ),
              !1
            );
          if ("input" === o.tagName.toLowerCase()) n = o.value || "";
          else if ("select" === o.tagName.toLowerCase()) {
            var u = o.selectedIndex;
            pe(u) && h(o[u]) && (n = Qe(o[u], "select"));
          } else n = Qe(o, o.tagName.toLowerCase());
          if (e.regular) {
            try {
              i = new RegExp(e.regular).exec(n);
            } catch (c) {
              return (
                Te(
                  "----vcustom----正则处理失败，属性抛弃",
                  e.name,
                ),
                !1
              );
            }
            if (null === i)
              return (
                Te(
                  "----vcustom----属性规则处理，未匹配到结果,属性抛弃",
                  e.name,
                ),
                !1
              );
            if (!y(i) || !d(i[0]))
              return (
                Te(
                  "----vcustom----正则处理异常，属性抛弃",
                  e.name,
                  i,
                ),
                !1
              );
            n = i[0];
          }
          if ("STRING" === e.type) a[e.name] = n;
          else if ("NUMBER" === e.type) {
            if (n.length < 1)
              return (
                Te(
                  "----vcustom----未获取到数字内容，属性抛弃",
                  e.name,
                  n,
                ),
                !1
              );
            if (isNaN(Number(n)))
              return (
                Te(
                  "----vcustom----数字类型属性转换失败，属性抛弃",
                  e.name,
                  n,
                ),
                !1
              );
            a[e.name] = Number(n);
          }
          return a;
        }
        return (
          Ae(
            "----vcustom----属性不支持此获取方式",
            e.name,
            e.method,
          ),
          !1
        );
      }),
      (Ra.getAssignConfigs = function (e, t) {
        var n = Ra.initUrl();
        if (!n || !n.page_url) return [];
        if (!r(t)) return [];
        var i = [];
        return (
          (t.events = t.events || t.eventList),
          y(t.events) && t.events.length > 0
            ? (P(t.events, function (t) {
                r(t) &&
                  r(t.event) &&
                  t.event.url_host === n.page_url.host &&
                  t.event.url_path === n.page_url.pathname &&
                  e(t) &&
                  i.push(t);
              }),
              i)
            : []
        );
      });
    var Ba = {
        events: [],
        getAssignConfigs: Ra.getAssignConfigs,
        filterConfig: Ra.filterConfig,
        getProp: Ra.getProp,
        initUrl: Ra.initUrl,
        updateEvents: function (e) {
          y(e) && (this.events = e);
        },
        init: function () {
          this.initAppGetPropsBridge();
        },
        geth5Props: function (e) {
          var t = {},
            n = [],
            i = this;
          if (!this.events.length) return {};
          if ("$WebClick" === e.event) {
            var a = this.filterConfig(e, this.events);
            if (!a.length) return {};
            P(a, function (a) {
              r(a) &&
                (y(a.properties) &&
                  a.properties.length > 0 &&
                  P(a.properties, function (n) {
                    if (r(n))
                      if (n.h5 === !1)
                        y(t.sensorsdata_app_visual_properties) ||
                          (t.sensorsdata_app_visual_properties = []),
                          t.sensorsdata_app_visual_properties.push(n);
                      else {
                        var a = i.getProp(n, e);
                        r(a) && (t = C(t, a));
                      }
                  }),
                d(a.event_name) && n.push(a.event_name));
            }),
              Xi.bridge.hasVisualModeBridge() &&
                (t.sensorsdata_web_visual_eventName = n);
          }
          return (
            t.sensorsdata_app_visual_properties &&
              (t.sensorsdata_app_visual_properties = I(
                JSON.stringify(t.sensorsdata_app_visual_properties),
              )),
            t
          );
        },
        initAppGetPropsBridge: function () {
          var e = this,
            t = new Xi.SDKJSBridge("getJSVisualProperties");
          return (
            t.onAppNotify(function (n) {
              var i = {};
              try {
                n = JSON.parse(N(n));
              } catch (a) {
                Ae("getJSVisualProperties data parse error!");
              }
              if (r(n)) {
                var o = n.sensorsdata_js_visual_properties,
                  s = e.initUrl();
                s &&
                  ((s = s.page_url),
                  y(o) &&
                    o.length > 0 &&
                    P(o, function (t) {
                      if (
                        r(t) &&
                        t.url_host === s.host &&
                        t.url_path === s.pathname &&
                        t.h5
                      ) {
                        var n = e.getProp(t);
                        r(n) && (i = C(i, n));
                      }
                    }));
              }
              var l = Xi.bridge.bridge_info.platform;
              return "android" === l && t.notifyApp({ data: i }, n.message_id), i;
            }),
            t
          );
        },
      },
      Ha = {
        events: [],
        customProp: Ba,
        getAssignConfigs: Ra.getAssignConfigs,
        initUrl: Ra.initUrl,
        init: function () {
          if (this.initUrl()) {
            var e = this.getConfigFromApp();
            e && this.updateConfigs(e),
              this.customProp.init(),
              this.initAppUpdateConfigBridge();
          }
        },
        initAppUpdateConfigBridge: function () {
          var e = this;
          return new Xi.SDKJSBridge("updateH5VisualConfig").onAppNotify(
            function (t) {
              if (t) {
                try {
                  t = JSON.parse(N(t));
                } catch (r) {
                  return void Ae("updateH5VisualConfig result parse error！");
                }
                e.updateConfigs(t);
              }
            },
          );
        },
        getConfigFromApp: function () {
          var e = new Xi.SDKJSBridge(
            "sensorsdata_get_app_visual_config",
          ).notifyApp();
          if (e)
            try {
              e = JSON.parse(N(e));
            } catch (t) {
              (e = null), Ae("getAppVisualConfig result parse error！");
            }
          return e;
        },
        updateConfigs: function (e) {
          (this.events = this.filterConfigs(e)),
            this.customProp.updateEvents(this.events);
        },
        filterConfigs: function (e) {
          return this.getAssignConfigs(function (e) {
            return !(!r(e) || e.h5 === !1);
          }, e);
        },
      },
      Ja = {
        events: [],
        init: function (e) {
          this.filterWebClickEvents(e);
        },
        filterWebClickEvents: function (e) {
          this.events = qa.getAssignConfigs(function (e) {
            return !(
              !r(e) ||
              e.event.unlimited_div !== !0 ||
              "webclick" !== e.event_type
            );
          }, e);
        },
        isTargetEle: function (e) {
          var t = Xi.heatmap.getEleDetail(e);
          if (!r(t) || !d(t.$element_path)) return !1;
          for (var n = 0; n < this.events.length; n++)
            if (
              r(this.events[n]) &&
              r(this.events[n].event) &&
              qa.configIsMatch(t, this.events[n].event)
            )
              return !0;
          return !1;
        },
      },
      Ma = {
        events: [],
        configSwitch: !1,
        collectAble: function () {
          return (
            this.configSwitch &&
            r(Xi.para.heatmap) &&
            Xi.para.heatmap.get_vtrack_config
          );
        },
        updateEvents: function (e) {
          (this.events = qa.getAssignConfigs(function (e) {
            return !!(r(e) && y(e.properties) && e.properties.length > 0);
          }, e)),
            this.events.length
              ? (this.configSwitch = !0)
              : (this.configSwitch = !1);
        },
        getVtrackProps: function (e) {
          var t = {};
          return this.collectAble()
            ? ("$WebClick" === e.event &&
                (t = this.clickCustomPropMaker(e, this.events)),
              t)
            : {};
        },
        clickCustomPropMaker: function (e, t, n) {
          var i = this;
          n = n || this.filterConfig(e, t, qa.url_info.page_url);
          var a = {};
          return n.length
            ? (P(n, function (t) {
                y(t.properties) &&
                  t.properties.length > 0 &&
                  P(t.properties, function (t) {
                    var n = i.getProp(t, e);
                    r(n) && C(a, n);
                  });
              }),
              a)
            : {};
        },
        getProp: Ra.getProp,
        getPropElInLi: Ra.getPropElInLi,
        filterConfig: Ra.filterConfig,
      },
      qa = {
        unlimitedDiv: Ja,
        config: {},
        storageEnable: !0,
        storage_name: "webjssdkvtrackcollect",
        para: { session_time: 18e5, timeout: 5e3, update_interval: 18e5 },
        url_info: {},
        timer: null,
        update_time: null,
        customProp: Ma,
        initUrl: function () {
          var e = Ra.initUrl();
          if (e) {
            var t;
            try {
              (t = new g(Xi.para.server_url)),
                (t._values.Path = "/config/visualized/Web.conf"),
                (e.api_url = t.getUrl());
            } catch (r) {
              return (
                Ae(
                  "----vtrackcollect---API地址解析异常",
                  r,
                ),
                !1
              );
            }
            this.url_info = e;
          }
          return e;
        },
        init: function () {
          if (!r(Xi.para.heatmap) || !Xi.para.heatmap.get_vtrack_config)
            return !1;
          if ((Qi.isSupport() || (this.storageEnable = !1), !this.initUrl()))
            return (
              Ae(
                "----vtrackcustom----初始化失败，url信息解析失败",
              ),
              !1
            );
          if (this.storageEnable) {
            var e = xa.readObjectVal(this.storage_name);
            if (r(e) && r(e.data))
              if (this.serverUrlIsSame(e.serverUrl)) {
                (this.config = e.data),
                  (this.update_time = e.updateTime),
                  this.updateConfig(e.data);
                var t = new Date().getTime(),
                  n = t - this.update_time;
                if (pe(n) && n > 0 && n < this.para.session_time) {
                  var i = this.para.update_interval - n;
                  this.setNextFetch(i);
                } else this.getConfigFromServer();
              } else this.getConfigFromServer();
            else this.getConfigFromServer();
          } else this.getConfigFromServer();
          this.pageStateListenner();
        },
        serverUrlIsSame: function (e) {
          return (
            !!r(e) &&
            e.host === this.url_info.server_url.host &&
            e.project === this.url_info.server_url.project
          );
        },
        getConfigFromServer: function () {
          var e = this,
            t = function (t, n) {
              e.update_time = new Date().getTime();
              var i = {};
              200 === t
                ? n && r(n) && "Web" === n.os && ((i = n), e.updateConfig(i))
                : 205 === t
                  ? e.updateConfig(i)
                  : 304 === t
                    ? (i = e.config)
                    : (Ae("----vtrackcustom----数据异常", t),
                      e.updateConfig(i)),
                e.updateStorage(i),
                e.setNextFetch();
            },
            n = function (t) {
              (e.update_time = new Date().getTime()),
                Ae("----vtrackcustom----配置拉取失败", t),
                e.setNextFetch();
            };
          this.sendRequest(t, n);
        },
        setNextFetch: function (e) {
          var t = this;
          this.timer && (clearTimeout(this.timer), (this.timer = null)),
            (e = e || this.para.update_interval),
            (this.timer = setTimeout(function () {
              t.getConfigFromServer();
            }, e));
        },
        pageStateListenner: function () {
          var e = this;
          _e({
            visible: function () {
              var t = new Date().getTime(),
                r = t - e.update_time;
              if (pe(r) && r > 0 && r < e.para.update_interval) {
                var n = e.para.update_interval - r;
                e.setNextFetch(n);
              } else e.getConfigFromServer();
            },
            hidden: function () {
              e.timer && (clearTimeout(e.timer), (e.timer = null));
            },
          });
        },
        updateConfig: function (e) {
          return (
            !!r(e) &&
            ((this.config = e),
            this.customProp.updateEvents(e),
            void this.unlimitedDiv.init(e))
          );
        },
        updateStorage: function (e) {
          if (!this.storageEnable) return !1;
          if (!r(e)) return !1;
          var t;
          if (this.url_info.server_url) t = this.url_info.server_url;
          else {
            var n = qa.initUrl();
            if (!n) return !1;
            t = n.server_url;
          }
          var i = { updateTime: new Date().getTime(), data: e, serverUrl: t };
          xa.saveObjectVal(this.storage_name, i);
        },
        sendRequest: function (e, t) {
          var r = this,
            n = { app_id: this.url_info.page_url.host };
          this.config.version && (n.v = this.config.version),
            ge({
              url: r.url_info.api_url,
              callbackName: "saJSSDKVtrackCollectConfig",
              data: n,
              timeout: r.para.timeout,
              success: function (t, r) {
                e(t, r);
              },
              error: function (e) {
                t(e);
              },
            });
        },
        getAssignConfigs: Ra.getAssignConfigs,
        configIsMatch: Ra.configIsMatch,
      },
      Ka = {
        basicProps: { priority: 0, entry: _t },
        formatData: { priority: 0, entry: ft },
        finalAdjustData: { priority: 0, entry: gt },
      },
      Fa = {
        stage: null,
        init: function (e) {
          this.stage = e;
        },
        interceptor: Ka,
      },
      Va = {};
    (Va.check = at),
      (Va.sendItem = function (e) {
        var t = {
          lib: {
            $lib: "js",
            $lib_method: "code",
            $lib_version: String(Xi.lib_version),
          },
          time: 1 * new Date(),
        };
        C(t, e), mt(t), Xi.kit.sendData(t);
      }),
      (Va.send = function (e, t) {
        var r = Xi.kit.buildData(e);
        Xi.kit.sendData(r, t);
      });
    var Wa = {
        stage: null,
        init: function (e) {
          this.stage = e;
        },
      },
      za = { label: !1, li: !1, a: !0, button: !0 },
      Xa = {
        otherTags: [],
        initUnlimitedTags: function () {
          P(Xa.otherTags, function (e) {
            e in za && (za[e] = !0);
          });
        },
        isUnlimitedTag: function (e) {
          if (!e || 1 !== e.nodeType) return !1;
          var t = e.nodeName.toLowerCase();
          return za[t] || ee(e, Xi.para.heatmap.track_attr);
        },
        getTargetElement: function (e, t) {
          var r = this,
            n = e;
          if ("object" != typeof n) return null;
          if ("string" != typeof n.tagName) return null;
          var i = n.tagName.toLowerCase();
          if ("body" === i.toLowerCase() || "html" === i.toLowerCase())
            return null;
          if (!n || !n.parentNode || !n.parentNode.children) return null;
          var a = n.parentNode,
            o = r.otherTags;
          if ("a" === i || "button" === i || "input" === i || "textarea" === i)
            return n;
          if (ne(o, i) > -1) return n;
          if (
            "area" === i &&
            "map" === a.tagName.toLowerCase() &&
            b(a).prev().tagName &&
            "img" === b(a).prev().tagName.toLowerCase()
          )
            return b(a).prev();
          if (
            "div" === i &&
            Xi.para.heatmap.collect_tags.div &&
            r.isDivLevelValid(n)
          ) {
            var s =
              (Xi.para.heatmap &&
                Xi.para.heatmap.collect_tags &&
                Xi.para.heatmap.collect_tags.div &&
                Xi.para.heatmap.collect_tags.div.max_level) ||
              1;
            if (s > 1 || r.isCollectableDiv(n)) return n;
          }
          if (r.isStyleTag(i) && Xi.para.heatmap.collect_tags.div) {
            var l = r.getCollectableParent(n);
            if (l && r.isDivLevelValid(l)) return l;
          }
          var u = r.hasElement(
            { event: (t && t.originalEvent) || t, element: e },
            function (e) {
              return r.isUnlimitedTag(e);
            },
          );
          return u || null;
        },
        getDivLevels: function (e, t) {
          var r = Xa.getElementPath(e, !0, t),
            n = r.split(" > "),
            i = 0;
          return (
            P(n, function (e) {
              "div" === e && i++;
            }),
            i
          );
        },
        isDivLevelValid: function (e) {
          for (
            var t =
                (Xi.para.heatmap &&
                  Xi.para.heatmap.collect_tags &&
                  Xi.para.heatmap.collect_tags.div &&
                  Xi.para.heatmap.collect_tags.div.max_level) ||
                1,
              r = e.getElementsByTagName("div"),
              n = r.length - 1;
            n >= 0;
            n--
          )
            if (Xa.getDivLevels(r[n], e) > t) return !1;
          return !0;
        },
        getElementPath: function (e, t, r) {
          for (var n = []; e.parentNode && h(e); ) {
            if (!d(e.tagName)) return "unknown";
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
            for (; e && e !== document && 1 === e.nodeType; e = e.parentNode)
              if (e.tagName && d(e.tagName) && e.tagName.toLowerCase() === t)
                return e;
            return null;
          };
          return t(e, "li");
        },
        getElementPosition: function (e, t, r) {
          function n(e) {
            var t = e.parentNode;
            if (!t) return "";
            var r = b(e).getSameTypeSiblings(),
              n = r.length;
            if (1 === n) return 0;
            for (
              var i = 0, a = e;
              b(a).previousElementSibling().ele;
              a = b(a).previousElementSibling().ele, i++
            );
            return i;
          }
          var i = Xi.heatmap.getClosestLi(e);
          if (!i || !h(e) || !d(e.tagName)) return null;
          var a = e.tagName.toLowerCase(),
            o = i.getElementsByTagName(a),
            s = o.length,
            l = [];
          if (s > 1) {
            for (var u = 0; u < s; u++) {
              var c = Xi.heatmap.getElementPath(o[u], r);
              c === t && l.push(o[u]);
            }
            if (l.length > 1) return ne(l, e);
          }
          return n(i);
        },
        setNotice: function (e) {
          (Xi.is_heatmap_render_mode = !0),
            Xi.para.heatmap ||
              (Xi.errorMsg =
                "您SDK没有配置开启点击图，可能没有数据！"),
            e &&
              "http:" === e.slice(0, 5) &&
              "https:" === location.protocol &&
              (Xi.errorMsg =
                "您的当前页面是https的地址，神策分析环境也必须是https！"),
            Xi.para.heatmap_url ||
              (Xi.para.heatmap_url =
                yt() +
                "//static.sensorsdata.cn/sdk/" +
                Xi.lib_version +
                "/heatmap.min.js");
        },
        getDomIndex: function (e) {
          if (!e.parentNode) return -1;
          for (
            var t = 0, r = e.tagName, n = e.parentNode.children, i = 0;
            i < n.length;
            i++
          )
            if (n[i].tagName === r) {
              if (e === n[i]) return t;
              t++;
            }
          return -1;
        },
        selector: function (e, t) {
          if (!e || !h(e) || !d(e.tagName)) return "";
          var r =
            e.parentNode && 9 == e.parentNode.nodeType ? -1 : this.getDomIndex(e);
          return e.getAttribute &&
            e.getAttribute("id") &&
            /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) &&
            (!Xi.para.heatmap ||
              (Xi.para.heatmap &&
                "not_use_id" !== Xi.para.heatmap.element_selector)) &&
            !t
            ? "#" + e.getAttribute("id")
            : e.tagName.toLowerCase() +
                (~r ? ":nth-of-type(" + (r + 1) + ")" : "");
        },
        getDomSelector: function (e, t, r) {
          if (!(e && e.parentNode && e.parentNode.children && d(e.tagName)))
            return "unknown";
          t = t && t.join ? t : [];
          var n = e.nodeName.toLowerCase();
          return e && "body" !== n && 1 == e.nodeType
            ? (t.unshift(this.selector(e, r)),
              e.getAttribute &&
              e.getAttribute("id") &&
              /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) &&
              Xi.para.heatmap &&
              "not_use_id" !== Xi.para.heatmap.element_selector &&
              !r
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
            (e =
              (o.documentElement && o.documentElement.scrollTop) ||
              m.pageYOffset),
              (e = isNaN(e) ? 0 : e);
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
            r = Ze({ target: e });
          (r.$element_selector = t ? t : ""),
            (r.$element_path = Xi.heatmap.getElementPath(
              e,
              Xi.para.heatmap &&
                "not_use_id" === Xi.para.heatmap.element_selector,
            ));
          var n = Xi.heatmap.getElementPosition(
            e,
            r.$element_path,
            Xi.para.heatmap && "not_use_id" === Xi.para.heatmap.element_selector,
          );
          return pe(n) && (r.$element_position = n), r;
        },
        getPointerEventProp: function (e, t) {
          function r() {
            var e =
                document.body.scrollLeft ||
                document.documentElement.scrollLeft ||
                0,
              t =
                document.body.scrollTop ||
                document.documentElement.scrollTop ||
                0;
            return { scrollLeft: e, scrollTop: t };
          }
          function n(e) {
            if (document.documentElement.getBoundingClientRect) {
              var t = e.getBoundingClientRect();
              return {
                targetEleX: t.left + r().scrollLeft || 0,
                targetEleY: t.top + r().scrollTop || 0,
              };
            }
          }
          function i(e) {
            return Number(Number(e).toFixed(3));
          }
          function a(e) {
            var a =
                e.pageX ||
                e.clientX + r().scrollLeft ||
                e.offsetX + n(t).targetEleX ||
                0,
              o =
                e.pageY ||
                e.clientY + r().scrollTop ||
                e.offsetY + n(t).targetEleY ||
                0;
            return { $page_x: i(a), $page_y: i(o) };
          }
          return e ? a(e) : {};
        },
        start: function (t, n, i, a, o) {
          if (
            r(Xi.para.heatmap) &&
            e(Xi.para.heatmap.collect_element) &&
            !Xi.para.heatmap.collect_element(n)
          )
            return !1;
          var s = Xa.getBasicEleInfo(t, n, i, a, o);
          bt(s);
        },
        getBasicEleInfo: function (t, n, i, a, o) {
          var s = r(a) ? a : {},
            l = e(o) ? o : e(a) ? a : void 0,
            u = this.getEleDetail(n);
          if (Xi.para.heatmap && Xi.para.heatmap.custom_property) {
            var c = Xi.para.heatmap.custom_property(n);
            r(c) && (u = C(u, c));
          }
          return (
            (u = C(u, this.getPointerEventProp(t, n), s)),
            { event: t, target: n, props: u, tagName: i, callback: l }
          );
        },
        hasElement: function (e, t) {
          var r;
          if (e.event) {
            var n = e.event;
            r = n.path || (n._getPath && n._getPath());
          } else e.element && (r = b(e.element).getParents());
          if (r && y(r) && r.length > 0)
            for (var i = 0; i < r.length; i++)
              if ("object" == typeof r[i] && 1 === r[i].nodeType && t(r[i]))
                return r[i];
        },
        isStyleTag: function (e, t) {
          var n = ["a", "div", "input", "button", "textarea"],
            i = [
              "mark",
              "/mark",
              "strong",
              "b",
              "em",
              "i",
              "u",
              "abbr",
              "ins",
              "del",
              "s",
              "sup",
            ];
          return (
            !(ne(n, e) > -1) &&
            (!t ||
            (Xi.para.heatmap &&
              Xi.para.heatmap.collect_tags &&
              Xi.para.heatmap.collect_tags.div)
              ? !!(
                  r(Xi.para.heatmap) &&
                  r(Xi.para.heatmap.collect_tags) &&
                  r(Xi.para.heatmap.collect_tags.div) &&
                  y(Xi.para.heatmap.collect_tags.div.ignore_tags) &&
                  ne(Xi.para.heatmap.collect_tags.div.ignore_tags, e) > -1
                )
              : ne(i, e) > -1)
          );
        },
        isCollectableDiv: function (e, t) {
          try {
            if (0 === e.children.length) return !0;
            for (var r = 0; r < e.children.length; r++)
              if (1 === e.children[r].nodeType) {
                var n = d(e.children[r].tagName)
                    ? e.children[r].tagName.toLowerCase()
                    : "unknown",
                  i =
                    Xi.para &&
                    Xi.para.heatmap &&
                    Xi.para.heatmap.collect_tags &&
                    Xi.para.heatmap.collect_tags.div &&
                    Xi.para.heatmap.collect_tags.div.max_level;
                if (!(("div" === n && i > 1) || this.isStyleTag(n, t))) return !1;
                if (!this.isCollectableDiv(e.children[r], t)) return !1;
              }
            return !0;
          } catch (a) {
            Ae("isCollectableDiv:" + a);
          }
          return !1;
        },
        getCollectableParent: function (e, t) {
          try {
            var r = e.parentNode,
              n = r ? r.tagName.toLowerCase() : "";
            if ("body" === n) return !1;
            var i =
              Xi.para &&
              Xi.para.heatmap &&
              Xi.para.heatmap.collect_tags &&
              Xi.para.heatmap.collect_tags.div &&
              Xi.para.heatmap.collect_tags.div.max_level;
            if (n && "div" === n && (i > 1 || this.isCollectableDiv(r, t)))
              return r;
            if (r && this.isStyleTag(n, t))
              return this.getCollectableParent(r, t);
          } catch (a) {
            Ae("getCollectableParent:" + a);
          }
          return !1;
        },
        listenUrlChange: function (e) {
          e(),
            Xi.ee.spa.on("switch", function () {
              e();
            });
        },
        initScrollmap: function () {
          if (
            !r(Xi.para.heatmap) ||
            "default" !== Xi.para.heatmap.scroll_notice_map
          )
            return !1;
          var t = !0;
          Xi.para.scrollmap &&
            e(Xi.para.scrollmap.collect_url) &&
            this.listenUrlChange(function () {
              t = !!Xi.para.scrollmap.collect_url();
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
                    ((r.$viewport_position =
                      (document.documentElement &&
                        document.documentElement.scrollTop) ||
                      window.pageYOffset ||
                      document.body.scrollTop ||
                      0),
                    (r.$viewport_position =
                      Math.round(r.$viewport_position) || 0),
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
                var r =
                    (document.documentElement &&
                      document.documentElement.scrollTop) ||
                    window.pageYOffset ||
                    document.body.scrollTop ||
                    0,
                  n = new Date(),
                  i = n - this.current_time;
                ((i > Xi.para.heatmap.scroll_delay_time &&
                  r - e.$viewport_position !== 0) ||
                  t) &&
                  ((e.$url = G()),
                  (e.$title = document.title),
                  (e.$url_path = Q()),
                  (e.event_duration = Math.min(
                    Xi.para.heatmap.scroll_event_duration,
                    parseInt(i) / 1e3,
                  )),
                  (e.event_duration =
                    e.event_duration < 0 ? 0 : e.event_duration),
                  wt(e)),
                  (this.current_time = n);
              },
            });
          (i.current_time = new Date()),
            Ee(window, "scroll", function () {
              return !!t && void i.go();
            }),
            Ee(window, "beforeunload", function () {
              return !!t && void i.go("notime");
            });
        },
        initHeatmap: function () {
          var t = this,
            n = !0;
          return (
            !(!r(Xi.para.heatmap) || "default" !== Xi.para.heatmap.clickmap) &&
            (e(Xi.para.heatmap.collect_url) &&
              this.listenUrlChange(function () {
                n = !!Xi.para.heatmap.collect_url();
              }),
            "all" === Xi.para.heatmap.collect_elements
              ? (Xi.para.heatmap.collect_elements = "all")
              : (Xi.para.heatmap.collect_elements = "interact"),
            void ("all" === Xi.para.heatmap.collect_elements
              ? Ee(document, "click", function (e) {
                  if (!n) return !1;
                  var r = e || window.event;
                  if (!r) return !1;
                  var i = r.target || r.srcElement;
                  if ("object" != typeof i) return !1;
                  if ("string" != typeof i.tagName) return !1;
                  var a = i.tagName.toLowerCase();
                  if ("body" === a || "html" === a) return !1;
                  if (!i || !i.parentNode || !i.parentNode.children) return !1;
                  var o = d(i.parentNode.tagName)
                    ? i.parentNode.tagName.toLowerCase()
                    : "unknown";
                  "a" === o || "button" === o
                    ? t.start(r, i.parentNode, o)
                    : t.start(r, i, a);
                })
              : Ee(document, "click", function (e) {
                  if (!n) return !1;
                  var i = e || window.event;
                  if (!i) return !1;
                  var a = i.target || i.srcElement,
                    o = Xi.heatmap.getTargetElement(a, e);
                  return (
                    !(!h(o) && !d(a.tagName)) &&
                    void (h(o) && d(o.tagName)
                      ? t.start(i, o, o.tagName.toLowerCase())
                      : h(a) &&
                        "div" === a.tagName.toLowerCase() &&
                        r(Xi.para.heatmap) &&
                        Xi.para.heatmap.get_vtrack_config &&
                        Ja.events.length > 0 &&
                        Ja.isTargetEle(a) &&
                        t.start(i, a, a.tagName.toLowerCase(), {
                          $lib_method: "vtrack",
                        }))
                  );
                })))
          );
        },
      },
      Za = {
        autoTrackIsUsed: !1,
        isReady: function (t) {
          return e(t)
            ? void t()
            : void Xi.log("error: isReady callback must be function");
        },
        getUtm: function () {
          return Pa.campaignParams();
        },
        getStayTime: function () {
          return (new Date() - Xi._t) / 1e3;
        },
        setProfileLocal: function (e) {
          if (!Qi.isSupport()) return Xi.setProfile(e), !1;
          if (!r(e) || se(e)) return !1;
          var t = xa.readObjectVal("sensorsdata_2015_jssdk_profile"),
            n = !1;
          if (r(t) && !se(t)) {
            for (var i in e)
              (!(i in t && t[i] !== e[i]) && i in t) || ((t[i] = e[i]), (n = !0));
            n &&
              (xa.saveObjectVal("sensorsdata_2015_jssdk_profile", t),
              Xi.setProfile(e));
          } else
            xa.saveObjectVal("sensorsdata_2015_jssdk_profile", e),
              Xi.setProfile(e);
        },
        setInitReferrer: function () {
          var e = Be();
          Xi.setOnceProfile({
            _init_referrer: e,
            _init_referrer_host: Pa.pageProp.referrer_host,
          });
        },
        setSessionReferrer: function () {
          var e = Be();
          xa.setSessionPropsOnce({
            _session_referrer: e,
            _session_referrer_host: Pa.pageProp.referrer_host,
          });
        },
        setDefaultAttr: function () {
          Pa.register({
            _current_url: location.href,
            _referrer: Be(),
            _referring_host: Pa.pageProp.referrer_host,
          });
        },
        trackHeatMap: function (e, t, r) {
          if ("object" == typeof e && e.tagName && h(e.parentNode)) {
            var n = e.tagName.toLowerCase(),
              i = e.parentNode.tagName.toLowerCase(),
              a =
                Xi.para.heatmap && Xi.para.heatmap.track_attr
                  ? Xi.para.heatmap.track_attr
                  : ["data-sensors-click"];
            "button" === n ||
              "a" === n ||
              "a" === i ||
              "button" === i ||
              "input" === n ||
              "textarea" === n ||
              ee(e, a) ||
              Xa.start(null, e, n, t, r);
          }
        },
        trackAllHeatMap: function (e, t, r) {
          if ("object" == typeof e && e.tagName) {
            var n = e.tagName.toLowerCase();
            Xa.start(null, e, n, t, r);
          }
        },
        autoTrackSinglePage: function (e, t) {
          function n(e, t) {
            Xi.track(
              "$pageview",
              C(
                {
                  $referrer: i,
                  $url: G(),
                  $url_path: Q(),
                  $title: document.title,
                },
                e,
                St(),
              ),
              t,
            ),
              (i = G());
          }
          var i;
          (i = this.autoTrackIsUsed ? Pa.pageProp.url : Pa.pageProp.referrer),
            (e = r(e) ? e : {});
          var a = !e.not_set_profile;
          e.not_set_profile && delete e.not_set_profile,
            n(e, t),
            (this.autoTrackSinglePage = n),
            kt(Xi.setOnceProfile, !1, a);
        },
        autoTrackWithoutProfile: function (e, t) {
          (e = r(e) ? e : {}), this.autoTrack(C(e, { not_set_profile: !0 }), t);
        },
        autoTrack: function (e, t) {
          e = r(e) ? e : {};
          var n = St(),
            i = !e.not_set_profile;
          e.not_set_profile && delete e.not_set_profile;
          var a = location.href;
          Xi.para.is_single_page &&
            S(function () {
              var r = Be(a, !0);
              Xi.track(
                "$pageview",
                C(
                  {
                    $referrer: r,
                    $url: G(),
                    $url_path: Q(),
                    $title: document.title,
                  },
                  n,
                  e,
                ),
                t,
              ),
                (a = G());
            }),
            Xi.track(
              "$pageview",
              C(
                {
                  $referrer: Be(null, !0),
                  $url: G(),
                  $url_path: Q(),
                  $title: document.title,
                },
                n,
                e,
              ),
              t,
            ),
            kt(Xi.setOnceProfile, !0, i),
            (this.autoTrackIsUsed = !0);
        },
        getAnonymousID: function () {
          return se(xa._state) ? "SDK is not initialized." : xa.getAnonymousId();
        },
        setPlugin: function (t) {
          return (
            !!r(t) &&
            void P(t, function (t, n) {
              e(t) &&
                (r(window.SensorsDataWebJSSDKPlugin) &&
                window.SensorsDataWebJSSDKPlugin[n]
                  ? t(window.SensorsDataWebJSSDKPlugin[n])
                  : r(Xi.modules) && Xi.modules[n]
                    ? t(Xi.modules[n])
                    : Te(n + "is not found,please check sensorsdata documents."));
            })
          );
        },
        useModulePlugin: function () {
          Xi.use.apply(Xi, arguments);
        },
        useAppPlugin: function () {
          this.setPlugin.apply(this, arguments);
        },
      },
      Ga = {
        state: 0,
        historyState: [],
        stateType: {
          1: "1-init未开始",
          2: "2-init开始",
          3: "3-store完成",
        },
        getState: function () {
          return this.historyState.join("\n");
        },
        setState: function (e) {
          String(e) in this.stateType && (this.state = e),
            this.historyState.push(this.stateType[e]);
        },
      },
      Qa = 1,
      Ya = {
        __proto__: null,
        setInitVar: jt,
        initPara: Nt,
        quick: It,
        use: Tt,
        track: At,
        bind: Dt,
        unbind: $t,
        trackLink: xt,
        trackLinks: Et,
        setItem: Lt,
        deleteItem: Ut,
        setProfile: Rt,
        setOnceProfile: Bt,
        appendProfile: Ht,
        incrementProfile: Jt,
        deleteProfile: Mt,
        unsetProfile: qt,
        identify: Kt,
        resetAnonymousIdentity: Ft,
        trackSignup: Wt,
        registerPage: zt,
        clearAllRegister: Xt,
        clearPageRegister: Zt,
        register: Gt,
        registerOnce: Qt,
        registerSession: Yt,
        registerSessionOnce: er,
        login: tr,
        loginWithKey: rr,
        logout: nr,
        getPresetProperties: ir,
        readyState: Ga,
        debug: ka,
        on: nt,
        log: Ie,
      };
    Gi.setup(Ie);
    var eo = C({}, ua, Da),
      to = {
        bridge_info: {
          touch_app_bridge: !1,
          verify_success: !1,
          platform: "",
          support_two_way_call: !1,
        },
        is_verify_success: !1,
        initPara: function () {
          var e = {
            is_send:
              Xi.para.use_app_track_is_send !== !1 &&
              "only" !== Xi.para.use_app_track,
            white_list: [],
            is_mui: "mui" === Xi.para.use_app_track,
          };
          "object" == typeof Xi.para.app_js_bridge
            ? (Xi.para.app_js_bridge = C({}, e, Xi.para.app_js_bridge))
            : (Xi.para.use_app_track !== !0 &&
                Xi.para.app_js_bridge !== !0 &&
                "only" !== Xi.para.use_app_track &&
                "mui" !== Xi.para.use_app_track) ||
              (Xi.para.app_js_bridge = C({}, e)),
            Xi.para.app_js_bridge.is_send === !1 &&
              Te(
                "设置了 is_send:false,如果打通失败，数据将被丢弃!",
              );
        },
        app_js_bridge_v1: function () {
          function e(e) {
            (n = e),
              ce(n) && (n = JSON.parse(n)),
              i && (i(n), (i = null), (n = null));
          }
          function t() {
            "object" == typeof window.SensorsData_APP_JS_Bridge &&
              window.SensorsData_APP_JS_Bridge.sensorsdata_call_app &&
              ((n = window.SensorsData_APP_JS_Bridge.sensorsdata_call_app()),
              ce(n) && (n = JSON.parse(n)));
          }
          function r() {
            if (
              /iPad|iPhone|iPod/.test(navigator.userAgent) &&
              !window.MSStream
            ) {
              var e = document.createElement("iframe");
              e.setAttribute("src", "sensorsanalytics://getAppInfo"),
                document.documentElement.appendChild(e),
                e.parentNode.removeChild(e),
                (e = null);
            }
          }
          var n = null,
            i = null;
          (window.sensorsdata_app_js_bridge_call_js = function (t) {
            e(t);
          }),
            (Xi.getAppStatus = function (e) {
              return (
                r(), t(), e ? void (null === n ? (i = e) : (e(n), (n = null))) : n
              );
            });
        },
        hasVisualModeBridge: function () {
          var e = window.SensorsData_App_Visual_Bridge,
            t = "sensorsdata_visualized_mode";
          return r(e) && e[t] && (e[t] === !0 || e[t]());
        },
        validateAppUrl: lr,
      };
    (or.prototype.call = function (e, t) {
      var r = this,
        i =
          new Date().getTime().toString(16) +
          String(n()).replace(".", "").slice(1, 8);
      (this.resultCbs[i] = r.resultCbs[i] || { result: null, callbacks: [] }),
        (this.timeoutCbs[i] = r.timeoutCbs[i] || {
          isTimeout: !1,
          callbacks: [],
        }),
        (e = e.data ? e : { data: e }),
        (e.data.message_id = i);
      var a = C({ callType: this.type }, e);
      return (
        t &&
          (this.timerId = setTimeout(function () {
            r.timeoutCbs[i].isTimeout = !0;
            for (var e in r.timeoutCbs[i].callbacks)
              r.timeoutCbs[i].callbacks[e].call(null),
                r.timeoutCbs[i].callbacks.splice(e, 1);
          }, t)),
        sr(a),
        {
          onResult: function (e) {
            return r.resultCbs[i].result
              ? (e(r.resultCbs[i].result), this)
              : (!r.timeoutCbs[i].isTimeout && r.resultCbs[i].callbacks.push(e),
                this);
          },
          onTimeout: function (e) {
            return r.timeoutCbs[i].isTimeout
              ? (e(), this)
              : (!r.resultCbs[i].result && r.timeoutCbs[i].callbacks.push(e),
                this);
          },
        }
      );
    }),
      (or.prototype.onAppNotify = function (e) {
        this.appCallJsCallback = e;
      }),
      (or.prototype.notifyApp = function (e, t) {
        var r = C({ callType: this.type }, e);
        return t && (r.message_id = t), sr(r);
      }),
      (ur.prototype = {
        double: function () {},
        getAppData: function () {},
        hasAppBridge: function () {
          return Xi.bridge.bridge_info.support_two_way_call;
        },
        init: function () {},
        jsCallApp: function () {},
        requestToApp: function (t) {
          this.bridge
            .call(t, t.timeout.time)
            .onResult(function (r) {
              e(t.callback) && t.callback(r);
            })
            .onTimeout(function () {
              e(t.timeout.callback) && t.timeout.callback();
            });
        },
      });
    var ro = {
        isSeachHasKeyword: function () {
          return (
            "" !== V(location.href, "sa-request-id") &&
            ("string" == typeof sessionStorage.getItem("sensors-visual-mode") &&
              sessionStorage.removeItem("sensors-visual-mode"),
            !0)
          );
        },
        hasKeywordHandle: function () {
          var e = location.href,
            t = V(e, "sa-request-id") || null,
            r = V(e, "sa-request-type") || null,
            n = V(e, "sa-request-url") || null;
          if ((Xa.setNotice(n), aa.isSupport()))
            if (
              (null !== n && sessionStorage.setItem("sensors_heatmap_url", n),
              sessionStorage.setItem("sensors_heatmap_id", t),
              null !== r)
            )
              "1" === r || "2" === r || "3" === r
                ? sessionStorage.setItem("sensors_heatmap_type", r)
                : (r = null);
            else {
              var i = sessionStorage.getItem("sensors_heatmap_type");
              r = null !== i ? i : null;
            }
          this.isReady(t, r);
        },
        isReady: function (e, t, r) {
          Xi.para.heatmap_url
            ? he({
                success: function () {
                  setTimeout(function () {
                    "undefined" != typeof sa_jssdk_heatmap_render &&
                      (sa_jssdk_heatmap_render(Xi, e, t, r),
                      "object" == typeof console &&
                        "function" == typeof console.log &&
                        ((Xi.heatmap_version &&
                          Xi.heatmap_version === Xi.lib_version) ||
                          Te(
                            "heatmap.js与sensorsdata.js版本号不一致，可能存在风险!",
                          )));
                  }, 0);
                },
                error: function () {},
                type: "js",
                url: Xi.para.heatmap_url,
              })
            : Ae("没有指定heatmap_url的路径");
        },
        isStorageHasKeyword: function () {
          return (
            aa.isSupport() &&
            "string" == typeof sessionStorage.getItem("sensors_heatmap_id")
          );
        },
        storageHasKeywordHandle: function () {
          Xa.setNotice(),
            ro.isReady(
              sessionStorage.getItem("sensors_heatmap_id"),
              sessionStorage.getItem("sensors_heatmap_type"),
              location.href,
            );
        },
        isWindowNameHasKeyword: function () {
          try {
            var e = JSON.parse(window.name),
              t = d(e["sa-request-page-url"])
                ? u(e["sa-request-page-url"])
                : null;
            return (
              e["sa-request-id"] && d(e["sa-request-id"]) && t === location.href
            );
          } catch (r) {
            return !1;
          }
        },
        windowNameHasKeywordHandle: function () {
          function e(e) {
            var r = t[e];
            return d(r) ? u(r) : null;
          }
          var t = JSON.parse(window.name),
            r = e("sa-request-id"),
            n = e("sa-request-type"),
            i = e("sa-request-url");
          Xa.setNotice(i),
            aa.isSupport() &&
              (null !== i && sessionStorage.setItem("sensors_heatmap_url", i),
              sessionStorage.setItem("sensors_heatmap_id", r),
              null !== n
                ? "1" === n || "2" === n || "3" === n
                  ? sessionStorage.setItem("sensors_heatmap_type", n)
                  : (n = null)
                : (n =
                    null !== sessionStorage.getItem("sensors_heatmap_type")
                      ? sessionStorage.getItem("sensors_heatmap_type")
                      : null)),
            ro.isReady(r, n);
        },
      },
      no = {
        isStorageHasKeyword: function () {
          return (
            aa.isSupport() &&
            "string" == typeof sessionStorage.getItem("sensors-visual-mode")
          );
        },
        isSearchHasKeyword: function () {
          return (
            (pr("sa-visual-mode") === !0 || "true" === pr("sa-visual-mode")) &&
            ("string" == typeof sessionStorage.getItem("sensors_heatmap_id") &&
              sessionStorage.removeItem("sensors_heatmap_id"),
            !0)
          );
        },
        loadVtrack: function () {
          he({
            success: function () {},
            error: function () {},
            type: "js",
            url: Xi.para.vtrack_url
              ? Xi.para.vtrack_url
              : yt() +
                "//static.sensorsdata.cn/sdk/" +
                Xi.lib_version +
                "/vtrack.min.js",
          });
        },
        messageListener: function (e) {
          if (!e || !e.data || "sa-fe" !== e.data.source) return !1;
          if ("v-track-mode" === e.data.type) {
            if (e.data.data && e.data.data.isVtrack)
              if (
                (aa.isSupport() &&
                  sessionStorage.setItem("sensors-visual-mode", "true"),
                e.data.data.userURL && location.href.match(/sa-visual-mode=true/))
              ) {
                var t = e.data.data.userURL;
                d(t) &&
                  (je(t, "http://") || je(t, "https://")) &&
                  (window.location.href = encodeURI(t));
              } else no.loadVtrack();
            window.removeEventListener("message", no.messageListener, !1);
          }
        },
        removeMessageHandle: function () {
          window.removeEventListener &&
            window.removeEventListener("message", no.messageListener, !1);
        },
        verifyVtrackMode: function () {
          window.addEventListener &&
            window.addEventListener("message", no.messageListener, !1),
            no.postMessage();
        },
        postMessage: function () {
          try {
            window.parent &&
              window.parent.postMessage &&
              window.parent.postMessage(
                {
                  source: "sa-web-sdk",
                  type: "v-is-vtrack",
                  data: { sdkversion: _a },
                },
                "*",
              );
          } catch (e) {
            Ae(
              "浏览器版本过低，不支持 postMessage API",
            );
          }
        },
        notifyUser: function () {
          var e = function (t) {
            return (
              !(!t || !t.data || "sa-fe" !== t.data.source) &&
              void (
                "v-track-mode" === t.data.type &&
                (t.data.data &&
                  t.data.data.isVtrack &&
                  alert(
                    "当前版本不支持，请升级部署神策数据治理",
                  ),
                window.removeEventListener("message", e, !1))
              )
            );
          };
          window.addEventListener && window.addEventListener("message", e, !1),
            no.postMessage();
        },
      },
      io = [
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
        "resetAnonymousIdentity",
        "login",
        "logout",
        "trackLink",
        "clearAllRegister",
        "clearPageRegister",
        "bind",
        "unbind",
        "loginWithKey",
      ],
      ao = {
        track: function (e, t, r) {},
        quick: function (e, t, r, n) {},
        register: function (e) {},
        registerPage: function (e) {},
        registerOnce: function (e) {},
        clearAllRegister: function (e) {},
        trackSignup: function (e, t, r, n) {},
        setProfile: function (e, t) {},
        setOnceProfile: function (e, t) {},
        appendProfile: function (e, t) {},
        incrementProfile: function (e, t) {},
        deleteProfile: function (e) {},
        unsetProfile: function (e, t) {},
        identify: function (e, t) {},
        resetAnonymousIdentity: function (e) {},
        login: function (e, t) {},
        logout: function (e) {},
        trackLink: function (e, t, r) {},
        deleteItem: function (e, t) {},
        setItem: function (e, t, r) {},
        getAppStatus: function (e) {},
        clearPageRegister: function (e) {},
      };
    (wr.prototype.process = function (e, t) {
      if (!(e && e in this.processDef))
        return void Ae("process [" + e + "] is not supported");
      var r = this.registeredInterceptors[e];
      if (r && y(r) && r.length > 0)
        for (
          var n = { current: 0, total: r.length }, i = new br(t, n, Xi), a = 0;
          a < r.length;
          a++
        )
          try {
            if (
              ((n.current = a + 1),
              (t = r[a].call(null, t, i) || t),
              i.cancellationToken.getCanceled())
            )
              break;
            if (i.cancellationToken.getStopped()) return;
          } catch (o) {
            Ae("interceptor error:" + o);
          }
      return (
        this.processDef[e] &&
          this.processDef[e] in this.processDef &&
          (t = this.process(this.processDef[e], t)),
        t
      );
    }),
      (wr.prototype.registerStageImplementation = function (t) {
        t &&
          t.init &&
          e(t.init) &&
          (t.init(this),
          t.interceptor && this.registerInterceptor(t.interceptor));
      }),
      (wr.prototype.registerInterceptor = function (t) {
        if (t)
          for (var n in t) {
            var i = t[n];
            if (i && r(i) && e(i.entry)) {
              pe(i.priority) || (i.priority = Number.MAX_VALUE),
                this.registeredInterceptors[n] ||
                  (this.registeredInterceptors[n] = []);
              var a = this.registeredInterceptors[n];
              (i.entry.priority = i.priority),
                a.push(i.entry),
                a.sort(function (e, t) {
                  return e.priority - t.priority;
                });
            }
          }
      });
    var oo = {
        basicProps: "extendProps",
        extendProps: "formatData",
        formatData: "finalAdjustData",
        finalAdjustData: null,
      },
      so = new wr(oo),
      lo = { send: null },
      uo = new wr(lo),
      co = { getUtmData: null, callSchema: null },
      po = new wr(co),
      fo = { webClickEvent: null, webStayEvent: null },
      go = new wr(fo),
      _o = {
        buildDataStage: function (e) {
          e && so.registerInterceptor(e);
        },
        businessStage: function (e) {
          e && po.registerInterceptor(e);
        },
        sendDataStage: function (e) {
          e && uo.registerInterceptor(e);
        },
        viewStage: function (e) {
          e && go.registerInterceptor(e);
        },
      },
      ho = {
        stage: null,
        init: function (e) {
          this.stage = e;
        },
      },
      mo = {
        stage: null,
        init: function (e) {
          this.stage = e;
        },
        interceptor: {
          send: {
            entry: function (e) {
              return e;
            },
          },
        },
      },
      vo = {};
    (vo.buildData = function (e) {
      return ht(e);
    }),
      (vo.sendData = function (e, t) {
        var r = Ve(e.properties),
          n = {
            origin_data: e,
            server_url: Xi.para.server_url,
            data: e,
            config: r || {},
            callback: t,
          };
        Cr(n), Xi.log(e);
      }),
      (vo.encodeTrackData = function (e) {
        return tt(e);
      }),
      (vo.getUtmData = function () {
        return Pr();
      });
    var yo = {
        webClickEvent: {
          entry: function (e, t) {
            var r = t.sensors;
            "a" === e.tagName &&
            r.para.heatmap &&
            r.para.heatmap.isTrackLink === !0
              ? r.trackLink(
                  { event: e.event, target: e.target },
                  "$WebClick",
                  e.props,
                )
              : r.track("$WebClick", e.props, e.callback);
          },
        },
        webStayEvent: {
          entry: function (e, t) {
            var r = t.sensors;
            r.track("$WebStay", e);
          },
        },
      },
      bo = window.sensors_data_pre_config,
      wo = !!eo.isObject(bo) && bo.is_compliance_enabled;
    (Xi.init = function (e) {
      return (
        Ca.sdk.emit("beforeInit"),
        !(Xi.readyState && Xi.readyState.state && Xi.readyState.state >= 2) &&
          (wo && (Ir(!0), vr()),
          Ca.initSystemEvent(),
          Xi.setInitVar(),
          Xi.readyState.setState(2),
          Xi.initPara(e),
          Ca.sdk.emit("initPara"),
          Ca.sdk.emit("afterInitPara"),
          Ca.sdk.emit("initAPI"),
          Ca.sdk.emit("afterInitAPI"),
          Xi.detectMode(),
          ar(),
          Ca.sdk.emit("afterInit"),
          void Ca.sdk.emit("ready"))
      );
    }),
      wo ? Ir(!1) : (Ir(!0), vr());
    var So,
      ko,
      Po,
      Co,
      Oo,
      jo,
      No,
      Io,
      To,
      Ao,
      Do,
      $o,
      xo,
      Eo,
      Lo,
      Uo,
      Ro,
      Bo,
      Ho = "1.26.15",
      Jo = {
        init: function (e) {
          var t = e._.isString,
            r = e._.rot13defs,
            n = e._.dfmapping,
            i = "data:enc;",
            a = "dfm-enc-";
          e.ee.sdk.on("afterInitPara", function () {
            (e.kit.userEncrypt = function (e) {
              return a + n(e);
            }),
              (e.kit.userDecrypt = function (e) {
                return (
                  0 === e.indexOf(i)
                    ? ((e = e.substring(i.length)), (e = r(e)))
                    : 0 === e.indexOf(a) &&
                      ((e = e.substring(a.length)), (e = n(e))),
                  e
                );
              }),
              (e.kit.userDecryptIfNeeded = function (r) {
                return (
                  !t(r) ||
                    (0 !== r.indexOf(i) && 0 !== r.indexOf(a)) ||
                    (r = e.kit.userDecrypt(r)),
                  r
                );
              });
          });
        },
        plugin_name: "UserEncryptDefault",
      },
      Mo = Dr(Jo),
      qo = "1.26.15",
      Ko = {
        sd: null,
        init: function (e) {
          if (this.sd) return !1;
          if (((this.sd = e), !this.sd || !this.sd._)) return !1;
          var t = this.sd._.cookie.get("sensors_amp_id"),
            r = this.sd.store._state.distinct_id;
          if (t && t.length > 0) {
            var n = "amp-" === t.slice(0, 4);
            if (t !== r) {
              if (!n) return !1;
              this.sd.store._state.first_id
                ? (this.sd.identify(t, !0),
                  this.sd.saEvent.send(
                    {
                      original_id: t,
                      distinct_id: r,
                      type: "track_signup",
                      event: "$SignUp",
                      properties: {},
                    },
                    null,
                  ),
                  this.setAmpId(r))
                : this.sd.identify(t, !0);
            }
          } else this.setAmpId(r);
          this.addListener();
        },
        addListener: function () {
          var e = this;
          this.sd.events.on("changeDistinctId", function (t) {
            e.setAmpId(t);
          }),
            this.sd.events.isReady();
        },
        setAmpId: function (e) {
          this.sd._.cookie.set("sensors_amp_id", e);
        },
      },
      Fo = Er(Ko, "Amp", "sdkReady"),
      Vo = window.SensorsData_App_Visual_Bridge,
      Wo = Vo && Vo.sensorsdata_visualized_mode,
      zo = Vo && Vo.sensorsdata_visualized_alert_info,
      Xo = Vo && Vo.sensorsdata_hover_web_nodes,
      Zo = {
        isVerify: function () {
          return Wo && (Wo === !0 || Wo.call(Vo));
        },
        commands: {
          app_alert: Lr,
          visualized_track: Ur,
          page_info: Ur,
          sensorsdata_get_app_visual_config: Rr,
        },
      },
      Go = "1.26.15",
      Qo = {
        init: function (e) {
          (Co = e),
            (Oo = Co && Co._),
            (jo = (Co && Co.log) || (console && console.log) || function () {}),
            Mr();
        },
        handleCommand: Kr,
      },
      Yo = Jr(Qo, "AndroidBridge", "sdkAfterInitPara"),
      es = window.SensorsData_App_Visual_Bridge,
      ts = es && es.sensorsdata_visualized_mode,
      rs = es && es.sensorsdata_visualized_alert_info,
      ns = es && es.sensorsdata_hover_web_nodes,
      is = {
        isVerify: function () {
          return ts && (ts === !0 || ts.call(es));
        },
        commands: {
          app_alert: Fr,
          visualized_track: Vr,
          page_info: Vr,
          sensorsdata_get_app_visual_config: Wr,
        },
      },
      as = "1.26.15",
      os = {
        init: function (e) {
          (Do = e),
            ($o = Do && Do._),
            (xo = (Do && Do.log) || (console && console.log) || function () {}),
            Gr();
        },
        handleCommand: Yr,
      },
      ss = Zr(os, "AndroidObsoleteBridge", "sdkAfterInitPara"),
      ls = "1.26.15",
      us = {
        event_list: [],
        latest_event_initial_time: null,
        max_save_time: 2592e6,
        init: function (e, t) {
          function r() {
            return (
              (Eo = Lo._),
              (Uo = Lo.store),
              !!Eo.localStorage.isSupport() &&
                ((Lo.para.max_string_length = 1024),
                n.eventList.init(),
                n.addLatestChannelUrl(),
                void n.addIsChannelCallbackEvent())
            );
          }
          if (Lo || !e) return !1;
          (t = t || {}),
            (Ro = t.cookie_name || "sensorsdata2015jssdkchannel"),
            (Lo = e);
          var n = this;
          r();
        },
        addIsChannelCallbackEvent: function () {
          Lo.registerPage({
            $is_channel_callback_event: function (e) {
              if (
                Eo.isObject(e) &&
                e.event &&
                "$WebClick" !== e.event &&
                "$pageview" !== e.event &&
                "$WebStay" !== e.event &&
                "$SignUp" !== e.event
              )
                return (
                  !us.eventList.hasEvent(e.event) &&
                  (us.eventList.add(e.event), !0)
                );
            },
          });
        },
        addLatestChannelUrl: function () {
          var e = this.getUrlDomain(),
            t = this.cookie.getChannel();
          if ("url解析失败" === e)
            this.registerAndSave({
              _sa_channel_landing_url: "",
              _sa_channel_landing_url_error:
                "url的domain解析失败",
            });
          else if (Eo.isReferralTraffic(document.referrer)) {
            var r = Eo.getQueryParam(location.href, "sat_cf");
            Eo.isString(r) && r.length > 0
              ? (this.registerAndSave({ _sa_channel_landing_url: location.href }),
                us.channelLinkHandler())
              : this.registerAndSave({ _sa_channel_landing_url: "" });
          } else
            t
              ? Lo.registerPage(t)
              : Lo.registerPage({
                  _sa_channel_landing_url: "",
                  _sa_channel_landing_url_error: "取值异常",
                });
        },
        registerAndSave: function (e) {
          Lo.registerPage(e), this.cookie.saveChannel(e);
        },
        cookie: {
          getChannel: function () {
            var e = Lo.kit.userDecryptIfNeeded(Eo.cookie.get(Ro));
            return (
              (e = Eo.safeJSONParse(e)), !(!Eo.isObject(e) || !e.prop) && e.prop
            );
          },
          saveChannel: function (e) {
            var t = { prop: e },
              r = JSON.stringify(t);
            Lo.para.encrypt_cookie && (r = Lo.kit.userEncrypt(r)),
              Eo.cookie.set(Ro, r);
          },
        },
        channelLinkHandler: function () {
          this.eventList.reset(), Lo.track("$ChannelLinkReaching");
        },
        getUrlDomain: function () {
          var e = Eo.info.pageProp.url_domain;
          return "" === e && (e = "url解析失败"), e;
        },
        eventList: {
          init: function () {
            var e = this.get(),
              t = new Date().getTime();
            if (
              e &&
              Eo.isNumber(e.latest_event_initial_time) &&
              Eo.isArray(e.eventList)
            ) {
              var r = t - e.latest_event_initial_time;
              r > 0 && r < us.max_save_time
                ? ((us.event_list = e.eventList),
                  (us.latest_event_initial_time = e.latest_event_initial_time))
                : this.reset();
            } else this.reset();
          },
          get: function () {
            var e = {};
            try {
              e = Uo.readObjectVal("sawebjssdkchannel");
            } catch (t) {
              Lo.log(t);
            }
            return e;
          },
          add: function (e) {
            us.event_list.push(e), this.save();
          },
          save: function () {
            var e = {
              latest_event_initial_time: us.latest_event_initial_time,
              eventList: us.event_list,
            };
            Uo.saveObjectVal("sawebjssdkchannel", e);
          },
          reset: function () {
            (us.event_list = []),
              (us.latest_event_initial_time = new Date().getTime()),
              this.save();
          },
          hasEvent: function (e) {
            var t = !1;
            return (
              Eo.each(us.event_list, function (r) {
                r === e && (t = !0);
              }),
              t
            );
          },
        },
      },
      cs = rn(us, "SensorsChannel", "sdkAfterInitAPI"),
      ps = "1.26.15",
      ds =
        (/micromessenger\/([\d.]+)/i.test(navigator.userAgent || ""),
        function () {
          var e = {};
          return (
            "undefined" != typeof document.hidden
              ? ((e.hidden = "hidden"), (e.visibilityChange = "visibilitychange"))
              : "undefined" != typeof document.msHidden
                ? ((e.hidden = "msHidden"),
                  (e.visibilityChange = "msvisibilitychange"))
                : "undefined" != typeof document.webkitHidden &&
                  ((e.hidden = "webkitHidden"),
                  (e.visibilityChange = "webkitvisibilitychange")),
            e
          );
        });
    Bo = ds().hidden;
    var fs,
      gs,
      _s,
      hs,
      ms,
      vs,
      ys,
      bs,
      ws = { android: /Android/i, iOS: /iPhone|iPad|iPod/i },
      Ss = function () {
        for (var e in ws) if (navigator.userAgent.match(ws[e])) return e;
        return "";
      },
      ks = Ss(),
      Ps = function () {
        return ws.hasOwnProperty(ks);
      },
      Cs = function (e) {
        return (
          null != e && "[object Object]" == Object.prototype.toString.call(e)
        );
      },
      Os = function (e) {
        var t = /\/sd\/(\w+)\/(\w+)$/;
        return e.match(t);
      },
      js = function (e) {
        var t = e._.URL(e.para.server_url);
        return {
          origin: t.origin,
          project: t.searchParams.get("project") || "default",
        };
      },
      Ns = function (e, t, r) {
        e.log("尝试唤起 android app");
        var n = t;
        e.log("唤起APP的地址：" + n),
          (window.location = n),
          (e.timer = setTimeout(function () {
            var t = sn();
            return (
              e.log("hide:" + Bo + ":" + document[Bo]),
              t
                ? (e.log("The page is hidden, stop navigating to download page"),
                  !1)
                : (e.log(
                    "App可能未安装，跳转到下载地址",
                  ),
                  void (window.location = r))
            );
          }, e.timeout));
      },
      Is = function (e, t, r) {
        e.log("尝试唤起 iOS app:" + t),
          (window.location.href = t),
          (e.timer = setTimeout(function () {
            var t = sn();
            return t
              ? (e.log("The page is hidden, stop navigating to download page"),
                !1)
              : (e.log(
                  "App可能未安装，跳转到下载地址",
                ),
                void (window.location.href = r));
          }, e.timeout)),
          e.log("new timer:" + e.timer);
      },
      Ts = {
        plugin_name: ["deeplink", "Deeplink"],
        key: null,
        timer: null,
        sd: null,
        data: null,
        timeout: 2500,
        apiURL:
          "{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}",
        init: function (e) {
          if (this.sd)
            return this.logger("deeplink已经初始化"), !1;
          arguments[0]
            ? Cs(arguments[0]) && "number" == typeof arguments[0].timeout
              ? (this.sd = window.sensorsDataAnalytic201505)
              : (this.sd = e)
            : (this.sd = window.sensorsDataAnalytic201505);
          var t = {};
          if (
            (arguments.length > 0 &&
              (1 === arguments.length && Cs(arguments[0])
                ? (t = arguments[0])
                : arguments.length >= 2 &&
                  Cs(arguments[1]) &&
                  (t = arguments[1])),
            !Ps())
          )
            return (
              this.logger(
                "不支持当前系统，目前只支持Android和iOS",
              ),
              !1
            );
          if (
            (Cs(t) &&
              this.sd._.isNumber(t.timeout) &&
              t.timeout >= 2500 &&
              (this.timeout = t.timeout),
            !this.sd.para.server_url)
          )
            return (
              this.logger(
                "神策JS SDK配置项server_url未正确配置",
              ),
              !1
            );
          var r = js(this.sd);
          this.apiURL = this.apiURL
            .replace("{origin}", r.origin)
            .replace("{project}", r.project);
          var n = this.sd._.getQueryParam(window.location.href, "deeplink");
          if (!n)
            return (
              this.logger(
                "当前页面缺少deeplink参数",
              ),
              !1
            );
          n = window.decodeURIComponent(n);
          var i = Os(n);
          return i
            ? ((this.key = i[2]),
              (this.apiURL = this.apiURL.replace(
                "{key}",
                window.encodeURIComponent(i[2]),
              )),
              this.sd._.ajax({
                url: this.apiURL,
                type: "GET",
                cors: !0,
                credentials: !1,
                success: function (e) {
                  return e.errorMsg
                    ? (Ts.logger("API报错：" + e.errorMsg), !1)
                    : ((Ts.data = e),
                      Ts.logger(
                        "API查询成功，数据：" +
                          JSON.stringify(e, null, "  "),
                      ),
                      void (
                        this.data.app_key &&
                        (this.data.android_info &&
                          this.data.android_info.url_schemes &&
                          (this.data.android_info.url_schemes +=
                            "://sensorsdata/sd/" +
                            this.data.app_key +
                            "/" +
                            this.key),
                        this.data.ios_info &&
                          this.data.ios_info.url_schemes &&
                          (this.data.ios_info.url_schemes +=
                            "://sensorsdata/sd/" +
                            this.data.app_key +
                            "/" +
                            this.key))
                      ));
                }.bind(this),
                error: function () {
                  Ts.logger("API查询出错");
                },
              }),
              void this.addListeners())
            : (this.logger(
                "当前页面的deeplink参数无效",
              ),
              !1);
        },
        openDeepLink: function () {
          if ((this.logger("openDeeplink()"), !this.data))
            return this.logger("没有Deep link数据!"), !1;
          if ("iOS" === ks) {
            this.logger("当前系统是iOS");
            var e =
              this.sd &&
              this.sd._ &&
              this.sd._.getIOSVersion() >= 9 &&
              this.data.ios_info.ios_wake_url
                ? this.data.ios_info.ios_wake_url
                : this.data.ios_info.url_schemes;
            this.logger("唤起APP的地址：" + e),
              Is(this, e, this.data.ios_info.download_url);
          } else
            this.logger("当前系统是 android"),
              Ns(
                this,
                this.data.android_info.url_schemes,
                this.data.android_info.download_url,
              );
        },
        logger: function (e) {
          this.sd && this.sd.log(e);
        },
        addListeners: function () {
          var e = ds().visibilityChange,
            t = this;
          e &&
            document.addEventListener(
              e,
              function () {
                clearTimeout(t.timer),
                  t.logger("visibilitychange, clear timeout:" + t.timer);
              },
              !1,
            ),
            window.addEventListener(
              "pagehide",
              function () {
                t.logger("page hide, clear timeout:" + t.timer),
                  clearTimeout(t.timer);
              },
              !1,
            );
        },
      },
      As = on(Ts, null, "sdkReady"),
      Ds = "1.26.15",
      $s = {
        init: function (e) {
          (_s = e),
            (hs = _s && _s._),
            (ms = (_s && _s.log) || (console && console.log) || function () {}),
            pn();
        },
        handleCommand: fn,
      },
      xs = cn($s, "IOSBridge", "sdkAfterInitPara"),
      Es = "1.26.15",
      Ls = {
        init: function (e) {
          (vs = e),
            (ys = vs && vs._),
            (bs = (vs && vs.log) || (console && console.log) || function () {}),
            mn();
        },
      },
      Us = hn(Ls, "IOSObsoleteBridge", "sdkAfterInitPara"),
      Rs = "1.26.15",
      Bs = 5e3,
      Hs = 432e3;
    (Pn.prototype.init = function (e, t) {
      if (e) {
        if (((this.sd = e), (this._ = this.sd._), t)) {
          this.option = t;
          var r = t.heartbeat_interval_time;
          r &&
            (this._.isNumber(r) || this._.isNumber(1 * r)) &&
            1 * r > 0 &&
            (this.heartbeat_interval_time = 1e3 * r);
          var n = t.max_duration;
          n &&
            (this._.isNumber(n) || this._.isNumber(1 * n)) &&
            1 * n > 0 &&
            (this.max_duration = n);
        }
        (this.page_id = Number(
          String(this._.getRandom()).slice(2, 5) +
            String(this._.getRandom()).slice(2, 4) +
            String(new Date().getTime()).slice(-4),
        )),
          this.addEventListener(),
          document.hidden === !0
            ? (this.page_show_status = !1)
            : this.addHeartBeatInterval(),
          this.log("PageLeave初始化完毕");
      } else this.log("神策JS SDK未成功引入");
    }),
      (Pn.prototype.log = function (e) {
        this.sd && this.sd.log(e);
      }),
      (Pn.prototype.refreshPageEndTimer = function () {
        var e = this;
        this.timer && (clearTimeout(this.timer), (this.timer = null)),
          (this.timer = setTimeout(function () {
            e.page_hidden_status = !1;
          }, Bs));
      }),
      (Pn.prototype.hiddenStatusHandler = function () {
        clearTimeout(this.timer),
          (this.timer = null),
          (this.page_hidden_status = !1);
      }),
      (Pn.prototype.pageStartHandler = function () {
        (this.start_time = +new Date()),
          1 == !document.hidden
            ? (this.page_show_status = !0)
            : (this.page_show_status = !1),
          (this.url = location.href),
          (this.title = document.title);
      }),
      (Pn.prototype.pageEndHandler = function () {
        if (this.page_hidden_status !== !0) {
          var e = this.getPageLeaveProperties();
          this.page_show_status === !1 && delete e.event_duration,
            (this.page_show_status = !1),
            (this.page_hidden_status = !0),
            this.isCollectUrl(this.url) && this.sd.track("$WebPageLeave", e),
            this.refreshPageEndTimer(),
            this.delHeartBeatData();
        }
      }),
      (Pn.prototype.addEventListener = function () {
        this.addPageStartListener(),
          this.addPageSwitchListener(),
          this.addSinglePageListener(),
          this.addPageEndListener();
      }),
      (Pn.prototype.addPageStartListener = function () {
        var e = this;
        "onpageshow" in window &&
          this._.addEvent(window, "pageshow", function () {
            e.pageStartHandler(), e.hiddenStatusHandler();
          });
      }),
      (Pn.prototype.isCollectUrl = function (e) {
        return (
          "function" != typeof this.option.isCollectUrl ||
          "string" != typeof e ||
          "" === e ||
          this.option.isCollectUrl(e)
        );
      }),
      (Pn.prototype.addSinglePageListener = function () {
        var e = this;
        this.sd.ee &&
          this.sd.ee.spa.prepend("switch", function (t) {
            t !== location.href &&
              ((e.url = t),
              e.pageEndHandler(),
              e.stopHeartBeatInterval(),
              (e.current_page_url = e.url),
              e.pageStartHandler(),
              e.hiddenStatusHandler(),
              e.addHeartBeatInterval());
          });
      }),
      (Pn.prototype.addPageEndListener = function () {
        var e = this;
        this._.each(["pagehide", "beforeunload", "unload"], function (t) {
          "on" + t in window &&
            e._.addEvent(window, t, function () {
              e.pageEndHandler(), e.stopHeartBeatInterval();
            });
        });
      }),
      (Pn.prototype.addPageSwitchListener = function () {
        var e = this;
        this._.listenPageState({
          visible: function () {
            e.pageStartHandler(),
              e.hiddenStatusHandler(),
              e.addHeartBeatInterval();
          },
          hidden: function () {
            (e.url = location.href),
              (e.title = document.title),
              e.pageEndHandler(),
              e.stopHeartBeatInterval();
          },
        });
      }),
      (Pn.prototype.addHeartBeatInterval = function () {
        this._.localStorage.isSupport() && this.startHeartBeatInterval();
      }),
      (Pn.prototype.startHeartBeatInterval = function () {
        var e = this;
        this.heartbeat_interval_timer && this.stopHeartBeatInterval();
        var t = !0;
        this.isCollectUrl(this.url) || (t = !1),
          (this.heartbeat_interval_timer = setInterval(function () {
            t && e.saveHeartBeatData();
          }, this.heartbeat_interval_time)),
          t && this.saveHeartBeatData("is_first_heartbeat"),
          this.reissueHeartBeatData();
      }),
      (Pn.prototype.stopHeartBeatInterval = function () {
        clearInterval(this.heartbeat_interval_timer),
          (this.heartbeat_interval_timer = null);
      }),
      (Pn.prototype.saveHeartBeatData = function (e) {
        var t = this.getPageLeaveProperties(),
          r = new Date();
        (t.$time = r), "is_first_heartbeat" === e && (t.event_duration = 3.14);
        var n = this.sd.kit.buildData({
          type: "track",
          event: "$WebPageLeave",
          properties: t,
        });
        (n.heartbeat_interval_time = this.heartbeat_interval_time),
          this.sd.store.saveObjectVal(this.storage_name + "-" + this.page_id, n);
      }),
      (Pn.prototype.delHeartBeatData = function (e) {
        this._.localStorage.isSupport() &&
          this._.localStorage.remove(e || this.storage_name + "-" + this.page_id);
      }),
      (Pn.prototype.reissueHeartBeatData = function () {
        for (var e = window.localStorage.length, t = e - 1; t >= 0; t--) {
          var r = window.localStorage.key(t);
          if (
            r &&
            r !== this.storage_name + "-" + this.page_id &&
            0 === r.indexOf(this.storage_name + "-")
          ) {
            var n = this.sd.store.readObjectVal(r);
            this._.isObject(n) &&
              1 * new Date() - n.time > n.heartbeat_interval_time + 5e3 &&
              (delete n.heartbeat_interval_time,
              (n._flush_time = new Date().getTime()),
              this.sd.kit.sendData(n),
              this.delHeartBeatData(r));
          }
        }
      }),
      (Pn.prototype.getPageLeaveProperties = function () {
        var e = (+new Date() - this.start_time) / 1e3;
        (isNaN(e) || e < 0 || e > this.max_duration) && (e = 0),
          (e = Number(e.toFixed(3)));
        var t = this._.getReferrer(this.current_page_url),
          r =
            (document.documentElement && document.documentElement.scrollTop) ||
            window.pageYOffset ||
            (document.body && document.body.scrollTop) ||
            0;
        r = Math.round(r) || 0;
        var n = {
          $title: this.title,
          $url: this._.getURL(this.url),
          $url_path: this._.getURLPath(this._.URL(this.url).pathname),
          $referrer_host: t ? this._.getHostname(t) : "",
          $referrer: t,
          $viewport_position: r,
        };
        return (
          0 !== e && (n.event_duration = e),
          (n = this._.extend(n, this.option.custom_props))
        );
      });
    var Js = new Pn(),
      Ms = kn(Js, "PageLeave", "sdkReady"),
      qs = "1.26.15",
      Ks = !1,
      Fs = {
        init: function (e, t) {
          function r(t, r) {
            if (t.getEntries && "function" == typeof t.getEntries) {
              for (var n = t.getEntries(), i = null, a = 0; a < n.length; a++)
                "transferSize" in n[a] && (i += n[a].transferSize);
              e._.isNumber(i) &&
                i >= 0 &&
                i < 10737418240 &&
                (r.$page_resource_size = Number((i / 1024).toFixed(3)));
            }
          }
          function n(t) {
            var r = 0;
            if (t.timing) {
              var n = t.timing;
              0 !== n.fetchStart &&
              e._.isNumber(n.fetchStart) &&
              0 !== n.domContentLoadedEventEnd &&
              e._.isNumber(n.domContentLoadedEventEnd)
                ? (r = n.domContentLoadedEventEnd - n.fetchStart)
                : e.log("performance 数据获取异常");
            }
            return r;
          }
          function i(t) {
            var r = 0;
            if (e._.isFunction(t.getEntriesByType)) {
              var n = t.getEntriesByType("navigation") || [{}];
              r = (n[0] || {}).domContentLoadedEventEnd || 0;
            }
            return r;
          }
          function a() {
            var o = 0,
              s =
                window.performance ||
                window.webkitPerformance ||
                window.msPerformance ||
                window.mozPerformance,
              l = {
                $url: e._.getURL(),
                $title: document.title,
                $url_path: e._.getURLPath(),
                $referrer: e._.getReferrer(null, !0),
              };
            if (
              (s
                ? ((o = i(s) || n(s)), r(s, l))
                : e.log("浏览器未支持 performance API."),
              o > 0)
            ) {
              var u = (e._.isObject(t) && t.max_duration) || 1800;
              (o = Number((o / 1e3).toFixed(3))),
                (!e._.isNumber(u) || u <= 0 || o <= u) && (l.event_duration = o);
            }
            Ks || (e.track("$WebPageLoad", l), (Ks = !0)),
              window.removeEventListener
                ? window.removeEventListener("load", a)
                : window.detachEvent && window.detachEvent("onload", a);
          }
          "complete" == document.readyState
            ? a()
            : window.addEventListener
              ? window.addEventListener("load", a)
              : window.attachEvent && window.attachEvent("onload", a);
        },
      },
      Vs = jn(Fs, "PageLoad", "sdkReady");
    (In.prototype.init = function (e) {
      if (e) {
        (this.sd = e), (this._ = e._), (this.log = e.log);
        var t = this;
        e.registerInterceptor("buildDataStage", {
          extendProps: {
            priority: 0,
            entry: function (e) {
              return Nn(e, t);
            },
          },
        });
      } else this.log("神策JS SDK未成功引入");
    }),
      (In.prototype.register = function (e) {
        return this.sd
          ? void (this._.isObject(e) &&
            this._.isArray(e.events) &&
            e.events.length > 0 &&
            this._.isObject(e.properties) &&
            !this._.isEmptyObject(e.properties)
              ? this.customRegister.push(e)
              : this.log("RegisterProperties: register 参数错误"))
          : void this.log("神策JS SDK未成功引入");
      }),
      (In.prototype.hookRegister = function (e) {
        return this.sd
          ? void (this._.isFunction(e)
              ? this.customRegister.push(e)
              : this.log(
                  "RegisterProperties: hookRegister 参数错误",
                ))
          : void this.log("神策JS SDK未成功引入");
      });
    var Ws = "1.26.15";
    In.prototype.plugin_name = "RegisterProperties";
    var zs,
      Xs,
      Zs = new In(),
      Gs = Dn(Zs),
      Qs = "1.26.15",
      Ys = (window.console && window.console.log) || function () {},
      el = {
        init: function (e) {
          return (
            (zs = e),
            (Ys = (zs && zs.log) || Ys),
            e && e.kit && e.kit.buildData
              ? ((Xs = zs.kit.buildData),
                (zs.kit.buildData = Ln),
                void Ys(
                  "RegisterPropertyPageHeight 插件初始化完成",
                ))
              : void Ys(
                  "RegisterPropertyPageHeight 插件初始化失败,当前主sdk不支持 RegisterPropertyPageHeight 插件，请升级主sdk",
                )
          );
        },
      },
      tl = En(el, "RegisterPropertyPageHeight", "sdkReady"),
      rl = "1.26.15",
      nl = {};
    (nl.getPart = function (e) {
      var t = !1,
        r = this.option.length;
      if (r)
        for (var n = 0; n < r; n++)
          if (e.indexOf(this.option[n].part_url) > -1) return !0;
      return t;
    }),
      (nl.getPartHash = function (e) {
        var t = this.option.length,
          r = !1;
        if (t)
          for (var n = 0; n < t; n++)
            if (e.indexOf(this.option[n].part_url) > -1)
              return this.option[n].after_hash;
        return !!r;
      }),
      (nl.getCurrenId = function () {
        var e = this.store.getDistinctId() || "",
          t = this.store.getFirstId() || "";
        this._.urlSafeBase64 && this._.urlSafeBase64.encode
          ? (e = e
              ? this._.urlSafeBase64.trim(
                  this._.urlSafeBase64.encode(this._.base64Encode(e)),
                )
              : "")
          : this._.rot13obfs && (e = e ? this._.rot13obfs(e) : "");
        var r = t ? "f" + e : "d" + e;
        return encodeURIComponent(r);
      }),
      (nl.rewriteUrl = function (e, t) {
        var r = this,
          n = /([^?#]+)(\?[^#]*)?(#.*)?/,
          i = n.exec(e),
          a = "";
        if (i) {
          var o,
            s = i[1] || "",
            l = i[2] || "",
            u = i[3] || "",
            c = "_sasdk=" + this.getCurrenId(),
            p = function (e) {
              var t = e.split("&"),
                n = [];
              return (
                r._.each(t, function (e) {
                  e.indexOf("_sasdk=") > -1 ? n.push(c) : n.push(e);
                }),
                n.join("&")
              );
            };
          if (this.getPartHash(e)) {
            o = u.indexOf("_sasdk");
            var d = u.indexOf("?");
            a =
              d > -1
                ? o > -1
                  ? s + l + "#" + u.substring(1, o) + p(u.substring(o, u.length))
                  : s + l + u + "&" + c
                : s + l + "#" + u.substring(1) + "?" + c;
          } else {
            o = l.indexOf("_sasdk");
            var f = /^\?(\w)+/.test(l);
            a = f
              ? o > -1
                ? s + "?" + p(l.substring(1)) + u
                : s + l + "&" + c + u
              : s + "?" + c + u;
          }
          return t && (t.href = a), a;
        }
      }),
      (nl.getUrlId = function () {
        var e = location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);
        if (this._.isArray(e) && e[1]) {
          var t = decodeURIComponent(e[1]);
          return (
            !t ||
              ("f" !== t.substring(0, 1) && "d" !== t.substring(0, 1)) ||
              (this._.urlSafeBase64 &&
              this._.urlSafeBase64.isUrlSafeBase64 &&
              this._.urlSafeBase64.isUrlSafeBase64(t)
                ? (t =
                    t.substring(0, 1) +
                    this._.base64Decode(
                      this._.urlSafeBase64.decode(t.substring(1)),
                    ))
                : this._.rot13defs &&
                  (t = t.substring(0, 1) + this._.rot13defs(t.substring(1)))),
            t
          );
        }
        return "";
      }),
      (nl.setRefferId = function (e) {
        var t = this.store.getDistinctId(),
          r = this.getUrlId();
        if (r && "" !== r) {
          var n = "a" === r.substring(0, 1) || "d" === r.substring(0, 1);
          (r = r.substring(1)),
            r !== t &&
              (n
                ? (this.sd.identify(r, !0),
                  this.store.getFirstId() &&
                    this.sd.saEvent.send(
                      {
                        original_id: r,
                        distinct_id: t,
                        type: "track_signup",
                        event: "$SignUp",
                        properties: {},
                      },
                      null,
                    ))
                : (this.store.getFirstId() && !e.re_login) || this.sd.login(r));
        }
      }),
      (nl.addListen = function () {
        var e = this,
          t = function (t) {
            var r,
              n,
              i = t.target,
              a = i.tagName.toLowerCase(),
              o = i.parentNode;
            if (
              ("a" === a && i.href) ||
              (o && o.tagName && "a" === o.tagName.toLowerCase() && o.href)
            ) {
              "a" === a && i.href
                ? ((r = i.href), (n = i))
                : ((r = o.href), (n = o));
              var s = e._.URL(r),
                l = s.protocol;
              ("http:" !== l && "https:" !== l) ||
                (e.getPart(r) && e.rewriteUrl(r, n));
            }
          };
        e._.addEvent(document, "mousedown", t),
          window.PointerEvent &&
            "maxTouchPoints" in window.navigator &&
            window.navigator.maxTouchPoints >= 0 &&
            e._.addEvent(document, "pointerdown", t);
      }),
      (nl.init = function (e, t) {
        function r(t) {
          for (var r = t.length, n = [], i = 0; i < r; i++)
            /[A-Za-z0-9]+\./.test(t[i].part_url) &&
            "[object Boolean]" == Object.prototype.toString.call(t[i].after_hash)
              ? n.push(t[i])
              : e.log(
                  "linker 配置的第 " +
                    (i + 1) +
                    " 项格式不正确，请检查参数格式！",
                );
          return n;
        }
        return (
          (this.sd = e),
          (this._ = e._),
          (this.store = e.store),
          (this.para = e.para),
          this._.isObject(t) && this._.isArray(t.linker) && t.linker.length > 0
            ? (this.setRefferId(t),
              this.addListen(),
              (this.option = t.linker),
              void (this.option = r(this.option)))
            : void e.log(
                "请配置打通域名参数！",
              )
        );
      });
    var il,
      al,
      ol,
      sl,
      ll,
      ul,
      cl,
      pl,
      dl,
      fl,
      gl,
      _l,
      hl,
      ml = Bn(nl, "SiteLinker", "sdkReady"),
      vl = "utm_source utm_medium utm_campaign utm_content utm_term",
      yl = "1.26.15",
      bl = {
        init: function (e) {
          function t() {
            var e = vl.split(" "),
              t = "",
              r = {};
            return (
              il._.isArray(il.para.source_channel) &&
                il.para.source_channel.length > 0 &&
                ((e = e.concat(il.para.source_channel)), (e = il._.unique(e))),
              il._.each(e, function (e) {
                (t = il._.getQueryParam(location.href, e)),
                  t.length && (r[e] = t);
              }),
              r
            );
          }
          e &&
            !il &&
            ((il = e),
            il.registerInterceptor("businessStage", {
              getUtmData: {
                priority: 0,
                entry: function () {
                  return t();
                },
              },
            }));
        },
      },
      wl = Mn(bl, "Utm", "sdkAfterInitPara"),
      Sl = "1.26.15",
      kl = !1,
      Pl = null,
      Cl = {
        init: function (e) {
          (Pl = e),
            (Pl.disableSDK = Vn),
            (Pl.enableSDK = Wn),
            (Pl.getDisabled = zn);
        },
      },
      Ol = Fn(Cl, "DisableSDK", "sdkInitAPI"),
      jl = "1.26.15",
      Nl = {
        plugin_name: "DebugSender",
        init: function (e) {
          (al = e), (ol = al._), ti();
        },
      },
      Il = Gn(Nl),
      Tl = "1.26.15",
      Al = {
        plugin_name: "JsappSender",
        init: function (e) {
          (sl = e), (ll = sl._), oi();
        },
      },
      Dl = ii(Al),
      $l = "1.26.15",
      xl = null,
      El = {
        plugin_name: "BatchSender",
        init: function (e) {
          (ul = e), (cl = ul._), fi();
        },
      },
      Ll = ci(El),
      Ul = "1.26.15",
      Rl = {
        plugin_name: "BeaconSender",
        init: function (e) {
          (pl = e), (dl = pl._), bi();
        },
      },
      Bl = hi(Rl),
      Hl = "1.26.15",
      Jl = {
        plugin_name: "AjaxSender",
        init: function (e) {
          (fl = e), (gl = fl._), ji();
        },
      },
      Ml = ki(Jl),
      ql = "1.26.15",
      Kl = {
        plugin_name: "ImageSender",
        init: function (e) {
          (_l = e), (hl = _l._), Ei();
        },
      },
      Fl = Ti(Kl),
      Vl = null,
      Wl = null,
      zl = [],
      Xl = {
        init: function (e) {
          e &&
            ((Vl = e),
            (Wl = Vl._),
            Vl.logger && Vl.logger.appendWriter(Bi),
            Vl.on &&
              Vl.on("sdkAfterInitPara", function () {
                for (var e = 0; e < zl.length; e++) Hi(zl[e]);
                zl = null;
              }),
            Vl.on &&
              Vl.on("sdkInitAPI", function () {
                (Vl.enableLocalLog = Vi), (Vl.disableLocalLog = Wi);
              }));
        },
      },
      Zl = Ri(Xl, "ConsoleLogger"),
      Gl = "sensorsdata_jssdk_debug";
    Xi.modules = Xi.modules || {};
    for (
      var Ql = [
          Zl,
          Fo,
          Yo,
          ss,
          cs,
          As,
          xs,
          Us,
          Ms,
          Vs,
          Gs,
          tl,
          ml,
          wl,
          Ol,
          Il,
          Dl,
          Ll,
          Bl,
          Ml,
          Fl,
        ],
        Yl = [Zl, Mo, wl, Ol, Dl, Il, Yo, xs, ss, Us, Ll, Bl, Ml, Fl],
        eu = 0;
      eu < Ql.length;
      eu++
    ) {
      var tu = Ql[eu];
      Xi._.isString(tu.plugin_name)
        ? (Xi.modules[tu.plugin_name] = tu)
        : Xi._.isArray(tu.plugin_name) &&
          Xi._.each(tu.plugin_name, function (e) {
            Xi.modules[e] = tu;
          });
    }
    for (eu = 0; eu < Yl.length; eu++) Xi.use(Yl[eu]);
    var ru = Xi;
    try {
      "string" == typeof window.sensorsDataAnalytic201505
        ? ((Xi.para = window[sensorsDataAnalytic201505].para),
          (Xi._q = window[sensorsDataAnalytic201505]._q),
          (window[sensorsDataAnalytic201505] = Xi),
          (window.sensorsDataAnalytic201505 = Xi),
          Xi.init())
        : "undefined" == typeof window.sensorsDataAnalytic201505
          ? (window.sensorsDataAnalytic201505 = Xi)
          : (ru = window.sensorsDataAnalytic201505);
    } catch (nu) {
      Ae(nu);
    }
    var iu = ru;
    return iu;
  });
  