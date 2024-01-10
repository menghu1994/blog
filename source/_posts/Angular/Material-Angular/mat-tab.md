---
layout: post
title: Material-Angular
date: 2024-1-10 09:48:00
tags: angular material
---

# Material Angular Mat-tab 使用技巧

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
