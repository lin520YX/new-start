import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Link, Switch } from './react-router-dom'
import Home from './views/Home';
import Profile from './views/Profile';
import User from './views/User';
import Logo from './views/Logo';
import 'bootstrap/dist/css/bootstrap.css'
class App extends React.Component {
    render() {
        return <HashRouter>
            <div>
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Logo></Logo>
                        </div>
                    </div>
                    <ul className="navbar-nav nav">
                        <li><Link to='/'>首页</Link></li>
                        <li><Link to='/profile'>个人中心</Link></li>
                        <li><Link to='/user'>用户</Link></li>
                    </ul>
                </div>
            

            <Switch>
                <Route path="/" exact={true} component={Home}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/user" component={User}></Route>
            </Switch>
            </div>
        </HashRouter>
    }
}
ReactDOM.render(<App/>, window.root)