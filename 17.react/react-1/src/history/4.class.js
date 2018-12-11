import React, { Component } from 'react';
import ReactDom , { render } from 'react-dom';
// React.Component 是父类 提供了 setState
class Clock extends Component {
    constructor(props) {
        super(props)
    
    }
    // es7
    state ={
        data :new Date().toLocaleString()
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    handleClick=()=>{
        ReactDom.unmountComponentAtNode(window.root)
    }
    componentDidMount(){
        // 这里可以获取dom元素 组件已经挂载完成
        this.timer = setInterval(()=>{
            this.setState({
                data:new Date().toLocaleString()
            })
        },1000)
    }
    render() {
        return <h1>12312{this.state.data} <button onClick={this.handleClick}>+</button></h1>
    }
}
render(<Clock/>,window.root)

// 生命周期
// jsx 中的事件