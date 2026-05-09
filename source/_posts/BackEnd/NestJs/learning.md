---
layout: post
title: Learn nestjs
tags: ['Nestjs']
---

一个 NestJS 应用 = 若干 Module 的组合

┌──────────────────────────────────────────┐
│               AppModule                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ UserModule│ │OrderModule│ │AuthModule│ │
│  │           │ │           │ │          │ │
│  │ Controller│ │Controller │ │Guard     │ │
│  │ Service   │ │Service    │ │Strategy  │ │
│  │ Entity    │ │Entity     │ │          │ │
│  └──────────┘ └──────────┘ └──────────┘ │
└──────────────────────────────────────────┘

## Module

需要理解的关系：
Module
 ├── controllers    → 处理 HTTP 请求的入口
 ├── providers      → 业务逻辑（Service、Repository 等）
 ├── imports        → 依赖的其他 Module
 └── exports        → 对外提供的 Provider

### Controller

Controller 的职责：
├── 定义路由（URL 路径 + HTTP 方法）
├── 接收请求参数
├── 调用 Service 处理业务
└── 返回响应

心智模型：
  Controller ≈ 前台接待员
  只负责「接收」和「回复」，不亲自干活

映射关系：
  GET    /users       → findAll()
  GET    /users/:id   → findOne(id)
  POST   /users       → create(body)
  PATCH  /users/:id   → update(id, body)
  DELETE /users/:id   → remove(id)

### Provider / Service

Provider 的职责：
├── 封装业务逻辑
├── 操作数据库
├── 调用外部服务
└── 被注入到任何需要它的地方

心智模型：
  Service ≈ 后台工程师
  Controller 说「帮我查个用户」，Service 去数据库查

Provider 可以是：
├── Service（最常见）—— 业务逻辑
├── Repository —— 数据库操作封装
├── Factory —— 动态创建实例
├── Helper —— 工具函数集合
└── 任何可被注入的 class

## 中间件 / 管道层（请求处理链）

客户端请求
    │
    ▼
┌─────────────┐
│  Middleware  │  ← 最早介入，通用预处理（日志、CORS、解析 body）
└──────┬──────┘
       ▼
┌─────────────┐
│   Guard      │  ← 身份认证、权限校验（能不能访问？）
└──────┬──────┘
       ▼
┌─────────────┐
│ Interceptor  │  ← 请求前/后的横切逻辑（转换响应、缓存、日志）
└──────┬──────┘
       ▼
┌─────────────┐
│   Pipe       │  ← 参数验证和转换（数据干不干净？）
└──────┬──────┘
       ▼
┌─────────────┐
│ Controller   │  ← 真正的业务入口
│ → Service    │
└──────┬──────┘
       ▼
┌─────────────┐
│ Exception    │  ← 全局错误处理
│ Filter       │
└──────┬──────┘
       ▼
   响应返回

> 各层职责
┌──────────────┬──────────────────────┬─────────────────────┐
│     层       │     核心问题          │     典型场景         │
├──────────────┼──────────────────────┼─────────────────────┤
│ Middleware   │ 这个请求要不要处理？   │ CORS、Body 解析、   │
│              │                      │ 请求日志            │
├──────────────┼──────────────────────┼─────────────────────┤
│ Guard        │ 你有没有权限？        │ JWT 认证、角色检查、│
│              │                      │ IP 白名单           │
├──────────────┼──────────────────────┼─────────────────────┤
│ Pipe         │ 数据合不合法？        │ 参数验证、类型转换、│
│              │                      │ 默认值填充          │
├──────────────┼──────────────────────┼─────────────────────┤
│ Interceptor  │ 前后能做什么？        │ 响应格式统一、      │
│              │                      │ 缓存、超时、日志    │
├──────────────┼──────────────────────┼─────────────────────┤
│ Exception    │ 出错了怎么办？        │ 统一错误格式、      │
│ Filter       │                      │ 日志记录、告警      │
└──────────────┴──────────────────────┴─────────────────────┘

