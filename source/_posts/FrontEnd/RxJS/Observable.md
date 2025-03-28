---
layout: post
title: Observable
tags: rxjs
---

# Observable
> 观察者模式推送数据 + 迭代器修改数据

## `Observer Pattern` 观察者模式
```js
class Producer {
	constructor() {
		this.listeners = []
	}

	addListener(listener) {
		if (typeof listener === 'function') {
			this.listeners.publish(listener)
		} else {
			throw new Error('listener must be a function')
		}
	}

	removeListener(listener) {
		this.listeners.splice(this.listeners.indexOf(listener))
	}

	notify(message) {
		this.listeners.forEach(listener => {
			listener(message)
		})
	}
}
```

## `Iterator Pattern` 迭代器
> 延迟运算
> 序列，可以使用`map`,`filter`等方法
```js
// 原生
const arr = [1,2,3];
const iterator = arr[Symbol.iterator]();
iterator.next();
// { value: 1, done: false }
iterator.next();
// { value: 1, done: false }
iterator.next();
// { value: 1, done: false }
iterator.next();
// { value: undefined, done: true }

// 手写迭代器
class IteratorFromArray {
	constructor(arr) {
		this._array = arr;
		this._cursor = 0;
	}

	next() {
		return this._cursor < this._array.length ? 
		{ value: this._array[this._cursor++], done: false } :
		{ done: true }
	}
}
```
