---
layout: post
title: Run Vue3 Project
index_img: https://pic.rmb.bdstatic.com/bjh/46b2c52a986df78b3c2da0439ca0b3ce7349.png
categories:
 - FrontEnd
tags: ['Vue3']
---

# Vue3 project init
1. Ensure Node.js version >= 16.0;
2. Command-line `npm init vue@latest` to install vue.
 - [✔] add Typscript
 - [✔] add Vue Router 
 - [✔] add Pinia (state management)
 - [✔] add ESLint (code vertify) 
 - [✔] add Prettier (code formatting)
3. Add `scss`
```shell
npm add -D sass
```
4. Run Project
 ```shell
 cd [your-project-name]
 npm install
 npm run dev
 ```

## Analyze Dirctory File
1. `vite.config.js`
> Every time you run `npm run dev`, Vite will analyze this dirctory.
> You can config Package、Local service and more.

```js
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // Path alias(别名), Use @ replace ./scr
    }
  }
})
```

2. Other Dirctory
:file assets: static file, like images, css;
:file components: public components;
:file stores: Pinia state management;
:file router: Vue Router file;
:file views: vue pages;
:file public: file which will not be packaged, like icon;

## build project
```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 4173"
}
```
1. `npm run dev` | `npx vite`

> Run local service, and provide Hot Module Replacement (HMR热更新)

2. `npm run build` | `npx vite build`

> Build file to :file `dist`

3. `npm run preview` | `npx vite preview --port 4173`

> Run local service and preview the project in :file `dist`

### why to build
1. Syntax compilation(语法编译)
 - Trans `.vue` file to `js` and `css`
 - `ES6` to `ES5`
2. File compression(文件压缩)
 - Reduce HTTP Requests
3. Code compression
 - Remove space、annotate(注释),Change name of variable、function
4. Use the plugin only have used
 - Splice file from `node_moudle` to build file

## Options API vs Composition API

### Options API
> According to different characteristics, split to different option, like data, method, computed, life cycle

### Composition API
> With `<script set>`, you can write code like original javascript;
> According to 'function' to distinguish(区分) code area and It can improve readability;
> Use `reactive()` and `ref()` to add relative.

![distinguish](../_static/images/vue/optionApi.jpg "Options vs Composition")
