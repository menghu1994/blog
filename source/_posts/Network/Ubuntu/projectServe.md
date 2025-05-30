---
layout: post
title: 零基础 Ubuntu远程服务器纯前端项目搭建
index_img: https://img1.baidu.com/it/u=1243008851,1044741337&fm=253&fmt=auto&app=120&f=JPEG?w=593&h=332
categories:
 - FrontEnd
tags: ['System']
---

## 前言

> 由于工作原因，需要搭建一个远程服务器，用来部署前端项目，本文将介绍如何在 Ubuntu 18.04 上安装 Node.js、Nginx、Git、MongoDB 以及部署前端项目。

## 准备工作

- 购买远程服务器（云服务器或自建服务器
- 远程服务器需要开放 80、443、27017 端口
- 远程服务器需要安装 SSH 客户端（如：Putty）
- 远程服务器需要安装 Node.js、Nginx、Git、MongoDB

## linux - ubuntu

```bash
# 更改密码
sudo passwd root

# 登录root
su -
# 切换临时用户 
su - luffy
# 退出临时用户
exit

# 配置
visudo

# 创建用户及密码
sudo useradd luffy
sudo passwd luffy

```

## 安装 Node.js

```bash
# 推荐使用 NodeSource 安装最新 LTS 版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node -v  # 检查 Node.js 版本
npm -v   # 检查 npm 版本
```

## 安装 Nginx

```bash
sudo apt update
sudo apt install -y nginx

# 启动 Nginx
sudo systemctl start nginx
# 设置开机自动启动
sudo systemctl enable nginx

# 验证
curl http://localhost
```

### 配置 Nginx
> 默认站点目录 `/var/www/html `
> 
```bash
sudo nano /etc/nginx/sites-available/default 


server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;  # 假设 Node.js 运行在 3000 端口
        proxy_set_header Host $host;
    }
}
```

### 测试配置并重新加载

```bash
sudo nginx -t   # 检查语法
sudo systemctl reload nginx
```

### 检查nginx状态并设置开机启动

```bash
sudo systemctl status nginx  # 确认状态为 "active (running)"

# 未启动时启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx  # 设置开机自启
```

### 开放端口
```bash
sudo ufw allow 80/tcp   # 开放 HTTP 端口（80）
sudo ufw allow 443/tcp  # 开放 HTTPS 端口（443）
sudo ufw reload
```

### 配置新站点
1. 创建配置文件
`sudo nano /etc/nginx/sites-available/siteA` 
```nginx
server {
    listen 80;
    server_name example.com;  # 你自己的域名或 IP

    root /var/www/siteA;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
2. 创建站点目录
```bash
sudo mkdir -p /var/www/siteA
```
将前端build文件移入`siteA`目录中
```bash
sudo cp -r /luffy/home /var/www/SiteA/
```

3. 设置权限
```bash
sudo chown -R www-data:www-data /var/www/siteA
```

4. 启用配置
```bash
sudo ln -s /etc/nginx/sites-available/SiteA /etc/nginx/sites-enabled/
```

5. 检查配置语法并重启
```bash
sudo nginx -t
sudo systemctl reload nginx
```

6. 开启HTTPS (可选)
使用`Let's Encrypt`免费证书
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx
```

## 配置代理并启动
```bash
server {
    listen 80;
    server_name your-domain.com;  # 替换为域名或服务器IP

    # 前端静态文件（如 Vue/React 打包后的 dist 目录）
    location / {
        root /path/to/your-project/dist;
        index index.html;
        try_files $uri $uri/ /index.html;  # 支持前端路由
    }

    # 后端 API 反向代理（如 Node.js 运行在 3000 端口）
    # location /api {
    #     proxy_pass http://localhost:3000;
    #     proxy_set_header Host $host;
    # }
}
```
