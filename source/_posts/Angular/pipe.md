---
layout: post
title: Angular Pipes(管道) 
date: 2023-10-20
tags: angular pipe
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
---

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
