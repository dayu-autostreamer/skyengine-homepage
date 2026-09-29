---
title: Factory configuration
sidebar_position: 1
---

The grid factory uses a square grid. At each step, an AGV can wait or move to an adjacent traversable cell in one of four directions. Vehicles cannot occupy the same cell or swap positions head-on.

## Material stations and buffers

Configure source and destination stations, loading and unloading dwell times, and machine buffer capacity in the instance:

```json
{
  "material_handling_config": {
    "raw_material_source": [0, 0],
    "finished_goods_destination": [19, 19],
    "pickup_dwell_steps": 2,
    "dropoff_dwell_steps": 2,
    "buffer_capacity": 4,
    "machine_buffer_capacities": {"0": 2}
  }
}
```

Replace example coordinates with valid positions in your map. Machines, initial vehicle positions, and material stations must be connected by traversable paths. Individual jobs can override `raw_material_source` and `finished_goods_destination`.

When stations are omitted, the factory uses the first and last traversable non-machine cells in coordinate order within the region connected to machines and vehicles. Dataset-generated layouts place equipment and stations in a connected region.

The default buffer capacity is 4, counting both jobs waiting for processing and jobs waiting for collection. When a buffer is full, the unloading vehicle retains its load and waits. Routing may move it aside to allow another vehicle to collect a finished part; vehicles stay still during actual loading and unloading. A machine remains occupied if a processed part cannot be stored. Consecutive operations at the same location can proceed without AGV transport.

**A job completes after final delivery and unloading.** Completion time includes initial supply, processing, inter-operation transport, waiting, and final transport.

## Random variation

The instance `seed` supplies the default episode seed. The same instance, seed, and action sequence reproduce the same process. A different episode seed changes processing and failure realizations.

| `processing_time_config.preset` | Processing multiplier |
| --- | --- |
| `none` | No processing-time variation |
| `mild_variance` | 0.9–1.1 |
| `moderate_variance` | 0.8–1.2 |
| `high_variance` | 0.6–1.4 |

The varying presets preserve nominal mean processing time. Configure failures through `exception_config`.

Runtime state exposes nominal processing time, completed work, estimated remaining work, and downtime. Actual duration becomes available after processing finishes. A failed vehicle remains in place with its load and resumes transport after repair.

Temporary obstacles affect ordinary traversable road cells. They do not appear on machine cells or currently occupied vehicle cells; this applies to both explicit and randomly generated obstacles.
