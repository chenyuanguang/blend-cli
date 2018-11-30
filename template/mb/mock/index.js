let app = require("../config/httpMethod")
let data = require("./data.js")
    // get请求方式的使用
app.get("/api/list", function(req, res, next) {
        // post请求获取参数，通过下面的req.query获取
        console.log(req)
        res.send({
            code: "1001",
            msg: "列表数据请求成功",
            data
        })
    })
    // post请求方式的使用
app.post("/api/tab", function(req, res, next) {
    // post请求获取参数，通过下面的req.body获取
    console.log(req)
    res.send({ data: "post请求" })
})
module.exports = app.main