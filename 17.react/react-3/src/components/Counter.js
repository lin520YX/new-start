import React from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions/counter'
// react-redux 提供了connent 和Provider
// import {bindActionCreators} from 'redux'

class Counter extends React.Component {
    
    handleClick = () => {
        this.props.add(3)
        // store.dispatch(actions.add(3))
    }
    render() {
        return (
            <>
                <p>{this.props.number}</p>
                <button onClick={this.handleClick}>点击增加</button>
            </>
        )

    }
}
// let bindActionCreators = (actions,dispatch) => {
//     let obj = {}
//     for(let key in actions){
//       obj[key] = (...args) => dispatch(actions[key](...args))
//     }
//     return obj;
//   }
// let mapDispatchToProps=(dispatch)=>{
//     return {
//         add:(n)=>dispatch(actions.add(n))
//     }
// }
// content 执行两次 返回一个组件
// connect 方法最后一个函数的参数是原来的一个组件，会把redux中的状态映射到这个组件上
export default connect((state)=>({...state.counter}),
// (dispatch)=>bindActionCreators(actions,dispatch)
actions
)(Counter)