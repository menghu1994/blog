---
layout: post
title: Angular Dynamic Component
tags: ['Angular']
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
categories:
 - FrontEnd
---

# [Dynamic Component](https://angular.dev/guide/components/programmatic-rendering)

### 使用ComponentFactoryResolver动态加载组件(新版本已弃用)
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
@Component({
    selector: 'phmi-vibration-indicator-comp',
    standalone: true,
    template: `<ng-template phmiVibrationIndicatorComp></ng-template>
`,
})
export class DynamicComponents implements OnInit {
    @ViewChild(DynamicChildLoaderDirective, { static: true })
    dynamicChild!: DynamicChildLoaderDirective;

    constructor(
      private resolver: ComponentFactoryResolver,
    ) {}
        
    ngOnInit(): void {
      this.loadDynamicComponent();
    }
        
    private loadDynamicComponent() {
        const viewContainerRef = this.dynamicChild!.viewContainerRef;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(YourDynamicChildComponent);
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
        (viewContainerRef.instance as any).dyMsg = '向组件内传递数据 @Input';
    }
}


// YourDynamicChildComponent has registed in moudle
@NgModule({
  declarations: [MyExampleComponent, DynamicChildLoaderDirective],
  imports: [CommonModule, ComponentsModule],
})
```

### 使用NgComponentOutlet动态加载组件

```js
@Component({
  ...,
  template: `
    <ng-container *ngComponentOutlet="getBioComponent()" /> `
})
export class CustomDialog {
  bioType = 'aComponent';
  comps = {
    aComponent: ABio,
    bComponent: BBio,
    cComponent: CBio,
  }

  getBioComponent() {
    return this.comps[this.bioType];
  }
}
```