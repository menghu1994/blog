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
	<div class="nav-slider"></div>
	<div class="tag-container">
	  <div v-for="(tagValue, tagKey) in tagMenu" :key="tagKey">
			<div class="tag-header" @click="extendTag(tagKey)">
				<i class="iconfont icon-arrowdown" aria-hidden="true" :class="{ 'rotate-icon': !tagExpand.get(tagKey) }"></i>
				<span>${tagKey}</span>
			</div>
			<ul class="content" v-if="tagValue.length" v-show="tagExpand.get(tagKey)">
				<li v-for="(item,index) in tagValue" :key="index">
					<a :href="item.url" target="_blank" rel="noopener noreferrer">
						<div class="header">
						<img v-if="item.icon" :src="item.icon" :alt="item.tag" loading="lazy" width="30" height="30" data-src="/blog/img/favicon.png">
						<span class="nav-card-title">${item.title}</span>
						</div>
						<div class="desc" :title="item.desc">${item.desc}</div>
					</a>
				</li>
			</ul>
			<div v-else>暂无收录内容</div>
		</div>
	</div>

</div>

<script type="module">

	const webSites = [
		{ category: '前端', children: [
			{tag: 'Angular',title: 'Angular', icon: '', url: 'https://angular.dev/', desc: ''},
			{tag: 'Angular', title: 'Ant Design Angular', icon: '', url: 'https://ng.ant.design/docs/introduce/zh', desc: 'ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库，主要用于研发企业级中后台产品'},,
			{tag: 'Angular', title: 'Material Angular', icon: '', url: 'https://material.angular.dev/', desc: 'High quality, Versatile, Frictionless'},
			{tag: 'Vue',title: 'Vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: 'React',title: 'React', icon: 'https://zh-hans.react.dev/favicon-32x32.png', url: 'https://zh-hans.react.dev/', desc: ''},
			{tag: 'Uniapp', title: 'Uniapp', icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/icon.png?v=1556263038788', url: 'https://uniapp.dcloud.net.cn/', desc: '使用 Vue.js 开发所有前端应用的框架,一套代码，可发布到多个平台'},
			{tag: 'Uniapp', title: 'Uview', icon: '', url: 'https://uviewui.com/', desc: 'uniapp 前端UI组件库'},
		]},
		{ category: '后端', children: [
			{ tag: 'Nodejs', title: 'Nestjs', icon: '', url: 'https://docs.nestjs.cn', desc: '' }
		] },
		{ category: '笔记文档', children: [
    	{ tag: '笔记',title: 'Notion', url: 'https://www.notion.so', desc: 'Window mac手机秒同步,功能强大',},
    	{ tag: '笔记',title: '腾讯文档', url: 'https://docs.qq.com', desc: '文档在线共享',},
		]},
		{ category: 'NAS', children: [
			{ tag: 'Dokcer', title: 'Sonarr', url: '', desc: '自动追剧',},
			{ tag: 'Dokcer', title: 'Jellyfin', url: '', desc: '媒体库管理',},
			{ tag: 'Dokcer', title: 'Bazarr', url: '', desc: '字幕下载',},
			{ tag: 'Dokcer', title: 'Jackett', url: '', desc: 'BT种子聚合',},
		]},
		{ category: '图片音频处理', children: [
			{ tag: '图片', title: 'TinyPNG', url: 'https://tinyjpg.com/', desc: '图片压缩',},
			{ tag: '图片', title: 'iLoveImg', url: 'https://www.iloveimg.com/zh-cn', desc: '图片各种处理',},
			{ tag: '视频', title: 'You Compress', url: 'https://www.youcompress.com/videos/', desc: '视频压缩',},
			{ tag: '图片', title: 'BASE64', url: 'https://www.base64-image.de/', desc: '图片转base64',},
		]},
		{ category: 'UI设计', children: [
			  { tag: '设计', title: 'Pinterest', url: 'https://www.pinterest.com/', desc: '关于图片的都可以在这里找到！',},
				{ tag: '源文件', title: 'Emoji', url: 'https://emojipedia.org/zh', desc: '复制粘贴就能用的图标！',},
				{ tag: '设计', title: 'Behance', url: 'https://www.behance.com', desc: '',},
				{ tag: '设计', title: 'Dribble', url: 'https://www.dribble.com', desc: '',},
				{ tag: '源文件', title: '365PSD', url: 'https://www.freeimages.com/cn/psd?ref=365psd', desc: '免费psd素材'}
		]},
		{ category: '3D设计', children: [
				{ title: 'Zbrush Central', url: 'https://www.zbrushcentral.com/', desc: 'Zbrush 雕刻论坛',},
				{ title: 'ArtStation', url: 'http://artstation.com/', desc: 'A站',},
		]},
		{ category: '视频网站', children: [
				{ title: 'bilibili', url: 'https://bilibili.com', desc: '',},
				{ title: '低端影视', url: '#', desc: '',},
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
			const tagExpand = Vue.ref(new Map());

			const navRef = Vue.useTemplateRef('nav')

			async function setCategory(web, index) {
		  		activeCategory.value = web.category;
					tagExpand.value.clear();
					navList.value = web.children;
					navIndex.value = index;
					scrollToCenter(index)
		  		await Vue.nextTick();
		  }

			const tagMenu = Vue.computed(() => {
				const newMenu = new Map();
				navList.value.forEach(menu => {
					const tag = menu.tag || '无标签'
					if (newMenu.has(tag)) {
						newMenu.get(tag).push(menu)
					} else {
						newMenu.set(tag, [menu])
						tagExpand.value.set(tag, true)
					}
				})
				return Object.fromEntries(newMenu.entries())
			})

			function extendTag(tagName) {
				tagExpand.value.set(tagName, !tagExpand.value.get(tagName))
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
				tagMenu,
				tagExpand,
				extendTag,
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
	min-height: 100%;
	ul,li {
		margin: 0;
		padding:
		list-style: none;
		padding-inline-start: 0;
	}
	.nav-slider {
		width: 100%;
		height: 1px;
		border-bottom: 1px solid #e5e7eb;
		margin: 1rem -0.5rem
	}
	.nav-wrapper {
		position: relative;
		margin-bottom: 1.5rem;
		.iconfont:active:not(.disable-icon) {
			transform: translateY(-50%) scale(0.8);
		}
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
	.tag-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.iconfont {
			transform: rotate(0deg);
  		transition: transform 0.3s ease;
		}
		.rotate-icon {
			transform: rotate(-90deg);
		}
		.tag-header {
			display: flex;
			align-items: center;
			font-size: 1.2rem;
			gap: 0.5rem;
			cursor: pointer;
			user-select: none;
			i {
				font-size: 1.5rem;
			}
		}
	}

	.content {
		display: grid;
		grid-template-columns: repeat(3, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 0.5rem;
		.nav-card-title {
			font-size: 1.5rem;
			font-weight: bold;
		}
		li {
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
			a {
				padding: 1.5rem;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
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