<template>
<div >
<div>
<header-bar :left = "left" :text = "title" :right = "right" @rightClick = "morePop"></header-bar>
<div>
<div ref = "wrapper" style = "overflow:hidden;">
<ul class = "article-page" ref = "sliderGroup" style = "list-style:none; padding:0 !important;,margin:0 !important;">
<li>
<div class = "article-main">
<div class = "article-header">
<div class = "article-title">{{articleInfo['hm_archives.name']}}</div>
<div class = "article-header-bottom">
<span>{{articleInfo['hm_archives.pubdate'] | getNowTime}}</span> <span>{{tip[articleInfo['hm_archives.tip']] || "新闻"}}</span>
</div>
</div>

<div class = "article-content" v-html = "articleInfo['hm_archives.description']"></div>

<div class = "article-bottom">
<div class = "hot-feed">
<div class = "hot-header">热门评论</div>
<div v-if = "zanList.length > 0">
<allFeed :seeAll = "seeAll" @HandleseeAll = "HandleseeAll" :zanList = "zanList" @changeZan = "changeZan"></allFeed>
</div>
<div v-else style = "font-size:.12rem;">
暂无评论
</div>
</div>
<!--精彩推荐 -->
<div class = "marvellous">
<div class = "hot-header">精彩推荐</div>
<div class = "newsCon">
<articleCom :newsList = "newsList"></articleCom>
</div>
</div>
</div>
</div>
</li>
<!--class = "article-main"111 -->
<li class = "" style = "margin-top:.4rem;">
<div class = "article-main">
<div class = "article-title">{{articleInfo['hm_archives.name']}}</div>
<div class = "article-header-bottom">
<span>{{articleInfo['hm_archives.pubdate'] | getNowTime}}</span> <span>{{tip[articleInfo['hm_archives.tip']] || "新闻"}}</span>
</div>
</div>
<loadMore
:pageObj = "objList"
@changePage = "changePage"
:bottomMethod = "bottomMethod"
ref = "loadMore"
>
<allFeed :seeAll = "seeAll1" :zanList = "zanList1" @changeZan = "changeZan"></allFeed>
</loadMore>

</li>
</ul>
</div>
<div >



</div>
<!--END -->
</div>

<div class = "articleFoot">
<div class = "feed-box" @click = "showFeed">
评论一下
</div>
<div class = "feed-info-box" @click = "zanArticle">
<span class = " iconfont" :class = "{'icon-xihuanfill':isZan(articleInfo['hm_archives.goodpost']),zanColor:isZan(articleInfo['hm_archives.goodpost']),'icon-xihuan':!isZan(articleInfo['hm_archives.goodpost'])}"> </span>
<span>{{articleInfo['hm_archives.goodpost'] ? articleInfo['hm_archives.goodpost'].split(',').length : "0"}}</span>
</div>
<div class = "feed-info-box" @click = "HandleseeAll" v-if = "curentIndex == 0">
<span class = " iconfont icon-commentfill feed-commentfill"> </span>
<span>{{data.records}}</span>
</div>
<div class = "feed-info-box" @click = "HandleseeAll" v-if = "curentIndex == 1">
<span>正文</span>
</div>
</div>
<mt-popup v-model = "popupVisible4" position = "bottom" class = "mint-popup-4">
<div class = "feed-top"><span class = "feed-btn" :class = "{'click-btn':canFeed}" @click = "feed">发表</span></div>
<mt-field placeholder = "输入评论" :attr = "{maxlength:120}" type = "textarea" rows = "4" v-model = "introduction"></mt-field>
<span class = "max-num">{{curNum}}<span></span>/120字</span>
</mt-popup>
<mt-popup v-model = "more" position = "bottom" class = "mint-popup-4">
<div>
<div ref = "morewrapper">
<ul class = "moreList" ref = "moreChild">
<li v-for = "(item, index) in moreList" :key = "index" >
<div class = "imgbox">
<img :src = "item.icon" style = "width: 80%;height: 80%;object-fit: cover;margin: 10%;"/>
</div>
<p>{{item.title}}</p>
</li>
</ul>
</div>
<div class = "">
<ul class = "moreList">
<li v-for = "(item, index) in moreList1" :key = "index" @click="collectionArticle">
<div class = "imgbox">
<span class = "iconfont " :class = "{'yellow':isCollection(articleInfo['hm_archives.collection']),'icon-biaoxing':!isCollection(articleInfo['hm_archives.collection']),'icon-biaoxingfill':isCollection(articleInfo['hm_archives.collection'])}"></span>
</div>
<p>{{item.title}}</p>
</li>
</ul>
</div>
</div>
</mt-popup>
</div>
</div>
</template>

