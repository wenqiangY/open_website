var fs = require('fs');
var path = require('path');
var ExpressKit = require('express-kit');
var FileCacheReader = ExpressKit.FileCacheReader;

var config = {
    download_link_android_bc2: "https://install.beechat2.com/apk/beechat.v230.apk",
    download_link_ios_bc2: "https://beechat.io/ios_install_bc",
    ios_plist_bc2: "https://beechat.io/ios_install_bc_plist.plist",
    ios_app_version: '2.3.0',
    ipa_file_url: "https://install.beechat2.com/ios/beechat.v230.ipa"
};


function trimObjectValue(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            var v = (obj[k] || "").trim();
            obj[k] = v;
        }
    }
    return obj;
}


function readConfig() {

    var url = "https://bccheckversion.beechat2.com/checkversion/getLastVersion";
    return FileCacheReader.sendGetJsonRequest(url).then(function (d) {
        if (d.code === 0) {

            var data = d.data || {};

            var appVersionInfo_android = data.appVersionInfo_android || {};
            var appVersionInfo_ios = data.appVersionInfo_ios || {};

            return trimObjectValue({
                download_link_android_bc2: appVersionInfo_android.backup_upgrade_url, //apk 文件路径
                download_link_ios_bc2: appVersionInfo_ios.backup_upgrade_url,//https://beechat.io/ios_install_bc2
                ios_plist_bc2: "https://beechat.io/ios_install_bc_plist.plist",
                ios_app_version: appVersionInfo_ios.app_version,
                ipa_file_url: appVersionInfo_ios.upgrade_pkg_url
            });

        } else {
            console.log("[ERROR] getLastVersion error ")
        }
    });
}


async function doReadConfig() {
    try {
        config = await readConfig();
    } catch (e) {
        var time = new Date().toUTCString();
        console.log(time + " read config occurs error");
    }
}


var is_loop_start = false;

async function readConfigLoop() {
    if (is_loop_start) {
        return;
    }
    is_loop_start = true;
    await doReadConfig();
    setInterval(async function () {
        await doReadConfig();
    }, 30 * 1000);
}


readConfigLoop();

module.exports = function () {
    return config;
};