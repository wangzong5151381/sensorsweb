var sdkversion_placeholder="1.27.1";function wrapPluginInitFn(n,i,e){if(i&&(n.plugin_name=i),e&&n.init){var l=n.init;n.init=function(a,r){if(wrapLogFn(a,n,i),a.readyState&&a.readyState.state>=3||!a.on)return t();function t(){l.call(n,a,r)}a.on(e,t)}}return n}function wrapLogFn(n,i,e){function l(i,l){n.logger?n.logger.msg.apply(n.logger,l).module(e+""||"").level(i).log():n.log&&n.log.apply(n,l)}i.log=function(){l("log",arguments)},i.warn=function(){l("warn",arguments)},i.error=function(){l("error",arguments)}}function createPlugin(n,i,e){return wrapPluginInitFn(n,i,e),n.plugin_version=sdkversion_placeholder,n}var isDisabled=!1,sd=null,disableSDKPlugin={init:function(n){(sd=n).disableSDK=disableSDK,sd.enableSDK=enableSDK,sd.getDisabled=getDisabled}};function disableSDK(){isDisabled=!0}function enableSDK(){isDisabled=!1}function getDisabled(){return isDisabled}var index=createPlugin(disableSDKPlugin,"DisableSDK","sdkInitAPI");export default index;