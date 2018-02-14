<template>
  <div ref="wrapper">
      <div>
          <div v-for="(item ,index) in newsList" :key="index">
                    <div class="newsItem" v-if="item.pic.length == 1">
                        <div class="content-left" @click="articleInfo(item.id)">
                            <div class="content-left-top">
                                {{item.title}}
                            </div>
                            <div class="content-left-bottom">
                            <div>
                                    <span class="tip">
                                        {{item.tip}}
                                    </span>
                                    <span class="feedback">
                                        {{item.feed}}评
                                    </span>
                            </div>
                                <span class="zan feedback iconfont icon-zantong">
                                    {{item.zan}}
                                </span>
                            </div>
                        </div>
                        <div class="content-right">
                            <img :src="item.pic[0]" class="right-img" style="width:100%; height:100%;" alt="">
                        </div>
                    </div>
                    <div class="newsItem-one" v-if="item.pic.length == 3" >
                        <div class="newsItem-one-top" @click="articleInfo(item.id)">
                            {{item.title}}
                        </div>
                        <div class="newsItem-one-center">
                            <img v-for="(img ,i) in item.pic" :src="img" v-if="i < 3" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        </div>
                        <div class="newsItem-one-bottom">
                            <div class="content-left-bottom" style="margin-top: .02rem; width:100%;">
                            <div>
                                    <span class="tip">
                                        {{item.tip}}
                                    </span>
                                    <span class="feedback">
                                        {{item.feed}}评
                                    </span>
                            </div>
                                <span class="zan feedback iconfont icon-zantong">
                                    {{item.zan}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import BScroll from 'better-scroll';
export default {
    data(){
        return{
            swipeList:{
                data:[],
            },
            topStatus:false,
            bottomStatus :false,
            bottomDistance:60,
            topDistance:60,
            wrapperHeight:0,
            startUp:false,
            newsList:[{
                title:'苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰',
                pic:['/static/img/banner3.jpg','/static/img/banner2.jpg','/static/img/banner1.jpg'],
                zan:"444",
                feed:'22',
                tip:"新闻",
                id:"1"
            },{
                title:'苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰1',
                pic:['/static/img/banner3.jpg'],
                zan:"444",
                feed:'22',
                tip:"资讯",
                id:"2"
            }]
        }
    },
    methods:{
        initSCroll(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    scrollX: false,
                    scrollY: true,
                    momentum: true,
                    snapSpeed: 400,
                    click: true,
                    probeType:3,
                    eventPassthrough:'horizontal',
                     pullDownRefresh: {
                    threshold: 100,
                    stop: 40
                    },
                })
            })
        },
        articleInfo(id) {
            this.$router.next({
                path:"/articleInfo",
                query: {id:id} 
            })
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
            this.startUp = true;
        },
        loadTop() {
            Indicator.open({
                // text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                this.newsList = [];
                for(var i = 0; i < 3; i++) {
                    this.newsList.push({
                        title:'苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰'+i,
                        pic:['/static/img/banner3.jpg'],
                        zan:"444",
                        feed:parseInt(Math.random()*100),
                        tip:"资讯",
                         id:i
                    })
                }
                Indicator.close();
                this.$refs.loadmore.onTopLoaded();
            },2000)
        },
        loadMore() {
            this.loadData();
        },
        loadBottom() {
             Indicator.open({
                // text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                this.startUp = false;
                for(var i = 0; i < 3; i++) {
                    this.newsList.push({
                        title:'苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰'+i,
                        pic:['/static/img/banner3.jpg','/static/img/banner2.jpg','/static/img/banner1.jpg'],
                        zan:"444",
                        feed:parseInt(Math.random()*100),
                        tip:"资讯",
                        id:parseInt(Math.random()*10)
                    })
                }
                 Indicator.close();
                this.$refs.loadmore.onBottomLoaded();
            },2000)
        },

    },
    created () {
        
    },
    watch: {
        
    },
    mounted () {
        this.initSCroll();
        
    },
    components: {
        
    },
    computed: {
        
    }
}
</script>

<style>
@import '../find/news.css'
</style>
