---
layout: post
title: Ubuntu基础命令之文件移动
index_img: https://img1.baidu.com/it/u=1243008851,1044741337&fm=253&fmt=auto&app=120&f=JPEG?w=593&h=332
categories:
 - FrontEnd
tags: ['System']
---

## 本地文件 上传到 服务器

### 单文件移动
```shell
# 连接服务器
sftp <user>@<remote-server>

# 上传文件
sftp f://abc.tar.gz /home/luffy/

# 退出
exit

# 解压文件(ssh 连接后到文件目录中)
tar -zxvf abc.tar.gz
```
