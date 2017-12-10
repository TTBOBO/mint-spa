<template>
  <div >
       <!-- <header-bar 
            :text="title"
            >
        </header-bar> -->
        <div class="wrapper" ref="wrapper">
            <ul class="content">
                <li v-for="(item,index) in data" :key="index">{{item}}</li>
            </ul>
            <div class="loading-wrapper"></div>
        </div>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar'
import cell from '../base/cell/cell'
import swipe from '../base/cell/swipe'
import BScroll from "better-scroll";
export default {
    data() {
        return {
            title:"发现",
            swipeList:{
                data:[],
            },
            data: ['1','1','1','1'],
            
        }
    },
    components: {
        headerBar,
        swipe
    },
    methods:{
        loadData() {
                this.data = ['1','1','1','1'].concat(this.data);
                // this.$nextTick(() => {
                //     // if (!this.scroll) {
                //         this.scroll = new Bscroll(this.$refs.wrapper, {

                //         })
                //         this.scroll.on('touchend', (pos) => {
                //             // 下拉动作
                //             if (pos.y > 50) {
                //                 this.loadData();
                //             }
                //         })
                //     // } else {
                //     //     this.scroll.refresh();
                //     // }
                // })
        }
    },
    mounted() {

    },
    created() {
         this.loadData()
        // this.$nextTick(() => {
        //     this.getList();
           
        // })
    }
}
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  min-height: 1px;
  overflow: hidden;
  padding: 0px;
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
</style>

