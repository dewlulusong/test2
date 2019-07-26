/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */

function doShareNoSave(ctx, title, desc, link, imgUrl){
	var origin = ctx;
	$.ajax({
	    type: "POST",
	    url: ctx + 'api/v1/querySignatureInfo',
	    // url: 'https://int-imr.ihxlife.com/' + 'api/v1/plan/querySignatureInfo',
	    data: {pageUrl:location.href.split('#')[0]},
	    dataType: "json",
	    success: function(data){
	        var configData = {
	            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	            appId: data.appid, // 必填，公众号的唯一标识
	            timestamp: data.timestamp, // 必填，生成签名的时间戳
	            nonceStr: data.nonceStr, // 必填，生成签名的随机串
	            signature: data.signature,// 必填，签名，见附录1
	            jsApiList: ['showOptionMenu','onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        };
	        // 加载微信SDK引入js
	        $.getScript('https://res.wx.qq.com/open/js/jweixin-1.2.0.js').done(function() { 
	            wx.config(configData); 
	            wx.ready(function () {
	                //alert('JS-SDK注册成功！可以使用了');
	                wx.showOptionMenu();
	               
	                wx.onMenuShareAppMessage({
	                    title: title,// 分享标题
	                    desc: desc,// 分享描述
	                    link:  link,// 分享链接
	                    imgUrl: imgUrl, // 分享图标
	                    type: '', // 分享类型,music、video或link，不填默认为link
	                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
         
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
	                });
	                wx.onMenuShareTimeline({
	                    title: title,// 分享标题
	                    link:  link,// 分享链接
	                    imgUrl: imgUrl, // 分享图标
					    success: function () { 
         
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
	                });
	                wx.hideMenuItems({
	                	  menuList: [
	                		"menuItem:exposeArticle",//举报
							"menuItem:setFont",//调整字体
							"menuItem:dayMode",//日间模式
							"menuItem:nightMode",//夜间模式
							"menuItem:refresh",//刷新
							"menuItem:profile",//查看公众号（已添加）: 
							"menuItem:addContact",//查看公众号（未添加）
							//"menuItem:share:appMessage",//发送给朋友: 
							//menuItem:share:timeline",//分享到朋友圈: "
							"menuItem:share:qq",//分享到QQ: 
							"menuItem:share:weiboApp",//分享到Weibo: 
							//"menuItem:favorite",//收藏: 
							//"menuItem:share:facebook",//分享到FB: 
							"menuItem:share:QZone",//分享到 QQ 空间/
							"menuItem:editTag",//编辑标签: 
							"menuItem:delete",//删除: 
							"menuItem:copyUrl",//复制链接:
							"menuItem:originPage",//原网页: 
							"menuItem:readMode",//阅读模式: 
							"menuItem:openWithQQBrowser",//在QQ浏览器中打开: 
							"menuItem:openWithSafari",//在Safari中打开: 
							"menuItem:share:email",//邮件: 
							"menuItem:share:brand"//一些特殊公众号: 
	                    ]
	                  
	                  });
	            });
	            wx.error(function(res){
	                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	                // alert(res.errMsg);
	            });
	        }); 
	       }
	});
}