//   组件的特点和好吃 
//  react 忠 函数就是一个组件（组建名必须大写 ） 和jsx 元素 react 元素进行区分
// react 看到大写就知道是组件 小写就是jsx 元素
// 组件 函数 1） 没有this
// 类
import React from 'react';
import ReactDom from 'react-dom';
function Clock(props){
    console.log(props)
    return <h1>shijian </h1> 
}
// render 只更新变化的东西
ReactDom.render(<Clock data={new Date().toLocaleString()}/>,window.root)