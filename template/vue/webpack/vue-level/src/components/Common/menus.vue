<template>
  <div class="menus">
    <div class="menus-tit">
      WE ORDER
    </div>
    <el-menu
      router
      background-color="#324157"
      text-color="#fff"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
      <el-submenu v-for="(item, key) in menus" :index="item.menuName" :key="key">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.menuName}}</span>
        </template>
        <el-menu-item v-for="(i, k) in item.childMenu" :key="k" :index="i.menuName" :route="i.route">
          {{i.menuName}}
        </el-menu-item>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import { getCompetence } from '@/api/App'
export default {
  data() {
    return {
      isCollapse: false,
      menus: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    bus.$on('setCollapse', () => {
      this.isCollapse = !this.isCollapse
    })
    fetch('http://localhost:3000/api/getCompetence')
    .then(res => res.json())
    .then((json) => { 
      setTimeout(() => {
        this.menus = JSON.parse(json.result.permissions)
      }, 0);
     })
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    border:none;
  }
  .menus-tit{
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 0 2px #000;
    color: #fff;
    margin-bottom: 10px;
  }
</style>
