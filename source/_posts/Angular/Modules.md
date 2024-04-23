---
layout: post
title: Angular Modules
date: 2023-10-16 07:41:38
tags: ['Angular']
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
---


# Modules

> @NgModule() 装饰器

### 属性
 - declarations (可声明对象表) 属于本模块的组件、指令、管道
 - exports (导出表)	 那些能在其它模块的组件模板中使用的可声明对象的子集。
 - imports（导入表） 导出了本模块中的组件模板所需的类的其它模块
 - bootstrap (主视图,根组件) 只有根模块才能设置
