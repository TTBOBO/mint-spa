<template>
  <div >
       <header-bar  :text="title" :right="right" @rightClick="add" ></header-bar>
        <div style="position: relative;" id="swiper">
            <!-- 轮播图 -->
            <swiper-bar></swiper-bar>
        </div>
        <div id="con" style=" position:relative;overflow:hidden;">
            <!-- 当前容器的高度  默认可不穿 -->
          <loadDemo
                    @loadMore="changePage"
                    :pageObj="pageObj"
                    :isNoMore="isNoMore"
                    :header="header"
                    :curHeight="curHeight"   
                    ref ="loadMore"
                   >
                   <userArticle @reloadPage="initPage" :newsList="newsList"></userArticle>
                   <!-- <articleCom @reloadPage="initPage" :newsList="newsList"></articleCom>  -->
        </loadDemo>
      </div>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar';
import BScroll from "better-scroll";
import { Indicator } from 'mint-ui';
import swiperBar from "../base/swiper/swiperbar";
import loadDemo from "../base/loadmore/loadDemo";
import articleCom from "./articleCom";
import ykp from "../../assets/js/ykp";
import userArticle from "./userArticle";
export default {
    data() {
        return {
            title:"发现",
            swipeList:{
                data:[],
            },
           right: {
                status: true,
                icon: "iconfont icon-jiahao1"
            },
            pageObj: {
                page: 1,
                limit: 3,
                filter: "",
                order: ""
            },
            isNoMore:false,
            newsList:[],
            header:false,
            curHeight:0
        }
    },
    components: {
        headerBar,
        swiperBar,
        loadDemo,
        articleCom,
        userArticle
    },
    methods:{
        //添加新的文章
        add(){
            this.$router.push('/addArticle');
        },
        changePage(objList){
           this.initPage(objList);
      },
      /**@augments page 页数   不传  默认1  传就是当前页 */
        initPage(page){
            this.pageObj.filter = "hm_archives.typeid=1";
            this.pageObj.order = "hm_archives.pubdate desc";
            this.pageObj.auth = 1;
            this.$ajaxPost("/hmapi/article/api_article/grid", this.pageObj).then(res =>{
                if(res.data.rows.length == 0) {
                    this.$store.dispatch("getPop", { text: "没有更多了" });
                     this.isNoMore = true;
                }else{
                     this.pageObj.page == 1 ? this.newsList = res.data.rows  :  this.newsList.push(...res.data.rows);
                }
                this.$refs.loadMore.forceUpdate(true);
                // setTimeout(() =>{
                //     this.$refs.loadMore.forceUpdate(true);
                // },300)
            })
        }
    },
    mounted() {
        this.initPage();
        
        setTimeout(() =>{
            //创建节点后  获取高度并且减去 加上  tabber高度
            this.curHeight = document.getElementById("swiper").clientHeight+55;
            console.log(this.curHeight);
            console.log(document.getElementById("swiper").clientHeight);
        },20);
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
    /* position: absolute; */
    left: 0px;
    top: 40px;
    bottom: 55px;
    right:0px;
}
</style>

