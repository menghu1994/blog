---
layout: page
title: 精选网站
---
<div id="nav-container">
	<ul class="nav" ref="nav">
		<li v-for="(item,index) in webSites" :key="index" :class="{ active: activeCategory === item.category }" @click="setCategory(item, index)">${item.category}</li>
	</ul>
	<ul class="content" v-if="navList.length">
		<li v-for="(item,index) in navList" :key="index">
			<div class="header">
			 <img v-if="item.icon" :src="item.icon" :alt="item.tag" loading="lazy" width="30" height="30">
			 <h4>${item.title}</h4>
			</div>
			<div class="desc">${item.desc}</div>
		</li>
	</ul>
	<div v-else>暂无收录内容</div>
</div>

<script type="module">

	const webSites = [
		{ category: '前端UI框架', children: [
			{tag: '框架',title: 'vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: '框架',title: 'vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: '框架',title: 'vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: '框架',title: 'vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: '框架',title: 'vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
		]},
		{ category: '笔记文档', children: [
    	{ tag: '框架',title: 'Notion', url: '', desc: 'Window mac手机秒同步,功能强大',},
    	{ tag: '框架',title: '腾讯文档', url: 'https://docs.qq.com', desc: '文档在线共享',},
		]},
		{ category: 'NAS', children: [
			{ title: 'Sonarr', url: '', desc: '自动追剧',},
			{ title: 'Jellyfin', url: '', desc: '媒体库管理',},
			{ title: 'Bazarr', url: '', desc: '字幕下载',},
			{ title: 'Jackett', url: '', desc: 'BT种子聚合',},
		]},
		{ category: 'UI设计', children: [
			  { title: 'Pinterest', url: 'https://www.pinterest.com/', desc: '关于图片的都可以在这里找到！',},
				{ title: 'Emoji', url: 'https://emojipedia.org/zh', desc: '复制粘贴就能用的图标！',},
				{ title: 'Behance', url: 'https://www.behance.com', desc: '',},
				{ title: 'Dribble', url: 'https://www.dribble.com', desc: '',},
				{ title: '365PSD', url: 'https://www.freeimages.com/cn/psd?ref=365psd', desc: '免费psd素材'}
		]},
		{ category: '3D设计', children: [
				{ title: 'Zbrush Central', url: 'https://www.zbrushcentral.com/', desc: 'Zbrush 雕刻论坛',},
				{ title: 'ArtStation', url: 'http://artstation.com/', desc: 'A站',},
		]},
		{ category: '视频网站', children: [
				{ title: 'bilibili', url: 'https://bilibili.com', desc: '',},
				{ title: '低端影视', url: '', desc: '',},
		]},
		{ category: 'Windows实用工具', children: [
				{ title: 'Listary', url: '', desc: '快捷检索,推荐💚',},
				{ title: 'SETUNA2', url: '', desc: '小巧截图置顶工具,推荐💚',},
				{ title: 'Sublime Text', url: '', desc: '文本编辑器,替代本地记事本,推荐💚',},
		]},
		{ category: 'Chrome实用插件', children: [
				{ title: 'Tampermonkey', url: '', desc: '',},
				{ title: 'AdBlock', url: '', desc: '广告屏蔽',},
				{ title: '猫抓', url: '', desc: '网页视频下载',},
		]},
		{ category: '壁纸', children: []},
		{ category: '图书馆', children: [
				{ title: 'ZLibary', url: 'https://z-lib.id/', desc: '图书下载,知识是无价的!',},
		]},
	]
	Vue.createApp({
	  setup() {
			const activeCategory = Vue.ref('');
			const navList = Vue.ref([])

			const navRef = Vue.useTemplateRef('nav')

			async function setCategory(web, index) {
		  		activeCategory.value = web.category;
					navList.value = web.children;
					scrollToCenter(index)
		  		await Vue.nextTick();
		  }

			Vue.onMounted(() => {
				setCategory(webSites[0], 0);
			})

			function scrollToCenter(index) {
				const element = navRef.value.children[index];
				const containerWidth = navRef.value.offsetWidth;
				const elementLeft = element.offsetLeft;
				const elementWidth = element.offsetWidth;
				
				const scrollTo = elementLeft - (containerWidth / 2) + (elementWidth / 2);
				
				navRef.value.scrollTo({
					left: scrollTo,
					behavior: 'smooth'
				});
			}

	    return {
				navList,
				webSites: webSites,
				activeCategory,
				setCategory
	    }
	  },
		delimiters: ['${', '}']
	}).mount('#nav-container');
</script>

<style>
#nav-container {
	ul,li {
		margin: 0;
		padding:
		list-style: none;
		padding-inline-start: 0;
	}
	.nav {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		flex-wrap: nowrap;
		overflow-x: auto;
		-ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox, Safari 18.2+, Chromium 121+ */
		&::-webkit-scrollbar { 
				display: none;  /* Older Safari and Chromium */
		}
		li {
			padding: 0.5rem 1rem;
			color: #111827;
			border-radius: 0.5rem;
			cursor: pointer;
			min-width: fit-content;
			&:hover {
				color: #2563eb;
			}
		}
		.active {
			color: #2563eb;
			background-color: #eaf2ff;
		}
	} 
	.content {
		display: grid;
		grid-template-columns: repeat(3, minmax(200px, 1fr));
		gap: 1.5rem;
		li {
			padding: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			border: 1px solid #e5e7eb;
			border-radius: 0.5rem;
			box-shadow: 0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a;
			background: #fff;
			cursor: pointer;
			.header {
				display: flex;
				align-items: center;
				gap: 1rem;
				color: #111827;
			}
			.desc {
				color: #00000080;
			}
			&:hover {
				background-color: #f3f4f6;
			}
		}
	}
}
</style>