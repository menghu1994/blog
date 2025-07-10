---
layout: post
title: Timeline in gsap
index_img: https://picx.zhimg.com/v2-77201d3c5d48d816f11135915017aa81_720w.jpg?source=172ae18b
tags: ['Animation', 'Library']
categories:
 - Animation
---

# Timeline
> 按照顺序依次执行动画(不需要设置delay)

```js
let tl = gsap.timeline({ paused: true });

tl.to(".green", { x: 600, duration: 2 }, 3); // 开始执行时间是3s后
tl.to(".purple", { x: 600, duration: 1, delay: 1 }, "<"); // 开始执行时间'<', 插入到上一个动画开头
tl.to(".orange", { x: 600, duration: 1 }, "+=1"); // 上一个动画执行1s后
```

## 配置项目
```js
gsap.timeline({ 
	repeat: -1, 
	repeatDelay: 1, 
	yoyo: true, 
	defaults: {duration: 1} 
})
```
