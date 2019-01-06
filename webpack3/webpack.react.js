let path = require('path');
let DllPlugin = require('webpack/lib/DllPlugin')
module.exports={
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js', //打包后文件的名字
        path:path.resolve(__dirname,'dista'),
        libraryTarget:'var',
        library:'_dll_[name]'
    },
    plugins:[
        new DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dista','mainfest.json')
        })
    ]
}