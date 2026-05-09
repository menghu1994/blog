---
layout: post
title: AI 安装
index_txt: AI
categories:
 - AI
tags: ['AI']
---

# AI 安装

AI 工具的安装方式大概分四类：网页直接用、桌面客户端、IDE 插件、命令行工具。小白建议从网页和 IDE 插件开始，熟悉后再用命令行和本地 Agent。

## 安装前准备

建议先准备：

1. 一个稳定邮箱。
2. 能正常访问官网的网络环境。
3. Node.js，安装命令行 AI 常用。
4. Git，代码项目建议必须有。
5. 一个测试项目，不要直接拿重要项目练手。

检查 Node.js：

```bash
node -v
npm -v
```

检查 Git：

```bash
git --version
```

如果没有 Node.js，可以去官网安装 LTS 版本：https://nodejs.org/

## 网页版 AI

这是最适合小白的方式。

常见入口：

1. ChatGPT：https://chatgpt.com/
2. Claude：https://claude.ai/
3. Gemini：https://gemini.google.com/
4. Perplexity：https://www.perplexity.ai/
5. Kimi：https://www.kimi.com/

使用方式：

1. 打开官网。
2. 注册或登录账号。
3. 选择模型或模式。
4. 直接输入问题。

优点是不用安装，缺点是不能像命令行 Agent 那样直接操作本地项目。

## 桌面客户端

桌面客户端适合长期使用，体验比浏览器更稳定。

安装建议：

1. 只从官网下载。
2. 不要下载来路不明的“破解版”“共享版”“成品号客户端”。
3. 第一次登录后检查隐私设置、数据训练设置、文件上传设置。

常见客户端：

1. ChatGPT 桌面端。
2. Claude 桌面端。
3. Cursor。
4. OpenClaw / 小龙虾类本地 Agent。

## IDE 插件安装

IDE 插件适合写代码。它通常在 VS Code、JetBrains、Visual Studio 等编辑器里使用。

### VS Code 安装插件

通用步骤：

1. 打开 VS Code。
2. 点击左侧 Extensions。
3. 搜索插件名称。
4. 确认发布者是否官方。
5. 点击 Install。
6. 登录账号或配置 API Key。

常见插件：

| 插件 | 适合 |
| --- | --- |
| GitHub Copilot | 代码补全、聊天、代码解释 |
| Continue | 接入多种模型，自定义程度高 |
| Cline / Roo Code | Agent 式改代码 |
| Codeium / Windsurf | 编码辅助 |

安装插件时一定要看发布者。AI 插件通常会读取代码内容，不要安装仿冒插件。

### JetBrains 安装插件

通用步骤：

1. 打开 Settings。
2. 进入 Plugins。
3. 搜索插件名称。
4. 安装后重启 IDE。
5. 登录账号或配置 Key。

适合 JetBrains 的工具：

1. GitHub Copilot。
2. JetBrains AI。
3. Continue。
4. Codeium。

## Cursor 安装

Cursor 是一个 AI 代码编辑器，使用体验接近 VS Code。

安装步骤：

1. 打开 https://cursor.com/
2. 点击 Download。
3. 运行安装包。
4. 第一次打开时选择是否导入 VS Code 设置。
5. 登录账号。
6. 打开项目文件夹。

建议设置：

1. 先导入 VS Code 插件和快捷键。
2. 在 Settings 里检查 Privacy。
3. 打开项目后等索引完成。
4. 第一次让 Agent 改代码前，先提交一次 Git。

## 命令行 AI 安装

命令行 AI 适合程序员。它可以在项目目录里读文件、改文件、运行命令。

### OpenAI Codex CLI

安装：

```bash
npm install -g @openai/codex
```

使用：

```bash
cd your-project
codex
```

升级：

```bash
codex --upgrade
```

适合：

1. 修 Bug。
2. 写功能。
3. 解释项目结构。
4. 生成测试。

### Claude Code

安装：

```bash
npm install -g @anthropic-ai/claude-code
```

使用：

```bash
cd your-project
claude
```

适合：

1. 读大型代码库。
2. 分析复杂需求。
3. 多文件重构。
4. 写文档和测试。

### Gemini CLI

安装：

```bash
npm install -g @google/gemini-cli
```

使用：

```bash
cd your-project
gemini
```

