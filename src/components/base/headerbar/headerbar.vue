<template>
  <div>
       <mt-header fixed :title="text" :class="bgcolor">
            <div slot="left" v-show="left.status">
                <mt-button @click="back"  icon="back">{{left.text}}</mt-button>
            </div>
            <mt-button slot="right" v-show="right.status"  icon="back">{{right.text}}</mt-button>
        </mt-header>
  </div>
</template>
<script>
export default {
    props:{
        text: {
            type: String,
            default: ''
        },
        left:{
            type:Object,
            default:function() {
               return  {
                    status:false,
                    text:"返回"
                }
            }
        },
        right:{
            type:Object,
            default: function() {
                return {
                    status:false,
                    text:"更多"
                }
            }
        },
        icon:""
    },
    data() {
        return {
            bgcolor:'red'
        }
    },
    methods: {
        back () {
            this.$router.back();
            this.$emit('back');
        }
    },
}
</script>
<<style>

.red {
    /* background:red; */
}
</style>


