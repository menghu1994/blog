---
layout: post
title: Signal
date: 2024-04-16
index_img: https://pica.zhimg.com/v2-4981a827baa6cf4346ec5304ccbec502_720w.jpg?source=172ae18b
tags: ['Angular17']
---
## Signal new in angular

### Signal
#### 基础使用
```js
@Component({
	template: `
		<p>{{ counter() }}</p>
		<p>{{ pxCounter() }}</p>
	`
})
class AComponent {
	counter = signal(0);
	pxCounter = computed(() => this.counter() + 'px')
}
```
pxCounter会追踪counter的变化
#### 更新赋值
```js
@Component({
	template: `
		<p>{{ counter() }}</p>
		<p>{{ pxCounter() }}</p>
	`
})
class AComponent {
	counter = signal(0);
	pxCounter = computed(() => this.counter() + 'px')

	changeCount() {
		// 赋值
		this.counter.set(20)
	}
}
```

#### effect
```js
@Component()
export class CounterComponent {
  count = signal(0);

  constructor() {
  	// Tip: 我们不应该在effect中给signal赋值,会导致循环引用
    effect(() => {this.count.set(1);}, { allowSignalWrites: true});
  }
}
```
- 清空`signal`
```js
@Component()
export class CounterComponent {
  count = signal(0);

  constructor() {
    const effectRef = effect(() => {this.count.set(1);}, { manualCleanup: true});
    // signal会在组件卸载是自动清空, 如果需要手动清空可以调用此方法
    effectRef.destroy();
  }
}
```

### 在组件传值中使用signal
#### 在angular17中，使用`input`向子组件传值时会转换类型为`signal`
- 使用`@Input`向子组件传值
```js
@Component({
	template: `
		<p>{{ val }}</p>
	`
})
class AComponent {
	@input() val: string
}
```
- 使用input向子组件传值
```js
@Component({
	template: `
		<p>{{ val() }}</p>
	`
})
class AComponent {
	val = input<string>('')
}
```
使用`input`向子组件传值会自动转成`signal`, 所以`val`的类型不是`string`,而是`Signal<string>`

#### 使用 `effect()` 代替 `Onchanges()`
- 使用`@Input`时，我们使用Onchanges() 生命周期钩子去监听父组件传值的变化
```js
@Component({
	template: `
		<p>{{ val }}</p>
	`
})
class AComponent implements OnChanges{
	@input() val: string
	ngOnChanges(changes: SimpleChanges): void {
	  if(changes['val']){
	  	// dosomething..
	  }
	}
}
```
- 使用 `input`
```js
@Component({
	template: `
		<p>{{ val() }}</p>
	`
})
class AComponent {
	val = input<string>('')
	constructor() {
	  effect(() => {
	    console.log(`New value: ${this.value()}`);
	  });
	}
}
```

#### `input`的可选参数 `required, alias, transform`
- `required`
```js
@Component({
	template: `
		<p>{{ val() }}</p>
	`
})
class AComponent {
	val = input.required<string>()
}
```
使用`required`时也不需要设置默认值(因为必填所以会被替换)

- `alias`
```js
@Component({ 
	selector: 'a-comp',
	template: `
		<p>{{ val() }}</p>
	` 
})
class AComponent {
	val = input<string>('abc', { alias: 'val2'})
}

<!-- 父组件 -->
<a-comp [val2]="'test'"></a-comp>
```
使用`alias`时可以设置别名来替换父组件向子组件传递的property

- `transform`
```js
@Component({
	template: `
		<p>{{ val() }}</p>
	`
})
class AComponent {
	val = input<string>('abc', { 
		transform: (value: number) => value + 'px'
	})
}
```
使用`transform`时可以设置别名来替换父组件向子组件传递的property
