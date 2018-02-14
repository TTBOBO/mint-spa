<template>
  <div>
      {{globel.text}}
      <mt-popup
        position="top"
         v-model="globel.pop.showPop"
         :modal="true"
         class="mint-popup-2"
         style="background-color: rgba(0,0,0,.7) !important;"
    >
         <p class="pop-content">{{globel.pop.text}}</p>
        </mt-popup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  data(){
      return {
          showPop:false
      }
  },
  props:{
      text:{
          type:String,
          default:"123132"
      },
     show:{
         type:Boolean,
        default:false
     }
  },
  computed:{
      ...mapState([
          "globel"
      ])
  },

  methods:{
      ...mapMutations([
            'SHOWPOP',
        ]),
        test() {
            
        }
  },
  created() {
      setTimeout(() => {
          this.test();
      },200) 
      this.showPop = this.show;
    //   this.$store.commit('SHOWPOP')
    //   this.SHOWPOP();
  },
  watch: {
      showPop(val) {
        if (val) {
          setTimeout(() => {
            this.showPop = false;
          }, 2000);
        }
      }
  }
}
</script>
<style>
.mint-popup-2 {
        width: 100%;
         height: 40px;
        text-align: center;
        
        backface-visibility: hidden;
      }
.mint-popup-2 p {
    line-height: 40px;
    color: #fff;
    font-size: .12rem;
    margin: 0px;
}

</style>


