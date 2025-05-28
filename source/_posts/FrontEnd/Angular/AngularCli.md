---
layout: post
title: Angular项目搭建
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular']
categories:
 - FrontEnd
---

## 安装Angular CLI
`npm install -g @angular/cli`

## 更新cli
`npm uninstall -g @angular/cli`
`npm install -g @angular/cli@latest`

## 命令行快速生成

```shell
// 生成项目
$ ng new <项目英文名> --style=scss --skip-tests --ssr=false -s -t
# --style=scss 使用scss作为css

# --skip-tests 不生成测试代码
# --routing=false 不生成路由代码
# --ssr=false 不支持ssr(服务端渲染)
# -s （--inline-style）移除.scss文件，直接在ts文件中写样式
# -t  (--inline-template) 移除.html文件，直接在ts文件中写

// 安装ng-zorro
$ ng add ng-zorro-antd

// 生成模块
$ ng generate module <路径及模块名称>
// 缩写,在app文件夹下生成路径为pages/setup的setup.module.ts文件
$ ng g m pages/setup

//生成组件
$ ng generage component <路径及组件名称>
// 缩写, 在app文件夹下生成路径为pages/setup的组件的模板、样式、测试文件、ts文件四个文件
$ ng g c pages/setup

// 生成服务
$ ng generage service <路径及服务文件名称>
// 缩写
$ ng g s services/local-storage

// 启动服务
$ ng serve 
或
$ npm start 
```

## 多项目工作区(version angular>10.9)
> 多个angular项目共享一个git, node_modules;
> 可用于项目(Project)和组件库(Library)同时开发

```shell
// 创建工作区(没有项目),生成基本目录
$ ng new firstWorkspace --create-application=false

// 创建项目
$ ng generate application first-app

// 创建组件库(组件库拥有自己的package.json)
$ ng generate library test-core

// 项目使用组件库(每次组件库更新都要执行此命令)
$ ng build test-core

// 启动指定项目(package.json),如果工作区中只有一个项目则默认启动此项目
$ ng serve --project="first-app"

// 构建应用程序
$ ng build --prod --project="first-app"
```

![Angular running track](https://www.runoob.com/wp-content/uploads/2016/09/overview2.png)


tips:
在已有目录下创建项目 ng new <project name> --directory ./