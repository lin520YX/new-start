class Animal{
    constructor(name){
        this.name = name
    }
    eat(){
        console.log('c')
    }
}
class Dog extends Animal{
    constructor(){
        super();
    }
    tian(){
        console.log('t')
    }
}
new Dog().eat()