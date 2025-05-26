---
layout: post
title: git
tags: ['Git']
---

# git clone or git push 403
> 克隆github仓库或者push到github仓库的时候，出现403错误，解决方法：

设置proxy代理

```shell
# 设置http:
git config --global http.proxy http://127.0.0.1:1080
# 设置https:
git config --global https.proxy https://127.0.0.1:1080
# 设置socks:
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
## 取消
git config --global --unset http.proxy
git config --global --unset https.proxy
```
端口号<1080>具体查看`clash`...的端口地址