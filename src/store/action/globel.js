import * as type from '../constants/type'
export const globelAction = {
    getPop({state,commit,dispatch},params) {
        commit(type.SHOWPOP,params);
        setTimeout(() => {
            commit(type.HIDEPOP)
        },1500);
    },
    delCartItem({state,commit,dispatch},params){
        var _this = params.vm;
        state.cart = state.cart.filter((item) => {
            return params.checkedList.indexOf(item.id) == -1;
        })
        dispatch('getPop',{
            text:"删除成功"
        });
    }
}