var join_i18n = require('./join_i18n.json');

var join_i18n_map = {
};


function buildI18nMap(langName){
    var i18n_map = {};
    var keys = Object.keys(join_i18n);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var v = join_i18n[k];
        if(k.indexOf(langName)===0){
            var k2 = k.substr(3);
            i18n_map[k2] = v;
        }
    }
    join_i18n_map[langName] = i18n_map;
    return i18n_map;
}



function getBeechatJoinI18n (langName){
    return join_i18n_map[langName] || buildI18nMap(langName);
}


module.exports = function(langName){
    var mm = getBeechatJoinI18n(langName);
    var mm_keys = Object.keys(mm);
    if(mm_keys.length ===0){
        return getBeechatJoinI18n('en');
    }
    return mm;
};