"use strict";
var sa = {},
    saPara = {
        name: "sensors",
        server_url: "",
        send_timeout: 1e3,
        show_log: !1,
        login_id_key: "$identity_login_id",
        allow_amend_share_path: !0,
        max_string_length: 500,
        datasend_timeout: 3e3,
        source_channel: [],
        autoTrack: {
            appLaunch: !0,
            appShow: !0,
            appHide: !0,
            pageShow: !0,
            pageShare: !0,
            mpClick: !1,
            mpFavorite: !0,
            pageLeave: !1
        },
        autotrack_exclude_page: {
            pageShow: [],
            pageLeave: []
        },
        is_persistent_save: {
            share: !1,
            utm: !1
        },
        preset_properties: {
            url_path: !0
        },
        preset_events: {
            moments_page: !1,
            defer_track: !1,
            share_info_use_string: !1
        },
        batch_send: !0,
        sdk_id: "",
        storage_store_key: "sensorsdata2015_wechat",
        storage_prepare_data_key: "sensors_mp_prepare_data"
    };

function log() {
    if (saPara.show_log && "object" == typeof console && console.log) try {
        return console.log.apply(console, arguments)
    } catch (e) {
        console.log(arguments[0])
    }
}
var nativeIsArray = Array.isArray,
    ObjProto = Object.prototype,
    ArrayProto = Array.prototype,
    nativeForEach = ArrayProto.forEach,
    nativeIndexOf = ArrayProto.indexOf,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty,
    slice = ArrayProto.slice;

function each(e, t, a) {
    if (null == e) return !1;
    var i = {};
    if (nativeForEach && e.forEach === nativeForEach) e.forEach(t, a);
    else if (e.length === +e.length) {
        for (var r = 0, n = e.length; r < n; r++)
            if (r in e && t.call(a, e[r], r, e) === i) return !1
    } else
        for (var s in e)
            if (hasOwnProperty.call(e, s) && t.call(a, e[s], s, e) === i) return !1
}

function isObject(e) {
    return null != e && "[object Object]" == toString.call(e)
}
var getRandomBasic = function() {
    var e = (new Date).getTime();
    return function(t) {
        return Math.ceil((e = (9301 * e + 49297) % 233280) / 233280 * t)
    }
}();

function getRandom() {
    if ("function" == typeof Uint32Array) {
        var e = "";
        if ("undefined" != typeof crypto ? e = crypto : "undefined" != typeof msCrypto && (e = msCrypto), isObject(e) && e.getRandomValues) {
            var t = new Uint32Array(1);
            return e.getRandomValues(t)[0] / Math.pow(2, 32)
        }
    }
    return getRandomBasic(1e19) / 1e19
}

function extend(e) {
    return each(slice.call(arguments, 1), function(t) {
        for (var a in t) void 0 !== t[a] && (e[a] = t[a])
    }), e
}

function extend2Lev(e) {
    return each(slice.call(arguments, 1), function(t) {
        for (var a in t) void 0 !== t[a] && null !== t[a] && (isObject(t[a]) && isObject(e[a]) ? extend(e[a], t[a]) : e[a] = t[a])
    }), e
}

function coverExtend(e) {
    return each(slice.call(arguments, 1), function(t) {
        for (var a in t) void 0 !== t[a] && void 0 === e[a] && (e[a] = t[a])
    }), e
}
var isArray = nativeIsArray || function(e) {
    return "[object Array]" === toString.call(e)
};

function isFunction(e) {
    if (!e) return !1;
    var t = Object.prototype.toString.call(e);
    return "[object Function]" == t || "[object AsyncFunction]" == t
}

function isArguments(e) {
    return !(!e || !hasOwnProperty.call(e, "callee"))
}

function toArray(e) {
    return e ? e.toArray ? e.toArray() : isArray(e) ? slice.call(e) : isArguments(e) ? slice.call(e) : values(e) : []
}

function values(e) {
    var t = [];
    return null == e ? t : (each(e, function(e) {
        t[t.length] = e
    }), t)
}

function include(e, t) {
    var a = !1;
    return null == e ? a : nativeIndexOf && e.indexOf === nativeIndexOf ? -1 != e.indexOf(t) : (each(e, function(e) {
        if (a || (a = e === t)) return {}
    }), a)
}

function trim(e) {
    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}

function isEmptyObject(e) {
    if (isObject(e)) {
        for (var t in e)
            if (hasOwnProperty.call(e, t)) return !1;
        return !0
    }
    return !1
}

function deepCopy(e) {
    var t = {};
    return function e(t, a) {
        for (var i in a) {
            var r = a[i];
            isArray(r) ? (t[i] = [], e(t[i], r)) : isObject(r) ? (t[i] = {}, e(t[i], r)) : t[i] = r
        }
    }(t, e), t
}

function isUndefined(e) {
    return void 0 === e
}

function isString(e) {
    return "[object String]" == toString.call(e)
}

function isDate(e) {
    return "[object Date]" == toString.call(e)
}

function isBoolean(e) {
    return "[object Boolean]" == toString.call(e)
}

function isNumber(e) {
    return "[object Number]" == toString.call(e) && /[\d\\.]+/.test(String(e))
}

function isJSONString(e) {
    try {
        JSON.parse(e)
    } catch (e) {
        return !1
    }
    return !0
}
var isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    },
    isSafeInteger = Number.isSafeInteger || function(e) {
        return isInteger(e) && Math.abs(e) <= Math.pow(2, 53) - 1
    },
    urlSafeBase64 = {
        ENC: {
            "+": "-",
            "/": "_",
            "=": "."
        },
        DEC: {
            "-": "+",
            _: "/",
            ".": "="
        },
        encode: function(e) {
            return e.replace(/[+\/=]/g, function(e) {
                return urlSafeBase64.ENC[e]
            })
        },
        decode: function(e) {
            return e.replace(/[-_.]/g, function(e) {
                return urlSafeBase64.DEC[e]
            })
        },
        trim: function(e) {
            return e.replace(/[.=]{1,2}$/, "")
        },
        isBase64: function(e) {
            return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e)
        },
        isUrlSafeBase64: function(e) {
            return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e)
        }
    },
    SOURCE_CHANNEL_STANDARD = "utm_source utm_medium utm_campaign utm_content utm_term",
    LATEST_SOURCE_CHANNEL = ["$latest_utm_source", "$latest_utm_medium", "$latest_utm_campaign", "$latest_utm_content", "$latest_utm_term", "$latest_sa_utm"],
    LATEST_SHARE_INFO = ["$latest_share_distinct_id", "$latest_share_url_path", "$latest_share_depth", "$latest_share_method"],
    SHARE_INFO_KEY = ["sensors_share_d", "sensors_share_p", "sensors_share_i", "sensors_share_m"],
    MP_FILTER_HOOK = {
        data: 1,
        onLoad: 1,
        onShow: 1,
        onReady: 1,
        onPullDownRefresh: 1,
        onShareAppMessage: 1,
        onShareTimeline: 1,
        onReachBottom: 1,
        onPageScroll: 1,
        onResize: 1,
        onTabItemTap: 1,
        onHide: 1,
        onUnload: 1
    },
    IDENTITY_KEY = {
        EMAIL: "$identity_email",
        MOBILE: "$identity_mobile",
        LOGIN: "$identity_login_id"
    },
    LIB_VERSION = "1.20.5",
    LIB_NAME = "MiniProgram",
    meta = {
        init_status: !1,
        life_state: {
            app_launched: !1
        },
        plugin: {
            init_list: [],
            uninitialized_list: []
        },
        privacy: {
            enable_data_collect: !1
        },
        initialState: {
            queue: [],
            isComplete: !1
        },
        preset_properties: {
            $lib: LIB_NAME,
            $lib_version: LIB_VERSION
        },
        promise_list: [],
        query_share_depth: 0,
        page_show_time: Date.now(),
        mp_show_time: null,
        share_distinct_id: "",
        share_method: "",
        current_scene: "",
        is_first_launch: !1,
        wx_sdk_version: "",
        global_title: {},
        page_route_map: []
    };

function getAppInfoSync() {
    if (wx.getAccountInfoSync) {
        var e = wx.getAccountInfoSync(),
            t = e && e.miniProgram ? e.miniProgram : {};
        return {
            appId: t.appId,
            appEnv: t.envVersion,
            appVersion: t.version
        }
    }
    return {}
}

function getAppId() {
    var e = getAppInfoSync();
    return e && e.appId ? e.appId : ""
}

function getOpenidNameByAppid() {
    var e = getAppId(),
        t = "$identity_mp_openid";
    return e && (t = "$identity_mp_" + e + "_openid"), t
}

function rot13defs(e) {
    return rot13obfs(e = String(e), 113)
}

