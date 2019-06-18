var home_language_en = require('../views/beecall/home_language_en');
var home_language_zh = require('../views/beecall/home_language_zh');



//以前的页面,现在已经用不到了.
//app.get('/', function (req, res) {

module.exports =  function (req, res) {
    var siteLanguage = req.siteLanguage;
    var req_query = req.query;
    var isDev = !!req_query.isDev;

    var userAgent = req.headers['user-agent'];
    var isIPhone = userAgent.indexOf('iPhone') >= 0;
    var isAndroid = userAgent.indexOf("Android") >=0;
    var isMobile = (isAndroid || isIPhone);

    var i18n = home_language_en;
    if (siteLanguage === 'zh') {
        i18n = home_language_zh;
    }
    res.render('beecall/home.html', {
        i18n: i18n,
        siteLanguage:siteLanguage,
        isMobile: isMobile,
        jspath: (isDev ? 'src' : 'asset')
    },function(aaa,bbb){
        bbb = bbb.replace(/\n/gm,'');
        bbb = bbb.replace(/\s{2,}/mg,' ');
        res.send(bbb);
    });

};



//var mm = require('./controller/beecallController');
//mm(req,res);