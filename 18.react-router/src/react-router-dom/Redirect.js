import React,{Component} from 'react';
import {Consumer} from './Context'
export default class Redirect extends Component{
   render(){
     return (<Consumer>
        {(value)=>{
          let {history:{push}} = value;
          push(this.props.to);
          return null;
        }}
     </Consumer>)
 }
}