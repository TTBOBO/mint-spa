<template>
  <div> 
    <div>{{downText}}</div>
        <div class="container" ref="container">
            <div>
                <div style="position: relative;">
                    <!-- 轮播图 -->
                    <swiper-bar></swiper-bar>
                </div>
                <!-- banner -->
                <banner-item></banner-item>
                <div style="width:100%; height:2rem; background:red;"></div>
            </div>
        </div>
  </div>
</template>
<script>
import bannerItem from "./bannerItem/bannerItem";
import tabBar from "../base/tabbar/tabbar";
import BScroll from "better-scroll";
import swiperBar from "../base/swiper/swiperbar";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      downText:'下拉刷新',
      show:false
    };
  },
  computed: {},
  components: {
    bannerItem,
    tabBar,
    swiperBar,

  },
  methods: {
    _initData() {
      setTimeout(() => {
        this._initScroll();
       
      }, 20);
       this.show = true;
    },
    _initScroll() {
      var scroll = new BScroll(this.$refs.container, {
        click: true,
        pullDownRefresh: {
          threshold: 100,
          stop: 40
        },
        pullUpLoad: {
        threshold: 0,
          txt: {
            more: "加载更多",
            noMore: "没有更多数据了"
          }
        }
      });



      scroll.on("scroll", pos => {
        
        if (pos.y > 75) {
          this.downText = "释放立即刷新";
         	setTimeout(() => {
            scroll.finishPullDown()
						scroll.refresh();
					},1000)
        }else {
        }

        
      });

    },
  },
  mounted() {},
  created() {
    //初始化数据
    this._initData();
    
  }
};
</script>

<style scoped>
.slide {
  width: 100%;
  height: 150px;
  text-align: center;
  overflow: hidden;
  font-size: 30px;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 55px;
  left: 0px;
  right: 0px;
}
</style>


