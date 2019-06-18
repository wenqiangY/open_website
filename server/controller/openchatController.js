var path = require('path');
var express = require('express');
var router = express.Router();


function getPagePath(pageName){
    return path.join(__dirname,'../../openchat/' + pageName);
}



router.get(['/','/index.html'],function(req, res){
    var siteLanguage = req.siteLanguage;
    if(siteLanguage==="zh"){
        res.render(getPagePath("index_zh.html"),{siteLanguage:siteLanguage});
    }else {
        res.render(getPagePath("index.html"),{siteLanguage:siteLanguage});
    }
});

router.get('/about.html',function(req, res){
    var siteLanguage = req.siteLanguage;
    if(siteLanguage==="zh"){
        res.render(getPagePath("about_zh.html"),{siteLanguage:siteLanguage});
    }else {
        res.render(getPagePath("about.html"),{siteLanguage:siteLanguage});
    }
});

router.get('/preview.html',function(req, res){
    var siteLanguage = req.siteLanguage;
    if(siteLanguage==="zh"){
        res.render(getPagePath("preview_zh.html"),{siteLanguage:siteLanguage});
    }else {
        res.render(getPagePath("preview.html"),{siteLanguage:siteLanguage});
    }
});


router.use("/", express.static(path.join(__dirname, '../../openchat'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));





//小密圈分享到外面的页面
module.exports = router;