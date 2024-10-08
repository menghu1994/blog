---
layout: post
title: Angular17
date: 2024-01-15
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
tags: ['Angular17']
---

# Angular17

## 创建angular17项目
`ng new project001 --style=scss --skip-tests --routing=false --ssr=false -s -t`
--style=scss 使用scss作为css
--skip-tests 不生成测试代码
--routing=false 不生成路由代码
--ssr=false 不支持ssr(服务端渲染)
-s （--inline-style）移除.scss文件，直接在ts文件中写样式
-t  (--inline-template) 移除.html文件，直接在ts文件中写


`npm run ngc -p tsconfig.json` 编译成js文件输出(dist/out-tsc)


独立组件可以直接导入，无需在模块中声明
```typescript
@Component({
    standAlone: true,
    selector: 'demo'
})
export class demo {}

@Component({
    standAlone: true,
    selector: 'HelloWorld',
    template: `<demo />`
})
export class helloWorld {}
```

组件传值pipe
```typescript
export class demo {
    @Input({ transform: trimString }) label = ''
}

function trimString(value: string | undefined) {
    return value?.trim() ?? ''
}
```

### 插槽
组件 `selector: 'custom-item'`
```html
<div>
    <ng-content select="card-title"></ng-content>
    <ng-content select="card-body"></ng-content>
</div>
```

组件使用1
```html
<custom-item>
    <card-title>插槽title</card-title>
    <card-body>插槽body</card-body>
</custom-item>
```

组件使用2
> `ngProjectAs` 挂在内容到任意html标签
```html
<custom-item>
    <h2 ngProjectAs="card-title">插槽title</h2>
    <card-body>插槽body</card-body>
</custom-item>
```

## use service
`service`Demo
```typescript
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  add(x: number, y: number) {
    return x + y;
  }
}
```
usage
```typescript
@Component({
  selector: 'app-receipt',
  template: `<h1>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
    // 在非构造函数中使用
  private calculatorService = inject(CalculatorService);
  totalCost = this.calculatorService.add(50, 25);
}
```

## ng-content && ngProjectAs
Component template
```html
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content></ng-content>
</div>
```
Using the component1
```html
<custom-card>
  <card-title>Hello</card-title>
  <p>Welcome to the example</p>
</custom-card>
```
Using the component2
```html
<custom-card>
  <h3 ngProjectAs="card-title">Hello</h3>
  <p>Welcome to the example</p>
</custom-card>
```