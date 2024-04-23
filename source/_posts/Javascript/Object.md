---
layout: post
title: Object
date: 2023-10-16 21:41:38
tags: ['Javascript']
---
# Object

## 获取实例对象的原型 `Object.getPrototypeOf`

> `Object.getPrototypeOf(ChildClass) === FatherClass` 判断一个类是否继承另一个类

## `Iterable object`可迭代对象

```javascript
const arr = [1,2,3];
for(let item of arr) {
  console.log(item) // 1  2  3
}

const str = 'code';
for(let item of str) {
  console.log(item)  // c   o   d   e
}

const set = new Set([1,2,3])
for(let item of set) {
  console.log(item); // 1  2  3
}

const map = new Map();
map.set("name", "XIAOMING");
map.set("age", 10);
for(let item of map) {
  console.log(item);  // ["name": "XIAOMING"] ["age": 10]
}
for(let key of map.keys()) {
  console.log(key);  // name  age
}
for(let value of map.values()) {
  console.log(value); // XIAOMING  10
}
for(let [key,value] of map) {
  console.log(key + '-' + value); //name-XIAOMING  age-10
}

const object = {
  from: 0,
  to: 5,
  [Symbol.iterator]() {
    this.cur = this.from
    return this
  },
  next() {
    if(this.cur < this.to) {
      return {done: false, value: this.cur ++}
    }else {
      return {done: true}
    }
  }
}
for(let item of object) {
  console.log(item); // 0  1  2  3  4
}

function* generatorFunc() {
  yield 10;
  yield 20;
  yield 30;
}
const obj = generatorFunc();
for(let item of obj) {
  console.log(item);  // 10  20  30
}
```

## Object to Map

```javascript
let obj = {"name":"XIAOMING", "age": 10};
let map = new Map(Object.entries(obj))
```

## Map to Object

```javascript
let map = new Map();
map.set('name', 'XIAOMING');
map.set('age', '10'); 
let obj = Object.fromEntries(map);
```

## weekSet & weekMap

1. 当数据不可达或不可能被使用时,则会被垃圾回收掉以释放内存。
2. Map可以设置对象为key值,如果此Map的一直被引用,但此对象不会再应用，此对象并不会被回收；
3. weekMap 和 weekMap 可以设置key为 object, 但没有引用时则会被销毁

## refer

[for..of(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
[for..of](https://www.programiz.com/javascript/for-of)
[可迭代对象](https://zh.javascript.info/iterable)
[function*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
