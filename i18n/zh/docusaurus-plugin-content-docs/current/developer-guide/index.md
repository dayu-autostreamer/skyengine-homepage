---
title: 开发指南
sidebar_position: 1
---

开发前先确定改动由哪一部分负责。[SkyEngine 源码仓库](https://github.com/dayu-autostreamer/skyengine)按以下结构组织：

| 领域 | 源码入口 |
| --- | --- |
| 界面与视图 | `application/frontend/` |
| 平台 API | `application/backend/server.py` |
| 工厂生命周期与代理 | `application/backend/core/` |
| 容器化网格仿真 | `sky_executor/grid_factory/` |
| PacketFactory 环境 | `executor/packet_factory/` |
| 实验基础设施 | `experiment/` |
| 工厂示例与数据集 | `config/`、`dataset/` |

工厂代理的生命周期、仿真决策与实验插件属于不同接口。扩展一个算法，并不必然需要新增工厂代理。

平台、工厂与算法组件的职责划分见[系统架构](../introduction/architecture.md)。
