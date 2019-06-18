function isInTargetCountry() {
    return IsTargetCountryIran['result'];
    //return true;
}

function DomAddClass(id,className){
    var elem = document.getElementById(id);
    var className0 = elem.className || '';
    elem.className = (className0 + ' ' + className);
}

(function(){

    function loadI18n(callback){
        callback();
    }

    function fontSizeSetREM() {

        var tid = 0;
        var fontSize = 100;
        var pageWidth = 375;

        var maxPageWidth = 767;
        var elm = document.documentElement;
        var clientWidth = elm.clientWidth;
        if (clientWidth >= maxPageWidth) {
            clientWidth = maxPageWidth;
        }
        var fonsSizeSeting = fontSize * (clientWidth / pageWidth) + 'px';
        elm.style.fontSize = fonsSizeSeting;
        function refreshRem() {
            var elmInner = document.documentElement;
            var widthInner = elmInner.clientWidth;
            if (widthInner >= maxPageWidth) {
                widthInner = maxPageWidth;
            }
            elmInner.style.fontSize = fontSize * (widthInner / pageWidth) + 'px';

            loadI18n(function(){
                document.body.style.display = 'block';
            });
        }

        window.addEventListener('resize', function () {
            if(tid){
                clearTimeout(tid);
            }
            tid = setTimeout(refreshRem, 100);
        }, false);
        refreshRem();
    }




    setTimeout(function(){
        fontSizeSetREM();
        checkTargetCountry();
        checkPlatform();
        document.getElementById('hime_content_root').style.display='block';
    },10);


})();



function onMobileClickDownload(){
    document.getElementById('mobileDownloadApkIron1').style.display = 'none';
    document.getElementById('mobileDownloadApkIron2').style.display = 'block';
}

function checkTargetCountry(){
    DomAddClass('body',"isIran_"+ isInTargetCountry());
}

function checkPlatform(){
   var ua = navigator.userAgent;
   var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    DomAddClass('body','isIos_' + isIOS);

}
