import * as types from '../action-type';
let initState={
    currentCategory : 0
}
export default function (state=initState,action) {
    switch (action.type) {
        case types.SET_CURRENT_CATEGORY:
            return {...state,currentCategory:action.currentCategory};
    }
    return state;
}