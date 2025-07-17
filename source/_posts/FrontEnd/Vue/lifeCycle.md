---
title: Vue 生命周期
index_txt: Vue
categories:
 - FrontEnd
tags: ['Vue3']
---

# [Vue 生命周期](https://cn.vuejs.org/guide/essentials/lifecycle.html)
### 常用生命周期(按顺序)
```typescript
<script setup>
import { onBeforeMount, onMounted,onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// DOM 尚未被渲染，但响应式数据已准备好
onBeforeMount(() => {
	// 修改组件初始渲染状态
	// 执行需要在渲染前完成的配置
})

// 在组件完成初始渲染并创建 DOM 节点
onMounted(() => {
  // 访问/操作DOM
	// 发起网络请求
})

// DOM重新渲染前
onBeforeUpdate(() => {

})

// DOM重新渲染后
onUpdated(() => {})

// 组件被销毁前
onBeforeUnmount(() => {})

// 组件被销毁后
onUnmounted(() => {})
</script>
```

### 其他生命周期
```typescript
<script setup>
import { onErrorCaptured, onRenderTracked, onRenderTriggered, onActivated, onDeactivated, onServerPrefetch } from 'vue'

onErrorCaptured(() => {})

onRenderTracked(() => {})

onRenderTriggered(() => {})

onActivated(() => {})

onDeactivated(() => {})

// 仅服务器端渲染可用
onServerPrefetch(() => {})
</script>
```