
// copy
let fs = require('fs');
function copy(source, target) {
    // 打开资源文件
    const BUFFER_SIZE = 3
    fs.open(source, 'r', function(err, rfd) {
        // 打开目标文件
        fs.open(target, 'w',function (err, wfd){
            let buffer = Buffer.alloc(BUFFER_SIZE);
            function next() {
                fs.read(rfd, buffer, 0, BUFFER_SIZE, null, (err, bytesRead) => {
                    fs.write(wfd, buffer, 0, bytesRead, null, (err, written) => {
                        if (bytesRead > 0) {
                            next();
                        } else {
                            fs.close(wfd, () => {

                            })
                            fs.close(rfd, () => {

                            });
                        }
                    })
                })
            }
            next();
        })
    })
}
copy(`1.js`, '2.js')