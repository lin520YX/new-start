#! /usr/bin/env node
console.log('hello')
// 需要在命令行下 解析参数
console.log(process.argv);
let parser = {
    port: 3000,
    host: 'localhost',
    dir:process.cwd()
}
let commander = require('commander');
let package = require('../package.json');
commander.on('--help', () => {
    console.log('a')
})
let argvs = commander.version(package.version)
    .option('-p,--port <v>', 'server port')
    .option('-o,--host <v>', 'server hostname')
    .option('-d,--dir <v>', 'server directory')
    .parse(process.argv)

parser = { ...parser, ...argvs }
let Server = require('../server');
let server = new Server(parser);
server.start()