import * as types from '../action-type';
let initState={
    currentLesson : 0
}
export default function (state=initState,action) {
    switch (action.type) {
        case types.SET_CURRENT_LESSON:
            console.log(action)
            return {...state,currentLesson:action.val};
    }
    return state;
}