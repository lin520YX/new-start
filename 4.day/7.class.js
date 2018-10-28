class Animal{
    constructor(type){
        this.type = type;
    }
    eat(){
        console.log(this.type,'lll')
    }
}
class Cat extends Animal{
    constructor(type){
        super(type)
    }
}
let cat = new Cat('xxx')
console.log(cat.eat())

function _classCallCheck(sub,constr){
    // 判断 实例 instanceOf
    if(!(sub instanceof constr)){
        throw new Error('Must new')
    }
}
function _createClass(constr,property,staticProperty){
    if(property.length>0){
        defineProperty(constr.property,property)
    }
    if(staticProperty.length>0){
        defineProperty(constr,staticProperty)
    }
}
function defineProperty(target,properties){
   for(let i =0;i<properties.length;i++){
    Object.defineProperty(target,properties[i].key,{
        enumerable:true,
        ...properties[i]
    })
   }

}
let Animal = function(){
    function Animal(){
        _classCallCheck(this,Animal);
    }
    _createClass(Animal,[{
        key:'drink',
        value:function(){
            console.log('喝水')
        }
    }],[{
        key:'kouke',
        value:function(){
            console.log('kouke')
        }
    }])
    return Animal;
}()
new Animal()