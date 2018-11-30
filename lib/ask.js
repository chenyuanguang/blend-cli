const inquirer = require('inquirer')
const webpackAsk = require("./webpackAsk")

// 询问基本信息
function AskBase(program, defaultName) {
    let data = [{
            type: 'input',
            message: 'name?',
            name: 'name',
            default: defaultName
        },
        {
            type: 'input',
            message: 'description?',
            name: 'description',
            default: ""
        },
        {
            type: 'input',
            message: 'author?',
            name: 'author',
            default: ""
        },
        {
            type: 'input',
            message: 'email?',
            name: 'email',
            default: ""
        }
    ]

    return inquirer.prompt(data)
}
module.exports = async function Ask(program, projectType, templateReadPath) {

    switch (program.args[0]) {
        case "webpack":
            {
                let base = await AskBase(program, program.args[1])
                let device = await webpackAsk.AskDevice()
                var projectBase = await webpackAsk.AskBaseProject()
                switch (projectType) {
                    case "react":
                        {
                            var project = await require("./react/reactAsk.js")(templateReadPath)
                        }
                        break;
                    case "vue":
                        {
                            var project = await require("./vue/vueAsk.js")(templateReadPath)
                        }
                        break;
                    case "static":
                        {
                            var project = await require("./static/staticAsk.js")(templateReadPath)
                        }
                        break;
                }
                return Object.assign({}, base, device, projectBase, project)
            }
            break;
        case "normal":
            {
                let base = await AskBase(program, program.args[1])
                switch (projectType) {
                    case "react":
                        {
                            var project = await require("./react/reactAsk.js")(templateReadPath)
                        }
                        break;
                    case "vue":
                        {
                            var project = await require("./vue/vueAsk.js")(templateReadPath)
                        }
                        break;
                    case "static":
                        {
                            var project = await require("./static/staticAsk.js")(templateReadPath)
                        }
                        break;
                }

                return Object.assign({}, base, project)
            }
            break;
        default:
            {
                let base = await AskBase(program, program.args[0])
                return base
            }
    }


}