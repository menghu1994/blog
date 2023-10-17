---
layout: post
title: 小程序
date: 2023-10-16 21:41:38
tags: 小程序
---



## globalData
```js
// app.js
App({
	globalData: {
		userInfo: {
			name: 'Luffy'
		}
	}
})

// abc.js
const app = getApp();
app.globalData.userInfo.name // Luffy
```

## Component
```js
Component({
	data: {},
	method: {
		onLoad: {},
		...
	}
})
```

## behaviors
> seems to mixin

```js
// my-behavior.js
module.exports = Behavior({
  data: {
    sharedText: 'abc'
  },
  methods: {
    sharedMethod: function() {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    }
  }
})

// page-a.js
const myBehavior = require('./my-behavior.js')
Page({
	behavior: [myBehavior],
	onLoad: function() {
	  this.data.sharedText === 'This is a piece of data shared between pages.'
	}
})
```
