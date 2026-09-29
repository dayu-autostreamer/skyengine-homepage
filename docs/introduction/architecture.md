---
title: System architecture
sidebar_position: 1
description: How the interface, platform, simulation, and algorithms work together.
---

SkyEngine separates the **experiment workflow** from **factory execution** and **algorithm decisions**. This lets different algorithms operate in a shared simulation environment.

```text
User interface
Factory management · Live monitoring · Analysis · Experiments
                           │
Platform services
Run control · Experiment orchestration · Models · Results
                           │
Factory simulation
Jobs · Machines · AGVs · Roads · Materials · Disturbances
                           ↕
Algorithm components
Process scheduling · Task assignment · Path planning · Joint policies
```

## Platform and factory lifecycle

The Vue interface talks to a FastAPI backend. Factory proxies provide lifecycle operations such as initialization, start, pause, reset, and cleanup, together with state, metric, and control streams. The backend selects a proxy for the environment being used.

The containerized grid environment uses `DockerProxy` to connect to simulation and algorithm services. PacketFactory uses a separate proxy and configuration flow. Shared lifecycle methods do not make the underlying environments interchangeable.

## Simulation and decisions

In the grid environment, the coordinator connects three responsibilities:

| Component | Responsibility |
| --- | --- |
| Job solver | Decide processing operations and machine assignments |
| Task assigner | Assign transport tasks to vehicles |
| Route solver | Decide vehicle movement on the road network |

Joint scheduling policies can coordinate production and transport together. The DFJSP-T policy includes PIBT for vehicle movement; users do not select an additional MAPF algorithm for its training and model tests.

The factory remains responsible for legal movement, processing progression, buffer capacity, material handoffs, and completion. A final operation finishing is not sufficient: the job completes after delivery and unloading at the finished-goods station.

## Experiments and evidence

The experiment workbench organizes training, parameter exploration, and testing. Models and checkpoints connect training to separate tests. Recorded events, dataset results, and replay help explain what happened during execution.

Use independent training, validation/tuning, and final benchmark datasets. A comparison should keep instances, seeds, disturbances, and simulation limits consistent.

## Repository boundaries

| Repository | Responsibility |
| --- | --- |
| `skyengine` | Platform, frontend, simulation, and experiment infrastructure |
| `SkyEngine-FJSP` | Process scheduling algorithms and HTTP container services |
| `SkyEngine-MAPF` | Multi-agent path planning algorithms and HTTP container services |
| `skyengine-DFJSPT` | The `dfjsp_t_rl` Python package and joint scheduling training components |

Obtain the separate `skyengine-DFJSPT` package from the [project maintainers](/community/support/#project-contact) and prepare it before installation.
