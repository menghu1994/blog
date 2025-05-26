---
layout: post
title: git
tags: ['Git']
---


# git

## 查看所有分支
`git remote -v`

## git commit standard

+ type

+ bulid  -- 对构建系统或者外部依赖进行修改
+ ci    -- 对ci配置文件或脚本进行修改
+ docs  -- 对文档进行修改 README,CHANGELOG,CONTRIBUTE..
+ feat  -- 新功能 feature
+ fix   -- 修复bug
+ pref  -- 优化相关，如提升性能、体验
+ refactor  -- 代码重构，没有新功能，没有修复bug
+ style  --修改了空格，缩进，格式化等，不改变代码逻辑
+ test   -- 测试用例，包括单元测试，集成测试
+ revert -- 回滚到上个版本
+ chore  -- 改变构建流程、或者增加依赖库、工具等

+ scope

+ 可以指定提交更改位置的任何内容

+ subject

+ 首字母不大写，末尾不加标点

```git
<type>(<scope>): <subject>
 <BLANK LINE>
  <body>
 <BLANK LINE>
<footer>
```

### [git commit emoji](https://gitmoji.dev/)

```git
git commit -m ":tada: 礼花emoji"
```

#### Question

1. [generate `.gitignore` file](Questions/gitignore.md)


## 分支关联
> git branch --set-upstream-to=origin/develop develop
