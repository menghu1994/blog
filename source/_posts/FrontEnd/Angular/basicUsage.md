---
layout: post
title: Angular Basic Usage
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular']
categories:
 - FrontEnd
---

## 基础语法

```html
<!-- 判断 -->
<p *ngIf="can; else cannot"></p>
<ng-template #cannot></ng-template>

<!-- 循环 -->
<ul>
  <li *ngFor="let item of items; index as i">{{item}} - {{i}}</li>
</ul>

<!-- 属性绑定 -->
<!-- [title] [style.backgroundColor] [class.active] -->
<img [src]="imageUrl">

<!-- 双向绑定 -->
<input [(ngModel)]="name" />

<!-- 事件方法 -->
<button (click)="onButtonClick()">Click me</button>
```

### Angular 17以后支持的语法

```html
<!-- 判断 -->
@if(can) {
   <p>A</p>
} @else {
   <p>B</p>
}

<!-- 循环 -->
<ul>
   @for(item of items; track item.id; let idx = $index, e = $even) {
      <li>{{item}} - {{idx}}</li>
   }
</ul>

<!-- 在模板中定义变量 -->
@let funResult = getResult();
<div>{{ funResult.name }}</div>
<div>{{ funResult.value }}</div>
```

### 父子组件传值(单向)

- 父 => 子
    子组件添加输入属性 @Input()  導入Input符号，添加@Input()装饰器
    父组件内组件中绑定属性和属性值
- 子 => 父
    EventEmitter

## Services
- 导入Injectable符号,并添加@Injectable()装饰器

## Observable

#### 事件绑定

> $event.target 的类型只是 EventTarget。在 getValue() 方法中，把此目标转为 HTMLInputElement 类型，以允许对其 value 属性进行类型安全的访问

```ts
<input type="text" (input)="getValue($event)" />

getValue(event: Event): string {
   return (event.target as HTMLInputElement).value;
}
```

#### ngForm 与 模板变量

> 如果 itemForm.form.valid 无效，那么 NgForm 的 form 属性就会让你禁用提交按钮

```ts
<form #itemForm="ngForm">
   <label>Name:</label>
   <button>Submit</button>
</form>

<div [hidden]="!itemForm.form.valid">sub
</div>
```