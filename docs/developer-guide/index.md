---
title: Developer guide
sidebar_position: 1
---

Start by identifying which part of SkyEngine owns the change. The [SkyEngine source repository](https://github.com/dayu-autostreamer/skyengine) is organized as follows:

| Area | Source entry |
| --- | --- |
| Interface and views | `application/frontend/` |
| Platform APIs | `application/backend/server.py` |
| Factory lifecycle and proxies | `application/backend/core/` |
| Containerized grid simulation | `sky_executor/grid_factory/` |
| PacketFactory environment | `executor/packet_factory/` |
| Experiment infrastructure | `experiment/` |
| Factory examples and datasets | `config/`, `dataset/` |

Factory proxy lifecycle methods, simulation decisions, and experiment plugins belong to different interfaces. An algorithm extension does not automatically require a new factory proxy.

See the [system architecture](../introduction/architecture.md) for the responsibilities of the platform, factory, and algorithm components.
