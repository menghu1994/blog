---
layout: post
title: HttpRequest
tags: ['Javascript']
---

# XMLHttpRequest
> js 原生网络请求数据

## 封装
```js
/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
  opt = opt || {};
  opt.method = opt.method.toUpperCase() || 'POST';
  opt.url = opt.url || '';
  opt.async = opt.async || true;
  opt.data = opt.data || null;
  opt.success = opt.success || function () {};
  let xmlHttp = null;
  if (XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
  }
  else {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }let params = [];
  for (let key in opt.data){
      params.push(key + '=' + opt.data[key]);
  }
  let postData = params.join('&');
  if (opt.method.toUpperCase() === 'POST') {
      xmlHttp.open(opt.method, opt.url, opt.async);
      xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      xmlHttp.send(postData);
  }
  else if (opt.method.toUpperCase() === 'GET') {
      xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
      xmlHttp.send(null);
  } 
  xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          opt.success(JSON.parse(xmlHttp.responseText));//如果不是json数据可以去掉json转换
      }
  };
}

// Usage
ajax({
  method: 'get',
  url: 'url',
  success: function (data) {}
})
```