## 数据层

### ORM 概念（TypeORM / Prisma）

ORM 是什么：
  Object-Relational Mapping
  用面向对象的方式操作数据库

类比：
  SQL:     SELECT * FROM users WHERE id = 1
  ORM:     userRepository.findOne({ where: { id: 1 } })
  Prisma:  prisma.user.findUnique({ where: { id: 1 } })

需要理解的概念：
├── Entity（实体）—— 类 ↔ 数据库表的映射
├── Repository（仓库）—— 封装数据库操作
├── Migration（迁移）—— 数据库结构版本管理
├── Relation（关系）—— 一对一、一对多、多对多
├── Query Builder —— 复杂查询构建
└── Transaction（事务）—— 保证数据一致性

### Entity 关系模型

用户-订单关系示例：

User Entity                    Order Entity
┌──────────────┐              ┌──────────────┐
│ id (PK)      │─── 1:N ─────│ id (PK)      │
│ name         │              │ userId (FK)  │
│ email        │              │ totalAmount  │
│ role         │              │ status       │
│ createdAt    │              │ createdAt    │
└──────────────┘              └──────────────┘

NestJS 中的声明方式：
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}

### 数据库选型

关系型（SQL）：
├── MySQL / PostgreSQL —— 结构化数据、事务、复杂查询
├── 适用：用户、订单、财务等需要强一致性的场景
└── NestJS 生态：TypeORM、Prisma、Sequelize

非关系型（NoSQL）：
├── MongoDB —— 灵活 schema、文档存储
├── 适用：日志、内容管理、配置等 schema 多变的场景
└── NestJS 生态：@nestjs/mongoose

缓存：
├── Redis —— 内存键值存储
├── 适用：Session、Token 黑名单、热点数据缓存
└── NestJS 生态：cache-manager

## 安全认证

### 认证（Authentication）

常见方案：

1. JWT（JSON Web Token）
   ├── 无状态，Token 自带用户信息
   ├── 流程：登录 → 签发 Token → 每次请求带 Token → 验证
   └── NestJS：@nestjs/jwt + Passport.js

2. Session-Cookie
   ├── 有状态，服务端存储 Session
   ├── 流程：登录 → 服务端存 Session → 浏览器存 Cookie → 自动携带
   └── NestJS：express-session

3. OAuth2.0 / 第三方登录
   ├── GitHub、Google、微信等
   └── NestJS：Passport 策略

JWT 流程图：
┌────────┐                    ┌────────┐
│ Client │                    │ Server │
└───┬────┘                    └───┬────┘
    │  POST /auth/login           │
    │  { email, password }        │
    │ ──────────────────────────► │
    │                             │ 验证密码
    │                             │ 生成 JWT
    │  { access_token: "eyJ..." } │
    │ ◄────────────────────────── │
    │                             │
    │  GET /users                 │
    │  Authorization: Bearer eyJ..│
    │ ──────────────────────────► │
    │                             │ 验证 Token
    │                             │ 提取 userId
    │  [用户数据]                  │
    │ ◄────────────────────────── │

### 授权（Authorization）

RBAC（基于角色的访问控制）：

角色 → 权限 → 资源

admin  → [user:create, user:delete, order:*]
editor → [user:read, order:read, order:update]
viewer → [user:read, order:read]

NestJS 实现方式：
├── Guard 检查角色
├── 自定义装饰器 @Roles('admin')
└── 在 Controller 方法上声明


## 通信与实时能力

### HTTP REST API

REST 设计原则：
├── 资源导向：URL 表示资源（/users, /orders）
├── HTTP 方法表示操作（GET/POST/PATCH/DELETE）
├── 状态码表示结果（200/201/400/401/404/500）
└── 无状态：每次请求自包含所有信息

