---
layout: post
title: Angular Dynamic Component
tags: ['Angular']
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
categories:
 - FrontEnd
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
@Component({
    selector: 'phmi-vibration-indicator-comp',
    standalone: true,
    template: `<ng-template phmiVibrationIndicatorComp></ng-template>
`,
})
export class DynamicComponents implements OnInit {
    @ViewChild(DynamicChildLoaderDirective, { static: true })
    dynamicChild!: DynamicChildLoaderDirective;
        
    ngOnInit(): void {
      this.loadDynamicComponent();
    }
        
    private loadDynamicComponent() {
        const viewContainerRef = this.dynamicChild!.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(YourDynamicChildComponent);
    }
}


// YourDynamicChildComponent has registed in moudle
@NgModule({
  declarations: [MyExampleComponent, DynamicChildLoaderDirective],
  imports: [CommonModule, ComponentsModule],
})
```
