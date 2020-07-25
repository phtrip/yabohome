var wxNumber = ['e386','d7533','a585','d377','a353'];
var firstOpenTime = localStorage.getItem('firstOpenTime');          // 第一次打开时，写入缓存的微信号


// 将时间戳转换成日期格式
var date = new Date();
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds(); 
// console.log(Y+M+D+h+m+s);


// 思路：↓↓↓↓↓↓↓

// 1440             一天有1440分钟
// 1440/15 = 96     一天要轮换96次 

// 获取当天的凌晨时间
// 获取打开时间

// 打开时间 - 凌晨时间    过了多少分钟
// 过了多少分钟 / 15 = 轮换了多少次


// 凌晨时间：将日期格式转换成时间戳
var zeroTime = Y+M+D+'00:00:00';       // 当天的凌晨时间
var zeroTime_t = new Date(zeroTime.replace(/-/g, '/'));  // 格式化凌晨时间
var zeroTime_timestamp = zeroTime_t.getTime();          // 将 Y+M+D+h+m+s 格式转换成时间戳格式
// console.log('零'+zeroTime_timestamp);


// 获取打开时间的时间戳 单位毫秒
// var nowTime = new Date();
var nowTime = new Date().getTime();
// console.log('现'+nowTime);


// 时间差：打开时间 减去 凌晨时间
var difference = nowTime - zeroTime_timestamp;
// console.log(difference);

// 15分钟有多少毫秒
var fift = 0.75*60*1000;
var count = Math.floor(difference/fift);    // 在这个时间差内，轮换了多少次
// console.log(count);
// 
// 一共有多少个微信号
var wxNumber_count = wxNumber.length;
// console.log(wxNumber_count);

// 打开时间 改轮换到了哪一个
var wx_index = count % wxNumber_count;
// console.log(wx_index);
// console.log(wxNumber[wx_index]);




$(function() {
	if(typeof(Storage)!==undefined && firstOpenTime==null){  // setp 1. 第一次打开页面的情况
	                                                            // 浏览器支持，且本地缓存的‘firstOpenTime’为空

	    localStorage.setItem('firstOpenTime',wxNumber[wx_index]);    // 将第一次打开页面时随机的微信号缓存进本地
	    $('.wxcopy, .tel_no').html(wxNumber[wx_index]);
	    
	}else if(typeof(Storage)!==undefined && firstOpenTime!=null){     // setp 2. 之前打开过页面的情况
	                                                            // 浏览器支持，且本地缓存的‘firstOpenTime’不为空

	    $('.wxcopy, .tel_no').html(firstOpenTime);

	}else {  // setp 3. 不支持web storage的情况，默认选择第一个
	    console.log('sorry, you browser does not support Web storage...')
	    $('.wxcopy, .tel_no').html(wxNumber[0]);
	}


	// 轮播
	var mySwiper = new Swiper ('.swiper-container', {
	    loop: true,
	    // 如果需要分页器
	    autoplay: true,
	    speed:700,//限制滚轴时间间隔
	    pagination: {
	      el: '.swiper-pagination',
	    },
	    
	    // 如果需要前进后退按钮
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	    
	    // 如果需要滚动条
	    scrollbar: {
	      el: '.swiper-scrollbar',
	    },
  	})

  	// hover
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
		if(IsPC()){
			$(".tips2").hover(function(){//鼠标悬停在上面实现什么效果
			$(this).find("div").show();    
		},function(){//鼠标离开实现什么功能
			$(this).find("div").hide();  
		});
	}
})