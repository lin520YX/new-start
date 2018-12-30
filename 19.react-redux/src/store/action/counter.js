import *as Types from '../action-types'
export default {

    add(value) {
        return { type: Types.INCREMENT, v: value }
    },

    minus(value) {
        return { type: Types.DECREMENT, v: value }
    }
}