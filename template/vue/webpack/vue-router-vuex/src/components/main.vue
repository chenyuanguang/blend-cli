<template>
  <main>
    <h2>
         采用webpack+babel+es6+vue+vue-router+esLint+mockjs搭建项目架构；
        具备线上线下基本的打包测试工具
    </h2>
    <div>
        <p>vuex中展示的num:{{num}}</p>
        <button @click='add'>增加全局数据num</button>
    </div>
  </main>
    
</template>
<script>
import {mapActions,mapState}  from 'vuex';
import {ADDNUM} from '../store';
export default {
    methods:{
        ...mapActions([
            ADDNUM
        ]),
        add(){
            this[ADDNUM](2);
        }
    },
    computed:{
        ...mapState({
            num(state){
                return state.num;
            }
        })
    }
};
</script>
<style scoped>
 main{
      padding:20% 0;
   text-align:center;
}
</style>
