import * as types from '../action-type';
export const setCurrentLesson = (val) => {
    return { type: types.SET_CURRENT_LESSON, val };
}
