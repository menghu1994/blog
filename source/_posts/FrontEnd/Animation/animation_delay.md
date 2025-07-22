
---
layout: post
title: Animation Delay
index_txt: Animation
tags: ['CSS']
---

## 动画延迟播放
```ts
style="animation-delay: {{(index+1)*0.6*animationTime}}s;

<!-- matSelect can not close -->
  @ViewChild(MatSelect) matSelect: MatSelect;

  ngAfterViewInit() {
    this.matSelect.openedChange.subscribe(opened => {
      if (opened) {
        this.matSelect.panel.nativeElement.addEventListener('mouseleave', () => {
          this.matSelect.close();
        })
      }
    })
  }

```


```ts
 quickSort(arr){
   if (arr.length <= 1) { return arr;}
   const temp = arr.splice(0,1);
   const left = [];
   const right = [];
   for (let i=0;i<arr.length;i++) {
     if (arr[i] < temp) {
       left.push(arr[i])
     } else  {
       right.push(arr[i])
     }
   }
   return  this.quickSort(left).concat(temp,this.quickSort(right))
 }

 sortArray(nums: number[]): number[] {
   if(!nums || nums.length === 0) {return []}
   this.quick_sort(nums,0,nums.length - 1)
   return nums
 };

 quick_sort(arr: Array<number>,l: number,r: number): void{
   if(l >= r) {return}
   let i = l - 1,j = r + 1;
   const pivot = arr[(l + r) >> 1];
   while(i < j){
     do i++;
     while(arr[i] < pivot);
     do j--;
     while(arr[j] > pivot);
     if(i < j) [arr[i],arr[j]] = [arr[j],arr[i]]
   }
   this.quick_sort(arr,l,j);
   this.quick_sort(arr,j + 1,r)
 }
```


### 浮雕阴影
```css
  div {
      transition: .2s all;
      box-shadow:
          7px 7px 12px rgba(0, 0, 0, .4),
          -7px -7px 12px rgba(255, 255, 255, .9),
          inset 0 0 0 rgba(255, 255, 255, .9),
          inset 0 0 0 rgba(0, 0, 0, .4);
      
      &:active {
          box-shadow:
              0 0 0 rgba(0, 0, 0, .4),
              0 0 0 rgba(255, 255, 255, .9),
              inset -7px -7px 12px rgba(255, 255, 255, .9),
              inset 7px 7px 12px rgba(0, 0, 0, .4);
      }
  }
```

```typescript
  convertPositive(event, value): void {
    event.target.value = event.target.value.replace(/[^\d.]/g,'');
    this.attributeForm.get(value).setValue(event.target.value, {emitEvent:false})
  }


  (input)="convertPositive($event, 'weight')"
```

```ts
function calcTargetQuantity(arr1, arr2): any[] {
  for(let i = 0;i< arr1.length; i++ ) {
    for(let j = 0; j< arr2.length; j++) {

    }
  }
}
```

0.1 0.6 0.8  0.1,0.7,1.5


```ts
from [{a: 1, ole: 10},{a: 2, ole: 30},{a: 2, ole: 40}]

to [1*10/100, 1*10/100 + 2*30/100]

function accuTarget(arr) {
  return arr.reduce((acc, cur, index) => {
    if (index>0) {
      acc.push(cur.a*cur.ole/100 + acc[index-1])
    } else {
      acc.push(cur.a*cur.ole/100)
    }
    return acc
  }, [])
}

function accuTarget2(arr){
  const newArr = [];
  arr.reduce((acc, cur) => {
    const calc = cur.a*cur.ole/100 + acc;
    newArr.push(calc);
    return calc
  }, 0);
  return newArr
}

```

```ts
function sumTo(n: number): number {
  if(n === 1) return 1;
  return n + sumTo(n-1)
}

function sumTo(n: number): number {
  if(n === 1) return 1;
  let sum = 0
  for(let i=1;i<=n;i++) {
    sum += i
  }
  return sum
}


function sumTo(n: number): number {
  if(n === 1) return 1;
  return (1 + n)*n / 2
}

function factorial(n: number): number {
  if(n === 1) return 1;
  return n * factorial(n-1)
}

function fib(n: number): number {
  // if(n === 1) return 1
  // if(n === 2) return 1;
  // return fib(n) + fib(n-1)
  return n > 2 ? fib(n) + fib(n-1) : 1
}
```