---
layout: post
title: Uview in uniapp
tags: uniapp
---

# uni-app

> 个人理解uniapp是使用vue的语法，和微信小程序的组件、api的一个开发框架。
> 虽然可以多端编译,但安卓、ios、支付宝小程序等都有特性,需要分别写一些代码进行平台判断,具体的问题需要测试遇到再看...

# uView 1.x

## form 表单验证

[表单验证](https://www.uviewui.com/components/form.html)

```ts
<u-form :model="formName" ref="uForm">
 <u-form-item label="批次码/产品码" prop="objectName" 
 	ref="objectName" label-position="left" :label-width="194">
  <u-input :clearable="false" height="40" v-model="inventoryForm.objectName" 
	@blur="matchObjectName" :focus="true" maxlength=300 />
  <u-icon class="scan-icon" name="scan" size="48" @click="onScanObjectName"></u-icon>
 </u-form-item>
</u-form>

rules: {
 objectName: [{
  required: true,
  message: '请输入产品码/批次码',
  trigger: ['blur','change'],
 }],
 locationNumber: [{
  required: true,
  message: '请输入货位',
  trigger: ['change', 'blur'],
 }],
 stockQuantity: [{
  pattern: /^([1-9]([0-9]+)?)$/g,
  message: '请输入正整数',
  trigger: ['change','blur']
 },{
  required: true,
  message: '请输入数量',
  trigger: 'blur'
 }],
},

onReady() {
 this.$refs.uForm.setRules(this.rules);
},

```

动态设置页面标题
```js
   uni.setNavigationBarTitle({
       title: '标题'
   });
```

返回首页 
```js
 

  onNavigationBarButtonTap: function(e) {
      uni.switchTab({
          url: '../../../pages/home/home'
      })
  }
```

### Tips

- 在onReady中给添加验证规则
- 赋值之后单独验证（赋值必须为字符串格式） 需要在form-item中添加ref,并使用this.$refs['这里是ref名称'].onFieldChange() 单独验证,需单独验证的字段的验证规则的trigger必须添加'change'
- 重置验证内容，resetFields
