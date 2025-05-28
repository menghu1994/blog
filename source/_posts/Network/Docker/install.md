---
layout: draft
title: Ubuntu安装Docker 
index_img: https://img2.baidu.com/it/u=2441496253,736212485&fm=253&fmt=auto&app=138&f=JPEG?w=602&h=352
categories:
 - FrontEnd
tags: ['Docker']
---

# Docker

## [安装](https://pythondjango.cn/python/tools/2-docker-dockerfile/)
### 以Ubuntu为例
- Step 1: 移除之前docker版本并更新更新 apt 包索引
```shell
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
```

- Step 2: 安装 apt 依赖包，用于通过HTTPS来获取仓库
```shell
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

- Step 3: 添加 Docker 的官方 GPG 密钥
```shell
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

- Step 4: 设置docker稳定版仓库，这里使用了阿里云仓库
```shell
sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
```

- Step 5: 安装免费的docker Community版本docker-ce
```shell
sudo apt-get -y install docker-ce
sudo apt-get install -y docker-ce=<VERSION> #该命令可以选择docker-ce版本
```

- Step 6: 查看docker版本及运行状态
```shell
sudo docker -v
sudo systemctl status docker
```

- Step 7：本步非必需。使用阿里云设置Docker镜像加速，注意下面链接请使用阿里云给自己的URL
```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{  "registry-mirrors": ["https://ua3456xxx.mirror.aliyuncs.com"] }
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## [镜像地址](https://hub.docker.com)

## Operators
- 搜索镜像：docker search + 镜像名字
`$ docker search nginx`

- 从registry拉取镜像：docker pull + 镜像名字:版本号
`$ docker pull nginx:latest`

- 从registry仓库提交镜像：docker push + 仓库名:标签
`$ docker push repro1:v1.0`

- 查看本地镜像: docker images
`$ docker images`

- 使用Dockerfile创建镜像: docker build + 目录，.代表当前目录，-t表示加标签
`$ docker build -t mynginx:1.0 .`

- 删除一个或多个镜像: docker rmi + 镜像1 + 镜像2
`$ docker rmi mynginx:1.0 mynginx:2.0`

- 删除未标记或未用过的镜像
`$ docker image prune`

- 删除未使用过的镜像
`$ docker image prune -a`

- 给镜像加标记： docker tag 镜像标签 新镜像标签名
`$ docker tag mynginx:1.0 nginx1`

- 把镜像保存为.tar文件: docker save 镜像 > 文件
`$ docker save mynginx:1.0 > mynginx_v1.tar`

- 从.tar文件载入镜像: docker load -i .tar文件
`$ docker load -i mynginx_v1.tar`

- 根据容器创建镜像：docker commit 容器名 镜像名
`$ docker commit `

## Docker容器操作
- 创建容器: docker create + 选项(-i, -t, -d, -p, -v, -e) + 镜像
$ docker create --name mynginx_1 -it -p 8080:80 mynginx:1.0

- 各选项含义
- -i:以交互模式运行容器，通常与-t 同时使用；
- -d:后台运行容器，并返回容器ID；
- -p:端口隐射, 宿主机在前，容器在后
- -P:随机映射宿主机端口
- -t:为容器重新分配一个伪输入终端，通常与-i 同时使用；
- -v:目录挂载
- --entrypoint: 指定进入点
- --restart=always: 服务重启

- 启动容器：docker start + 容器名
`$ docker start mynginx_1`

- 创建 + 运行容器: docker run + 选项 + 镜像 + 命令
`$ docker run --name mynginx_1 -it -p 8080:80 mynginx:1.0`
`$ docker run -it ubuntu /bin/bash`

- 查看正在运行中的容器：docker ps
`$ docker ps`

- 查看所有容器，包括停止运行的容器: docker ps -a
`$ docker ps -a`

- 停止一个正在运行的容器: docker stop 容器
`$ docker stop mynginx_1`

- 重启容器：docker restart + 容器名
`$ docker restart mynginx_1`

- 容器重命名：docker rename 老名字 新名字
`$ docker rename mynginx_1 mynginx_2`

- 删除一个容器：docker rm 容器名
`$ docker rm mynginx_1`

- 强制删除一个正在运行的容器：docker rm -f 容器名
`$ docker rm -f mynginx_1`

- 删除已停止运行的所有容器: docker container prune
`$ docker container prune`

- 拷贝文件，从容器到宿主机：docker cp 容器名:容器内路径 宿主机文件路径
`$ docker cp myweb_1:/index.html index.html`

- 拷贝文件，从宿主机到容器：docker cp 宿主机文件路径 容器名:容器内路径
`$ docker cp index.html myweb_1:/index.html`

- 进入运行的容器，执行命令: docker exec + 选项 + 容器名 + 命令 + 参数
- 推荐大家使用 docker exec命令，使用此命令即使exit容器终端，也不会导致容器的停止
`$ docker exec -it mynginx_1 /bin/bash`
`$ docker exec -it mynginx_1 /bin/bash start.sh`

- 查看容器端口映射：docker port 容器名
`$ docker port mynginx_1`

- 查看容器内已修改文件：docker diff 容器名
`$ docker diff mynginx_1`

- 查看容器日志：docker logs + 容器名
`$ docker logs web`

- 查看容器内运行进程：docker top + 容器名
`$ docker top web`

- 查看容器的底层信息：docker inspect + 容器名
`$ docker inspect web`

- 利用inspect命令查看容器的IP地址
`$ docker inspect web | grep "IPAddress"`

- 查看运行容器的统计数据：docker stats
`$ docker stats`