function getUrlParameterLang(){
    var x = getUrlParameter('lang');
    if(x){
        x = x.trim();
        x = x.replace(';','');
    }

    return x || 'en';
}

var currentLanguage = getUrlParameterLang();


var loc = window.location.toString();
var idx = loc.indexOf("://");
if (idx != -1) {
    loc = loc.substring(idx + 3);
}
idx = loc.indexOf("#");
if (idx != -1) {
    loc = loc.substring(0, idx);
}
var linkEl1 = document.getElementById("join_group_link_1");
var linkEl2 = document.getElementById("join_group_link_2");
linkEl1.href = "beechat://" + loc;
linkEl2.href = "beechat://" + loc;
var ua = navigator.userAgent;
if (ua.indexOf("Android") != -1 && ua.match(/Chrome/)) {
    var xxxx = encodeURIComponent(download_link_android);
    //linkEl1.href = linkEl2.href =  download_link_android;
    //linkEl1.href = linkEl2.href = "intent://beechat.io/join?g=234324#Intent;scheme=beechat;package=com.beechat.messenger;S.browser_fallback_url="+xxxx+";end";
    linkEl1.href = linkEl2.href = "intent://" + loc + "#Intent;scheme=beechat;package=com.beeplabs.beechat;S.browser_fallback_url="+xxxx+";end";
}
if (ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i)) {
    linkEl1.href = "beechat://" + loc;
    linkEl2.href = "beechat://" + loc;
}


linkEl1.onclick = linkEl2.onclick = function () {
    appOpened = false;
    if (heartbeat == null) {
        heartbeat = window.setInterval(function () {
            var now = new Date().getTime();
            var diff = now - lastInterval - 200;
            lastInterval = now;
            if (diff > 500) { // don't trigger on small stutters less than 1000ms
                before = new Date().getTime() - 3000;
                tipsShown = new Date().getTime();
                if (heartbeat != null) {
                    window.clearTimeout(heartbeat);
                    heartbeat = null;
                }
            }
        }, 200);
    }
    if (timeout != null) {
        window.clearTimeout(timeout);
        timeout = null;
    }
    before = new Date().getTime();
    timeout = window.setTimeout(function () {
        var now = new Date().getTime();
        if (heartbeat != null) {
            window.clearTimeout(heartbeat);
            heartbeat = null;
        }
        if (now - before > 2500 || appOpened) {
        } else {
            // open app store
            if (navigator.userAgent.match(/Android/i)) {
                window.location = document.getElementById('dl_android').href;
            } else if (navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)) {
                window.location = document.getElementById('dl_ios').href;
            }
        }
    }, 2000);
    window.location = this.href;
};
if (ua.indexOf("Android") != -1 || ua.match(/iPhone/i) || ua.match(/iPod/i)) { // || ua.match(/iPad/i)
    document.getElementById("desktop").style.display = "none";
    var menu = document.getElementById("mobile-header");
    if (menu != null) {
        menu.style.borderBottomStyle = "none";
    }
} else {
    document.getElementById("mobile").style.display = "none";
}
if (navigator.userAgent.match(/Android/i)) {
    document.getElementById('dl_ios').style.display = 'none';
    document.getElementById('dl_ios_desktop').style.display = 'none';
} else if (navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)) {
    document.getElementById('dl_android').style.display = 'none';
    document.getElementById('dl_android_desktop').style.display = 'none';
}
document.getElementById("user_agent").appendChild(document.createTextNode("User-agent: " + ua));
if (loc.indexOf("mode=test") != -1) {
    document.getElementById("user_agent").style.display = "block";
}
document.getElementById("download_area").onclick = function () {
    if (navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)) {
        var redirected = getProperty("app.store.redirected");
        if (redirected == null) {
            setProperty("app.store.redirected", "1");
        }
        window.location = download_link_ios;
    } else {
        var redirected = getProperty("google.play.redirected");
        if (redirected == null) {
            setProperty("google.play.redirected", "1");
        }
        window.location = download_link_android;
    }
};


function getProperty(name) {
    var prefix = name + "=";
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++) {
        var item = allCookies[i].replace(/^\s*-/, "");
        if (item.indexOf(prefix) == 0) {
            return item.substring(prefix.length, item.length);
        }
    }
    return null;
}


