let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyWebpackPlugin = require('uglify-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports={
    optimization:{
        minimizer:[
            new UglifyWebpackPlugin({
                cache:true,
                parallel:trye
            }),
            new OptimizeCssAssetsPlugin({
            })
        ]
    },
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:[
                    MiniCssExtractPlugin.loader
                ,'css-loader','postcss-loader']
            },
            {
                test:/\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                        ]
                    }
                },
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            chunk:['main']
        }),
        new MiniCssExtractPlugin({
            filename:'main.css',
        })
    ]
}