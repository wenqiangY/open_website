var http = require('http');
var https = require('https');


function sendGetRequest(url) {
    return new Promise(function (resolve, reject) {

        var http_protocol = http;
        if (url.indexOf("https") === 0) {
            http_protocol = https;
        }

        http_protocol.get(url, function (http_res) {
            http_res.setEncoding('utf8');
            var rawData = '';
            http_res.on('data', function (chunk) {
                rawData += chunk;
            });
            http_res.on('end', function () {
                try {
                    resolve(rawData);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', function (e) {
            reject(e);
        });
    });

}



function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}



async function isChinaIpOneIP(ip) {
    var country_code_response = await sendGetRequest("http://h5.ibeechat.com/api/v1/geoip/getCountryCode?ip=" + ip);
    if (typeof country_code_response === 'string') {
        country_code_response = JSON.parse(country_code_response);
    }
    var obj = country_code_response.obj || {};
    var countryCode = "" + (obj.countryCode || "");
    if (countryCode === "86") {
        return true;
    }
    return false;
}




async function isChinaIpInArray(ipArray) {
    for (var i = 0; i < ipArray.length; i++) {
        var obj = ipArray[i];
        var isChina = await isChinaIpOneIP(obj);
        if(isChina){
            return true;
        }
    }
    return false;
}



module.exports = async function (req) {

    var isChina = false;

    try {
        var ip = getClientIp(req);
        var ipArrayTemp = ip.split(",");
        var ipArray = [];
        for (var i = 0; i < ipArrayTemp.length; i++) {
            var obj1 = ipArrayTemp[i];
            obj1 = (obj1 || "").trim();
            if (obj1 && obj1.length > 0) {
                ipArray.push(obj1)
            }
        }

        isChina = await isChinaIpInArray(ipArray);

    } catch (e) {
        console.log(e);
    }

    return {
        isChina: isChina,
        ip: ip
    };

};
