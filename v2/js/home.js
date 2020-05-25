 
// 仪表盘
var gaugePS1 = new RadialGauge({
    renderTo: 'gauge-01',
    width: 90,
    height: 90,
    units: '',
    minValue: 0,
    maxValue: 220,
    minorTicks: 2,
    ticksAngle: 270,
    startAngle: 70,
    strokeTicks: false,
    highlights  : [
        { from : 0,  to : 50, color : 'transparent' },
        { from : 50, to : 100, color : 'transparent' }
    ],
    valueInt: 0,
    valueDec: 0,
    colorPlate: "transparent",
    colorMajorTicks: "transparent",
    colorMinorTicks: "transparent",
    colorNumbers: "transparent",
    colorValueText: "#fff",
    colorValueBoxRect: "transparent",
    colorValueBoxRectEnd: "transparent",
    colorValueBoxBackground: "transparent",
    colorValueBoxShadow: true,
    colorValueTextShadow: true,
    colorNeedleShadowUp: true,
    colorNeedleShadowDown: false,
    colorNeedle: "#afb8c8",
    colorNeedleEnd: "#e5ebf6",
    colorNeedleCircleOuter: "#b3bccc",
    colorNeedleCircleOuterEnd: "#edf3fd",
    borderShadowWidth: 1,
    borders: false,
    needleWidth: 16,
    needleCircleSize: 20,
    needleCircleOuter: true,
    needleCircleInner: true,
    animationDuration: 4000,
    animationRule: "elastic", // elastic bounce
    // animationSpeed: 100,
    fontValueSize: 80,
    animatedValue: true
});
var gaugePS2 = new RadialGauge({
    renderTo: 'gauge-02',
    width: 90,
    height: 90,
    units: '',
    minValue: 0,
    maxValue: 220,
    minorTicks: 2,
    ticksAngle: 270,
    startAngle: 70,
    strokeTicks: false,
    highlights  : [
        { from : 0,  to : 50, color : 'transparent' },
        { from : 50, to : 100, color : 'transparent' }
    ],
    valueInt: 0,
    valueDec: 0,
    colorPlate: "transparent",
    colorMajorTicks: "transparent",
    colorMinorTicks: "transparent",
    colorNumbers: "transparent",
    colorValueText: "#fff",
    colorValueBoxRect: "transparent",
    colorValueBoxRectEnd: "transparent",
    colorValueBoxBackground: "transparent",
    colorValueBoxShadow: true,
    colorValueTextShadow: true,
    colorNeedleShadowUp: true,
    colorNeedleShadowDown: false,
    colorNeedle: "#afb8c8",
    colorNeedleEnd: "#e5ebf6",
    colorNeedleCircleOuter: "#b3bccc",
    colorNeedleCircleOuterEnd: "#edf3fd",
    borderShadowWidth: 1,
    borders: false,
    needleWidth: 16,
    needleCircleSize: 20,
    needleCircleOuter: true,
    needleCircleInner: true,
    animationDuration: 4000,
    animationRule: "elastic",
    fontValueSize: 80,
    animatedValue: true
});
var gaugePS3 = new RadialGauge({
    renderTo: 'gauge-03',
    width: 90,
    height: 90,
    units: '',
    minValue: 0,
    maxValue: 220,
    minorTicks: 2,
    ticksAngle: 270,
    startAngle: 70,
    strokeTicks: false,
    highlights  : [
        { from : 0,  to : 50, color : 'transparent' },
        { from : 50, to : 100, color : 'transparent' }
    ],
    valueInt: 0,
    valueDec: 0,
    colorPlate: "transparent",
    colorMajorTicks: "transparent",
    colorMinorTicks: "transparent",
    colorNumbers: "transparent",
    colorValueText: "#fff",
    colorValueBoxRect: "transparent",
    colorValueBoxRectEnd: "transparent",
    colorValueBoxBackground: "transparent",
    colorValueBoxShadow: true,
    colorValueTextShadow: true,
    colorNeedleShadowUp: true,
    colorNeedleShadowDown: false,
    colorNeedle: "#afb8c8",
    colorNeedleEnd: "#e5ebf6",
    colorNeedleCircleOuter: "#b3bccc",
    colorNeedleCircleOuterEnd: "#edf3fd",
    borderShadowWidth: 1,
    borders: false,
    needleWidth: 16,
    needleCircleSize: 20,
    needleCircleOuter: true,
    needleCircleInner: true,
    animationDuration: 4000,
    animationRule: "elastic",
    fontValueSize: 80,
    animatedValue: true
});
var gaugePS4 = new RadialGauge({
    renderTo: 'gauge-04',
    width: 90,
    height: 90,
    units: '',
    minValue: 0,
    maxValue: 220,
    minorTicks: 2,
    ticksAngle: 270,
    startAngle: 70,
    strokeTicks: false,
    highlights  : [
        { from : 0,  to : 50, color : 'transparent' },
        { from : 50, to : 100, color : 'transparent' }
    ],
    valueInt: 0,
    valueDec: 0,
    colorPlate: "transparent",
    colorMajorTicks: "transparent",
    colorMinorTicks: "transparent",
    colorNumbers: "transparent",
    colorValueText: "#fff",
    colorValueBoxRect: "transparent",
    colorValueBoxRectEnd: "transparent",
    colorValueBoxBackground: "transparent",
    colorValueBoxShadow: true,
    colorValueTextShadow: true,
    colorNeedleShadowUp: true,
    colorNeedleShadowDown: false,
    colorNeedle: "#afb8c8",
    colorNeedleEnd: "#e5ebf6",
    colorNeedleCircleOuter: "#b3bccc",
    colorNeedleCircleOuterEnd: "#edf3fd",
    borderShadowWidth: 1,
    borders: false,
    needleWidth: 16,
    needleCircleSize: 20,
    needleCircleOuter: true,
    needleCircleInner: true,
    animationDuration: 4000,
    animationRule: "elastic",
    fontValueSize: 80,
    animatedValue: true
});

