---
title: 欢迎使用天工
sidebar_label: 项目概览
sidebar_position: 0
slug: /
description: 面向柔性制造仿真、调度研究与算法实验的共同环境。
---

**SkyEngine（天工）** 是面向柔性制造系统的开源仿真与调度平台。它将工序加工、物料运输、机器与自动导引运输车（AGV）放在同一工厂环境中。

天工希望回答一个具体问题：**当加工、运输、资源竞争与动态扰动共同影响生产时，一个调度决策会如何执行？**

## 你可以做什么

| 使用目标 | 阅读入口 |
| --- | --- |
| 理解平台和各组件的职责 | [系统架构](introduction/architecture.md) |
| 安装并启动平台 | [快速开始](getting-started/installation.md) |
| 配置物料站、缓冲和随机波动 | [工厂仿真配置](user-guide/factory-configuration.md) |
| 运行工厂并分析结果 | [运行与日志分析](user-guide/running-and-analysis.md) |
| 训练、调优、测试和比较算法 | [算法实验工作台](experiments/platform.md) |
| 设置联合调度模型参数 | [联合调度训练](experiments/joint-scheduling.md) |

## 同一平台，清晰分工

- **平台**组织运行、展示观测，并管理实验与结果。
- **工厂**推进仿真，实施加工、运输与资源约束。
- **算法**根据观测，产生工序调度、任务分配和路径规划决策。

网格工厂用于加工与多车运输的联合研究；PacketFactory 提供非网格环境和独立配置方式；StaticFactory 用于场景展示与界面开发。不同环境并不共享全部配置字段与运行语义。

## 循序阅读

先完成安装与一次工厂运行，再根据需要进入算法实验或开发指南。

[项目源码](https://github.com/dayu-autostreamer/skyengine) · [参与社区](/community/)
