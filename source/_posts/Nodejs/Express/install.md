---
layout: post
title: Run express
tags: ['express']
---


# Express Project Create

```shell
// 创建项目文件夹
touch project-express
// 进入项目目录
cd project-express
// 初始化项目
npx init -y
// 安装express
npx add express
// 安装ts及express ts包
npx add -D typescript @types/node @types/express
// 生成tsconfig配置文件 选择node
npx tsconfig.json 
// 安装ts-node-dev热更新
npx add -D ts-node-dev
// 安装nodemon热更新
npx add -D nodemon ts-node

// 创建index目录
src/index.ts
// 更改文件启动package.json
"scripts": {
  "build": "npx tsc",
  "start": "ts-node-dev --respawn src/index.ts",
  "dev": "nodemon --exec ts-node src/index.ts"
},
```