<script>
import headerBar from "../components/base/headerbar/headerbar";
import BScroll from "better-scroll";
import allFeed from "../components/find/feed";
import { Field } from "mint-ui";
import util from "../assets/js/util";
import ykp from "../assets/js/ykp";
import articleCom from "../components/find/articleCom";
import loadMore from "../components/base/loadmore/loadmore";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      left: {
        status: true,
        icon: "back"
      },
      right: {
        status: true,
        icon: "iconfont icon-gengduo"
      },
      id: "",
      articleInfo: {},
      newsList: [], //精彩推荐
      data: [],
      zanList1: [], //全部评论
      zanList: [], //热门评论
      seeAll: false, //查看全部
      seeAll1: true, //查看全部
      title: "", //顶部标题
      introduction: "",
      popupVisible4: false,
      more: false, //更多
      curNum: 120, //当前评论数字总数
      maxNum: 120, //评论最大字数
      canFeed: false,
      objList: {
        page: 1,
        limit: 3,
        filter: "",
        order: ""
      },
      curentIndex: 0, //当前页
      bottomMethod: true,
      // topMethod:true,
      tip: { 1: "新闻", 2: "热点", 3: "资讯", 4: "广告", 5: "专题" },
      moreList: [
        { icon: "static/img/wx.png", title: "微信好友" },
        { icon: "static/img/QQKJ.png", title: "QQ空间" },
        { icon: "static/img/QQ.png", title: "QQ好友" },
        { icon: "static/img/pyq.png", title: "朋友圈" },
        { icon: "static/img/WB.png", title: "微博" }
      ],
      moreList1: [{ icon: "static/img/banner2.jpg", title: "收藏" }],
      yellow: false
    };
  },
  components: {
    headerBar,
    allFeed,
    articleCom,
    loadMore
  },
  filters: {
    getNowTime(time, status) {
      return util.time.getNowTime(time, true);
    }
  },
  methods: {
    morePop() {
      this.more = !this.more;
      // 更多的scroll
      setTimeout(() => {
        this.children = this.$refs.moreChild.children;
        let width = 0;
        // 计算一个的宽度
        let wrapperWidth = this.$refs.morewrapper.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          width += this.children[i].clientWidth;
        }
        this.$refs.moreChild.style.width = width + "px";
        this.scroll2 = new BScroll(this.$refs.morewrapper, {
          scrollX: true,
          scrollY: false,
          click: true,
          eventPassthrough: "vertical",
          probeType: 3,
          bounce: true
        });
      }, 20);
    },
    changePage(objList) {
      this.initPage(objList);
    },
    /**
     *  //评论文章
     */
    feed() {
      if (this.introduction != "") {
        this.$ajaxPost("/hmapi/article/api_article_feedback/article_feed", {
          aid: this.id,
          content: this.introduction,
          mid: JSON.parse(ykp.getLocalStorage("userInfo")).mid
        }).then(res => {
          this.$store.dispatch("getPop", { text: "评论成功" });
          this.popupVisible4 = false;
          this.introduction = "";
          this.initPage("", true);
          this.initFeedBack({ order: "hm_feedback.dtime desc", page: 1 });
        });
      }
    },
    /** @augments zanList
     * @returns true false
     */
    isZan(zanList) {
      if (!zanList) {
        return false;
      }
      if(ykp.getLocalStorage("userInfo")){
       
         return (zanList.split(",").indexOf(JSON.parse(ykp.getLocalStorage("userInfo")).mid) != -1);
      }
     
    },
  
    /** @augments collection  
     * @returns true false 
     */
    isCollection(collection) {
      if (!collection) {
        return false;
      }
      if(ykp.getLocalStorage("userInfo")){
          return ( collection.split(",").indexOf(JSON.parse(ykp.getLocalStorage("userInfo")).mid) != -1);
      }
    },
    /**
     * 评论点赞操作
     */
    changeZan() {
      this.initPage("", true);
      this.initFeedBack({ order: "hm_feedback.dtime desc", page: 1 });
    },
    /**
     * 文章点赞
     */
    zanArticle(item, index) {
      let id = this.articleInfo["hm_archives.id"];
      if (!ykp.getLocalStorage("userInfo")) {
        this.$router.push("/login");
        this.$store.dispatch("getPop", { text: "请登录！" });
      } else {
        this.$ajaxPost("/hmapi/article/api_article/article_click", {
          mid: JSON.parse(ykp.getLocalStorage("userInfo")).mid,
          id: id
        }).then(res => {
          this.$store.dispatch("getPop", {
            text: res.data.status == 2 ? "点赞成功" : "取消成功"
          });
          this.articleInfo["hm_archives.goodpost"] = res.data.click;
        });
      }
    },
    /**
     * 文章收藏
     */
    collectionArticle(item, index) {
      let id = this.articleInfo["hm_archives.id"];
      if (!ykp.getLocalStorage("userInfo")) {
        this.$router.push("/login");
        this.$store.dispatch("getPop", { text: "请登录！" });
      } else {
        this.$ajaxPost("/hmapi/article/api_article/article_collection", {
          mid: JSON.parse(ykp.getLocalStorage("userInfo")).mid,
          id: id
        }).then(res => {
          this.$store.dispatch("getPop", {
            text: res.data.status == 2 ? "收藏成功" : "取消收藏"
          });
          this.articleInfo["hm_archives.collection"] = res.data.collection;
          this.isCollection(this.articleInfo["hm_archives.collection"]);
        });
      }
    },
    /* * 查看全部评论 */
    HandleseeAll() {
      let clientWidth = this.$refs.wrapper.clientWidth;
      let pageX = this.scroll.x == 0 ? 0 - clientWidth : 0;
      this.scroll.scrollTo(pageX, 0, 200);
      setTimeout(() => {
        this.title = this.scroll.x == 0 ? "" : "评论";
        this.curentIndex = this.scroll.x == 0 ? 0 : 1;
      }, 200);
    },
    showFeed() {
      this.popupVisible4 = !this.popupVisible4;
    },
    loadScroll() {
      this.$nextTick(() => {
        // 获取到多少子元素
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        // 计算一个的宽度
        let wrapperWidth = this.$refs.wrapper.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          child.style.width = wrapperWidth + "px";
          width += wrapperWidth;
        }
        this.$refs.sliderGroup.style.width = width + "px";

        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: true,
          click: true,
          eventPassthrough: "vertical",
          probeType: 3,
          bounce: false,
          snap: {
            threshold: 0.3,
            speed: 400
          },
          snapThreshold: 0.5 //滑动0.5到下一页
        });

        this.scroll.on("scrollEnd", pos => {
          // this.seeAll = scroll.currentPage.pageX == 1 ? true : false;
          this.title = this.scroll.currentPage.pageX == 1 ? "评论" : "";
          this.curentIndex = this.scroll.currentPage.pageX;
        });
      });
    },
    /** 初始化 文章详情 */
    initPageInfo() {
      this.id = this.$route.query.id;
      this.$ajaxPost("/hmapi/article/api_article/info", {
        filter: "hm_archives.id=" + this.id
      }).then(res => {
        this.articleInfo = res.data;
        this.$nextTick(() => {
          let img = document.querySelectorAll('.article-content img');
          img.forEach(element => {
            element.style.width = "100%";
          });
        })
      });
    },
    /** 初始化 文章热门评论 */
    initFeedBack() {
      this.id = this.$route.query.id;
      this.$ajaxPost("/hmapi/article/api_article_feedback/grid", {
        filter: "hm_feedback.aid=" + this.id,
        order: "hm_feedback.good desc"
      }).then(res => {
        this.zanList = res.data.rows || [];
      });
    },
    /** 初始化 所有评论 */
    initPage(objList, status) {
      this.$ajaxPost(
        "/hmapi/article/api_article_feedback/grid",
        objList ? objList : this.objList
      ).then(res => {
        this.data = res.data;
        if (this.zanList1.length == 0 || status) {
          this.zanList1 = res.data.rows || [];
          this.$refs.loadMore.destroy(true);
        } else {
          if (res.data.rows.length == 0) {
            this.bottomMethod = false;
            this.$store.dispatch("getPop", { text: "全部加载完了" });
            this.$refs.loadMore.destroy(true);
            //没有更多
            return;
          } else {
            this.zanList1.push(...res.data.rows);
            this.$refs.loadMore.destroy(true);
          }
        }
      });
    },
    /* * @augments page 页数   不传  默认1  传就是当前页 */
    referee(page) {
      this.objList.page = page ? page : 1;
      this.$ajaxPost("/hmapi/article/api_article/grid", this.objList).then(
        res => {
          this.newsList = res.data.rows;
        }
      );
    },
    /** 执行浏览操作 */
    browse(){
       setTimeout(() =>{
        let id = this.articleInfo["hm_archives.id"];
       
        if (ykp.getLocalStorage("userInfo")) {
          var userInfo = JSON.parse(ykp.getLocalStorage("userInfo"));
          this.$ajaxPost("/hmapi/article/api_article/article_browse", {
            mid: JSON.parse(ykp.getLocalStorage("userInfo")).mid,
            id: id
          }).then(res => {
            
          });
        }
      },8000);
    }
  },
   computed: {
    ...mapState([
      "globel"
    ])
  },
  mounted() {
    this.browse();
    console.log(this.globel);
  },
  created() {
    this.loadScroll();
    this.initPageInfo();
    this.initFeedBack();
    this.initPage();
    this.referee();
  },
  watch: {
    introduction(cur) {
      if (cur.length > 0) {
        this.canFeed = true;
      } else {
        this.canFeed = false;
      }
      this.curNum = 120 - cur.length;
    }
  }
};
</script>

<style lang="" scoped>
@import "../assets/css/news.css";
.article-page li {
  float: left;
}
</style>