function setProperty(name, value) {
    var toExpire = new Date();
    if (value == null) {
        value = "";
        toExpire.setTime(new Date().getTime() - 24 * 3600 * 1000);
    } else {
        toExpire.setTime(new Date().getTime() + 3 * 24 * 3600 * 1000);
    }
    document.cookie = name + "=" + value
        + "; expires=" + toExpire.toGMTString()
        + "; path=/";
}
var done = false;
var appOpened = false;
var tipsShown = new Date().getTime();
var before = new Date().getTime();
var timeout = window.setTimeout(function () {
    var now = new Date().getTime();
    if (now - before > 2500 || appOpened) {
        // has new version of SOMA Messenger
        if (heartbeat != null) {
            window.clearTimeout(heartbeat);
            heartbeat = null;
        }
    } else {
        if (ua.indexOf("Android") != -1 && (ua.match(/Chrome/) || ua.match(/Firefox/))) {
            // Do not try to redirect to Google Play or download APK file automatically.
            if (heartbeat != null) {
                window.clearTimeout(heartbeat);
                heartbeat = null;
            }
        } else if (ua.indexOf("Android") != -1) {
            var tipsShown = new Date().getTime();
            window.setTimeout(function () {
                var now = new Date().getTime();
                if (now - tipsShown >= 3500 && now - tipsShown < 4000) {
                    //if (navigator.userAgent.match(/iPhone/i)
                    //		|| navigator.userAgent.match(/iPad/i)
                    //		|| navigator.userAgent.match(/iPod/i)) {
                    //	window.location = "https://itunes.apple.com/app/id992004655";
                    //} else {
                    var redirected = getProperty("google.play.redirected");
                    if (redirected == null) {
                        setProperty("google.play.redirected", "1");
                        window.location = download_link_android;
                    }
                    //}
                }
                if (heartbeat != null) {
                    window.clearTimeout(heartbeat);
                    heartbeat = null;
                }
            }, 3500);
        } else {
            if ((navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i))
                && !navigator.userAgent.match(/ OS [12345678]_/)) {
                var tipsShown = new Date().getTime();
                window.setTimeout(function () {
                    var now = new Date().getTime();
                    if (now - tipsShown >= 3500 && now - tipsShown < 4000) {
                        var redirected = getProperty("app.store.redirected");
                        if (redirected == null) {
                            setProperty("app.store.redirected", "1");
                            window.location = download_link_ios;
                        }
                    }
                    if (heartbeat != null) {
                        window.clearTimeout(heartbeat);
                        heartbeat = null;
                    }
                }, 3500);
            }
            // do nothing
        }
    }
    done = true;
}, 2000);

// For all other browsers except Safari (which do not support pageshow and pagehide properly)
var lastInterval = new Date().getTime();
var heartbeat = window.setInterval(function () {
    var now = new Date().getTime();
    var diff = now - lastInterval - 200;
    lastInterval = now;
    if (diff > 500) { // don't trigger on small stutters less than 1000ms
        before = new Date().getTime() - 3000;
        tipsShown = new Date().getTime();
        if (heartbeat != null) {
            window.clearTimeout(heartbeat);
            heartbeat = null;
        }
    }
}, 200);

window.addEventListener('pagehide', function () {
    tipsShown = new Date().getTime();
    if (!done) {
        appOpened = true;
        done = true;
    }
    if (timeout != null) {
        window.clearTimeout(timeout);
        timeout = null;
    }
    if (heartbeat != null) {
        window.clearTimeout(heartbeat);
        heartbeat = null;
    }
}, false);
window.addEventListener('pageshow', function () {
    tipsShown = new Date().getTime();
    if (heartbeat != null) {
        window.clearTimeout(heartbeat);
        heartbeat = null;
    }
}, false);
window.addEventListener('blur', function () {
    tipsShown = new Date().getTime();
    if (!done) {
        appOpened = true;
    }
    if (timeout != null) {
        window.clearTimeout(timeout);
        timeout = null;
    }
    if (heartbeat != null) {
        window.clearTimeout(heartbeat);
        heartbeat = null;
    }
}, false);









var loc = window.location.toString();
var idx = loc.indexOf("://");
if (idx != -1) {
    loc = loc.substring(idx + 3);
}
idx = loc.indexOf("#");
if (idx != -1) {
    loc = loc.substring(0, idx);
}
var ua = navigator.userAgent;

