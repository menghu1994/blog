---
layout: post
title: Angular library
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular']
categories:
 - FrontEnd
---

### 组件库

`npm run ngc -p tsconfig.json` 编译成js文件输出(dist/out-tsc)
> Angular 编译器会按照 tsconfig.json 配置的规则进行编译,一般在开发 Angular 库时运行
> 它会把 Decorator、Scss、TS、HTML 变成 JS，把 "声明式代码" 变成 "执行代码"。

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
