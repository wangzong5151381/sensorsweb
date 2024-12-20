"use strict";
var sa = {},
    nativeIsArray = Array.isArray,
    ObjProto = Object.prototype,
    ArrayProto = Array.prototype,
    nativeForEach = ArrayProto.forEach,
    nativeIndexOf = ArrayProto.indexOf,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty,
    slice = ArrayProto.slice,
    each = function(e, t, a) {
        if (null == e) return !1;
        var r = {};
        if (nativeForEach && e.forEach === nativeForEach) e.forEach(t, a);
        else if (e.length === +e.length) {
            for (var s = 0, i = e.length; s < i; s++)
                if (s in e && t.call(a, e[s], s, e) === r) return !1
        } else
            for (var n in e)
                if (hasOwnProperty.call(e, n) && t.call(a, e[n], n, e) === r) return !1
    };

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
        for (var r in a) {
            var s = a[r];
            isArray(s) ? (t[r] = [], e(t[r], s)) : isObject(s) ? (t[r] = {}, e(t[r], s)) : t[r] = s
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
    return "[object Number]" == toString.call(e) && /[\d\.]+/.test(String(e))
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
    _ = {
        each: each,
        isObject: isObject,
        getRandomBasic: getRandomBasic,
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
        slice: slice
    },
    kit = {};

function encodeTrackData(e) {
    e = JSON.stringify(e);
    var t = sa._.base64Encode(e);
    return encodeURIComponent(t)
}

function setPublicPProperties(e) {
    if (e && e.properties) {
        var t = sa._.getRefPage(),
            a = sa._.getCurrentPageInfo(),
            r = {
                $referrer: t.route,
                $referrer_title: t.title,
                $title: a.title,
                $url: a.url
            };
        for (var s in !0 === sa.para.preset_properties.url_path && (r.$url_path = a.path), r) e.properties.hasOwnProperty(s) || (e.properties[s] = r[s])
    }
}
kit.buildData = function(e, t) {
    var a = {
        distinct_id: sa.store.getDistinctId(),
        identities: sa.store._state.identities,
        lib: {
            $lib: sa.lib_name,
            $lib_method: "code",
            $lib_version: sa.lib_version
        },
        properties: {}
    };
    return "track_id_unbind" === e.type && "$UnbindID" === e.event && (a.identities = _.deepCopy(e.unbind_value), delete e.unbind_value), _.isObject(t) || (t = {}), _.extend(a, sa.store.getUnionId(), e), _.isObject(e.properties) && !_.isEmptyObject(e.properties) && _.extend(a.properties, e.properties), e.type && "profile" === e.type.slice(0, 7) || (a._track_id = Number(String(getRandom()).slice(2, 5) + String(getRandom()).slice(2, 4) + String(Date.now()).slice(-4)), a.properties = _.extend({}, _.info.properties, sa.store.getProps(), _.info.currentProps, t, a.properties), "track" === e.type && (a.properties.$is_first_day = _.getIsFirstDay()), setPublicPProperties(a)), a.properties.$time && _.isDate(a.properties.$time) ? (a.time = 1 * a.properties.$time, delete a.properties.$time) : a.time = 1 * new Date, _.parseSuperProperties(a.properties), _.searchObjDate(a), _.searchObjString(a), a
}, kit.processData = function(e) {
    return e
}, kit.onceTrackData = function(e) {
    return "data=" + encodeTrackData(e)
}, kit.batchTrackData = function(e) {
    var t = Date.now();
    return e.forEach(function(e) {
        e._flush_time = t
    }), "data_list=" + encodeTrackData(e)
}, kit.onEventSend = function() {
    return {}
};
var mergeStorageData = {
        getData: function(e) {
            wx.getStorage({
                key: sa.para.storage_prepare_data_key,
                complete: function(t) {
                    var a = t.data && sa._.isArray(t.data) ? t.data : [];
                    mergeStorageData.deleteAesData(a), e && e()
                }
            })
        },
        deleteAesData: function(e) {
            var t = [],
                a = e.length;
            if (a > 0) {
                for (var r = 0; r < a; r++) sa._.isObject(e[r]) && t.push(e[r]);
                sa.store.mem.mdata = t.concat(sa.store.mem.mdata)
            }
        }
    },
    sendStrategy = {
        dataHasSend: !0,
        dataHasChange: !1,
        syncStorage: !1,
        failTime: 0,
        init: function() {
            mergeStorageData.getData(sendStrategy.syncStorageState), sendStrategy.batchInterval()
        },
        syncStorageState: function() {
            sendStrategy.syncStorage = !0
        },
        onAppHide: function() {
            sa.para.batch_send && this.batchSend()
        },
        send: function(e) {
            this.dataHasChange = !0, sa.store.mem.getLength() >= 500 && (sa._.logger.info("\u6570\u636e\u91cf\u5b58\u50a8\u8fc7\u5927\uff0c\u6709\u5f02\u5e38"), sa.store.mem.mdata.shift()), (e = kit.processData(e)) && sa.store.mem.add(e), sa.store.mem.getLength() >= sa.para.batch_send.max_length && this.batchSend()
        },
        wxrequest: function(e) {
            if (sa._.isArray(e.data) && e.data.length > 0) {
                var t = kit.batchTrackData(e.data);
                sa._.wxrequest({
                    url: sa.para.server_url,
                    method: "POST",
                    dataType: "text",
                    data: t,
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
                var e, t, a = sa.store.mem.mdata;
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
            sa.store.mem.clear(e), this.dataHasSend = !0, this.dataHasChange = !0, this.batchWrite(), this.failTime = 0
        },
        is_first_batch_write: !0,
        batchWrite: function() {
            var e = this;
            this.dataHasChange && (this.is_first_batch_write && (this.is_first_batch_write = !1, setTimeout(function() {
                e.batchSend()
            }, 1e3)), this.dataHasChange = !1, this.syncStorage && sa._.setStorageSync(sa.para.storage_prepare_data_key, sa.store.mem.mdata))
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
                }, sa.para.batch_send.send_timeout * Math.pow(2, e.failTime))
            }()
        }
    };

function getSendUrl(e, t) {
    var a = kit.onceTrackData(t);
    return -1 !== e.indexOf("?") ? e + "&" + a : e + "?" + a
}

function onceSend(e) {
    e._flush_time = Date.now();
    var t = getSendUrl(sa.para.server_url, e);
    sa._.wxrequest({
        url: t,
        method: "GET"
    })
}
var saEvent = {
        send: function(e, t) {
            if (!sa.para.server_url) return sa._.logger.info("error: server_url \u4e0d\u80fd\u4e3a\u7a7a"), !1;
            if (sa.current_scene && 1154 === sa.current_scene && !sa.para.preset_events.moments_page) return !1;
            var a = sa._.deepCopy(e),
                r = sa.kit.onEventSend(a),
                s = sa.kit.buildData(e, r);
            s ? (saEvent.debug(s), sa.events.emit("send", s), sa.para.batch_send ? sendStrategy.send(s) : onceSend(s)) : sa._.logger.info("error: \u6570\u636e\u5f02\u5e38 " + s)
        },
        debug: function(e) {
            sa._.logger.info(e)
        }
    },
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
        mp_hook: {
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
        user: {
            LOGIN_ID_KEY: "$identity_login_id"
        }
    };
sa.popupEmitter = {
    attached: function() {
        return !1
    }
};
var usePlugin = function(e, t) {
        if (e && e.info && "miniprogram_abtesting" === e.info.lib_plugin_name) return "function" == typeof e.init && e.init(sa, t), !1;
        if (meta.init_status) "function" == typeof e.init && e.init(sa, t);
        else {
            var a = {
                target: e,
                para: t
            };
            meta.plugin.uninitialized_list.push(a)
        }
    },
    checkPluginInitStatus = function() {
        if (meta.plugin.uninitialized_list.length > 0) {
            for (var e in meta.plugin.uninitialized_list) {
                var t = meta.plugin.uninitialized_list[e];
                t && t.target && "function" == typeof t.target.init && t.target.init(sa, t.para)
            }
            meta.plugin.uninitialized_list = []
        }
    };

function checkPrivacyStatus() {
    var e;
    return global && global.sensors_data_pre_config && (e = !!global.sensors_data_pre_config.is_compliance_enabled && global.sensors_data_pre_config.is_compliance_enabled), !e || (!!meta.init_status || !!meta.privacy.enable_data_collect)
}

function enableDataCollect() {
    meta.privacy.enable_data_collect = !0
}

function initAppProxy() {
    var e = App;
    App = function(t) {
        t[sa.para.name] = sa, e.apply(this, arguments)
    }, monitorApp()
}

function monitorApp() {
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
    var r = sa.autoTrackCustom[a];
    if (e[t]) {
        var s = e[t];
        e[t] = function() {
            !sa.para.autoTrackIsFirst || isObject(sa.para.autoTrackIsFirst) && !sa.para.autoTrackIsFirst[a] ? (s.apply(this, arguments), r.apply(this, arguments)) : (!0 === sa.para.autoTrackIsFirst || isObject(sa.para.autoTrackIsFirst) && sa.para.autoTrackIsFirst[a]) && (r.apply(this, arguments), s.apply(this, arguments))
        }
    } else e[t] = function() {
        r.apply(this, arguments)
    }
}

function clickTrack(e) {
    var t, a = {},
        r = {},
        s = e.currentTarget || {},
        i = e.target || {};
    if (isObject(sa.para.framework) && isObject(sa.para.framework.taro) && !sa.para.framework.taro.createApp && i.id && s.id && i.id !== s.id) return !1;
    var n = s.dataset || {};
    if (t = e.type, a.$element_id = s.id, a.$element_type = n.type, a.$element_content = n.content, a.$element_name = n.name, isObject(e.event_prop) && (r = e.event_prop), t && isClick(t)) {
        if (sa.para.preset_events && sa.para.preset_events.collect_element && !1 === sa.para.preset_events.collect_element(arguments[0])) return !1;
        a.$url_path = sa._.getCurrentPath(), sa._.setPageRefData(a), a = sa._.extend(a, r), sa.track("$MPClick", a)
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
    var t = meta.mp_hook,
        a = [];
    for (var r in e) "function" != typeof e[r] || t[r] || a.push(r);
    return a
}

function pageLeaveProxy(e) {
    var t = e.onHide;
    e.onHide = function() {
        t && t.apply(this, arguments), sa._.sendPageLeave()
    };
    var a = e.onUnload;
    e.onUnload = function() {
        a && a.apply(this, arguments), sa._.sendPageLeave()
    }
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
        for (var a = t.length, r = 0; r < a; r++) clickProxy(e, t[r])
    }
}

function monitorHooks(e) {
    sa.para.autoTrack && sa.para.autoTrack.pageLeave && pageLeaveProxy(e), mpProxy(e, "onLoad", "pageLoad"), mpProxy(e, "onShow", "pageShow"), mpProxy(e, "onAddToFavorites", "pageAddFavorites"), "function" == typeof e.onShareAppMessage && sa.autoTrackCustom.pageShare(e), "function" == typeof e.onShareTimeline && sa.autoTrackCustom.pageShareTimeline(e)
}

function isNewLoginId(e, t) {
    return e !== sa.store._state.history_login_id.name || sa.store._state.history_login_id.value !== t
}

function isSameAndAnonymousID(e) {
    var t = sa.store.getFirstId(),
        a = sa.store.getDistinctId();
    return t ? e === t : e === a
}

function isPresetIdKeys(e, t) {
    var a = ["$identity_anonymous_id", "$mp_openid", "$identity_mp_openid", "$identity_mp_unionid", "$mp_unionid"];
    for (var r of (isArray(t) && (a = a.concat(t)), a))
        if (r === e) return !0;
    return !1
}
sa.kit = kit, sa.mergeStorageData = mergeStorageData, sa.saEvent = saEvent, sa.sendStrategy = sendStrategy, sa._ = _, sa.IDENTITY_KEY = {
    EMAIL: "$identity_email",
    MOBILE: "$identity_mobile"
}, sa.usePlugin = usePlugin, sa.checkPluginInitStatus = checkPluginInitStatus, sa.enableDataCollect = enableDataCollect, sa.para = {
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
    storage_store_key: "sensorsdata2015_wechat",
    storage_prepare_data_key: "sensors_mp_prepare_data"
};
var logger = "object" == typeof logger ? logger : {};
logger.info = function() {
    if (sa.para.show_log && "object" == typeof console && console.log) try {
        if (3 === arguments.length) return console.log(arguments[0], arguments[1], arguments[2]);
        if (2 === arguments.length) return console.log(arguments[0], arguments[1]);
        if (1 === arguments.length) return console.log(arguments[0])
    } catch (e) {
        console.log(arguments[0])
    }
}, _.logger = logger, sa.setPara = function(e) {
    sa.para = _.extend2Lev(sa.para, e);
    var t = [];
    if (_.isArray(sa.para.source_channel))
        for (var a = sa.para.source_channel.length, r = 0; r < a; r++) - 1 === " utm_source utm_medium utm_campaign utm_content utm_term sa_utm ".indexOf(" " + sa.para.source_channel[r] + " ") && t.push(sa.para.source_channel[r]);
    sa.para.source_channel = t, _.isObject(sa.para.register) && _.extend(_.info.properties, sa.para.register), sa.para.openid_url || (sa.para.openid_url = sa.para.server_url.replace(/([^\/])\/(sa)(\.gif){0,1}/, "$1/mp_login")), "number" != typeof sa.para.send_timeout && (sa.para.send_timeout = 1e3);
    var s = {
        send_timeout: 6e3,
        max_length: 6
    };
    e && e.datasend_timeout || sa.para.batch_send && (sa.para.datasend_timeout = 1e4), !0 === sa.para.batch_send ? sa.para.batch_send = _.extend({}, s) : _.isObject(sa.para.batch_send) && (sa.para.batch_send = _.extend({}, s, sa.para.batch_send));
    var i = {
        share: !1,
        utm: !1
    };
    !0 === sa.para.is_persistent_save ? (sa.para.is_persistent_save = _.extend({}, i), sa.para.is_persistent_save.utm = !0) : _.isObject(sa.para.is_persistent_save) && (sa.para.is_persistent_save = _.extend({}, i, sa.para.is_persistent_save)), sa.para.server_url ? (sa.para.preset_properties = _.isObject(sa.para.preset_properties) ? sa.para.preset_properties : {}, _.isObject(sa.para.autotrack_exclude_page) || (sa.para.autotrack_exclude_page = {
        pageShow: [],
        pageLeave: []
    }), _.isArray(sa.para.autotrack_exclude_page.pageShow) || (sa.para.autotrack_exclude_page.pageShow = []), _.isArray(sa.para.autotrack_exclude_page.pageLeave) || (sa.para.autotrack_exclude_page.pageLeave = [])) : logger.info("\u8bf7\u4f7f\u7528 setPara() \u65b9\u6cd5\u8bbe\u7f6e server_url \u6570\u636e\u63a5\u6536\u5730\u5740,\u8be6\u60c5\u53ef\u67e5\u770bhttps://www.sensorsdata.cn/manual/mp_sdk_new.html#112-%E5%BC%95%E5%85%A5%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0")
}, sa.getServerUrl = function() {
    return sa.para.server_url
};
var LIB_VERSION = "1.17.7",
    LIB_NAME = "MiniProgram",
    source_channel_standard = "utm_source utm_medium utm_campaign utm_content utm_term",
    latest_source_channel = ["$latest_utm_source", "$latest_utm_medium", "$latest_utm_campaign", "$latest_utm_content", "$latest_utm_term", "$latest_sa_utm"],
    latest_share_info = ["$latest_share_distinct_id", "$latest_share_url_path", "$latest_share_depth", "$latest_share_method"],
    share_info_key = ["sensors_share_d", "sensors_share_p", "sensors_share_i", "sensors_share_m"],
    page_show_time = Date.now(),
    mpshow_time = null,
    query_share_depth = 0,
    share_distinct_id = "",
    share_method = "",
    current_scene = "",
    is_first_launch = !1,
    wxSDKVersion = "";
sa.lib_version = LIB_VERSION, sa.lib_name = LIB_NAME;
var globalTitle = {},
    page_route_map = [];
_.decodeURIComponent = function(e) {
    var t = "";
    try {
        t = decodeURIComponent(e)
    } catch (a) {
        t = e
    }
    return t
}, _.encodeDates = function(e) {
    return _.each(e, function(t, a) {
        _.isDate(t) ? e[a] = _.formatDate(t) : _.isObject(t) && (e[a] = _.encodeDates(t))
    }), e
}, _.formatDate = function(e) {
    function t(e) {
        return e < 10 ? "0" + e : e
    }
    return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
}, _.searchObjDate = function(e) {
    _.isObject(e) && _.each(e, function(t, a) {
        _.isObject(t) ? _.searchObjDate(e[a]) : _.isDate(t) && (e[a] = _.formatDate(t))
    })
}, _.formatString = function(e) {
    return e.length > sa.para.max_string_length ? (logger.info("\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--" + e), e.slice(0, sa.para.max_string_length)) : e
}, _.searchObjString = function(e) {
    _.isObject(e) && _.each(e, function(t, a) {
        _.isObject(t) ? _.searchObjString(e[a]) : _.isString(t) && (e[a] = _.formatString(t))
    })
}, _.parseSuperProperties = function(e) {
    _.isObject(e) && (_.each(e, function(t, a) {
        if (_.isFunction(t)) try {
            e[a] = t(), _.isFunction(e[a]) && (logger.info("\u60a8\u7684\u5c5e\u6027- " + a + " \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete e[a])
        } catch (t) {
            delete e[a], logger.info("\u60a8\u7684\u5c5e\u6027- " + a + " \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
        }
    }), _.strip_sa_properties(e))
}, _.unique = function(e) {
    for (var t, a = [], r = {}, s = 0; s < e.length; s++)(t = e[s]) in r || (r[t] = !0, a.push(t));
    return a
}, _.check = {
    checkKeyword: function(e) {
        return /^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i.test(e)
    },
    ckeckIdLength: function(e) {
        return !(String(e).length > 255) || (logger.info("id \u957f\u5ea6\u8d85\u8fc7 255 \u4e2a\u5b57\u7b26\uff01"), !1)
    }
}, _.strip_sa_properties = function(e) {
    return _.isObject(e) ? (_.each(e, function(t, a) {
        if (_.isArray(t)) {
            var r = [];
            _.each(t, function(e) {
                _.isString(e) ? r.push(e) : logger.info("\u60a8\u7684\u6570\u636e-", t, "\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
            }), e[a] = r
        }
        _.isString(t) || _.isNumber(t) || _.isDate(t) || _.isBoolean(t) || _.isArray(t) || (logger.info("\u60a8\u7684\u6570\u636e - " + a + ":" + t + " - \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete e[a])
    }), e) : e
}, _.strip_empty_properties = function(e) {
    var t = {};
    return _.each(e, function(e, a) {
        null != e && (t[a] = e)
    }), t
}, _.utf8Encode = function(e) {
    var t, a, r, s, i = "";
    for (t = a = 0, r = (e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, s = 0; s < r; s++) {
        var n = e.charCodeAt(s),
            o = null;
        n < 128 ? a++ : o = n > 127 && n < 2048 ? String.fromCharCode(n >> 6 | 192, 63 & n | 128) : String.fromCharCode(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128), null !== o && (a > t && (i += e.substring(t, a)), i += o, t = a = s + 1)
    }
    return a > t && (i += e.substring(t, e.length)), i
}, _.base64Encode = function(e) {
    var t, a, r, s, i, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        o = 0,
        u = 0,
        c = "",
        p = [];
    if (!e) return e;
    e = _.utf8Encode(e);
    do {
        t = (i = e.charCodeAt(o++) << 16 | e.charCodeAt(o++) << 8 | e.charCodeAt(o++)) >> 18 & 63, a = i >> 12 & 63, r = i >> 6 & 63, s = 63 & i, p[u++] = n.charAt(t) + n.charAt(a) + n.charAt(r) + n.charAt(s)
    } while (o < e.length);
    switch (c = p.join(""), e.length % 3) {
        case 1:
            c = c.slice(0, -2) + "==";
            break;
        case 2:
            c = c.slice(0, -1) + "="
    }
    return c
}, _.urlSafeBase64 = function() {
    var e = {
            "+": "-",
            "/": "_",
            "=": "."
        },
        t = {
            "-": "+",
            _: "/",
            ".": "="
        };
    return {
        encode: function(t) {
            return t.replace(/[+\/=]/g, function(t) {
                return e[t]
            })
        },
        decode: function(e) {
            return e.replace(/[-_.]/g, function(e) {
                return t[e]
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
    }
}(), _.btoa = function(e) {
    for (var t, a, r, s, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = "", o = 0, _ = (e = String(e)).length % 3; o < e.length;)((a = e.charCodeAt(o++)) > 255 || (r = e.charCodeAt(o++)) > 255 || (s = e.charCodeAt(o++)) > 255) && logger.info("Failed to execute 'btoa' : The string to be encoded contains characters outside of the Latin1 range."), n += i.charAt((t = a << 16 | r << 8 | s) >> 18 & 63) + i.charAt(t >> 12 & 63) + i.charAt(t >> 6 & 63) + i.charAt(63 & t);
    return _ ? n.slice(0, _ - 3) + "===".substring(_) : n
}, _.urlBase64Encode = function(e) {
    return _.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
        return String.fromCharCode("0x" + t)
    }))
}, _.rot13obfs = function(e, t) {
    t = "number" == typeof t ? t : 13;
    for (var a = (e = String(e)).split(""), r = 0, s = a.length; r < s; r++) {
        a[r].charCodeAt(0) < 126 && (a[r] = String.fromCharCode((a[r].charCodeAt(0) + t) % 126))
    }
    return a.join("")
}, _.rot13defs = function(e) {
    return e = String(e), _.rot13obfs(e, 113)
}, _.getCurrentPage = function() {
    var e = {};
    try {
        var t = getCurrentPages();
        e = t[t.length - 1]
    } catch (e) {
        logger.info(e)
    }
    return e
}, _.getCurrentPath = function() {
    var e = "\u672a\u53d6\u5230";
    try {
        var t = _.getCurrentPage();
        e = t ? t.route : e
    } catch (e) {
        logger.info(e)
    }
    return e
}, _.getIsFirstDay = function() {
    return "object" == typeof sa.store._state && "number" == typeof sa.store._state.first_visit_day_time && sa.store._state.first_visit_day_time > (new Date).getTime()
}, _.getCurrentUrl = function(e) {
    var t = _.getCurrentPath(),
        a = "";
    return _.isObject(e) && e.sensors_mp_encode_url_query && (a = e.sensors_mp_encode_url_query), t ? a ? t + "?" + a : t : "\u672a\u53d6\u5230"
}, _.getPath = function(e) {
    return e = "string" == typeof e ? e.replace(/^\//, "") : "\u53d6\u503c\u5f02\u5e38"
}, sa.initialState = {
    queue: [],
    isComplete: !1,
    systemIsComplete: !1,
    storeIsComplete: !1,
    checkIsComplete: function() {
        this.systemIsComplete && this.storeIsComplete && (this.isComplete = !0, this.queue.length > 0 && (_.each(this.queue, function(e) {
            "appLaunch" === e[0] ? sa.autoTrackCustom.appLaunch.apply(sa.autoTrackCustom, _.slice.call(e[1])) : sa[e[0]].apply(sa, _.slice.call(e[1]))
        }), this.queue = []))
    }
}, _.getCustomUtmFromQuery = function(e, t, a, r) {
    if (!_.isObject(e)) return {};
    var s = {};
    if (e.sa_utm)
        for (var i in e) "sa_utm" !== i ? _.include(sa.para.source_channel, i) && (s[a + i] = e[i]) : s[r + i] = e[i];
    else
        for (var i in e) - 1 === (" " + source_channel_standard + " ").indexOf(" " + i + " ") ? _.include(sa.para.source_channel, i) && (s[a + i] = e[i]) : s[t + i] = e[i];
    return s
}, _.getObjFromQuery = function(e) {
    var t = e.split("?"),
        a = [],
        r = {};
    return t && t[1] ? (_.each(t[1].split("&"), function(e) {
        (a = e.split("="))[0] && a[1] && (r[a[0]] = a[1])
    }), r) : {}
}, _.setStorageSync = function(e, t) {
    var a = function() {
        wx.setStorageSync(e, t)
    };
    try {
        a()
    } catch (e) {
        logger.info("set Storage fail --", e);
        try {
            a()
        } catch (e) {
            logger.info("set Storage fail again --", e)
        }
    }
}, _.getStorageSync = function(e) {
    var t = "";
    try {
        t = wx.getStorageSync(e)
    } catch (a) {
        try {
            t = wx.getStorageSync(e)
        } catch (e) {
            logger.info("getStorage fail")
        }
    }
    return t
}, _.getMPScene = function(e) {
    return "number" == typeof e || "string" == typeof e && "" !== e ? e = "wx-" + String(e) : "\u672a\u53d6\u5230\u503c"
}, _.objToParam = function(e, t) {
    if ("[object Object]" !== Object.prototype.toString.call(e)) return logger.info("\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61"), "";
    var a = [];
    for (var r in e)
        if (e.hasOwnProperty(r)) {
            var s = e[r];
            void 0 === s ? a.push(r + "=") : (s = t ? encodeURIComponent(s) : s, a.push(r + "=" + s))
        } return a.join("&")
}, _.delObjectKey = function(e) {
    if ("[object Object]" === Object.prototype.toString.call(e))
        for (var t = 0; t < share_info_key.length; t++) delete e[share_info_key[t]];
    else logger.info("\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61")
}, _.shareInfoData = function(e) {
    var t = {},
        a = {};
    if (sa.para.preset_events.share_info_use_string) {
        a = e.query;
        for (var r = 0; r < share_info_key.length; r++) {
            if (!a.hasOwnProperty(share_info_key[r])) return {};
            a[share_info_key[r]] = _.decodeURIComponent(a[share_info_key[r]])
        }
        t = {
            depth: Number(a.sensors_share_d),
            path: a.sensors_share_p || "",
            id: a.sensors_share_i || "",
            method: a.sensors_share_m || ""
        }
    } else {
        if (!e.query.sampshare) return {};
        if (a = _.decodeURIComponent(e.query.sampshare), !_.isJSONString(a)) return {};
        t = {
            depth: (a = JSON.parse(a)).d,
            path: a.p,
            id: a.i,
            method: a.m
        }
    }
    return t
}, _.setShareInfo = function(e, t) {
    var a = {},
        r = {},
        s = sa.store.getDistinctId(),
        i = sa.store.getFirstId();
    if (e && _.isObject(e.query)) {
        if (a = _.shareInfoData(e), _.isEmptyObject(a)) return {};
        var n = a.depth,
            o = a.path,
            u = a.id,
            c = a.method
    }
    "string" == typeof u ? (t.$share_distinct_id = u, share_distinct_id = u, r.$latest_share_distinct_id = u) : t.$share_distinct_id = "\u53d6\u503c\u5f02\u5e38", "number" == typeof n ? !share_distinct_id || share_distinct_id !== s && share_distinct_id !== i ? !share_distinct_id || share_distinct_id === s && share_distinct_id === i ? t.$share_depth = "-1" : (t.$share_depth = n + 1, query_share_depth = n + 1, r.$latest_share_depth = n + 1) : (t.$share_depth = n, query_share_depth = n, r.$latest_share_depth = n) : t.$share_depth = "-1", "string" == typeof o ? (t.$share_url_path = o, r.$latest_share_url_path = o) : t.$share_url_path = "\u53d6\u503c\u5f02\u5e38", "string" == typeof c ? (t.$share_method = c, r.$latest_share_method = c) : t.$share_method = "\u53d6\u503c\u5f02\u5e38", _.setLatestShare(r)
}, _.getShareInfo = function() {
    if (sa.para.preset_events.share_info_use_string) {
        var e = {
            sensors_share_i: sa.store.getDistinctId() || "\u53d6\u503c\u5f02\u5e38",
            sensors_share_p: _.getCurrentPath(),
            sensors_share_d: query_share_depth,
            sensors_share_m: share_method
        };
        return _.objToParam(e, !0)
    }
    var t = JSON.stringify({
        i: sa.store.getDistinctId() || "\u53d6\u503c\u5f02\u5e38",
        p: _.getCurrentPath(),
        d: query_share_depth,
        m: share_method
    });
    return "sampshare=" + encodeURIComponent(t)
}, _.detectOptionQuery = function(e) {
    if (!e || !_.isObject(e.query)) return {};
    var t, a, r, s, i = {};
    return i.query = _.extend({}, e.query), "string" == typeof i.query.scene && (t = i.query, a = ["utm_source", "utm_content", "utm_medium", "utm_campaign", "utm_term", "sa_utm"].concat(sa.para.source_channel), r = new RegExp("(" + a.join("|") + ")%3D", "i"), 1 === (s = Object.keys(t)).length && "scene" === s[0] && r.test(t.scene)) && (i.scene = i.query.scene, delete i.query.scene), e.query.q && e.query.scancode_time && "101" === String(e.scene).slice(0, 3) && (i.q = String(i.query.q), delete i.query.q, delete i.query.scancode_time), i
}, _.getMixedQuery = function(e) {
    var t = _.detectOptionQuery(e),
        a = t.scene,
        r = t.q,
        s = t.query;
    for (var i in s) s[i] = _.decodeURIComponent(s[i]);
    return a && (a = -1 !== (a = _.decodeURIComponent(a)).indexOf("?") ? "?" + a.replace(/\?/g, "") : "?" + a, _.extend(s, _.getObjFromQuery(a))), r && _.extend(s, _.getObjFromQuery(_.decodeURIComponent(r))), s
}, _.setUtm = function(e, t) {
    var a = {},
        r = _.getMixedQuery(e),
        s = _.getCustomUtmFromQuery(r, "$", "_", "$"),
        i = _.getCustomUtmFromQuery(r, "$latest_", "_latest_", "$latest_");
    return a.pre1 = s, a.pre2 = i, _.extend(t, s), a
}, _.setSfSource = function(e, t) {
    !_.isEmptyObject(e.query) && e.query._sfs && (t.$sf_source = e.query._sfs, sa.registerApp({
        $latest_sf_source: t.$sf_source
    }))
}, _.setPageSfSource = function(e) {
    try {
        var t = _.getCurrentPage(),
            a = t ? t.options : "",
            r = _.deepCopy(a);
        for (var s in r) r[s] = _.decodeURIComponent(r[s]);
        !_.isEmptyObject(r) && r._sfs && (e.$sf_source = r._sfs)
    } catch (e) {
        logger.info(e)
    }
};
try {
    var oldSetNavigationBarTitle = wx.setNavigationBarTitle;
    Object.defineProperty(wx, "setNavigationBarTitle", {
        get: function() {
            return function(e) {
                var t = _.getCurrentPath();
                e = _.isObject(e) ? e : {}, globalTitle[t] = e.title, oldSetNavigationBarTitle.call(this, e)
            }
        }
    })
} catch (e) {
    logger.info(e)
}
_.setRefPage = function() {
    var e = {
        route: "\u76f4\u63a5\u6253\u5f00",
        title: ""
    };
    try {
        var t = _.getCurrentPage();
        if (t && t.route) {
            var a = t.sensors_mp_url_query ? "?" + t.sensors_mp_url_query : "",
                r = t.route,
                s = _.getPageTitle(r);
            e.route = r + a, e.title = s, page_route_map.length >= 2 ? (page_route_map.shift(), page_route_map.push(e)) : page_route_map.push(e)
        }
    } catch (e) {
        logger.info(e)
    }
}, _.getRefPage = function() {
    var e = {
        route: "\u76f4\u63a5\u6253\u5f00",
        title: ""
    };
    return page_route_map.length > 1 && (e.title = page_route_map[0].title, e.route = page_route_map[0].route), e
}, _.getCurrentPageInfo = function() {
    var e = _.getCurrentPage(),
        t = {
            title: "",
            url: "",
            path: "\u672a\u53d6\u5230"
        };
    if (e && e.route) {
        var a = e.sensors_mp_url_query ? "?" + e.sensors_mp_url_query : "";
        t.title = _.getPageTitle(e.route), t.url = e.route + a, t.path = e.route
    }
    return t
}, _.setPageRefData = function(e, t, a) {
    var r = _.getRefPage();
    _.isObject(e) && (t ? page_route_map.length > 0 && t ? (a = a ? "?" + a : "", e.$referrer = _.getPath(t) + a, e.$referrer_title = _.getPageTitle(t)) : (e.$referrer = "\u76f4\u63a5\u6253\u5f00", e.$referrer_title = "") : (e.$referrer = r.route, e.$referrer_title = r.title))
}, _.getPageTitle = function(e) {
    if ("\u672a\u53d6\u5230" === e || !e) return "";
    var t = "";
    try {
        if (__wxConfig) {
            var a = __wxConfig,
                r = __wxConfig.page || {},
                s = r[e] || r[e + ".html"],
                i = {},
                n = {};
            if (a.global && a.global.window && a.global.window.navigationBarTitleText && (i.titleVal = a.global.window.navigationBarTitleText), s && s.window && s.window.navigationBarTitleText && (n.titleVal = s.window.navigationBarTitleText), !n.titleVal && __wxAppCode__) {
                var o = __wxAppCode__[e + ".json"];
                o && o.navigationBarTitleText && (n.titleVal = o.navigationBarTitleText)
            }
            if (_.each(globalTitle, function(a, r) {
                    if (r === e) return t = a
                }), 0 === t.length) {
                var u = _.extend(i, n);
                t = u.titleVal || ""
            }
        }
    } catch (e) {
        logger.info(e)
    }
    return t
}, _.wxrequest = function(e) {
    if (_.compareSDKVersion(wxSDKVersion, "2.10.0") >= 0) e.timeout = sa.para.datasend_timeout, wx.request(e);
    else {
        var t = wx.request(e);
        setTimeout(function() {
            _.isObject(t) && _.isFunction(t.abort) && t.abort()
        }, sa.para.datasend_timeout)
    }
}, _.getAppInfoSync = function() {
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
}, _.getAppId = function() {
    var e = _.getAppInfoSync();
    return e && e.appId ? e.appId : ""
}, _.validId = function(e) {
    return "string" != typeof e && "number" != typeof e || "" === e ? (logger.info("\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef"), !1) : "number" != typeof e || (e = String(e), /^\d+$/.test(e)) ? !!_.check.ckeckIdLength(e) && e : (logger.info("\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef"), !1)
}, _.compareSDKVersion = function(e, t) {
    e = e.split("."), t = t.split(".");
    for (var a = Math.max(e.length, t.length); e.length < a;) e.push("0");
    for (; t.length < a;) t.push("0");
    for (var r = 0; r < a; r++) {
        var s = parseInt(e[r]),
            i = parseInt(t[r]);
        if (s > i) return 1;
        if (s < i) return -1
    }
    return 0
}, _.setUpperCase = function(e) {
    return _.isString(e) ? e.toLocaleUpperCase() : e
}, _.getOpenidNameByAppid = function() {
    var e = _.getAppId(),
        t = "$identity_mp_openid";
    return e && (t = "$identity_mp_" + e + "_openid"), t
}, _.info = {
    currentProps: {},
    properties: {
        $lib: LIB_NAME,
        $lib_version: String(LIB_VERSION)
    },
    getSystem: function() {
        var e = this.properties;

        function t() {
            wx.getSystemInfo({
                success: function(t) {
                    var a, r;
                    e.$brand = _.setUpperCase(t.brand), e.$manufacturer = t.brand, e.$model = t.model, e.$screen_width = Number(t.screenWidth), e.$screen_height = Number(t.screenHeight), e.$os = (a = t.platform, "ios" === (r = a.toLowerCase()) ? "iOS" : "android" === r ? "Android" : a), e.$os_version = t.system.indexOf(" ") > -1 ? t.system.split(" ")[1] : t.system, wxSDKVersion = t.SDKVersion, e.$mp_client_app_version = t.version, e.$mp_client_basic_library_version = wxSDKVersion
                },
                complete: function() {
                    var t = (new Date).getTimezoneOffset(),
                        a = _.getAppInfoSync();
                    _.isNumber(t) && (e.$timezone_offset = t), a.appId && (e.$app_id = a.appId), a.appVersion && (e.$app_version = a.appVersion), sa.initialState.systemIsComplete = !0, sa.initialState.checkIsComplete()
                }
            })
        }
        wx.getNetworkType({
            success: function(t) {
                e.$network_type = _.setUpperCase(t.networkType)
            },
            complete: t
        })
    }
}, _.eventEmitter = function() {
    this.sub = []
}, _.eventEmitter.prototype = {
    add: function(e) {
        this.sub.push(e)
    },
    emit: function(e, t) {
        this.sub.forEach(function(a) {
            a.on(e, t)
        })
    }
}, _.eventSub = function(e) {
    sa.events.add(this), this._events = [], this.handle = e, this.ready = !1
}, _.eventSub.prototype = {
    on: function(e, t) {
        if (this.ready) {
            if (_.isFunction(this.handle)) try {
                this.handle(e, t)
            } catch (e) {
                logger.info(e)
            }
        } else this._events.push({
            event: e,
            data: t
        })
    },
    isReady: function() {
        var e = this;
        e.ready = !0, e._events.forEach(function(t) {
            if (_.isFunction(e.handle)) try {
                e.handle(t.event, t.data)
            } catch (e) {
                logger.info(e)
            }
        })
    }
}, sa.eventSub = _.eventSub, sa.events = new _.eventEmitter, sa.store = {
    storageInfo: null,
    store_queue: [],
    getUUID: function() {
        return Date.now() + "-" + Math.floor(1e7 * getRandom()) + "-" + getRandom().toString(16).replace(".", "") + "-" + String(31242 * getRandom()).replace(".", "").slice(0, 8)
    },
    getStorage: function() {
        return this.storageInfo ? this.storageInfo : (this.storageInfo = sa._.getStorageSync(sa.para.storage_store_key) || "", this.storageInfo)
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
        var t = null;
        _.isJSONString(e) ? (t = JSON.parse(e)).distinct_id ? this._state = t : this.set("distinct_id", this.getUUID()) : _.isObject(e) && (t = e).distinct_id ? this._state = t : this.set("distinct_id", this.getUUID());
        var a = this._state._first_id || this._state.first_id,
            r = this._state._distinct_id || this._state.distinct_id,
            s = this._state.openid,
            i = (this._state.history_login_id ? this._state.history_login_id : {}).name;
        if (this._state.identities && _.isString(this._state.identities)) {
            var n = JSON.parse(_.rot13defs(this._state.identities));
            this._state.identities = n
        }
        var o, u, c = _.getOpenidNameByAppid();
        if (this._state.identities && _.isObject(this._state.identities) && !_.isEmptyObject(this._state.identities)) {
            var p = (o = _.getAppId(), u = "$mp_openid", o && (u = "$mp_" + o + "_openid"), u);
            this._state.identities.hasOwnProperty("$mp_id") && (this._state.identities.$identity_mp_id = this._state.identities.$mp_id, delete this._state.identities.$mp_id), this._state.identities.hasOwnProperty("$mp_unionid") && (this._state.identities.$identity_mp_unionid = this._state.identities.$mp_unionid, delete this._state.identities.$mp_unionid), this._state.identities.hasOwnProperty(p) && (this._state.identities[c] = this._state.identities[p], delete this._state.identities[p]), this._state.identities.hasOwnProperty("$identity_anonymous_id") && (this._state.identities.$identity_anonymous_id = a || r)
        } else this._state.identities = {}, this._state.identities.$identity_mp_id = this.getUUID(), this._state.identities.$identity_anonymous_id = a || r;
        if (s && (this._state.identities[c] = s), a)
            if (i && this._state.identities.hasOwnProperty(i)) {
                if (this._state.identities[i] !== r) {
                    for (var d in this._state.identities[i] = r, this._state.identities) this._state.identities.hasOwnProperty(d) && "$identity_mp_id" !== d && d !== i && delete this._state.identities[d];
                    this._state.history_login_id.value = r
                }
            } else {
                for (var d in this._state.identities[meta.user.LOGIN_ID_KEY] = r, this._state.identities) this._state.identities.hasOwnProperty(d) && "$identity_mp_id" !== d && d !== meta.user.LOGIN_ID_KEY && delete this._state.identities[d];
                this._state.history_login_id = {
                    name: meta.user.LOGIN_ID_KEY,
                    value: r
                }
            }
        else {
            if (this._state.identities.hasOwnProperty("$identity_login_id") || this._state.identities.hasOwnProperty(i))
                for (var d in this._state.identities) this._state.identities.hasOwnProperty(d) && "$identity_mp_id" !== d && "$identity_anonymous_id" !== d && delete this._state.identities[d];
            this._state.history_login_id = {
                name: "",
                value: ""
            }
        }
        this.save()
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
    getHistoryLoginId: function() {
        return isObject(this._state.history_login_id) ? this._state.history_login_id : null
    },
    getLoginDistinctId: function() {
        var e = this.getHistoryLoginId();
        return isObject(e) && e.value ? e.name !== meta.user.LOGIN_ID_KEY ? e.name + "+" + e.value : e.value : null
    },
    getProps: function() {
        return this._state.props || {}
    },
    setProps: function(e, t) {
        var a = this._state.props || {};
        t ? this.set("props", e) : (_.extend(a, e), this.set("props", a))
    },
    set: function(e, t) {
        var a = {};
        for (var r in "string" == typeof e ? a[e] = t : "object" == typeof e && (a = e), this._state = this._state || {}, a) this._state[r] = a[r], "first_id" === r ? delete this._state._first_id : "distinct_id" === r && (delete this._state._distinct_id, sa.events.emit("changeDistinctId"));
        this.save()
    },
    identitiesSet: function(e) {
        var t = {};
        switch (e.type) {
            case "login":
                t.$identity_mp_id = sa.store._state.identities.$identity_mp_id, t[e.id_name] = e.id;
                break;
            case "logout":
                t.$identity_mp_id = sa.store._state.identities.$identity_mp_id;
                break;
            case "identify":
                (t = _.deepCopy(sa.store._state.identities)).$identity_anonymous_id = e.id
        }
        sa.store.set("identities", t)
    },
    change: function(e, t) {
        this._state["_" + e] = t
    },
    encryptStorage: function() {
        var e = this.getStorage(),
            t = "data:enc;";
        _.isObject(e) ? e = t + _.rot13obfs(JSON.stringify(e)) : _.isString(e) && -1 === e.indexOf(t) && (e = t + _.rot13obfs(e)), sa._.setStorageSync(sa.para.storage_store_key, e)
    },
    save: function() {
        var e = _.deepCopy(this._state),
            t = _.rot13obfs(JSON.stringify(e.identities));
        if (e.identities = t, delete e._first_id, delete e._distinct_id, sa.para.encrypt_storage) {
            e = "data:enc;" + _.rot13obfs(JSON.stringify(e))
        }
        sa._.setStorageSync(sa.para.storage_store_key, e)
    },
    init: function() {
        var e = this.getStorage();
        if (e) _.isString(e) && -1 !== e.indexOf("data:enc;") && (e = e.substring("data:enc;".length), e = JSON.parse(_.rot13defs(e))), this.toState(e);
        else {
            is_first_launch = !0;
            var t = new Date,
                a = t.getTime();
            t.setHours(23), t.setMinutes(59), t.setSeconds(60), sa.setOnceProfile({
                $first_visit_time: new Date
            }), this.set({
                distinct_id: this.getUUID(),
                first_visit_time: a,
                first_visit_day_time: t.getTime(),
                identities: {
                    $identity_mp_id: this.getUUID()
                },
                history_login_id: {
                    name: "",
                    value: ""
                }
            })
        }
        sa.store.checkStoreInit()
    },
    checkStoreInit: function() {
        meta.init_status && (this.store_queue.length > 0 && _.each(this.store_queue, function(e) {
            sa[e.method].apply(sa, _.slice.call(e.params))
        }), this.store_queue = [])
    }
}, sa.setProfile = function(e, t) {
    sa.saEvent.send({
        type: "profile_set",
        properties: e
    }, t)
}, sa.setOnceProfile = function(e, t) {
    sa.saEvent.send({
        type: "profile_set_once",
        properties: e
    }, t)
}, sa.appendProfile = function(e, t) {
    if (!_.isObject(e)) return !1;
    _.each(e, function(t, a) {
        _.isString(t) ? e[a] = [t] : (delete e[a], logger.info("appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"))
    }), sa.saEvent.send({
        type: "profile_append",
        properties: e
    }, t)
}, sa.incrementProfile = function(e, t) {
    if (!_.isObject(e)) return !1;
    var a = e;
    _.isString(e) && ((e = {})[a] = 1), sa.saEvent.send({
        type: "profile_increment",
        properties: e
    }, t)
}, sa.track = function(e, t, a) {
    this.saEvent.send({
        type: "track",
        event: e,
        properties: t
    }, a)
}, sa.identify = function(e, t) {
    if (!checkPrivacyStatus()) return !1;
    if (!meta.init_status) return sa.store.store_queue.push({
        method: "identify",
        params: arguments
    }), !1;
    if (e = _.validId(e)) {
        var a = sa.store.getFirstId();
        !0 === t ? a ? sa.store.set("first_id", e) : sa.store.set("distinct_id", e) : a ? sa.store.change("first_id", e) : sa.store.change("distinct_id", e), sa.store.identitiesSet({
            type: "identify",
            id: e
        })
    }
}, sa.trackSignup = function(e, t, a, r) {
    var s, i, n, o;
    isObject(e) ? (s = e.id, i = e.event_name, n = e.id_name) : (s = e, i = t), sa.store.set("distinct_id", s), o = n && n !== meta.user.LOGIN_ID_KEY ? n + "+" + s : s;
    var _ = sa.store.getFirstId() || sa.store.getDistinctId();
    sa.saEvent.send({
        original_id: _,
        distinct_id: o,
        login_id: o,
        type: "track_signup",
        event: i,
        properties: a
    }, r)
}, sa.registerApp = function(e) {
    _.isObject(e) && !_.isEmptyObject(e) && (_.info.currentProps = _.extend(_.info.currentProps, e))
}, sa.register = function(e) {
    _.isObject(e) && !_.isEmptyObject(e) && sa.store.setProps(e)
}, sa.clearAllRegister = function() {
    sa.store.setProps({}, !0)
}, sa.clearAllProps = function(e) {
    var t = sa.store.getProps(),
        a = {};
    _.isArray(e) && (_.each(t, function(t, r) {
        _.include(e, r) || (a[r] = t)
    }), sa.store.setProps(a, !0))
}, sa.clearAppRegister = function(e) {
    _.isArray(e) && _.each(_.info.currentProps, function(t, a) {
        _.include(e, a) && delete _.info.currentProps[a]
    })
}, _.setLatestChannel = function(e) {
    _.isEmptyObject(e) || (function(e, t) {
        var a = !1;
        for (var r in t) e[t[r]] && (a = !0);
        return a
    }(e, latest_source_channel) && (sa.clearAppRegister(latest_source_channel), sa.clearAllProps(latest_source_channel)), sa.para.is_persistent_save.utm ? sa.register(e) : sa.registerApp(e))
}, _.setLatestShare = function(e) {
    (e.$latest_share_depth || e.$latest_share_distinct_id || e.$latest_share_url_path || e.$latest_share_method) && (sa.clearAppRegister(latest_share_info), sa.clearAllProps(latest_share_info), sa.para.is_persistent_save.share ? sa.register(e) : sa.registerApp(e))
}, sa.login = function(e) {
    if (!(e = _.validId(e))) return !1;
    if (isSameAndAnonymousID(e)) return !1;
    var t = sa.store.getFirstId(),
        a = sa.store.getDistinctId(),
        r = meta.user.LOGIN_ID_KEY;
    isNewLoginId(r, e) && (sa.store._state.identities[r] = e, sa.store.set("history_login_id", {
        name: r,
        value: e
    }), t ? sa.trackSignup({
        id: e,
        event_name: "$SignUp"
    }) : (sa.store.set("first_id", a), sa.trackSignup({
        id: e,
        event_name: "$SignUp"
    })), sa.store.identitiesSet({
        type: "login",
        id: e,
        id_name: r
    }))
}, sa.loginWithKey = function(e, t) {
    if (!_.isString(e)) return logger.info("Key must be String"), !1;
    if (!_.check.checkKeyword(e) && e.length > 100) a = "Key [" + e + "] is invalid", logger.info(a);
    else if (!_.check.checkKeyword(e)) return a = "Key [" + e + "] is invalid", logger.info(a), !1;
    if (isPresetIdKeys(e, ["$mp_id", "$identity_mp_id"])) {
        var a = "Key [" + e + "] is invalid";
        return logger.info(a), !1
    }
    if (!(t = _.validId(t))) return !1;
    if (isSameAndAnonymousID(t)) return !1;
    var r = sa.store.getFirstId(),
        s = sa.store.getDistinctId();
    isNewLoginId(e, t) && (sa.store._state.identities[e] = t, sa.store.set("history_login_id", {
        name: e,
        value: t
    }), r ? sa.trackSignup({
        id: t,
        event_name: "$SignUp",
        id_name: e
    }) : (sa.store.set("first_id", s), sa.trackSignup({
        id: t,
        event_name: "$SignUp",
        id_name: e
    })), sa.store.identitiesSet({
        type: "login",
        id: t,
        id_name: e
    }))
}, sa.getAnonymousID = function() {
    if (!_.isEmptyObject(sa.store._state)) return sa.store._state._first_id || sa.store._state.first_id || sa.store._state._distinct_id || sa.store._state.distinct_id;
    logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK")
}, sa.getIdentities = function() {
    return _.isEmptyObject(sa.store._state) ? (logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK"), null) : sa.store._state.identities || null
}, sa.logout = function(e) {
    var t = sa.store.getFirstId();
    sa.store.identitiesSet({
        type: "logout"
    }), sa.store.set("history_login_id", {
        name: "",
        value: ""
    }), t ? (sa.store.set("first_id", ""), !0 === e ? sa.store.set("distinct_id", sa.store.getUUID()) : sa.store.set("distinct_id", t)) : logger.info("\u6ca1\u6709first_id\uff0clogout\u5931\u8d25")
}, sa.openid = {
    getRequest: function(e) {
        wx.login({
            success: function(t) {
                t.code && sa.para.appid && sa.para.openid_url ? _.wxrequest({
                    url: sa.para.openid_url + "&code=" + t.code + "&appid=" + sa.para.appid,
                    method: "GET",
                    complete: function(t) {
                        _.isObject(t) && _.isObject(t.data) && t.data.openid ? e(t.data.openid) : e()
                    }
                }) : e()
            }
        })
    },
    getWXStorage: function() {
        var e = sa.store.getStorage();
        if (e && _.isObject(e)) return e.openid
    },
    getOpenid: function(e) {
        if (!sa.para.appid) return e(), !1;
        var t = this.getWXStorage();
        t ? e(t) : this.getRequest(e)
    }
}, sa.init = function(e) {
    if (!0 === meta.init_status) return !1;
    meta.init_status = !0, e && _.isObject(e) && sa.setPara(e), sa.store.init(), sa._.info.getSystem(), sa.checkPluginInitStatus(), sa.para.batch_send && sendStrategy.init(), sa.initialState.storeIsComplete = !0, sa.initialState.checkIsComplete(), checkAppLaunch()
}, sa.getPresetProperties = function() {
    if (_.info && _.info.properties && _.info.properties.$lib) {
        var e = {};
        _.each(_.info.currentProps, function(t, a) {
            0 === a.indexOf("$") && (e[a] = t)
        });
        var t = {
                $url_path: _.getCurrentPath(),
                $is_first_day: _.getIsFirstDay(),
                $is_first_time: is_first_launch
            },
            a = _.extend(e, t, _.info.properties, sa.store.getProps());
        return delete a.$lib, a
    }
    return {}
}, sa.setOpenid = function(e, t) {
    if (!(e = _.validId(e))) return !1;
    if (!checkPrivacyStatus()) return !1;
    if (!meta.init_status) return sa.store.store_queue.push({
        method: "setOpenid",
        params: arguments
    }), !1;
    t && console.log("%c \u5f53\u524d\u7248\u672c setOpenid \u63a5\u53e3 \u5df2\u4e0d\u652f\u6301\u4f20\u5165\u7b2c\u4e8c\u4e2a\u53c2\u6570", "color:#F39C12;font-size: 14px;"), sa.store.set("openid", e), sa.identify(e, !0);
    var a = _.getOpenidNameByAppid();
    sa.store._state.identities[a] = e, sa.store.save()
}, sa.unsetOpenid = function(e) {
    var t = _.validId(e);
    if (!t) return !1;
    sa.store._state.openid === t && sa.store.set("openid", "");
    var a = _.getOpenidNameByAppid();
    sa.store._state.identities.hasOwnProperty(a) && t === sa.store._state.identities[a] && (delete sa.store._state.identities[a], sa.store.save())
}, sa.setUnionid = function(e) {
    var t = _.validId(e);
    t && (sa.store._state.identities.$identity_mp_unionid = t, sa.store.save())
}, sa.unsetUnionid = function(e) {
    var t = _.validId(e);
    if (t && sa.store._state.identities.hasOwnProperty("$identity_mp_unionid") && t === sa.store._state.identities.$identity_mp_unionid) {
        var a = _.getOpenidNameByAppid();
        sa.store._state.identities.hasOwnProperty(a) && (delete sa.store._state.identities[a], delete sa.store._state.openid, sa.store.save()), delete sa.store._state.identities.$identity_mp_unionid, sa.store.save()
    }
}, sa.initWithOpenid = function(e, t) {
    (e = e || {}).appid && (sa.para.appid = e.appid), sa.openid.getOpenid(function(a) {
        a && sa.setOpenid(a, e.isCoverLogin), t && _.isFunction(t) && t(a), sa.init(e)
    })
}, sa.bind = function(e, t) {
    if (_.isNumber(t)) {
        if (_.isInteger(t) && !1 === _.isSafeInteger(t)) return logger.info("Value must be String"), !1;
        t = String(t)
    }
    if (!_.isString(e)) return logger.info("Key must be String"), !1;
    var a = sa.store.getHistoryLoginId(),
        r = a ? a.name : "";
    if (!_.check.checkKeyword(e) || isPresetIdKeys(e, [meta.user.LOGIN_ID_KEY, r, "$mp_id", "$identity_mp_id"])) {
        var s = "Key [" + e + "] is invalid";
        return logger.info(s), !1
    }
    if (!t || "" === t) return logger.info("Value is empty or null"), !1;
    if (!_.isString(t)) return logger.info("Value must be String"), !1;
    if (!_.check.ckeckIdLength(t)) {
        s = "Value [" + t + "] is beyond the maximum length 255";
        return logger.info(s), !1
    }
    sa.store._state.identities[e] = t, sa.store.save(), sa.saEvent.send({
        type: "track_id_bind",
        event: "$BindID"
    })
}, sa.unbind = function(e, t) {
    if (_.isNumber(t)) {
        if (_.isInteger(t) && !1 === _.isSafeInteger(t)) return logger.info("Value must be String"), !1;
        t = String(t)
    }
    if (!_.isString(e)) return logger.info("Key must be String"), !1;
    if (!_.check.checkKeyword(e) || isPresetIdKeys(e, [meta.user.LOGIN_ID_KEY])) {
        var a = "Key [" + e + "] is invalid";
        return logger.info(a), !1
    }
    if (!t || "" === t) return logger.info("Value is empty or null"), !1;
    if (!_.isString(t)) return logger.info("Value must be String"), !1;
    if (!_.check.ckeckIdLength(t)) {
        a = "Value [" + t + "] is beyond the maximum length 255";
        return logger.info(a), !1
    }
    sa.store._state.identities.hasOwnProperty(e) && t === sa.store._state.identities[e] && ("$mp_id" !== e && "$identity_mp_id" !== e && delete sa.store._state.identities[e], sa.store.save());
    var r = sa.store.getDistinctId(),
        s = sa.store.getFirstId();
    r === e + "+" + t && (sa.store.set("first_id", ""), sa.store.set("distinct_id", s), sa.store.set("history_login_id", {
        name: "",
        value: ""
    }));
    var i = {};
    i[e] = t, sa.saEvent.send({
        type: "track_id_unbind",
        event: "$UnbindID",
        unbind_value: i
    })
}, sa.setWebViewUrl = function(e, t) {
    if (!_.isString(e) || "" === e) return logger.info("error:\u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f"), !1;
    if (!/^http(s)?:\/\//.test(e)) return logger.info("warning: \u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f"), !1;
    var a = /([^?#]+)(\?[^#]*)?(#.*)?/.exec(e);
    if (!a) return !1;
    var r, s = a[1] || "",
        i = a[2] || "",
        n = a[3] || "",
        o = "",
        u = sa.store.getDistinctId() || "",
        c = sa.store.getFirstId() || "";
    _.urlSafeBase64 && _.urlSafeBase64.encode ? u = u ? _.urlSafeBase64.trim(_.urlSafeBase64.encode(_.urlBase64Encode(u))) : "" : this._.rot13obfs && (u = u ? _.rot13obfs(u) : ""), u = encodeURIComponent(u);
    var p = c ? "f" + u : "d" + u;
    t ? (r = n.indexOf("_sasdk"), o = n.indexOf("?") > -1 ? r > -1 ? s + i + "#" + n.substring(1, r) + "_sasdk=" + p : s + i + "#" + n.substring(1) + "&_sasdk=" + p : s + i + "#" + n.substring(1) + "?_sasdk=" + p) : (r = i.indexOf("_sasdk"), o = /^\?(\w)+/.test(i) ? r > -1 ? s + i.replace(/(_sasdk=)([^&]*)/gi, "_sasdk=" + p) + n : s + "?" + i.substring(1) + "&_sasdk=" + p + n : s + "?" + i.substring(1) + "_sasdk=" + p + n);
    return o
}, _.each(["setProfile", "setOnceProfile", "track", "quick", "incrementProfile", "appendProfile", "login", "logout", "registerApp", "register", "clearAllRegister", "clearAllProps", "clearAppRegister", "bind", "unbind", "unsetOpenid", "setUnionid", "unsetUnionid"], function(e) {
    var t = sa[e];
    sa[e] = function() {
        if (!checkPrivacyStatus()) return !1;
        sa.initialState.isComplete ? t.apply(sa, arguments) : sa.initialState.queue.push([e, arguments])
    }
}), _.setQuery = function(e, t) {
    if (e && _.isObject(e) && !_.isEmptyObject(e)) {
        var a = [];
        return _.each(e, function(e, r) {
            "q" === r && _.isString(e) && 0 === e.indexOf("http") || (t ? a.push(r + "=" + e) : a.push(r + "=" + _.decodeURIComponent(e)))
        }), a.join("&")
    }
    return ""
}, _.getUtmFromPage = function() {
    var e = {};
    try {
        var t = _.getCurrentPage(),
            a = _.deepCopy(t.options);
        for (var r in a) a[r] = _.decodeURIComponent(a[r]);
        e = _.getCustomUtmFromQuery(a, "$", "_", "$")
    } catch (e) {
        logger.info(e)
    }
    return e
}, _.sendPageLeave = function() {
    var e = {},
        t = "";
    try {
        t = (e = _.getCurrentPage()) ? e.route : ""
    } catch (e) {
        logger.info(e)
    }
    if (page_show_time >= 0 && "" !== t) {
        var a = {},
            r = _.getPageTitle(t),
            s = (Date.now() - page_show_time) / 1e3;
        (isNaN(s) || s < 0) && (s = 0), a.$url_query = e.sensors_mp_url_query ? e.sensors_mp_url_query : "", a.$url_path = t, a.$title = r, a.event_duration = s, -1 === sa.para.autotrack_exclude_page.pageLeave.indexOf(t) && sa.track("$MPPageLeave", a), page_show_time = -1
    }
}, sa.autoTrackCustom = {
    trackCustom: function(e, t, a) {
        var r = sa.para.autoTrack[e],
            s = "";
        sa.para.autoTrack && r && ("function" == typeof r ? (s = r(), _.isObject(s) && _.extend(t, s)) : _.isObject(r) && (_.extend(t, r), sa.para.autoTrack[e] = !0), sa.track(a, t))
    },
    appLaunch: function(e, t) {
        if ("object" != typeof this || this.trackCustom || (this[sa.para.name] = sa), !checkPrivacyStatus()) return !1;
        if (!sa.initialState.isComplete) return sa.initialState.queue.push(["appLaunch", arguments]), meta.life_state.app_launched = !0, !1;
        meta.life_state.app_launched = !0;
        var a = {};
        if (e && e.scene ? (current_scene = e.scene, sa.current_scene = current_scene, a.$scene = _.getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, _.delObjectKey(e.query)), e && e.path && (a.$url_path = _.getPath(e.path), a.$title = _.getPageTitle(e.path), e.query && _.isObject(e.query))) {
            var r = _.setQuery(e.query);
            r = r ? "?" + r : "", a.$url = a.$url_path + r
        }
        _.setShareInfo(e, a);
        var s = _.setUtm(e, a);
        is_first_launch ? (a.$is_first_time = !0, _.isEmptyObject(s.pre1) || sa.setOnceProfile(s.pre1)) : a.$is_first_time = !1, _.setLatestChannel(s.pre2), _.setSfSource(e, a), sa.registerApp({
            $latest_scene: a.$scene
        }), a.$url_query = _.setQuery(e.query), _.setPageRefData(a), t ? (a = _.extend(a, t), sa.track("$MPLaunch", a)) : sa.para.autoTrack && sa.para.autoTrack.appLaunch && sa.autoTrackCustom.trackCustom("appLaunch", a, "$MPLaunch")
    },
    appShow: function(e, t) {
        var a = {};
        mpshow_time = (new Date).getTime(), e && e.scene ? (current_scene = e.scene, sa.current_scene = current_scene, a.$scene = _.getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, _.delObjectKey(e.query)), e && e.path && (a.$url_path = _.getPath(e.path), a.$title = _.getPageTitle(e.path)), _.setShareInfo(e, a);
        var r = _.setUtm(e, a);
        _.setLatestChannel(r.pre2), _.setSfSource(e, a), sa.registerApp({
            $latest_scene: a.$scene
        }), a.$url_query = _.setQuery(e.query), _.setPageRefData(a, e.path, a.$url_query), e && e.path && (a.$url = e.path + (a.$url_query ? "?" + a.$url_query : "")), t ? (a = _.extend(a, t), sa.track("$MPShow", a)) : sa.para.autoTrack && sa.para.autoTrack.appShow && sa.autoTrackCustom.trackCustom("appShow", a, "$MPShow")
    },
    appHide: function(e) {
        var t = (new Date).getTime(),
            a = {};
        a.$url_path = _.getCurrentPath(), mpshow_time && t - mpshow_time > 0 && (t - mpshow_time) / 36e5 < 24 && (a.event_duration = (t - mpshow_time) / 1e3), _.setPageRefData(a), e ? (a = _.extend(a, e), sa.track("$MPHide", a)) : sa.para.autoTrack && sa.para.autoTrack.appHide && sa.autoTrackCustom.trackCustom("appHide", a, "$MPHide"), sendStrategy.onAppHide()
    },
    pageLoad: function(e) {
        current_scene && 1010 === current_scene && e && (e.sampshare && delete e.sampshare, _.delObjectKey(e)), e && _.isObject(e) && (this.sensors_mp_url_query = _.setQuery(e), this.sensors_mp_encode_url_query = _.setQuery(e, !0))
    },
    pageShow: function() {
        page_show_time = Date.now();
        var e = {},
            t = _.getCurrentPath(),
            a = _.getPageTitle(t);
        _.setRefPage(), e.$url_path = t, e.$url_query = this.sensors_mp_url_query ? this.sensors_mp_url_query : "", e = _.extend(e, _.getUtmFromPage()), _.setPageRefData(e), _.setPageSfSource(e), a && (e.$title = a), sa.para.onshow ? sa.para.onshow(sa, t, this) : -1 === sa.para.autotrack_exclude_page.pageShow.indexOf(t) && sa.autoTrackCustom.trackCustom("pageShow", e, "$MPViewScreen")
    },
    pageShare: function(e) {
        var t = e.onShareAppMessage;
        e.onShareAppMessage = function() {
            share_method = "\u8f6c\u53d1\u6d88\u606f\u5361\u7247";
            var e = t.apply(this, arguments);
            if (sa.para.autoTrack && sa.para.autoTrack.pageShare) {
                var a = {
                    $url_path: _.getCurrentPath(),
                    $share_depth: query_share_depth,
                    $share_method: share_method
                };
                _.setPageRefData(a), sa.autoTrackCustom.trackCustom("pageShare", a, "$MPShare")
            }
            return sa.para.allow_amend_share_path && ("object" != typeof e && ((e = {}).path = _.getCurrentUrl(this)), "object" != typeof e || void 0 !== e.path && "" !== e.path || (e.path = _.getCurrentUrl(this)), "object" == typeof e && "string" == typeof e.path && (-1 === e.path.indexOf("?") ? e.path = e.path + "?" : "&" !== e.path.slice(-1) && (e.path = e.path + "&")), e.path = e.path + _.getShareInfo()), e
        }
    },
    pageShareTimeline: function(e) {
        var t = e.onShareTimeline;
        e.onShareTimeline = function() {
            share_method = "\u670b\u53cb\u5708\u5206\u4eab";
            var e = t.apply(this, arguments);
            if (sa.para.autoTrack && sa.para.autoTrack.pageShare) {
                var a = {
                    $url_path: _.getCurrentPath(),
                    $share_depth: query_share_depth,
                    $share_method: share_method
                };
                _.setPageRefData(a), sa.autoTrackCustom.trackCustom("pageShare", a, "$MPShare")
            }
            return sa.para.allow_amend_share_path && ("object" != typeof e && (e = {}), "object" == typeof e && void 0 === e.query && (e.query = ""), "object" == typeof e && "string" == typeof e.query && "" !== e.query && "&" !== e.query.slice(-1) && (e.query = e.query + "&"), e.query = e.query + _.getShareInfo()), e
        }
    },
    pageAddFavorites: function() {
        var e = {};
        e.$url_path = _.getCurrentPath(), sa.para.autoTrack && sa.para.autoTrack.mpFavorite && sa.autoTrackCustom.trackCustom("mpFavorite", e, "$MPAddFavorites")
    }
}, sa.quick = function() {
    var e = arguments[0],
        t = arguments[1],
        a = arguments[2],
        r = _.isObject(a) ? a : {};
    if ("getAnonymousID" === e) {
        if (!_.isEmptyObject(sa.store._state)) return sa.store._state._first_id || sa.store._state.first_id || sa.store._state._distinct_id || sa.store._state.distinct_id;
        logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK")
    } else "appLaunch" === e || "appShow" === e ? t ? sa.autoTrackCustom[e](t, r) : logger.info("App\u7684launch\u548cshow\uff0c\u5728sensors.quick\u7b2c\u4e8c\u4e2a\u53c2\u6570\u5fc5\u987b\u4f20\u5165App\u7684options\u53c2\u6570") : "appHide" === e && (r = _.isObject(t) ? t : {}, sa.autoTrackCustom[e](r))
}, sa.appLaunch = function(e, t) {
    var a = {};
    e && e.scene ? (current_scene = e.scene, sa.current_scene = current_scene, a.$scene = _.getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, _.delObjectKey(e.query)), e && e.path && (a.$url_path = _.getPath(e.path), a.$title = _.getPageTitle(e.path)), _.setShareInfo(e, a);
    var r = _.setUtm(e, a);
    is_first_launch ? (a.$is_first_time = !0, _.isEmptyObject(r.pre1) || sa.setOnceProfile(r.pre1)) : a.$is_first_time = !1, _.setLatestChannel(r.pre2), _.setSfSource(e, a), sa.registerApp({
        $latest_scene: a.$scene
    }), a.$url_query = _.setQuery(e.query), a.$url = e.path + (a.$url_query ? "?" + a.$url_query : ""), _.setPageRefData(t), _.isObject(t) && (a = _.extend(a, t)), sa.track("$MPLaunch", a)
}, sa.appShow = function(e, t) {
    var a = {};
    mpshow_time = (new Date).getTime(), e && e.scene ? (current_scene = e.scene, sa.current_scene = current_scene, a.$scene = _.getMPScene(e.scene)) : a.$scene = "\u672a\u53d6\u5230\u503c", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, _.delObjectKey(e.query)), e && e.path && (a.$url_path = _.getPath(e.path), a.$title = _.getPageTitle(e.path)), _.setShareInfo(e, a);
    var r = _.setUtm(e, a);
    _.setLatestChannel(r.pre2), _.setSfSource(e, a), sa.registerApp({
        $latest_scene: a.$scene
    }), a.$url_query = _.setQuery(e.query), e && e.path && (a.$url = e.path + (a.$url_query ? "?" + a.$url_query : "")), _.setPageRefData(a, e.path, a.$url_query), _.isObject(t) && (a = _.extend(a, t)), sa.track("$MPShow", a)
}, sa.appHide = function(e) {
    var t = (new Date).getTime(),
        a = {};
    a.$url_path = _.getCurrentPath(), mpshow_time && t - mpshow_time > 0 && (t - mpshow_time) / 36e5 < 24 && (a.event_duration = (t - mpshow_time) / 1e3), _.setPageRefData(a), _.isObject(e) && (a = _.extend(a, e)), sa.track("$MPHide", a), sendStrategy.onAppHide()
}, sa.pageShow = function(e) {
    var t = {},
        a = _.getCurrentPath(),
        r = _.getPageTitle(a),
        s = _.getCurrentPage();
    _.setRefPage(), r && (t.$title = r), t.$url_path = a, t.$url_query = s.sensors_mp_url_query ? s.sensors_mp_url_query : "", t = _.extend(t, _.getUtmFromPage()), _.setPageSfSource(t), _.setPageRefData(t), _.isObject(e) && (t = _.extend(t, e)), sa.track("$MPViewScreen", t)
}, initAppProxy(), initPageProxy(), module.exports = sa;