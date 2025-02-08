---
layout: post
title: 原生模板与插槽
date: 2025-02-02
tags: ['Javascript']
---

# Template & slot
> 原生组件模板和插槽


## Template
demo
```html

<template id="demo">
	<p>测试</p>
	<!-- 插槽 -->
	<slot name="default">默认文本</slot>
	<slot >文本</slot>
	<style type="text/css">
		p { color: red }
	</style>
</template>

<my-demo>
	<div slot="default">文本2</div>
</my-demo>
<my-demo>
	<div slot="default">文本3</div>
	<div >文本4</div>
</my-demo>
```
```js
customElements.define(
	'my-demo', 
	class extends HTMLElement {
		constructor() {
			super()
			const tempContent = document.getElementById("demo").content;

			const shadowRoot = this.attachShadow({ mode: 'open' });
			shadowRoot.appendChild(tempContent.cloneNode(true))
		}
	}
)
```
