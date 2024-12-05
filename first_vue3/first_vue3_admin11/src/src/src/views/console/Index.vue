<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right: 10px;">
                <el-card class="box-card">
                    <div class="user">
                        <img src="file:///Users/xuyuanfeng/Downloads/image.webp" alt="" />
                        <div class="userInfo">
                            <p class="name">Admin</p>
                            <p class="access">{{ userName }}</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>ようこそ&nbsp;&nbsp;<span>{{ userName }}</span>&nbsp;&nbsp;様</p>
                    </div>
                </el-card>
                <el-card style="margin-top:20px; height:540px;">
                    <!-- <div slot="header" class="clearfix" style="text-align:center;">
                        <span>热门视频排行榜</span>
                    </div> -->
                    <h3 style="text-align:center;margin-bottom: 16px;">支店売上ランキング</h3>
                    <el-table
                    :data="tableData"
                    :header-cell-style="{textAlign: 'center'}"
                    :cell-style="{textAlign: 'center'}"
                    style="width: 100%">
                    <el-table-column label="ランキング">
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
                <!-- <div class="num">
                    <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex',padding: 0}">
                        <img class="img_title" src="../assets/logo.png" alt="" />
                        <div class="detail">
                            <p class="price">{{ item.name }}</p>
                            <p class="desc">收藏数量：{{ item.value }}</p>
                        </div>
                    </el-card>
                </div> -->
                <!-- <el-card style="height: 280px">
                    <div ref="echarts1" style="height: 280px"></div>
                </el-card>
                <div class="graph">
                    <el-card style="height: 260px">
                        <div ref="echarts2" style="height: 240px"></div>
                    </el-card>
                    <el-card style="height: 260px">
                        <div ref="echarts3" style="height: 240px"></div>
                    </el-card>
                </div> -->

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
    </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { onMounted, reactive, ref } from 'vue';
const tableData = ref([
    {
        name:'支店A',
        todayBuy: '1000',
        totalBuy: 600,
    },
    {
        name:'支店B',
        todayBuy: '900',
        totalBuy: 600,
    },
    {
        name:'支店C',
        todayBuy: '800',
        totalBuy: 600,
    },
    {
        name:'支店D',
        todayBuy: '700',
        totalBuy: 500,
    },
    {
        name:'支店E',
        todayBuy: '600',
        totalBuy: 400,
    },
    {
        name:'支店F',
        todayBuy: '500',
        totalBuy: 300,
    },
    {
        name:'支店G',
        todayBuy: '450',
        totalBuy: 800,
    },
    {
        name:'支店H',
        todayBuy: '300',
        totalBuy: 700,
    },
    {
        name:'支店I',
        todayBuy: '200',
        totalBuy: 800,
    },
    {
        name:'支店J',
        todayBuy: '100',
        totalBuy: 700,
    },
])
const tableLabel = reactive({
    name:'支店名',
    todayBuy:'売上高',
    totalBuy:'来店客数',
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
            '支店A': 10,
            '支店B': 15,
            '支店C': 12,
        },
        {
            '支店A': 20,
            '支店B': 40,
            '支店C': 24,
        },
        {
            '支店A': 30,
            '支店B': 80,
            '支店C': 90,
        },
        {
            '支店A': 40,
            '支店B': 90,
            '支店C': 100,
        },
        {
            '支店A': 90,
            '支店B': 100,
            '支店C': 150,
        },
        {
            '支店A': 120,
            '支店B': 130,
            '支店C': 170,
        },
        {
            '支店A': 220,
            '支店B': 220,
            '支店C': 210,
        },
    ],
    date:['8:00','10:00','12:00','14:00','16:00','18:00','20:00']
})
const userData = ref([
    {
        date:'8:00',
        new: 14,
        active: 20
    },
    {
        date:'10:00',
        new: 20,
        active: 20
    },
    {
        date:'12:00',
        new: 15,
        active: 500
    },
    {
        date:'14:00',
        new: 20,
        active: 300
    },
    {
        date:'16:00',
        new: 25,
        active: 300
    },
    {
        date:'18:00',
        new: 25,
        active: 400
    },
    {
        date:'20:00',
        new: 5,
        active: 200
    },
])
const videoData = ref([
    {
        name:'惣菜',
        value:'3300'
    },
    {
        name:'水産',
        value:'4000'
    },
    {
        name:'非食品',
        value:'3000'
    },
    {
        name:'一般食品',
        value:'4500'
    },
    {
        name:'日配品',
        value:'4060'
    },
    {
        name:'青果',
        value:'3580'
    }
])
const userAvatar = new URL("",import.meta.url).href
const userName = ref('中村 綾乃')
onMounted(()=>{
    getList1();
    getList2();
    getList3();
})
const echarts1 = ref(null)
const echarts2 = ref(null)
const echarts3 = ref(null)
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
            text: '一日各店舗の売上'
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
            text: '来店客数'
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
                name: '男性',
                data: userData.value.map(item=>item.new),
                type: 'bar'
            },
            {
                name: '女性',
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
</style>