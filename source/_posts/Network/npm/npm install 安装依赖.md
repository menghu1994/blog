---
layout: post
title: npm install 安装依赖
index_img: https://oss-cn-hangzhou.aliyuncs.com/codingsky/cdn/img/2020-01-14/199f28ab01b68d6055185cb291412a98.png
banner_img: https://oss-cn-hangzhou.aliyuncs.com/codingsky/cdn/img/2020-01-14/199f28ab01b68d6055185cb291412a98.png
tags: ['Nodejs']
---

```npm
npm init -y   初始化项目并生成package.json文件
```
**-y** yes的缩写，会跳过所有的配置提示，直接生成package.json文件，配置可在文件生成后直接在文件中填写。
---

```npm
npm install        //安装依赖
```
当你的`package.json`文件中配置了相关的依赖，`npm install` 会将配置中的依赖下载到当前目录的`node_modules`文件夹中（如果没有这个文件夹则自动生成一个）。
```
"dependencies": { 					//生产环境
    "vue": "2.6.10",
    "vue-router": "3.0.6",
    "vuex": "3.1.0"
},
"devDependencies": {				//开发环境
	"sass": "1.26.8"
}
```
比如你的`package.json`中配置了上述内容，那么执行`npm install`则会下载vue,vue-router,vuex,sass模块下载到`node_modules`文件夹中

---


```npm
npm install '模块名称' 	//安装安装 Node.js 中的‘模块名称’模块
```




## 安装指定包依赖（以vue为例）
+ npm install vue --global 	//全局安装vue,下载vue到电脑中，而不是当前项目文件中
    - npm i vue -g  	//缩写
    - 因为vue插件包的版本总会更新迭代，不建议当前的vue版本直接下载到本机
+ npm install vue --save    //安装运行时的依赖
    - npm install vue -S    //缩写
    - 安装vue到当前项目的`node_modules`文件夹中，并在`package.json`中的`dependencies`添加`"vue":"版本号"`
+ npm install vue --save-dev    //安装开发环境的依赖
    - npm install vue -D   //缩写
    - 安装vue到当前项目的`node_modules`文件夹中，并在`package.json`中的`devDependencies`添加`"vue":"版本号"`





### 5种`npm`依赖
+ dependencies => 放置项目中代码运行时需要用到的依赖
+ devDependencies => 放置本地开发过程中需要使用到的编译、打包、测试、格式化模块等
+ peerDependencies => 放置本模块需要宿主环境提供的模块依赖（通常本模块是为了给引用方提供服务时设置依赖）
+ bundledDependencies => 和上面的配置不同，为数组格式，其中包含需要被打包进本地 package 里的依赖模块名，通过 npm pack 命令生成一个模块包
    - -B  //缩写
+ optionalDependencies => 放置一些项目中可忽略其各种错误的包模块，和 dependencies 一样，但该模块可有可无
    - -O  //缩写
