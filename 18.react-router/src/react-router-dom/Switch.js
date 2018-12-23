import React from 'react';
import {Consumer} from './Context'
import pathToRegExp  from 'path-to-regexp'

export default class Switch extends React.Component{
    render(){
        return <Consumer>
            {
                value=>{
                    let {location:{pathname}} = value;
                    let children = this.props.children;
                    for(let i=0;i<children.length;i++){
                        let child = children[i];
                        let {path='/',exact=false,component:Component}= child.props;
                        let keys  = [];
                        let reg = pathToRegExp(path,keys,{end:exact})
                        if(reg.test(pathname)){
                            return <Component {...value}></Component>
                        }
                    }
                    return null
                }
            }
        </Consumer>
    }
}


