---
layout: post
title: Angular ViewChild
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular']
categories:
 - FrontEnd
---

# ViewChild in Angular
> Use `Viewchild` in Angular to access a child Component, Director, or DOM Element 

### [Access `directive`](./Directives.md)
{% post_link Directives Directives %}
```typescript
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { SharkDirective } from './shark.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent implements AfterViewInit {
    extraCreature!: string;

    @ViewChild(SharkDirective)
    set appShark(directive: SharkDirective) {
        this.extraCreature = directive.creature;
    };

    ngAfterViewInit() {
        console.log(this.extraCreature); // Dolphin
    }
}
```

### Access DOM Element
```html
<input #someInput placeholder="Your favorite sea creature">
```
```typescript
// ...
@ViewChild('someInput') someInput!: ElementRef;
ngAfterViewInit() {
    this.someInput.nativeElement.value = 'Whale!';
}
// ...
```
### Access Child Component
子组件
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child Component</p>`
})
export class AppChildComponent {
  whoAmI() {
    return 'I am a pup component!';
  }
  private mySelf() {
    return 'I am a private method!,Other component can not access me';
  }
}
```
父组件中添加子组件(`AppChildComponent`)
```html
<app-child></app-child>
```
`ViewChild`访问子组件,并访问其非`private`方法
```typescript
// ...
@ViewChild(AppChildComponent) childComp!: AppChildComponent;
ngAfterViewInit() {
    console.log(this.childComp.whoAmI()); // I am a pup component!
}
// ...
```
