---
title: Public Method in Vue3
tags: ['Vue3']
---

1. `app.config.globalProperties` Global Property

```js
// main.js Regist
import { createApp } from 'vue'
import axios from 'axios'
 
 
const app = createApp({
  created() {
    console.log(this.$axios)
  }
})
app.config.globalProperties.$axios = axios
app.mount('#root')

// App.vue Usage
<script setup>
import {getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance(); //获取公用方法proxy.$axios
const {$axios}=proxy
console.log($axios)
</script>
```

2. `mixin`
```js
import { createApp} from 'vue'
import axios from 'axios'
 
const app = createApp({
  created() {
    console.log(this.$axios)
  }
})
app.mixin({
  methods: {
    $axios: axios
  }
})
app.mount('#root')
```

3. `provide, inject`
```js
import { createApp } from 'vue'
import axios from 'axios'
 
 
const app = createApp({
  inject: ['$axios'],
  created() {
    console.log(this.$axios)
  }
})
app.provide('$axios', axios)
app.mount('#root')
```