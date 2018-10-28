let obj={name:'linyunfu',arr:[1,2,3]};
// Object.defineProperty 不支持数组

// 可以检测到数组的变化
let p=new Proxy(obj,{
    get(target,key,proxy){ //第三个属性代理对象一般不用
        // return target[key];
        return Reflect.get(target,key)
    },
    set(target,key,value){

        return Reflect.set(target,key,value)
    }
})
// 数组
let arr=[1,2,3];
let p=new Proxy(arr,{
    get(target,key,proxy){ //第三个属性代理对象一般不用
        // return target[key];
        return Reflect.get(target,key)
    },
    set(target,key,value){
            if(key===length){
                return true;
            }
        return Reflect.set(target,key,value)
    }
})