let base = require('./webpack.base.js');
let merge = require('webpack-merge');

module.exports = merge(base, {
    mode: 'development',
    // devtools: 'source-map'
})