---
layout: post
title: Class
tags: ['Javascript']
---

# class
> 类相当于对构造函数的封装

```javascript
class Person {
	constructor(name, age) {	
		this.name = name;		//this指向实例对象
		this.age = age;
	}
	eat() {						//相当于在构造函数的prototype中定义的方法

	}
}

typeof Person 		// function, 类的数据类型是函数
Person === Person.prototype.constructor   // true, 类本身指向构造函数
Person.hasOwnProperty('name') 			//	true, name定义在this上
Person.hasOwnProperty('eat') 			//	false, 方法定义在原型上

Object.assign(Person.prototype, {
	sleep() {},		//既然类中的方法是在原型上的, 所以可以通过为原型添加方法的方式为类添加新方法
	drink() {}
})			
```
#### Tips
 - 类内部的方法不可枚举(构造函数可以)
 - 必须使用new调用(构造函数可以直接调用)
 - 类不存在变量提升

## static 静态方法
> 类中的方法,都会被实例继承;但加上`static`关键字,该方法就只能通过类来调用
> 静态方法中的this指向类,而不是类的实例
```javascript
	class Foo {
	  static bar() {
	    this.baz();
	  }
	  static baz() {
	    console.log('hello');
	  }
	  baz() {						//静态和非静态方法可以重名
	    console.log('world');	
	  }
	}

	Foo.bar() // hello
```
> 静态方法可以被继承
```javascript
	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}

	class Bar extends Foo {
	}

	Bar.classMethod() // 'hello'
```

## # 私有属性、私有方法
> 私有属性只能在类的内部使用(this.#count)
```javascript
class Num {
	#count = 0;
	a(){
		console.log(#count in this);  //true, 判断是否存在私有属性#count
	}
}

let counter = new Num();
counter.#count 	// error
```

## new.target 返回当前的Class(也可用于构造函数)
> 当父类使用new.target, 子类继承父类的时候, new.target指向子类(此项特性可以写出不能独立使用, 必须继承之后才能使用的类)


## extends 继承
> 在子类的constructor中先调用super(),才能使用this
> super()内部的this指向的是子类的实例
```javascript
	class A {
	  constructor() {
	    console.log(new.target.name);
	  }
	}
	class B extends A {
	  constructor() {
	    super();		// super.call(this)
	  }
	}
	new A() // A
	new B() // B
```
> super作为对象时, 在普通方法中, 指向父类的原型对象
> super作为对象时, 在静态方法中, 指向父类

### Test Example
```javascript
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```
> 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

## public、 private、 protected
|  修饰符   |  当前类  |  同包  |  子类  |  其它包  |
|  ----     |   ----   |  ----  |  ----  |   ----   |
|  public   |    √     |    √   |   √    |    √     |
| protected |    √     |    √   |   √    |    ×     |
|  default  |    √     |    √   |   ×    |    ×     |
|  private  |    √     |    ×   |   ×    |    ×     |

 1. public, 公共的,被public修饰的类、方法、属性、可以跨类和跨包访问.
 2. protected, 受保护的,被protected修饰的类、方法、属性、只能被本类、本包、不同包的子类所访问.
 3. default, 默认的,在这种模式下,只能在同一个包内访问.
 4. private, 私有的,被private修饰的类、方法、属性、只能被本类的对象所访问.

> 当构造函数修饰为 private 时, 该类不允许被继承或者实例化
```ts
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal { }  // error
let a = new Animal("tom")  //error
```
> 当构造函数修饰为 protected 时, 该类只允许被继承
```ts
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal { }  

let a = new Animal("tom")  //error
```

### 参数属性
> 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值
```ts
class Animal {
	// public name: string;
	public constructor(public name){
		// this.name = name;
	}
}
```

## 抽象类
> abstract 用于定义抽象类和其中的抽象方法
> 抽象类不允许被实例化
> 抽象类中的抽象方法必须被子类实现









- [1] [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/class)
- [2] [Typescript入门教程](https://ts.xcatliu.com/advanced/class.html#typescript-%E4%B8%AD%E7%B1%BB%E7%9A%84%E7%94%A8%E6%B3%95)



