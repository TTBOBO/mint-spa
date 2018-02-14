<template>
  <div>
       <header-bar :text="title"  ></header-bar>
        <div class="content">
        </div>
        <template>
            <div class="header-top">
                 <img class="headpic" v-if="globel.userInfo" :src="globel.userInfo.face" />
                <img class="headpic" v-if="!globel.userInfo" src="static/img/banner2.jpg" />
                 <span v-if="globel.userInfo"><router-link to="find">{{globel.userInfo.uname}}</router-link></span>
                 <span v-else><router-link to="login">注册/登录</router-link></span>
                 <img class="bgImg" src="static/img/headerbg.jpg"/>
            </div>
        </template>
        <!-- <div class="toolbox">
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>未发货</p></div>
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>已发货</p></div>
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>已收货</p></div>
            <div class="iconCon"><span class=" iconfont icon-dingdan"></span><p>评论</p></div>
        </div> -->
        <swipe :data="swipeList"></swipe>
        <swipe :data="swipeList1"></swipe>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar';
import cell from '../base/cell/cell';
import swipe from '../base/cell/swipe';
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';
export default {
    data() {
        return {
            title:"我的",
            swipeList:{
                data:[{
                    title:'发布的文章',
                    link:'/release',
                    icon:'iconfont icon-dingdan'
                },{
                    title:'收藏的文章',
                    link:'/collection',
                    icon:'iconfont icon-biaoxingfill',
                },{
                    title:'喜欢的文章',
                    link:'/favative',
                    icon:'iconfont icon-xihuanfill'
                },{
                    title:'浏览记录',
                    link:'/browse',
                    icon:'iconfont icon-salefill'
                }],
            
            },
            swipeList1:{
                data:[
                //     {
                //     title:'关于我们',
                //     link:'/browse',
                //     icon:'iconfont icon-tishifill'
                // },
                {
                    title:'我的设置',
                    link:'/setting',
                    icon:'iconfont icon-shezhi',
                }],
            
            },
            loginStatus:false
        }
    },
    computed: {
        ...mapState([
            "globel"
        ])
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


