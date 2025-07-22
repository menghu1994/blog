---
layout: post
title: 前端项目环境变量
index_txt: Gist
categories:
 - FrontEnd
---

# 前端项目环境变量

根目录下根据环境创建文件
`.env`, `.env.local`, `.env.production`,`.env.abcdefg.local`

其中有`local`和`production`的都应该不被git管理
在`.gitignore`文件中添加以下内容
```md
.env.local
.env.*.local
.env.production
```

运行时切换环境`package.json`
> `.env`会默认运行
```json
{
  "scripts": {
     "start": "vite start --mode production",
   }
}
```

### 使用`dotenv`
> 项目主动安装`dotenv`来管理环境变量

1. 安装
`npm install dotenv`

2. 使用方式
```js
require('dotenv').config()
console.log(process.env.API_KEY)
```

### 使用`vite` (`vue`)
> vite 内置了环境变量的支持
> 可以配置vite(根目录下有vite.config.js)
> 不在使用`process.env`,应为process是nodejs全局对象,浏览器中不存在,Vite需兼容浏览器环境

使用方式
```js
import.meta.env.VITE_API_KEY // 仅限 VITE_ 前缀的变量
```

如果前端项目中有服务端脚本(nodejs)可以判断使用
```js
// 服务端代码（Node.js 环境）
if (typeof window === 'undefined') {
  console.log(process.env.DB_PASSWORD)
}

// 客户端代码
console.log(import.meta.env.VITE_API_URL)
```


### 使用/不使用`vite` (`angular`)
> angular17以后集成了vite,但只优化了运行
> 根目录下没有vite.config.js文件
> 还需使用`ng environment`创建环境变量目录

```
/projects/my-app/src/environments/
  ├── environment.ts          # 默认开发环境
  ├── environment.development.ts          # 开发环境
  ├── environment.prod.ts     # 生产环境
  └── environment.staging.ts    # 预发布环境
```
环境配置内容
```js
export const environment = {
	production: false,
	baseUrl: 'http://...'
}
```
使用方式
```js
import { environment } from '../environments/environment';

console.log(environment.baseUrl);
```

运行时切换环境`package.json`
> `.env`会默认运行

1. 配置`angular.json` configuration
```json
{
  "development": {
     "fileReplacements": [
     	{
     		"replace": "src/environments/environment.ts",
     		"with": "src/environments/environment.development.ts"
     	}
     ]
   },
  "staging": {
  	"optimization": false,
  	"extractLicenses": false,
  	"sourceMap": true,
  	"fileReplacements": [
    	{
    		"replace": "src/environments/environment.ts",
    		"with": "src/environments/environment.staging.ts"
    	}
    ]
  },
  "serve": {
  	"configurations": {
  		"staging": {
  			"buildTarget": "projectName:build:staging"
  		}
  	}
  }
}
```

2. 运行切换环境
```json
{
  "scripts": {
     "start": "ng build --configuration=staging",
   }
}
```