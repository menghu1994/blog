---
layout: post
title: 一个项目多个远程
tags: ['Git']
---

# git & github & gitlab 上拥有同一套代码如何同步
> 项目添加多个remote, git push会推送到所有的remote
```
[remote "origin"]
	url = https://gitee.com/laughmh/peanut.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	pushurl = git@github.com:menghu1994/peanut.git
	pushurl = https://gitee.com/laughmh/peanut.git
[branch "main"]
	remote = origin
	merge = refs/heads/main
[remote "gitrepo"]
	url = git@github.com:menghu1994/peanut.git
	fetch = +refs/heads/*:refs/remotes/gitrepo/*

```
