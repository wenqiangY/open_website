var fs = require('fs');
var path = require('path');
var ExpressKit = require('express-kit');
var DevUtils = ExpressKit.DevUtils;


var config = {};


var file_path = path.resolve(__dirname,'./config.json');

if(DevUtils.isDev){
    file_path = path.resolve(__dirname,'./_config.json');
}



function readConfig(){

    return new Promise(function(resolve,reject){
        fs.readFile(file_path,'utf-8',function(err,data){

            if(err){
                reject();
                return;
            }

            try {
                var cc = JSON.parse(data);
                resolve(cc);
            }catch (e) {
                reject();
            }
        });
    });
}



async function doReadConfig(){
    try {
        config = await readConfig();
    }catch (e){
        var time = new Date().toUTCString();
        console.log(time + " read config occurs error");
    }
}


var is_loop_start = false;
async function readConfigLoop(){
    if(is_loop_start){
        return;
    }
    is_loop_start = true;
    await doReadConfig();
    setInterval(async function(){
        await doReadConfig();
    },30 * 1000);
}


readConfigLoop();

module.exports = function(){
    return config;
};