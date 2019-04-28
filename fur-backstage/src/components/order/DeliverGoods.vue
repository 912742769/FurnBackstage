<template>
  <div class="DeliverGoods">
    <div class="DeliverGoods-table">
      <el-table
       :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
        style="width: 100%">
        <el-table-column
            label="订单号"
            width="100">
            <template slot-scope="scope">
              <span >{{ scope.row.ornumber }}</span>
            </template>
          </el-table-column>
          <!-- 状态 -->
          <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope">
              <span >{{ scope.row.ordeal }}</span>
            </template>
          </el-table-column>
          <!-- 金额 -->
          <el-table-column
            label="订单金额"
            width="80">
            <template slot-scope="scope">
              <span >{{ scope.row.oramount }}</span>
            </template>
          </el-table-column>
        <el-table-column
            align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                @click="detailsbtn(scope.$index, scope.row)"
                placeholder="输入订单号"/>
            </template>
            <template slot-scope="scope">
              <router-link :to="'/home/shippinghandler/oderdetails/'+scope.row.ornumber"><el-button
                size="mini"
                type="primary"
                @click="detailsbtn(scope.$index, scope.row)">详情</el-button></router-link>
            </template>
        </el-table-column>
      </el-table>
    </div>
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
import {mapMutations} from 'vuex'
  export default {
    name: 'DeliverGoods',
    data() {
      return {
        tableData:[],
        pageSize: 2, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        search: ''
      }
    },
    created(){
      this.handleUserList()
      
    },
    methods: {
      detailsbtn(index, row) {
        this.getNewOrder(row)
      },
      handleUserList() {
        let that=this
       that.$http.post('/manager_order_getorderpayed',{
        // staffuuid:localStorage.setItem('staffuuid')
      })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            that.tableData = res.data.data.map(item => {
              if(item.ordeal==1){
                item.ordeal = "已付款"
              }
              return item
            });
          }
          
        })
        .catch(err => {
          console.log(err)
          alert('出错')
        }) 
      },
      getIds(){
            return this.$route.params.id
        },
    handleCurrentChange (val) {
      this.pageIndex = val
    },
    ...mapMutations(['getNewOrder'])
    },
  computed: {
    // 前端过滤
    tables () { 
      const search = this.search
      
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
           if(key=='ornumber'){
             return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            }else{
              return false
            }
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
.DeliverGoods-table{
  width: 400px;
}
</style>

