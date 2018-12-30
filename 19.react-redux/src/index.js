import React from 'react';
import ReactDom from 'react-dom';
import store from './store/index';
import { Provider } from './react-redux';
import Counter from './components/Counter';
console.log(store)
// 多个中间件进行组合
ReactDom.render(
    <Provider store={store}>
        <Counter></Counter>
    </Provider>
    , window.root);