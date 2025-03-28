---
layout: post
title: bpmn.js
tags: Library
---
### Get Property
```js
element.businessObject
```

### Update Property
```js
const modeling = bpmnJS.get('modeling');

modeling.updateProperties(sequenceFlowElement, {
  conditionExpression: newCondition
});
```

### Update Color
```js
const modeling = bpmnJS.get('modeling');
modeling.setColor(sequenceFlowElement, {
  fill: '#ccc', // 填充色
  stroke: null。// 边框色和label色
})
```
