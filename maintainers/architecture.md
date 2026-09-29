# 站点架构与维护

## 页面与导航

站点使用 Docusaurus 3.10.2、Classic 主题与 Markdown/MDX。`docusaurus.config.js` 配置站点地址、语言、文档、博客、导航与页脚。

首页由居中首屏、GitHub / Download / Get Started 按钮、波浪分隔和三栏功能介绍组成。导航、文档侧栏与三栏页脚使用 Classic/Infima 布局；首页样式位于 `src/pages/index.module.css`，全局主题位于 `src/css/custom.css`。

| 入口 | 内容位置 | 页面职责 |
| --- | --- | --- |
| `/` | `src/pages/index.jsx` | 平台介绍与主要使用入口 |
| `/docs/` | `docs/` | 安装、使用、实验、开发与参考文档 |
| `/blog/` | `blog/` | 项目动态、文章与订阅 |
| `/community/` | `community/` | 社区概览、参与贡献、成员、治理与联系 |
| `/brand/` | `src/pages/brand.jsx` | 品牌资源展示与下载 |

`sidebars.js` 定义技术文档的 `docsSidebar`，按 `_category_.json` 与 frontmatter 组织目录。社区由 `community` 文档插件独立加载，使用 `sidebarsCommunity.js` 中的 `communitySidebar`，顺序为概览、参与贡献、社区委员会、社区治理、贡献者与致谢、支持与联系。

技术文档的版本菜单位于语言菜单左侧，文档集为 `Current`（中文“当前文档”）。`src/theme/NavbarItem/DocsVersionDropdownNavbarItem/` 读取 Docusaurus 版本元数据，为单一文档集提供下拉菜单。社区使用独立文档集，并隐藏技术文档版本菜单；语言菜单仍可切换到对应社区页面。

`plugins/community-redirects.js` 为原有 `/docs/community/`、贡献和联系页面提供跳转，保留查询参数，并将联系人定位到 `/community/support/#project-contact`。跳转页提供链接、规范地址和 `noindex` 标记，站点地图使用正式社区地址。

## 中英文内容

英文为默认语言，中文页面位于 `/zh/`。文档在以下目录保持相同路径、文件名与目录层级：

- 英文：`docs/`
- 中文：`i18n/zh/docusaurus-plugin-content-docs/current/`

社区在 `community/` 与 `i18n/zh/docusaurus-plugin-content-docs-community/current/` 中成对维护，页面使用相同的显式章节 ID，便于语言切换和链接定位。

`src/data/community.json` 保存项目发起机构，以及成员的双语姓名、职务、单位、主页与联系信息。`CommunityMembers` 和 `CommunityContacts` 渲染双语成员表与联系人，`FoundingCredit` 在首页和社区概览展示南京大学 Dislab 发起信息与参与邀请，`CommunityPaths` 提供社区概览的三栏入口。成员职责和单位与中英文博客作者的 `title` 同步维护。

博客在 `blog/` 与 `i18n/zh/docusaurus-plugin-content-blog/` 中成对维护，作者和标签通过各目录的 YAML 文件配置。文章使用 `<!-- truncate -->` 划分摘要。

首页、功能区和品牌页通过 `useLocaleText()` 维护双语文案。导航和页脚翻译位于 `i18n/zh/docusaurus-theme-classic/`，文档分类标题位于 `i18n/zh/docusaurus-plugin-content-docs/current.json`。

站内导航使用 Docusaurus 的 `Link`，资源地址使用 `useBaseUrl()`，以适配部署子路径和语言路由。

## 主题与品牌资源

主题采用青绿、墨绿、琥珀与素白，支持明暗模式。首页功能插图使用 200 × 200 展示区域，主要响应式断点为 996 px。页面使用系统字体；Logo 使用转为路径的 Manrope 字标。

Logo 包含 icon、text、horizontal、vertical 四种形式，每种提供彩色与白色的 SVG 和透明 PNG。导航使用独立字标，首屏使用横版组合。资源位于 `static/img/`，色板与文件清单位于 `static/brand/manifest.json`。

运行 `npm run brand` 通过 `scripts/generate-brand.mjs` 生成 Logo、favicon 和分享图。字体与许可证位于 `assets/brand/`，网站构建直接使用仓库内的资源。

## 检查与发布

`npm run check` 依次执行：

1. 对比中英文文档及社区目录、标题和正文有无，核对成员与博客作者的姓名、主页和职务，检查 Logo 文件及 SVG 字标路径。
2. 构建英文与中文站点。
3. 检查生成页面的标题、本地链接、资源、锚点、六页社区侧栏、导航以及旧地址跳转。

生产构建位于 `build/`，可使用 `npm run serve -- --port 3000` 本地预览。默认部署子路径为 `/skyengine-homepage/`；`SITE_URL` 与 `BASE_URL` 可覆盖站点地址和基础路径。

`.github/workflows/website.yml` 对 PR 执行构建检查，并在 `main` 分支检查通过后发布 GitHub Pages。启用发布时，将仓库 Pages 设置中的 Source 选择为 GitHub Actions。
