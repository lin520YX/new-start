let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    mode:'development',
    entry:{
        bundle:'./src/index.js'
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    // source-map 源码映射
    // 在生产环境中进行调试
    // devtool:'source-map', //单独创建一个源码映射文件，制定到当前列
    // devtool:'eval-source-map', //不分离
    // devtool:'cheap-module-source-map', //babel编译后的内容
    // devtool:'cheap-module-eval-source-map', //生产环境不用sourcemap

    // 要上线了  发现了bug 边打包变更改
    // watch:true, //实时监控
    // watchOptions:{
    //     poll:1000,
    //     aggreateTimeout:2000, //防抖处理
    //     ignore:/node_modules/
    // },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        // new CleanWebpackPlugin('./dist'),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ],
    devServer:{
        // mock
        before(app){
            app.get('/api/user',function(req,res){
                res.json({'name':'lyf'})
            })
        },
        // proxy:{
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    }
}

//前端有个服务8080  服务端3000
// webpack-dev-server  内置express http-proxy-middleware