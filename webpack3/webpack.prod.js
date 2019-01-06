let base = require('./webpack.base');
let merge = require('webpack-merge');

module.exports = merge(base,{
    mode:'production',
    optimization:{
        minimiozer:[
            // .....
        ]
    }
})
// .dll 动态链接库 
// 上线时候打包速度增快