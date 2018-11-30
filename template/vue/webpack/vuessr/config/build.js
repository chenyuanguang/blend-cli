const fs = require("fs")
const path = require("path")


let package = require("../package.json")

delete package.devDependencies

package.scripts = {
    start: "node server.js"
}


try {
    fs.writeFileSync(path.resolve(process.cwd(), "./dist/package.json"), JSON.stringify(package), "utf-8")
    fs.copyFileSync(path.resolve(process.cwd(), "./server/server.js"), path.resolve(process.cwd(), "./dist/server.js"))
} catch (error) {

    console.log(error)

}