// react项目询问
const inquirer = require('inquirer')
const fileHandle=require("../fileHandle")

async function AskReactProject(templateReadPath){
    
    let state=await fileHandle.testDir(templateReadPath)
    if(state){
        let projectType=fileHandle.findFileName(templateReadPath)

        var ask= await inquirer.prompt([{
            type: 'list',
            message: 'react-project-type?',
            name: 'react-project-type',
            choices:projectType
        }])

    }else{
        var ask={}
    }
    
      return ask
}

module.exports=AskReactProject