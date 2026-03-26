---
layout: post
title: Uniapp 安装更新包升级版
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp 安装更新文件包
> 基础内容 => [Uniapp 安装更新包](/blog/FrontEnd/FrontEnd/uni-app/apkUpdate/)
> 升级内容 => 在任意页面都可以提示更新

# 定时器js文件
```js
import ConfigsService from '@/api/service/maindata/configs.js'

let versionTimer = null;

// 5 小时检查一次版本
const TWELVE_HOURS = 5 * 60 * 60 * 1000;
// 测试用 10 秒
// const TWELVE_HOURS = 10 * 1000;

const isInHomePage = () => {
	const pages = getCurrentPages();
	if (!pages || pages.length === 0) return false;
	const currentPage = pages[pages.length - 1].route;
	return currentPage === 'pages/home/home'; // 你的首页路径
};

export async function checkAppVersion() {
	const token = uni.getStorageSync('token');
	if (!token) return;

	try {
		const systemInfo = uni.getSystemInfoSync();
		const currentVersion = systemInfo.appVersion
			? 'v' + systemInfo.appVersion
			: 'v1.0.1';

		const res = await ConfigsService.keyValue();
		const config = res.data || {};
		const serverVersion = config.pda_version;
		const pdaFile = config.pda_file;

		if (!serverVersion || currentVersion === serverVersion) return;

		const newVersionInfo = {
			version: serverVersion,
			fileConfig: pdaFile
		};

		if (isInHomePage()) {
			uni.$emit('appHasNewVersion', newVersionInfo);
		} else {
			// 弹出提示返回首页
			uni.showModal({
				title: '版本提示',
				content: `检测到新版本【${serverVersion}】，请返回首页更新！`,
				showCancel: true,
				confirmText: '返回首页',
				success: (e) => {
					if (e.confirm) {
						uni.switchTab({ url: '/pages/home/home' });
						uni.$emit('appHasNewVersion', newVersionInfo);
					}
				}
			});
		}
	} catch (e) {
		console.log('版本检查失败', e);
	}
}

export function startVersionTimer() {
	// 先清掉旧定时器，避免重复
	if (versionTimer) {
		clearInterval(versionTimer);
		versionTimer = null;
	}
	console.log('开启定时器')
	checkAppVersion();
	versionTimer = setInterval(() => {
		console.log("定时检查版本...");
		checkAppVersion()
	}, TWELVE_HOURS);
}

export function stopVersionTimer() {
	if (versionTimer) {
		clearInterval(versionTimer);
		versionTimer = null;
		console.log('版本定时器已清理');
	}
}
```

# 升级组件
```html
// app-update.vue
<template>
	<view>
		<!-- 提示信息-无自动下载更新版本 -->
		<u-modal class="tipModal" title="版本提示" show-cancel-button v-model="showVersionTip"
			:content="versionTipContent" @confirm="updateApp()" :mask-close-able="false"></u-modal>

		<!-- 下载进度 -->
		<u-modal class="tipModal" title="应用更新中" :show-confirm-button="false" :show-cancel-button="true"
			v-model="showDownloadProgress" @cancel="cancelDownload">
			<view class="text-center margin-b15">
				<u-circle-progress active-color="#2979ff" :percent="progress" bg-color="transparent">
					<view class="u-progress-content">
						<text class='u-progress-info'>{{ progress }} %</text>
					</view>
				</u-circle-progress>
			</view>
		</u-modal>
	</view>
</template>

<script>
  import UploadService from '@/api/service/maindata/upload.js'
  import store from '@/store/index.js';
  import { startVersionTimer, stopVersionTimer } from '@/utils/appUpdate.js'

	export default {
		name: 'AppUpdate',
		data() {
			return {
				showVersionTip: false,
				showDownloadProgress: false,
				versionTipContent: '',
				progress: 0,
				pdaFileConfig: null,
				dtask: null,
			}
		},
    // 切到后台
    onHide() {
      // #ifdef APP-PLUS
      stopVersionTimer()
      // #endif
    },
    // 回到前台
    onShow() {
      // #ifdef APP-PLUS
      startVersionTimer()
      // #endif
    },
		mounted() {
      // #ifdef APP-PLUS
      // 启动定时器
      startVersionTimer()
      // #endif
		},
		beforeDestroy() {
      stopVersionTimer()
		},
		methods: {
      startUpdateByConfig(config) {
        this.pdaFileConfig = config.fileConfig
        this.versionTipContent = `新版本【${config.version}】已发布。请点击“确认”完成更新！如有任何问题，请联系IT人员。`
        this.showVersionTip = true
      },
			async updateApp() {
				if (!this.pdaFileConfig) return;
        this.showVersionTip = false

        const [objectId, objectType] = this.pdaFileConfig.split(',')
        const uploadFileRes = await UploadService.getFileByObjectIdType({
				  objectId,
				  objectType
				});

				if (!uploadFileRes || !uploadFileRes.data.length) {
				  this.$msg('未找到更新文件');
				  return;
				}

				const downloadinfo = uploadFileRes.data[0];
				const fileUrl = store.getters.getFixUrl + `services/slemaindata/api/file/download?url=${downloadinfo.attachmentUrl}`;
				const token = uni.getStorageSync('token');

				this.showDownloadProgress = true;
				this.progress = 0;
        this.dtask = uni.downloadFile({
					url: fileUrl,
					header: {
						'Authorization': 'Bearer ' + token
					},
					success: (res) => {
						uni.saveFile({
						  tempFilePath: res.tempFilePath,
						  success: (saveRes) => {
						    console.log('下载并保存成功', saveRes.savedFilePath);
						    plus.runtime.install(saveRes.savedFilePath, {}, () => {
									this.showDownloadProgress = false;
						      this.$msg('安装成功');
						    }, (err) => {
									this.showDownloadProgress = false;
						      this.$msg('更新失败');
						    });
						  }
						});
					},
					fail: () => {
						this.$msg('下载失败')
					}
				});
        this.dtask.onProgressUpdate((res) => {
					this.showDownloadProgress = true;
					this.progress = res.progress;
					if (this.progress > 99) {
						this.showDownloadProgress = false;
						this.progress = 0
					}
				});
			},
      cancelDownload() {
        if (this.dtask) {
          this.dtask.abort()
          this.dtask = null
        }
        this.progress = 0
				this.showDownloadProgress = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
.u-progress-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.u-progress-info {
  font-size: 28rpx;
  padding-left: 16rpx;
}

.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;

  .u-image {
    padding: 38rpx !important;
  }
}
</style>
```
在首页进行引用
> 小tips: 使用目录`components/app-update/app-update.vue`就可以无需导入就可以使用组件,[具体内容请看](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)

```html
// pages/home/home
<template>
  <view>
    <app-update ref="appUpdate" />
  </view>
</template>

<script>
 export default {
  onLoad() {
    // ...
    // #ifdef APP-PLUS
    uni.$on('appHasNewVersion', (config) => {
      this.$nextTick(() => {
        if(this.$refs.appUpdate) {
          this.$refs.appUpdate.startUpdateByConfig(config)
        }
      })
    })
    // #endif
  }
 }
</script>
```