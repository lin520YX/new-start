// webpack 配置文件 commonjs规范基于node
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: "./src/index.js", // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 绝对路径
        filename: 'bundle.js'
    },
    // css-loader 解析文件中的 @import
    module: {
        rules: [{
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.js/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties',{loose:true}],
                        ['@babel/plugin-proposal-decorators',{legacy:true}]
                    ]
                }
            },
            excludes: /node_modules/
        }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        progress: true,
        compress: true
    },
    //webpack 配置 loader 转化器 加载器皿
    // plugin 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            hash: true
        })
    ]

}