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
      component: resolve => { require(['@/components/index/index'], resolve) }, hiddent: true, title: '首页' 
    },
    {
      path: '/find',
      name: 'find',
      component: resolve => { require(['@/components/find/find'], resolve) }, hiddent: true, title: '发现' 
    },
    {
      path: '/cart',
      name: 'cart',
      component: resolve => { require(['@/components/cart/cart'], resolve) }, hiddent: true, title: '购物车' 
    },
    {
      path: '/user',
      name: 'user',
       component: resolve => { require(['@/components/user/user'], resolve) }, hiddent: true, title: '我的' 
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => { require(['@/components/user/login/login'], resolve) }, hiddent: true, title: '登录' 
    },
    {
      path:'/goodsDetail',
      name:'goodsDetail',
       component: resolve => { require(['@/components/index/goods/goodsDetail'], resolve) }, hiddent: true, title: '商品详情' 
    },{
      path:'/food',
      name:'food',
       component: resolve => { require(['@/components/index/goods1/goods'], resolve) }, hiddent: true, title: '商品' 
      
    },{
      path:'/scroll',
      name:'scroll',
       component: resolve => { require(['@/components/index/scroll'], resolve) }, hiddent: true, title: 'scroll' 
      
    },{
      path:'/scroll1',
      name:'scroll1',
       component: resolve => { require(['@/components/index/scroll1'], resolve) }, hiddent: true, title: 'scroll1' 
      
    },{
      path:'/articleInfo',
      name:'articleInfo',
       component: resolve => { require(['@/view/articleInfo'], resolve) }, hiddent: true, title: 'articleInfo'
    },{
      path:'/allFeed',
      name:'allFeed',
       component: resolve => { require(['@/view/allFeed'], resolve) }, hiddent: true, title: 'allFeed'
    },
    {
      path:'/news',
      name:'news',
       component: resolve => { require(['@/components/news/newView'], resolve) }, hiddent: true, title: 'news'
    },
    // {
    //   path:'/goods',
    //   name:'goods',
    //   redirect: '/goods/goodsDetail',
    //    component: resolve => { require(['@/components/index/goods/goods'], resolve) }, hiddent: true, 
    //   children:[]
    // },
  ]
})
