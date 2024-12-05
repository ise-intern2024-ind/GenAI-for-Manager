import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'

// 全局引入时调用挂载  局部引入直接去vite.config.js中进行配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { ElMessage,ElMessageBox } from 'element-plus'
import "element-plus/theme-chalk/el-message-box.css";

//npm install mockjs --save
import "./mock/index";

//npm install @element-plus/icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//注入svg-icon组件
import SvgIcon from "@/components/svgIcon/Index.vue"
import 'virtual:svg-icons-register'

//全局方法
import Global from './utils/global'

//createApp的对象是一个组件  createApp创建一个新的应用实例
const app = createApp(App)

for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

//app.config.globalProperties全局配置的固定写法，$axios是自定义名称  107
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$message =  ElMessage;
app.config.globalProperties.$confirm =  ElMessageBox.confirm;
app.config.globalProperties.$abc =  '123';
app.component("svg-icon",SvgIcon).use(ElementPlus).use(router).use(Global).use(createPinia()).mount('#app')

console.log(import.meta.env,'hhhhhhhhhhh')   //这里可以看到配置的env.development等参数，看输出


//项目创建和包引用
//npm create vite demo_vue3 --template vue
//npm install
//安装路由  npm install vue-router@next

//全局安装element ui   npm install element-plus  


//npm i element-plus@1.0.2-beta.28
//局部安装element ui时，还需要而外导入    去vite.config.js进行配置
//npm install -D unplugin-vue-components unplugin-auto-import  
//按需引入导致了删除提示框的样式丢失，mian.js文件配上样式引用
//import "element-plus/theme-chalk/el-message-box.css";

// 局部安装自动导入element plus组件
// 按需引入产生大bug，如果没有在APP.vue挂载Element ui，
// 则proxy就是this.message is not function
// 解决1.直接使用ElMessage({})
// 解决2.去App.vue的原型上挂载messge
//import { Message } from 'element-ui' 或者 'element-plus'
//Vue.prototype.$message = Message  或者  app.config.globalProperties.$message =  ElMessage;
//这样就可以使用this.$message了  直接全局引用没有这么多事

//安装axios   npm install axios
//安装pinia   npm install pinia --save
//安装sass   npm install -D sass
//安装sass-loader   npm install -D sass-loader


//安装js-sha1对密码进行加密   npm install js-sha1

//安装element-plus 图标库  npm install @element-plus/icons-vue 没有使用到

//安装svg-sprite-loader插件 主要是自动导入SVG图标文件后，还需要将其解析为<symbol>元素
//<symbol>元素可以重复使用的符号，嵌套在<svg>标签内。
//npm install svg-sprite-loader -D  //webpack使用的命令  没有使用

//本vite项目使用插件vite-plugin-svg-icons  已经使用
// npm i vite-plugin-svg-icons -D
// npm i fast-glob -D

//安装js-cookie包   npm install js-cookie -save
// 常用的方法
//Cookies.set('name','value')
//Cookies.get('name')
//Cookies.remove('name')


//安装富文本包 npm install wangeditor@4.7.8 --save

//安装echarts
//npm i echarts@5.1.2