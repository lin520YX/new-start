let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let multer = require('multer')
let upload = multer({dest:'uploads'});
// querstring 解析深层次
app.use(bodyParser.urlencoded({extended:false})); // 专门处理表单格式
app.use(bodyParser.json()) // json 格式
app.post('/login',function(req,res) {
    res.send(req.body);
})
app.post('/profile',upload.single('avatar'),function(req,res,next){
    res.send({name:'cg'})
})  
app.listen(3000);