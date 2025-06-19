---
layout: post
title: gsap
index_img: https://img-blog.csdnimg.cn/img_convert/88b44779a5d414e97d2db98e54d83c1e.png
tags: ['Animation']
---

## SplitText Plugin
> SplitText Plugin 是 GSAP 提供的一个插件，可以将一个文本元素分割成多个子元素，并对子元素进行动画处理。

### 注册
```js
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
```

### 使用
```js
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

@Component({
	template: `
		<h1 id="heading">
			<div>Hello</div>
			<div>World</div>
		</h1>
	`
})
export class DemoComponent implements AfterViewInit {
	ngAfterViewInit() {
		let split = SplitText.create("#heading", { type: "chars", onSplit: (self) => {
			return gsap.from(self.chars, { y: 20, autoAlpha: 0, stagger: 0.2})
		} });

		gsap.from(split.chars, {
			y: 20, autoAlpha: 0, stagger: 0.2
		})
	}
}
```
1. `SplitText`将id为`heading`的元素分割成多个子元素,
2. 类型有三种'chars', 'lines', 'words', 可多选{ type: 'lines, words'}
   - `chars`会将元素划分为单独的`字符`，可添加额外属性`charsClass`来指定字符的样式，如`<div>H</div><div>e</div><div>l</div><div>l</div><div>o</div><div>W</div><div>o</div><div>r</div><div>l</div><div>d</div>`,
   - `lines`会将元素划分为单独的`行`，可添加额外属性`linesClass`来指定行的样式， `linesClass: line++`，如`<div class="line1">Hello</div><div class="line2">World</div>`,
   - `words`会将元素划分为单独的`词组`， 如果是`<div>Hello World</div>`，则会分割为`<div>Hello</div><div>World</div>`
3. `deepSlice: bollean`;细分 默认true
4. `ingnore: bollean`;忽略的元素
5. `mask： 'chars' | 'lines' | 'words'`;添加额外包裹元素
6. `onSplit` 方法与`gsap.from(split.chars...` 所做功能相同