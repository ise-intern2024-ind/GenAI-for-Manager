<template>
    <div>
        <!-- 添加的部分开始 -->
        <el-alert
            title="欢迎来到管理系统！这是一个重要通知。"
            type="info"
            show-icon
            closable>
        </el-alert>
        <!-- 添加的部分结束 -->
        
        <el-row>
            <el-col :span="8" style="padding-right: 10px;">
                <el-card class="box-card">
                    <div class="user">
                        <img src="../../assets/images/a.jpg" alt="" />
                        <div class="userInfo">
                            <p class="name">Admin</p>
                            <p class="access">{{ userName }}</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>欢迎&nbsp;&nbsp;<span>{{ userName }}</span>&nbsp;&nbsp;到来!</p>
                    </div>
                </el-card>
                <el-card style="margin-top:20px; height:540px;">
                    <h3 style="text-align:center;margin-bottom: 16px;">热门商品排行</h3>
                    <el-table
                    :data="tableData"
                    :header-cell-style="{textAlign: 'center'}"
                    :cell-style="{textAlign: 'center'}"
                    style="width: 100%">
                    <el-table-column label="排行">
                        <template #default="{row,$index}">
                            <span :class="($index + 1) < 4 ? 'addColor' : '' "><em>{{ $index + 1 }}</em></span>
                        </template>
                    </el-table-column>
                        <el-table-column
                            v-for="(val,key) in tableLabel"
                            :prop="key"
                            :label="val"
                            :key="key"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="padding-left: 10px;">
                <el-card style="height: 420px">
                    <div ref="echarts1" style="height: 420px"></div>
                </el-card>
                <div class="graph">
                    <el-card style="height: 325px">
                        <div ref="echarts2" style="height: 325px"></div>
                    </el-card>
                    <el-card style="height: 325px">
                        <div ref="echarts3" style="height: 325px;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        
        <!-- 新增的HTML功能部分开始 -->
        <div class="manager-gpt">
            <h1>Manager GPT</h1>
            <textarea id="inputText" rows="4" cols="50" placeholder="Enter your prompt here..."></textarea>
            <br>
            <button @click="callLlama3Api">Send Request</button>
            <div id="response"></div>
        </div>
        <!-- 新增的HTML功能部分结束 -->
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, reactive, ref } from 'vue';

const tableData = ref([
    {
        name:'华为手机',
        todayBuy: '1000',
        totalBuy: 600,
    },
    {
        name:'小明手机',
        todayBuy: '900',
        totalBuy: 600,
    },
    {
        name:'华为手表',
        todayBuy: '800',
        totalBuy: 600,
    },
    {
        name:'小明手表',
        todayBuy: '700',
        totalBuy: 500,
    },
    {
        name:'西瓜',
        todayBuy: '600',
        totalBuy: 400,
    },
    {
        name:'冰淇淋',
        todayBuy: '500',
        totalBuy: 300,
    },
    {
        name:'雨伞',
        todayBuy: '450',
        totalBuy: 800,
    },
    {
        name:'李宁鞋子',
        todayBuy: '300',
        totalBuy: 700,
    },
    {
        name:'水杯',
        todayBuy: '200',
        totalBuy: 800,
    },
    {
        name:'鼠标',
        todayBuy: '100',
        totalBuy: 700,
    },
])
const tableLabel = reactive({
    name:'商品名称',
    todayBuy:'销量',
    totalBuy:'阅读人数',
})
const countData = ref([
    {
        name: '火影忍者第一部',
        value: 12123,
        icon: 'success',
        color:'#2ec7c9',
    },
    {
        name:'火影忍者第二部',
        value: 12123,
        icon: 'success',
        color:'#2ec7c9',
    },
    {
        name:'火影忍者第三部',
        value: 12123,
        icon: 'success',
        color:'#2ec7c9',
    },
    {
        name:'火影忍者第四部',
        value: 12123,
        icon: 'success',
        color:'#2ec7c9',
    },
    {
        name:'火影忍者第五部',
        value: 12123,
        icon: 'success',
        color:'#2ec7c9',
    },
    {
        name:'火影忍者第六部',
        value: 12123,
        icon: 'success',
        color:'#2ec7c9',
    }
])
const orderData = reactive({
    data: [
        {
            '电子产品': 1000,
            '衣服': 1200,
            '护肤品': 1200,
            '书籍': 1380,
            '生活用品': 1560,
            '水果': 1400,
        },
        {
            '电子产品': 1208,
            '衣服': 1500,
            '护肤品': 1700,
            '书籍': 1080,
            '生活用品': 1060,
            '水果': 1200,
        },
        {
            '电子产品': 1202,
            '衣服': 1550,
            '护肤品': 1760,
            '书籍': 1240,
            '生活用品': 1030,
            '水果': 1020,
        },
        {
            '电子产品': 1100,
            '衣服': 1200,
            '护肤品': 1100,
            '书籍': 1200,
            '生活用品': 1280,
            '水果': 1160,
        },
        {
            '动漫': 1200,
            '衣服': 1950,
            '护肤品': 1260,
            '书籍': 1340,
            '生活用品': 1430,
            '水果': 1520,
        },
        {
            '动漫': 2100,
            '衣服': 2200,
            '护肤品': 2100,
            '书籍': 2200,
            '生活用品': 2280,
            '水果': 2160,
        },
    ],
    date:['2018','2019','2020','2021','2022','2023']
})
const userData = ref([
    {
        date:'2018',
        new: 10,
        active: 300
    },
    {
        date:'2019',
        new: 10,
        active: 400
    },
    {
        date:'2020',
        new: 15,
        active: 500
    },
    {
        date:'2021',
        new: 20,
        active: 300
    },
    {
        date:'2022',
        new: 25,
        active: 300
    },
    {
        date:'2023',
        new: 25,
        active: 400
    },
    {
        date:'更多',
        new: 5,
        active: 200
    },
])
const videoData = ref([
    {
        name:'电子产品',
        value:'3300'
    },
    {
        name:'衣服',
        value:'4000'
    },
    {
        name:'护肤品',
        value:'3000'
    },
    {
        name:'书籍',
        value:'4500'
    },
    {
        name:'生活用品',
        value:'4060'
    },
    {
        name:'水果',
        value:'3580'
    }
])
const userName = ref('小明同学')
const echarts1 = ref(null)
const echarts2 = ref(null)
const echarts3 = ref(null)

