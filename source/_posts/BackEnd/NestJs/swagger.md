---
layout: post
title: Nestjs 接口文档
tags: ['Nestjs']
---

## [添加 swagger](https://docs.nestjs.com/openapi/introduction)
```shell
npm install --save @nestjs/swagger
```
在`main.ts`添加swagger
```js
  const config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
```
在服务中导航到/api-docs查看接口文档

#### 接口文档添加分类(ApiTags)和描述(ApiOperation)
给controller添加ApiTags装饰器
```js
@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
	@Get()
	@ApiOperation({ summary: '获取用户列表'})
	findAll(){
		return ''
	}
}
```

#### 接口文档添加requestBody
```js
export class createUserDto{
	@ApiProperty()
	name: string
	
	@ApiProperty()
	age: number
}

@Post()
@ApiOperation({ summary: '创建用户'})
findAll(@Body() body: createUserDto){
	return body
}
```