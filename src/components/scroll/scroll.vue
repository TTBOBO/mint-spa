<template>
  <div class="wrapper goods" ref="wrapper">

	  <div>
		  <div class="top-tip">
			  {{topTip}}
		  </div>
		  <div>
			<ul>
				<li v-for="(item , index) in dataList" :key="index" style="width:100%; height:200px; background:yellow;">{{item}}</li>
			</ul>
			<!-- <div class="bottom-tip" >  
			   <div style="width:28px;margin:auto; height:70px;">
				    <mt-spinner type="fading-circle" style="margin:auto;" color="blue"></mt-spinner>
			   </div>
		  </div> -->
		  </div>
			<!-- v-if="showBottom" -->
		   
	  </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import scroll from '../scroll/scroll'
export default {
  data() {
      return {
		  dataList:[1,5,3,4],
		  topTip:"下拉刷新",
		  bottomTip:"加载更多",
		  showBottom:false,
		  pullDownRefresh:{
			threshold: 70,
			stop: 40
		  }
      }
  },
  components:{
	  scroll
  },
  methods:{
	  initScroll() {
					document.querySelector('body').addEventListener('touchstart', function (ev) {
				ev.preventDefault();
		});
		this.$nextTick(() => {
			var scroll = new BScroll(this.$refs.wrapper,{
				scrollX:true,
				scrollY:true,
				click:true,
				eventPassthrough:"horizontal",
				probeType:1,
				pullDownRefresh: {
					threshold: 70,
					stop: 40
				},
				pullUpLoad: true
			})

			scroll.on('scroll', position => {
				if(position.y > 70) {
					this.topTip = "释放立即刷新"
					setTimeout(() => {
						scroll.finishPullDown()
						scroll.refresh();
						this.topTip = "下拉刷新";
					},1000)	
				}else if(scroll.y <= (scroll.maxScrollY +40)) {
					// console.log(scroll.maxScrollY + "," + position.y);
					this.showBottom = true;
				}
			});
			scroll.on('scrollEnd', () => {
				// 滚动到底部
				if (scroll.y <= (scroll.maxScrollY +40)) {
					console.log(1);
					setTimeout( () => {
						// 恢复文本值 
						// this.topTip = '查看更多';
						// 向列表添加数据
						// 加载更多后,重新计算滚动区域高度
						this.showBottom = false;
						// scroll.finishPullUp();
						scroll.refresh();
					}, 10000);
				}
			})
		})
	  }
  },
  mounted() {
	//   this.initScroll();
  },
  computed:{

  },
  created() {

  }
}
</script>
<script>
(function(){
	document.querySelector('body').addEventListener('touchstart', function (ev) {
    event.preventDefault();
});
})()
</script>


<style scoped>
@import '/static/css/base.css';
.goods {
  width: 100%;
  margin-top: 40px;
  bottom: -40px;
  overflow: hidden;
  /* display: flex; */
}
.top-tip{
	position: absolute;
    left: 0px;
    text-align: center;
    right: 0px;
    z-index: 0;
    top: -20px;
}
.bottom-tip{
    text-align: center;
    right: 0px;
		z-index: 0;
		height: 100px;
}

</style>

