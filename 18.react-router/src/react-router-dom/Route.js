import React from 'react'
import {Consumer} from './Context'
import pathToRegExp  from 'path-to-regexp'
export default class Route extends React.Component{
    render(){
        return (
            <Consumer>
                {(value)=>{
                        let {location:{pathname}} = value;
                        // console.log(JSON.stringify(value))
                        let props = {...value}
                        let {path,component:Component,exact=false} = this.props
                        let keys  = [];
                        let reg = pathToRegExp(path,keys,{end:exact})
                        if(reg.test(pathname)){
                            return <Component {...props}></Component>
                        }
                        return null
                }}
            </Consumer>
        )
    }
}