function createCircles () {
    gaugePS1.draw();
    gaugePS1.value = "60";

    gaugePS2.draw();
    gaugePS2.value = "80";

    gaugePS3.draw();
    gaugePS3.value = "90";

    gaugePS4.draw();
    gaugePS4.value = "22";
}
var canvas = document.getElementById('canvas');
var imgGroup = document.getElementById('img-group');
function onScroll() {
    if (elementInViewport(canvas)) {
        createCircles();
    }
    if (elementInViewport(imgGroup)) {
        $("#img-group").addClass("img-group-open")
    } else {
        $("#img-group").removeClass("img-group-open")
    }
    /*var a = $(".imgGroup").offset().top;
    if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
        alert("div在可视范围");
    }*/
}
function elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top  >= 0 &&
      rect.left >= 0 &&
      rect.top  <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
window.onscroll = onScroll;
window.onmousewheel = function (e) {
    onScroll()
}
// ========================END===============================

// =============banner 轮播================================
$(function() {
    $(".btnnum, .btn-arrows span").hover(function(){
        clearInterval(timer);
    },function(){
        start();
    })
    $(".btnnum li").on("click", function(){ // 翻页
        index=$(this).index();
        changImg(index)
    });
    $(".btn-arrow-left").on("click", function(){ // 左翻页
        if ($(this).hasClass('closed')) {
            return false;
        }
        $(".btnnum li").each(function(i){
            if ($(this).hasClass('current')) {
                index = i - 1
            }
        })
        changImg(index)
    });
    $(".btn-arrow-right").on("click", function(){ // 左翻页
        if ($(this).hasClass('closed')) {
            return false;
        }
        var nextId = 1;
        $(".btnnum li").each(function(j){
            if ($(this).hasClass('current')) {
                nextId = j + 1
            }
        })
        if (nextId <= $(".btnnum li").length - 1) {
            changImg(nextId)
        }
    });
});
var index = 0;
var timer; //定时器

// ========================文字滚动===============================
var box=document.getElementById("Marquee"),can=true;
box.innerHTML+=box.innerHTML;
box.onmouseover=function(){can=false};
box.onmouseout=function(){can=true};
new function (){
var stop=box.scrollTop%32==0&&!can;
if(!stop)box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
setTimeout(arguments.callee,box.scrollTop%32?10:3000);
};
// ========================END===============================

//初始化
function init() {
    var len = $('.banList li').length; //获取图片有多少张
    var html = '';
}
// ========================END===============================

//图片轮播
function changImg(num) {
    var len = $('.banList li').length; //获取图片有多少张1
    $('.banList li').eq(index).addClass('bannershow banneropacity').siblings().removeClass('bannershow banneropacity');
    $('.btnnum li').eq(index).addClass("current").siblings().removeClass("current");
    $(".banList li").eq(index-1).addClass('finished').siblings().removeClass("finished");
    index++;
    if (index == $('.banList li').length) { //最后一张
        $(".btn-arrow-left").addClass("closed");
        index = 0; //第一张
    }
    if (num === 0) {
        $(".btn-arrow-left").addClass("closed");   
        $(".btn-arrow-left .preview").hide();  
        $(".btn-arrow-right").removeClass("closed"); 
        $(".btn-arrow-right .preview").show();  
    } else if (num == $('.banList li').length -1 ) {
        $(".btn-arrow-right").addClass("closed"); 
        $(".btn-arrow-right .preview").hide();  
        $(".btn-arrow-left").removeClass("closed"); 
        $(".btn-arrow-left .preview").show();   
    } else {
        $(".btn-arrows span").removeClass("closed");
    }
}
function start() {
    timer = setInterval('changImg("0", "next")', 5000);
}
//鼠标离开之后 又要自动播放
function reStart(num) {
    index = num;
    changImg(num);
    start();
}
// ========================END===============================

