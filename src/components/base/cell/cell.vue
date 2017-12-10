<template>
  <div>
       <mt-cell :title="data.title" class="mint-cell-text" :label="data.label"  is-link>
        <span>{{data.span}}</span>
            <!-- <img v-show="data.imgState" slot="icon" :src="data.img"  width="24" height="24"> -->
            <!-- <span  slot="icon" class="icon"></span> -->
        </mt-cell>
  </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default:function() {
               return  {
                    title:'13221',
                    label:'111',
                    img:"../assets/100x100.png",
                    imgState:true,
                    span:''
                }
            }
        }
    },
    data() {
        return {
            bgcolor:'red'
        }
    },
    methods: {
        back () {
            this.$emit('back')
        }
    },
}
</script>
<style>
.icon{
    width: 24px;
    height: 24px;
}
.mint-cell-title{
       text-align: left;
       vertical-align: middle;
}
</style>


