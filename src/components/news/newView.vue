<template>
  <div>
      <div class="topWrapper" ref="topWrapper">
          <ul ref="ul">
              <li v-for="(item, index) in topList" @click="activeLi(index)" :key="index">{{item}}</li>
              <div class="bottom-line" :style="{left:left+'rem'}"></div>
          </ul>
      </div>
      <div class="bottomWrapper" ref="bottomWrapper">
          <div ref="newCon">
              <div class="new-item" v-for="(item ,index) in topList" :key="index">{{index+1}}</div>
              
          </div>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
  data(){
      return {
          topList:['新闻','资讯','娱乐','科技','科技','文化','游戏','教育','动漫','理财','金融'],
          left:0.15,
          topClick:false,
          bottomClick:false
      }
      
  },
  methods: {
      activeLi(index){
        this.left = 0.15;
        this.left = this.left + (index * 0.6);
        let bottomWrapperWidth = this.$refs.bottomWrapper.clientWidth;
        this.topClick = true;
        this.scroll1.scrollTo(-(bottomWrapperWidth*index),0,200)
      },
      initTopScroll(){
         
          setTimeout(() => {
            this.scroll = new BScroll(this.$refs.topWrapper, {
                scrollX: true,
                scrollY: false,
                momentum: true,
                snapSpeed: 400,
                click: true,
                eventPassthrough:'vertical'
            })
            this.scroll1 = new BScroll(this.$refs.bottomWrapper, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                click: true,
                 probeType: 3,
                eventPassthrough:'vertical',
                snap: {
                    threshold: 0.3,
                    speed: 400
                },
                snapThreshold: 0.5,  //滑动0.5到下一页
                snapSpeed: 400,
            })
            this.scroll1.on('touchEnd', (pos) => {
                this.topClick = false;
            })
            this.scroll1.on('scrollEnd', (pos) => {
                this.getActive(this.scroll1.currentPage.pageX);
            })
          }, 200);
           this.$nextTick(() => {
            this.initSwiper();
          })
      },
      initSwiper(){
          /**@description 头部 */
            this.children = this.$refs.ul.children;
            let width = 0;
            this.$refs.ul.style.width = (this.topList.length)*.6 + 'rem';
            
            /**@description 底部 */
            let bottomWrapperWidth = this.$refs.bottomWrapper.clientWidth;
            this.childrenCon = this.$refs.newCon.children;
            let newItemW = 0;
            for(let i = 0;i<this.childrenCon.length;i++){
                let child = this.childrenCon[i];
                child.style.width = bottomWrapperWidth + 'px';
                newItemW += bottomWrapperWidth;
            }
            this.$refs.newCon.style.width = newItemW + 'px';
      },
      getActive(index){
          if(!this.topClick) {
            this.left = 0.15;
            this.left = this.left + (index * 0.6);
          }
          let bottomWrapperWidth = this.$refs.bottomWrapper.clientWidth;
          let maxScrollW = this.scroll.maxScrollX;
          if(this.left*100 > (bottomWrapperWidth / 2)  && (-((this.left*100)-(bottomWrapperWidth / 2)) >  maxScrollW)){
               this.scroll.scrollTo(-((this.left*100)-(bottomWrapperWidth / 2)),0,200)
          }else if(this.left*100 < (bottomWrapperWidth / 2)){
              this.scroll.scrollTo(0,0,200)
          }
      }
  },
  components: {
      
  },
  computed: {
      
  },
  mounted () {
      this.initTopScroll();
  },
  created () {
      
  }
}
</script>
<style>
@import "../../assets/css/news.css";
</style>

