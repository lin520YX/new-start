let fs = require('fs');
let path = require('path');
let vm = require('vm');
/**
 * @description id 文件路径
 * @param {string} id 
 */ 
function Module(id){
    this.id = id;
    this.exports ={};
}
Module.extensions={
    '.js'(md){
    let tem=['(function(exports,require,module,__filename,__dirname){','})'];
    let p=fs.readFileSync(md.id,'utf8')
    let script = tem[0]+p+tem[1];
    vm.runInThisContext(script).call(md.exports,md.exports,req,md);
    },
    '.json'(md){
        md.exports = fs.readFileSync(md.id,'utf8');
    }
}

Module._resolveFilename=function(strName){
    // 扩展名;
    let extNames = Object.keys(Module.extensions);//['.js','.json'];
    if (/\.js$|\.json$/.test(strName)) {
        return path.resolve(__dirname, strName);
    }else{
        for(let i=0;i<extNames.length;i++){
            let p= path.resolve(__dirname, strName + extNames[i])
            try {
                fs.accessSync(p);
                return p;
            } catch (error) {
                
            }
        }
    }

}
Module._cache={};
Module._load=function(strName){
   let realPath = Module._resolveFilename(strName);
   let cache = Module._cache[realPath]
   if (cache) {
       return cache.exports
   }
   let ext = path.extname(realPath)
   let md = new Module(realPath);
   Module._cache[realPath] = md;
   Module.extensions[ext](md);
   return md.exports;
}

function req(strName){
   return Module._load(strName)
}
console.log(req('user'))
