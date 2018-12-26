import React from 'react'
import { Consumer } from './Context'
import pathToRegExp from 'path-to-regexp'
export default class Route extends React.Component {
    render() {
        return (
            <Consumer>
                {(value) => {
                    console.log(value)
                    let { location: { pathname } } = value;
                    // console.log(JSON.stringify(value))
                    let props = { ...value, match: null }
                    let { path = '/', component: Component, exact = false } = this.props
                    let keys = [];
                    let reg = pathToRegExp(path, keys, { end: exact })
                    if (reg.test(pathname)) {
                        let [, ...args] = pathname.match(reg)
                        keys.map(k => k.name)
                        let params = keys.reduce((memo, key, index) => (memo[key] = args[index],memo), {})
                        props.match = params;
                        return <Component {...props}></Component>
                    }
                    return null
                }}
            </Consumer>
        )
    }
}