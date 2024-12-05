<template>
    <div class="login_box">
        <div class="login_containers">
            <h1 style="text-align:center;font-size: 20px;margin-bottom: 10px;">Manager GPT</h1>
            <el-form label-position="left" label-width="0px" :model="form" :form="form" ref="ruleForm" :rules="rules">
                <el-form-item prop="name">
                    <el-input type="text" v-model="form.name" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item style="width: 100%">
                    <el-button type="primary" style="width: 100%;background: #505458;border: none"
                        @click="toLogin">ログイン</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { ElMessageBox, ElMessage} from 'element-plus';
import "element-plus/theme-chalk/el-message-box.css";
import { getCurrentInstance, reactive } from "vue";
import { useRouter } from 'vue-router';

const { proxy } = getCurrentInstance()
const router = useRouter();

const form = reactive({
    name:'',
    password:''
})
const rules = reactive({
    name: [
        { required: true, message: 'ID', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'パスワード', trigger: 'blur' }
    ],
})
const list = reactive([
    {
        name: 'admin',
        password: '123456',
    },
])
const ruleForm = ref(null)
const toLogin = ()=>{
    ruleForm.value.validate((validate) => {
        if (!validate) {
            return
        } else {
            let isLogin = list.some((item) => {
              return item.name == form.name && item.password == form.password
            })
            console.log(isLogin,'bbbbbbbbbbbbbbbb')
            if(isLogin){
                resetForm()
                ElMessage({
                    message: 'success!',
                    type: 'success'
                });
                router.push({ path:'/console' })
            }else{
                return ElMessage({
                    type: 'error',
                    message: 'error'
                });
            }
        }
    })
}
const  resetForm = ()=>{
    form.name = ""
    form.password = ""
}

// export default {
//     name: "Login",
//     data() {
//         return {
//             form: {
//                 name: '',
//                 password: '',
//             },
//             rules: {
//                 name: [
//                     { required: true, message: '请输入用户名', trigger: 'blur' },
//                 ],
//                 password: [
//                     { required: true, message: '请输入密码', trigger: 'blur' }
//                 ],
//             },
//             list:[
//                 {
//                     name: 'xiaomingtx1',
//                     password: '123456',
//                 },
//                 {
//                     name: 'xiaomingtx2',
//                     password: '123456',
//                 },
//                 {
//                     name: 'xiaomingtx3',
//                     password: '123456',
//                 },
//                 {
//                     name: 'xiaomingtx4',
//                     password: '123456',
//                 }
//             ]
//         }
//     },
//     methods: {
//         toLogin() {
//             this.$refs.ruleForm.validate((validate) => {
//                 if (!validate) {
//                     return
//                 } else {
//                     let loginData = JSON.stringify({
//                         name: this.form.name,
//                         password: this.form.password,
//                     })
//                     this.list.forEach((item,index)=>{
//                         if(item.name == loginData.name && item.password == loginData.password){
//                             this.resetForm()
//                             return this.$message.success('登录成功')
//                         }else{
//                             return this.$message.warning('用户名或者密码错误')
//                         }
//                     })
//                 }
//             })
//         },
//         resetForm() {
//             this.form = {
//                 name: '',
//                 password: '',
//             }
//         },
//     }
// }
</script>
<style lang="scss" scoped>
.router-link-active {
    text-decoration: none;
}

a {
    /* 去除默认的下划线 */
    text-decoration: none;
    color: #1e90ff;
}

.login_box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

.login_containers {
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 10px 40px 10px 40px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
}
</style>