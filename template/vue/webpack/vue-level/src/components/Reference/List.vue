<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      size="small"
      style="width: 100%">
      <el-table-column
        v-for="(value, key) in tableHead"
        :key="key"
        :prop="key"
        :label="value[0]"
        :width="value[1]">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Reference } from '@/assets/data/moduleList.js'
export default {
  data() {
    return {
      tableHead: Reference,
      tableData: [
        {
          name: 'zs',
          date: '2018-6-18',
          address: '北京',
          id: 0
        },
        {
          name: 'ls',
          date: '2018-6-19',
          address: '上海',
          id: 1
        },
        {
          name: 'ww',
          date: '2018-6-20',
          address: '深圳',
          id: 2
        },
      ]
    }
  },
  props: ["data", "loading"],
  components: {}
};
</script>

<style>
  .el-table th {
    text-align: center;
  }
  .el-main {
    line-height: 40px;
  }
</style>
