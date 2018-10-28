// 原生 构造函数
// 以前认为类 必须大写
// 类也可以当作函数来调用 es6中类只能new
function Animal(type){
    this.type = type;
}
Animal.prototype.eat=function(){
        
}
// 可用通过constructor 判断是不是类的实例
console.log(Animal.prototype.constructor ==Animal)


// 继承私有属性
function cat(type){
    Animal.call(this,type)
}

// 获取父类 公有属性
function cat(type){

}
// Object.setPrototypeOf(Cat.prototype,Animal.prototype);
// Object.create(Animal.prototype,{constructor:{value:Cat}}) =Cat.prototype

