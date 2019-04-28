
<template>
<!-- 订单完成记录 -->
    <div class="orderstatistics">
        <div class="oder-title-box">
            <span class="oder-title">订单完成统计</span>
            <el-input 
                v-model="search"
                size="small"
                placeholder="输入订单编号搜索"
                clearable/>
        </div>
        
        <el-table
            :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
            style="width: 100%">
            <el-table-column
            align="center"
            label="订单号">
            <template slot-scope="scope">
            <span v-html="format(scope.row.date)"></span>
             </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="订单状态"
            prop="name">
            </el-table-column>
            <el-table-column
            label="订单金额"
            align="center"
            prop="name">
            </el-table-column>
            <el-table-column
            label="下单时间"
            align="center"
            prop="name">
            </el-table-column>
            <el-table-column
            label="发货时间"
            align="center"
            prop="name">
            </el-table-column>
            <el-table-column
            label="收货时间"
            align="center"
            prop="name">
            </el-table-column>
            <el-table-column
            width="170"
            align="center"
             label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import {formatDate} from '@/assets/times.js'
  export default {
      name:'orderstatistics',
    data() {
      return {
      pageSize: 2, // 每页大小默认值
      pageIndex: 1, // 默认第一页
      search: '',
        tableData: []
      }
    },
    created(){
      this.handleUserList()
    },
    methods: {
      // 前端过滤
    format (val) {
      val = val.toString()
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="red">' + this.search + '</font>')
      } else {
        return val
      }
    },
    handleCurrentChange (val) {
      this.pageIndex = val
    },
      handleUserList() {
            let that=this
      that.$http.post('/manager_order_orderok',{
        // staffuuid:localStorage.setItem('staffuuid')
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            that.tableData = res.data.data.map(item => {
              if(item.torder.ordeal==6){
                item.torder.ordeal = "已完成"
              }
              item.orpaytime = this.formatDate(parseInt(item.orpaytime))
              item.ortime = this.formatDate(parseInt(item.ortime))
              return item
            });
          }
          if (res.data.code == 0) {
            that.tableData = [];
          }
        })
        .catch(err => {
          console.log(err)
          alert('出错')
        })
        },
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    },
    computed: {
    // 前端过滤
    tables () {
      const search = this.search
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    },
    // 总条数
    total () {
      return this.tables.length
    }
  },
  watch: {
   // 检测表格数据过滤变化，自动跳到第一页
    tables () {
      this.pageIndex = 1
    }
  }
  }
</script>
<style scoped>
</style>
