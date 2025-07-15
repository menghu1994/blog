---
title: Pinia in Vue3
index_img: https://pic.rmb.bdstatic.com/bjh/46b2c52a986df78b3c2da0439ca0b3ce7349.png
categories:
 - FrontEnd
tags: ['Vue3']
---

# [Pinia](https://pinia.vuejs.org/zh)
> State management
> `state` | `getter` | `action`

## Basic Create and Usage
1. 
```js
import { defineStore } from 'pinia'

export const useAbcStore = defineStore('abc', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```
2. 
```js
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useAbcStore = defineStore('abc', {
	const count = ref(0);
	const double = computed(() => {
		return count*2
	});
	function increment() {
		count.value ++
	};
	return {
		count,double,increment
	}
})
```
Usage
```js
<script setup>
import { useAbcStore } from '@/stores/abc'

const count = useAbcStore()
</script>
```

## `state` seems to data
## `getter` seems to computed
## `action` seems to methods

