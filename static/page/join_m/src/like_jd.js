(function(){
// 鍒ゆ柇娴忚鍣�
    var Navigator = navigator.userAgent;
    var ifChrome = Navigator.match(/Chrome/i) != null && Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
    var ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
    var ifiPad = (Navigator.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
    var ifiPhone = (!ifiPad && Navigator.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
    var ifSafari = (ifiPhone || ifiPad) && Navigator.match(/Safari/);
    var version = 0;
    ifSafari && (version = Navigator.match(/Version\/([\d\.]+)/));

    version = parseFloat(version[1], 10);
    // 鏄惁浠庡井淇℃墦寮€
    var ifWeixin = navigator.userAgent.indexOf("MicroMessenger") >= 0; // weixin
    var j = false;
    var iframe = "plugIn_downloadAppPlugIn_loadIframe";
    var t = false;
    var i = 0;
    var B = {};
    var b = {};
    var selector = null;
    var Hquery = {};
    // 鍒ゆ柇褰撳墠浣跨敤鐨刯s妗嗘灦鏄痾epto杩樻槸jquery
    var Query = window.Zepto || window.jQuery ? true : false;
    var g = [];
    // 鏄惁瀛樺湪html5鐨刲ocalStorage 瀛樺偍
    var isHasLocalStorage = window.localStorage ? true : false;
    var o = "mdownloadAppPlugInskip";
    var p = null;

    function m() { // 鎵撳嵃鏃堕棿 渚嬪:2016-5-18
        var M = new Date();
        var N = M.getFullYear();
        var O = M.getMonth() + 1;
        var L = M.getDate();
        return N + "-" + O + "-" + L;
    }
    // 寰俊鐩稿叧鎿嶄綔
    function r() { // weixin api
        WeixinJSBridge.invoke("getInstallState", {
            packageName: "com.beeplabs.beechat",
            packageUrl: "openApp.beechat://"
        }, function(M) {
            var N = M.err_msg,
                L = 0;
            if (N.indexOf("get_install_state:yes") > -1) {
                j = true
            }
        })
    }
    // 鏍规嵁鏄惁瀛樺湪js妗嗘灦杩涜dom鍜屾椂闂寸殑缁戝畾
    function bind(dom, event, fun) { // bind event
        if (Query) {
            selector("#" + dom).bind(event, fun)
        } else {
            selector("#" + dom).addEventListener(event, fun, false)
        }
    }

    function z(L) {
        var M = (L || "mGen") + (++i);
        return M
    }
    // 寰俊鎿嶄綔
    if (ifWeixin) { // if navigitor is weixin
        if (window.WeixinJSBridge && WeixinJSBridge.invoke) {
            r()
        } else {
            document.addEventListener("WeixinJSBridgeReady", r, false)
        }
    }

    // 濡傛灉瀛樺湪js妗嗘灦
    if (Query) {
        selector = window.$;
        Hquery = window.$
    } else {
        selector = function(obj) {
            if (typeof obj == "object") {
                return obj
            }
            return document.querySelector(obj);
        };
        if (!window.$) {
            window.$ = Hquery = selector
        } else {
            Hquery = window.$
        }
    }
    window.onblur = function() {
        for (var L = 0; L < g.length; L++) {
            clearTimeout(g[L])
        }
    };
    // 璁剧疆cookie銆�
    function e(N) {
        var M = document.cookie.indexOf(N + "=");
        if (M == -1) {
            return ""
        }
        M = M + N.length + 1;
        var L = document.cookie.indexOf(";", M);
        if (L == -1) {
            L = document.cookie.length
        }
        return document.cookie.substring(M, L)
    }
    // 璁剧疆cookie
    function l(N, P, L, Q, O) {
        var R = N + "=" + escape(P);
        if (L != "") {
            var M = new Date();
            M.setTime(M.getTime() + L * 24 * 3600 * 1000);
            R += ";expires=" + M.toGMTString()
        }
        if (Q != "") {
            R += ";path=" + Q
        }
        if (O != "") {
            R += ";domain=" + O
        }
        document.cookie = R
    }

    // 鎵撳紑鐨勯摼鎺ラ泦鍚�
    function createConfigObject(L) {
        var url = {
            //downAppURl: "https://h5.m.jd.com/active/download/download.html?channel=jd-m",
            //downAppIos: "https://union.m.jd.com/download/go.action?to=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fid414245413&client=apple&unionId=12532&subunionId=m-top&key=e4dd45c0f480d8a08c4621b4fff5de74",
            //downWeixin: "https://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
            //downIpad: "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8",
            //inteneUrl: "openApp.jdMobile://360buy?type=1",
            inteneUrlParams: null,
            openAppBtnId: "",
            closePanelBtnId: "",
            closePanelId: "",
            closeCallblack: null,
            closeCallblackSource: null,
            cookieFlag: null,
            noRecord: false,
            sourceType: "JSHOP_SOURCE_TYPE",
            sourceValue: "JSHOP_SOURCE_VALUE",
            openAppEventId: "MDownLoadFloat_OpenNow",
            closePanelEventId: "MDownLoadFloat_Close"
        };
        if (L) {
            for (var M in L) {
                if (M && L[M]) {
                    url[M] = L[M]
                }
            }
        }
        return url
    }
    // 鏁查粦鏉� 閲嶇偣鍐呭銆傜湅浜笢鏄€庝箞瑙ｅ喅鍏煎闂鐨勩€�
    function openApp(N, L) { // openApp
        var R = h(N); //鑾峰彇鐩稿搴旂殑url
        var O = null;
        if (ifWeixin) { // 濡傛灉鏄井淇＄
            var M = null;
            if (j) {
                M = R
            } else {
                M = N.downWeixin
            }
            location.href = M; // 鐩存帴浣跨敤location.href鎵撳紑
            return
        }
        if (ifiPad) { // 濡傛灉鏄痠pad
            O = N.downIpad
        } else {
            if (ifiPhone) { // 濡傛灉鏄痠phone
                O = N.downAppIos
            } else {
                O = N.downAppURl
            }
        }

        if (ifChrome) { // 濡傛灉鏄痗hrome
            if (ifAndroid) { //瀹夊崜娴忚鍣�
                var Q = R;
                R = y(Q);
                // 寤跺悗50姣
                setTimeout(function() {
                    window.location.href = R
                }, 50)
            }
        }
        if (ifSafari && version >= 9) { // 鍒ゆ柇safari鐗堟湰 濡傛灉澶т簬9
            setTimeout(function() {  // 蹇呴』瑕佷娇鐢╯ettimeout
                var S = document.createElement("a"); //鍒涘缓a鍏冪礌
                S.setAttribute("href", R), S.style.display = "none", document.body.appendChild(S);
                var T = document.createEvent("HTMLEvents"); // 杩斿洖鏂板垱寤虹殑 Event 瀵硅薄锛屽叿鏈夋寚瀹氱殑绫诲瀷銆�
                T.initEvent("click", false, false)// 鍒濆鍖栨柊浜嬩欢瀵硅薄鐨勫睘鎬�,   S.dispatchEvent(T)  // 缁戝畾浜嬩欢
            }, 0)
        } else {
            document.querySelector("#" + iframe).src = R; // 灏唅frame澧炲姞src
        }
        var P = Date.now();
        setTimeout(function() {
            if (L) {
                var S = setTimeout(function() {
                    x(P, O)
                }, 1500);
                g.push(S)
            }
        }, 100)
    }
    // x鏂规硶
    function x(N, downUrl) {
        var L = Date.now();
        if (N && (L - N) < (1500 + 200)) {
            window.location.href = downUrl
        }
    }

    function h(N) {
        var V = [];
        var P = N.inteneUrlParams;
        var T = {
            category: "jump",
            des: "productDetail"
        };
        if (N.sourceType && N.sourceValue) {
            T.sourceType = N.sourceType;
            T.sourceValue = N.sourceValue;
            if (P && !P.sourceType && !P.sourceValue) {
                P.sourceType = N.sourceType;
                P.sourceValue = N.sourceValue
            }
        }
        if (P) {
            for (var U in P) {
                if (U && P[U]) {
                    V.push('"' + U + '":"' + P[U] + '"')
                }
            }
        } else {
            for (var U in T) {
                if (U && T[U]) {
                    V.push('"' + U + '":"' + T[U] + '"')
                }
            }
        }
        try {
            var Q = MPing.EventSeries.getSeries();
            if (Q) {
                var W = JSON.parse(Q);
                W.jdv = encodeURIComponent(e("__jdv"));
                W.unpl = encodeURIComponent(e("unpl"));
                W.mt_xid = encodeURIComponent(e("mt_xid"));
                W.mt_subsite = encodeURIComponent(e("mt_subsite"))
            }
            var S = {
                mt_subsite: encodeURIComponent(e("mt_subsite")),
                __jdv: encodeURIComponent(e("__jdv")),
                unpl: encodeURIComponent(e("unpl")),
                __jda: encodeURIComponent(e("__jda"))
            };
            Q = JSON.stringify(W);
            V.push('"m_param":' + Q);
            V.push('"SE":' + JSON.stringify(S))
        } catch (R) {
            V.push('"m_param":null')
        }
        var M = "{" + V.join(",") + "}";
        var O = N.inteneUrl.split("?");
        var L = null;
        if (O.length == 2) {
            L = O[0] + "?" + O[1] + "露ms=" + M
        } else {
            L = O[0] + "?params=" + M
        }
        return L
    }

    function y(L) {
        //return "intent://m.jd.com/#Intent;scheme=" + L + ";package=com.jingdong.app.mall;end"


        var loc = window.location.toString();
        var idx = loc.indexOf("://");
        if (idx != -1) {
            loc = loc.substring(idx + 3);
        }
        idx = loc.indexOf("#");
        if (idx != -1) {
            loc = loc.substring(0, idx);
        }
        return "intent://" + loc + "#Intent;scheme=beechat;package=com.beeplabs.beechat;end";
    }

    function bindOpenAppBtnIdClick(L) {
        if (L.openAppBtnId) {
            B[L.openAppBtnId] = L;
            G(L.openAppBtnId, L.openAppEventId);
            bind(L.openAppBtnId, "click", function() {
                var P = this.getAttribute("id");
                var M = B[P];
                if (!t) {
                    var N = document.createElement("iframe");
                    N.id = iframe;
                    document.body.appendChild(N);
                    document.getElementById(iframe).style.display = "none";
                    document.getElementById(iframe).style.width = "0px";
                    document.getElementById(iframe).style.height = "0px";
                    t = true
                }
                var O = M.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + M.cookieFlag : "downloadAppPlugIn_downCloseDate";
                l(O, Date.now() + "_2592000000", 60, "/", "beechat.io");
                l(O, Date.now() + "_2592000000", 60, "/", "beechat.io");
                openApp(M, true)
            })
        }
    }

    function bindClosePanelBtnIdClick(M) {
        if (M.closePanelBtnId && M.closePanelId) {
            B[M.closePanelBtnId] = M;
            G(M.closePanelBtnId, M.closePanelEventId);
            var Q = M.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + M.cookieFlag : "downloadAppPlugIn_downCloseDate";
            var O = e(Q);
            var P = null;
            if (O) {
                P = O.split("_");
                if (P.length == 2) {
                    P[0] = parseInt(P[0], 10);
                    P[1] = parseInt(P[1], 10)
                } else {
                    P = null
                }
            }
            var L = Date.now();
            if (Html5Plus() || (!M.noRecord && P && P.length == 2 && (L - P[0]) < P[1])) {
                document.querySelector("#" + M.closePanelId).style.display = "none";
                if (M.closeCallblack) {
                    var N = M.closeCallblackSource ? M.closeCallblackSource : null;
                    M.closeCallblack.call(N)
                }
                return
            } else {
                document.querySelector("#" + M.closePanelId).style.display = "block"
            }
            bind(M.closePanelBtnId, "click", function() {
                var U = this.getAttribute("id");
                var R = B[U];
                var T = R.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + R.cookieFlag : "downloadAppPlugIn_downCloseDate";
                if (!R.noRecord) {
                    l(T, Date.now() + "_259200000", 60, "/", "beechat.io");
                    l(T, Date.now() + "_259200000", 60, "/", "beechat.io")
                }
                document.querySelector("#" + R.closePanelId).style.display = "none";
                if (R.closeCallblack) {
                    var S = R.closeCallblackSource ? R.closeCallblackSource : null;
                    R.closeCallblack.call(S)
                }
            })
        }
    }

    function Html5Plus() { // htmlplus
        if (Navigator.indexOf("Html5Plus") >= 0) {
            return true
        } else {
            return false
        }
    }

    function G(P, M) {
        try {
            var O = document.getElementById(P);
            var L = O.className;
            if (L) {
                L = L + " J_ping"
            } else {
                L = "J_ping"
            }
            O.className = L;
            O.setAttribute("report-eventid", M)
        } catch (N) {}
    }

    function downloadAppPlugInInner(configObj) {
        var M = createConfigObject(configObj);
        bindOpenAppBtnIdClick(M);
        bindClosePanelBtnIdClick(M)
    }

    Hquery.downloadAppPlugIn = downloadAppPlugInInner;
    Hquery.downloadAppPlugInOpenApp = function(configObj) {
        var M = createConfigObject(configObj);
        openApp(M);
    }

})();



function init(){


    function getIntentUrl(){

        var loc = window.location.toString();
        var idx = loc.indexOf("://");
        if (idx != -1) {
            loc = loc.substring(idx + 3);
        }
        idx = loc.indexOf("#");
        if (idx != -1) {
            loc = loc.substring(0, idx);
        }


        var xxxx = encodeURIComponent(window.download_link_android);

        return "intent://" + loc + "#Intent;scheme=beechat;package=com.beeplabs.beechat;S.browser_fallback_url="+xxxx+";end";

    }


    $.downloadAppPlugIn({
        downAppURl: window.download_link_android, //"https://h5.m.jd.com/active/download/download.html?channel=jd-m",
        downAppIos: window.download_link_ios, //"https://union.m.jd.com/download/go.action?to=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fid414245413&client=apple&unionId=12532&subunionId=m-top&key=e4dd45c0f480d8a08c4621b4fff5de74",
        downWeixin: 'http://beechat.io',// "https://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
        downIpad: "http://beechat.io",
        inteneUrl: getIntentUrl(),
        openAppBtnId:'join_button'
    });

}




var ua = navigator.userAgent.toLowerCase();
var isUCBrowser = (ua.indexOf('ucbrowser') > 0);
var isMQQBrowser = (ua.indexOf('mqqbrowser') > 0);
if(isUCBrowser || isMQQBrowser){
    init();
}





