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
var getCheckVersionConfig = require('./config/getCheckVersionConfig');
var isInChinaByHTTPRequest = require('./utils/isInChinaByHTTPRequest');


var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');

app.use(cookieParser());
app.use(languageParser('siteLanguage', 'en')); //default language English



app.use("/static", express.static(path.join(__dirname, '../static'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));


app.get('/isChinaIP',async function(req, res){
    var isChinaObj = await isInChinaByHTTPRequest(req);
    res.send(isChinaObj);
});

app.get("/ios_install_guide",async function (req, res) {
    var p = path.join(__dirname, '../static/page/ios_install_guide/index.html');
    res.sendFile(p);
});

app.get(["/ios_install_bc2",'/ios_install_bc', '/ios_install_bc_test'],async function (req, res) {
    var lang = req.siteLanguage;
    var p = path.join(__dirname, '../static/page/ios_install_bc2/index.html');

    //默认英文
    var json_path = path.join(__dirname, '../static/page/ios_install_bc2/i18n/i18n_en.json');
    if (lang === 'zh') {
        json_path = path.join(__dirname, '../static/page/ios_install_bc2/i18n/i18n_zh.json');
    } else if (lang === 'ko' || lang === 'kr') {
        json_path = path.join(__dirname, '../static/page/ios_install_bc2/i18n/i18n_ko.json');
    }
    var i18n = await readJSONFile(json_path, 0);

    var year = new Date().getFullYear();
    var configObj = getCheckVersionConfig();


    if(req.path === '/ios_install_bc_test'){
        configObj.ios_app_version = "test";
        configObj.ios_plist_bc2 = "https://beechat.io/ios_install_bc_plist_test.plist";
    }


    res.render(p, {
        i18n: i18n,
        year: year,
        ios_app_version: configObj.ios_app_version,
        ios_plist_bc2: configObj.ios_plist_bc2
    });

});


app.get(["/ios_install_bc2_plist.plist","/ios_install_bc_plist.plist",'/ios_install_bc_plist_test.plist'],async function (req, res) {

    var configObj = getCheckVersionConfig();

    var p = path.join(__dirname, '../static/page/ios_install_bc2/beechat_plist.html');

    res.setHeader('Content-Type', 'text/xml');


    if(req.path === '/ios_install_bc_plist_test.plist'){
        configObj.ipa_file_url = "https://bc2-apk-al.oss-cn-hongkong.aliyuncs.com/ios/beechat.test.ipa";
    }

    res.render(p, {
        ios_app_version:  configObj.ios_app_version,
        ipa_file_url: configObj.ipa_file_url
    });

});













app.get('/favicon.ico',function (req, res) {
    var p = path.join(__dirname, '../static/res/images/favicon.ico');
    res.sendFile(p);
});




function renderBeechat2Home(req, res) {

    var userAgent = req.headers['user-agent'];
    var isIPhone = userAgent.indexOf('iPhone') >= 0;
    var isAndroid = userAgent.indexOf("Android") >= 0;
    var isMobile = (isAndroid || isIPhone);

    var siteLanguage = req.siteLanguage;
    siteLanguage = "en";

    var p = path.join(__dirname, '../static/page/bc2/index_en.html');

    if(siteLanguage ==='zh'){
        p = path.join(__dirname, '../static/page/bc2/index_zh.html');
    }

    var configObj = getCheckVersionConfig();

    res.render(p, {
        isMobile:isMobile,
        download_link_android_bc2: configObj.download_link_android_bc2 || "https://www.pgyer.com/jytQ",
        download_link_ios_bc2: configObj.download_link_ios_bc2 || "https://www.pgyer.com/PAlG",
    });
}



app.get('/video/:video_id',function (req, res) {
    var video_id = req.params.video_id;
    var p = path.join(__dirname, '../static/page/video/index.html');
    //"bc_video_kor.mov"; "bc_video_us.mov"; "bc_video_intro.mov";
    //http://beechat-web-al.oss-cn-hongkong.aliyuncs.com/static/videos/bc_video_kor.mov
    //http://cdn.ibeechat.com/static/videos/bc_video_us.mov
    res.render(p, {
        video_url: "//cdn.ibeechat.com/static/videos/" + video_id + ".mov"
    });
});




app.get('/',async function (req, res) {
    await renderBeechat2Home(req,res);
});



http.createServer(app).listen(3001, 'localserver');
console.log('Server running at localserver:3001');