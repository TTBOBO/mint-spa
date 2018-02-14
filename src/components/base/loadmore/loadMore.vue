<template>
  <div>
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
                @top-status-change="handleTopChange"
                v-if="topMethod && bottomMethod"
            >
            <div class="newsCon"   ref="newsCon">
                <slot></slot>
            </div>
        </mt-loadmore>
        <mt-loadmore 
                id="loadmore"
                style="font-size:12px;"
                ref="loadmore"
                :top-method="loadTop" 
                :top-status.sync="topStatus"
                :topDistance="topDistance"
				        @bottom-status-change="handleBottomChange"
                @top-status-change="handleTopChange"
                v-else-if="topMethod && !bottomMethod"
            >
            <div class="newsCon"   ref="newsCon">
                <slot></slot>
            </div>
        </mt-loadmore>
        <mt-loadmore 
                id="loadmore"
                style="font-size:12px;"
                ref="loadmore"
                :bottom-method="loadBottom"
                :top-status.sync="topStatus"
                topPullText="下拉刷新"
                :bottomDistance="bottomDistance"
                :topDistance="topDistance"
                @bottom-status-change="handleBottomChange"
                @top-status-change="handleTopChange"
                v-else-if="!topMethod && bottomMethod"
            >
            <div class="newsCon" ref="newsCon">
                <slot></slot>
            </div>
        </mt-loadmore>
        <mt-loadmore 
                id="loadmore"
                style="font-size:12px;"
                ref="loadmore"
                :top-status.sync="topStatus"
                topPullText="下拉刷新"
                :bottomDistance="bottomDistance"
                :topDistance="topDistance"
				        @bottom-status-change="handleBottomChange"
                 @top-status-change="handleTopChange"
                v-else
            >
            <div class="newsCon" ref="newsCon">
                <slot></slot>
            </div>
        </mt-loadmore>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import articleCom from "../../find/articleCom";
export default {
  data() {
    return {
      swipeList: {
        data: []
      },
      topStatus: false,
      bottomStatus: false,
      bottomDistance: 60,
      topDistance: 60,
      wrapperHeight: 0,
      startUp: false,
      newsList: [],
      height: 0
    };
  },
  props: {
    articleType: {
      type: Number,
      default: 1
    },
    pageObj: {
      type: Object,
      default: function() {
        return {
          page: 1,
          limit: 1,
          filter: "",
          order: ""
        };
      }
    },
    topMethod: {
      type: Boolean,
      default: false
    },
    bottomMethod: {
      type: Boolean,
      default: false
    },
     clickStatus:{
        type:Boolean,
        default:true   //true 时  可上拉下拉
    }
  },
  components: {
    articleCom
  },
  computed: {},
  methods: {
    articleInfo(id) {
      this.$router.next({
        path: "/articleInfo",
        query: { id: id }
      });
    },
    handleBottomChange(status) {
      if (!this.bottomMethod) {
        return false;
      }
      this.bottomStatus = status;
      this.startUp = true;
    },
    handleTopChange(status){
      // console.log(status);
    },
    loadTop() {
      if (!this.topMethod || !this.clickStatus) {
        return false;
      }
      Indicator.open({
        // text: 'Loading...',
        spinnerType: "fading-circle"
      });
      this.initPage();
    },
    loadMore() {
      this.loadData();
    },
    loadBottom() {
      if (!this.bottomMethod ||  !this.clickStatus) {
        return false;
      }
      Indicator.open({
        // text: 'Loading...',
        spinnerType: "fading-circle"
      });
      this.startUp = false;
      this.pageObj.page += 1;
      this.initPage(this.pageObj.page);
      let child = this.$refs.newsCon.children;
      let h = 0;
      setTimeout(() => {
        for (var i = 0; i < child.length; i++) {
          h += child[i].children[0].clientHeight;
        }
        this.height = h;
      }, 100);
    },
    /**@augments page 页数   不传  默认1  传就是当前页 */
    initPage(page) {
      this.pageObj.page = page ? page : 1;
      this.$emit("changePage", this.pageObj);
    },
    /**@augments  status  为真时 取消上拉  反之下拉 */
    /**  取消加载操作后  计算高度防止出现加载问题 */
    destroy(status) {
      setTimeout(() => {
        Indicator.close();
        if (this.topMethod && this.bottomMethod) {
          status
            ? this.$refs.loadmore.onBottomLoaded()
            : this.$refs.loadmore.onTopLoaded();
        } else if (!this.topMethod && this.bottomMethod) {
          this.$refs.loadmore.onBottomLoaded();
        } else if (this.topMethod && !this.bottomMethod) {
          this.$refs.loadmore.onTopLoaded();
        } else {
          this.$refs.loadmore.onTopLoaded();
          this.$refs.loadmore.onBottomLoaded();
        }
        this.height = document.querySelector(".newsCon").clientHeight;
      }, 200);
    }
  },
  mounted() {},
  created() {},
  watch: {}
};
</script>

<style>
@import "../../find/news.css";
.mint-loadmore-bottom {
  margin-bottom: 0px;
}
</style>
