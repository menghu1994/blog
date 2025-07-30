---
layout: page
title: 精选网站
---
<div id="nav-container">
	<div class="nav-wrapper">
		<i class="before-icon iconfont icon-arrowleft" :class="{ 'disable-icon': navScroll.isLeft }" aria-hidden="true" @click="go(true)"></i>
		<i class="last-icon iconfont icon-arrowright" :class="{ 'disable-icon': navScroll.isRight }" aria-hidden="true" @click="go(false)"></i>
		<ul class="nav" ref="nav">
			<li v-for="(item,index) in webSites" :key="index" :class="{ active: activeCategory === item.category }" @click="setCategory(item, index)">${item.category}</li>
		</ul>
	</div>
	<ul class="content" v-if="navList.length">
		<li v-for="(item,index) in navList" :key="index">
			<div class="header">
			 <img v-if="item.icon" :src="item.icon" :alt="item.tag" loading="lazy" width="30" height="30">
			 <h4>${item.title}</h4>
			</div>
			<div class="desc" :title="item.desc">${item.desc}</div>
		</li>
	</ul>
	<div v-else>暂无收录内容</div>
</div>

<script type="module">

	const webSites = [
		{ category: '前端UI框架', children: [
			{tag: '框架',title: 'Angular', icon: '', url: 'https://angular.dev/', desc: ''},
			{tag: '框架',title: 'vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: '框架',title: 'React', icon: '', url: '', desc: ''},
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
		{ category: '图片音频处理', children: [
			{ title: 'TinyPNG', url: 'https://tinyjpg.com/', desc: '图片压缩',},
			{ title: 'iLoveImg', url: 'https://www.iloveimg.com/zh-cn', desc: '图片各种处理',},
			{ title: 'You Compress', url: 'https://www.youcompress.com/videos/', desc: '视频压缩',},
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
		{ category: '教学工具', children: [
				{ title: '图形方格纸', url: 'https://www.mygraphpaper.com/index.php?lang=zh-hans', desc: '在线方格纸输出pdf供打印使用',},
		]},
		{ category: '配色网站', children: [
				{ title: 'Color Space', url: 'https://mycolor.space/', desc: 'Never waste Hours on finding the perfect Color Palette again!',},
		]},
	]
	Vue.createApp({
	  setup() {
			const activeCategory = Vue.ref('');
			const navList = Vue.ref([])
			const navIndex = Vue.ref(0)
			const navScroll = Vue.ref({ isLeft: true, isRight: false})

			const navRef = Vue.useTemplateRef('nav')

			async function setCategory(web, index) {
		  		activeCategory.value = web.category;
					navList.value = web.children;
					navIndex.value = index;
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
				setTimeout(() => checkScrollPosition(), 300)
			}

			function checkScrollPosition() {
				// 获取滚动条位置和最大滚动距离
				const scrollLeft = navRef.value.scrollLeft;
				const maxScroll = navRef.value.scrollWidth - navRef.value.clientWidth;
				let isLeft = false;
				let isRight = false;
				
				// 检查是否在最左侧
				if (scrollLeft <= 0) {
					isLeft = true;
				} else {
					isLeft = false;
				}
				
				// 检查是否在最右侧（考虑浮点数误差）
				if (scrollLeft >= maxScroll - 1) { // 减去1是为了处理某些浏览器的浮点数精度问题
					isRight = true
				} else {
					isRight = false
				}
				navScroll.value = {
					isLeft, isRight
				}
			}

			Vue.nextTick(() => window.addEventListener('resize', () => scrollToCenter(navIndex.value)));

			function go(front) {
				const scrollLeft = navRef.value.scrollLeft;
				navRef.value.scrollTo({
					left: scrollLeft + (front ? -250 : 250),
					behavior: 'smooth'
				});
				setTimeout(() => checkScrollPosition(), 300)
			}

	    return {
				navList,
				webSites: webSites,
				activeCategory,
				setCategory,
				go,
				navScroll
	    }
	  },
		delimiters: ['${', '}']
	}).mount('#nav-container');
</script>

<style>
#nav-container {
	overflow-x: hidden;
	ul,li {
		margin: 0;
		padding:
		list-style: none;
		padding-inline-start: 0;
	}
	.nav-wrapper {
		position: relative;
		margin-bottom: 1.5rem;
		.before-icon {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			font-size: 1.5rem;
			color: #111827;
			cursor: pointer;
		}
		.last-icon {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			font-size: 1.5rem;
			color: #111827;
			cursor: pointer;
		}
		.disable-icon {
			cursor: default;
			color: #d1d5db;
		}
	}
	.nav {
		display: flex;
		gap: 1rem;
		flex-wrap: nowrap;
		overflow-x: auto;
		align-items: center;
		margin: 0 30px 1rem;
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
				font-size: 14px;
			}
			&:hover {
				background-color: #f3f4f6;
			}
		}
	}
}
</style>