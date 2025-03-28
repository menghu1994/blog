---
layout: post
title: Class Decorator
date: 2023-10-16 21:41:38
tags: ['Javascript']
---

# Decorator(装饰器)

## ClassDecorator(类装饰器)
```ts
const Doc: ClassDecorator = (target) => {
	// log: Class demo
	console.log(target)

	target.prototype._name = 'Luffy'
}


@Doc
class demo() {
	constructor() {}
}

const Xiaoming = new demo()

// log: Luffy
console.log(Xiaoming._name)
```

## PropertyDecorator(属性装饰器)
```ts
const Doc: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
	// log: {}, name
	console.log(target, propertyKey)
}

class demo() {
	@Doc
	public name: string
	constructor() {
		this.name = 'Luffy'
	}
}
```

## MethodDecorator(方法装饰器)
```ts
const Doc: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: any) => {
	// log: {}, getAll, {value: ..., writable: true, configurable: true}
	console.log(target, propertyKey, descriptor)
}

class demo() {
	constructor() {}

	@Doc
	getAll() {}
}
```

## MethodDecorator(参数装饰器)
```ts
const Doc: ParameterDecorator = (target: Object, propertyKey: string | symbol, index: number) => {
	// log: {}, getAll, 1
	console.log(target, propertyKey, index)
}

class demo() {
	constructor() {}

	getAll(name: string, @Doc age: string) {}
}
```

## 使用装饰器实现一个get请求
```ts
const Get = (url: string) => {
	return (target: Object, propertyKey: string | symbol, descriptor: any) => {
		const fnc = descriptor.value;
		axios.get(url).then(res => {
			fnc(res, { status: 200, success: true })
		}).catch(e => {
			fnc(res, { status: 500, success: false })
		})
	}
}

class user {
	constructor() {}

	@Get('请求地址')
	getAll(res: any, status: any) {
		console.error(res, status)
	}
}
```
