---
layout: post
title: Token和Cookie的区别
tags: ['token']
---

# Token和Cookie

## 相同点
 - 目的相同,验证用户登录状态

### 实现登录验证的方式
1. (全后端处理)后端可以控制客户端浏览器的cookie,后端通过setCookie把登录验证字符串(token字符串,前端用不到)放到cookie中,
由于cookie的特性是所有的请求内容都会自动携带，所以每次发送请求时后端自动识别cookie中的信息以达到验证登录状态的作用。
2. 由后端返回token验证字符串,前端将token手动放到请求header中,后端接收请求后识别header中的token以达到验证登录状态的作用。


## 不同点
1. 定义不同
> token[JSON Web Tokens (JWT)]是服务端返回一串拼接的`字符串`(由Header,Payload,Signature等组成)
> cookie是浏览器的功能，可以存储信息，后端和前端都可以修改，即使浏览器关闭，cookie也可以保存

2. 实现验证的方式不同
后端最终都是拿到验证字符串(token)来识别登录状态,只不过是从哪儿里拿
> 后端返回token字符串由前端将它手动放到每次请求中发送到后端，后端再识别token
> 后端将token设置到浏览器的cookie功能中,每次与后台交互发送请求时会自动携带，后端识别cookie中的token

## 为什么后端设置cookie更方便，还会有前端处理
因为cookie会自动携带,所以每次请求都会携带，包括图片，音频等内容，会增加每个请求的数据量


## Access Token 和 Refresh Token