---
layout: post
title: Uniapp介绍
tags: ['Uniapp']
categories:
 - FrontEnd
---

# uni-app

> uniapp是使用vue的语法，和微信小程序的组件、api的一个开发框架。
> 虽然可以多端编译,但安卓、ios、支付宝小程序等都有特性,需要分别写一些代码进行平台判断,具体的问题需要测试遇到再看...

## 项目框架
### 用Hbuilder生成类小程序项目(选用)
> 优势: Hbuilder对uniapp支持完善(语法),拥有可视化预览，真机调试，打包发布，热更新，云打包，云开发，插件市场等功能,项目配置可视化(`manifest.json`)

> 劣势：Uniapp只能运行在Hbuilder中,Hbuilder相对其他开发工具(vs code,webstorm)体验较差
### 生成Vue项目目录
> 优势: 纯Vue项目目录,降低学习成本,可以在任意开发工具中使用
 
> 劣势：不能实现云等功能,`package.json`运行启动项复杂

## 项目目录（非常规Vue项目文件）
`manifest.json`
> 项目配置文件,包含应用名称、版本号、图标、启动页面、权限、网络、权限、基础配置等

注意事项：
+ 打包必须生成appid
+ `modules`中配置是否需要某些模块(蓝牙,指纹,相机,扫码等)
+ 本地开发跨域配置
 - `manifest.json`中配置`h5`的`devServer`
 - url带有services的请求都会被代理
   "proxy" : {
   "/services" : {
   "target" : "http://192.168.1.251:8080/",
   "changeOrigin" : true, //是否跨域
   "secure" : false, // 设置支持https协议的代理
   "pathRewrite" : {
   "^/services" : "/services"
   }
   },

`pages.json`
> 页面配置文件,包含页面路径、窗口样式、tabBar、分包、条件编译等(类小程序)

注意事项：
+ 添加顶部按钮
- 单独的页面添加`"app-plus": { "titleNView": { "buttons": [{ "type": "menu","float": "right" }] } }`、
+ 分包
- 主包目录 `"pages": [{ "path": "pagesA/index" }]`
- 分包目录 `"subPackages": [{ "root": "pagesA", "pages": [{ "path": "pagesA/index" }] }]`
+ 客户端适配
 - `globalStyle` 中配置是否自动横屏, 设备宽度等

### 常用功能
#### 动态设置页面标题
```js
   uni.setNavigationBarTitle({
       title: '标题'
   });
```

#### 返回首页 
```js
  onNavigationBarButtonTap: function(e) {
      uni.switchTab({
          url: '../pages/home/home'
      })
  }
```