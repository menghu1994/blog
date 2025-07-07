---
layout: post
title: ssh
index_img: https://i-blog.csdnimg.cn/blog_migrate/afa8ff6e370df63afbfd4bcf80814ea7.jpeg
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