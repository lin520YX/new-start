import React from 'react';
import { Provider } from './Context'
//  提供 history loaction match
export default class HashRouter extends React.Component {
    state = {
        location: {
            pathname: window.location.hash ? window.location.hash.slice(1) : '/'
        }
    }
    componentDidMount() {
        window.location.hash =window.location.hash ? window.location.hash.slice(1) : '/'
        window.addEventListener("hashchange", () => {
            console.log(1231)
            this.setState({
                ...this.state.location,
                pathname: window.location.hash ? window.location.hash.slice(1) : '/',
            })
            console.log(this.state)
        })
    }
    render() {
        
        let value = {
            ...this.state,
            history:{
                push(to){
                    window.location.hash = to
                }
            }
        }
        return (
            <Provider value={value}>
                <div>{this.props.children}</div>
            </Provider>

        )
    }
}