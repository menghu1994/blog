---
layout: post
title: 文字渐变
index_txt: CSS
tags: ['CSS']
categories:
 - FrontEnd
---

# 文字渐变
```css
p {
  text: transparent;
  background-image: linear-gradient(to right, #f00, #0f0, #00f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```