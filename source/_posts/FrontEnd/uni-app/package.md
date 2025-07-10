---
layout: post
title: Uniapp 打包指南
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
excerpt: h5, Android开发环境运行, 生产环境打包
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uniapp 打包指南

## 配置`manifest.json`
> 配置应用名称，版本，图标等...

```json
// 常用配置
{
		 // 应用名称
    "name" : "测试应用",
		 // 打包时用，需登录Hbuilder
    "appid" : "__UNI__E1AA2D2",
		// 应用版本，用于查看是否更新
    "versionName" : "1.0.1",
    "versionCode" : 102,
		// 网络超时时间(ms)
    "networkTimeout" : {
        "request" : 30000
    },
    "screenOrientation" : [ "portrait-primary" ],
    /* 5+App特有相关 */
    "app-plus" : {
        /* 应用发布信息 */
        "distribute" : {
            /* android打包配置 */
            "android" : {
                "packagename" : "测试应用",
								 // 最低android版本 19非android版本
                "minSdkVersion" : 19
            },
            "icons" : {
                // 图标配置
            }
        }
    },
    /* 小程序特有相关 */
    "mp-weixin" : {
			// 小程序appid
        "appid" : ""
    },
		// 框架vue版本 2或3 
    "vueVersion" : "2",
    "h5" : {
				// 开发环境，代理配置防跨域 
				// Hbuilder预览按钮也可防跨域
        "devServer" : {
            "https" : false,
            "disableHostCheck" : true,
            "proxy" : {
							// 开发环境，将请求地址带有/services的替换成http://192.168.1.156:80/services
                "/services" : {
                    "target" : "http://192.168.1.156:80/",
                    "changeOrigin" : true, //是否跨域
                    "secure" : false, // 设置支持https协议的代理
                    "pathRewrite" : {
                        "^/services" : "/services"
                    }
                },
            },
						// 端口号
            "port" : 8090
        }
    }
}

```

### h5打包
在Hbuilder中点击`发行` => `网站-PC Web或手机H5`
运行后会在命令行中输出打包位置，默认在`/unpackage/dist/build/web`(老版本目录名h5)目录下,部署方法与PC build文件相同。

### Android打包
1. 在Hbuilder中点击`发行` => `App-Android/IOS-云打包`
2. 选择`Android(apk包)`，`使用云端证书`, `打正式包`, `快速安心打包` => `打包`

### 多应用打包配置
> 在同一个手机安装同一个应用，但要求新应用不会顶替旧应用
1. `/manifest.json - app-plus - distribute - android - packagename` 配置不同的包名称
2. `打包`=>`发行`=>`云打包`=>`Android名称`配置不同的名称
