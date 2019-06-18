(function(window){

    var isAndroid = window.isAndroid;
    var download_link_android = window.download_link_android;

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

    function showAdvantageContent(id_num){
        var btns = document.getElementsByClassName('advantage_button');
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            btn.className = btn.className.replace('current','');
        }
        var btn_cur = document.getElementById('advantage_button_' + id_num);
        btn_cur.className = btn_cur.className + " current";




        var btns = document.getElementsByClassName('advantage_content');
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            btn.className = btn.className.replace('current','');
        }
        var btn_cur = document.getElementById('advantage_content_' + id_num);
        btn_cur.className = btn_cur.className + " current";

    }




    var queries = mapQuery();
    var is_auto_download_apk = ((""+queries['is_auto_download_apk'])==='true');
    if(is_auto_download_apk && isAndroid){
        setTimeout(function(){
            window.location.href = download_link_android;
        },100);
    }


    window.onClickAdvantageButton = function(num){
        showAdvantageContent(num)
    };
    showAdvantageContent(1);

    $('.language_current').click(function(){
        $('.language_drop').show();
    });
    $(document).click(function(e){
        var x = $(e.target) ;
        var y = x.closest('.language_select');
        if(y && y.length > 0 ){
            return;
        }
        $('.language_drop').hide();
    });


    $.getJSON("/isChinaIP",function (d) {
        $("#download_link_android_loading").hide();
        $("#download_link_android").show();

        $("#download_link_android").attr("is_cn",d.isChina);
        if(d.isChina){
            $("#download_link_android").attr("href",window.download_link_android)
        }else {
            $("#download_link_android").attr("href",window.download_link_android_alien)
        }
    });
    



    function isNeedInBrowser() {

        var userAgentInfo = navigator.userAgent||"";
        var keyword = [
            "MicroMessenger",
            "DingTalk",
            " QQ/7",
            "KaKao",
            "KAKAOTALK"
        ];

        for (var i = 0; i < keyword.length; i++) {
            var key = keyword[i];
            if(userAgentInfo.indexOf(key)>=0){
                return true;
            }
        }
        return false;

        // return true;

    }



    if(isNeedInBrowser()){
        $("#apk_down_go_browser_tips").show();
    }


})(window);