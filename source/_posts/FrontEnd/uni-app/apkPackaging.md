---
layout: post
title: Uniapp Android 离线打包
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp Android 离线打包
> [Android Studio](https://developer.android.google.cn/studio?hl=zh-cn)
> Java环境
> [App离线SDK](https://pan.baidu.com/share/init?surl=AFjLggD7g6ue0iKgZ8yVyA&pwd=jrrb)


## Android Studio 导入Demo项目
Android Studio 导入App离线SDK项目`Android-SDK@4.87.82540_20251128\HBuilder-Integrate-AS`

## Android 签名证书(.keystore)
1. 命令行生成证书
```bash
keytool -genkey -alias <别名> -keyalg RSA -keysize 2048 -validity 36500 -keystore <文件名>.keystore
```

2. 查看证书信息(别名, SHA1, SHA256)
```bash
keytool -list -v -keystore <文件名>.keystore
```

3. 复制`<文件名>.keystore`到`Android-SDK@4.87.82540_20251128\HBuilder-Integrate-AS\simpleDemo`下

## [申请离线AppKey](https://dev.dcloud.net.cn/)
1. 在`应用管理` -> `我的应用`中找到对应项目,点击应用名称
2. 在`各平台信息`中`新增`填写必填信息 -> Android App,正式版,
 - 所属平台: Android App
 - 版本: 正式版
 - 包名: (需要与`simpleDemo/build.gradle`内的`applicationId`相同)
 - Android 应用签名SHA1值: (对应证书信息中的SHA1)
 - Android 应用签名SHA256: (对应证书信息中的SHA256)
3. 提交后可以查看到`离线AppKey`和`Appid`

## Uniapp打包App资源
1. 修改`manifest.json`配置
 - `appid`需要与`Appid`相同
 - `minSdkVersion`最低版本21
2. `Hbuilder`中, `发行` -> `App-Android/IOS-本地打包` -> `生成本地打包App资源`
3. 将生成的文件复制到`simpleDemo\src\main\assets\apps`下顶替之前的文件

## Android Studio Apk打包配置
1. `simpleDemo\src\main` => `AndroidManifest.xml` 
  - 将`<meta-data .... />` 中的 `android:value` 的值改为`离线AppKey`
2. `simpleDemo` => `build.gradle`
  - `applicationId` 对应dcloud中的包名,不修改
  - `versionCode` 对应 `manifest.json`中的`versionCode`
  - `versionName` 对应 `manifest.json`中的`versionName`
  - `minSdkVersion` 对应 `manifest.json`中的`minSdkVersion`
  - `targetSdkVersion` 值为 33
  - `keyAlias` 对应 `<文件名>.keystore` 中的 `别名`
  - `keyPassword` 对应 生成keystore时的密码
  - `storeFile file('<文件名>.keystore')`
  - `storePassword` 对应 生成keystore时的存储密码
3. 修改应用配置
  - `simpleDemo\src\main\res\values\strings.xml` 改成`<string name="app_name">最终显示在手机上的应用名称</string>`
  - `simpleDemo\src\main\res\drawable` => `icon.png` 为应用图标,`splash.png` 为 app启动页
4. 修改`simpleDemo\src\main\assets\data` => `dcloud_control.xml` 中的 `appid` 值为  `manifest.json`中的`appid`
5. Android Studio打包
  - `Build` => `Select Build Variant...` 选择 `Active Build Variant` 为 `release`正式版
  - `Build` => `Generate App Bundles or APKs` => `Generate APKs`

apk文件生成目录`simpleDemo\build\outputs\apk\release`
