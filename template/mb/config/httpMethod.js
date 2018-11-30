var url = require('url')
var qs = require('querystring');
let app = {
    pathGetArr: [],
    pathPostArr: [],
    get(path, handle) {
        this.pathGetArr.push({
            path: path,
            handle: handle
        })
    },
    post(path, handle) {
        this.pathPostArr.push({
            path: path,
            handle: handle
        })
    },
    main: (req, res, next) => {
        // console.log()
        const reqPath = url.parse(req.url).pathname

        const respond = {
                send(data) {
                    res.write(JSON.stringify(data))
                    res.end()
                }
            }
            // console.log(req.method)
        var state = false
        if (req.method == "GET") {
            let query = url.parse(req.url, true)
            state = app.pathGetArr.some((i) => {
                if (i.path == reqPath) {
                    res.writeHead(200, {
                        "Content-type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": "*"
                    });
                    i.handle(query, respond, next)
                    return true
                } else {
                    return false
                }
            })

        } else if (req.method == "POST") {
            state = app.pathPostArr.some((i) => {
                if (i.path == reqPath) {
                    var postData = "";
                    req.addListener("data", function(data) {
                        postData += data;
                    });
                    /**
                     * 这个是如果数据读取完毕就会执行的监听方法
                     */
                    res.writeHead(200, {
                        "Content-type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": "*"
                    });
                    req.addListener("end", function() {
                        var query = {...url.parse(req.url, true),
                            body: qs.parse(postData)
                        };
                        i.handle(query, respond, next);
                    });

                    return true
                } else {
                    return false
                }
            })
        }

        if (!state) {
            next()
        }
    }
}

module.exports = app