import React from 'react'
import actions from '../store/actions/todo'
import { connect } from 'react-redux';
class Todo extends React.Component {
    input = React.createRef()
    handleClick=()=>{
        this.props.addTodo(this.input.current.value)
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.input} /> <button onClick={this.handleClick}>添加</button>
                <ul>
                    {
                        this.props.todos.map((item, key) => (
                            <li key={key}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
let mapStateToProps=(state)=>{
    return {
        todos:state.todo
    }
}
let mapDispatchToProps=(dispatch)=>{
    return {
        addTodo:(n)=>dispatch(actions.addTodo(n))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todo)