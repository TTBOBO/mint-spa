<template>
    <div>
        <div v-for="(item ,index) in newsList" :key="index">
            <div class="newsItem1" v-if="item['hm_archives.litpic'].split(',').length == 1" @click="articleInfo(item['hm_archives.id'])">
                        <div class="content-left" >
                            <div class="content-left-top">
                                <div class="">
                                    <img :src="item['face']" :onerror="errorImg" class="user-avtor">
                                </div>
                                <div style="margin-left:.1rem;">
                                    <p> {{item['uname']}}</p>
                                    <p> {{item['hm_archives.pubdate'] | getNowTime}}</p>
                                </div>
                            </div>
                             <div class="content-left-center" style="text-align:left;" v-html="item['hm_archives.name']">
                              
                            </div>
                            <div class="content-left-bottom">
                                <div>
                                        <span class="" style="font-size:.10rem;">
                                            阅读&nbsp{{item['click_data'] || 0}}
                                        </span>
                                        <span class="feedback">
                                            {{item['feedCount']}}&nbsp评
                                        </span>
                                        <span class=" zan feedback iconfont icon-xihuanfill"></span ><span style="margin-left: .02rem;font-size: .1rem;">{{item['hm_archives.goodpost'].length ? item['hm_archives.goodpost'].split(',').length : "0"}}</span>
                                </div>
                                <div class="zan">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="content-right">
                            <!-- <img v-lazy="item['hm_archives.litpic'].split(',')[0]"  class="right-img lazyimg" style="width:100%; height:100%;" alt=""> -->
                        </div>
                    </div>
        </div>
  </div>
</template>
<script>
import util from "../../assets/js/util";
export default {
  data() {
    return {
      tip: { 1: "新闻", 2: "热点", 3: "资讯", 4: "广告", 5: "专题" },
      errorImg: 'this.src="' + require('../../assets/img/picture.png') + '"'
    };
  },
  props: {
    newsList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    articleInfo(id) {
      this.$router.next({
        path: "/articleInfo",
        query: { id: id }
      });
    }
  },
  filters: {
    getNowTime(time, status) {
      return util.time.getNowTime(time, true);
    }
  },
  created() {},
  mounted() {
     
  },
  components: {},
  computed: {}
};
</script>
<style scoped>
.content-left-top{
    display: flex;
    flex-flow: row;

}
p{
    margin: 0;
}
.content-left-center{
    text-align: left;
    font-size: .11rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
}
.content-left-top{
    height: .4rem;
}
.newsItem1{
    /* height: .8rem; */
    padding: 0;
    display: flex;
    flex-direction: row;
    background: rgb(255, 255, 255);
    padding: 10px 0px;
    /* border-bottom: 1px solid #ccc; */
    position: relative;
}
</style>


