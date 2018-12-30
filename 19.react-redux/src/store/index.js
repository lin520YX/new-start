import { createStore } from 'redux';
import reducer from './reducer/index';
// import reduxLogger from 'redux-logger';
let reduxLogger = (store) => (dispatch) => (action) => {
    console.log(store.getState())
    dispatch(action)
    console.log(store.getState())
}
let applyMiddleware = (middleWare) => (createStore) => (reducer) => {
    let store = createStore(reducer)
    let middle = middleWare(store)
    let dispatch = middle(store.dispatch)
    return {
        ...store,
        dispatch
    }
}
let store = applyMiddleware(reduxLogger)(createStore)(reducer)

export default store;
