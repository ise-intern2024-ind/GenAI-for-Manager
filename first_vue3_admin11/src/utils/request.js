import axios from 'axios';
import router from "@/router"
import { getToken,getUsername,removeToken,removeUsername } from "./cookies"
// 拦截器就两部分内容 创建实例和添加拦截器

//创建实例
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000,
})

//添加请求拦截器
service.interceptors.request.use(function(config){
    if(getToken()){
        config.headers['Token'] = getToken();
    }
    if(getUsername()){
        config.headers['Username'] = getUsername();
    }
    console.log(config)
    //在发送请求之前做些什么
    return config;
},function(error){
    //对请求错误做些什么
    return Promise.reject(error);
})

//拦截器无论是成功还是失败都会返回Promise对象。Promise.then()和Promise.resolve()
//在Promise对象中，无论返回resolve还reject,都会执行then回调。
//如果是被拒绝reject的Promise对象，则使用reject会进入then的第2个回调。
//then的第二个回调参数error,但一般不会使用第二回调，
//而是使用catch进行回调，这样代码更直观好看

//添加响应拦截器
service.interceptors.response.use(function(response){
    //对响应数据做些什么
    console.log(response)
    const data = response.data;
    if(data.resCode === 0){
        return Promise.resolve(data)
    }else{
        ElMessage({
            message:data.message,
            type:'error'
        })
        return Promise.reject(data)
    }
},function(error){
    const errorData = JSON.parse(error.request.response);
    if(errorData.message) {
        ElMessage({
            message: errorData.message,
            type: "error"
        })
    }
    if(errorData.resCode === 1010){
        router.replace({
            name:'Login'
        })
        removeToken();
        removeUsername();
    }
    //对响应错误做些什么
    return Promise.reject(errorData);
})

export default service;