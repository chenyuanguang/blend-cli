<template>
  <header class="head">
    <i @click="handerClick" class="el-icon-circle-plus"></i>
    <h5 class="head-tit">
      home / {{title}}
    </h5>
    <span class="logout">退出</span>
  </header>
</template>

<script>
import bus from '@/utils/bus'
import { mapState } from 'vuex'
export default {
  methods: {
    handerClick() {
      bus.$emit('setCollapse')
    }
  },
  computed: {
    ...mapState({
      title: state => state.title
    })
  }
}
</script>
<style>
.el-icon-circle-plus{
  font-size: 30px;
  line-height: inherit;
  float:left;
}
.head{
  text-align: left;
}
.logout{
  float: right;
}
.head-tit{
  display: inline-block;
  margin-left: 25px;
  font-size: 16px;
}
</style>
