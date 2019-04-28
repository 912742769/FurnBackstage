
<template>
  <!-- 订单修改审核 -->
  <div class="ordermodify">
    <div class="oder-title-box">
      <span class="oder-title">订单修改处理</span>
      <el-input v-model="search" size="small" placeholder="输入订单编号搜索" clearable/>
    </div>

    <el-table :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)" style="width: 100%">
      <el-table-column align="center" label="订单号" prop="ornumber"></el-table-column>
      <el-table-column align="center" label="订单状态" prop="ordeal"></el-table-column>
      <el-table-column align="center" label="新配送信息" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>收件人: {{ scope.row.orrealname }}</p>
            <p>电话: {{ scope.row.ortelphone }}</p>
            <p>收件地址: {{ scope.row.oraddress }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.orrealname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center" prop="oramount"></el-table-column>
      <el-table-column label="实付金额" align="center" prop="orpayaount"></el-table-column>
      <el-table-column width="170" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="adoptBtn(scope.row.ornumber)">同意</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ordermodify",
  data() {
    return {
      pageSize: 2, // 每页大小默认值
      pageIndex: 1, // 默认第一页
      search: "",
      tableData: []
    };
  },
  created() {
    this.handleUserList()
  },
  methods: {
    adoptBtn(index) {
      let that = this;
      let data = 'ornumber='+index
      that.$http
        .post("/manager_goods_order_exchange", data)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            that.$router.push("/home/ordermodify");
          }
        })
        .catch(err => {
          console.log(err);
          alert("出错");
        });
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    handleUserList() {
      let that = this;
      that.$http
        .post("/manager_goods_order_querychange", {
          // staffuuid: localStorage.setItem("staffuuid")
        })
        .then(res => {
          console.log(res.data)
          if(res.data.code==200){
            that.tableData = res.data.data.map(item => {
              if(item.ordeal==7){
                item.ordeal = "修改待处理"
              }
              return item
            });
          }
          if(res.data.code==0){
            that.tableData=[]
          }
        })
        .catch(err => {
          console.log(err);
          alert("出错");
        });
    }
  },
  computed: {
    // 前端过滤
    tables() {
      const search = this.search;
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    },
    // 总条数
    total() {
      return this.tables.length;
    }
  },
  watch: {
    // 检测表格数据过滤变化，自动跳到第一页
    tables() {
      this.pageIndex = 1;
    }
  }
};
</script>
<style scoped>
</style>
