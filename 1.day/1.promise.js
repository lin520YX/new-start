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
	// 执行一个构造器，调用就执行
	// 初始状态为pending
	let _this = this;
	_this.status='pending';
	_this.value=undefined;
	_this.reason = undefined;
	_this.resolveArr=[];
	_this.rejected=[];
	function resolve(val){
		if(_this.status == 'pending'){
			_this.value=val;
			_this.status ='resolved';
			_this.resolveArr.forEach(fn=>fn())
		}
	}
	function reject(reason){
		if(_this.status == 'pending'){
			_this.reason=reason;
			_this.status ='rejected'
			_this.rejected.forEach(fn=>fn())
		}
	}
	console.log(executor)
	executor(resolve,reject)
}
function judgePromise(promise,x,resolve,resolve ){
	if(x== promise){
		throw new Error('循环');
	}
	if(x!=null&&(typeof x =='function'||typeof x =='object')){
        let then =x.then;
        let call
		try{
            if(typeof then == 'function'){// 是promise
                then.call(x,function (y) {
                    if(!called){ // 不让用户既调用成功又调用失败
                        called = true
                      }else{
                        return
                      }
                  resolve(y);
                },function (r) {
                    if(!called){ // 不让用户既调用成功又调用失败
                        called = true
                      }else{
                        return
                      }
                  reject(r);
                })
            } else { // {then:123}
            if(!called){ // 不让用户既调用成功又调用失败
                called = true
              }else{
                return
              }
              resolve(x);
            }
		}catch(e){
            if(!called){ // 不让用户既调用成功又调用失败
                called = true
              }else{
                return
              }
			reject(e)
		}
	}else{
		resolve(x)
	}
}
Promise.all=function(promises){
    return new Promise(()=>{
        let currentIndex =0;
        let arr =[];
        function process(index,value){
            arr[index]=value;
            currentIndex++;
            if(currentIndex>=promises.length){
                resolve(arr);
            }
        }
        for(let i=0;i<promises.length;i++){
            promises[i].then(function(data){
                process(i,data)
            },reject)
        }
    })
  
}
Promise.prototype.then = function(onfulfilled,onrejected) {
	let _this = this;
	onfulfilled= typeof onfulfilled =='function'?onfulfilled:val=>val;
	onrejected=typeof onrejected=='function'?onrejected:err=>{
		throw new Error(err)
	}
	let promise2 =new Promise((resolve,reject)=>{
		if(_this.status == 'resolved'){
			try{
				let x=onfulfilled(_this.value)
				judgePromise(promise2,x,resolve,reject)
			}catch(e){
				reject(e)
			}
		}
		if(_this.status == 'rejected'){

			try{
				let x=onrejected(_this.reason)
				judgePromise(promise2,x,resolve,reject)
			}catch(e){
				reject(e)
			}
		}
		if(_this.status == 'pending'){
			_this.resolveArr.push(function(){

				try{
					let x=onfulfilled(_this.value)
					judgePromise(promise2,x,resolve,reject)
				}catch(e){
					reject(e)
				}
			})

			_this.rejected.push(function(){
				try{
					let x=onrejected(_this.reason)
					judgePromise(promise2,x,resolve,reject)
				}catch(e){
					reject(e)
				}
			})
		}
	})
	return promise2
}
module.exports = Promise