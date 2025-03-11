---
layout: post
title: Material Angular 使用技巧
index_img: https://www.w3cplus.com/sites/default/files/blogs/2020/2007/greensock-beginner-1.png
tags: ['Angular','material']
---

# Material Angular 使用技巧

### mat-tab 切换时如何刷新数据(只渲染当前tab)
```html
<mat-tab-group>
  <mat-tab label="A">
    <ng-template matTabContent> Content of tab A </ng-template>
  </mat-tab>
  <mat-tab label="B">
    <ng-template matTabContent> Content of tab B </ng-template>
  </mat-tab>
</mat-tab-group>
```
