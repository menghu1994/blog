---
layout: post
title: Proxy
date: 2023-10-16 21:41:38
tags: ['Javascript']
---

# Proxy
> 一个Proxy对象包裹一个对象, 并拦截其读取写入的操作

语法
```js
// target 要包装的对象
// handler 配置对象, 带有拦截操作的捕捉器
const proxy = new Proxy(target, handler);
```
