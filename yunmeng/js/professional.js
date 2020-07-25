//var _apk_duri = 'https://distribute.562780.com/resource/wolf/lastest.apk?fr=channel.192';

(function(){
    function tencent(strict) {//严格模式
        if(/QQ\//i.test(navigator.userAgent)){
            return 'QQ';
        }
        if(/MicroMessenger\//i.test(navigator.userAgent)){
            return 'WX';
        }
        if(strict && /MQQBrowser\//i.test(navigator.userAgent)){
            return 'QB';
        }
        return false;
    }
    function _get(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    function addCssByStyle(cssString){
        var doc=document;
        var style=doc.createElement("style");
        style.setAttribute("type", "text/css");

        if(style.styleSheet){// IE
            style.styleSheet.cssText = cssString;
        } else {// w3c
            var cssText = doc.createTextNode(cssString);
            style.appendChild(cssText);
        }

        var heads = doc.getElementsByTagName("head");
        if(heads.length)
            heads[0].appendChild(style);
        else
            doc.documentElement.appendChild(style);
    }
    function appendHtml(_html, timeout) {
      	$(document.body).append(_html);
      	console.log(timeout);
        if(timeout > 0){
            setTimeout(function () {
            	$('.fixedpic').hide();
            }, timeout* 1000);
        }
    }
    if (browser.versions.android) {
        //var _apk_duri = 'https://distribute.562780.com/resource/wolf/lastest.apk?fr=channel.192';
        var _timeout_footer_fixed_banner = 15,
        _tpl_footer_fixed_html = '<div class="fixedpic">' +
        '        <div class="pic-box"><a href="javascript:;" onclick="window.open(\''+_apk_duri+'\')" target="_blank">' +
        '            <img src="images/video.gif" style="width:100%">' +
        '        </a></div>' +
        '    </div>',
        _css_footer_fixed_banner = '.fixedpic{display:none}' +
        '@media only screen and (max-width: 600px) {' +
        '   .fixedpic{' +
        '       display:block;' +
        '       position:fixed;bottom:0;left:0;padding:0;margin:0;z-index:10000;' +
        '   }' +
        '}';
        addCssByStyle(_css_footer_fixed_banner);
      	
      	$(function(){
            appendHtml(_tpl_footer_fixed_html, _timeout_footer_fixed_banner);
        });
    } else if (browser.versions.ios) {
        //var _apk_duri = 'https://www.xiaoyim.com?channel=sm2048&hmsr=%E7%BE%8E%E5%A5%B3&hmpl=&hmcu=&hmkw=&hmci=';
        var _timeout_footer_fixed_banner = 15,
        _tpl_footer_fixed_html = '<div class="fixedpic">' +
        '        <div class="pic-box"></div>' +
        '    </div>',
        _css_footer_fixed_banner = '.fixedpic{display:none}' +
        '@media only screen and (max-width: 600px) {' +
        '   .fixedpic{' +
        '       display:block;' +
        '       position:fixed;bottom:0;left:0;padding:0;margin:0;z-index:10000;' +
        '   }' +
        '}';
		addCssByStyle(_css_footer_fixed_banner);
      	
      	$(function(){
            appendHtml(_tpl_footer_fixed_html, _timeout_footer_fixed_banner);
        });
    } else {

    }
})();