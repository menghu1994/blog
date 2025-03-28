---
layout: post
title: Date
date: 2023-10-16 21:41:38
index_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-DrMvfXRpwdDe84ycvLVF5GVuRgdkk2DUfQ&usqp=CAU
tags: ['Javascript']
---
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

```js
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
```

```typescript
new Date(0) // 1970 年 1 月 1 日
new Date(24 * 60 * 60) // 1970 年 1 月 1 日

// 传入的整数参数代表的是自 1970-01-01 00:00:00 以来经过的毫秒数，该整数被称为`时间戳`。
new Date(Time: number)

// 传入的字符串会被自动解析,解析为当前时间
new Date(date: string)
// 使用当前时区中的给定组件创建日期
new Date(year, month, date, hours, minutes, seconds, ms)
```

## 方法

### 获取时间

```javascript
let date = new Date();
date.getFullYear() // 获取年份 2022
data.getMonth() // 获取月份 0~11
data.getDate() // 获取当月具体日期 1~31
getHours()，getMinutes()，getSeconds()，getMilliseconds() // 获取时,分钟,秒钟,毫秒
date.getDay() // 获取星期几  0~6 0默认是周日
date.getTime() // 获取从1970至今所经历的毫秒数
```

### 设置时间

```javascript
new Date().setFullYear(year, [month], [date])
new Date().setMonth(month, [date])
new Date().setDate(date)
new Date().setHours(hour, [min], [sec], [ms])
new Date().setMinutes(min, [sec], [ms])
new Date().setSeconds(sec, [ms])
new Date().setMilliseconds(ms)
new Date().setTime(milliseconds)（使用自 1970-01-01 00:00:00 UTC+0 以来的毫秒数来设置整个日期）
```

## 具体应用

### 本月第一天到 最后一天

```javascript
const nextMonth = new Date().getMonth() + 1; // 比如现在是7月，那么nextMonth === 7
const nextMonthFirstDay = new Date(new Date().getFullYear(), nextMonth, 1); 
const oneDay = 24 * 60 * 60 * 1000;

let startDate = new Date(new Date(new Date().setDate(1)).setHours(0, 0,0, 0));
let endDate = new Date(new Date(new Date(nextMonthFirstDay - oneDay))setHours(23, 59, 59, 999));
```

### 本周第一天到 最后一天

```javascript
const startTime = new Date().setHours(0, 0, 0, 0);
const endTime = new Date().setHours(23, 59, 59, 999);

let nowDayOfWeek = new Date().getDay();
if (nowDayOfWeek === 0) nowDayOfWeek = 7;
const dayNum = 1 * 24 * 60 * 60 * 1000;
// 获取本周星期一的时间，星期一作为一周的第一天
const firstDate = new Date(new Date().valueOf() - (nowDayOfWeek - 1) *dayNum);
// 获取本周星期天的时间，星期天作为一周的最后一天
const lastDate = new Date(new Date(firstDate).valueOf() + 6 * dayNum);

const startDate = new Date(startTime(firstDate));
const endDate = new Date(endTime(lastDate));
```

### 今日零点到24点

```javascript
const startDate = new Date(new Date().setHours(0, 0, 0, 0));
const endDate = new Date(new Date().setHours(23, 59, 59, 999));
```

### 日期转数字

```typescript
let date: Date = new Date();  // Mon Jul 25 2022 13:11:45 GMT+0800 (中国标准时间)
date.valueOf();  // 1658725548748
date.getTime();  // 1658725548748
Date.now();      // 1658725548748
+date;           // 1658725548748
new Date(2022,6,25)-new Date(2022,6,24)  // 86400000 隐式调用了valueOf() 方法
new Date(2022,6,25).getTime()-new Date(2022,6,24).getTime()  // 86400000 (性能比valueOf高)
```

### 创建日期

创建一个 Date 对象，日期是：Feb 20, 2012, 3:12am。时区是当地时区。

```javascript
1. new Date(2012,1,20,3,12);
2. new Date("2012-02-20T03:12");
```
