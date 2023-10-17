---
layout: post
title: webpack
tags: webpack
---

# web 项目搭建

> 已安装node

1. 新建文件夹(project-test)
2. 命令行进入文件夹，`npm init` 初始化项目
3. 安装`webpack`包
```shell
 npm install --save-dev webpack
 npm install --save-dev webpack-dev-server
 npm install --save-dev webpack-cli
 npm install --save-dev copy-webpack-plugin
```
4. 新建文件`webpack.config.js`
5. 新建目录和文件 `src/index.html index.js`, 并初始化html h5文件
6. `package.json` 添加打包和构建配置
 ```json
 {
 	"scripts": {
 		"build": "webpack",
 		"start": "webpack-dev-server"
 	}
 }
 ```
7. 启动项目 `npm start`
