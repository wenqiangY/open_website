function getI18nElementKeys(){
    var result = {};
    var elemList =  document.getElementsByClassName("BeeChat_i18n");
    for (var i = 0; i < elemList.length; i++) {
        var obj = elemList[i];
        if(obj && obj.dataset && obj.dataset.i18n){
            result[obj.dataset.i18n] = true;
        }
    }

    var keys = [];
    for(var k in result){
        if(result.hasOwnProperty(k)){
            keys.push(k);
        }
    }
    return keys;
}


function getI18nValue(i18nMap,langName,key){
    var realKey = 'kvs.'+langName +"." + key;
    return i18nMap[realKey];
}


function replaceI18nPlaceElement(i18nMapName,langName){
    var elemList =  document.getElementsByClassName("BeeChat_i18n");
    for (var i = 0; i < elemList.length; i++) {
        var obj = elemList[i];
        if(obj && obj.dataset && obj.dataset.i18n){
            var key = obj.dataset.i18n;
            var realKey = 'kvs.'+langName +"." + key;
            obj.innerHTML = i18nMapName[realKey];
        }
    }
}



function mapQuery (uri) {
    //window.location.search
    uri = uri && uri.split('#')[0] || window.location.search; //remove hash
    var i,
        key,
        value,
        index = uri.indexOf("?"),
        pieces = uri.substring(index + 1).split("&"),
        params = {};
    if (index === -1) {//如果连?号都没有,直接返回,不再进行处理.
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
            console.log("错误：[" + e.name + "] " + e.message + ", " + e.fileName + ", 行号:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
        }
    }
    return params;
}

function getUrlParameter(key){
    var m = mapQuery();
    return m[key];
}


function isAndorid(){
    var ua = navigator.userAgent;
    return ua.indexOf("Android") != -1;
}

function isIOS(){
    var ua = navigator.userAgent;
    return ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i);
}