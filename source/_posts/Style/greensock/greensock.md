---
layout: post
title: greensock
tags: animation
---

# [greensock](https://greensock.com/) 
> css animation library

## install
1. `cdn`
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.1/dist/gsap.min.js"></script>
```
2. `npm`
```shell
npm install gsap
```

## Usage
```js
// to 动画的最终状态;ep: 当前元素位置是0,那么动画将从0开始抵达100的位置
gasp.to('box', { rotation: 27, x:100, duration: 1 })

// from 动画的初始状态;ep: 当前元素位置是0,那么动画将从-100开始抵达0的位置
gsap.from(".purple", {rotation: -360, x: -100, duration: 1});

// fromTo ep: 当前元素从-100位置到100位置,默认动画时间1s
gsap.fromTo(".blue", { x: -100 }, { x: 100, duration: 2 });
```

`gsap.timeline()` 按顺序执行动画
```js
const tl = gsap.timeline();
tl.to(".box1", {duration: 2, x: 100}, 1)
  .to(".box2", {duration: 1, y: 200}, "-=1.5")
  .to(".box3", {duration: 3, rotation: 360}, "+=3");
```
