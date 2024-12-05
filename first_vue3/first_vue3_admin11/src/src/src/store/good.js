import { defineStore } from "pinia";

const useGoodStore = defineStore('good',{
    state:()=>{
        return{
            goodList: [
                {
                    title:"风扇",
                    price: 20.00,
                    category_name:'家电',
                    num:"10",
                    createDate:"2024-03-12"
                },
                {
                    title:"牙膏",
                    price: 10.00,
                    category_name:'生活用品',
                    num:"8",
                    createDate:"2024-03-12"
                },
                {
                    title:"平凡的世界",
                    price: 12.00,
                    category_name:'书籍',
                    num:"5",
                    createDate:"2024-08-12"
                },
                {
                    title:"夏日短袖",
                    price: 30.00,
                    category_name:'衣服',
                    num:"6",
                    createDate:"2024-03-12"
                },
            ]
                
        }
    },
    getters:{
        //通过计算属性computed获取，调用时不需要()
        getBookList:(state)=>{
            return state.goodList
        }
    },
    actions:{
        //调用时使用()
    }
})

export default useGoodStore