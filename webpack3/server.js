let express = require('express');
let middle = require('webpack-dev-middleware')
let app =express();
let webpack = require('webpack');
let config = require('./webpack.config');
let compiler = webpack(config)
// 可以在服务端启动webpack 3000
app.use(middle(compiler))
app.get('/user',function(req,res){
    res.json({'name':'lyf'})
})
app.listen(3000)