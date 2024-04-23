---
layout: post
title: CSS Animation
banner_img: https://angieng47.files.wordpress.com/2012/09/screen-shot-2012-09-27-at-6-11-20-pm.png
index_img: https://cdn.dribbble.com/users/1052222/screenshots/6252807/drivitty_still_2x.gif?compress=1&resize=400x300
tags: ['css']
---
transition;animation
<!--more-->
transition:
 - ease			//缓慢开始
 - linear		//匀速
 - ease-in		//缓慢开始
 - ease-out		//缓慢结束
 - ease-in-out	//缓慢开始，缓慢结束

 -webkit-perspective		//距离屏幕距离
 -webkit-perspective-origin: 50% 50%;
 -webkit-transform-style:-webkit-preserve-3d	//三维场景

 transform-origin		//旋转中心
  - x轴 left center right
  - y轴 top center bottom
  - z轴 length px

transform:rotateY(20deg)

## Animation
 + animation:动画名称 持续时间 运动曲线 延时时间 播放次数 方向
 - @keyframe
 - animation-name  				
 - animation-duration				//完成所需时间
 - animation-timing-function		//速度曲线 ease..
 - animation-delay					//延时时间
 - animation-iteration-count		//播放次数 infinite
 - animation-direction				//下次是否逆向播放 normal/alternate
 - animation-play-state 			//动画运行或暂停 paused/running
 - animation-fill-mode				//动画外的状态 none/forwards/backwards/both
