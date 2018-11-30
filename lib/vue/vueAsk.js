// vue项目询问
const inquirer = require('inquirer')
const fileHandle = require("../fileHandle")

async function AskVueProject(templateReadPath) {
    let state = await fileHandle.testDir(templateReadPath)
    if (state) {
        let projectType = fileHandle.findFileName(templateReadPath)

        var ask = await inquirer.prompt([{
            type: 'list',
            message: 'vue-project-type?',
            name: 'vue-project-type',
            choices: projectType
        }])

    } else {
        var ask = {}
    }

    return ask

}

module.exports = AskVueProject