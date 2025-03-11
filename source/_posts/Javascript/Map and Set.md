---
layout: post
title: map & set
date: 2023-10-16 21:41:38
tags: ['Javascript']
---
# map

> 允许任何类型key,像Object一样的数据集合

## 方法

- let map = new Map()   // 创建map
- map.set(key, value)   // 存储或修改map中key和对应的value
- map.get(key)   // 获取map中key的value
- map.has(key)   // map中是否含键为key, 返回boolean
- map.delete(key)   // 删除指定key的value
- map.clear()   // 清空map
- map.size()   // map中元素个数

# set

> value的集合, 每个value只能出现一次

## 方法

- new Set(iterable)  // 创建一个set,如果提供了一个iterable对象(通常是数组),将会从数组里面复制值到set中
- set.add(value) // 添加新value,返回set
- set.delete(value)  // 删除value,返回boolean(不存在value则返回false)
- set.has(value) // 如果value在set中,返回true,否则返回false
- set.clear  // 清空map
- set.size   // 返回元素个数
