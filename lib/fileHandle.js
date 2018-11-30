let path = require("path")
let pathResolve = require("./pathRoot").resolve
let fs = require("fs")
const reg = require("./reg")
module.exports = {
    // 删除文件夹
    delDir(path) {
        return new Promise((resolve, reject) => {
            var files = [];
            if (fs.existsSync(path)) {
                files = fs.readdirSync(path);
                files.forEach((file, index) => {
                    var curPath = path + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) { // recurse  
                        this.delDir(curPath);
                    } else { // delete file  
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
                resolve()
            }
        })

    },
    // 修改package文件
    amendJson(amendObj) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathResolve("package.json"), 'utf8', function (err, data) {
                if (err) console.log(err);
                
                var config = JSON.parse(data);

                Object.assign(config, amendObj)

                config = JSON.stringify(config, null, 4);
                fs.writeFileSync(pathResolve("package.json"), config)
                resolve()
            });
        })
    },
    
    deleteJson(deleteObj) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathResolve("package.json"), 'utf8', function (err, data) {
                if (err) console.log(err);
                var config = JSON.parse(data);
               
                Object.keys(deleteObj).forEach((i) => {
                    delete config[i]
                })

                config = JSON.stringify(config, null, 4);
                fs.writeFileSync(pathResolve("package.json"), config)
                resolve()
            });
        })

    },
    // 修改config文件
    amendConfig(config) {
        console.log(config)
        return new Promise((resolve, reject) => {
            fs.readFile(pathResolve("config/config.js"), 'utf8', function (err, data) {
                if (err) console.log(err);
                
                Object.keys(config).forEach((i) => {

                    data = data.replace(reg.createObjectAttrRegNoLast(i), () => {
                        let val
                        if (typeof (config[i]) == "string") {
                          
                            val = i + ":'" + config[i] + "',"
                        } else if (config[i] == null) {
                            // 删除属性
                            val = ""
                        } else {
                            val = `${i}:${config[i]},`
                        }
                        if(i=="host"){
                            console.log(val)
                        }
                        return val
                    })
                })
                // console.log(reg.createObjectAttrRegNoLast("host").exec(data))
                // console.log(reg.createObjectAttrRegNoLast("publicPath").exec(data))
                // console.log(data.replace(reg.createObjectAttrRegNoLast("host"),"host:'127.0.0.1"))
                // console.log(reg.createObjectAttrRegNoLast("host").test(data))
                // console.log(1111)
                // console.log(data)
                data=data.replace(reg.createObjectAttrRegNoLast("host"),"host:'"+config.host+"',")
                fs.writeFileSync(pathResolve("config/config.js"), data)
                resolve()
            });
        })

    },
    // 文件夹重命名
    renameDir(oldDir, newDir) {
        return new Promise((resolve, reject) => {
            fs.renameSync(pathResolve(oldDir), pathResolve(newDir))
            resolve()
        })
    },
    // 复制文件夹
    copyDirSync(srcRoot, targitRoot) {
        return new Promise((resolve, reject) => {
            //读取目录
            var copy = function (src, dst) {
                fs.readdirSync(src).forEach(function (file) {
                   
                    var _src = path.join(src, file);
                    var _dst = path.join(dst, file);
                    if (fs.statSync(_src).isFile()) {
                        readable = fs.createReadStream(_src); //创建读取流
                        writable = fs.createWriteStream(_dst); //创建写入流
                        readable.pipe(writable);
                    } else if (fs.statSync(_src).isDirectory()) {
                        exists(_src, _dst, copy);
                    } 
                });
            }
            var exists = function (src, dst, callback) {
                //测试某个路径下文件是否存在
                fs.exists(dst, function (exists) {
                    if (exists) { //不存在
                        callback(src, dst);
                    } else { //存在
                        fs.mkdir(dst, function () { //创建目录
                            callback(src, dst)
                        })
                    }
                })
            }
            exists(srcRoot, targitRoot, copy)
            setTimeout(()=>{
                resolve()
            },1000)
        })
    },
    // 查看文件夹下的文件
    findFileName(startPath) {
        let result=[];
        function finder(paths) {
            let files=fs.readdirSync(paths);
            files.forEach((val,index) => {
                let fPath=path.join(paths,val);
                let stats=fs.statSync(fPath);
                if(stats.isDirectory()) {
                    result.push(val);
                    // 递归读取文件夹下文件
                    // finder(fPath)
                };
                // 读取文件名
                // if(stats.isFile()) result.push(fPath);
            });
    
        }
        finder(startPath);
        // console.log(result)
        return result;
    },
    // 检测某个文件夹是否存在
    testDir(dst){
        return new Promise((resolve,reject)=>{
            fs.exists(dst, function (exists) {
                if (exists) { //不存在
                    resolve(true)
                } else { //存在
                   resolve(false)
                }
            })
        })
      
    }

}