NestJS 映射：
@Controller('users')
class UserController {
  @Get()           → GET    /users
  @Get(':id')      → GET    /users/123
  @Post()          → POST   /users
  @Patch(':id')    → PATCH  /users/123
  @Delete(':id')   → DELETE /users/123
}

### 微服务通信

NestJS 支持的传输层：

┌─────────────┬──────────────────────────────────────┐
│   传输方式   │   适用场景                            │
├─────────────┼──────────────────────────────────────┤
│ TCP         │ 服务间内部通信，高性能                  │
│ Redis       │ 发布/订阅模式，事件驱动                 │
│ NATS        │ 轻量级消息队列                        │
│ RabbitMQ    │ 可靠消息队列，复杂路由                  │
│ Kafka       │ 高吞吐事件流，大数据场景               │
│ gRPC        │ 高性能 RPC，跨语言                    │
│ MQTT        │ IoT 场景                             │
│ WebSocket   │ 实时双向通信                          │
└─────────────┴──────────────────────────────────────┘

消息模式：
├── 请求-响应（Request-Response）—— 同步调用
├── 事件驱动（Event-Based）—— 发布/订阅，异步
└── 消息队列（Message Pattern）—— 异步任务处理

### WebSocket / SSE

场景对比：

SSE（Server-Sent Events）：
├── 单向：服务器 → 客户端
├── 适合：AI 流式输出、通知推送、实时数据更新
├── 基于 HTTP，简单可靠
└── NestJS：@Sse() 装饰器

WebSocket：
├── 双向：服务器 ↔ 客户端
├── 适合：聊天室、协同编辑、实时游戏
├── 独立协议，需要握手
└── NestJS：@nestjs/websockets + Gateway

选型决策：
  只需推送？ → SSE
  需要双向？ → WebSocket
  AI 对话流？ → SSE（足够且更简单）

## 架构

### 微服务架构

单体应用 vs 微服务：

单体：
┌──────────────────────────┐
│  用户 + 订单 + 支付 + ... │  ← 一个部署单元
└──────────────────────────┘

微服务：
┌──────┐ ┌──────┐ ┌──────┐
│ 用户 │ │ 订单 │ │ 支付 │  ← 各自独立部署
└──┬───┘ └──┬───┘ └──┬───┘
   └────────┼────────┘
        消息总线 / API 网关

NestJS 天然支持：
├── 单体内用 Module 划分领域
├── 需要拆分时，Module 可平滑迁移为独立微服务
└── 统一的编程模型，切换传输层即可

### Monorepo vs 多仓库

NestJS 的 Monorepo 模式：

my-project/
├── apps/
│   ├── api/          ← 主 API 服务
│   ├── admin/        ← 后台管理服务
│   └── gateway/      ← API 网关
├── libs/
│   ├── common/       ← 共享模块
│   ├── user/         ← 用户领域模块
│   └── order/        ← 订单领域模块
└── nest-cli.json

好处：
├── 代码共享方便
├── 统一版本管理
├── 跨项目重构容易
└── NestJS CLI 原生支持

## 部署

部署知识：
├── Docker 容器化
│   ├── Dockerfile 编写（多阶段构建）
│   ├── docker-compose 编排（API + DB + Redis）
│   └── 镜像优化（减小体积）
│
├── 环境管理
│   ├── .env 文件（开发）
│   ├── ConfigModule（运行时读取）
│   └── 区分 dev / staging / prod
│
├── 反向代理
│   ├── Nginx 配置（SSL、负载均衡、静态文件）
│   └── 关闭 proxy_buffering（SSE 场景）
│
├── 进程管理
│   ├── PM2 守护进程
│   ├── 集群模式（利用多核 CPU）
│   └── 优雅关闭（Graceful Shutdown）
│
└── 监控
    ├── 日志（nest(Logger)、Winston）
    ├── 健康检查（@nestjs/terminus）
    └── APM（链路追踪、性能监控）
