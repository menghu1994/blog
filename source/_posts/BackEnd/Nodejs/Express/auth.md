---
layout: post
title: auth
tags: ['Express']
---

# Password in Express

## `pbkdf2-password`
> 用于在Node.js中处理密码的中间件，它使用PBKDF2哈希算法来加密密码。它可以很好地与Express框架一起使用。

1. `npm install pbkdf2-password`
2. Usage
```js
const express = require('express');
const pbkdf2 = require('pbkdf2-password')();

const app = express();

app.use(express.urlencoded({ extended: true }));

// 定义一个用于验证密码的函数
function authenticateUser(username, password, done) {
  // 查询数据库以获取与用户名匹配的用户数据
  const user = getUserFromDatabase(username);

  if (!user) {
    return done(null, false, { message: 'Invalid username or password' });
  }

  // 使用pbkdf2算法检查密码是否匹配
  pbkdf2({ password, salt: user.salt }, (err, hash) => {
    if (err) {
      return done(err);
    }

    if (hash !== user.hash) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    return done(null, user);
  });
}

// 在此处定义路由和其他中间件
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

```
