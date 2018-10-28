// Object.defineProperty()
let obj ={}
let time = 3.15
Object.defineProperty(obj,'name',{
    enumerable:true,
    get(){
        return time
    },
    set(value){
        time = value
    }
})
// 希望用户获取一次name 就打印一个
obj.name=3.14
console.log(obj.name)

let obj ={
    temp:'',
    get PI(){
       return this.temp
    },
    set PI(val){
        this.temp=val
    }
}
obj.PI

function update(){
    console.log('gx')
}
function observer(obj){
    if(typeof obj!=='object'){
       return obj;
    }
    for(let key in obj){
        defineReactive(obj,key,obj[key]);
    }
}
// 对象中的所有属性都采用object.defineProperty 来定义
function defineReactive(obj,key,value){
    observer(value)
    Object.defineProperty(obj,key,{
        get(){
            return value
        },
        set(val){
           update()
           if(value!=val)value=val;
        }
    })
}
let obj={name:111}
observer(obj);
obj.name=100;
console.log(obj.name);


