// 多语言 通过路径来切换语言
// 前端
// 后段

let languages = {
    en:"hello world",
    zh:'你好世界',
    ja:'xxxx世界',
    'zh-CN':'你好世界s'
};
let defaultLanguage = 'en';

let http = require('http');
http.createServer((req,res)=>{
    let l = req.headers['accept-language'];
    if(l){
      let arr =  l.split(',').map(item=>{
          let [lan,q="q=1"] = item.split(';')
          return{name:lan,q:Number(q.split('=')[1])}
        }).sort((a,b)=>{
            return a.q-b.q
        })
        console.log(arr)
    }else{
        res.end(languages[defaultLanguage]);
    }
}).listen(3000,()=>{
    console.log('3000')
})