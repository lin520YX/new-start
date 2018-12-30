import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import actions from '../store/action/counter'
class Counter extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <button onClick={()=>this.props.add(3)}>+</button>
                {this.props.number}
                <button onClick={()=>this.props.minus(3)}>-</button>
            </div>
        )
    }
}
export default connect((state) => ({ ...state }),actions)(Counter)