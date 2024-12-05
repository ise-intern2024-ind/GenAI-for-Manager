import { createRouter,createWebHashHistory,createWebHistory } from "vue-router"
const routes=[
    {
        path: "/",
        name:'Login',
        component:()=> import("../views/account/Login.vue")
    },
    {
        path: "/home",
        name:'Home',
        meta:{
            title:"控制台",
            icon:"home"
        },
        redirect: "/console",
        component:()=> import("../views/layout/Index.vue"),
        children:[
            {
                path:"/console",
                name:'Console',
                meta:{
                    title:'首页',
                },
                component:()=> import("../views/console/Index.vue")
            }
        ]
    },
    {
        path: "/user",
        name:'User',
        meta:{
            title:"系统管理",
            icon:"user"
        },
        component:()=> import("../views/layout/Index.vue"),
        children:[
            {
                path:'index',
                name:"UserIndex",
                meta:{
                    title:'商品列表'
                },
                component:()=>import("../views/user/Index.vue")
            },
            {
                path:'category',
                name:"UserCategory",
                meta:{
                    title:'分类列表'
                },
                component:()=>import("../views/user/Category.vue")
            },
            {
                path:'user',
                name:"Users",
                meta:{
                    title:'用户管理'
                },
                component:()=>import("../views/user/User.vue")
            },
            {
                path:'my',
                name:"UserMy",
                meta:{
                    title:'个人中心'
                },
                component:()=>import("../views/user/My.vue")
            }
        ]
    },
]

const router = createRouter({
    // history: createWebHashHistory(),  //哈希模式
    history: createWebHistory(),  //历史模式
    routes  //es6的同名简写模式
})

export default router