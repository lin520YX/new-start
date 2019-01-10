import * as types from '../action-type';
export default {
    setCurrentCategory(currentCategory) {
        return {type:types.SET_CURRENT_CATEGORY,currentCategory};
    }
}