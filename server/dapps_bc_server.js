var http = require('http');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var proxy = require('http-proxy-middleware');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var languageParser = require('./utils/languageParser');
var readJSONFile = require('./utils/readJSONFile');
var readTxtFile = require('./utils/readTxtFile');
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



app.use("/bc_dapp", express.static(path.join(__dirname, '../bc_dapp'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));


app.get('/favicon.ico',function (req, res) {
    var p = path.join(__dirname, '../static/res/images/favicon.ico');
    res.sendFile(p);
});




app.get('/',async function (req, res) {
    var p = path.join(__dirname, '../bc_dapp/index.html');
    var codePath = path.join(__dirname, '../bc_dapp/code.txt');
    var x = await readTxtFile(codePath);
    res.render(p, {
        codeTxt: x
    });
});



http.createServer(app).listen(3005, 'localserver');
console.log('Server running at localserver:3005');