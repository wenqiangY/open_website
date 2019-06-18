setTimeout(function () {

    function isWeChat() {
        return navigator.userAgent.indexOf("MicroMessenger") > 0;
    }


    function checkIsWeiXin(){
        if(isWeChat()){
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

    var display_content = document.getElementById('display_content');
    if(checkIsWeiXin() || checkIsInTaobao()){
        display_content.style.display= 'none';
    }else {
        display_content.style.display= 'block';
    }


    var ua = navigator.userAgent.toLowerCase();
    var isIphone = false;
    if (/iphone|ipad|ipod/.test(ua)) {
        isIphone = true;
    }


    var groupName = location.pathname.replace("/","");


    function doJoinGroup() {

        if (isIphone) {

            window.setTimeout(function () {
            }, 2000);

            if (groupName != null && groupName.length != 0)
                window.location.href = "beechat2://resolve?domain=" + groupName;
            else
                window.location.href = "http://t.beechat.io/";

        } else {

            window.setTimeout(function () {
            }, 2000);

            if (groupName != null && groupName.length != 0)
                window.location.href = "beechat2://resolve?domain=" + groupName;
            else
                window.location.href = "http://t.beechat.io/";
        }
    }

    window.doJoinGroup = doJoinGroup;

},1);