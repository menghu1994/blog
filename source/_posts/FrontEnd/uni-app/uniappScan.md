---
layout: post
title: uniapp 手机摄像头扫码封装
tags: ['Uniapp']
categories:
 - FrontEnd
---

## uniapp 手机摄像头扫码封装

1. 创建文件权限文件及内容 [`/js_sdk/permission.js`](/blog/FrontEnd/FrontEnd/uni-app/uniappPermission/)⬅点击跳转

2. 创建文件目录 `/utils/scan.js`
> features: 封装手机扫码

```js
import permision from "@/js_sdk/permission.js"

// 封装扫描方法
var scanFunc={
    async myRequestAndroidPermission(permisionID) {
    	var result = await permision.requestAndroidPermission(permisionID);
			return new Promise((resolve, reject) => {
				if (result == 1) {
					resolve('success');
				} else if (result == 0) {
					reject('fail');
				} 			
			})	
    },
    //跳转到手机开启权限的界面
    permissionSetting() {
    	permision.gotoAppPermissionSetting();
    },
    gotoAndroidPermissionSetting: function() {
    	var main = plus.android.runtimeMainActivity();
    	var Intent = plus.android.importClass('android.content.Intent');
    	var Settings = plus.android.importClass('android.provider.Settings');
    	var intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
    	main.startActivity(intent);
    }
}
export default scanFunc;
```

3. 创建文件目录 `/utils/tool.js`
> features: 封装工具方法,也可和`scan.js`合并成一个文件

```js
import scanFunc from '@/utils/scan.js'

const scan = () => {
	return new Promise((resolve, reject) => {
		scanFunc.myRequestAndroidPermission("android.permission.CAMERA").then(
				() => {
					uni.scanCode({
						onlyFromCamera: true,
						success: (res) => {
							resolve(res.result);
						},
					});
				},
				() => {
					uni.showModal({
						content: "扫描需要获得您的相机权限",
						success: (res) => {
							if (res.confirm) {
								this.permissionSetting();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			);
	})
}

export default {
	scan
}
```

4. 在`main.js`中全局引用
> features: 设置全局方法
 
```js
import Vue from 'vue'
import tool from '@/utils/tool'

Vue.prototype.$scan = tool.scan
```

5. 具体使用方法
> features: 在具体vue页面中使用扫码方法

```js
export default {
	methods: {
		scanFun() {
			this.$scan().then(result => {
				console.log(result, '扫码的结果')
			})
		}
	}
}
```