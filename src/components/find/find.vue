<template>
  <div >
       <header-bar  :text="title" >
        </header-bar>
         <!-- v-infinite-scroll="loadMore"    @bottom-status-change="handleBottomChange"-->  
        <div class="container" >
            <mt-loadmore 
                id="loadmore"
                style="font-size:12px;"
                ref="loadmore"
                :top-method="loadTop" 
                :bottom-method="loadBottom"
                :top-status.sync="topStatus"
                topPullText="下拉刷新"
                :bottomDistance="bottomDistance"
                :topDistance="topDistance"
               
				@bottom-status-change="handleBottomChange"
            >
            <div class="newsCon">
                <div v-for="(item ,index) in newsList" :key="index">
                    <div class="newsItem" v-if="item.pic.length == 1" @click="articleInfo(item.id)">
                        <div class="content-left">
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
                    <div class="newsItem-one" v-if="item.pic.length == 3" @click="articleInfo(item.id)">
                        <div class="newsItem-one-top">
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
            <!-- <div slot="bottom" class="mint-loadmore-bottom" style="height:100px; line-height: 27px;"  v-show="startUp">
                <div style="width:28px;margin:auto;">
                     <mt-spinner type="fading-circle" style="margin:auto;" :size="12" ></mt-spinner>
                </div>
                <span v-show="bottomStatus  === 'loading'">Loading...</span>

            </div> -->
            </mt-loadmore>
        </div>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar'
import cell from '../base/cell/cell'
import swipe from '../base/cell/swipe'
import BScroll from "better-scroll";
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            title:"发现",
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
    components: {
        headerBar,
        swipe
    },
    methods:{
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
    mounted() {
        // this.$store.dispatch('getPop',{text:"111"});
    },
    created() {
    }
}
</script>
<style scoped>
@import '../find/news.css';
.rotate {
    transform: rotate(180deg);
    transition: .3s linear;
}
.wrapper {
  position: relative;
  width: 100%;
  min-height: 1px;
  overflow: hidden;
  padding: 0px;
}
.mint-loadmore-text{
    font-size: 12px !important;
}
.wrapper .content {
  padding: 0px;
  margin: 0px !important;
}
.wrapper .content li {
  list-style: none;
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
img {
  display: block;
  width: 100%;
}
.dots {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 12px;
  text-align: center;
  font-size: 0;
}
.dot {
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}
.active {
  background: #333;
  width: 13px;
  border-radius: 4px;
}
.container {
    position: absolute;
    left: 0px;
    top: 40px;
    bottom: 55px;
    right:0px;
}
</style>

