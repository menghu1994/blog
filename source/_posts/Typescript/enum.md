---
layout: post
title: enum
tags: ts
---

# enum

[enum](https://hijiangtao.github.io/2020/07/13/Examples-Of-TypeScript-Enum-Type/)

```ts
enum Color { 
  Red = 2,
  Green,
  Blue
};
let c: Color = Color.Blue
console.log(c)  // 4

let d: Color = Color[2];
console.log(d)  // Red
```
