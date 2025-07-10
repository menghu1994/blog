---
layout: post
title: Uniapp 网络请求封装
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp 网络请求封装

`request.js`
```js

export default {
	config: {
		baseUrl: '',
		header: {
			"Content-Type": "application/json"
		},
		// h5 跨域请求时是否携带凭证（cookies）
		withCredentials: true,
		// 可在headers中编辑cookie
		enableCookie: true,
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	// 请求拦截器
	interceptor: {
		request: null,
		response: null
	},
	request(options = {}) {
		// 获取登录后存储在本地的token信息
		const token = uni.getStorageSync('token')
		
		// const requestType = options.url.split('/');
		// let typeVal = requestType[requestType.length - 1]

		if(token) {
			this.config.header.Authorization = token
		}

		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		
		
		// 基于 Promise 的网络请求
		return new Promise((resolve, reject) => {
			uni.showLoading()
			let _config = null
			options.complete = (response) => {
				uni.hideLoading()
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				

				//  路由拦截
				if(response.errMsg && response.errMsg.split(' ')[0] === "request:fail"){
					tool.msg('网络连接失败');
					return
				}

				
				// if(response.errMsg === "request:fail timeout"){
				// 	tool.msg('网络连接超时');
				// 	return
				// }

				if(response.statusCode === 401){
					if(typeVal === "login"){
						tool.msg('账号或密码错误');
						return
					}else {
						tool.msg('登录已过期,请重新登录');
						setTimeout( () => {
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},1e3)
					}
				}

				if(response.statusCode>=400){
					reject(response)
				}else{
					resolve(response)
				}

			}
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			uni.request(_config);
		});
	},
	// get请求
	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	// post请求
	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	// put请求
	put(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	// delete请求
	delete(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
```

### 使用`request.js`
`login.js`
```js
import api from '../request.js'

const login = {
	loginUser: (data) => {
		return api.request({
			url: '网络请求地址',
			method: 'POST',
			data
		})
	},
	account: () => {
		return api.request({
			url: "请求地址",
			method: 'GET'
		})
	}
}

export default login
```

### 使用`login.js`
```js
import login from '@/api/service/login.js'

login.loginUser({username: ''}).then(res => {
	// 处理服务器返回的数据
	console.error(res)
})
```
