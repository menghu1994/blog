---
layout: post
title: stylus
index_img: https://www.stylus-lang.cn/img/stylus-logo.png
banner_img: https://titangene.github.io/images/cover/css.png
tags: ['css']
---
css预处理
<!--more-->
### calc
```css
img{
	width:400px;
	height:300px;
	padding-left: calc(50vw-400/2);
	padding-top: calc(50vh-300/2);
}
```


# Stylus
> 垂直居中元素
```stylus
.center
	position absolute
	left 50%
	top 50%
	width 400px
	height 300px
	margin-left -(@width / 2)
	margin-top -(@height / 2)
```
> 一像素分割线
```stylus
border-1px($color)
	position relative
	&::after
		display block
		position absolute
		content ''
		width 100%
		border-bottom 1px solid $color
		left 0
		bottom 0
border-none()
	border none
	&::after
		border none
@media screen and (min-device-pixel-ratio:3)
	.border-1px
		&::after
			transform scaleY(0.333)
```
> 媒体查询采用不同尺寸的图片
```
bg-img($url)
	background-image url($url+"@2x.png")
	@media screen and (min-device-pixel-ratio:3)
		background-image url($url+"@3x.png")
```
> 清除浮动
```stylus
.clearfix
	display inline-block
	&::after
		content ''
		height 0
		line-height 0
		display block
		visibility hidden 
		clear both
```
> 
```stylus
vendor(prop, args)
	-webkit-{prop} args
	-moz-{prop} args
	{prop} args

border-radius()
	vendor('border-radius', arguments)
```
> 变量
```stylus
font-size 14px

body
	font font-size Arial, sans-seri
```
