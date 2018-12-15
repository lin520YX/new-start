import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
function reducer(state={number:0},action){
    switch(action.type){
        case 'ADD':
        return {number:state.number+action.v}
    }
    return state;
}
let store = createStore(reducer);
class Counter extends React.Component{
    state ={
        number :store.getState().number
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({number:store.getState().number})
        })
    }
    render(){
        return <div>
                {this.state.number}
                <button onClick={()=>{
                    store.dispatch({type:'ADD',v:1})
                }}>+</button>
        </div>
    }
}
ReactDOM.render(<Counter/>,window.root);
