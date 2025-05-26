---
layout: post
title: Utils in gsap
index_img: https://www.w3cplus.com/sites/default/files/blogs/2020/2007/greensock-beginner-1.png
tags: ['Animation', 'Library']
---

## gsap提供的函数
- `checkPrefix()` 
	添加浏览器适配前缀
	```js
	// 会根据浏览器自动添加前缀, 如WebkitFilter,MozFilter,如果不需要适配则返回默认值filter
	gsap.utils.checkPrefix("filter");
	```
- `clamp()` 
	限制数字范围
	```js
	// 限制数字在0到100之间
	gsap.utils.clamp(0, 100, -12) // 0;
	```
- `distribute()` 
- `getUnit()` 
	获取单位
	```js
	gsap.utils.getUnit('20px') // px;
	```
- `interpolate()` 
- `mapRange()` 
- `normalize()` 
- `pipe()` 
- `random()` 
- `selector()` 
- `shuffle()` 
- `snap()` 
- `splitColor()` 
- `toArray()` 
	类数组(array-like)转化为数组
	```js
	gsap.utils.toArray('.box') // 返回Element[];
	```
- `unitize()` 
- `wrap()` 
- `wrapYoyo()` 