---
layout: post
title: 常用正则表达
date: 2024-08-13
index_img: https://pica.zhimg.com/v2-4981a827baa6cf4346ec5304ccbec502_720w.jpg?source=172ae18b
tags: ['tool']
---
## [在线验证](https://www.jyshare.com/front-end/854/)
## 常用正则表达
```js
// isPositiveInt(正整数)
/^([1-9]([0-9]+)?)$/.test(val)
// isPositive(非负数)
/^(0|[1-9][0-9]*)(\.\d+)?$/.test(val)
// isNaturalNumber(自然数)
/^([0-9]|[1-9]([0-9]+)?)$/.test(val)
// isNumber(数字)
/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(val)
```

