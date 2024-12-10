<template>
  <div class="header-wrap">
    <div style="width:260px;display:flex;flex-direction:row;justify-content:space-between;">
      <h1 style="font-size: 25px;">データ管理システム</h1>
      <span class="menu-btn" @click="switchAside">
        <svg-icon iconName="menuBtn" className="icon-menu-svg"></svg-icon>
      </span>
    </div>
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img style="width:50px;height: 50px;border-radius: 50%;" src="../../../assets/images/a.jpg" :alt="username">
          <span class="name">{{ username }}</span>
        </div>
        <span class="logout" @click="handlerLogout">
          <svg-icon iconName="logout" className="icon-logout"></svg-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import useAppStore from '@/store/app.js'
import { storeToRefs } from 'pinia'
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
defineOptions({
  name:"Header"
})
const appStore = useAppStore()
const { proxy } = getCurrentInstance();
const { replace } = useRouter();
const switchAside = ()=>appStore.setCollapse();
const { username }= storeToRefs(appStore)
const handlerLogout = () => {
  proxy.$confirm('管理システムのバックエンドから退出しますか？','提示',{
    confirmButtonText:"確認",
    cancelButtonText:"キャンセル",
    type:'warning',
    draggable:true,
  }).then(()=>{
    proxy.$message({
        message: 'システムから正常に退出しました',
        type:'success'
      })
    replace({
      name:"Login"
    })
  }).catch(error=>{})
}
</script>
<style lang="scss" scoped>
.header-wrap{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-info{
  float:right;
  display: flex;
  align-items: center;
}
.face-info {
  span, img { 
    display: inline-block;
    vertical-align: middle;
  }
  span { margin-left: 15px;}
}
.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  cursor: pointer;
}
.menu-btn{
  cursor: pointer;
}
.icon-menu-svg{
  font-size: 24px;
}
.icon-logout { font-size: 24px; }
.is-message-box{
    position: relative;
    z-index: 9000;
}
</style>