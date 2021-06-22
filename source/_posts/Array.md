---
layout: post
title: new Array()
index_img: https://www.freecodecamp.org/news/content/images/2021/05/freeCodeCamp-Cover-1.png
banner_img: https://miro.medium.com/max/892/1*bFIR37BFmQcxyPd7UPs6xg.png
tags:
 - javascript
---
Javascript 数组对象
<!--more-->
# array
## 添加/删除元素:
 - arr.push()  //从尾端添加元素
 - arr.pop()   //从尾端提取元素
 - arr.shift()   //从前端提取元素
 - arr.unshift()  //从前端添加元素

 - arr.splice(index,num,arr) //从索引为index开始删除num个数组元素,并在当前位置插入arr
 - arr.slice(start,end) //返回索引start到end的数组
 - arr.concat(arr2) //合并数组并返回

## 遍历元素:
 - arr.forEach() //数组为每个元素都运行一个函数
  + forEach, for, for..of   //遍历数组
  + map(func)  //遍历并新数组

## 搜索元素:
 - arr.indexOf()  //返回索引,找不到返回-1
 - arr.lastIndexOf()  //返回索引
 - arr.includes()  //返回true/false

 - arr.find(function(){...}) //返回单个元素
 - arr.findIndex() //返回索引
 - arr.filter(function(){...})  //返回多个元素

## 转换数组:
 - arr.sort( (a,b) => a-b )  //数字排序
 - arr.sort( (a,b) => a.localeCompare(b) )  //字符串排序

 - arr.reverse()  //反转顺序

 - arr.reduce( (accumulator, item, index, array) => {..} )  //accumulartor是上次函数调用的结果
 - arr.reduceRight()

## 其他:
  - Array.isArray(arr)  //检查arr是否是一个数组

Array : toString();
		toLocalString();
		valueOf();
		some();
		every();
		fliter();
		forEach();
		map( function(item,index,array){} );
		reduce( function(prev,cur,index,array){} );
		arr.sort( function(a,b){
			return a-b;
		})