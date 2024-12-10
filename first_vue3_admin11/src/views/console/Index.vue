<template>
    <div>
        <!-- 添加的部分开始 -->
        <!-- <el-alert
            title="欢迎来到管理系统！这是一个重要通知。"
            type="info"
            show-icon
            closable>
        </el-alert> -->
        <!-- 添加的部分结束 -->
        
        <el-row>
            <el-col :span="8" style="padding-right: 10px;">
                <el-card class="box-card">
                    <div class="user">
                        <img src="../../assets/images/a.jpg" alt="" />
                        <div class="userInfo">
                            <p class="name">マネージャー</p>
                            
                            <p class="access">{{ userName }}</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>こんにちは！&nbsp;&nbsp;<span>{{ userName }}</span>&nbsp;&nbsp;</p>
                    </div>
                </el-card>
                <el-card style="margin-top:20px; height:540px;">
                    <div class="container">
                    <h1>Manager GPT</h1>
        
                     <div class="form-group">
                　  <label for="dataInput">データを入力:</label>
                    <input type="text" id="inputText" placeholder="データをここに入力">
                    </div>

                   <div class="form-group">
             <button id="processButton" @click="callLlama3Api">送信!</button>
        </div>

        <div class="form-group">
            <label for="output">AIからの結果:</label>
            <textarea id="response" class="output-box" rows="10" readonly></textarea>
        </div>
    </div>
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
        <el-col>
                    <!-- 新增的HTML功能部分开始
        <div class="manager-gpt">
            <h1>マネージャーAgent</h1>
            <textarea id="inputText" rows="4" cols="50" placeholder="Enter your prompt here..."></textarea>
            <br>
            <button @click="callLlama3Api">送信</button>
            <div id="response"></div>
        </div>
                新增的HTML功能部分结束 -->
        </el-col> 
        </el-row>
        

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
            '電子製品': 1000,
            '衣服': 1200,
            'スキンケア': 1200,
            '本': 1380,
            '生活雑貨': 1560,
            '果物': 1400,
        },
        {
            '電子製品': 1208,
            '衣服': 1500,
            'スキンケア': 1700,
            '本': 1080,
            '生活雑貨': 1060,
            '果物': 1200,
        },
        {
            '電子製品': 1202,
            '衣服': 1550,
            'スキンケア': 1760,
            '本': 1240,
            '生活雑貨': 1030,
            '果物': 1020,
        },
        {
            '電子製品': 1100,
            '衣服': 1200,
            'スキンケア': 1100,
            '本': 1200,
            '生活雑貨': 1280,
            '果物': 1160,
        },
        {
            'アニメ': 1200,
            '衣服': 1950,
            'スキンケア': 1260,
            '本': 1340,
            '生活雑貨': 1430,
            '果物': 1520,
        },
        {
            'アニメ': 2100,
            '衣服': 2200,
            'スキンケア': 2100,
            '本': 2200,
            '生活雑貨': 2280,
            '果物': 2160,
        },
    ],
    date: ['2018年', '2019年', '2020年', '2021年', '2022年', '2023年']
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
        date:'2024',
        new: 10,
        active: 400
    },
])
const videoData = ref([
    {
        name: '電子製品',
        value: '3300'
    },
    {
        name: '衣服',
        value: '4000'
    },
    {
        name: 'スキンケア',
        value: '3000'
    },
    {
        name: '本',
        value: '4500'
    },
    {
        name: '生活雑貨',
        value: '4060'
    },
    {
        name: '果物',
        value: '3580'
    }
])

const userName = ref('中村綾乃')
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

        responseDiv.innerHTML = ` ${resultText.trim()}`;

        // 添加5秒后更新折线图的数据的功能
        setTimeout(() => {
            updateChartData();
        }, 1000);
    } catch (error) {
        responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}

const updateChartData = () => {
    // 更新 orderData 数据
    orderData.data = orderData.data.map(item => {
        return Object.keys(item).reduce((newItem, key) => {
            newItem[key] = item[key] + Math.floor(Math.random() * 200) - 100; // 随机变动数据
            return newItem;
        }, {});
    });
    
    // 重新渲染折线图
    getList1();
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
            text: '商品の導入数の計画'
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
            text: '商品分類'
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



        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        h1 {
            text-align: center;
            font-size: 1.8em;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .form-group input[type="text"], 
        .form-group textarea {
            width: 100%;
            padding: 10px;
            font-size: 1em;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .form-group button {
            width: 100%;
            padding: 10px;
            font-size: 1em;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .form-group button:hover {
            background-color: #0056b3;
        }

        .output-box {
            margin-top: 20px;
            background-color: #f1f1f1;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 5px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
</style>
