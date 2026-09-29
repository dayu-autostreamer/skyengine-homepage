---
title: Governance
sidebar_label: Governance
slug: /governance
description: Understand SkyEngine's community roles, decisions, maintenance responsibilities, conflict handling, and handovers.
---

SkyEngine was founded by [Dislab](https://dislab.nju.edu.cn/) at [Nanjing University](https://www.nju.edu.cn/). Contributions from academia, industry, and independent developers are welcome.

The community works through open discussion, technical review, and shared responsibility. Roles reflect individual contributions and judgment; institutional affiliation does not automatically grant a role or repository access.

## Who does what? {#roles}

| Role | Responsibility |
| --- | --- |
| Project Chair | Coordinate project direction, community discussions, and research collaboration; help resolve issues that span components or remain unresolved after technical discussion. |
| Maintainer | Maintain technical quality, shared interfaces, compatibility, reviews, release preparation, documentation, and contributor support. |
| Contributor | Contribute code, factory scenarios, scheduling algorithms, experiments, tests, documentation, translations, reviews, or user support. No appointment is needed to participate. |

The [Committee page](./committee.mdx) introduces the Project Chair and Maintainers. The [Contributors page](./contributors.mdx) introduces Contributors and recognizes work across the system and website repositories.

## How are decisions made? {#decisions}

Discuss technical work in the relevant issue or pull request, explain the expected behavior, and seek consensus based on evidence. Record the alternatives considered, the decision, and its reasoning so others can follow the work.

- **Routine changes:** a Maintainer other than the author reviews the change and its validation before merging.
- **Significant changes:** discuss the design before implementation when changing shared interfaces, factory execution semantics, scheduling contracts, experiment results, or compatibility. Include affected examples, validation results, and documentation updates.
- **Unresolved disagreements:** the Project Chair coordinates discussion with the affected Maintainers and Contributors to reach a resolution. Record the outcome in the relevant issue or pull request; technical changes still require Maintainer review.

For simulation and algorithm changes, provide factory instances, random seeds, parameters, and comparable results where relevant. For website changes, keep English and Chinese content aligned. The [pull request checklist](./contributing.md#pull-request-expectations) describes what to include.

## How can I become a Maintainer? {#appointments}

Contributors can express interest in ongoing maintenance or nominate someone whose work they know. Start a discussion with a current Maintainer and describe the contributions, the proposed area of responsibility, and the support needed.

The Project Chair and Maintainers consider sustained contributions, technical and review judgment, collaboration, understanding of the architecture, and willingness to support others. There is no fixed pull request count, employment requirement, or participation period.

Discuss the nomination with people familiar with the candidate's work and address substantive concerns. Once the responsibilities are agreed and accepted by the candidate, record the scope, grant the access needed for that work, and update the community roster and author profiles in both languages. A title alone does not grant repository permissions.

## How are conflicts and conduct concerns handled? {#conflicts}

Keep discussion respectful and focus on behavior, evidence, and proposed improvements. Disclose direct personal conflicts and step back from decisions about your own appointment, removal, or access. Sharing an institution alone is not a conflict of interest.

The Project Chair and Maintainers coordinate conflict handling; anyone directly involved steps back from handling the concern. For sensitive personal or conduct matters, contact an uninvolved [project contact](./support.mdx#project-contact) privately. Share only the information needed to understand the concern, and keep personal information out of public issues.

Record technical decisions and appropriate outcomes publicly while protecting confidential personal details. People affected by a decision can ask an uninvolved Project Chair or Maintainer to review the reasoning and relevant evidence.

## What happens when someone steps back? {#availability}

Members can discuss reduced availability or a change of responsibilities with the Maintainers. Agree on a handover for open reviews, issues, releases, documentation, and any access tied to the work.

Update the roster and repository permissions to match the responsibilities being retained or handed over. Graduation or a change of employer does not automatically end a role. Historical contributions remain recognized on the [Contributors page](./contributors.mdx) and in the repository history.

## Where can I learn more? {#references}

- [Project Chair and Maintainers](./committee.mdx)
- [Contribution workflow and review checklist](./contributing.md)
- [Contributors and acknowledgements](./contributors.mdx)
- [Support and project contacts](./support.mdx)
- [SkyEngine system repository](https://github.com/dayu-autostreamer/skyengine)
- [SkyEngine website repository](https://github.com/dayu-autostreamer/skyengine-homepage)
