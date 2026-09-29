import {readdir, readFile} from 'node:fs/promises';
import {resolve, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = resolve(root, 'build');
const baseUrl = process.env.BASE_URL || '/skyengine-homepage/';
const siteUrl = process.env.SITE_URL || 'https://dayu-autostreamer.github.io';
async function walk(dir) {
  return (
    await Promise.all(
      (await readdir(dir, {withFileTypes: true})).map((e) =>
        e.isDirectory() ? walk(resolve(dir, e.name)) : resolve(dir, e.name),
      ),
    )
  ).flat();
}
const all = new Set((await walk(out)).map((p) => relative(out, p).split('\\').join('/')));
const documents = new Map();
for (const file of all)
  if (file.endsWith('.html')) documents.set(file, load(await readFile(resolve(out, file), 'utf8')));
const failures = [];
function findFile(path) {
  const p = decodeURIComponent(path.slice(baseUrl.length));
  return [
    p,
    `${p.replace(/\/$/, '')}/index.html`,
    `${p}.html`,
    p === '' ? 'index.html' : null,
  ].find((name) => name && all.has(name));
}
let checked = 0;
for (const [file, $] of documents) {
  if (file.endsWith('404.html')) continue;
  // Native blog lists use an h2 per excerpt; archives put their h1 in the hero.
  if ($('html').hasClass('blog-list-page')) {
    const articles = $('main article');
    if (
      !articles.length ||
      articles.toArray().some((article) => $(article).find('header h2').length !== 1)
    )
      failures.push(`${file}: expected a title for each blog excerpt`);
  } else if ($('main h1, header.hero h1').length !== 1)
    failures.push(`${file}: expected one primary heading`);
  if (!$('title').text()) failures.push(`${file}: missing title`);
  const pageUrl = new URL(baseUrl + file.replace(/index\.html$/, ''), siteUrl);
  for (const el of $('a[href], img[src], script[src], link[rel="stylesheet"][href]').toArray()) {
    const value = $(el).attr('href') || $(el).attr('src');
    if (!value || /^(?:mailto:|tel:|data:|javascript:|https?:|\/\/)/.test(value)) continue;
    const url = new URL(value, pageUrl);
    if (!url.pathname.startsWith(baseUrl)) {
      failures.push(`${file}: escapes deployment base: ${value}`);
      continue;
    }
    const target = findFile(url.pathname);
    if (!target) {
      failures.push(`${file}: missing local target: ${value}`);
      continue;
    }
    if (url.hash && documents.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (
        !documents
          .get(target)('[id]')
          .toArray()
          .some((e) => e.attribs.id === id)
      )
        failures.push(`${file}: missing fragment ${value}`);
    }
    checked++;
  }
}
for (const prefix of ['', 'zh/']) {
  for (const path of ['', 'docs/', 'community/', 'blog/', 'brand/']) {
    if (!all.has(`${prefix}${path}index.html`))
      failures.push(`Missing route ${baseUrl}${prefix}${path}`);
  }
  const communityPages = [
    '',
    'contributing/',
    'committee/',
    'governance/',
    'contributors/',
    'support/',
  ];
  const expectedLinks = communityPages.map((page) => `${baseUrl}${prefix}community/${page}`);
  for (const page of communityPages) {
    const file = `${prefix}community/${page}index.html`;
    const community = documents.get(file);
    if (!community) {
      failures.push(`Missing Community page: ${file}`);
      continue;
    }
    const sidebarLinks = community('.theme-doc-sidebar-container a[href]')
      .map((_, e) => community(e).attr('href'))
      .get();
    if (JSON.stringify(sidebarLinks) !== JSON.stringify(expectedLinks))
      failures.push(`${file}: Community sidebar is incomplete or includes technical documentation`);
    if (
      community('nav.navbar')
        .text()
        .includes(prefix === 'zh/' ? '当前文档' : 'Current')
    )
      failures.push(`${file}: Community must not offer technical documentation versions`);
    if (!community(`nav.navbar a[href="${baseUrl}${prefix}community/"]`).length)
      failures.push(`${file}: missing Community navbar link`);
  }
  const redirectTargets = [
    ['docs/community/', 'community/'],
    ['docs/community/contributing/', 'community/contributing/'],
    ['docs/community/contact/', 'community/support/#project-contact'],
  ];
  for (const [from, to] of redirectTargets) {
    const redirect = documents.get(`${prefix}${from}index.html`);
    if (!redirect || !redirect(`main a[href="${baseUrl}${prefix}${to}"]`).length)
      failures.push(`${prefix}${from}: missing redirect fallback to ${to}`);
    if (redirect && !redirect('meta[name="robots"]').attr('content')?.includes('noindex'))
      failures.push(`${prefix}${from}: redirect must not be indexed`);
  }
  const docs = documents.get(`${prefix}docs/index.html`);
  const navigation = docs?.('.theme-doc-sidebar-container');
  if (!navigation || navigation.find('.menu__list-item-collapsible').length < 6)
    failures.push(`${prefix}Documentation is missing its folder categories`);
  if (navigation?.find('a[href*="/community"]').length)
    failures.push(`${prefix}Community leaked into Documentation`);
  if (
    prefix === 'zh/' &&
    navigation &&
    /Introduction|Getting started|User guide|Algorithm experiments|Developer guide|Reference|Case studies/.test(
      navigation.text(),
    )
  )
    failures.push('Chinese sidebar contains untranslated category labels');
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Build OK: ${documents.size} HTML pages, ${checked} local links/assets/anchors, both locales and independent Community navigation.`,
  );
