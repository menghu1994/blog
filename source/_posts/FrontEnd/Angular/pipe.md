---
layout: post
title: Angular Pipes(管道) 
tags: ['Angular']
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
categories:
 - FrontEnd
---

```typescript
export class demo {
    @Input({ transform: trimString }) label = ''
}

function trimString(value: string | undefined) {
    return value?.trim() ?? ''
}
```

### 实例:
管道实现内容超出显示省略号
```JS
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBind',
})
export class DataBindPipe implements PipeTransform {

  transform(value?:string, length?: string):any{
    if(value&&value.length>length){
      return value.substring(0, length) + "...";
    }else if(value){
      return value
    }else{
      return ''
    }
  }
}

```
在模板中使用
```html
<span>{{ '123456789' | dataBind: 6 }}</span>
```
最终显示: 123456...

在`ts`中使用
```js
@Component({})
export class Test {
	constructor(protected dataBind: DataBindPipe) {}

	fun() {
		// 最终返回 1234567...
		return this.dataBind.transform('123456789', 7)
	}
}
```
