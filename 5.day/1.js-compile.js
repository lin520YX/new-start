"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var Person = flag(_class = function Person(type) {
  _classCallCheck(this, Person);

  _defineProperty(this, "a", 1);

  this.type = type;
}) || _class;

var p = new Person();

function flag() {}
