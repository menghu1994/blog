---
layout: post
title: windows 下快速生成目录树结构
tags: system
---

# windows 下快速生成目录树结构

```shell
tree [drive][path] [/F] [/A]
#/f 显示所有目录及目录下的所有文件，省略时，只显示目录，不显示目录下的文件
#/a 使用ASCII字符，而不使用扩展字符
```

Example: 
```shell
tree E:\_Luffy\Markdown > E:result.txt
# 生成 E:\_Luffy\Markdown 的目录到 E盘下的result.txt文件
```
