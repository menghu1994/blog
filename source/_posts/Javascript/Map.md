---
layout: post
title: map
date: 2023-10-16 21:41:38
tags: js
---

# Map

> `Map` 与Object最大的差别是Map允许任何类型的键(key)
> Object中,从ES6开始，String和Symbol键是按顺序保存起来的，但是通过隐式转换保存成String的键就是乱序的，`Map`始终保持按插入顺序返回键名

## 属性和方法

- let map = new Map()   // 创建map
- map.set(key, value) // 设置存储键和值
- map.get(key)  // 根据键返回值,如果没有相应key,返回undefined
- map.has(key)  // 如果key存在返回true
- map.delete(key)  // 删除指定键的值
- map.clear()   // 清空map
- map.size   // 返回当前元素的个数

## 迭代

- map.keys()   // returns an iterable for keys
- map.values()  // returns an iterable for values
- map.entries() // returns an iterable for entries, Create a map from Object like `new Map(Object.entries(obj))`
- Object.fromEntries() // create Object from map

> Other examples

```js
 let recipeMap = new Map([
   ['apple', 500],
   ['tomatoes', 350],
   ['orange',    50]
 ]);

 recipeMap.forEach( (value, key, map) => { ... } )

let price = Object.fromEntries( recipeMap.entries() ); // return Object {'apple': 500, 'tomatoes': 350, 'orange': 50}
```

```js
// 判断Map
function isMap(value) {
  return value.toString() === '[object Map]';
}
```

### 应用场景

- 插入顺序需要考虑时,选择Map
- 频繁增删键值
- Map无法转化为json，如果需要则使用Object
- 需要构造特殊类型的键名
