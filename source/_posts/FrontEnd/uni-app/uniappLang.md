---
layout: post
title: uniapp 多语言
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
tags: ['Uniapp']
categories:
 - FrontEnd
---

## uni-app 多语言

在根目录创建对应的文件:(`vue-i18n.min.js`可自行搜索下载到本地)
`api/locales/zh.js`,
`api/locales/en.js`,
`api/vue-i18n.min.js`

```js
// main.js

// 根Vue页
import App from './App'
import Vue from 'vue'
// i18n部分的配置
import Chinese from '@/api/locales/zh.js';
import English from '@/api/locales/en.js';

// VueI18n
import VueI18n from './api/vue-i18n.min.js';

Vue.use(VueI18n);

const i18n = new VueI18n({
   // 默认语言
   locale: 'zh',
   // 引入语言文件
   messages: {
      'zh': Chinese,
      'en': English,
   }
});

const app = new Vue({
   ...App,
   i18n,
})
app.$mount()
```
### 用法
```js
// zh.js
export default {
    "error": {
        "title": "报错信息"
    }
}
```
```vue
 <view>{{ $t('error.title') }}</view>
<!-- <view>报错信息</view> -->
```
