---
title: Express
description: Express 学习文档
author: Luffy
created: 2023-03-29
modified: 2023-03-29
tags: ['express']
---

# Express

## Static files
```js
const express = require('express')
const path = require('path')
const app = express()
// 设置文件请求地址
app.use(express.static(path.join(__dirname, 'public')))
```