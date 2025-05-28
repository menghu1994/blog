---
layout: post
title: Angular Component
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular']
categories:
 - FrontEnd
---

## 快速生成组件
`ng g c <组件名>`

## 组件
> 组件由html，css, spec, ts文件组成。
```ts
@Component({
   selector:'app-a-component',  //选择器,标识组件, 前缀`app`可在angular.json中修改
	standalone: true, // angular17版本后推荐，standalone属性默认为true，表示组件可以单独使用，不依赖于父组件。
   templateUrl:'', //html模板相对路径，如： './a.component.html', 和template二选一
	template: ``, //行内html模板, 如： `<div>hello World</div>` 和templateUrl二选一
   styleUrls:[] //样式相对url地址 如'./a.component.scss'
})
class AComponent {}
```

<!-- 在其他组件中引用AComponent -->
```ts
@Component({
   selector:'app-b-component',
	standalone: true,
   imports: [AComponent], // 导入本组件所使用的模块
	template: `<app-a-component></app-a-component>`,
   styleUrls:[] 
})
class BComponent {}
```




### 插槽
组件 `selector: 'custom-item'`
```html
<div>
    <ng-content select="card-title"></ng-content>
    <ng-content select="card-body"></ng-content>
</div>
```

组件使用1
```html
<custom-item>
    <card-title>插槽title</card-title>
    <card-body>插槽body</card-body>
</custom-item>
```

组件使用2
> `ngProjectAs` 挂在内容到任意html标签
```html
<custom-item>
    <h2 ngProjectAs="card-title">插槽title</h2>
    <card-body>插槽body</card-body>
</custom-item>
```


## ng-content && ngProjectAs
Component template
```html
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content></ng-content>
</div>
```
Using the component1
```html
<custom-card>
  <card-title>Hello</card-title>
  <p>Welcome to the example</p>
</custom-card>
```
Using the component2
```html
<custom-card>
  <h3 ngProjectAs="card-title">Hello</h3>
  <p>Welcome to the example</p>
</custom-card>
```