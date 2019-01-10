import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers/Home';
import Mime from './containers/Mime';
import Profile from './containers/Profile';
import Layout from './containers/Layout/index';
import store from './store';
window._store = store;
import { Provider } from 'react-redux';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path='/mime' component={Mime} />
                    <Route path='/profile' component={Profile} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
    , document.querySelector('#root'));