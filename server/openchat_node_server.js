var http = require('http');
var path = require('path');
var ejs = require('ejs');
var express = require('express');
var cookieParser = require('cookie-parser');
var languageParser = require('./utils/languageParser');
// var ExpressKit = require('express-kit');
// var getBeeChatI18n = require('./views/beechat/getBeeChatI18n');
// var getBeechatJoinI18n = require('./views/join/getBeechatJoinI18n');
// var getConfig = require('./config/getConfig');


// var languageList = [
//     {lang: 'en', ic: 'flag_gb', text: 'English'},
//     {lang: 'ko', ic: 'flag_kr', text: '한국어'},
//     {lang: 'ja', ic: 'flag_jp', text: '日本語'},
//     {lang: 'zh', ic: 'flag_cn', text: '中文'}
// ];
//
// var languageMap = {
//     en: {lang: 'en', ic: 'flag_gb', text: 'English'},
//     ko: {lang: 'ko', ic: 'flag_kr', text: '한국어'},
//     ja: {lang: 'ja', ic: 'flag_jp', text: '日本語'},
//     zh: {lang: 'zh', ic: 'flag_cn', text: '中文'}
// };


var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, '../openchat'));
app.set('view engine', 'html');
//app.set('view cache', !ExpressKit.DevUtils.isDev);

app.use(cookieParser());
app.use(languageParser('siteLanguage', 'en')); //default language English


app.use("/static", express.static(path.join(__dirname, '../static'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));

app.use("/openchat", express.static(path.join(__dirname, '../openchat'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));



app.get(['/','/index.html'],function(req, res){
    var siteLanguage = req.siteLanguage;
    res.render("index.html",{siteLanguage:siteLanguage});
});

app.get('/about.html',function(req, res){
    var siteLanguage = req.siteLanguage;
    res.render("about.html",{siteLanguage:siteLanguage});
});

app.get('/preview.html',function(req, res){
    var siteLanguage = req.siteLanguage;
    res.render("preview.html",{siteLanguage:siteLanguage});
});

app.get('/docs/docs.html',function(req, res){
    var siteLanguage = req.siteLanguage;
    res.render("docs.html",{siteLanguage:siteLanguage});
});

app.get("/*_zh.html",function(req, res){
    res.send("404");
});


app.use("/", express.static(path.join(__dirname, '../openchat'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));


app.get("/whitepaper/*.pdf",function (req, res) {
    var p = path.join(__dirname, '../openchat/whitepaper/OC_WP_V3.pdf');
    res.sendFile(p);
});


http.createServer(app).listen(3009, 'localserver');
console.log('Server running at localserver:3009');