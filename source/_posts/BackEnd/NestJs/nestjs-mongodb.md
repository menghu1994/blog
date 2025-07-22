---
layout: post
title: nestjs/mongoose
index_txt: Nestjs
categories:
 - BackEnd
tags: ['Nestjs', 'Mongodb']
---

### 安装
```shell
npm install --save @nestjs/mongoose mongoose
```

### [启动数据库](../MongoDB/start_win.md)

### 连接数据库
在`app.module.ts`中导入模块
`imports: [MongooseModule.forRoot('mongodb://localhost/test')]`
