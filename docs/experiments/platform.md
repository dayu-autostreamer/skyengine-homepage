---
title: Experiment workbench
sidebar_position: 1
---

Select the algorithm experiment workbench in the digital workshop, or open `/training` under the **running SkyEngine frontend address**.

## Define an experiment

Choose a mode, datasets, algorithm, and parameters. Validate the definition, compile the plan, inspect the result, and submit it for execution.

| Mode | Purpose |
| --- | --- |
| Training | Learn model parameters from training data; save models and checkpoints |
| Parameter exploration | Search parameters on a tuning dataset, then evaluate on independent test data |
| Testing | Run a fixed algorithm, parameter set, and optional model on a test dataset |

Training supports CTDE-PPO. Testing defaults to **MA + PIBT joint scheduling with finite buffers**, and can also use trained CTDE-PPO models. Parameter exploration offers grid, random, and genetic search. When changing the target algorithm, review the parameter ranges shown by that algorithm.

MA + PIBT coordinates operations, machines, and vehicles, checks buffer capacity before dispatch, and coordinates vehicle yielding. It uses CPU and requires no training or model. Population size, generations, and local-search steps affect search cost and completeness.

Keep instances, seeds, disturbances, and step limits consistent across algorithms. Read job completion rates alongside completion times.

## Keep datasets separate and current

Training, tuning/model validation, and the final benchmark serve different purposes. **Do not use final benchmark data for training, model selection, or parameter tuning.**

Templates reference current dataset versions. Training can select a separate model-validation dataset. The standard validation setup uses 10 fixed representative instances, covering job counts, operation counts, machines, AGVs, and map sizes; 3 repetitions per instance produce 30 validation episodes. Other validation datasets initially use their first 10 instances, or all instances when fewer exist.

Saved experiments retain their dataset references and validation selection. After a dataset changes, use **Update dataset references**, review instance selections, and compile again. Missing instances must be selected again. Updating references creates a new experiment ID and preserves the original definition and runs. Loading, validation, compilation, and submission check references and reject stale inputs before execution is created.

Changing a validation set affects a new experiment, not training already in progress. You can resume from a checkpoint in a new experiment with another validation selection. Dataset generation is a separate operation: service startup and training do not regenerate data automatically.

The full configuration can be expanded in the interface. Manual configuration changes require a new experiment ID. Parameter fields follow the algorithm's declared order; edits are retained while typing and synchronized on leaving a field. Compilation reports parameter-candidate and execution-unit counts.

## Monitor progress and outputs

Execution monitoring shows states, units, metrics, messages, and output files. CTDE-PPO reports sampling episodes, cumulative simulation steps, compute device, network updates, and model-selection evaluation.

Training metrics include total loss, policy loss, value loss, policy entropy, approximate KL, clip fraction, explained variance, and mean cumulative reward. Curves use cumulative simulation steps. The first point appears after the first update; unrecorded historical metrics remain empty.

Cumulative reward is the sum within an episode, with larger values preferred. KL and clip fraction help assess update size; explained variance helps assess value prediction. Loss reduction alone does not establish convergence: also inspect validation reward, completion rates, and timeouts.

Sampling, network updates, and validation expose separate progress. Update progress includes epoch, minibatch, optimizer-update count, and elapsed time. It refreshes at computation-block boundaries, so a long block can produce a visible delay.

### Event history

The standard event/log panel defaults to the latest 200 events at information level or above. Select another severity level, load earlier pages, or return to the latest events. Step-level sampling, validation, and minibatch details appear at debug level. This filter does not discard training curves, phase progress, or synchronization history.

Switching executions loads the selected history and then incremental events. Polling pauses when the monitoring view or browser is inactive and resumes on return. Checkpoint lists retain their contents while refreshing.

### Compute and parallel sampling

The default is 4 sampling environments. The training-episode budget is the total across environments, not a per-environment count. Reaching the episode step limit ends an episode even if not all jobs completed.

