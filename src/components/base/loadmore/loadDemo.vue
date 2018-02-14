<template>
<!-- <div style="overflow:hidden;"> -->
  <div ref="Wrapper">
    <!-- {{pageObj}} -->
     <div class="scroll-content newsCon" id="scroll-content" >
        <div ref="scrollList">
            <slot>
                
            </slot>
        </div>
        <!-- 上拉加载 -->
        <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
            >
            <div class="pullup-wrapper" v-if="pullUpLoad">
                <div class="before-trigger" v-if="!isPullUpLoad">
                    <span>{{pullUpTxt}}</span>
                </div>
                <div class="after-trigger" v-else>
                    <!-- 加载中 -->
                    <loading></loading>
                </div>
            </div>
        </slot>
     </div>
      <!-- 下拉加载 -->
     <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
        >
         <!-- :bubbleY="bubbleY" -->
            <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
                <div class="before-trigger" v-if="beforePullDown">
                    {{beforeTxt}}
                    <!-- 加载前 -->
                </div>
                <div class="after-trigger" v-else>
                    <!-- 加载中 -->
                <div v-if="isPullingDown" class="loading">
                    <loading></loading>
                </div>
                <!-- 加载完成 -->
                <div v-else><span>{{refreshTxt}}</span></div>
                </div>
            </div>
        </slot>
  <!-- </div> -->
</div>
</template>
<script>
import BScroll from "better-scroll";
import util from "../../../assets/js/util";
import ykp from "../../../assets/js/ykp";
import loading from "./loading";
export default {
  data() {
    return {
      pullUpDirty: true,
      isPullUpLoad: false,
      beforePullDown: true,
      isPullingDown: false,
      pullDownStyle: "",
      bubbleY: 0,
      beforeTxt: "下拉刷新",
      refreshTxt: "加载完成",
      data: [1, 2, 3, 4],
    };
  },
  props: {
    pageObj: {
      type: Object,
      default: function() {
        return {
          page: 1,
          limit: 5,
          filter: "",
          order: ""
        };
      }
    },
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: function() {
        return {
          threshold: 90,
          stop: 40
        };
      }
    },
    pullUpLoad: {
      // type: null,
      default: function() {
        return {
          threshold: 0,
          txt: { more: "加载中...", noMore: "没有更多了" }
        };
      }
    },
    startY: {
      type: Number,
      default: 0
    },
    momentum: {
      type: Boolean,
      default: true
    },
    isNoMore:{
      type:Boolean,
      default:false
    },
    header:{
      type:Boolean,
      default:false
    },
    curHeight:{
      type: Number,
      default: 0
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.Wrapper) {
        return;
      }
      setTimeout(() => {
        if (this.$refs.Wrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          //+1  超出屏幕最大高度才会有效果      this.header  当有顶部时
          if(this.header){
            this.$refs.Wrapper.style.height =  (this.$refs.Wrapper.parentNode.parentNode.clientHeight-40)/100+"rem" ;
            this.$refs.scrollList.style.minHeight = (this.$refs.Wrapper.parentNode.parentNode.clientHeight-39)/100+"rem" ;
          }else if(this.curHeight){   //当容器自定义高度时  需传一个高度进来
            this.$refs.Wrapper.style.height =  (this.$refs.Wrapper.parentNode.parentNode.clientHeight-this.curHeight)/100+"rem" ;
            this.$refs.scrollList.style.minHeight = (this.$refs.Wrapper.parentNode.parentNode.clientHeight-this.curHeight+1)/100+"rem";
          }else{
            this.$refs.Wrapper.style.height =  (this.$refs.Wrapper.parentNode.parentNode.clientHeight)/100+"rem" ;
            this.$refs.scrollList.style.minHeight = (this.$refs.Wrapper.parentNode.parentNode.clientHeight+1)/100+"rem";
          }
         
        

        //全屏时代码
        //this.$refs.scrollList.style.minHeight = `${util.bounce.getRect(this.$refs.Wrapper).height + 1}px`;
        }
        let option = {
          scrollY: true,
          click: this.click,
          momentum: this.momentum,
          eventPassthrough: "horizontal",
          probeType: this.probeType,
          bounce: true,
          startY: 0,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad
        };
        this.scroll = new BScroll(this.$refs.Wrapper, option);

        if (this.pullDownRefresh) {
          this._initPullDownRefresh();
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad();
        }
      }, 22);
    },
    _initPullDownRefresh() {
      this.scroll.on("pullingDown", () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.initPage();
        // setTimeout(() => {
        //   for (var i = 0; i < 20; i++) {
        //     this.data.push(i);
        //   }
        //   this.forceUpdate(true);
        // }, 600);
      });

      this.scroll.on("scroll", pos => {
        this.beforeTxt =
          parseInt(pos.y) > this.pullDownRefresh.threshold
            ? "释放刷新"
            : "下拉刷新";
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          this.bubbleY = 0;
        }
        this.pullDownStyle = `top:${10 -
          (this.pullDownRefresh.stop - pos.y)}px`;
      });
    },
    _initPullUpLoad() {
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true;
        // this.$emit("pullingUp");
        if(!this.isNoMore){
          this.pageObj.page += 1;
          this.initPage(this.pageObj.page);
        }else{
          setTimeout(() => {
            this.forceUpdate(true);
          },300)
        }
        
        // setTimeout(() => {
        //   for (var i = 0; i < 20; i++) {
        //     this.data.push(i);
        //   }
        //   this.forceUpdate(true);
        // }, 2000);
      });
    },
    /**@augments page 页数   不传  默认1  传就是当前页 */
    initPage(page) {
      this.pageObj.page = page ? page : 1;
      this.$emit("loadMore", this.pageObj);
    },
    forceUpdate(dirty) {
     
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        /**必须DOM生成完才能执行refresh  否则会出现scroll 出现异常   */
        this.$nextTick(() =>{
           this.refresh();
        })
      } else {
        /**必须DOM生成完才能执行refresh  否则会出现scroll 出现异常   */
        this.$nextTick(() =>{
           this.refresh();
        })
      }
    },
    _reboundPullDown() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.scroll.finishPullDown();
          resolve();
        }, 1000);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        /**必须DOM生成完才能执行refresh  否则会出现scroll 出现异常   */
        this.$nextTick(() =>{
           this.refresh();
        })
      }, 100);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  mounted() {
    /**初始化better-scroll */
    this.initScroll();
  },
  created() {
    this.pullDownInitTop = -50;
  },
  components: {
    loading
  },
  computed: {
    pullUpTxt() {
      const moreTxt =
        this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more;
      const noMoreTxt =
        this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore;
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    }
  },
  watch: {
    isNoMore(cur,old){
      cur ?  this.pullUpLoad.txt.more = "-- end --" : "加载中...";
    }
  }
};
</script>
<style>
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: all;
  transition: all;
}
.pullup-wrapper {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 16px 0;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>


