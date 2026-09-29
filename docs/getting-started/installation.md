---
title: Quick start
sidebar_position: 1
description: Prepare the required repositories, install SkyEngine, and start the platform.
---

This guide covers **deployment on Linux with Docker Compose**, including the platform, frontend, and simulation engines. External scheduling components have separate prerequisites.

## 1. Prepare the environment

- Git, Docker Engine, and a working Docker daemon.
- Docker Compose v2, or a compatible `docker-compose` installation.
- At least 8 GB of available memory and sufficient disk space.
- For GPU components: an NVIDIA driver and NVIDIA Container Toolkit.

The platform and the MA + PIBT test/tuning workflow support CPU operation. **CTDE-PPO pipeline training requires CUDA**; the platform's CPU fallback is not a guarantee that every algorithm can train without a GPU. The batch container workflow also has its own [GPU requirements](../user-guide/running-and-analysis.md#batch-gpu-configuration).

## 2. Prepare sibling repositories

```bash
mkdir skyengine-workspace
cd skyengine-workspace
git clone https://github.com/dayu-autostreamer/skyengine.git
git clone https://github.com/skyrimforest/SkyEngine-FJSP.git
git clone https://github.com/skyrimforest/SkyEngine-MAPF.git
```

Obtain `skyengine-DFJSPT` from the project's delivery package or an authorized repository supplied by the maintainers. Place it next to `skyengine`, with that exact lowercase directory name:

```text
skyengine-workspace/
├── skyengine/
├── skyengine-DFJSPT/
│   └── dfjsp_t_rl/__init__.py
├── SkyEngine-FJSP/
└── SkyEngine-MAPF/
```

:::important Installation prerequisite
The current `install.sh` checks for `skyengine-DFJSPT/dfjsp_t_rl/__init__.py` before building. A clone of the public `skyengine` repository alone is not sufficient for this installation workflow. [Contact the maintainers](/community/support/#project-contact) if the delivery is unavailable.
:::

## 3. Build the algorithm images

From `skyengine-workspace`:

```bash
cd SkyEngine-FJSP
docker compose build
cd ../SkyEngine-MAPF
docker compose build
```

Follow the respective repositories for model weights, GPU requirements, and image names. DFJSP-T is a Python package mounted into the backend, not another algorithm image to build in this step.

## 4. Install and start

From `SkyEngine-MAPF`:

```bash
cd ../skyengine
./install.sh
./start.sh
```

Installation checks the environment, prepares directories and `.env`, updates dataset template digests, builds images, and probes CUDA availability inside the backend image. If you move the project directory, run `./install.sh` again to update host paths before starting.

Use the addresses printed by `start.sh`. Occupied host ports are automatically replaced by available ports.

| Service | Default address |
| --- | --- |
| Frontend | `http://localhost:5180` |
| Backend API | `http://localhost:8233` |
| Online engine | `http://localhost:8080` |

## 5. Check the services

```bash
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs --tail 100 backend frontend
docker compose -p skyengine-online -f docker-compose-online.yaml logs --tail 100 engine
```

Open the printed frontend address. Select a containerized factory for an initial run, or open `/training` **under the frontend address** for the algorithm experiment workbench.

## Compute mode

Set `SKYENGINE_GPU_MODE` in `.env`:

| Value | Behavior |
| --- | --- |
| `auto` | Use backend CUDA when the container probe succeeds; otherwise CPU |
| `cuda` | Require an NVIDIA GPU accessible to Docker and backend PyTorch |
| `cpu` | Do not request GPU access for the backend |

PPO currently uses one selected GPU; entering multiple GPU IDs does not enable multi-GPU training. Sampling and validation use CPU resources.

Rebuilding or restarting the backend interrupts active experiments. Stop or finish those runs before applying dependency, Dockerfile, or GPU changes.

## Stop the platform

```bash
./stop.sh
```

The script stops platform, online-engine, and batch-engine Compose projects. It does not delete images, datasets, or logs.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Missing DFJSP-T directory | Verify the sibling name and `dfjsp_t_rl/__init__.py` |
| `SKYENGINE_DOCKER_HOST_DIR not set` | Run `./install.sh` from the current project location |
| Address differs from the default | Read `start.sh` output and the port values in `.env` |
| Algorithm image not found | Build the external algorithm repositories and check image tags |
| Services fail to start | Inspect the three log commands above |
| OpenCV / libGL error during sampling | Update dependencies and rebuild the backend using the project's dependency lockfile |

Continue with [operation and analysis](../user-guide/running-and-analysis.md) or the [experiment workbench](../experiments/platform.md).
