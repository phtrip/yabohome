(function(global) {
    "use strict";
    var _Base64 = global.Base64;
    var version = "2.1.9";
    var buffer;
    if (typeof module !== "undefined" && module.exports) {
        try {
            buffer = require("buffer").Buffer
        } catch (err) {}
    }
    var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++)
            t[bin.charAt(i)] = i;
        return t
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
        } else {
            var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
            return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob)
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3]
          , ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0)
          , chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
        return chars.join("")
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b)
    }
    : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode)
    }
    ;
    var _encode = buffer ? function(u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")
    }
    : function(u) {
        return btoa(utob(u))
    }
    ;
    var encode = function(u, urisafe) {
        return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function(m0) {
            return m0 == "+" ? "-" : "_"
        }).replace(/=/g, "")
    };
    var encodeURI = function(u) {
        return encode(u, true)
    };
    var re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"),"g");
    var cb_btou = function(cccc) {
        switch (cccc.length) {
        case 4:
            var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3)
              , offset = cp - 65536;
            return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
        case 3:
            return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
        default:
            return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou)
    };
    var cb_decode = function(cccc) {
        var len = cccc.length
          , padlen = len % 4
          , n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0)
          , chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join("")
    };
    var atob = global.atob ? function(a) {
        return global.atob(a)
    }
    : function(a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode)
    }
    ;
    var _decode = buffer ? function(a) {
        return (a.constructor === buffer.constructor ? a : new buffer(a,"base64")).toString()
    }
    : function(a) {
        return btou(atob(a))
    }
    ;
    var decode = function(a) {
        return _decode(String(a).replace(/[-_]/g, function(m0) {
            return m0 == "-" ? "+" : "/"
        }).replace(/[^A-Za-z0-9\+\/]/g, ""))
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64
    };
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    if (typeof Object.defineProperty === "function") {
        var noEnum = function(v) {
            return {
                value: v,
                enumerable: false,
                writable: true,
                configurable: true
            }
        };
        global.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
                return decode(this)
            }));
            Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
                return encode(this, urisafe)
            }));
            Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
                return encode(this, true)
            }))
        }
    }
    if (global["Meteor"]) {
        Base64 = global.Base64
    }
}
)(this);
function htmldecode(dw1) {
    var UgYOHUTR2 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74"]('\x64\x69\x76');
    UgYOHUTR2["\x69\x6e\x6e\x65\x72\x48\x54\x4d\x4c"] = dw1;
    return UgYOHUTR2["\x69\x6e\x6e\x65\x72\x54\x65\x78\x74"] || UgYOHUTR2["\x74\x65\x78\x74\x43\x6f\x6e\x74\x65\x6e\x74"];
}
;var config = {};
/*config['menu'] = "Jmx0O2EgaHJlZj0iJHNpdGVfaG9zdCQvaW5kZXguaHRtbCImZ3Q76aaW6aG1Jmx0Oy9hJmd0OyZsdDthIGhyZWY9IiRzaXRlX2hvc3QkL2JlYXV0eV9zaG93Lmh0bWwiJmd0O+Wwj+WnkOe+juWlsyZsdDsvYSZndDsmbHQ7YSBocmVmPSIkc2l0ZV9ob3N0JC9zZXJ2aWNlX2l0ZW1zLmh0bWwiJmd0O+acjeWKoemhueebriZsdDsvYSZndDsmbHQ7YSBocmVmPSIkc2l0ZV9ob3N0JC9zZXJ2aWNlX3Byb2Nlc3MuaHRtbCImZ3Q75pyN5Yqh5q2l6aqkJmx0Oy9hJmd0Ow==";
config['process_box'] = "Jmx0O2RpdiBjbGFzcz0ibm8xIiZndDsmbHQ7ZGl2IGNsYXNzPSJ0ZXh0IiZndDvlnKjnur/pooTnuqYmbHQ7L2RpdiZndDsmbHQ7ZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9Im5vMiImZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q75rKf6YCa5LqL5a6cJmx0Oy9kaXYmZ3Q7Jmx0O2RpdiZndDvnoa7lrprlhbfkvZPkuovlrpwmbHQ7YnIvJmd0O+eVmeaCqOivpue7huWcsOWdgCZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9Im5vMyImZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q75oqA5biI5LiK6ZeoJmx0Oy9kaXYmZ3Q7Jmx0O2RpdiZndDvlronmjpLmgqjllpzmrKLnsbvlnosmbHQ7YnIvJmd0O+eahOaKgOW4iOS4iumXqOacjeWKoSZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9Im5vNCImZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q75pyN5Yqh5byA5aeLJmx0Oy9kaXYmZ3Q7Jmx0O2RpdiZndDvmioDluIjliLDovr7mjIflrprlnLDngrkmbHQ7YnIvJmd0O+W8gOWni+S/neWBpeaMieaRqSZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0Ow==";
config['advantage_box'] = "Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q7Jmx0O3AmZ3Q7Jmx0O2RpdiBzdHlsZT0id2lkdGg6MjIlOyImZ3Q7Jmx0O2ltZyBzcmM9ImltYWdlcy9hZHZhbnRhZ2VfdGl0bGUxLnBuZyIgYWx0PSIiLyZndDsmbHQ7L2RpdiZndDsgICAgICAgIOacrOS8muaJgOaYr+S4gOWutumbhuWoseS5kOS8kemXsuS4uuS4gOS9k+eahOeOsOS7o+WMluWVhuWKoeS8kemXsuS4reW/g++8jOaPkOS+m+WQhOexu+Wei+eahOS4iumXqOacjSDliqHmnI3liqHlnLDngrnlkozml7bpl7TnmobnlLHlrqLkurrlhrPlrprvvIzlpoLmn5Dmn5DphZLlupfvvIzmn5Dmn5Dlrr7ppobnrYnvvIzlrqLkurrpgInlj7flnLDngrnvvIwg5oiR5Lus55qE5oqA5biI5bCG5Lul5pyA5b+r55qE6YCf5bqm5Yiw6L6+5a6i5Lq65oyH5a6a55qE5Zyw54K577yM5Zug5q2k5oKo5LiN5b+F5ouF5b+D5pyJ5LuA5LmI5qy66K+IICAgICAgICDooYzkuLrvvIzmiJHku6zllYbliqHkuK3lv4Pnp4nmib/igJzlk4HotKjnrKzkuIAg5pyN5Yqh6Iez5LiK4oCd55qE57uP6JCl55CG5b+177yM57K+5Yqb5pWw5Y2B5bm055qE5Y+R5bGVIOWOhueoi+aJk+mAoOS6huS7iuWkqeeahOihjOS4mue/mOalmuOAgiZsdDsvcCZndDsmbHQ7cCZndDsmbHQ7ZGl2IHN0eWxlPSJ3aWR0aDoyMiU7IiZndDsmbHQ7aW1nIHNyYz0iaW1hZ2VzL2FkdmFudGFnZV90aXRsZTIucG5nIiBhbHQ9IiIvJmd0OyZsdDsvZGl2Jmd0OyAgICAgICAg5Y+q6KaB5oKo5Zyo5Li75Z+O5Yy65oiR5Lus6YO95Y+v5Lul57uZ5oKo5a6J5o6S77yM5L2G6aaW5YWI6KaB56Gu5a6a5oKo6YCJ5oup55qE5Zyw5Z2A55qE55yf5a6e5oCn77yMIOeEtuWQjuagueaNruaCqOeahOimgeaxgu+8iOi6q+mrmCDlubTpvoQg6Lqr5p2QIOagt+iyjCDogqToibLvvInlronmjpLlprnlprnpgIHov4fljrvjgILlpoLmnpzmgqjkuI0g5Zac5qyiLOWPqumcgOimgeWPiuaXtuS4juWuouacjeayn+mAmizmiJHku6zlsIbphYzmg4XmoLnmja7mgqjnmoTopoHmsYLnu5nmgqjlhY0gICAgICAgIOi0ueabtOaNouS6uuWRmO+8jOaIkeS7rOWdmuS/oeaIkeS7rOiDveWBmuWIsOiuqeaCqOa7oeaEj+OAgiZsdDsvcCZndDsmbHQ7cCZndDsmbHQ7ZGl2IHN0eWxlPSJ3aWR0aDoyMiU7IiZndDsmbHQ7aW1nIHNyYz0iaW1hZ2VzL2FkdmFudGFnZV90aXRsZTMucG5nIiBhbHQ9IiIvJmd0OyZsdDsvZGl2Jmd0OyAgICAgICAg5b6I5aSa5a6i5Lq65LiN5oS/5oSP55WZ5LiL6Ieq5bex55qE6IGU57O75pa55byP77yM6L+Z54K56K+35oKo5pS+5b+D77yM5Zug5Li65oiR5Lus5piv5o+Q5L6b55qE5YW86IGM576O5aWz5LiK6Zeo5oyJ5pGp5pyN5Yqh77yM5oiR5Lus5b+F6aG76KaB56Gu5a6a5oKo55qE5YW35L2T5L2N572u77yM5oiR5Lus5Y+v5Lul5YGa5Yiw5LqL5ZCO5oiR5Lus55qEIOaKgOW4iOS4jeS8muS4u+WKqOe7meWuouS6uuaJk+eUteivne+8jOaIkeS7rOS5n+S4jeS8muS/neWtmOaCqOeahOeUteivne+8jOaVrOivt+aUvuW/g+OAgiZsdDsvcCZndDsmbHQ7cCZndDsmbHQ7ZGl2IHN0eWxlPSJ3aWR0aDoyMiU7IiZndDsmbHQ7aW1nIHNyYz0iaW1hZ2VzL2FkdmFudGFnZV90aXRsZTQucG5nIiBhbHQ9IiIvJmd0OyZsdDsvZGl2Jmd0OyAgICAgICAg5Zyo5oKo5o+Q5Ye66KaB5rGC5LmL5ZCO5oiR5Lus5Lya5a6J5o6S56ym5ZCI5oKo6KaB5rGC55qE5aa55aa56L+H5Y6757uZ5oKo5pyN5Yqh77yM5aa55aa55Lya5ZyoMzDliIbpkp/lt6blj7PliLDovr7mgqjmjIflrprnmoTlnLDngrnvvIzmnKzkvJrmiYDnmoTmioDluIjpg73mmK/nu4/ov4fnsr7lv4PmjJHpgInnsr7lv4Pln7norq3ov4fnmoTvvIzmqKHnibnplb/nm7jkuI7mioDmnK/kuI3mmK/mgqjpnIDopoHmi4Xlv4PnmoTpl67popjjgIImbHQ7L3AmZ3Q7Jmx0Oy9kaXYmZ3Q7";
config['items_box'] = "Jmx0O2RpdiBjbGFzcz0ibGVmdCImZ3Q7Jmx0O2RpdiBjbGFzcz0iYm94MSImZ3Q7Jmx0O2RpdiBjbGFzcz0iaW1nIiZndDsmbHQ7aW1nIHNyYz0iaW1hZ2VzL2ltYWdlc18xLnBuZyIgYWx0PSIiJmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9InRpdGxlIiZndDvlpKnlpbPmlaPoirHvvIjpsqTpsbzmiZPmu5rvvIkmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJ0ZXh0IiZndDvnlLfkurrlubPourosTU3lsIbkuIDmnKjmo43nva7kuo7luIPmnaHpl7Qs5Lik5omL57Sn5o+h5qONLOWeguS9k+absuiEmiznlLfkurrnmoTlsI9EROaPkuWFpU1M77yM5bCPTU3ovrlNTOi+uei9rOi6q+OAgiZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9ImJveDIiJmd0OyZsdDtkaXYgY2xhc3M9ImltZyImZ3Q7Jmx0O2ltZyBzcmM9ImltYWdlcy9pbWFnZXNfMy5wbmciIGFsdD0iIiZndDsmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJ0aXRsZSImZ3Q75o6S5bGx5YCS5rW3Jmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q7TU3lubPourrlnKjluIPmnaHkuIos5oiQ5bmz6KGM54q277yM55S35Lq65LuOTU3lkI7pnaLmj5LlhaXov5vmlLvvvIzkuKTkurrouqvkvZPlvaLmiJDnm7Top5LjgILouqvkvZPljbPliLvlnKjnqbrkuK3ml4vovaws55S35Lq655qE5bCPRETlnKjlsI9NTeeahOa3sea0numHjOS5n+i9rOW+l+eIveOAgiZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9ImJveDEiJmd0OyZsdDtkaXYgY2xhc3M9ImltZyImZ3Q7Jmx0O2ltZyBzcmM9ImltYWdlcy9pbWFnZXNfNS5wbmciIGFsdD0iIiZndDsmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJ0aXRsZSImZ3Q75YCS5oyC6YeR6ZKpJmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q755S35Lq65q2j5bi45bmz6Lq6LE1N5Y+M6ISa5omj5L2P57qi5biD5p2h77yM5YCS5aS05ZCR5LiLLOeUqOWPo+WQq+S9j0RE5YGaQkou6L+Z5LiA6L+H56iL5Lit77yMTU3liIbliKvnlKjlhrAs54Ot5rC0LOi3s+i3s+ezluWQhOWBmuS4gOasoeOAgiZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9ImJveDIiJmd0OyZsdDtkaXYgY2xhc3M9ImltZyImZ3Q7Jmx0O2ltZyBzcmM9ImltYWdlcy9pbWFnZXNfNy5wbmciIGFsdD0iIiZndDsmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJ0aXRsZSImZ3Q75LiA6ams5bmz5bedJmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q755S35Lq65q2j5bi46Lq677yMTU3kuKTohb/lgZrkuIDlrZcs5LiA6IW/5p625Zyo55S35Lq655qE5bem6IKp6IaA5LiKLOWPpuS4gOiFv+aWnOaUvuWcqOeUt+S6uueahOWPs+iFv+S+pyzorqnnlLfkurpEROaPkuWFpeaUu+WHu+OAgiZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9InJpZ2h0IiZndDsmbHQ7ZGl2IGNsYXNzPSJib3gyIiZndDsmbHQ7ZGl2IGNsYXNzPSJpbWciJmd0OyZsdDtpbWcgc3JjPSJpbWFnZXMvaW1hZ2VzXzIucG5nIiBhbHQ9IiImZ3Q7Jmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGl0bGUiJmd0O+mjjueBq+i9ru+8iOS/hOe9l+aWr+Wkp+i9rOebmO+8iSZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9InRleHQiJmd0O+eUt+S6uuS7jeaYr+W5s+i6uixNTeWPjOiEmuWAkuaMgizlpLTlkJHkuIss55So5Y+j5ZCr5L2PRETlgZpCSizkuIDovrlCSuS4gOi+ueWBmjM2MOW6pui9rCzlsIbluIPmnaHmi6fmiJDpurvoirHlkI7lj4zmiYvkuIDmnb4sTU3nmoTouqvkvZPvvIxNTeeahOWYtOWQq+OAgiZsdDsvZGl2Jmd0OyZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9ImJveDEiJmd0OyZsdDtkaXYgY2xhc3M9ImltZyImZ3Q7Jmx0O2ltZyBzcmM9ImltYWdlcy9pbWFnZXNfNC5wbmciIGFsdD0iIiZndDsmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJ0aXRsZSImZ3Q76I2h5Y2D56eLJmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGV4dCImZ3Q7TU3lnZDlnKjluIPmnaHkuIos55S35Lq656uZ56uL552A5o6o5YqoTU0s6LGh6I2h5Y2D56eL5LiA5qC35YGaTUzvvIxNTeW8oOW8gOWkp+iFv+WSjOS6pOWPieWkp+iFvyzliIbliKvov47lkIjnlLfkurrnmoTov5vmlLvjgIImbHQ7L2RpdiZndDsmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJib3gyIiZndDsmbHQ7ZGl2IGNsYXNzPSJpbWciJmd0OyZsdDtpbWcgc3JjPSJpbWFnZXMvaW1hZ2VzXzYucG5nIiBhbHQ9IiImZ3Q7Jmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGl0bGUiJmd0O+Wbm+Wto+WPkei0oiZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9InRleHQiJmd0O+eUt+S6uuato+W4uOi6uixNTeWdkOWcqOS4iumdou+8jOeUseeUt+S6uueahOWwj0RE5o+S5YWl5ZCO77yMTU3liIbliKvpnaLlkJHkuJzljZfopb/ljJflm5vkuKrmlrnlkJHlgZrkuIrkuIvnm7Tmj5LlvI/ov5vmlLvjgIImbHQ7L2RpdiZndDsmbHQ7L2RpdiZndDsmbHQ7ZGl2IGNsYXNzPSJib3gxIiZndDsmbHQ7ZGl2IGNsYXNzPSJpbWciJmd0OyZsdDtpbWcgc3JjPSJpbWFnZXMvaW1hZ2VzXzgucG5nIiBhbHQ9IiImZ3Q7Jmx0Oy9kaXYmZ3Q7Jmx0O2RpdiBjbGFzcz0idGl0bGUiJmd0O+iKseW8gOWvjOi0tSZsdDsvZGl2Jmd0OyZsdDtkaXYgY2xhc3M9InRleHQiJmd0O01N5L2c5YCS56uL5Y+M5omL6aG25bqKLOWktOWSjOiCqeiGgOmdoOedgOW6iuWktOaUr+aSkei6q+S9k++8jOeUt+S6uuS7juS4iuWQkeS4i+WwhuWwj0RE5o+S5YWl44CCJmx0Oy9kaXYmZ3Q7Jmx0Oy9kaXYmZ3Q7Jmx0Oy9kaXYmZ3Q7";
config['demo1'] = "5byg5YWI55Sf77yIMTM3KioqKjQ5OTHvvIkmbHQ7YnImZ3Q76Z2e5bi45pyJ54m56Imy5ZG15ZG15Y676L+H5aW95aSa5qyh77yM6ZyA6KaB5omT55S16K+d6aKE57qm5omN5pyJ5oqY5omj5ZaUJmx0O2JyJmd0OyZsdDticiZndDvnjovlhYjnlJ/vvIgxMzkqKioqMjUxNO+8iSZsdDticiZndDvmhJ/op4npnZ7luLjnmoTkuI3plJnvvIzmnIDkuLvopoHnmoTmmK/nvo7lpbPmnI3liqHnmoTlvojlpb3lvojkuJPkuJrvvIzmnInnp43nmofluJ3nmoTmhJ/op4nvvIHvvIEmbHQ7YnImZ3Q7Jmx0O2JyJmd0O+mSn+WFiOeUn++8iDEzOSoqKio2MzU177yJJmx0O2JyJmd0O+W+iOeIveW+iOiIkuacje+8jOaOqOiNkOaKgOW4iDIz5Y+344CCJmx0O2JyJmd0OyZsdDticiZndDvnlLDlhYjnlJ/vvIgxMzMqKioqNzk3N++8iSZsdDticiZndDvmioDluIjmiYvms5Xlpb3vvIHku4rlpKkxNeWPt+aKgOW4iOabv+aIkeaMieaRqe+8jOebuOW9k+S4k+S4mu+8gSZsdDticiZndDsmbHQ7YnImZ3Q76IuP5YWI55Sf77yIMTM3KioqKjE3NTXvvIkmbHQ7YnImZ3Q756eB5a+G5q+U6L6D5aW977yM5YWo5aWX5b6I5L6/5a6c77yM5LiL5qyh6L+Y5Y67Jmx0O2JyJmd0OyZsdDticiZndDvku6PlhYjnlJ/vvIgxMzgqKioqODQ2OO+8iSZsdDticiZndDvmioDmnK/msLTlubPlpKrlpb3kuobvvIzlvojllpzmrKLlmaJ+fn5+fiZsdDticiZndDsmbHQ7YnImZ3Q76ZmI5YWI55Sf77yIMTM2KioqKjM1MTHvvIkmbHQ7YnImZ3Q75pyJ5bm45Zyo5pyA576O5aW955qE5bm05Y2O6YeM77yM6YGH6KeB5L2g44CC5b6I54i95b6I6IiS5pyN77yBJmx0O2JyJmd0OyZsdDticiZndDvliJjlhYjnlJ/vvIgxMzUqKioqMTM3Nu+8iSZsdDticiZndDvlsI/lp5DkuI3plJkg6ZW/5b6X5b6I5ryC5LquIOi6q+adkOW+iOato+eCue+8jOearuiCpOWPiOeZve+8jOWbnuWRs+aXoOept++8jOWTiOWTiCZsdDticiZndDsmbHQ7YnImZ3Q75p2O5YWI55Sf77yIMTMxKioqKjIzMjHvvIkmbHQ7YnImZ3Q76L+Z5bey57uP5piv5oiR56ys5LqM5qyh5om+5L2g5Lus5LqG77yM5L6d54S25b6I5qOS77yM5b6I54i977yM6L+Y5Lya5YaN5p2l55qE77yBJmx0O2JyJmd0OyZsdDticiZndDvpu4TlhYjnlJ/vvIgxMzUqKioqMzY2NO+8iSZsdDticiZndDvlvojkuJPkuJrvvIzmnI3liqHlvojlkajliLDvvIzlvojoiJLmnI3jgILjgILjgILjgIImbHQ7YnImZ3Q7Jmx0O2JyJmd0O+WRqOWFiOeUn++8iDEzOSoqKiozMjM377yJJmx0O2JyJmd0O+WonOWonOW+iOa8guS6rizkuIDnsbPlha3nmoTouqvpq5gs5Liq5a2Q5Lmf6Z2e5bi455qE5YyA56ewLOi6q+adkOabtC4uLiZsdDticiZndDsmbHQ7YnImZ3Q76IOh5YWI55Sf77yIMTM1KioqKjg1NjbvvIkmbHQ7YnImZ3Q76ZqP5Y+r6ZqP5Yiw77yM576O5aWz5b6I5ryC5Lqu77yM5pyN5Yqh6LSo6YeP5b6I5aW977yB5YGa5LqG5LiA5Liq5YWo5aWX77yBIOWkqueIveS6hu+8jOazouazouWTku+8gSZsdDticiZndDsmbHQ7YnImZ3Q76ams5YWI55Sf77yIMTM5KioqKjI4NTjvvIkmbHQ7YnImZ3Q75Li95Li95b6I5oCn5oSf77yM5Yqo5L2c5Lmf5b6I5Yiw5L2N77yM54m55Yir5piv5bGB6IKh6L+c5q+ULi4uJmx0O2JyJmd0OyZsdDticiZndDvlhajlhYjnlJ/vvIgxMzQqKioqNTM5Ne+8iSZsdDticiZndDvlk6Xku6zlsI/nvo7lvojkuI3plJnlk6bvvIzpgYfliLDkuoblsLHliKvmlL7ov4fvvIzkuI3nhLblsLHmmK/kvaDnmoTmjZ/lpLHlkq8mbHQ7YnImZ3Q7Jmx0O2JyJmd0O+auteWFiOeUn++8iDEzOSoqKioxMzc577yJJmx0O2JyJmd0O+eOr+Wig29r77yM5pyN5Yqh55u45b2T5LiN6ZSZ77yB5oqA5biI5ryC5Lqu5bm06L2777yM5omL5rOV5b6I5LiT5LiaJmx0O2JyJmd0OyZsdDticiZndDvmnpflhYjnlJ/vvIgxMzEqKioqNjU2Me+8iSZsdDticiZndDvlt7Lnu4/mhJ/lj5fkuobml6DmlbDmrKHvvIzmg7Plv4XkuI3nlKjlpJror7Tmm7TlpJrkuobvvIzlpITlnKjpl7nluILnmoTpnZnosKfmmK/mnIDkuqvlj5fnmoTvvIzkuIDotbDov5vljrvku7/kvZvooqvpmpTnu53kuobkuIDmoLfmhJ/lj5flhajouqvnmoTmlL7mnb7jgIImbHQ7YnImZ3Q7Jmx0O2JyJmd0O+mprOWFiOeUn++8iDEzNyoqKio2NzIx77yJJmx0O2JyJmd0O+WOu+eahOW+iOaXqSDmnI3liqHnmoTlp5HlqJjmiYvms5Xlvojlpb3vvIzmgIHluqbkuZ/lvojkuI3plJkg5aW96K+EJmx0O2JyJmd0OyZsdDticiZndDvljaLlhYjnlJ/vvIgxMzkqKioqODY0Me+8iSZsdDticiZndDvmioDluIjmsLTlubPkuI3plJkg5omz6L+H5p2l6YKj5LiL5ZCs5Yiw576O5aWz55qE5aOw6Z+zLi4mbHQ7YnImZ3Q7Jmx0O2JyJmd0O+acseWFiOeUn++8iDEzNSoqKiozODg177yJJmx0O2JyJmd0O+aMieaRqeaJi+azleWPr+S7pe+9nueOr+Wig+S5n+i/mOWPr+S7pSDvvZ7vvZ4mbHQ7YnImZ3Q7Jmx0O2JyJmd0O+mZiOWFiOeUn++8iDEzOCoqKioyNzkx77yJJmx0O2JyJmd0O+aMuuWlveeahO+8jOadpeS6huWHoOasoeS6hu+8jOaMieeahOW+iOiIkuacjSZsdDticiZndDsmbHQ7YnImZ3Q75p2O5YWI55Sf77yIMTM2KioqKjY3NjbvvIkmbHQ7YnImZ3Q76Juu5aW955qE77yM546v5aKD5LiN6ZSZ77yM56a75a625b6I6L+R77yM5oqA5biI55qE5omL6Im65LiN6ZSZ77yM5LiL5qyh6L+Y5Lya5p2lJmx0O2JyJmd0OyZsdDticiZndDvpn6nlhYjnlJ/vvIgxMzkqKioqNjM0Me+8iSZsdDticiZndDvmu6HmhI/vvIzlpb3kuYXmsqHmnInljrvkuobvvIzmsqHmg7PliLDvvIzmnI3liqHmsLTlubPov5jmmK/lvojlpb3vvIwmbHQ7YnImZ3Q7Jmx0O2JyJmd0O+W0lOWFiOeUn++8iDEzOSoqKiozOTgy77yJJmx0O2JyJmd0O+aYqOWkqeesrOS4gOasoeWBmu+8jOWBmuS6huWFqOWll++8jDEx5Y+355yf5b+D5LiN6ZSZ77yM5Lq66ZW/5b6X5Lmf5ryC5Lqu77yM5oyJ55qE5b6I6IiS5pyN77yM5LiL5qyh6L+Y5om+5aW5Jmx0O2JyJmd0OyZsdDticiZndDvoi4/lhYjnlJ/vvIgxMzQqKioqMTg2NO+8iSZsdDticiZndDvmioDluIjmiYvms5Xlvojlpb3vvIzlpb3lg4/mmK8xOOWPt++8ge+8gQ==";
*/
var lbs_host = "//api.sxcgys.com"
  , site_host = location.origin
  , html = '';
