import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './views/Home'
import User from './views/User'
import Profile from './views/Profile'
import Login from './views/Login'
import Protect from './Protect'
import MenuLink from './MenuLink'
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
                            <MenuLink to='/' exact={true}>首页</MenuLink>
                            <MenuLink to='profile'  exact={true}>个人中心</MenuLink>
                            <MenuLink to='user'  exact={true}>用户</MenuLink>
                            <MenuLink to='login'  exact={true}>dl</MenuLink>
                        </ul>
                    </div>
                </div> 
                <div className="container">
                <Switch>
                    <Route path='/' exact={true} component={Home}></Route>
                    <Protect  path='/profile' component={Profile}></Protect>
                    <Route path='/user'  component={User}></Route>

                    <Route path='/login'  component={Login}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
                </div>
            </div>
        </Router>
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

