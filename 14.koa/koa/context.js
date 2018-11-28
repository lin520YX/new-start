let proto ={

}
function defineGetter(property,key){
    proto.__difineGetter__(key,function(){
        return this[property][key]
    })
}
function difineSetter(property,key){
    proto.__difineSetter__(key,function(value){
         this[property][key] = value
    })
}
defineGetter('request','path');
defineGetter('request','url');
defineGetter('response','body')
defineSetter('response','body')
module.exports = proto;