const callLlama3Api = async () => {
    const inputText = document.getElementById("inputText").value;
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Loading...";

    try {
        const response = await fetch('http://localhost:5000/generate_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: inputText
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let resultText = "";

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
                const chunk = decoder.decode(value, { stream: true });
                const parts = chunk.split(/\n+/);
                for (const part of parts) {
                    if (part.trim()) {
                        try {
                            const json = JSON.parse(part);
                            if (json.response) {
                                resultText += json.response;
                            }
                        } catch (e) {
                            console.error("Failed to parse JSON:", e);
                        }
                    }
                }
            }
        }

        responseDiv.innerHTML = `<strong>Response:</strong> ${resultText.trim()}`;
    } catch (error) {
        responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}

onMounted(()=>{
    getList1();
    getList2();
    getList3();
})

const getList1 = ()=>{
    const order = orderData
    const xData = orderData.date
    const keyArray = Object.keys(orderData.data[0])
    const series = []
    keyArray.forEach(key => {
        series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
        })
    })

    const option = {
        title: {
            text: '商品类别数量'
        },
        //提示框
        tooltip:{
            trigger:'axis',
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        legend: {
            data: keyArray
        },
        series
    }
    const E = echarts.init(echarts1.value)
    E.setOption(option)
}
const getList2 = ()=>{
    const userOption = {
        title: {
            text: '书籍销量'
        },
        legend:{
            //图例文字颜色
            textStyle:{
                color:'#333',
            },
        },
        grid: {
            left: '20%'
        },
        //提示框
        tooltip:{
            trigger:'axis',
        },
        xAxis:{
            type:'category', //类目轴
            data: userData.value.map(item=>item.date),
            axisLine:{
                lineStyle:{
                    color:'#17b3a3',
                }
            },
            axisLabel:{
                interval: 0,
                color: "#333"
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#17b3a3',
                    }
                }
            }
        ],
        color:['#2ec7c9','#b6a2de'],
        series:[
            {
                name: '国内',
                data: userData.value.map(item=>item.new),
                type: 'bar'
            },
            {
                name: '国外',
                data: userData.value.map(item=>item.new),
                type: 'bar'
            }
        ]
    }
    const U = echarts.init(echarts2.value)
    U.setOption(userOption)
}
const getList3=()=>{
    const videoOption = {
        title: {
            text: '商品分类数量'
        },
        tooltip:{
            trigger: "item",
        },
        color:[
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
        ],
        series: [
            {
                data: videoData.value,
                type: 'pie'
            }
        ],
    }
    const V = echarts.init(echarts3.value)
    V.setOption(videoOption)
}
</script>

<style lang="scss" scoped>
.user{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img{
        margin-left: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .userInfo{
        margin-left: 40px;
        .name{
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access{
            color: #999999;
        }
    }
}
.login-info{
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span{
            color: #666666;
            // margin-left: 60px;
        }
    }
}
.addColor{
    font-weight: bold;
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .img_title{
        width: 80px;
        height: 80px;
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            font-size: 24px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc{
            font-size: 16px;
            color: #999;
            text-align: center;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
        width: 49%;
    }
}
.is-message-box{
    position: relative;
    z-index: 9000;
}
.manager-gpt {
    margin-top: 40px;
    text-align: center;
    textarea {
        width: 80%;
        max-width: 600px;
    }
    button {
        margin-top: 10px;
        padding: 10px;
    }
    #response {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        background-color: #fff;
        width: 80%;
        max-width: 600px;
        word-wrap: break-word;
        display: inline-block;
    }
}
</style>
