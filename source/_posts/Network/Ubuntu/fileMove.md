---
layout: post
title: Ubuntu基础命令之文件移动
index_img: https://img1.baidu.com/it/u=1243008851,1044741337&fm=253&fmt=auto&app=120&f=JPEG?w=593&h=332
categories:
 - FrontEnd
tags: ['System']
---

## 本地文件 上传到 服务器
1. 命令行
```bash
# 单文件移动
scp /local/path/ <name>@<server_ip>:/home/luffy/

# 批量移动
rsync -avz /local/path/ <name>@<server_ip>:/remote/path/

# 上传压缩包并在服务器解压
# zip
unzip fileName.zip -d /home/luffy
# .tar.gz
tar -zxvf fileName.tar.gz -C /home/luffy
# tar.bz2
tar -jxvf fileName.tar.bz2 -C /home/luffy
```

sftp
```bash
# 连接服务器
sftp <user>@<remote-server>

# 上传文件
sftp f://abc.tar.gz /home/luffy/

# 退出
exit

# 解压文件(ssh 连接后到文件目录中)
tar -zxvf abc.tar.gz
```
2. WinSCP 软件图像化界面

## 服务器文件下载到本地
```bash
# 单文件下载
scp <name>@<server_ip>:/home/luffy/file.txt /local/path/
# 文件夹下载
scp -r <name>@<server_ip>:/home/luffy/ /local/path/
```