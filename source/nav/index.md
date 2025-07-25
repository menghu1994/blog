---
layout: page
title: 精选网站
---

<div id="front-end-nav">{{ message }}</div>
<script async defer>
	function bootstrap() {
		const { createApp, ref } = window.Vue
		createApp({
			setup() {
				const message = ref('Hello vue!')
				return {
					message
				}
			}
		}).mount('#front-end-nav')
	}
	bootstrap()
</script>