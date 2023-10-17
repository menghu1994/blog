---
layout: post
title: Typescript
tags: ts
---

# [Typescript](https://ts.xcatliu.com/basics)

## 数组

```ts
let arr: number[] = [1,2,2,1];  // 定义元素都是number的数组类型

let arr: Array<number> = [1,2,3]; //数组泛型
```

> 类数组不是数组类型

```ts
function sum() {
    let args: number[] = arguments;  // error
}
```

> 常用类数组有自己的接口定义,`IArgument`,`NodeList`,`HTMLCollection`

```ts
interface IArguments {    // ts已经定义好
    [index: number]: any;
    length: number;
    callee: Function;
}

function sum() {
    let args: IArguments = arguments;
}
```

> 函数参数添加默认值,在ts中会将此参数识别为可选参数

```ts
function fullName(firstName: string, lastName: string = 'li'){  //lastName为被识别为可选参数,且不受到可选参数必须在必需参数后的限制
 return firstName + lastName
}
```

> 可选类型

```ts
interface ArrNumber {
    [index: number]: number
}

const arr: ArrNumber = [1,2,3];
```

## 函数

> 函数重载，函数重载是函数名相同，但是传入参数不同，(js中函数重复名，会被替代)

```typescript
function fn(param: number): void {}
function fn (param: string, param2: number): void {}
```

## 联合类型

```typescript
interface People {
    name: string,
    age: number
}

interface Man {
    sex: string
}

const XIAOMING = (man: People & Man): void {} // name,age,sex


interface Woman extends People {
    sex: string
}

const XIAOHONG = (woman: Woman): void {} // name,age,sex


class Stu implements People, Man{
    constructor(protected name: string,protected age: number, protected sex: string) {}
}
```

## 类型断言

```typescript
interface People {
    name: string,
    age: number
}

interface Man {
    sex: string
}

const XIAOMING = (man: People | Man): void {
    console.log( (man as People).name );
    console.log( (<People>man).name)  // 两种断言方法相等
}
```

## 内置类型

> [更多类型](https://github.com/microsoft/TypeScript/tree/main/src/lib)

```typescript
const liList: NodeList = document.querySelectorAll('#list li');
const body: HTMLElement = document.body;
const div: HTMLDivElement = document.querySelector('div');
document.addEventListener( 'click', (e: MouseEvent) => {})
```

## class

```TypeScript
class Person {
    private name: string;  // 只能在class内部访问
    protected age: number;  // 可以在内部和继承类中访问
    static sex: string;   // 只能用类名··访问
    constructor(name: string,age: number){
        this.name = name;
        this.age = age;
    }

    say(){
        console.log(Person.sex)
    }

    static walk() {
        this.run()  // 静态之间可以互相访问
    }

    static  run() {}
}

new Person('XIAOMING',10).name  // error
new Person('XIAOHONG',12).age   // error 

class Man extends Person{
    constructor(){
        super();
        this.name //false
        this.age // true
    }
}
```

## 实战

[type-challenges](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)

## 参考

[Typescript](https://wangtunan.github.io/blog/typescript/base.html#%E7%9B%AE%E5%BD%95)
