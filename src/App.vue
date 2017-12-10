<head>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
</head>
<template>
  <div id="app">
     <transition :name="transitionName">
      <router-view class="child-view"></router-view>
     </transition>
      <!-- <transition  enter-active-class="animated bounceUp" leave-active-class="animated bounceInDown"> -->
        <tab-bar v-show="shwoBar"></tab-bar>
      <!-- </transition> -->
  </div>
  
</template>

<script>
import tabBar from '@/components/base/tabbar/tabbar'
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left",
      shwoBar:true,
      fadein:''
    };
  },
  methods: {},
  watch: {
    $route(to, from, next) {
      this.transitionName = this.$router.isBack ? "slide-right" : "slide-left";
      this.$router.isBack = false;

      //当路由不在首屏的几个页面是隐藏tabbar
      if(to.path != '/' && to.path != '/find' && to.path != '/cart' && to.path != '/user') {
        this.shwoBar = false;
      }else {
         this.shwoBar = true;
      }
    }
  },
  components: {
    tabBar
  },
};
</script>

<style>
#app {
  font-family: 微软雅黑;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
}
.child-view {
  width: 100%;
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
