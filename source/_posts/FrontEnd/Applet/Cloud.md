---
layout: post
title: 微信小程序云开发
excerpt: 摘要
tags: 小程序
---

# 微信小程序云开发

## 初始化数据库

> 小程序端

```js
// 初始化数据库
const cloud =  wx.cloud().database();

// 查询数据库名为list中的数据信息
const DB = cloud.collection("list");
```

> 云函数端

```js
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const DB = cloud.database().collection("list")
```

### 添加数据库信息

```js
DB.add({
 data:{
  name: 'xiaoming',
  age: 18
 },
 success(res){
  console.log("添加成功", res)
 },
 fail(res) {
  console.log("添加失败", res)
 }
})
```

### 查询数据库信息

```js
DB.get({
 success(res){
  console.log("查询数据成功", res)
 },
 fail(res) {
  console.log("查询数据失败", res)
 }
})
```

### 删除数据库信息

```js
// 根据自动生成的id删除对应数据
DB.doc(id).remove({
 success(res){
  console.log("删除成功", res)
 },
 fail(res) {
  console.log("删除失败", res)
 }
})
```

### 修改数据库信息

```js
// 根据自动生成的id修改对应数据
DB.doc(id).update({
 data:{
  "name":"li",
  "age": 12
 },
 success(res){
  console.log("删除成功", res)
 },
 fail(res) {
  console.log("删除失败", res)
 }
})
```

## 云函数

### 添加云函数

```

```

### 调用云函数

```js
// 调用add云函数
wx.cloud.callFunction({
 name:"add",
 data:{
  a: 1,
  b: 2
 },
 success(res){
  console.log("请求成功",res)
 },
 fail(res){
  console.log("请求失败",res)
 }
})
```


## 云开发
let db = wx.cloud.database();
const _ = db.command;

### 分页
```typescript
splitPage(_data: string,pageSize: number,start: number) {
  db.collection(_data)
    .limit(pageSize)
    .skip(start)
    .get()
    .then( res => {
      console.log('请求成功',res)
    })
    .catch( err => {
      console.log('请求失败',err)
    })
}


data: {
  list: []
},
onLoad(options) {
  wx.showLoading({title: '粪力加载中...'});
  this.getList()
},
getList() {
  let startIndex = this.data.list.length;
  db.collection('data1')
    .skip(startIndex)
    .get()
    .then(res => {
      wx.hideLoading();
      if(res.data.length === 0){
        wx.showToast({
          icon: 'none',
          title: '没有更多数据拉'
        })
      }
      this.setDate({
        list: [...this.data.list,...res.data]
      })
    })
    .catch(err =>{
      wx.hideLoading();
      console.log('请求失败', res)
    })
  },
onReachBottom: function () {
  this.getList();
}
```

## 复杂查询
```js
//  价格大于5
 db.collection('goods')
   .where({
    price: _.gt(5)
   })
   .get()
   .then()

//  价格大于等于5 小于10
 db.collection('goods')
   .where(_.and([{
    price: _.gte(5)
   },{
    price: _.lt(10)
   }]))
   .get()
   .then()
```


## 云函数
```js
  const cloud = require('wx-server-sdk');
  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });

  exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    return {
      event,
      openid: wxContext.OPENID
    }
  }
```


### 调用
```js
wx.cloud.callFunction({
  name: 'getD'
}).then( res => {
  console.log('云函数获取数据成功', res)
}).catch( res => {
  console.log('云函数获取数据失败', res)
})
```
