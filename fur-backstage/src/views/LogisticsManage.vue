<template>
<!-- 物流 -->
    <div class="logisticsmanage">
      <div class="oder-title-box">
            <span class="oder-title">物流信息</span>
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
            label="物流编号"
            align="center"
            prop="tlogistics.lonumber">
            </el-table-column>
            <el-table-column
            label="订单号"
            align="center"
            prop="ornumber">
            </el-table-column>
            <el-table-column
            label="订单状态"
            align="center"
            prop="ordeal">
            </el-table-column>
            <el-table-column
            label="配送信息"
            align="center"
            width="200">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <p>收件人:{{ scope.row.orrealname }}</p>
                <p>电话:{{scope.row.ortelphone}}</p>
                <p>收件地址:{{ scope.row.oraddress }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.orrealname }}</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
            label="发货时间"
            align="center"
            prop="tlogistics.locreatetime">
            </el-table-column>
            <el-table-column
            label="订单总价"
            align="center"
            prop="orpayaount">
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
      name:'logisticsmanage',
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleCurrentChange (val) {
      this.pageIndex = val
      },
      handleUserList (){
        let that=this
      that.$http.post('/manager_order_logistics',{
        // staffuuid:localStorage.setItem('staffuuid')
      })
        .then((res) => {
          console.log(res.data);
          if(res.data.code==200){
            that.tableData = res.data.data.map(item => {
              if(item.ordeal==2){
                item.ordeal = "已发货"
              }
              item.tlogistics.locreatetime = this.formatDate(parseInt(item.tlogistics.locreatetime))
              return item
            });
          }
          if(res.data.code==0){
            that.tableData=[]
          }
          console.log(that.tableData)
        })
        .catch(err => {
          console.log(err)
          alert('服务器出错')
        })
      },
      // 时间转换
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    },
    computed: {
    // 前端过滤
    tables () {
      const search = this.search
      let tlog =this.tableData.tlogistics
      console.log(tlog)
      if (search) {
        return this.tlog.filter(dataNews => {
         
          return Object.keys(dataNews).some(key => {
            if(key=='lonumber'){
             return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            }else{
              return false
            }
            
          })
        })
      }
      return this.tableData
    },
    //计算商品总数
    totalmunber (){
        let sum=0
        for( let i=0;i<this.tableData.torderinfoList.length;i++){
          sum+=parseInt(this.tableData.torderinfoList[i].orcount)
        }
        return sum
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