<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
//下面的引入路径换新版了，将lib改为es
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
let locale = zhCn
</script>

<style lang="less" scoped>
</style>
