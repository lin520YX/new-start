// 表单 提交表单
// 可以获取dom元素 .value  非受控（没有和状态有关系）组件
// 和状态相关的 受控组件 双向数据绑定
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
class Control extends Component {
    password = React.createRef()
    constructor() {
        super()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.username.value)
        console.log(this.password.current.value)
    }
    render() {
        return (
            <div>
                {
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name='username' ref={(dom)=>this.username=dom}/>
                        <input type="text"  name='password' ref={this.password} />
                        <button type='submit'>提交</button>
                    </form>
                }
            </div>
        )
    }
}
ReactDOM.render(<Control />, window.root);