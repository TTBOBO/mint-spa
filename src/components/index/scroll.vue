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
                <div class="newsItem">
                    <div class="content-left">
                        <div class="content-left-top">
                            苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰
                        </div>
                        <div class="content-left-bottom">
                           <div>
                                <span class="tip">
                                    新闻
                                </span>
                                <span class="feedback">
                                    123评
                                </span>
                           </div>
                            <span class="zan feedback iconfont icon-zantong">
                                123
                            </span>
                        </div>
                    </div>
                    <div class="content-right">
                        <img src="/static/img/banner3.jpg" class="right-img" style="width:100%; height:100%;" alt="">
                    </div>
                </div>
                <div class="newsItem-one">
                    <div class="newsItem-one-top">
                        苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰
                    </div>
                    <div class="newsItem-one-center">
                        <img src="/static/img/banner3.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        <img src="/static/img/banner2.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        <img src="/static/img/banner1.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                    </div>
                    <div class="newsItem-one-bottom">
                        <div class="content-left-bottom" style="margin-top: .02rem; width:100%;">
                           <div>
                                <span class="tip">
                                    热点
                                </span>
                                <span class="feedback">
                                    123评
                                </span>
                           </div>
                            <span class="zan feedback iconfont icon-zantong">
                                123
                            </span>
                        </div>
                    </div>
                </div>
                <div class="newsItem-one">
                    <div class="newsItem-one-top">
                        苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰
                    </div>
                    <div class="newsItem-one-center">
                        <img src="/static/img/banner3.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        <img src="/static/img/banner2.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        <img src="/static/img/banner1.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                    </div>
                    <div class="newsItem-one-bottom">
                        <div class="content-left-bottom" style="margin-top: .02rem; width:100%;">
                           <div>
                                <span class="tip">
                                    热点
                                </span>
                                <span class="feedback">
                                    123评
                                </span>
                           </div>
                            <span class="zan feedback iconfont icon-zantong">
                                123
                            </span>
                        </div>
                    </div>
                </div>
                <div class="newsItem-one">
                    <div class="newsItem-one-top">
                        苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰
                    </div>
                    <div class="newsItem-one-center">
                        <img src="/static/img/banner3.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        <img src="/static/img/banner2.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                        <img src="/static/img/banner1.jpg" class="right-img" style="width:32%; height:100%;  border-radius: 2px;" alt="">
                    </div>
                    <div class="newsItem-one-bottom">
                        <div class="content-left-bottom" style="margin-top: .02rem; width:100%;">
                           <div>
                                <span class="tip">
                                    热点
                                </span>
                                <span class="feedback">
                                    123评
                                </span>
                           </div>
                            <span class="zan feedback iconfont icon-zantong">
                                123
                            </span>
                        </div>
                    </div>
                </div>
                <div class="newsItem">
                    <div class="content-left">
                        <div class="content-left-top">
                            苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰
                        </div>
                        <div class="content-left-bottom">
                           <div>
                                <span class="tip">
                                    资讯
                                </span>
                                <span class="feedback">
                                    123评
                                </span>
                           </div>
                            <span class="zan feedback iconfont icon-zantong">
                                123
                            </span>
                        </div>
                    </div>
                    <div class="content-right">
                        <img src="/static/img/banner3.jpg" class="right-img" style="width:100%; height:100%;" alt="">
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
export default {
    data() {
        return {
            title:"发现",
            swipeList:{
                data:[],
            },
            data: ['1','1','1','1'],
            topStatus:false,
            bottomStatus :false,
            bottomDistance:60,
            topDistance:60,
            wrapperHeight:0,
            startUp:false
        }
    },
    components: {
        headerBar,
        swipe
    },
    methods:{
        handleBottomChange(status) {
            this.bottomStatus = status;
            this.startUp = true;
        },
        loadTop() {
            setTimeout(() => {
                this.$refs.loadmore.onTopLoaded();
            },2000)
        },
        loadMore() {
            this.loadData();
        },
        loadBottom() {
            setTimeout(() => {
							this.startUp = false;
                this.$refs.loadmore.onBottomLoaded();
            },2000)
        },
        loadData() {
            this.data = ['1','1','1','1'].concat(this.data);
        }
    },
    mounted() {
         //this.wrapperHeight = document.documentElement.clientHeight - document.getElementById('loadmore').getBoundingClientRect().top;
    },
    created() {
         this.loadData();
    }
}
</script>
<style scoped>
/* @import '../find/news.css'; */
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