if (loc.indexOf("mode=test") != -1) {
    // do nothing
} else if (ua.indexOf("Android") != -1) {
    if (ua.match(/Chrome/) && !ua.match(/Chrome\/2/) && !ua.match(/Chrome\/1/)) {
        setTimeout(function(){
            window.location = "beechat://" + loc;
        },10);
    } else {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', "beechat://" + loc);
        iframe.setAttribute('width', '1px');
        iframe.setAttribute('height', '1px');
        iframe.setAttribute('position', 'absolute');
        iframe.setAttribute('top', '0');
        iframe.setAttribute('left', '0');
        document.getElementById("app_iframe").appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
} else {
    // do nothing for iOS
    // window.location = "soma://" + loc;
}




function switchLanguage(lang) {
    if (lang == null) {
        lang = "en";
    } else {
        if (lang.indexOf("?lang=") != -1) {
            lang = lang.substring(6);
        }
    }
    var query = window.location.search;
    if (query == null || query.length == 0 || query == "?") {
        if (query == "en") {
            // do nothing
            return;
        }
        window.location = window.location.pathname + "?lang=" + lang;
        return;
    }
    query = query.substring(1);
    var idx = query.indexOf("lang=");
    if (idx != -1) {
        if (lang == "en") {
            query = query.replace(/lang=../, "").replace("&&", "&");
            if (query.indexOf("&") == 0) {
                query = query.substring(1);
            }
            if (query.length == 0 || query == "?") {
                window.location = window.location.pathname;
            } else {
                window.location = window.location.pathname + "?" + query;
            }
        } else {
            window.location = window.location.pathname + "?" + query.replace(/lang=../, "lang=" + lang);
        }
        return;
    }
    if (lang == "en") {
        window.location = window.location.pathname + "?" + query;
    } else {
        window.location = window.location.pathname + "?lang=" + lang + "&" + query;
    }
}


/*********************************/
function renderSelectOption(selectedValue,lang,name){
    if(lang===selectedValue){
        return  '<option value="?lang='+lang+'" selected>'+name+' </option>';
    }
    return  '<option value="?lang='+lang+'">'+name+' </option>';
}

function renderLanguageSelect(value,eleId){
    var html = '' +
        '<select onchange="switchLanguage(this.options[this.selectedIndex].value);"> ' +
        renderSelectOption(value,"en","English") +
        renderSelectOption(value,"ar","العربية") +
        renderSelectOption(value,"es","Español") +
        renderSelectOption(value,"hi","नॉट") +
        renderSelectOption(value,"zh","中文") +
        renderSelectOption(value,"fa","فارسی") +
        renderSelectOption(value,"th","ไทย") +
        renderSelectOption(value,"tr","Türk") +
        renderSelectOption(value,"uk","Український") +
        renderSelectOption(value,"nl","Nederlands") +
        renderSelectOption(value,"it","italiano") +
        renderSelectOption(value,"ja","日本語") +
        renderSelectOption(value,"hu","magyar") +
        renderSelectOption(value,"id","Indonesia") +
        renderSelectOption(value,"ko","한국의") +
        renderSelectOption(value,"fr","Français") +
        renderSelectOption(value,"de","Deutsch") +
        renderSelectOption(value,"ms","Melayu") +
        renderSelectOption(value,"ru","Русский") +
        renderSelectOption(value,"pl","polski") +
        renderSelectOption(value,"pt","Português") +
        renderSelectOption(value,"ca","català") +
        renderSelectOption(value,"cs","čeština") +
        renderSelectOption(value,"hr","hrvatski") +
        renderSelectOption(value,"he","עברית") +
        renderSelectOption(value,"no","norsk") +
        renderSelectOption(value,"ro","română") +
        renderSelectOption(value,"da","dansk") +
        renderSelectOption(value,"fi","suomi") +
        renderSelectOption(value,"el","ελληνικά") +
        renderSelectOption(value,"sk","slovenský jazyk") +
        '</select>';

    document.getElementById(eleId).innerHTML = html;
}



function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}



//var isWeixin = true;
var isWeixin = is_weixin();

function checkIsWeiXin(){
    if(isWeixin){
        var display_content_array = document.getElementsByClassName('display_content');
        for (var i = 0; i < display_content_array.length; i++) {
            var obj = display_content_array[i];
            obj.style.display = 'none';
        }
        var mm = document.getElementsByClassName('weixin_content');
        mm[0].style.display= 'block';
        return true;
    }
    return false;
}


function checkIsInTaobao(){

    var ua = navigator.userAgent.toLowerCase();
    var isTaobao = (ua.indexOf('ucbrowser') > 0) && (ua.indexOf('aliapp') > 0);
    if(isTaobao){
        var display_content_array = document.getElementsByClassName('display_content');
        for (var i = 0; i < display_content_array.length; i++) {
            var obj = display_content_array[i];
            obj.style.display = 'none';
        }
        var mm = document.getElementsByClassName('taobao_content');
        mm[0].style.display= 'block';
        return true;
    }
    return false;
}


(function () {
    setTimeout(function () {
        var i18nMapName = window.qrjoin_i18n;
        var langName = currentLanguage;
        replaceI18nPlaceElement(i18nMapName, langName);
        renderLanguageSelect(currentLanguage,'select001');
        renderLanguageSelect(currentLanguage,'select002');
        var x = checkIsWeiXin();
        if(!x){
            checkIsInTaobao();
        }
        document.body.style.display = 'block';

        //window.alert(navigator.userAgent);

    }, 10);
})();
