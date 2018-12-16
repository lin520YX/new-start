import counter from './counter'
import todo from './todo'
// import { combineReducers } from 'redux'
//  合并 状态
// 需要把每个reducer‘ 都执行 放到一个新的对象上
function combineReducers(reducers) {
    return (state = {}, action) => {
        let obj = {}
        for (let key in reducers) {
            obj[key] = reducers[key](state[key], action)
        }
        return obj
    }
}
export default combineReducers({
    counter,
    todo
})
