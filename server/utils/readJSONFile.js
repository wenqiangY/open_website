var fs = require('fs');


function readConfig(file_path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file_path, 'utf-8', function (err, data) {
            if (err) {
                reject();
                return;
            }
            try {
                var cc = JSON.parse(data);
                resolve(cc);
            } catch (e) {
                reject();
            }
        });
    });
}


var cache_data = {
    '/aaa/aaa': {
        timeStramp: 1111,
        data: {}
    }
};


module.exports = async function (file_path, cache_second) {

    var timeStramp_now = new Date().getTime();

    //1.如果需要缓存,并且缓存没有过期
    if (cache_second) {
        var cache_data_f = cache_data[file_path];
        if (cache_data_f && cache_data_f.timeStramp && (cache_data_f.timeStramp + cache_second * 1000 > timeStramp_now)) {
            return cache_data_f.data;
        }
    }


    var data = await readConfig(file_path);

    //2.如果需要缓存,缓存一下
    if (cache_second) {
        cache_data[file_path] = {
            timeStramp: timeStramp_now,
            data: data
        };
    }

    return data;
};