$(function() {
    $(window).scroll(function(){
        if($(window).scrollTop() <= 10){
             $('[animation]').removeAttr("style");
            initEasyMotion();
        }
        if($(window).scrollTop() > 500){
            $(".backTop, .float-right").css("opacity", "1")
            $(".float-right").css("position", "fixed").css("top", "50%");
        } else {
            $(".backTop, .float-right").css("opacity", "0")
        }
    });
    // init();
    changImg(); //解决第一次第一张到第二张的时间间隔
    start();
     // 滚动条初始化
    $(".hot-live .details ul").niceScroll({
        cursorcolor: "#ececec",
        cursorwidth: "1px",
        touchbehavior: true,
    });
    $("body").niceScroll({
        cursorcolor: "#d7b18a",
        cursorwidth: "1px",
        touchbehavior: true,
        cursoropacitymin: 0,
        cursoropacitymax:0
    });
     // APP下载 tab切换
    $('.app-download .btn-group button').on("click", function() {
        var cur=$(this).index();
        $(this).addClass('active selected').siblings().removeClass('active selected');
        $(this).parent().next('.bg-common').find('.list').eq(cur).removeClass('_1addy6uf1nYJgRM1OlApnv').siblings().addClass('_1addy6uf1nYJgRM1OlApnv');
        $(".img-group").removeClass("img-group-open");
        $(this).parent().next('.bg-common').find('.list').eq(cur).find("#img-group").addClass("img-group-open");
        // $("._1addy6uf1nYJgRM1OlApnv").removeClass("img-group-open");
        // $("#img-group").addClass("img-group-open");
    });
     // APP下载 tab切换 hover
    $('.btn-group button').hover(function(){
        $(this).addClass('active').siblings().removeClass('active');
    }, function() {
        $(this).removeClass('active');
    });
     // 鸭脖游戏 tab切换
    $('.hot-games .btn-group button').on("click", function() {
        var cur=$(this).index();
        $(this).addClass('active selected').siblings().removeClass('active selected');
        $(this).parent().prev('.bg-common').find('.list').eq(cur).removeClass('_1addy6uf1nYJgRM1OlApnv').siblings().addClass('_1addy6uf1nYJgRM1OlApnv');
        if ($(this).find('label').text() === '彩票游戏') {
            $(".hot-games .rebeat").hide();
        } else {
            $(".hot-games .rebeat").show();
        }
    });
     // 直播数据切换
    $('.hot-live .btn-group button').on("click", function() {
        $(this).addClass('active selected').siblings().removeClass('active selected');
        weblist($(this).attr("data-type"));
    });
     // 返回顶部
    $('.backTop').on("click", function() {
        $('body,html').animate({
          scrollTop: 0
        },
        500);
        return false;
    });
    /*$("body").getNiceScroll(0).scrollend(function(e) {
        onScroll()
    });*/
    // 顶部导航
    $(".nav li").each(function(i) {
        $(this).hover(function() {  
            $(".menus-wrap ._2CXrHfdR-XzHrzst_XVXuD").eq(i).addClass('_1sOZtoeAxcF23U174uMhdU').siblings().removeClass('_1sOZtoeAxcF23U174uMhdU');  
        })
    })
    $(".header").mouseleave(function() {
        $("._2CXrHfdR-XzHrzst_XVXuD").removeClass('_1sOZtoeAxcF23U174uMhdU');
    })
 
    // 二维码生成
    $('.ercodeAll').qrcode({ // 全站
        render: "canvas",
        width: 130,
        height: 130,
        text: "https://www.yb443.app"
    });
    $('.ercodeSports').qrcode({ // 体育
        render: "canvas",
        width: 130,
        height: 130,
        text: "https://www.yb73.app"
    });
    $('.ercodeAllright').qrcode({ // 右侧漂浮
        render: "canvas",
        // background: "#d3b797",
        width: 80,
        height: 80,
        text: "https://www.yb73.app"
    });
    $('.ercodeSportsright').qrcode({ // 右侧漂浮
        render: "canvas",
        width: 80,
        height: 80,
        text: "https://www.yb73.app"
    });
})

// 特效初始化
initEasyMotion()
var api = 'https://www.yabovip2019.com';
var api2 = 'http://videos.1ky5dz.com';
var appKey = 'c97823e281c071c39e';
var playUrl = '';

var timestamp = (new Date()).valueOf();
    timestamp = new Date().getTime();
    timestamp = Math.round(new Date().getTime()/1000).toString();

