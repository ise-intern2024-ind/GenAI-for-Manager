import { reactive } from 'vue';
import { GetCategory } from '../api/info';

export function categoryHook(){
    const infoData = reactive({
        category_options:[]
    })

    const handlerGetCategory = ()=>{
        GetCategory().then(res=>{
            infoData.category_options = res.data
        })
    }
    return {
        infoData,
        handlerGetCategory
    }
}