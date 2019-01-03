// webpack 配置文件 commonjs规范基于node
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    mode:'development',
    entry:"./src/index.js", // 入口文件
    output:{
        path: path.resolve(__dirname,'dist'), // 绝对路径
        filename:'bundle.js'
    },
    //webpack 配置 loader 转化器 加载器皿
    // plugin 插件
    plugin:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
        })
    ]

}