---
layout: post
title: Material-Angular-Select
date: 2024-3-27
tags: angular material
---

# Material Angular Mat-tab 使用技巧


### mat-select 添加输入过滤框
```html
<mat-select formControlName="markingCode" (openedChange)="inputField.value = '';selectedCodeList = codeList;">
    <input autofocus #inputField (keyup)="onKey($event, codeList, 'selectedCodeList')" placeholder="搜索" />
    <mat-option *ngFor="let item of selectedCodeList" [value]="item.key">{{item.name}}</mat-option>
</mat-select>
```

```ts
class AComponent {
  codeList = [{}];
  constructor() {
    this.selectedCodeList = [...this.codeList];
  }

  // @Params
  // originList: T[] 原始数据列表;
  // temporaryListString: string 临时列表名称;
  // filterField: keyof T 需要过滤的字段(显示什么字段,默认过滤name);
  onKey<T extends Record<string, string>>($event: any, originList: T[], temporaryListString: keyof AComponent,filterField: keyof T = 'name'): void {
    this[temporaryListString] = originList.filter((option: T) => (option[filterField] || '').toLowerCase().includes($event.target.value.toLowerCase())) as never;
  }
}
```
