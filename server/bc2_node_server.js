var http = require('http');
var path = require('path');
var ejs = require('ejs');
var proxy = require('http-proxy-middleware');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var languageParser = require('./utils/languageParser');
var readJSONFile = require('./utils/readJSONFile');
var ExpressKit = require('express-kit');
var getBeeChatI18n = require('./views/beechat/getBeeChatI18n');
var getBeechatJoinI18n = require('./views/join/getBeechatJoinI18n');
var getConfig = require('./config/getConfig');
var isInChinaByHTTPRequest = require('./utils/isInChinaByHTTPRequest');


var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
//app.set('view cache', !ExpressKit.DevUtils.isDev);


app.use(cookieParser());
app.use(languageParser('siteLanguage', 'en')); //default language English



app.use("/static", express.static(path.join(__dirname, '../static'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));


app.get('/favicon.ico',function (req, res) {
    var p = path.join(__dirname, '../static/res/images/favicon.ico');
    res.sendFile(p);
});


//加入群组页面
app.get('/:join_group_id',function (req,res) {
    var join_group_id = req.params.join_group_id || "";
    var p = path.join(__dirname, '../static/page/bc2_join/index.html');
    res.render(p, {
        join_group_id: join_group_id,
        year: new Date().getFullYear()
    });
});


app.get('/',async function (req, res) {
    res.redirect("http://beechat.io/");


    // var userAgent = req.headers['user-agent'];
    // var isIPhone = userAgent.indexOf('iPhone') >= 0;
    // var isAndroid = userAgent.indexOf("Android") >= 0;
    // var isMobile = (isAndroid || isIPhone);
    //
    // var siteLanguage = req.siteLanguage;
    // siteLanguage = "en";
    //
    // var p = path.join(__dirname, '../static/page/bc2/index_en.html');
    //
    // if(siteLanguage ==='zh'){
    //     p = path.join(__dirname, '../static/page/bc2/index_zh.html');
    // }
    //
    // var configObj = getConfig();
    //
    // res.render(p, {
    //     isMobile:isMobile,
    //     download_link_android_bc2: configObj.download_link_android_bc2 || "https://www.pgyer.com/jytQ",
    //     download_link_ios_bc2: configObj.download_link_ios_bc2 || "https://www.pgyer.com/PAlG",
    // });
});



http.createServer(app).listen(3002, 'localserver');
console.log('Server running at localserver:3002');