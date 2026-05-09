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
			{tag: 'Angular',title: 'Angular', icon: '', url: 'https://angular.dev/', desc: 'Google 维护的现代 Web 应用开发框架'},
			{tag: 'Angular', title: 'Ant Design Angular', icon: '', url: 'https://ng.ant.design/docs/introduce/zh', desc: '遵循 Ant Design 设计规范的 Angular UI 组件库，适合企业级中后台产品'},
			{tag: 'Angular', title: 'Material Angular', icon: '', url: 'https://material.angular.dev/', desc: 'Angular 官方 Material Design 组件库'},
			{tag: 'Vue',title: 'Vue', icon: 'https://cn.vuejs.org/logo.svg', url: 'https://cn.vuejs.org', desc: '渐进式JavaScript 框架'},
			{tag: 'React',title: 'React', icon: 'https://zh-hans.react.dev/favicon-32x32.png', url: 'https://zh-hans.react.dev/', desc: '用于构建 Web 和原生交互界面的 JavaScript 库'},
			{tag: 'Uniapp', title: 'Uniapp', icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/icon.png?v=1556263038788', url: 'https://uniapp.dcloud.net.cn/', desc: '使用 Vue.js 开发所有前端应用的框架,一套代码，可发布到多个平台'},
			{tag: 'Uniapp', title: 'Uview', icon: '', url: 'https://uviewui.com/', desc: 'uniapp 前端UI组件库'},
		]},
		{ category: 'AI', children: [
			{ tag: '通用对话', title: 'ChatGPT', icon: '', url: 'https://chatgpt.com/', desc: 'OpenAI 的通用 AI 助手，适合问答、写作、代码、图片和数据分析'},
			{ tag: '通用对话', title: 'Claude', icon: '', url: 'https://claude.ai/', desc: 'Anthropic 的 AI 助手，适合长文、文档分析、代码理解和复杂任务拆解'},
			{ tag: '通用对话', title: 'Gemini', icon: '', url: 'https://gemini.google.com/', desc: 'Google 的 AI 助手，适合 Google 生态、长上下文和多模态任务'},
			{ tag: '通用对话', title: 'DeepSeek', icon: '', url: 'https://chat.deepseek.com/', desc: '国产大模型产品，适合中文问答、推理和代码辅助'},
			{ tag: '搜索调研', title: 'Perplexity', icon: '', url: 'https://www.perplexity.ai/', desc: '搜索型 AI，适合查资料、看来源、做信息汇总'},
			{ tag: '搜索调研', title: 'Kimi', icon: '', url: 'https://www.kimi.com/', desc: '月之暗面推出的中文 AI 助手，适合长文档阅读、搜索和资料整理'},
			{ tag: '编程工具', title: 'Cursor', icon: '', url: 'https://cursor.com/', desc: 'AI 代码编辑器，适合项目级问答、代码补全和 Agent 改代码'},
			{ tag: '编程工具', title: 'GitHub Copilot', icon: '', url: 'https://github.com/features/copilot', desc: 'GitHub 官方 AI 编程助手，支持代码补全、聊天和 IDE 集成'},
			{ tag: '编程工具', title: 'Claude Code', icon: '', url: 'https://docs.anthropic.com/en/docs/claude-code/setup', desc: 'Anthropic 的命令行编程 Agent，适合读代码、改文件和跑测试'},
			{ tag: '编程工具', title: 'Codex CLI', icon: '', url: 'https://github.com/openai/codex', desc: 'OpenAI 的命令行编程 Agent，适合在本地项目中执行代码任务'},
			{ tag: '编程工具', title: 'Gemini CLI', icon: '', url: 'https://google-gemini.github.io/gemini-cli/docs/get-started/', desc: 'Google Gemini 命令行工具，适合在终端中处理代码和文本任务'},
			{ tag: '自动化', title: 'OpenClaw', icon: '', url: 'https://www.openclawch.com/', desc: '本地优先的个人 AI Agent 平台，可接模型、插件和消息渠道'},
			{ tag: '图像视频', title: 'Midjourney', icon: '', url: 'https://www.midjourney.com/', desc: 'AI 图片生成工具，适合概念图、插画、视觉风格探索'},
			{ tag: '图像视频', title: 'Sora', icon: '', url: 'https://sora.com/', desc: 'OpenAI 的视频生成产品，适合从文本、图片生成视频内容'},
		]},
		{ category: '后端', children: [
			{ tag: 'Nodejs', title: 'Nestjs', icon: '', url: 'https://docs.nestjs.cn', desc: '用于构建高效、可扩展 Node.js 服务端应用的框架' }
		] },
		{ category: '笔记文档', children: [
    	{ tag: '笔记',title: 'Notion', url: 'https://www.notion.so', desc: '跨平台笔记、知识库和项目管理工具',},
    	{ tag: '文档协作',title: '腾讯文档', url: 'https://docs.qq.com', desc: '在线文档、表格和收集表，适合多人协作',},
		]},
		{ category: 'NAS', children: [
			{ tag: 'Docker', title: 'Sonarr', url: 'https://sonarr.tv/', desc: '电视剧自动追踪、下载和媒体库整理工具',},
			{ tag: 'Docker', title: 'Jellyfin', url: 'https://jellyfin.org/', desc: '开源媒体服务器，用于管理和串流本地影音库',},
			{ tag: 'Docker', title: 'Bazarr', url: 'https://www.bazarr.media/', desc: '配合 Sonarr / Radarr 使用的字幕下载和管理工具',},
			{ tag: 'Docker', title: 'Jackett', url: 'https://github.com/Jackett/Jackett', desc: 'BT 索引器聚合工具，可对接 Sonarr、Radarr 等服务',},
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
				{ tag: '设计', title: 'Behance', url: 'https://www.behance.net/', desc: 'Adobe 旗下创意作品展示平台，适合查找设计灵感和作品集',},
				{ tag: '设计', title: 'Dribbble', url: 'https://dribbble.com/', desc: '设计师作品展示社区，适合 UI、插画、品牌视觉参考',},
				{ tag: '源文件', title: '365PSD', url: 'https://www.freeimages.com/cn/psd?ref=365psd', desc: '免费psd素材'}
		]},
		{ category: '3D设计', children: [
				{ tag: '论坛', title: 'Zbrush Central', url: 'https://www.zbrushcentral.com/', desc: 'ZBrush 官方社区，适合查看雕刻作品和教程讨论',},
				{ tag: '作品集', title: 'ArtStation', url: 'https://www.artstation.com/', desc: '游戏、影视、概念设计和 3D 艺术作品集平台',},
		]},
		{ category: '视频网站', children: [
				{ tag: '视频', title: 'bilibili', url: 'https://www.bilibili.com/', desc: '国内综合视频社区，适合学习、娱乐和创作内容',},
				{ tag: '影视', title: '低端影视', url: 'https://www.ddys.run/', desc: '影视资源站，域名可能变化，访问前注意辨别镜像站',},
		]},
		{ category: 'Windows实用工具', children: [
				{ tag: '搜索', title: 'Listary', url: 'https://www.listary.com/', desc: 'Windows 快速文件搜索和启动器，适合替代系统搜索',},
				{ tag: '截图', title: 'SETUNA2', url: 'https://www.vector.co.jp/soft/winnt/art/se486438.html', desc: '小巧截图置顶工具，适合临时固定参考图',},
				{ tag: '编辑器', title: 'Sublime Text', url: 'https://www.sublimetext.com/', desc: '轻量文本编辑器，适合替代本地记事本和快速编辑代码',},
		]},
		{ category: 'Chrome实用插件', children: [
				{ tag: '脚本', title: 'Tampermonkey', url: 'https://www.tampermonkey.net/', desc: '用户脚本管理器，可安装网页增强脚本',},
				{ tag: '广告拦截', title: 'AdBlock', url: 'https://getadblock.com/', desc: '浏览器广告屏蔽插件',},
				{ tag: '下载', title: '猫抓', url: 'https://chromewebstore.google.com/detail/%E7%8C%AB%E6%8A%93/jfedfbgedapdagkghmgibemcoggfppbb', desc: '网页媒体资源嗅探和下载辅助插件',},
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
