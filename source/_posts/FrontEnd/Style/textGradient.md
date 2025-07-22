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
<div class="code-preview">
  <div class="text-gradient">文字渐变效果 文字渐变效果 文字渐变效果 文字渐变效果</div>
</div>

<style>
  .code-preview {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    background: transparent radial-gradient(100% 100% at 100% 0, #21C28D6e 0, #924B946e 100%);
    position: relative;
  }
  .code-preview::before {
    content: "";
  background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }
  @keyframes glowing-button {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
  .code-preview::after {
    content: 'Preview';
    color: #0000006e;
    position: absolute;
    right: 0.8rem;
    bottom: 0.5rem;
    font-size: 0.8rem;
  }
.text-gradient {
  text: transparent;
  background-image: linear-gradient(to right, #f00, #0f0, #00f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>