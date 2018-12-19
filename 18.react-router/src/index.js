import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import User from './views/User'
import Profile from './views/Profile'
class App extends React.Component {
    render() {
        return <HashRouter><Switch >

            <div>
                <Route path='/' exact={true} component={Home}></Route>
                <Route path='/profile' exact={true} component={Profile}></Route>
                <Route path='/user' exact={true} component={User}></Route>
            </div>

        </Switch ></HashRouter>
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

