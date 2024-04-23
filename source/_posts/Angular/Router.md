---
layout: post
title: Angular Router
date: 2023-10-16 07:41:38
tags: ['Angular']
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
---

# router
1. Routes   // 路由文件配置类型
2. RouterOutlet    // 在html文件中的占位符
3. router    //  通过navigate() 和 navigateByUrl() 导航到一个指定的路由
4. routerLink  //  在html声明路由导航
5. activatedRoute   // 当前激活的路由对象，保存着当前路由的信息，如路由地址、路由参数等

```tsx
<a routerLink="/product/{{ hero.id }}" > Product </a>  
// ‘/’代表导航到根路由

<a [routerLink]="['../']" [queryParams]="{prop: 'xxx'}">Somewhere</a>
```

```tsx
import { Router } from '@angular/router';

class a {
  constructor( private router: Router){}

	toProduct(){
		this.router.navigate("['/product']")
	}
}
```

在路由时传递数据

1.  在查询参数中传递数据

```tsx
/product?id=1&name=2  => ActivatedRoute.queryParams[id]
```

1. 在路由路径中传递数据

```tsx
{path:'product', component: Product, data:[{isProd: true}]}

=> ActivatedRoute.data[0].isProd
```

app.route.ts 配置

```tsx
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// forRoot()会在应用的顶层配置这个路由器. forRoot() 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航.
// forChild() 嵌套路由配置
@ngModule {
	imports: [ 
		RouterModule.forRoot(routes) 
	],
}
```

路由重定向、通配符路由

重定向和通配符按顺序放在路由最后,因为路由按顺序执行

```tsx
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent },  
];
```

获取当前激活路由对象的信息，如路由地址、路由参数等

```tsx
this.route.snapshot.paramMap.get('id')
```
