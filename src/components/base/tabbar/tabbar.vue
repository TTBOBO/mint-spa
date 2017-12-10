<template>
  <div>
        <mt-tabbar fixed  v-model="selected" ref="tab">
             <mt-tab-item v-for=" (item,index) of navbar"  :id="index" :key="index"  :class="item.active?'active':''">
                 <img slot="icon" :src="item.active?item.active_icon:item.icon">
                {{item.title}}
            </mt-tab-item>
        </mt-tabbar>
  </div>
</template>
<<script>

export default {
    data() {
        return {
            selected:"0",
            navbar:[{
                    title: '首页',
                        name: '/',
                        icon:'/static/img/home.png',
                        active_icon:'/static/img/home_fill.png',
                        active:true
                    },{
                    title: '发现',
                    name: 'find',
                    icon: '/static/img/creative.png',
                    active_icon: '/static/img/creative_fill.png',
                    active:false
                    },{
                    title: '购物车',
                    name: 'cart',
                    icon: '/static/img/cart.png',
                    active_icon: '/static/img/cart_fill.png',
                    active:false
                    },{
                    title: '我的',
                    name: 'user',
                    icon: '/static/img/people.png',
                    active_icon: '/static/img/people_fill.png',
                    active:false
                }]
        }
    },
    methods:{
        
    },
    watch: {
        //当前选中值   新值   上一个值
        selected: function (val, oldVal) {
            this.navbar.forEach((item,index) => {
                if(index != val) {
                    item.active = false;
                }else{
                    item.active = true;
                }
            })
            if(oldVal > val){
                this.$router.goto( this.navbar[val].name,true)
            }else{
                this.$router.goto(this.navbar[val].name)
            }
        },
        $route(to, from, next) {
            //判断路由  是首页的几个路由时  改变tabbar选中状态
            this.navbar.forEach((item,index) => {
                if(to.name == 'index' && to.path == '/') {
                    this.navbar[0].active = true;
                    this.selected = '0';
                }else {
                    item.active = false;
                }
                if(to.name == item.name) {
                    item.active = true;
                    this.selected = index;
                }else{
                    item.active = false;
                }
            })
        }
    }
}
</script>
<style>
.mint-tabbar > .mint-tab-item.is-selected{
    background: transparent;
}
.mint-tabbar{
    color: #848282;
}
.active{
    color: #1296db;
}
</style>


