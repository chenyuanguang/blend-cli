// // 接口的开放
var express = require("express")
var router = express.Router()
var list = require("./data.js")
router.get("/data", function(req, res, next) {
    res.send(list)
})
module.exports = router