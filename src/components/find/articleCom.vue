<template>
  <div>
      <div v-if="!custom">
          <div v-for="(item ,index) in newsList" :key="index">
                    <div class="newsItem" v-if="item['hm_archives.litpic'].split(',').length == 1" @click="articleInfo(item['hm_archives.id'])">
                        <div class="content-left" >
                            <div class="content-left-top">
                                {{item['hm_archives.name']}}
                            </div>
                            <div class="content-left-bottom">
                                <div>
                                        <span class="tip">
                                            {{tip[item['hm_archives.tip']] || "新闻"}}
                                        </span>
                                        <span class="feedback">
                                            {{item['feedCount']}}评
                                        </span>
                                        <span class=" zan feedback iconfont icon-xihuanfill"></span ><span style="margin-left: .02rem;font-size: .1rem;">{{item['hm_archives.goodpost'].length ? item['hm_archives.goodpost'].split(',').length : "0"}}</span>
                                </div>
                                <div class="zan">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="content-right">
                            <img v-lazy="item['hm_archives.litpic'].split(',')[0]"  class="right-img lazyimg" style="width:100%; height:100%;" alt="">
                        </div>
                    </div>
                    <div class="newsItem-one" v-if="item['hm_archives.litpic'].split(',').length == 3"  @click="articleInfo(item['hm_archives.id'])">
                        <div class="newsItem-one-top">
                             {{item['hm_archives.name']}}
                        </div>
                        <div class="newsItem-one-center">
                            <img v-for="(img ,i) in item['hm_archives.litpic'].split(',')" :data-src="img" v-lazy="img"  v-if="i < 3" class="right-img lazyimg" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        </div>
                        <div class="newsItem-one-bottom">
                            <div class="content-left-bottom" style="margin-top: .02rem;margin-bottom: .1rem; width:100%;">
                            <div>
                                    <span class="tip">
                                       {{tip[item['hm_archives.tip']] || "新闻"}}
                                    </span>
                                    <span class="feedback">
                                        {{item['feedCount']}}评
                                    </span>
                                    <span class=" zan feedback iconfont icon-xihuanfill"></span ><span style="margin-left: .02rem;font-size: .1rem;">{{item['hm_archives.goodpost'].length ? item['hm_archives.goodpost'].split(',').length : "0"}}</span>
                            </div>
                            <div class="zan">
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
      <div v-else>
          <div v-for="(item ,index) in newsList" :key="index">
                    <swipe :data="params" ref="swipe" @del="del" :index="index" v-if="item['hm_archives.litpic'].split(',').length == 1">
                       <div slot="" style="width:100%;height:100%;" :style="{width:width}">
                        <div class="newsItem"  @click="articleInfo(item['hm_archives.id'])">
                            <div class="content-left" >
                                <div class="content-left-top">
                                    {{item['hm_archives.name']}}
                                </div>
                                <div class="content-left-bottom">
                                    <div>
                                            <span class="tip">
                                                {{tip[item['hm_archives.tip']] || "新闻"}}
                                            </span>
                                            <span class=" zan feedback iconfont icon-xihuanfill"></span ><span style="margin-left: .02rem;font-size: .1rem;">{{item['hm_archives.goodpost'].length ? item['hm_archives.goodpost'].split(',').length : "0"}}</span>
                                    </div>
                                    <div class="zan">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="content-right">
                                <img v-lazy="item['hm_archives.litpic'].split(',')[0]"  class="right-img lazyimg" style="width:100%; height:100%;" alt="">
                            </div>
                        </div>
                         </div>
                    </swipe>
                     <swipe :data="params"  :index="index" @del="del" ref="swipe" v-if="item['hm_archives.litpic'].split(',').length == 3">
                       <div slot="" style="width:100%;height:100%;" :style="{width:width}">
                        <div class="newsItem-one"   @click="articleInfo(item['hm_archives.id'])">
                            <div class="newsItem-one-top">
                                {{item['hm_archives.name']}}
                            </div>
                            <div class="newsItem-one-center">
                                <img v-for="(img ,i) in item['hm_archives.litpic'].split(',')" v-lazy="img"  v-if="i < 3" class="right-img lazyimg" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                            </div>
                            <div class="newsItem-one-bottom">
                                <div class="content-left-bottom" style="margin-top: .02rem;margin-bottom: .1rem; width:100%;">
                                <div>
                                        <span class="tip">
                                        {{tip[item['hm_archives.tip']] || "新闻"}}
                                        </span>
                                        <span class=" zan feedback iconfont icon-xihuanfill"></span ><span style="margin-left: .02rem;font-size: .1rem;">{{item['hm_archives.goodpost'].length ? item['hm_archives.goodpost'].split(',').length : "0"}}</span>
                                </div>
                                <div class="zan">
                                        
                                </div>
                                </div>
                            </div>
                        </div>
                     </div>
                    </swipe>
                </div>
      </div>
  </div>
</template>
<script>
/**
 *  图片懒加载
 */
import { Lazyload } from 'mint-ui';
import Vue from 'vue';
Vue.use(Lazyload,{
    preLoad: 1.3,  
    error:'./static/img/banner3.jpg',
    loading:'./static/img/banner3.jpg',
});

import swipe from '../base/cell/swipe';
export default {
  data() {
    return {
      tip: { 1: "新闻", 2: "热点", 3: "资讯", 4: "广告", 5: "专题" },
     
       width:0,
       params:{
            type:"custom"
        },
        loading:"./static/img/banner3.jpg"
    };
  },
  props: {
    newsList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    custom: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    articleInfo(id) {
      this.$router.next({
        path: "/articleInfo",
        query: { id: id }
      });
    },
    // 删除操作
    del(params){
        let id = this.newsList[params.index]['member_stow.id'];
        this.$ajaxPost("/hmapi/article/api_collection/delete", {id:"member_stow.id="+id}).then( res => {
            this.$store.dispatch("getPop", {text: "删除成功"});
            this.$emit("reloadPage");
        });
    }
  },
  mounted () {
     this.$nextTick(() => {
        if(this.custom){
            this.width = (document.querySelector('body').clientWidth-30)/100+"rem";
        }
     })  
  },
  components: {
      swipe
  }
};
</script>
<style>
img{
    transition: .3s linear;
}

img[src="./static/img/banner3.jpg"]{  
    opacity: 0;  
} 
</style>


