
(function(document,window,exports){

    var isIPhone = window.isIPhone;
    var download_link = window.download_link;
    var download_link_android = window.download_link_android;
    var download_link_ios = window.download_link_ios;
    var group_name = window.group_name;

    function getSchemaUrl (){

        var loc = window.location.toString();
        if(group_name){
            loc = "https://beechat.io/join?g=" + group_name;
        }

        var idx = loc.indexOf("://");
        if (idx != -1) {
            loc = loc.substring(idx + 3);
        }
        idx = loc.indexOf("#");
        if (idx != -1) {
            loc = loc.substring(0, idx);
        }

        var ua = navigator.userAgent.toLowerCase();
        var isUCBrowser = (ua.indexOf('ucbrowser') > 0);


        var result = '';
        if(isUCBrowser){
            var xxxx = encodeURIComponent("http://beechat.io/?is_auto_download_apk=true");
            result =  "intent://" + loc + "#Intent;scheme=beechat;package=com.beeplabs.beechat;S.browser_fallback_url="+xxxx+";end";
        }

        else if(isIPhone){
            result = "beechat://" + loc;
        }
        else {
            //intent://beechat.io/join?g=234324&isDev=1#Intent;scheme=beechat;package=com.beeplabs.beechat;S.browser_fallback_url=http%3A%2F%2Fbeechat.io%2F;end
            var xxxx = encodeURIComponent("http://beechat.io/?is_auto_download_apk=true");
            result =  "intent://" + loc + "#Intent;scheme=beechat;package=com.beeplabs.beechat;S.browser_fallback_url="+xxxx+";end";
        }

        return result;
    }



    function testIPhoneAppOpend(){
            var protoUrl = getSchemaUrl();
            var iframeContEl = document.getElementById('tgme_frame_cont') || document.body;
            var iframeEl = document.createElement('iframe');
            iframeContEl.appendChild(iframeEl);
            var pageHidden = false;
            window.addEventListener('pagehide', function () {
                pageHidden = true;
            }, false);
            window.addEventListener('blur', function () {
                pageHidden = true;
            }, false);
            if (iframeEl !== null) {
                iframeEl.src = protoUrl;
            }
            setTimeout(function() {
                if (!pageHidden) {
                    window.location = download_link_ios;
                }
            }, 2000);
    }


    function bindJoinButton(){
        var protoUrl = getSchemaUrl();
        var join_button_obj =  document.getElementById('join_button');
        join_button_obj.setAttribute('href',protoUrl);


        if(isIPhone){
            join_button_obj.onclick = function(){
                testIPhoneAppOpend();
            };

        }

    }



    function mapQuery(uri) {
        //window.location.search
        uri = uri && uri.split('#')[0] || window.location.search; //remove hash
        var i,
            key,
            value,
            index = uri.indexOf("?"),
            pieces = uri.substring(index + 1).split("&"),
            params = {};
        if (index === -1) {
            return params;
        }
        for (i = 0; i < pieces.length; i++) {
            try {
                index = pieces[i].indexOf("=");
                key = pieces[i].substring(0, index);
                value = pieces[i].substring(index + 1);
                if (!(params[key] = (value))) {
                    throw new Error("uri has wrong query string when run mapQuery.");
                }
            }
            catch (e) {
                console.log("error：[" + e.name + "] " + e.message + ", " + e.fileName + ", line:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
            }
        }
        return params;
    }


    function switchLanguage(lang){

        if(group_name){
            var url = "https://beechat.io/join?g="+group_name+"&lang=" + lang + "&siteLanguage=" + lang;
            window.location.href = url;
        }else {
            var x = window.location.origin; //"http://localhost:3001"
            var pathname = window.location.pathname;
            var gg = mapQuery();
            var g = gg.g|| "";
            var url = x + pathname + "?g="+g+"&lang=" + lang + "&siteLanguage=" + lang;
            window.location.href = url;
        }
    }


    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }




    function checkIsWeiXin(){
        if(is_weixin()){
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



    function init(){
        bindJoinButton();
        var x = checkIsWeiXin();
        if(!x){
            checkIsInTaobao();
        }
    }

    init();

    exports.switchLanguage = switchLanguage;

})(document,window,window);
