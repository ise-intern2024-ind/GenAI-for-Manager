import { defineStore } from "pinia";
import { Login,Logout } from "../api/account";
import { setToken,setUsername,getUsername,getToken, removeToken, removeUsername } from "../utils/cookies";

const useAppStore = defineStore('app',{
    state:()=>{
        return{
            collapse: JSON.parse(sessionStorage.getItem('collapse')) || false,
            token:"" || getToken(),
            username:"" || getUsername()
            //一般这里直接采用对象取值都会有问题的,无论是直接store.userInfo，
            //还是通过storeToRefs解构后取值
            //通过定义在getters里面取值
            // userInfo,

            //通过在getters赋值，在通过computed获取
            //通过storeToRefs解构后取值也是响应式的
        }
    },
    getters:{
        // isLogin: (state)=>{
        //     return !!state.token || !!localStorage.getItem('pm_token');
        // },
        // getUserInfo: (state)=>{
        //     return state.userInfo
        // }

        //通过计算属性computed获取，调用时不需要()
        getCollapse: (state)=>{
            return state.collapse
        },
    },
    actions:{
        //调用时使用()
        setCollapse(){
            this.collapse = !this.collapse
            sessionStorage.setItem('collapse',JSON.stringify(this.collapse))
        },
        SET_TOKEN(value){
            this.token = value;
            value && setToken(value);
        },
        SET_USERNAME(value){
            this.username = value;
            value && setUsername(value);
        },
        async loginAction(requestData){
            return new Promise((resolve,reject)=>{
                Login(requestData).then((res)=>{
                    let data = res.data
                    this.SET_TOKEN(data.token)
                    this.SET_USERNAME(data.username)
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        async logoutAction(){
            return new Promise((resolve,reject)=>{
                Logout().then(res=>{
                    removeToken()
                    removeUsername()
                    this.SET_TOKEN('')
                    this.SET_USERNAME('')
                    resolve(res)
                })
            })
        }
    }
})

export default useAppStore