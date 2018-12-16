import * as Types from '../action-types'
// action reducer 纯函数 输入一定 返回一定
export default {
    add(val) {
        return { type: Types.INCREMENT, count: val }
    }
}