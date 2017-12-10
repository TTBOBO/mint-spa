<template>
  <div>
      <div class="goods" v-cloak>
            <div class="menu-wrapper" ref="menuwrapper">
                <ul>
                    <!--当currentIndex与index相等的时候，设置高亮-->
                    <li v-for="(item,index) in goods" class="menu-item" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)" v-cloak>
                        
                                {{item}}
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodwrapper">
                <ul>
                    <!--food-list-hook用于dom操作，获取整体容器的高度-->
                    <li v-for="(item,index) in goods"  :key="index"  class="food-list food-list-hook" v-cloak>
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>  
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
        goods:[],  
        listHeight:[],  
        scrollY:0,
    };
  },
  created() {
    this._initData();
  },
  mounted() {

  },
  methods:{
        _initData() {
            for(var i = 0; i < 15; i ++) {
                this.goods.push('衣服'+i);
            }
            console.log(this.goods);
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            })
        },
        selectMenu(index, event) {
            //      自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
            if(!event._constructed) {
                return;
            }
            //运用BScroll接口，滚动到相应位置
            let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
                    //获取对应元素的列表
            let el = foodList[index];
            this.foodScroll.scrollToElement(el, 300);
        },
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuwrapper, {
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodwrapper, {
                click: true,
                //探针作用，实时监测滚动位置
                 probeType: 3
            });
            //设置监听滚动位置
            this.foodScroll.on('scroll', (pos) => {
                //scrollY接收变量
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        _calculateHeight() {
            let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            //把第一个高度送入数组
            this.listHeight.push(height);
            //通过循环foodList下的dom结构，将每一个li的高度依次送入数组
            for(let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height);
            }
        },
  },
  computed:{
       currentIndex() {
            for(let i = 0; i < this.listHeight.length; i++) {
                //判断当currentIndex在height1和height2之间的时候显示
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                //          console.log('height1:'+height1+','+'height2:'+height2)
                //最后一个区间没有height2
                if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        }
  }
};
</script>
<style scoped>
ul{
    list-style: none;
    margin: 0px; 
    padding: 0px;
}
.goods {
  position: absolute;
  width: 100%;
  top: 55px;
  bottom: 0px;
  display: flex;
  overflow: hidden;
}

.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
  height: 100%;
}

.goods .menu-wrapper .current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #ffffff;
  font-weight: 700;
  font-size: 14px;
}

.goods .menu-wrapper .menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    width: 80px;
    line-height: 14px;
    padding: 0 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
}

.goods .menu-wrapper .menu-item .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  -webkit-background-size: 12px 12px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}

.goods .menu-wrapper .menu-item .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
  text-align: center;
}


.goods .foods-wrapper {
  flex: 1;
}

.foods-wrapper li{
    width: 100%;
    height: 500px;
    background: gray;
    border: 1px none #fafafa;
    border-bottom-style: solid; 
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: #fff;
}
</style>

