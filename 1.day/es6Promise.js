

const resolvePromise=(promise2, x, resolve, reject) => {
    if (promise2 === x) {
        throw new Error('循环');
    }
    let call;
    if (x != null && (typeof x === 'function' || typeof y === 'object')) {
        let then = x.then;
        // situation then 可能是个非函数
        try {
            if (typeof then === 'function') {
                then.call(x, x => {
                    if (!call) {
                        called = true;
                    } else {
                        return;
                    }
                    resolvePromise(promise2, x, resolve, reject)
                }, r => {
                    if (!call) {
                        called = true;
                    } else {
                        return;
                    }
                    resolve(r)
                })
            } else {
                if (!call) {
                    called = true;
                } else {
                    return;
                }
                resolve(x)
            }
        } catch (error) {
            if (!call) {
                called = true;
            } else {
                return;
            }
            reject(error)
        }

    } else {
        resolve(x)
    }
}

class MyPromise {
    static resolve(x) {
        return new MyPromise((resolve) => {
            resolve(x);
        })
    }

    static reject(x) {
        return new MyPromise((resolve, reject) => {
            reject(x);
        })
    }

    constructor(executor) {
        this.status = 'pending'; //执行顺序 pending->
        this.value = 'undefined';
        this.reason = 'undefined';
        // situation asynchronous
        this.onfilfulledArr = [];
        this.onrejectedArr = [];
        const resolve = val => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = val;
                this.onfilfulledArr.forEach(fn => {
                    fn()
                });
            }
        }
        const reject = reason => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onrejectedArr.forEach(fn => {
                    fn()
                });
            }
        }
        executor(resolve, reject)// 声明实例 传入构造器 立刻执行
    }

    then(onfilfulled, onrejected) {
        // 处理onfilfulled 和onrejected 是一个空值或者非函数的情况
        onfilfulled = typeof onfilfulled === 'function' ? onfilfulled : val => val; // catch ->then(null,fn)；
        onrejected = typeof onrejected === 'function' ? onrejected : err => { throw new Error(err) };
        // 实现链式调用 这里应该返回一个promise
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === 'resolved') {
                setTimeout(() => {
                    try {
                        let x = onfilfulled(this.value);
                        console.log(x)
                       resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        console.log(error)
                        reject(error)
                    }
                }, 0)
            }
            if (this.status === 'rejected') {
                setTimeout(() => {

                    try {
                        let x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            // 异步
            if (this.status === 'pending') {
                this.onfilfulledArr.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfilfulled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(e)
                        }
                    }, 0)

                })
                this.onrejectedArr.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)

                })

            }
        });
        return promise2
    }

    catch(fn) {
        return this.then(null, fn)
    }

    all(promises) {
        return new MyPromise((resolve, reject) => {
            let arr = [];
            let currentIndex = 0;
            const process = (i, promise) => {
                arr[i] = promise;
                currentIndex++;
                if (currentIndex == promises.length) {
                    resolve(arr)
                }
            }
            for (let i = 0; i < promises.length; i++) {
                promises[i].then((val) => {
                    process(i, val)
                }, reject)
            }
        })
    }
    race(...args) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < args.length; i++) {
                args[i].then(resolve, reject)
            }
        })
    }

    finnaly(callback){
        
        return this.then((value) => {
          return Promise.resolve(callback()).then(() => {
            return value
          })
        }, (reason) => {
          return Promise.resolve(callback()).then(() => {
            throw reason
          })
        })
      }
}
let p = new MyPromise((resolve, reject) => {
    resolve(1)
}).then(x => { console.log(x) })
MyPromise.defered = MyPromise.defer = () => {
    let dfd = Object.create(null);
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = MyPromise;