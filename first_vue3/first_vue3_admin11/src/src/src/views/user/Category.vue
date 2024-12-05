<template>
    <div>
        <el-button type="primary" size="small" @click="onAdd">新增</el-button>
        <el-table :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }" ref="table" border :data="tableData" style="width:60%;margin-top:10px;">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="index" label="序号" width="80">
                <template #default="{row,$index}">
                    <span>{{ $index+1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="类别名称" ></el-table-column>
            <el-table-column label="操作">
                <template #default="{row,$index}">
                    <el-button type="primary" size="small" @click="handlerDetailed(row,$index)">编辑</el-button>
                    <el-button type="danger" @click="handlerDeleteConfirm($index)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="modalType == 0 ? '添加分类' : '编辑分类'" v-model="dialogVisible" width="30%"
            :beforeClose="handleClose">
            <el-form ref="ruleForm" :model="formData.data" :rules="formData.rules" label-position="right" label-width="80px">
                <el-form-item label="类别名称" prop="title">
                    <el-input v-model="formData.data.name" placeholder="请输入类别名称" ></el-input>
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
import { getCurrentInstance, onBeforeMount, reactive,} from "vue"
import { useRouter } from "vue-router";
import { getDate } from '@/utils/common';
import axios from 'axios'
import dayjs from 'dayjs'
const tableData = ref([])
axios.get('http://localhost:8080/getAllList').then((res)=>{
    tableData.value = res.data.list
})
const formData = reactive({
    data:{
        name:"",
    },
    rules:{
        name:[{required:true,message:'类别名称不能为空',trigger:'change'}],
    }
    
})
const { push } = useRouter();
const { proxy } = getCurrentInstance();
const handlerDeleteConfirm = (value)=>{
    // proxy.deleteConfirm({
    //     title:'删除',
    //     message:'确认删除当前数据吗？',
    //     thenFun:()=>{ handlerDelete(value) }
    // })
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
</script>

<style lang="scss" scoped>
.is-message-box{
    position: relative;
    z-index: 9000;
}
</style>