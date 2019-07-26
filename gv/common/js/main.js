//根字体大小设置
document.getElementsByTagName("html")[0].style.fontSize=document.documentElement.clientWidth/15+"px";
//改变窗口的时候重新计算大小
window.onresize = function(){
  document.getElementsByTagName("html")[0].style.fontSize=document.documentElement.clientWidth/15+"px";
}
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//微信屏蔽分享公共JS
function onBridgeReady(){
  WeixinJSBridge.call('hideOptionMenu');
}
if (typeof WeixinJSBridge == "undefined"){
  if( document.addEventListener ){
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  }else if (document.attachEvent){
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
  }
}else{
  onBridgeReady();
}


var goUrl = "https://sales-dev.ihxlife.com/xcx_calculator/rankerh5/";  //页面跳转路径
// var goUrl = "http://localhost:63342/WEB-INF/views/";  //页面跳转路径
var sUrl = 'https://hx-calculator.ihxlife.com:8080/'; //ajax请求路径-本地
// var sUrl = 'https://int-imr.ihxlife.com/';  //ajax请求路径-int
// var sUrl = 'https://imr.ihxlife.com/';  //ajax请求路径-pro

//ajax公用设置
$.ajaxSetup({
  url: "/xmlhttp/",
  global: false,
  type:'post',
  dataType:'json',
  cache:false,
  timeout:16000,
  beforeSend:function(){
    fnLoading();//加载loading
  },
  complete:function(){
    $('.loading_layer').remove();//删除loading
  },
  error:function(jqXHR, textStatus, errorThrown){
    switch(jqXHR.status){
      case 404:
      case 500:
      case 502:
      case 503:
        //location.href=sUrl+"pageTo/to404";
        break;
    }
    if(textStatus == 'timeout'){
      fnLayerBox('系统链接超时，请稍后再试');
    }
  }
})
//页脚固定
function autoHeight() {
	var footerH = $('.prem_footer').outerHeight();
	var docH = $(window).outerHeight();
	 $('.wrap').css('height',parseFloat(docH-footerH)+'px');
	 console.log(111);
}
// autoHeight();
//禁止复制剪切粘贴input的内容
$(function(){
  $('input').each(function(){
    this.oncopy = function(){return false;};
    this.oncut = function(){return false;}
    this.onpaste = function(){return false;}
    this.oncontextmenu = function(){return false;}
  })
})
// 获取地址栏参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  decodeURI(r[2]);
    return null;
}
//去掉所有空格
function fnTrim(str,is_global)
{
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g,"");
  if(is_global.toLowerCase()=="g")
  {
    result = result.replace(/\s/g,"");
  }
  return result;
}


function go(href) {
	  var url = goUrl+href;
    window.location.href = url;
}

//toast弹出提示
function fnToast(info){
    $('.toast').show().find('p').text(info);
    setTimeout(function(){
        $('.toast').hide().find('p').text('');
    },800);
}
/*++++++++++++++++++++++++++++++公共组件++++++++++++++++++++++++++++++++++*/
/*加载loading-所有页面*/
function fnLoading(){
  $('.loading_layer').remove();
  var html = '<div class="loading_layer">' +
  '<div class="spinner">' +
    '<div class="rect1"></div>' +
    '<div class="rect2"></div>' +
    '<div class="rect3"></div>' +
    '<div class="rect4"></div>' +
    '<div class="rect5"></div>' +
    '</div>'+
  '</div>'
  $('body').append(html);
}
//监听加载状态改变
document.onreadystatechange = fnCompleteLoading;
//加载状态为complete时移除loading效果
function fnCompleteLoading() {
  if (document.readyState == "complete") {
    $('.loading_layer').remove();
  }else{
    fnLoading();
  }
}
/*弹出层*/
function fnLayerBox(msg){
  $('.layer_box').remove();
  var html = '<div class="layer_box">'+
    '<div class="layer_main">'+
    '<div class="layer_main_tips">'+
    '<p>'+msg+'</p>'+
    '</div>'+
    '<input type="button" value="我知道了" class="default_btn layer_btn">'+
    '</div>'+
    '</div>';
  $('body').append(html);
  $('.layer_btn').click(function(){
    $(this).parents('.layer_box').remove();
  })
}

/*链接生成二维码*/
function fnQrCode(link){
    var options2 = {
        // render method: 'canvas', 'image' or 'div'
        render: 'image',

        // version range somewhere in 1 .. 40
        minVersion: 1,
        maxVersion: 40,

        // error correction level: 'L', 'M', 'Q' or 'H'
        ecLevel: 'H',

        // offset in pixel if drawn onto existing canvas
        left: 0,
        top: 0,

        // size in pixel
        size: 200,

        // code color or image element
        fill: '#000',

        // background color or image element, null for transparent background
        background: '#ffffff',

        // content
        text: link,

        // corner radius relative to module width: 0.0 .. 0.5
        radius: 0,

        // quiet zone in modules
        quiet: 0,

        // modes
        // 0: normal
        // 1: label strip
        // 2: label box
        // 3: image strip
        // 4: image box
        mode: 4,

        mSize: 0.2,
        mPosX: 0.5,
        mPosY: 0.5,

        label: '',
        fontname: 'sans',
        fontcolor: '#ff0000',

        image: $('#logo')[0]
        // image: null
    };
    return options2;
}

//表头固定
function aa(){
    var a=document.getElementById("ss").scrollTop;
    var b=document.getElementById("ss").scrollLeft;
    document.getElementById("ss_lt").scrollTop=a;
    document.getElementById("ss_top").scrollLeft=b;
}