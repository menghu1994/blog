---
layout: post
title: Angular library
date: 2023-10-16 07:41:38
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
tags: ['Angular']
---

### 组件库

> 发布
```shell
  ng build my-lib
  cd dist/my-lib
  npm publish
```

> 实时构建本地library
```shell
 ng build <library-name> --watch # builds your library
 ng build <app-name> # builds the application that depends on your library
```

> 本地临时文件
1, npm link


### 应用项目

2, npm link <components>
3, ng serve


1, 导入基础material样式
`@import "../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css";`
2, 导入插件已使用module
`BrowserModule, HttpClientModule,BrowserAnimationsModule,TranslateModule`


## 组件库
ng build components --watch
cd dist/components
npm link

## 其他项目
npm link components
