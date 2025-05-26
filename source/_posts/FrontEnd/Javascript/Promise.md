---
layout: post
title: Promise
tags: ['Javascript']
---

# Promise

[为什么使用promise](https://zh.javascript.info/callbacks)
> 1. 异步执行某项功能的函数应该提供一个`callback`参数用于在相应事件完成时调用。
> 2. 如果`callback`亦是异步函数, 则也需要提供另一个回调, 由此会形成`回调地狱`。
> 3. 以上的异步函数可能会出现中途出现`error`,所以`callback`中需要提供失败处理办法。

```js
// 1
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  // script.onload 在script加载完成
  script.onload = () => callback(script);
  document.head.append(script);
}
// 2
loadScript('/my/script.js', function(script) {
  loadScript('/my/script2.js', function(script) {
    loadScript('/my/script3.js', function(script) {
      // ...加载完所有脚本后继续
    });
  });
});
// 3 
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
```

> Usage of Promise
```js
// 所有订阅此promise的都将接收到内部异步函数的处理结果
let promise = new Promise((resolve, reject) => {
	// promise内部的自执行异步函数
	setTimeout( () => resolve('1'), 1000)
})
```
1. `new Promise`内部的异步函数需要一定的执行时间,此时状态为等待中 `state: pending`,并没有处理结果
2. 当promise内部的自执行异步函数执行完毕后,
  如果返回给订阅者的是`resolve('1')`,代表此时的状态变为已完成`state: fulfilled`,此时的结果是resolve传递的值`'1'`;
  如果返回给订阅者的是`reject('2')`,代表此时的状态变为已拒绝`state: rejected`,此时的结果是resolve传递的值`'2'`;
  注意： 内部异步函数的处理结果只能是`已完成`或`已拒绝`其中一个。
3. 订阅者调用此promise时如何查看promise是已完成还是已经拒绝的状态呢？
 `promise.then( () => console.error('已完成'), () => console.log('已拒绝'))` 在`已完成`,`已拒绝`状态下分别是第一第二个函数;
 `promise.catch()` === `promise.then( null, () => console.log('已拒绝'))` 在`已拒绝`可以直接执行`.catch()`
 `promise.finally()` 无论是`已完成`,`已拒绝`都会执行,和`.then()`的区别在于`.finally()`没有参数,没有返回值,而且并不清楚promise执行成功还是拒绝,
 如果同时出现`.finally().then()`那么.finally先触发, 比如promise内部是一个定时器，在一定条件的时候有了执行结果，此时可以在finally中清掉定时器
4. .catch() 会捕获这个promise链中error
 ```js
 	let promise = new Promise((resolve, reject) => {
		setTimeout( () => {reject('111')}, 1000)
	})
	promise.then(null, (err) => {
		console.error(err, '1')
		return new Promise((resolve, reject) => {
			setTimeout( () => {reject('222')}, 1000)
		})
	}).catch(err => {
	 	console.error(err, '2')
	})
```

## Promise.all
Promise.all 会一次性完成多个异步操作,如果没有异步是rejected的话，那将无论这些异步操作的时间长短，按照请求顺序返回这个顺序的数组resolve值;
如果有一个请求进入rejected,那么catch将捕获错误信息,Promise.all 请求失败
```js
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000)) 
]).then(res => console.error);  //[1,2,3]
```

当无论异步请求成功还是失败,都想获取返回的结果
## Promise.allSettled
```js
Promise.allSettled([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve,reject) => setTimeout(() => reject(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(res => console.error(res)); 

// 返回值
// [
//   {status: 'fulfilled', value: 1},
//   {status: 'rejected', reason: 2},
//   {status: 'fulfilled', value: 3}
// ]
```

## Promise.race(promises) 
 等待第一个 settle 的 promise，并将其 result/error 作为结果返回。
## Promise.any(promises)（ES2021 新增方法）
 等待第一个 fulfilled 的 promise，并将其结果作为结果返回。如果所有 promise 都 rejected，Promise.any 则会抛出 AggregateError 错误类型的 error 实例。
