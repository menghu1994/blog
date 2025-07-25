---
layout: post
title: Gradient Background Animation
index_txt: Animation
tags: ['CSS']
---

## Gradient Background Animation
```css
 .css-selector {
    width: 400px;
    height: 400px;
    background: linear-gradient(170deg, #000000, #ffffff);
    background-size: 400% 400%;
    -webkit-animation: rgb 59s ease infinite;
    -moz-animation: rgb 59s ease infinite;
    -o-animation: rgb 59s ease infinite;
    animation: rgb 59s ease infinite;
}
@-webkit-keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
@-moz-keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
@-o-keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
@keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
```

<div class="code-preview">
    <div class="css-selector"></div>
</div>

<style>
     .css-selector {
    width: 100%;
    height: 300px;
    border-radius: 0.4rem;
    background: linear-gradient(170deg, #000000, #ffffff);
    background-size: 400% 400%;
    -webkit-animation: rgb 59s ease infinite;
    -moz-animation: rgb 59s ease infinite;
    -o-animation: rgb 59s ease infinite;
    animation: rgb 59s ease infinite;
}
@-webkit-keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
@-moz-keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
@-o-keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
@keyframes rgb {
    0%{background-position:36% 0%}
    50%{background-position:65% 100%}
    100%{background-position:36% 0%}
}
</style>