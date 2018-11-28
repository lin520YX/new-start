let proto ={

}
function defineGetter(property,key){
    proto.__defineGetter__(key,function(){
        return this[property][key]
    })
}
function difineSetter(property,key){
    proto.__defineSetter__(key,function(value){
         this[property][key] = value
    })
}
defineGetter('request','path');
defineGetter('request','url');
defineGetter('response','body');
difineSetter('response','body');
module.exports = proto;