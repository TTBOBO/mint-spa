import * as types from '../constants/type'
export const globelMutation = {
    [types.SHOWPOP](state,action) {
        state.pop.showPop = true;
        state.pop.text = action.text;
    },
    [types.HIDEPOP](state,action) {
        state.pop.showPop = false;
        state.pop.text = "";
    },
    [types.NOACTIVE](state,action){
        let noActive = [];
        let clickItem = [];
        state.newsList.forEach((item, index) => {
            clickItem.push(item.title);
            
        })
        state.allNewsList.forEach((item1,index1)=> {
            if(clickItem.indexOf(item1) == -1){
                noActive.push({
                    title:item1,
                    newList:[],
                    isNoMore:false,
                    objList:state.objList
                })
            }
        })
        state.noNewsList = noActive;
    },
    [types.ADDITEM](state,action) {
        state.newsList.push(action);
        let Arr = [];
        state.noNewsList.forEach((item, index) => {
            if(item.title != action.title){
                Arr.push(item);
            }
        })
        state.noNewsList = Arr;
    },
    [types.DELITEM](state,action) {
        // console.log(action);
        
        state.newsList.forEach((item,index) => {
            if(item.title == action.title){
                state.newsList.splice(index,1);
                state.noNewsList.unshift(item);
            }
            return item.title != action.title;
        })
        // console.log(state.newsList);

    },
    [types.TARGETLIST](state,action) {
        // console.log(action);
        
        state.newsList = action;
        // console.log(state.newsList);

    },

    [types.ALLOBJLIST](state,action) {
        let obj = state.objList;
        state.newsList.forEach((item,index) => {
            if(item.newList.length == 0){
                item.objList = JSON.parse(JSON.stringify(obj));
            }
        });
    },
    [types.CHANGEPAGELIST](state,action){
        state.newsList.forEach((item,index) => {
            if(index == action.index){
                item.objList = action.objList;
            }  
        });
    },

    [types.SETPOS](state,action){
        // state.newsList[action.index].postion = action.pos;
        console.log(action);
    }
}