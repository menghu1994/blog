---
layout: post
title: juliaDay转换
index_txt: Gist
tags: ['Gist']
---

# juliaDay
> 日期格式以`2025002`形式保存，其中`2025`为年份，`002`为2025年的第2天。

```ts
// 数字2025120 To Date日期
export const juliaDayBind = (v: number): Date => {
  const arr = [31,28,31,30,31,30,31,31,30,31,30,31];
  const year = v.toString().slice(0,4);
  if((Number(year) % 4 === 0 && Number(year) % 100 !== 0) || (Number(year) % 400 === 0)){
    arr[1] = 29
  }
  const totalDays = v.toString().slice(4);
  const monthDay = sum(arr, Number(totalDays));
  return new Date(+year, monthDay[0]-1, monthDay[1])
};


// Date日期 To 数字2025120
export const getDays = (date: Date): number => {
  const nowTimes = date.getTime();
  const curYear = date.getFullYear();
  const firstDayTimes = new Date(curYear,0,0).getTime();
  const curDay = Math.floor((nowTimes-firstDayTimes)/(1000*60*60*24));
  return Number(curYear + turnDigits(curDay))
};

// 添加0位置以达到指定位数
// turnDigits(2) => '002'
// turnDigits(33) => '033'
export const turnDigits = (day: number, length = 3): string => {
	return day.toString().padStart(length, '0')
}
```