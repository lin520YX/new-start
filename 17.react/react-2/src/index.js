import React from 'react';
import ReactDOM from 'react-dom';


// ReactDOM.render(<div />, window.root);

// redux 状态管理
// 组件没有直接修改状态的权利 
function createStore(reducer) {
    // 不能直接更改
    let state ;
    let getState = () => JSON.parse(JSON.stringify(state));
    let dispatch = (action) => {
        state = reducer(state, action)
    }
    dispatch({type:'@INIT'})
    return {
        getState,
        dispatch
    }
}
let initState = {
    title: { content: '你好', color: 'red' },
    content: { content: '哈哈', color: 'green' }
}

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_TITLE_COLOR':
            return { ...state, title: { ...state.title, color: action.color } }
    }
    return initState
}
let store = createStore(reducer)
setTimeout(()=>{
    store.dispatch({ type: 'CHANGE_TITLE_COLOR', color: 'pink' })
    renderApp()
},2000)
function renderTitle() {
    let title = document.getElementById('title');
    title.innerHTML = store.getState().title.content
    title.style.background = store.getState().title.color
}
function renderContent() {
    let content = document.getElementById('content');
    content.innerHTML = store.getState().content.content
    content.style.background = store.getState().content.color
}
function renderApp() {
    renderTitle()
    renderContent()
}
renderApp()
