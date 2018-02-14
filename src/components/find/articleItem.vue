<template>
  <div>
       <mt-loadmore 
                id="loadmore"
                style="font-size:12px;"
                ref="loadmore"
                :top-method="loadTop" 
                :bottom-method="loadBottom"
                :top-status.sync="topStatus"
                topPullText="下拉刷新"
                :bottomDistance="bottomDistance"
                :topDistance="topDistance"
				@bottom-status-change="handleBottomChange"
            >
            <div class="newsCon"   ref="newsCon">
                <articleCom :newsList="newsList"></articleCom>  
            </div>
        </mt-loadmore>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import articleCom from './articleCom'
export default {
    data(){
        return {
            swipeList:{
                data:[],
            },
            topStatus:false,
            bottomStatus :false,
            bottomDistance:60,
            topDistance:60,
            wrapperHeight:0,
            startUp:false,
            newsList:[],
            height:0,
            bottom:0,
            pageObj:{
                page:1,
                limit:3,
                filter:"",
                order:""
            }
        }
    },
    props: {
        articleType:{
            type:Number,
            default:1
        }
    },
    components: {
        articleCom
    },
    computed: {
        
    },
    methods:{
        articleInfo(id) {
            this.$router.next({
                path:"/articleInfo",
                query: {id:id} 
            })
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
            this.startUp = true;
        },
        loadTop() {
            Indicator.open({
                // text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
               
                this.initPage();
            },1000);
        },
        loadMore() {
            this.loadData();
        },
        loadBottom() {
             Indicator.open({
                // text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                this.startUp = false;
                this.pageObj.page += 1;
                this.initPage(this.pageObj.page);
                let child =this.$refs.newsCon.children;
                let h = 0;
                setTimeout(() => {
                     for(var i = 0; i < child.length; i++) {
                        h += child[i].children[0].clientHeight;
                     }
                     this.height =  h;
                 }, 100);
            },1000)
        },
        /**@augments page 页数   不传  默认1  传就是当前页 */
        initPage(page){
            this.pageObj.page = page ? page : 1;
            this.$ajaxPost('/hmapi/article/api_article/grid',this.pageObj).then(res => {
                if(res.data.rows.length == 0) {
                    this.$store.dispatch("getPop", { text: "没有更多了" });
                     page ? this.$refs.loadmore.onBottomLoaded()  : this.$refs.loadmore.onTopLoaded();
                    Indicator.close();
                    return false;
                }
                page ? this.newsList.push(...res.data.rows) : this.newsList = res.data.rows;
                setTimeout(() => {
                    Indicator.close();
                    page ? this.$refs.loadmore.onBottomLoaded()  : this.$refs.loadmore.onTopLoaded();
                    this.height = document.querySelector('.container').clientHeight;
                }, 20);
            })
        }
    },
    mounted(){
        // this.height = document.querySelector('.container').clientHeight;
    },
    created(){
        this.initPage();
    },
    watch:{

    }
}
</script>

<style>
@import '../find/news.css';
.mint-loadmore-bottom{
    margin-bottom: 0px;
}
</style>
