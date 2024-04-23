---
layout: post
title: Array
date: 2023-10-16 21:41:38
tags: ['Javascript']
---
# Array

> 数组降维

```javascript
  const array2d = [[1,2,3],[4,5,6],[7,8,9]]
  console.log([].concat(...array2d))
  // 数组降维的另外一种方式, nodejs 11+ 支持
  console.log(array2d.flatMap(x=>x))
```

> 数组拼接

```javascript
 const a = [1,2,3];
 const b = [4,5,6];
 console.log([...a,22,23,...b,33,31])
```

## 方法

### reduce

```javascript
let value = arr.reduce((accumulator, item, index, array) => {
  // ...
}, [initial]);

let arr = [1,2,3];
arr.reduce((cur,item) => {return cur + item, 0})
```

 `accumulator` —— 是上一个函数调用的结果，第一次等于 initial（如果提供了 initial 的话）
 `item` —— 当前的数组元素
 `index` —— 当前索引
 `arr` —— 数组本身
 上一个函数调用的结果将作为第一个参数传递给下一个函数
 如果没有`initial`, `accumulator`则为arr[0]

 ```javascript
 let arr = [1,2,3,4,5];
 arr.reduce( (sum, item) => sum + item, 7)
 // sum 初始值为7，item为 1 第一次调用结果为 8 

 arr.reduce( (sum, item) => sum + item)
 // sum 初始值为1，item为 2 第一次调用结果为 3
 ```

### splice

 ```javascript
 let arr = [1,2,3,4];
 arr.splice(-1,1,6)    // [1, 2, 3, 6]
 // splice 允许索引为负值
 // splice 改变原数组
 ```

### Array.isArray

 ```javascript
 typeof []  // Object
 [] instanceof Array // true
 [] instanceof Object // true

 Array.isArray([]) // Array
 ```

### find

 ```javascript
  const arr = [1,2,3,4,5,6];
  let findArr = arr.find( item => item>3 ) //4
  // find方法的参数是一个回调函数,返回第一个符合条件的数组元素
 ```

### filter

 ```js
  // 过滤符合条件的数组元素
 let userArr = [
  { id:1, name:"张三"},
  { id:2, name:"李四"},
  { id:3, name:"王五"}
 ]
 let filterArr = userArr.filter(item, index, array){

 }

 // 数组去重
  var myArr = [1,3,4,5,6,3,7,4];
  console.log(myArr.filter((value,index,arr)=>arr.indexOf(value)===index));
  //[ 1, 3, 4, 5, 6, 7 ]
 ```

### 在数组中查找

- `arr.indexOf(item, from)` —— 从索引 `from` 开始搜索 `item`，如果找到则返回索引，否则返回 `-1`。
- `arr.includes(item, from)` —— 从索引 `from` 开始搜索 `item`，如果找到则返回 `true`（译注：如果没找到，则返回 `false`）

```javascript
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1（错，应该为 0）
alert( arr.includes(NaN) );// true（正确）
```

## 类数组

常见类数组有函数的剩余参数，
`let arrayLike = document.querySelectorAll('div')`; dom列表

> 类数组拥有`length`属性,且`length`属性的类型是`number`;

```javascript
// 判断类数组
arrLike.length === +arrLike.length
```

```javascript
// 类数组转数组
Array.from(arrLike)

Array.prototype.slice.call(arrLike)
```

> 如果我们在箭头函数中访问 `arguments`，访问到的 `arguments` 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。

```javascript
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

## Spread

```javascript
// 求类型`Array<number>`中的最大值
let arr = [1,2,3,4];
let arr2 = [6,7,8]
Math.max(arr) // error
Math.max(...arr) // 4
Math.max(...arr, ...arr2) // 8

// 字符串转数组
let str = 'string';
[...str]  // ['s','t','r','i','n','g']
Array.from(str)  // ['s','t','r','i','n','g']
```

## Questions and solutions

> 新建长度为7的数组,数组内元素默认值为3

```js
let arr1 = new Array(7).fill(3);    // [3,3,3,3,3,3,3]

let arr2 = Array.apply(null, Array(7)).map(() => 3);    // [3,3,3,3,3,3,3]
```

> 新建长度为7的数组,数组内元素递增赋值

```js
let arr3 = new Array(7).fill(undefined).map( (_, index)=> index );    //[0,1,2,3,4,5,6]
```


### reWrite methods
```js
Array.prototype.map = (callback) => {
  const result = [];
  this.forEach( (item, index) => {
    result.push(callback(item, index))
  } )
  return result
}

Array.prototype.filter = (callback) => {
  const result = [];
  this.forEach( (item, index) => {
    if (callback(item, index)) {
      result.push(item)
    }
  })
  return result
}

Array.prototype.concat = () => {
  const result = [];
  // apply
  // this.forEach( (array) => {
  //   result.push.apply(result, array)
  // })

  // ES6 spread
  // this.forEach( (array) => {
  //   result.push.apply(result, array)
  // })

  // two forEach
  this.forEach( (array) => {
    array.forEach( item => {
      result.push()
    })
  })

  return result
}

```
