---
title: Vue-Router
tags: ['Vue3']
---

# Vue-Router in Vue3

## install
```shell
npm install vue-router@4.0.0-beta.13
```

## Usage
```js
// route/index.js
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: () => import("../home")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../login")
  }
]

export const router = createRouter({
  // hash 模式
  history: createWebHashHistory(),
  routes: routes
})

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route'

const app = createApp(App)
app.use(router)
app.mount('#app')

// pageA.vue
import { useRouter } from 'vue-router'

const router = useRouter();
router.push('/login')
```