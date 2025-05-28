---
layout: post
title: Angular Services
tags: ['Angular']
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
categories:
 - FrontEnd
---

# @Injectable() 装饰器
> 对于与特定视图无关并希望跨组件共享的数据及逻辑,可以创建服务类
> 使用@Injectable() 装饰器,可以让服务作为依赖被注入到其他组件中.
> 依赖注入DI, 处理冲服务器获取数据, 验证用户输入或直接把日志写到控制台.

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