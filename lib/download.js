
const ora = require('ora')
const pathResolve = require("./pathRoot").resolve
const fileHandle = require("./fileHandle")
module.exports = function (templatePath) {
    return new Promise((resolve, reject) => {
        const spinner = ora('downloading project')
        spinner.start()
        fileHandle.copyDirSync(templatePath, pathResolve()).then(() => {
            spinner.stop()
            resolve()
        }).catch((err) => {
            console.log(err);
            reject(err)
        });

        // Git
        // .Clone(gitPath, pathResolve())
        // .then(function (repo) {
        //     spinner.stop()
        //     resolve(repo)
        // })
        // .catch((err) => {
        //     console.log(err);
        //     reject(err)
        // });
    })
}