---
layout: post
title: Angular Dynamic Component
date: 2023-10-16 07:41:38
tags: ['Angular']
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
---

# Dynamic Component

1. Use Directive
```ts
// create directive
ng generate directive directives/DynamicChildLoader

// Content in DynamicChildLoader

import { Directive, ViewContainerRef } from '@angular/core';
    
@Directive({
  selector: '[dynamicChildLoader]',
})
export class DynamicChildLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
```

Usage in your ts file
```ts
@ViewChild(DynamicChildLoaderDirective, { static: true })
dynamicChild!: DynamicChildLoaderDirective;
    
ngOnInit(): void {
  this.loadDynamicComponent();
}
    
private loadDynamicComponent() {
  this.dynamicChild.viewContainerRef.createComponent(YourDynamicChildComponent);
}


// YourDynamicChildComponent has registed in moudle
@NgModule({
  declarations: [MyExampleComponent, DynamicChildLoaderDirective],
  imports: [CommonModule, ComponentsModule],
})
```
