// 生成器

// 解决异步的方案

// dva+react+redux-saga

// generator 可以配合promise 使用

//  生成器 是用来生成迭代器

// 什么是迭代器

// let likeArray={0:1,1:2,2:3,length:3};
// let arr = [...likeArray];
// console.log(arr) //likeArray is not iterable


// 迭代器 就是一个有next 方法的对象 每次调用next 都会返回一个对象 对象里面有done value ， for of 必须有迭代器的元素才能使用
// let likeArray={0:1,1:2,2:3,length:3,[Symbol.iterator](){
//     let flag = false;
//     let index =0;
//     let that =this;
//     return {
//         next(){
//             return {done:index===that.length,value:that[index++]}
//         }
//     }
// }}
// let arr = [...likeArray];
// console.log(arr) 


// * 表示是一个生成器函数 一般 可以配合yield 
let likeArray={0:1,1:2,2:3,length:3,[Symbol.iterator]:function*(){
    let index =0
    while(index<this.length){
        yield this[index++];
    }
}}
let arr = [...likeArray];
console.log(arr) 


function * gen(){
    yield 1;
}

let it = gen();
let flag =false;
do{
    let {done,value} = it.next();
    flag =done
    console.log(value)
}while(!flag)


let fs = require('fs');
let blueBird= require('bluebird');
let read = blueBird.promisify(fs.readFile); //把这个方法 变成异步
function * r(){
    let name = yield read('name.txt','utf8') //resolve(value);
    return name;
}
let it = r();
let {value,done}=it.next()
value.then(data=>{
    console.log(data)
})

// co

function co(it){
    return new Promise((resolve,reject)=>{
        function next(data){
          let {value,done}=it.next(data);
          if(!done){
            value.then((data)=>{
                next(data);
            },reject)
            
          }else{
              resolve(data)
          }
          
        }
        next()
    })
}