<template>
  <div>
      <header-bar :text="title" :left="left" ></header-bar>
      <div class="container" style="margin-top:.4rem; position:relative;overflow:hidden;">
          <loadDemo
                    :header="header"
                    ref ="loadMore"
                    pullDownRefresh=""
                    pullUpLoad=""
                   >
                   <div style="width:95%;margin:auto;">
                       <div class="header-title">已选频道</div>
                       <div class="type-list">
                           <newsTypeCom :draggableStatus="draggableStatus" :data="globel.newsList" :del="del" @deleteItem="deleteStatus"></newsTypeCom>
                       </div>

                       <div class="header-title">推荐频道</div>
                       <div class="type-list">
                           <newsTypeCom :data="globel.noNewsList" @getItem="getItem"></newsTypeCom>
                       </div>
                   </div>
                   
        </loadDemo>
      </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import headerBar from "../components/base/headerbar/headerbar";
import loadDemo from "../components/base/loadmore/loadDemo";
import newsTypeCom from "../components/index/newType";
export default {
  data(){
      return{
        title:"频道定制",
        left: {
            status: true,
            icon: "back"
        },
        width:0,
        newsList:[],
        custom:true,
        header:true,
        data:[],
        del:true,
        draggableStatus:true
      }
  },
  methods:{
      ...mapMutations([
          'NOACTIVE',
          'ADDITEM',
          'DELITEM'
      ]),
      deleteStatus(params){
          console.log(params);
          this.$store.commit('DELITEM',params.item);
      },
      getItem(params){
          console.log(params);
          this.$store.commit('ADDITEM',params.item);
      }
  },
  mounted () {
     this.$store.commit('NOACTIVE');
  },
  created () {
      
  },
  components: {
      loadDemo,
      headerBar,
      newsTypeCom
  },
  computed: {
      ...mapState([
          "globel"
      ])
  }
}
</script>
<style>
@import "../assets/css/news.css";
</style>


