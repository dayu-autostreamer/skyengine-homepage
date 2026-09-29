---
title: Joint scheduling training
sidebar_position: 2
---

Select the DFJSP-T graph policy and rolling joint scheduling in the experiment workbench. Models produced by training can be used for testing and factory replay.

The training and parameter-exploration templates use `ctde_ppo` version `0.3.0`. Existing experiment definitions do not automatically adopt new templates. After upgrading the system, reload a template or reselect the algorithm and review parameters.

## What the model decides

The policy uses jobs, machines, vehicles, roads, and current disturbances to select joint production and transport plans. It replans when events change or a decision interval is reached, while updating traffic routes.

Built-in PIBT executes vehicle movement. Training and model testing do not require an additional MAPF algorithm. Existing transport commitments continue while candidate search runs. Domain router and assigner options apply to rule algorithms that only output production dispatch.

Material stations prefer explicit `material_handling_config` entries, then `topology.depot` and `topology.product`. Otherwise, connected traversable non-machine cells supply defaults. Stations, machines, and AGVs must belong to one four-neighbor connected region. Every AGV must have a distinct initial position.

## Parameters

| Parameter | Default | Purpose |
| --- | --- | --- |
| `candidate_limit` | 24 | Maximum candidate plans per planning round |
| `scenario_count` | 8 | Predicted uncertainty scenarios used to compare plans |
| `routing_horizon` | 24 | Traffic prediction horizon in steps |
| `decision_interval` | 5 | Replanning check interval during steady operation |
| `search_seconds` | 0 | 0 uses the normal incremental budget; positive values further limit per-step search time |
| `inference_budget_ms` | 300 | Policy inference budget per simulation step; search can span steps |
| `sequence_length` | 32 | Consecutive decision sequence length used for learning |
| `graph_batch_size` | 16 | Graphs encoded together; independent of PPO minibatch size |
| `input_cache_mb` | 256 | Graph-input cache cap in MiB; 0 disables it |
| `num_envs` | 4 | Concurrent sampling environments |
| `dynamic_sampling` | false | Dynamically assign episodes, discard incomplete ones at synchronization, and prioritize their restart |
| `evaluation_num_envs` | 2 | Concurrent validation episodes |
| `device` | auto | CUDA device for network training, such as `cuda:0` |

More candidates and scenarios can increase the steps needed to complete a planning round. The algorithm can commit an evaluated plan and continue improving while vehicles follow valid routes. Time budgets depend on machine load; use recorded actions for exact playback.

Training progress and save intervals count simulation steps, while learning samples correspond to scheduling decisions. `planning_decisions` records decisions. `inference_seconds`, `inference_max_seconds`, and `inference_over_budget_steps` record total inference duration, maximum per-step duration, and over-budget steps.

## Sampling, updates, and validation

Sampling and validation use separate CPU cores; network training uses GPU. After the first sampling batch, the next sampling batch overlaps the previous batch's update. Both complete before synchronization. Each batch uses fixed policy weights; data is at most one update behind when training starts.

With dynamic sampling disabled, each worker finishes one episode per round. Enabled workers take more instances while waiting for others; synchronization discards incomplete episodes and prioritizes restarting their original instance/seed next round. Step-limited episodes count as ended, not necessarily completed factories.

Monitoring shows sampling, training, and validation independently. Training updates report epochs, minibatches, optimizer updates, and elapsed time at computation-block boundaries. Synchronization records show retained/discarded trajectories and waiting time.

Graph batching and input caching reduce update overhead. Larger batches increase intermediate GPU-memory use. The input cache excludes model outputs and is released after each update batch; its cap does not bound all training memory. Evicted graph inputs must be prepared again.

Model selection uses frozen models independently of sampling/training synchronization. Validation is scheduled after the first network update, when trained-episode counts cross the interval, and at completion. For an interval of 100 and cumulative counts 29, 50, 72, 97, 126, models after updates 1 and 5 are evaluated. Pending evaluations finish before the final best model is published.

## Models and results

Model files use format 4; older model formats require retraining. Candidate plans must respect buffer capacity and material flow. The network selects executable plans. Healthy vehicles retain committed deliveries; failed unloaded vehicles may be reassigned. Existing urgent-order, reservation, preemption, and failure mechanisms remain active.

When testing a model, inspect completion rate, makespan, reassignment scale, and decision latency. Tail completion-time statistics include a completed-episode count; interpret them together with completion rate.

Keep training, validation, and final benchmarks separate. Final benchmark data must not select models or tune parameters. See the [experiment workbench](platform.md) for checkpoints, continued training, tests, and replay.
