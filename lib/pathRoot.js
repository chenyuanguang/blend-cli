var program = require('commander');
program
    .parse(process.argv);
const path = require("path")
module.exports = {
    resolve(paths) {
        if (program.args[2] == "[object Object]") {
            if (typeof(paths) == "string") {

                return path.normalize(path.join(process.cwd(), program.args[1], paths))
            } else {

                return path.normalize(path.join(process.cwd(), program.args[1]))
            }
        } else {
            if (typeof(paths) == "string") {

                return path.normalize(path.join(process.cwd(), program.args[0], paths))
            } else {

                return path.normalize(path.join(process.cwd(), program.args[0]))
            }
        }
    }
}