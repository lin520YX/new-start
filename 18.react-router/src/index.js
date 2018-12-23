import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from './react-router-dom'
import Home from './views/Home';
import Profile from './views/Profile';
import User from './views/User';
class App extends React.Component {
    render() {
        return <HashRouter>
            <Route path="/" exact = {true} component={Home}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/user" component={User}></Route>
        </HashRouter>
    }
}
ReactDOM.render(<App />, window.root)