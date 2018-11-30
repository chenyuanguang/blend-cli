<template>
  <div id="conditions">
    <h3>订单列表</h3>
    <div class="export">
       <el-button>物流信息批量导出</el-button>
       <el-button>订单数据导出</el-button>
    </div>
    <div class="status">
      <span>订单状态</span>
      <el-select v-model="value1" placeholder="请选择" :change=getStatus(value1)>
        <el-option
          v-for="item in options_order"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <span>收货城市</span>
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>优惠方式</span>
      <el-select v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options_preferential"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>支付时间</span>
        <el-date-picker
          class="mr-20"
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      <span>发货商家</span>
      <el-input
        class="ipt"
        placeholder="请输入内容"
        v-model="input10"
        clearable> 
      </el-input>
      <el-button>搜索</el-button>
      <span>关键字</span>
      <el-input
        class="ipt"
        placeholder="请输入内容"
        v-model="input11"
        clearable> 
      </el-input>
      <el-button>搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conditions",
  data() {
    return {
      options_order: [
        {
          value: 0,
          label: "未支付"
        },
        {
          value: 1,
          label: "支付失败"
        },
        {
          value: 2,
          label: "支付中"
        },
        {
          value: 3,
          label: "审核失败"
        },
        {
          value: 4,
          label: "已发货"
        },
        {
          value: 5,
          label: "交易成功"
        },
        {
          value: 6,
          label: "已取消"
        },
        {
          value: 7,
          label: "拒收退货中"
        },
        {
          value: 8,
          label: "退款中"
        },
        {
          value: 9,
          label: "已退款"
        },
      ],
      options_preferential: [
        {
          value: 0,
          label: "优惠卷"
        },
        {
          value: 1,
          label: "折扣"
        },
        {
          value: 2,
          label: "会员卡"
        }
      ],
      options: [
        {
          value: 0,
          label: "北京"
        },
        {
          value: 1,
          label: "上海"
        },
        {
          value: 2,
          label: "深圳"
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '', //选中的时间
        value7: '',
        input10: '',
        input11: ''
    };
  },
  methods: {
    getStatus(arg) {
      let n = this.options_order[arg] && this.options_order[arg].label;
      console.log(n);
    }
  }
};
</script>

<style scoped>
  h3 {
    text-align: left;
    margin-bottom: 20px;
  }
  .export {
    text-align: left;
    margin-bottom: 20px;
  }
  .status {
    text-align: left;
    margin-bottom: 20px;
  }
  .status span {
    margin-right: 20px;
  }
  .status .el-select {
    width: 100px;
    margin-right: 20px;
  }
  .mr-20 {
    margin-right: 20px;
  }
  .ipt {
    width: 120px;
  }
</style>
