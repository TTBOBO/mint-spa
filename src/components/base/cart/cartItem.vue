<template>
    <div>
      <div ref="cartList"  class="cartCon" v-if="cartList.length > 0">
            <div ref="itemList">
              <div  class="mint-loadmore-bottom" style="height:100px; line-height: 40px;"  v-show="startUp">
                <div style="width:28px;margin:auto;">
                     <mt-spinner type="fading-circle" style="margin:auto;" :size="12" ></mt-spinner>
                </div>
                <span v-show="bottomStatus">Loading...</span>
              </div>
              <div>
                <div class="goodsItem"  v-for="(item, index) of cartList"  :key="index" >
                    <div class="checkbox">
                        <label class="mint-checklist-label"  ><span class="mint-checkbox" ><input type="checkbox" v-model="item.select"  @change="changeGoods(index)"   class="mint-checkbox-input"> <span class="mint-checkbox-core" ></span></span> </label>
                    </div>
                    <div class="goodsPic">
                        <img v-lazy="item.picture" />
                    </div>
                    <div class="goodInfo">
                        <div class="goodname">
                            <div><p>{{item.title}}</p></div>
                            <div style="margin-right:5px;margin-left:4px;" @click="showChange(index,$event)"><span class="iconfont icon-more_light"></span></div>
                        </div>
                        <div class="goodcount"><p><span class="price">￥{{item.price}}</span><span class="num">x{{item.count}}</span></p></div>
                        <!-- <transition   enter-active-class=" slideInRight" leave-active-class=" slideOutRight"> -->
                        <div v-show="item.show" animate-duration="0.2s"  class="changeNum">
                            <div style="width: 80%; padding-top: 10px; postion:relative;">
                                <p class="iconfont icon-jianhao changeSpan" @click="reduce(index,$event)"></p><input class="goodsNum" v-model="item.count"  type="number"><p class="changeSpan iconfont icon-jiahao1" @click="add(index,$event)"></p>
                            </div>
                            <div class="successBtn" @click="showChange(index)">
                                完成
                            </div>
                        </div>
                        <!-- </transition> -->
                    </div>
                </div>
              </div>
            </div>
      </div>
       <div v-else>
            没有商品
        </div>
         <!-- 结算 -->
            <div class="h-js"  v-if="cartList.length > 0">
                <div class="selectBox">
                    <div class="checkbox">
                        <label class="mint-checklist-label"><span class="mint-checkbox" ><input type="checkbox" v-model="selectAllStatus"   @change="selectAll()"   class="mint-checkbox-input"> <span class="mint-checkbox-core" ></span></span> </label>
                    </div>
                    <div class="allSpan">  全选</div>
                </div>
                
                <div class="zj"><span v-if="!editStatus">总计：</span><span style="color:red;" class="price" v-if="!editStatus">￥{{returnData.priceSum}}</span></div>
                
                <mt-button class="js" v-if="!editStatus" :class="{red:editStatus}" :disabled="settlement"  @click="pay">结算({{returnData.goodsNum}})</mt-button>
                <mt-button class="js red" v-else  @click="del">删除</mt-button>
            </div>
            
            <mt-actionsheet
              :actions="actions"
              v-model="sheetVisible">
            </mt-actionsheet>
        <!-- </div> -->
       
    </div>
