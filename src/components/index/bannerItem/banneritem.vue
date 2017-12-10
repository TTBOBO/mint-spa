<<template>
  <div>
        <div class="bannerBar">
            <div class="ItemView" v-for = "(item ,index) in barItem">
                <div @click="gotoGoods(index)"  class="iconBox" :style="{'background': item.color}">
                
                </div>
                <div class="itemCon"> {{item.title}}</div>
            </div>
        </div>
  </div>
</template>
<<script>
export default {
    data() {
        return{
            barItem:[{
                title:'美食',
                icon:'',
                color:"#7e57c2",
                linkTo:'/goodsDetail'
            },{
                title:'美食1',
                icon:'',
                color:"#26c6da",
                linkTo:'/food'
            },{
                title:'美食2',
                icon:'',
                 color:"#e5c67a",
                linkTo:'/goodsDetail'
            },{
                title:'美食3',
                icon:'',
                 color:"#e5c67a",
                linkTo:'/goodsDetail'
            },{
                title:'美食4',
                icon:'',
                 color:"#26c6da",
                linkTo:'/goodsDetail'
            },{
                title:'美食5',
                icon:'',
                 color:"#f07887",
                linkTo:'/goodsDetail'
            },{
                title:'美食6',
                icon:'',
                 color:"#26c6da",
                linkTo:'/goodsDetail'
            },{
                title:'美食7',
                icon:'',
                color:"#00ff00",
                linkTo:'/goodsDetail'
            }]
        }
    },
    methods:{
        gotoGoods(index) {
            this.$router.goto(this.barItem[index].linkTo);
        }
    }
}
</script>

<style>
.bannerBar{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px 0px;
    padding-top: 150px
}
.ItemView{
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
}
.iconBox{
    width: 50px;
    height: 50px;
    border-radius: 50px;
}
.itemCon{
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
</style>


