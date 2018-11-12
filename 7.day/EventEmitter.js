function EventEmitter(){
    this._events =Object.create(null);
}
EventEmitter.prototype.on=function(eventName,callback){
    if(eventName!='newListener'){
        // fn 指代 callback 的名字
        return this._events['newListener'].forEach(fn=>{
            fn(eventName)
        })
    } 
    if(!this._events){
        this._events =Object.create(null);
    }
    if(this._events[eventName]){
        this._events[eventName].push(callback)
    }else{
        this._events[eventName]=[callback]
    }
}
EventEmitter.prototype.emit=function(eventName,...args){
    this._events[eventName].forEach(element => {
        element.call(this,...args);
    });
}
EventEmitter.prototype.off=function(eventName,callback){
    this._events[eventName]=this._events[eventName].filter((l=>l!=callback&&l.l!=callback));
}
EventEmitter.prototype.once=function(eventName,callback){
    function one(...params){
        callback(...params)
        this.off(eventName,one);
    }
    one.l= callback;
    this.on(eventName,one)
    
}


// 发布订阅
module.exports = EventEmitter;