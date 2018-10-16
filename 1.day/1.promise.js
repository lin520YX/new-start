// 手写promise
// promise  es6规范 类
// new promise 时需要传递一个executor 执行器,执行器会立刻执行
// 执行器可以传递两个参数 resolve 成功的函数 他调用是可以传递一个值，值可以是任何值 reject 失败函数也可以传一个值
// 只能从pending态转到成功或者失败
// 每个实例都有一个then 方法，这两个方法传递两个参数，一个是成功，一个是失败
// 如果调用then 发现成功了 会让成功的函数执行并且把成功的内容当作参数传递到函数中
// 状态是panding 要把函数存起来 确定之后在执行
// 如果出现异常 变成失败的状态
function Promise(executor){
    let _this=this;
    // 初始状态为pending
    _this.status = 'pending';
    _this.value='undefined';
    _this.reason='undefined';
    _this.onfilfulled=[]; //存resolve 执行的函数
    _this.onrejected =[]; //存reject 执行的函数
    function resolve(value){
        if(_this.status=='pending'){
            _this.value = value;
            _this.status=='resolve'
            _this.onfilfulled.forEach(element => {
                element()
            });
        }
    }
    function reject(reason){
        if(_this.status=='pending'){
            _this.reason=reason;
            _this.status=='reject';
            _this.onrejected.forEach(element => {
                element()
            });
        }
    }
   try {
        executor(resolve,reject)
   } catch (error) {
       reject(e)
   }
}
/**
 * @description 返回一个promise 
 */ 
function judgePromise(promise,x,resolve,reject){
    if(promise==x){
        throw new Error('循环了');
    }
    if(x!=null&&(typeof x=='object'||typeof x =='function')){
        try {
            let then = x.then;
            if(typeof then == 'function'){
                then.call(x,(x)=>{
                    judgePromise(promise,x,resolve,reject)
                },e=>{
                    reject(e)
                })
            }else{
                // 对象
                resolve(x);
            }
        } catch (error) {
            reject(err);
        }
    }else{
        // const
        resolve(x);
    }
}
Promise.prototype.then=function(onfilfulled,onrejected){
    let _this =this;
    onfilfulled = typeof onfilfulled ==='function'?onfilfulled:val=>val;
    onrejected =  typeof onrejected ==='function'?onrejected:err=>{throw new Error(err)};
    let promise2 = new Promise((resolve,reject)=>{
        if(_this.status=='resolve'){
            // 用settime实现异步操作
            setTimeout(()=>{
                try {
                    let x = onfilfulled(_this.value);
                    judgePromise(promise2,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        if(_this.status=='reject'){
            setTimeout(()=>{
                try {
                    let x = onreject(_this.reason);
                    judgePromise(promise2,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        if(_this.status=='pending'){
            setTimeout(()=>{
                _this.onfilfulled.push(function(){
                    try {
                        let x = onfilfulled(_this.value);
                        judgePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            setTimeout(()=>{
                _this.onfilfulled.push(function(){
                    try {
                        let x = onreject(_this.reason);
                        judgePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        }

    })
    return promise2
}
module.exports = Promise