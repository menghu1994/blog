---
layout: post
title: 固定局域网内设备IP地址
index_img: https://i-blog.csdnimg.cn/blog_migrate/afa8ff6e370df63afbfd4bcf80814ea7.jpeg
categories:
 - Network
tags: ['Network']
---

## 固定局域网内设备IP地址
> 在路由器内设置固定ip及设备物理地址绑定

### 查看本机wifi物理地址
1. 通过路由器终端设备管理
查看终端设备mac地址，ip地址
2. 通过电脑
windows
```bash
ipconfig /all

# 无线局域网适配器 WLAN(物理地址)
20-0B-74-70-B0-B5
```

mac
```bash
ifconfig

en0: flags=....
      ether <mac地址>
      media: autoselect (100baseTX)
```

### 设置DHCP起始IP地址
上网方式有 路由模式，桥接模式，宽带拨号上网，固定IP这四种

我使用的是路由模式
我局域网IPV4的ip地址为192.168.86.1
设置DHCP起始IP地址 192.168.86.1 结束IP地址 192.168.86.101

### 静态IP
在静态ip中添加要固定ip的设备mac地址(物理地址)及想固定为的ip