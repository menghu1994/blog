---
layout: post
title: input输入数字验证
tags: ['Gist']
---

```html
<input type="text" (input)="validateNumber($event)">          
```

## 小数验证

```js
  validateDecimal(event: any): void {
    let value = event.target.value;
    // 1. 移除非数字字符（但允许一个小数点）
    value = value.replace(/[^0-9.]/g, '');

    // 2. 确保只有一个小数点（移除多余的小数点）
    const decimalParts = value.split('.');
    if (decimalParts.length > 2) {
      value = decimalParts[0] + '.' + decimalParts.slice(1).join('');
    }

    // 3. 移除前导零（但允许 "0.x" 的情况）
    if (value.startsWith('0') && value.length > 1 && !value.startsWith('0.')) {
      value = value.replace(/^0+/, '');
    }

    // 4. 如果输入是 ".", 自动补全为 "0."
    if (value === '.') {
      value = '0.';
    }

    // 5. 更新输入框的值
    event.target.value = value;
  }
```

## 正整数验证

```js  
validateNumber(event: any): void {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+(?=\d)/, '');
    if (value === '') {
      event.target.value = '';
    } else {
      event.target.value = value;
    }
  }
```
