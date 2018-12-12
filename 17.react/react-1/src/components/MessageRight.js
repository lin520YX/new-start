import React from 'react'
import ReactDOM from 'react-dom'
import MessageItem from './MessageItem'
export default class MessageRight extends React.Component {
    render() {
        return (
            <ul className='list-group'>
              {
                  this.props.lists.map((list,index)=>(
                    <MessageItem key={index} list= {list} fn={this.props.fn}/>
                  ))
              }
            </ul>
        )
    }
}