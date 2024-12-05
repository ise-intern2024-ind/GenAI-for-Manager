<template>
    <div class="shoppingCart">
        <el-card class="shopping_card">
            <div class="title" style="display: flex;flex-direction: row;">
                <span>个人中心</span>
            </div>
            <div>
            <div style="display: flex;flex-direction: row;padding:0px 50px">
                <div style="width:100px;height:100px;margin-right: 50px;">
                    <img src="../../assets/images/a.jpg" style="width:100%;height: 100%;border-radius: 50%"/>
                </div>
                <div style="display: flex;flex-direction: column;justify-content: space-around;">
                    <h1>姓名：小明同学</h1>
                    <h1>简介：蓝天白云</h1>
                    <h2>余额：1000.00</h2>
                </div>
            </div>  
            </div> 
        </el-card>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .shoppingCart {
        display: flex;
        justify-content: center;
        
        background-color: #eee;
    }   /**购物车背景设置*/

    .shopping_card {
        margin: 30px 0px;
        width: 600px;
    }

    .title {
        font-size: 20px;
        font-weight: 600;
        padding-left: 10px;
        padding-bottom: 20px;
        text-align: left;

    }

    .cover {
        width: 100px;
        height: 100px;
    }

    .number {
        padding: 0px 10px;
    }

    .bottom {
        margin-top: 20px;
        text-align: right;
    }

    .tips {
        font-size: 16px;
        padding-right: 20px;
    }


    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>