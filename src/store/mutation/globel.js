import * as types from '../constants/type'
export const globelMutation = {
    [types.SHOWPOP](state,action) {
        state.pop.showPop = true;
        state.pop.text = action.text;
    },
    [types.HIDEPOP](state,action) {
        state.pop.showPop = false;
        state.pop.text = "";
    }
}