<template>
  <div>
      <div>
        <div class="topWrapper" ref="topWrapper">
            <ul ref="ul">
                <li v-for="(item, index) in globel.newsList" @click="activeLi(index)" :key="index">{{item.title}}</li>
                <div class="bottom-line" :style="{left:left+'rem'}"></div>
            </ul>
        </div>
         <div class="additem" @click="addItem"><span class="iconfont icon-jiahao1"></span></div> 
      </div>
      
      <div class="bottomWrapper container" ref="bottomWrapper">
          <div ref="newCon" >
              <div class="newsList" :style="{height:bottomHeight}"  v-for="(item ,index) in globel.newsList" :key="index">
                   <loadDemo
                    @loadMore="changePage"
                    :pageObj="globel.newsList[currentPage].objList"
                    :isNoMore="globel.newsList[currentPage].isNoMore" 
                    ref ="loadMore"
                   >
                   <articleCom :newsList="item.newList"></articleCom>
                   </loadDemo>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import articleItem from "../find/articleItem";
import articleItem1 from "../find/articleItem1";
import articleCom from "../find/articleCom";
import loadMore from "../base/loadmore/loadmore";
import loadDemo from "../base/loadmore/loadDemo";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      left: 0.15,  //初始值
      topClick: false,
      bottomClick: false,
      currentPage: 0,
      clickStatus: true,
      newsList: [],
      objList: {
        page: 1,
        limit: 3,
        filter: "",
        order: ""
      },
      bottomMethod: true,
      topMethod:true,
      bottomHeight:0,
      pullUpLoad:false,
      isNoMore:false
    };
  },
  methods: {
    //添加新闻频道
    addItem(){
      this.$router.push('/newsType');
    },
    /**@augments
     * index  当前page
     * status   false  点击时  true   页面初始化时  
     */
    activeLi(index,status) {
      this.left = 0.15;
      this.left = this.left + index * 0.6;
      this.currentPage = index;
      let bottomWrapperWidth = this.$refs.bottomWrapper.clientWidth;
      this.topClick = true;
      this.scroll1.scrollTo(-(bottomWrapperWidth * parseInt(index)), 0, status ? 0 : 200);
      this.scroll1.currentPage.pageX = index;   //改变scrollTo  的同时 需改变scroll的pageX  否则 会出现异常
    },
    initTopScroll() {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.topWrapper, {
          scrollX: true,
          scrollY: false,
          momentum: true,
          snapSpeed: 400,
          click: true,
          eventPassthrough: "vertical"
        });
        this.scroll1 = new BScroll(this.$refs.bottomWrapper, {
          scrollX: true,
          scrollY: true,
          click: true,
          momentum: false,
          eventPassthrough: "vertical",
          probeType: 3,
          bounce: false,
          snap: {
            threshold: 0.3,
            speed: 400
          },
          snapThreshold: 0.5, //滑动0.5到下一页
          snapSpeed: 400
        });


        this.scroll1.on("touchEnd", pos => {
          this.topClick = false;
           
        });
        this.scroll1.on("scrollStart", pos => {
            this.clickStatus = false;
        })
        this.scroll1.on("scrollEnd", pos => {
           this.clickStatus = true;
          this.getActive(this.scroll1.currentPage.pageX);
        });
        //防止从详情页面返回时 没有返回到  之前的page
        this.activeLi(this.globel.currentPage,true);
        this.getActive(this.globel.currentPage);
      }, 20);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    initSwiper() {
      /**@description 头部 */
      this.children = this.$refs.ul.children;
      let width = 0;
      this.$refs.ul.style.width = this.globel.newsList.length * 0.6 + "rem";

      /**@description 底部 */
      let bottomWrapperWidth = this.$refs.bottomWrapper.clientWidth;
      let bottomWrapperHeight = this.$refs.bottomWrapper.clientHeight;
      this.bottomHeight = bottomWrapperHeight+"px";  //设置底部容器的高度
      this.childrenCon = this.$refs.newCon.children;
      let newItemW = 0;
      for (let i = 0; i < this.childrenCon.length; i++) {
        let child = this.childrenCon[i];
        child.style.width = bottomWrapperWidth + "px";
        newItemW += bottomWrapperWidth;
      }
      this.$refs.newCon.style.width = newItemW + "px";
      this.$refs.newCon.style.height = bottomWrapperHeight + "px";
    },
    getActive(index) {
      if (!this.topClick) {
        this.left = 0.15;
        this.left = this.left + index * 0.6;
      }
      this.currentPage = index;
      let bottomWrapperWidth = this.$refs.bottomWrapper.clientWidth;
      let maxScrollW = this.scroll.maxScrollX;
      if (this.left * 100 > bottomWrapperWidth / 2 &&-(this.left * 100 - bottomWrapperWidth / 2) > maxScrollW ) {
        this.scroll.scrollTo(-(this.left * 100 - bottomWrapperWidth / 2),0, 200);
      } else if (this.left * 100 < bottomWrapperWidth / 2) {
        this.scroll.scrollTo(0, 0, 200);
      }

      /**当列表长度为空时  加载当前页数据 */
      // setTimeout(() =>{
        if( this.globel.newsList[index].newList.length == 0){
          this.initPage(this.globel.newsList[this.currentPage].objList);
        }
      // },200)
    },
    changePage(objList) {
      this.initPage(objList);
    },
    initPage(page) {
      this.globel.newsList[this.currentPage].objList = page ? page : 1;
      //当下这行可忽略
      this.globel.newsList[this.currentPage].objList.filter = "hm_archives.typeid = "+ ( (this.currentPage % 7 ) + 2);
      this.$ajaxPost("/hmapi/article/api_article/grid", this.globel.newsList[this.currentPage].objList).then(
        res => {
          if(res.data.rows.length > 0 ){
            /**给当前页新闻列表添加加载数据 */
            this.isNoMore = false;
            this.globel.newsList[this.currentPage].isNoMore = false;
            this.globel.newsList[this.currentPage].objList.page == 1 ? (this.globel.newsList[this.currentPage].newList = res.data.rows)  : this.globel.newsList[this.currentPage].newList.push(...res.data.rows);
          }else{
            this.isNoMore = true;
            this.globel.newsList[this.currentPage].isNoMore = true;
            
          }

          setTimeout(() =>{
             this.$refs.loadMore[this.currentPage].forceUpdate(true);
          },300)
        }
      );
    },
    initAllPageObj(){  //初始化所有页面的分页
      this.$store.commit('ALLOBJLIST');
    },
    ...mapMutations([
      "ALLOBJLIST",
      "CHANGEPAGELIST"
    ])
  },
  components: {
    articleItem,
    articleItem1,
    articleCom,
    loadMore,
    loadDemo
  },
  computed: {
    ...mapState([
      "globel"
    ])
  },
  mounted() {
    this.initTopScroll();
    this.initPage(this.globel.newsList[this.currentPage].objList);
   
  },
  created() {
    this.initAllPageObj();
  },
  watch: {
    currentPage(cur,old) {
      this.globel.currentPage = cur;
      // alert(this.globel.currentPage)
    }
  }
};
</script>
<style>
/* @import "../../assets/css/news.css"; */
.newsList {
  float: left;
  position: relative;
}
.bottomWrapper{
  height: calc(100% - .8rem);
}
.topWrapper{
  width: 90%;
  position: relative;
}
.topWrapper::after{
  position: absolute;
  content: "";
  width: 100%;
  bottom: 0;
  right: 0;
  height: .01rem;
  transform: scaleY(.1);
  background: rgba(0, 0, 0, .1);
}
.additem{
  width: 10%;
  position: absolute;
  right: 0;
  top: 0;
  height: .24rem;
  box-shadow: -0.02rem 0 0.03rem #ccc;
  background: #fff;
}
</style>

