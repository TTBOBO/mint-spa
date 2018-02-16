<head>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
</head>
<template>
  <div id="app">
     <transition :name="transitionName">
          <router-view  class="view-con child-view" :style="{bottom:shwoBar ? 55+'px' : 0+'px'}"></router-view>
     </transition>
        <tab-bar v-show="shwoBar"></tab-bar>
        <pop></pop>
  </div>
  
</template>

<script>
import tabBar from "@/components/base/tabbar/tabbar";
import pop from '@/components/pop/pop';
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import ykp from './assets/js/ykp';
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left",
      shwoBar: false,
      fadein: "",
      top:40,
      bottom:55
    };
  },
  computed: {
    ...mapState([
      'globel'
    ])
  },
  methods: {},
  created() {
  },
  watch: {
    $route(to, from, next) {
      this.transitionName = this.$router.isBack ? "slide-right" : "slide-left";
      this.$router.isBack = false;

      /**防止每次刷新页面时  登录信息有误 */
      let userInfo = ykp.getLocalStorage('userInfo');
      
      
        //当路由不在首屏的几个页面是隐藏tabbar
        if (
          to.path != "/" &&
          to.path != "/find" &&
          to.path != "/cart" &&
          to.path != "/user"
        ) {
          this.shwoBar = false;
        } else {
          this.shwoBar = true;
        }
      
      this.globel.userInfo = userInfo ? JSON.parse(userInfo) : "";
      
    }
  },
  components: {
    tabBar,
    pop
  }
};
</script>

<style>
@import './assets/css/news.css';

html {font-size: 625%; /*100 ÷ 16 × 100% = 625%*/}
@media screen and (min-width:360px) and (max-width:374px) and (orientation:portrait) {
    html { font-size: 703%; }
}
@media screen and (min-width:375px) and (max-width:383px) and (orientation:portrait) {
    html { font-size: 732.4%; }
}
@media screen and (min-width:384px) and (max-width:399px) and (orientation:portrait) {
    html { font-size: 750%; }
}
@media screen and (min-width:400px) and (max-width:413px) and (orientation:portrait) {
    html { font-size: 781.25%; }
}
@media screen and (min-width:414px) and (max-width:431px) and (orientation:portrait){
    html { font-size: 808.6%; }
}
@media screen and (min-width:432px) and (max-width:479px) and (orientation:portrait){
    html { font-size: 843.75%; }
}
#app {
  font-family: 微软雅黑;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
   font-size: .16rem;
}
body {
  margin: 0;
  padding: 0;
}
.view-con{
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
}
.child-view {
  width: 100%;
  /* overflow: hidden; */
}
.child-view {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
</style>
