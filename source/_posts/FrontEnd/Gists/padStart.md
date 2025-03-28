---
layout: post
title: 个位数转十位数
date: 2025-3-12
tags: ['gist']
---

# padStart
> 应用场景: 日期format
```js
// Task: Turn new Date() to '20250312'
const year = new Date().getFullYear();
const month =  new Date().getMonth() + 1;
const day = new Date().getDate()

const resultDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`
```