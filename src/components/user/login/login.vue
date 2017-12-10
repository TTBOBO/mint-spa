<template>
  <div>
      <header-bar :text="title" :left="left"></header-bar>
      <div class="content"></div>
        <div class="nav">
        <mt-navbar class="page-part" :selected.sync="selected" ref="navbar">
            <mt-tab-item id="1" class="nabarBav active"  @click.native.prevent="active = 'tab-container1'">登录</mt-tab-item>
            <mt-tab-item id="2" class="nabarBav "  @click.native.prevent="active = 'tab-container2'">注册</mt-tab-item>
            <div class="line" :style="{left:linePos+'%'}"></div>
        </mt-navbar>
        </div>  
        
        <div class="page-tab-container">  
            <mt-tab-container class="page-tabbar-tab-container" style="height: 100%;position: absolute;left: 0;right: 0; top: 96px; bottom: 0;" v-model="active" swipeable>  
                <mt-tab-container-item id="tab-container1">  
                    <div id="signIn">
                        <mt-field class="label" label="用户名" placeholder="请输入用户名"></mt-field>
                        <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
                        <div style="margin:20px 10%;width:80%;"><mt-button @click="signIn" type="primary" size="large">登陆</mt-button></div>
                    </div>
                </mt-tab-container-item>  
                <mt-tab-container-item id="tab-container2">  
                    <div id="signIn">
                        <mt-field class="label" label="用户名" placeholder="请输入用户名"></mt-field>
                        <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
                         <mt-field label="确认" placeholder="请输入确认密码" type="password"></mt-field>
                        <div style="margin:20px 10%;width:80%;"><mt-button @click="register" type="primary" size="large">注册</mt-button></div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>  
        </div>
  </div>
</template>

<script>
import headerBar from "../../base/headerbar/headerbar";
export default {
  data() {
    return {
      title: "登录",
      active: "tab-container1",
      selected: "2",
      linePos: 0,
      left: {
        status: true
      },
      login:{
          username:"",
          password:"",
      },
      reg:{
            username:"",
            password:"",
            spassword:""
      }
    };
  },
  components: {
    headerBar
  },
  methods: {
    signIn() {
        console.log();
    },
    register() {

    }
  },
  moundted() {},
  created() {},
  watch: {
    active: function(val, oldVal) {
      //改变节点的选中状态  和   line的位置
      this.linePos = (parseInt(val.replace(/tab-container/, "")) - 1) * 50;
      this.$refs.navbar.$children[
        parseInt(val.replace(/tab-container/, "")) - 1
      ].$el.className =
        "mint-tab-item nabarBav active";
      this.$refs.navbar.$children[
        parseInt(oldVal.replace(/tab-container/, "")) - 1
      ].$el.className =
        "mint-tab-item nabarBav";
      this.title = this.$refs.navbar.$children[
        parseInt(val.replace(/tab-container/, "")) - 1
      ].$el.innerText;
    }
  }
};
</script>

<style scoped>
.content{
  margin-top: 40px;
}
.item {
  display: inline-block;
}

.link {
  color: inherit;
  padding: 20px;
  display: block;
}
.page-part {
  position: relative;
}
.page-part .line {
  content: "";
  position: absolute;
  width: 50%;
  bottom: 0px;
  height: 2px;
  left: 0px;
  background: #26a2ff;
  transition: 0.2s ease;
}
#signIn {
    /* width: 90%; */
    margin: 20px auto;
}
.mint-cell-titl{
    width: 80px !important;
    text-align: left;
}
</style>



