let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
    ]
}