<template>
  <div>
      <div class="cell-list"  v-if="data.type != 'custom'">
           <mt-cell-swipe 
                v-for="(item, index) of data.data" :key="index" v-if="item.type != 'del' && item.type != 'custom'"
                :title="item.title"
                is-link
                :to="item.link"
            >
            <i slot="icon" :class="item.icon" :style="{color:item.color}" class="icon "></i>
            </mt-cell-swipe>
            <mt-cell-swipe v-else-if="item.type == 'del'  "
                :title="item.title"
                :right="rightBtn">
                <slot name="content"></slot>
                <i slot="icon" :style="{color:color}" class="icon "></i>
            </mt-cell-swipe>
            
      </div>
      <div v-else>
          <mt-cell-swipe :right="rightBtn">
                <slot ></slot>
            </mt-cell-swipe>
      </div>
      
  </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default: function() {
                return {
                    data:[{
                        title:'',
                        link:'',
                        icon:'',
                        type:'',
                        color:"red"
                    }],
                    type:{
                        type:null,
                        default:""
                    },
                   
                }
            }
        },
        index:{
            type:Number,
            default:null
        },
    },
    data() {
        return {
            rightBtn:[]
        }
    },
    methods:{
        leftButtonHandler(evt) {  
            // this.$emit('delList')
        },
        del(item,index) {
            //  this.$emit('delList');
            console.log( item,index);
             this.$messagebox('delete');
        }
    },
    created() {
        this.rightBtn = [{
          content: '取消',  
          style: { background: 'lightgray', color: '#fff' ,display:"flex","align-items": "center",float:"left"}  
        }, {  
          content: '删除',  
          style: { background: 'red', color: '#fff' ,display:"flex","align-items": "center",float:"left"},  
          handler: () => {
            this.$emit('del',{
                index:this.index,
                name:"del"
            });
          },
        }
      ];  
    },
}
</script>
<style>
.icon {
    display: inline-block;
    font-size: 16px;
    line-height: 35px;
}
.mint-cell-title{
    text-align:left;
}
.mint-cell-text {
    font-size: 14px;
}
.cell-list{
    position: relative;
    margin: .05rem 0;
}
.cell-list::before{
    position: absolute;
    top: 0;
    left:0 ;
    content: "" !important;
    z-index: 1;
    width:100%;
    height: .01rem;
    background: #f7f7f7 !important;;
}
.cell-list::after{
    position: absolute;
    bottom: 0;
    left:0 ;
    content: "" !important;
    width:100%;
    height: .01rem;
    background: #f7f7f7 !important;;
}
.mint-cell::after{
    position: absolute;
    bottom: 0;
    left:.1rem ;
    content: "" !important;
    width:100%;
    height: .01rem;
    background: #f7f7f7 !important;;
}
.cell-list .mint-cell:last-child::after{
     height: 0rem;
}
</style>
