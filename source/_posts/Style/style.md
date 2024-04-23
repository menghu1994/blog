---
title: Css
---

```scss
// 在rgba中使用'#ffffff'颜色格式
background-color: rgba($color: $uni-color-error, $alpha: 0.3)


    @for $i from 0 through 24 {
      .width-#{$i} {
        width: calc(#{$i * 4.1666%} - 4px) !important;
      }
    }
```