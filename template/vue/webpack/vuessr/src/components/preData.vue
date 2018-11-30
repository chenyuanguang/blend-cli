<template>
  <main>
    <h2>
       预取数据，接口数据展示
    </h2>
    <ul>
        <li v-for="(item, index) in listData" :key="index">
        {{item.id}}----{{item.name}}
        </li>
    </ul>
    
  </main>
    
</template>
<script>
import {mapActions,mapState}  from 'vuex';
import {PREDATA} from '../store';
export default {
    title:"preData",
    asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        console.log(PREDATA)
        console.log(store.dispatch(PREDATA))
        return store.dispatch(PREDATA)
    },
    
    computed:{
        ...mapState({
            listData(state){
                return state.listData;
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
