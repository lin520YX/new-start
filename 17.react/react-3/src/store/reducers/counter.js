//  一个项目 只有一个
import * as Types from '../action-types';
function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case Types.INCREMENT:
            return { number: state.number + action.count }
        break;
    }
    return state;
}
export default reducer