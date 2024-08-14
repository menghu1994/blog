---
layout: post
title: ViewChild in Angular
date: 2024-08-14
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
tags: ['Angular']
---

# ViewChild in Angular
> Use `Viewchild` in Angular to access a child Component, Director, or DOM Element 

### [Access `directive`](./Directives.md)
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
