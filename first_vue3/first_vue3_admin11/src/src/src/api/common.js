import instance from "@/utils/request";

export function GetCode(data){
    return instance.request({
        method:'post',
        url:'/getCode/',
        data
    })
}

// 状态码异常演示接口
export function ErrorHttp(data){
    return instance.request({
        method:"post",
        url:'/error/',
        data
    })
}

/** 文件上传 */
export function UploadFile(data = {}){
    return instance.request({
        method: "post",
        url: "/upload",
        data
    })
}