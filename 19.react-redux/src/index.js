import React from 'react';
import ReactDom from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
ReactDom.render(
    <Provider store={store}>
         <Counter></Counter>
    </Provider>
    , window.root);