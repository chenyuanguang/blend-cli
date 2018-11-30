<template>
  <el-container>
    <el-aside width="auto">
      <Menus />
    </el-aside>
    <el-container>
      <el-header>
        <TopMenu />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menus from './Common/menus'
import TopMenu from './Common/topMenu'
export default {
  name: 'Home',
  components: {
    Menus,
    TopMenu
  }
}
</script>
<style>
.el-header, .el-footer {
  background-color: blue;
  color: #fff;
  text-align: center;
  line-height: 60px;
  background-color: #207fde;
  box-shadow: 0 0 1px 1px rgba(0,0,0,.14);
}

.el-aside {
  background: #324157;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
