$(function() {
    init();
    changImg(); //解决第一次第一张到第二张的时间间隔
    start();
     // 滚动条
    $(".hot-live .details ul").niceScroll({
        cursorcolor: "#d2a87c",
        cursorwidth: "8px",
        touchbehavior: true,
    });
    $(".scroll-content").niceScroll({
        cursorcolor: "#d2a87c",
        cursorwidth: "12px",
        touchbehavior: true,
    });
     // tab切换
    $('.btn-group button').on("click", function() {
        var cur=$(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().next('.bg-common').find('.list').eq(cur).addClass('selected').siblings().removeClass('selected');
    });
     // 直播数据切换
    $('.hot-live .btn-group button').on("click", function() {
        weblist($(this).attr("data-type"));
    });
    // $(".scroll-content").getNiceScroll(0).doScrollTop(y, duration);
    $(".scroll-content").getNiceScroll(0).scrollend(function(e) {
        onScroll()
    });

    // 初始化播放器
    var dplayer = new DPlayer({
        element: document.getElementById('dplayer'),
        autoplay: true,
        theme: '#FADFA3',
        loop: false,
        live: true,
        screenshot: false,     
        hotkey: false,
        video: {  //视频源 包含不同分辨率源
            quality: [{
                name: '普清',
                url: playUrl
            }
            /*,{
                name: '高清',
                url: url2
            }*/],
            defaultQuality: 0,
            pic: '',
            type: 'auto'
        }
    });

    function switchVideos(url){
        dplayer.switchVideo({
            url: url
        })
    }
})

var api = 'https://www.yabovip2019.com';
var api2 = 'http://videos.1ky5dz.com';
var appKey = 'c97823e281c071c39e';
var playUrl = '';

var timestamp = (new Date()).valueOf();
    timestamp = new Date().getTime();
    timestamp = Math.round(new Date().getTime()/1000).toString();
    console.log(timestamp)


function get_time () {
	$.ajax({
        url: api + '/common/v1/get_time',
        type: 'get',
        dataType: 'jsonp',
        headers: {
         	'content-type': 'application/json'
     	},
        data: {
        },
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOD.....");
        },
        success: function (data) {
            console.log(data);
        },error:function(error){
            console.log(error);
        }
    })
}
function pre_info () {
    let params = {}
    params.appKey = appKey;
    params.timestamp = timestamp;
    params.nonce_str = 'ahub5nsgav';
    params.sign = 'e470864ee5450e2b1ff74bab62d0e5bc5a57b44b64407b0ed51f5b18c6438ac7';
    $.ajax({
        url:  api + '/common/v3/banner_list',
        type: 'post',
        dataType: 'jsonp',
        data: params,
        headers: {
            'content-type': 'application/json'
        },
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOD.....");
        },
        success: function (data) {
            console.log(data);
        },error:function(error){
            console.log(error);
        }
    })
}
function banner_list () {
    let params = {}
    params.appKey = appKey;
    params.timestamp = timestamp;
    params.nonce_str = 'ahub5nsgav';
    params.sign = 'e470864ee5450e2b1ff74bab62d0e5bc5a57b44b64407b0ed51f5b18c6438ac7';
    $.ajax({
        url:  api + '/common/v3/banner_list',
        type: 'post',
        // dataType: 'json',
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOD.....");
        },
        success: function (data) {
            console.log(data);
        },error:function(error){
            console.log(error);
        }
    })
}
function getFootbasketPlayingData () {
	let params = {}
    var liveStr = '';
	$.get( api2 + "/video/v1/getFootbasketPlayingData.txt?", function(res) {
		if (res.status_code === 200) {
            if (res.data.team1_logo === '' || res.data.team2_logo === '') {
                res.data.team1_logo = './images/team_logo.png.webp'
                res.data.team2_logo = './images/team_logo.png.webp'
            }
            liveStr += '<p>'+
                            '<label>'+ res.data.team1 +'</label>'+
                            '<img src="'+res.data.team1_logo+'">'+
                        '</p>'+
                        '<p class="score">'+ res.data.score +'</p>'+
                        '<p><img src="'+res.data.team2_logo+'">'+ res.data.team2 +'</p>';
            $(".match h3").text(res.data.league);
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
	$.get( api2 + "/video/weblist.php?type="+type, function(res) {
        if (res.status_code === 200) {
            if (res.data.length > 0) {
                    source_url_list(res.data[0].eid)
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
                                            listStr += '<span class="ico-aimation" onclick=changeVideo("'+res.data[i].animationUrl+'")></span>';
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
                $(".nodata").hide();
                $(".match .right ul li").remove();
                $(".match .right ul").html(listStr);
            } else {
                $(".nodata").show();
            }
        }
	})
}
function source_url_list (eid) {
	var params = {}
    params.eid = 3977987
    params.is_https = false
                    console.log(params)
 //    $.post("",params,function(res){
 //        if (res.status_code === 200) {  
 //            playUrl = res.data.url.flv_url; 
 //            console.log(res.data) 
 //        }		
	// })
    /*$.ajax({
        url:  api2 + "/video/v1/source_url_list.txt",
        type: "POST",
        dataType: "jsonp", 
        data: { params },
        headers: {
            'content-type': 'application/json'
        },
        success: function (res) {
            if (res.status_code === 200) {  
                playUrl = res.data.url.flv_url; 
                console.log(res.data) 
            }
        }
     });*/
}

function changeVideo(newurl) {
    console.log(newurl.indexOf('http') < 0)
    if (newurl.indexOf('http') < 0) { // 动画
        source_url_list(newurl)
    } else { // eid 
        playUrl = newurl        
    }
}
function initData () {
    var ballType = $('.hot-live .btn-group .active').attr("data-type")
    getFootbasketPlayingData();
    // source_url_list();
    weblist(ballType); // Basketball
}

// get_time();
// pre_info();
banner_list()
initData();
var interval = setInterval(function(){
    initData();
}, 10000);
