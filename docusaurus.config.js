// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import communityRedirects from './plugins/community-redirects.js';

const repository = 'https://github.com/dayu-autostreamer/skyengine-homepage';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SkyEngine',
  tagline: 'An open platform for manufacturing simulation and scheduling.',
  favicon: 'img/favicon.ico',
  url: process.env.SITE_URL || 'https://dayu-autostreamer.github.io',
  baseUrl: process.env.BASE_URL || '/skyengine-homepage/',
  organizationName: 'dayu-autostreamer',
  projectName: 'skyengine-homepage',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw'}},
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      zh: {label: '简体中文', htmlLang: 'zh-CN'},
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          lastVersion: 'current',
          versions: {
            current: {label: 'Current', path: '', banner: 'none'},
          },
          // Resolve the edit link to the document in the selected locale.
          editUrl: ({locale, docPath}) =>
            `${repository}/edit/main/${
              locale === 'zh' ? 'i18n/zh/docusaurus-plugin-content-docs/current' : 'docs'
            }/${docPath}`,
        },
        blog: {
          blogListComponent: '@site/src/components/BlogListPage/index.jsx',
          blogTitle: 'SkyEngine Blog',
          blogDescription: 'Project updates, research notes, and stories from SkyEngine.',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          feedOptions: {type: ['rss', 'atom'], xslt: true},
          onInlineAuthors: 'warn',
          onInlineTags: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'weekly', ignorePatterns: ['**/docs/community/**']},
      },
    ],
  ],
  plugins: [
    communityRedirects,
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: './sidebarsCommunity.js',
        editUrl: ({locale, docPath}) =>
          `${repository}/edit/main/${
            locale === 'zh'
              ? 'i18n/zh/docusaurus-plugin-content-docs-community/current'
              : 'community'
          }/${docPath}`,
      },
    ],
  ],
  themeConfig: {
    image: 'img/skyengine-social-card.png',
    metadata: [{name: 'theme-color', content: '#087f72'}],
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: false},
    navbar: {
      title: '',
      logo: {
        alt: 'SkyEngine · 天工',
        src: 'img/skyengine-logo-text.svg',
        srcDark: 'img/skyengine-logo-text-white.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Documentation'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'communitySidebar',
          docsPluginId: 'community',
          position: 'left',
          label: 'Community',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          docsPluginId: 'default',
        },
        {type: 'localeDropdown', position: 'right'},
        {
          href: 'https://github.com/dayu-autostreamer/skyengine',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{label: 'Tutorial', to: '/docs/'}],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub Issues', href: 'https://github.com/dayu-autostreamer/skyengine/issues'},
            {label: 'Contributing', to: '/community/contributing/'},
            {label: 'Committee', to: '/community/committee/'},
            {label: 'Contact Us', to: '/community/support/'},
          ],
        },
        {
          title: 'More',
          items: [{label: 'GitHub', href: 'https://github.com/dayu-autostreamer/skyengine'}],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SkyEngine Project Authors. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'yaml', 'diff'],
    },
  },
};

export default config;
