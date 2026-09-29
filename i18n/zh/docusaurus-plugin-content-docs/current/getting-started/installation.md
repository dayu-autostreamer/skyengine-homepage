---
title: 快速开始
sidebar_position: 1
description: 准备依赖仓库，安装并启动天工平台。
---

本指南介绍如何使用 **Linux 与 Docker Compose** 部署平台、前端和仿真引擎；外部调度组件需要分别准备。

## 1. 准备环境

- Git、Docker Engine，以及可用的 Docker daemon。
- Docker Compose v2，或兼容的 `docker-compose`。
- 至少 8 GB 可用内存和足够的磁盘空间。
- 使用 GPU 组件时，需要 NVIDIA 驱动与 NVIDIA Container Toolkit。

平台本身以及 MA + PIBT 的测试、调优流程可以使用 CPU。**CTDE-PPO 流水线训练需要 CUDA**，平台能以 CPU 模式启动不代表全部算法都能在 CPU 上训练。批处理容器也有独立的 [GPU 要求](../user-guide/running-and-analysis.md#批处理-gpu-配置)。

## 2. 准备同级仓库

```bash
mkdir skyengine-workspace
cd skyengine-workspace
git clone https://github.com/dayu-autostreamer/skyengine.git
git clone https://github.com/skyrimforest/SkyEngine-FJSP.git
git clone https://github.com/skyrimforest/SkyEngine-MAPF.git
```

从项目交付包或维护者提供的授权仓库获取 `skyengine-DFJSPT`，放到与 `skyengine` 同级的位置，保留准确的小写目录名：

```text
skyengine-workspace/
├── skyengine/
├── skyengine-DFJSPT/
│   └── dfjsp_t_rl/__init__.py
├── SkyEngine-FJSP/
└── SkyEngine-MAPF/
```

:::important 安装前置条件
当前 `install.sh` 会先检查 `skyengine-DFJSPT/dfjsp_t_rl/__init__.py`。只克隆公开的 `skyengine` 仓库，还不能完成这套安装流程。如果没有交付包，请先[联系维护者](/community/support/#project-contact)。
:::

## 3. 构建算法镜像

在 `skyengine-workspace` 中执行：

```bash
cd SkyEngine-FJSP
docker compose build
cd ../SkyEngine-MAPF
docker compose build
```

模型权重、GPU 要求和镜像名称以各算法仓库说明为准。DFJSP-T 是挂载到后端的 Python 包，此步骤无需为它构建另一个算法镜像。

## 4. 安装与启动

从 `SkyEngine-MAPF` 目录返回平台目录：

```bash
cd ../skyengine
./install.sh
./start.sh
```

安装脚本检查环境，准备目录和 `.env`，更新数据集模板摘要，构建镜像，并在后端镜像内探测 CUDA。移动项目目录后，先重新执行 `./install.sh`，更新宿主机路径，再启动。

访问地址以 `start.sh` 最后输出为准。默认宿主机端口被占用时，脚本会自动选择后续可用端口。

| 服务 | 默认地址 |
| --- | --- |
| 前端 | `http://localhost:5180` |
| 后端 API | `http://localhost:8233` |
| 在线引擎 | `http://localhost:8080` |

## 5. 检查服务

```bash
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs --tail 100 backend frontend
docker compose -p skyengine-online -f docker-compose-online.yaml logs --tail 100 engine
```

打开脚本输出的前端地址，选择容器化工厂开始一次运行，或在**前端地址下**访问 `/training` 进入算法实验工作台。

## 计算模式

在 `.env` 中设置 `SKYENGINE_GPU_MODE`：

| 值 | 行为 |
| --- | --- |
| `auto` | 容器探测成功时使用后端 CUDA，否则使用 CPU |
| `cuda` | 必须具有 Docker 和后端 PyTorch 可访问的 NVIDIA GPU |
| `cpu` | 不为后端请求 GPU |

当前 PPO 使用所选的一张 GPU，输入多个卡号不会启用多卡训练。采样与验证使用 CPU 资源。

重建或重启后端会中断运行中的实验。修改依赖、Dockerfile 或 GPU 配置前，应先完成或停止相关任务。

## 停止平台

```bash
./stop.sh
```

脚本停止平台、在线引擎和批处理引擎的 Compose 项目，不删除镜像、数据集或日志。

## 常见问题

| 问题 | 检查方法 |
| --- | --- |
| 缺少 DFJSP-T 目录 | 检查同级目录名与 `dfjsp_t_rl/__init__.py` |
| `SKYENGINE_DOCKER_HOST_DIR not set` | 在当前项目路径重新执行 `./install.sh` |
| 访问地址与默认值不同 | 查看启动输出与 `.env` 中的端口配置 |
| 算法镜像不存在 | 构建外部算法仓库，并核对镜像标签 |
| 服务启动失败 | 依次检查前面的三条状态和日志命令 |
| 采样时报 OpenCV／libGL 错误 | 更新依赖，按项目的依赖锁文件重建后端镜像 |

接下来阅读[运行与日志分析](../user-guide/running-and-analysis.md)，或进入[算法实验工作台](../experiments/platform.md)。
