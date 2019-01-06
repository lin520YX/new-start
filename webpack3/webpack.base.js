let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebackPlugin = require('copy-webpack-plugin')
let Webpack = require('webpack')
module.exports={
    mode:'development',
    entry:{
        bundle:'./src/index.js'
    },
    // resolve:{ //commonjs查找路径
    //     modules:[path.resolve('node_modules')],
    //     extensions:['.js','.json','.css'],
    //     mainFields:['main','browser'],
    //     mainField:['index.js'],
    //     alias:{
    //         // 别名
    //         bootstrap:'bootstrap/dist/css/bootstrap.css'
    //     }
    // },
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
        // 优化那些不尽兴模块的解析
        // noParse:/jquery/, //有的文件不是第三方 自己写的
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
        }),
        // new Webpack.DefinePlugin({
        //     PRODUCTION:JSON.stringify('dev')
        // })
        // new CopyWebackPlugin({
        //     from:'xxx/xxx',
        //     to:path.resolve(__dirname,'dist')
        // }),
    ],
    devServer:{
        // mock
        // before(app){
        //     app.get('/api/user',function(req,res){
        //         res.json({'name':'lyf'})
        //     })
        // },
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
// copy-webpack-plugin
//  静态资源拷贝
//前端有个服务8080  服务端3000
// webpack-dev-server  内置express http-proxy-middleware