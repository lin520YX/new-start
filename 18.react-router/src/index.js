import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route ,Link,Switch} from './react-router-dom'
import Home from './views/Home';
import Profile from './views/Profile';
import User from './views/User';
class App extends React.Component {
    render() {
        return <HashRouter>
            <div>
                <Link to='/'>首页</Link>
                <Link to='/profile'>个人中心</Link>
                <Link to='/user'>用户</Link>
            </div>
            <Switch>
            <Route path="/" exact = {true} component={Home}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/user" component={User}></Route>
            </Switch>
        </HashRouter>
    }
}
ReactDOM.render(<App />, window.root)