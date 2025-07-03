---
layout: post
title: github连接超时
index_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSge4enVOAsO6uTzChHRkXM6WMkfRJ_zA_Xdg&usqp=CAU
banner_img: https://www.google.com.hk/url?sa=i&url=https%3A%2F%2Fjavascript.plainenglish.io%2F6-common-git-mistakes-and-how-to-fix-them-b519bd351001&psig=AOvVaw2f-yTSdweJ43lBHLOqUazK&ust=1624000310068000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODUieKOnvECFQAAAAAdAAAAABAJ
tags: ['Git']
---

## 连接github
> 仓库连接github需要走代理才能访问，以下提供两种方式连接github

### 方法1 设置代理(科学上网)
```shell
# 设置代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890

# 单独设置github代理
git config --global http.https://github.com.proxy 'http://127.0.0.1:7890'
git config --global https.https://github.com.proxy 'http://127.0.0.1:7890'
```
以上的端口号`7890`为`clash`代理的端口,具体端口号需要看clash应用General => Port
完成以上设置就可以进行git操作了。

### 方法2 ssh key连接
1. 本地生成ssh key
  
```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```
此命令会在本地生成一个ssh key文件`id_ed25519.pub`，并将公钥和私钥保存到`~/.ssh`目录下。
> `~/` 代表当前登录用户的地址，比如我window当前登录用户为luffy,那么`~`代表的地址就是`C:\Users\luffy`

1. 在网页访问github网站，并在`Settings` => `SSH and GPG keys` => `New SSH key` => `Title`输入一个标题 => `Key`输入id_ed25519.pub文件里的所有内容 => `Add SSH key`完成添加。
2. 替换github的ssh地址
  - 如果时新clone的地址，那么直接使用`git clone git@github.com:username/repository.git`
  - 如果是已有仓库，那么需要修改远程仓库地址，使用`git remote set-url origin git@github.com:username/repository.git`
3. 验证`ssh -T git@github.com` 查看是否能连上github
完成以上设置就可以进行git操作了。