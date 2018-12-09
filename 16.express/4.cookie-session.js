let express = require('express');
let session = require('express-session'); // 帮我们解析cookie放到req.cookies属性
let app = express();

app.use(session({
  resave:false, // 每次需要重新返回一个session
  saveUninitialized:true, // 是否保存未初始化的session
  secret:'zfpx'
}));
app.get('/',function (req,res) {
  let visit = 1;
  if(req.session.visit){
    visit = ++req.session.visit
  }
  req.session.visit = visit;
  res.send('你是第' + visit+'访问')
})
app.get('/visit',function (req,res) {
   
})

app.listen(3000);