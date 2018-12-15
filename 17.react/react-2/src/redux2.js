function createStore(reducer) {
    let state;
    let getState = () => state
    let listens = []
    let dispatch = (action) => {
        state = reducer(state, action)
        listens.forEach(fn => fn())
    }
    dispatch({ type: '@INIT' })
    let subscribe = (fn) => {
        listens.push(fn)
        return () => {
            listens = listens.filter(l => fn !== l);
        }
    }
    return {
        dispatch,
        subscribe,
        getState
    }
}
let initState = {
    number: 0
}
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
        return { number: state.number + action.v };
        case DECREMENT:
        return { number: state.number - action.v };
    }
    return state;
}

let store = createStore(reducer);
let render=()=>{
    window.counter.innerHTML = store.getState().number
}
render()
store.subscribe(render)
window.add.addEventListener('click', () => {
    store.dispatch({type: INCREMENT, v: 1 });
    window.counter.innerHTML = store.getState().number
})
window.minus.addEventListener('click', () => {
    store.dispatch({type: DECREMENT, v: 1 });
    window.counter.innerHTML = store.getState().number
})