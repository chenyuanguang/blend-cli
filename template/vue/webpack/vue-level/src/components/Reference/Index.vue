<template>
  <div id="Account">
    <Conditions />
    <AccountList :data="data" :loading="loading" />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrent"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="30">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Conditions from "./Conditions";
import AccountList from "./List";
export default {
  name: "List",
  components: {
    AccountList,
    Conditions
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
      this.changeConditions({
        pageSize: val
      });
      this.initList();
    },
    handleCurrent(cur) {
      this.changeConditions({
        pageIndex: cur
      });
      this.initList();
    },
    ...mapActions({
      initList: "AccountList/initList",
      changeConditions: "AccountList/setConditions"
    })
  },
  computed: {
    ...mapState({
      data: state => state.AccountList.data,
      loading: state => state.AccountList.loading
    })
  },
  mounted() {
    this.initList();
  }
};
</script>
<style scoped>
</style>
