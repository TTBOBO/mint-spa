<template>
  <div ref="wrapper">
    <div >
      <header-bar  :left="left"></header-bar>
      <div>
      <div class="article-main">
        <div class="article-header">
          <div class="article-title">dsadasdsadsadsadsadsadasdsadsadasdasdasda</div>
          <div class="article-header-bottom">
            <span>2018-01-27 16:59:53</span>  <span>新闻</span>
          </div>
        </div>

        <div class="article-content">
        根据中央气象台的预报，1月27日至2月3日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。
  新华社北京1月27日电 与北京市民苦盼下雪而不得相反，南报板等方式了解气象灾害和路况等信息，提高出行效率和安全。（完）
        </div>

        <div class="article-bottom">
          <div class="hot-feed">
            <div class="hot-header">热门评论</div>
            <div class="feed-list">

                <div class="feed-list-left">
                  <img src="/static/img/banner3.jpg" class="user-avtor" alt="">
                </div>

                <div class="feed-list-right">
                    <div class="list-right-top">
                      <div class="feed-info">
                        <span class="user-name">测试用户名</span>
                        <span class="feed-time">2017-18-18</span>
                      </div>
                      <div class="zan-con">
                        <span class="iconfont icon-zantong"></span>
                        <span class="zan-num">12</span>
                      </div>
                    </div>
                    <div class="list-right-bottom">
                        根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。
  新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，
                    </div>
                </div>

            </div>

            <div class="feed-list">
                <div class="feed-list-left">
                  <img src="/static/img/banner3.jpg" class="user-avtor" alt="">
                </div>
                <div class="feed-list-right">
                    <div class="list-right-top">
                      <div class="feed-info">
                        <span class="user-name">测试用户名</span>
                        <span class="feed-time">2017-18-18</span>
                      </div>
                      <div class="zan-con">
                        <span class="iconfont icon-zantong"></span>
                        <span class="zan-num">12</span>
                      </div>
                    </div>
                    <div class="list-right-bottom">
                        根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。
  新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，
                    </div>
                </div>
            </div>

          </div>
          <!-- 精彩推荐 -->
          <div class="marvellous">
              <div class="hot-header">精彩推荐</div>
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
          </div>
        
        
        </div>
      </div>
      </div>


    </div>
  </div>
</template>

<script>
import headerBar from '../components/base/headerbar/headerbar';
import BScroll from "better-scroll";
  export default {
    data() {
      return {
        left:{
          status:true,
          icon:"back"
        },
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
      headerBar
    },
    methods:{
      loadScroll(){
        	this.$nextTick(() => {
            var scroll = new BScroll(this.$refs.wrapper,{
              scrollX:false,
              scrollY:true,
              click:true,
              eventPassthrough:"horizontal",
              probeType:1,
            })
          })
      }
    },
    mounted () {
      
    },
    created () {
      this.loadScroll();
    }
  }
</script>

<style lang="" scoped>
@import "../assets/css/news.css";

</style>