<template>
  <div>
        <div  v-if="!seeAll">
            <div class="feed-list" v-for="(item, index) in zanList" :key="index" v-if="index < 2">
                <div class="feed-list-left">
                    <img :src="item.pic" class="user-avtor">
                </div>

                <div class="feed-list-right">
                    <div class="list-right-top">
                        <div class="feed-info">
                            <span class="user-name">{{item.username}}</span>
                            <span class="feed-time">{{item.time}}</span>
                        </div>
                        <div class="zan-con">
                            <span class="iconfont" @click="clickZan(item,index)" :class="{'icon-zantongfill':isZan(item.znapeople),zanColor:isZan(item.znapeople),'icon-zantong':!isZan(item.znapeople)}"></span>
                            <span class="zan-num">{{item.count}}</span>
                        </div>
                    </div>
                    <div class="list-right-bottom">{{item.content}}</div>
                </div>
            </div>
        </div>
        <div  v-else>
            <div class="feed-list" v-for="(item, index) in zanList" :key="index" >
                <div class="feed-list-left">
                    <img :src="item.pic" class="user-avtor">
                </div>

                <div class="feed-list-right">
                    <div class="list-right-top">
                        <div class="feed-info">
                            <span class="user-name">{{item.username}}</span>
                            <span class="feed-time">{{item.time}}</span>
                        </div>
                        <div class="zan-con">
                            <span class="iconfont" @click="clickZan(item,index)" :class="{'icon-zantongfill':isZan(item.znapeople),zanColor:isZan(item.znapeople),'icon-zantong':!isZan(item.znapeople)}"></span>
                            <span class="zan-num">{{item.count}}</span>
                        </div>
                    </div>
                    <div class="list-right-bottom">{{item.content}}</div>
                </div>
            </div>
        </div>
         <div class="seeMore" @click="HandleseeAll"  v-if="!seeAll && zanList.length >= 2">查看全部评论</div>
        
  </div>
</template>
<script>
export default {
  data() {
    return {
      zanList: [
        {
          username: "123",
          time: "2017-12-13",
          pic: "/static/img/banner3.jpg",
          content:
            "根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
          count: "123",
          znapeople: "1,2,3,45,77"
        },
        {
          username: "456123",
          time: "2017-12-13",
          pic: "/static/img/banner1.jpg",
          content:
            "111根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
          count: "123",
          znapeople: "3,2,3,45,77"
        },
        {
          username: "456123",
          time: "2017-12-13",
          pic: "/static/img/banner1.jpg",
          content:
            "111根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
          count: "123",
          znapeople: "2,3,45,77"
        }
      ]
    };
  },
  props: {
    seeAll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isZan(zanList) {
      return zanList.split(",").indexOf("1") != -1;
    },
    /**
     * 点赞
     */
    clickZan(item, index) {
      let Index = this.zanList[index].znapeople.split(",").indexOf("1");
      let arr = this.zanList[index].znapeople.split(",");
      if (Index == -1) {
        arr.push("1");
        this.zanList[index].znapeople = arr.join(",");
        this.$store.dispatch("getPop", { text: "点赞成功" });
      } else {
        arr.splice(Index, 1, "");
        this.zanList[index].znapeople = arr.join(",");
        this.$store.dispatch("getPop", { text: "取消成功" });
      }
    },
    HandleseeAll() {
      this.$router.next({
        path: "/allFeed",
        query: { id: 1 }
      });
    }
  },
  mounted() {}
};
</script>

