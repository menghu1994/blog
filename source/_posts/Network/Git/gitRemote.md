---
layout: post
title: git添加多个仓库
tags: ['Git']
categories:
 - Network
---

# git添加多个仓库

### 比较小白的方法
1. 在项目根目录下找到 `.git/config` 文件, 如果没有`.git`文件夹,则运行`git init`初始化git仓库,修改config文件
```txt
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = <仓库1地址, 如https://github.com/username/repo.git>
	fetch = +refs/heads/*:refs/remotes/origin/*
	pushurl = <仓库1地址>
	pushurl = <仓库2地址>
[branch "main"]
	remote = origin
	merge = refs/heads/main
```

2. 如果是使用命令行则运行
```bash
# 添加第一个远程仓库
git remote set-url --add --push origin https://github.com/username/repo.git

# 添加第二个远程仓库
git remote set-url --add --push origin https://git.example.com/path/to/repo.git
```
