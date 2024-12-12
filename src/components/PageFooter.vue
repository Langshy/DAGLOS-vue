<template>
    <el-affix position="bottom" :offset="20">
      <el-row>
        <el-col :span="24"><div class="grid-content ep-bg-purple-dark" /></el-col>
      </el-row>
    </el-affix>
  </template>

  <style>
  .el-footer{
    background-color: antiquewhite;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  </style>