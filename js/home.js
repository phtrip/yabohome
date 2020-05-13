

/*  ====顶部时间=======================================================*/
function showLocale(objD){
    var str;
    var yy = objD.getYear();
    if(yy<1900) yy = yy+1900;
    var MM = objD.getMonth()+1;
    if(MM<10) MM = '0' + MM;
    var dd = objD.getDate();
    if(dd<10) dd = '0' + dd;
    var hh = objD.getHours();
    if(hh<10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if(mm<10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if(ss<10) ss = '0' + ss;
    str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "  ";
    return(str);
}
function tick(){
    var today;
    today = new Date();
    document.getElementById("localtime").innerHTML = showLocale(today);
    window.setTimeout("tick()", 1000);
}
tick();

// ========================END===============================


// =============banner hover================================
(function() {
  // Init
  var container = document.getElementById("container"),
      inner = document.getElementById("inner");

  // Mouse
  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")";
    }
  };

  mouse.setOrigin(container);

  var counter = 0;
  var refreshRate = 10;
  var isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
  };

  var onMouseEnterHandler = function(event) {
    update(event);
  };

  var onMouseLeaveHandler = function() {
    inner.style = "";
  };

  var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner.offsetHeight / 2).toFixed(2),
      (mouse.x / inner.offsetWidth / 2).toFixed(2)
    );
  };

  var updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTranform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
  };

  container.onmousemove = onMouseMoveHandler;
  container.onmouseleave = onMouseLeaveHandler;
  container.onmouseenter = onMouseEnterHandler;
})();
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
var stop=box.scrollTop%40==0&&!can;
if(!stop)box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
setTimeout(arguments.callee,box.scrollTop%40?10:1500);
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
        $(".btn-arrow-right").removeClass("closed");  
    } else if (num == $('.banList li').length -1 ) {
        $(".btn-arrow-right").addClass("closed"); 
        $(".btn-arrow-left").removeClass("closed");  
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

// ==========circle process==================================

var canvas = document.getElementById('canvas'),
circlesCreated = false;
function onScroll() {
    if (!circlesCreated && elementInViewport(canvas)) {
        circlesCreated = true;
        createCircles();
    } else if (elementInViewport(canvas)) {
        circlesCreated = true;
    } else {
        circlesCreated = false;
    }
}
function elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top  >= 0 &&
      rect.left >= 0 &&
      rect.top  <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
function createCircles() {
    var colors = [
            ['#524e6a', '#eaba9e'], ['#524e6a', '#eaba9e'], ['#524e6a', '#eaba9e'], ['#524e6a', '#eaba9e']
        ],
        circles = [];
    for (var i = 1; i <= colors.length; i++) {
        var child = document.getElementById('circles-' + i);
            if (i === 1 || i === 1) {
                percentage = 60
            } else if (i === 3) {
                percentage = 90             
            } else if (i === 4) {
                percentage = 22
            }

            circle = Circles.create({
                id:         child.id,
                value:      percentage,
                radius:     40,
                width:      6,
                colors:     colors[i - 1],
                duration:   1500,
                textClass: 'circles-text',
                text: function(value) {
                    if (value === 22) {
                        return value + '<span>家</span>';
                    } else {
                        return value + '<span>秒</span>';
                    }
                }
        });
        circles.push(circle);
    }
}
if (!circlesCreated && elementInViewport(canvas)) {
    circlesCreated = true;
    createCircles();
}
window.onscroll = onScroll;
window.onmousewheel = function (e) {
    onScroll()
}
// ========================END===============================

$(function() {
    $(window).scroll(function(){
        if($(window).scrollTop() <= 10){
             $('[animation]').removeAttr("style");
            initEasyMotion()            
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
        cursorwidth: "8px",
        touchbehavior: true,
    });
     // tab切换
    $('.btn-group button').on("click", function() {
        var cur=$(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().next('.bg-common').find('.list').eq(cur).removeClass('_1addy6uf1nYJgRM1OlApnv').siblings().addClass('_1addy6uf1nYJgRM1OlApnv');
    });
     // 直播数据切换
    $('.hot-live .btn-group button').on("click", function() {
        weblist($(this).attr("data-type"));
    });
    $("body").getNiceScroll(0).scrollend(function(e) {
        onScroll()
    });
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

// 球初始化
luxy.init();
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
                $(".match h3").text(res.data.league);
            } else {
                $(".match h3").text('赞助专题');
                $(".match .teams").addClass('no-playing');
                liveStr += '<p class="cQ_ch">意大利甲级联赛</p>'+
                            '<p class="cQ_cj">全球赞助商</p>';                
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
