<template>
  <div>
       <header-bar :left="left" :text="title"  ></header-bar>
        <div class="content">
        </div>
        <swipe :data="swipeList"></swipe>
        <div class="loginOut" @click="loginOut">
            退出登录
        </div>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar';
import cell from '../base/cell/cell';
import swipe from '../base/cell/swipe';
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import ykp from '../../assets/js/ykp';
export default {
    data() {
        return {
            left: {
                status: true,
                icon: "back"
            },
            title:"设置",
            swipeList:{
                data:[{
                    title:'忘记密码',
                    // link:'/',
                    icon:'iconfont icon-dingdan'
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
        loginOut(){
             this.$store.dispatch("getPop", { text: "退出成功" });
            this.$router.push('/');
            ykp.setLocalStorage('userInfo',"");
        }
    }
}
</script>
<style scoped>
/* @import '/static/css/base.css'; */
.content {
    margin-top: 38px
}

.loginOut{
    width: 80%;
    padding: .2rem auto;
    background: rgb(202, 10, 10);
    color: #fff;
    margin: .2rem auto;
    text-align: center;
    line-height: .4rem;
    height: .4rem;
    border-radius: .05rem;
    font-size: .12rem;
}
</style>


