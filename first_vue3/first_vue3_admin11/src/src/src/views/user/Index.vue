<template>
    <div>
        <el-button type="primary" size="small" @click="onAdd">新增</el-button>
        <el-table :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }" ref="table" border :data="tableData" style="width:100%;margin-top:10px;">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="title" label="商品名称" ></el-table-column>
            <el-table-column prop="price" label="价格" ></el-table-column>
            <el-table-column prop="category_name" label="类别" ></el-table-column>
            <el-table-column prop="num" label="库存数量"></el-table-column>
            <el-table-column prop="createDate" label="上架时间"></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{row,$index}">
                    <el-button type="primary" size="small" @click="handlerDetailed(row,$index)">编辑</el-button>
                    <el-button type="danger" @click="handlerDeleteConfirm($index)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="modalType == 0 ? '商品添加' : '商品編集'" v-model="dialogVisible" width="30%"
            :beforeClose="handleClose">
            <el-form ref="ruleForm" :model="formData.data" :rules="formData.rules" label-position="right" label-width="80px">
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="formData.data.title" placeholder="请输入商品名称" ></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="formData.data.price" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="category_name">
                    <el-input v-model="formData.data.category_name" placeholder="请输入类别"></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="num">
                    <el-input  v-model="formData.data.num" placeholder="请输入库存数量"></el-input>
                </el-form-item>
                <el-form-item label="上架时间" prop="createDate">
                    <el-date-picker
                        style="widows: 100%;"
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
import { getCurrentInstance, onBeforeMount, reactive,} from "vue"
import { useRouter } from "vue-router";
import { getDate } from '@/utils/common';
import dayjs from 'dayjs'
import useGoodStore from '@/store/good.js'
const goodStore = useGoodStore()
const tableData =  goodStore.$state.goodList
const formData = reactive({
    data:{
        title:'',
        price:"",
        category_name:'',
        num:'',
        createDate:'',
    },
    rules:{
        title:[{required: true,message:'商品名称不能为空',trigger:'change'}],
        price:[{required:true,message:'价格不能为空',trigger:'change'}],
        category_name:[{required: true,message:'类别不能为空',trigger:'change'}],
        num:[{required:true,message:'商品数量不能为空',trigger:"change"}],
        createDate:[{ required: true,message:'请选择上架时间',trigger:'change'}],
    }
    
})
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
    tableData.splice(index,1)
}
const dialogVisible = ref(false)
const modalType = ref(0) //0表示新增的弹窗，1表示编辑

const handleClose = ()=>{
    dialogVisible.value = false
    formData.data.title = ""
    formData.data.createDate = ''
    formData.data.price = ''
    formData.data.category_name = ''
    formData.data.num = ''
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
                tableData.push(request_data)
            }else{
                const request_data = JSON.parse(JSON.stringify(formData.data));
                request_data.createDate = dayjs(request_data.createDate).format('YYYY-MM-DD');
                tableData[nowIndex.value] = request_data
            }
            dialogVisible.value = false
            formData.data.title = ""
            formData.data.createDate = ''
            formData.data.price = ''
            formData.data.category_name = ''
            formData.data.num = ''
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