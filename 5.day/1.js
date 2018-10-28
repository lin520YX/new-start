// class A{
//     a = 1;
//     constructor(type){
//         this.type=type
//     }
// }
// let p = new A


// // 装饰器
// function coffee(){
//     coffee();
//     console.log('jt')
// }
// function sweetCoffee(coffee){

// }
// sweetCoffee(coffee)

// @表示类 可以修饰 类 和类中的方法



@flag
class Person{
    a = 1;
    constructor(type){
        this.type=type
    }
}
let p = new Person()
function flag(){

}