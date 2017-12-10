<template>
    <div>
        <header-bar :text="title" :left="left"></header-bar>
        <keep-alive>
            <router-view class="height"></router-view>
        </keep-alive>
    </div>
</template>
<script>
import headerBar from "@/components/base/headerbar/headerbar";
export default {
  data() {
    return {
      title: "商品列表",
      left: {
        status: true
      }
    };
  },
  components:{
    headerBar   
  },
  methods: {},
  mounted() {},
  created() {},
  computed: {
    
  }
};
</script>
<style scoped>
.content-wrapper {
  width: 100%;
  height: 140px;

  background: gray;
}
.height {
  height: 500px;
}
</style>


