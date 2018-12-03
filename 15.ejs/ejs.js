// ejs 可以渲染数据 返回模版
let ejs = require('ejs');
let fs = require('fs');
let path = require('path');
let templateStr = fs.readFileSync(path.join(__dirname, 'index.ejs'), 'utf8');
// 普通的字符串 
// function render(str,obj){
//     return str.replace(/<%=([\s\S]*?)%>/img,(...args)=>{
//         return obj[args[1]];
//     })
// }

// let obj ={
//     a:1
// }
// with(obj){
//     console.log(a)
// }

function render(templateStr, obj) {
    // 拼出一个js 的脚本字符串
    let str = `let tmpl = ''\r\n`;
    str += `with(b){\r\n`
    str += "tmpl+=`"
    let content = templateStr.replace(/<%([\s\S]*?)%>/g, function () {
        return '`\r\n' + arguments[1] + '\r\ntmpl+=`'
    });
    content += '`\r\n}'
    let tail = `\r\nreturn tmpl`;
    let fnStr = str + content + tail;
    let fn = new Function('b', fnStr);
    return fn(obj);
}
let r = render(templateStr, { arr: [1, 2, 3] });
console.log(r)