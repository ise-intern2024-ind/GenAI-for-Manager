<template>
  <div>
    <!-- <h1 style="text-align: center;color: #fff;margin-top: 10px;font-size: 24px;">
      商品管理系统
    </h1> -->
    <el-menu :collapse="collapseA" :default-active="currentPath" background-color="#344a5f" text-color="#fff" active-text-color="#ffffff">
      <template v-for="item in routers" :key="item.path">
        <template v-if="!item.hidden">
          <template v-if="hasOnlyChild(item.children)">
            <el-menu-item :index="item.children[0].path" @click="toRouteLinkA(item.children[0].path)">
              <svg-icon :icon-name="item.meta?.icon" class-name="aside-menu-svg"></svg-icon>
              <!-- 这里必须要一个标签，包裹着绑定的值，不能直接使用文本插值双大括号写法{{}}，即使用<span>{{}}</span>，不然菜单折叠效果collapse不生效 -->
              <template #title>{{ item.children[0].meta?.title }}</template>
              <!-- <span>{{ item.children[0].meta?.title }}</span> -->
            </el-menu-item>
          </template>
          <template v-else>
            <el-sub-menu v-if="item.children?.length" :index="item.path">
              <template #title>
                <svg-icon :icon-name="item.meta?.icon" class-name="aside-menu-svg"></svg-icon>
                <span>{{ item.meta?.title }}</span>
              </template>
              <template v-for="child in item.children" :key="child.path">
                <el-menu-item v-if="!child.hidden" :index="child.path" @click="toRouteLinkB(item.path,child.path)">
                  {{ child.meta && child.meta.title }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from "vue-router";
import { computed,reactive,toRefs } from "vue";
import useAppStore from '@/store/app.js';
//通过storeToRefs解构后取值pinia的state数据也是响应式的
import { storeToRefs } from 'pinia';
  defineOptions({
    name: "Header",
  })
  const appStore = useAppStore();
  const { options } =  useRouter();

  //获取路由配置列表
  const routers = options.routes;
  const hasOnlyChild = (children)=>{
    if(!children){
      return false
    }
    const childRouter = children.filter(item=>{
      return item.hidden ? false : true;
    })
    if(childRouter.length === 1){
      return true;
    }
    return false;
  }

  const { path } = useRoute();
  const currentPath = computed(()=>path)

  //vite没有require导入，引用这个
  //如果是背景图片引入的方式（一定要使用相对路径） 
  // 使用绝对路径在开发环境能够正常显示，但将导致打包后的路径不正确
  let mapPicSrcA = new URL("../../../assets/images/logo.png",import.meta.url).href
  let mapPicSrcB = new URL("../../../assets/images/logo-min.png",import.meta.url).href
  let collapseA = computed(()=> appStore.getCollapse)
  let logoA = ""
  // 两种用法监听collapse变化后，改变logo的值
  // watch监听新旧值，watchEffect 会在依赖的响应式对象发生变化时立即执行

  // watch(collapseA, (newValue, oldValue) => {
  //   logoA = newValue ? mapPicSrcB : mapPicSrcA
  //   console.log(logoA,'xxxxxxxxxxxx')
  // });

  watchEffect(() => {
    logoA = collapseA.value ? mapPicSrcB : mapPicSrcA
  });
  const data = reactive({
    //webpack使用require是为了防止项目打包上线后解析错误图片无法显示
    // logo:require("@/assets/images/logo.png")
    // logo:import.meta.glob('@/assets/images/logo.png')  //不行
    logo: logoA,
    collapse: collapseA,
  })

  const { logo,collapse } = toRefs(data)

  const router = useRouter();

  const toRouteLinkB = (val1,val2)=>{ 
    let pathVal = val1+'/'+val2
    router.push({ path: pathVal })
  }
  const toRouteLinkA = (val1)=>{
    console.log(val1)
    router.push({ path: val1 })
  }
</script>
<style lang="scss" scoped>
#layout-aside{
  background-color: #355a5f;
}
.logo{
  padding: 20px 0;
  border-bottom: 1px solid #2d4153;
  img{ margin:auto; }
}
</style>