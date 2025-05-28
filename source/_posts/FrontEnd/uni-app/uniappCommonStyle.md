---
layout: post
title: Uniapp公共样式
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp公共样式
> 文件`uni.scss`

```scss
/* uni.scss */
@import 'uview-ui/theme.scss';

page {
	width: 100%;
	background-color: #EDF0F7;
	height: 100%;
}

/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;
$uni-color-show: #EC808D;
$base-color: #005691;

$margins: 5, 10, 15, 20, 25, 30, 40, 60, 80, 100;
// 下边距
@each $size in $margins {
  .margin-b#{$size} {
    margin-bottom: #{$size}rpx;
  }
}

// 右边距
@each $size in $margins {
  .margin-r#{$size} {
    margin-right: #{$size}rpx;
  }
}

// 字体大小
$font-sizes: 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 46, 50, 60, 80;
@each $size in $font-sizes {
  .font-#{$size} {
    font-style: normal;
    font-size: #{$size}rpx;
    font-family: Droid Sans Fallback;
  }
}

// 字体对齐
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

// color相关
.color-white { color: #FFFFFF; }
.color-red { color: #dc0000; }

// 黑色色阶向下
.color-black { color: #000; }
.color-black-3 { color: #333; }
.color-black-6 { color: #666; }
.color-black-9 { color: #999; }

// 字体宽度
.font-weight-400 { font-weight: 400; }
.font-weight-500 { font-weight: bold; }

// 圆角
.radius-10 { border-radius: 10rpx; }
.radius-20 { border-radius: 20rpx; }
.radius-30 { border-radius: 30rpx; }
.radius-circle { border-radius: 50%; }
.radius-height { border-radius: 10000px; }

// flex相关
.vs-flex { display: flex; }
.vs-flex-item { flex: 1; }
.vs-flex-wrap { flex-wrap: wrap; }
.vs-space-between { justify-content: space-between; }
.vs-space-around { justify-content: space-around; }
.vs-space-center { justify-content: center; }
.vs-space-end { justify-content: flex-end; }
.vs-row { flex-direction: row; }
.vs-column { flex-direction: column; }
.vs-align-end { align-items: flex-end; }
.vs-align-center { align-items: center; }
.vs-align-start { align-items: flex-start; }
.vs-item-hover { background-color: rgba(0, 0, 0, 0.05); }
.vs-btn-hover { opacity: 0.8; }

// 按钮相关
.btn-default {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	color: #fff;
}
```