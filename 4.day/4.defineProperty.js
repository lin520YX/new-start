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