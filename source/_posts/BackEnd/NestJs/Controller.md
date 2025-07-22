---
layout: post
title: Controller in nestjs
index_txt: Nestjs
categories:
 - BackEnd
tags: ['Nestjs']
---

# Controller
### 快速生成
```bash
$ nest generate controller [name]
```

### [基本使用](https://docs.nestjs.com/controllers)
```typescript
// `cats`作为路径前缀
@Controller('cats')
export class CatController {
    // get http请求
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}
```
