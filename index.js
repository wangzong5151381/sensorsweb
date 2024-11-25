import web from './web/sensorsdata.es6.min.js' // "1.25.13"
import popup from './popup/popup.esm.min.js' // "0.4.3"
import Exposure from './web/plugin/exposure/index.es6.js'; // 初始化曝光

window['SENSORS'] = web;
window['SENSORS_POPUP'] = popup;
window['SENSORS_EXPOSURE'] = SENSORS.use(Exposure, {
  area_rate: 0, 
  stay_duration: 2, 
  repeated: true 
});

var hostList = ['tkda.health.taikang.com','hdhealth.taikang.com', 'apitkd.wx.taikang.com', 'jjkk.health.taikang.com'];
var proc = hostList.indexOf(window.location.hostname) != -1
// let protocol = window.location.protocol
let protocol = 'https:'
let requesturl = proc ? `${protocol}//dom.taikanglife.com/sa?project=production` : `${protocol}//domtest.taikanglife.com/sa?project=default`
let popApiBaseUrl = 'https://sensorscene.taikanglife.com/api/v2'
SENSORS.use('PageLeave')
SENSORS.init({
  server_url: requesturl,
  is_track_single_page: function (){
    return true //时候，使用默认发送的 $pageview
    // return false 时候，不执行默认的 $pageview
    // return {} 时候，把对象中的属性，覆盖默认 $pageview 里的属性。
  }, //单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件。注意：如果进首页不会自动 redirect 时，sa.quick('autoTrack') 是需要的，否则不需要。
  use_client_time:true, 
  send_type:'beacon',
  show_log:true,
  scrollmap: {
    // collect_url: function(){
    //   //如果只采集首页
    //   if(location.href === 'xxx.com/index.html' || location.href === 'xxx.com/'){
    //     return true;
    //   }
    // },
  },
  heatmap: {
    //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    // 默认只有点击 a input button textarea 四种元素时，才会触发 $WebClick 元素点击事件
    clickmap:'default',
    //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    //需要 Web JS SDK 版本号大于 1.9.1
    //如果发生页面滚动时候，之前的页面停留是有效停留，也就是超过默认的 4 秒或者自定义的时间，javascript SDK 就会发送一次页面停留事件。
    //关闭页面时，发送一次页面停留事件。 神策 $WebStay 事件的采集是基于在 window 上绑定的 scroll 事件，如果页面滚动是绑定在 div 上，则无法采集。
    scroll_notice_map:'default',
    scroll_delay_time: 4000, 
	  scroll_event_duration: 18000, //单位秒，预置属性停留时长 event_duration 的最大值。默认5个小时，也就是300分钟，18000秒。
    collect_tags:{
      div: true,
      img: true
    },
    loadTimeout: 3000,
    collect_url: function(){
      //如果只采集首页
      // if(location.href === 'xxx.com/index.html' || location.href === 'xxx.com/'){
      //   return true;
      // }
    },
    //此参数针对预置 $WebClick 事件（包括 quick('trackHeatMap') quick('trackAllHeatMap') 触发的）生效。
    collect_element: function(element_target){
      // 如果这个元素有属性sensors-disable=true时候，不采集。
      let tag = null;
      if(element_target.getAttribute('sensors-disable') === 'true'){
        tag =  false;
      }else{
        tag =  true;
      }
      return tag;
    },
    //此参数针对预置 $WebClick 事件（包括 quick('trackHeatMap') quick('trackAllHeatMap') 触发的）生效。
    custom_property:function( element_target ){
      //比如您需要给有 data=test 属性的标签的点击事件增加自定义属性 name:'aa' ，则代码如下：
      // if(element_target.getAttribute('data') === 'test'){
      //   return {
      //     name:'aa'
      //   }
      // }
    },
    collect_input:function(element_target){
      //例如如果元素的 id 是a，就采集这个元素里的内容。
      // if(element_target.id === 'a'){
      //   return true;
      // }
    },
    element_selector:'not_use_id',
    renderRefreshTime:1000
  },
  app_js_bridge:{
    white_list: [requesturl]
  }
});

//用于采集 $pageview 事件。
setTimeout(()=> {
  SENSORS.quick('autoTrack', {
    platform_type:'h5'
  }); 
},0)

// 测试环境不再执行
if(proc){
  SENSORS.use('Popup', {
    // 弹窗请求服务端的接口地址
    api_base_url: popApiBaseUrl,
    // 弹窗的回调监听和 URL 链接跳转模式设置
    popup_listener: {
      /**
       * 设置弹窗按钮行为是 “URL 链接”的跳转方式，
       * 设置为 “auto” 点击按钮会自动跳转，跳转方式为当前页面跳转。
       * 设置为 "customize" 点击按钮不会进行跳转，跳转行为需要在 onClick 函数中进行设置，
       * 默认是 “customize"
       */
      openlink: "auto",
      /*
      * 弹框中元素点击事件
      * @param {string} planId 计划ID
      * @param {Object} action 点击按钮的行为参数
      */
      onClick: function (planId, action) {
        // do something...
        console.log('popup-onClick', 'planId=', planId, ', action=', action)
      },
      /*
      * 弹框加载成功
      * @param {string} planId 计划ID
      */
      onLoadSuccess: function (planId) {
        // do something...
        console.log('popup-onLoadSuccess', 'planId=', planId)
      },
      /*
      * 弹框加载失败
      * @param {string} planId 计划ID
      * @param {number} code 错误码
      * @param {string} message 错误码对应的描述信息
      */
      onLoadFailed: function (planId, code, message) {
        // do something...
        console.log('popup-onLoadFailed', 'planId=', planId,', code=', code,', message=', message)
      },
      /*
      * 弹框关闭
      * @param {string} planId 计划ID
      */
      onClose: function (planId) {
        // do something...
        console.log('popup-onClose', 'planId=', planId)
      }
    },
    // 设置弹窗触达回调监听
    popup_campaign_listener: {
      /*
      * 由返回值决定弹窗是否可以触达，返回 true 可以触达，false 不触达
      * @param SFCampaign
      */
      shouldStart: function (SFCampaign) {
        // do something...
        console.log('popup-shouldStart', 'SFCampaign=', SFCampaign)
      },
      /*
      * 触达开始回调函数
      * @param SFCampaign
      */
      onStart: function (SFCampaign) {
        // do something...
        console.log('popup-onStart', 'SFCampaign=', SFCampaign)
      },
      /*
      * 触达结束回调函数
      * @param SFCampaign
      */
      onEnd: function (SFCampaign) {
        // do something...
        console.log('popup-onEnd', 'SFCampaign=', SFCampaign)
      },
      /*
      * 触达失败回调函数
      * @param SFCampaign
      */
      onFailed: function (SFCampaign, errorCode, errorMessage) {
        // do something...
        console.log('popup-onFailed', 'SFCampaign=', SFCampaign)
      }
    }  
  })
}

// 注册公共属性
SENSORS.registerPage({
	current_url: location.href,
  referrer: document.referrer,
  platform_type:'h5'
});