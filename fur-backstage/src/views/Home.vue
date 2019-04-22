<template>
<div>
  <div class="header">
    <h1>安于室后台管理系统</h1>
    <el-dropdown id="user-item-box">
      <div class="el-dropdown-link">
      <div class="usericon">
        <!-- <img src="./assets/usericon.png" alt=""> -->
      </div>
      <span>欢迎你 超级管理员</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <i class="el-icon-edit" style="margin-right: 15px"></i>
          个人中心
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
      
    </el-dropdown>
  </div>
  <Nav />
</div>
</template>

<style>
  .header{
    width: 100%;
    height: 70px;
    
  } 
</style>

<script>
import Nav from'@/components/Nav.vue'

  export default {
    name: 'home',
    components: {
      Nav
    }
  };
</script>
