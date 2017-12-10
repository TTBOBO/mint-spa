<template>
  <div>
       <header-bar :text="title"  ></header-bar>
        <div class="content">
        </div>
        <template>
            <div class="header-top">
                 <img class="headpic" src="/static/img/banner3.jpg" />
                 <span v-if="loginStatus"><router-link to="find">用户名</router-link></span>
                 <span v-else><router-link to="login">注册/登录</router-link></span>
                 <img class="bgImg"/>
            </div>
        </template>
        <div class="toolbox">
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>未发货</p></div>
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>已发货</p></div>
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>已收货</p></div>
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>评论</p></div>
        </div>
        <swipe :data="swipeList"></swipe>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar'
import cell from '../base/cell/cell'
import swipe from '../base/cell/swipe'
export default {
    data() {
        return {
            title:"我的",
            swipeList:{
                data:[{
                    title:'我的订单',
                    link:'/',
                    icon:'iconfont icon-dingdan'
                },{
                    title:'我的收藏',
                    link:'/find',
                    icon:'iconfont icon-biaoxing',
                },{
                    title:'我的评论',
                    link:'/find',
                    icon:'iconfont icon-comment'
                },{
                    title:'我的设置',
                    link:'/find',
                    icon:'iconfont icon-shezhi',
                }],
            
            },
            loginStatus:false
        }
    },
    components: {
        headerBar,
        cell,
        swipe
    },
    created() {
        this.rightBtn = [{
          content: '取消',  
          style: { background: 'lightgray', color: '#fff' }  
        }, {  
          content: '删除',  
          style: { background: 'red', color: '#fff' },  
          handler: () => this.$messagebox('delete')  
        }  
      ];  
    },
    methods:{
        leftButtonHandler(evt) {  
            console.log(123);  
        }  
    }
}
</script>
<style scoped>
/* @import '/static/css/base.css'; */
.content {
    margin-top: 38px
}
.header-top{
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 14px;
    position: relative;
}
.header-top a{
    text-decoration: none;
    color: #fff;
}
.bgImg{
    position: absolute;
    width:100%;
    height:100%;
    /* filter: blur(2px); */
    z-index: -2;
    background: url('/static/img/headerbg.jpg');
}
.headpic{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0px 2px 2px #403636;
    margin-bottom: 10px
}
.toolbox{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content:space-around;
    align-content: center;
    align-items: center;
    flex-flow: row;
    font-size: 14px;
    position: relative;
}
.iconCon{
    width: 50px;
    height: 50px;
    font-size: 12px;
}
.iconCon span{
    display: inline-block;
    margin-top: 10px;
}
.iconCon p{
    height: 18px;
    margin: 0px auto;
    font-size: 12px;
}
</style>


