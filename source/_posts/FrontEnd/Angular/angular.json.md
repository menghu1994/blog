---
layout: post
title: Angular.json
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular']
categories:
 - FrontEnd
---

# angular.json 项目配置

```json
  "projects": {
    "LuffyKit": {
    	// 项目类型 application / library
      "projectType": "application",
      "root": "",
      // 根目录
      "sourceRoot": "src",
      // 模块组件等创建前缀
      "prefix": "mh",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
          	// build 输出路径
            "outputPath": "dist/luffy-kit",
            // 根文件
            "index": "src/index.html",
            "main": "src/main.ts",
            "inlineStyleLanguage": "scss",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            // 开放目录(可直接导航显示)
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            // 样式预处理目录
            // 可进行导入无需相对路径 @import 'fileName' && @import './src/style/fileName.scss'
            "stylePreprocessorOptions": {
              "includePaths": [
                "./src/assets/style"
              ]
            },
            "styles": [
              "@angular/material/prebuilt-themes/indigo-pink.css",
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
```
