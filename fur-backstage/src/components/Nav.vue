<template>

    <el-container style="width:'100%' border: 1px solid #eee">
        <el-aside width="200px">
            <div id="icon"></div>
            <el-menu :default-openeds="['1']">
            <el-menu-item index="1">
                <template slot="title"><i class="el-icon-menu"></i>概览</template>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-tickets"></i>订单管理</template>
                <el-menu-item index="3-1"><router-link to="/shippinghandler">发货处理</router-link></el-menu-item>
                <el-menu-item index="3-2"><router-link to="/logisticsmanage">物流管理</router-link></el-menu-item>
                <el-menu-item index="3-3"><router-link to="/ordermodify">订单修改</router-link></el-menu-item>
                <el-menu-item index="3-4"><router-link to="/returnsmanagement">退货管理</router-link></el-menu-item>
                <el-menu-item index="3-5"><router-link to="/orderprocessingrecord">订单处理记录</router-link></el-menu-item>
                <el-menu-item index="3-6"><router-link to="/transactionstatistics">交易统计</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="4-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="4-4">
                <template slot="title">选项4</template>
                <el-menu-item index="4-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
            </el-menu>
        </el-aside>
        <Main />
   </el-container>

</template>

<style>
   .el-aside {
    color: #333;
  }
  .el-dropdown-link {
    cursor: pointer;

  }
  #icon{
    width: 50px;
    height: 50px;
    /* background: url(assets/usericon.png) no-repeat center; */
    background-size: cover;
    margin: 0 auto;
  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #user-item-box{
    line-height: 30px;
  }
  .usericon{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    float: left;
  }
  .usericon img{
    width: 100%;
    height: 100%;
  }
</style>


<script>
import Main from '@/views/Main.vue'

  export default {
    name: 'home',
    components: {
      Main
    }
  };
</script>
