---
layout: post
title: Frp实现内网穿透
index_img: https://img1.baidu.com/it/u=1243008851,1044741337&fm=253&fmt=auto&app=120&f=JPEG?w=593&h=332
categories:
 - FrontEnd
tags: ['System']
---

# Frp实现内网穿透
> frp 是一个反向代理应用，客户端（frpc）主动连接公网服务器（frps）并建立持久连接，从而让外网用户通过 frps 访问位于内网的 frpc 机器上的服务。

## [下载](https://github.com/fatedier/frp/releases)
[通过sftp将本地文件上传到服务器](/blog/FrontEnd/Network/Ubuntu/fileMove/)
`cd frp_0.62.1_linux_amd64`

## 配置frps.ini
创建frps.ini文件
```txt
[common]
bind_port = 7000
dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin123
vhost_http_port = 8080
vhost_https_port = 8443
```
 - frps 控制端口为 7000
 - web dashboard 面板端口为 7500
 - 可通过 http://x.x.x.x:7500 登录面板查看连接状态

## 启动frps服务
```bash
./frps -c ./frps.ini
```


## Mac 安装frpc并部署

### 安装
```bash
brew install frpc
```

### 配置frpc.ini
```txt
[common]
server_addr = x.x.x.x     # VPS 公网 IP
server_port = 7000        # 与 frps 的 bind_port 对应
login_fail_exit = false   # 重连VPS
heartbeat_interval = 20
heartbeat_timeout = 90

[web]
type = http
local_port = 3000         # 本地 Web 服务端口（如 localhost:3000）
custom_domains = yoursub.domain.com  # 你用于访问的域名

[ssh]
type = tcp
local_port = 22
remote_port = 6000        # 你访问 ssh 的远程端口（可自定义）

```
如果报错.ini将被弃用,那么则将frpc.ini文件转为frpc.yml
```yrml
server
  - 
```

### 启动frpc
```bash
frpc -c frpc.ini
```

### 开机自启
```bash
brew services start frpc
```