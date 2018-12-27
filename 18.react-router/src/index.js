import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Link, Switch, Redirect } from './react-router-dom'
import Home from './views/Home';
import Profile from './views/Profile';
import User from './views/User';
import Logo from './views/Logo';
import Private from './Private'
import MenuLink  from './MenuLink'
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
                   
                    <ul className="navbar-nav nav">
                        <MenuLink to='/' exact={true}>首页</MenuLink>
                        <MenuLink to='/profile'>个人中心</MenuLink>
                        <MenuLink to='/user'>用户</MenuLink>
                    </ul>
                    </div>
                </div>
            <Switch>
                <Route path="/" exact={true} component={Home}></Route>
                <Private path="/profile" component={Profile}></Private>
                <Route path="/user" component={User}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
            </div>
        </HashRouter>
    }
}
ReactDOM.render(<App/>, window.root)