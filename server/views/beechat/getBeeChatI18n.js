var language_zh = require('./language_zh');
var language_en = require('./language_en');
var language_kr = require('./language_kr');
var language_jp = require('./language_jp');


module.exports = function(siteLanguage){
    if(siteLanguage==='zh'){
        return language_zh
    }
    if(siteLanguage === 'ja'){
        return language_jp;
    }
    if(siteLanguage === 'ko'){
        return language_kr;
    }
    return language_en;
};