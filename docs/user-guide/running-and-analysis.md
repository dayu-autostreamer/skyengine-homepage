---
title: Operation and analysis
sidebar_position: 2
---

After [installation](../getting-started/installation.md), select a containerized factory in the digital workshop.

## Run a factory

1. Select and upload a factory configuration.
2. Choose process scheduling, path planning, and task assignment algorithms.
3. Set failure presets, processing-time variation, and the simulation step limit.
4. Start execution and observe vehicle movement, machine processing, job progress, and events.
5. Stop the run when appropriate.

Some configuration controls are locked during execution. See [factory configuration](factory-configuration.md) for material stations, buffers, and completion semantics. A job is complete only after unloading at its finished-goods destination.

Generated configurations place machines, vehicles, and stations in one connected region. Startup and execution failures are reported in the interface. Failed startup restores the start control; a timed-out startup request continues checking simulation state.

## Metrics and logs

Analysis, metrics, and logs share a panel with a persistent tab bar and independent scrolling. Switching tabs preserves collected state, metrics, and logs.

The live dashboard shows machine, vehicle, and job metrics and exports a session as JSON. Offline analysis includes an archive list, run summaries, time-series charts, and event details. Import the JSON exported by the platform, including `frames`, `metricsTimeline`, and `events`. An opened archive can be reviewed and exported again.

The batch panel accepts algorithm combinations, seeds, and FJSP/MAPF instances. Review the generated experiment count before submitting. For training, parameter exploration, and dataset-level comparisons, use the [experiment workbench](../experiments/platform.md).

## Batch GPU configuration

The batch engine, MAPF, and FJSP containers default to sharing host GPU 0. On a multi-GPU host, assign GPU IDs or UUIDs in the project `.env`, for example:

```dotenv
SKYENGINE_BATCH_ENGINE_GPU_ID=0
SKYENGINE_BATCH_MAPF_GPU_ID=1
SKYENGINE_BATCH_FJSP_GPU_ID=0
```

The example requires at least two GPUs. IDs follow host `nvidia-smi` output. Each container receives one selected device and uses `cuda:0` internally. Services sharing a device also share its memory and compute.

This configuration applies to batch containers, **not the PPO training device**, which is selected in the training interface. The batch workflow requires an NVIDIA GPU and container GPU support. Finish current batch jobs before changing the configuration; changes apply to the next batch startup.

## Non-grid factories

PacketFactory uses configuration sets. Select the environment and algorithm, upload `map_config.yaml`, `job_config.yaml`, and `event_config.yaml`, then choose the configuration set to run. This format differs from the JSON configurations used by the containerized grid factory.
