---
layout: post
title: 数据库异常关闭
categories:
 - BackEnd
tags: ['Mongodb']
---

# 数据库异常关闭

linux
`sudo systemctl status mongod`检查服务状态
`sudo systemctl start mongod`启动服务

windows
`sc query MongoDB` 查看`STATE 1 STOPPED`为关闭，`STATE 4 RUNNING`为正在运行
`net start MongDB` 启动服务