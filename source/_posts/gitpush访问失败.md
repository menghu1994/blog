---
layout: post
title: Failed to connect to github.com port 443 Timed out
index_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSge4enVOAsO6uTzChHRkXM6WMkfRJ_zA_Xdg&usqp=CAU
banner_img: https://www.google.com.hk/url?sa=i&url=https%3A%2F%2Fjavascript.plainenglish.io%2F6-common-git-mistakes-and-how-to-fix-them-b519bd351001&psig=AOvVaw2f-yTSdweJ43lBHLOqUazK&ust=1624000310068000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODUieKOnvECFQAAAAAdAAAAABAJ
tags: ['Git']
---

git 命令行问题集合
<!--more-->
在[chinaz](http://ping.chinaz.com/github.com)查询对应网址的耗时情况,查看可用ip。

## OpenSSL SSL_read: Connection was reset, errno 10054
> 连接超时
> 首先，造成这个错误很有可能是网络不稳定，连接超时导致的，如果再次尝试后依然报错，可以执行下面的命令。
```shell 打开Git命令页面，执行git命令脚本：修改设置，解除ssl验证
git config --global http.sslVerify "false"
```

## git push失败,但浏览器可以正常访问github.com
> 代理导致
```shell
git config --global --unset http.proxy
```
### 修改host
host文件路径 C:\Windows\System32\drivers\etc\HOSTS
我们把 `13.250.177.223 github.com` 添加到 hosts 文件
```shell 在shell 命令行中,刷新host设置
ipconfig /flushdns
```
