---
layout: post
title: Angular Rxjs
tags: ['Angular', 'Rxjs']
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
categories:
 - FrontEnd
---


# Observables
> Observable
> Observer
> Subject
> subscriber -- subscribe()

```js
// 每个猎人有自己的等级, 可以发布寻求帮助任务, 也可以订阅别人的寻求帮助任务
function Hunter(name, level) {
	this.name = name;
	this.level = level;
	this.task = [];	
}

Hunter.prototype.publish = function (money) {
	console.log(this.level + "猎人" + this.name + '寻求帮助');
	this.list.forEach( (item, index) => item(money))
}

Hunter.prototype.subscribe = function (target, fn) {
	console.log(this.level + "猎人" + this.name + '订阅任务');
	target.list.push(fn)
}

let HunterZhang = new Hunter('小张', 'level1');
let HunterMing = new Hunter('小明', 'level5');
let HunterWang = new Hunter('小王', 'level2');
let HunterLi = new Hunter('小李', 'level3');

// 小张等级低,需要发布寻求帮助


// 其他猎人,订阅小张的发布请求

```
