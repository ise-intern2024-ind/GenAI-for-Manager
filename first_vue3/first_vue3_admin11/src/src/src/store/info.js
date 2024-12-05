import { defineStore } from "pinia";
import { GetCategory } from "@/api/info";

//defineStore第一个参数是唯一标识
const useInfoStore = defineStore('info',{
    state:()=>{
        return{
            //一般这里直接采用对象取值都会有问题的,无论是直接store.userInfo，
            //还是通过storeToRefs解构后取值
            //通过定义在getters里面取值
            // userInfo,

            //通过在getters赋值，在通过computed获取
            //通过storeToRefs解构后取值也是响应式的
        }
    },
    getters:{
        //通过计算属性computed获取，调用时不需要()
        getCollapse: (state)=>{
            return state.collapse
        },

    },
    actions:{
        //调用时使用()
        async categoryAction(){
            return new Promise((resolve,reject) =>{
                GetCategory().then(res=>{
                    resolve(res.data)
                })
            })
        }
    }
})

export default useInfoStore