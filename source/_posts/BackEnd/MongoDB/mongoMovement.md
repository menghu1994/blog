---
layout: post
title: 数据库迁移
categories:
 - BackEnd
tags: ['Mongodb']
---

## Mongodb 数据库迁移

#### 定位数据库位置
+ Windows
方法1. `W + R` => `services.msc` => 找到MongoDB Server => 右键属性找到`可执行文件的路径`=>找到mongod.cfg => 打开查看`storage dbPath`
方法2. 使用`mongosh`  => db.adminCommand({ getCmdLineOpts: 1 }) => storage: { dbPath: "C:\\data\\db" }
2. 安装迁移工具`mongodump/mongorestore`, 默认位置与`mongosh`位置相同，如果没有则去[安装地址](https://www.mongodb.com/try/download/database-tools),下载后解压，把 bin 目录路径加到系统 PATH 即可。

#### 迁移
1. 备份
```sh
# 本地 MongoDB 全库备份
mongodump --host localhost --port 27017 --out D:\mongodb_backup

# 只备份某个库
mongodump --db 我的库名 --out D:\mongodb_backup

# 备份带密码的 MongoDB
mongodump -u 用户名 -p 密码 --authenticationDatabase admin --out D:\backup

# 备份远程服务器
mongodump --host 192.168.1.100 --port 27017 --out D:\backup
```

2. 恢复
```sh
# 恢复全库
mongorestore D:\mongodb_backup

# 恢复单个库到本地 MongoDB
mongorestore --db 目标库名 D:\mongodb_backup\原库名

# 恢复带密码的数据库
mongorestore -u 用户名 -p 密码 --authenticationDatabase admin D:\backup

# 恢复到远程服务器
mongorestore --host 192.168.1.100 --port 27017 D:\backup
```

#### 迁移案例
1. 从 windows 迁移到 Linux
备份  `mongodump -u 用户名 -p 密码 --authenticationDatabase admin --db 库名 --out D:\backup`
恢复  `mongorestore -u 用户名 -p 密码 --authenticationDatabase admin --db 库名 备份路径`


#### tips
`mongorestore --drop` 会先清空数据库在恢复，不加则默认合并