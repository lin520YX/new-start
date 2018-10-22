//   函数接收函数

function after(num,cb){
    return function (){
        if(--num === 0){
            cb()
        }
    }
}
let fn = after(3,function(){
    console.log('fn 3ci')
})
fn();
fn();
fn();

function read(cb){
    setTimeout(()=>{
        let r ='li'
        cb(r)
    },3000)
}
read(function(r){
    console.log(r)
})