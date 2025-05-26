---
layout: post
title: Angular Directives(属性型指令)
tags: ['Angular']
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
categories:
 - FrontEnd
---

## directives
> 属性型指令，通过属性的方式使用，用于改变DOM元素的行为或外观

### `ng` create directives
```shell
$ ng generate directive shark --skip-tests
```
shark.directive.ts
```typescript
import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive(
  { selector: '[appShark]' }
)
export class SharkDirective {
  creature = 'Dolphin';

  constructor(elem: ElementRef, renderer: Renderer2) {
    let shark = renderer.createText('Shark ');
    renderer.appendChild(elem.nativeElement, shark);
  }
}
```
app.component.html
```html
<span appShark>Fin!</span>
<!-- Shark Fin! -->
```


### 实现input和textarea前面不能输入空格

```typescript
@Directive({
  selector: 'input[jhiNoHeadSpace],textarea[jhiNoHeadSpace]',
})
export class NoHeadSpaceDirective  {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput($event: any) {
    if (/^\s+/g.test($event.target.value)) {
      const newValue = $event.target.value.replace(/^\s+/g, "");
      $event.target.value = $event.target.value.replace(/^\s+/g, "");
      this.ngControl.control?.setValue(newValue);
      this.ngControl.control?.updateValueAndValidity();
      $event.target.setSelectionRange(0, 0);
    }
  }
}

// useage
<input formControlName="name" jhiNoHeadSpace matInput>
```

### 实现样式改变

```typescript
@Directive({
  selector: '[jhiReadOnlyStyle]',
})
export class ReadonlyTypeDirective  {

  @Input() readonlyItem: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.readonlyItem) {
      this.renderer.addClass(this.el.nativeElement, 'readonly-form')
    }
  }
}

// readonly 全局只读样式
.readonly-form {
  color:rgba(0, 0, 0, 0.38) !important;
  .mat-form-field-outline{
    color: rgba(0,0,0,0.06) !important;
  }
}

// usage
<mat-form-field appearance="outline" fxFlex jhiReadOnlyStyle [readonlyItem]="isView">
  <mat-label>用户名</mat-label>
  <input [type]="'text'" formControlName='userName' matInput [readonly]="isView">
</mat-form-field>
```
