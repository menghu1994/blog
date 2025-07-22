---
layout: post
title: Mongodb in Express
categories:
 - BackEnd
tags: ['Mongodb']
---


# Mongodb in Express

## Mongodb
> 非关系形数据库

1. `npm install mongodb` 在express项目中安装;
2. Usage

全局数据库连接`db.js`
```js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/config';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10, // 连接池大小为10
});

async function connect() {
    try {
        await client.connect()
        console.log('has Connect')
    } catch (e) {
        console.error(e)
    }
}

connect().then();

module.exports = client
```

调用数据库连接并请求数据
```js
// 引入db.js
const client = require('../utils/db')
const express = require('express')
const app = express()

app.get('/', function(req, res, next) {
  // 获取与查询匹配的文档
  const db = client.db();
  db.collection('user').find().toArray((err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to query users from MongoDB');
      return;
    }
    console.log('Found users:', docs);
    // 将结果发送给客户端
    res.send(docs);
  });
});
```
