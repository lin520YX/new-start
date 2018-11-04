// 事件模块 发布订阅 发布 订阅
let EventEmitter = require('events');

// newListener 监听用户是否绑定了新的事件；
// 
let event = new EventEmitter();
let util = require('util');
function Girl(){

}
util.inherits(Girl,EventEmitter);
let girl = new Girl();
// 绑定一次方法时候 就会出发newListener 事件
girl.on('newListener',function(type){
    // process.nextTick(()=>{
    //     girl.emit('sl')
    // })
})
let cry = function cry(){console.log('cry')};
let eat = function cry(){console.log('eat')};
girl.on('sl',cry);
girl.on('sl',eat);
girl.emit('sl');//发布的方法





