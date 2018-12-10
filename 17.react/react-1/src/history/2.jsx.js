import React from 'react';
import ReactDom from 'react-dom';

// jsx 是可以包含js的语法
// 1） 如果渲染两个相邻元素 要有父级标签
// 2）  行内样式的写法 jsx 为了识别html 还是js 用< { 来区分
// 3) {} 表示的是写js

let arr  = ['122','232','454']
let newArr = arr.map((item,key)=> <li key={key}>{item}</li>)
// let ele = (
//     <>
//     <h1 style={{background:'red'}}>aaa</h1>
//     <div className='color'>dasd</div>
//     </>
// )
// 列表循环 map 有返回值
ReactDom.render(newArr,window.root)