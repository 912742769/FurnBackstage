<template>
  <div class="returnsmanagement">
    <!-- 退货处理 -->
    <div class="oder-title-box">
      <span class="oder-title">退货处理</span>
      <el-input v-model="search" size="small" placeholder="输入订单编号搜索" clearable/>
    </div>
    <el-table :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)" style="width: 100%">
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
              <span >{{ scope.row.ornumber }}</span>
            </template>
      </el-table-column>

      <el-table-column align="center" label="买家信息" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>买家电话: {{ scope.row.tuser.userphone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.tuser.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="退款状态" prop="torder.ordeal"></el-table-column>
      <el-table-column align="center" label="订单金额(元)" prop="torder.oramount"></el-table-column>
      <el-table-column align="center" label="退款金额(元)" prop="torder.oramount"></el-table-column>
      <el-table-column label="申请时间" align="center" prop="retime"></el-table-column>
      <el-table-column label="退款原因" align="center" prop="reremark"></el-table-column>
      <el-table-column width="170" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="returnbtn(scope.row.ornumber)">退货</el-button>
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
import {formatDate} from '@/assets/times.js'
export default {
  name: "returnsmanagement",
  data() {
    return {
      pageSize: 2, // 每页大小默认值
      pageIndex: 1, // 默认第一页
      search: "",
      tableData: [],
    };
  },
  created() {
    this.handleUserList()
  },
  methods: {
    returnbtn(index) {
      let that = this;
      let data = 'ornumber='+index
      that.$http
        .post("/manager_goods_rg_examine", data)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            that.$router.push("/home/returnsmanagement");
          }
        })
        .catch(err => {
          console.log(err);
          alert("出错");
        });

    },
    handleCurrentChange(val) {
      this.pageIndex = val
    },
    handleUserList() {
      let that = this
      that.$http
        .post("/manager_goods_rg", {
          // staffuuid: localStorage.setItem("staffuuid")
        })
        .then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            that.tableData = res.data.data.map(item => {
              if(item.torder.ordeal==4){
                item.torder.ordeal = "退货中"
              }
              item.retime = this.formatDate(parseInt(item.retime))
              return item
            });
          }
          if (res.data.code == 0) {
            that.tableData = [];
          }
        })
        .catch(err => {
          console.log(err);
          alert("出错");
        });
    },
    handleSelectionChange(value) {
      if (value) {
        return this.tableData.filter(item => {
          return item.add == value;
        });
      }
      return this.tableData;
    },
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
  },
  computed: {
    // 前端过滤
    tables() {
      const search = this.search;
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            if(key=='ornumber'){
             return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            }else{
              return false
            }
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



