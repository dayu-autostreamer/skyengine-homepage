---
title: Welcome to SkyEngine
sidebar_label: Overview
sidebar_position: 0
slug: /
description: A shared environment for manufacturing simulation, scheduling, and algorithm experiments.
---

**SkyEngine (天工)** is an open platform for flexible manufacturing simulation and scheduling. It connects processing operations, material transport, machines, and automated guided vehicles (AGVs) in one factory environment.

Use it to examine a practical question: **how does a scheduling decision behave when processing, transport, resource contention, and disturbances all matter?**

## What you can do

| Goal | Start here |
| --- | --- |
| Understand the platform and its components | [System architecture](introduction/architecture.md) |
| Install and start the services | [Quick start](getting-started/installation.md) |
| Configure material stations, buffers, and variation | [Factory configuration](user-guide/factory-configuration.md) |
| Run a factory and inspect its results | [Operation and analysis](user-guide/running-and-analysis.md) |
| Train, tune, test, and compare algorithms | [Experiment workbench](experiments/platform.md) |
| Configure a joint scheduling model | [Joint scheduling](experiments/joint-scheduling.md) |

## One platform, distinct responsibilities

- **The platform** organizes runs, presents observations, and manages experiments and results.
- **The factory** advances the simulation and enforces processing, transport, and resource constraints.
- **The algorithms** turn observations into scheduling, assignment, and routing decisions.

Grid factories support joint research on processing and multi-vehicle transport. PacketFactory provides a non-grid environment with its own configuration format. StaticFactory supports demonstrations and interface development. These environments do not share every configuration field or runtime behavior.

## Read the documentation progressively

Start with installation and a single factory run. Continue to experiments when you need training or dataset comparisons, and to the developer guide when you need to change the system.

[Source code](https://github.com/dayu-autostreamer/skyengine) · [Join the community](/community/)
