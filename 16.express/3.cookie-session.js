let express = require('express');
let cookieParser = require('cookie-parser'); // 帮我们解析cookie放到req.cookies属性

let app = express();
app.use(cookieParser('zfpx'));
// s%3Azfpx.%2Ffl56ix3wcE%2BNLeDcWO%2BHcRW2Ucclhe4CnQvZKr%2BayY
// s:zfpx./fl56ix3wcE+NLeDcWO+HcRW2Ucclhe4CnQvZKr+ayY
let crypto = require('crypto');
let str = crypto.createHmac('sha256','zfpx').update('zfpx').digest('base64');
console.log(str);
app.get('/read',function (req,res) {
    res.send(req.signedCookies); // 取带签名的cookie 会把合法的cookie放到此对象上
})
app.get('/write',function (req,res) {
  res.cookie('name','zfpx',{
    maxAge:5000,signed:true
  });
  res.send('write ok');
})
app.listen(3000);