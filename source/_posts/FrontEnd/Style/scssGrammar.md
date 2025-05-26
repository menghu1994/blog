---
layout: post
title: Scss
tags: ['CSS']
categories:
 - FrontEnd
---

# [Scss语法](https://sass-lang.com/guide/)

## 变量
```scss
$primary-color: #333;

div {
  color: $primary-color
}
```

## 文件模块引用
> 当前scss文件引用其他scss文件的变量
```scss
<!-- a.scss -->
$primary-color: #333;

div {
  color: $primary-color
}

<!-- b.scss -->
@use 'a';

.test {
  background-color: base.$primary-color;
}
```

## 循环

```scss
@for $i from 0 through 24 {
  .width-#{$i} {
    width: calc(#{$i * 4%} - 4px) !important;
  }
}
```