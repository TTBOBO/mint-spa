<template>
  <div>
      <scroll>
          <ul class="content">
            <li v-for="(item,index) in items" :key="index" :data-id="'item-'+(index)">
                <img :src ="item" style="width:100%" />
                </li>
            </ul>
      </scroll>
  </div>
</template>

<script>
import scroll from './scrollView1';
export default {
    data(){
        return {
            items: [
               './static/img/banner1.jpg',
               './static/img/banner2.jpg',
              './static/img/banner3.jpg',
            ],
        }
    },
    methods: {
        
    },
    components: {
        scroll
    }
}
</script>

<style>
.wrapper {
  /* position: absolute; */
  width: 100%;
  min-height: 1px;
  overflow: hidden;
  padding: 0px;
  position: relative;
}
.content {
  padding: 0px;
  margin: 0px;
  display: block;
}
.content li {
  list-style: none;
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
</style>
