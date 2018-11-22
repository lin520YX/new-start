let http = require('http');
let fs = require('fs');
let start = 0;
let pause = false;
process.stdin.on('data',(data)=>{
    if(data.toString().includes('p')){
        pause =true;
    }else{
        pause = false;
        download();
    }
})
let ws = fs.createWriteStream('./2.txt');
function download() {
    http.get({
        host: 'localhost',
        port: 3000,
        headers: {
            'Range': `bytes=${start}-${start + 4}`
        }
    }, (res) => {
        console.log(res.headers)
        let total = res.headers['content-range'].split('/')[1];
        res.on('data', (data) => {
            ws.write(data);
            start += 5;
            if (start < total&&!pause) {
                download();
            }
        })
    })
}
download();