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
        throw new Error('循环')
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
    }
    if(self.status=='rejected'){
        onrejected(self.reason);
    }
    // executor 中存在异步操作 发布订阅
    if(self.status=== 'pending'){
        self.onfulfilledArr.push(()=>{
            onfulfilled(self.value)
        })
        self.onrejectedArr.push(()=>{
            onrejected(self.reason);
        })
    }
   })
   return promise2;
}
module.exports = MyPromise;