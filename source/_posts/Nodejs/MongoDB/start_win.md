---
layout: post
title: Mongodb
tags: mongodb
---

## Window Mongodb
## Install 6.0.6
1. Install MongoDB Community version 
 - default data path: `C:\Program Files\MongoDB\Server\6.0\data`
 - default log path `C:\Program Files\MongoDB\Server\6.0\log`
 - 添加系统环境变量 path 中添加 `C:\Program Files\MongoDB\Server\6.0\bin` 
2. [Install MongoDB Shell](https://www.mongodb.com/try/download/compass)
 - Copy file to `C:\Program Files\MongoDB\Server\6.0\bin`

## Command
命令行工具： `mongosh.exe`

 - `show dbs` 查看已连接的数据库
 - `use <database>` 切换数据库
 - `db.<collection>.find( { name: 'Luffy' } )` 查询数据
 - `db.<collection>.updateOne({ name: "Luffy" }, { $set: { age: 35 } })` 修改数据
 - `db.<collection>.deleteOne({ name: "Luffy" })` 删除数据
 - `db.<collection>.insertOne({ name: "Luffy", age: 30 })` 添加数据
