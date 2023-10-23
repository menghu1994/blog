---
layout: post
title: Nestjs
tags: nestjs
---

# [NestJs](https://docs.nestjs.com/)

Tips: node.js > 16

## Install
1. npm i -g @nestjs/cli
2. nest new <projectA>


## 多app Project
`nest g app <appName>` 生成子服务端

### 生成公共多app共享文件
`nest g lib <libs>` 生成共享子目录，默认文件夹为`app`,可以更改为`@libs`

### 启动对应的app
`nest start <appName> -w`

## 命令行快速生成module，controller..
```shell
// 查看帮助
nest -help
// 生成module = nest generate module <ModuleName>
nest g mo <ModuleName> 
// 生成controller = nest generate controller <ControllerName>
// 如果ModuleName=ControllerName,则controller会自动注入到module里
nest g co <ControllerName>
```