function rot13obfs(e, t) {
    t = "number" == typeof t ? t : 13;
    for (var a = (e = String(e)).split(""), i = 0, r = a.length; i < r; i++) {
        a[i].charCodeAt(0) < 126 && (a[i] = String.fromCharCode((a[i].charCodeAt(0) + t) % 126))
    }
    return a.join("")
}
var hasOwnProperty$1 = Object.prototype.hasOwnProperty,
    store = {
        storageInfo: null,
        store_queue: [],
        getUUID: function() {
            return Date.now() + "-" + Math.floor(1e7 * getRandom()) + "-" + getRandom().toString(16).replace(".", "") + "-" + String(31242 * getRandom()).replace(".", "").slice(0, 8)
        },
        getStorage: function() {
            return this.storageInfo ? this.storageInfo : (this.storageInfo = sa._.getStorageSync(saPara.storage_store_key) || "", this.storageInfo)
        },
        _state: {},
        mem: {
            mdata: [],
            getLength: function() {
                return this.mdata.length
            },
            add: function(e) {
                this.mdata.push(e)
            },
            clear: function(e) {
                this.mdata.splice(0, e)
            }
        },
        toState: function(e) {
            var t = null,
                a = this;

            function i() {
                t.distinct_id ? a._state = t : a.set("distinct_id", a.getUUID())
            }
            isJSONString(e) ? (t = JSON.parse(e), i()) : isObject(e) ? (t = e, i()) : this.set("distinct_id", this.getUUID());
            var r = this._state._first_id || this._state.first_id,
                n = this._state._distinct_id || this._state.distinct_id,
                s = this._state.openid,
                o = (this._state.history_login_id ? this._state.history_login_id : {}).name;
            if (this._state.identities && isString(this._state.identities)) {
                var u = JSON.parse(rot13defs(this._state.identities));
                this._state.identities = u
            }
            var c, p, d = getOpenidNameByAppid();
            if (this._state.identities && isObject(this._state.identities) && !isEmptyObject(this._state.identities)) {
                var l = (c = getAppId(), p = "$mp_openid", c && (p = "$mp_" + c + "_openid"), p);
                hasOwnProperty$1.call(this._state.identities, "$mp_id") && (this._state.identities.$identity_mp_id = this._state.identities.$mp_id, delete this._state.identities.$mp_id), hasOwnProperty$1.call(this._state.identities, "$mp_unionid") && (this._state.identities.$identity_mp_unionid = this._state.identities.$mp_unionid, delete this._state.identities.$mp_unionid), hasOwnProperty$1.call(this._state.identities, l) && (this._state.identities[d] = this._state.identities[l], delete this._state.identities[l])
            } else this._state.identities = {}, this._state.identities.$identity_mp_id = this.getUUID();

            function _(e) {
                for (var t in store._state.identities) hasOwnProperty$1.call(store._state.identities, t) && "$identity_mp_id" !== t && t !== e && delete store._state.identities[t]
            }
            s && (this._state.identities[d] = s), r ? o && hasOwnProperty$1.call(this._state.identities, o) ? this._state.identities[o] !== n && (this._state.identities[o] = n, _(o), this._state.history_login_id.value = n) : (this._state.identities[IDENTITY_KEY.LOGIN] = n, _(IDENTITY_KEY.LOGIN), this._state.history_login_id = {
                name: IDENTITY_KEY.LOGIN,
                value: n
            }) : this._state.history_login_id = {
                name: "",
                value: ""
            }, this.save()
        },
        getFirstId: function() {
            return this._state._first_id || this._state.first_id
        },
        getDistinctId: function() {
            var e = this.getLoginDistinctId();
            return e || (this._state._distinct_id || this._state.distinct_id)
        },
        getUnionId: function() {
            var e = {},
                t = this._state._first_id || this._state.first_id,
                a = this.getDistinctId();
            return t && a ? (e.login_id = a, e.anonymous_id = t) : e.anonymous_id = a, e
        },
        getIdentities: function() {
            var e = JSON.parse(JSON.stringify(this._state.identities));
            return e.$identity_anonymous_id = this.getAnonymousId(), e
        },
        getAnonymousId: function() {
            return this.getUnionId().anonymous_id
        },
        getHistoryLoginId: function() {
            return isObject(this._state.history_login_id) ? this._state.history_login_id : null
        },
        getLoginDistinctId: function() {
            var e = this.getHistoryLoginId();
            return isObject(e) && e.value ? e.name !== IDENTITY_KEY.LOGIN ? e.name + "+" + e.value : e.value : null
        },
        getProps: function() {
            return this._state.props || {}
        },
        setProps: function(e, t) {
            var a = this._state.props || {};
            t ? this.set("props", e) : (extend(a, e), this.set("props", a))
        },
        set: function(e, t) {
            var a = {};
            for (var i in "string" == typeof e ? a[e] = t : "object" == typeof e && (a = e), this._state = this._state || {}, a) this._state[i] = a[i], "first_id" === i ? delete this._state._first_id : "distinct_id" === i && (delete this._state._distinct_id, sa.events.emit("changeDistinctId"));
            this.save()
        },
        identitiesSet: function(e) {
            var t = {};
            switch (e.type) {
                case "login":
                    t.$identity_mp_id = this._state.identities.$identity_mp_id, t[e.id_name] = e.id;
                    break;
                case "logout":
                    t.$identity_mp_id = this._state.identities.$identity_mp_id
            }
            this.set("identities", t)
        },
        change: function(e, t) {
            this._state["_" + e] = t
        },
        encryptStorage: function() {
            var e = this.getStorage(),
                t = "data:enc;";
            isObject(e) ? e = t + rot13obfs(JSON.stringify(e)) : isString(e) && -1 === e.indexOf(t) && (e = t + rot13obfs(e)), sa._.setStorageSync(saPara.storage_store_key, e)
        },
        save: function() {
            var e = deepCopy(this._state),
                t = rot13obfs(JSON.stringify(e.identities));
            if (e.identities = t, delete e._first_id, delete e._distinct_id, saPara.encrypt_storage) {
                e = "data:enc;" + rot13obfs(JSON.stringify(e))
            }
            sa._.setStorageSync(saPara.storage_store_key, e)
        },
        init: function() {
            var e = this.getStorage(),
                t = store.getUUID();
            if (e) isString(e) && -1 !== e.indexOf("data:enc;") && (e = e.substring("data:enc;".length), e = JSON.parse(rot13defs(e))), this.toState(e);
            else {
                meta.is_first_launch = !0;
                var a = new Date,
                    i = a.getTime();
                a.setHours(23), a.setMinutes(59), a.setSeconds(60), this.set({
                    distinct_id: t,
                    first_visit_time: i,
                    first_visit_day_time: a.getTime(),
                    identities: {
                        $identity_mp_id: t
                    },
                    history_login_id: {
                        name: "",
                        value: ""
                    }
                })
            }
            this.checkStoreInit()
        },
        checkStoreInit: function() {
            meta.init_status && (this.store_queue.length > 0 && each(this.store_queue, function(e) {
                sa[e.method].apply(sa, slice.call(e.params))
            }), this.store_queue = [])
        }
    };

function _decodeURIComponent(e) {
    var t = "";
    try {
        t = decodeURIComponent(e)
    } catch (a) {
        t = e
    }
    return t
}
var hasOwnProperty$2 = Object.prototype.hasOwnProperty,
    decodeURIComponent$1 = _decodeURIComponent;

function initAppGlobalName() {
    var e = App;
    App = function(t) {
        t[saPara.name] = sa, e.apply(this, arguments)
    }
}

function getPublicPresetProperties() {
    var e = getRefPage(),
        t = getCurrentPageInfo(),
        a = {
            $referrer: e.route,
            $referrer_title: e.title,
            $title: t.title,
            $url: t.url
        };
    return !0 === saPara.preset_properties.url_path && (a.$url_path = t.path), a
}

function encodeDates(e) {
    return each(e, function(t, a) {
        isDate(t) ? e[a] = formatDate(t) : isObject(t) && (e[a] = encodeDates(t))
    }), e
}

function formatDate(e) {
    function t(e) {
        return e < 10 ? "0" + e : e
    }
    return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
}

function searchObjDate(e) {
    (isObject(e) || isArray(e)) && each(e, function(t, a) {
        isObject(t) || isArray(t) ? searchObjDate(e[a]) : isDate(t) && (e[a] = formatDate(t))
    })
}

function formatString(e) {
    return e.length > saPara.max_string_length ? (log("\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--" + e), e.slice(0, saPara.max_string_length)) : e
}

function searchObjString(e) {
    isObject(e) && each(e, function(t, a) {
        isObject(t) ? searchObjString(e[a]) : isString(t) && (e[a] = formatString(t))
    })
}

