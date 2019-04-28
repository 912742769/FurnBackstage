<template>
  <div class="oderdatails">
      <!-- 订单详情 -->
      <div class="oderdatail-top">
          <h3>订单详情</h3>
          <div class="oderdetails-box">
          <p><span class="oderdetails-left">收件人：{{tableData.orrealname}}</span><span>收件人电话：{{tableData.ortelphone}}</span></p>
          <p><span>收货地址：{{tableData.oraddress}}</span></p>
          <p><span>买家留言：{{tableData.orremark}}</span></p>
          </div>
          <hr>
          <div class="oderdetails-box">
             <p><span class="oderdetails-left">订单编号：{{getId}}</span><span>支付宝交易号：</span>{{tableData.orpaynumber}}</p> 
             <p><span class="oderdetails-left">下单时间：{{tableData.ortime}}</span><span>付款时间：{{tableData.orpaytime}}</span></p> 
          </div>
      </div>
      <div>
        <div class="table-box">
            <h3>商品清单</h3>
            <el-table
              :data="goodsData"
              border
              style="width: 100%">
              <el-table-column
              prop="trepertory.tgoods.gid"
              label="商品编号"
              width="100">
              </el-table-column>
              <el-table-column
              prop="trepertory.tgoods.gname"
              label="商品名称"
              width="220">
              </el-table-column>
              <el-table-column
              prop="trepertory.gsname"
              label="属性"
              >
              </el-table-column>
              <el-table-column
              prop="orprice"
              label="单价(元)"
              width="100">
              </el-table-column>
              <el-table-column
              prop="orcount"
              label="数量"
              width="60">
              </el-table-column>
              <el-table-column
             
              label="总价(元)"
              width="100">
              <template slot-scope="scope">
                <p>{{ scope.row.orcount*scope.row.orprice }}</p>
            </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="oderotal clear">
          <div class="oderotal-left">
              <div>商品总金额：￥<span>{{totalprice}}</span></div>
              <div>+ 运费：￥<span>0</span></div>
              <div class="actual-payment">订单支付金额：<p class="actual-payred">￥{{tableData.oramount}}</p></div>
          </div>
          <div class="deliver-btn">
              <button id="deliverBtn" @click="deliverBtn()">发货</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
import {formatDate} from '@/assets/times.js'
export default {
  name: 'oderdatails',
data() {
      return {
        tableData: {},
        goodsData:{},
        arr:[]
      }
    },
    created(){
      this.tableData = this.orderdata
      let arr=[this.tableData]
      this.arr=arr.map((item) =>{
      //支付时间
      item.orpaytime = this.formatDate(parseInt(item.orpaytime))
      //下单时间
      item.ortime = this.formatDate(parseInt(item.ortime))
      
      return item
    })
    this.tableData=this.arr[0]
      this.goodsData=this.tableData.torderinfoList
      console.log('商品信息',this.goodsData)

    },
    computed:{
      ...mapState(['orderdata']),
        getId(){
            return this.$route.params.id
        },
        //返回总价
      totalprice (){
        let sum=0
        for( let i=0;i<this.goodsData.length;i++){
          sum+=parseInt(this.goodsData[i].orprice)*parseInt(this.goodsData[i].orcount)
        }
        return sum
    }
    },
    methods:{
        deliverBtn(){
          let that=this
          let date='ornumber='+that.$route.params.id
          console.log(that.$route.params.id)
          that.$http.post('/manager_goods_dg',date
           ) 
            .then((res) => {
              console.log(res.data);
              if(res.data.state == 200) {
                that.$router.push('/home/shippinghandler');
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
    }
    
}
</script>
<style scoped>
.oderdatail-top p{
  padding: 5px 0;
  color: #868686;
}

.oderdatails{
    font-size: 12px;
    text-align: left;
}
img{
    width:40px;
    height: 40px;
}
.table-box{
    width: 700px;
    
}
h3{
    background-color: #94939363;
    padding: 5px;
    color: rgba(110, 109, 109, 0.795);
}
.oderdetails-box{
    padding: 0 60px;
}
.oderdetails-left{
    width: 350px;
    display: inline-block;
}
.oderotal{
    background-color: #c3c6c949;
    padding: 10px 0;
    text-align: right;
    font-size: 13px;
    color: #3a3939;
    font-weight: 400;
}
.oderotal span{
    width: 80px;
    display: inline-block;
    text-align: left
}
.actual-payment{
  border-top: 1px solid rgb(105, 102, 102);
  margin-top: 5px;
  font-size: 15px;
  text-align: center;
}
.actual-payred{
  color: red;
  font-size: 16px;
  display: inline-block;
  margin-top: 2px;
}
.oderotal-left{
    float: left;
    margin-left: 50px;
}
#deliverBtn{
  padding: 13px 30px;
  margin-top: 20px;
  margin-right: 50px;
  background-color: #33338b94;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
</style>

