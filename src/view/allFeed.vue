<template>
  <div>
      <div class="article-main">
       <div class="article-header">
          <div class="article-title">title</div>
          <div class="article-header-bottom">
            <span>2018-01-27 16:59:53</span>  <span>新闻</span>
          </div>
        </div>
        <allFeed :seeAll="seeAll"></allFeed>
      </div>
  </div>
</template>
<script>
import allFeed from '../components/find/feed'
export default {
  data(){
      return{
          title:"dsadasdsadsadsadsadsadasdsadsadasdasdasda",
          zanList:[{
                username:"123",
                time:"2017-12-13",
                pic:"/static/img/banner3.jpg",
                content:"根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
                count:"123",
                znapeople:"1,2,3,45,77"
            },{
                username:"456123",
                time:"2017-12-13",
                pic:"/static/img/banner1.jpg",
                content:"111根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
                count:"123",
                znapeople:"3,2,3,45,77"
            },{
                username:"456123",
                time:"2017-12-13",
                pic:"/static/img/banner1.jpg",
                content:"111根据中央气象台的预报，1月27日至2月3月3日，受频繁南下的冷空气影响，日，受频繁南下的冷空气影响，中东部地区自北向南气温还将有所下降，并继续维持偏低状态。新华社北京1月27日电 与北京市民苦盼下雪而不得相反，月3日，受频繁南下的冷空气影响，",
                count:"123",
                znapeople:"2,3,45,77"
            }],
            seeAll:true
            
      }
  },
  method:{
  },
  components: {
      allFeed
  }
}
</script>

