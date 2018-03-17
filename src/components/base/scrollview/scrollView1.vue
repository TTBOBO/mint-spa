<template>
  <div >
    <div class="wrapper" ref="wrapper">
        <!--定义需要滚动的内容区域-->
        <ul class="content" ref="sliderGroup" >
            <li v-for="(item,index) in items" :class="{'wrapper-item' :type == 1,'wrapper-item2' :type == 2,'wrapper-item3' :type == 3}"  :key="index" :data-id="'item-'+(index)">
                <img :src ="item" style="width:100%;" />
            </li>
        </ul>
                <!--定义轮播图小圆点-->
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
        </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            title:"发现",
            find:'',
            height:0,
            loop:true, // 是否为循环播放
            dots: [], // 存放轮播小圆点
            currentPageIndex: 0, // 当前是哪个
            autoPlay:true, // 是否自动轮播
            interval:4000, // 设置自动轮播的时间
            type:2
        }
    },
    props:{
        swiperObj:{
            type:Object,
            default:function(){
                return {
                    showDots:true,   //显示轮播图标
                    autoPlayItem:{
                        auto:true,  //自动播放   true 自动 | false 不自动播放
                        speed:1000  // 
                    }
                }
            }
        },
        items:{
            type:Array,
            default:[
               './static/img/banner1.jpg',
               './static/img/banner2.jpg',
              './static/img/banner3.jpg',
            ]
        },
        
    },
    methods:{
         // 定义一个计算宽度的方法
        _setSliderWidth(isResize){
            // 获取到多少子元素
            this.children = this.$refs.sliderGroup.children;
            let width = 0;
            // 计算一个的宽度
            let wrapperWidth = this.$refs.wrapper.clientWidth;
            for(let i = 0;i<this.children.length;i++){
                let child = this.children[i];
                child.style.width = wrapperWidth - (wrapperWidth * 0.02) + 'px';
                width += wrapperWidth;
            }
            // 如果是循环播放的话
            if(this.loop && !isResize){
                width += 2 * wrapperWidth;
            }
            this.$refs.sliderGroup.style.width = width + 'px';
        },
        _initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                momentum: true,
                snap: {
                    loop: this.loop, // ture表示前后增加一张
                    threshold: 0.3,
                    speed: 400
                },
                snapThreshold: 0.5,  //滑动0.5到下一页
                snapSpeed: 400,
                click: true,
                eventPassthrough:'vertical'
            })

            console.log(this.scroll);

            // 监听滚动结束后,小圆点+1
            this.scroll.on('scrollEnd', () => {
                let pageIndex = this.scroll.getCurrentPage().pageX;
                if (this.loop) {
                    pageIndex -= 1;
                }
                this.currentPageIndex = pageIndex;
                console.log(pageIndex)
                if (this.autoPlay) {
                    this._play();
                }
            })

            // 手指滑动就停止自动轮播
            this.scroll.on('beforeScrollStart', () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer);
                }
            })
    },
     // 初始化添加小圆点
        _initDots() {
            if(this.swiperObj.showDots){
                 this.dots = new Array(this.children.length);
            }
           
        },
        // 设置自动轮播
        _play() {
            // let pageIndex = this.currentPageIndex + 1;
            // if (this.loop) {
            //     pageIndex += 1;
            // }
            // this.timer = setTimeout(() => {
            //     this.scroll.goToPage(pageIndex, 0, 400);
            // }, this.interval);
        },
        destroyed(){
            clearTimeout(this.timer)
        }
    },
    created () {
        this.height = window.innerHeight + 'px';
    },
    mounted() {
        setTimeout(()=>{
            this._setSliderWidth();
            this._initDots();
            this._initScroll();
            // 设置自动轮播
            if (this.autoPlay) {
                this._play();
            }
        },20)
         window.addEventListener('resize', () => {
            if (!this.scroll) {
                return false;
            }
            this._setSliderWidth(true);
            this.scroll.refresh(); // 强制刷新
        })
    },
     activated() {
        if (this.autoPlay) {
            this._play()
        }
    },
    deactivated() {
        clearTimeout(this.timer)
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    },
}
</script>
<style scoped>
.wrapper {
  /* position: absolute; */
  width: 100%;
  min-height: 1px;
  overflow: hidden;
  padding: 0px;
  position: relative;
}
.wrapper .content {
  padding: 0px;
  margin: 0px;
}
.wrapper .content .wrapper-item:first-child{
    width: 100%;
    
    height: 160px;
  list-style: none;
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
.wrapper .content .wrapper-item2{
  width: 95%;
  height: 160px;
  list-style: none;
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
.wrapper .content .wrapper-item3{
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
  transition: width .3s linear;
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
</style>

