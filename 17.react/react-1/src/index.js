// // 倒入的react名字 必须大写
// // jsx语法  javascript+html  混合
// import React from 'react';
// // let React = {
// //     creatElement(type,props,...children){
// //         return {
// //             type,props,children
// //         }
// //     }
// // }
// // import {render} from 'react-dom';
// let h1 = <h1 id='hello'>hello world</h1>
// console.log(h1)
// // React.creatElement('h1',{id:'hello'},['hello world'])   // react 语法糖
// let render=(vnode,container)=>{
//     if(typeof vnode === 'string'){
//         return container.appendChild(document.createTextNode(vnode))
//     }
//     let {type,props,children} = vnode;
//     console.log(vnode)
//     let ele = document.createElement(type);
//     for(let key in props){
//         ele.setAttribute(key,props[key]);
//     }
//     [props.children].forEach(child => {
//         render(child,ele)
//     });
//     container.appendChild(ele);
// }
// render(h1,window.root);

import './history/2.jsx'
import './history/component'