function pre_info () {
    let params = {}
    params.appKey = appKey;
    params.timestamp = timestamp;
    $.ajax({
        url:  api + '/common/v3/banner_list',
        type: 'GET',
        // data: params,
        headers: {
            'client-type': 'web',
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (data) {
        },error:function(error){
            console.log(error);
        }
    })
}
function banner_list () {
}
function getFootbasketPlayingData () {
	let params = {}
    var liveStr = '';
	$.get( api2 + "/video/v1/getFootbasketPlayingData.txt?", function(res) {
		if (res.status_code === 200) {
            if (res.data.animationUrl) {
                $("#iframePlayer").attr("src", res.data.animationUrl)                
            } else {
                // $("#iframePlayer").attr("src", res.data.url.play_url)
            }
            if (res.data.team1_logo === '' || res.data.team2_logo === '') {
                res.data.team1_logo = './images/team_logo.png.webp'
                res.data.team2_logo = './images/team_logo.png.webp'
            }
            if (res.data.team1 !== '') { // 无赛事
                $(".match .teams").removeClass('no-playing');
                liveStr += '<p>'+
                            '<label>'+ res.data.team1 +'</label>'+
                            '<img src="'+res.data.team1_logo+'">'+
                        '</p>'+
                        '<p class="score">'+ res.data.score +'</p>'+
                        '<p><img src="'+res.data.team2_logo+'">'+ res.data.team2 +'</p>';
            } else {
                $(".match .teams").addClass('no-playing');
                liveStr += '<p>'+
                            '<label></label>'+
                            '<img src="'+res.data.team1_logo+'">'+
                        '</p>'+
                        '<p class="score">暂无直播</p>'+
                        '<p><img src="'+res.data.team2_logo+'"></p>';           
            }
            $(".match .playing p").remove();
            $(".match .playing").html(liveStr);
        } else {
            $(".match .playing").html('<p>暂无数据</p>');
        }
	})
}
function weblist (type) {
    var params = {}
    var listStr = '';
    $(".match .right ul").html('<li class="loading">加载中...</li>');
	$.get( api2 + "/video/weblist.php?type="+type, function(res) {
        if (res.status_code === 200) {
            if (res.data && res.data.length > 0) {
                    // source_url_list(res.data[0].eid)
                    // console.log(res.data[0].animationUrl)
                    // this.playUrl = res.data[0].animationUrl
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].team1_logo === '' || res.data[i].team2_logo === '') {
                        res.data[i].team1_logo = './images/team_logo.png.webp'
                        res.data[i].team2_logo = './images/team_logo.png.webp'
                    }
                    listStr += '<li>'+
                                    '<h4>'+ res.data[i].league +'</h4>'+
                                    '<div class="live-area">'+
                                        '<span>直播中</span>'+
                                        '<div class="live-icon">';
                                        if (res.data[i].eid !== "") {
                                            listStr += '<span class="ico-video" onclick=changeVideo("'+res.data[i].eid+'")></span>';
                                        }
                                        if (res.data[i].animationUrl !== "") {
                                            listStr += '<span class="ico-aimation" onclick=changeAnimation("'+res.data[i].animationUrl+'")></span>';
                                        }
                                        listStr += '</div>'+
                                    '</div>'+
                                    '<div class="teams">'+
                                        '<p><img src="'+res.data[i].team1_logo+'"><label>'+ res.data[i].team1 +'</label></p>'+
                                        '<span>VS</span>'+
                                        '<p><label>'+ res.data[i].team2 +'</label><img src="'+res.data[i].team2_logo+'"></p>'+
                                    '</div>'+
                                '</li>';
                }
            } else {
                listStr += '<div class="nodata">'+
                                '<img src="./images/no_list.png.webp">'+
                                '<p>无赛事直播</p>'+
                                '<a href="">更多赛事</a>'+
                            '</div>';
            }
            $(".match .right ul li").remove();
            $(".match .right ul").html(listStr);
        }
	})
}
function source_url_list (eid) {
	var params = {}
    params.eid = 3977987
    params.is_https = false
    $.ajax({
        url:  'http://videos.1ky5dz.com/video/v1/source_url_list.txt',
        type: 'GET',
        // dataType: 'jsonp',
        data: params,
        headers: {
            'client-type': 'web'
        },
        success: function (data) {
        },error:function(error){
            console.log(error);
        }
    })
}

function changeVideo(newurl) {
   $("#iframePlayer").attr("src", newurl)
}

function initData () {
    var ballType = $('.hot-live .btn-group .active').attr("data-type")
    getFootbasketPlayingData();
    // source_url_list();
    // pre_info();
    // banner_list()
    weblist(ballType); // Basketball
}



initData();
var interval = setInterval(function(){
    // initData();
}, 10000);
