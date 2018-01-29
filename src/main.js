// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false




//引入mintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);

import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll);

import 'animate.css' 

import Vuex from 'vuex'

Vue.use(Vuex);
//引入store仓库
import store from './store/index'
//引入iconfont.css
import '../static/css/iconfont.css'
//引入vue2-animate.min.css
import 'vue2-animate/dist/vue2-animate.min.css';
/* eslint-disable no-new */
import { MessageBox } from 'mint-ui';
Vue.prototype.$MessageBox = MessageBox;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
