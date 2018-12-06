let http = require('http');
let url = require('url');
let uuid = require('uuid');
let session = {};
const card = 'conenct.sid';
let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url, true);
    let cookies = require('querystring').parse(req.headers.cookie,'; ');
    console.log(cookies)
    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    if (pathname === '/towash') {
        let cardId = cookies[card]; // 取出卡号
        if (cardId && session[cardId]) { // 如果来过
            session[cardId].count--;
            res.end('欢迎 你是第一次访问的，给你一张卡，卡里有' + session[cardId].count + '次')
          }   else {
            let cardId = uuid.v4(); // 创造一张卡
            session[cardId] = { count: 10 };
            res.setHeader('Set-Cookie', `${card}=${cardId}`);
            res.end('欢迎 你是第一次访问的，给你一张卡，卡里有10次')
          }
    }
})
server.listen(3000);
