var fs = require('fs');



module.exports = function readTxtFile(file_path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file_path, 'utf-8', function (err, data) {
            if (err) {
                reject();
                return;
            }
            try {
                resolve(data);
            } catch (e) {
                reject();
            }
        });
    });
};