Sampling and validation use CPU cores; network training uses GPU. Validation has a separate parallel-environment count (default 2), distinct from repetitions per instance. Reduce parallelism if CPU resources are limited. CTDE-PPO pipeline training requires CUDA. `device=auto` selects an available GPU; only the first selected GPU is used for training.

Dynamic sampling is off by default. With fixed sampling, each process finishes one episode per synchronization round. With dynamic sampling, idle workers take more instances until every participating worker has completed at least one episode. Incomplete trajectories are stopped at a simulation-step boundary and discarded; their original instance and seed are prioritized for a fresh run in the next round. Finished episodes are retained, so batch episode counts vary.

After the first batch, sampling the next batch overlaps training the preceding batch. Both must finish before the next synchronization round. A sampling batch uses fixed weights; its policy is at most one update behind at training start. The synchronization view shows policy versions, episode ranges, retained/discarded episodes and steps, and waiting time on each side.

Model-selection evaluation runs independently on CPU with frozen models. Slow validation queues do not stop later training. Pending validations finish before publication of the final best model.

`graph_batch_size` defaults to 16 and controls graph encoding per computation batch. `input_cache_mb` defaults to 256 MiB; 0 disables it. Lower either value when GPU memory is constrained. The cache limit excludes model parameters, gradients, and intermediate tensors.

## Cancellation and record management

Cancellation is cooperative. PPO responds after a minibatch update, and sampling/validation at step boundaries. A blocking external solver call may delay cancellation.

Terminal execution records can be removed after background cleanup finishes. The record goes to `trash/execution_records` in the platform data directory. Definitions, logs, checkpoints, and exported models remain; deleting a record is not a disk-space cleanup operation. To restore a record, move its JSON back to `execution_state` in the platform data directory and refresh the list.

## Checkpoints and continued training

Checkpoint intervals count cumulative **simulation steps across all environments**:

- `0`: keep the best checkpoint.
- Positive value: also retain periodic snapshots after the batch update that crosses the interval; at most one periodic checkpoint per batch.

The best PPO checkpoint is selected by mean cumulative validation reward. Without a validation dataset, selection evaluates training data. Selection is scheduled after the first update, when trained episodes cross the validation interval, and at training completion. A batch crossing multiple intervals still evaluates its updated model once.

Checkpoints preserve model weights, trained episode/task counters, cumulative steps, optimizer state, and random state. They do not preserve untrained samples or incomplete environments. Cumulative steps count retained training trajectories; discarded steps are reported separately.

To continue:

1. Open the execution and choose a checkpoint, including from a failed execution if available.
2. Select **Continue training**; no download is required.
3. Set the desired **total** episode count above the number already trained. For example, 1,000 after a 100-episode checkpoint means continuing toward a total of 1,000.
4. Review the device, sampling, and validation settings, then start a new execution. The original execution and checkpoint remain.

With best-only retention, the newest finished training progress may be later than the best saved checkpoint. A service restart requires a new execution resumed from a saved checkpoint.

## Test, compare, and replay

Choose **Use for testing** on an output model or checkpoint, select a test dataset, and submit. Tests use fixed weights. MA + PIBT can also be tested directly and estimates machine recovery from the public repair distribution and elapsed downtime.

The comparison view aggregates results by dataset. Check instance coverage, successful-run counts, completion rate, and makespan together; distinguish incomplete runs from completed ones.

Replay offers three distinct workflows:

| Workflow | Meaning |
| --- | --- |
| Recorded replay | View saved events and factory frames |
| Deterministic reproduction | Run again using saved configuration |
| Snapshot branch | Continue from saved state with another algorithm |

Reproduction and branching require the original data, appropriate algorithms, and any required models to remain available. Time-budgeted decision logic can depend on machine load; use recorded actions when exact playback matters. To inspect a trained model's factory behavior, run a separate test and open its replay.

See [joint scheduling](joint-scheduling.md) for the policy's parameters and execution semantics.
