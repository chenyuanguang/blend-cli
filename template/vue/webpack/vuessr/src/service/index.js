var axois = require("axios")
    //如果更改端口，注意更改下面配置
var path = "http://127.0.0.1:8888"

export function getDataService() {
    //由于此接口可能存在客户端和服务端共同请求，所以路径必须写成绝对路径
    return axois.get(path + "/api/data")
}