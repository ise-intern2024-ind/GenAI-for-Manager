<template>
    <div>
        <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
            <el-button type="primary" size="small" @click="onAdd">新增</el-button>
            <div>
                <el-input v-model.trim="searchName" style="width:200px" placeholder="请输入用户名称"></el-input>
                <el-button type="primary" @click="searchGood">搜索</el-button>
            </div>
        </div>
        <el-table 
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }" ref="table" border :data="tableData" style="width:100%;margin-top:10px;">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="type" label="简介" ></el-table-column>
            <el-table-column prop="school" label="余额"></el-table-column>
            <el-table-column prop="email" label="邮箱" ></el-table-column>
            <el-table-column prop="createDate" label="创建时间" ></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{row,$index}">
                    <el-button type="primary" size="small" @click="handlerDetailed(row,$index)">编辑</el-button>
                    <el-button type="danger" @click="handlerDeleteConfirm($index)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="modalType == 0 ? '添加用户' : '编辑用户'" v-model="dialogVisible" width="30%"
            :beforeClose="handleClose">
            <el-form ref="ruleForm" :model="formData.data" :rules="formData.rules" label-position="right" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formData.data.name" placeholder="请输入名称" ></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="type">
                    <el-input v-model="formData.data.type" placeholder="请输入简介"></el-input>
                </el-form-item>
                <el-form-item label="余额" prop="school">
                    <el-input  v-model="formData.data.school" placeholder="请输入余额"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input  v-model="formData.data.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createDate">
                    <el-date-picker
                        style="width: 100%;"
                        v-model="formData.data.createDate"
                        type="date"
                        placeholder="请选择日期"
                    />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="onSave()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance, onBeforeMount, reactive, ref,} from "vue"
import dayjs from 'dayjs'
import axios from 'axios'
const formInline = reactive({
    name: '',
    status: 0,
    date: '',
    school:"",
})
const tableData = ref([])
axios.get('http://localhost:8080/getUserList').then((res)=>{
    tableData.value = res.data.list
})
const formData = reactive({
    data:{
        name:'',
        email:"",
        type:'',
        school:'',
        createDate:'',
    },
    rules:{
        name:[{required: true,message:'名称不能为空',trigger:'blur'}],
        createDate:[{required:true,message:'创建时间不能为空',trigger:'blur'}],
        type:[{required: true,message:'简介不能为空',trigger:'blur'}],
        school:[{required:true,message:'余额不能为空',trigger:"blur"}],
        email:[{required:true,message:'邮箱不能为空',trigger:"blur"}],
    }
    
})
const searchName = ref("")

const searchGood = ()=>{
    if(!searchName.value){
        axios.get('http://localhost:8080/getUserList').then((res)=>{
            tableData.value = res.data.list
        })
    }else{
        tableData.value = tableData.value.filter((item)=>{
            if(item.name == searchName.value){
                return true
            }
        })
    }
}
const { push } = useRouter();
const { proxy } = getCurrentInstance();

const handlerDeleteConfirm = (value)=>{
    ElMessageBox.confirm('确认删除当前数据吗？删除后将无法恢复','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(()=>{
        handlerDelete(value)
        proxy.$message({
            type: 'success',
            message: '删除成功!'
        });
    }).catch(()=>{
        proxy.$message({
            type: 'info',
            message: '已取消删除'
        });
    })
}

const handlerDelete = (index)=>{
    tableData.value.splice(index,1)
}
const dialogVisible = ref(false)
const modalType = ref(0) //0表示新增的弹窗，1表示编辑

const handleClose = ()=>{
    dialogVisible.value = false
    formData.data.title = ""
    formData.data.createDate = ''
    formData.data.email = ''
    formData.data.type = ''
    formData.data.school = ''
    formData.data.name = ''
}
const nowIndex = ref(null)
const handlerDetailed = (row,index)=>{
    formData.data = JSON.parse(JSON.stringify(row))
    modalType.value = 1
    dialogVisible.value = true
    nowIndex.value = index
}
const ruleForm = ref(null)
const onSave = ()=>{
    ruleForm.value.validate((valid)=>{
        if(valid){
            if(modalType.value === 0){
                const request_data = JSON.parse(JSON.stringify(formData.data));
                request_data.createDate = dayjs(request_data.createDate).format('YYYY-MM-DD');
                tableData.value.push(request_data)
            }else{
                const request_data = JSON.parse(JSON.stringify(formData.data));
                request_data.createDate = dayjs(request_data.createDate).format('YYYY-MM-DD');
                tableData.value[nowIndex.value] = request_data
            }
            dialogVisible.value = false
            formData.data.title = ""
            formData.data.createDate = ''
            formData.data.email = ''
            formData.data.type = ''
            formData.data.school = ''
            formData.data.name = ''
        }else{
            proxy.$message.error('请填写正确数据!');
        }
    })
}

const onAdd = ()=>{
    modalType.value = 0
    dialogVisible.value = true
}

const changeStatus = (value,index) => {
    tableData.value[index].status = value
}
</script>

<style lang="scss" scoped>
.is-message-box{
    position: relative;
    z-index: 9000;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>