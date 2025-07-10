---
layout: post
title: Uniapp UHF射频识别
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
excerpt: 仅针对商米设备L2k和L2s上使用RFID
tags: ['Uniapp']
categories:
 - FrontEnd
---

# 商米设备UHF射频识别(Android)

### 安装插件并运行

#### 安装插件
1. [SunmiUHF](https://ext.dcloud.net.cn/plugin?id=18809#detail)
2. 选择`下载插件并导入HBuilderX`
3. 导出的插件会出现在目录`/uni_modules/sunmui-uhf`中

#### 构建自定义基座
> 使用插件且运行到真机需要先构建自定义基座再运行到Android设备

在Hbuilder编辑器中，`发行` => `App-Android/IOS-云打包`
在弹窗中，选择`Android(apk包)`,`打自定义调试基座`，`传统打包`，然后打包

#### 运行到真机
在Hbuilder编辑器中，`运行` => `运行到手机或模拟器` => `运行到Android App基座` => `使用自定义基座运行` => `运行`

### 将UHF功能封装成公用extend组件
> 创建文件`/components/extends/UHF.vue`

```js
<template>
</template>

<script>
	import * as uhf from '../../uni_modules/sunmi-uhf'

	export default {
		name: "UHF-read-write",
		data() {
			return {
				isDeviceReady: false,
				canRead: true,
				isReading: false,
				tagList: []
			}
		},
		onReady() {
			this.initUHF()
			this.listenUHF()
		},
		onUnload() {
			uhf.deInitSdk();
			plus.key.removeEventListener('keydown', () => {});
			plus.key.removeEventListener('keyup', () => {})
		},
		methods: {
			initUHF() {
				let that = this;
				uhf.initSdk({
					model: function(ret) {
						that.isDeviceReady = true;
						console.log(ret, '型号')
					},
					sn(ret) {
						console.log(ret, 'SN')
					},
					softVersion(ret) {
						console.log(ret, '软件版本')
					},
					hardwareVersion(ret) {
						console.log(ret, '硬件版本')
					}
				})
			},
			listenUHF() {
				plus.key.addEventListener('keydown', event => {
					// UHF 按钮按下
					if (event.keyCode === 288 && this.canRead) {
						this.isReading = true;
						uni.$u.throttle(this.inventory, 1000)
					}
				})
				plus.key.addEventListener('keyup', event => {
					if (event.keyCode === 288) {
						this.isReading = false;
					}
				})
			},
			// 盘存
			// @Params {
			//  count 盘存次数
			// }
			inventory(count = 1) {
				this.tagList = [];
				
				let that = this;
				this.playVoice();
				// this.beep()
				uhf.realTimeInventory(count, {
					success(inventory) {
						console.log('盘存成功', inventory)
						if(!inventory.count) {
							that.$msg('未检测到RFID')
						} else if (inventory.count > 1) {
							that.$msg('检测到多个RFID,请重新读取')
						} else {
							that.handleInfo(that.tagList[0])
						}
					},
					fail(error) {
						console.error('盘存失败', error)
						that.$msg('盘存失败')
					},
					tag: function(info) {
						console.log('标签信息', info)
						that.tagList.push(info)
					}
				})
			},
			handleInfo(info) {
				this.read(info)
				this.assignOperateTag(info.epc);
			},
			read(rfidInfo) {},
			write(msg) {
				uhf.writeAccessTag({
					// User内存空间
					mem: 3,
					address: 0,
					length: msg ? msg.toString(16) / 4 : 0,
					data: msg ? msg.toString(16) : ''
				}, {
					success(opt) {
						console.log(opt, '写入成功')
					},
					fail(error) {
						console.error('写入失败')
					}
				})
			},
			assignOperateTag(epc) {
				uhf.accessTag(epc, {
					success(opt) {},
					fail(error) {
						uni.showToast({
							title: error,
							icon: 'none'
						})
					}
				})
			},
			// 系统提示音
			playVoice() {
				let main = plus.android.runtimeMainActivity();
				let RingtoneManager = plus.android.importClass("android.media.RingtoneManager");
				let uri = RingtoneManager.getActualDefaultRingtoneUri(main, RingtoneManager.TYPE_NOTIFICATION);
				let MediaPlayer = plus.android.importClass("android.media.MediaPlayer");
				let player = MediaPlayer.create(main, uri);
				player.setLooping(false);
				player.prepare();
				player.start();
			},
			// 系统提示音(蜂鸣)
			beep(){
				plus.device.beep(1);
			},
		}

	}
</script>

<style></style>
```

### 使用组件

```js
<template>
</template>

<script>
// 仅Android客户端运行
// #ifdef APP-PLUS ||MP
import UHF from '@/components/extends/UHF.vue'
// #endif

export default {
	// #ifdef APP-PLUS ||MP
	extends: UHF,
	// #endif
	data() {},
	methods: {
		// 默认已经监听了UHF按钮按下事件，可在此处手动调用UHF盘存方法
		onReadRFID() {
			if(!this.isReading) {
				this.inventory(1)
			}
		},
		// 重写继承方法,读取RFID信息
		read(rfidInfo) {
				//处理RFID信息
		},
	}
}
</script>
```