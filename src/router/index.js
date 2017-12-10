import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//首页
import index from '@/components/index/index'

//发现
import find from '@/components/find/find'

//购物车
import cart from '@/components/cart/cart'

//我的
import user from '@/components/user/user'

//登录
import login from '@/components/user/login/login'

//商品页面

import goods from '@/components/index/goods/goods'

import goodsDetail from '@/components/index/goods/goodsDetail'

import food from '@/components/index/goods1/goods'



//返回上一页
Router.prototype.back = function () {
  this.isBack = true
  this.go(-1)
}

//下一页
Router.prototype.next = function (...arg) {
  this.isBack = false
  this.push(...arg)
}
//跳转指定页面
Router.prototype.goto = function(rt, isBack = false){
  this.isBack = isBack
  this.push(rt)
}


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/goods',
      name:'goods',
      redirect: '/goods/goodsDetail',
      component:goods,
      children:[{
        path:'/goodsDetail',
        name:'goodsDetail',
        component:goodsDetail,
      },{
        path:'/food',
        name:'food',
        component:food,
        
      }]
    }
  ]
})
