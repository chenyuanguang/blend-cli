const inquirer = require('inquirer')

//   设备询问

async function AskDevice(){
    
      let ask1= await inquirer.prompt([{
            type: 'list',
            message: 'device?',
            name: 'device',
            choices:[
                "pc",
                "mobile"
            ]
        }])
        
        if(ask1.device=="mobile"){
            var ask2= await inquirer.prompt([{
                type: 'input',
                message: 'deviceWidth?',
                name: 'deviceWidth',
                default:"750"
            }])
        }

        return {
            device:ask1.device,
            deviceWidth:ask1.device=="mobile"?ask2.deviceWidth:null
        } 
}
  // 项目询问

  function AskBaseProject() {
    let data = [
        {
            type: 'input',
            message: 'host?',
            name: 'host',
            default:"127.0.0.1"
          },
         
          {
            type: 'input',
            message: 'port?',
            name: 'port',
            default:"8888"
          },
          {
            type: 'confirm',
            message: 'is browserOpen?',
            name: 'browserOpen',
            default:true
          },
          {
            type: 'list',
            message: 'use devtool?',
            name: 'devtool',
            choices:[
              "false",
              "cheap-module-eval-source-map",
              "source-map",
              "cheap-source-map",
              "cheap-module-source-map"
            ]
          },
          {
            type: 'list',
            message: 'use cssType?',
            name: 'cssType',
            choices:[
              "false",
              "less",
              "sass"
            ]
          },
          {
            type: 'confirm',
            message: 'use mock?',
            name: 'mock',
            default:true
          },
          {
            type: 'confirm',
            message: 'use esLint?',
            name: 'esLint',
            default:true
          }
        
    ]
    return inquirer.prompt(data)
  }


  module.exports= {
    AskDevice,
    AskBaseProject
  }
