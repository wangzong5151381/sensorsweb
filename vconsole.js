<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>siemens_test</title>
</head>
<body>
    <t>测试</t>
  </div>
  <br><br>
  <button onclick="BuyProduct()">触发BuyProduct</button>
   <input id="01"  type="text" />
   <button onclick="login()">登陆login</button>

  <ul>
    <li id="1">1</li>
    <li id="2">2</li>
  </ul>
  <input id="3" type="text" />

<p><a id="theBtn" href='#'>Open the App</a></p>

</body>
<!-- <script charset="UTF-8" src="./sensorsdata.full.js"></script> -->
<script src="https://static.sensorsdata.cn/sdk/1.26.12/sensorsdata.min.js"></script>
<!-- <script src="https://cdn.bootcss.com/vConsole/3.15.1/vconsole.min.js"></script> -->
<script src="https://jssdk.debugbox.sensorsdata.cn/js/zhangyi/vconsole.js"></script>
<script charset="UTF-8">
const vConsole = new VConsole()
var sensors = window['sensorsDataAnalytic201505'];

  console.log('hello world')
sensors.init({
  // server_url: 'https://iisp-oidea.mbspex.boc.cn/sa.gif?project=production',
  // server_url: 'http://22.184.130.249:80/sa?project=production',
  server_url: 'https://sdk-product-datasink.sensorsdata.cn/sa?project=default',
  // is_secure_cookie: true,
  // is_track_single_page:false,
  use_client_time:true,
  //或者
  // batch_send:{
  //   datasend_timeout: 6000, //一次请求超过多少毫秒的话自动取消，防止请求无响应。
  //   send_interval: 6000, //间隔多少毫秒发一次数据。
  //   storage_length: 200 // 存储 localStorage 条数最大值，默认：200 。如 localStorage 条数超过该值，则使用 image 方式立即发送数据。v1.24.8 以上    支持。
  // },
  send_type:'beacon',
  app_js_bridge:true,
  // app_js_bridge: {
	// 	white_list: ['https://sdk-product-datasink.sensorsdata.cn/sa?project=default','https://sdk-product-datasink.sensorsdata.cn/sa?project=production']
	// },
  heatmap: {
    //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap:'not_collect',
    //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map:'not_collect',
    collect_tags: {
      li: true,
      img: true,
      div:true,
      input:true
    // ... 其他标签
    }  
  } ,
  show_log : true,
  source_channel:['channel'],
  //子配置项 true 表示采集,false 表示不采集,未设置的参数取默认值。
  preset_properties: {
    //是否采集 $latest_utm 最近一次广告系列相关参数，默认值 true。
    latest_utm:true,
    //是否采集 $latest_traffic_source_type 最近一次流量来源类型，默认值 true。
    latest_traffic_source_type:true,
    //是否采集 $latest_search_keyword 最近一次搜索引擎关键字，默认值 true。
    latest_search_keyword:true,
    //是否采集 $latest_referrer 最近一次前向地址，默认值 true。
    latest_referrer:true,
    //是否采集 $latest_referrer_host 最近一次前向地址，1.14.8 以下版本默认是true，1.14.8 及以上版本默认是 false，需要手动设置为 true 开启。
    latest_referrer_host:true,
    //是否采集 $latest_landing_page 最近一次落地页地址，默认值 false。
    latest_landing_page:true,
    //是否采集 $url 页面地址作为公共属性，1.16.5 以下版本默认是 false，1.16.5 及以上版本默认是 true。
    url: true,
    //是否采集 $title 页面标题作为公共属性，1.16.5 以下版本默认是 false，1.16.5 及以上版本默认是 true。
    title: true,
  }
});
// 设置之后，SDK 就会自动收集页面浏览事件，以及设置初始来源。
sensors.quick('autoTrack');

sensors.use('SensorsChannel');
sensors.use('SiteLinker',
    	{
			linker: [
      			{part_url: 'sensorsdata.cn', after_hash: false},
      			{part_url: 'example.com', after_hash: false}
    		],
			 // 该配置设置为 true 后，如果从已登录的页面跳转过来，即使当前网页已经登录，当前网页仍然会以之前网页的登录 id 再次登录。
		 	 re_login: true
		}
);

var deeplink = sensors.use('Deeplink',{timeout: 2900});
document.getElementById('theBtn').addEventListener('click', function(e) {
       e.preventDefault();
       deeplink.openDeepLink();
  }); 

function BuyProduct() {
  sensors.track("BuyProduct",{
    city:"zhejiang111",
    distinct_id:"12333"
  });
}


function login() {
  let inputText = document.getElementById("01").value
  sensors.login(inputText)
 
}

</script>
</html>
