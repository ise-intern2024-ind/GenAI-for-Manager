<template>
    <el-container id="layout-container">
        <el-header id="layout-header" height="75px">
            <LayoutHeader/>
        </el-header>
        <el-container>
            <el-aside id="layout-aside" :width="collapse === true ? '60px' : '250px' "><LayoutAside /></el-aside>
            <el-main id="layout-main"><LayoutMain/></el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import LayoutAside from "./components/Aside.vue"
import LayoutHeader from "./components/Header.vue"
import LayoutMain from "./components/Main.vue"
import useAppStore from "../../store/app.js"
import { computed } from "vue"
defineOptions({
    name:'Layout',
})
const appStore = useAppStore()
const collapse = computed(()=> appStore.getCollapse)
</script>
<style lang="scss" scoped>
#layout-container{
    height: 100vh;
}
#layout-aside{
    background-color: #344a5f;
    @include webkit(transition,all .3s ease 0s);
}
#layout-header{
    position: relative;
    z-index: 10;
    // background-color: $color_main;
    @include webkit(box-shadow,0 0 20px 0 rgba(0,0,0, .1));
}
#layout-main{
    background-color: #f7f7f7;
}
</style>