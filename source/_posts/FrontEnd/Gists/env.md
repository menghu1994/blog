---
layout: post
title: .env环境变量
index_txt: env file
tags: ['Gist']
---

## .env环境变量文件

### 环境变量文件优先级
`.env.development.local > .env.local > .env.development > .env`

### 环境变量文件是否提交代码仓库
✔应该提交的文件
```bash
.env.example          # 环境变量模板
.env.development      # 开发环境默认配置
.env.production       # 生产环境默认配置
.env.test             # 测试环境配置
```
❌不应该提交的文件
```bash
.env.local             # 本地开发覆盖配置
.env.development.local # 开发环境本地覆盖
.env.production.local  # 生产环境本地覆盖
.env.*.local  		   # 缩写
.env                   # 包含敏感信息的全局配置
```

### 默认环境变量与手动指定环境变量
默认环境变量
```bash
# 默认开发环境
npm start        # → development
npm run dev      # → development

# 默认生产环境  
npm run build    # → production
npm run serve    # → production
```

手动指定环境
```bash
# 明确指定环境
NODE_ENV=development npm start
NODE_ENV=production npm run build

# 使用 cross-env (跨平台)
cross-env NODE_ENV=production npm run build
```

### 不同的环境变量文件设置什么内容
`.env` 全局默认配置
```env
# 所有环境的共享变量
API_BASE_URL=/api
APP_NAME=MyApp
```

`.env.development` 开发环境
```env
# 开发环境特定配置
API_URL=http://localhost:3000
DEBUG=true
DB_HOST=localhost
```

`.env.production `  生产环境
```env
# 生产环境配置
API_URL=https://api.example.com
DEBUG=false
DB_HOST=production-db
```

`.env.local` 本地覆盖
```env
# 本地开发特殊配置
DB_PASSWORD=local123
SECRET_KEY=local_secret
```

### 最终加载的环境变量
多个环境变量文件会根据优先级进行文件合并，最终合并只剩一个合并后的环境变量集合
`.local`文件优先级最高,`.env`文件优先级最低
```bash
# 生产环境的加载顺序（后面的会覆盖前面的）
.env → .env.production → .env.local → .env.production.local
```

```js
// 运行 NODE_ENV=production 时：
process.env.API_URL      // = "https://production-api.com" (来自 .env.production)
process.env.DB_HOST      // = "local-db" (来自 .env.local，覆盖前面的)
process.env.LOG_LEVEL    // = "debug" (来自 .env.local，覆盖 .env)
```

### 使用环境变量
```
baseURL: process.env.API_URL,
```