---
layout: post
title: Uniapp 菜单按钮权限
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp 菜单按钮权限

### 创建目录`/utils/directives`
> 该目录用于存放自定义指令

### 创建文件`/utils/directives/index.js`
```js
import auth from './auth'

export default {
  install (Vue) {
    Vue.directive('auth', auth)
  }
}
```

### 创建权限文件`/utils/directives/auth.js`
```js
// 使用方式
// 目录权限 `v-auth="'目录'"` 或者 `v-auth="['目录']"`
// 菜单权限 `v-auth="'目录:菜单'"` 或者 `v-auth="['目录', '菜单']"`
// 按钮权限 `v-auth="'目录:菜单:按钮'"` 或者 `v-auth="['目录', '菜单', '按钮']"`
const auth = {
	inserted(el, binding){
	  const { value } = binding;
		const permissions= uni.getStorageSync('authorityList');
		if(!value) { return }
		const typeValue = getValueType(value);
		const hasPermission = getPermission(permissions, typeValue, typeValue.length);
		if(!hasPermission) {
			el.parentNode && el.parentNode.removeChild(el)
		}
	}
}

// 查看当前权限设置的长度， 1:目录, 2:菜单, 3:按钮
const getValueType = (auth) => {
	if(typeof auth === 'string') {
		return auth.split(':') ;
	} else if (auth instanceof Array) {
		return auth
	}
}

const getPermission = (permissions, authArray, authArrayLength) => {
	const directoryAuth = permissions.some(permission => {
		return permission.type=== 'directory' && permission.name === authArray[0]
	})
	if(authArrayLength === 1) { return directoryAuth } 
	const menuAuth = directoryAuth && permissions.some(permission => {
		return permission.type=== 'menu' && permission.name === authArray[1]
	});
	if(authArrayLength === 2) { return menuAuth }
	const buttonAuth = menuAuth && permissions.some(permission => {
		return permission.type=== 'button' && permission.name === authArray[2]
	});;
	if(authArrayLength === 3) { return buttonAuth }
}

export default auth
```
