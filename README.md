# blend-cli 
> 版本 `@blend/cli` 1.5.2.

## 介绍：
>可以实现vue、react项目的自动化搭建；
>
>可以实现基于gulp构建的模块化等多页面项目的搭建；

## 作者：

>陈元广


##查看node版本：

    "必须保证node在7.3以上版本"

##下载安装

检查是否安装过blend-cli

```bash
    blend -V
```
###初次安装
```bash
    npm install -g blend-cli
```

###版本更新

使用插件进行更新

####windows
这里采用的是最笨拙有效的方式（windows权限问题很恶心）

>1、先找到全局npm和npm-cache(一般都在C:\Users\用户名\AppData\Roaming)
>
>2、删除npm-cache(防止从缓存中读取blend-cli)
>
>3、打开npm文件夹
>
>4、把如下文件删除：blend、vuecli、vuecli-init、reactcli、reactcli-init、mbcli、mbcli-init
>
>5、打开npm/node_modules文件夹：删除blend-cli
>
>6、再次进行全局安装
>

```bash
    npm install -g blend-cli
```
####mac

>1、先找到命令所在的文件夹(一般都在/usr/local/bin/)
>
>2、打开文件夹
>
>3、把如下文件删除：blend、vuecli、vuecli-init、reactcli、reactcli-init、mbcli、mbcli-init
>
>4、打开/usr/local/lib/node_modules文件夹：删除blend-cli
>
>5、再次进行全局安装
>

```bash
    npm install -g blend-cli
```


##创建项目：

###react项目创建：

####template-name:

>1、webpack：自动集成了所有的配置，在创建项目时，以询问的方式进行项目配置
>
>2、normal：可以添加任何一种react模板，不具备创建项目时的询问
####创建
```bash
    reactcli init <template-name> [project-name]
    cd [project-name]
    npm install
    npm start
```
example：

```bash
    reactcli init webpack reactTest
    reactcli init normal reactTest
```

###vue项目创建：
            
####template-name:

>1、webpack：自动集成了所有的配置，在创建项目时，以询问的方式进行项目配置
>
>2、normal：可以添加任何一种react模板，不具备创建项目时的询问

####创建
```bash
    vuecli init <template-name> [project-name]
    cd [project-name]
    npm install
    npm start
```
example：

```bash
    vuecli init webpack vueTest
    vuecli init normal vueTest
```

###mb项目创建(移动项目)：
            

####创建
```bash
    mbcli init [project-name]
    cd [project-name]
    npm install
    npm start
```
example：

```bash
    mbcli init mbTest
```

##注：

####template-name为webpack的配置说明：

        name                   项目名称
        description            项目描述
        author                 项目作者
        email                  邮箱
        device                 项目平台
        host                   项目访问地址
        port                   项目端口号
        browerOpen             是否在浏览器中直接打开
        devtool                是否使用webpack的devtool调试代码
        cssType                是否使用sass，less进行css书写
        mock                   是否使用mock进行接口数据的模拟
        esLint                 是否使用esLint
        react-project-type     
        # or
        vue-project-type       使用何种模板创建项目




###使用antd时，在config/config.js的babel：plugin中添加如下配置：

```javascript
    ["import", { 
        "libraryName": "antd",
        "libraryDirectory": "es", 
        "style": "css" 
    }]
```
###使用antd-mobile时，在config/config.js的babel：plugin中添加如下配置：
```javascript
    ["import", {
        libraryName: "antd-mobile",
        style: true,
    }]
```
