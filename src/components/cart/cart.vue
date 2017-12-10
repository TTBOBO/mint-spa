<template>
  <div>
       <header-bar :text="title" >  </header-bar>
        <div class="content"></div>
        <!-- 购物车列表组件 -->
        <div id="cartContainer">
          
        </div>
        <cartItem  :cartList="cartList" @changeGoods = "getData"></cartItem>
       
  </div>
</template>
<script>
import headerBar from "../base/headerbar/headerbar";
import cartItem from "../base/cart/cartItem";
// import BScroll from 'better-scroll'
export default {
  data() {
    return {
      title: "购物车",
      cartList:[{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品零食",
        price:'16',
        count:'2',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品12",
        price:'66',
        count:'5',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'24',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      },{
        title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
        price:'26',
        count:'4',
        picture:'/static/img/banner3.jpg',
        select:false,
        show:false
      }]
    };
  },
  components: {
    headerBar,
    cartItem
  },
  methods:{
    getData(data) {
      console.log(data.goodsNum + ".." + data.priceSum);
    },
    _initData() {
      let scroll = new BScroll(document.getElementById('cartContainer'), {
        //options
        startY: 0,
        click:true
      })
    }

  },
  mounted() {
    // this.$nextTick(() => {
    //   this._initData();
    // })
  },
  created() {

  }
};
</script>
<style scoped>
.content {
  margin-top: 40px;
}

</style>



