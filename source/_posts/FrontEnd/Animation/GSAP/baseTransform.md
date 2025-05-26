---
layout: post
title: Transform in gsap
index_img: https://www.w3cplus.com/sites/default/files/blogs/2020/2007/greensock-beginner-1.png
tags: ['Animation', 'Library']
---

## [Transform Property](https://gsap.com/resources/get-started)

| 行为 | gsap | css |
| ---- | ---- | ---- |
| ---- | x: 100 | 	transform: translateX(100px) |
| ---- | y: 100 |	transform: translateY(100px) |
| 位移百分比 | xPercent: 50 |	transform: translateX(50%) |
| ---- | yPercent: 50 |	transform: translateY(50%) |
| ---- | scale: 2 |	transform: scale(2) |
| ---- | scaleX: 2 |	transform: scaleX(2) |
| ---- | scaleY: 2 |	transform: scaleY(2) |
| ---- | rotation: 90 |	transform: rotate(90deg) |
| ---- | rotation: "1.25rad" |	Using Radians - no CSS alternative |
| 斜切 | skew: 30 |	transform: skew(30deg) |
| ---- | skewX: 30 |	transform: skewX(30deg) |
| ---- | skewY: "1.23rad" |	Using Radians - no CSS alternative |
| ---- | transformOrigin: "center 40%" |	transform-origin: center 40% |
| ---- | opacity: 0 |	 adjust the elements opacity |
| ---- | autoAlpha: 0 |	shorthand for opacity & visibility |
| 动画时长 | duration: 1 |	animation-duration: 1s |
| 无线循环 | repeat: -1 |	animation-iteration-count: infinite |
| 重复次数 | repeat: 2 |	animation-iteration-count: 2 |
| 延迟播放 | delay: 2 |	animation-delay: 2 |
| 往复循环 | yoyo: true |	animation-direction: alternate |

## Unit
长度
```js
x: 200 // 默认为px
x: '+=200' // 相对数值
x: '40vw'  // 字符串单位自动转换
x: () => window.innerWidth/2 //函数返回值 
```
角度
```js
rotation: 360 // 默认为deg
rotation: '1.5rad' // 弧度单位
// 不支持grad和turn
```

## [Ease Animation](https://gsap.com/resources/getting-started/Easing)
