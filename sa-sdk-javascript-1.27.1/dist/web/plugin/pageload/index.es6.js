var sdkversion_placeholder="1.27.1";function wrapPluginInitFn(e,n,t){if(n&&(e.plugin_name=n),t&&e.init){var r=e.init;e.init=function(o,i){if(wrapLogFn(o,e,n),o.readyState&&o.readyState.state>=3||!o.on)return a();function a(){r.call(e,o,i)}o.on(t,a)}}return e}function wrapLogFn(e,n,t){function r(n,r){e.logger?e.logger.msg.apply(e.logger,r).module(t+""||"").level(n).log():e.log&&e.log.apply(e,r)}n.log=function(){r("log",arguments)},n.warn=function(){r("warn",arguments)},n.error=function(){r("error",arguments)}}function createPlugin(e,n,t){return wrapPluginInitFn(e,n,t),e.plugin_version=sdkversion_placeholder,e}var eventSent=!1,PageLoad={init:function(e,n){function t(){var r=0,o=window.performance||window.webkitPerformance||window.msPerformance||window.mozPerformance,i={$url:e._.getURL(),$title:document.title,$url_path:e._.getURLPath(),$referrer:e._.getReferrer(null,!0)};if(o?(r=function(n){var t=0;return e._.isFunction(n.getEntriesByType)&&(t=((n.getEntriesByType("navigation")||[{}])[0]||{}).domContentLoadedEventEnd||0),t}(o)||function(n){var t=0;if(n.timing){var r=n.timing;0!==r.fetchStart&&e._.isNumber(r.fetchStart)&&0!==r.domContentLoadedEventEnd&&e._.isNumber(r.domContentLoadedEventEnd)?t=r.domContentLoadedEventEnd-r.fetchStart:e.log("performance \u6570\u636e\u83b7\u53d6\u5f02\u5e38")}return t}(o),function(n,t){if(n.getEntries&&"function"==typeof n.getEntries){for(var r=n.getEntries(),o=null,i=0;i<r.length;i++)"transferSize"in r[i]&&(o+=r[i].transferSize);e._.isNumber(o)&&o>=0&&o<10737418240&&(t.$page_resource_size=Number((o/1024).toFixed(3)))}}(o,i)):e.log("\u6d4f\u89c8\u5668\u672a\u652f\u6301 performance API."),r>0){var a=e._.isObject(n)&&n.max_duration||1800;r=Number((r/1e3).toFixed(3)),(!e._.isNumber(a)||a<=0||r<=a)&&(i.event_duration=r)}eventSent||(e.track("$WebPageLoad",i),eventSent=!0),window.removeEventListener?window.removeEventListener("load",t):window.detachEvent&&window.detachEvent("onload",t)}"complete"==document.readyState?t():window.addEventListener?window.addEventListener("load",t):window.attachEvent&&window.attachEvent("onload",t)}},index=createPlugin(PageLoad,"PageLoad","sdkReady");export default index;