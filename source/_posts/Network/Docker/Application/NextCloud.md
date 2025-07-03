---
layout: post
title: NextCloud
index_img: https://img2.baidu.com/it/u=2441496253,736212485&fm=253&fmt=auto&app=138&f=JPEG?w=602&h=352
categories:
 - FrontEnd
tags: ['Docker']
---

## NextCloud
> 打造个人云盘

### 安装及配置
```shell
# 拉取镜像
docker pull nextcloud:latest

# 通过镜像生成容器并配置
docker run -d \
  --name nextcloud \
  --network nextcloud_network \
  -p 8080:80 \
  -v ~/docker/nextcloud/html:/var/www/html \
  -v ~/docker/nextcloud/data:/var/www/html/data \
  nextcloud:latest
```

abc