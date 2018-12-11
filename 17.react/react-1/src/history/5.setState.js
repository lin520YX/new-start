import React, { Component } from 'react';
import ReactDom, { render } from 'react-dom';
// React.Component 是父类 提供了 setState
class Counter extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        count: this.props.count
    }
    handleClick = () => {
        this.setState({
            count: ++this.state.count
        })
        // this.setState((prev)=>({count:parseInt(prev.count)+1}));
    }
    render() {
        return <h1>{this.state.count}<button onClick={this.handleClick}>+</button></h1>
    }
}
render(<Counter count='1' />, window.root)

// 生命周期
// jsx 中的事件