---
layout: post
title: Angular Form
tags: ['Angular']
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
categories:
 - FrontEnd
---


# Form
FormControl  追踪单个表单控件的值和验证状态
FormGroup	
FormArray
ControlValueAccessor

## 响应式表单


## 模板驱动表单
 


# setValue vs patchValue[<sup>1</sup>(#refer-anchor-1)]
> setValue must set the value of all the controls
```ts
formgroup.setValue({name:'xiaoming', age:'20'});
```
> patchValue can only assign one of controls
```ts
formgroup.setValue({name:'xiaoming'});
```

## Dynamic change validator need to update handly
```ts
	// reset
    Object.keys(this.basicForm.controls).forEach(key => {
      this.basicForm.get(key)!.setValidators(null);
      this.basicForm.get(key)!.enable();
    });
    this.basicForm.get('a')!.patchValue(1);
    this.basicForm.get('b')!.setValidators(Validators.required);
    Object.keys(this.basicForm.controls).forEach(key => {
      this.basicForm.get(key)!.updateValueAndValidity({ onlySelf: false });
    });
```

## Active trigger verification


## 查看是否验证失败
```ts
   Object.keys(this.editForm.controls).forEach(controlName => {
      const control = this.editForm.controls[controlName];
      if (!control.valid) {
        console.log(`Control '${controlName}' is invalid.`);
      }
    });
```


## Reference
<div id="refer-anchor-1"></div>
- [1] [Setvalue vs Patchvalue Angular](https://sami-chkhachkhi.medium.com/setvalue-vs-patchvalue-angular-a64a55e912b8)
