---
layout: post
title: gsap
date: 2023-10-16 21:41:38
index_img: https://img-blog.csdnimg.cn/img_convert/88b44779a5d414e97d2db98e54d83c1e.png
tags: ['animation', 'gsap']
---

# GSAP in Angular

## install

```shell
npm install --save gsap @types/gsap
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
