---
title: 参与贡献
sidebar_label: 参与贡献
slug: /contributing
description: 通过代码、工厂场景、实验、文档、翻译与评审参与天工项目。
---

从一项能够说明清楚并验证结果的问题或改进开始。欢迎研究者、工程师、用户和独立开发者参与贡献。

## 可以贡献什么 {#what-to-contribute}

- **仿真与场景：** 改进工厂配置、物料流转、资源约束、动态扰动或示例。
- **调度与实验：** 改进工序调度、任务分配、路径规划、联合策略，或开展可复现的算法比较。
- **平台与分析：** 改进界面、实验流程、监控、日志或回放。
- **文档与翻译：** 讲清操作步骤、修复链接、完善中英文内容，或撰写项目动态。
- **反馈与评审：** 复现问题、验证示例、评审方案并帮助其他用户。

## 选择合适的仓库 {#choose-a-repository}

| 贡献内容 | 仓库与入口 |
| --- | --- |
| 仿真、算法、平台服务、实验与系统示例 | [天工系统仓库](https://github.com/dayu-autostreamer/skyengine) · [开发指南](/docs/developer-guide/) |
| 主页、公开文档、社区、博客与翻译 | [天工网站仓库](https://github.com/dayu-autostreamer/skyengine-homepage) |

涉及工厂执行与算法决策的修改，可先阅读[系统架构](/docs/introduction/architecture/)。不确定对应组件时，可在相关 Issue 中讨论，或通过[支持与联系](./support.mdx)获取帮助。

## 第一份贡献 {#first-contribution}

1. 在 Issue 或 Pull Request 中说明问题与预期结果，也可以在已有 Issue 下表达参与意愿。
2. Fork 对应仓库，从默认分支创建专注于当前任务的分支。
3. 完成修改，同步受影响的示例、文档、翻译及相关检查。
4. 提交 Pull Request，说明改了什么、为什么修改，以及如何验证。
5. 处理评审意见，并在修改后补充验证情况。

涉及共享接口或仿真语义的变更，建议在实现前先讨论，让维护者协助识别受影响的组件和示例。

## Pull Request 检查清单 {#pull-request-expectations}

- 说明问题、预期行为和修改范围。
- 关联相关 Issue；修复问题时附上复现步骤。
- 说明已运行的检查，以及验证范围的限制。
- 修改仿真或算法时，附上相关工厂配置、随机种子、参数和比较结果。
- 修改网站时，同步更新两种语言，检查导航、链接和实际页面。
- 将无关的格式调整或重构与当前修改分开。

## 本地文档环境 {#local-documentation-setup}

在网站仓库中使用 Node.js 22 或更新版本：

```bash
npm ci
npm start
```

预览中文内容：

```bash
npm run start:zh
```

开发服务器每次提供一种语言。检查两种语言及其链接时，请构建并预览生产站点：

```bash
npm run check
npm run serve -- --port 3000
```

访问 `http://localhost:3000/skyengine-homepage/`，中文入口为 `http://localhost:3000/skyengine-homepage/zh/`。

## 文档协作方式 {#documentation-workflow}

| 内容 | 英文 | 中文 |
| --- | --- | --- |
| 技术文档 | `docs/` | `i18n/zh/docusaurus-plugin-content-docs/current/` |
| 社区 | `community/` | `i18n/zh/docusaurus-plugin-content-docs-community/current/` |
| 博客 | `blog/` | `i18n/zh/docusaurus-plugin-content-blog/` |

保持对应文件路径一致，并同步维护两种语言。Frontmatter 控制页面标题与元数据，博客文章使用 `<!-- truncate -->` 划分摘要与正文。

社区信息独立于技术文档版本持续维护。安装、配置和算法操作说明放在文档模块；人员介绍、参与方式和支持渠道放在社区模块。

## 提交信息 {#commit-messages}

使用简短的主题说明修改范围和内容，例如 `docs: clarify factory configuration` 或 `i18n: translate the contribution guide`。修改原因与验证细节写在 Pull Request 中。
