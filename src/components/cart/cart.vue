<template>
  <div>
       <header-bar :text="title" :right="right" @rightClick="rightClick">  </header-bar>
        <div class="content"></div>
        <!-- 购物车列表组件 -->
        <div id="cartContainer">
          
        </div>
        <cartItem  :cartList="globel.cart" :editStatus="editStatus" @changeGoods = "getData"></cartItem>
       
  </div>
</template>
<script>
import headerBar from "../base/headerbar/headerbar";
import cartItem from "../base/cart/cartItem";
// import BScroll from 'better-scroll'
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      title: "购物车",
      right: {
        status: true,
        text: "编辑"
      },
      editStatus: false
    };
  },
  computed: {
    ...mapState(["globel"])
  },
  components: {
    headerBar,
    cartItem
  },
  methods: {
    getData(data) {
      // console.log(data.goodsNum + ".." + data.priceSum);
    },
    rightClick() {
      if (!this.editStatus) {
        this.right.text = "完成";
        this.editStatus = true;
      } else {
        this.right.text = "编辑";
        this.editStatus = false;
      }
    }
  },
  mounted() {},
  created() {}
};
</script>
<style scoped>
.content {
  margin-top: 40px;
}
</style>



