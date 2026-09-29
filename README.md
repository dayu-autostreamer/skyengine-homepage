# SkyEngine · 天工文档站

天工柔性制造仿真与调度平台的主页与文档仓库。基于 Docusaurus 3，提供英文与简体中文文档、博客、独立社区侧栏、明暗主题和品牌资源。

默认语言为英文，中文通过导航中的语言菜单切换。

系统源码：[dayu-autostreamer/skyengine](https://github.com/dayu-autostreamer/skyengine)。

## 本地开发

使用 Node.js 22 或更新版本和 npm：

```bash
npm ci
npm start
# 中文开发预览（开发服务器每次只服务一种语言）
npm run start:zh
```

生产构建同时生成两种语言，使用预览服务检查跨语言跳转：

```bash
npm run check
npm run serve -- --port 3000
```

默认入口：`http://localhost:3000/skyengine-homepage/`，中文入口：`http://localhost:3000/skyengine-homepage/zh/`。

`check` 验证中英文文档和社区目录、成员职责与博客署名、品牌资源的一致性，构建两种语言，并检查页面链接、资源、锚点、社区独立侧栏和旧地址跳转。`npm run brand` 可重新生成全部 Logo、favicon 与分享图；构建直接使用仓库内的资源，无需每次重新生成。

## 目录架构

```text
docs/                              英文文档（唯一滚动文档集）
  overview.md                      文档入口 /docs/
  introduction/                    项目介绍与系统架构
  getting-started/                  安装启动
  user-guide/                      工厂配置、运行与分析
  experiments/                     算法实验与联合调度
  developer-guide/                 开发指南与算法扩展
  reference/                       API 与配置参考
  case-studies/                    应用案例
community/                         社区概览、贡献、成员、治理与联系
blog/                              博客内容、作者、标签
i18n/zh/                           中文文档与主题翻译
src/pages/                         首页与品牌资源页
src/components/                    首页功能区、社区、博客与双语组件
src/data/                          双语成员资料与职责
src/theme/                         导航版本菜单
src/css/                           全局主题
static/img/                        SVG、透明 PNG、favicon、分享图
static/brand/                      品牌资源清单
assets/brand/                      Logo 字体源文件与许可证
scripts/                           资源生成、内容及构建检查
plugins/                           社区旧地址跳转
maintainers/                       站点架构与维护说明
.github/                           构建、部署与协作模板
```

技术文档和社区使用独立的 Docusaurus 文档插件，分别由 `sidebars.js` 与 `sidebarsCommunity.js` 定义侧栏。社区入口为 `/community/`，内容独立于技术文档版本维护。旧 `/docs/community/` 地址自动跳转，并保留查询参数和章节定位。

技术文档的版本菜单位于语言菜单左侧，文档集为 `Current`（中文“当前文档”）。`src/theme/NavbarItem/DocsVersionDropdownNavbarItem/` 读取实际版本元数据，单一文档集也使用下拉菜单；社区页面隐藏技术文档版本菜单。

## 更新内容

1. 在 `docs/` 中新增或修改英文文档。
2. 在 `i18n/zh/docusaurus-plugin-content-docs/current/` 的相同路径维护中文版本。
3. `_category_.json` 控制目录顺序和折叠；文件 frontmatter 控制标题和文档顺序。新增分组后执行 `npm run write-translations -- --locale zh`，翻译 `i18n/zh/docusaurus-plugin-content-docs/current.json` 中对应的侧栏分类标题。
4. 首页、品牌页等 React 文案通过 `useLocaleText()` 成对维护；导航和页脚使用 Docusaurus 翻译 JSON。
5. 确认技术说明与系统行为一致，并运行 `npm run check`。

社区英文页面位于 `community/`，中文页面位于 `i18n/zh/docusaurus-plugin-content-docs-community/current/`。成员姓名、主页、职责和联系信息在 `src/data/community.json` 中维护，并与两种语言的 `authors.yml` 同步；内容检查会验证成员姓名、主页和职务的一致性。

## 发布博客

新增 `blog/YYYY-MM-DD-topic/index.md` 或 `index.mdx`，配置 `title`、`authors`、`tags`，并使用 `<!-- truncate -->` 划分摘要。作者 ID 从 `blog/authors.yml` 中选择，标签在 `blog/tags.yml` 中定义。在 `i18n/zh/docusaurus-plugin-content-blog/` 下创建相同路径的中文版本，并同步维护作者与标签翻译。

博客使用 Docusaurus 原生文章列表、文章页、作者页和标签页，并提供 RSS 与 Atom 订阅。

## GitHub Pages

默认发布地址为 `https://dayu-autostreamer.github.io/skyengine-homepage/`。将仓库 Settings → Pages → Source 设置为 **GitHub Actions** 后，`main` 分支更新会在检查通过后部署；PR 只构建检查。也可手动触发工作流。

独立域名可用 `SITE_URL` 和 `BASE_URL` 覆盖默认配置，例如：

```bash
SITE_URL=https://docs.example.org BASE_URL=/ npm run check
```

使用独立域名时，同步配置域名、DNS 及 Pages 设置。

## 品牌资源

打开 `/brand/` 查看、下载独立图标、字标、横版和竖版组合，每种都有彩色、白色 SVG 与透明 PNG。SVG 字体已转路径，可独立用于网站、论文和演示。图标将“工”字、开放运输环路和工件节点结合；色板见 `static/brand/manifest.json`。

站点架构与维护说明见 [maintainers/architecture.md](maintainers/architecture.md)。许可证及第三方说明见 `LICENSE`、`NOTICE` 和 `assets/brand/OFL.txt`。
