---
layout: post
title: Docker Desktop绕过登录
index_img: https://img2.baidu.com/it/u=2441496253,736212485&fm=253&fmt=auto&app=138&f=JPEG?w=602&h=352
categories:
 - FrontEnd
tags: ['Docker']
---

# Docker Desktop绕过登录

## 找到Docker Desktop的配置文件，默认在`~\.docker\config.json`
> 编辑配置文件，添加以下内容：
```json
"skipLogin": true
```
重启Docker Desktop，即可绕过登录。

## 使用 Docker CLI + SSH 直接连接远程 Docker Daemon