function parseSuperProperties(e) {
    isObject(e) && each(e, function(t, a) {
        if (isFunction(t)) try {
            e[a] = t(), isFunction(e[a]) && (log("\u60a8\u7684\u5c5e\u6027- " + a + " \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete e[a])
        } catch (t) {
            delete e[a], log("\u60a8\u7684\u5c5e\u6027- " + a + " \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
        }
    })
}

function unique(e) {
    for (var t, a = [], i = {}, r = 0; r < e.length; r++)(t = e[r]) in i || (i[t] = !0, a.push(t));
    return a
}
var check = {
    checkKeyword: function(e) {
        return /^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i.test(e)
    },
    checkIdLength: function(e) {
        return !(String(e).length > 255) || (log("id \u957f\u5ea6\u8d85\u8fc7 255 \u4e2a\u5b57\u7b26\uff01"), !1)
    }
};

function strip_sa_properties(e) {
    return isObject(e) ? (each(e, function(t, a) {
        if (isArray(t)) {
            var i = [];
            each(t, function(e) {
                if (isString(e)) i.push(e);
                else if (isUndefined(e)) i.push("null");
                else try {
                    i.push(JSON.stringify(e))
                } catch (e) {
                    log("\u60a8\u7684\u6570\u636e - " + a + ":" + t + " - \u7684\u6570\u7ec4\u91cc\u7684\u503c\u6709\u9519\u8bef,\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
                }
            }), e[a] = i
        }
        if (isObject(t)) try {
            e[a] = JSON.stringify(t)
        } catch (i) {
            delete e[a], log("\u60a8\u7684\u6570\u636e - " + a + ":" + t + " - \u7684\u6570\u636e\u503c\u6709\u9519\u8bef,\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
        } else isString(t) || isNumber(t) || isDate(t) || isBoolean(t) || isArray(t) || (log("\u60a8\u7684\u6570\u636e - " + a + ":" + t + " - \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete e[a])
    }), e) : e
}

function strip_empty_properties(e) {
    var t = {};
    return each(e, function(e, a) {
        null == e && void 0 === e || (t[a] = e)
    }), t
}

function utf8Encode(e) {
    var t, a, i, r, n = "";
    for (t = a = 0, i = (e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, r = 0; r < i; r++) {
        var s = e.charCodeAt(r),
            o = null;
        s < 128 ? a++ : o = s > 127 && s < 2048 ? String.fromCharCode(s >> 6 | 192, 63 & s | 128) : String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128), null !== o && (a > t && (n += e.substring(t, a)), n += o, t = a = r + 1)
    }
    return a > t && (n += e.substring(t, e.length)), n
}

function base64Encode(e) {
    var t, a, i, r, n, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        o = 0,
        u = 0,
        c = "",
        p = [];
    if (!e) return e;
    e = utf8Encode(e);
    do {
        t = (n = e.charCodeAt(o++) << 16 | e.charCodeAt(o++) << 8 | e.charCodeAt(o++)) >> 18 & 63, a = n >> 12 & 63, i = n >> 6 & 63, r = 63 & n, p[u++] = s.charAt(t) + s.charAt(a) + s.charAt(i) + s.charAt(r)
    } while (o < e.length);
    switch (c = p.join(""), e.length % 3) {
        case 1:
            c = c.slice(0, -2) + "==";
            break;
        case 2:
            c = c.slice(0, -1) + "="
    }
    return c
}

function btoa(e) {
    for (var t, a, i, r, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = "", o = 0, u = (e = String(e)).length % 3; o < e.length;)((a = e.charCodeAt(o++)) > 255 || (i = e.charCodeAt(o++)) > 255 || (r = e.charCodeAt(o++)) > 255) && log("Failed to execute 'btoa' : The string to be encoded contains characters outside of the Latin1 range."), s += n.charAt((t = a << 16 | i << 8 | r) >> 18 & 63) + n.charAt(t >> 12 & 63) + n.charAt(t >> 6 & 63) + n.charAt(63 & t);
    return u ? s.slice(0, u - 3) + "===".substring(u) : s
}

function urlBase64Encode(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
        return String.fromCharCode("0x" + t)
    }))
}

function getCurrentPage() {
    var e = {};
    try {
        var t = getCurrentPages();
        e = t[t.length - 1]
    } catch (e) {
        log(e)
    }
    return e
}

function getCurrentPath() {
    var e = "\u672a\u53d6\u5230";
    try {
        var t = getCurrentPage();
        e = t ? t.route : e
    } catch (e) {
        log(e)
    }
    return e
}

function getIsFirstDay() {
    return !!("object" == typeof store._state && isNumber(store._state.first_visit_day_time) && store._state.first_visit_day_time > (new Date).getTime())
}

function getCurrentUrl(e) {
    var t = getCurrentPath(),
        a = "";
    return isObject(e) && e.sensors_mp_encode_url_query && (a = e.sensors_mp_encode_url_query), t ? a ? t + "?" + a : t : "\u672a\u53d6\u5230"
}

function getPath(e) {
    return e = isString(e) ? e.replace(/^\//, "") : "\u53d6\u503c\u5f02\u5e38"
}

function getCustomUtmFromQuery(e, t, a, i) {
    if (!isObject(e)) return {};
    var r = {};
    if (e.sa_utm)
        for (var n in e) "sa_utm" !== n ? include(saPara.source_channel, n) && (r[a + n] = e[n]) : r[i + n] = e[n];
    else
        for (var s in e) - 1 === (" " + SOURCE_CHANNEL_STANDARD + " ").indexOf(" " + s + " ") ? include(saPara.source_channel, s) && (r[a + s] = e[s]) : r[t + s] = e[s];
    return r
}

function getObjFromQuery(e) {
    var t = e.split("?"),
        a = [],
        i = {};
    return t && t[1] ? (each(t[1].split("&"), function(e) {
        (a = e.split("="))[0] && a[1] && (i[a[0]] = a[1])
    }), i) : {}
}

function setStorageSync(e, t) {
    var a = function() {
        wx.setStorageSync(e, t)
    };
    try {
        a()
    } catch (e) {
        log("set Storage fail --", e);
        try {
            a()
        } catch (e) {
            log("set Storage fail again --", e)
        }
    }
}

function getStorageSync(e) {
    var t = "";
    try {
        t = wx.getStorageSync(e)
    } catch (e) {
        log("getStorage fail")
    }
    return t
}

function getMPScene(e) {
    return isNumber(e) || isString(e) && "" !== e ? e = "wx-" + String(e) : "\u672a\u53d6\u5230\u503c"
}

function objToParam(e, t) {
    if (!isObject(e)) return log("\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61"), "";
    var a = [];
    for (var i in e)
        if (hasOwnProperty$2.call(e, i)) {
            var r = e[i];
            void 0 === r ? a.push(i + "=") : (r = t ? encodeURIComponent(r) : r, a.push(i + "=" + r))
        } return a.join("&")
}

function delObjectKey(e) {
    if (isObject(e))
        for (var t = 0; t < SHARE_INFO_KEY.length; t++) delete e[SHARE_INFO_KEY[t]];
    else log("\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61")
}

function shareInfoData(e) {
    var t = {},
        a = {};
    if (saPara.preset_events.share_info_use_string) {
        a = e.query;
        for (var i = 0; i < SHARE_INFO_KEY.length; i++) {
            if (!hasOwnProperty$2.call(a, SHARE_INFO_KEY[i])) return {};
            a[SHARE_INFO_KEY[i]] = _decodeURIComponent(a[SHARE_INFO_KEY[i]])
        }
        t = {
            depth: Number(a.sensors_share_d),
            path: a.sensors_share_p || "",
            id: a.sensors_share_i || "",
            method: a.sensors_share_m || ""
        }
    } else {
        if (!e.query.sampshare) return {};
        if (!isJSONString(a = _decodeURIComponent(e.query.sampshare))) return {};
        t = {
            depth: (a = JSON.parse(a)).d,
            path: a.p,
            id: a.i,
            method: a.m
        }
    }
    return t
}

function setShareInfo(e, t) {
    var a = {},
        i = {},
        r = store.getDistinctId(),
        n = store.getFirstId();
    if (e && isObject(e.query)) {
        if (isEmptyObject(a = shareInfoData(e))) return {};
        var s = a.depth,
            o = a.path,
            u = a.id,
            c = a.method
    }
    "string" == typeof u ? (t.$share_distinct_id = u, meta.share_distinct_id = u, i.$latest_share_distinct_id = u) : t.$share_distinct_id = "\u53d6\u503c\u5f02\u5e38", "number" == typeof s ? !meta.share_distinct_id || meta.share_distinct_id !== r && meta.share_distinct_id !== n ? !meta.share_distinct_id || meta.share_distinct_id === r && meta.share_distinct_id === n ? t.$share_depth = "-1" : (t.$share_depth = s + 1, meta.query_share_depth = s + 1, i.$latest_share_depth = s + 1) : (t.$share_depth = s, meta.query_share_depth = s, i.$latest_share_depth = s) : t.$share_depth = "-1", "string" == typeof o ? (t.$share_url_path = o, i.$latest_share_url_path = o) : t.$share_url_path = "\u53d6\u503c\u5f02\u5e38", "string" == typeof c ? (t.$share_method = c, i.$latest_share_method = c) : t.$share_method = "\u53d6\u503c\u5f02\u5e38", setLatestShare(i)
}

function getShareInfo() {
    if (saPara.preset_events.share_info_use_string) return objToParam({
        sensors_share_i: store.getDistinctId() || "\u53d6\u503c\u5f02\u5e38",
        sensors_share_p: getCurrentPath(),
        sensors_share_d: meta.query_share_depth,
        sensors_share_m: meta.share_method
    }, !0);
    var e = JSON.stringify({
        i: store.getDistinctId() || "\u53d6\u503c\u5f02\u5e38",
        p: getCurrentPath(),
        d: meta.query_share_depth,
        m: meta.share_method
    });
    return "sampshare=" + encodeURIComponent(e)
}

function detectOptionQuery(e) {
    if (!e || !isObject(e.query)) return {};
    var t, a, i, r, n = {};
    return n.query = extend({}, e.query), "string" == typeof n.query.scene && (t = n.query, a = ["utm_source", "utm_content", "utm_medium", "utm_campaign", "utm_term", "sa_utm"].concat(saPara.source_channel), i = new RegExp("(" + a.join("|") + ")%3D", "i"), 1 === (r = Object.keys(t)).length && "scene" === r[0] && i.test(t.scene)) && (n.scene = n.query.scene, delete n.query.scene), e.query.q && e.query.scancode_time && "101" === String(e.scene).slice(0, 3) && (n.q = String(n.query.q), delete n.query.q, delete n.query.scancode_time), n
}

function getMixedQuery(e) {
    var t = detectOptionQuery(e),
        a = t.scene,
        i = t.q,
        r = t.query;
    for (var n in r) r[n] = _decodeURIComponent(r[n]);
    return a && extend(r, getObjFromQuery(a = -1 !== (a = _decodeURIComponent(a)).indexOf("?") ? "?" + a.replace(/\?/g, "") : "?" + a)), i && extend(r, getObjFromQuery(_decodeURIComponent(i))), r
}

function setUtm(e, t) {
    var a = {},
        i = getMixedQuery(e),
        r = getCustomUtmFromQuery(i, "$", "_", "$"),
        n = getCustomUtmFromQuery(i, "$latest_", "_latest_", "$latest_");
    return a.pre1 = r, a.pre2 = n, extend(t, r), a
}

function setSfSource(e, t) {
    isEmptyObject(e.query) || e.query && e.query._sfs && (t.$sf_source = e.query._sfs, sa.registerApp({
        $latest_sf_source: t.$sf_source
    }))
}

function setPageSfSource(e) {
    try {
        var t = getCurrentPage(),
            a = deepCopy(t ? t.options : "");
        for (var i in a) a[i] = _decodeURIComponent(a[i]);
        !isEmptyObject(a) && a._sfs && (e.$sf_source = a._sfs)
    } catch (e) {
        log(e)
    }
}

function setRefPage() {
    var e = {
        route: "\u76f4\u63a5\u6253\u5f00",
        path: "\u76f4\u63a5\u6253\u5f00",
        title: ""
    };
    try {
        var t = getCurrentPage();
        if (t && t.route) {
            var a = t.sensors_mp_url_query ? "?" + t.sensors_mp_url_query : "",
                i = t.route,
                r = getPageTitle(i);
            e.route = i + a, e.path = i, e.title = r, meta.page_route_map.length >= 2 ? (meta.page_route_map.shift(), meta.page_route_map.push(e)) : meta.page_route_map.push(e)
        }
    } catch (e) {
        log(e)
    }
}

function getRefPage() {
    var e = {
        route: "\u76f4\u63a5\u6253\u5f00",
        path: "\u76f4\u63a5\u6253\u5f00",
        title: ""
    };
    return meta.page_route_map.length > 1 && (e.title = meta.page_route_map[0].title, e.route = meta.page_route_map[0].route, e.path = meta.page_route_map[0].path), e
}

function getCurrentPageInfo() {
    var e = getCurrentPage(),
        t = {
            title: "",
            url: "",
            path: "\u672a\u53d6\u5230"
        };
    if (e && e.route) {
        var a = e.sensors_mp_url_query ? "?" + e.sensors_mp_url_query : "";
        t.title = getPageTitle(e.route), t.url = e.route + a, t.path = e.route
    }
    return t
}

function setPageRefData(e, t, a) {
    var i = getRefPage();
    isObject(e) && (t ? meta.page_route_map.length > 0 && t ? (a = a ? "?" + a : "", e.$referrer = getPath(t) + a, e.$referrer_title = getPageTitle(t)) : (e.$referrer = "\u76f4\u63a5\u6253\u5f00", e.$referrer_title = "") : (e.$referrer = i.route, e.$referrer_title = i.title))
}

function getPageTitle(e) {
    if ("\u672a\u53d6\u5230" === e || !e) return "";
    var t = "";
    try {
        if (__wxConfig) {
            var a = __wxConfig,
                i = __wxConfig.page || {},
                r = i[e] || i[e + ".html"],
                n = {},
                s = {};
            if (a.global && a.global.window && a.global.window.navigationBarTitleText && (n.titleVal = a.global.window.navigationBarTitleText), r && r.window && r.window.navigationBarTitleText && (s.titleVal = r.window.navigationBarTitleText), !s.titleVal && __wxAppCode__) {
                var o = __wxAppCode__[e + ".json"];
                o && o.navigationBarTitleText && (s.titleVal = o.navigationBarTitleText)
            }
            if (each(meta.global_title, function(a, i) {
                    if (i === e) return t = a
                }), 0 === t.length) {
                var u = extend(n, s);
                t = u.titleVal || ""
            }
        }
    } catch (e) {
        log(e)
    }
    return t
}

function wxrequest(e) {
    if (compareSDKVersion(meta.wx_sdk_version, "2.10.0") >= 0) e.timeout = saPara.datasend_timeout, wx.request(e);
    else {
        var t = wx.request(e);
        setTimeout(function() {
            isObject(t) && isFunction(t.abort) && t.abort()
        }, saPara.datasend_timeout)
    }
}

function validId(e) {
    return "string" != typeof e && "number" != typeof e || "" === e ? (log("\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef"), !1) : "number" != typeof e || (e = String(e), /^\d+$/.test(e)) ? !!check.checkIdLength(e) && e : (log("\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef"), !1)
}

function compareSDKVersion(e, t) {
    e = e.split("."), t = t.split(".");
    for (var a = Math.max(e.length, t.length); e.length < a;) e.push("0");
    for (; t.length < a;) t.push("0");
    for (var i = 0; i < a; i++) {
        var r = parseInt(e[i]),
            n = parseInt(t[i]);
        if (r > n) return 1;
        if (r < n) return -1
    }
    return 0
}

function setUpperCase(e) {
    return isString(e) ? e.toLocaleUpperCase() : e
}

function setLatestChannel(e) {
    isEmptyObject(e) || (function(e, t) {
        var a = !1;
        for (var i in t) e[t[i]] && (a = !0);
        return a
    }(e, LATEST_SOURCE_CHANNEL) && (sa.clearAppRegister(LATEST_SOURCE_CHANNEL), sa.clearAllProps(LATEST_SOURCE_CHANNEL)), saPara.is_persistent_save.utm ? sa.register(e) : sa.registerApp(e))
}

function setLatestShare(e) {
    (e.$latest_share_depth || e.$latest_share_distinct_id || e.$latest_share_url_path || e.$latest_share_method) && (sa.clearAppRegister(LATEST_SHARE_INFO), sa.clearAllProps(LATEST_SHARE_INFO), saPara.is_persistent_save.share ? sa.register(e) : sa.registerApp(e))
}

function setQuery(e, t) {
    if (e && isObject(e) && !isEmptyObject(e)) {
        var a = [];
        return each(e, function(e, i) {
            "q" === i && isString(e) && 0 === e.indexOf("http") || (t ? a.push(i + "=" + e) : a.push(i + "=" + _decodeURIComponent(e)))
        }), a.join("&")
    }
    return ""
}

function setNavigationBarTitle() {
    try {
        var e = wx.setNavigationBarTitle;
        Object.defineProperty(wx, "setNavigationBarTitle", {
            get: function() {
                return function(t) {
                    var a = getCurrentPath();
                    t = isObject(t) ? t : {}, meta.global_title[a] = t.title, e.call(this, t)
                }
            }
        })
    } catch (e) {
        log(e)
    }
}

function getUtmFromPage() {
    var e = {};
    try {
        var t = deepCopy(getCurrentPage().options);
        for (var a in t) t[a] = _decodeURIComponent(t[a]);
        e = getCustomUtmFromQuery(t, "$", "_", "$")
    } catch (e) {
        log(e)
    }
    return e
}

function isNewLoginId(e, t) {
    return e !== store._state.history_login_id.name || store._state.history_login_id.value !== t
}

function isSameAndAnonymousID(e) {
    var t = store.getFirstId(),
        a = store.getDistinctId();
    return t ? e === t : e === a
}

function isPresetIdKeys(e, t) {
    var a = ["$identity_anonymous_id"];
    for (var i of (isArray(t) && (a = a.concat(t)), a))
        if (i === e) return !0;
    return !1
}

function encodeTrackData(e) {
    var t = base64Encode(e = JSON.stringify(e));
    return encodeURIComponent(t)
}

function setPublicProperties(e) {
    if (e && e.properties) {
        var t = getRefPage(),
            a = getCurrentPageInfo(),
            i = {
                $referrer: t.route,
                $referrer_title: t.title,
                $title: a.title,
                $url: a.url
            };
        for (var r in !0 === saPara.preset_properties.url_path && (i.$url_path = a.path), i) hasOwnProperty$2.call(e.properties, r) || (e.properties[r] = i[r])
    }
}

function networkStatusChange() {
    wx.onNetworkStatusChange(function(e) {
        sa.registerApp({
            $network_type: e.networkType || ""
        })
    })
}

function getNetworkType() {
    return new Promise((e, t) => {
        wx.getNetworkType({
            success: function(t) {
                meta.preset_properties.$network_type = setUpperCase(t.networkType), e()
            },
            fail: function(e) {
                log("\u83b7\u53d6\u7f51\u7edc\u4fe1\u606f\u5931\u8d25", e), t()
            }
        })
    })
}

function getSystemInfo() {
    var e = meta.preset_properties;
    return new Promise(t => {
        wx.getSystemInfo({
            success: function(a) {
                var i, r;
                e.$brand = setUpperCase(a.brand), e.$manufacturer = a.brand, e.$model = a.model, e.$screen_width = Number(a.screenWidth), e.$screen_height = Number(a.screenHeight), e.$os = (i = a.platform, "ios" === (r = i.toLowerCase()) ? "iOS" : "android" === r ? "Android" : i), e.$os_version = a.system.indexOf(" ") > -1 ? a.system.split(" ")[1] : a.system, meta.wx_sdk_version = a.SDKVersion, e.$mp_client_app_version = a.version, e.$mp_client_basic_library_version = meta.wx_sdk_version;
                var n = (new Date).getTimezoneOffset(),
                    s = getAppInfoSync();
                isNumber(n) && (e.$timezone_offset = n), s.appId && (e.$app_id = s.appId), s.appVersion && (e.$app_version = s.appVersion), t()
            }
        })
    })
}
var info = {
        currentProps: meta.preset_properties
    },
    logger = {
        info: function() {
            if (saPara.show_log && "object" == typeof console && console.log) try {
                if (3 === arguments.length) return console.log(arguments[0], arguments[1], arguments[2]);
                if (2 === arguments.length) return console.log(arguments[0], arguments[1]);
                if (1 === arguments.length) return console.log(arguments[0])
            } catch (e) {
                console.log(arguments[0])
            }
        }
    };

function isValidListener(e) {
    return "function" == typeof e || !(!e || "object" != typeof e) && isValidListener(e.listener)
}
class EventEmitterBase {
    constructor() {
        this._events = {}
    }
    on(e, t) {
        if (!e || !t) return !1;
        if (!isValidListener(t)) throw new Error("listener must be a function");
        this._events[e] = this._events[e] || [];
        var a = "object" == typeof t;
        return this._events[e].push(a ? t : {
            listener: t,
            once: !1
        }), this
    }
    prepend(e, t) {
        if (!e || !t) return !1;
        if (!isValidListener(t)) throw new Error("listener must be a function");
        this._events[e] = this._events[e] || [];
        var a = "object" == typeof t;
        return this._events[e].unshift(a ? t : {
            listener: t,
            once: !1
        }), this
    }
    prependOnce(e, t) {
        return this.prepend(e, {
            listener: t,
            once: !0
        })
    }
    once(e, t) {
        return this.on(e, {
            listener: t,
            once: !0
        })
    }
    off(e, t) {
        var a = this._events[e];
        if (!a) return !1;
        if ("number" == typeof t) a.splice(t, 1);
        else if ("function" == typeof t)
            for (var i = 0, r = a.length; i < r; i++) a[i] && a[i].listener === t && a.splice(i, 1);
        return this
    }
    emit(e, t) {
        var a = this._events[e];
        if (!a) return !1;
        for (var i = 0; i < a.length; i++) {
            var r = a[i];
            r && (r.listener.call(this, t || {}), r.once && this.off(e, i))
        }
        return this
    }
    removeAllListeners(e) {
        e && this._events[e] ? this._events[e] = [] : this._events = {}
    }
    listeners(e) {
        return e && "string" == typeof e ? this._events[e] : this._events
    }
}
class EventEmitterEx extends EventEmitterBase {
    constructor() {
        super(), this.cacheEvents = [], this.maxLen = 20
    }
    replay(e, t) {
        this.on(e, t), this.cacheEvents.length > 0 && this.cacheEvents.forEach(function(a) {
            a.type === e && t.call(null, a.data)
        })
    }
    emit(e, t) {
        super.emit.apply(this, arguments), this.cacheEvents.push({
            type: e,
            data: t
        }), this.cacheEvents.length > this.maxLen && this.cacheEvents.shift()
    }
}
var _ = Object.freeze({
    __proto__: null,
    decodeURIComponent: decodeURIComponent$1,
    encodeDates: encodeDates,
    formatDate: formatDate,
    searchObjDate: searchObjDate,
    formatString: formatString,
    searchObjString: searchObjString,
    parseSuperProperties: parseSuperProperties,
    unique: unique,
    check: check,
    getUtmFromPage: getUtmFromPage,
    setQuery: setQuery,
    setLatestShare: setLatestShare,
    setLatestChannel: setLatestChannel,
    setUpperCase: setUpperCase,
    compareSDKVersion: compareSDKVersion,
    validId: validId,
    wxrequest: wxrequest,
    getPageTitle: getPageTitle,
    setPageRefData: setPageRefData,
    getCurrentPageInfo: getCurrentPageInfo,
    getRefPage: getRefPage,
    setRefPage: setRefPage,
    setPageSfSource: setPageSfSource,
    setSfSource: setSfSource,
    setUtm: setUtm,
    getMixedQuery: getMixedQuery,
    detectOptionQuery: detectOptionQuery,
    getShareInfo: getShareInfo,
    setShareInfo: setShareInfo,
    shareInfoData: shareInfoData,
    delObjectKey: delObjectKey,
    objToParam: objToParam,
    getMPScene: getMPScene,
    getStorageSync: getStorageSync,
    setStorageSync: setStorageSync,
    getObjFromQuery: getObjFromQuery,
    getCustomUtmFromQuery: getCustomUtmFromQuery,
    getPath: getPath,
    getCurrentUrl: getCurrentUrl,
    getIsFirstDay: getIsFirstDay,
    getCurrentPath: getCurrentPath,
    getCurrentPage: getCurrentPage,
    urlBase64Encode: urlBase64Encode,
    btoa: btoa,
    base64Encode: base64Encode,
    strip_empty_properties: strip_empty_properties,
    strip_sa_properties: strip_sa_properties,
    setNavigationBarTitle: setNavigationBarTitle,
    networkStatusChange: networkStatusChange,
    getNetworkType: getNetworkType,
    getSystemInfo: getSystemInfo,
    encodeTrackData: encodeTrackData,
    initAppGlobalName: initAppGlobalName,
    getPublicPresetProperties: getPublicPresetProperties,
    setPublicProperties: setPublicProperties,
    isPresetIdKeys: isPresetIdKeys,
    isNewLoginId: isNewLoginId,
    isSameAndAnonymousID: isSameAndAnonymousID,
    info: info,
    logger: logger,
    getAppId: getAppId,
    getAppInfoSync: getAppInfoSync,
    getOpenidNameByAppid: getOpenidNameByAppid,
    rot13defs: rot13defs,
    rot13obfs: rot13obfs,
    each: each,
    isObject: isObject,
    getRandom: getRandom,
    extend: extend,
    extend2Lev: extend2Lev,
    coverExtend: coverExtend,
    isArray: isArray,
    isFunction: isFunction,
    isArguments: isArguments,
    toArray: toArray,
    values: values,
    include: include,
    trim: trim,
    isEmptyObject: isEmptyObject,
    deepCopy: deepCopy,
    isUndefined: isUndefined,
    isString: isString,
    isDate: isDate,
    isBoolean: isBoolean,
    isNumber: isNumber,
    isJSONString: isJSONString,
    isInteger: isInteger,
    isSafeInteger: isSafeInteger,
    slice: slice,
    urlSafeBase64: urlSafeBase64,
    EventEmitterBase: EventEmitterBase,
    EventEmitterEx: EventEmitterEx,
    log: log
});

function onEventSend() {
    return {}
}

function processData(e) {
    return e
}

function batchTrackData(e) {
    var t = Date.now();
    return e.forEach(function(e) {
        e._flush_time = t
    }), "data_list=" + encodeTrackData(e)
}
var mergeStorageData = {
    getData: function(e) {
        wx.getStorage({
            key: saPara.storage_prepare_data_key,
            complete: function(t) {
                var a = t.data && isArray(t.data) ? t.data : [];
                mergeStorageData.deleteAesData(a), e && e()
            }
        })
    },
    deleteAesData: function(e) {
        var t = [],
            a = e.length;
        if (a > 0) {
            for (var i = 0; i < a; i++) isObject(e[i]) && t.push(e[i]);
            store.mem.mdata = t.concat(store.mem.mdata)
        }
    }
};

function onceTrackData(e) {
    return "data=" + encodeTrackData(e)
}
var kit = {};

function setKitTitle(e) {
    if (!isString(e)) return !1;
    var t = meta.page_route_map.length - 1;
    t >= 0 && (meta.page_route_map[t].title = e)
}
kit.setData = function(e) {
    if (!isObject(e)) return !1;
    e.current_title && setKitTitle(e.current_title)
}, kit.processData = processData, kit.onceTrackData = onceTrackData, kit.batchTrackData = batchTrackData, kit.onEventSend = onEventSend;
var sendStrategy = {
    dataHasSend: !0,
    dataHasChange: !1,
    syncStorage: !1,
    failTime: 0,
    init: function() {
        this.sendHasInit = !0, mergeStorageData.getData(sendStrategy.syncStorageState.bind(sendStrategy)), this.batchInterval(), this.onAppHide()
    },
    syncStorageState: function() {
        this.syncStorage = !0
    },
    onAppHide: function() {
        var e = this;
        wx.onAppHide(function() {
            saPara.batch_send && e.batchSend()
        })
    },
    send: function(e) {
        this.dataHasChange = !0, store.mem.getLength() >= 500 && (log("storage data is too large"), store.mem.mdata.shift()), (e = kit.processData(e)) && store.mem.add(e), this.sendAsOver()
    },
    sendAsOver: function() {
        this.sendHasInit && store.mem.getLength() >= saPara.batch_send.max_length && this.batchSend()
    },
    wxrequest: function(e) {
        if (isArray(e.data) && e.data.length > 0) {
            var t = kit.batchTrackData(e.data);
            sa._.wxrequest({
                url: saPara.server_url,
                method: "POST",
                dataType: "text",
                data: t,
                header: {
                    "content-type": "text/plain"
                },
                success: function() {
                    e.success(e.len)
                },
                fail: function() {
                    e.fail()
                }
            })
        } else e.success(e.len)
    },
    batchSend: function() {
        if (this.dataHasSend) {
            var e, t, a = store.mem.mdata;
            (t = (e = a.length >= 100 ? a.slice(0, 100) : a).length) > 0 && (this.dataHasSend = !1, this.wxrequest({
                data: e,
                len: t,
                success: this.batchRemove.bind(this),
                fail: this.sendFail.bind(this)
            }))
        }
    },
    sendFail: function() {
        this.dataHasSend = !0, this.failTime++
    },
    batchRemove: function(e) {
        store.mem.clear(e), this.dataHasSend = !0, this.dataHasChange = !0, this.batchWrite(), this.failTime = 0
    },
    is_first_batch_write: !0,
    batchWrite: function() {
        this.dataHasChange && (this.dataHasChange = !1, this.syncStorage && sa._.setStorageSync(saPara.storage_prepare_data_key, store.mem.mdata))
    },
    batchInterval: function() {
        var e = this;
        ! function t() {
            setTimeout(function() {
                e.batchWrite(), t()
            }, 500)
        }(),
        function t() {
            setTimeout(function() {
                e.batchSend(), t()
            }, saPara.batch_send.send_timeout * Math.pow(2, e.failTime))
        }()
    }
};

function onceSend(e) {
    e._flush_time = Date.now();
    var t = kit.onceTrackData(e),
        a = saPara.server_url + "?" + t; - 1 !== saPara.server_url.indexOf("?") && (a = saPara.server_url + "&" + t), wxrequest({
        url: a,
        method: "GET"
    })
}

function buildData(e, t) {
    var a = {
        distinct_id: sa.store.getDistinctId(),
        identities: extend({}, sa.store.getIdentities()),
        lib: {
            $lib: LIB_NAME,
            $lib_method: "code",
            $lib_version: LIB_VERSION
        },
        properties: {}
    };
    return isObject(t) || (t = {}), "track_id_unbind" === e.type && "$UnbindID" === e.event && (a.identities = deepCopy(e.unbind_value), delete e.unbind_value), extend(a, sa.store.getUnionId(), e), isObject(e.properties) && !isEmptyObject(e.properties) && extend(a.properties, e.properties), "track_id_unbind" === e.type && "$UnbindID" === e.event && (a.login_id && delete a.login_id, a.anonymous_id && delete a.anonymous_id), e.type && "profile" === e.type.slice(0, 7) || (a._track_id = Number(String(getRandom()).slice(2, 5) + String(getRandom()).slice(2, 4) + String(Date.now()).slice(-4)), a.properties = extend({}, getPublicPresetProperties(), meta.preset_properties, sa.store.getProps(), t, a.properties), "track" === e.type && (a.properties.$is_first_day = getIsFirstDay())), a.properties.$time && isDate(a.properties.$time) ? (a.time = 1 * a.properties.$time, delete a.properties.$time) : a.time = 1 * new Date, sa.ee.sdk.emit("createData", a), sa.ee.sdk.emit("beforeBuildCheck", a), sa.ee.data.emit("beforeBuildCheck", a), parseSuperProperties(a.properties), searchObjDate(a), strip_sa_properties(a.properties), searchObjString(a), sa.ee.data.emit("finalAdjustData", a), a
}

function dataStage(e) {
    if (!saPara.server_url) return !1;
    if (meta.current_scene && 1154 === meta.current_scene && !sa.para.preset_events.moments_page) return !1;
    var t = sa._.deepCopy(e),
        a = buildData(e, kit.onEventSend(t));
    a ? (log(a), sa.events.emit("send", a), sa.para.batch_send ? sendStrategy.send(a) : onceSend(a)) : log("error: \u6570\u636e\u5f02\u5e38 " + a)
}
sa.popupEmitter = {
    attached: function() {
        return !1
    }
};
var usePlugin = function(e, t) {
        if (!isObject(e) && !isFunction(e)) return log("plugin must be an object", e), !1;
        if (isFunction(e.init) || log("plugin maybe missing init method", e.plugin_name || e), isString(e.plugin_name) && e.plugin_name ? sa.modules[e.plugin_name] ? e = sa.modules[e.plugin_name] : sa.modules[e.plugin_name] = e : log("plugin_name is not defined - ", e.plugin_name || e), isObject(e) && !0 === e.plugin_is_init) return e;
        if (isObject(e) && e.plugin_name && (isString(e.plugin_version) && e.plugin_version === LIB_VERSION || log("warning!" + e.plugin_name + " plugin version do not match SDK version \uff01\uff01\uff01")), meta.init_status) "function" == typeof e.init && (e.init(sa, t), e.plugin_is_init = !0, log(e.plugin_name + " plugin is initialized"));
        else {
            var a = {
                target: e,
                para: t
            };
            meta.plugin.uninitialized_list.push(a)
        }
        return e
    },
    checkPluginInitStatus = function() {
        if (meta.plugin.uninitialized_list.length > 0) {
            for (var e in meta.plugin.uninitialized_list) {
                var t = meta.plugin.uninitialized_list[e];
                t && t.target && "function" == typeof t.target.init && !t.target.plugin_is_init && (t.target.init(sa, t.para), isObject(t.target) && (t.target.plugin_is_init = !0, isString(t.target.plugin_name) && t.target.plugin_name && log(t.target.plugin_name + " plugin is initialized")))
            }
            meta.plugin.uninitialized_list = []
        }
    };

function initAppShowHide() {
    wx.onAppShow(function(e) {
        if (!meta.life_state.app_launched) {
            var t = wx.getLaunchOptionsSync() || {};
            sa.autoTrackCustom.appLaunch(t)
        }
        sa.autoTrackCustom.appShow(e)
    }), wx.onAppHide(function() {
        sa.autoTrackCustom.appHide()
    })
}

function checkAppLaunch() {
    if (!meta.life_state.app_launched) {
        var e = wx.getLaunchOptionsSync() || {};
        sa.autoTrackCustom.appLaunch(e)
    }
}

function mpProxy(e, t, a) {
    var i = sa.autoTrackCustom[a];
    if (e[t]) {
        var r = e[t];
        e[t] = function() {
            !sa.para.autoTrackIsFirst || isObject(sa.para.autoTrackIsFirst) && !sa.para.autoTrackIsFirst[a] ? (r.apply(this, arguments), i.apply(this, arguments)) : (!0 === sa.para.autoTrackIsFirst || isObject(sa.para.autoTrackIsFirst) && sa.para.autoTrackIsFirst[a]) && (i.apply(this, arguments), r.apply(this, arguments)), sa.ee.page.emit(a)
        }
    } else e[t] = function() {
        i.apply(this, arguments), sa.ee.page.emit(a)
    }
}

function clickTrack(e) {
    var t, a = {},
        i = {},
        r = e.currentTarget || {},
        n = e.target || {};
    if (isObject(sa.para.framework) && isObject(sa.para.framework.taro) && !sa.para.framework.taro.createApp && n.id && r.id && n.id !== r.id) return !1;
    var s = r.dataset || {};
    if (t = e.type, a.$element_id = r.id, a.$element_type = s.type, a.$element_content = s.content, a.$element_name = s.name, isObject(e.event_prop) && (i = e.event_prop), t && isClick(t)) {
        if (sa.para.preset_events && sa.para.preset_events.collect_element && !1 === sa.para.preset_events.collect_element(arguments[0])) return !1;
        a.$url_path = sa._.getCurrentPath(), sa._.setPageRefData(a), a = sa._.extend(a, i), sa.track("$MPClick", a)
    }
}

function clickProxy(e, t) {
    var a = e[t];
    e[t] = function() {
        var e = a.apply(this, arguments),
            t = arguments[0];
        return isObject(t) && (sa.para.preset_events.defer_track ? setTimeout(function() {
            clickTrack(t)
        }, 0) : clickTrack(t)), e
    }
}

function isClick(e) {
    return !!{
        tap: 1,
        longpress: 1,
        longtap: 1
    } [e]
}

function tabProxy(e) {
    var t = e.onTabItemTap;
    e.onTabItemTap = function(e) {
        t && t.apply(this, arguments);
        var a = {};
        e && (a.$element_content = e.text), a.$element_type = "tabBar", a.$url_path = sa._.getCurrentPath(), sa._.setPageRefData(a), sa.track("$MPClick", a)
    }
}

function getMethods(e) {
    var t = MP_FILTER_HOOK,
        a = [];
    for (var i in e) "function" != typeof e[i] || t[i] || a.push(i);
    return a
}

function initPageProxy() {
    var e = Page;
    Page = function(t) {
        try {
            t || (t = {}), monitorClick(t), monitorHooks(t), e.apply(this, arguments)
        } catch (t) {
            e.apply(this, arguments)
        }
    };
    var t = Component;
    Component = function(e) {
        try {
            e || (e = {}), e.methods || (e.methods = {}), monitorClick(e.methods), monitorHooks(e.methods), t.apply(this, arguments)
        } catch (e) {
            t.apply(this, arguments)
        }
    }
}

function monitorClick(e) {
    var t = [];
    if (sa.para.autoTrack && sa.para.autoTrack.mpClick) {
        t = getMethods(e), tabProxy(e);
        for (var a = t.length, i = 0; i < a; i++) clickProxy(e, t[i])
    }
}

function monitorHooks(e) {
    mpProxy(e, "onLoad", "pageLoad"), mpProxy(e, "onShow", "pageShow"), mpProxy(e, "onHide", "pageHide"), mpProxy(e, "onUnload", "pageHide"), mpProxy(e, "onAddToFavorites", "pageAddFavorites"), "function" == typeof e.onShareAppMessage && sa.autoTrackCustom.pageShare(e), "function" == typeof e.onShareTimeline && sa.autoTrackCustom.pageShareTimeline(e)
}
var eventEmitter = function() {
    this.sub = []
};
eventEmitter.prototype = {
    add: function(e) {
        this.sub.push(e)
    },
    emit: function(e, t) {
        this.sub.forEach(function(a) {
            a.on(e, t)
        })
    }
};
var eventSub = function(e) {
    sa.events.add(this), this._events = [], this.handle = e, this.ready = !1
};
eventSub.prototype = {
    on: function(e, t) {
        if (this.ready) {
            if (isFunction(this.handle)) try {
                this.handle(e, t)
            } catch (e) {
                log(e)
            }
        } else this._events.push({
            event: e,
            data: t
        })
    },
    isReady: function() {
        var e = this;
        e.ready = !0, e._events.forEach(function(t) {
            if (isFunction(e.handle)) try {
                e.handle(t.event, t.data)
            } catch (e) {
                log(e)
            }
        })
    }
};
var ee = {};

function checkPrivacyStatus() {
    var e;
    return global && global.sensors_data_pre_config && (e = !!global.sensors_data_pre_config.is_compliance_enabled && global.sensors_data_pre_config.is_compliance_enabled), !e || (!!meta.init_status || !!meta.privacy.enable_data_collect)
}

function enableDataCollect() {
    meta.privacy.enable_data_collect = !0
}

function apiStaging() {
    each(["resetAnonymousIdentity", "setProfile", "setOnceProfile", "track", "quick", "incrementProfile", "appendProfile", "login", "logout", "registerApp", "register", "clearAllRegister", "clearAllProps", "clearAppRegister", "bind", "unbind", "unsetOpenid", "setUnionid", "unsetUnionid", "bindOpenid", "unbindOpenid", "bindUnionid", "unbindUnionid"], function(e) {
        var t = sa[e];
        sa[e] = function() {
            return !!checkPrivacyStatus() && ((!isFunction(sa.getDisabled) || !sa.getDisabled()) && void(meta.initialState.isComplete ? t.apply(sa, arguments) : meta.initialState.queue.push([e, arguments])))
        }
    })
}

function registerApp(e) {
    isObject(e) && !isEmptyObject(e) && (meta.preset_properties = extend(meta.preset_properties, e))
}

function register(e) {
    isObject(e) && !isEmptyObject(e) && store.setProps(e)
}

function clearAllRegister() {
    store.setProps({}, !0)
}

function clearAppRegister(e) {
    isArray(e) && each(meta.preset_properties, function(t, a) {
        include(e, a) && delete meta.preset_properties[a]
    })
}

function clearAllProps(e) {
    var t = store.getProps(),
        a = {};
    isArray(e) && (each(t, function(t, i) {
        include(e, i) || (a[i] = t)
    }), store.setProps(a, !0))
}
ee.sdk = new EventEmitterEx, ee.data = new EventEmitterEx, ee.page = new EventEmitterEx;
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;

function setProfile(e, t) {
    dataStage({
        type: "profile_set",
        properties: e
    })
}

function setOnceProfile(e, t) {
    dataStage({
        type: "profile_set_once",
        properties: e
    })
}

function appendProfile(e, t) {
    if (!isObject(e)) return !1;
    each(e, function(t, a) {
        isString(t) ? e[a] = [t] : isArray(t) ? e[a] = t : (delete e[a], log("appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"))
    }), dataStage({
        type: "profile_append",
        properties: e
    })
}

function incrementProfile(e, t) {
    if (!isObject(e)) return !1;
    var a = e;
    isString(e) && ((e = {})[a] = 1), dataStage({
        type: "profile_increment",
        properties: e
    })
}

function track(e, t, a) {
    dataStage({
        type: "track",
        event: e,
        properties: t
    })
}

function identify(e) {
    if (!checkPrivacyStatus()) return !1;
    if (!meta.init_status) return store.store_queue.push({
        method: "identify",
        params: arguments
    }), !1;
    (e = validId(e)) && (store.getFirstId() ? store.set("first_id", e) : store.set("distinct_id", e))
}

function resetAnonymousIdentity(e) {
    if (store.getFirstId()) return log("resetAnonymousIdentity must be used in a logout state \uff01"), !1;
    if ("number" == typeof e && (e = String(e)), void 0 === e) {
        var t = store.getUUID();
        store._state.identities.$identity_mp_id = t, store.set("distinct_id", t)
    } else validId(e) && (store._state.identities.$identity_mp_id = e, store.set("distinct_id", e))
}

function trackSignup(e, t, a, i) {
    var r, n, s, o;
    isObject(e) ? (r = e.id, n = e.event_name, s = e.id_name) : (r = e, n = t), store.set("distinct_id", r), o = s && s !== IDENTITY_KEY.LOGIN ? s + "+" + r : r, dataStage({
        original_id: store.getFirstId() || store.getDistinctId(),
        distinct_id: o,
        login_id: o,
        type: "track_signup",
        event: n,
        properties: a
    })
}

function login(e) {
    if (!(e = validId(e))) return !1;
    if (isSameAndAnonymousID(e)) return !1;
    var t = store.getFirstId(),
        a = store.getDistinctId(),
        i = IDENTITY_KEY.LOGIN;
    isNewLoginId(i, e) && (store._state.identities[i] = e, store.set("history_login_id", {
        name: i,
        value: e
    }), t || store.set("first_id", a), sa.trackSignup({
        id: e,
        event_name: "$SignUp"
    }), store.identitiesSet({
        type: "login",
        id: e,
        id_name: i
    }))
}

function loginWithKey(e, t) {
    if (log("loginWithKey is deprecated !!!"), !isString(e)) return log("Key must be String"), !1;
    if (!check.checkKeyword(e) && e.length > 100) log("Key [" + e + "] is invalid");
    else if (!check.checkKeyword(e)) return log("Key [" + e + "] is invalid"), !1;
    if (isPresetIdKeys(e, ["$mp_openid", "$identity_mp_openid", "$identity_mp_unionid", "$mp_unionid", "$mp_id", "$identity_mp_id"])) return log("Key [" + e + "] is invalid"), !1;
    if (!(t = validId(t))) return !1;
    if (isSameAndAnonymousID(t)) return !1;
    var a = store.getFirstId(),
        i = store.getDistinctId();
    isNewLoginId(e, t) && (store._state.identities[e] = t, store.set("history_login_id", {
        name: e,
        value: t
    }), a || store.set("first_id", i), sa.trackSignup({
        id: t,
        event_name: "$SignUp",
        id_name: e
    }), store.identitiesSet({
        type: "login",
        id: t,
        id_name: e
    }))
}

function getAnonymousID() {
    if (!isEmptyObject(store._state)) return store._state._first_id || store._state.first_id || store._state._distinct_id || store._state.distinct_id;
    log("\u8bf7\u5148\u521d\u59cb\u5316SDK")
}

function getIdentities() {
    return isEmptyObject(store._state) ? (log("\u8bf7\u5148\u521d\u59cb\u5316SDK"), null) : store.getIdentities() || null
}

function logout(e) {
    var t = store.getFirstId();
    store.identitiesSet({
        type: "logout"
    }), store.set("history_login_id", {
        name: "",
        value: ""
    }), t ? (store.set("first_id", ""), !0 === e ? store.set("distinct_id", store.getUUID()) : store.set("distinct_id", t)) : log("\u6ca1\u6709first_id\uff0clogout\u5931\u8d25")
}

function getPresetProperties() {
    if (meta.preset_properties && meta.preset_properties.$lib) {
        var e = {};
        each(meta.preset_properties, function(t, a) {
            0 === a.indexOf("$") && (e[a] = t)
        });
        var t = {
                $url_path: getCurrentPath(),
                $is_first_day: getIsFirstDay(),
                $is_first_time: meta.is_first_launch
            },
            a = extend(e, t, meta.preset_properties, store.getProps());
        return delete a.$lib, a
    }
    return {}
}

function setOpenid(e, t) {
    if (log("setOpenid is deprecated !!!"), !(e = validId(e))) return !1;
    if (!checkPrivacyStatus()) return !1;
    if (!meta.init_status) return store.store_queue.push({
        method: "setOpenid",
        params: arguments
    }), !1;
    log("\u8be5\u65b9\u6cd5\u5df2\u4e0d\u5efa\u8bae\u4f7f\u7528\uff0c\u5982\u679c\u662f id2 \u7528\u6237\uff0c\u8bf7\u4f7f\u7528 identify \u4ee3\u66ff\uff0c\u5982\u679c\u662f id3 \u7528\u6237\uff0c\u8bf7\u4f7f\u7528 bindOpenid \u4ee3\u66ff"), t && log("%c \u5f53\u524d\u7248\u672c setOpenid \u63a5\u53e3 \u5df2\u4e0d\u652f\u6301\u4f20\u5165\u7b2c\u4e8c\u4e2a\u53c2\u6570", "color:#F39C12;font-size: 14px;"), store.set("openid", e), sa.identify(e);
    var a = getOpenidNameByAppid();
    store._state.identities[a] = e, store.save()
}

function unsetOpenid(e) {
    log("unsetOpenid \u8be5\u65b9\u6cd5\u5df2\u4e0d\u5efa\u8bae\u4f7f\u7528\uff0c\u5982\u679c\u662f id3 \u7528\u6237\uff0c\u8bf7\u4f7f\u7528 unbindOpenid \u4ee3\u66ff");
    var t = validId(e);
    if (!t) return !1;
    var a = store._state.openid;
    a === t && store.set("openid", "");
    var i = getOpenidNameByAppid();
    if (hasOwnProperty$3.call(store._state.identities, i) && t === store._state.identities[i]) {
        delete store._state.identities[i];
        var r = store.getFirstId(),
            n = store.getDistinctId(),
            s = store._state && store._state.identities && store._state.identities.$identity_mp_id;
        r && r === a && s && store.change("first_id", s), n && n === a && s && store.change("distinct_id", s), store.save()
    }
}

function bindOpenid(e) {
    if (!(e = validId(e))) return !1;
    var t = getOpenidNameByAppid();
    this.bind(t, e)
}

function unbindOpenid(e) {
    if (!validId(e)) return !1;
    var t = getOpenidNameByAppid();
    this.unbind(t, e)
}

function setUnionid(e) {
    log("setUnionid is deprecated !!!");
    var t = validId(e);
    t && bind("$identity_mp_unionid", t)
}

function unsetUnionid(e) {
    log("unsetUnionid is deprecated !!!");
    var t = validId(e);
    if (t) {
        if (hasOwnProperty$3.call(store._state.identities, "$identity_mp_unionid") && t === store._state.identities.$identity_mp_unionid) {
            var a = getOpenidNameByAppid();
            hasOwnProperty$3.call(store._state.identities, a) && (delete store._state.identities[a], delete store._state.openid, store.save())
        }
        unbind("$identity_mp_unionid", t)
    }
}

function initWithOpenid(e, t) {
    log("initWithOpenid is deprecated !!!"), (e = e || {}).appid && (saPara.appid = e.appid), sa.openid.getOpenid(function(a) {
        a && sa.setOpenid(a, e.isCoverLogin), t && isFunction(t) && t(a), sa.init(e)
    })
}

function bind(e, t) {
    if (isNumber(t)) {
        if (isInteger(t) && !1 === isSafeInteger(t)) return log("Value must be String"), !1;
        t = String(t)
    }
    if (!isString(e)) return log("Key must be String"), !1;
    var a = store.getHistoryLoginId(),
        i = a ? a.name : "";
    return !check.checkKeyword(e) || isPresetIdKeys(e, [IDENTITY_KEY.LOGIN, i, "$mp_id", "$identity_mp_id"]) ? (log("Key [" + e + "] is invalid"), !1) : t && "" !== t ? isString(t) ? !!check.checkIdLength(t) && (store._state.identities[e] = t, store.save(), void dataStage({
        type: "track_id_bind",
        event: "$BindID"
    })) : (log("Value must be String"), !1) : (log("Value is empty or null"), !1)
}

function unbind(e, t) {
    if (isNumber(t)) {
        if (isInteger(t) && !1 === isSafeInteger(t)) return log("Value must be String"), !1;
        t = String(t)
    }
    if (!isString(e)) return log("Key must be String"), !1;
    if (!sa._.check.checkKeyword(e) || isPresetIdKeys(e, [IDENTITY_KEY.LOGIN])) return log("Key [" + e + "] is invalid"), !1;
    if (!t || "" === t) return log("Value is empty or null"), !1;
    if (!isString(t)) return log("Value must be String"), !1;
    if (!sa._.check.checkIdLength(t)) return !1;
    hasOwnProperty$3.call(store._state.identities, e) && t === store._state.identities[e] && ("$mp_id" !== e && "$identity_mp_id" !== e && delete store._state.identities[e], store.save());
    var a = store.getDistinctId(),
        i = store.getFirstId();
    a === e + "+" + t && (store.set("first_id", ""), store.set("distinct_id", i), store.set("history_login_id", {
        name: "",
        value: ""
    }));
    var r = {};
    r[e] = t, dataStage({
        type: "track_id_unbind",
        event: "$UnbindID",
        unbind_value: r
    })
}

function setWebViewUrl(e, t) {
    if (log("setWebViewUrl \u65b9\u6cd5\u5df2\u4ece 2022-9-23 \u5f00\u59cb\u5e9f\u5f03\uff0c\u8bf7\u5c3d\u5feb\u53bb\u9664\u8be5 API \u7684\u8c03\u7528\uff0c\u5e76\u4f7f\u7528 use \u63d2\u4ef6 \u4ee3\u66ff"), !isString(e) || "" === e) return log("error:\u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f"), !1;
    if (!/^http(s)?:\/\//.test(e)) return log("warning: \u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f"), !1;
    var a = /([^?#]+)(\?[^#]*)?(#.*)?/.exec(e);
    if (!a) return !1;
    var i, r = a[1] || "",
        n = a[2] || "",
        s = a[3] || "",
        o = "",
        u = store.getDistinctId() || "",
        c = store.getFirstId() || "";
    urlSafeBase64 && urlSafeBase64.encode ? u = u ? urlSafeBase64.trim(urlSafeBase64.encode(urlBase64Encode(u))) : "" : rot13obfs && (u = u ? rot13obfs(u) : ""), u = encodeURIComponent(u);
    var p = c ? "f" + u : "d" + u;
    t ? (i = s.indexOf("_sasdk"), o = s.indexOf("?") > -1 ? i > -1 ? r + n + "#" + s.substring(1, i) + "_sasdk=" + p : r + n + "#" + s.substring(1) + "&_sasdk=" + p : r + n + "#" + s.substring(1) + "?_sasdk=" + p) : (i = n.indexOf("_sasdk"), o = /^\?(\w)+/.test(n) ? i > -1 ? r + n.replace(/(_sasdk=)([^&]*)/gi, "_sasdk=" + p) + s : r + "?" + n.substring(1) + "&_sasdk=" + p + s : r + "?" + n.substring(1) + "_sasdk=" + p + s);
    return o
}

function quick() {
    var e = arguments[0],
        t = arguments[1],
        a = arguments[2],
        i = isObject(a) ? a : {};
    if ("getAnonymousID" === e) {
        if (!isEmptyObject(store._state)) return store._state._first_id || store._state.first_id || store._state._distinct_id || store._state.distinct_id;
        log("\u8bf7\u5148\u521d\u59cb\u5316SDK")
    } else "appLaunch" === e || "appShow" === e ? t ? sa.autoTrackCustom[e](t, i) : log("App\u7684launch\u548cshow\uff0c\u5728sensors.quick\u7b2c\u4e8c\u4e2a\u53c2\u6570\u5fc5\u987b\u4f20\u5165App\u7684options\u53c2\u6570") : "appHide" === e && (i = isObject(t) ? t : {}, sa.autoTrackCustom[e](i))
}

function appLaunch(e, t) {
    var a = {};
    e && e.scene ? (meta.current_scene = e.scene, a.$scene = getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)), e && e.path && (a.$url_path = getPath(e.path), a.$title = getPageTitle(e.path)), setShareInfo(e, a);
    var i = setUtm(e, a);
    meta.is_first_launch ? (a.$is_first_time = !0, isEmptyObject(i.pre1) || sa.setOnceProfile(i.pre1)) : a.$is_first_time = !1, setLatestChannel(i.pre2), setSfSource(e, a), sa.registerApp({
        $latest_scene: a.$scene
    }), a.$url_query = setQuery(e.query), a.$url = e.path + (a.$url_query ? "?" + a.$url_query : ""), setPageRefData(t), isObject(t) && (a = extend(a, t)), sa.track("$MPLaunch", a)
}

function appShow(e, t) {
    var a = {};
    meta.mp_show_time = (new Date).getTime(), e && e.scene ? (meta.current_scene = e.scene, a.$scene = getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)), e && e.path && (a.$url_path = getPath(e.path), a.$title = getPageTitle(e.path)), setShareInfo(e, a), setLatestChannel(setUtm(e, a).pre2), setSfSource(e, a), sa.registerApp({
        $latest_scene: a.$scene
    }), a.$url_query = setQuery(e.query), e && e.path && (a.$url = e.path + (a.$url_query ? "?" + a.$url_query : "")), setPageRefData(a, e.path, a.$url_query), isObject(t) && (a = extend(a, t)), sa.track("$MPShow", a)
}

function appHide(e) {
    var t = (new Date).getTime(),
        a = {};
    a.$url_path = getCurrentPath(), meta.mp_show_time && t - meta.mp_show_time > 0 && (t - meta.mp_show_time) / 36e5 < 24 && (a.event_duration = (t - meta.mp_show_time) / 1e3), setPageRefData(a), isObject(e) && (a = extend(a, e)), sa.track("$MPHide", a), sa.sendStrategy.onAppHide()
}

function pageShow(e) {
    var t = {},
        a = getCurrentPath(),
        i = getPageTitle(a),
        r = getCurrentPage();
    i && (t.$title = i), t.$url_path = a, t.$url_query = r.sensors_mp_url_query ? r.sensors_mp_url_query : "", setPageSfSource(t = extend(t, getUtmFromPage())), setPageRefData(t), isObject(e) && (t = extend(t, e)), sa.track("$MPViewScreen", t)
}

function setPara(e) {
    sa.para = extend2Lev(saPara, e);
    var t = [];
    if (isArray(saPara.source_channel))
        for (var a = saPara.source_channel.length, i = 0; i < a; i++) - 1 === " utm_source utm_medium utm_campaign utm_content utm_term sa_utm ".indexOf(" " + saPara.source_channel[i] + " ") && t.push(saPara.source_channel[i]);
    saPara.source_channel = t, isObject(saPara.register) && extend(meta.preset_properties, saPara.register), saPara.openid_url || (saPara.openid_url = saPara.server_url.replace(/([^\\\/])\/(sa)(\.gif){0,1}/, "$1/mp_login")), "number" != typeof saPara.send_timeout && (saPara.send_timeout = 1e3);
    var r = {
        send_timeout: 6e3,
        max_length: 6
    };
    e && e.datasend_timeout || saPara.batch_send && (saPara.datasend_timeout = 1e4), !0 === saPara.batch_send ? saPara.batch_send = extend({}, r) : isObject(saPara.batch_send) && (saPara.batch_send = extend({}, r, saPara.batch_send));
    var n = {
        share: !1,
        utm: !1
    };
    !0 === saPara.is_persistent_save ? (saPara.is_persistent_save = extend({}, n), saPara.is_persistent_save.utm = !0) : isObject(saPara.is_persistent_save) && (saPara.is_persistent_save = extend({}, n, saPara.is_persistent_save)), saPara.server_url ? (saPara.preset_properties = isObject(saPara.preset_properties) ? saPara.preset_properties : {}, isObject(saPara.autotrack_exclude_page) || (saPara.autotrack_exclude_page = {
        pageShow: [],
        pageLeave: []
    }), isArray(saPara.autotrack_exclude_page.pageShow) || (saPara.autotrack_exclude_page.pageShow = []), isArray(saPara.autotrack_exclude_page.pageLeave) || (saPara.autotrack_exclude_page.pageLeave = []), saPara.sdk_id && (saPara.storage_store_key += saPara.sdk_id, saPara.storage_prepare_data_key += saPara.sdk_id)) : log("\u8bf7\u4f7f\u7528 setPara() \u65b9\u6cd5\u8bbe\u7f6e server_url \u6570\u636e\u63a5\u6536\u5730\u5740,\u8be6\u60c5\u53ef\u67e5\u770bhttps://www.sensorsdata.cn/manual/mp_sdk_new.html#112-%E5%BC%95%E5%85%A5%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0")
}

function getServerUrl() {
    return saPara.server_url
}
var autoTrackCustom = {
    trackCustom: function(e, t, a) {
        var i = saPara.autoTrack[e],
            r = "";
        saPara.autoTrack && i && ("function" == typeof i ? isObject(r = i()) && extend(t, r) : isObject(i) && (extend(t, i), saPara.autoTrack[e] = !0), sa.track(a, t))
    },
    appLaunch: function(e, t) {
        if (!checkPrivacyStatus()) return !1;
        if (!meta.initialState.isComplete) return meta.initialState.queue.push(["appLaunch", arguments]), meta.life_state.app_launched = !0, !1;
        meta.life_state.app_launched = !0;
        var a = {};
        if (e && e.scene ? (meta.current_scene = e.scene, a.$scene = getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)), e && e.path && (a.$url_path = getPath(e.path), a.$title = getPageTitle(e.path), e.query && isObject(e.query))) {
            var i = setQuery(e.query);
            i = i ? "?" + i : "", a.$url = a.$url_path + i
        }
        setShareInfo(e, a);
        var r = setUtm(e, a);
        meta.is_first_launch ? (a.$is_first_time = !0, isEmptyObject(r.pre1) || sa.setOnceProfile(r.pre1)) : a.$is_first_time = !1, setLatestChannel(r.pre2), setSfSource(e, a), sa.registerApp({
            $latest_scene: a.$scene
        }), a.$url_query = setQuery(e.query), setPageRefData(a), t ? (a = extend(a, t), sa.track("$MPLaunch", a)) : saPara.autoTrack && saPara.autoTrack.appLaunch && sa.autoTrackCustom.trackCustom("appLaunch", a, "$MPLaunch")
    },
    appShow: function(e, t) {
        var a = {};
        meta.mp_show_time = (new Date).getTime(), e && e.scene ? (meta.current_scene = e.scene, a.$scene = getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)), e && e.path && (a.$url_path = getPath(e.path), a.$title = getPageTitle(e.path)), setShareInfo(e, a), setLatestChannel(setUtm(e, a).pre2), setSfSource(e, a), sa.registerApp({
            $latest_scene: a.$scene
        }), a.$url_query = setQuery(e.query), setPageRefData(a, e.path, a.$url_query), e && e.path && (a.$url = e.path + (a.$url_query ? "?" + a.$url_query : "")), t ? (a = extend(a, t), sa.track("$MPShow", a)) : saPara.autoTrack && saPara.autoTrack.appShow && sa.autoTrackCustom.trackCustom("appShow", a, "$MPShow")
    },
    appHide: function(e) {
        var t = (new Date).getTime(),
            a = {};
        a.$url_path = getCurrentPath(), meta.mp_show_time && t - meta.mp_show_time > 0 && (t - meta.mp_show_time) / 36e5 < 24 && (a.event_duration = (t - meta.mp_show_time) / 1e3), setPageRefData(a), e ? (a = extend(a, e), sa.track("$MPHide", a)) : saPara.autoTrack && saPara.autoTrack.appHide && sa.autoTrackCustom.trackCustom("appHide", a, "$MPHide")
    },
    pageLoad: function(e) {
        meta.current_scene && 1010 === meta.current_scene && e && (e.sampshare && delete e.sampshare, delObjectKey(e)), e && isObject(e) && (this.sensors_mp_url_query = setQuery(e), this.sensors_mp_encode_url_query = setQuery(e, !0))
    },
    pageShow: function() {
        meta.page_show_time = Date.now();
        var e = {},
            t = getCurrentPath(),
            a = getPageTitle(t);
        setRefPage(), e.$url_path = t, e.$url_query = this.sensors_mp_url_query ? this.sensors_mp_url_query : "", setPageRefData(e = extend(e, getUtmFromPage())), setPageSfSource(e), a && (e.$title = a), saPara.onshow ? saPara.onshow(sa, t, this) : -1 === saPara.autotrack_exclude_page.pageShow.indexOf(t) && sa.autoTrackCustom.trackCustom("pageShow", e, "$MPViewScreen")
    },
    pageShare: function(e) {
        var t = e.onShareAppMessage;
        e.onShareAppMessage = function() {
            var e = this;
            meta.share_method = "\u8f6c\u53d1\u6d88\u606f\u5361\u7247";
            var a, i = t.apply(this, arguments);
            if (saPara.autoTrack && saPara.autoTrack.pageShare) {
                var r = {
                    $url_path: getCurrentPath(),
                    $share_depth: meta.query_share_depth,
                    $share_method: meta.share_method
                };
                setPageRefData(r), sa.autoTrackCustom.trackCustom("pageShare", r, "$MPShare")
            }

            function n(t) {
                return isObject(t) || (t = {}), (isUndefined(t.path) || "" === t.path) && (t.path = getCurrentUrl(e)), isString(t.path) && (-1 === t.path.indexOf("?") ? t.path = t.path + "?" : "&" !== t.path.slice(-1) && (t.path = t.path + "&")), t.path = t.path + getShareInfo(), t
            }
            if (sa.para.allow_amend_share_path && isObject(i = n(i)))
                for (var s in i)
                    if ((a = i[s]) && isFunction(a.then) && isFunction(a.catch)) try {
                        i[s] = i[s].then(function(e) {
                            return n(e)
                        })
                    } catch (e) {
                        log("onShareAppMessage: " + e)
                    }
            return i
        }
    },
    pageShareTimeline: function(e) {
        var t = e.onShareTimeline;
        e.onShareTimeline = function() {
            meta.share_method = "\u670b\u53cb\u5708\u5206\u4eab";
            var e = t.apply(this, arguments);
            if (saPara.autoTrack && saPara.autoTrack.pageShare) {
                var a = {
                    $url_path: getCurrentPath(),
                    $share_depth: meta.query_share_depth,
                    $share_method: meta.share_method
                };
                setPageRefData(a), sa.autoTrackCustom.trackCustom("pageShare", a, "$MPShare")
            }
            return saPara.allow_amend_share_path && ("object" != typeof e && (e = {}), "object" == typeof e && void 0 === e.query && (e.query = ""), "object" == typeof e && "string" == typeof e.query && "" !== e.query && "&" !== e.query.slice(-1) && (e.query = e.query + "&"), e.query = e.query + getShareInfo()), e
        }
    },
    pageAddFavorites: function() {
        var e = {};
        e.$url_path = getCurrentPath(), saPara.autoTrack && saPara.autoTrack.mpFavorite && sa.autoTrackCustom.trackCustom("mpFavorite", e, "$MPAddFavorites")
    },
    pageHide: function() {
        sa.para.autoTrack && sa.para.autoTrack.pageLeave && sendPageLeave()
    }
};

function sendPageLeave() {
    var e = {},
        t = "";
    try {
        t = (e = getCurrentPage()) ? e.route : ""
    } catch (e) {
        log(e)
    }
    if (meta.page_show_time >= 0 && "" !== t) {
        var a = {},
            i = getPageTitle(t),
            r = (Date.now() - meta.page_show_time) / 1e3;
        (isNaN(r) || r < 0) && (r = 0), a.$url_query = e.sensors_mp_url_query ? e.sensors_mp_url_query : "", a.$url_path = t, a.$title = i, a.event_duration = r, -1 === saPara.autotrack_exclude_page.pageLeave.indexOf(t) && sa.track("$MPPageLeave", a), meta.page_show_time = -1
    }
}
var openid = {
        getRequest: function(e) {
            wx.login({
                success: function(t) {
                    t.code && saPara.appid && saPara.openid_url ? wxrequest({
                        url: saPara.openid_url + "&code=" + t.code + "&appid=" + saPara.appid,
                        method: "GET",
                        complete: function(t) {
                            isObject(t) && isObject(t.data) && t.data.openid ? e(t.data.openid) : e()
                        }
                    }) : e()
                }
            })
        },
        getWXStorage: function() {
            var e = store.getStorage();
            if (e && isObject(e)) return e.openid
        },
        getOpenid: function(e) {
            if (!saPara.appid) return e(), !1;
            var t = this.getWXStorage();
            t ? e(t) : this.getRequest(e)
        }
    },
    functions = Object.freeze({
        __proto__: null,
        setProfile: setProfile,
        setOnceProfile: setOnceProfile,
        appendProfile: appendProfile,
        incrementProfile: incrementProfile,
        track: track,
        identify: identify,
        resetAnonymousIdentity: resetAnonymousIdentity,
        trackSignup: trackSignup,
        login: login,
        loginWithKey: loginWithKey,
        getAnonymousID: getAnonymousID,
        getIdentities: getIdentities,
        logout: logout,
        getPresetProperties: getPresetProperties,
        setOpenid: setOpenid,
        unsetOpenid: unsetOpenid,
        bindOpenid: bindOpenid,
        unbindOpenid: unbindOpenid,
        setUnionid: setUnionid,
        unsetUnionid: unsetUnionid,
        bindUnionid: setUnionid,
        unbindUnionid: unsetUnionid,
        initWithOpenid: initWithOpenid,
        bind: bind,
        unbind: unbind,
        setWebViewUrl: setWebViewUrl,
        quick: quick,
        appLaunch: appLaunch,
        appShow: appShow,
        appHide: appHide,
        pageShow: pageShow,
        setPara: setPara,
        getServerUrl: getServerUrl,
        sendPageLeave: sendPageLeave,
        openid: openid,
        autoTrackCustom: autoTrackCustom,
        registerApp: registerApp,
        register: register,
        clearAllRegister: clearAllRegister,
        clearAppRegister: clearAppRegister,
        clearAllProps: clearAllProps
    });

function buildAPI(e) {
    for (var t in functions) e[t] = functions[t]
}

function setFirstVisitTime() {
    meta.is_first_launch && setOnceProfile({
        $first_visit_time: new Date
    })
}

function checkIsComplete() {
    meta.initialState.isComplete = !0, meta.initialState.queue.length > 0 && (each(meta.initialState.queue, function(e) {
        "appLaunch" === e[0] ? sa.autoTrackCustom.appLaunch.apply(sa.autoTrackCustom, slice.call(e[1])) : sa[e[0]].apply(sa, slice.call(e[1]))
    }), meta.initialState.queue = [])
}

function init(e) {
    if (!0 === meta.init_status) return !1;

    function t() {
        checkIsComplete(), checkAppLaunch(), sa.ee.sdk.emit("ready")
    }
    meta.init_status = !0, sa.ee.sdk.emit("beforeInit"), e && isObject(e) && sa.setPara(e), sa.ee.sdk.emit("initPara"), sa.ee.sdk.emit("afterInitPara"), sa.store.init(), sa.checkPluginInitStatus(), setFirstVisitTime(), sa.para.batch_send && sa.sendStrategy.init();
    var a = [getNetworkType(), getSystemInfo()].concat(meta.promise_list);
    Promise.all(a).then(() => {
        t()
    }).catch(() => {
        t()
    })
}

function registerPropertyPlugin(e) {
    isFunction(e.properties) ? !e.isMatchedWithFilter || isFunction(e.isMatchedWithFilter) ? sa.ee.data.on("finalAdjustData", function(t) {
        try {
            isFunction(e.isMatchedWithFilter) ? e.isMatchedWithFilter(t) && e.properties(t) : e.properties(t)
        } catch (e) {
            log("execute registerPropertyPlugin callback error:" + e)
        }
    }) : log("registerPropertyPlugin arguments error, isMatchedWithFilter must be function") : log("registerPropertyPlugin arguments error, properties must be function")
}
sa._ = _, sa.modules = {}, sa.meta = meta, sa.kit = kit, sa.mergeStorageData = mergeStorageData, sa.dataStage = dataStage, sa.sendStrategy = sendStrategy, sa.store = store, sa.usePlugin = usePlugin, sa.checkPluginInitStatus = checkPluginInitStatus, sa.eventSub = eventSub, sa.events = new eventEmitter, sa.ee = ee, sa.registerPropertyPlugin = registerPropertyPlugin, sa.enableDataCollect = enableDataCollect, sa.initialState = meta.initialState, sa.IDENTITY_KEY = {
    EMAIL: IDENTITY_KEY.EMAIL,
    MOBILE: IDENTITY_KEY.MOBILE
}, buildAPI(sa), apiStaging(), setNavigationBarTitle(), networkStatusChange(), initAppGlobalName(), initAppShowHide(), initPageProxy(), sa.init = init;
var base = {
    plugin_version: "1.20.5"
};

function createPlugin(e) {
    if ("object" == typeof e && "string" == typeof e.plugin_name && "" !== e.plugin_name) return e.plugin_version = base.plugin_version, e.log = e.log || function() {
        "object" == typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
    }, e;
    "object" == typeof console && "function" == typeof console.error && console.error('plugin must contain  proprerty "plugin_name"')
}
var disableSDK = {
        init(e) {
            e.disableSDK = this.disableSDK.bind(this), e.enableSDK = this.enableSDK.bind(this), e.getDisabled = this.getDisabled.bind(this)
        },
        plugin_name: "DisableSDK",
        disabled: !1,
        disableSDK() {
            this.disabled = !0
        },
        enableSDK() {
            this.disabled = !1
        },
        getDisabled() {
            return this.disabled
        }
    },
    DisableSDK = createPlugin(disableSDK);
sa.usePlugin(DisableSDK), module.exports = sa;