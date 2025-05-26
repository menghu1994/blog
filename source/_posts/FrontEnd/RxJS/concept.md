---
layout: post
title: Rxjs
tags: ['Rxjs']
---

# Rxjs
> 异步行为解决方案

### 常见异步行为
1. `Race Condition`
 - 对同一资源同时多次(异步)存取
2. `Memory Condition`
 - `SPA`页面对`DOM`注册监听事件,切换页面没有取消事件监听时
3. `Complex State`
4. `Exception Handling`

### 异步API
 - DOM Events
 - XMLHttpRequest
 - Fetch
 - WebSockets
 - Server Send Events
 - Service Worker
 - Node Stream
 - Timer

### `Functional Reactive Programming`
> `Functional Reactive Programming` = `Functional Programming` + `Reactive Programming`
#### `Functional Programming`
1. 函数是一等公民
 - 函数可以赋值给变量，可以作为参数或回调
2. `Pure Function`
 - 一个函数给予相同的参数，永远会有相同的返回值;
 - `Side Effect` 函数副作用（如 http request, console, get input, query DOM）

#### `Reactive Programming`







 [30 天精通 RxJS](https://blog.jerry-hong.com/series/rxjs/thirty-days-rxjs-01)
