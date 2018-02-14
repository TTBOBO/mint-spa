<template>
  <div>
        <div  v-if="!seeAll">
            <div class="feed-list" v-for="(item, index) in zanList" :key="index" v-if="index < 2">
                <div class="feed-list-left">
                    <img :src="item['hm_member.face']" class="user-avtor">
                </div>

                <div class="feed-list-right">
                    <div class="list-right-top">
                        <div class="feed-info">
                            <span class="user-name">{{item['hm_member.uname']}}</span>
                            <span class="feed-time">{{item['hm_feedback.dtime'] | getNowTime}}</span>
                        </div>
                        <div class="zan-con">
                            <span class="iconfont" @click="clickZan(item,index)" :class="{'icon-zantongfill':isZan(item['hm_feedback.good']),zanColor:isZan(item['hm_feedback.good']),'icon-zantong':!isZan(item['hm_feedback.good'])}"></span>
                            <span class="zan-num">{{item['hm_feedback.good'].split(',').length}}</span>
                        </div>
                    </div>
                    <div class="list-right-bottom">{{item['hm_feedback.content']}}</div>
                </div>
            </div>
        </div>
        <div  v-else>
            <div class="feed-list" v-for="(item, index) in zanList" :key="index" >
                <div class="feed-list-left">
                    <img :src="item['hm_member.face']" class="user-avtor">
                </div>

                <div class="feed-list-right">
                    <div class="list-right-top">
                        <div class="feed-info">
                            <span class="user-name">{{item['hm_member.uname']}}</span>
                            <span class="feed-time">{{item['hm_feedback.dtime'] | getNowTime}}</span>
                        </div>
                        <div class="zan-con">
                            <span class="iconfont" @click="clickZan(item,index)" :class="{'icon-zantongfill':isZan(item['hm_feedback.good']),zanColor:isZan(item['hm_feedback.good']),'icon-zantong':!isZan(item['hm_feedback.good'])}"></span>
                            <span class="zan-num">{{item['hm_feedback.good'].split(',').length}}</span>
                        </div>
                    </div>
                    <div class="list-right-bottom">{{item['hm_feedback.content']}}</div>
                </div>
            </div>
        </div>
         <div class="seeMore" @click="HandleseeAll"  v-if="!seeAll && zanList.length >= 2">查看全部评论</div>
        
  </div>
</template>
<script>
import util from '../../assets/js/util';
import ykp from '../../assets/js/ykp';
export default {
  data() {
    return {
      
    };
  },
  props: {
    seeAll: {
      type: Boolean,
      default: false
    },
    zanList:{
      type:Array,
      default: function() {
        return [];
      }
    }
  },
  filters:{
    getNowTime(time,status){
      return util.time.TimeDifference(time);
    },
  },
  methods: {
    isZan(zanList) {
      if(!zanList){
        return false;
      }
      return zanList.split(",").indexOf("1") != -1;
    },
    /**
     * 点赞
     */
    clickZan(item, index) {
      var userInfo =JSON.parse(ykp.getLocalStorage('userInfo'));
      if(!userInfo){
        this.$router.push("/login");
        this.$store.dispatch("getPop", { text: "请登录！" });
      }else{
        this.$ajaxPost('/hmapi/article/api_article_feedback/article_click',{
          mid:JSON.parse(ykp.getLocalStorage('userInfo')).mid,
          id:item['hm_feedback.id']
        }).then(res => {
        this.$store.dispatch("getPop", { text: res.data.status == 2 ? "点赞成功" : "取消成功" });
        this.$emit('changeZan');
        })
      }
     
    },
    HandleseeAll() {
      this.$emit('HandleseeAll');
      // this.$router.next({
      //   path: "/allFeed",
      //   query: { id: 1 }
      // });
    }
  },
  mounted() {},
  created () {
  }
};
</script>

