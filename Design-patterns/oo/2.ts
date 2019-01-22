class Animal {
    public name;
    protected age;
    private weight;
    constructor(name,age,weight) {
        this.name=name;
        this.age=age;
        this.weight=weight;
    }
}
class Person extends Animal {
    private money;
    constructor(name,age,weight,money) {
        super(name,age,weight);
        this.money=money;
    }
    getName() {
        console.log(this.name);
    }
    getAge() {
        console.log(this.age);
    }
    getWeight() {
        console.log(this.weight);
    }
}
let p=new Person('zfpx',9,100,100);
console.log(p.name);
console.log(p.age);
console.log(p.weight);