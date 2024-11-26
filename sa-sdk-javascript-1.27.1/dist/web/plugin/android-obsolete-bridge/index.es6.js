var vbridge=window.SensorsData_App_Visual_Bridge,vmode=vbridge&&vbridge.sensorsdata_visualized_mode,valert=vbridge&&vbridge.sensorsdata_visualized_alert_info,vhover=vbridge&&vbridge.sensorsdata_hover_web_nodes;function alertApp(e){return valert&&valert.call(vbridge,JSON.stringify(e))}function hoverNode(e){return vmode.call(vbridge)&&vhover&&vhover.call(vbridge,JSON.stringify(e))}function callBridge(e,r){return r&&"function"==typeof r[e.callType]&&r[e.callType]()}var anBridge,anTrack,anVerify,anVisualVerify,sd,_,log,vbridge$1={isVerify:function(){return vmode&&(!0===vmode||vmode.call(vbridge))},commands:{app_alert:alertApp,visualized_track:hoverNode,page_info:hoverNode,sensorsdata_get_app_visual_config:callBridge}},sdkversion_placeholder="1.27.1";function wrapPluginInitFn(e,r,a){if(r&&(e.plugin_name=r),a&&e.init){var i=e.init;e.init=function(n,d){if(wrapLogFn(n,e,r),n.readyState&&n.readyState.state>=3||!n.on)return o();function o(){i.call(e,n,d)}n.on(a,o)}}return e}function wrapLogFn(e,r,a){function i(r,i){e.logger?e.logger.msg.apply(e.logger,i).module(a+""||"").level(r).log():e.log&&e.log.apply(e,i)}r.log=function(){i("log",arguments)},r.warn=function(){i("warn",arguments)},r.error=function(){i("error",arguments)}}function createPlugin(e,r,a){return wrapPluginInitFn(e,r,a),e.plugin_version=sdkversion_placeholder,e}var AndroidObsoleteBridge={init:function(e){_=(sd=e)&&sd._,log=sd&&sd.log||console&&console.log||function(){},initBridge()},handleCommand:handleCommand};function initBridge(){if(log("ObsoleteBridge---test---init---"),anBridge=window.SensorsData_APP_JS_Bridge,anTrack=anBridge&&anBridge.sensorsdata_track,anVerify=anBridge&&anBridge.sensorsdata_verify,anVisualVerify=anBridge&&anBridge.sensorsdata_visual_verify,log("ObsoleteBridge-",sd.bridge.activeBridge,anVerify,anTrack,anVisualVerify),sd&&!sd.bridge.activeBridge&&(anVerify||anTrack||anVisualVerify)){sd.bridge.activeBridge=AndroidObsoleteBridge;var e=anVerify||anTrack;anVisualVerify&&(e=!!anVisualVerify.call(anBridge,JSON.stringify({server_url:sd.para.server_url})),log("ObsoleteBridge---called-return",e)),sd.bridge.bridge_info={touch_app_bridge:!0,platform:"android",verify_success:e?"success":"fail"},sd.para.app_js_bridge?(sd.registerInterceptor("sendDataStage",{send:{priority:80,entry:sendData}}),log("Android obsolete bridge inits succeed.")):log("app_js_bridge is not configured, data will not be sent by android obsolete bridge.")}}function sendData(e,r){if(log("ObsoleteBridge---senddata"),sd.para.app_js_bridge.is_mui||"item_set"===e.data.type||"item_delete"===e.data.type)return e;var a=e.callback;if(anVerify){var i=anVerify&&anVerify.call(anBridge,JSON.stringify(_.extend({server_url:sd.para.server_url},e.data)));return log("ObsoleteBridge---anVerify-success",i),i?(_.isFunction(a)&&a(),r.cancellationToken.cancel(),e):sd.para.app_js_bridge.is_send?(sd.debug.apph5({data:e.data,step:"3.1",output:"all"}),e):(_.isFunction(a)&&a(),r.cancellationToken.cancel(),e)}return log("ObsoleteBridge---is-send-old-way",sd.para.app_js_bridge.is_send),anTrack&&anTrack.call(anBridge,JSON.stringify(_.extend({server_url:sd.para.server_url},e.data))),_.isFunction(a)&&a(),r.cancellationToken.cancel(),e}function handleCommand(e){log("ObsoleteBridge---handleCommadn");var r=e.callType;return r in vbridge$1.commands?(log("ObsoleteBridge---",r,vbridge$1.commands),vbridge$1.commands[r](e,anBridge)):anBridge&&_.isFunction(anBridge.sensorsdata_js_call_app)?(log("ObsoleteBridge---handleCommadn-abridge"),anBridge.sensorsdata_js_call_app(JSON.stringify(e))):void 0}var index=createPlugin(AndroidObsoleteBridge,"AndroidObsoleteBridge","sdkAfterInitPara");export default index;