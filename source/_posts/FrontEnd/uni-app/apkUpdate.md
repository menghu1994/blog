---
layout: post
title: Uniapp 安装更新包
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp 安装更新文件包
> 安卓apk版本更新后提示用户下载并更新到最新版
> 后台添加版本配置及安装包上传

## 打包APK
```json
// manifest.json
{
  // 每次打包的appid应是同一个
  "appid" : "__UNI__C111111",
  // 每次打包versionName，versionCode都需要增加版本号
  "versionName" : "1.0.3",
  "versionCode" : 103,
}
```

## 检测更新
```html
    <u-modal title="版本提示" :show-cancel-button="true"
             v-model="showVersionTip" :content="versionTipContent"
             @confirm="versionConfirm()" ></u-modal>

    <u-modal title="应用更新中" :show-confirm-button="false" :show-cancel-button="false"
             v-model="showDownloadProgress" @cancel="canelDownload" >
      <view class="text-center">
        <u-circle-progress active-color="#2979ff" :percent="progress" bg-color="transparent">
          <view class="u-progress-content">
            <text class='u-progress-info'>{{ progress }} %</text>
          </view>
        </u-circle-progress>
      </view>
    </u-modal>

```

```js
checkVersion(){
  if(!uni.getStorageSync('versionCheck')){ return }
  const systemVersion = uni.getSystemInfoSync() ? 'v' + uni.getSystemInfoSync().appVersion : 'v1.0.1';
  login.checkVersion().then(res => {
    this.configObj = res.data;
    this.versionTipContent =`新版本【${this.configObj['fileVersion']}】已发布。请点击“确认”完成更新！如有任何问题，请联系IT人员。`;
    this.showVersionTip = true;
  })
}

// 自动下载更新版本
async versionConfirm(){
  uni.setStorageSync('versionCheck', true);
  // #ifdef APP-PLUS ||MP
		const uploadFileRes = await UploadService.getFileByObjectIdType();

		if (!uploadFileRes || !uploadFileRes.data.length) {
		  this.$msg('未找到更新文件');
		  return;
		}

    this.showDownloadProgress = true;
    //configObj.filePath 可以是完整的nginx暴露的文件地址
    this.dtask = plus.downloader.createDownload(this.configObj.filePath, {}, ( d, status ) => {
      // 下载完成
      if ( status == 200 ) {
				this.showDownloadProgress = false;
        plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{ force: true },() => {
					this.$msg('安装成功，即将重启应用');
				}, (error) => {
          this.showDownloadProgress = false;
          this.$msg('安装失败');
        })
      } else {
        this.showDownloadProgress = false;
        this.$msg('更新失败');
      }
    });
    this.dtask.start();
    this.dtask.addEventListener('statechanged', (task, status) => {
      switch (task.state) {
        case 1:
          console.error('正在下载')
          break;
        case 2:
          console.error('已连接到服务器')
          break;
        case 3:
          // 下载中
          const newProgress = Math.floor((task.downloadedSize/task.totalSize) * 100);
          this.throttle(() => {
              this.progress = newProgress;
          }, 500);
          break;
        case 4:
          console.error('下载完成')
          break;
      }
    });
  }
  // #endif
}
```