也可以不安装，直接用 npx：

```bash
npx https://github.com/google-gemini/gemini-cli
```

适合：

1. Google 生态用户。
2. 长上下文任务。
3. 多模型实验。

## 小龙虾 / OpenClaw 安装

小龙虾通常指 OpenClaw 这类本地优先的个人 AI Agent 平台。它不是单一模型，而是一个能连接模型、插件、消息渠道和本地能力的平台。

适合：

1. 想把 AI 接到飞书、钉钉、企业微信、QQ 等消息工具。
2. 想让 AI 在电脑上执行自动化任务。
3. 想接入 DeepSeek、通义千问、Kimi、Claude、GPT 等不同模型。
4. 想使用 Skill / 插件生态。

安装建议：

1. 优先从 OpenClaw 官方站点或可信开源仓库下载。
2. 如果使用“一键安装助手”，先确认来源和社区口碑。
3. 不要把 API Key 发给陌生人代部署。
4. 不要给不可信插件系统级权限。
5. 第一次运行只接一个测试模型和一个测试渠道。

基本流程：

1. 下载客户端或部署包。
2. 安装运行环境。
3. 配置模型 API Key。
4. 配置消息入口。
5. 安装需要的 Skill 或插件。
6. 用低风险任务测试，比如“总结一段文本”“提醒我明天看文档”。

| 阶段 | 权限 |
| --- | --- |
| 第一次测试 | 只读、无敏感目录、无支付权限 |
| 熟悉后 | 允许读写指定工作目录 |
| 稳定后 | 接入消息渠道、日历、文件自动化 |
| 生产使用 | 单独账号、单独 API Key、日志审计 |

## API Key 配置

很多工具需要 API Key。它相当于你调用模型的钥匙。

安全建议：

1. 不要把 Key 写进公开代码仓库。
2. 不要截图发给别人。
3. 每个工具尽量用单独 Key。
4. 发现泄露马上删除并重建。
5. 给 Key 设置预算或额度上限。

常见配置方式：

```bash
export OPENAI_API_KEY="你的 key"
export ANTHROPIC_API_KEY="你的 key"
export GEMINI_API_KEY="你的 key"
```

Windows PowerShell：

```powershell
$env:OPENAI_API_KEY="你的 key"
$env:ANTHROPIC_API_KEY="你的 key"
$env:GEMINI_API_KEY="你的 key"
```

如果要长期保存，建议用系统环境变量或工具自己的配置页面，不要直接写在脚本里。

## 安装后第一件事

无论安装哪个 AI 工具，第一件事都不是让它改大项目，而是做小测试。

测试清单：

1. 问它当前项目是什么。
2. 让它只读文件并总结，不要修改。
3. 让它改一个无关紧要的小文件。
4. 查看 Git diff。
5. 手动确认无误后再扩大任务。

代码项目建议：

```bash
git status
git add .
git commit -m "before ai changes"
```

如果项目还没初始化 Git：

```bash
git init
git add .
git commit -m "init"
```

## 常见问题

### command not found

原因通常是全局 npm 路径不在 PATH。

处理：

```bash
npm config get prefix
```

把输出目录下的可执行文件路径加入 PATH，然后重新打开终端。

### npm 安装失败

常见原因：

1. Node.js 版本太低。
2. 网络连接不稳定。
3. npm 权限问题。
4. 公司网络代理限制。

处理顺序：

1. 升级 Node.js LTS。
2. 换网络或配置代理。
3. 不要随便用管理员权限运行未知安装脚本。
4. 去官方文档查看最新安装方式。

### AI 修改太多文件

处理：

1. 先停下来。
2. 查看 `git diff`。
3. 只保留确认正确的改动。
4. 下次给 AI 更小的范围，比如“只改 src/utils 目录”。

## 参考

1. OpenAI Codex CLI: https://github.com/openai/codex/blob/main/docs/getting-started.md
2. Claude Code Setup: https://docs.anthropic.com/en/docs/claude-code/setup
3. Gemini CLI: https://google-gemini.github.io/gemini-cli/docs/get-started/
4. Cursor Installation: https://docs.cursor.com/en/get-started/installation
5. GitHub Copilot Plans: https://github.com/features/copilot/plans
6. OpenClaw 中文版: https://www.openclawch.com/
