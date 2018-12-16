function createStore(reducer) {
    // 不能直接更改
    let state;
    let listens = []
    let getState = () => state;
    let dispatch = (action) => {
        state = reducer(state, action)
        listens.forEach(fn => fn())
    }
    let subscribe = (fn) => {
        listens.push(fn)
        return () => {
            listens = listens.filter(l => fn !== l);
        }
    }
    dispatch({ type: '@INIT' })
    return {
        getState,
        dispatch,
        subscribe
    }
}
export {createStore}