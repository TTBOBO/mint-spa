<template>
  <div>
       <mt-cell-swipe 
            v-for="(item, index) of data.data" :key="index"
            v-if="item.type != 'del'"
            :title="item.title"
            is-link
            :to="item.link"
       >
        <i slot="icon" :class="item.icon" :style="{color:item.color}" class="icon "></i>
        </mt-cell-swipe>
        <mt-cell-swipe v-else
            :title="item.title"
            :right="rightBtn">
            <i slot="icon" :style="{color:color}" class="icon "></i>
        </mt-cell-swipe>
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
                    }]
                }
            }
        }
    },
    data() {
        return {
            rightBtn:''
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
             console.log( this.$emit(''));
        }
    },
    created() {
        this.rightBtn = [{
          content: '取消',  
          style: { background: 'lightgray', color: '#fff' }  
        }, {  
          content: '删除',  
          style: { background: 'red', color: '#fff' },  
          handler: () => {
            console.log(this)
          },
        }, {  
          content: '更多',  
          style: { background: 'red', color: '#fff' },  
          handler: () => {
            console.log(this)
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
</style>
