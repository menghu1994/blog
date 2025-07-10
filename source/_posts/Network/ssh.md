---
layout: post
title: ssh
index_img: https://tuku.vimsky.com/images/2018/09/ssh656x300.png
categories:
 - Network
tags: ['Network']
---

## SSH

### -f
> 后台运行

### -N
> 不执行命令，仅打开一个shell

### -L
> 端口转发
```bash
ssh -L <本地端口>:<目标主机>:<目标端口> <用户名>@<SSH服务器>
```

### -R
> 远程端口转发
```bash
ssh -R <远程端口>:<目标主机>:<目标端口> <用户名>@<SSH服务器>
```

### -D
```bash
ssh -D <本地端口> <用户名>@<SSH服务器>
```

### -C
> 压缩传输

## autossh
> 自动重连
```bash
autossh -M 0 -f -N -L 8080:localhost:80 <用户名>@<SSH服务器>
```