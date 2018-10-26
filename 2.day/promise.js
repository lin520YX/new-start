function MyPromise(executor){
    let self = this;
    self.value=undefined;
    self.reason =undefined;
    self.status= 'pending';
    self.onfulfilledArr = [];
    self.onrejectedArr =[];
    function resolve(val){
        if(self.status=== 'pending'){
            self.value=val;
            self.status= 'resolved'
            self.onfulfilledArr.forEach(element => {
                element()
            });
        }
    
    }
    function reject(reason){
        if(self.status=== 'pending'){
            self.value=reason;
            self.status= 'rejected';
            self.onrejected.forEach(element => {
                element()
            });
        }
    }
    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2==x){
        return reject(new TypeError('循环'));
    }
    if(x!=null&&(typeof x ==='function'||typeof x === 'objext')){
        try {
            let then = x.then;
            if(typeof then ==='function' ){
                then.call(x,y=>{
                    resolve(y);
                    resolvePromise(promise2,y,resolve,reject)
                },reject)
            }else{
                resolve(x);
            }
        } catch (error) {
            reject(e);
        }
    }else{
        resolve(x)
    }
    if(x!=null&&(typeof x ==='function'||typeof x ==='object')){
        
    }else{
        resolve(x)
    }
}
MyPromise.prototype.then=function(onfulfilled,onrejected){
   let promise2 = new MyPromise((resolve,reject)=>{
    let self= this;
    if(self.status=='resolved'){
        // 我们要限制的事情 就是把then 中成功或者失败后的函数执行的结果获取到
        // 看一看是不是promise 如果是就让promise 执行 取到最终的promise的结果返回成功和失败
        // 如果x是普通值就让promise返回成功
        let x = onfulfilled(self.value);
        resolvePromise(promise2,x,resolve,reject)
    }
    if(self.status=='rejected'){
        let x = onrejected(self.reason);
        resolvePromise(promise2,x,resolve,reject)
    }
    // executor 中存在异步操作 发布订阅
    if(self.status=== 'pending'){
        self.onfulfilledArr.push(()=>{
            let x =onfulfilled(self.value)
            resolvePromise(promise2,x,resolve,reject)
        })
        self.onrejectedArr.push(()=>{
            let x =onrejected(self.reason);
            resolvePromise(promise2,x,resolve,reject)
        })
    }
   })
   return promise2;
}
module.exports = MyPromise;