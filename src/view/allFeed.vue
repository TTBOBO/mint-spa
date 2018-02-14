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
import allFeed from '../components/find/feed';
export default {
  data(){
      return{
            
      }
  },
  method:{
  },
  components: {
      allFeed
  }
}
</script>