</template>
<script>
import BScroll from "better-scroll";
import { Actionsheet } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
  data() {
    return {
      startUp:false,
      bottomStatus:false,
      returnData: {
        goodsNum: 0,
        priceSum: 0,
        cartList: [],
        listHeight: [],
      },
      selectAllStatus: false, //全选状态
      scrool: "" ,//滚动条,
      sheetVisible:false,
      actions:[{name:"支付宝",method:this.getzhi},{name:"微信支付",method:this.getwx}],
      editList:false
    };
  },
  props: {
    cartList: {
      type: Array,
      default: function() {
        return [
          {
            title: "",
            price: "",
            count: "",
            picture: "",
            select: ""
          }
        ];
      }
    },
    editStatus:{
      type:Boolean,
      default:false
    }
  },
  computed:{
    settlement() {
      return this.returnData.goodsNum > 0 && !this.editStatus ? false :true;
    },
    ...mapState([
      'globel'
    ])
  },
  methods: {
    //支付
    pay() {
      this.sheetVisible = !this.sheetVisible;
    },
    //删除购物车
    del() {
      let num = 0;
      let checkedList = [];
      this.globel.cart.forEach((item,index) => {
        if(item.select) {
          num++;
          checkedList.push(item.id);
        }
      })
      if(num == 0) {
        this.$store.dispatch('getPop',{text:"请选中再删除"});
        return false;
      }
      this.$MessageBox({
        title: '提示',
        message: '确认删除么？',
        showCancelButton: true
      }).then((action) => {
        if(action == 'confirm') {
          this.$store.dispatch('delCartItem',{
            checkedList:checkedList,
            vm:this
          })
          this.changeGoods();
          
          this.returnData.goodsNum = 0;
          this.returnData.priceSum = 0;
        }
      });
    },
    getzhi() {
      console.log(1);
    },
    getwx() {
      console.log(2);
    },
    showChange(index, enent) {
      if (!event._constructed) {
        return;
      }
      this.cartList[index].show = !this.cartList[index].show;
    },
    //减数量
    reduce(index, enent) {
      if (!event._constructed) {
        return;
      }
      if (this.cartList[index].count > 1) {
        this.cartList[index].count--;
        this.changeGoods();
      }
    },
    //加数量
    add(index, enent) {
      if (!event._constructed) {
        return;
      }
      if (this.cartList[index].count > 1) {
        this.cartList[index].count++;
        this.changeGoods();
      }
    },
    //全选
    selectAll() {
      this.cartList.forEach(item => {
        item.select = this.selectAllStatus;
      });
      this.changeGoods();
    },
    //算出结果
    changeGoods() {
      console.log(this.cartList.length);
      let num = 0;
      let sum = 0;
      //计算总数   和   总价格
      this.cartList.forEach(item => {
        if (item.select) {
          num += parseInt(item.count);
          sum += item.count * item.price;
        }
      });
      this.returnData = {
        goodsNum: num,
        priceSum: sum,
        cartList: this.cartList
      };
      //把结果返回给父组件
      this.$emit("changeGoods", this.returnData);
    },
    _initData() {
      this.$nextTick(() => {
        this._initScroll();
      });
      this.editList = this.editStatus;
    },
    _initScroll() {
      if(!this.$refs.cartList) {
        return false;
      }
      var scroll = new BScroll(this.$refs.cartList, {
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
          this.startUp = true;
          this.bottomStatus = true;
          setTimeout(() => {
            scroll.finishPullDown();
            scroll.refresh();
            this.startUp = false;
            this.bottomStatus = false;
            this.$store.dispatch('getPop',{text:"刷新成功"});
          }, 1000);
        } else {
        }
      });
    }
  },
  mounted() {},
  watch: {
    editStatus(cur) {
      console.log(cur);
    }
  },
  created() {
    this._initData();

  }
};
</script>
<style scoped>
.slideInRight {
  transition: all 0.2s ease;
}

.slideOutRight {
  transition: all 0.2s;
}
.goodsItem {
  width: 100%;
  height: 90px;
  display: flex;
  flex-flow: row;
  align-content: center;
  margin: 5px 0px;
  border: 1px none #eee;
  border-style: solid none;
}
.checkbox {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
}
.goodsPic {
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: center;
}
.goodsPic img {
  width: 80px;
  height: 80px;
  margin: auto;
  object-fit: cover;
}
.goodInfo {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.goodname {
  width: 100%;
  height: 50%;
  font-size: 12px;
  color: #888888;
  text-align: left;
  display: flex;
}
.goodname p {
  margin: 5px;
}
.goodcount {
  width: 100%;
  height: 50%;
  background: #fafafa;
  font-size: 12px;
  text-align: left;
  display: flex;
}
.goodcount p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px;
}
.mint-checkbox-core {
  border: 1px solid #26a2ff;
}
.mint-checklist-label {
  display: flex;
  margin: auto;
  padding: 0px 5px;
}
.price {
  color: red;
}
.num {
  color: #888;
}
.changeNum {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  left: 0px;
  top: 0px;
  display: flex;
}
.changeSpan {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #888;
  border-radius: 2px;
  line-height: 16px;
  padding-top: 2px;
  color: #888;
}
.goodsNum {
  width: 30px;
  border: none;
  height: 22px;
  margin-top: -2px;
  margin: 0px 5px;
  border-radius: 2px;
  /* border: 1px solid #888; */
  text-align: center;
  color: #888;
  padding: 0px;
}
.successBtn {
  display: flex;
  justify-content: center;
  width: 20%;
  align-items: center;
  color: #fff;
  background: #26a2ff;
}
.h-js {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 55px;
  flex-flow: row;
  justify-content: flex-start;
  border: 1px none #eee;
  border-top-style: solid;
  font-size: 14px;
  background: #fff;
}
.allSpan {
  display: flex;
  height: 100%;
  align-items: center;
  color: #888;
  justify-content: center;
  float: left;
}
.h-js .selectBox {
  width: 25%;
  height: 100%;
  float: left;
}
.h-js .checkbox {
  width: 50px;
  display: flex;
  height: 100%;
  float: left;
  align-items: center;
  color: #888;
  justify-content: center;
}
.h-js .zj {
  width: 45%;
  display: flex;
  height: 100%;
  align-items: center;
  color: #888;
  justify-content: center;
  float: left;
}
.h-js .js {
  width: 30%;
  display: flex;
  height: 100%;
  background: #26a2ff;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 0px;
}
.cartCon:last-child {
  margin-bottom: 55px;
}
.cartCon {
  position: absolute;
  top: 40px;
  bottom: 110px;
}
.red{
  background: red !important;
}
</style>


