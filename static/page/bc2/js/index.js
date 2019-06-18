


function isMobile() {
    var clientWidth=window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth;
    if(clientWidth < 750){
        return true;
    }

    var userAgent = navigator.userAgent;
    var isIPhone = userAgent.indexOf('iPhone') >= 0;
    var isAndroid = userAgent.indexOf("Android") >= 0;
    return (isAndroid || isIPhone);
}



function getSelectLanguageHtml() {
    var siteLanguage = window.siteLanguage;
    var siteLanguageName = "English";
    var siteLanguageFlag = "flag_uk";
    if(siteLanguage==='zh'){
        siteLanguageName = "中文";
        siteLanguageFlag = "flag_cn";
    }

    var html = '' +
        '    <div class="language_select">\n' +
        '\n' +
        '        <div class="language_current" onclick="showDropdownList(\'language_dropdown\')">\n' +
        '            <div class="language_item">\n' +
        '                <img src="/static/res/images/uis_beechat/'+siteLanguageFlag+'.png" >\n' +
        '                <span>'+siteLanguageName+'</span>\n' +
        '                <img class="lang_arrow" src="/static/page/bc2/images/triangle.png" alt="">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="language_drop" id="language_dropdown">\n' +
        '                <a class="language_item" href="?siteLanguage=en">\n' +
        '                    <img src="/static/res/images/uis_beechat/flag_uk.png" >\n' +
        '                    <span>English</span>\n' +
        '                </a>\n' +
        '                <a class="language_item" style="display: none;" href="?siteLanguage=zh">\n' +
        '                    <img src="/static/res/images/uis_beechat/flag_cn.png" >\n' +
        '                    <span>中文</span>\n' +
        '                </a>\n' +
        '        </div>\n' +
        '    </div>';

    return html;
}



function showDropdownList(id) {
    document.getElementById(id).style.display = 'block';
}



function downloadBtns() {

    var siteLanguage = window.siteLanguage;

    var btn_ios = "IOS Download";
    var btn_android = "Android Download";
    var goto_beechat1 = "Back to version 1.0";

    if(siteLanguage==='zh'){
        btn_ios = "IOS版本下載";
        btn_android = "安卓版本下載";
        goto_beechat1 = "跳轉至1.0版本";
    }



    var download_link_android_bc2 = window.download_link_android_bc2;
    var download_link_ios_bc2 = window.download_link_ios_bc2;


    var x = '' +
        '<div class="header_content siteLanguage_'+siteLanguage+'">' +
        '   <div class="link_people1">Link People</div>' +
        '   <div class="link_people2">Link Blockchain</div>' +
        '   <div style="height: 10px;"></div>' +
        '   <div class="link_people3">Blockchain based messenger and</div>' +
        '   <div class="link_people3">cryptocurrency community</div>' +
        '   <div class="xx_download_btns">' +
        '       <a href="'+download_link_ios_bc2+'" class="xx_download_btn">'+btn_ios+'</a>' +
        '       <a href="'+download_link_android_bc2+'" class="xx_download_btn">'+btn_android+'</a>' +
        '   </div>' +
        '   <div style="height: 1px;clear: both"></div>' +
        '   <div class="xx_download_btns" style="margin-top: 10px;">' +
        '       <a href="https://itunes.apple.com/cn/app/id1444851336" class="xx_download_btn">Apple AppStore</a>' +
        '       <a href="https://webchat.beechat2.com" class="xx_download_btn">Web IM</a>' +
        '   </div>' +
        '   <a href="https://beechat.io/beechat1?siteLanguage='+siteLanguage+'" class="goto_beechat1" style="display: none">'+goto_beechat1+'</a>' +
        '</div>';

    return x;
}


function initMain() {
    var headerInner1 = '<img src="/static/page/bc2/images/banner02.png" alt="" width="100%">' + getSelectLanguageHtml() + downloadBtns();
    var headerInner2 = '<img src="/static/page/bc2/images/banner_mo01.png" alt="" width="100%">' + getSelectLanguageHtml() + downloadBtns();
    if(isMobile()){
        document.getElementById("header").innerHTML = headerInner2;
    }else {
        document.getElementById("header").innerHTML = headerInner1;
    }




}




setTimeout(function () {
    initMain();
},1);
