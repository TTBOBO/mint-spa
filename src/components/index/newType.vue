<template>
  <div style="display: inline-block; width:100%;">
        <div v-if="!draggableStatus">
            <div  style="width:25%; text-align:center;float: left;" v-for="(item,index) of data" :key="index" v-if="data.length > 0">
                <div class="item-con" @click="getItem(item,index)">
                    <span>{{item.title}}</span>
                    <span class="iconfont icon-guanbi2" @click="deleteItem(item,index)" v-if="del"></span>
                </div>                   
            </div>
        </div>
        
        <div v-else>
            
            <draggable v-model="dataArr" :options="{animation:300,ghostClass:'ghost-Class',dragClass:'ghost-Class'}" :move="getdata" @update="datadragEnd">
                <transition-group>
                    <div  style="width:25%; text-align:center;float: left;" v-for="(item,index) of dataArr" :key="index" v-if="data.length > 0">
                        <div class="item-con" @click="getItem(item,index)">
                            <span>{{item.title}}</span>
                            <span class="iconfont icon-guanbi2" @click="deleteItem(item,index)" v-if="del"></span>
                        </div>                   
                    </div>
                </transition-group>
            </draggable>
</draggable>
        </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      dataArr: [],
      tags: [
        {
          id: "1",
          name: "test2"
        },
        {
          id: "1",
          name: "test3"
        },
        {
          id: "1",
          name: "test4"
        },
        {
          id: "1",
          name: "test5"
        }
      ]
    };
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    del: {
      type: Boolean,
      default: false
    },
    draggableStatus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([
          "TARGETLIST"
    ]),
    deleteItem(item, index) {
      this.$emit("deleteItem", { item, index });
    },
    getItem(item, index) {
      this.$emit("getItem", { item, index });
    },
    getdata(evt) {},
    datadragEnd(evt) {
      this.$store.commit('TARGETLIST',this.dataArr);
    },

  },
  components: {
    draggable
  },
  created() {
    this.dataArr = this.data;
    // this.stopEvent();
    //   console.log(draggable);
  }
};
</script>
<style>
@import "../../assets/css/news.css";
.ghost-Class{
    color: #000;
}
</style>

