---
layout: post
title: 属性型指令(Angular Directives)
date: 2023-10-16 07:41:38
tags: angular
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
---

# directives

实现input和textarea前面不能输入空格
```js
@Directive({
  selector: 'input[jhiNoHeadSpace],textarea[jhiNoHeadSpace]',
})
export class NoHeadSpaceDirective  {
  @HostListener('input', ['$event'])
  onInput($event: any) {
    if (/^\s+/g.test($event.target.value)) {
      $event.target.value = $event.target.value.replace(/^\s+/g, "");
      $event.target.setSelectionRange(0, 0);
    }
  }
}

// useage
<input formControlName="name" jhiNoHeadSpace matInput>
```