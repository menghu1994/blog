---
layout: post
title: Methods in gsap
index_img: https://picx.zhimg.com/v2-77201d3c5d48d816f11135915017aa81_720w.jpg?source=172ae18b
tags: ['Animation', 'Library']
categories:
 - Animation
---

- `gsap.quickSetter()`
> 用于提升重复多次调用`gsap.set()`的性能, 比如单位转换、相对数值、值为函数返回值、random()的解析等;
> 大多数情况遇不到需要提升性能。
```js
gsap.set(".flair", {xPercent: -50, yPercent: -50});

let xSetter = gsap.quickSetter(".flair", "x", "px");
let ySetter = gsap.quickSetter(".flair", "y", "px");

window.addEventListener("mousemove", e => {
  xTo(xSetter.x);
  yTo(ySetter.y);
});

let xTo = gsap.quickTo(".flair", "x", {duration: 0.6, ease: "power3"}),
    yTo = gsap.quickTo(".flair", "y", {duration: 0.6, ease: "power3"});

window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```
如果需要同时设置多个属性值,可以设置第二个参数为`'CSS'`和`'attr'`
```js
var boxSet = gsap.quickSetter("#box", "css");
boxSet({ x: "+=100", y: "random(-100, 100)" })

var circleSet = gsap.quickSetter("#circle", "attr");
circleSet({ cx: "+=100", cy: "random(-100, 100)" });
```