$(function() {
    /*var lc_shopname = sessionStorage.getItem("shop_name")
      , lc_nation = sessionStorage.getItem("nation")
      , lc_prov = sessionStorage.getItem("prov");
    if (lc_shopname != null) {
        $('.shop_name').html(lc_shopname);
    } else {
        $.ajax({
            url: lbs_host + "/location/ip?token=ZsdDtkaXYgY2xhc3M9ImJveDEiJ&type=1",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                var ip_info = {
                    'city': data.district,
                    'province': data.province
                };
                lc_shopname = ip_info.city + app.name;
                lc_nation = data.country;
                lc_prov = ip_info.province;
                $('.shop_name').html(lc_shopname);
                sessionStorage.setItem("shop_name", lc_shopname);
                sessionStorage.setItem("nation", lc_nation);
                sessionStorage.setItem("prov", lc_prov);
            }
        });
    }*/
    //$('.tel_no').html('<a href="tel:' + tel  + '">电话:' + tel  + '</a>')
    //$('.tel_no').html(tel);
    $('.tips2').click(function() {
        //判断是安卓还是ios
        var u = navigator.userAgent
          , app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //ios终端
        if (isAndroid) {
            location.href = 'http://www.nvtaoke.cn/mchat.apk';
            //location.href = 'http://www.nvtaoke.cn/butter.apk';
            var layid = layer.open({
                type: 1,
                closeBtn: false,
                shade: [0.8, '#cc19be'],
                btn: ['复制小妹账号'],
                title: "温馨提示",
                content: "安装好专用APP后，请添加小妹账号",
                yes: function(index, layero) {
                    layer.close(layid);
                    Clipboard.copy($(".tel_no").text());
                }
            });
            //	_czc.push(["_trackEvent",'下载MChat','安卓','点击下载',1,'']);
        } else if (isIOS) {
            //这个是ios操作系统
            var layid = layer.open({
                type: 1,
                closeBtn: false,
                shade: [0.8, '#cc19be'],
                btn: ['复制小妹账号'],
                title: "温馨提示",
                content: "安装好专用APP后，请添加小妹账号",
                yes: function(index, layero) {
                    layer.close(layid);
                    Clipboard.copy($(".tel_no").text());
                }
            });
            //_czc.push(["_trackEvent",'下载mchat','IOS','打开APPStore',1,'']);
            window.open('https://itunes.apple.com/cn/app/mchat-messenger/id1340850682?mt=8');
            //window.open('https://itunes.apple.com/cn/app/id1488068509');
        } else {
        }
        $('.layui-layer-content').addClass('layui-repair');
    });
    for (var i in config) {
        if (document.getElementById(i)) {
            html = htmldecode(Base64.decode(config[i]));
            //html = html.replace(/\$tel\$/g, tel );
            html = html.replace(/\$site_host\$/g, site_host);
            $('#' + i).html(html);
        }
    }
    $('body').delegate('.callme', 'click', function() {//var url = 'tel:' + tel ;
    //location.href = url;
    });
    $('.show_box .list a').click(function() {
        var imageobj = new Image();
        var html = $(this).html()
          , sis = $(this).siblings('.text')
          , img_url = $(this).find('img').attr('src');
        var w = $(window).width()
          , h = $(window).height()
          , iw = $(this).find('img').width()
          , ih = $(this).find('img').height();

        imageobj.src = img_url;
        if (imageobj.complete) {
            iw = imageobj.width,
            ih = imageobj.height;
        } else {
            imageobj.onload = function() {
                iw = imageobj.width,
                ih = imageobj.height;
            }
            ;
        }
        w = w > h ? h : w;
        var real_h = Math.ceil(w * ih / iw);
        real_h = real_h > h ? h * 0.9 : real_h;

        w = w * 0.9;
        var layid = layer.open({
            type: 1,
            closeBtn: false,
            area: [w + 'px', real_h + 'px'],
            shade: [0.8, '#cc19be'],
            btn: ['立即预约', '换一个'],
            title: false,
            content: html,
            yes: function(index, layero) {
                layer.close(layid);
                //var url = 'tel:' + tel;
                location.href = url;
            }
        });
    });
    /*$(".wan-carousel-1, .wan-carousel-2").WanCarousel();
    $(".wan-carousel-3").WanCarousel({
        interval: 8000,
        speed: 400,
    });
    $(".wan-carousel-4").WanCarousel({
        interval: 2000,
        speed: 800,
    });*/
});
