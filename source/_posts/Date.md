---
layout: post
title: new Date()
index_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-DrMvfXRpwdDe84ycvLVF5GVuRgdkk2DUfQ&usqp=CAU
tags: ['Javascript']
---
Javascript 时间对象
<!--more-->
# Date
let now = new Date()
 - new Date(0)  //1970年1月1日

## 获取日期组件
 - now.getFullYear()  //获取年份2008
 - now.getMonth()  //获取月份,0~11
 - now.getDate()  //获取天,1~31
 - now.getHours()
 - now.getMinutes()
 - now.getSeconds()
 - now.getMilliseconds()
 - now.getDay() //0~6,周日到周六
 - now.getTime() //获取从1970至今的毫秒数(优先)
  + alert( +now ) //获取从1970至今的毫秒数
  + Date.now()  //获取从1970至今的毫秒数

## 设置日期组件
 - setFullYear()
 ...
 - setTime()

 Date :  var now = new Date();
		var sometime = new Date(Date.parse("7/10/2019"));
		var sometime = new Date(Date.UTC(2018,6,10));

		getTime();
		getFullYear();
		getMonth();
		getDate();
		getDay();
		getHours();
		getMinutes();
		getSeconds();
		getMilliSeconds();

