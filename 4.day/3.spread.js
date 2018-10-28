let obj ={name:'lin',age:9};
let school ={...obj};
obj.name='yuan'
// 浅拷贝


// 深度拷贝
let obj = {name:{k:'k'},a:1};
let newObj = {...obj,name:{...obj.name}}
console.log(obj)
obj.a=2
console.log(newObj)
// 1 
let obj = {name:{k:'k'},a:1,reg:null};
let newObj =JSON.parse(JSON.stringify(obj))


// 如何实现一个深度拷贝

function deepClone(obj){
    if(obj=== null)return null;
    if(typeof obj!=='object')return obj; //函数拷贝不需要
    if(obj instanceof RegExp)return new RegExp(obj);
    if(obj instanceof Date)return new Date(obj)
    let newObj = new obj.constructor;
    for(let key in obj){
        newObj[key]=deepClone(obj[key])
    }
    return newObj
}

// Object.assign(obj,obj1)


// 数组展开 拼接数组
// [1,2].concat([3,4,5])

let arr1 = [1,2];
let arr2 = [3,4];
console.log([...arr1,...arr2])

console.log(Math.max(...arr1))
// Math.max.apply(Math,arr1)


function sum(...arg){
    return eval(arg.join('+'))
}
sum([1,2,3]);