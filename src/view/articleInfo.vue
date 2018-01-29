<template>
  <div ref="wrapper">
    <div  >
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
             <allFeed :seeAll="seeAll"></allFeed>
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

      <div class="articleFoot">
        <div class="feed-box" @click="showFeed">
            评论一下
        </div>
        <div class="feed-info-box" @click="HandleseeAll">
          <span class=" iconfont icon-commentfill feed-commentfill"> </span>
          <span>12</span>
        </div>
      </div>
      <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
        <div class="feed-top"><span class="feed-btn" :class="{'click-btn':canFeed}" @click="feed">发表</span></div>
        <mt-field  placeholder="输入评论"  :attr="{maxlength:120}" type="textarea" rows="4" v-model="introduction"></mt-field>
        <span class="max-num">{{curNum}}<span></span>/120字</span>
      </mt-popup>
      
    </div>
  </div>
</template>

<script>
import headerBar from "../components/base/headerbar/headerbar";
import BScroll from "better-scroll";
import allFeed from '../components/find/feed';
import { Field } from 'mint-ui';
export default {
  data() {
    return {
      left: {
        status: true,
        icon: "back"
      },
      newsList: [
        {
          title:
            "苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰",
          pic: [
            "/static/img/banner3.jpg",
            "/static/img/banner2.jpg",
            "/static/img/banner1.jpg"
          ],
          zan: "444",
          feed: "22",
          tip: "新闻",
          id: "1"
        },
        {
          title:
            "苹果鞥更新心痛允许用户选择大烧烤了你打了款你发 那看  你看了卡啊发顺丰1",
          pic: ["/static/img/banner3.jpg"],
          zan: "444",
          feed: "22",
          tip: "资讯",
          id: "2"
        }
      ],
      zanList:[{
        username:"123",
        time:"2017-12-13",
        pic:"/static/img/banner3.jpg",
        content:"根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
        count:"123",
        znapeople:"1,2,3,45,77"
      },{
        username:"456123",
        time:"2017-12-13",
        pic:"/static/img/banner1.jpg",
        content:"111根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
        count:"123",
        znapeople:"3,2,3,45,77"
      },{
        username:"456123",
        time:"2017-12-13",
        pic:"/static/img/banner1.jpg",
        content:"111根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
        count:"123",
        znapeople:"2,3,45,77"
      }],
      seeAll:false,
      introduction:"",
      popupVisible4:false,
      curNum:120,
      maxNum:120,
      canFeed:false
    };
  },
  components: {
    headerBar,
    allFeed
  },
  computed: {
    // isZan(zanList) {
    //  console.log(zanList);
    // }
  },
  methods: {
    feed() {
      if(this.introduction != ""){
        this.$store.dispatch('getPop',{text:"发布成功"});
        this.popupVisible4 = false;
        this.introduction = "";
      }
    },
    isZan(zanList) {
      return zanList.split(',').indexOf("1") != -1;
    },
    /**
     * 点赞
     */
    clickZan(item,index){
      let Index = this.zanList[index].znapeople.split(',').indexOf("1");
      let arr = this.zanList[index].znapeople.split(',');
      if(Index == -1) {
        arr.push("1");
        this.zanList[index].znapeople = arr.join(',');
         this.$store.dispatch('getPop',{text:"点赞成功"});
      }else {
      arr.splice(Index,1,"");
         this.zanList[index].znapeople = arr.join(',');
          this.$store.dispatch('getPop',{text:"取消成功"});
      }
      
    },
    HandleseeAll() {
      this.$router.next({
        path: "/allFeed",
        query: { id: 1 }
      });
    },
    showFeed() {
      this.popupVisible4 = !this.popupVisible4;
    },
    loadScroll() {
    //   this.$nextTick(() => {
    //     var scroll = new BScroll(this.$refs.wrapper, {
    //       scrollX: false,
    //       scrollY: true,
    //       click: true,
    //     //   eventPassthrough: "horizontal",
    //     //   probeType: 1
    //     });
    //   });
    }
  },
  mounted() {},
  created() {
    this.loadScroll();
  },
  watch: {
    introduction(cur) {
      if(cur.length > 0){
        this.canFeed = true;
      }else{
        this.canFeed = false;
      }
      this.curNum = 120 - (cur.length);
      // if(this.curNum == 0){
      //   this.$store.dispatch('getPop',{text:"最多只能输入120个字"});
      // }
    }
  }
};
</script>

<style lang="" scoped>
@import "../assets/css/news.css";
</style>