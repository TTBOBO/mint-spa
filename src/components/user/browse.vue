<template>
  <div>
      <header-bar :text="title" :left="left" ></header-bar>
      <div class="container" style="margin-top:.4rem; position:relative;overflow:hidden;">
          <loadDemo
                    @loadMore="changePage"
                    :pageObj="pageObj"
                    :isNoMore="isNoMore"
                    :header="header"
                    ref ="loadMore"
                   >
                   <articleCom @reloadPage="initPage" :newsList="newsList" :custom="custom"></articleCom> 
        </loadDemo>
      </div>
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar';
import swipe from '../base/cell/swipe';
import loadDemo from "../base/loadmore/loadDemo";
import articleCom from "../find/articleCom";
import ykp from "../../assets/js/ykp";
export default {
  data(){
      return{
        pageObj: {
            page: 1,
            limit: 3,
            filter: "",
            order: ""
        },
        isNoMore:false,
        params:{
            type:"custom"
        },
        title:"浏览的文章",
        left: {
            status: true,
            icon: "back"
        },
        width:0,
        newsList:[],
        custom:true,
        header:true
      }
  },
  methods:{
      changePage(objList){
           this.initPage(objList);
      },
      /**@augments page 页数   不传  默认1  传就是当前页 */
        initPage(page){
            this.pageObj.filter = "member_stow.mid="+JSON.parse(ykp.getLocalStorage('userInfo')).mid + " and member_stow.type = 3";
            this.$ajaxPost('/hmapi/article/api_collection/grid',this.pageObj).then(res => {
                if(res.data.rows.length == 0) {
                    this.$store.dispatch("getPop", { text: "没有更多了" });
                     this.isNoMore = true;
                }else{
                     this.pageObj.page == 1 ? this.newsList = res.data.rows  :  this.newsList.push(...res.data.rows);
                }
                setTimeout(() =>{
                    this.$refs.loadMore.forceUpdate(true);
                },300)
            })
        }
  },
  mounted () {
      this.initPage();
  },
  created () {
      
  },
  components: {
      swipe,
      loadDemo,
      headerBar,
      articleCom
  },
  computed: {
      
  }
}
</script>

