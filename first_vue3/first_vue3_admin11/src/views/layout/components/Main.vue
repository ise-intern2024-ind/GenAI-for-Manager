<template>
  <div id="main-content">
    <router-view></router-view>
  </div>
</template>

<script setup>
defineOptions({
  name:'Main'
})
</script>
<style lang="scss" scoped>
#main-content{
  background-color: #fff;
  padding: 30px;
  min-height: 100%;
  @include webkit(box-sizing,border-box)
}
</style>