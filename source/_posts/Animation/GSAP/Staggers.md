---
layout: post
title: Staggers in gsap
index_img: https://www.w3cplus.com/sites/default/files/blogs/2020/2007/greensock-beginner-1.png
tags: ['animation', 'gsap']
---

# 交错动画
```js
gsap.to(".box", {
  y: 100,
  stagger: 0.1, // 每个.box元素动画之间都有0.1秒的间隔
});
```

## 配置
`amount: number` // 交错动画总时间,单个交错动画时间为`amount/数量`
`each: number`  // 单个交错动画的时间
`from: string | array`  // 'start', 'center', 'edges', 'random', 'end' | [0.5, 0.5] 从中心开始动画 | 10 从第10个子元素开始
`grid: array | 'auto'`
`axis: string`
`ease: string | function`
