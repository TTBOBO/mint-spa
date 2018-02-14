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
      ///components/index/index
      path: '/',
      name: 'index',
      component: resolve => { require(['@/components/news/newView'], resolve) }, hiddent: true, title: '首页' 
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
    {
      path:'/scroll2',
      name:'scroll2',
       component: resolve => { require(['@/components/base/loadmore/loadDemo'], resolve) }, hiddent: true, title: 'scroll2'
    },
    {
      path:'/collection',
      name:'collection',
       component: resolve => { require(['@/components/user/collection'], resolve) }, hiddent: true, title: 'collection',meta:{loginStatus:true}
    },
    {
      path:'/favative',
      name:'favative',
       component: resolve => { require(['@/components/user/favative'], resolve) }, hiddent: true, title: 'favative',meta:{loginStatus:true}
    }, {
      path:'/browse',
      name:'browse',
       component: resolve => { require(['@/components/user/browse'], resolve) }, hiddent: true, title: 'browse',meta:{loginStatus:true}
    }, {
      path:'/newsType',
      name:'newsType',
       component: resolve => { require(['@/view/newsType'], resolve) }, hiddent: true, title: 'newsType'
    }, {
      path:'/addArticle',
      name:'addArticle',
       component: resolve => { require(['@/view/addArticle'], resolve) }, hiddent: true, title: 'addArticle',meta:{loginStatus:true}
    }, {
      path:'/release',
      name:'release',
       component: resolve => { require(['@/components/user/release'], resolve) }, hiddent: true, title: 'release',meta:{loginStatus:true}
    }, {
      path:'/setting',
      name:'setting',
      component: resolve => { require(['@/components/user/setting'], resolve) }, hiddent: true, title: 'setting',meta:{loginStatus:true}
    }

    // {
    //   path:'/goods',
    //   name:'goods',
    //   redirect: '/goods/goodsDetail',
    //    component: resolve => { require(['@/components/index/goods/goods'], resolve) }, hiddent: true, 
    //   children:[]
    // },
  ]
})
