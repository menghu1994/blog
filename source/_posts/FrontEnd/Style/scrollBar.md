---
layout: post
title: 滚动条样式修改
tags: ['CSS']
categories:
 - FrontEnd
---

# 滚动条样式修改
```css
div::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #919191 !important;
}
```