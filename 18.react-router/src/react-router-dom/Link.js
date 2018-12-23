import React from 'react';
import {Consumer} from './Context'
export default class Link extends React.Component{
    render(){
        return (<Consumer>
                {(value)=>{
                    let {history:{push}}=value;
                    return <a onClick={()=>{
                        push(this.props.to)
                    }}>{this.props.children}</a>
                }
                }
             </Consumer>  
        )
    }
}


