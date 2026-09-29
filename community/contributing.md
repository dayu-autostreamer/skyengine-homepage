---
title: Contributing
sidebar_label: Contributing
slug: /contributing
description: Contribute code, factory scenarios, experiments, documentation, translations, and reviews to SkyEngine.
---

Start with a problem or improvement you can describe and verify. Contributions from researchers, engineers, users, and independent developers are welcome.

## What to contribute {#what-to-contribute}

- **Simulation and scenarios:** improve factory configuration, material handling, resource constraints, disturbances, or examples.
- **Scheduling and experiments:** improve process scheduling, task assignment, routing, joint policies, or reproducible algorithm comparisons.
- **Platform and analysis:** improve the interface, experiment workflow, monitoring, logs, or replay.
- **Documentation and translation:** clarify instructions, fix links, improve English and Chinese content, or write a project update.
- **Feedback and review:** reproduce issues, check examples, review proposals, and help other users.

## Choose a repository {#choose-a-repository}

| Contribution | Repository and starting point |
| --- | --- |
| Simulation, algorithms, platform services, experiments, and system examples | [SkyEngine system](https://github.com/dayu-autostreamer/skyengine) · [Developer guide](/docs/developer-guide/) |
| Homepage, public documentation, Community, blog, and translations | [SkyEngine website](https://github.com/dayu-autostreamer/skyengine-homepage) |

For changes spanning factory execution and algorithm decisions, start with the [system architecture](/docs/introduction/architecture/). Ask in the relevant issue or use [Support & Contact](./support.mdx) if you need help choosing a component.

## Your first contribution {#first-contribution}

1. Describe the problem and expected result in an issue or pull request, or comment on an existing issue to express interest.
2. Fork the relevant repository and create a focused branch from its default branch.
3. Make the change and update affected examples, documentation, translations, and relevant checks.
4. Open a pull request explaining what changed, why it changed, and how you verified it.
5. Address review feedback and describe any additional validation after revisions.

Discuss changes to shared interfaces or simulation semantics before implementing them so the maintainers can help identify affected components and examples.

## Pull request checklist {#pull-request-expectations}

- Explain the problem, intended behavior, and scope of the change.
- Link related issues and include reproduction steps when fixing a bug.
- Describe checks you ran and any limitations of the validation.
- For simulation or algorithm changes, include relevant factory configuration, seeds, parameters, and comparison results.
- For website changes, update both languages and check navigation, links, and the rendered page.
- Keep unrelated formatting and refactoring separate from the change under review.

## Local documentation setup {#local-documentation-setup}

Use Node.js 22 or newer in the website repository:

```bash
npm ci
npm start
```

To preview Chinese content:

```bash
npm run start:zh
```

The development server serves one language at a time. To check both languages and their links, build and preview the production site:

```bash
npm run check
npm run serve -- --port 3000
```

Open `http://localhost:3000/skyengine-homepage/` or its Chinese entry at `http://localhost:3000/skyengine-homepage/zh/`.

## Documentation workflow {#documentation-workflow}

| Content | English | Chinese |
| --- | --- | --- |
| Technical documentation | `docs/` | `i18n/zh/docusaurus-plugin-content-docs/current/` |
| Community | `community/` | `i18n/zh/docusaurus-plugin-content-docs-community/current/` |
| Blog | `blog/` | `i18n/zh/docusaurus-plugin-content-blog/` |

Maintain matching file paths and update both languages together. Frontmatter controls page titles and metadata. Blog posts use `<!-- truncate -->` to separate their summary from the full article.

Community information is maintained independently of technical documentation versions. Keep installation, configuration, and algorithm instructions in Documentation; use Community for people, participation, and support.

## Commit messages {#commit-messages}

Use a short subject naming the area and change, such as `docs: clarify factory configuration` or `i18n: translate the contribution guide`. Put the reasoning and validation details in the pull request.
