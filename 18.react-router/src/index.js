import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import Home from './views/Home'
import User from './views/User'
import Profile from './views/Profile'
import 'bootstrap/dist/css/bootstrap.css'
class App extends React.Component {
    render() {
        return <Router>
            <div>
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">xxx</a>
                        </div>
                        <ul className='navbar-nav nav'>
                            <li><Link to='/'>首页</Link></li>
                            <li><Link to='profile'>个人中心</Link></li>
                            <li><Link to='user'>用户</Link></li>
                        </ul>
                    </div>
                </div> 
                <div className="container">
                <Switch>
                    <Route path='/' exact={true} component={Home}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route path='/user'  component={User}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
                </div>
            </div>
        </Router>
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

