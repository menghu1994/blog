---
layout: post
title: Mongodb
tags: ['Mongodb']
---

## Window Mongodb Install 6.0.6
1. Install MongoDB Community version 
 - default data path: `C:\Program Files\MongoDB\Server\6.0\data`
 - default log path `C:\Program Files\MongoDB\Server\6.0\log`
 - 添加系统环境变量 path 中添加 `C:\Program Files\MongoDB\Server\6.0\bin` 
2. [Install MongoDB Shell](https://www.mongodb.com/try/download/compass)
 - Copy file to `C:\Program Files\MongoDB\Server\6.0\bin`

## mac 安装mongodb
1. brew tap mongodb/brew
2. brew update
3. brew install mongodb-community@6.0
4. brew services start mongodb-community@6.0
 - brew services stop mongodb-community
 - brew services list // 查看服务是否启动
5. mongosh

`mongod --version`  查看mongod是否安装成功

## Command
命令行工具： `mongosh.exe`

 - `show dbs` 查看已连接的数据库
 - `use <database>` 切换数据库(如果没有则创建)
 - `show collections` 查看所有的表名
 - `db.<collection>.find( { name: 'Luffy' } )` 查询数据
 - `db.<collection>.updateOne({ name: "Luffy" }, { $set: { age: 35 } })` 修改数据
 - `db.<collection>.deleteOne({ name: "Luffy" })` 删除数据
 - `db.<collection>.insertOne({ name: "Luffy", age: 30 })` 添加数据

## Operators
### 增
`db.<表名称>.insert(<json数据>)` 数据库表插入数据
`db.<表名称>.insertMany(<数组数据>)` 数据库表插入多个数据

### 删
`db.<表名称>.remove(<json查询要删除的数据>)` 删除表中的某条数据
- db.test.update({'name': 'xiaoming'}, {$set:{'job': 'student'}}) 
`db.<表名称>.drop()` 删除表

### 改
`db.<表名称>.update(<json查找要更新的数据>, <更新的数据>)` 数据库表的所有数据

## 查询
+ `db.<表名称>.find()` 数据库表的所有数据
    - db.<表名称>.find({'name': 'luffy'}) 查询表中所有 name: luffy的数据
    - db.<表名称>.find({'name': 'luffy'}).pretty() 转化为易读json格式 
    - db.<表名称>.find({}, {'name': 1 }) 查询所有数据,但只显示每条数据的name
    - db.<表名称>.find({'price': {$gt: 10}}) 查询价格大于10的所有数据
+ $or, $and, $all, $in
    - db.<表名称>.find({$or: [{'price': {$gt: 10}}, {'rating: {$lt: 8}'}]}) 查询价格大于10或rate小于8的所有数据
    - db.<表名称>.find({'type': {$all: ['a', 'b']}}) 查询价格type数组里同时有a,b的所有数据
+ other
    - ...count() 显示总数
    - ...limit(10) 限制查询10条数据
  - ...sort({'name': 1}) 名称按正序排序
  - ...skip(2) 跳过2个元素
