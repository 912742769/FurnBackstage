<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-table th{
  background:#f4f4f4 !important;
}
.el-table td{
  font-size: 12px;
}
.clear::before,
.clear::after{
    content: '';
    display: table;
}
.clear::after{
    clear: both;
}
.block{
  margin-top: 20px;
  text-align: right;
}
/* 订单title */
.oder-title-box{
  padding-bottom: 20px;
  border-bottom: 1px solid #f2f0f1;
  margin-bottom: 20px;
}
.oder-title{
    float: left;
    color: #f2f0f1;
    font-size: 20px;
    margin-right: 10px;
}
.oder-title::before {
    content: url(./assets/icon-book.png);
    vertical-align: -3px;
    margin-right: 5px;
}
.oder-title-box .el-input {
  display: inline-block;
    width: 150px;
    margin: 0 10px;
}
</style>
