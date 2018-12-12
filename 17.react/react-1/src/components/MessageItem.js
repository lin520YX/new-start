import React from 'react';
import ReactDOM from 'react-dom'
import { Consumer } from './Context'

export default class MessageItem extends React.Component {
    constructor() {
        super()
    }
    handleClick = () => {
        this.props.fn(3)
    }
    render() {
        let { title } = this.props.list
        return (
            <Consumer>
                {
                    ({r}) => {
                        return <li className="list-group-item">
                            <h4>{title}</h4>
                            <button className='btn btn-primary' onClick={this.handleClick}>点赞</button>
                            <button className='btn btn-default' onClick={
                                ()=>r()
                            }>取消</button>

                        </li>
                    }
                }

            </Consumer>

        )
    }
}