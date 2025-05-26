---
layout: post
title: 输入框数字验证
tags: ['Gist']
---

输入框只能输入数字类型
```html
<input @input="validateNumber($event)">
```

```js
@Params {
	event: 输入框内容
	v: 1 只有一个小数点
	maxValue: 限制输入数字最大值
	obj, propertyName 自定将obj[propertyName]替换为输入的内容
}
validateNumber(event: any,v: number, maxValue?: number, obj?: any, propertyName?: string) {
    let value = event.target.value;
    value = value.replace(/^\s+|\s+$/g, ''); // 移除前后空白
    // 允许数字和一个小数点
    if(v === 1) {
      value = value.replace(/[^0-9.]/g, '');
    } else {
      value = value.replace(/[^0-9]/g, '');
    }
    // 确保只有一个小数点
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    // 移除前导零，但允许单个前导零的情况（例如0.5）
    if (value.indexOf('.') === -1) {
      value = value.replace(/^0+(?=\d)/, '');
    } else {
      value = value.replace(/^0+(?=\d)/, '0');
    }
    // 最大值校验
    if (maxValue !== undefined && value !== '' && parseFloat(value) > Number(maxValue)) {
      value = Number(maxValue);
    }

    event.target.value = value;
    // 更新动态获取的对象的属性
    if (obj && propertyName) {
      obj[propertyName] = value;
    }
  }
```