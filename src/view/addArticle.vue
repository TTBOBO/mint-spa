<template>
  <div>
       <header-bar :left = "left"  :text="title" :right="right" @rightClick="add" > </header-bar>
       <div class="container" style="margin-top:.4rem;">
        <div class="page-part " style="position:relative">
            <mt-field  v-model="article.title" placeholder="请输入标题" :attr="{ maxlength: 10 }"></mt-field>
            <mt-field v-model="article.content" placeholder="请输入正文" type="textarea"  rows="10" :attr="{ maxlength: 300}"></mt-field>
            <span class = "max-num">{{curNum}}<span></span>/300字</span>
        </div>
       </div>
  </div>
</template>
<script>
import headerBar from "../components/base/headerbar/headerbar";
import ykp from "../assets/js/ykp";
export default {
  data() {
    return {
      title: "",
      right: {
        status: true,
        text: "发布"
      },
      left: {
        status: true,
        icon: "back"
      },
      article:{
          title:"",
          content:""
      },
      addStatus:false, //添加状态
      curNum:0
    };
  },
  methods: {
    add() {
        if(this.article.title && this.article.content){
          let data = {
            name:this.article.title,
            description:this.article.content,
            member:JSON.parse(ykp.getLocalStorage("userInfo")).mid
          };
          
          this.$ajaxPost("/hmapi/article/api_article/user_add_article", data).then( res => {
            if(res){
              this.$store.dispatch("getPop", { text: "发布成功" });
              this.$router.back();
            }else{
              this.$router.back();
            }
            
          });
            
        }
    }
  },
  mounted() {},
  created() {},
  components: {
    headerBar
  },
  computed: {},
  watch: {
    "article.title"(cur) {
        this.article.title = cur;
        if(cur && this.article.content){
            this.addStatus = true;
        }
    },
    "article.content"(cur) {
        this.article.content = cur;
        this.curNum = cur.length;
        if(cur && this.article.title){
            this.addStatus = true;
        }
    }
  }
};
</script>

<style>
@import "../assets/css/news.css";
.page-part::after{
    position: absolute;
    content: "";
    width: 100%;
    height: .01rem;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.1);
    transform: scaleY(.2);
}
</style>

