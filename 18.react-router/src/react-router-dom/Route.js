import React from 'react'
import {Consumer} from './Context'
import pathToRegExp  from 'path-to-regexp'
export default class Route extends React.Component{
    render(){
        return (
            <Consumer>
                {
                    (value)=>{
                        let {location:{pathname}} = value;
                        console.log(pathname)
                        let props = {...value}
                        let {path,component:Component,exact=false} = this.props
                        let keys  = [];
                        let reg = pathToRegExp(path,keys,{end:exact})
                        console.log(reg)
                        console.log(pathname)
                        if(reg.test(pathname)){
                            return <Component {...props}></Component>
                        }
                        return null
                    }
                }
            </Consumer>
        )
    }
}